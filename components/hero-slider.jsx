'use client'

import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&q=80',
    headline: 'Artisan Cakes',
    subtitle: 'Handcrafted with love and premium ingredients',
    cta: 'Shop Now',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1486427944299-d1955d23e34d?w=1920&q=80',
    headline: 'Fresh Baked Daily',
    subtitle: 'Experience the aroma of freshly baked goods',
    cta: 'Explore',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&q=80',
    headline: 'Premium Biscuits',
    subtitle: 'Crispy, delicious, and irresistible',
    cta: 'Discover',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=1920&q=80',
    headline: 'Celebrate with Us',
    subtitle: 'Custom cakes for every special occasion',
    cta: 'Order Now',
  },
]

export function HeroSlider() {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [])

  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)
  }, [])

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [nextSlide])

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  }

  return (
    <section className="relative h-[70vh] md:h-[75vh] overflow-hidden">
      <AnimatePresence initial={false} custom={direction} mode="wait">
        <motion.div
          key={current}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          className="absolute inset-0"
        >
          {/* Background Image */}
          <Image
            src={slides[current].image}
            alt={slides[current].headline}
            fill
            priority
            className="object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-linear-to-r from-primary/60 via-primary/30 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="max-w-xl"
              >
                <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-4 leading-tight">
                  {slides[current].headline}
                </h1>

                <p className="text-white/90 text-lg md:text-xl mb-8">
                  {slides[current].subtitle}
                </p>

                <Link
                  href="/shop"
                  className="inline-flex items-center px-8 py-4 bg-gold hover:bg-gold/90 text-primary font-medium rounded-2xl transition-all duration-300 hover:shadow-lg uppercase tracking-wide"
                >
                  {slides[current].cta}
                </Link>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute hidden  md:flex left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm  items-center justify-center text-primary hover:bg-card transition-colors z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 hidden top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-card/80 backdrop-blur-sm md:flex items-center justify-center text-primary hover:bg-card transition-colors z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => {
              setDirection(index > current ? 1 : -1)
              setCurrent(index)
            }}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === current
                ? 'bg-gold w-8'
                : 'bg-white/50 w-3 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
