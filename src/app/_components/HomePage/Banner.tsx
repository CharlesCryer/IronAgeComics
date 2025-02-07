import React from "react";
const Banner = () => {
  return (
    <div className="flex justify-center border">
      <div className="mx-[5%] border border-black px-[18%] py-[10%]">
        bannerlogo
      </div>
      <div className="mx-[5%] hidden border border-black px-[18%] py-[10%] sm:block">
        carousel
      </div>
    </div>
  );
};

export default Banner;
