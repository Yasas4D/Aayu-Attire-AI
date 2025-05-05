
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Minus, Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

// Placeholder cart data
const cartItems = [
  { id: 1, productId: "1", name: "Elegant Maxi Dress", price: 120, imageUrl: "https://picsum.photos/100/125?random=1", color: "Blue", size: "M", quantity: 1, dataAiHint: "elegant maxi dress" },
  { id: 2, productId: "4", name: "Silk Blouse", price: 85, imageUrl: "https://picsum.photos/100/125?random=4", color: "Pink", size: "M", quantity: 2, dataAiHint: "silk blouse" },
];

const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
const shipping = 5.00; // Example shipping cost
const taxes = subtotal * 0.08; // Example tax rate
const total = subtotal + shipping + taxes;

export default function CartPage() {

    if (cartItems.length === 0) {
        return (
            <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 text-center">
                <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
                <p className="text-muted-foreground mb-8">Looks like you haven't added anything to your cart yet.</p>
                <Button asChild>
                    <Link href="/shop">Start Shopping</Link>
                </Button>
            </div>
        )
    }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-6">
          {cartItems.map((item) => (
            <Card key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center p-4 gap-4 shadow-sm">
              <Image
                src={item.imageUrl}
                alt={item.name}
                width={100}
                height={125}
                className="rounded-md object-cover aspect-[4/5]"
                 data-ai-hint={item.dataAiHint}
              />
              <div className="flex-1">
                <Link href={`/shop/${item.productId}`} className="font-semibold hover:text-primary transition-colors">{item.name}</Link>
                <p className="text-sm text-muted-foreground">Size: {item.size}, Color: {item.color}</p>
                <p className="text-sm font-medium mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex items-center space-x-2 mt-2 sm:mt-0">
                 <Button variant="outline" size="icon" className="h-8 w-8">
                    <Minus className="h-4 w-4"/>
                 </Button>
                 <Input type="number" value={item.quantity} readOnly className="w-12 h-8 text-center px-1"/>
                 <Button variant="outline" size="icon" className="h-8 w-8">
                    <Plus className="h-4 w-4"/>
                 </Button>
              </div>
              <div className="sm:ml-4 mt-2 sm:mt-0">
                 <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
               <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-destructive ml-auto sm:ml-4">
                  <Trash2 className="h-5 w-5"/>
                  <span className="sr-only">Remove item</span>
               </Button>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24 shadow-lg"> {/* Sticky summary */}
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes</span>
                <span>${taxes.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-4">
               <Button size="lg" className="w-full">Proceed to Checkout</Button>
               <Button variant="outline" className="w-full" asChild>
                 <Link href="/shop">Continue Shopping</Link>
               </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
