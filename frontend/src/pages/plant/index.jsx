import Navbar from "../../components/nav-bar";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Carousel from "./components/most-sold-items";
const items = [
  {
    id: 1,
    name: "Item 1",
    description: "Description 1",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 2,
    name: "Item 2",
    description: "Description 2",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 3,
    name: "Item 3",
    description: "Description 3",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 4,
    name: "Item 4",
    description: "Description 4",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 5,
    name: "Item 5",
    description: "Description 5",
    image: "https://via.placeholder.com/300",
  },
  {
    id: 6,
    name: "Item 6",
    description: "Description 6",
    image: "https://via.placeholder.com/300",
  },
  // Add more items as needed
];
function Plant() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
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
    fetchPlant();
    fetchPlants();
    window.scrollTo(0, 0);
  }, [id]);

  if (!plant) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-12 min-h-screen p-4">
      <Navbar />
      <div className="flex flex-col md:flex-row p-4">
        <div className="w-full md:w-2/3 flex justify-center items-center p-4">
          <img
            src={`http://localhost:4000/${plant.plantImage}`}
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
          <div className="flex flex-col gap-4">
            <img
              key={plant.id}
              src={`http://localhost:4000/${plant.plantImage}`}
              alt={`${plant.name}`}
              className="object-cover w-full h-24 md:h-32 cursor-pointer"
              onClick={() => setMainImage(image)}
            />
          </div>
        </div>
      </div>
      <Carousel items={items} visibleItems={3} />
    </div>
  );
}

export default Plant;
