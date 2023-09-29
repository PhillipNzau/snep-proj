// 1. Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.js";
import "./index.css";
import Auth from "./pages/Auth.js";

// 2. Defining the route configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/auth" element={<Auth />} />
      <Route path="/" element={<Home />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Router>
      <App>
        <AppRoutes />
      </App>
    </Router>
  </React.StrictMode>
);
