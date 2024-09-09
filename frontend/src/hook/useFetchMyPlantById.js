import { useEffect, useState } from "react";
import axios from "axios";

const useFetchMyPlantById = (plantId) => {
  const [plant, setPlant] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPlant = async () => {
      if (!plantId) return;

      try {
        const response = await axios.get(
          `http://localhost:4000/plante/${plantId}`
        );
        setPlant(response.data);
        setError(null);
      } catch (error) {
        setError("Plant not found or there was an error fetching the data.");
        setPlant(null);
      }
    };

    fetchPlant();
  }, [plantId]);

  return { plant, error };
};

export default useFetchMyPlantById;
