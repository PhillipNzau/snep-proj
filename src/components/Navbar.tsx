import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

const Navbar = () => {
  const location = useLocation();
  const { logout } = useAuth();
  const { user } = useUser();

  const handleLogout = () => {
    // Simulate a logout action
    logout();
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };
  return (
    <nav className="bg-white shadow-md shadow-violet-100 flex items-center justify-between px-12 py-2 ">
      <div>
        <img src="/header-logo.png" alt="logo" width={117} height={46} />
      </div>
      <div className="flex items-center gap-36">
        <ul className="flex items-center gap-10 ">
          <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center hover:underline underline-offset-8">
            <Link
              to="/"
              className={
                isActive("/")
                  ? "underline underline-offset-8 font-bold font-metrophobic"
                  : ""
              }
            >
              HOME
            </Link>
          </li>
          <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center hover:underline underline-offset-8">
            <Link
              to="/charity"
              className={
                isActive("/charity")
                  ? "underline underline-offset-8 font-bold font-metrophobic"
                  : ""
              }
            >
              CHARITIES
            </Link>
          </li>
          {/* <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center hover:underline underline-offset-8">
            <Link
              to="/donate"
              className={isActive("/") ? "font-bold font-metrophobic" : ""}
            >
              DONATE
            </Link>
          </li> */}
        </ul>

        {user ? (
          <button
            onClick={handleLogout}
            className="w-24 h-[25px] bg-purple-900 text-white text-base hover:bg-purple-800 transition-all duration-200 font-metrophobic"
          >
            Logout
          </button>
        ) : (
          <button className="w-24 h-[25px] bg-purple-900 text-white text-base hover:bg-purple-800 transition-all duration-200 font-metrophobic">
            <Link to="/login" className="font-metrophobic">
              Login
            </Link>
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
