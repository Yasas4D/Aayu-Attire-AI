import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, X } from 'lucide-react';
import ProductGrid from '../components/shop/ProductGrid';
import ProductFilters from '../components/shop/ProductFilters';
import { products, getCategories } from '../data/products';
import { Product, SortOption } from '../types';

// Define filter groups
const createFilterGroups = () => {
  // Get unique categories, colors, and sizes
  const allCategories = getCategories();
  const allColors = [...new Set(products.flatMap(product => product.colors))];
  const allSizes = [...new Set(products.flatMap(product => product.sizes))];

  return [
    {
      id: 'categories',
      name: 'Categories',
      options: allCategories.map(cat => ({ value: cat, label: cat }))
    },
    {
      id: 'colors',
      name: 'Colors',
      options: allColors.map(color => ({ value: color, label: color }))
    },
    {
      id: 'sizes',
      name: 'Sizes',
      options: allSizes.map(size => ({ value: size, label: size }))
    },
    {
      id: 'price',
      name: 'Price Range',
      options: [
        { value: 'under-50', label: 'Under $50' },
        { value: '50-100', label: '$50 - $100' },
        { value: '100-200', label: '$100 - $200' },
        { value: 'over-200', label: 'Over $200' }
      ]
    }
  ];
};

const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [sortOption, setSortOption] = useState<SortOption>('newest');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const filterGroups = createFilterGroups();

  // Initialize filters from URL
  useEffect(() => {
    const newFilters: Record<string, string[]> = {};
    
    // Parse category from URL
    const category = searchParams.get('category');
    if (category) {
      newFilters.categories = [category];
    }
    
    // Parse search query from URL
    const search = searchParams.get('search');
    if (search) {
      // Just store the search term, we'll use it in filtering
      newFilters.search = [search];
    }
    
    setActiveFilters(newFilters);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    setIsLoading(true);
    
    // Simulate network request
    setTimeout(() => {
      let result = [...products];
      
      // Apply category filter
      if (activeFilters.categories?.length) {
        result = result.filter(product => 
          activeFilters.categories.some(cat => product.categories.includes(cat))
        );
      }
      
      // Apply color filter
      if (activeFilters.colors?.length) {
        result = result.filter(product => 
          activeFilters.colors.some(color => product.colors.includes(color))
        );
      }
      
      // Apply size filter
      if (activeFilters.sizes?.length) {
        result = result.filter(product => 
          activeFilters.sizes.some(size => product.sizes.includes(size))
        );
      }
      
      // Apply price filter
      if (activeFilters.price?.length) {
        result = result.filter(product => {
          const price = product.discountPrice || product.price;
          return activeFilters.price.some(priceRange => {
            switch (priceRange) {
              case 'under-50': return price < 50;
              case '50-100': return price >= 50 && price < 100;
              case '100-200': return price >= 100 && price < 200;
              case 'over-200': return price >= 200;
              default: return true;
            }
          });
        });
      }
      
      // Apply search filter
      if (activeFilters.search?.length) {
        const searchTerm = activeFilters.search[0].toLowerCase();
        result = result.filter(product => 
          product.name.toLowerCase().includes(searchTerm) ||
          product.description.toLowerCase().includes(searchTerm) ||
          product.categories.some(cat => cat.toLowerCase().includes(searchTerm))
        );
      }
      
      // Apply sorting
      result = sortProducts(result, sortOption);
      
      setFilteredProducts(result);
      setIsLoading(false);
    }, 500);
  }, [activeFilters, sortOption]);

  const sortProducts = (products: Product[], option: SortOption) => {
    return [...products].sort((a, b) => {
      const priceA = a.discountPrice || a.price;
      const priceB = b.discountPrice || b.price;
      
      switch (option) {
        case 'price-low-to-high':
          return priceA - priceB;
        case 'price-high-to-low':
          return priceB - priceA;
        case 'newest':
          return a.isNew ? -1 : b.isNew ? 1 : 0;
        case 'popular':
          return a.isFeatured ? -1 : b.isFeatured ? 1 : 0;
        default:
          return 0;
      }
    });
  };

  const handleFilterChange = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      
      if (!newFilters[filterType]) {
        newFilters[filterType] = [];
      }
      
      // Toggle the filter value
      if (newFilters[filterType].includes(value)) {
        newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
        if (newFilters[filterType].length === 0) {
          delete newFilters[filterType];
        }
      } else {
        newFilters[filterType].push(value);
      }
      
      return newFilters;
    });
  };

  const handleClearFilters = () => {
    // Preserve search if it exists
    const searchTerm = activeFilters.search?.[0];
    setActiveFilters(searchTerm ? { search: [searchTerm] } : {});
  };

  const handleClearFilter = (filterType: string, value: string) => {
    setActiveFilters(prev => {
      const newFilters = { ...prev };
      newFilters[filterType] = newFilters[filterType].filter(v => v !== value);
      
      if (newFilters[filterType].length === 0) {
        delete newFilters[filterType];
      }
      
      return newFilters;
    });
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value as SortOption);
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {activeFilters.categories?.[0] ? `${activeFilters.categories[0]} Collection` : 
             activeFilters.search?.[0] ? `Search Results for "${activeFilters.search[0]}"` : 
             "All Products"}
          </h1>
          <p className="text-gray-600">
            Discover our collection of high-quality, handcrafted clothing
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters (Desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <ProductFilters 
              filters={filterGroups}
              activeFilters={activeFilters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              onClearFilter={handleClearFilter}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Sort and Filter Controls */}
            <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
              <div className="flex items-center">
                <p className="text-sm text-gray-500 mr-2">
                  Showing {filteredProducts.length} results
                </p>
              </div>
              
              <div className="flex items-center gap-4">
                {/* Mobile Filter Button */}
                <button 
                  onClick={() => setIsFilterOpen(true)}
                  className="lg:hidden flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium"
                >
                  <Filter size={16} className="mr-2" />
                  Filters
                </button>
                
                {/* Sort Dropdown */}
                <div className="flex items-center">
                  <label htmlFor="sort" className="text-sm text-gray-500 mr-2 hidden sm:inline">
                    Sort by:
                  </label>
                  <select
                    id="sort"
                    value={sortOption}
                    onChange={handleSortChange}
                    className="border border-gray-300 rounded-lg text-sm p-2 pr-8 focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  >
                    <option value="newest">Newest</option>
                    <option value="popular">Popular</option>
                    <option value="price-low-to-high">Price: Low to High</option>
                    <option value="price-high-to-low">Price: High to Low</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Active Filters Pills (Mobile and Desktop) */}
            {Object.keys(activeFilters).length > 0 && 
             Object.keys(activeFilters).filter(key => key !== 'search').length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {Object.entries(activeFilters).map(([type, values]) => 
                  type !== 'search' && values.map(value => (
                    <button
                      key={`${type}-${value}`}
                      onClick={() => handleClearFilter(type, value)}
                      className="flex items-center gap-1 px-3 py-1 bg-amber-50 border border-amber-200 rounded-full text-amber-700 text-sm hover:bg-amber-100"
                    >
                      <span>{value}</span>
                      <X size={14} />
                    </button>
                  ))
                )}
                
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-1 px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-600 text-sm hover:bg-gray-200"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Products Grid */}
            <ProductGrid products={filteredProducts} isLoading={isLoading} />
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div 
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsFilterOpen(false)}
          ></div>
          
          {/* Drawer */}
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl overflow-hidden">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center">
              <h2 className="text-lg font-medium flex items-center">
                <SlidersHorizontal size={18} className="mr-2" />
                Filters
              </h2>
              <button 
                onClick={() => setIsFilterOpen(false)}
                className="p-2 rounded-full hover:bg-gray-100"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="h-full overflow-y-auto pb-20">
              <ProductFilters 
                filters={filterGroups}
                activeFilters={activeFilters}
                onFilterChange={handleFilterChange}
                onClearFilters={handleClearFilters}
                onClearFilter={handleClearFilter}
                isMobile={true}
                onClose={() => setIsFilterOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default ShopPage;