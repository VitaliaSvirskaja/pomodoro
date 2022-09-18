import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import { SettingsContextProvider } from "./context/SettingsContext";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthContextProvider>
      <SettingsContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </SettingsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
