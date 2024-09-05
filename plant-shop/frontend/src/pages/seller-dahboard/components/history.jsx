import { useState, useEffect } from "react";
import Toast from "react-hot-toast";
import axiosInstance from "@/lib/axios-instance";

const History = () => {
  const [soldPlants, setSoldPlants] = useState([]);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const fetchSoldPlants = async () => {
      try {
        const result = await axiosInstance.get(`/history`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setSoldPlants(result.data.data);
      } catch (error) {
        Toast.error("Failed to fetch sold plants.");
      }
    };

    fetchSoldPlants();
  }, [token]);

  // Determine status color
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
          {soldPlants.map((item) => (
            <tr
              key={item.id}
              className="border-t border-gray-200 hover:bg-gray-100"
            >
              <td className="py-3 px-4">{item.id}</td>
              <td className="py-3 px-4">{item.plantId}</td>
              <td className="py-3 px-4">{item.plant.name}</td>
              <td className="py-3 px-4">{item.quantity}</td>
              <td className="py-3 px-4">{item.plant.type}</td>
              <td className={`py-3 px-4 ${getStatusColor(item.status)}`}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default History;
