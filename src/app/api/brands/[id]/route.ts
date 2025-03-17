import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Brand from '@/models/Brand';
import slugify from 'slugify';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const brand = await Brand.findById(params.id);
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    return NextResponse.json(brand);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const data = await req.json();
    
    // Update slug if name is changed
    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }
    
    const brand = await Brand.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    
    return NextResponse.json(brand);
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Brand with this name already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const brand = await Brand.findByIdAndDelete(params.id);
    
    if (!brand) {
      return NextResponse.json({ error: 'Brand not found' }, { status: 404 });
    }
    
    return NextResponse.json({ message: 'Brand deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}