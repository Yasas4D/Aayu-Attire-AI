import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add first item with default size and color
    addToCart(product, 1, product.sizes[0], product.colors[0]);
  };

  return (
    <div 
      className="group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`/product/${product.id}`} className="block">
        {/* Product Image */}
        <div className="relative overflow-hidden rounded-lg aspect-[3/4] bg-gray-100">
          <img 
            src={isHovered && product.images.length > 1 ? product.images[1] : product.images[0]} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.isNew && (
              <span className="px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded">
                New
              </span>
            )}
            {product.discountPrice && (
              <span className="px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                Sale
              </span>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="absolute right-2 top-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Add to wishlist"
            >
              <Heart size={18} className="text-gray-600" />
            </button>
            <button 
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100 transition-colors"
              aria-label="Quick view"
            >
              <Eye size={18} className="text-gray-600" />
            </button>
          </div>
          
          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 text-center font-medium text-gray-900 translate-y-full group-hover:translate-y-0 transition-transform"
          >
            <div className="flex items-center justify-center gap-2">
              <ShoppingBag size={18} />
              <span>Add to Cart</span>
            </div>
          </button>
        </div>
        
        {/* Product Info */}
        <div className="mt-4">
          <div className="flex justify-between items-start">
            <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
              {product.name}
            </h3>
          </div>
          
          <div className="mt-1 flex items-center">
            {product.discountPrice ? (
              <>
                <span className="text-sm font-medium text-gray-900">${product.discountPrice}</span>
                <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
              </>
            ) : (
              <span className="text-sm font-medium text-gray-900">${product.price}</span>
            )}
          </div>
          
          {/* Color Options */}
          <div className="mt-2 flex space-x-1">
            {product.colors.slice(0, 4).map((color, index) => (
              <div 
                key={index} 
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ 
                  backgroundColor: color.toLowerCase(),
                  // For white color, add a specific border
                  border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : '1px solid transparent' 
                }}
                aria-label={`Color: ${color}`}
              />
            ))}
            {product.colors.length > 4 && (
              <div className="w-3 h-3 flex items-center justify-center text-[8px] text-gray-500">
                +{product.colors.length - 4}
              </div>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;