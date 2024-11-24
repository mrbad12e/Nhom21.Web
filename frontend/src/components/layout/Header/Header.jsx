import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaShoppingCart,
  FaBell,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import ProfilePopup from "@/components/common/ProfilePopup";
import CartPopup from "@/components/common/CartPopUp";
import NotiPopup from "@/components/common/NotiPopUp";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isProfilePopupOpen, setIsProfilePopupOpen] = useState(false);
  const [isCartPopupOpen, setIsCartPopupOpen] = useState(false);
  const [cartItems, setCartItems] = useState([
    { id: 1, name: "Product 1", image: "image1.jpg", quantity: 2, price: 20 },
    { id: 2, name: "Product 2", image: "image2.jpg", quantity: 1, price: 15 },
  ]);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Order Shipped", message: "Your order has been shipped!" },
    {
      id: 2,
      title: "New Message",
      message: "You have a new message from John.",
    },
  ]);

  const [isNotiPopupOpen, setIsNotiPopupOpen] = useState(false);

  const toggleNotiPopup = () => {
    setIsNotiPopupOpen((prev) => !prev);
  };

  const removeNotification = (id) => {
    setNotifications(notifications.filter((noti) => noti.id !== id));
  };

  const removeCartItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const user = {
    isLoggedIn: true,
    avatar: "https://via.placeholder.com/150",
  };

  const defaultAvatar =
    "https://via.placeholder.com/150/000000/FFFFFF/?text=Default";

  const toggleProfilePopup = () => {
    setIsProfilePopupOpen((prev) => !prev);
  };

  const toggleCartPopup = () => {
    setIsCartPopupOpen((prev) => !prev);
  };

  return (
    <header className="bg-gradient-to-r from-black to-neutral-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center p-4">
        <div className="flex items-center gap-8">
          <h1 className="text-3xl font-extrabold tracking-wide">
            <Link to="/" className="hover:opacity-90">
              Exclusive
            </Link>
          </h1>
        </div>

        <button
          className="md:hidden text-2xl focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>

        <nav
          className={`${
            menuOpen ? "flex" : "hidden md:flex"
          } absolute md:relative top-16 md:top-0 left-0 md:left-auto w-full md:w-auto bg-black md:bg-transparent z-50 flex-col md:flex-row gap-4 md:gap-8 text-base font-medium items-center md:items-end p-4 md:p-0`}
        >
          <Link
            to="/"
            className="hover:text-yellow-300 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/contact"
            className="hover:text-yellow-300 transition duration-200"
          >
            Contact
          </Link>
          <Link
            to="/about"
            className="hover:text-yellow-300 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/signup"
            className="hover:text-yellow-300 transition duration-200"
          >
            Sign Up
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-6">
          <div className="flex items-center bg-white text-gray-700 rounded-full px-4 py-2 shadow-md">
            <FaSearch className="text-gray-500 mr-2" />
            <input
              type="text"
              placeholder="Search here..."
              className="bg-transparent focus:outline-none text-sm placeholder-gray-500 w-48"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="relative cursor-pointer" onClick={toggleCartPopup}>
              <FaShoppingCart className="text-2xl" />
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full px-2 py-0.5">
                {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>

            <div className="relative cursor-pointer" onClick={toggleNotiPopup}>
              <FaBell className="text-2xl" />
              {notifications.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full px-2 py-0.5">
                  {notifications.length}
                </span>
              )}
            </div>

            <div
              className="relative w-10 h-10 rounded-full cursor-pointer overflow-hidden border-2 border-white"
              onClick={toggleProfilePopup}
            >
              <img
                src={user.isLoggedIn ? user.avatar : defaultAvatar}
                alt="User Avatar"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {isCartPopupOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleCartPopup}
          ></div>
          <CartPopup
            cartItems={cartItems}
            onClose={toggleCartPopup}
            onRemoveItem={removeCartItem}
          />
        </>
      )}

      {isProfilePopupOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleProfilePopup}
          ></div>
          <ProfilePopup onClose={toggleProfilePopup} />
        </>
      )}

      {isNotiPopupOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={toggleNotiPopup}
          ></div>
          <NotiPopup
            notifications={notifications}
            onClose={toggleNotiPopup}
            onRemoveNotification={removeNotification}
          />
        </>
      )}
    </header>
  );
};

export default Header;
