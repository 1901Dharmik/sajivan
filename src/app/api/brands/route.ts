import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Brand from "@/models/Brand";
import slugify from "slugify";
export async function GET() {
  try {
    await connectDB();
    const brands = await Brand.find({}).sort({ name: 1 });
    return NextResponse.json(brands);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB();

    // Create slug from name
    body.slug = slugify(body.name, { lower: true });

    const brand = await Brand.create(body);
    return NextResponse.json(brand, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Brand with this name already exists" },
        { status: 400 }
      );
    }
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    );
  }
}
