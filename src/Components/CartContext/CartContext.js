import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const resetCart = () => {
    setCart([]);
    localStorage.removeItem("cart");
  };

  const addToCart = (product, size, quantity) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item.product.SP_MA === product.SP_MA && item.size === size
      );

      if (existingProduct) {
        return prevCart.map((item) =>
          item.product.SP_MA === product.SP_MA && item.size === size
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [...prevCart, { product, size, quantity, total: product.price * quantity }];
      }
    });
  };

  const removeFromCart = (productId, size) => {
    setCart((prevCart) =>
      prevCart.filter((item) => !(item.product.SP_MA === productId && item.size === size))
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, resetCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
