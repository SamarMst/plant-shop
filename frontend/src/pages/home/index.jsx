import PlantCard from "./components/plant-card";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar";
import Hero from "./components/hero";
function Home() {
  const [plants, setPlants] = useState([]);
  async function fetchPlants() {
    const result = await axios.get("http://localhost:4000/plante");

    setPlants(result.data);
  }
  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <div className="flex flex-col gap-4 min-h-screen p-4 w-full ">
      <Navbar />
      <Hero />
      <div
        className="md:px-40 flex flex-col 
        md:flex-row items-center md:flex-wrap gap-4"
      >
        {plants &&
          plants.map((plant) => (
            <PlantCard
              id={plant.id}
              key={plant.id}
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

export default Home;
