import React, { useState } from "react";
import { Button } from "@material-tailwind/react";

const SearchBar = ({ searchHandle }) => {
  const [search, setSearch] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    console.log(search);
  };

  return (
    <div className="relative flex justify between border-2 border-black rounded-md w-2/3 ">
      <input
        type="text"
        placeholder="Search for blogs"
        className="p-2 placeholder-black bg-[#fda179] w-full"
        name="search"
        onChange={(e) => handleInputChange(e)}
      />
      <Button
        className="bg-transparent m-0 text-black rounded-lg p-2"
        onClick={() => searchHandle(search)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
          />
        </svg>
      </Button>
    </div>
  );
};

export default SearchBar;
