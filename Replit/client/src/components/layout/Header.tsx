import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useSearch } from "@/context/SearchContext";
import { useCart } from "@/context/CartContext";

const Header = () => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { searchQuery, setSearchQuery } = useSearch();
  const { cart, toggleMiniCart } = useCart();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!searchOpen);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to shop page with search query
    window.location.href = `/shop?search=${searchQuery}`;
  };

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const isActiveLink = (path: string) => {
    return location === path ? "border-b-2 border-accent font-medium" : "hover:text-accent";
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4">
        {/* Top bar with announcement and account links */}
        <div className="hidden md:flex justify-between py-2 text-xs border-b border-gray-100">
          <p className="text-dark">Free shipping on orders over $100</p>
          <div className="flex gap-4">
            <a href="#" className="hover:text-accent">Track Order</a>
            <a href="#" className="hover:text-accent">Help</a>
            <a href="#" className="hover:text-accent">Sign In / Register</a>
          </div>
        </div>
        
        {/* Main header with logo, search and cart */}
        <div className="flex items-center justify-between py-4">
          {/* Mobile menu toggle */}
          <button 
            className="lg:hidden text-primary text-2xl" 
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            <i className="ri-menu-line"></i>
          </button>
          
          {/* Logo */}
          <Link href="/" className="font-heading text-2xl md:text-3xl font-bold">
            Aayu Attire
          </Link>
          
          {/* Search bar - hidden on mobile */}
          <div className="hidden md:block w-1/3 relative">
            <form onSubmit={handleSearch}>
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full py-2 px-4 pr-10 border border-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark" 
                aria-label="Search"
              >
                <i className="ri-search-line"></i>
              </button>
            </form>
          </div>
          
          {/* Icons */}
          <div className="flex items-center gap-3 md:gap-6">
            <button 
              className="md:hidden text-xl" 
              onClick={toggleSearch}
              aria-label="Search"
            >
              <i className="ri-search-line"></i>
            </button>
            <a href="#" className="text-xl relative" aria-label="Wishlist">
              <i className="ri-heart-line"></i>
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">0</span>
            </a>
            <button 
              className="text-xl relative" 
              aria-label="Shopping cart"
              onClick={toggleMiniCart}
            >
              <i className="ri-shopping-bag-line"></i>
              <span className="absolute -top-2 -right-2 bg-accent text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartItemCount}
              </span>
            </button>
          </div>
        </div>

        {/* Search overlay for mobile */}
        {searchOpen && (
          <div className="md:hidden pb-4">
            <form onSubmit={handleSearch} className="relative">
              <input 
                type="text" 
                placeholder="Search for products..." 
                className="w-full py-2 px-4 pr-10 border border-secondary rounded-full focus:outline-none focus:ring-1 focus:ring-accent focus:border-accent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button 
                type="submit"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark"
                aria-label="Search"
              >
                <i className="ri-search-line"></i>
              </button>
            </form>
          </div>
        )}
        
        {/* Navigation menu - desktop */}
        <nav className="hidden lg:block py-3 border-t border-gray-100">
          <ul className="flex justify-center gap-8 font-accent text-sm uppercase tracking-wide">
            <li>
              <Link href="/" className={`py-2 ${isActiveLink("/")}`}>Home</Link>
            </li>
            <li className="group relative">
              <Link href="/shop" className={`py-2 flex items-center gap-1 ${isActiveLink("/shop")}`}>
                Shop <i className="ri-arrow-down-s-line"></i>
              </Link>
              <div className="absolute left-0 top-full bg-white shadow-lg w-56 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                <ul className="py-2">
                  <li><Link href="/shop?category=new-arrivals" className="block px-4 py-2 hover:bg-light">New Arrivals</Link></li>
                  <li><Link href="/shop?category=dresses" className="block px-4 py-2 hover:bg-light">Dresses</Link></li>
                  <li><Link href="/shop?category=tops" className="block px-4 py-2 hover:bg-light">Tops</Link></li>
                  <li><Link href="/shop?category=bottoms" className="block px-4 py-2 hover:bg-light">Bottoms</Link></li>
                  <li><Link href="/shop?category=accessories" className="block px-4 py-2 hover:bg-light">Accessories</Link></li>
                  <li><Link href="/shop?category=sale" className="block px-4 py-2 hover:bg-light">Sale</Link></li>
                </ul>
              </div>
            </li>
            <li>
              <Link href="/about" className={`py-2 ${isActiveLink("/about")}`}>About Us</Link>
            </li>
            <li>
              <Link href="/contact" className={`py-2 ${isActiveLink("/contact")}`}>Contact</Link>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Mobile menu */}
      <div 
        className={`lg:hidden bg-white w-full absolute left-0 shadow-md transition-transform duration-300 z-40 h-screen overflow-y-auto ${
          mobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container mx-auto px-4 py-6">
          {/* Navigation links */}
          <nav>
            <ul className="space-y-4 font-accent text-sm uppercase">
              <li>
                <Link 
                  href="/" 
                  className="block py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex justify-between items-center py-2 border-b border-gray-100">
                  <Link 
                    href="/shop"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Shop
                  </Link>
                  <button className="text-lg" aria-label="Expand shop menu">
                    <i className="ri-add-line"></i>
                  </button>
                </div>
                <ul className="pl-4 mt-2 space-y-2 hidden">
                  <li><Link href="/shop?category=new-arrivals" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>New Arrivals</Link></li>
                  <li><Link href="/shop?category=dresses" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>Dresses</Link></li>
                  <li><Link href="/shop?category=tops" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>Tops</Link></li>
                  <li><Link href="/shop?category=bottoms" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>Bottoms</Link></li>
                  <li><Link href="/shop?category=accessories" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>Accessories</Link></li>
                  <li><Link href="/shop?category=sale" className="block py-1 text-dark" onClick={() => setMobileMenuOpen(false)}>Sale</Link></li>
                </ul>
              </li>
              <li>
                <Link 
                  href="/about" 
                  className="block py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact" 
                  className="block py-2 border-b border-gray-100"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
          
          {/* Account links */}
          <div className="mt-8 space-y-4">
            <a href="#" className="block py-2 text-center border border-accent text-accent rounded-full font-accent">Sign In</a>
            <a href="#" className="block py-2 text-center bg-accent text-white rounded-full font-accent">Create Account</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
