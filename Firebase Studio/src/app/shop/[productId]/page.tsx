
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Heart } from "lucide-react"; // Example icon for wishlist

// Placeholder function to fetch product data by ID
// In a real app, this would fetch from a database or API
async function getProductData(productId: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // Placeholder data - find product or return a default/error
   const products = [
    { id: "1", name: "Elegant Maxi Dress", price: 120, imageUrl: "https://picsum.photos/600/800?random=1", description: "A stunning floor-length dress perfect for evening events. Made from luxurious silk blend.", category: "Dresses", colors: ["Blue", "Black", "Red"], sizes: ["S", "M", "L"], dataAiHint: "elegant maxi dress model" },
    { id: "2", name: "Casual Sundress", price: 75, imageUrl: "https://picsum.photos/600/800?random=2", description: "Light and breezy cotton sundress for sunny days. Features adjustable straps.", category: "Dresses", colors: ["Yellow", "White", "Light Blue"], sizes: ["XS", "S", "M"], dataAiHint: "casual sundress model" },
    { id: "3", name: "Boho Chic Dress", price: 90, imageUrl: "https://picsum.photos/600/800?random=3", description: "Flowy bohemian style dress with intricate embroidery details.", category: "Dresses", colors: ["White", "Beige"], sizes: ["S", "M", "L", "XL"], dataAiHint: "boho chic dress model" },
    // Add other products corresponding to the shop page
    { id: "4", name: "Silk Blouse", price: 85, imageUrl: "https://picsum.photos/600/800?random=4", category: "Tops", description: "Luxurious silk blouse, perfect for work or evening wear.", colors: ["Pink", "Cream", "Navy"], sizes: ["S", "M", "L"], dataAiHint: "silk blouse model" },
    { id: "5", name: "High-Waisted Jeans", price: 110, imageUrl: "https://picsum.photos/600/800?random=5", category: "Bottoms", description: "Classic high-waisted denim jeans with a modern fit.", colors: ["Denim", "Black"], sizes: ["26", "27", "28", "29", "30"], dataAiHint: "high waisted jeans model" },
    { id: "6", name: "Knit Sweater", price: 95, imageUrl: "https://picsum.photos/600/800?random=6", category: "Tops", description: "Cozy knit sweater for cooler weather.", colors: ["Gray", "Cream", "Olive"], sizes: ["S", "M", "L", "XL"], dataAiHint: "knit sweater model" },
    { id: "7", name: "Floral Skirt", price: 65, imageUrl: "https://picsum.photos/600/800?random=7", category: "Bottoms", description: "A-line floral print skirt, perfect for spring.", colors: ["Multi"], sizes: ["XS", "S", "M"], dataAiHint: "floral skirt model" },
    { id: "8", name: "Tailored Blazer", price: 150, imageUrl: "https://picsum.photos/600/800?random=8", category: "Outerwear", description: "Sharp tailored blazer for a polished look.", colors: ["Black", "Navy", "Gray"], sizes: ["S", "M", "L"], dataAiHint: "tailored blazer model" },
  ];
  const product = products.find(p => p.id === productId);

  if (!product) {
    // Handle case where product is not found
    return null;
  }
  return product;
}


export default async function ProductDetailPage({ params }: { params: { productId: string } }) {
  const product = await getProductData(params.productId);

  if (!product) {
    return <div className="container mx-auto px-4 py-12 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        {/* Product Image */}
        <div className="aspect-square md:aspect-[3/4] overflow-hidden rounded-lg shadow-lg">
          <Image
            src={product.imageUrl}
            alt={product.name}
            width={600}
            height={800}
            className="object-cover w-full h-full"
             data-ai-hint={product.dataAiHint}
             priority // Prioritize loading the main product image
          />
          {/* Optional: Add thumbnail gallery here */}
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-center">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight mb-2">{product.name}</h1>
          <p className="text-2xl text-primary font-semibold mb-4">${product.price.toFixed(2)}</p>
          <p className="text-muted-foreground mb-6">{product.description}</p>

          <Separator className="my-6" />

          {/* Color Selection */}
          <div className="mb-6">
            <Label className="text-base font-medium mb-3 block">Color</Label>
            <RadioGroup defaultValue={product.colors[0].toLowerCase()} className="flex flex-wrap gap-3">
              {product.colors.map((color) => (
                <div key={color}>
                  <RadioGroupItem value={color.toLowerCase()} id={`color-${color.toLowerCase()}`} className="sr-only" />
                  <Label
                    htmlFor={`color-${color.toLowerCase()}`}
                    className="cursor-pointer rounded-md border-2 border-muted bg-transparent px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-primary peer-data-[state=checked]:text-primary-foreground transition-colors"
                  >
                    {color}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Size Selection */}
          <div className="mb-6">
            <Label htmlFor="size-select" className="text-base font-medium mb-3 block">Size</Label>
             <Select defaultValue={product.sizes[0]}>
              <SelectTrigger id="size-select" className="w-[180px]">
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {product.sizes.map((size) => (
                  <SelectItem key={size} value={size}>{size}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

           {/* Quantity Selection - Optional */}
           <div className="mb-8">
             <Label htmlFor="quantity-select" className="text-base font-medium mb-3 block">Quantity</Label>
             <Select defaultValue="1">
               <SelectTrigger id="quantity-select" className="w-[100px]">
                 <SelectValue />
               </SelectTrigger>
               <SelectContent>
                 {[1, 2, 3, 4, 5].map(qty => (
                   <SelectItem key={qty} value={String(qty)}>{qty}</SelectItem>
                 ))}
               </SelectContent>
             </Select>
           </div>


          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="flex-1">Add to Cart</Button>
             <Button size="lg" variant="outline" className="flex-1 flex items-center gap-2">
                <Heart className="h-5 w-5" />
                Add to Wishlist
             </Button>
          </div>

           {/* Optional: Product details like SKU, category */}
           <div className="mt-8 text-sm text-muted-foreground">
             <p>Category: {product.category}</p>
             {/* <p>SKU: {product.sku || 'N/A'}</p> */}
           </div>
        </div>
      </div>

      {/* Optional: Related Products Section */}
      {/* Optional: Customer Reviews Section */}
      <Separator className="my-12 md:my-16" />
       <div>
          <h2 className="text-2xl font-bold mb-6 text-center">You Might Also Like</h2>
          {/* Placeholder for related products grid/carousel */}
          <div className="text-center text-muted-foreground">Related products coming soon...</div>
       </div>

    </div>
  );
}

// Optional: Generate static paths if using SSG
// export async function generateStaticParams() {
//   // Fetch all product IDs
//   const products = await getAllProductIds(); // Implement this function
//   return products.map((product) => ({
//     productId: product.id,
//   }));
// }
