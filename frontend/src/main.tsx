import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";

// Locate the single mount point created in index.html.
const container = document.getElementById("root");
if (!container) throw new Error("No Root element found");
// Bootstraps the React tree with router support and dev-only checks.
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
