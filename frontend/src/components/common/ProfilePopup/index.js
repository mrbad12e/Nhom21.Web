export {default} from '@/components/common/ProfilePopup/ProfilePopup';
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

  const handleLogout = () => {
    navigate("/login");
  };
  
  return {
    handleNavigateToProfile,
    handleNavigateToOrders,
    handleNavigateToCancellations,
    handleLogout,
  };
};