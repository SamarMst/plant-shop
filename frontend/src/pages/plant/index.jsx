import { Card } from "@/components/ui/card";
import Navbar from "../../components/nav-bar";
import axios from "axios";
import { useEffect, useState } from "react";
import PlantCard from "./components/plant-card";
import PlantsCard from "./components/plants-card"; // Fixed typo
import { useParams } from "react-router-dom";

function Plant() {
  const { id } = useParams(); // Get the ID from the URL
  const [plant, setPlant] = useState(null); // Use null to handle the initial loading state
  const [plants, setPlants] = useState([]);

  async function fetchPlant() {
    try {
      const result = await axios.get(`http://localhost:4000/plante/${id}`);
      setPlant(result.data);
    } catch (error) {
      console.error("Error fetching plant:", error);
    }
  }

  async function fetchPlants() {
    const result = await axios.get("http://localhost:4000/plante");
    setPlants(result.data);
  }

  useEffect(() => {
    fetchPlant(); // Fetch the single plant based on the ID
    fetchPlants(); // Fetch all plants
  }, [id]); // Re-fetch plant if the ID changes

  if (!plant) return <div>Loading...</div>; // Display a loading state while the plant is being fetched

  return (
    <div>
      <div className="flex flex-col gap-32 min-h-screen p-4">
        <Navbar />
        <div className="max-w-7xl mx-auto flex justify-center">
          <Card className="h-[300px]">
            <PlantCard
              name={plant.name}
              type={plant.type}
              price={plant.price}
              plantCategory={plant.plantCategory}
              plantImage={plant.plantImage}
            />
          </Card>
        </div>
      </div>

      <div
        className="md:px-40 flex flex-col 
        md:flex-row items-center md:flex-wrap gap-2"
      >
        {plants &&
          plants.map((plant) => (
            <PlantsCard // Fixed typo
              key={plant.id}
              id={plant.id} // Pass id to PlantsCard if needed
              name={plant.name}
              type={plant.type}
              price={plant.price}
              plantImage={plant.plantImage}
            />
          ))}
      </div>
    </div>
  );
}

export default Plant;
