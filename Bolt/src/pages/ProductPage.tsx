import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Truck, RefreshCw, Shield, Star } from 'lucide-react';
import { getProductById } from '../data/products';
import { useCart } from '../context/CartContext';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const product = id ? getProductById(parseInt(id)) : undefined;
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  
  const [formErrors, setFormErrors] = useState({
    size: false,
    color: false
  });

  useEffect(() => {
    if (!product) {
      navigate('/shop');
      return;
    }
    
    // Set initial selected size and color
    if (product.sizes.length > 0) {
      setSelectedSize(product.sizes[0]);
    }
    
    if (product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
    
    // Scroll to top when product changes
    window.scrollTo(0, 0);
  }, [product, navigate]);

  if (!product) {
    return null; // This will redirect in the useEffect
  }

  const handleAddToCart = () => {
    // Validate form
    const errors = {
      size: !selectedSize,
      color: !selectedColor
    };
    
    setFormErrors(errors);
    
    if (errors.size || errors.color) {
      return;
    }
    
    // Add to cart
    addToCart(product, quantity, selectedSize, selectedColor);
    
    // Show success notification or navigate to cart
    navigate('/cart');
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0 && value <= product.stock) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <main className="pt-24 pb-16">
      <div className="container mx-auto px-4">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm mb-6">
          <Link to="/" className="text-gray-500 hover:text-amber-600">Home</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <Link to="/shop" className="text-gray-500 hover:text-amber-600">Shop</Link>
          <ChevronRight size={14} className="mx-2 text-gray-400" />
          <span className="text-gray-900">{product.name}</span>
        </nav>
        
        {/* Back Button (Mobile) */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-sm font-medium mb-6 md:hidden"
        >
          <ArrowLeft size={16} className="mr-1" />
          Back to shopping
        </button>

        {/* Product Details */}
        <div className="flex flex-col md:flex-row gap-8 lg:gap-12">
          {/* Product Images */}
          <div className="md:w-1/2">
            <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100 mb-4">
              <img 
                src={product.images[selectedImage]} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
              
              {/* New Badge */}
              {product.isNew && (
                <span className="absolute top-4 left-4 px-2 py-1 bg-amber-600 text-white text-xs font-medium rounded">
                  New
                </span>
              )}
              
              {/* Sale Badge */}
              {product.discountPrice && (
                <span className="absolute top-4 right-4 px-2 py-1 bg-red-500 text-white text-xs font-medium rounded">
                  Sale
                </span>
              )}
            </div>
            
            {/* Thumbnail Gallery */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative w-20 h-20 flex-shrink-0 rounded-md overflow-hidden ${
                      selectedImage === index ? 'ring-2 ring-amber-600' : 'opacity-60'
                    }`}
                  >
                    <img 
                      src={image} 
                      alt={`${product.name} view ${index + 1}`} 
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
          
          {/* Product Info */}
          <div className="md:w-1/2">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.name}</h1>
            
            {/* Price */}
            <div className="flex items-center mb-4">
              {product.discountPrice ? (
                <>
                  <span className="text-2xl font-bold text-amber-600">${product.discountPrice}</span>
                  <span className="ml-2 text-lg text-gray-500 line-through">${product.price}</span>
                  <span className="ml-2 px-2 py-1 bg-red-100 text-red-700 text-xs font-medium rounded">
                    {Math.round((1 - product.discountPrice / product.price) * 100)}% OFF
                  </span>
                </>
              ) : (
                <span className="text-2xl font-bold text-amber-600">${product.price}</span>
              )}
            </div>
            
            {/* Rating */}
            <div className="flex items-center mb-6">
              <div className="flex">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star 
                    key={star}
                    size={16}
                    className={`${star <= 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-500">4.0 (24 reviews)</span>
            </div>
            
            {/* Description */}
            <p className="text-gray-600 mb-6">
              {product.description}
            </p>
            
            {/* Divider */}
            <div className="border-t border-gray-200 my-6"></div>
            
            {/* Color Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-900">Color</label>
                {formErrors.color && (
                  <span className="text-xs text-red-600">Please select a color</span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedColor(color);
                      setFormErrors(prev => ({ ...prev, color: false }));
                    }}
                    className={`group relative w-12 h-12 rounded-full overflow-hidden border-2 ${
                      selectedColor === color 
                        ? 'border-amber-600' 
                        : 'border-transparent hover:border-gray-300'
                    }`}
                    aria-label={`Color: ${color}`}
                  >
                    <div 
                      className="absolute inset-1 rounded-full"
                      style={{ 
                        backgroundColor: color.toLowerCase(),
                        border: color.toLowerCase() === 'white' ? '1px solid #e5e7eb' : 'none' 
                      }}
                    ></div>
                  </button>
                ))}
              </div>
            </div>
            
            {/* Size Selection */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-medium text-gray-900">Size</label>
                {formErrors.size && (
                  <span className="text-xs text-red-600">Please select a size</span>
                )}
              </div>
              
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setSelectedSize(size);
                      setFormErrors(prev => ({ ...prev, size: false }));
                    }}
                    className={`w-12 h-12 flex items-center justify-center rounded-md text-sm ${
                      selectedSize === size
                        ? 'bg-amber-600 text-white'
                        : 'border border-gray-300 text-gray-900 hover:bg-gray-100'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              
              <div className="mt-2">
                <Link to="/size-guide" className="text-sm text-amber-600 hover:text-amber-700">
                  Size Guide
                </Link>
              </div>
            </div>
            
            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Quantity Selector */}
              <div className="flex">
                <button
                  onClick={decrementQuantity}
                  className="w-10 h-12 flex items-center justify-center border border-r-0 border-gray-300 rounded-l-md text-gray-600 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="1"
                  max={product.stock}
                  className="w-16 h-12 border-y border-gray-300 text-center text-gray-900 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <button
                  onClick={incrementQuantity}
                  className="w-10 h-12 flex items-center justify-center border border-l-0 border-gray-300 rounded-r-md text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
              
              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                className="flex-1 h-12 bg-amber-600 hover:bg-amber-700 text-white rounded-md font-medium"
              >
                Add to Cart
              </button>
            </div>
            
            {/* Stock Status */}
            <div className="text-sm text-gray-600 mb-6">
              {product.stock > 10 ? (
                <p className="text-green-600">In Stock ({product.stock} available)</p>
              ) : product.stock > 0 ? (
                <p className="text-amber-600">Low Stock (Only {product.stock} left)</p>
              ) : (
                <p className="text-red-600">Out of Stock</p>
              )}
            </div>
            
            {/* Shipping & Returns */}
            <div className="border border-gray-200 rounded-lg p-4 space-y-3">
              <div className="flex items-start">
                <Truck size={18} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Free Shipping</h4>
                  <p className="text-xs text-gray-500">On orders over $100</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <RefreshCw size={18} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Easy Returns</h4>
                  <p className="text-xs text-gray-500">30-day return policy</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <Shield size={18} className="text-amber-600 mt-0.5 mr-3 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium">Secure Payment</h4>
                  <p className="text-xs text-gray-500">SSL encrypted checkout</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductPage;