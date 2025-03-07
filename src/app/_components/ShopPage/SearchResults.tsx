"use client";
import { useShoppingCartContext } from "@/context/shoppingCartContext";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { type comicSelectModel } from "@/server/db/schema";
import ProductCard from "./ProductCard";
import { api } from "@/trpc/react";
const SearchResults = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const router = useRouter();

  const { currentShoppingCart, setCurrentShoppingCart } =
    useShoppingCartContext();

  // Adds a new item to the shoppingcart by adding it to the shoppingCart context
  const addToCart = (newComic: comicSelectModel) => {
    if (currentShoppingCart.some((comic) => comic.id == newComic.id)) {
      console.log("item already added");
    } else {
      setCurrentShoppingCart([...currentShoppingCart, newComic]);
    }
  };
  if (title === null) {
    router.push("/shop");
    return <h1>loading...</h1>;
  }
  const comicEntries = api.comic.search.useQuery(title).data;

  return (
    <div>
      <div className="flex flex-col items-center">
        <h1>&quot;Search results for {title}&quot;</h1>
        <h2>{comicEntries?.length ?? 0} results</h2>
      </div>
      <div className="my-[5%] grid grid-cols-4 gap-1">
        {comicEntries?.map((entry, i) => {
          return (
            <div key={i}>
              <ProductCard
                title={entry.comic.name}
                price={entry.comic.price}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                imageURL={entry.url}
              />
              <button onClick={() => addToCart(entry.comic)}>
                add to cart
              </button>
            </div>
          );
        })}{" "}
      </div>
    </div>
  );
};

export default SearchResults;
