import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlantButton from "./plant-button";

const PlantesCard = ({ id, name, type, price, plantImage }) => {
  return (
    <div className="p-4 flex flex-col items-start shadow-lg rounded-xl w-80">
      <img
        src={`http://localhost:4000/${plantImage}`}
        alt="name"
        className="rounded-xl size-72 object-cover"
      />
      <h1 className=" capitalize text-4xl font-bold">{name}</h1>
      <p className=" text-xs text-gray-400 ">{type}</p>
      <p className=" font-bold">{price} TND</p>
      <PlantButton id={id} name="Shop Now" />
    </div>
  );
};

export default PlantesCard;
