import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav-bar";
import axiosInstance from "@/lib/axios-instance";
import PlantCard from "./components/product-card";

const BuyPlant = () => {
  const [plant, setPlant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const query = new URLSearchParams(useLocation().search);
  const plantId = query.get("id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchPlant() {
      try {
        const result = await axiosInstance.get(
          `http://localhost:4000/plante/${plantId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPlant(result.data);
      } catch (error) {
        console.error("Error fetching plant:", error);
      }
    }

    fetchPlant();
  }, [plantId, token]);

  const handleProceedClick = (quantity) => {
    setSelectedQuantity(quantity);
    setShowForm(true);
  };

  const handleCancelClick = () => {
    setShowForm(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const requestData = {
      plantId,
      quantity: selectedQuantity, // Use the selected quantity here
    };

    console.log("Request Data:", requestData);

    try {
      const result = await axiosInstance.post(`/orders`, requestData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success(result.data.message);
      setName("");
      setLastName("");
      setAddress("");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!plant) return <div>Loading...</div>;

  return (
    <div className="min-h-screen gap-4">
      <Navbar />
      <div className="flex gap-12 p-4 max-w-5xl my-20 mx-auto">
        <div className="flex-shrink-0 w-1/2">
          <PlantCard plant={plant} onProceedClick={handleProceedClick} />
        </div>
        {showForm && (
          <div className="flex-grow w-1/2">
            <Card className="w-full max-w-2xl mx-auto">
              <CardHeader>
                <CardTitle>Order Details</CardTitle>
                <CardDescription>
                  Fill in your details to proceed.
                </CardDescription>
              </CardHeader>
              <form className="space-y-4" onSubmit={handleSubmit}>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        placeholder="Your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Your Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        placeholder="Your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handleCancelClick}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Order</Button>
                </CardFooter>
              </form>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyPlant;
