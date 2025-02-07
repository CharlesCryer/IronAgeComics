import FeaturedComics from "@/app/_components/HomePage/FeaturedComics";
import Banner from "@/app/_components/HomePage/Banner";
import GenreCarousel from "@/app/_components/HomePage/GenreCarousel";

export default function Home() {
  return (
    <>
      <Banner />
      <FeaturedComics />
      <GenreCarousel />
    </>
  );
}
