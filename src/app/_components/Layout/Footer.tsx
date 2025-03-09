import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t-2 border-black p-20">
      <Image
        src="/footerLogo.png"
        width={300}
        height={300}
        alt="image not available"
      />
    </footer>
  );
};

export default Footer;
