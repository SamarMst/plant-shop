import PlantCard from "@/pages/home/components/plant-card";
import useFetchMyPlantById from "@/hook/useFetchMyPlantById";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const GetPlantById = () => {
  const [inputId, setInputId] = useState("");
  const [plantId, setPlantId] = useState(null);
  const { plant, error } = useFetchMyPlantById(plantId);

  const handleSearch = () => {
    setPlantId(inputId);
  };

  return (
    <div className="container p-10 space-y-6">
      <div className="flex gap-2">
        <Input
          type="search"
          placeholder="Search plant by id"
          value={inputId}
          onChange={(e) => setInputId(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      {plant && plant.id && (
        <PlantCard
          id={plant.id}
          key={plant.id}
          name={plant.name}
          type={plant.type}
          price={plant.price}
          plantImage={plant.resources?.[0]?.filename}
        />
      )}
    </div>
  );
};

export default GetPlantById;
