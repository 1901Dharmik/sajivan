import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Pcategory from '@/models/Category';
import cloudinary from '@/config/cloudinary';
import slugify from 'slugify';

export async function GET() {
  try {
    await connectDB();
    const categories = await Pcategory.find({}).sort({ name: 1 }).lean();
    return NextResponse.json(categories);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const data = await request.json();
    
    // Create slug from name
    data.slug = slugify(data.name, { lower: true });
    
    // Upload image to Cloudinary if provided
    if (data.image) {
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'categories',
      });
      data.images = [{
        url: result.secure_url,
        public_id: result.public_id,
      }];
    }
    
    const category = await Pcategory.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: 'Category with this name already exists' },
        { status: 400 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}