"use client";
import SearchResults from "@/app/_components/ShopPage/SearchResults";
import { Suspense } from "react";
export default function Shop() {
  return (
    <Suspense>
      <SearchResults />
    </Suspense>
  );
}
