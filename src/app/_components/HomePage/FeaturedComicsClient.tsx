import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/lib/shadcn/components/ui/carousel";
import { type comicSelectModel } from "@/server/db/schema";
import ProductCard from "../ShopPage/ProductCard";

export default function FeatureComicsClient({
  comics,
}: {
  comics: { comic: comicSelectModel; url: string }[];
}) {
  return (
    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
      <CarouselContent>
        {comics.map((item, _) => (
          <CarouselItem key={item.comic.id} className="basis-1/5">
            <div className="p-1">
              <ProductCard
                title={item.comic.name}
                price={item.comic.price}
                imageURL={item.url}
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
