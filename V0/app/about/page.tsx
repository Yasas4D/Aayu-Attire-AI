import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div>
      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-6">About Aayu Attire</h1>
            <p className="text-xl text-muted-foreground">
              Crafting premium clothing with a focus on quality, sustainability, and timeless style.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Founded in 2018, Aayu Attire began with a simple mission: to create clothing that combines comfort,
                quality, and contemporary design. Our founder, inspired by global fashion trends and a passion for
                sustainable practices, set out to build a brand that would stand the test of time.
              </p>
              <p>
                What started as a small collection has grown into a comprehensive range of apparel that caters to the
                modern individual who values both style and substance. Each piece in our collection tells a story of
                craftsmanship and attention to detail.
              </p>
              <p>
                Today, Aayu Attire continues to evolve, staying true to our roots while embracing innovation and
                responding to the changing needs of our customers.
              </p>
            </div>
          </div>
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our story" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="bg-gray-100 dark:bg-gray-900 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Quality</h3>
              <p className="text-muted-foreground">
                We believe in creating products that last. From selecting the finest materials to rigorous quality
                control, every step in our process is designed to ensure excellence.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Sustainability</h3>
              <p className="text-muted-foreground">
                Our commitment to the environment guides our decisions. We strive to minimize our ecological footprint
                through responsible sourcing, ethical manufacturing, and reduced waste.
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-bold mb-4">Community</h3>
              <p className="text-muted-foreground">
                We value the relationships we build with our customers, partners, and the communities we serve. Your
                feedback shapes our journey and helps us grow.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="order-2 md:order-1 aspect-square relative rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=600" alt="Our process" fill className="object-cover" />
          </div>
          <div className="order-1 md:order-2">
            <h2 className="text-3xl font-bold mb-6">Our Process</h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                Every Aayu Attire piece begins with inspiration drawn from global trends, cultural influences, and
                customer feedback. Our designers transform these ideas into sketches that capture the essence of
                contemporary style.
              </p>
              <p>
                We source materials from trusted suppliers who share our commitment to quality and sustainability. Each
                fabric is carefully selected for its feel, durability, and environmental impact.
              </p>
              <p>
                Our skilled artisans bring designs to life, combining traditional craftsmanship with modern techniques.
                Every stitch, seam, and detail is executed with precision and care.
              </p>
              <p>
                Before reaching you, each garment undergoes rigorous quality checks to ensure it meets our standards. We
                believe in delivering products that exceed expectations and stand the test of time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Join Our Journey</h2>
          <p className="max-w-2xl mx-auto mb-8 text-primary-foreground/80">
            Discover the Aayu Attire difference and be part of our story. Explore our collection and experience clothing
            that combines style, comfort, and conscience.
          </p>
          <Button asChild size="lg" className="bg-background text-foreground hover:bg-accent">
            <Link href="/shop">Shop Now</Link>
          </Button>
        </div>
      </section>
    </div>
  )
}
