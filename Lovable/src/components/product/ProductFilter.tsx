
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FilterOptionsType {
  categories: string[];
  colors: { name: string; value: string }[];
  sizes: string[];
  priceRange: [number, number];
}

interface ProductFilterProps {
  options: FilterOptionsType;
  onFilterChange: (filters: Record<string, any>) => void;
  className?: string;
}

const ProductFilter = ({ 
  options, 
  onFilterChange,
  className 
}: ProductFilterProps) => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    search: "",
    categories: [] as string[],
    colors: [] as string[],
    sizes: [] as string[],
    price: options.priceRange,
    sortBy: "newest"
  });
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newFilters = { ...filters, search: e.target.value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleCategoryChange = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category];
      
    const newFilters = { ...filters, categories: newCategories };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleColorChange = (color: string) => {
    const newColors = filters.colors.includes(color)
      ? filters.colors.filter(c => c !== color)
      : [...filters.colors, color];
      
    const newFilters = { ...filters, colors: newColors };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSizeChange = (size: string) => {
    const newSizes = filters.sizes.includes(size)
      ? filters.sizes.filter(s => s !== size)
      : [...filters.sizes, size];
      
    const newFilters = { ...filters, sizes: newSizes };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handlePriceChange = (value: number[]) => {
    const newFilters = { ...filters, price: [value[0], value[1]] as [number, number] };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const handleSortChange = (value: string) => {
    const newFilters = { ...filters, sortBy: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  const clearAllFilters = () => {
    const newFilters = {
      search: "",
      categories: [],
      colors: [],
      sizes: [],
      price: options.priceRange,
      sortBy: "newest"
    };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };
  
  // Count active filters to show badge
  const activeFiltersCount = [
    filters.categories.length > 0,
    filters.colors.length > 0,
    filters.sizes.length > 0,
    filters.price[0] !== options.priceRange[0] || filters.price[1] !== options.priceRange[1]
  ].filter(Boolean).length;
  
  return (
    <div className={cn("mb-6", className)}>
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <div className="relative w-full md:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-aayu-muted" />
          <Input
            type="search"
            placeholder="Search products..."
            value={filters.search}
            onChange={handleSearchChange}
            className="pl-10"
          />
        </div>
        
        <div className="flex gap-2 self-start md:self-auto">
          <Select value={filters.sortBy} onValueChange={handleSortChange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="price_low_high">Price: Low to High</SelectItem>
              <SelectItem value="price_high_low">Price: High to Low</SelectItem>
              <SelectItem value="name_asc">Name: A to Z</SelectItem>
              <SelectItem value="name_desc">Name: Z to A</SelectItem>
            </SelectContent>
          </Select>
          
          <Button
            variant="outline"
            size="icon"
            className="md:hidden relative"
            onClick={() => setMobileFiltersOpen(true)}
          >
            <SlidersHorizontal className="h-4 w-4" />
            {activeFiltersCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-aayu-primary text-white text-xs flex items-center justify-center">
                {activeFiltersCount}
              </span>
            )}
          </Button>
        </div>
      </div>
      
      {/* Desktop filters */}
      <div className="hidden md:block">
        <div className="grid grid-cols-4 gap-6">
          {/* Categories */}
          <div>
            <h3 className="font-medium mb-3">Categories</h3>
            <div className="space-y-2">
              {options.categories.map(category => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category}`} 
                    checked={filters.categories.includes(category)}
                    onCheckedChange={() => handleCategoryChange(category)}
                  />
                  <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          {/* Colors */}
          <div>
            <h3 className="font-medium mb-3">Colors</h3>
            <div className="space-y-2">
              {options.colors.map(color => (
                <div key={color.value} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`color-${color.value}`}
                    checked={filters.colors.includes(color.value)}
                    onCheckedChange={() => handleColorChange(color.value)}
                  />
                  <div className="flex items-center">
                    <span 
                      className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                      style={{ backgroundColor: color.value }}
                    ></span>
                    <Label htmlFor={`color-${color.value}`} className="text-sm cursor-pointer">
                      {color.name}
                    </Label>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Sizes */}
          <div>
            <h3 className="font-medium mb-3">Sizes</h3>
            <div className="grid grid-cols-4 gap-2">
              {options.sizes.map(size => (
                <div 
                  key={size}
                  onClick={() => handleSizeChange(size)}
                  className={cn(
                    "cursor-pointer border rounded flex items-center justify-center h-9 text-sm",
                    filters.sizes.includes(size) 
                      ? "bg-aayu-primary text-white border-aayu-primary" 
                      : "border-gray-300 hover:border-aayu-primary"
                  )}
                >
                  {size}
                </div>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div>
            <h3 className="font-medium mb-3">Price Range</h3>
            <div className="px-2">
              <Slider 
                defaultValue={[filters.price[0], filters.price[1]]}
                min={options.priceRange[0]}
                max={options.priceRange[1]}
                step={10}
                onValueChange={handlePriceChange}
                className="mb-6"
              />
              <div className="flex items-center justify-between">
                <span>${filters.price[0]}</span>
                <span>${filters.price[1]}</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6">
          {(filters.categories.length > 0 || 
           filters.colors.length > 0 || 
           filters.sizes.length > 0 ||
           filters.price[0] !== options.priceRange[0] || 
           filters.price[1] !== options.priceRange[1]) && (
            <Button
              variant="outline"
              size="sm"
              onClick={clearAllFilters}
              className="text-aayu-muted"
            >
              Clear all filters
              <X className="ml-2 h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {/* Mobile filter sidebar */}
      <div 
        className={cn(
          "fixed inset-0 bg-black bg-opacity-50 z-50 md:hidden transition-opacity",
          mobileFiltersOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={() => setMobileFiltersOpen(false)}
      >
        <div 
          className={cn(
            "fixed right-0 top-0 h-full w-[80%] max-w-sm bg-white p-6 overflow-y-auto transition-transform",
            mobileFiltersOpen ? "translate-x-0" : "translate-x-full"
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-medium">Filters</h2>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setMobileFiltersOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          
          <Accordion type="multiple" className="w-full">
            <AccordionItem value="categories">
              <AccordionTrigger>Categories</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {options.categories.map(category => (
                    <div key={category} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-category-${category}`}
                        checked={filters.categories.includes(category)}
                        onCheckedChange={() => handleCategoryChange(category)}
                      />
                      <Label htmlFor={`mobile-category-${category}`} className="text-sm cursor-pointer">
                        {category}
                      </Label>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="colors">
              <AccordionTrigger>Colors</AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2">
                  {options.colors.map(color => (
                    <div key={color.value} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`mobile-color-${color.value}`}
                        checked={filters.colors.includes(color.value)}
                        onCheckedChange={() => handleColorChange(color.value)}
                      />
                      <div className="flex items-center">
                        <span 
                          className="w-4 h-4 rounded-full border border-gray-300 mr-2"
                          style={{ backgroundColor: color.value }}
                        ></span>
                        <Label htmlFor={`mobile-color-${color.value}`} className="text-sm cursor-pointer">
                          {color.name}
                        </Label>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="sizes">
              <AccordionTrigger>Sizes</AccordionTrigger>
              <AccordionContent>
                <div className="grid grid-cols-4 gap-2">
                  {options.sizes.map(size => (
                    <div 
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={cn(
                        "cursor-pointer border rounded flex items-center justify-center h-9 text-sm",
                        filters.sizes.includes(size) 
                          ? "bg-aayu-primary text-white border-aayu-primary" 
                          : "border-gray-300 hover:border-aayu-primary"
                      )}
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="price">
              <AccordionTrigger>Price Range</AccordionTrigger>
              <AccordionContent>
                <div className="px-2">
                  <Slider 
                    defaultValue={[filters.price[0], filters.price[1]]}
                    min={options.priceRange[0]}
                    max={options.priceRange[1]}
                    step={10}
                    onValueChange={handlePriceChange}
                    className="mb-6"
                  />
                  <div className="flex items-center justify-between">
                    <span>${filters.price[0]}</span>
                    <span>${filters.price[1]}</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
          
          <div className="mt-8 flex flex-col gap-3">
            <Button onClick={() => setMobileFiltersOpen(false)}>
              Apply Filters
            </Button>
            <Button variant="outline" onClick={clearAllFilters}>
              Clear Filters
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
