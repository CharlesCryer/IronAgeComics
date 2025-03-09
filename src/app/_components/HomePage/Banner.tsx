"use client";
import Image from "next/image";
import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/lib/shadcn/components/ui/carousel";
const Banner = () => {
  return (
    <div className="flex justify-evenly">
      <img
        src={"/bannerLogo.png"}
        alt={"image not available"}
        className="w-90 h-64"
      />
      <Carousel
        className="hidden h-64 w-80 sm:block"
        opts={{ loop: true }}
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
      >
        <CarouselContent>
          <CarouselItem>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={"/MarvelGenre.png"}
                  alt={"image not available"}
                  className="w-90 h-64"
                />
              </div>
            </div>
          </CarouselItem>
          <CarouselItem>
            <div className="flex justify-center">
              <div className="relative">
                <img
                  src={"/DCGenre.png"}
                  alt={"image not available"}
                  className="w-90 h-64"
                />
              </div>
            </div>
          </CarouselItem>
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default Banner;
