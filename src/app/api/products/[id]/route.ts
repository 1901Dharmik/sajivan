import { NextResponse } from "next/server";
import connectDB from "@/config/db";
import Product from "@/models/Product";
import cloudinary from "@/config/cloudinary";
import NodeCache from "node-cache";
import slugify from "slugify";

const cache = new NodeCache({ stdTTL: 3600 }); // Cache with a default TTL of 1 hour

// GET PRODUCT BY ID
export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    // Check if data exists in cache
    const cachedProduct = cache.get(params.id);
    if (cachedProduct) {
      return NextResponse.json(cachedProduct);
    }

    await connectDB();

    const product = await Product.findById(params.id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Store the product in cache
    cache.set(params.id, product);

    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// UPDATE PRODUCT
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const data = await req.json();

    // Update slug if name is updated
    if (data.name) {
      data.slug = slugify(data.name, { lower: true });
    }

    // Upload images to Cloudinary
    if (data.images && data.images.length > 0) {
      data.images = await Promise.all(
        data.images.map(async (image: any) => {
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
    }

    // Upload problem_to_cure images to Cloudinary
    if (data.problem_to_cure && data.problem_to_cure.length > 0) {
      data.problem_to_cure = await Promise.all(
        data.problem_to_cure.map(async (problem: any) => {
          if (problem.images && problem.images.length > 0) {
            problem.images = await Promise.all(
              problem.images.map(async (image: any) => {
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
          }
          return problem;
        })
      );
    }

    const updatedProduct = await Product.findByIdAndUpdate(params.id, data, {
      new: true,
    });

    // Clear specific product cache
    cache.del(params.id);

    return NextResponse.json(updatedProduct);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// DELETE PRODUCT
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();

    const product = await Product.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    // Remove images from Cloudinary
    if (product.images && product.images.length > 0) {
      await Promise.all(
        product.images.map(async (image: any) => {
          if (image.public_id) {
            await cloudinary.uploader.destroy(image.public_id);
          }
        })
      );
    }

    // Remove problem_to_cure images
    if (product.problem_to_cure && product.problem_to_cure.length > 0) {
      await Promise.all(
        product.problem_to_cure.map(async (problem: any) => {
          if (problem.images && problem.images.length > 0) {
            await Promise.all(
              problem.images.map(async (image: any) => {
                if (image.public_id) {
                  await cloudinary.uploader.destroy(image.public_id);
                }
              })
            );
          }
        })
      );
    }

    await product.deleteOne();

    // Clear specific product cache
    cache.del(params.id);

    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
