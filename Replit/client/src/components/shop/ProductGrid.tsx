import { useState } from "react";
import ProductCard from "@/components/ui/product-card";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { Product } from "@/lib/types";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductGridProps {
  products: Product[];
  isLoading: boolean;
}

const ProductGrid = ({ products, isLoading }: ProductGridProps) => {
  const [sortOption, setSortOption] = useState("featured");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const handleSortChange = (value: string) => {
    setSortOption(value);
  };

  const sortProducts = (products: Product[]) => {
    if (!products) return [];
    
    switch (sortOption) {
      case "price-low-high":
        return [...products].sort((a, b) => a.price - b.price);
      case "price-high-low":
        return [...products].sort((a, b) => b.price - a.price);
      case "newest":
        return [...products].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
      case "rating":
        return [...products].sort((a, b) => b.rating - a.rating);
      case "featured":
      default:
        return products;
    }
  };

  const sortedProducts = sortProducts(products);

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div className="text-sm text-dark">
          Showing <span className="font-medium">{products?.length || 0}</span> products
        </div>
        <div className="flex items-center">
          <span className="text-sm mr-2">Sort by:</span>
          <Select onValueChange={handleSortChange} defaultValue={sortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price-low-high">Price: Low to High</SelectItem>
              <SelectItem value="price-high-low">Price: High to Low</SelectItem>
              <SelectItem value="rating">Highest Rated</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {[...Array(12)].map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-96 animate-pulse">
              <div className="w-full h-64 bg-gray-200 mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : (
        <>
          {sortedProducts.length === 0 ? (
            <div className="py-16 text-center">
              <p className="text-dark text-lg">No products found matching your criteria.</p>
              <p className="text-sm mt-2">Try adjusting your filters or search terms.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onQuickView={handleQuickView} 
                />
              ))}
            </div>
          )}
        </>
      )}

      {isQuickViewOpen && selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          isOpen={isQuickViewOpen} 
          onClose={handleCloseQuickView} 
        />
      )}
    </div>
  );
};

export default ProductGrid;
