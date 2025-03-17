"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2, ShoppingCart } from "lucide-react";
import { toast } from "sonner";
import AddToCartButton from "@/app/admin/products/components/AddToCart";

interface WishlistItem {
  _id: string;
  user: string;
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: Array<{
      public_id: string;
      url: string;
    }>;
  };
  createdAt: string;
  updatedAt: string;
}

export default function WishlistPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // if (!session) {
    //   router.push('/auth/signin');
    //   return;
    // }
    fetchWishlist();
  }, [session, router]);

  const fetchWishlist = async () => {
    try {
      const response = await fetch("/api/wishlist");
      if (!response.ok) throw new Error("Failed to fetch wishlist");
      const data = await response.json();
      setWishlistItems(data);
    } catch (error) {
      toast.error("Failed to load wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  const removeFromWishlist = async (itemId: string) => {
    try {
      const response = await fetch(`/api/wishlist/${itemId}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to remove item");

      setWishlistItems((prev) => prev.filter((item) => item._id !== itemId));
      toast.success("Item removed from wishlist");
    } catch (error) {
      toast.error("Failed to remove item");
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto py-10">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="container mx-auto py-10">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Your wishlist is empty</h2>
          <Button onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">My Wishlist</h1>

      <div className="grid grid-cols-4  gap-6">
        {wishlistItems.map((item) => (
          <Card key={item._id}>
            <CardContent className="p-4">
              <Link href={`/products/${item.product._id}`}>
                <div className="relative h-48 mb-4">
                  <Image
                    src={item.product.images[0]?.url || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover rounded-md"
                  />
                </div>
                <h3 className="font-semibold mb-2">{item.product.name}</h3>
              </Link>

              <div className="space-y-2">
                <p className="text-sm text-gray-600 line-clamp-2">
                  {item.product.description}
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-medium">${item.product.price}</p>
                  <Button
                    variant="destructive"
                    size="icon"
                    onClick={() => removeFromWishlist(item._id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
                <AddToCartButton
                  productId={item.product._id}
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
