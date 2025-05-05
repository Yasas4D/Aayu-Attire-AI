import React from 'react';
import AboutContent from '../components/about/AboutContent';

const AboutPage: React.FC = () => {
  return (
    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">About Aayu Attire</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Celebrating the rich heritage of Indian fashion with contemporary designs for the modern wardrobe
          </p>
        </div>
        
        {/* Hero Image */}
        <div className="aspect-[21/9] overflow-hidden rounded-xl mb-16">
          <img 
            src="https://images.pexels.com/photos/7679439/pexels-photo-7679439.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
            alt="Aayu Attire workshop" 
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Main Content */}
        <AboutContent />
      </div>
    </main>
  );
};

export default AboutPage;