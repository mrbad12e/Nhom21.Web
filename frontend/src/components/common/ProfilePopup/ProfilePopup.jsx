import React from "react";
import { FaUser, FaBox, FaTimesCircle, FaStar, FaSignOutAlt } from "react-icons/fa"; // Import các icon từ react-icons
import { useProfilePopupLogic } from "@/components/common/ProfilePopup/index";
import { useAuth } from "@/context/AuthContext";

const ProfilePopup = ({ onClose }) => {

  const { handleNavigateToProfile, handleNavigateToOrders, handleNavigateToCancellations, handleLogout } = useProfilePopupLogic();
  const { logout } = useAuth();

  const handleLogoutClick = async () => {
    await handleLogout();
    logout(); // Đảm bảo logout khỏi context
  };
  
  return (
    <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-64 p-4 z-50">
      <div className="flex flex-col gap-4">
        <ul className="flex flex-col gap-3">
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer" onClick={handleNavigateToProfile}>
            <FaUser className="text-xl"/>
            Manage My Account
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer" onClick={handleNavigateToOrders}>
            <FaBox className="text-xl" />
            My Orders
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer" onClick={handleNavigateToCancellations}>
            <FaTimesCircle className="text-xl" />
            My Cancellations
          </li>
          <li className="flex items-center gap-2 hover:text-rose-500 cursor-pointer">
            <FaStar className="text-xl" />
            My Reviews
          </li>
          <li className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer" onClick={handleLogout}>
            <FaSignOutAlt className="text-xl"/>
            Logout
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProfilePopup;
