"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart, Star } from 'lucide-react';

const bestSellers = [
  {
    id: '1',
    name: 'Classic White T-Shirt',
    price: 29.99,
    rating: 4.8,
    reviews: 124,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=2080&auto=format&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: '2',
    name: 'Slim Fit Jeans',
    price: 59.99,
    rating: 4.7,
    reviews: 98,
    image: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=1974&auto=format&fit=crop',
    badge: 'Top Rated'
  },
  {
    id: '3',
    name: 'Casual Hoodie',
    price: 49.99,
    rating: 4.9,
    reviews: 156,
    image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1974&auto=format&fit=crop',
    badge: 'Best Seller'
  },
  {
    id: '4',
    name: 'Summer Dress',
    price: 44.99,
    rating: 4.6,
    reviews: 87,
    image: 'https://images.unsplash.com/photo-1623609163859-ca93c959b5b8?q=80&w=1974&auto=format&fit=crop',
    badge: 'Hot'
  }
];

export default function BestSellersSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">Best Sellers</h2>
            <p className="text-gray-600">Our most popular products based on sales</p>
          </div>
          <Link href="/shop?sort=popularity" className="mt-4 md:mt-0">
            <Button variant="outline">View All</Button>
          </Link>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {bestSellers.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Badge */}
                <div className="absolute top-2 right-2">
                  <span className="bg-black text-white px-2 py-1 text-xs font-medium rounded">
                    {product.badge}
                  </span>
                </div>
                
                {/* Quick action buttons */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Button size="sm" className="rounded-full">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button size="sm" variant="outline" className="rounded-full bg-white">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">
                    {product.name}
                  </h3>
                </Link>
                <p className="mt-1 text-gray-700 font-medium">${product.price.toFixed(2)}</p>
                
                {/* Rating */}
                <div className="mt-2 flex items-center">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-gray-500">
                    ({product.reviews})
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}