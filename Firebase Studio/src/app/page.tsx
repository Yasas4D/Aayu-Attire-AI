
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

// Placeholder data for featured products/carousel
const featuredDresses = [
  { id: 1, name: "Elegant Maxi Dress22", price: 120, imageUrl: "https://picsum.photos/400/500?random=1", dataAiHint: "elegant maxi dress" },
  { id: 2, name: "Casual Sundress", price: 75, imageUrl: "https://picsum.photos/400/500?random=2", dataAiHint: "casual sundress" },
  { id: 3, name: "Boho Chic Dress", price: 90, imageUrl: "https://picsum.photos/400/500?random=3", dataAiHint: "boho chic dress" },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)]"> {/* Adjust based on header height */}
      <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-gradient-to-r from-muted/30 to-background">
        <div className="container px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-primary">
                  Discover223344  Your Style with Aayu Lookbook
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Explore our latest collection of modern and elegant attire designed for the contemporary soul.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Button asChild size="lg">
                  <Link href="/shop">Shop Now</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                   <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
             <Image
                src="https://picsum.photos/600/800?random=hero"
                alt="Hero Fashion Image"
                width={600}
                height={800}
                className="mx-auto aspect-[3/4] overflow-hidden rounded-xl object-cover sm:w-full lg:order-last"
                data-ai-hint="fashion model clothing"
                priority
              />
          </div>
        </div>
      </section>

      {/* Featured Dresses Section (Carousel Placeholder) */}
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-12">
            Featured Arrivals
          </h2>
          {/* Placeholder for Carousel Component */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
             {featuredDresses.map((dress) => (
               <Card key={dress.id} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                 <CardHeader className="p-0">
                   <Image
                     src={dress.imageUrl}
                     alt={dress.name}
                     width={400}
                     height={500}
                     className="aspect-[4/5] object-cover w-full"
                     data-ai-hint={dress.dataAiHint}
                   />
                 </CardHeader>
                 <CardContent className="p-4">
                   <CardTitle className="text-lg font-semibold">{dress.name}</CardTitle>
                   <CardDescription className="text-primary font-medium mt-1">${dress.price.toFixed(2)}</CardDescription>
                 </CardContent>
                 <CardFooter className="p-4 pt-0">
                   <Button variant="outline" className="w-full" asChild>
                     <Link href={`/shop/${dress.id}`}>View Details</Link>
                   </Button>
                 </CardFooter>
               </Card>
             ))}
          </div>
           <div className="text-center mt-12">
              <Button asChild size="lg">
                 <Link href="/shop">Shop All Products</Link>
              </Button>
           </div>
        </div>
      </section>

      {/* Add more sections like Testimonials, Blog snippets etc. if needed */}

    </div>
  );
}
