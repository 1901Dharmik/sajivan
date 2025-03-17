import crypto from "crypto";
import { NextResponse } from "next/server";
import { getToken } from 'next-auth/jwt';
import Order from '@/models/Order';
import CartItem from '@/models/Cart';
import connectDB from '@/config/db';

export async function POST(req: Request) {
  try {
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { 
      razorpay_order_id, 
      razorpay_payment_id, 
      razorpay_signature,
      shippingInfo,
      orderItems,
      totalAmount
    } = await req.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
      throw new Error("RAZORPAY_KEY_SECRET is not defined");
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json(
        { success: false, message: "Invalid Payment Signature" },
        { status: 400 }
      );
    }

    await connectDB();

    // Create order in database
    const order = await Order.create({
      user: token.id,
      shippingInfo,
      paymentMethod: 'Razorpay',
      paymentInfo: {
        razorpayOrderId: razorpay_order_id,
        razorpayPaymentId: razorpay_payment_id,
      },
      orderItems,
      totalPrice: totalAmount,
      totalPriceAfterDiscount: totalAmount,
      orderStatus: 'Processing'
    });

    // Clear cart after successful order
    await CartItem.deleteMany({ user: token.id });

    return NextResponse.json(
      { 
        success: true, 
        message: "Payment Verified Successfully",
        orderId: order._id
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error('Error verifying payment:', error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
