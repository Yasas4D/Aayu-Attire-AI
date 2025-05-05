import React, { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const heroSlides = [
  {
    id: 1,
    title: "Elevate Your Style",
    subtitle: "Discover our latest collection of premium fashion",
    cta: "Shop New Arrivals",
    background: "https://images.pexels.com/photos/5995206/pexels-photo-5995206.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=new-arrivals"
  },
  {
    id: 2,
    title: "Traditional Elegance",
    subtitle: "Handcrafted designs with authentic Indian artistry",
    cta: "Explore Traditional Wear",
    background: "https://images.pexels.com/photos/7679720/pexels-photo-7679720.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=Traditional"
  },
  {
    id: 3,
    title: "Modern Essentials",
    subtitle: "Contemporary styles for the fashion-forward",
    cta: "View Collection",
    background: "https://images.pexels.com/photos/5384423/pexels-photo-5384423.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=Casual"
  }
];

const HeroSection: React.FC = () => {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev === heroSlides.length - 1 ? 0 : prev + 1));
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Hero Images */}
      {heroSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === activeSlide ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${slide.background})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      ))}

      {/* Hero Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white p-4">
        <div className="max-w-3xl animate-fadeIn">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
            {heroSlides[activeSlide].title}
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-xl mx-auto">
            {heroSlides[activeSlide].subtitle}
          </p>
          <Link
            to={heroSlides[activeSlide].link}
            className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors group"
          >
            {heroSlides[activeSlide].cta}
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
          </Link>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === activeSlide
                ? 'bg-white w-10'
                : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSection;