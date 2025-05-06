
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart } from "lucide-react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCarousel from "@/components/product/ProductCarousel";
import { getProductById, getFeaturedProducts } from "@/data/products";
import { toast } from "sonner";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<any>(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  useEffect(() => {
    // In a real app, this would be an API call
    if (id) {
      const fetchedProduct = getProductById(parseInt(id, 10));
      if (fetchedProduct) {
        setProduct(fetchedProduct);
        // Set default selections
        if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
          setSelectedSize(fetchedProduct.sizes[0]);
        }
        if (fetchedProduct.colors && fetchedProduct.colors.length > 0) {
          setSelectedColor(fetchedProduct.colors[0]);
        }
      } else {
        // Product not found
        navigate("/shop");
      }
      
      // Get related products
      setRelatedProducts(getFeaturedProducts());
    }
  }, [id, navigate]);
  
  const handleAddToCart = () => {
    if (!selectedSize) {
      toast.error("Please select a size");
      return;
    }
    if (!selectedColor) {
      toast.error("Please select a color");
      return;
    }
    
    // In a real app, this would dispatch to a cart state or API
    toast.success(`${product.name} added to cart`, {
      description: `Size: ${selectedSize}, Color: ${selectedColor}, Quantity: ${quantity}`
    });
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const incrementQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  // Generate multiple image sources for the product gallery
  const productImages = product ? [
    product.image,
    `https://source.unsplash.com/featured/?${product.category.toLowerCase()},fashion,1`,
    `https://source.unsplash.com/featured/?${product.category.toLowerCase()},fashion,2`,
    `https://source.unsplash.com/featured/?${product.category.toLowerCase()},fashion,3`
  ] : [];
  
  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex items-center justify-center">
          <p className="text-xl">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Product Details Section */}
        <section className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Images */}
              <div className="space-y-4">
                <div className="aspect-[3/4] bg-gray-100 rounded-lg overflow-hidden">
                  <img 
                    src={productImages[activeImageIndex]} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {productImages.map((img, idx) => (
                    <div 
                      key={idx}
                      className={`cursor-pointer aspect-square bg-gray-100 rounded-md overflow-hidden ${
                        idx === activeImageIndex ? 'ring-2 ring-aayu-primary' : ''
                      }`}
                      onClick={() => setActiveImageIndex(idx)}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} view ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-sans font-semibold mb-2">{product.name}</h1>
                  <p className="text-xl font-medium mb-4">${product.price.toFixed(2)}</p>
                  <p className="text-aayu-muted">
                    Experience elegance and comfort with our premium quality clothing designed for the modern individual.
                  </p>
                </div>
                
                {/* Color Selection */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-3">Color: {selectedColor}</h3>
                  <div className="flex gap-2">
                    {product.colors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color 
                            ? 'border-aayu-primary scale-110' 
                            : 'border-gray-300'
                        } transition-transform`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select color ${color}`}
                      />
                    ))}
                  </div>
                </div>
                
                {/* Size Selection */}
                <div className="mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-sm font-medium">Size: {selectedSize}</h3>
                    <button className="text-sm text-aayu-primary hover:underline">
                      Size Guide
                    </button>
                  </div>
                  <div className="grid grid-cols-5 gap-2">
                    {product.sizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`py-2 border ${
                          selectedSize === size
                            ? 'border-aayu-primary bg-aayu-primary text-white'
                            : 'border-gray-300 hover:border-aayu-primary'
                        } rounded-md text-sm font-medium transition-colors`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                
                {/* Quantity */}
                <div className="mb-8">
                  <h3 className="text-sm font-medium mb-3">Quantity</h3>
                  <div className="flex">
                    <button 
                      onClick={decrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                      {quantity}
                    </div>
                    <button 
                      onClick={incrementQuantity}
                      className="w-10 h-10 flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>
                
                {/* Add to Cart and Wishlist */}
                <div className="flex gap-3 mb-8">
                  <Button 
                    className="flex-grow bg-aayu-primary hover:bg-opacity-90"
                    onClick={handleAddToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button variant="outline" className="border-aayu-secondary">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                
                {/* Product Details */}
                <div className="border-t border-gray-200 pt-6">
                  <Tabs defaultValue="description">
                    <TabsList className="grid grid-cols-3">
                      <TabsTrigger value="description">Description</TabsTrigger>
                      <TabsTrigger value="details">Details</TabsTrigger>
                      <TabsTrigger value="shipping">Shipping</TabsTrigger>
                    </TabsList>
                    <TabsContent value="description" className="pt-4 text-aayu-muted">
                      <p>
                        This premium quality garment is made with attention to detail and craftsmanship. 
                        Designed for both style and comfort, it's perfect for everyday wear or special occasions. 
                        The thoughtful design incorporates functional elements while maintaining an elegant aesthetic.
                      </p>
                    </TabsContent>
                    <TabsContent value="details" className="pt-4">
                      <ul className="space-y-2 text-aayu-muted">
                        <li>• Material: 95% Cotton, 5% Elastane</li>
                        <li>• Care: Machine wash cold, gentle cycle</li>
                        <li>• Sustainably sourced materials</li>
                        <li>• Model is wearing size M</li>
                        <li>• Imported</li>
                      </ul>
                    </TabsContent>
                    <TabsContent value="shipping" className="pt-4 text-aayu-muted">
                      <p>
                        Free standard shipping on orders over $100. Expedited shipping options available at checkout.
                        Please allow 1-2 business days for processing and 3-5 business days for delivery.
                        International shipping available to select countries.
                      </p>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Related Products */}
        <section className="py-12 bg-gray-50">
          <div className="container-custom">
            <ProductCarousel 
              title="You May Also Like" 
              products={relatedProducts}
            />
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductDetail;
