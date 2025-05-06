import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail("");
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-12 md:py-16 bg-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-semibold mb-4">Join Our Community</h2>
          <p className="mb-8">Subscribe to receive exclusive offers, early access to new collections, and styling tips.</p>
          
          <form className="flex flex-col sm:flex-row gap-4 mb-6" onSubmit={handleSubmit}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow py-3 px-4 rounded-full text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button 
              type="submit" 
              className="py-3 px-6 bg-accent text-white font-accent font-medium rounded-full hover:bg-opacity-90 transition sm:whitespace-nowrap disabled:opacity-70"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Subscribing..." : "Subscribe Now"}
            </button>
          </form>
          
          <p className="text-sm text-white text-opacity-70">By subscribing, you agree to our Privacy Policy and consent to receive updates from Aayu Attire.</p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
