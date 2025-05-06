import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

const ProductCard = ({ product, onQuickView }: ProductCardProps) => {
  const { addToCart } = useCart();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow product-card group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-product-id={product.id}
    >
      <div className="relative overflow-hidden">
        <Link href={`/product/${product.id}`}>
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-64 md:h-72 object-cover object-center"
          />
        </Link>
        <div className="quick-view absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 transition-opacity">
          <button 
            className="px-4 py-2 bg-white text-primary font-accent text-sm rounded-full hover:bg-accent hover:text-white transition"
            onClick={() => onQuickView(product)}
          >
            Quick View
          </button>
        </div>
        <div className="absolute top-3 right-3 flex flex-col gap-2">
          <button 
            className="bg-white rounded-full p-2 shadow-sm hover:bg-accent hover:text-white transition" 
            aria-label="Add to wishlist"
          >
            <i className="ri-heart-line"></i>
          </button>
        </div>
        {product.isNew && (
          <div className="absolute top-4 left-4">
            <span className="bg-accent text-white text-xs font-accent px-2 py-1 rounded">NEW</span>
          </div>
        )}
        {product.isSale && (
          <div className="absolute top-4 left-4">
            <span className="bg-error text-white text-xs font-accent px-2 py-1 rounded">SALE</span>
          </div>
        )}
        {product.isBestSeller && (
          <div className="absolute top-4 left-4">
            <span className="bg-dark text-white text-xs font-accent px-2 py-1 rounded">BEST SELLER</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <h3 className="font-medium mb-1 text-sm md:text-base">{product.name}</h3>
        </Link>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-accent">${product.price.toFixed(2)}</p>
            {product.comparePrice && (
              <p className="text-dark line-through text-sm">${product.comparePrice.toFixed(2)}</p>
            )}
          </div>
          <div className="flex gap-1">
            {[...Array(5)].map((_, i) => {
              const ratingValue = i + 1;
              return (
                <i 
                  key={i}
                  className={`${
                    ratingValue <= Math.floor(product.rating) 
                      ? "ri-star-fill" 
                      : ratingValue <= product.rating 
                      ? "ri-star-half-fill" 
                      : "ri-star-line"
                  } text-yellow-400 text-sm`}
                ></i>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
