"use client";
import { api } from "@/trpc/react";
import { Button, buttonVariants } from "@/lib/shadcn/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import ProductCardNoContext from "../ShopPage/ProductCardNoContext";

export default function AdminComics({ userId }: { userId: string }) {
  const query = api.comic.getAllFromSellerId.useQuery(userId);
  if (query.isLoading || query.data === undefined) {
    return <h1>loading...</h1>;
  }

  return (
    <div>
      <div className="my-[5%] grid grid-cols-4 gap-1">
        {query.data.map((entry) => {
          return (
            <div key={entry.comic.id}>
              <div className="flex flex-col items-center justify-center">
                <ProductCardNoContext
                  comic={entry.comic}
                  imageURL={entry.url}
                />
                <DeleteButton
                  id={entry.comic.id}
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
        <Link
          href={"/admin/add-comic"}
          className={buttonVariants({ variant: "outline" })}
        >
          Add new
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
