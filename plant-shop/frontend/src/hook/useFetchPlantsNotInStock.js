import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

const useFetchPlantsNotInStock = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const fetchMyPlantsInStock = async () => {
    try {
      const result = await axiosInstance.get(`/plante/notinstock`);
      setPlants(result.data);
      setError(null);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchMyPlantsInStock();
  }, []);
  return { plants, error };
};

export default useFetchPlantsNotInStock;
