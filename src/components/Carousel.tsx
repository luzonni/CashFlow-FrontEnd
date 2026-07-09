'use client'

import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Icon } from "./Icon"
import { Button } from "@heroui/react"

type CarouselProps = {
    children: React.ReactNode[];
    withoutButtons?: boolean;
}

export function Carousel({ children, withoutButtons = false }: CarouselProps) {
    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [scrollSnaps, setScrollSnaps] = useState<number[]>([])

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
    const scrollTo = useCallback(
        (index: number) => emblaApi?.scrollTo(index),
        [emblaApi]
    )

    const onSelect = useCallback(() => {
        if (!emblaApi) return
        setSelectedIndex(emblaApi.selectedScrollSnap())
    }, [emblaApi])

    useEffect(() => {
        if (!emblaApi) return
        setScrollSnaps(emblaApi.scrollSnapList())
        emblaApi.on('select', onSelect)
        emblaApi.on('reInit', onSelect)
    }, [emblaApi, onSelect])

    return (
        <div className="w-full flex flex-col gap-3">
            <div className="overflow-hidden rounded-2xl" ref={emblaRef}>
                <div className="flex">
                    {children.map((slide, index) => (
                        <div
                            key={index}
                            className="min-w-0 flex-[0_0_100%] px-2"
                        >
                            {slide}
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex gap-6 justify-center items-center">
                {
                    !withoutButtons && (
                        <Button
                            onClick={scrollPrev}
                            isIconOnly
                            aria-label="rior"
                            variant="tertiary"
                        >
                            <Icon name="ChevronLeft" />
                        </Button>
                    )
                }
                <div className="flex flex-row gap-2">
                    {scrollSnaps.map((_, index) => (
                        <Button
                            key={index}
                            onClick={() => scrollTo(index)}
                            className={`h-2 w-2 rounded-full transition-all ${index === selectedIndex
                                ? 'bg-accent'
                                : 'bg-foreground'
                                }`}
                            isIconOnly={index !== selectedIndex}
                            aria-label={`Ir para slide ${index + 1}`}
                        />
                    ))}
                </div>
                {
                    !withoutButtons && (
                        <Button
                            onClick={scrollNext}
                            isIconOnly
                            aria-label="Next"
                            variant="tertiary"
                        >
                            <Icon name="ChevronRight" />
                        </Button>
                    )
                }
            </div>
        </div>
    )
}