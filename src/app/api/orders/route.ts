import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import Order from '@/models/Order';
import Product from '@/models/Product';
import CartItem from '@/models/Cart';
import User from '@/models/User';
import { sendEmail, createOrderConfirmationEmail } from '@/config/email';

import Stripe from 'stripe';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-03-05'
  });

export async function GET(req: Request) {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        await connectDB();

        // Fetch user orders and populate product details
        const orders = await Order.find({ user: token.id })
            .populate('orderItems.product')
            .sort('-createdAt');

        return NextResponse.json(orders);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { shippingInfo, paymentMethod ,paymentInfo } = await req.json();
        await connectDB();

        // Get cart items
        const cartItems = await CartItem.find({ user: token.id }).populate('product');
        if (cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Calculate totals
        const totalPrice = cartItems.reduce(
            (sum, item) => sum + (item.product.price * item.quantity),
            0
        );

        // For now, assuming no discount
        const totalPriceAfterDiscount = totalPrice;

        // Create order items from cart items
        const orderItems = cartItems.map(item => ({
            product: item.product._id,
            quantity: item.quantity,
            subtotal: item.product.price * item.quantity
        }));

        // ✅ Handle Stripe payment
    if (paymentMethod === 'Stripe') {
        if (!paymentInfo?.stripePaymentIntentId) {
          return NextResponse.json(
            { error: 'Stripe payment information is missing' },
            { status: 400 }
          );
        }
  
        const paymentIntent = await stripe.paymentIntents.retrieve(
          paymentInfo.stripePaymentIntentId
        );
  
        if (paymentIntent.status !== 'succeeded') {
          return NextResponse.json(
            { error: 'Stripe payment was not successful' },
            { status: 400 }
          );
        }
      }

        // Create order
        const order = await Order.create({
            user: token.id,
            shippingInfo,
            paymentMethod,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount,
            paymentInfo
        });

        // Populate product details for email
        const populatedOrder = await Order.findById(order._id).populate('orderItems.product');

        // Get user email
        const user = await User.findById(token.id);
        if (!user?.email) {
            throw new Error('User email not found');
        }

        // Send order confirmation email to user
        const userEmailContent = createOrderConfirmationEmail(populatedOrder);
        await sendEmail({
            to: user.email,
            subject: userEmailContent.subject,
            text: userEmailContent.text,
            html: userEmailContent.html
        });

        // Send notification email to admin
        const adminEmailContent = createOrderConfirmationEmail(populatedOrder, true);
        await sendEmail({
            to: process.env.EMAIL_USER!,
            subject: adminEmailContent.subject,
            text: adminEmailContent.text,
            html: adminEmailContent.html
        });

        // Clear cart after order creation
        await CartItem.deleteMany({ user: token.id });

        // ✅ Update product stock and sold count
        const updateOperations = orderItems.map(item => ({
            updateOne: {
                filter: { _id: item.product },
                update: {
                    $inc: {
                        stock: -item.quantity,
                        sold: +item.quantity
                    }
                }
            }
        }));

        // Perform bulk stock update
        await Product.bulkWrite(updateOperations, {});

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
