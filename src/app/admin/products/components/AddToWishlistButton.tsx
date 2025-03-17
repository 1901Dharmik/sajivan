"use client";

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Heart } from 'lucide-react';
import { toast } from 'sonner';

interface AddToWishlistButtonProps {
  productId: string;
  isInWishlist?: boolean;
  wishlistItemId?: string;
}

export default function AddToWishlistButton({
  productId,
  isInWishlist,
  wishlistItemId
}: AddToWishlistButtonProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleWishlist = async () => {
    if (!session) {
      router.push('/auth/signin');
      return;
    }

    setIsLoading(true);
    try {
      if (isInWishlist && wishlistItemId) {
        const response = await fetch(`/api/wishlist/${wishlistItemId}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Failed to remove from wishlist');
        toast.success('Removed from wishlist');
      } else {
        const response = await fetch('/api/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productId }),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.error || 'Failed to add to wishlist');
        }
        toast.success('Added to wishlist');
      }
      
      router.refresh();
    } catch (error: any) {
      toast.error(error.message || 'Failed to update wishlist');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      variant={isInWishlist ? "default" : "outline"}
      size="icon"
      onClick={handleWishlist}
      disabled={isLoading}
    >
      <Heart
        className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`}
      />
    </Button>
  );
}