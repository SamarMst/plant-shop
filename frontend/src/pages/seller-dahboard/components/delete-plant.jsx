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
import axiosInstance from "@/lib/axios-instance";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DeletePlant = ({ id }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (isDialogOpen) {
      console.log(`Dialog opened for plant with ID: ${id}`);
    }
  }, [isDialogOpen, id]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      await axiosInstance.delete(`/plante/${id}`);
      setIsDialogOpen(false);
      navigate("/seller/plants");
    } catch (error) {
      console.log("Error deleting plant:", error);
    }
  };

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Plant</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this plant?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="secondary" onClick={() => setIsDialogOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={handleSubmit}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeletePlant;
