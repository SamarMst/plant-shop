import React, { useState, useEffect } from "react";
import PlantCard from "./components/product-card";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import GetInspired from "./components/get-inspired";
import { useNavigate } from "react-router-dom";

const CheckOut = () => {
  const [plants, setPlants] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [isDialogGiftCardOpen, setIsDialogGiftCardOpen] = useState(false);
  const [isDialogDiscountCodeOpen, setIsDialogDiscountCodeOpen] =
    useState(false);
  const navigate = useNavigate();

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

  const verifyGiftCard = () => {
    setIsDialogGiftCardOpen(false);
  };
  const verifyDiscountCode = () => {
    setIsDialogDiscountCodeOpen(false);
  };

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
      <div className="flex flex-col">
        <div className="flex space-x-10">
          <div className="flex flex-col space-y-5 mt-8 ml-6">
            {plants.length === 0 ? (
              <p>No plants in the cart.</p>
            ) : (
              plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onDelete={() => handleDelete(plant.id)}
                  onIncrement={(newQuantity) =>
                    handleIncrement(plant.id, newQuantity)
                  }
                  onDecrement={(newQuantity) =>
                    handleDecrement(plant.id, newQuantity)
                  }
                />
              ))
            )}
          </div>
          <div className="flex flex-col border rounded-lg shadow-sm w-2/3 mt-8 ml-6 p-14">
            <h2 className="text-lg font-sans font-semibold pb-3">
              Discount Code
            </h2>
            <Dialog
              open={isDialogDiscountCodeOpen}
              onOpenChange={setIsDialogDiscountCodeOpen}
            >
              <DialogTrigger asChild>
                <Button className="text-center mb-3 h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300">
                  Do you have a Discount Code?
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Enter yourDiscount Code here
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input id="gift-card" type="text" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={verifyDiscountCode}
                      className="flex justify-center items-center p-5 ml-28  mt-3 h-11 text-lg font-sans bg-[#fee001] text-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      Verify Discount Code
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <h2 className="text-lg font-sans font-semibold pb-3">Gift Card</h2>
            <Dialog
              open={isDialogGiftCardOpen}
              onOpenChange={setIsDialogGiftCardOpen}
            >
              <DialogTrigger asChild>
                <Button className="text-center mb-3 h-11 w-full text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300">
                  Enter your Gift Card here
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle className="text-xl">
                    Enter your Gift Card here
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input id="gift-card" type="text" />
                  </div>
                </div>
                <DialogFooter className="sm:justify-start">
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={verifyGiftCard}
                      className="flex justify-center items-center p-5 ml-28  mt-3 h-11 text-lg font-sans bg-[#fee001] text-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
                    >
                      Verify Gift Card
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
            <hr className="border-2 font-bold mb-4" />
            <div className="flex justify-between">
              <h3 className="text-lg font-sans font-bold">Total</h3>
              <h3 className="text-lg font-sans font-bold mb-4">
                {totalPrice} DT
              </h3>
            </div>
            <Button
              className="text-center h-11 w-full text-xl font-sans bg-black text-white border border-black rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-5"
              onClick={() => navigate("/payments")}
            >
              Proceed
            </Button>
          </div>
        </div>
        <hr className="border-2 font-bold mt-8" />
        <h3 className="flex justify-center items-center text-xl font-serif font-bold mt-5">
          Let yourself be inspired
        </h3>
        <div className="flex flex-col justify-center items-center mt-6 mb-14">
          <GetInspired />
          <Button
            className="text-center mt-8 mb-8 h-11 w-96 text-xl font-sans bg-white text-black border border-black rounded-md hover:bg-black hover:text-white transition-colors duration-300"
            onClick={() => navigate("/")}
          >
            Back to the store
          </Button>
        </div>
      </div>
      <div className="w-full h-20 bg-green-500 ">
        <footer className="flex flex-row justify-between items-center px-6 py-4 border-t-2 shadow-md">
          <Logo />
          <p className=" text-xl">
            &copy; {new Date().getFullYear()} samar002ms@gmail.com{" "}
          </p>
          <p className="text-xl">All rights reserved.</p>
        </footer>
      </div>
    </>
  );
};

export default CheckOut;
