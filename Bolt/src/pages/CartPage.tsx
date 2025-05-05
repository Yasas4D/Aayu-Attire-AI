import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, subtotal, itemCount } = useCart();
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  
  const shippingCost = subtotal > 100 ? 0 : 10;
  const totalCost = subtotal + shippingCost;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsApplyingCoupon(true);
    setTimeout(() => {
      setCouponError('Invalid coupon code or expired');
      setIsApplyingCoupon(false);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <main className="pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
          
          <div className="text-center py-16">
            <div className="bg-gray-100 inline-flex p-6 rounded-full mb-6">
              <ShoppingBag size={32} className="text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-8">Looks like you haven't added any items to your cart yet.</p>
            <Link
              to="/shop"
              className="inline-flex items-center px-6 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg transition-colors"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={18} />
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
              {/* Cart Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Cart Items ({itemCount})</h2>
                </div>
              </div>
              
              {/* Cart Items */}
              <div className="divide-y divide-gray-100">
                {cart.map((item, index) => (
                  <div key={`${item.product.id}-${item.size}-${item.color}-${index}`} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <Link to={`/product/${item.product.id}`}>
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name}
                            className="w-24 h-24 object-cover rounded-md"
                          />
                        </Link>
                      </div>
                      
                      {/* Product Details */}
                      <div className="flex-1">
                        <Link
                          to={`/product/${item.product.id}`}
                          className="text-lg font-medium hover:text-amber-600 transition-colors"
                        >
                          {item.product.name}
                        </Link>
                        
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-2">
                          <p>Size: {item.size}</p>
                          <p>Color: {item.color}</p>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          {/* Price */}
                          <div>
                            {item.product.discountPrice ? (
                              <>
                                <span className="font-medium">${item.product.discountPrice}</span>
                                <span className="ml-2 text-sm text-gray-500 line-through">${item.product.price}</span>
                              </>
                            ) : (
                              <span className="font-medium">${item.product.price}</span>
                            )}
                          </div>
                          
                          {/* Quantity Controls */}
                          <div className="flex items-center">
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className={`p-1 rounded-full ${
                                item.quantity <= 1 
                                  ? 'text-gray-300 cursor-not-allowed' 
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <Minus size={16} />
                            </button>
                            
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            
                            <button
                              onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                              disabled={item.quantity >= item.product.stock}
                              className={`p-1 rounded-full ${
                                item.quantity >= item.product.stock
                                  ? 'text-gray-300 cursor-not-allowed'
                                  : 'text-gray-600 hover:bg-gray-100'
                              }`}
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Remove Button */}
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="p-2 text-gray-500 hover:text-red-500 rounded-full hover:bg-gray-100 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Continue Shopping */}
              <div className="p-6 border-t border-gray-100">
                <Link 
                  to="/shop"
                  className="text-amber-600 hover:text-amber-700 font-medium flex items-center justify-center sm:justify-start"
                >
                  <ArrowRight size={18} className="mr-2 transform rotate-180" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden sticky top-28">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-lg font-semibold">Order Summary</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="font-medium">${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Shipping</span>
                  {shippingCost === 0 ? (
                    <span className="text-green-600">Free</span>
                  ) : (
                    <span className="font-medium">${shippingCost.toFixed(2)}</span>
                  )}
                </div>
                
                {/* Apply Coupon */}
                <div className="pt-2">
                  <form onSubmit={handleApplyCoupon}>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Discount Code
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        value={couponCode}
                        onChange={(e) => {
                          setCouponCode(e.target.value);
                          setCouponError('');
                        }}
                        placeholder="Enter coupon code"
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-l-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                      />
                      <button
                        type="submit"
                        disabled={isApplyingCoupon || !couponCode}
                        className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-r-lg disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isApplyingCoupon ? 'Applying...' : 'Apply'}
                      </button>
                    </div>
                    {couponError && (
                      <p className="mt-1 text-sm text-red-600">{couponError}</p>
                    )}
                  </form>
                </div>
                
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>${totalCost.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {shippingCost === 0 ? 'Including free shipping' : 'Including shipping cost'}
                  </p>
                </div>
                
                <button
                  className="w-full py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-medium transition-colors mt-6"
                >
                  Proceed to Checkout
                </button>
                
                <div className="text-center text-sm text-gray-500 mt-4 space-y-2">
                  <p>We accept:</p>
                  <div className="flex justify-center space-x-2">
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
      </div>
    </main>
  );
};

export default CartPage;