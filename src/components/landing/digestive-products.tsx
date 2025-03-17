'use client'

import { useState, useCallback, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const events = [
  {
    title: 'OPPO imagine IF Photography Awards 2024',
    description: 'Beyond the Image, Beyond Imagination',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338581/uxyn00vejgrp0so0kall.jpg',
    link: '#'
  },
  {
    title: 'Flippy Bird',
    description: 'Play our Cover Screen-themed game for the chance to win an OPPO Find N2 Flip!',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734511155/k2ijrhsywyossou5kkk6.jpg',
    link: '#'
  },
  {
    title: 'Google One & YouTube Premium',
    description: 'Avail up to 6 months free trail with OPPO Find N2 Flip',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338606/my5xze9ftxlsppy21lzo.jpg',
    link: '#'
  },
  {
    title: 'OPPO Product Ambassador',
    description: 'Get an early access and keep the OPPO Find N2 Flip!',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338607/l6avzvc08qyolgtwzugh.jpg',
    link: '#'
  }

]

export default function EventsCarousel() {
  const [prevBtnEnabled, setPrevBtnEnabled] = useState(false)
  const [nextBtnEnabled, setNextBtnEnabled] = useState(true)
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    dragFree: true
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const onSelect = useCallback(() => {
    if (!emblaApi) return
    setPrevBtnEnabled(emblaApi.canScrollPrev())
    setNextBtnEnabled(emblaApi.canScrollNext())
  }, [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    onSelect()
    emblaApi.on('select', onSelect)
    emblaApi.on('reInit', onSelect)
  }, [emblaApi, onSelect])

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="text-2xl font-bold"
          >
            OPPO Events
          </motion.h2>
          <div className="flex gap-2">
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

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex -ml-4">
            {events.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="min-w-[90%] sm:min-w-[45%] lg:min-w-[30%] pl-4"
              >
                <Link 
                  href={event.link}
                  className="group block overflow-hidden border md:border-none rounded-2xl "
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="relative aspect-[16/9] mb-1 overflow-hidden">
                      <Image
                        src={event.image}
                        alt={event.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6 bg-muted/50 ">
                      <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
                      <p className="mb-4 text-sm">{event.description}</p>
                      <motion.div
                        whileHover={{ x: 5 }}
                        className="inline-flex items-center gap-2 text-sm font-medium"
                      >
                        Learn more <ArrowRight className="h-4 w-4" />
                      </motion.div>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

