import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Plant from "./pages/plant";
import Register from "./pages/register";
import Login from "./pages/login";
import { ToastProvider } from "./components/toaster-provider";
import SellerDashboard from "./pages/seller-dahboard/components";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/plant/:id", element: <Plant /> },
    { path: "/register", element: <Register /> },
    { path: "/login", element: <Login /> },
    { path: "/seller", element: <SellerDashboard /> },
  ]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
