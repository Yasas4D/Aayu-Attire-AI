import { Link } from "wouter";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      {/* A fashion model in a stylish outfit against a minimalist background */}
      <div 
        className="h-[70vh] bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80')" 
        }}
      >
        <div className="absolute inset-0 bg-primary bg-opacity-30"></div>
        <div className="container mx-auto px-4 h-full flex items-center relative">
          <div className="max-w-lg text-white">
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-4">New Summer Collection</h1>
            <p className="text-lg mb-8">Discover our latest styles designed for comfort and elegance.</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/shop" 
                className="px-8 py-3 bg-accent text-white font-accent font-medium rounded-full inline-block text-center hover:bg-opacity-90 transition"
              >
                Shop Now
              </Link>
              <Link 
                href="/about" 
                className="px-8 py-3 bg-white text-primary font-accent font-medium rounded-full inline-block text-center hover:bg-opacity-90 transition"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Carousel indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
        <button className="h-2 w-8 bg-accent rounded-full" aria-label="Slide 1"></button>
        <button className="h-2 w-2 bg-white bg-opacity-50 rounded-full" aria-label="Slide 2"></button>
        <button className="h-2 w-2 bg-white bg-opacity-50 rounded-full" aria-label="Slide 3"></button>
      </div>
    </section>
  );
};

export default HeroSection;
