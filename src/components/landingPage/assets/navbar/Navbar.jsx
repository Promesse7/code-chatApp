import "./Navbar.css";
import React from "react";
import logo from "./logo.png";

const Navbar = ({ onGetStarted }) => {
  return (
    <nav className="w-[90vw] h-[60px] bg-white flex items-center justify-between px-[50px] py-[50px] rounded-t-[10px] shadow-md">
      <div className="flex items-center justify-between w-full h-full pr-[3vw]">
        <span className="flex items-center justify-center">
          <img
            src={logo}
            alt="Logo"
            className="ml-[1.3vw] w-[130px] h-[100px] object-contain filter drop-shadow-lg"
          />
        </span>
        <div className="flex justify-between">
          <button
            className="navButton bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700"
            onClick={onGetStarted}
          >
            Register
          </button>
          <button
            className="navButton bg-white text-red-600 px-4 py-2 rounded-md border border-red-600 hover:bg-red-50"
            onClick={onGetStarted}
          >
            Login
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
