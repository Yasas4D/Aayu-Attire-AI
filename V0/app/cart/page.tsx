"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trash2, Plus, Minus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { allProducts } from "@/lib/products"

// Sample cart items
const initialCartItems = [
  {
    productId: "1",
    quantity: 2,
    size: "M",
    color: "black",
  },
  {
    productId: "3",
    quantity: 1,
    size: "S",
    color: "blue",
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState(initialCartItems)

  const cartProducts = cartItems.map((item) => {
    const product = allProducts.find((p) => p.id === item.productId)
    return {
      ...item,
      product,
    }
  })

  const subtotal = cartProducts.reduce((total, item) => {
    return total + (item.product?.price || 0) * item.quantity
  }, 0)

  const shipping = subtotal > 100 ? 0 : 10
  const total = subtotal + shipping

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setCartItems((prev) =>
      prev.map((item) => (item.productId === productId ? { ...item, quantity: newQuantity } : item)),
    )
  }

  const removeItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.productId !== productId))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-medium mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
          <Button asChild size="lg">
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="rounded-lg border overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4">Product</th>
                    <th className="text-center p-4 hidden sm:table-cell">Price</th>
                    <th className="text-center p-4">Quantity</th>
                    <th className="text-right p-4 hidden sm:table-cell">Total</th>
                    <th className="p-4 w-10"></th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts.map((item) => (
                    <tr key={item.productId} className="border-t">
                      <td className="p-4">
                        <div className="flex items-center">
                          <div className="w-16 h-16 relative rounded overflow-hidden mr-4">
                            <Image
                              src={item.product?.images[0] || "/placeholder.svg"}
                              alt={item.product?.name || "Product"}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium">
                              <Link href={`/product/${item.productId}`} className="hover:underline">
                                {item.product?.name}
                              </Link>
                            </h3>
                            <div className="text-sm text-muted-foreground">
                              <span>Size: {item.size}</span>
                              <span className="mx-2">|</span>
                              <span>Color: {item.color}</span>
                            </div>
                            <div className="sm:hidden text-sm mt-1">${item.product?.price.toFixed(2)}</div>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-center hidden sm:table-cell">${item.product?.price.toFixed(2)}</td>
                      <td className="p-4">
                        <div className="flex items-center justify-center">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-r-none"
                            onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                            <span className="sr-only">Decrease quantity</span>
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => updateQuantity(item.productId, Number.parseInt(e.target.value) || 1)}
                            className="h-8 w-12 rounded-none text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 rounded-l-none"
                            onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                            <span className="sr-only">Increase quantity</span>
                          </Button>
                        </div>
                      </td>
                      <td className="p-4 text-right hidden sm:table-cell">
                        ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </td>
                      <td className="p-4 text-right">
                        <Button variant="ghost" size="icon" onClick={() => removeItem(item.productId)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove item</span>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-6 flex flex-col sm:flex-row sm:justify-between gap-4">
              <div className="flex gap-4">
                <Input placeholder="Coupon code" className="w-full sm:w-auto" />
                <Button variant="outline">Apply Coupon</Button>
              </div>
              <Button variant="outline">Update Cart</Button>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="rounded-lg border p-6">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>

              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>

                <Button className="w-full" size="lg">
                  Checkout
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>

                <div className="text-sm text-muted-foreground text-center">Free shipping on orders over $100</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
