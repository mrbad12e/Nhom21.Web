import { useNavigate } from "react-router-dom";

export const useProductLogic = () => {
  const navigate = useNavigate();

  const handleBuyNow = () => {
    navigate("/cart");
  };

  return {
    handleBuyNow,
  };
};

export { default } from '@/pages/client/Products/Products';