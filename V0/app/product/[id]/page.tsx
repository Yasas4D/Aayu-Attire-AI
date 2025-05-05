import Image from "next/image"
import { notFound } from "next/navigation"
import { Star, Truck, RotateCcw, Heart, Share2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { allProducts } from "@/lib/products"
import ProductCarousel from "@/components/product-carousel"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = allProducts.find((p) => p.id === params.id)

  if (!product) {
    notFound()
  }

  // Get related products (same category)
  const relatedProducts = allProducts.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 8)

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
            <Image src={product.images[0] || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-4">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="aspect-square relative overflow-hidden rounded-lg bg-gray-100">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="flex items-center mt-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-muted-foreground">{product.reviews} reviews</span>
            </div>
          </div>

          <div className="text-2xl font-bold">${product.price.toFixed(2)}</div>

          <p className="text-muted-foreground">{product.description}</p>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Color</h3>
              <RadioGroup defaultValue={product.colors[0]} className="flex gap-2">
                {product.colors.map((color) => (
                  <div key={color} className="flex items-center">
                    <RadioGroupItem value={color} id={`color-${color}`} className="sr-only" />
                    <Label
                      htmlFor={`color-${color}`}
                      className="flex items-center justify-center rounded-full w-8 h-8 border cursor-pointer [&:has(:checked)]:ring-2 [&:has(:checked)]:ring-primary [&:has(:checked)]:ring-offset-2"
                      style={{ backgroundColor: color.toLowerCase() }}
                    >
                      <span className="sr-only">{color}</span>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div>
              <h3 className="text-sm font-medium mb-2">Size</h3>
              <RadioGroup defaultValue={product.sizes[0]} className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <div key={size} className="flex items-center">
                    <RadioGroupItem value={size} id={`size-${size}`} className="sr-only" />
                    <Label
                      htmlFor={`size-${size}`}
                      className="flex h-10 w-10 items-center justify-center rounded-md border text-sm cursor-pointer [&:has(:checked)]:bg-primary [&:has(:checked)]:text-primary-foreground"
                    >
                      {size}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" className="flex-1">
                Add to Cart
              </Button>
              <Button size="lg" variant="outline" className="flex-1">
                <Heart className="mr-2 h-4 w-4" />
                Add to Wishlist
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <div className="flex items-center">
              <Truck className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center">
              <RotateCcw className="h-5 w-5 mr-2 text-muted-foreground" />
              <span className="text-sm">Free returns within 30 days</span>
            </div>
          </div>

          <div className="flex items-center pt-4 border-t">
            <Button variant="ghost" size="sm">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>
        </div>
      </div>

      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="py-4">
          <div className="prose dark:prose-invert max-w-none">
            <p>{product.fullDescription || product.description}</p>
          </div>
        </TabsContent>
        <TabsContent value="details" className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-medium mb-2">Product Details</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Material: {product.material || "Cotton blend"}</li>
                <li>Fit: Regular fit</li>
                <li>Care: Machine wash cold</li>
                <li>Imported</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-2">Shipping & Returns</h3>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Free standard shipping on orders over $50</li>
                <li>Express shipping available</li>
                <li>Free returns within 30 days</li>
                <li>See our full return policy</li>
              </ul>
            </div>
          </div>
        </TabsContent>
        <TabsContent value="reviews" className="py-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Customer Reviews</h3>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.rating ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="ml-2 text-sm text-muted-foreground">Based on {product.reviews} reviews</span>
                </div>
              </div>
              <Button>Write a Review</Button>
            </div>

            <div className="space-y-4">
              {/* Sample reviews */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">Jane Doe</div>
                  <div className="text-sm text-muted-foreground">2 days ago</div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 5 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm">
                  Great product! The quality is excellent and it fits perfectly. I would definitely recommend it.
                </p>
              </div>

              <div className="border-b pb-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium">John Smith</div>
                  <div className="text-sm text-muted-foreground">1 week ago</div>
                </div>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < 4 ? "fill-yellow-400 text-yellow-400" : "fill-gray-200 text-gray-200"}`}
                    />
                  ))}
                </div>
                <p className="text-sm">
                  Very comfortable and stylish. The material is soft and the color is exactly as shown in the pictures.
                </p>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <section>
        <h2 className="text-2xl font-bold mb-8">You May Also Like</h2>
        <ProductCarousel title="" products={relatedProducts} />
      </section>
    </div>
  )
}
