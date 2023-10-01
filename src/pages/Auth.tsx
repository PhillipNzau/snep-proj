import React from "react";
import { useLocation } from "react-router-dom";
// import SignUp from "../components/SignUp";

const Auth: React.FC = () => {
  const location = useLocation();
  const getButtonToRender = () => {
    if (location.pathname === "/auth") {
      return <button>Button 1 (Login)</button>;
    } else if (location.pathname === "/signup") {
      return <button>Button 2 (Sign Up)</button>;
    } else {
      // Handle other routes or conditions here
      return null; // Return null or some default content if none of the conditions match
    }
  };
  return (
    <div>
      <h1>Current View</h1>
      {getButtonToRender()}
    </div>
  );
};

export default Auth;
