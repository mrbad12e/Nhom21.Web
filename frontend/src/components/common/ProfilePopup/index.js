export {default} from '@/components/common/ProfilePopup/ProfilePopup';

import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { API_URL } from '@/utils/constants';

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
    try {
      // Gửi yêu cầu xóa token từ cookies (đăng xuất)
      await axios.get(`${API_URL}/client/signout`, {}, { withCredentials: true });

      // Sau khi logout, điều hướng về trang đăng nhập
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return {
    handleNavigateToProfile,
    handleNavigateToOrders,
    handleNavigateToCancellations,
    handleLogout,
  };
};