"use client";
import { Input } from "@/lib/shadcn/components/ui/input";
import { useRouter } from "next/navigation";
import React, { type ChangeEvent, type FormEvent, useState } from "react";

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
      <Input
        className="mx-[10%] flex grow"
        value={searchInputValue}
        placeholder={"search"}
        onChange={handleInputChange}
      />
    </form>
  );
};

export default SearchBar;
