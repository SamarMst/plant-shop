import React, { useState, useEffect } from "react";
import PlantCard from "./product-card";
import Logo from "@/components/logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const CheckOut = () => {
  const [plants, setPlants] = useState([]);

  const handleDelete = (plantId) => {
    const plantsString = localStorage.getItem("plant");
    if (plantsString) {
      const plantsArray = JSON.parse(plantsString);
      const updatedPlants = plantsArray.filter((plant) => plant.id !== plantId);
      localStorage.setItem("plant", JSON.stringify(updatedPlants));
      setPlants((prevPlants) =>
        prevPlants.filter((plant) => plant.id !== plantId)
      );
    }
  };

  useEffect(() => {
    function getPlants() {
      const plantsString = localStorage.getItem("plant");
      if (plantsString) {
        try {
          const plantsArray = JSON.parse(plantsString);
          if (Array.isArray(plantsArray)) {
            const plantMap = plantsArray.reduce((acc, plant) => {
              if (!acc[plant.id]) {
                acc[plant.id] = { ...plant, count: 1 };
              } else {
                acc[plant.id].count += 1;
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

  return (
    <>
      <nav className="ml-5 py-4 w-full ">
        <Logo />
      </nav>
      <hr className="border-2 font-bold" />
      <h1 className="ml-8 mt-20 font-semibold text-xl">Plant Cart</h1>
      <div className="flex space-x-10">
        <div className="flex flex-col space-y-5 mt-8 ml-6 ">
          {plants.length === 0 ? (
            <p>Loading ...</p>
          ) : (
            plants.map((plant, index) => (
              <PlantCard
                key={index}
                plant={plant}
                onDelete={() => handleDelete(plant.id)}
              />
            ))
          )}
        </div>
        <div className="flex flex-col p-2 border border-gray-300 rounded-lg shadow-sm w-2/3  mt-8 ml-6 ">
          <h2 className="text-lg font-sans font-semibold pb-3">
            Discount Code
          </h2>
          <Button className="text-center mb-3 h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            Do you have a discount code?
          </Button>
          <h2 className="text-lg font-sans font-semibold pb-3">Gift Card</h2>
          <Button className="text-center  h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300">
            Enter your Gift Card here
          </Button>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
