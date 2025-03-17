"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus } from "lucide-react";

interface AddToCartButtonProps {
  productId: string;
  variant?: {
    color: string;
    size: string;
    price: number;
  };
  disabled?: boolean;
}

export default function AddToCartButton({ productId, variant, disabled}: AddToCartButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const updateQuantity = (newQuantity: number) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!session) {
      router.push("/auth/signin");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          variant,
          quantity
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to add to cart");
      }

      toast.success("Added to cart successfully!");
    } catch (error: any) {
      toast.error(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleAddToCart}
        disabled={loading || disabled}
        className="w-[100px] bg-blue-500 hover:bg-blue-600"
      >
        {loading ? "Adding..." : "Add to Cart"}
      </Button>
      <Button
        onClick={() => router.push("/checkout")}
        className="bg-green-600 text-white hover:bg-green-700"
      >
        Buy Now
      </Button>
    </div>
  );
}
