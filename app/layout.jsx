import { Cinzel, DM_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { CartProvider } from '@/components/cart-context'
import { Header } from '@/components/header'
import { CartDrawer } from '@/components/cart-drawer'
import { Footer } from '@/components/footer'

const cinzel = Cinzel({ 
  subsets: ['latin'],
  variable: '--font-cinzel',
  display: 'swap',
})

const dmSans = DM_Sans({ 
  subsets: ['latin'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata = {
  title: 'Artisan Bakery | Premium Baked Goods',
  description: 'Discover our collection of freshly baked artisan cakes, biscuits, rusks, and premium bakery items made with the finest ingredients.',
    generator: 'v0.app'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cinzel.variable} ${dmSans.variable}`}>
      <body className="font-sans antialiased bg-cream text-foreground">
        <CartProvider>
          <Header />
          <main>{children}</main>
          <CartDrawer />
          <Footer />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
