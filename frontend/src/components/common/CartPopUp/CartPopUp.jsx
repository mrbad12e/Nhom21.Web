import React from "react";
import { useCart } from "@/components/features/cart/CartContext/CartContext";
import { FaTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const CartPopup = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart(); // Get cartItems and removeFromCart from CartContext
  const navigate = useNavigate(); // Initialize navigate

  return (
    <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-80 p-4 z-50">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Your Cart</h2>

        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <li key={item.product_id} className="flex items-center justify-between border-b pb-2">
                {/* Product Image and Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image} // Assuming you have an image property
                    alt={item.product_name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                    <p className="text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* Price and Remove Button */}
                <div className="flex items-center gap-2">
                  <p className="font-semibold">${(item.unit_price * item.quantity).toFixed(2)}</p>
                  <button
                    onClick={() => removeFromCart(item.product_id)} // Call removeFromCart with product_id
                    className="text-red-600 hover:text-red-800"
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">Your cart is empty.</p>
        )}

        {/* Go to Cart Button */}
        <button 
          onClick={() => navigate('/cart')} // Navigate to the /cart route
          className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
