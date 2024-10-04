import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom";
import { routes } from "./route";

const DashboarBuyer = () => {
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="flex flex-col my-28 p-4 gap-4 w-1/6">
      <div className="flex flex-col gap-4">
        {routes.map(({ path, label }) => (
          <div key={path}>
            <NavLink
              key={path}
              to={path}
              variant="outline"
              className="text-lg font-semibold w-48 h-12 flex items-center justify-center border rounded-md hover:bg-accent hover:text-accent-foreground"
            >
              <span>{label}</span>
            </NavLink>
          </div>
        ))}
        <Button
          variant="outline"
          className="text-lg w-48 h-12 flex items-center justify-center"
          onClick={logOut}
        >
          Log Out
        </Button>
      </div>
    </div>
  );
};

export default DashboarBuyer;
