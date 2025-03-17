"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function CartSummary({ subtotal, discount, total }) {
  const router = useRouter();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="w-full md:w-80 space-y-6 p-6 bg-white border rounded-lg shadow-sm"
    >
      <h2 className="text-xl font-semibold">Order Summary</h2>
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium">₹{subtotal}</span>
        </div>
        
        {discount > 0 && (
          <div className="flex justify-between items-center text-green-600">
            <span>Discount</span>
            <span>-₹{discount()}</span>
          </div>
        )}

        <div className="pt-4 border-t">
          <div className="flex justify-between items-center">
            <span className="font-semibold">Total</span>
            <span className="font-semibold text-lg">₹{total}</span>
          </div>
        </div>
      </div>

      <Button
        onClick={() => router.push("/checkout")}
        className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg"
      >
        Proceed to Checkout
      </Button>

      <div className="space-y-4 text-sm">
        <p className="text-center text-gray-600">
          Free shipping on all orders
        </p>
        {discount === 0 && (
          <p className="text-center text-gray-600">
            Apply your coupon at checkout
          </p>
        )}
      </div>
    </motion.div>
  );
}
