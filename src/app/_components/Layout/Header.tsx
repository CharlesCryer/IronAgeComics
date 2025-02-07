import React from "react";
import SearchBar from "./SearchBar";
import ViewCartButton from "./ViewCartButton";
import Link from "next/link";
const Header = () => {
  return (
    <header className="mx-[10%] flex justify-between gap-2 p-2">
      <Link href={"/home"}>
        <div>headerlogo</div>
      </Link>
      <SearchBar />
      <div className="hidden items-center sm:flex">
        <ViewCartButton />
      </div>
      <button className="hidden sm:block">Login</button>
      <button className="hidden sm:block">register</button>
      <button className="sm:hidden">sidebar</button>
    </header>
  );
};

export default Header;
