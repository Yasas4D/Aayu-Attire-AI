
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-aayu-light py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-5xl font-sans font-semibold mb-4">Our Story</h1>
              <p className="text-lg md:text-xl text-aayu-muted">
                Discover the journey and values behind Aayu Attire: 
                Elevating everyday style with quality, sustainability, and thoughtful design.
              </p>
            </div>
          </div>
        </section>
        
        {/* Brand Story */}
        <section className="py-16">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-sans font-semibold mb-6">
                  The Birth of Aayu Attire
                </h2>
                <p className="text-aayu-muted mb-4">
                  Aayu Attire was founded in 2020 with a simple mission: to create beautiful, timeless clothing 
                  that celebrates individuality while maintaining the highest standards of quality and ethical production.
                </p>
                <p className="text-aayu-muted mb-4">
                  Our founder, inspired by diverse fashion traditions and a commitment to sustainability, 
                  envisioned a brand that would bridge the gap between contemporary style and conscious consumerism.
                </p>
                <p className="text-aayu-muted">
                  Today, Aayu Attire stands as a testament to that vision, offering curated collections 
                  that combine elegant design with responsible manufacturing practices.
                </p>
              </div>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3" 
                  alt="Aayu Attire story" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-sans font-semibold mb-10 text-center">
              Our Values
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Quality Craftsmanship</h3>
                <p className="text-aayu-muted">
                  We believe in creating garments that last. Every piece is meticulously crafted with attention to detail,
                  using premium materials and expert tailoring techniques.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Ethical Production</h3>
                <p className="text-aayu-muted">
                  We prioritize fair labor practices and transparent supply chains. Our partners share our commitment
                  to creating safe working environments and providing fair compensation.
                </p>
              </div>
              
              <div className="bg-white p-8 rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-aayu-primary rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="text-xl font-medium mb-3">Sustainability</h3>
                <p className="text-aayu-muted">
                  We're committed to reducing our environmental footprint through responsible material sourcing,
                  eco-friendly packaging, and waste reduction initiatives.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="py-16">
          <div className="container-custom">
            <h2 className="text-2xl md:text-3xl font-sans font-semibold mb-10 text-center">
              Meet Our Team
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: "Aanya Sharma",
                  role: "Founder & Creative Director",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                },
                {
                  name: "Nathan Lee",
                  role: "Head of Design",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                },
                {
                  name: "Maya Patel",
                  role: "Sustainability Officer",
                  image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                },
                {
                  name: "Ethan Chen",
                  role: "Product Manager",
                  image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                }
              ].map((member, index) => (
                <div key={index} className="text-center">
                  <div className="overflow-hidden rounded-full mx-auto mb-4 w-40 h-40">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="font-medium text-lg">{member.name}</h3>
                  <p className="text-aayu-muted">{member.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* Call to Action */}
        <section className="bg-aayu-primary text-white py-16">
          <div className="container-custom text-center">
            <h2 className="text-2xl md:text-3xl font-sans font-semibold mb-4">
              Join the Aayu Journey
            </h2>
            <p className="text-lg mb-8 max-w-2xl mx-auto">
              Experience thoughtfully designed fashion that combines style, quality, and conscience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-aayu-primary hover:bg-gray-100">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-aayu-primary">
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
