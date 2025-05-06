import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { CartItem } from "@/lib/types";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  updateCartItemQuantity: (item: CartItem, quantity: number) => void;
  clearCart: () => void;
  isMiniCartOpen: boolean;
  toggleMiniCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isMiniCartOpen, setIsMiniCartOpen] = useState(false);
  const { toast } = useToast();

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error("Failed to parse cart from localStorage:", error);
      }
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (newItem: CartItem) => {
    setCart((prevCart) => {
      // Check if item already exists in cart with same size and color
      const existingItemIndex = prevCart.findIndex(
        (item) => item.id === newItem.id && item.size === newItem.size && item.color === newItem.color
      );

      if (existingItemIndex !== -1) {
        // Update quantity if item already exists
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += newItem.quantity;
        
        toast({
          title: "Cart updated",
          description: `${newItem.name} quantity updated in your cart.`,
        });
        
        return updatedCart;
      } else {
        // Add new item to cart
        toast({
          title: "Added to cart",
          description: `${newItem.name} has been added to your cart.`,
        });
        
        return [...prevCart, newItem];
      }
    });

    // Open mini cart when item is added
    setIsMiniCartOpen(true);
  };

  const removeFromCart = (itemToRemove: CartItem) => {
    setCart((prevCart) => {
      const filteredCart = prevCart.filter(
        (item) => !(item.id === itemToRemove.id && item.size === itemToRemove.size && item.color === itemToRemove.color)
      );
      
      toast({
        title: "Item removed",
        description: `${itemToRemove.name} has been removed from your cart.`,
      });
      
      return filteredCart;
    });
  };

  const updateCartItemQuantity = (itemToUpdate: CartItem, newQuantity: number) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemToUpdate.id && item.size === itemToUpdate.size && item.color === itemToUpdate.color) {
          return { ...item, quantity: newQuantity };
        }
        return item;
      });
    });
  };

  const clearCart = () => {
    setCart([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  const toggleMiniCart = () => {
    setIsMiniCartOpen(!isMiniCartOpen);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateCartItemQuantity,
        clearCart,
        isMiniCartOpen,
        toggleMiniCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
