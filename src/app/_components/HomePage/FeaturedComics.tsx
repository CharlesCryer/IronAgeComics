import * as React from "react";

import { Card, CardContent } from "@/lib/shadcn/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/lib/shadcn/components/ui/carousel";
import ProductCard from "../ShopPage/ProductCard";
import { api } from "@/trpc/server";
import FeatureComicsClient from "./FeaturedComicsClient";
import { Button } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";

export default async function FeaturedComics() {
  const comics = await api.comic.getComicsWithHighestPrice(15);

  return (
    <>
      <div className="m-16 flex justify-center">
        <FeatureComicsClient comics={comics} />
      </div>
      <Link href={"/shop"} className="flex justify-center">
        <Button>View all</Button>
      </Link>
    </>
  );
}
