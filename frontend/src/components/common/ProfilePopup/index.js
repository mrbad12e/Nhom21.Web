export {default} from '@/components/common/ProfilePopup/ProfilePopup';

import axiosInstance from '@/services/api';
import { useNavigate } from "react-router-dom";

export const useProfilePopupLogic = () => {

  const navigate = useNavigate();

  const handleNavigateToProfile = () => {
    navigate("/account");
  };

  const handleNavigateToOrders = () => {
    navigate("/orders");
  };

  const handleNavigateToCancellations = () => {
    navigate("/cancellations");
  };

  const handleLogout = async () => {
    const navigate = useNavigate(); // Initialize navigate

    localStorage.removeItem('auth'); // Remove authentication token
    localStorage.removeItem('profile'); // Remove user profile data
    try {
        // Send request to delete token from cookies (logout)
        await axiosInstance.get(`/client/signout`, { withCredentials: true });

        // After logout, navigate to the login page
        navigate("/login");
    } catch (error) {
        console.error("Logout failed:", error);
        // Optionally, you can add user feedback here, e.g., alert or toast notification
    }
};
  
  return {
    handleNavigateToProfile,
    handleNavigateToOrders,
    handleNavigateToCancellations,
    handleLogout,
  };
};