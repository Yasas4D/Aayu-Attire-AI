import React from 'react';
import HeroSection from '../components/home/HeroSection';
import FeaturedProducts from '../components/home/FeaturedProducts';
import ProductCarousel from '../components/home/ProductCarousel';
import CategoryFeature from '../components/home/CategoryFeature';

const HomePage: React.FC = () => {
  return (
    <main>
      <HeroSection />
      <FeaturedProducts />
      <ProductCarousel />
      <CategoryFeature />
      
      {/* Additional section: Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-2 text-center">What Our Customers Say</h2>
          <p className="text-gray-600 text-center mb-10">Discover why people love Aayu Attire</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center text-amber-600 font-bold">S</div>
                <div className="ml-4">
                  <h4 className="font-medium">Sneha P.</h4>
                  <p className="text-gray-500 text-sm">Mumbai, India</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The quality of Aayu Attire's clothing is exceptional. I purchased a silk saree for my sister's wedding and received countless compliments. The intricate embroidery and attention to detail truly set their pieces apart."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center text-amber-600 font-bold">A</div>
                <div className="ml-4">
                  <h4 className="font-medium">Aditya R.</h4>
                  <p className="text-gray-500 text-sm">Delhi, India</p>
                </div>
              </div>
              <p className="text-gray-600">
                "I've been buying from Aayu Attire for over two years now, and their kurtas have become a staple in my wardrobe. The comfort, fit, and modern designs make their traditional wear perfect for both everyday use and special occasions."
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex items-center mb-4">
                <div className="bg-amber-100 rounded-full w-12 h-12 flex items-center justify-center text-amber-600 font-bold">P</div>
                <div className="ml-4">
                  <h4 className="font-medium">Priya M.</h4>
                  <p className="text-gray-500 text-sm">Bangalore, India</p>
                </div>
              </div>
              <p className="text-gray-600">
                "What I appreciate most about Aayu Attire is their commitment to sustainability and artisan communities. It feels good knowing my purchase supports traditional craftsmanship, and the clothing is both beautiful and ethically made."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-amber-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
            <p className="mb-6">
              Subscribe to our newsletter for exclusive offers, new arrivals, and styling inspiration.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 text-gray-900"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-amber-800 hover:bg-amber-900 rounded-lg font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
            
            <p className="mt-4 text-sm text-amber-100">
              By subscribing, you agree to our Privacy Policy and consent to receive marketing emails.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
};

export default HomePage;