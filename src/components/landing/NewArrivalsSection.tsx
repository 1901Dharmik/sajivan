"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Heart } from 'lucide-react';

const newArrivals = [
  {
    id: '1',
    name: 'Casual Linen Shirt',
    price: 49.99,
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=1976&auto=format&fit=crop',
    category: 'Men'
  },
  {
    id: '2',
    name: 'Summer Floral Dress',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1612336307429-8a898d10e223?q=80&w=1974&auto=format&fit=crop',
    category: 'Women'
  },
  {
    id: '3',
    name: 'Classic Denim Jacket',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1936&auto=format&fit=crop',
    category: 'Men'
  },
  {
    id: '4',
    name: 'Striped Cotton Blouse',
    price: 39.99,
    image: 'https://images.unsplash.com/photo-1551163943-3f7e29e5ed20?q=80&w=1974&auto=format&fit=crop',
    category: 'Women'
  },
  {
    id: '5',
    name: 'Slim Fit Chinos',
    price: 54.99,
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=1974&auto=format&fit=crop',
    category: 'Men'
  },
  {
    id: '6',
    name: 'Casual Knit Sweater',
    price: 64.99,
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1964&auto=format&fit=crop',
    category: 'Women'
  }
];

export default function NewArrivalsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-center md:justify-between mb-12"
        >
          <div>
            <h2 className="text-3xl md:text-4xl font-bold mb-2">New Arrivals</h2>
            <p className="text-gray-600">Check out our latest collection</p>
          </div>
          <Link href="/shop?category=new" className="mt-4 md:mt-0">
            <Button variant="outline">View All</Button>
          </Link>
        </motion.div>

        <div ref={ref}>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {newArrivals.map((product, index) => (
                <CarouselItem key={product.id} className="basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"></div>
                      
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
                      
                      {/* Category tag */}
                      <div className="absolute top-2 left-2">
                        <span className="bg-white px-2 py-1 text-xs font-medium rounded">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="mt-4">
                      <Link href={`/products/${product.id}`}>
                        <h3 className="text-lg font-medium text-gray-900 group-hover:text-black transition-colors">
                          {product.name}
                        </h3>
                      </Link>
                      <p className="mt-1 text-gray-700">${product.price.toFixed(2)}</p>
                    </div>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="left-0" />
              <CarouselNext className="right-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
}