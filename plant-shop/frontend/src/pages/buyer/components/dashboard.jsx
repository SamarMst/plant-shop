import { useState } from "react";
import Navbar from "@/components/nav-bar";
import { Button } from "@/components/ui/button";
import UserInfo from "./user-info";
import History from "./history";
import OrdersStatus from "./orders-status";
import { useNavigate } from "react-router-dom";

const DashboarBuyer = () => {
  const [showUserInfo, setShowUserInfo] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [showOrdersStatus, setShowOrdersStatus] = useState(false);
  const navigate = useNavigate();

  const handleUserInfoClick = () => {
    setShowUserInfo(!showUserInfo);
    setShowHistory(false);
    setShowOrdersStatus(false);
  };

  const handleHistoryClick = () => {
    setShowHistory(!showHistory);
    setShowUserInfo(false);
    setShowOrdersStatus(false);
  };

  const handleOrdersStatusClick = () => {
    setShowOrdersStatus(!showOrdersStatus);
    setShowUserInfo(false);
    setShowHistory(false);
  };

  const logOut = () => {
    localStorage.removeItem("authToken");
    navigate("/");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex my-28 p-4 flex-grow">
        <div className="flex flex-col gap-4">
          <Button
            variant="outline"
            className="text-lg w-48 h-12 flex items-center justify-center"
            onClick={handleUserInfoClick}
          >
            User Info
          </Button>
          <Button
            variant="outline"
            className="text-lg w-48 h-12 flex items-center justify-center"
            onClick={handleHistoryClick}
          >
            History
          </Button>
          <Button
            variant="outline"
            className="text-lg w-48 h-12 flex items-center justify-center"
            onClick={handleOrdersStatusClick}
          >
            Orders Status
          </Button>
          <Button
            variant="outline"
            className="text-lg w-48 h-12 flex items-center justify-center"
            onClick={logOut}
          >
            Log Out
          </Button>
        </div>

        {showUserInfo && <UserInfo />}
        {showHistory && <History />}
        {showOrdersStatus && <OrdersStatus />}
        {/* Add orders status component here if needed */}
      </div>
    </div>
  );
};

export default DashboarBuyer;
