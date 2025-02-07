"use client";
import { useShoppingCartContext } from "@/context/shoppingCartContext";
import ProductCard from "./ProductCard";
import { type comicSelectModel } from "@/server/db/schema";
import { api } from "@/trpc/react";
const SearchResults = () => {
  const comicEntries = api.comic.getAll.useQuery().data;

  const { currentShoppingCart, setCurrentShoppingCart } =
    useShoppingCartContext();

  // Adds a new item to the shoppingcart by adding it to the shoppingCart context
  const addToCart = (newComic: comicSelectModel) => {
    if (!currentShoppingCart.some((comic) => comic.id == newComic.id)) {
      setCurrentShoppingCart([...currentShoppingCart, newComic]);
    }
  };
  return (
    <div>
      <div className="my-[5%] grid grid-cols-4 gap-1">
        {comicEntries?.map((entry, i) => {
          return (
            <div key={i}>
              <ProductCard
                title={entry.name}
                price={entry.price}
                imageSrc={""}
              />
              <button onClick={() => addToCart(entry)}>add to cart</button>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default SearchResults;
