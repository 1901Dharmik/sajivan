"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

const heroSlides = [
  {
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop',
    title: 'Summer Collection 2025',
    subtitle: 'Discover the latest trends in summer fashion',
    cta: 'Shop Now',
    link: '/shop?category=summer',
    align: 'left'
  },
  {
    image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop',
    title: 'New Arrivals',
    subtitle: 'Be the first to wear our newest styles',
    cta: 'Explore',
    link: '/shop?category=new',
    align: 'right'
  },
  {
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop',
    title: 'Exclusive Collection',
    subtitle: 'Limited edition pieces you won\'t find anywhere else',
    cta: 'View Collection',
    link: '/shop?category=exclusive',
    align: 'center'
  }
];

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = heroSlides[currentSlide];
  
  const textAlignClass = 
    slide.align === 'left' ? 'text-left items-start' : 
    slide.align === 'right' ? 'text-right items-end' : 
    'text-center items-center';

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Zoom Effect */}
      <motion.div
        key={currentSlide}
        initial={{ opacity: 0, scale: 1.2 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
        className="absolute inset-0"
      >
        <Image
          src={slide.image}
          alt={slide.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-30" />
      </motion.div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 flex items-center">
        <motion.div
          key={`content-${currentSlide}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className={`max-w-xl flex flex-col ${textAlignClass} gap-4`}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
            {slide.title}
          </h1>
          <p className="text-xl text-white/90 mb-4">
            {slide.subtitle}
          </p>
          <div>
            <Button asChild size="lg" className="font-medium text-base">
              <Link href={slide.link}>
                {slide.cta}
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-100' : 'bg-white/50 scale-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}