"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Truck } from "lucide-react";
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { CartItem } from "./components/cart-item";
import { CartSummary } from "./components/cart-detail";
import { CartSkeleton } from "./components/cart-skeleton";

interface Image {
  public_id: string;
  url: string;
}

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  category: string[];
  brand: string;
  stock: number;
  images: Image[];
}

interface CartItemType {
  _id: string;
  product: Product;
  quantity: number;
  price: number;
  user: string;
}

export default function CartPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItemType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkSessionAndFetchCart = async () => {
      if (status === "loading") return;
      if (!session) {
        router.push('/auth/signin');
        return;
      }
      await fetchCartItems();
    };

    checkSessionAndFetchCart();
  }, [session, status, router]);

  const fetchCartItems = async () => {
    try {
      const response = await fetch('/api/cart');
      if (!response.ok) throw new Error('Failed to fetch cart items');
      const data: CartItemType[] = await response.json();
      setCartItems(data);
    } catch (error) {
      toast.error('Failed to load cart items');
    } finally {
      setIsLoading(false);
    }
  };

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ quantity: newQuantity }),
      });

      if (!response.ok) throw new Error('Failed to update quantity');

      setCartItems(prev =>
        prev.map(item =>
          item._id === itemId
            ? { ...item, quantity: newQuantity }
            : item
        )
      );
    } catch (error) {
      toast.error('Failed to update quantity');
    }
  };

  const removeItem = async (itemId: string) => {
    try {
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to remove item');

      setCartItems(prev => prev.filter(item => item._id !== itemId));
      toast.success('Item removed from cart');
    } catch (error) {
      toast.error('Failed to remove item');
    }
  };

  // const calculateTotal = (): number => {
  //   return cartItems.reduce(
  //     (total, item) => total + item.price * item.quantity,
  //     0
  //   );
  // };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    );
  };

  const subtotal = calculateTotal();
  const discount = 0; // We'll implement discount logic later
  const total = subtotal - discount;

  if (isLoading) {
    return <CartSkeleton />;
  }

  return (
    <div className="w-full max-w-5xl mx-auto lg:p-4 p-2 space-y-12">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center space-y-4 sm:space-y-0">
          <h1 className="text-lg sm:text-xl md:text-2xl font-semibold text-center sm:text-left pt-6 lg:pt-8">
            Your Cart ({cartItems.length})
          </h1>
          {!session && (
            <a
              href="/auth/signin"
              className="text-sm sm:text-base text-blue-600 hover:underline text-center sm:text-right"
            >
              Sign in to synchronize your shopping cart
            </a>
          )}
        </div>

        {cartItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-lg"
          >
            <Truck className="h-5 w-5" />
            <span>Good news, your cart qualifies for free shipping.</span>
          </motion.div>
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="flex-grow space-y-6">
          <AnimatePresence>
            {cartItems.map((item) => (
              <CartItem
                key={item._id}
                id={item._id}
                name={item.product.name}
                variant={item.product.brand}
                price={item.product.price}
                image={item.product.images[0]?.url || ''}
                quantity={item.quantity}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </AnimatePresence>
          {cartItems.length === 0 && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-gray-500 py-8"
            >
              Your cart is empty
            </motion.p>
          )}
        </div>

        {cartItems.length > 0 && (
          <CartSummary subtotal={subtotal} discount={discount} total={total} />
        )}
      </div>

      <div className="text-center space-y-2">
        <h3 className="font-medium">Any questions?</h3>
        <p className="text-gray-600">
          Contact us via{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Online Customer Service
          </a>{" "}
          or call 18001037733.
        </p>
      </div>
    </div>
  );
}
