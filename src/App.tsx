import React from "react";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthContext from "./context/AuthContext";
import { useAuth } from "./hooks/useAuth";
import { useLocation } from "react-router-dom";

const App: React.FC = ({ children }: any) => {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const shouldHideNavbarAndFooter =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        {/* Provide the user and setUser values */}
        <div className="">
          <div className="bg-[#281B7D] min-w-full min-h-6 h-6 w-full"></div>
          {!shouldHideNavbarAndFooter && <Navbar />}
          <div className=" py-16">{children}</div>
          {!shouldHideNavbarAndFooter && <Footer />}
        </div>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
