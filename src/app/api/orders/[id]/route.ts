import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import Order from '@/models/Order';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req,
        secret: process.env.NEXTAUTH_SECRET 
     });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const order = await Order.findOne({
      _id: params.id,
      user: token.id
    }).populate('orderItems.product');

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const token = await getToken({ req ,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { orderStatus } = await req.json();
    await connectDB();

    const order = await Order.findOneAndUpdate(
      { _id: params.id, user: token.id },
      { orderStatus },
      { new: true }
    );

    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    return NextResponse.json(order);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}