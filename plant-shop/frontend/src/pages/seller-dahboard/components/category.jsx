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

const Category = () => {
  const [category, setCategory] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const token = localStorage.getItem("authToken");

  async function createNewCategory() {
    try {
      const result = await axios.post(
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
    <div className=" container p-10 space-y-6">
      <div className="flex gap-2">
        <Input type="search" placeholder="Search category" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>New category</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Create Category</DialogTitle>
              <DialogDescription>
                Fill the form to create new category. Click save when you're
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
              <Button type="submit" onClick={createNewCategory}>
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <table className="min-w-full bg-white border border-gray-200 rounded-xl shadow-md">
        <thead className="bg-gray-200">
          <tr>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Name
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
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
              <td className="py-3 px-4">{item.name}</td>
              <td className="py-3 px-4 space-x-4">
                <Button>Edit</Button>
                <Button variant="destructive">Delete</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Category;
