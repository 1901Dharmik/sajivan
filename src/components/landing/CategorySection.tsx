"use client"
import React, { useRef } from 'react'
import Link from 'next/link'
import Tittle from './Title'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation';
import { motion, useInView } from 'framer-motion';

type Props = {}

const CategorySection = (props: Props) => {
    const router = useRouter()
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, amount: 0.2 });

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <div className='container mx-auto'>
            <div className="bg-white">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                    transition={{ duration: 0.6 }}
                >
                    <Tittle
                        name="Product By Categories"
                        head="Select Wide Range Of Ayurvedic Products"
                    />
                </motion.div>
                <div className="mx-auto px-4">
                    <motion.div
                        ref={ref}
                        variants={containerVariants}
                        initial="hidden"
                        animate={isInView ? "visible" : "hidden"}
                        className="flex overflow-x-auto no-scrollbar pb-8 gap-4 md:gap-6"
                    >
                        <motion.div
                            variants={itemVariants}
                            className="min-w-[320px] lg:w-full  bg-[url('/images/red-blur.png')] bg-cover bg-center bg-opacity-15 border rounded-xl p-8 flex flex-col justify-between hover:shadow-custom-shadow"
                        >
                            <div>
                                <h3 className="text-3xl font-medium mb-4">
                                    Digestive Care
                                </h3>
                                <p className="mb-6">
                                    Get to know health problems and their causes. Also know
                                    the benefits of Home Remedies, Yoga, Exercise, & more.
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => router.push("/category/Digestive%20Care")}
                                    className="text-gray-600 bg-gray-100 border px-6 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-200 transition duration-300"
                                >
                                    Know More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <img
                                    className="h-16 w-16 text-yellow-400 rounded-full"
                                    src="./images/digestivecare-icon.jpeg"
                                    alt=""
                                />
                                {/* <Brain className="h-16 w-16 text-yellow-400" /> */}
                            </div>
                        </motion.div>

                        <motion.div
                            variants={itemVariants}
                            className="min-w-[320px] lg:w-full  bg-[url('/images/cyan-blur.png')] bg-cover bg-center bg-opacity-15 border rounded-xl p-8 flex flex-col justify-between hover:shadow-custom-shadow"
                        >
                            <div>
                                <h3 className="text-3xl font-medium mb-4">Piles Care</h3>
                                <p className="mb-6">
                                    Body Mass Index is commonly used to calculate whether your
                                    weight is healthy or not.
                                </p>
                            </div>
                            <div className="flex items-center justify-between">
                                <button
                                    onClick={() => router.push("/category/Piles%20Care")}
                                    className="text-gray-600 bg-gray-100 border px-6 py-2 rounded-xl font-semibold flex items-center hover:bg-gray-200 transition duration-300"
                                >
                                    Know More
                                    <ArrowRight className="ml-2 h-4 w-4" />
                                </button>
                                <img
                                    className="h-16 w-16 text-yellow-400 rounded-full"
                                    src="./images/pilescare-icon.jpeg"
                                    alt=""
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default CategorySection