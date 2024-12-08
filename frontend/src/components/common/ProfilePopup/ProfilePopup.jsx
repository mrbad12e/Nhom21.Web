import React from "react";
import { FaUser, FaBox, FaTimesCircle, FaStar, FaSignOutAlt } from "react-icons/fa"; // Import các icon từ react-icons

const ProfilePopup = ({ onClose }) => {
  return (
    <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-64 p-4 z-50">
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer">
            <FaUser className="text-xl" />
            Manage My Account
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer">
            <FaBox className="text-xl" />
            My Orders
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer">
            <FaTimesCircle className="text-xl" />
            My Cancellations
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer">
            <FaStar className="text-xl" />
            My Reviews
          </li>
          <li className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer">
            <FaSignOutAlt className="text-xl" />
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePopup;
