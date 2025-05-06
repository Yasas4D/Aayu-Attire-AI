import { useState } from "react";
import { Link } from "wouter";
import { Helmet } from "react-helmet";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { cart, updateCartItemQuantity, removeFromCart, clearCart } = useCart();
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const { toast } = useToast();
  
  // Calculate cart totals
  const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 10;
  const tax = subtotal * 0.08; // Assuming 8% tax rate
  const total = subtotal + shipping + tax;
  
  const handleQuantityChange = (item: any, newQuantity: number) => {
    if (newQuantity > 0) {
      updateCartItemQuantity(item, newQuantity);
    }
  };
  
  const handleRemoveItem = (item: any) => {
    removeFromCart(item);
  };
  
  const handleApplyCoupon = () => {
    setIsApplyingCoupon(true);
    
    // Simulate coupon validation
    setTimeout(() => {
      setIsApplyingCoupon(false);
      
      if (couponCode.toLowerCase() === "discount10") {
        toast({
          title: "Coupon Applied",
          description: "10% discount has been applied to your order.",
        });
      } else {
        toast({
          title: "Invalid Coupon",
          description: "The coupon code you entered is invalid or expired.",
          variant: "destructive",
        });
      }
    }, 1000);
  };
  
  const handleProceedToCheckout = () => {
    // In a real application, this would navigate to a checkout page or process
    toast({
      title: "Checkout",
      description: "Processing your order. This functionality is not implemented in this demo.",
    });
  };
  
  return (
    <>
      <Helmet>
        <title>Shopping Cart | Aayu Attire</title>
        <meta name="description" content="Review and manage items in your shopping cart. Proceed to checkout to complete your purchase of stylish, high-quality clothing from Aayu Attire." />
      </Helmet>
      
      <div className="bg-light py-12">
        <div className="container mx-auto px-4">
          <h1 className="font-heading text-3xl md:text-4xl font-semibold mb-8 text-center">Shopping Cart</h1>
          
          {cart.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-light rounded-full flex items-center justify-center mx-auto mb-6">
                <i className="ri-shopping-bag-line text-3xl text-dark"></i>
              </div>
              <h2 className="font-heading text-2xl font-semibold mb-4">Your Cart is Empty</h2>
              <p className="text-dark mb-8">Looks like you haven't added any items to your cart yet.</p>
              <Link 
                href="/shop" 
                className="px-8 py-3 bg-accent text-white font-accent font-medium rounded-full inline-block hover:bg-opacity-90 transition"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                  <div className="p-4 border-b">
                    <h2 className="font-heading text-xl font-semibold">Cart Items ({cart.length})</h2>
                  </div>
                  
                  <div className="divide-y divide-gray-100">
                    {cart.map((item) => (
                      <div key={`${item.id}-${item.size}-${item.color}`} className="p-6 flex flex-col md:flex-row md:items-center">
                        <div className="flex-shrink-0 mb-4 md:mb-0 md:mr-6">
                          <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden">
                            <img 
                              src={item.image} 
                              alt={item.name} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                        
                        <div className="flex-grow md:mr-6">
                          <Link href={`/product/${item.id}`} className="font-medium hover:text-accent">
                            {item.name}
                          </Link>
                          <p className="text-dark text-sm mt-1">
                            Size: {item.size.toUpperCase()} | Color: {item.color.charAt(0).toUpperCase() + item.color.slice(1)}
                          </p>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex border border-gray-200 rounded w-24">
                              <button 
                                className="px-2 text-dark text-sm"
                                onClick={() => handleQuantityChange(item, item.quantity - 1)}
                              >
                                -
                              </button>
                              <input 
                                type="number" 
                                value={item.quantity} 
                                min="1"
                                onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                                className="w-full text-center text-sm focus:outline-none"
                              />
                              <button 
                                className="px-2 text-dark text-sm"
                                onClick={() => handleQuantityChange(item, item.quantity + 1)}
                              >
                                +
                              </button>
                            </div>
                            
                            <button 
                              className="text-dark hover:text-error transition ml-4" 
                              onClick={() => handleRemoveItem(item)}
                              aria-label="Remove item"
                            >
                              <i className="ri-delete-bin-line"></i>
                            </button>
                          </div>
                        </div>
                        
                        <div className="mt-4 md:mt-0 text-right">
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                          <p className="text-dark text-sm">${item.price.toFixed(2)} each</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="p-6 bg-light flex justify-between items-center">
                    <button 
                      className="text-dark hover:text-accent transition flex items-center"
                      onClick={() => clearCart()}
                    >
                      <i className="ri-delete-bin-line mr-2"></i> Clear Cart
                    </button>
                    <Link 
                      href="/shop" 
                      className="text-accent hover:underline flex items-center"
                    >
                      <i className="ri-arrow-left-line mr-2"></i> Continue Shopping
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg shadow-sm">
                  <div className="p-4 border-b">
                    <h2 className="font-heading text-xl font-semibold">Order Summary</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-dark">Subtotal</span>
                        <span className="font-medium">${subtotal.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark">Shipping</span>
                        <span className="font-medium">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-dark">Tax</span>
                        <span className="font-medium">${tax.toFixed(2)}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between py-4 border-t border-b">
                      <span className="font-medium">Total</span>
                      <span className="font-semibold text-accent text-xl">${total.toFixed(2)}</span>
                    </div>
                    
                    <div className="mt-6">
                      <label className="block text-sm font-medium mb-2">Apply Coupon Code</label>
                      <div className="flex">
                        <Input 
                          type="text" 
                          placeholder="Enter coupon code" 
                          className="flex-grow rounded-r-none"
                          value={couponCode}
                          onChange={(e) => setCouponCode(e.target.value)}
                        />
                        <Button 
                          className="rounded-l-none bg-primary"
                          onClick={handleApplyCoupon}
                          disabled={isApplyingCoupon || !couponCode}
                        >
                          Apply
                        </Button>
                      </div>
                      <p className="text-xs text-dark mt-1">Try using code "DISCOUNT10" for testing</p>
                    </div>
                    
                    <Button 
                      className="w-full mt-6 bg-accent hover:bg-accent/90 text-white py-3 rounded-full"
                      onClick={handleProceedToCheckout}
                    >
                      Proceed to Checkout
                    </Button>
                    
                    <div className="mt-6">
                      <h3 className="font-medium text-sm mb-2">We Accept</h3>
                      <div className="flex gap-2">
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                        <div className="w-10 h-6 bg-gray-200 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Cart;
