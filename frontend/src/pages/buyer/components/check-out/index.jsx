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
import useGetUserInfo from "@/hook/useGetUserInfo";
import Footer from "@/components/ui/footer";

const CheckOut = () => {
  const [plants, setPlants] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [isDialogGiftCardOpen, setIsDialogGiftCardOpen] = useState(false);
  const [isDialogDiscountCodeOpen, setIsDialogDiscountCodeOpen] =
    useState(false);
    const navigate = useNavigate();
    const { email } = useGetUserInfo();
    const token = localStorage.getItem("authToken");

    const calculateTotals = (plants) => {
      const total = plants.reduce(
        (acc, plant) => {
          const plantTotal = (plant.price || 0) * (plant.count || 0);
          return {
            price: acc.price + plantTotal,
            items: acc.items + (plant.count || 0),
          };
        },
        { price: 0, items: 0 }
      );
  
      setTotalPrice(total.price);
      setTotalItems(total.items);
    };
  
    const handleCountChange = (id, newCount) => {
      setPlants((prevPlants) => {
        const updatedPlants = prevPlants.map((plant) => {
          if (plant.id === id) {
            return { ...plant, count: newCount };
          }
          return plant;
        });
        localStorage.setItem(email, JSON.stringify(updatedPlants));
        calculateTotals(updatedPlants);
        return updatedPlants;
      });
    };
  
    const handlePlantRemove = (id) => {
      setPlants((prevPlants) => {
        const updatedPlants = prevPlants.filter((plant) => plant.id !== id);
        localStorage.setItem(email, JSON.stringify(updatedPlants));
        calculateTotals(updatedPlants);
        return updatedPlants;
      });
    };
  
    useEffect(() => {
      function getPlants() {
        const plantsString = localStorage.getItem(email);
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
  
              calculateTotals(uniquePlants);
            }
          } catch (error) {
            console.error("Error parsing plants data:", error);
          }
        }
      }
  
      getPlants();
    }, [email]);
  
    const verifyGiftCard = () => {
      setIsDialogGiftCardOpen(false);
    };
    const verifyDiscountCode = () => {
      setIsDialogDiscountCodeOpen(false);
    };

  return (
    <>
      <nav className="py-4 w-full flex justify-center items-center">
        <Logo />
      </nav>
      <hr className="border-2 font-bold" />
      <h1 className="ml-24 mt-20 font-semibold text-xl">
        {`Your Cart - ${totalItems} plants`}
      </h1>
      <div className="flex flex-col">
        <div className="flex space-x-20">
          <div className="flex flex-col space-y-5 mt-8 ml-24">
            {plants.length === 0 ? (
              <p>No plants in the cart.</p>
            ) : (
              plants.map((plant) => (
                <PlantCard
                  key={plant.id}
                  plant={plant}
                  onCountChange={handleCountChange}
                  onDelete={handlePlantRemove}
                />
              ))
            )}
          </div>
          <div className="flex flex-col border rounded-lg shadow-sm w-1/2 mt-8 ml-6 p-14">
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
                    Enter your Discount Code here
                  </DialogTitle>
                </DialogHeader>
                <div className="flex items-center space-x-2">
                  <div className="grid flex-1 gap-2">
                    <Input id="discount-code" type="text" />
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
            <hr className="border-2 font-bold mb-4 mt-5" />
            <div className="flex justify-between">
              <h3 className="text-lg font-sans font-bold">Total</h3>
              <h3 className="text-lg font-sans font-bold mb-4">
                {totalPrice.toFixed(2)} DT
              </h3>
            </div>
            <Button
              className="text-center h-11 w-full text-xl font-sans bg-black text-white border border-black rounded-md hover:bg-gray-900 hover:text-white transition-colors duration-300 mb-5"
              onClick={() =>
                !token
                  ? navigate("/login")
                  : navigate("/payments", { state: { totalPrice } })
              }
            >
              {token ? "Proceed to Payment" : "Login to Continue"}
            </Button>
          </div>
        </div>
        <hr className="border-2 font-bold mt-12" />
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
      <Footer />
    </>
  );
};

export default CheckOut;
