import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import Order from '@/models/Order';
import CartItem from '@/models/Cart';

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

        const { shippingInfo, paymentMethod } = await req.json();
        await connectDB();

        // Get cart items
        const cartItems = await CartItem.find({ user: token.id }).populate('product');
        if (cartItems.length === 0) {
            return NextResponse.json({ error: 'Cart is empty' }, { status: 400 });
        }

        // Calculate totals
        const totalPrice = cartItems.reduce((sum, item) =>
            sum + (item.variant.price * item.quantity), 0
        );

        // For now, assuming no discount
        const totalPriceAfterDiscount = totalPrice;

        // Create order items from cart items
        const orderItems = cartItems.map(item => ({
            product: item.product._id,
            variant: item.variant,
            quantity: item.quantity,
            subtotal: item.variant.price * item.quantity
        }));

        // Create order
        const order = await Order.create({
            user: token.id,
            shippingInfo,
            paymentMethod,
            orderItems,
            totalPrice,
            totalPriceAfterDiscount
        });

        // Clear cart after order creation
        await CartItem.deleteMany({ user: token.id });

        return NextResponse.json(order, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}