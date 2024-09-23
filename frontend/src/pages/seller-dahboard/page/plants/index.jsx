import { useState, useEffect } from "react";
import PlantCard from "@/pages/home/components/plant-card";
import useFetchMyPlants from "@/hook/useFetchMyPlants";
import Toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import CreatePlant from "../../components/create-plant";

const Plants = () => {
  const { plants: fetchedPlants, error, refetch } = useFetchMyPlants();
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (fetchedPlants.length > 0) {
      setPlants(fetchedPlants);
    }
  }, [fetchedPlants]);

  if (error) {
    Toast.error(error);
    return null;
  }

  const handleAddPlant = async () => {
    await refetch();
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Filter plants based on the search query
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col gap-4 min-h-screen w-full mx-auto">
      <div className="flex justify-between gap-1">
        <Input
          type="search"
          placeholder="Search plant here ..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <CreatePlant onAddPlant={handleAddPlant} />
      </div>

      <div className="flex flex-col md:flex-row items-center md:flex-wrap gap-4">
        {filteredPlants.map((plant) => (
          <PlantCard
            id={plant.id}
            key={plant.id}
            name={plant.name}
            type={plant.type}
            price={plant.price}
            quantity={plant.quantity}
            category={plant.categories}
            plantImage={plant.resources[0]?.filename}
          />
        ))}
      </div>
    </div>
  );
};

export default Plants;
