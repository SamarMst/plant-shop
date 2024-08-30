import PlantCard from "./components/plant-card";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar";
import Hero from "./components/hero";
import Logo from "@/components/logo";
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
    <div className="flex flex-col gap-4 min-h-screen w-full ">
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
      <footer className="flex flex-row justify-between items-center px-6 py-4 border-t-2 shadow-md">
        <Logo />
        <p>Copyright 2024</p>
        <p>samar002ms@gmail.com</p>
      </footer>
    </div>
  );
}

export default Home;
