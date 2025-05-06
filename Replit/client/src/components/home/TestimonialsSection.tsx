const TestimonialsSection = () => {
  const testimonials = [
    {
      id: 1,
      content: "I'm absolutely in love with the quality of Aayu Attire's clothing. The fabric feels luxurious and the fit is perfect. I've received so many compliments on my new dress!",
      author: "Sarah Johnson",
      title: "Loyal Customer",
      rating: 5
    },
    {
      id: 2,
      content: "The customer service at Aayu Attire is exceptional. When I had a sizing issue, they were quick to respond and resolve it. The clothes are stylish and durable. Highly recommend!",
      author: "Michael Chen",
      title: "Repeat Customer",
      rating: 5
    },
    {
      id: 3,
      content: "I've been shopping with Aayu Attire for over a year now. Their pieces are timeless yet trendy, and the quality is consistently excellent. The shipping is fast and the packaging is eco-friendly!",
      author: "Emily Rodriguez",
      title: "Fashion Enthusiast",
      rating: 4.5
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-light">
      <div className="container mx-auto px-4">
        <h2 className="font-heading text-2xl md:text-3xl font-semibold text-center mb-4">What Our Customers Say</h2>
        <p className="text-dark text-center max-w-2xl mx-auto mb-12">Discover why our customers love Aayu Attire's quality, style, and service.</p>
        
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map(testimonial => (
            <div key={testimonial.id} className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => {
                  const ratingValue = i + 1;
                  return (
                    <i 
                      key={i}
                      className={`${
                        ratingValue <= Math.floor(testimonial.rating) 
                          ? "ri-star-fill" 
                          : ratingValue <= testimonial.rating 
                          ? "ri-star-half-fill" 
                          : "ri-star-line"
                      } text-yellow-400`}
                    ></i>
                  );
                })}
              </div>
              <p className="text-dark mb-6">"{testimonial.content}"</p>
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full bg-secondary mr-4"></div>
                <div>
                  <h4 className="font-medium">{testimonial.author}</h4>
                  <p className="text-dark text-sm">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
