import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import axiosInstance from "@/lib/axios-instance";
import { useState, useEffect } from "react";

const GetInspired = () => {
  const [plants, setPlants] = useState([]);

  async function fetchPlants() {
    try {
      const result = await axiosInstance.get("http://localhost:4000/plante");
      setPlants(result.data);
    } catch (error) {
      console.error("Error fetching plants:", error);
    }
  }

  useEffect(() => {
    fetchPlants();
  }, []);

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full max-w-2xl max-h-60"
    >
      <CarouselContent>
        {plants.slice(0, 5).map((plant, index) => (
          <CarouselItem key={plant.id} className="md:basis-1/2 lg:basis-1/3">
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  {plant.resources[0]?.filename ? (
                    <img
                      src={`http://localhost:4000/${plant.resources[0].filename}`}
                      alt={`Plant ${plant.name}`}
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <span className="text-3xl font-semibold">{index + 1}</span>
                  )}
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
};

export default GetInspired;
