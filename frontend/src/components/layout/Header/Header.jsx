// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import { FaSearch, FaShoppingCart, FaBell } from "react-icons/fa";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md">
      {/* Logo Section */}
      <div className="flex items-center gap-10">
        <h1 className="text-2xl font-bold text-black tracking-wide">Exclusive</h1>

        {/* Navigation Links */}
        <nav className="flex gap-8 text-base font-medium text-black">
          <Link to="/" className="hover:text-blue-500">Home</Link>
          <Link to="/contact" className="hover:text-blue-500">Contact</Link>
          <Link to="/about" className="hover:text-blue-500">About</Link>
          <Link to="/signup" className="hover:text-blue-500">Sign Up</Link>
        </nav>
      </div>

      {/* Search and Icons Section */}
      <div className="flex items-center gap-6">
        {/* Search Bar */}
        <div className="flex items-center bg-gray-100 rounded px-4 py-2">
          <FaSearch className="text-gray-500 mr-2" />
          <input
            type="text"
            placeholder="What are you looking for?"
            className="bg-transparent focus:outline-none text-sm placeholder-gray-500"
          />
        </div>

        {/* Icon Buttons */}
        <div className="flex items-center gap-4">
          {/* Cart Icon */}
          <div className="relative">
            <FaShoppingCart className="text-gray-700 text-xl" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1">
              2
            </span>
          </div>

          {/* Notification Icon */}
          <div className="relative">
            <FaBell className="text-gray-700 text-xl" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
