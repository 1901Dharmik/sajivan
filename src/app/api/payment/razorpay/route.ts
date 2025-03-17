// import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import CartItem from '@/models/Cart';
import Order from '@/models/Order';
import User from '@/models/User';
// import razorpay from '@/lib/razorpay';
import crypto from 'crypto';
import { NextResponse } from "next/server";
import Razorpay from "razorpay";


// export async function POST(req: Request) {
//   try {
//     const token = await getToken({ req });
//     if (!token) {
//       return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
//     }

//     const { shippingInfo } = await req.json();
    
//     if (!shippingInfo) {
//       return NextResponse.json({ error: 'Shipping information is required' }, { status: 400 });
//     }

//     await connectDB();
    
//     // Get cart items
//     const cartItems = await CartItem.find({ user: token.id }).populate('product');
    
//     if (cartItems.length === 0) {
//       return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
//     }

//     // Calculate total
//     const totalAmount = cartItems.reduce((sum, item) => 
//       sum + (item.variant.price * item.quantity), 0
//     );

//     // Create Razorpay order
//     const order = await razorpay.orders.create({
//       amount: Math.round(totalAmount * 100), // Amount in paise
//       currency: 'INR',
//       receipt: `order_${Date.now()}`,
//       notes: {
//         userId: token.id as string,
//         shippingInfo: JSON.stringify(shippingInfo),
//       }
//     });

//     return NextResponse.json({
//       orderId: order.id,
//       amount: order.amount,
//       currency: order.currency,
//       key: process.env.RAZORPAY_KEY_ID,
//     });
//   } catch (error: any) {
//     console.error('Razorpay error:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

// export async function PUT(req: Request) {
//   try {
//     const {
//       razorpay_order_id,
//       razorpay_payment_id,
//       razorpay_signature,
//     } = await req.json();

//     // Verify payment signature
//     const body = razorpay_order_id + "|" + razorpay_payment_id;
//     const expectedSignature = crypto
//       .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
//       .update(body.toString())
//       .digest("hex");

//     if (expectedSignature !== razorpay_signature) {
//       return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
//     }

//     // Get order details
//     const order = await razorpay.orders.fetch(razorpay_order_id);
//     const userId = order.notes.userId;
//     const shippingInfo = JSON.parse(order.notes.shippingInfo);

//     await connectDB();

//     // Create order in database
//     const cartItems = await CartItem.find({ user: userId }).populate('product');
    
//     const orderItems = cartItems.map(item => ({
//       product: item.product._id,
//       variant: item.variant,
//       quantity: item.quantity,
//       subtotal: item.variant.price * item.quantity
//     }));

//     const dbOrder = await Order.create({
//       user: userId,
//       shippingInfo,
//       paymentMethod: 'Razorpay',
//       paymentInfo: {
//         razorpayOrderId: razorpay_order_id,
//         razorpayPaymentId: razorpay_payment_id,
//       },
//       orderItems,
//       totalPrice: order.amount / 100,
//       totalPriceAfterDiscount: order.amount / 100,
//       orderStatus: 'Processing'
//     });

//     // Clear cart
//     await CartItem.deleteMany({ user: userId });

//     // Send confirmation emails
//     const populatedOrder = await Order.findById(dbOrder._id).populate('orderItems.product');
//     const user = await User.findById(userId);

//     if (user?.email) {
//       const userEmailContent = createOrderConfirmationEmail(populatedOrder);
//       await sendEmail({
//         to: user.email,
//         subject: userEmailContent.subject,
//         text: userEmailContent.text,
//         html: userEmailContent.html
//       });

//       const adminEmailContent = createOrderConfirmationEmail(populatedOrder, true);
//       await sendEmail({
//         to: process.env.EMAIL_USER!,
//         subject: adminEmailContent.subject,
//         text: adminEmailContent.text,
//         html: adminEmailContent.html
//       });
//     }

//     return NextResponse.json({ 
//       success: true,
//       orderId: dbOrder._id
//     });
//   } catch (error: any) {
//     console.error('Error processing Razorpay webhook:', error);
//     return NextResponse.json({ error: error.message }, { status: 500 });
//   }
// }

export async function POST(req: Request) {
  try {
    const token = await getToken({ req ,
        secret: process.env.NEXTAUTH_SECRET,
    });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { amount, shippingInfo } = await req.json();

    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET) {
      throw new Error("Razorpay credentials not configured");
    }

    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.NEXT_PUBLIC_RAZORPAY_KEY_SECRET,
    });

    const options = {
      amount: Math.round(amount * 100), // Convert to paisa (smallest currency unit)
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
      notes: {
        userId: token.id as string,
        shippingInfo: JSON.stringify(shippingInfo),
      }
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json({
      id: order.id,
      amount: order.amount,
      currency: order.currency,
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    });
  } catch (error: any) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { message: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
