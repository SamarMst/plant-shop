import { useEffect, useState } from "react";
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
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import Toast from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";

const Category = () => {
  const [categoryList, setCategoryList] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categoryNameUpdate, setCategoryNameUpdate] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  async function fetchCategoryList() {
    try {
      const result = await axiosInstance.get("/category/history/sold");
      setCategoryList(result.data);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to fetch categories"
      );
    }
  }

  async function createCategory() {
    try {
      const result = await axiosInstance.post("/category", {
        name: categoryName,
      });
      fetchCategoryList();
      Toast.success(result.data.message);
      setIsCreateDialogOpen(false);
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to create category"
      );
    }
  }

  async function updateCategory() {
    if (!categoryNameUpdate || !currentCategoryId) return;

    try {
      const result = await axiosInstance.put(`/category/${currentCategoryId}`, {
        name: categoryNameUpdate,
      });

      fetchCategoryList();
      Toast.success(result.data.message);
      setIsUpdateDialogOpen(false);
      setCurrentCategoryId(null);
      setCategoryNameUpdate("");
    } catch (error) {
      Toast.error(
        error?.response?.data?.message || "Failed to update category"
      );
    }
  }

  const handleEditClick = (category) => {
    setCurrentCategoryId(category.id);
    setCategoryNameUpdate(category.name);
    setIsUpdateDialogOpen(true);
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <div className="container p-10 space-y-6">
      <div className="flex gap-2 mb-4">
        <Input type="search" placeholder="Search category" className="w-1/3" />
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-green-500 hover:bg-green-600">
              New Category
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
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                type="submit"
                onClick={createCategory}
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
            {categoryList.map((item) => (
              <tr
                key={item.id}
                className="border-t border-gray-200 hover:bg-gray-100"
              >
                <td className="py-3 px-6">{item.name}</td>
                <td className="py-3 px-6 text-right space-x-2">
                  <Button
                    className="bg-yellow-500 hover:bg-yellow-600"
                    onClick={() => handleEditClick(item)}
                  >
                    Edit
                  </Button>
                  <Dialog
                    open={isUpdateDialogOpen}
                    onOpenChange={setIsUpdateDialogOpen}
                    overlayClassName="custom-overlay"
                  >
                    <DialogTrigger asChild></DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                      <DialogHeader>
                        <DialogTitle>Update Category</DialogTitle>
                        <DialogDescription>
                          Edit the category name. Click save when you're done.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                          <Label htmlFor="update-name" className="text-right">
                            Name
                          </Label>
                          <Input
                            id="update-name"
                            className="col-span-3"
                            value={categoryNameUpdate}
                            onChange={(e) =>
                              setCategoryNameUpdate(e.target.value)
                            }
                          />
                        </div>
                      </div>
                      <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                          <Button
                            type="submit"
                            onClick={updateCategory}
                            variant="secondary"
                            className="flex justify-center items-center p-5 ml-28  mt-3 h-11 text-lg font-sans bg-[#fee001] text-black rounded-md hover:bg-yellow-500  hover:text-black transition-colors duration-300"
                          >
                            Save changes
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
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
