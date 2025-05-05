import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function HeroBanner() {
  return (
    <div className="relative overflow-hidden bg-gray-900">
      <div className="absolute inset-0">
        <Image
          src="/placeholder.svg?height=1080&width=1920"
          alt="Hero background"
          fill
          className="object-cover object-center opacity-60"
          priority
        />
      </div>
      <div className="relative container mx-auto px-4 py-32 sm:py-48 lg:py-56">
        <div className="max-w-xl">
          <h1 className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">Elevate Your Style 222</h1>
          <p className="mt-6 text-xl text-gray-300">
            Discover the latest collection of premium clothing designed for comfort and elegance.
          </p>
          <div className="mt-10 flex gap-4">
            <Button asChild size="lg">
              <Link href="/shop">Shop Now</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="bg-white/10 text-white hover:bg-white/20">
              <Link href="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
