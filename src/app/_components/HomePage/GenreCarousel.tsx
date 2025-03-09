import Image from "next/image";
import React from "react";
const GenreCarousel = () => {
  return (
    <div>
      <div className="flex justify-center">
        <h1>Genres</h1>
      </div>
      <div className="m-4 flex flex-wrap justify-center gap-4">
        <div className="relative px-[12%] py-[10%]">
          <Image src={"/MarvelGenre.png"} alt={"image not available"} fill />
        </div>
        <div className="border px-[12%] py-[10%]">genre</div>
        <div className="border px-[12%] py-[10%]">genre</div>
      </div>
    </div>
  );
};

export default GenreCarousel;
