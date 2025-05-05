import React from 'react';

const AboutContent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold mb-6">Our Story</h2>
      <p className="text-gray-600 mb-6">
        Aayu Attire was born from a passion for celebrating India's rich textile heritage while embracing contemporary design. Our journey began in 2018 when our founder, Aayushi Sharma, returned from her studies in fashion design with a vision to create clothing that honors traditional craftsmanship while meeting the needs of the modern wardrobe.
      </p>
      
      <p className="text-gray-600 mb-10">
        What started as a small collection of handcrafted kurtas has now grown into a comprehensive fashion label offering everything from everyday essentials to statement pieces for special occasions. Through every step of our growth, we've remained committed to our founding principles: quality craftsmanship, ethical production, and designs that seamlessly blend tradition with modernity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-600">
            At Aayu Attire, our mission is to create clothing that celebrates cultural heritage while embracing contemporary aesthetics. We aim to provide our customers with pieces that are not only beautiful and well-crafted but also versatile and practical for modern lifestyles. Through our work, we strive to support traditional artisans and sustainable practices, ensuring that the rich legacy of Indian craftsmanship continues to thrive in the modern world.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
          <p className="text-gray-600">
            We envision a world where fashion serves as a bridge between cultures and generations. Our goal is to become a global ambassador for Indian design sensibilities, showcasing how traditional techniques and motifs can be reimagined for contemporary contexts. We aspire to build a community that values the stories behind their clothes and chooses quality and craftsmanship over fast fashion alternatives.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Our Values</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-amber-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Craftsmanship</h3>
          <p className="text-gray-600">
            We believe in the value of handcraft and take pride in the skilled workmanship that goes into every piece. Each garment is created with attention to detail and a commitment to quality that mass production simply cannot match.
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Sustainability</h3>
          <p className="text-gray-600">
            We are committed to ethical and sustainable practices throughout our production process. From sourcing natural fabrics to ensuring fair wages for our artisans, we strive to make choices that are good for both people and the planet.
          </p>
        </div>
        <div className="bg-amber-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Cultural Appreciation</h3>
          <p className="text-gray-600">
            We draw inspiration from India's diverse cultural heritage while approaching design with respect and appreciation. Our collections aim to honor traditional techniques and motifs while making them accessible to a contemporary audience.
          </p>
        </div>
      </div>

      <h2 className="text-3xl font-bold mb-6">Our Team</h2>
      <p className="text-gray-600 mb-10">
        Aayu Attire is powered by a diverse team of designers, artisans, and fashion enthusiasts who share a common passion for beautiful, meaningful clothing. From our design studio in Mumbai to our production partners across India, every member of our team contributes their unique skills and perspectives to bring our collections to life.
      </p>

      <div className="aspect-video overflow-hidden rounded-lg mb-16">
        <img 
          src="https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
          alt="Aayu Attire team at work" 
          className="w-full h-full object-cover"
        />
      </div>

      <h2 className="text-3xl font-bold mb-6">Our Process</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <p className="text-gray-600 mb-4">
            Every Aayu Attire piece begins with extensive research and ideation. Our designers draw inspiration from various sources—from traditional textiles and historical garments to contemporary fashion trends and everyday life. Sketches are refined into detailed designs, which are then brought to life through careful pattern-making and sampling.
          </p>
          <p className="text-gray-600">
            We work closely with skilled artisans who specialize in various traditional techniques, from hand embroidery to block printing. Many of our pieces involve collaborative efforts between our design team and these craftspeople, resulting in garments that honor traditional methods while embracing innovative design.
          </p>
        </div>
        <div>
          <p className="text-gray-600 mb-4">
            Quality control is central to our process. Each garment undergoes multiple inspections throughout production to ensure it meets our standards. We believe in creating clothing that's meant to last—both in terms of construction and design—offering an alternative to the disposable nature of fast fashion.
          </p>
          <p className="text-gray-600">
            Finally, we focus on creating a meaningful customer experience. From thoughtful packaging to detailed care instructions, we aim to ensure that the journey with an Aayu Attire piece extends well beyond the purchase, creating a lasting relationship between our customers and their clothing.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutContent;