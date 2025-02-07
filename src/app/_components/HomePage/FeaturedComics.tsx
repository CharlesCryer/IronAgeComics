import React from "react";
import Link from "next/link";
const FeaturedComics = () => {
  return (
    <div className="m-4 flex flex-col items-center">
      <div className="flex w-[95%] flex-col items-center border">
        All comics
        <Link
          href={"shop?title="}
          className="m-4 border p-4 text-black no-underline"
        >
          view all
        </Link>
        <div className="flex w-full justify-between overflow-scroll border">
          <div className="border px-[3%] py-[10%]">comic-1</div>
          <div className="border px-[3%] py-[10%]">comic-2</div>
          <div className="border px-[3%] py-[10%]">comic-3</div>
          <div className="border px-[3%] py-[10%]">comic-4</div>
          <div className="border px-[3%] py-[10%]">comic-5</div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedComics;
