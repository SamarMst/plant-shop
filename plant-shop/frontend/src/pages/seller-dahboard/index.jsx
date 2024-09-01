import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar";
import useGetUserInfo from "@/hook/useGetUserInfo";

const SellerDashboard = () => {
  const { id } = useGetUserInfo();
  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        {/* Navbar */}
        <div className="bg-[#10b981] text-white p-4 flex justify-between items-center">
          <div className="text-lg font-bold">Welcome, {id}!</div>
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
