import React from "react";
import { categories } from "../constants/data";
const Filter = () => {
  return (
    <select
      name=""
      id=""
      className="p-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-300 w-1/3 bg-white "
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
