import { CartItem as CartItemType } from "@/lib/types";

interface CartItemProps {
  item: CartItemType;
  onRemove: () => void;
  onUpdateQuantity: (quantity: number) => void;
}

const CartItem = ({ item, onRemove, onUpdateQuantity }: CartItemProps) => {
  const handleDecreaseQuantity = () => {
    if (item.quantity > 1) {
      onUpdateQuantity(item.quantity - 1);
    }
  };

  const handleIncreaseQuantity = () => {
    onUpdateQuantity(item.quantity + 1);
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (!isNaN(value) && value > 0) {
      onUpdateQuantity(value);
    }
  };

  return (
    <div className="flex gap-4 py-4 border-b">
      <div className="w-20 h-24 bg-gray-100 rounded-md overflow-hidden">
        <img 
          src={item.image} 
          alt={item.name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-grow">
        <h4 className="font-medium">{item.name}</h4>
        <p className="text-dark text-sm">Size: {item.size.toUpperCase()} | Color: {item.color}</p>
        <div className="flex justify-between items-center mt-2">
          <div className="flex border border-gray-200 rounded w-24">
            <button 
              className="px-2 text-dark text-sm"
              onClick={handleDecreaseQuantity}
            >
              -
            </button>
            <input 
              type="number" 
              value={item.quantity} 
              min="1"
              onChange={handleQuantityChange}
              className="w-full text-center text-sm focus:outline-none"
            />
            <button 
              className="px-2 text-dark text-sm"
              onClick={handleIncreaseQuantity}
            >
              +
            </button>
          </div>
          <p className="font-semibold text-accent">${(item.price * item.quantity).toFixed(2)}</p>
        </div>
      </div>
      <button 
        className="text-dark hover:text-error transition" 
        aria-label="Remove item"
        onClick={onRemove}
      >
        <i className="ri-delete-bin-line"></i>
      </button>
    </div>
  );
};

export default CartItem;
