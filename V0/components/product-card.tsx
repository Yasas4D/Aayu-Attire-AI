import Image from "next/image"
import Link from "next/link"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="group relative">
      <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-90 transition-opacity duration-300 relative h-80">
        <Link href={`/product/${product.id}`}>
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className="h-full w-full object-cover object-center lg:h-full lg:w-full"
          />
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm hover:bg-white/90 rounded-full"
          aria-label="Add to wishlist"
        >
          <Heart className="h-5 w-5" />
        </Button>
        <div className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-sm p-2 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <Button className="w-full" variant="secondary">
            Quick View
          </Button>
        </div>
      </div>
      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            <Link href={`/product/${product.id}`}>
              <span aria-hidden="true" className="absolute inset-0" />
              {product.name}
            </Link>
          </h3>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">{product.colors.join(", ")}</p>
        </div>
        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">${product.price.toFixed(2)}</p>
      </div>
    </div>
  )
}
