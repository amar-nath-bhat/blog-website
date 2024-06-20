import React from "react";
import { categories } from "../constants/data";
const Filter = () => {
  return (
    <select
      name="category"
      id="category"
      className="p-2 rounded-md border-2 border-black focus:outline-none focus:ring-2 focus:ring-blue-300 w-1/3 bg-[#fda179] "
    >
      {categories.map((category, index) => (
        <option key={index} value={category}>
          {category.type}
        </option>
      ))}
    </select>
  );
};

export default Filter;
