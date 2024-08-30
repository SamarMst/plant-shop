import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ToastProvider } from "./components/toaster-provider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastProvider />
    <App />
  </StrictMode>
);
