import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import CartItem from '@/models/Cart';
// import { checkPermission } from '@/lib/auth-utils';

// Get cart items for the current user
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
        const cartItems = await CartItem.find({ user: token.id })
            .populate('product')
            .sort('-createdAt');

        return NextResponse.json(cartItems);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

// Add item to cart
export async function POST(req: Request) {
    try {
        const token = await getToken({
            req,
            secret: process.env.NEXTAUTH_SECRET
        });
        if (!token) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { productId, quantity } = await req.json();

        if (!productId || !quantity) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        await connectDB();

        // Try to find existing cart item
        const existingItem = await CartItem.findOne({
            user: token.id,
            product: productId,


        });

        if (existingItem) {
            // Update quantity if item exists
            existingItem.quantity += quantity;
            await existingItem.save();
            return NextResponse.json(existingItem);
        }

        // Create new cart item
        const cartItem = await CartItem.create({
            user: token.id,
            product: productId,
            quantity,

        });

        return NextResponse.json(cartItem, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}