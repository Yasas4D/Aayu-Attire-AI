import { useState } from "react";
import { Link } from "wouter";
import ProductCard from "@/components/ui/product-card";
import { useQuery } from "@tanstack/react-query";
import QuickViewModal from "@/components/shop/QuickViewModal";
import { Product } from "@/lib/types";

const FeaturedProducts = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isQuickViewOpen, setIsQuickViewOpen] = useState(false);

  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products?featured=true'],
  });

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  const handleQuickView = (product: Product) => {
    setSelectedProduct(product);
    setIsQuickViewOpen(true);
  };

  const handleCloseQuickView = () => {
    setIsQuickViewOpen(false);
  };

  const categories = [
    { id: "all", name: "All" },
    { id: "dresses", name: "Dresses" },
    { id: "tops", name: "Tops" },
    { id: "bottoms", name: "Bottoms" },
    { id: "accessories", name: "Accessories" },
    { id: "sale", name: "Sale" }
  ];

  const filteredProducts = products 
    ? activeCategory === "all" 
      ? products 
      : products.filter((product: Product) => product.category === activeCategory)
    : [];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-8">Featured Products</h2>
        
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max px-4">
            {categories.map(category => (
              <button
                key={category.id}
                className={`px-4 py-2 rounded-full text-sm font-accent transition ${
                  activeCategory === category.id 
                    ? "bg-accent text-white" 
                    : "bg-light text-dark hover:bg-accent hover:text-white"
                }`}
                onClick={() => handleCategoryChange(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg overflow-hidden shadow-sm p-4 h-96 animate-pulse">
                <div className="w-full h-64 bg-gray-200 mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
            {filteredProducts.map((product: Product) => (
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
            href="/shop" 
            className="inline-block px-8 py-3 border-2 border-accent text-accent font-accent font-medium rounded-full hover:bg-accent hover:text-white transition"
          >
            View All Products
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

export default FeaturedProducts;
