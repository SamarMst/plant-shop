import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Plant from "./pages/plant";
import Register from "./pages/register";
import Login from "./pages/login";
import SellerDashboard from "./pages/seller-dahboard";
import CreatePlant from "./pages/seller-dahboard/components/create-plant";
import UpdatePlant from "./pages/seller-dahboard/components/update-plant";
import DeletePlant from "./pages/seller-dahboard/components/delete-plant";
import GetPlantById from "./pages/seller-dahboard/components/get-plant-by-id";
import Category from "./pages/seller-dahboard/components/category";
import GetPlantsInStock from "./pages/seller-dahboard/components/get-in-stock";
import GetPlantsNotInStock from "./pages/seller-dahboard/components/get-not-in-stock";
import RestockMyPlant from "./pages/seller-dahboard/components/restock-my-plant-by-Id";
import { Toaster } from "react-hot-toast";
import Orders from "./pages/seller-dahboard/page/orders";
import History from "./pages/seller-dahboard/page/history";
import BuyPlant from "./pages/buyer";
import OrdersStatus from "./pages/buyer/components/dashboard/orders-status";
import HistoryOrders from "./pages/buyer/components/dashboard/history";
import Contact from "./pages/home/contact";
import CheckOut from "./pages/buyer/components/check-out";
import UserInfo from "./pages/buyer/components/dashboard/user-info";
import Payment from "./pages/buyer/components/check-out/components/payment";
import SellerInfo from "./pages/seller-dahboard/components/seller-info";
import Plants from "./pages/seller-dahboard/page/plants";
import DashboardSeller from "./pages/seller-dahboard/page/dashboard";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/payments", element: <Payment /> },
    { path: "/contact", element: <Contact /> },
    { path: "/plant/:id", element: <Plant /> },
    {
      path: "/buyer",
      element: <BuyPlant />,
      children: [
        { path: "userInfo", element: <UserInfo /> },

        { path: "ordersStatus", element: <OrdersStatus /> },
        { path: "history", element: <HistoryOrders /> },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/checkOut", element: <CheckOut /> },
    {
      path: "/seller",
      element: <SellerDashboard />,
      children: [
        { path: "dashboard", element: <DashboardSeller /> },

        { path: "plants", element: <Plants /> },
        { path: "plants/stock", element: <GetPlantsInStock /> },
        { path: "plants/notinstock", element: <GetPlantsNotInStock /> },
        { path: "plants/restock", element: <RestockMyPlant /> },
        { path: "plants/delete", element: <DeletePlant /> },
        { path: "plants/byId", element: <GetPlantById /> },
        { path: "category", element: <Category /> },
        { path: "orders", element: <Orders /> },
        { path: "history", element: <History /> },
        { path: "seller-info", element: <SellerInfo /> },
      ],
    },
  ]);

  return (
    <>
      <Toaster />
      <RouterProvider router={router} />
    </>
  );
}

export default App;
