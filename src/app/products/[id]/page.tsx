import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import EmblaCarousel from '@/app/products/components/EmblaCarousel'
import { EmblaOptionsType } from 'embla-carousel'
import { Suspense } from "react";
import Loading from "@/app/loading";

import ProductDetails from "./product-details"
import ProductGallery from "./product-gallery"

import '../components/embla.css'

const OPTIONS: EmblaOptionsType = {}
const SLIDE_COUNT = 10
const SLIDES = Array.from(Array(SLIDE_COUNT).keys())

// Metadata generation function
export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  try {
    const product = await getProduct(params.id);
    
    return {
      title: `${product.name} | Your Store Name`,
      description: product.description,
      openGraph: {
        title: product.name,
        description: product.description,
        images: product.images.map((img: any) => ({
          url: img.url,
        })),
      },
    };
  } catch (error) {
    return {
      title: "Product Not Found",
      description: "The requested product could not be found",
    };
  }
}

async function getProduct(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products/${id}`, {
      cache: "no-store",
    });
    
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    throw error;
  }
}

export default async function ProductPage({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);

  if (!product) {
    notFound();
  }

  const images = product?.images?.map((img: any) => img?.url);

  return (
    <Suspense fallback={<Loading />}>
      <div className="container mx-auto">
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="lg:sticky lg:top-12 lg:h-[calc(100vh-3rem)] bg-muted/50 flex items-center justify-center">
            <ProductGallery images={images} />
          </div>
          <ProductDetails product={product} />
        </div>
      </div>
    </Suspense>
  );
}
