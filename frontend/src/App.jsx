import PlantCard from "./plant-card";
import axios from "axios";
import { useEffect, useState } from "react";
function App() {
  const [plants, setPlants] = useState([]);
  async function fetchPlants() {
    const result = await axios.get("http://localhost:4000/plante");
   
    setPlants(result.data);
  }
  useEffect(() => {
    fetchPlants()
  },[]);
  
  return (
    <div className="flex flex-wrap gap-4  min-h-screen p-4 ">
      {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          name={plant.name}
          type={plant.type}
          price={plant.price}
          plantImage={plant.plantImage}
        />
      ))}
    </div>
  );
}

export default App;
