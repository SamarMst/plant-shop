import { TreeDeciduous } from "lucide-react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <Link to="/" className="flex items-center gap-1 ">
      <TreeDeciduous size={40} className=" text-green-400" />
      <h1 className="text-[#21441f] font-semibold text-4xl">Plant </h1>
    </Link>
  );
};

export default Logo;
