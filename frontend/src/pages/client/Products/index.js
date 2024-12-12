import { useNavigate } from "react-router-dom";
import { useCart } from "@/components/features/cart/CartContext/CartContext";

export const useProductLogic = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleBuyNow = async (product, quantity) => {
    if (product && quantity > 0) {
      try {
        await addToCart({
          id: product.product_id,
          name: product.product_name,
          image: product.product_image_urls?.[0] || '',
          price: product.product_price,
          quantity,
        });
        navigate("/cart"); // Redirect to cart after adding
      } catch (error) {
        alert("Error adding product to cart. Please try again.");
      }
    } else {
      alert("Invalid product or quantity");
    }
  };

  return {
    handleBuyNow,
  };
};

export { default } from "@/pages/client/Products/Products";