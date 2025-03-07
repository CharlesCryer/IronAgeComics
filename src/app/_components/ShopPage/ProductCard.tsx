import Image from "next/image";
import React, { useEffect, useState } from "react";
import image_icon from "@/../public/image_icon.svg";
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
      const blob = await response.blob(); // Fetch the image as a Blob
      const objectUrl = URL.createObjectURL(blob); // Create a URL for the blob
      setImage(objectUrl);
    }
    void fetchImage();
  }, []);
  if (!image) {
    return <h1>loading...</h1>;
  }
  return (
    <div className="flex flex-col items-center justify-center border p-6">
      <Image
        alt={"no image found"}
        width={100}
        height={100}
        src={image ?? image_icon}
      />
      <h1>{title}</h1>
      <h2>{price}</h2>
    </div>
  );
};

export default ProductCard;
