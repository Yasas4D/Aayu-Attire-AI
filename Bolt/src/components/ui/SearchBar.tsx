import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useSearch } from '../../context/SearchContext';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const { searchTerm, setSearchTerm, performSearch, searchResults, clearSearch } = useSearch();
  const [inputValue, setInputValue] = useState(searchTerm);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
    
    if (value.length >= 2) {
      performSearch(value);
      setShowResults(true);
    } else {
      clearSearch();
      setShowResults(false);
    }
  };

  const handleClear = () => {
    setInputValue('');
    clearSearch();
    setShowResults(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      performSearch(inputValue);
      navigate(`/shop?search=${encodeURIComponent(inputValue)}`);
      setShowResults(false);
    }
  };

  const handleResultClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setShowResults(false);
  };

  return (
    <div className="relative w-full" ref={searchRef}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="relative">
          <input
            id="search-input"
            type="text"
            placeholder="Search for products..."
            value={inputValue}
            onChange={handleInputChange}
            onFocus={() => inputValue.length >= 2 && setShowResults(true)}
            className="w-full py-2 pl-10 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
          
          {inputValue && (
            <button
              type="button"
              onClick={handleClear}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X size={18} />
            </button>
          )}
        </div>
      </form>

      {/* Search Results Dropdown */}
      {showResults && searchResults.length > 0 && (
        <div className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg max-h-96 overflow-y-auto">
          <ul>
            {searchResults.slice(0, 5).map((product) => (
              <li 
                key={product.id}
                className="p-3 hover:bg-gray-50 cursor-pointer border-b last:border-b-0"
                onClick={() => handleResultClick(product.id)}
              >
                <div className="flex items-center space-x-3">
                  <img 
                    src={product.images[0]} 
                    alt={product.name} 
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-amber-600 text-sm">
                      ${product.discountPrice || product.price}
                    </p>
                  </div>
                </div>
              </li>
            ))}
            
            {searchResults.length > 5 && (
              <li 
                className="p-3 text-center text-amber-600 hover:bg-gray-50 cursor-pointer"
                onClick={() => {
                  navigate(`/shop?search=${encodeURIComponent(inputValue)}`);
                  setShowResults(false);
                }}
              >
                View all {searchResults.length} results
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;