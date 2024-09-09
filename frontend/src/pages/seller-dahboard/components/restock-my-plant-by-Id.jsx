import React, { useState } from "react";
import axiosInstance from "@/lib/axios-instance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const RestockMyPlant = () => {
  const [plantId, setPlantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRestock = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const plantIdNumber = parseInt(plantId, 10);
    const quantityNumber = parseInt(quantity, 10);

    if (isNaN(plantIdNumber) || plantIdNumber <= 0) {
      setMessage("Plant ID must be a positive integer.");
      setLoading(false);
      return;
    }

    if (isNaN(quantityNumber) || quantityNumber <= 0) {
      setMessage("Quantity must be an integer greater than 0.");
      setLoading(false);
      return;
    }

    try {
      const response = await axiosInstance.put(
        `/plante/restock/${plantIdNumber}/quantity/${quantityNumber}`
      );
      setMessage(response.data.message);
      setPlantId("");
      setQuantity("");
    } catch (error) {
      setMessage(
        error.response ? error.response.data.message : "An error occurred."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Restock Plant</CardTitle>
        <CardDescription>
          Provide the plant ID and quantity to restock.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleRestock} className="space-y-4">
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="plantId">Plant ID</Label>
              <Input
                id="plantId"
                type="text"
                placeholder="Enter plant ID"
                value={plantId}
                onChange={(e) => setPlantId(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Enter quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
              {message && <p className="text-red-500 text-sm">{message}</p>}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            type="button"
            onClick={() => {
              setPlantId("");
              setQuantity("");
            }}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? "Restocking..." : "Restock Plant"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default RestockMyPlant;
