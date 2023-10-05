import React from "react";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthContext from "./context/AuthContext"; // Import AuthContext and useAuth
import { useAuth } from "./hooks/useAuth";

const App: React.FC = ({ children }: any) => {
  const { user, setUser } = useAuth(); // Use useAuth here
  return (
    <HelmetProvider>
      <AuthContext.Provider value={{ user, setUser }}>
        {/* Provide the user and setUser values */}
        <div className="">
          <div className="bg-[#281B7D] min-w-full min-h-6 h-6 w-full"></div>
          <Navbar />
          <div className=" py-16">{children}</div>
          <Footer />
        </div>
      </AuthContext.Provider>
    </HelmetProvider>
  );
};

export default App;
