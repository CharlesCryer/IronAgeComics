import ShopPagination from "@/app/_components/ShopPage/ShopPagination";
import ProductCard from "@/app/_components/ShopPage/ProductCard";
import { type comicSelectModel } from "@/server/db/schema";

export default function ComicGrid({
  comics,
  page,
}: {
  comics: { comic: comicSelectModel; url: string }[];
  page: number;
}) {
  return (
    <div>
      <div className="my-[5%] grid gap-1 sm:grid-cols-2 md:grid-cols-4">
        {comics.map((entry, i) => {
          return (
            <div key={i}>
              <ProductCard comic={entry.comic} imageURL={entry.url} />
            </div>
          );
        })}
      </div>
      <ShopPagination currentPage={page} />
    </div>
  );
}
