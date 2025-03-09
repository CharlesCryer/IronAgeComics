import * as React from "react";
import { api } from "@/trpc/server";
import FeatureComicsClient from "./FeaturedComicsClient";
import { buttonVariants } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";

export default async function FeaturedComics() {
  const comics = await api.comic.getComicsWithHighestPrice(15);

  return (
    <>
      <div className="mx-16 flex justify-center">
        <FeatureComicsClient comics={comics} />
      </div>
      <div className="m-4 flex justify-center">
        <Link href={"/shop"} className={buttonVariants({ variant: "outline" })}>
          View all
        </Link>
      </div>
    </>
  );
}
