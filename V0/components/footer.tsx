import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold mb-4">Aayu Attire</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Elevate your style with our premium clothing collection designed for comfort and elegance.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=women" className="text-sm text-muted-foreground hover:text-primary">
                  Women
                </Link>
              </li>
              <li>
                <Link href="/shop?category=men" className="text-sm text-muted-foreground hover:text-primary">
                  Men
                </Link>
              </li>
              <li>
                <Link href="/shop?category=accessories" className="text-sm text-muted-foreground hover:text-primary">
                  Accessories
                </Link>
              </li>
              <li>
                <Link href="/shop?category=new" className="text-sm text-muted-foreground hover:text-primary">
                  New Arrivals
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Help</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/customer-service" className="text-sm text-muted-foreground hover:text-primary">
                  Customer Service
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-sm text-muted-foreground hover:text-primary">
                  Shipping & Returns
                </Link>
              </li>
              <li>
                <Link href="/size-guide" className="text-sm text-muted-foreground hover:text-primary">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-sm text-muted-foreground hover:text-primary">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <address className="not-italic">
              <p className="text-sm text-muted-foreground mb-2">123 Fashion Street</p>
              <p className="text-sm text-muted-foreground mb-2">New York, NY 10001</p>
              <p className="text-sm text-muted-foreground mb-2">Email: info@aayuattire.com</p>
              <p className="text-sm text-muted-foreground mb-2">Phone: (123) 456-7890</p>
            </address>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Aayu Attire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
