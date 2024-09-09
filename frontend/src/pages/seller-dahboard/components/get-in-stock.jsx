import useFetchPlantInStock from "@/hook/useFetchPlantInStock";
import PlantCard from "@/pages/home/components/plant-card";
import Toast from "react-hot-toast";

const GetPlantsInStock = () => {
  const { plants, error } = useFetchPlantInStock();

  if (error) {
    Toast.error(error);
    return null;
  }

  return (
    <div className="min-h-screen w-full max-w-2xl mx-auto">
      <div className="flex flex-col md:flex-row items-center md:flex-wrap gap-4">
        {plants && plants.length > 0 ? (
          plants.map((plant) => (
            <PlantCard
              id={plant.id}
              key={plant.id}
              name={plant.name}
              type={plant.type}
              price={plant.price}
              quantity={plant.quantity}
              category={plant.categories}
              plantImage={plant.resources?.[0]?.filename}
            />
          ))
        ) : (
          <div className="m-28 p-4 bg-white rounded-lg shadow-lg max-w-md mx-auto">
            <h2 className="text-center text-xl font-semibold text-gray-800 mb-2">
              No Plants in Stock
            </h2>
            <p className="text-center text-base text-gray-600">
              It looks like there are no plants in stock available at the
              moment.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GetPlantsInStock;
