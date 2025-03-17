"use client";

import { useRef } from 'react';
import Image from 'next/image';
import { motion, useInView } from 'framer-motion';
import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    id: '1',
    name: 'Emily Johnson',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'I absolutely love the quality of the clothes! The fabric is soft yet durable, and the fit is perfect. Will definitely be ordering more items soon.',
    date: '2 weeks ago',
    product: 'Summer Dress'
  },
  {
    id: '2',
    name: 'Michael Chen',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1974&auto=format&fit=crop',
    rating: 4,
    text: 'Great selection of men\'s clothing. The shipping was fast and the customer service was excellent when I needed to exchange a size.',
    date: '1 month ago',
    product: 'Classic Denim Jacket'
  },
  {
    id: '3',
    name: 'Sarah Williams',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2070&auto=format&fit=crop',
    rating: 5,
    text: 'The attention to detail in these clothes is amazing. I\'ve received so many compliments on my new blouse. The colors are vibrant and true to the photos.',
    date: '3 weeks ago',
    product: 'Striped Cotton Blouse'
  },
  {
    id: '4',
    name: 'David Rodriguez',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=1974&auto=format&fit=crop',
    rating: 5,
    text: 'These are the most comfortable chinos I\'ve ever owned. The fit is perfect and they look great for both casual and more formal occasions.',
    date: '2 months ago',
    product: 'Slim Fit Chinos'
  }
];

export default function ReviewsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Customers Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Read genuine reviews from our satisfied customers
          </p>
        </motion.div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent>
            {reviews.map((review, index) => (
              <CarouselItem key={review.id} className="md:basis-1/2 lg:basis-1/3 pl-4 mb-2">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow h-full flex flex-col relative"
                >
                  <Quote className="absolute top-4 right-4 h-8 w-8 text-gray-200" />
                  
                  {/* Rating */}
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? 'text-yellow-400 fill-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  
                  {/* Review text */}
                  <p className="text-gray-700 mb-6 flex-grow">"{review.text}"</p>
                  
                  {/* Product */}
                  <p className="text-sm text-gray-500 mb-4">
                    Purchased: <span className="font-medium">{review.product}</span>
                  </p>
                  
                  {/* Reviewer */}
                  <div className="flex items-center">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden mr-3">
                      <Image
                        src={review.avatar}
                        alt={review.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-medium">{review.name}</p>
                      <p className="text-xs text-gray-500">{review.date}</p>
                    </div>
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
    </section>
  );
}