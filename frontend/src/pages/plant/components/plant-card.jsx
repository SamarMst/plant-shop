import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import PlantButton from "./plant-button";

const PlantCard = ({ name, type, price, plantCategory, plantImage }) => {
  return (
    <div className="flex flex-row">
      <img
        src={`http://localhost:4000/${plantImage}`}
        className="w-1/3 h-auto mr-4  p-4"
        alt={name}
      />
      <div className="flex flex-col flex-1 ">
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription>
            Introducing the {name}, a versatile plant that brings nature's
            beauty indoors or outdoors. This plant, belonging to the{" "}
            {plantCategory} category, is available in {type}
            varieties, allowing you to choose the perfect type for your
            environment. So don't miss out on this popular choice. With a
            reputation for enhancing spaces, the {name} is a must-have for plant
            enthusiasts.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className=" font-bold">{price} TND</p>
        </CardContent>
        <CardFooter>
          <PlantButton name="Buy" />
        </CardFooter>
      </div>
    </div>
  );
};

export default PlantCard;
