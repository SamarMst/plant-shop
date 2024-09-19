import { Input } from "@/components/ui/input";
import { Trash } from "lucide-react";
import { useState, useEffect } from "react";

const PlantCard = ({ plant, onDelete, onIncrement, onDecrement }) => {
  const [quantity, setQuantity] = useState(plant.count || 1);
  const [totalPrice, setTotalPrice] = useState(plant.price * quantity);

  useEffect(() => {
    setTotalPrice(plant.price * quantity);
  }, [quantity, plant.price]);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onIncrement(plant.id, newQuantity);
  };

  const decrementQuantity = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onDecrement(plant.id, newQuantity);
  };

  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm max-w-3xl ">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={`http://localhost:4000/${plant.resources[0]?.filename}`}
          alt={plant.name}
          className="object-cover w-full h-36 rounded-lg"
        />
      </div>
      <div className="ml-4 flex flex-col w-2/3">
        <h2 className="text-lg font-bold">{plant.name}</h2>
        <p className="text-sm text-gray-600">Type: {plant.type}</p>
        <p className="text-sm text-gray-600">
          Quantity Available: {plant.quantity}
        </p>
        <p className="text-lg font-semibold text-green-600">{totalPrice} DT</p>
        <div className="flex items-center justify-between mt-2 w-full">
          <div className="flex items-center border border-gray-300 rounded-md w-auto">
            <button
              className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-300 rounded-l-md"
              onClick={decrementQuantity}
            >
              -
            </button>
            <Input
              id="quantity"
              type="text"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="text-center w-16 border-none font-bold"
            />
            <button
              className="px-3 py-1 text-gray-600 font-bold hover:bg-gray-300 rounded-r-md"
              onClick={incrementQuantity}
            >
              +
            </button>
          </div>

          <button
            className="text-red-500 hover:text-red-700 ml-4"
            onClick={onDelete}
          >
            <Trash size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
