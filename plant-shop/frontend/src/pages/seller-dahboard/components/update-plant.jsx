import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";

const UpdatePlant = ({
  id,
  name = "",
  type = "INDOOR",
  price,
  quantity,
  category = [], // Default to empty array
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [plantName, setPlantName] = useState(name);
  const [plantType, setPlantType] = useState(type);
  const [plantPrice, setPlantPrice] = useState(price);
  const [plantQuantity, setPlantQuantity] = useState(quantity);
  const [plantCategory, setPlantCategory] = useState([]);

  useEffect(() => {
    if (category) {
      setPlantCategory(category.map((item) => item.plantCategory.id));
    }
  }, [category]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("name", plantName);
    formData.append("quantity", plantQuantity);
    formData.append("type", plantType);
    formData.append("price", plantPrice);
    formData.append("categoryIds", plantCategory);

    try {
      const result = await axiosInstance.put(`/plante/${id}`, formData);
      setIsDialogOpen(false);
    } catch (error) {
      console.log("Error updating plant:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button className="w-full">Edit</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Plant</DialogTitle>
          <DialogDescription>
            Make changes to your plant details here. Click save when you're
            done.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="type" className="text-right">
                Type
              </Label>
              <Input
                id="type"
                value={plantType}
                onChange={(e) => setPlantType(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                Price
              </Label>
              <Input
                id="price"
                type="number"
                value={plantPrice}
                onChange={(e) => setPlantPrice(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="quantity" className="text-right">
                Quantity
              </Label>
              <Input
                id="quantity"
                type="number"
                value={plantQuantity}
                onChange={(e) => setPlantQuantity(e.target.value)}
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                Category
              </Label>
              <Input
                id="category"
                value={plantCategory}
                onChange={(e) => setPlantCategory(e.target.value.split(","))}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdatePlant;
