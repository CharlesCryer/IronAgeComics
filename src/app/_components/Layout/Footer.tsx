import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="flex justify-between gap-12 border-t-2 border-black p-20">
      <Image
        src="/footerLogo.png"
        width={300}
        height={300}
        alt="image not available"
      />
      <div className="flex grow items-center justify-center border">
        footer info
      </div>
    </footer>
  );
};

export default Footer;
