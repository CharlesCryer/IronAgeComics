"use client";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useState } from "react";

const SearchBar = () => {
  // Stores text in searchbar in state.
  const [searchInputValue, setSearchInputValue] = useState("");
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchInputValue(e.target.value);
  };

  const router = useRouter();
  // Reroutes the page on search
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    router.push(`/shop/search?title=${searchInputValue}`);
  };

  return (
    <form onSubmit={handleSearch} className="flex min-w-0 grow">
      <input
        className="mx-[10%] flex grow rounded-md py-2"
        value={searchInputValue}
        placeholder={"search"}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
