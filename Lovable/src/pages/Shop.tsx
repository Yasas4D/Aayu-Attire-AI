
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCard, { ProductType } from "@/components/product/ProductCard";
import ProductFilter from "@/components/product/ProductFilter";
import { filterProducts, filterOptions } from "@/data/products";
import { useToast } from "@/components/ui/use-toast";

const Shop = () => {
  const location = useLocation();
  const { toast } = useToast();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  
  const [products, setProducts] = useState<ProductType[]>([]);
  const [filters, setFilters] = useState({
    search: "",
    categories: categoryParam ? [categoryParam] : [],
    colors: [],
    sizes: [],
    price: filterOptions.priceRange,
    sortBy: "newest"
  });
  
  useEffect(() => {
    // In a real app, this would be an API call with filters
    const filteredProducts = filterProducts(filters);
    setProducts(filteredProducts);
    
    // Show toast when filtering by category from homepage
    if (categoryParam && filters.categories.includes(categoryParam)) {
      toast({
        title: "Category Selected",
        description: `Showing products in ${categoryParam} category`,
      });
    }
  }, [filters, categoryParam]);
  
  const handleFilterChange = (newFilters: Record<string, any>) => {
    setFilters(newFilters);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-aayu-light py-12">
          <div className="container-custom">
            <h1 className="text-3xl md:text-4xl font-sans font-semibold text-center">
              Our Collection
            </h1>
          </div>
        </section>
        
        {/* Products Grid */}
        <section className="section-padding">
          <div className="container-custom">
            <ProductFilter 
              options={filterOptions}
              onFilterChange={handleFilterChange}
            />
            
            {products.length === 0 ? (
              <div className="text-center py-12">
                <h3 className="text-xl font-medium mb-2">No Products Found</h3>
                <p className="text-aayu-muted">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shop;
