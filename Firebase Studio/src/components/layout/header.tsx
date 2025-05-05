
"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, ShoppingCart, Search as SearchIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet"
import { SearchBar } from "@/components/search-bar"
import { useIsMobile } from "@/hooks/use-mobile"

const navItems = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Shop" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
]

export function Header() {
  const isMobile = useIsMobile()
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);

  const handleSearch = (query: string) => {
    console.log("Searching for:", query)
    // Implement search logic or navigation here
    // e.g., router.push(`/search?q=${encodeURIComponent(query)}`)
    setIsSearchOpen(false); // Close search on mobile after search
  }

  const DesktopNav = () => (
    <nav className="hidden md:flex items-center space-x-6">
      {navItems.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )

  const MobileNav = () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-6 w-6" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-[300px] sm:w-[400px]">
        <div className="flex flex-col h-full p-6">
            <Link href="/" className="mb-8">
              <SheetClose className="text-2xl font-bold text-primary">
                Aayu Lookbook
              </SheetClose>
            </Link>
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link key={item.label} href={item.href}>
                 <SheetClose className="block text-lg font-medium text-foreground hover:text-primary transition-colors">
                    {item.label}
                 </SheetClose>
              </Link>
            ))}
          </nav>
        </div>
      </SheetContent>
    </Sheet>
  )

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-4">
          {isMobile && <MobileNav />}
          <Link href="/" className="flex items-center space-x-2">
            {/* Optional: Add a logo image here */}
            <span className="text-xl font-bold text-primary">Aayu Lookbook</span>
          </Link>
        </div>

        <div className="flex-1 flex justify-center px-4 lg:px-10">
           {!isMobile && <SearchBar onSearch={handleSearch} className="w-full max-w-lg" />}
        </div>


        <div className="flex items-center space-x-4">
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setIsSearchOpen(!isSearchOpen)}>
              <SearchIcon className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" asChild>
            <Link href="/cart">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {/* Optional: Add cart item count badge */}
              {/* <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-primary ring-2 ring-background" /> */}
            </Link>
          </Button>
        </div>
      </div>
       {isMobile && isSearchOpen && (
         <div className="container px-4 pb-4 md:hidden">
           <SearchBar onSearch={handleSearch} className="w-full" />
         </div>
       )}
    </header>
  )
}
