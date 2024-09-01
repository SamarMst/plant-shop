import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axios-instance";

const useFetchMyPlants = () => {
  const [plants, setPlants] = useState([]);
  const [error, setError] = useState("");
  const fetchMyPlants = async () => {
    try {
      const result = await axiosInstance.get(`/plante/mine`);
      setPlants(result.data);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  useEffect(() => {
    fetchMyPlants();
  }, []);
  return { plants, error };
};

export default useFetchMyPlants;
