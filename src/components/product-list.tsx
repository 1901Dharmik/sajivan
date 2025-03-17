'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from './Carousel';
import ProductCard from './landing/product-listing';

const products = [
    {
      name: 'Digestive Care Trial Kit',
      rating: 4.2,
      users: '14000+ People Using',
      price: '₹ 1,399/-',
      originalPrice: '₹ 2,197/-',
      description: 'Care For: Indigestion, Burning, Bloating',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      name: 'Digestive Care Essential Kit',
      rating: 4.6,
      users: '11000+ People Using',
      price: '₹ 2,099/-',
      originalPrice: '₹ 3,496/-',
      description: 'Care For: Gas, Constipation, Indigestion',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      name: 'Digestive Care Complete Kit',
      rating: 4.2,
      users: '17000+ People Using',
      price: '₹ 1,999/-',
      originalPrice: '₹ 2,996/-',
      description: 'Care For: Gas, Acidity, Constipation',
      image: '/placeholder.svg?height=200&width=200'
    },
    {
      name: 'Digestive Care Intense Kit',
      rating: 4.9,
      users: '19500+ People Using',
      price: '₹ 3,849/-',
      originalPrice: '₹ 5,893/-',
      description: 'Care For: Gas, Acidity, Constipation',
      image: '/placeholder.svg?height=200&width=200'
    }
  ]

export default function EventsCarousel() {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6"
        >
          OPPO Events
        </motion.h2>

        <Carousel
          items={products}
          renderItem={(event) => (
            <Link href={event.name} className="group block border rounded-2xl overflow-hidden">
              <motion.div
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <div className="relative aspect-[16/9] mb-1 overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6 bg-muted/50">
                  <h3 className="mb-2 text-lg font-semibold">{event.name}</h3>
                  <p className="mb-4 text-sm">{event.description}</p>
                  <div className="">{event.price}</div>
                  <div className="">{event.originalPrice}</div>
                  <div className="">{event.rating}</div>
                  <div className="">{event.users}</div>
                  <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </motion.div>
                </div>
              </motion.div>
            </Link>
          )}
        />
      </div>
    </section>
  );
}
