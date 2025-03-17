import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import ShippingInfo from '@/models/ShippingInfo';

export async function GET(req: Request) {
  try {
    const token = await getToken({ req,
        secret: process.env.NEXTAUTH_SECRET 

    });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await connectDB();
    const addresses = await ShippingInfo.find({ user: token.id }).sort('-createdAt');
    return NextResponse.json(addresses);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const token = await getToken({ req ,
        secret: process.env.NEXTAUTH_SECRET
    });
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await req.json();
    await connectDB();

    // If this is the first address or marked as default, unset other default addresses
    if (data.isDefault) {
      await ShippingInfo.updateMany(
        { user: token.id },
        { $set: { isDefault: false } }
      );
    }

    const address = await ShippingInfo.create({
      ...data,
      user: token.id
    });

    return NextResponse.json(address, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}