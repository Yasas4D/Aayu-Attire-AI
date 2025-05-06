import { useState } from "react";
import { Link } from "wouter";
import ProductCard from "@/components/ui/product-card";
import { useQuery } from "@tanstack/react-query";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { Product } from "@/lib/types";

const NewArrivalsSection = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products?category=new-arrivals'],
  });

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  return (
    <section className="py-12 md:py-16 bg-light">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold">New Arrivals</h2>
          <div className="flex mt-4 md:mt-0">
            <button className="p-2 border border-secondary rounded-l-md text-dark hover:bg-white" aria-label="Previous">
              <i className="ri-arrow-left-s-line"></i>
            </button>
            <button className="p-2 border border-secondary border-l-0 rounded-r-md text-dark hover:bg-white" aria-label="Next">
              <i className="ri-arrow-right-s-line"></i>
            </button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-96 animate-pulse">
                <div className="w-full h-64 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {products?.map((product: Product) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onQuickView={handleQuickView} 
              />
            ))}
          </div>
        )}
        
        <div className="text-center mt-8">
          <Link 
            href="/shop?category=new-arrivals" 
            className="inline-block px-8 py-3 border-2 border-accent text-accent font-accent font-medium rounded-full hover:bg-accent hover:text-white transition"
          >
            View All New Arrivals
          </Link>
        </div>
      </div>

      {isQuickViewOpen && selectedProduct && (
        <QuickViewModal 
          product={selectedProduct} 
          isOpen={isQuickViewOpen} 
          onClose={handleCloseQuickView} 
        />
      )}
    </section>
  );
};

export default NewArrivalsSection;
