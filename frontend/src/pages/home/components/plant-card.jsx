import useGetUserInfo from "@/hook/useGetUserInfo";
import PlantButton from "./plant-button";
import UpdatePlant from "@/pages/seller-dahboard/components/update-plant";
import DeletePlant from "@/pages/seller-dahboard/components/delete-plant";

const PlantCard = ({
  id,
  name,
  type,
  price,
  quantity,
  category,
  plantImage,
}) => {
  const { role } = useGetUserInfo();

  return (
    <div className="p-4 flex flex-col items-start shadow-lg rounded-xl w-80">
      <img
        src={`http://localhost:4000/${plantImage}`}
        alt={name}
        className="rounded-xl size-72 object-cover"
      />
      <h1 className="capitalize text-4xl font-bold">{name}</h1>
      <p className="text-xs text-gray-400">{type}</p>
      <p className="text-xs text-gray-400">{id}</p>
      <p className="font-bold">{price} TND</p>

      {role === "SELLER" ? (
        <div className="flex gap-1 w-full bg-red-50">
          <UpdatePlant
            id={id}
            name={name}
            type={type}
            price={price}
            quantity={quantity}
            category={category}
            plantImage={plantImage}
          />
          <DeletePlant id={id} />
        </div>
      ) : (
        <PlantButton id={id} name="Shop Now" />
      )}
    </div>
  );
};

export default PlantCard;
