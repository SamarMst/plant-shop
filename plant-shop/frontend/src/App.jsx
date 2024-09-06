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
import GetMyPlants from "./pages/seller-dahboard/components/get-my-plant";
import Category from "./pages/seller-dahboard/components/category";
import GetPlantsInStock from "./pages/seller-dahboard/components/get-in-stock";
import GetPlantsNotInStock from "./pages/seller-dahboard/components/get-not-in-stock";
import RestockMyPlant from "./pages/seller-dahboard/components/restock-my-plant-by-Id";
import { Toaster } from "react-hot-toast";
import Orders from "./pages/seller-dahboard/components/orders";
import History from "./pages/seller-dahboard/components/history";
import BuyPlant from "./pages/buyer";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/plant/:id", element: <Plant /> },
    { path: "/buy", element: <BuyPlant /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    {
      path: "/dashboard",
      element: <SellerDashboard />,
      children: [
        { path: "plants/create", element: <CreatePlant /> },
        { path: "plants/update/id", element: <UpdatePlant /> },
        { path: "plants/stock", element: <GetPlantsInStock /> },
        { path: "plants/notinstock", element: <GetPlantsNotInStock /> },
        { path: "plants/restock", element: <RestockMyPlant /> },
        { path: "plants/delete", element: <DeletePlant /> },
        { path: "plants/byId", element: <GetPlantById /> },
        { path: "plants", element: <GetMyPlants /> },
        { path: "category", element: <Category /> },
        { path: "orders", element: <Orders /> },
        { path: "history", element: <History /> },
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
