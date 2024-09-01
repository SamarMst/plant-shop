import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom"; // Import Outlet for nested routes
import Sidebar from "./components/sideBar";

const SellerDashboard = () => {
  const [sellerName, setSellerName] = useState("");

  useEffect(() => {
    // Fetch the seller's name (replace with actual fetch logic)
    const fetchSellerName = async () => {
      // Replace with actual API call to get seller's info
      const name = "John Doe"; // Example name
      setSellerName(name);
    };

    fetchSellerName();
  }, []);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <div className="bg-[#10b981] text-white p-4 flex justify-between items-center">
          <div className="text-lg font-bold">Welcome, {sellerName}!</div>
          {/* Additional navbar content like notifications or profile can go here */}
        </div>

        {/* Main content with Outlet */}
        <div className="p-6 flex-grow">
          <Outlet /> {/* Renders the nested routes */}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
