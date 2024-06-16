import React from "react";
import { categories } from "../constants/data";
import { useState } from "react";
import { Button } from "./Button";

const Sidebar = ({ className }) => {
  const [showDropDown, setShowDropDown] = useState(true);

  const showDropDownFunc = () => {
    setShowDropDown(!showDropDown);
  };
  return (
    <div
      className={`${className} relative concert-one-regular rounded-lg border-2 border-black   shadow-md shadow-black w-full overflow-hidden h-fit`}
    >
      <table className="w-full">
        <thead className="text-xs uppercase bg-color-default  ">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-xl text-start border-b border-black pb-4  flex justify-between items-center"
            >
              <span>Categories</span>
              <img
                src={showDropDown ? "down-arrow.png" : "right-arrow.png"}
                alt="Show"
                className="pt-3 w-7 h-10 cursor-pointer"
                onClick={() => showDropDownFunc()}
              />
            </th>
          </tr>
        </thead>
        <tbody className={`${showDropDown ? "" : "collapse"}`}>
          {categories.map((category) => (
            <tr className="bg-color-default">
              <td
                className="px-6 py-4 text-xl border-black border-b "
                key={category.id}
              >
                <button>{category.type}</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Sidebar;
