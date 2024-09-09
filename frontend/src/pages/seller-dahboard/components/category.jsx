import { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Toast from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";

const Category = () => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  async function createNewCategory() {
    try {
      const result = await axiosInstance.post(
        "http://localhost:4000/category",
        {
          name: newCategory,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategory();
      Toast.success(result.data.message);
      setIsDialogOpen(false);
    } catch (error) {
      Toast.error(error.response.data.message);
    }
  }

  async function fetchCategory() {
    try {
      const result = await axios.get(
        "http://localhost:4000/category/history/sold",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategory(result.data);
    } catch (error) {
      Toast.error(error.response.data.message);
    }
  }

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <div className="container p-10 space-y-6">
      <div className="flex gap-2 mb-4">
        <Input type="search" placeholder="Search category" className="w-1/3" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              New category
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Fill the form to create a new category. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  className="col-span-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={createNewCategory}
                className="bg-blue-500 hover:bg-blue-600"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="overflow-x-auto">
        <table className="max-w-xl w-full bg-white border border-gray-200 rounded-xl shadow-md">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-3 px-6 uppercase font-semibold text-sm">
                Name
              </th>
              <th className="text-right py-3 px-14 uppercase font-semibold text-sm">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {category.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6 text-right space-x-2">
                  <Button className="bg-yellow-500 hover:bg-yellow-600">
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    className="bg-red-500 hover:bg-red-600"
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Category;
