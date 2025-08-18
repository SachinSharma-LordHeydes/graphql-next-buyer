interface QuantitySelectorProps {
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function QuantitySelector({ quantity, setQuantity }: QuantitySelectorProps) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-medium">Quantity:</span>
      <div className="flex items-center border rounded-lg">
        <button 
          onClick={() => setQuantity(Math.max(1, quantity - 1))} 
          className="px-3 py-2 hover:bg-gray-100"
        >
          -
        </button>
        <span className="px-4 py-2 border-x">{quantity}</span>
        <button 
          onClick={() => setQuantity(quantity + 1)} 
          className="px-3 py-2 hover:bg-gray-100"
        >
          +
        </button>
      </div>
    </div>
  );
}
