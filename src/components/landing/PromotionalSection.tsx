"use client";

import { useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';

const promotions = [
  {
    title: 'Summer Sale',
    description: 'Up to 50% off on summer collection',
    cta: 'Shop Sale',
    link: '/shop?sale =true',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-amber-50'
  },
  {
    title: 'New Collection',
    description: 'Discover our exclusive autumn styles',
    cta: 'Explore Now',
    link: '/shop?category=autumn',
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop',
    color: 'bg-blue-50'
  }
];

export default function PromotionalSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20" ref={ref}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions.map((promo, index) => (
            <motion.div
              key={promo.title}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`rounded-lg overflow-hidden ${promo.color}`}
            >
              <div className="grid md:grid-cols-2 h-full">
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-2xl md:text-3xl font-bold mb-3">{promo.title}</h3>
                  <p className="text-gray-600 mb-6">{promo.description}</p>
                  <div>
                    <Button asChild>
                      <Link href={promo.link}>{promo.cta}</Link>
                    </Button>
                  </div>
                </div>
                <div className="relative h-64 md:h-auto">
                  <Image
                    src={promo.image}
                    alt={promo.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}