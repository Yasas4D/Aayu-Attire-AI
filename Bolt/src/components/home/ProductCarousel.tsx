import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getNewArrivals } from '../../data/products';
import ProductCard from '../shop/ProductCard';

const ProductCarousel: React.FC = () => {
  const newArrivals = getNewArrivals();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(4);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setSlidesToShow(1);
      } else if (window.innerWidth < 1024) {
        setSlidesToShow(2);
      } else if (window.innerWidth < 1280) {
        setSlidesToShow(3);
      } else {
        setSlidesToShow(4);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePrev = () => {
    setCurrentIndex(prev => 
      prev > 0 ? prev - 1 : 0
    );
  };

  const handleNext = () => {
    setCurrentIndex(prev => 
      prev < newArrivals.length - slidesToShow ? prev + 1 : prev
    );
  };

  const canGoNext = currentIndex < newArrivals.length - slidesToShow;
  const canGoPrev = currentIndex > 0;

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">New Arrivals</h2>
        <p className="text-gray-600 text-center mb-10">Fresh styles to elevate your wardrobe</p>

        <div className="relative">
          {/* Carousel Navigation */}
          <button 
            onClick={handlePrev}
            disabled={!canGoPrev}
            className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all ${
              !canGoPrev ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          {/* Carousel Container */}
          <div className="overflow-hidden mx-10" ref={carouselRef}>
            <div 
              className="flex transition-transform duration-300 ease-out"
              style={{ transform: `translateX(-${currentIndex * (100 / slidesToShow)}%)` }}
            >
              {newArrivals.map(product => (
                <div 
                  key={product.id} 
                  className="px-2"
                  style={{ flex: `0 0 ${100 / slidesToShow}%` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
          </div>
          
          <button 
            onClick={handleNext}
            disabled={!canGoNext}
            className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white p-2 rounded-full shadow-md hover:shadow-lg transition-all ${
              !canGoNext ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
            }`}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;