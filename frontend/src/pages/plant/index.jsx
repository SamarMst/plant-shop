import Navbar from "../../components/nav-bar";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axiosInstance from "@/lib/axios-instance";

function Plant() {
  const { id } = useParams();
  const [plant, setPlant] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const navigate = useNavigate();

  async function fetchPlant() {
    try {
      const result = await axiosInstance.get(
        `http://localhost:4000/plante/${id}`
      );
      setPlant(result.data);
      setMainImage(result.data.resources[0]?.filename || "");
    } catch (error) {
      console.error("Error fetching plant:", error);
    }
  }

  useEffect(() => {
    fetchPlant();
  }, [id]);

  if (!plant) return <div>Loading...</div>;

  const handleAddToCart = () => {
    const plantsString = localStorage.getItem("plant");
    let plantsArray = [];
    if (plantsString) {
      try {
        plantsArray = JSON.parse(plantsString);
        if (!Array.isArray(plantsArray)) {
          plantsArray = [];
        }
      } catch (error) {
        console.error("Error parsing plants data:", error);
        plantsArray = [];
      }
    }
    plantsArray.push(plant);
    localStorage.setItem("plant", JSON.stringify(plantsArray));
    console.log("Updated plants list:", plantsArray);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <div className="flex flex-col gap-12 min-h-screen p-2">
      <Navbar />
      <h1 className="text-6xl font-bold relative left-12 capitalize text-[#21441f]">
        {plant.name} Plant
      </h1>
      <div className="flex flex-col md:flex-row p-4 items-start">
        <div className="w-full md:w-2/3 flex justify-center items-center p-6">
          <img
            src={`http://localhost:4000/${mainImage}`}
            alt={plant.name}
            className="object-cover w-full max-h-[590px]"
          />
        </div>
        <div className="w-full md:w-1/3 flex flex-col gap-4 p-4">
          <h1 className="text-2xl font-bold capitalize">{plant.name}</h1>
          <p className="text-lg">{plant.type}</p>
          <p className="text-xl font-semibold">${plant.price}</p>
          <p>
            This is a lovely {plant.type} plant perfect for your home or office.
          </p>
          <Button
            className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700 mb-9"
            variant="orderShop"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <div className="flex justify-center items-center w-full">
            <Carousel
              opts={{
                align: "start",
              }}
              orientation="vertical"
              className="w-full max-w-xs"
            >
              <CarouselContent className="-mt-1 h-[300px]">
                {plant.resources.map((resource, index) => (
                  <CarouselItem key={index} className="pt-1 md:basis-1/2">
                    <div className="p-1">
                      <Card onClick={() => setMainImage(resource.filename)}>
                        <CardContent className="flex items-center justify-center p-6">
                          <img
                            src={`http://localhost:4000/${resource.filename}`}
                            alt={`${plant.name} ${index}`}
                            className="object-cover w-full h-32 md:h-40 cursor-pointer"
                            onError={(e) =>
                              (e.target.src = "path/to/fallback-image.jpg")
                            }
                          />
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Plant;
