import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { App } from "./App";
import "./styles";

document.documentElement.classList.add("js");

const root = document.getElementById("root")!;
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// In build la pagina è prerenderizzata e viene idratata; in sviluppo si monta da zero.
if (root.firstElementChild) hydrateRoot(root, app);
else createRoot(root).render(app);
