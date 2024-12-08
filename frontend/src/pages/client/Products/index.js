import { useNavigate } from "react-router-dom";
import { useCart } from "@/components/features/cart/CartContext/CartContext";

export const useProductLogic = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = (product, quantity) => {
    if (product && quantity > 0) {
      addToCart({
        id: product._id,
        name: product.title,
        image: product.image,
        price: product.basePrice,
        quantity,  // Sử dụng số lượng người dùng đã chọn
      });
      navigate("/cart");
    } else {
      alert("Invalid product or quantity");
    }
  };

  return {
    handleBuyNow,
  };
};

export { default } from '@/pages/client/Products/Products';