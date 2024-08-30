import { Link } from "react-router-dom";
import Logo from "./logo";
import { Menu, Search, ShoppingCart, User } from "lucide-react";
const Navbar = () => {
  return (
    <nav className="flex justify-between md:justify-around items-center py-4 w-full ">
      <Logo />
      <div className="hidden md:flex gap-4 text-2xl text-[#21441f]">
        <Link to="/">Home</Link>
        <Link to="shop">Shop</Link>
        <Link to="contact">Contact</Link>
      </div>

      <div className="hidden md:flex">
        <Search />
        <ShoppingCart />
        <Link to="login">
          <User />
        </Link>
      </div>

      <Menu className="block md:hidden" />
    </nav>
  );
};

export default Navbar;
