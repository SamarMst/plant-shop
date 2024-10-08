import { Link } from "react-router-dom";
import Logo from "./logo";
import { Menu, Search, ShoppingCart, User, UserCircle } from "lucide-react";
import useGetUserInfo from "@/hook/useGetUserInfo";
import { useEffect, useState } from "react";

const Navbar = () => {
  const { role, email } = useGetUserInfo();
  const [plantCount, setPlantCount] = useState(0);

  useEffect(() => {
    function countPlants() {
      const plantsString = localStorage.getItem(email); // Use the user's email
      if (plantsString) {
        try {
          const plantsArray = JSON.parse(plantsString);
          const totalCount = Array.isArray(plantsArray)
            ? plantsArray.reduce((acc, plant) => acc + (plant.count || 1), 0)
            : 0;
          setPlantCount(totalCount);
        } catch (error) {
          console.error("Error parsing plants data:", error);
          setPlantCount(0);
        }
      } else {
        setPlantCount(0);
      }
    }
    countPlants();
    window.addEventListener("storage", countPlants);
    return () => {
      window.removeEventListener("storage", countPlants);
    };
  }, [email]);

  return (
    <nav className="flex justify-between md:justify-around items-center py-4 w-full ">
      <Logo />
      <div className="hidden md:flex gap-4 text-2xl text-[#21441f]">
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="contact">Contact</Link>
      </div>

      <div className="hidden md:flex gap-2">
        <Search />
        <div className="relative">
          {plantCount > 0 && (
            <span className="absolute top-0 left-4 inline-flex items-center justify-center w-4 h-4 text-sm font-medium text-white bg-red-500 rounded-full">
              {plantCount}
            </span>
          )}
          <Link to="checkOut">
            <ShoppingCart />
          </Link>
        </div>
        {role === "SELLER" && (
          <Link to="seller">
            <UserCircle />
          </Link>
        )}
        {role === "BUYER" && (
          <Link to="buyer">
            <UserCircle />
          </Link>
        )}
        {!role && (
          <Link to="login">
            <User />
          </Link>
        )}
      </div>

      <Menu className="block md:hidden" />
    </nav>
  );
};

export default Navbar;
