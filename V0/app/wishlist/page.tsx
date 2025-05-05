"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { allProducts } from "@/lib/products"

// Sample wishlist items
const initialWishlistItems = ["2", "5", "7"]

export default function WishlistPage() {
  const [wishlistItems, setWishlistItems] = useState(initialWishlistItems)

  const wishlistProducts = wishlistItems.map((id) => allProducts.find((product) => product.id === id)).filter(Boolean)

  const removeFromWishlist = (productId: string) => {
    setWishlistItems((prev) => prev.filter((id) => id !== productId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Your Wishlist</h1>
        <div className="flex items-center">
          <Heart className="h-5 w-5 mr-2 text-primary" />
          <span>{wishlistItems.length} items</span>
        </div>
      </div>

      {wishlistItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your wishlist is empty</h2>
          <p className="text-muted-foreground mb-8">
            Add items you love to your wishlist. Review them anytime and easily move them to your cart.
          </p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product) => (
            <div key={product?.id} className="border rounded-lg overflow-hidden group">
              <div className="aspect-square relative">
                <Link href={`/product/${product?.id}`}>
                  <Image
                    src={product?.images[0] || "/placeholder.svg"}
                    alt={product?.name || "Product"}
                    fill
                    className="object-cover group-hover:opacity-90 transition-opacity"
                  />
                </Link>
                <Button
                  variant="destructive"
                  size="icon"
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => removeFromWishlist(product?.id || "")}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove from wishlist</span>
                </Button>
              </div>
              <div className="p-4">
                <h3 className="font-medium">
                  <Link href={`/product/${product?.id}`} className="hover:underline">
                    {product?.name}
                  </Link>
                </h3>
                <p className="text-muted-foreground text-sm mb-2">{product?.colors.join(", ")}</p>
                <div className="flex justify-between items-center">
                  <span className="font-bold">${product?.price.toFixed(2)}</span>
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
