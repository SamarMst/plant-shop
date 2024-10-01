import PlantCard from "./components/plant-card";
import { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar";
import Hero from "./components/hero";
import Logo from "@/components/logo";
import axiosInstance from "@/lib/axios-instance";

function Home() {
  const [plants, setPlants] = useState([]);
  const [visiblePlants, setVisiblePlants] = useState(3);

  async function fetchPlants() {
    try {
      const result = await axiosInstance.get("http://localhost:4000/plante");
      setPlants(result.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  const handleShowMore = () => {
    setVisiblePlants((prev) => prev + 3);
  };

  return (
    <div className="flex flex-col justify-between gap-4 min-h-screen  w-full">
      <Navbar />
      <>
      <Hero />
      <div className="md:px-40 flex flex-col md:flex-row justify-center items-center md:flex-wrap gap-4">
        {plants.slice(0, visiblePlants).map((plant) => (
          <PlantCard
            id={plant.id}
            key={plant.id}
            name={plant.name}
            type={plant.type}
            price={plant.price}
            plantImage={plant.resources[0]?.filename}
          />
        ))}
      </div>
      {visiblePlants < plants.length && (
        <div className="flex justify-center mt-4">
          <button
            onClick={handleShowMore}
            className="text-lg font-sans bg-black text-white px-4 py-2 rounded-md hover:bg-gray-900 transition-colors duration-300"
          >
            Show More
          </button>
        </div>
      )}</>
      <footer className="flex flex-row justify-between items-center px-6 py-4  border-t-2 shadow-md">
        <Logo />
        <p>Copyright 2024</p>
        <p>samar002ms@gmail.com</p>
      </footer>
    </div>
  );
}

export default Home;
