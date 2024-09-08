import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

const PlantCard = ({ plant, onProceedClick }) => {
  const [quantity, setQuantity] = useState(1);
  const [totalPrice, setTotalPrice] = useState(plant.price);

  useEffect(() => {
    setTotalPrice(plant.price * quantity);
  }, [quantity, plant.price]);

  const handleQuantityChange = (event) => {
    const value = Number(event.target.value);
    setQuantity(value >= 1 ? value : 1);
  };

  return (
    <div className="flex items-center p-4 border border-gray-300 rounded-lg shadow-sm max-w-xl mx-auto">
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
        <p className="text-lg font-semibold text-green-600">
          ${totalPrice.toFixed(2)}
        </p>
        <div className="flex items-center mt-2">
          <label htmlFor="quantity" className="mr-2 text-sm font-medium">
            Quantity:
          </label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={quantity}
            onChange={handleQuantityChange}
          />
        </div>
        <Button
          className="mt-4 bg-green-500 text-white py-2 px-3 rounded hover:bg-green-700"
          onClick={() => onProceedClick(quantity)}
        >
          Procéder
        </Button>
      </div>
    </div>
  );
};

export default PlantCard;
