import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import connectDB from '@/config/db';
import Wishlist from '@/models/Wishlist';

export async function DELETE(
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

    await connectDB();
    const wishlistItem = await Wishlist.findOneAndDelete({
      _id: params.id,
      user: token.id
    });

    if (!wishlistItem) {
      return NextResponse.json({ error: 'Item not found' }, { status: 404 });
    }

    return NextResponse.json({ message: 'Item removed from wishlist' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}