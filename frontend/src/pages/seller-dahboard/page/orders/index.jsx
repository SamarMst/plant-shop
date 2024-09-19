import { useState, useEffect } from "react";
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
import Select from "react-select";
import axiosInstance from "@/lib/axios-instance";

const Orders = () => {
  const [status, setStatus] = useState(null);
  const [orderId, setOrderId] = useState("");
  const [orders, setOrders] = useState([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const fetchPendingOrders = async () => {
      try {
        const result = await axiosInstance.get(`/history/pendings`);
        setOrders(result.data.data);
      } catch (error) {
        Toast.error("Failed to fetch pending orders.");
      }
    };

    fetchPendingOrders();
  });

  const updateOrderStatus = async () => {
    try {
      const result = await axiosInstance.put(
        `http://localhost:4000/orders/status`,
        {
          orderId,
          status,
        }
      );
      Toast.success(result.data.message);
      setIsDialogOpen(false);
      const updatedOrders = await axiosInstance.get(`/history/pendings`);
      setOrders(updatedOrders.data.data);
    } catch (error) {
      Toast.error(error.response.data.message);
    }
  };

  const handleStatusChange = (status, id) => {
    setStatus(status);
    setOrderId(id);
    updateOrderStatus();
  };

  return (
    <div className="container p-10 space-y-10">
      <div className="flex gap-2">
        <Input type="search" placeholder="Search order" />
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>Order</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[520px]">
            <DialogHeader>
              <DialogTitle>Order</DialogTitle>
              <DialogDescription>
                Fill the form to change the status of the order. Click save when
                you're done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-6">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="orderId" className="text-right">
                  Order Id
                </Label>
                <Input
                  id="orderId"
                  className="col-span-3"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <div className="col-span-3">
                  <Select
                    id="status"
                    options={[
                      { value: "ACCEPTED", label: "ACCEPTED" },
                      { value: "REFUSED", label: "REFUSED" },
                    ]}
                    placeholder="Select status"
                    onChange={(option) => setStatus(option?.value)}
                  />
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button type="button" onClick={updateOrderStatus}>
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
              Order Id
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Plant Id
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Quantity
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Status
            </th>
            <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {orders.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4">{item.plantId}</td>
              <td className="py-3 px-4">{item.quantity}</td>
              <td className="py-3 px-4 ">{item.status}</td>
              <td className="py-3 px-4 text-right">
                <div className="flex justify-end space-x-2">
                  <Button
                    onClick={() => handleStatusChange("ACCEPTED", item.id)}
                  >
                    ACCEPT
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleStatusChange("REFUSED", item.id)}
                  >
                    REFUSE
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
