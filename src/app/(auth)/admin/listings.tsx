"use client";
import ProductCard from "@/app/_components/ShopPage/ProductCard";
import { api } from "@/trpc/react";
import image_icon from "@/../public/image_icon.svg";
import { Button } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";

export default function CurrentListings({ userId }: { userId: string }) {
  const query = api.comic.getAllFromSellerId.useQuery(userId);
  if (query.isLoading) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div className="my-[5%] grid grid-cols-4 gap-1">
        {query.data?.map((entry, i) => {
          return (
            <div key={i}>
              <ProductCard
                title={entry.name}
                price={entry.price}
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
                imageSrc={image_icon}
              />
            </div>
          );
        })}{" "}
      </div>
      <div className="flex justify-center">
        <Link href={"/admin/add-comic"}>
          <Button>Add new</Button>
        </Link>
      </div>
    </div>
  );
}
