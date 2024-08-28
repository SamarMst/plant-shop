import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./pages/auth/login";
import Plant from "./pages/plant";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/login", element: <Login /> },
    { path: "/plant/:id", element: <Plant /> },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
