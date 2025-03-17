'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Carousel from '@/components/Carousel';
import { Badge } from '@/components/ui/badge';

const events = [
  {
    title: 'OPPO imagine IF Photography Awards 2024',
    description: 'Beyond the Image, Beyond Imagination',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338581/uxyn00vejgrp0so0kall.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  },
  {
    title: 'Flippy Bird',
    description: 'Play our Cover Screen-themed game for the chance to win an OPPO Find N2 Flip!',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734511155/k2ijrhsywyossou5kkk6.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  },
  {
    title: 'Google One & YouTube Premium',
    description: 'Avail up to 6 months free trial with OPPO Find N2 Flip',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338606/my5xze9ftxlsppy21lzo.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  },
  {
    title: 'OPPO imagine IF Photography Awards 2024',
    description: 'Beyond the Image, Beyond Imagination',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338581/uxyn00vejgrp0so0kall.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  },
  {
    title: 'Flippy Bird',
    description: 'Play our Cover Screen-themed game for the chance to win an OPPO Find N2 Flip!',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734511155/k2ijrhsywyossou5kkk6.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  },
  {
    title: 'Google One & YouTube Premium',
    description: 'Avail up to 6 months free trial with OPPO Find N2 Flip',
    image: 'https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338606/my5xze9ftxlsppy21lzo.jpg',
    link: '#',
    totalrating: 4.5,
    price: 2999,
    care_for: ["Immunity", "Digestion", "Stress Relief"],
  }
];

export default function EventsCarousel() {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        {/* <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="text-2xl font-bold mb-6"
        >
          OPPO Events
        </motion.h2> */}

        <Carousel
          title="All Products"
          items={events}
          renderItem={(event) => (
            <Link href={event.link} className="group block border rounded-2xl overflow-hidden">
                {/* <Badge className="absolute top-3 left-3 bg-primary">New</Badge> */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.4 }}
              >
                
                <div className="relative aspect-[16/9] mb-1 overflow-hidden border-b border-muted">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              </motion.div>
              <div className="bg-[url('/images/red-blur.png')] bg-cover bg-center bg-opacity-85">
                <div className="p-4">
                  {/* <h3 className="mb-2 text-lg font-semibold">{event.title}</h3>
                    <p className="mb-4 text-sm">{event.description}</p> */}
                  <h5 className="mb-4 text-lg  font-semibold line-clamp-1  text-gray-900  dark:text-white">
                    {event?.title}
                  </h5>
                  <li className="list-none flex justify-between font-[200] my-1">
                    <div className="flex">
                      {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                          <svg
                            key={index}
                            className={`w-5 h-5 ${ratingValue <= Math.round(event?.totalrating)
                                ? "text-yellow-400"
                                : "text-gray-300"
                              }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        );
                      })}
                    </div>
                    {/* <span className="font-lg">4.6</span>
              <img
                class="h-[16px] w-[16px]  ml-1"
                src="https://cdn.shopify.com/s/files/1/0575/8920/3125/files/reviewstar.png?v=1629806756"
                alt="Vigyanveda Review Star"
              />{" "} */}
                    <span className="mt-0  text-sm">11000+ People Using</span>
                  </li>
                  {/* <li class="list-none flex font-[300] mt-1 "><span className="font-semibold text-lg">₹</span><h5 className="mt-[1px] pl-1 font-semibold text-lg">5000</h5>
                         < className="font-semibold text-slate-500 text-lg mt-[6px] ml-8 leading-tight line-through">₹</ span>
                               <h5 className="mt-1 pl-1 font-semibold text-lg  text-slate-500 line-through  ">8000</h5></li> */}
                  <li className="list-none flex py-2">
                    <h6 className="font-semibold text-lg py-1 mb-0 dark:text-white">
                      ₹{event?.price}
                    </h6>
                    <h6 className="font-small text-lg py-1 mb-0 line-through pl-4 text-gray-500">
                      ₹{(event?.price * 1.05).toFixed(2)}
                    </h6>
                  </li>

                  <li className="flex flex-wrap  list-none overflow-hidden mb-0">
                    <span className="font-light text-[15px] text-green-800 mr-2">
                      Care For
                    </span>

                    {event?.care_for?.map((careItem, index) => (
                      <span key={careItem} className="text-[15px] font-light pr-1">
                        {careItem}
                        {index !== event.care_for.length - 1 && ","}
                      </span>
                    ))}

                    {/* <h6 className="text-[15px] font-light mt-[2px] pl-2 mb-4">
                Gas, Acidity, Constipation
              </h6> */}
                  </li>
                  {/* <motion.div
                    whileHover={{ x: 5 }}
                    className="inline-flex items-center gap-2 text-sm font-medium"
                  >
                    Learn more <ArrowRight className="h-4 w-4" />
                  </motion.div> */}
                </div>
                <li className="list-none flex ">

                  <button className="w-[50%] bg-[#318e4c] py-[10px] rounded-bl-[19px] mr-[1px] text-white font-semibold"
                  >

                    Buy Now
                  </button>

                  <button
                    className="bg-[#206c43] py-[10px] w-[50%] rounded-br-[19px] text-white font-semibold"

                  >
                    Add To Cart
                  </button>
                </li>
              </div>

            </Link>
          )}
        />
      </div>
    </section>
  );
}
