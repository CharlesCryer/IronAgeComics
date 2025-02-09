"use client";
import { useShoppingCartContext } from "@/context/shoppingCartContext";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { type comicSelectModel } from "@/server/db/schema";
import ProductCard from "./ProductCard";
import image_icon from "@/../public/image_icon.svg";
import { api } from "@/trpc/react";
const SearchResults = () => {
  const searchParams = useSearchParams();
  const title = searchParams.get("title");
  const router = useRouter();
  let comicEntries: comicSelectModel[] | undefined;
  if (title === null) {
    router.push("/shop");
  } else {
    comicEntries = api.comic.search.useQuery(title).data;
  }

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
                title={entry.name}
                price={entry.price}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                imageSrc={image_icon}
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
