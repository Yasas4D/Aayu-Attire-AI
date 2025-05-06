import { Link } from "wouter";

const CategorySection = () => {
  const categories = [
    {
      id: 1,
      name: "Dresses",
      image: "https://images.unsplash.com/photo-1566174053879-31528523f8ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
      link: "/shop?category=dresses"
    },
    {
      id: 2,
      name: "Tops",
      image: "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
      link: "/shop?category=tops"
    },
    {
      id: 3,
      name: "Bottoms",
      image: "https://images.unsplash.com/photo-1519748771451-a94c596fad67?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=800&q=80",
      link: "/shop?category=bottoms"
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://pixabay.com/get/g1938aa38a3db976a33f125acb1b4287efd7748471f068444b5abfd370f0d65e5a2972227e15c9e08a775fc2ababc8da673129738214d8c4369f69bfed5779710_1280.jpg",
      link: "/shop?category=accessories"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-8">Shop by Category</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.map((category) => (
            <div key={category.id} className="group relative overflow-hidden rounded-lg">
              <img 
                src={category.image} 
                alt={`${category.name} category`} 
                className="w-full h-60 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary to-transparent opacity-70"></div>
              <div className="absolute bottom-0 left-0 p-4 w-full">
                <h3 className="text-white font-heading text-xl font-medium mb-1">{category.name}</h3>
                <Link 
                  href={category.link} 
                  className="text-white text-sm flex items-center hover:text-accent transition-colors"
                >
                  Shop Now <i className="ri-arrow-right-line ml-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
