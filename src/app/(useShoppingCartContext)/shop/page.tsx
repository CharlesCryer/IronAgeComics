"use client";
import AllComics from "@/app/_components/ShopPage/AllComics";
import { Suspense } from "react";
export default function Shop() {
  return (
    <Suspense>
      <AllComics />
    </Suspense>
  );
}
