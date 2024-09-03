import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { routes } from "./route";
import { Layers3, LogOut } from "lucide-react";

const Sidebar = () => {
  const [openRoute, setOpenRoute] = useState(null);
  const navigate = useNavigate();
  const toggleMenu = (path) => {
    setOpenRoute(openRoute === path ? null : path);
  };
  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };
  return (
    <div className="text-white h-screen w-64 bg-[#047857] flex flex-col">
      <div className="py-5 px-6 font-bold text-lg border-b border-gray-700">
        Seller Dashboard
      </div>
      <nav className="flex flex-col p-4 space-y-4 flex-grow">
        {routes.map(({ path, label, icon: Icon, subRoutes }) => (
          <div key={path}>
            {subRoutes ? (
              <>
                <button
                  onClick={() => toggleMenu(path)}
                  className="flex items-center gap-4 p-2 w-full rounded-lg hover:bg-blue-700 focus:outline-none"
                >
                  <Icon className="w-6 h-6" />
                  <span>{label}</span>
                  <Layers3
                    className={`w-4 h-4 ml-auto transform ${
                      openRoute === path ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openRoute === path && (
                  <div className="mt-2 ml-8 flex flex-col space-y-2">
                    {subRoutes.map(
                      ({ path: subPath, label: subLabel, icon: SubIcon }) => (
                        <NavLink
                          key={subPath}
                          to={`${path}${subPath}`}
                          className={({ isActive }) =>
                            `flex items-center gap-4 p-2 rounded-lg ${
                              isActive ? "bg-blue-700" : "hover:bg-blue-700"
                            }`
                          }
                        >
                          <SubIcon className="w-6 h-6" />
                          <span>{subLabel}</span>
                        </NavLink>
                      )
                    )}
                  </div>
                )}
              </>
            ) : (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `flex items-center gap-4 p-2 rounded-lg ${
                    isActive ? "bg-blue-700" : "hover:bg-blue-700"
                  }`
                }
              >
                <Icon className="w-6 h-6" />
                <span>{label}</span>
              </NavLink>
            )}
          </div>
        ))}
      </nav>
      <div className="p-4 border-t border-gray-700">
        <button
          className="flex items-center gap-4 p-2 w-full rounded-lg hover:bg-blue-700"
          onClick={logOut}
        >
          <LogOut className="w-6 h-6" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
