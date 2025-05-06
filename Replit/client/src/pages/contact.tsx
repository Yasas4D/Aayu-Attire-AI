import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Helmet } from "react-helmet";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z.string().min(2, { message: "Subject must be at least 2 characters" }),
  message: z.string().min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });
  
  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/contact", data);
      
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us. We'll get back to you shortly.",
      });
      
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send your message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <>
      <Helmet>
        <title>Contact Us | Aayu Attire</title>
        <meta name="description" content="Get in touch with Aayu Attire. Whether you have questions about our products, need assistance with an order, or want to collaborate, we're here to help." />
      </Helmet>
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1577041677443-8bbdfd8cce62?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=600&q=80')" }}
        ></div>
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Contact Us</h1>
          <p className="text-dark max-w-2xl mx-auto text-lg">
            Have questions or feedback? We'd love to hear from you. Our team is here to help with any inquiries.
          </p>
        </div>
      </section>
      
      {/* Contact Details & Form */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="font-heading text-3xl font-semibold mb-8">Get In Touch</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-map-pin-line text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Visit Us</h3>
                    <p className="text-dark">123 Fashion Street, Style City, SC 12345</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-mail-line text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Email Us</h3>
                    <p className="text-dark">support@aayuattire.com</p>
                    <p className="text-dark">info@aayuattire.com</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-phone-line text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Call Us</h3>
                    <p className="text-dark">+1 (555) 123-4567</p>
                    <p className="text-dark">+1 (555) 987-6543</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                    <i className="ri-time-line text-accent text-xl"></i>
                  </div>
                  <div>
                    <h3 className="font-medium text-lg mb-2">Business Hours</h3>
                    <p className="text-dark">Monday - Friday: 9AM - 6PM</p>
                    <p className="text-dark">Saturday: 10AM - 4PM</p>
                    <p className="text-dark">Sunday: Closed</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-12">
                <h3 className="font-medium text-lg mb-4">Connect With Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="Facebook">
                    <i className="ri-facebook-fill"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="Instagram">
                    <i className="ri-instagram-line"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="Twitter">
                    <i className="ri-twitter-fill"></i>
                  </a>
                  <a href="#" className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center hover:bg-accent transition" aria-label="Pinterest">
                    <i className="ri-pinterest-fill"></i>
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <h2 className="font-heading text-2xl font-semibold mb-6">Send Us A Message</h2>
              <p className="text-dark mb-8">Fill out the form below, and we'll get back to you as soon as possible.</p>
              
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email Address</FormLabel>
                          <FormControl>
                            <Input placeholder="johndoe@example.com" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject</FormLabel>
                        <FormControl>
                          <Input placeholder="How can we help?" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your inquiry..." 
                            className="min-h-[150px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-accent hover:bg-accent/90 text-white font-accent py-3 rounded-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </Form>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center mb-8">Our Location</h2>
          <div className="h-[400px] bg-gray-100 rounded-lg">
            {/* Map would be inserted here in a real implementation */}
            <div className="w-full h-full flex items-center justify-center bg-gray-200 rounded-lg">
              <div className="text-center">
                <i className="ri-map-pin-line text-4xl text-accent mb-2"></i>
                <p className="text-dark">Map placeholder - 123 Fashion Street, Style City</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-light">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-semibold text-center mb-4">Frequently Asked Questions</h2>
          <p className="text-dark text-center max-w-2xl mx-auto mb-12">
            Find quick answers to common questions about our products, shipping, returns, and more.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-3">What are your shipping times?</h3>
              <p className="text-dark">Standard shipping takes 3-5 business days within the US. International shipping typically takes 7-14 business days, depending on the destination.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-3">How do I return an item?</h3>
              <p className="text-dark">We offer free returns within 30 days of purchase. Simply log into your account, request a return, and we'll provide a prepaid shipping label.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-3">Do you ship internationally?</h3>
              <p className="text-dark">Yes, we ship to most countries worldwide. Shipping costs and delivery times vary by location. Check our shipping page for details.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="font-medium text-lg mb-3">How can I track my order?</h3>
              <p className="text-dark">Once your order ships, you'll receive a confirmation email with tracking information. You can also track your order by logging into your account.</p>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <p className="text-dark mb-4">Can't find the answer you're looking for?</p>
            <a href="#" className="text-accent hover:underline font-medium">View our full FAQ page</a>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
