export interface Product {
  id: string
  name: string
  description: string
  fullDescription?: string
  price: number
  images: string[]
  category: string
  sizes: string[]
  colors: string[]
  material: string
  rating: number
  reviews: number
  createdAt: string
  sales: number
}
