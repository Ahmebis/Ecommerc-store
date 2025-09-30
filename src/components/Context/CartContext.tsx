"use client";
import { CartResponse } from "@/Interface";
import { useSession } from "next-auth/react";
import React, { createContext, useState, ReactNode, useEffect } from "react";
import { date } from "zod";

export const CartContext = createContext<{
  cartData: CartResponse | null;
  setCartData: (value: CartResponse | null) => void;
  isLoading: boolean;
  setIsLoading: (value: boolean) => void;
  getCart: () => void;
}>({
  cartData: null,
  setCartData: () => {},
  isLoading: false,
  setIsLoading: () => {},
  getCart() {},
});

export default function CartContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cartData, setCartData] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userId, setUserId] = useState<string>("");
  const session = useSession();

  async function getCart() {
    if (session.status === "authenticated") {
      // setIsLoading(true);
      const response = await fetch("http://localhost:3000/api/get-cart");

      const data: CartResponse = await response.json();
      setCartData(data);
      if (cartData?.data.cartOwner) {
        localStorage.setItem("userId", cartData.data.cartOwner);
      }
    }

    setIsLoading(false);
  }

  useEffect(() => {
    getCart();
  }, [session.status]);

  return (
    <CartContext.Provider
      value={{
        isLoading,
        setIsLoading,
        cartData,
        setCartData,
        getCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
