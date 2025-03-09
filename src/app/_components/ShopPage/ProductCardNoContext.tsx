"use client";
import React, { useEffect, useState } from "react";
import image_icon from "@/../public/image_icon.svg";
import { Card, CardContent } from "@/lib/shadcn/components/ui/card";
import Image from "next/image";
import { type comicSelectModel } from "@/server/db/schema";
const ProductCardNoContext = ({
  comic,
  imageURL,
}: {
  comic: comicSelectModel;
  imageURL: string;
}) => {
  const [image, setImage] = useState<string>();
  useEffect(() => {
    async function fetchImage() {
      const response = await fetch(imageURL);
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);
      setImage(objectUrl);
    }
    void fetchImage();
  }, [imageURL]);
  if (!image) {
    return <h1>loading...</h1>;
  }
  return (
    <Card className="flex justify-center">
      <CardContent className="h-50 flex flex-col items-center justify-center p-6">
        <Image
          alt={"no image found"}
          src={image ?? image_icon}
          width={80}
          height={80}
        />
        <h1>{comic.name}</h1>
        <h2>{comic.price}</h2>
      </CardContent>
    </Card>
  );
};

export default ProductCardNoContext;
