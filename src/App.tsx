import { HelmetProvider } from "react-helmet-async";
import "./App.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const App = ({ children }: any) => {
  return (
    <HelmetProvider>
      <div className="">
        <div className="bg-[#281B7D] min-w-full min-h-6 h-6 w-full"></div>
        <Navbar />
        <div className=" py-16">{children}</div>
        <Footer />
      </div>
    </HelmetProvider>
  );
};

export default App;
