import React from 'react';
import { FaUser, FaBox, FaSignOutAlt, FaUserCog } from 'react-icons/fa';
import { useProfilePopupLogic } from '@/hooks/useAuth';

const ProfilePopup = () => {
    const { handleNavigateToProfile, handleNavigateToOrders, handleNavigateToAdmin, handleLogout, isAdmin } = useProfilePopupLogic();

    return (
        <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-64 p-4 z-50">
            <div className="flex flex-col gap-4">
                <ul className="flex flex-col gap-3">
                    <li
                        className="flex items-center gap-2 hover:text-rose-500 cursor-pointer transition-colors"
                        onClick={handleNavigateToProfile}
                    >
                        <FaUser className="text-xl" />
                        Manage My Account
                    </li>
                    <li
                        className="flex items-center gap-2 hover:text-rose-500 cursor-pointer transition-colors"
                        onClick={handleNavigateToOrders}
                    >
                        <FaBox className="text-xl" />
                        My Orders
                    </li>
                    {isAdmin && (
                        <li
                            className="flex items-center gap-2 hover:text-rose-500 cursor-pointer transition-colors"
                            onClick={handleNavigateToAdmin}
                        >
                            <FaUserCog className="text-xl" />
                            Admin Dashboard
                        </li>
                    )}
                    <li
                        className="flex items-center gap-2 text-red-500 hover:text-red-700 cursor-pointer transition-colors"
                        onClick={handleLogout}
                    >
                        <FaSignOutAlt className="text-xl" />
                        Logout
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default ProfilePopup;