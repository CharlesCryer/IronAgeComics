import { api } from "@/trpc/server";
import ComicGrid from "@/app/_components/ShopPage/ComicGrid";
import { type comicSelectModel } from "@/server/db/schema";
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { title, page } = await searchParams;
  let pageNumber = Number(page);
  if (isNaN(pageNumber) || pageNumber == 0) {
    pageNumber = 1;
  }

  let comics: { comic: comicSelectModel; url: string }[];
  if (!!title && typeof title === "string") {
    comics = await api.comic.searchFromPage({
      title: title,
      page: pageNumber,
    });
  } else {
    comics = await api.comic.getAllFromPage(pageNumber);
  }

  return <ComicGrid comics={comics} page={pageNumber} />;
}
