import { Link } from "react-router-dom";
import Logo from "./logo";
import { Search, ShoppingCart, User } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="flex justify-between w-full ">
      <Logo />

      <div className="flex gap-2 text-[#21441f]">
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="contact">Contact</Link>
      </div>
      
      <div className="flex">
        <Search />
        <ShoppingCart />
        <User />
      </div>
    </nav>
  );
};

export default Navbar;
