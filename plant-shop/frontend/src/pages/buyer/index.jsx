import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import PlantCard from "./components/product-card"; // Your PlantCard component
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/nav-bar";

const BuyPlant = () => {
  const [plant, setPlant] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const query = new URLSearchParams(useLocation().search);
  const plantId = query.get("id");
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    async function fetchPlant() {
      try {
        const result = await axios.get(
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
  }, [plantId]);

  const handleProceedClick = () => {
    setShowForm(true);
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
              <form className="space-y-4">
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" placeholder="Your name" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="lastName">lastName</Label>
                      <Input id="lastName" type="text" placeholder="lastName" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="Your address" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                      <Label htmlFor="age">Age</Label>
                      <Input id="age" type="number" placeholder="age" />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setShowForm(false)}>
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
