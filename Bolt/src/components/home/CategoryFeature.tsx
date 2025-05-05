import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    id: 1,
    name: "Women's Collection",
    image: "https://images.pexels.com/photos/7691355/pexels-photo-7691355.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=Women"
  },
  {
    id: 2,
    name: "Men's Collection",
    image: "https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=Men"
  },
  {
    id: 3,
    name: "Traditional Wear",
    image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    link: "/shop?category=Traditional"
  }
];

const CategoryFeature: React.FC = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2 text-center">Shop By Category</h2>
        <p className="text-gray-600 text-center mb-10">Explore our diverse range of collections</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link 
              key={category.id} 
              to={category.link}
              className="group relative overflow-hidden rounded-lg h-96"
            >
              <div 
                className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-all duration-300"
              />
              <img 
                src={category.image}
                alt={category.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-white/90 px-6 py-4 rounded-lg shadow-lg transform group-hover:scale-105 transition-transform">
                  <h3 className="text-xl font-semibold text-gray-900">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryFeature;