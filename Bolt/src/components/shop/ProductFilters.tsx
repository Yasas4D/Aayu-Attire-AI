import React, { useState } from 'react';
import { X, ChevronDown, ChevronUp } from 'lucide-react';

interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

interface FilterGroup {
  id: string;
  name: string;
  options: FilterOption[];
}

interface ProductFiltersProps {
  filters: FilterGroup[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string) => void;
  onClearFilters: () => void;
  onClearFilter: (filterType: string, value: string) => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const ProductFilters: React.FC<ProductFiltersProps> = ({
  filters,
  activeFilters,
  onFilterChange,
  onClearFilters,
  onClearFilter,
  isMobile = false,
  onClose
}) => {
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    Object.fromEntries(filters.map(filter => [filter.id, true]))
  );

  const toggleSection = (id: string) => {
    setOpenSections(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters).reduce((total, values) => total + values.length, 0);
  };

  return (
    <div className={`${isMobile ? 'h-full flex flex-col' : ''}`}>
      {/* Header with title and clear all button */}
      <div className="flex items-center justify-between pb-4 border-b border-gray-200">
        <h2 className="text-lg font-medium">Filters</h2>
        <div className="flex items-center gap-4">
          {getActiveFilterCount() > 0 && (
            <button 
              onClick={onClearFilters}
              className="text-sm text-gray-500 hover:text-amber-600"
            >
              Clear all
            </button>
          )}
          {isMobile && onClose && (
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-100">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Active filters */}
      {getActiveFilterCount() > 0 && (
        <div className="py-4 border-b border-gray-200">
          <h3 className="text-sm font-medium mb-2">Active Filters:</h3>
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters).map(([type, values]) =>
              values.map(value => (
                <button
                  key={`${type}-${value}`}
                  onClick={() => onClearFilter(type, value)}
                  className="flex items-center gap-1 px-2 py-1 text-sm bg-gray-100 rounded-full hover:bg-gray-200"
                >
                  <span>{value}</span>
                  <X size={14} />
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Filter groups */}
      <div className={`space-y-6 ${isMobile ? 'flex-1 overflow-y-auto py-4' : 'py-4'}`}>
        {filters.map((filter) => (
          <div key={filter.id} className="border-b border-gray-200 pb-6 last:border-0">
            <button
              className="flex w-full items-center justify-between py-2 text-sm font-medium"
              onClick={() => toggleSection(filter.id)}
            >
              {filter.name}
              {openSections[filter.id] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {openSections[filter.id] && (
              <div className="mt-2 space-y-1">
                {filter.options.map((option) => {
                  const isActive = activeFilters[filter.id]?.includes(option.value);
                  
                  return (
                    <div key={option.value} className="flex items-center">
                      <input
                        id={`filter-${filter.id}-${option.value}`}
                        type="checkbox"
                        checked={isActive}
                        onChange={() => onFilterChange(filter.id, option.value)}
                        className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500"
                      />
                      <label
                        htmlFor={`filter-${filter.id}-${option.value}`}
                        className="ml-3 text-sm text-gray-600"
                      >
                        {option.label}
                        {option.count !== undefined && (
                          <span className="ml-1 text-gray-400">({option.count})</span>
                        )}
                      </label>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </div>
      
      {/* Mobile footer with apply button */}
      {isMobile && (
        <div className="border-t border-gray-200 p-4 mt-auto">
          <button
            onClick={onClose}
            className="w-full py-2 px-4 bg-amber-600 hover:bg-amber-700 text-white rounded-lg"
          >
            Apply Filters
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductFilters;