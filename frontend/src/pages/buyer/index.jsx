import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/dashboard/sidebar";
import Toast from "react-hot-toast";
import Navbar from "@/components/nav-bar";

const DashboarBuyer = () => {
  return (
    <>
      <Navbar />
      <div className="flex h-screen">
        <Sidebar />
        <div className="p-4 flex-grow overflow-auto mt-24">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboarBuyer;
