import HeroBanner from "@/components/hero-banner"
import ProductCarousel from "@/components/product-carousel"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { featuredProducts, newArrivals } from "@/lib/products"

export default function Home() {
  return (
    <div>
    
      <HeroBanner />

      <section className="container mx-auto px-4 py-16">
        <ProductCarousel title="Featured Products" products={featuredProducts} />
      </section>

      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Commitment to Quality</h2>
              <p className="text-muted-foreground mb-6">
                At Aayu Attire, we believe in creating clothing that not only looks good but feels good too. Each piece
                is crafted with attention to detail and a commitment to sustainable practices.
              </p>
              <Button asChild>
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
            <div className="aspect-video bg-gray-200 dark:bg-gray-800 rounded-lg">
              {/* Placeholder for video or image */}
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Video placeholder
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <ProductCarousel title="New Arrivals" products={newArrivals} />
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Community</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Subscribe to our newsletter to receive updates on new collections, exclusive offers, and styling tips.
          </p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Your email address"
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
            <Button type="submit" className="bg-background text-foreground hover:bg-accent">
              Subscribe
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
