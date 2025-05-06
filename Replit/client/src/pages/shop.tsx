import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useSearch } from "@/context/SearchContext";
import { Helmet } from "react-helmet";
import ProductFilters from "@/components/shop/ProductFilters";
import ProductGrid from "@/components/shop/ProductGrid";
import { FilterOptions } from "@/lib/types";

const Shop = () => {
  const [filters, setFilters] = useState<FilterOptions>({
    priceRange: [0, 200],
    categories: [],
    sizes: [],
    colors: []
  });
  
  const { searchQuery, setSearchQuery } = useSearch();
  const [currentSearchQuery, setCurrentSearchQuery] = useState("");
  
  // Extract search query and category from URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const searchParam = params.get("search");
    const categoryParam = params.get("category");
    
    if (searchParam) {
      setSearchQuery(searchParam);
      setCurrentSearchQuery(searchParam);
    }
    
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        categories: [categoryParam]
      }));
    }
  }, [setSearchQuery]);
  
  const { data: products, isLoading } = useQuery({
    queryKey: ['/api/products', filters, currentSearchQuery],
  });
  
  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };
  
  return (
    <>
      <Helmet>
        <title>Shop | Aayu Attire</title>
        <meta name="description" content="Browse our collection of stylish clothing and accessories. Find the perfect outfit for any occasion with our high-quality fashion items." />
      </Helmet>
      
      <div className="bg-light py-8 md:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="font-heading text-3xl md:text-4xl font-semibold text-center mb-2">
              {currentSearchQuery 
                ? `Search Results for "${currentSearchQuery}"` 
                : filters.categories.length === 1 
                  ? filters.categories[0].charAt(0).toUpperCase() + filters.categories[0].slice(1) 
                  : "Shop All Products"
              }
            </h1>
            <p className="text-dark text-center max-w-2xl mx-auto">
              Discover our carefully curated collection of modern fashion essentials designed for style and comfort.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <ProductFilters onFilterChange={handleFilterChange} />
            </div>
            
            <div className="lg:col-span-3">
              <ProductGrid products={products || []} isLoading={isLoading} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
