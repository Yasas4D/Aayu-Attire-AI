
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import ProductCard, { ProductType } from "./ProductCard";

interface ProductCarouselProps {
  title: string;
  products: ProductType[];
}

const ProductCarousel = ({ title, products }: ProductCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const itemsToShow = useIsMobile() ? 1 : useIsTablet() ? 2 : 4;
  
  const nextSlide = () => {
    const maxIndex = Math.ceil(products.length / itemsToShow) - 1;
    setActiveIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.ceil(products.length / itemsToShow) - 1;
    setActiveIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
  };
  
  // Scroll carousel when activeIndex changes
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: activeIndex * scrollRef.current.clientWidth,
        behavior: "smooth",
      });
    }
  }, [activeIndex]);
  
  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl md:text-3xl font-sans font-semibold">{title}</h2>
        <div className="flex space-x-2">
          <Button 
            variant="outline" 
            size="icon"
            onClick={prevSlide}
            aria-label="Previous slide"
            className="border-aayu-secondary hover:bg-aayu-primary hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={nextSlide}
            aria-label="Next slide"
            className="border-aayu-secondary hover:bg-aayu-primary hover:text-white"
          >
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <div 
        ref={scrollRef}
        className="flex overflow-x-hidden scroll-smooth"
      >
        {products.map((product, idx) => (
          <div 
            key={product.id}
            className="w-full sm:w-1/2 lg:w-1/4 flex-shrink-0 px-3" 
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
};

// Helper hooks for responsive design
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  return isMobile;
}

function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);
  
  useEffect(() => {
    const checkIfTablet = () => {
      setIsTablet(window.innerWidth >= 640 && window.innerWidth < 1024);
    };
    
    checkIfTablet();
    window.addEventListener("resize", checkIfTablet);
    return () => window.removeEventListener("resize", checkIfTablet);
  }, []);
  
  return isTablet;
}

export default ProductCarousel;
