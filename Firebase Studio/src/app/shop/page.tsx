
"use client" // Add this directive

import Image from "next/image"
import Link from "next/link"
import * as React from "react" // Import React for useState
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SearchBar } from "@/components/search-bar"

// Placeholder product data
const allProducts = [
  { id: "1", name: "Elegant Maxi Dress", price: 120, imageUrl: "https://picsum.photos/400/500?random=1", category: "Dresses", color: "Blue", size: "M", dataAiHint: "elegant maxi dress" },
  { id: "2", name: "Casual Sundress", price: 75, imageUrl: "https://picsum.photos/400/500?random=2", category: "Dresses", color: "Yellow", size: "S", dataAiHint: "casual sundress" },
  { id: "3", name: "Boho Chic Dress", price: 90, imageUrl: "https://picsum.photos/400/500?random=3", category: "Dresses", color: "White", size: "L", dataAiHint: "boho chic dress" },
  { id: "4", name: "Silk Blouse", price: 85, imageUrl: "https://picsum.photos/400/500?random=4", category: "Tops", color: "Pink", size: "M", dataAiHint: "silk blouse" },
  { id: "5", name: "High-Waisted Jeans", price: 110, imageUrl: "https://picsum.photos/400/500?random=5", category: "Bottoms", color: "Denim", size: "28", dataAiHint: "high waisted jeans" },
  { id: "6", name: "Knit Sweater", price: 95, imageUrl: "https://picsum.photos/400/500?random=6", category: "Tops", color: "Gray", size: "L", dataAiHint: "knit sweater" },
  { id: "7", name: "Floral Skirt", price: 65, imageUrl: "https://picsum.photos/400/500?random=7", category: "Bottoms", color: "Multi", size: "S", dataAiHint: "floral skirt" },
  { id: "8", name: "Tailored Blazer", price: 150, imageUrl: "https://picsum.photos/400/500?random=8", category: "Outerwear", color: "Black", size: "M", dataAiHint: "tailored blazer" },
];

// Placeholder filter options
const categories = ["All", "Dresses", "Tops", "Bottoms", "Outerwear"];
const sizes = ["All", "XS", "S", "M", "L", "XL", "26", "27", "28", "29", "30"]; // Added jean sizes
const colors = ["All", "Blue", "Yellow", "White", "Pink", "Denim", "Gray", "Multi", "Black", "Cream", "Navy", "Olive", "Beige"]; // Added more colors from details


export default function ShopPage() {
    // State for search query and filtered products
    const [searchQuery, setSearchQuery] = React.useState("");
    const [filteredProducts, setFilteredProducts] = React.useState(allProducts);

    const handleSearch = (query: string) => {
      setSearchQuery(query);
      if (!query) {
        setFilteredProducts(allProducts); // Reset if query is empty
      } else {
        const lowerCaseQuery = query.toLowerCase();
        const results = allProducts.filter(product =>
          product.name.toLowerCase().includes(lowerCaseQuery) ||
          product.category.toLowerCase().includes(lowerCaseQuery)
          // Add more fields to search if needed (e.g., description)
        );
        setFilteredProducts(results);
      }
    };

    // TODO: Implement state and handlers for other filters (category, size, color, price)

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold tracking-tight mb-8 text-center">Shop Our Collection</h1>

        <div className="mb-8">
           <SearchBar
             onSearch={handleSearch} // Pass the handler directly
             placeholder="Search by name, category..."
             defaultValue={searchQuery} // Control the input value if needed
            />
        </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Section */}
        <aside className="lg:col-span-1 space-y-6">
          <h2 className="text-xl font-semibold">Filters</h2>

          {/* Category Filter */}
          <div>
            <h3 className="text-lg font-medium mb-2">Category</h3>
            <Select defaultValue="All">
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat.toLowerCase()}>{cat}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Size Filter */}
          <div>
             <h3 className="text-lg font-medium mb-2">Size</h3>
             <div className="grid grid-cols-3 gap-2">
               {sizes.map((size) => (
                  <div key={size} className="flex items-center space-x-2">
                     <Checkbox id={`size-${size}`} value={size.toLowerCase()} />
                     <Label htmlFor={`size-${size}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       {size}
                     </Label>
                  </div>
               ))}
             </div>
          </div>

          {/* Color Filter */}
          <div>
             <h3 className="text-lg font-medium mb-2">Color</h3>
             <div className="grid grid-cols-3 gap-2">
               {colors.map((color) => (
                 <div key={color} className="flex items-center space-x-2">
                     <Checkbox id={`color-${color}`} value={color.toLowerCase()} />
                      <Label htmlFor={`color-${color}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                       {color}
                     </Label>
                 </div>
               ))}
             </div>
          </div>

            {/* Price Filter */}
           <div>
            <h3 className="text-lg font-medium mb-2">Price Range</h3>
            <div className="flex items-center space-x-2">
                 <Input type="number" placeholder="Min" className="w-1/2" min="0" />
                 <span>-</span>
                 <Input type="number" placeholder="Max" className="w-1/2" min="0" />
            </div>
           </div>

          <Button className="w-full">Apply Filters</Button>
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
           <div className="flex justify-between items-center mb-6">
             <p className="text-sm text-muted-foreground">Showing {filteredProducts.length} products</p>
              <Select defaultValue="featured">
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="price-asc">Price: Low to High</SelectItem>
                  <SelectItem value="price-desc">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>
           </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                   <Card key={product.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                     <CardHeader className="p-0">
                       <Link href={`/shop/${product.id}`}>
                         <Image
                           src={product.imageUrl}
                           alt={product.name}
                           width={400}
                           height={500}
                           className="aspect-[4/5] object-cover w-full hover:opacity-90 transition-opacity"
                           data-ai-hint={product.dataAiHint}
                         />
                       </Link>
                     </CardHeader>
                     <CardContent className="p-4">
                       <CardTitle className="text-lg font-semibold truncate">
                        <Link href={`/shop/${product.id}`} className="hover:text-primary transition-colors">
                            {product.name}
                         </Link>
                       </CardTitle>
                       <CardDescription className="text-primary font-medium mt-1">${product.price.toFixed(2)}</CardDescription>
                     </CardContent>
                     <CardFooter className="p-4 pt-0">
                       <Button variant="outline" className="w-full mr-2" asChild>
                          <Link href={`/shop/${product.id}`}>View</Link>
                       </Button>
                        <Button className="w-full">Add to Cart</Button>
                     </CardFooter>
                   </Card>
                ))
            ) : (
                <p className="text-muted-foreground col-span-full text-center">No products found matching your search.</p>
            )}
          </div>

           {/* Placeholder for Pagination */}
           <div className="flex justify-center mt-12">
             <Button variant="outline" className="mr-2">Previous</Button>
             <Button variant="outline">Next</Button>
           </div>
        </main>
      </div>
    </div>
  );
}
