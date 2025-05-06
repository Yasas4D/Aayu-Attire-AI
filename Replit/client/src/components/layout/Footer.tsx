import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-12 md:pt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pb-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-xl font-semibold mb-4">Aayu Attire</h3>
            <p className="text-secondary mb-6">Combining modern aesthetics with timeless elegance for the contemporary fashion enthusiast.</p>
            <div className="flex gap-4">
              <a href="#" className="text-white hover:text-accent transition" aria-label="Facebook">
                <i className="ri-facebook-fill text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition" aria-label="Instagram">
                <i className="ri-instagram-line text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition" aria-label="Twitter">
                <i className="ri-twitter-fill text-xl"></i>
              </a>
              <a href="#" className="text-white hover:text-accent transition" aria-label="Pinterest">
                <i className="ri-pinterest-fill text-xl"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-secondary hover:text-accent transition">Home</Link></li>
              <li><Link href="/shop" className="text-secondary hover:text-accent transition">Shop</Link></li>
              <li><Link href="/about" className="text-secondary hover:text-accent transition">About Us</Link></li>
              <li><Link href="/contact" className="text-secondary hover:text-accent transition">Contact</Link></li>
            </ul>
          </div>
          
          {/* Customer Service */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary hover:text-accent transition">Track Order</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition">Shipping Policy</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition">Returns & Exchanges</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition">FAQ</a></li>
              <li><a href="#" className="text-secondary hover:text-accent transition">Privacy Policy</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className="ri-map-pin-line mr-3 mt-1"></i>
                <span className="text-secondary">123 Fashion Street, Style City, SC 12345</span>
              </li>
              <li className="flex items-center">
                <i className="ri-phone-line mr-3"></i>
                <span className="text-secondary">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center">
                <i className="ri-mail-line mr-3"></i>
                <span className="text-secondary">support@aayuattire.com</span>
              </li>
              <li className="flex items-center">
                <i className="ri-time-line mr-3"></i>
                <span className="text-secondary">Mon-Fri: 9AM-6PM</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="py-6 border-t border-gray-700 text-center md:flex md:justify-between">
          <p className="text-secondary text-sm mb-4 md:mb-0">&copy; {new Date().getFullYear()} Aayu Attire. All rights reserved.</p>
          <div className="flex justify-center gap-4">
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
            <div className="h-6 w-10 bg-white/20 rounded"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
