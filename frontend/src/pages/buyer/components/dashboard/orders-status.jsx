import axiosInstance from "@/lib/axios-instance";
import { useEffect, useState } from "react";
import Toast from "react-hot-toast";

const OrdersStatus = () => {
  const [ordersStatus, setOrdersStatus] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchOrdersStatus = async () => {
      try {
        const result = await axiosInstance.get(`/history`);
        setOrdersStatus(
          result.data.data.filter((item) => item.status === "PENDING")
        );
      } catch (error) {
        Toast.error("Failed to fetch sold plants.");
      }
    };

    fetchOrdersStatus();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case "ACCEPTED":
        return "text-green-500";
      case "REFUSED":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  return (
    <>
      <div className="flex-grow ml-4 p-4 border border-black rounded-lg bg-white">
        {ordersStatus && ordersStatus.length > 0 ? (
          <div className="flex-grow ml-4 p-4 border border-black rounded-lg bg-white">
            <div className="container p-10 space-y-10">
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
                      Name
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Quantity
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Type
                    </th>
                    <th className="text-left py-3 px-4 uppercase font-semibold text-sm">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ordersStatus.map((item) => (
                    <tr
                      key={item.id}
                      className="border-t border-gray-200 hover:bg-gray-100"
                    >
                      <td className="py-3 px-4">{item.id}</td>
                      <td className="py-3 px-4">{item.plantId}</td>
                      <td className="py-3 px-4">{item.plant.name}</td>
                      <td className="py-3 px-4">{item.quantity}</td>
                      <td className="py-3 px-4">{item.plant.type}</td>
                      <td
                        className={`py-3 px-4 ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          <div className="m-28 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
              No PENDING Orders
            </h2>
            <p className="text-center text-base text-gray-600">
              It looks like there are pending orders at the moment.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default OrdersStatus;
