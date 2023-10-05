// 1. Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import "./index.css";
import Charity from "./pages/Charity";
import SelectedCharity from "./pages/SelectedCharity";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import CreateStory from "./components/CreateStory";
import CreateCharity from "./components/CreateCharity";
import DonateToCharity from "./pages/DonateToCharity";

// 2. Defining the route configuration
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<SignUp />} />
      <Route path="/charity" element={<Charity />} />
      <Route path="/charity/create-story" element={<CreateStory />} />
      <Route path="/charity/create-charity" element={<CreateCharity />} />
      <Route path="/charity/:id" element={<SelectedCharity />} />
      <Route path="/charity/:id/donate" element={<DonateToCharity />} />
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
