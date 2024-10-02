import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar";
import NavbarSeller from "./components/navbar-seller";

const SellerDashboard = () => {


  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <NavbarSeller />
        <div className="p-6 flex-grow overflow-auto ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
