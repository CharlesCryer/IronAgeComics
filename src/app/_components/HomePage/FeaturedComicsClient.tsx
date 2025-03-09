import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/lib/shadcn/components/ui/carousel";
import { type comicSelectModel } from "@/server/db/schema";
import ProductCardNoContext from "../ShopPage/ProductCardNoContext";

export default function FeatureComicsClient({
  comics,
}: {
  comics: { comic: comicSelectModel; url: string }[];
}) {
  return (
    <Carousel className="w-full" opts={{ align: "start", loop: true }}>
      <CarouselContent>
        {comics.map((item, _) => (
          <CarouselItem
            key={item.comic.id}
            className="sm:basis-1/3 md:basis-1/5"
          >
            <div className="p-1">
              <ProductCardNoContext comic={item.comic} imageURL={item.url} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
