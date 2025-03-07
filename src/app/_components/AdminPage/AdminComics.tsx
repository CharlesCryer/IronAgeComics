"use client";
import { api } from "@/trpc/react";
import { Button } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCard from "../ShopPage/ProductCard";

export default function AdminComics({ userId }: { userId: string }) {
  const query = api.comic.getAllFromSellerId.useQuery(userId);
  if (query.isLoading || query.data === undefined) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div className="my-[5%] grid grid-cols-4 gap-1">
        {query.data.map((entry, i) => {
          return (
            <div key={i}>
              <div className="flex flex-col items-center justify-center">
                <ProductCard
                  title={entry.name}
                  price={entry.price}
                  imageURL={entry.url}
                />
                <DeleteButton
                  id={entry.id}
                  onDelete={async () => {
                    await query.refetch();
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="flex justify-center">
        <Link href={"/admin/add-comic"}>
          <Button>Add new</Button>
        </Link>
      </div>
    </div>
  );
}

function DeleteButton({ id, onDelete }: { id: number; onDelete: () => void }) {
  const deleteComicMutation = api.comic.delete.useMutation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  return (
    <Button
      variant={"destructive"}
      disabled={isSubmitting}
      onClick={() => {
        setIsSubmitting(true);
        deleteComicMutation.mutate(id, {
          onSuccess: onDelete,
        });
      }}
    >
      <Loader2
        className={`animate-spin ${isSubmitting ? "block" : "hidden"}`}
      />
      Delete
    </Button>
  );
}
