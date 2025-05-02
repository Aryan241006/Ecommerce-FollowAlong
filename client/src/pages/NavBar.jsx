// import  from "react";
import { CgProfile } from 'react-icons/cg';
import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-950 p-4 shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <Link to="/home" className="text-white text-2xl font-bold mb-4 md:mb-0">
          E-Commerce
        </Link>

        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
          <Link
            to="/my-orders"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
          >
            My Orders
          </Link>

          <Link
            to="/home"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
          >
            My Products
          </Link>

          <Link
            to="/add-product"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
          >
            Add Product
          </Link>

          <Link
            to="/cart-page"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
          >
            Cart
          </Link>

          <Link
            to="/login"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors"
          >
            Login
          </Link>
          <Link
            to="/profile"
            className="text-white/80 hover:bg-slate-700 px-4 py-2 rounded transition-colors flex items-center gap-1"
          >
            <CgProfile className="text-xl" />
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
