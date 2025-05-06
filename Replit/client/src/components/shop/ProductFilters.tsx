import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface ProductFiltersProps {
  onFilterChange: (filters: any) => void;
}

const ProductFilters = ({ onFilterChange }: ProductFiltersProps) => {
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    applyFilters({ priceRange: value });
  };

  const handleSizeToggle = (size: string) => {
    const updatedSizes = selectedSizes.includes(size)
      ? selectedSizes.filter((s) => s !== size)
      : [...selectedSizes, size];
    
    setSelectedSizes(updatedSizes);
    applyFilters({ sizes: updatedSizes });
  };

  const handleColorToggle = (color: string) => {
    const updatedColors = selectedColors.includes(color)
      ? selectedColors.filter((c) => c !== color)
      : [...selectedColors, color];
    
    setSelectedColors(updatedColors);
    applyFilters({ colors: updatedColors });
  };

  const handleCategoryToggle = (category: string) => {
    const updatedCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(updatedCategories);
    applyFilters({ categories: updatedCategories });
  };

  const applyFilters = (changedFilters: any) => {
    onFilterChange({
      priceRange: changedFilters.priceRange || priceRange,
      sizes: changedFilters.sizes || selectedSizes,
      colors: changedFilters.colors || selectedColors,
      categories: changedFilters.categories || selectedCategories
    });
  };

  const clearFilters = () => {
    setPriceRange([0, 200]);
    setSelectedSizes([]);
    setSelectedColors([]);
    setSelectedCategories([]);
    onFilterChange({
      priceRange: [0, 200],
      sizes: [],
      colors: [],
      categories: []
    });
  };

  const sizes = [
    { id: "xs", label: "XS" },
    { id: "s", label: "S" },
    { id: "m", label: "M" },
    { id: "l", label: "L" },
    { id: "xl", label: "XL" }
  ];

  const colors = [
    { id: "black", label: "Black", hex: "#000000" },
    { id: "white", label: "White", hex: "#FFFFFF" },
    { id: "blue", label: "Blue", hex: "#1E40AF" },
    { id: "green", label: "Green", hex: "#15803D" },
    { id: "red", label: "Red", hex: "#B91C1C" },
    { id: "pink", label: "Pink", hex: "#DB2777" },
    { id: "yellow", label: "Yellow", hex: "#FBBF24" }
  ];

  const categories = [
    { id: "dresses", label: "Dresses" },
    { id: "tops", label: "Tops" },
    { id: "bottoms", label: "Bottoms" },
    { id: "accessories", label: "Accessories" },
    { id: "new-arrivals", label: "New Arrivals" },
    { id: "sale", label: "Sale" }
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-heading text-lg font-semibold">Filters</h3>
        <button 
          className="text-sm text-accent hover:underline"
          onClick={clearFilters}
        >
          Clear All
        </button>
      </div>

      <Accordion type="multiple" defaultValue={["price", "category", "size", "color"]}>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base font-medium">Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="mt-2">
              <Slider
                defaultValue={[0, 200]}
                value={priceRange}
                min={0}
                max={200}
                step={10}
                onValueChange={handlePriceChange}
                className="mb-4"
              />
              <div className="flex justify-between">
                <span>${priceRange[0]}</span>
                <span>${priceRange[1]}+</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="category">
          <AccordionTrigger className="text-base font-medium">Category</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 mt-2">
              {categories.map((category) => (
                <div key={category.id} className="flex items-center space-x-2">
                  <Checkbox 
                    id={`category-${category.id}`} 
                    checked={selectedCategories.includes(category.id)}
                    onCheckedChange={() => handleCategoryToggle(category.id)}
                  />
                  <Label htmlFor={`category-${category.id}`}>{category.label}</Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="size">
          <AccordionTrigger className="text-base font-medium">Size</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-2 mt-2">
              {sizes.map((size) => (
                <div 
                  key={size.id}
                  className={`px-3 py-1 border rounded-md cursor-pointer ${
                    selectedSizes.includes(size.id) 
                      ? 'border-accent bg-accent text-white' 
                      : 'border-gray-300 hover:border-accent'
                  }`}
                  onClick={() => handleSizeToggle(size.id)}
                >
                  {size.label}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="color">
          <AccordionTrigger className="text-base font-medium">Color</AccordionTrigger>
          <AccordionContent>
            <div className="flex flex-wrap gap-3 mt-2">
              {colors.map((color) => (
                <div 
                  key={color.id}
                  className="flex flex-col items-center"
                >
                  <button
                    className={`w-8 h-8 rounded-full border-2 ${
                      selectedColors.includes(color.id) 
                        ? 'border-accent' 
                        : 'border-white hover:border-gray-300'
                    }`}
                    style={{ backgroundColor: color.hex }}
                    onClick={() => handleColorToggle(color.id)}
                    aria-label={`Select ${color.label} color`}
                  ></button>
                  <span className="text-xs mt-1">{color.label}</span>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilters;
