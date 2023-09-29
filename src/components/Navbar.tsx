import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md shadow-violet-100 flex items-center justify-between px-12 py-2 ">
      <div>
        <img src="/header-logo.png" alt="logo" width={117} height={46} />
      </div>
      <div className="flex items-center gap-36">
        <ul className="flex items-center gap-10 ">
          <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center ">
            <Link to="/" className="font-metrophobic">
              HOME
            </Link>
          </li>
          <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center">
            <Link to="/charity" className="font-metrophobic">
              CHARITIES
            </Link>
          </li>
          <li className="hover:font-bold text-base w-20 transition-all duration-150 text-center">
            <Link to="/products/1" className="font-metrophobic">
              DONATE
            </Link>
          </li>
        </ul>

        <button className="w-24 h-[25px] bg-purple-900 rounded text-white text-base hover:bg-purple-800 transition-all duration-200 font-metrophobic">
          Login
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
