import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "./route";
import { LogOut } from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex flex-col h-screen w-64 bg-[#005B31] text-white shadow-lg"> {/* Soft green background */}
      <div className="py-5 px-6 text-lg font-bold "> {/* Light cream border */}
        Seller Dashboard
      </div>
      <nav className="flex flex-col flex-grow p-4 space-y-4">
        {routes.map(({ path, label, icon: Icon }) => (
          <NavLink
            key={path}
            to={path}
            className={({ isActive }) =>
              `flex items-center gap-4 p-3 rounded-lg transition-all duration-200 ${
                isActive ? "bg-[#7BAE7F] shadow-md" : "hover:bg-[#A3C9A8]" /* Soft green hover effect */
              }`
            }
          >
            <Icon className="w-6 h-6" />
            <span className="font-medium">{label}</span>
          </NavLink>
        ))}
      </nav>
      <div className="p-4 "> {/* Light cream border */}
        <button
          className="flex items-center gap-4 w-full p-3 rounded-lg hover:bg-[#A3C9A8] transition-colors duration-200"
          onClick={logOut}
        >
          <LogOut className="w-6 h-6" />
          <span className="font-medium">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
