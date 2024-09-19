import React, { useState, useEffect } from "react";
import PlantCard from "./product-card";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

const CheckOut = () => {
  const [plants, setPlants] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    function getPlants() {
      const plantsString = localStorage.getItem("plant");
      if (plantsString) {
        try {
          const plantsArray = JSON.parse(plantsString);
          if (Array.isArray(plantsArray)) {
            const plantMap = plantsArray.reduce((acc, plant) => {
              if (!acc[plant.id]) {
                acc[plant.id] = { ...plant, count: plant.count || 1 };
              }
              return acc;
            }, {});
            const uniquePlants = Object.values(plantMap);
            setPlants(uniquePlants);
          }
        } catch (error) {
          console.error("Error parsing plants data:", error);
        }
      }
    }
    getPlants();
  }, []);

  useEffect(() => {
    const total = plants.reduce(
      (sum, plant) => sum + plant.price * plant.count,
      0
    );
    const quantity = plants.reduce((sum, plant) => sum + plant.count, 0);

    setTotalPrice(total);
    setTotalQuantity(quantity);
  }, [plants]);

  const handleDelete = (plantId) => {
    const updatedPlants = plants.filter((plant) => plant.id !== plantId);
    localStorage.setItem("plant", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  const handleIncrement = (plantId, newQuantity) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === plantId ? { ...plant, count: newQuantity } : plant
    );
    localStorage.setItem("plant", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  const handleDecrement = (plantId, newQuantity) => {
    const updatedPlants = plants.map((plant) =>
      plant.id === plantId ? { ...plant, count: newQuantity } : plant
    );
    localStorage.setItem("plant", JSON.stringify(updatedPlants));
    setPlants(updatedPlants);
  };

  return (
    <>
      <nav className="py-4 w-full flex justify-center items-center">
        <Logo />
      </nav>
      <hr className="border-2 font-bold" />
      <h1 className="ml-8 mt-20 font-semibold text-xl">
        Plant Cart - {totalQuantity} plants
      </h1>
      <div className="flex space-x-10">
        <div className="flex flex-col space-y-5 mt-8 ml-6">
          {plants.length === 0 ? (
            <p>No plants in the cart.</p>
          ) : (
            plants.map((plant, index) => (
              <PlantCard
                key={index}
                plant={plant}
                onDelete={() => handleDelete(plant.id)}
                onIncrement={(plantId, newQuantity) =>
                  handleIncrement(plantId, newQuantity)
                }
                onDecrement={(plantId, newQuantity) =>
                  handleDecrement(plantId, newQuantity)
                }
              />
            ))
          )}
        </div>
        <div className="flex flex-col border rounded-lg shadow-sm w-2/3 mt-8 ml-6 p-14">
          <h2 className="text-lg font-sans font-semibold pb-3">
            Discount Code
          </h2>
          <Button className="text-center mb-3 h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            Do you have a discount code?
          </Button>
          <h2 className="text-lg font-sans font-semibold pb-3">Gift Card</h2>
          <Button className="text-center h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300 mb-5">
            Enter your Gift Card here
          </Button>
          <hr className="border-2 font-bold mb-4" />
          <div className="flex justify-between">
            <h3 className="text-lg font-sans font-bold">Total</h3>
            <h3 className="text-lg font-sans font-bold mb-4">
              {totalPrice} DT
            </h3>
          </div>
          <Button className="text-center h-11 w-full text-xl font-sans bg-black text-white border border-black rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-5">
            Proceed
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
