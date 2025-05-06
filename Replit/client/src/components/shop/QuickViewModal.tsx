import { useState } from "react";
import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { Product, CartItem } from "@/lib/types";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

interface QuickViewModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

const QuickViewModal = ({ product, isOpen, onClose }: QuickViewModalProps) => {
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "blue");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

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
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Product Quick View</DialogTitle>
          <DialogClose />
        </DialogHeader>
        
        <div className="p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Product Images */}
            <div>
              <div className="mb-4 rounded-lg overflow-hidden">
                <img 
                  src={product.images[0]} 
                  alt={product.name} 
                  className="w-full object-cover"
                />
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <div 
                    key={index} 
                    className={`rounded-md overflow-hidden ${index === 0 ? 'border-2 border-accent' : 'border border-gray-200'}`}
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
              <h2 className="font-heading text-2xl font-semibold mb-2">{product.name}</h2>
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
              
              <p className="font-semibold text-2xl text-accent mb-4">
                ${product.price.toFixed(2)}
                {product.comparePrice && (
                  <span className="text-dark line-through text-lg ml-2">${product.comparePrice.toFixed(2)}</span>
                )}
              </p>
              
              <p className="text-dark mb-6">{product.description}</p>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Select Size</h3>
                <div className="flex flex-wrap gap-2">
                  {["xs", "s", "m", "l", "xl"].map((size) => (
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
              
              <div className="mb-6">
                <h3 className="font-medium mb-2">Select Color</h3>
                <div className="flex gap-3">
                  {(product.colors || ["blue", "pink", "green"]).map((color) => {
                    const colorMap: Record<string, string> = {
                      blue: "#1E40AF",
                      pink: "#DB2777",
                      green: "#15803D",
                      black: "#000000",
                      white: "#FFFFFF",
                      red: "#B91C1C",
                      yellow: "#FBBF24"
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
              
              <div className="mb-6">
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
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  className="py-3 px-6 bg-accent text-white font-accent font-medium rounded-full hover:bg-opacity-90 transition flex-grow flex items-center justify-center gap-2"
                  onClick={handleAddToCart}
                >
                  <i className="ri-shopping-bag-line"></i> Add to Cart
                </button>
                <button className="py-3 px-6 border-2 border-primary text-primary font-accent font-medium rounded-full hover:bg-primary hover:text-white transition flex items-center justify-center gap-2">
                  <i className="ri-heart-line"></i> Wishlist
                </button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuickViewModal;
