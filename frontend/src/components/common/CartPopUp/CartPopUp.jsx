import React from "react";
import { useCart } from "@/components/features/cart/CartContext/CartContext";
import { FaTrashAlt } from "react-icons/fa";

const CartPopup = ({ onClose }) => {
  const { cartItems, removeFromCart } = useCart();

  return (
    <div className="absolute top-16 right-4 bg-gradient-to-b from-black from-10% via-zinc-700 to-neutral-700 text-white rounded-lg shadow-lg w-80 p-4 z-50">
      <div className="flex flex-col gap-4">
        <h2 className="text-lg font-bold">Your Cart</h2>

        {/* Danh sách sản phẩm */}
        {cartItems.length > 0 ? (
          <ul className="flex flex-col gap-4">
            {cartItems.map((item) => (
              <li
                key={item.id}
                className="flex items-center justify-between border-b pb-2"
              >
                {/* Ảnh sản phẩm và thông tin */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 rounded object-cover"
                  />
                  <div>
                    <p className=" font-medium">{item.name}</p>
                    <p className=" text-sm">Qty: {item.quantity}</p>
                  </div>
                </div>

                {/* Giá và nút xóa */}
                <div className="flex items-center gap-2">
                  <p className=" font-semibold">${item.price*item.quantity}</p>
                  <button
                    onClick={() => removeFromCart(item.id)}
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

        {/* Nút đóng popup */}
        <button
          onClick={onClose}
          className="mt-4 py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-900 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartPopup;
