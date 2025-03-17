import { NextResponse } from 'next/server';
import connectDB from '@/config/db';
import Pcategory from '@/models/Category';
import cloudinary from '@/config/cloudinary';
import slugify from 'slugify';

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Pcategory.findById(params.id).lean();
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    return NextResponse.json(category);
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
    
    // Handle image update
    if (data.image) {
      // Delete old image if exists
      const category = await Pcategory.findById(params.id).lean();
      if (category?.images?.[0]?.public_id) {
        await cloudinary.uploader.destroy(category.images[0].public_id);
      }
      
      // Upload new image
      const result = await cloudinary.uploader.upload(data.image, {
        folder: 'categories',
      });
      data.images = [{
        url: result.secure_url,
        public_id: result.public_id,
      }];
    }
    
    const updatedCategory = await Pcategory.findByIdAndUpdate(
      params.id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!updatedCategory) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    return NextResponse.json(updatedCategory);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectDB();
    const category = await Pcategory.findById(params.id);
    
    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }
    
    // Delete image from Cloudinary if exists
    if (category.images?.[0]?.public_id) {
      await cloudinary.uploader.destroy(category.images[0].public_id);
    }
    
    await Pcategory.findByIdAndDelete(params.id);
    return NextResponse.json({ message: 'Category deleted successfully' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}