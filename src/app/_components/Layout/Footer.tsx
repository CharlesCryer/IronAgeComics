import React from "react";

const Footer = () => {
  return (
    <footer className="flex justify-between gap-12 border-t-2 border-black p-20">
      {/* <div className="border px-[5%] py-[10%]">footerlogo</div> */}
      <img src="/footerLogo.png" width={300} height={300} />
      <div className="flex grow items-center justify-center border">
        footer info
      </div>
    </footer>
  );
};

export default Footer;
