import { useState, useEffect } from "react";
import { useRoute } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet";
import { useCart } from "@/context/CartContext";
import { Product as ProductType, CartItem } from "@/lib/types";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";

const Product = () => {
  const [match, params] = useRoute("/product/:id");
  const productId = parseInt(params?.id || "0");
  
  const { data: product, isLoading, error } = useQuery<ProductType>({
    queryKey: [`/api/products/${productId}`],
    enabled: !!productId,
  });
  
  const { data: reviews } = useQuery({
    queryKey: [`/api/products/${productId}/reviews`],
    enabled: !!productId,
  });
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  useEffect(() => {
    if (product) {
      setSelectedSize(product.sizes[0] || "");
      setSelectedColor(product.colors[0] || "");
    }
  }, [product]);
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      setQuantity(value);
    }
  };
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };
  
  const handleAddToCart = () => {
    if (!product) return;
    
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      quantity,
      size: selectedSize,
      color: selectedColor,
      image: product.images[0]
    };
    
    addToCart(cartItem);
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="animate-pulse bg-gray-200 rounded-lg h-[500px]"></div>
          <div className="space-y-4">
            <div className="animate-pulse bg-gray-200 h-10 w-3/4 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-6 w-1/4 rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded my-6"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-full rounded"></div>
            <div className="animate-pulse bg-gray-200 h-4 w-3/4 rounded"></div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl font-heading mb-4">Product Not Found</h2>
        <p className="text-dark mb-8">We couldn't find the product you're looking for.</p>
      </div>
    );
  }
  
  return (
    <>
      <Helmet>
        <title>{product.name} | Aayu Attire</title>
        <meta name="description" content={product.description.slice(0, 160)} />
      </Helmet>
      
      <div className="bg-light py-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8 text-sm text-dark">
            <a href="/" className="hover:text-accent">Home</a> / 
            <a href="/shop" className="mx-2 hover:text-accent">Shop</a> / 
            <a href={`/shop?category=${product.category}`} className="mx-2 hover:text-accent capitalize">{product.category}</a> / 
            <span className="text-accent ml-2">{product.name}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Product Images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden bg-white">
                <img 
                  src={product.images[selectedImage]} 
                  alt={product.name} 
                  className="w-full object-cover h-[500px]"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-md overflow-hidden cursor-pointer ${selectedImage === index ? 'border-2 border-accent' : 'border border-gray-200'}`}
                    onClick={() => setSelectedImage(index)}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} - view ${index + 1}`} 
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
            
            {/* Product Info */}
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-2">{product.name}</h1>
              
              <div className="flex items-center gap-2 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => {
                    const ratingValue = i + 1;
                    return (
                      <i 
                        key={i}
                        className={`${
                          ratingValue <= Math.floor(product.rating) 
                            ? "ri-star-fill" 
                            : ratingValue <= product.rating 
                            ? "ri-star-half-fill" 
                            : "ri-star-line"
                        } text-yellow-400`}
                      ></i>
                    );
                  })}
                </div>
                <span className="text-dark text-sm">({product.reviews || 0} reviews)</span>
              </div>
              
              <div className="mb-6">
                <span className="font-semibold text-2xl text-accent">${product.price.toFixed(2)}</span>
                {product.comparePrice && (
                  <span className="text-dark line-through text-lg ml-2">${product.comparePrice.toFixed(2)}</span>
                )}
                
                {product.comparePrice && (
                  <span className="ml-2 bg-error text-white text-xs font-accent px-2 py-1 rounded">
                    {Math.round((1 - product.price / product.comparePrice) * 100)}% OFF
                  </span>
                )}
              </div>
              
              <p className="text-dark mb-8">{product.description}</p>
              
              <div className="space-y-6 mb-8">
                {/* Size Selection */}
                <div>
                  <h3 className="font-medium mb-2">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size) => (
                      <label key={size} className="size-option">
                        <input 
                          type="radio" 
                          name="size" 
                          value={size} 
                          className="sr-only" 
                          checked={selectedSize === size}
                          onChange={() => setSelectedSize(size)}
                        />
                        <span 
                          className={`block border rounded-md px-4 py-2 cursor-pointer hover:border-accent ${
                            selectedSize === size ? 'border-accent bg-accent text-white' : 'border-gray-300'
                          }`}
                        >
                          {size.toUpperCase()}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Color Selection */}
                <div>
                  <h3 className="font-medium mb-2">Select Color</h3>
                  <div className="flex gap-3">
                    {product.colors.map((color) => {
                      const colorMap: Record<string, string> = {
                        blue: "#1E40AF",
                        pink: "#DB2777",
                        green: "#15803D",
                        black: "#000000",
                        white: "#FFFFFF",
                        red: "#B91C1C",
                        yellow: "#FBBF24",
                        gold: "#B7950B",
                        silver: "#A0AEC0"
                      };
                      
                      return (
                        <label key={color} className="color-option">
                          <input 
                            type="radio" 
                            name="color" 
                            value={color} 
                            className="sr-only" 
                            checked={selectedColor === color}
                            onChange={() => setSelectedColor(color)}
                          />
                          <span 
                            className={`block w-8 h-8 rounded-full border-2 ${
                              selectedColor === color ? 'outline outline-2 outline-accent' : ''
                            }`}
                            style={{ backgroundColor: colorMap[color] || "#777777", borderColor: "white" }}
                          ></span>
                        </label>
                      );
                    })}
                  </div>
                </div>
                
                {/* Quantity Selection */}
                <div>
                  <h3 className="font-medium mb-2">Quantity</h3>
                  <div className="flex border border-gray-300 rounded-md w-32">
                    <button 
                      className="px-3 py-2 text-dark" 
                      onClick={decreaseQuantity}
                    >
                      -
                    </button>
                    <input 
                      type="number" 
                      value={quantity} 
                      min="1"
                      max={product.stock}
                      onChange={handleQuantityChange}
                      className="w-full text-center focus:outline-none"
                    />
                    <button 
                      className="px-3 py-2 text-dark"
                      onClick={increaseQuantity}
                    >
                      +
                    </button>
                  </div>
                  <p className="text-sm text-dark mt-1">
                    {product.stock > 10 
                      ? "In Stock" 
                      : product.stock > 0 
                        ? `Only ${product.stock} left in stock!` 
                        : "Out of Stock"}
                  </p>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <button 
                  className="py-3 px-6 bg-accent text-white font-accent font-medium rounded-full hover:bg-opacity-90 transition flex-grow flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                  disabled={product.stock === 0}
                >
                  <i className="ri-shopping-bag-line"></i> Add to Cart
                </button>
                <button className="py-3 px-6 border-2 border-primary text-primary font-accent font-medium rounded-full hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
                  <i className="ri-heart-line"></i> Wishlist
                </button>
              </div>
              
              {/* Product Meta */}
              <div className="border-t border-gray-200 pt-6 text-sm">
                <p className="mb-2"><span className="font-semibold">SKU:</span> {`AA${product.id.toString().padStart(4, '0')}`}</p>
                <p className="mb-2"><span className="font-semibold">Category:</span> <a href={`/shop?category=${product.category}`} className="text-accent hover:underline capitalize">{product.category}</a></p>
                <p><span className="font-semibold">Tags:</span> {product.isNew ? "New Arrival, " : ""}{product.isFeatured ? "Featured, " : ""}{product.isBestSeller ? "Best Seller, " : ""}{product.isSale ? "Sale, " : ""}Fashion</p>
              </div>
            </div>
          </div>
          
          {/* Product Details Tabs */}
          <div className="mt-16">
            <Tabs defaultValue="description">
              <TabsList className="w-full justify-start border-b mb-6">
                <TabsTrigger value="description" className="px-6 py-3 text-base">Description</TabsTrigger>
                <TabsTrigger value="specifications" className="px-6 py-3 text-base">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" className="px-6 py-3 text-base">Reviews ({product.reviews || 0})</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="px-2">
                <div className="prose max-w-none text-dark">
                  <p className="mb-4">{product.description}</p>
                  <p className="mb-4">Crafted with attention to detail, this {product.name.toLowerCase()} features premium materials and a design that combines style and functionality. Perfect for any occasion, it's a versatile addition to your wardrobe that you'll reach for time and again.</p>
                  <p>Our commitment to quality ensures that this piece will maintain its beauty and shape through many wears, making it a worthwhile investment for your wardrobe.</p>
                </div>
              </TabsContent>
              
              <TabsContent value="specifications" className="px-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-medium text-lg mb-4">Product Details</h3>
                    <ul className="space-y-2 text-dark">
                      <li><span className="font-medium">Material:</span> Premium quality fabrics</li>
                      <li><span className="font-medium">Available Sizes:</span> {product.sizes.map(s => s.toUpperCase()).join(", ")}</li>
                      <li><span className="font-medium">Available Colors:</span> {product.colors.map(c => c.charAt(0).toUpperCase() + c.slice(1)).join(", ")}</li>
                      <li><span className="font-medium">Care Instructions:</span> Gentle machine wash, tumble dry low</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="font-medium text-lg mb-4">Shipping & Returns</h3>
                    <ul className="space-y-2 text-dark">
                      <li><span className="font-medium">Free Shipping:</span> On orders over $100</li>
                      <li><span className="font-medium">Shipping Time:</span> 3-5 business days</li>
                      <li><span className="font-medium">Returns Policy:</span> 30 days free returns</li>
                      <li><span className="font-medium">Warranty:</span> 1 year limited warranty</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="reviews" className="px-2">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <div className="md:col-span-1">
                    <h3 className="font-medium text-lg mb-4">Customer Reviews</h3>
                    <div className="mb-6">
                      <div className="flex items-center mb-2">
                        <div className="flex gap-1 mr-2">
                          {[...Array(5)].map((_, i) => {
                            const ratingValue = i + 1;
                            return (
                              <i 
                                key={i}
                                className={`${
                                  ratingValue <= Math.floor(product.rating) 
                                    ? "ri-star-fill" 
                                    : ratingValue <= product.rating 
                                    ? "ri-star-half-fill" 
                                    : "ri-star-line"
                                } text-yellow-400`}
                              ></i>
                            );
                          })}
                        </div>
                        <span className="text-dark">{product.rating.toFixed(1)} out of 5</span>
                      </div>
                      <p className="text-dark">{product.reviews || 0} global ratings</p>
                    </div>
                    
                    <button className="w-full py-2 bg-accent text-white font-accent rounded-full">Write a Review</button>
                  </div>
                  
                  <div className="md:col-span-2">
                    {reviews?.length > 0 ? (
                      <div className="space-y-6">
                        {reviews.map((review: any) => (
                          <div key={review.id} className="border-b pb-6">
                            <div className="flex justify-between mb-2">
                              <h4 className="font-medium">{review.name}</h4>
                              <span className="text-dark text-sm">{new Date(review.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex gap-1 mb-2">
                              {[...Array(5)].map((_, i) => (
                                <i 
                                  key={i}
                                  className={`${
                                    i < review.rating ? "ri-star-fill" : "ri-star-line"
                                  } text-yellow-400 text-sm`}
                                ></i>
                              ))}
                            </div>
                            <p className="text-dark">{review.comment}</p>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-dark mb-4">This product hasn't received any reviews yet.</p>
                        <p className="text-sm">Be the first to share your experience with this product.</p>
                      </div>
                    )}
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {/* Related Products */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl font-semibold mb-8">You May Also Like</h2>
            {/* Implement related products component here - can reuse ProductGrid with a filtered dataset */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
