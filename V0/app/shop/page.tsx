import { Suspense } from "react"
import ProductFilters from "@/components/product-filters"
import ProductSort from "@/components/product-sort"
import ProductCard from "@/components/product-card"
import { allProducts } from "@/lib/products"
import type { Product } from "@/types/product"

interface ShopPageProps {
  searchParams: {
    search?: string
    category?: string
    color?: string
    size?: string
    minPrice?: string
    maxPrice?: string
    sort?: string
  }
}

export default function ShopPage({ searchParams }: ShopPageProps) {
  // Filter products based on search params
  const filteredProducts = filterProducts(allProducts, searchParams)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Shop All Products</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
        <aside>
          <ProductFilters />
        </aside>

        <div>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
            <ProductSort />
          </div>

          <Suspense fallback={<div>Loading products...</div>}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </Suspense>

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground">Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function filterProducts(products: Product[], searchParams: ShopPageProps["searchParams"]) {
  let filtered = [...products]

  // Search filter
  if (searchParams.search) {
    const searchLower = searchParams.search.toLowerCase()
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(searchLower) || product.description.toLowerCase().includes(searchLower),
    )
  }

  // Category filter
  if (searchParams.category) {
    const categories = searchParams.category.split(",")
    filtered = filtered.filter((product) => categories.includes(product.category))
  }

  // Color filter
  if (searchParams.color) {
    const colors = searchParams.color.split(",")
    filtered = filtered.filter((product) => product.colors.some((color) => colors.includes(color)))
  }

  // Size filter
  if (searchParams.size) {
    const sizes = searchParams.size.split(",")
    filtered = filtered.filter((product) => product.sizes.some((size) => sizes.includes(size)))
  }

  // Price filter
  const minPrice = searchParams.minPrice ? Number.parseInt(searchParams.minPrice) : 0
  const maxPrice = searchParams.maxPrice ? Number.parseInt(searchParams.maxPrice) : 1000
  filtered = filtered.filter((product) => product.price >= minPrice && product.price <= maxPrice)

  // Sort products
  if (searchParams.sort) {
    switch (searchParams.sort) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "newest":
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        break
      case "best-selling":
        filtered.sort((a, b) => b.sales - a.sales)
        break
      // Default is "featured" which is the original order
    }
  }

  return filtered
}
