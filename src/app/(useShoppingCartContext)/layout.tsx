"use client";
import { shoppingCartContext } from "@/context/shoppingCartContext";
import { type comicSelectModel } from "@/server/db/schema";
import { useState } from "react";
export default function ShoppingCartContextProviderLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [currentShoppingCart, setCurrentShoppingCart] = useState<
    comicSelectModel[]
  >([]);
  return (
    <shoppingCartContext.Provider
      value={{ currentShoppingCart, setCurrentShoppingCart }}
    >
      {children}
    </shoppingCartContext.Provider>
  );
}
