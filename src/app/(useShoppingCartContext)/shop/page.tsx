import { api } from "@/trpc/server";
import { redirect } from "next/navigation";
import ComicGrid from "@/app/_components/ShopPage/ComicGrid";
import { comicSelectModel } from "@/server/db/schema";
export default async function Shop({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
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
