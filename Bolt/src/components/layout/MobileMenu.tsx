import React from 'react';
import { Link } from 'react-router-dom';
import { X, User, Heart, ShoppingBag, Info, Contact, Home, ShoppingCart } from 'lucide-react';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden">
      <div className="absolute right-0 top-0 h-full w-4/5 max-w-sm bg-white shadow-lg transform transition-transform duration-300 ease-in-out">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">Menu</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>
        
        <nav className="p-4">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <Home size={20} />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/shop"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <ShoppingCart size={20} />
                <span>Shop</span>
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <Info size={20} />
                <span>About Us</span>
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <Contact size={20} />
                <span>Contact</span>
              </Link>
            </li>
          </ul>
          
          <div className="border-t my-4"></div>
          
          <ul className="space-y-4">
            <li>
              <Link
                to="/account"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <User size={20} />
                <span>My Account</span>
              </Link>
            </li>
            <li>
              <Link
                to="/wishlist"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <Heart size={20} />
                <span>Wishlist</span>
              </Link>
            </li>
            <li>
              <Link
                to="/cart"
                className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                onClick={onClose}
              >
                <ShoppingBag size={20} />
                <span>Shopping Bag</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;