import { useEffect, useState } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function CreatePlant() {
  const [plantName, setPlantName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [type, setType] = useState("INDOOR");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState([]);
  const [images, setImages] = useState([]);
  const [categories, setCategories] = useState([]); // Categories state to hold fetched data

  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/jpeg, image/png",
    onDrop: (acceptedFiles) => {
      setImages(acceptedFiles);
    },
  });

  useEffect(() => {
    // Fetch categories when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get("/category/history/sold"); 
        const categories = response.data.map((cat) => ({
          value: cat.id,   
          label: cat.name, 
        }));
        setCategories(categories);
      } catch (error) {
        toast.error("Failed to load categories",error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", plantName);
    formData.append("quantity", quantity);
    formData.append("type", type);
    formData.append("price", price);
    formData.append("categoryIds", category.map(c => c.value)); 
    const x = formData.get('categoryIds')
    console.log(x)
    console.log(typeof x)
    images.forEach((file) => {
      formData.append("files", file);
    });

    try {
      const result = await axiosInstance.post(`/plante`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success(result.data.message);
      // setPlantName("");
      // setCategory([]);
      // setQuantity("");
      // setType("INDOOR");
      // setPrice("");
      // setImages([]);

    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Create Plant</CardTitle>
        <CardDescription>
          Fill in the details to add a new plant.
        </CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CardContent>
          <div className="grid gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Name of the plant"
                value={plantName}
                onChange={(e) => setPlantName(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                type="number"
                placeholder="Quantity"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="type">Type</Label>
              <Select
                options={[
                  { value: "INDOOR", label: "Indoor" },
                  { value: "OUTDOOR", label: "Outdoor" },
                ]}
                placeholder="Select type"
                value={{ value: type, label: type === "INDOOR" ? "Indoor" : "Outdoor" }}
                onChange={(option) => setType(option?.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="category">Category</Label>
              <Select
                options={categories}
                placeholder="Select category"
                isMulti
                value={category}
                onChange={setCategory}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="images">Images</Label>
              <div
                {...getRootProps()}
                className="border border-dashed border-gray-300 p-4 text-center"
              >
                <input {...getInputProps()} />
                <p>Drag & drop some images here, or click to select images</p>
              </div>
              {images.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index}`}
                      className="w-24 h-24 object-cover"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button type="submit">Save Plant</Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default CreatePlant;
