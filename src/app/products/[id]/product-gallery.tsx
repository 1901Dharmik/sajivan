"use client"

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"
import useEmblaCarousel from "embla-carousel-react"
import Autoplay from "embla-carousel-autoplay"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// const images = ["https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338612/xgvdl4nkn1lr7pee5tsf.jpg",
//     "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338610/ohehxgijud1jvepkewfg.jpg",
//     "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338580/iu2lq7rdgiswdfnuouef.jpg",
//     "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1734338581/uxyn00vejgrp0so0kall.jpg", "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416694/kqtallmxsaekrhyepym6.jpg", "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416693/ueyefejqswoh7qajjnc6.jpg", "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416692/pwiwkv01vaanpwxwghxz.jpg", "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416691/h11aa31rkiph5wfq3yhh.jpg", "https://res.cloudinary.com/dxnn3xdsa/image/upload/v1735416665/bogd5bpshktswdmk7dps.jpg"]

interface ProductGalleryProps {
    images: string[]
}

export default function ProductGallery({ images }: ProductGalleryProps) {
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [mainCarouselRef, mainCarousel] = useEmblaCarousel({ loop: true }, [Autoplay()])
    const [thumbCarouselRef, thumbCarousel] = useEmblaCarousel({
        containScroll: "keepSnaps",
        dragFree: true,
    })

    const onThumbClick = useCallback(
        (index: number) => {
            if (!mainCarousel || !thumbCarousel) return
            mainCarousel.scrollTo(index)
        },
        [mainCarousel, thumbCarousel]
    )

    const onSelect = useCallback(() => {
        if (!mainCarousel || !thumbCarousel) return
        setSelectedIndex(mainCarousel.selectedScrollSnap())
        thumbCarousel.scrollTo(mainCarousel.selectedScrollSnap())
    }, [mainCarousel, thumbCarousel])

    useEffect(() => {
        if (!mainCarousel) return
        onSelect()
        mainCarousel.on("select", onSelect)
        return () => {
            mainCarousel.off("select", onSelect)
        }
    }, [mainCarousel, onSelect])

    const scrollPrev = () => mainCarousel?.scrollPrev()
    const scrollNext = () => mainCarousel?.scrollNext()

    return (
        <div className="flex flex-col gap-4 min-w-sm lg:min-w-lg">
            <div className="relative">
                <div className="overflow-hidden rounded-lg" ref={mainCarouselRef}>
                    <div className="flex touch-pan-y">
                        {images?.map((src, index) => (
                            <div className="relative min-w-0 flex-[0_0_100%]" key={index}>
                                <div className="relative aspect-square">
                                    <Image
                                        src={src || "/placeholder.svg"}
                                        alt={`Product image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                        priority={index === 0}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute left-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background"
                    onClick={scrollPrev}
                >
                    <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                    variant="outline"
                    size="icon"
                    className="absolute right-4 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background"
                    onClick={scrollNext}
                >
                    <ChevronRight className="h-4 w-4" />
                </Button>
            </div>
            <div className="overflow-hidden" ref={thumbCarouselRef}>
                <div className="flex gap-2 touch-pan-x m-2">
                    {images?.map((src, index) => (
                        <button
                            key={index}
                            onClick={() => onThumbClick(index)}
                            className={cn(
                                "relative aspect-square w-20 flex-[0_0_auto] overflow-hidden rounded-md border transition-all",
                                selectedIndex === index && "ring-2 ring-primary",
                            )}
                        >
                            <Image src={src || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}

