import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar";
import useGetUserInfo from "@/hook/useGetUserInfo";
import useFetchMyPlants from "@/hook/useFetchMyPlants";
import Toast from "react-hot-toast";

const SellerDashboard = () => {
  const { plants, error } = useFetchMyPlants();
  if (error) return Toast.error(error);

  return (
    <div className="flex h-screen">
      <Sidebar />
      <div className="flex flex-col flex-grow">
        <div className="bg-[#10b981] text-white p-4 flex justify-between items-center">
          {plants && plants.length > 0 && (
            <div className="text-lg font-bold">
              Welcome, {plants[0].user.email}!
            </div>
          )}
        </div>
        <div className="p-6 flex-grow overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
