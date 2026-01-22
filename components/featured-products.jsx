'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { useCart } from './cart-context'
import { featuredProducts } from '@/lib/products'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
}

export function FeaturedProducts() {
  const { addItem } = useCart()

  return (
    <section className="py-20 md:py-28 bg-beige/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold uppercase tracking-widest text-sm font-medium">
            Bestsellers
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-primary mt-3">
            Featured Products
          </h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
        {featuredProducts.slice(0, 8).map((product) => (
  <motion.div
    key={product.id}
    variants={itemVariants}
    className="group"
  >
    <div className="bg-card rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300">
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <motion.button
          type="button"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => addItem(product)}
          className="absolute bottom-4 right-4 w-12 h-12 bg-primary text-primary-foreground rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gold hover:text-primary"
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag className="w-5 h-5" />
        </motion.button>
      </div>
      <div className="p-5">
        <h3 className="font-serif text-lg text-primary mb-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="text-gold font-medium text-lg">
            ${product.price.toFixed(2)}
          </span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className="text-sm text-muted-foreground hover:text-primary transition-colors underline underline-offset-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  </motion.div>
))}

        </motion.div>
      </div>
    </section>
  )
}
