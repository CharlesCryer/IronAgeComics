"use client";
import React, { useEffect, useState } from "react";
import image_icon from "@/../public/image_icon.svg";
import { Card, CardContent } from "@/lib/shadcn/components/ui/card";
const ProductCard = ({
  title,
  price,
  imageURL,
}: {
  title: string;
  price: string;
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
    <Card>
      <CardContent className="flex flex-col items-center justify-center p-6">
        <img
          alt={"no image found"}
          src={image ?? image_icon}
          className="h-32 w-32 object-cover"
        />
        <h1>{title}</h1>
        <h2>{price}</h2>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
