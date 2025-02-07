import Image from "next/image";
import React from "react";
const ProductCard = ({
  title,
  price,
  imageSrc,
}: {
  title: string;
  price: string;
  imageSrc: string;
}) => {
  return (
    <div className="flex flex-col items-center justify-center border p-[50%]">
      <Image alt={"no image found"} width={100} height={100} src={imageSrc} />
      <h1>{title}</h1>
      <h2>{price}</h2>
    </div>
  );
};

export default ProductCard;
