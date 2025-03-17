import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product"
import cloudinary from "@/config/cloudinary";
import slugify from "slugify";
import NodeCache from "node-cache";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache with a default TTL of 1 hour

export async function POST(req: Request) {
  try {
    await connectDB();
    const data = await req.json();

    // Create slug from name
    data.slug = slugify(data.name, { lower: true });

    // Upload main product images to cloudinary
    if (data.images && data.images.length > 0) {
      const images = await Promise.all(
        data.images.map(async (image: any) => {
          // Skip if image is already a cloudinary URL
          if (image.public_id && image.url) {
            return image;
          }
          const result = await cloudinary.uploader.upload(image, {
            folder: "products",
          });
          return {
            url: result.secure_url,
            public_id: result.public_id,
          };
        })
      );
      data.images = images;
    }

    // Upload problem_to_cure images to cloudinary
    if (data.problem_to_cure && data.problem_to_cure.length > 0) {
      data.problem_to_cure = await Promise.all(
        data.problem_to_cure.map(async (problem: any) => {
          if (problem.images && problem.images.length > 0) {
            const images = await Promise.all(
              problem.images.map(async (image: any) => {
                // Skip if image is already a cloudinary URL
                if (image.public_id && image.url) {
                  return image;
                }
                const result = await cloudinary.uploader.upload(image, {
                  folder: "problem_to_cure",
                });
                return {
                  url: result.secure_url,
                  public_id: result.public_id,
                };
              })
            );
            return { ...problem, images };
          }
          return problem;
        })
      );
    }

    const product = await Product.create(data);
    
    // Clear cache after creating new product
    cache.flushAll();
    
    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    if (error.code === 11000) {
      return NextResponse.json(
        { error: "Product with this name already exists" },
        { status: 400 }
      );
    }
    console.error('Error creating product:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
export async function GET() {
  try {
    await connectDB();

    // Check cache
    const cachedProducts = cache.get("products");
    if (cachedProducts) {
      return NextResponse.json(cachedProducts);
    }

    const products = await Product.find({})
      // .populate({ path: "brand", select: "name" })
      // .populate({ path: "category", select: "name" })
      .sort({ createdAt: -1 })
      .lean();

    // Store in cache
    cache.set("products", products);

    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}