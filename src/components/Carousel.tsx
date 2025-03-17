'use client';

import { useState, useCallback, useEffect } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps<T> {
  items: T[];
  title: string;
  renderItem: (item: T, index: number) => React.ReactNode;
  align?: 'start' | 'center' | 'end';
  dragFree?: boolean;
  className?: string;
}

export default function Carousel<T>({
  items,
  title,
  renderItem,
  align = 'start',
  dragFree = true,
  className = ''
}: CarouselProps<T>) {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false);
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ align, dragFree });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setPrevBtnEnabled(emblaApi.canScrollPrev());
    setNextBtnEnabled(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className={`relative ${className}`}>
      {/* Navigation Controls */}
      <div className="flex justify-between items-center gap-2 mb-4">
      <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="font-semibold text-2xl mb-0"
        >
          {title}
        </motion.h2>
        <div className="">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollPrev}
          className={`rounded-full bg-muted p-3 transition-opacity ${
            !prevBtnEnabled ? 'opacity-50' : ''
          }`}
          disabled={!prevBtnEnabled}
        >
          <ChevronLeft className="h-5 w-5" />
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollNext}
          className={`rounded-full bg-muted p-3 transition-opacity ${
            !nextBtnEnabled ? 'opacity-50' : ''
          }`}
          disabled={!nextBtnEnabled}
        >
          <ChevronRight className="h-5 w-5" />
        </motion.button>
        </div>
      </div>

      {/* Carousel Content */}
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex -ml-4">
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="min-w-[90%] sm:min-w-[45%] lg:min-w-[25%] pl-4"
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
