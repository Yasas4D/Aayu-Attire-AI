import { Link } from "wouter";

const PromoBanner = () => {
  return (
    <section className="py-12 md:py-24 relative">
      {/* Modern fashion retail interior with clothing displays */}
      <div 
        className="absolute inset-0 bg-cover bg-center" 
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')",
          filter: "brightness(0.7)"
        }}
      ></div>
      <div className="container mx-auto px-4 relative">
        <div className="bg-white bg-opacity-90 rounded-lg shadow-lg p-8 md:p-12 max-w-xl md:ml-auto">
          <h2 className="font-heading text-3xl md:text-4xl font-semibold mb-4">Summer Sale</h2>
          <p className="text-dark text-lg mb-6">Up to 50% off on selected items. Limited time offer.</p>
          <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="text-center">
              <div className="text-4xl font-accent font-bold text-accent">15</div>
              <p className="text-dark text-sm uppercase">Days</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-accent font-bold text-accent">06</div>
              <p className="text-dark text-sm uppercase">Hours</p>
            </div>
          </div>
          <Link 
            href="/shop?category=sale" 
            className="inline-block w-full px-8 py-3 bg-accent text-white font-accent font-medium rounded-full text-center hover:bg-opacity-90 transition"
          >
            Shop the Sale
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
