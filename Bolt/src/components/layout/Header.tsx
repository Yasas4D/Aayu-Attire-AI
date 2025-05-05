import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useSearch } from '../../context/SearchContext';
import SearchBar from '../ui/SearchBar';
import MobileMenu from './MobileMenu';

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { searchTerm, performSearch, clearSearch } = useSearch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    if (!isSearchOpen) {
      setTimeout(() => {
        document.getElementById('search-input')?.focus();
      }, 100);
    } else {
      clearSearch();
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-semibold tracking-tight">
          Aayu Attire
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-sm font-medium hover:text-amber-600 transition-colors">
            Home
          </Link>
          <Link to="/shop" className="text-sm font-medium hover:text-amber-600 transition-colors">
            Shop
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-amber-600 transition-colors">
            About Us
          </Link>
          <Link to="/contact" className="text-sm font-medium hover:text-amber-600 transition-colors">
            Contact
          </Link>
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <button 
            onClick={toggleSearch}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Search"
          >
            <Search size={20} />
          </button>
          
          <Link 
            to="/wishlist" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            aria-label="Wishlist"
          >
            <Heart size={20} />
          </Link>
          
          <Link 
            to="/account" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors hidden sm:block"
            aria-label="Account"
          >
            <User size={20} />
          </Link>
          
          <Link 
            to="/cart" 
            className="p-2 rounded-full hover:bg-gray-100 transition-colors relative"
            aria-label="Cart"
          >
            <ShoppingBag size={20} />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-amber-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {itemCount}
              </span>
            )}
          </Link>
          
          <button 
            onClick={toggleMobileMenu}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors md:hidden"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-md p-4 animate-fadeDown">
          <SearchBar />
        </div>
      )}

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
    </header>
  );
};

export default Header;