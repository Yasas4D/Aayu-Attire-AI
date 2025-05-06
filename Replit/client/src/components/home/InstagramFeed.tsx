const InstagramFeed = () => {
  const instagramPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      alt: "Instagram post - Fashion model in urban setting"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      alt: "Instagram post - Elegant fashion accessories"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1544816155-12df9643f363?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      alt: "Instagram post - Fabric texture close-up"
    },
    {
      id: 4,
      image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      alt: "Instagram post - Fashion model in urban setting"
    },
    {
      id: 5,
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&q=80",
      alt: "Instagram post - Elegant store interior"
    },
    {
      id: 6,
      image: "https://pixabay.com/get/g3da6dc882355a3f98466301d45083133aff92eaad2ca2418ad60d4d81fb0cb653e0aa6809decfda33946c350f5ec1c48c3c7a162c2b1f0818a08850c5be4e77c_1280.jpg",
      alt: "Instagram post - Textured fabric close-up"
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-4">Follow Our Style</h2>
        <p className="text-dark text-center max-w-2xl mx-auto mb-8">Tag us @AayuAttire to be featured</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {instagramPosts.map(post => (
            <div key={post.id} className="relative group overflow-hidden">
              <img 
                src={post.image} 
                alt={post.alt} 
                className="w-full aspect-square object-cover"
              />
              <div className="absolute inset-0 bg-primary bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <i className="ri-instagram-line text-white text-2xl"></i>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-8">
          <a 
            href="https://www.instagram.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="inline-flex items-center font-accent text-accent hover:text-dark transition-colors"
          >
            Follow Us on Instagram <i className="ri-arrow-right-line ml-2"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
