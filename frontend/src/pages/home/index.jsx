import PlantCard from "./components/plant-card";
import axios from "axios";
import { useEffect, useState } from "react";
import Navbar from "../../components/nav-bar";
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
    <div className="flex flex-col gap-4  min-h-screen p-4 ">
      <Navbar />

      <section className="flex flex-row justify-between">
        <div className="flex flex-col items-start">
          <h1 className="text-[#21441f] font-bold text-4xl ">
            Various Indoor <br /> Plant shop
          </h1>
          <p className=" font-semibold text-zinc-400 max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
            alias aperiam esse eius assumenda sunt est quasi, molestias quae
            pariatur, soluta a culpa quis incidunt quos delectus ipsum corporis
            deleniti.
          </p>
          <button>Add To Cart</button>
        </div>
        <img
          src="images/plant-hero-img-.png"
          className=" w-40"
          alt="plant-hero-img"
        />
      </section>

      {/* {plants.map((plant) => (
        <PlantCard
          key={plant.id}
          name={plant.name}
          type={plant.type}
          price={plant.price}
          plantImage={plant.plantImage}
        />
      ))} */}
    </div>
  );
}

export default Home;
