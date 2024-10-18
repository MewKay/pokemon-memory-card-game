import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Header from "./components/Header/Header";
import Main from "./components/Main/Main";
import "./styles/reset.css";
import "./styles/style.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Header />
    <Main />
  </StrictMode>
);
