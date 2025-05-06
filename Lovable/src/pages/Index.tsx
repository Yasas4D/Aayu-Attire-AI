
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroCarousel from "@/components/product/HeroCarousel";
import ProductCarousel from "@/components/product/ProductCarousel";
import { heroSlides, getFeaturedProducts, getNewArrivals } from "@/data/products";

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newArrivals, setNewArrivals] = useState([]);
  
  useEffect(() => {
    // In a real app, this would be an API call
    setFeaturedProducts(getFeaturedProducts());
    setNewArrivals(getNewArrivals());
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Carousel */}
        <section>
          <HeroCarousel slides={heroSlides} />
        </section>
        
        {/* Categories */}
        <section className="section-padding">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-sans font-semibold text-center mb-10">
              Shop by Category
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {["Dresses", "Tops", "Bottoms", "Outerwear"].map((category) => (
                <div 
                  key={category}
                  className="aspect-square relative group overflow-hidden rounded-md"
                >
                  <img 
                    src={`https://source.unsplash.com/featured/?${category.toLowerCase()},fashion`}
                    alt={category} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-25 flex items-center justify-center">
                    <Link 
                      to={`/shop?category=${category}`} 
                      className="px-6 py-2 bg-white text-aayu-secondary font-medium hover:bg-aayu-primary hover:text-white transition-colors"
                    >
                      {category}
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Products */}
        <section className="section-padding bg-gray-50">
          <div className="container-custom">
            <ProductCarousel 
              title="Featured Collection" 
              products={featuredProducts}
            />
            <div className="text-center mt-10">
              <Button asChild className="bg-aayu-primary hover:bg-opacity-90">
                <Link to="/shop">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* New Arrivals */}
        <section className="section-padding">
          <div className="container-custom">
            <ProductCarousel 
              title="New Arrivals" 
              products={newArrivals}
            />
            <div className="text-center mt-10">
              <Button asChild variant="outline" className="border-aayu-secondary hover:bg-aayu-primary hover:text-white hover:border-aayu-primary">
                <Link to="/shop">Explore All</Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Feature Banner */}
        <section className="py-16 bg-aayu-light">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14"></path>
                    <path d="M12 5l7 7-7 7"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Free Shipping</h3>
                <p className="text-aayu-muted">Free shipping on all orders over $100</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M12 6v6l4 2"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">24/7 Support</h3>
                <p className="text-aayu-muted">Our support team is here to help</p>
              </div>
              
              <div className="flex flex-col items-center text-center p-6">
                <div className="w-16 h-16 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-2">Sustainable Materials</h3>
                <p className="text-aayu-muted">Eco-friendly production practices</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Email Signup */}
        <section className="section-padding bg-aayu-secondary text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-sans font-semibold mb-3">
                Stay Updated
              </h2>
              <p className="text-gray-300 mb-6">
                Subscribe to our newsletter for exclusive offers, updates on new arrivals, and style inspiration.
              </p>
              <div className="flex flex-col md:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-aayu-accent"
                />
                <Button className="bg-aayu-accent hover:bg-aayu-accent/90 text-white px-6">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
