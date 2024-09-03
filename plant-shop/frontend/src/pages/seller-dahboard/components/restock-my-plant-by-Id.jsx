import React, { useState } from "react";
import axiosInstance from "@/lib/axios-instance";

const RestockMyPlant = () => {
  const [plantId, setPlantId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRestock = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axiosInstance.put(
        `/plante/restock/${plantId}/quantity/${quantity}`
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
    <div className="m-28 max-w-md mx-auto p-4 border border-gray-300 rounded-lg shadow-md bg-white">
      <h2 className="text-xl font-bold mb-4">Restock Plant</h2>
      <form onSubmit={handleRestock} className="space-y-4">
        <div>
          <label
            htmlFor="plantId"
            className="block text-sm font-medium text-gray-700"
          >
            Plant ID
          </label>
          <input
            id="plantId"
            type="text"
            value={plantId}
            onChange={(e) => setPlantId(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="quantity"
            className="block text-sm font-medium text-gray-700"
          >
            Quantity
          </label>
          <input
            id="quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-600 text-white rounded-md shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          disabled={loading}
        >
          {loading ? "Restocking..." : "Restock Plant"}
        </button>
      </form>
      {message && (
        <p
          className={`mt-4 text-sm ${
            message.startsWith("An error") ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default RestockMyPlant;
