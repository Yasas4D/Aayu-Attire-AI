import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import CartItem from "./CartItem";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

const MiniCart = () => {
  const { cart, isMiniCartOpen, toggleMiniCart, removeFromCart, updateCartItemQuantity } = useCart();

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const subtotal = calculateSubtotal();
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  return (
    <Sheet open={isMiniCartOpen} onOpenChange={toggleMiniCart}>
      <SheetContent side="right" className="w-full sm:max-w-md flex flex-col h-full p-0">
        <SheetHeader className="px-4 py-4 border-b">
          <SheetTitle className="font-heading text-xl font-semibold">Your Cart ({cart.length})</SheetTitle>
          <SheetClose className="absolute right-4 top-4 text-dark hover:text-accent transition" />
        </SheetHeader>
        
        <div className="flex-grow overflow-y-auto p-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-4">
              <i className="ri-shopping-bag-line text-4xl text-gray-300 mb-2"></i>
              <p className="text-dark font-medium mb-2">Your cart is empty</p>
              <p className="text-dark text-sm mb-6">Looks like you haven't added any items to your cart yet.</p>
              <Link 
                href="/shop" 
                className="px-6 py-2 bg-accent text-white font-accent rounded-full inline-block"
                onClick={() => toggleMiniCart()}
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
                <CartItem 
                  key={`${item.id}-${item.size}-${item.color}`}
                  item={item}
                  onRemove={() => removeFromCart(item)}
                  onUpdateQuantity={(newQuantity) => updateCartItemQuantity(item, newQuantity)}
                />
              ))}
            </div>
          )}
        </div>
        
        {cart.length > 0 && (
          <div className="p-4 border-t mt-auto">
            <div className="flex justify-between mb-2">
              <span className="text-dark">Subtotal</span>
              <span className="font-semibold">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-4">
              <span className="text-dark">Shipping</span>
              <span className="font-semibold">{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between mb-6">
              <span className="font-medium">Total</span>
              <span className="font-semibold text-accent text-xl">${total.toFixed(2)}</span>
            </div>
            
            <Link 
              href="/cart" 
              className="block py-3 bg-accent text-white font-accent font-medium rounded-full text-center hover:bg-opacity-90 transition mb-3"
              onClick={() => toggleMiniCart()}
            >
              Checkout
            </Link>
            <Link 
              href="/cart"
              className="block py-3 border border-primary text-primary font-accent font-medium rounded-full text-center hover:bg-primary hover:text-white transition"
              onClick={() => toggleMiniCart()}
            >
              View Cart
            </Link>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default MiniCart;
