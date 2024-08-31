import PlantCard from "@/pages/home/components/plant-card";
import useGetUserInfo from "@/hook/useGetUserInfo";
import useFetchMyPlants from "@/hook/useFetchMyPlants";
import Toast from "react-hot-toast";

const GetMyPlants = () => {
  const { plants, error } = useFetchMyPlants();
  if (error) return Toast.error(error);
  return (
    <div className=" min-h-screen w-full max-w-2xl mx-auto">
      my plante
      <div className=" flex flex-col md:flex-row items-center md:flex-wrap gap-4">
        {plants &&
          plants.map((plant) => (
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

export default GetMyPlants;
