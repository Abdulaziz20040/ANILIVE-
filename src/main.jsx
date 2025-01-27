import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import ProductContextProvider from "./context/Context.jsx";
import { SkeletonTheme } from "react-loading-skeleton";

createRoot(document.getElementById("root")).render(
  <SkeletonTheme baseColor="#202020" highlightColor="#444">
    <ProductContextProvider>
      <App />
    </ProductContextProvider>
  </SkeletonTheme>
);
