
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";

export interface ProductType {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  colors: string[];
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

interface ProductCardProps {
  product: ProductType;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="group">
      <div className="relative overflow-hidden rounded-md mb-3">
        {/* Product badges */}
        <div className="absolute top-2 left-2 z-10 flex flex-col gap-1">
          {product.isNew && (
            <span className="bg-aayu-accent text-white text-xs px-2 py-1 rounded">New</span>
          )}
          {product.isFeatured && (
            <span className="bg-aayu-primary text-white text-xs px-2 py-1 rounded">Featured</span>
          )}
        </div>
        
        {/* Product image */}
        <Link to={`/product/${product.id}`} className="block">
          <div className="aspect-[3/4] relative bg-gray-100 rounded-md overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500"
            />
          </div>
        </Link>
        
        {/* Quick actions */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center p-3 translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
          <div className="flex gap-2 bg-white p-1 rounded-md shadow">
            <Button variant="outline" size="icon" aria-label="Add to wishlist">
              <Heart className="h-4 w-4" />
            </Button>
            <Button aria-label="Add to cart" className="bg-aayu-primary hover:bg-aayu-primary/90">
              <ShoppingCart className="h-4 w-4 mr-2" />
              <span>Add to Cart</span>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product info */}
      <div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-aayu-secondary hover:text-aayu-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex justify-between items-center mt-1">
          <p className="text-aayu-muted text-sm">{product.category}</p>
          <p className="font-medium">${product.price.toFixed(2)}</p>
        </div>
        
        {/* Color options */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex mt-2 space-x-1">
            {product.colors.map((color) => (
              <div
                key={color}
                className="w-3 h-3 rounded-full border border-gray-300"
                style={{ backgroundColor: color }}
                aria-label={`Color: ${color}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
