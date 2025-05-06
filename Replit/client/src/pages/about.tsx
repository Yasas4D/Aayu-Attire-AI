import { Helmet } from "react-helmet";

const About = () => {
  return (
    <>
      <Helmet>
        <title>About Us | Aayu Attire</title>
        <meta name="description" content="Learn about Aayu Attire's story, mission, and values. Discover our commitment to quality, sustainability, and creating timeless fashion for the modern individual." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Our Story</h1>
          <p className="text-dark max-w-3xl mx-auto text-lg">Crafting elegant fashion with modern sensibilities, Aayu Attire has been defining contemporary style since its founding.</p>
        </div>
      </section>
      
      {/* Our Mission */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold mb-6">Our Mission</h2>
              <p className="text-dark mb-4">
                At Aayu Attire, our mission is to create timeless fashion that empowers individuals to express their unique style with confidence and comfort.
              </p>
              <p className="text-dark mb-4">
                We believe that clothing should be more than just fabric—it should be an extension of your personality, a reflection of your values, and a source of confidence throughout your day.
              </p>
              <p className="text-dark">
                Every piece we design is crafted with attention to detail, using high-quality materials that ensure durability, comfort, and style that transcends trends.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600&q=80" 
                alt="Elegant clothing on display in the Aayu Attire store" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Values */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-heart-line text-accent text-2xl"></i>
              </div>
              <h3 className="font-heading text-xl font-medium text-center mb-4">Quality</h3>
              <p className="text-dark text-center">
                We never compromise on quality. Each garment passes through strict quality control to ensure excellent craftsmanship and durability.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-earth-line text-accent text-2xl"></i>
              </div>
              <h3 className="font-heading text-xl font-medium text-center mb-4">Sustainability</h3>
              <p className="text-dark text-center">
                We're committed to reducing our environmental footprint through responsible sourcing, ethical manufacturing, and eco-friendly packaging.
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mb-6 mx-auto">
                <i className="ri-community-line text-accent text-2xl"></i>
              </div>
              <h3 className="font-heading text-xl font-medium text-center mb-4">Inclusivity</h3>
              <p className="text-dark text-center">
                We design clothes for every body type and style preference, celebrating diversity and ensuring everyone feels represented in our brand.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Team */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center mb-4">Meet Our Team</h2>
          <p className="text-dark text-center max-w-3xl mx-auto mb-12">
            Behind Aayu Attire is a passionate team of fashion experts, designers, and professionals dedicated to bringing our vision to life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-secondary"></div>
              <h3 className="font-heading text-xl font-medium mb-1">Aisha Patel</h3>
              <p className="text-dark text-sm mb-3">Founder & Creative Director</p>
              <p className="text-dark text-sm px-6">
                With over 15 years in fashion design, Aisha founded Aayu Attire with a vision to create accessible luxury clothing.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-secondary"></div>
              <h3 className="font-heading text-xl font-medium mb-1">David Chen</h3>
              <p className="text-dark text-sm mb-3">Head of Design</p>
              <p className="text-dark text-sm px-6">
                David brings his international experience and eye for detail to create our distinctive aesthetic.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-40 h-40 rounded-full overflow-hidden mx-auto mb-4 bg-secondary"></div>
              <h3 className="font-heading text-xl font-medium mb-1">Sophia Rodriguez</h3>
              <p className="text-dark text-sm mb-3">Sustainability Manager</p>
              <p className="text-dark text-sm px-6">
                Sophia ensures our production processes align with our commitment to environmental responsibility.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Journey */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center mb-12">Our Journey</h2>
          
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-accent/30 transform md:translate-x-0"></div>
            
            {/* Timeline items */}
            <div className="space-y-12">
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="font-heading text-xl font-medium mb-2">2015</h3>
                    <p className="text-dark">Aayu Attire is founded with a small collection of sustainable basics.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">1</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right md:order-2 mb-6 md:mb-0">
                    <h3 className="font-heading text-xl font-medium mb-2">2017</h3>
                    <p className="text-dark">Opened our first flagship store and expanded our product range.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">2</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-1"></div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="font-heading text-xl font-medium mb-2">2019</h3>
                    <p className="text-dark">Launched our e-commerce platform to reach customers globally.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">3</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right md:order-2 mb-6 md:mb-0">
                    <h3 className="font-heading text-xl font-medium mb-2">2021</h3>
                    <p className="text-dark">Implemented 100% sustainable packaging and expanded to international markets.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">4</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12 md:order-1"></div>
                </div>
              </div>
              
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center">
                  <div className="md:w-1/2 md:pr-12 md:text-right mb-6 md:mb-0">
                    <h3 className="font-heading text-xl font-medium mb-2">Today</h3>
                    <p className="text-dark">Continuing to grow while staying true to our mission of quality, sustainability, and style.</p>
                  </div>
                  <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 bg-accent rounded-full transform -translate-x-1/2 md:-translate-x-1/2 flex items-center justify-center">
                    <span className="text-white font-bold">5</span>
                  </div>
                  <div className="md:w-1/2 md:pl-12"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl font-semibold mb-6">Join the Aayu Attire Family</h2>
          <p className="max-w-2xl mx-auto mb-8">
            Experience the perfect blend of style, comfort, and sustainability. Discover our collections today and be part of our journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="/shop" className="px-8 py-3 bg-accent text-white font-accent font-medium rounded-full inline-block hover:bg-opacity-90 transition">
              Shop Now
            </a>
            <a href="/contact" className="px-8 py-3 bg-white text-primary font-accent font-medium rounded-full inline-block hover:bg-light transition">
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
