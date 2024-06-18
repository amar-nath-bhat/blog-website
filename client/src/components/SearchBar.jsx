import React, { useState } from "react";

const searchValue = "";

const SearchBar = () => {
  const [search, setSearch] = useState(searchValue);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearch({ ...search, [name]: value });
    console.log(search);
  };

  return (
    <input
      type="text"
      placeholder="Search for blogs"
      className="p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 w-2/3"
      name="search"
      onChange={(e) => handleInputChange(e)}
    />
  );
};

export default SearchBar;
