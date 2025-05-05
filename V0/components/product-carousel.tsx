"use client"

import { useState, useEffect, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { Product } from "@/types/product"
import ProductCard from "./product-card"

interface ProductCarouselProps {
  title: string
  products: Product[]
}

export default function ProductCarousel({ title, products }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleProducts, setVisibleProducts] = useState(4)

  const updateVisibleProducts = useCallback(() => {
    if (window.innerWidth < 640) {
      setVisibleProducts(1)
    } else if (window.innerWidth < 768) {
      setVisibleProducts(2)
    } else if (window.innerWidth < 1024) {
      setVisibleProducts(3)
    } else {
      setVisibleProducts(4)
    }
  }, [])

  useEffect(() => {
    updateVisibleProducts()
    window.addEventListener("resize", updateVisibleProducts)
    return () => window.removeEventListener("resize", updateVisibleProducts)
  }, [updateVisibleProducts])

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + visibleProducts >= products.length ? 0 : prevIndex + visibleProducts))
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - visibleProducts < 0 ? Math.max(0, products.length - visibleProducts) : prevIndex - visibleProducts,
    )
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="icon" onClick={prevSlide} aria-label="Previous products">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextSlide} aria-label="Next products">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleProducts)}%)` }}
        >
          {products.map((product) => (
            <div key={product.id} className="flex-none px-2" style={{ width: `${100 / visibleProducts}%` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
