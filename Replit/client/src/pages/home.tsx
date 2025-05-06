import { Helmet } from "react-helmet";
import HeroSection from "@/components/home/HeroSection";
import CategorySection from "@/components/home/CategorySection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import PromoBanner from "@/components/home/PromoBanner";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import InstagramFeed from "@/components/home/InstagramFeed";
import Newsletter from "@/components/home/Newsletter";

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Aayu Attire - Modern Fashion Brand</title>
        <meta name="description" content="Discover stylish, high-quality clothing at Aayu Attire. Shop our latest collections of dresses, tops, bottoms, and accessories for the modern fashion enthusiast." />
      </Helmet>
      
      <HeroSection />
      <CategorySection />
      <NewArrivalsSection />
      <PromoBanner />
      <FeaturedProducts />
      <TestimonialsSection />
      <InstagramFeed />
      <Newsletter />
    </>
  );
};

export default Home;
