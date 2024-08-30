import Navbar from "../../components/nav-bar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./components/most-sold-items";
import { Button } from "@/components/ui/button";

const items = [];

function Plant() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [plants, setPlants] = useState([]);
  const [mainImage, setMainImage] = useState("");

  async function fetchPlant() {
    try {
      const result = await axios.get(`http://localhost:4000/plante/${id}`);
      setPlant(result.data);
      setMainImage(result.data.resources[0]?.filename || "");
    } catch (error) {
      console.error("Error fetching plant:", error);
    }
  }

  async function fetchPlants() {
    const result = await axios.get("http://localhost:4000/plante");
    setPlants(result.data);
  }

  useEffect(() => {
    fetchPlant();
    fetchPlants();
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12 min-h-screen p-4">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4 items-start">
        <div className="w-full md:w-2/3 flex justify-center items-center p-4">
          <img
            src={`http://localhost:4000/${mainImage}`}
            alt={plant.name}
            className="object-cover w-full max-h-[590px]"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold">{plant.name}</h1>
          <p className="text-lg">{plant.type}</p>
          <p className="text-xl font-semibold">${plant.price}</p>
          <p>
            This is a lovely {plant.type} plant perfect for your home or office.
          </p>
          <Button variant="orderShop">Order now</Button>
          <div className="flex flex-col gap-4">
            {plant.resources.map((resource, index) => (
              <img
                key={index}
                src={`http://localhost:4000/${resource.filename}`}
                alt={`${plant.name} ${index}`}
                className="object-cover w-full h-32 md:h-40 cursor-pointer"
                onClick={() => setMainImage(resource.filename)}
                onError={(e) => (e.target.src = "path/to/fallback-image.jpg")}
              />
            ))}
          </div>
        </div>
      </div>
      <Carousel items={items} visibleItems={3} />
    </div>
  );
}

export default Plant;
