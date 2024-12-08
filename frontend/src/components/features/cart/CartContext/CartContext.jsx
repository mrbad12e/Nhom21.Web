import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([
      {
        id: 1,
        name: "PC system All in One APPLE iMac (2023)",
        image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg",
        price: 1499,
        quantity: 2,
      },
      {
        id: 2,
        name: "Restored Apple Watch Series 8",
        image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg",
        price: 598,
        quantity: 2,
      },
      {
        id: 3,
        name: "Apple - MacBook Pro 16\" Laptop",
        image: "https://flowbite.s3.amazonaws.com/blocks/e-commerce/macbook-pro-light.svg",
        price: 1799,
        quantity: 2,
      },
    ]);

  const addToCart = (item) => {
    setCartItems((prev) => {
      const existingItem = prev.find((i) => i.id === item.id);
      if (existingItem) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const increaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity - 1, 1) }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
