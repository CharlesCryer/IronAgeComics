"use client";
import { type comicSelectModel } from "@/server/db/schema";
import {
  createContext,
  type Dispatch,
  type SetStateAction,
  useContext,
} from "react";

interface ShoppingCartContext {
  currentShoppingCart: comicSelectModel[];
  setCurrentShoppingCart: Dispatch<SetStateAction<comicSelectModel[]>>;
}
export const shoppingCartContext = createContext<
  ShoppingCartContext | undefined
>(undefined);

// This function exists to access the shoppingCartContext without the type being undefined
export const useShoppingCartContext = () => {
  const context = useContext(shoppingCartContext);
  if (context === undefined) {
    throw new Error(
      "shoppingCartContext must be used within provider with type value of ShoppingCartContext",
    );
  }
  return context;
};
