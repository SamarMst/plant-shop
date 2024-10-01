import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/sideBar";
import useGetUserInfo from "@/hook/useGetUserInfo";
import axiosInstance from "@/lib/axios-instance";
import NavbarSeller from "./components/navbar-seller";

const SellerDashboard = () => {
  const { id } = useGetUserInfo();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await axiosInstance.get(`/user/${id}/info`);
        const { name, lastname } = response.data;
        setName(name);
        setLastName(lastname);
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchUserInfo();
  }, [id]);

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
