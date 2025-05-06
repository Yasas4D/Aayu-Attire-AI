
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Form validation
    if (!formData.name || !formData.email || !formData.message) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    // Email validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(formData.email)) {
      toast.error("Please enter a valid email address");
      return;
    }
    
    // Submit form (this would be an API call in a real app)
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent successfully", {
        description: "Thank you for contacting us. We'll respond shortly."
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
      
      setIsSubmitting(false);
    }, 1000);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Page Header */}
        <section className="bg-aayu-light py-12">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-sans font-semibold mb-4">Contact Us</h1>
              <p className="text-aayu-muted">
                Have questions about our products? Need assistance with an order? We're here to help!
              </p>
            </div>
          </div>
        </section>
        
        {/* Contact Information */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-6 rounded-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-aayu-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-aayu-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Phone</h3>
                <p className="text-aayu-muted">(555) 123-4567</p>
                <p className="text-aayu-muted">Mon-Fri: 9am-6pm EST</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-aayu-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-aayu-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Email</h3>
                <p className="text-aayu-muted">support@aayuattire.com</p>
                <p className="text-aayu-muted">Response within 24 hours</p>
              </div>
              
              <div className="bg-white p-6 rounded-lg border border-gray-100 text-center">
                <div className="w-12 h-12 bg-aayu-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-aayu-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <h3 className="font-medium text-lg mb-2">Address</h3>
                <p className="text-aayu-muted">123 Fashion Avenue</p>
                <p className="text-aayu-muted">New York, NY 10001</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <h2 className="text-2xl font-sans font-semibold mb-6">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name <span className="text-red-500">*</span></Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email <span className="text-red-500">*</span></Label>
                      <Input 
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input 
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="What is this regarding?"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="message">Message <span className="text-red-500">*</span></Label>
                    <Textarea 
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message"
                      rows={5}
                      required
                    />
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-aayu-primary hover:bg-opacity-90"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </div>
              
              {/* Map */}
              <div>
                <h2 className="text-2xl font-sans font-semibold mb-6">Find Us</h2>
                <div className="bg-gray-200 rounded-lg overflow-hidden h-80 mb-4">
                  <iframe 
                    title="Aayu Attire Store Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d193595.15830869428!2d-74.11976397304605!3d40.69766374874431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c24fa5d33f083b%3A0xc80b8f06e177fe62!2sNew%20York%2C%20NY%2C%20USA!5e0!3m2!1sen!2s!4v1619166990436!5m2!1sen!2s" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen={true} 
                    loading="lazy"
                  ></iframe>
                </div>
                <h3 className="font-medium mb-2">Store Hours</h3>
                <div className="grid grid-cols-2 gap-1">
                  <p className="text-aayu-muted">Monday - Friday:</p>
                  <p>10:00 AM - 8:00 PM</p>
                  <p className="text-aayu-muted">Saturday:</p>
                  <p>10:00 AM - 6:00 PM</p>
                  <p className="text-aayu-muted">Sunday:</p>
                  <p>11:00 AM - 5:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl font-sans font-semibold mb-6 text-center">
                Frequently Asked Questions
              </h2>
              
              <div className="space-y-4">
                {[
                  {
                    q: "How long does shipping take?",
                    a: "Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days depending on the destination."
                  },
                  {
                    q: "What is your return policy?",
                    a: "We offer a 30-day return policy. Items must be unworn and in their original condition with tags attached. Please visit our Returns page for more details."
                  },
                  {
                    q: "Do you ship internationally?",
                    a: "Yes, we ship to most countries worldwide. International shipping rates and delivery times vary by location."
                  },
                  {
                    q: "How can I track my order?",
                    a: "Once your order is shipped, you'll receive a confirmation email with tracking information that allows you to monitor your package's journey."
                  }
                ].map((faq, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg">
                    <h3 className="font-medium text-lg mb-2">{faq.q}</h3>
                    <p className="text-aayu-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
              
              <div className="text-center mt-8">
                <p className="text-aayu-muted mb-4">
                  Can't find the answer to your question?
                </p>
                <Button variant="outline" className="border-aayu-secondary hover:bg-aayu-primary hover:text-white hover:border-aayu-primary">
                  View All FAQs
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
