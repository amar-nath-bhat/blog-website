import React from "react";

const Sidebar = () => {
  const categories = [
    {
      id: 1,
      name: "Music",
    },
    {
      id: 2,
      name: "Dance",
    },
    {
      id: 3,
      name: "Art",
    },
    {
      id: 4,
      name: "Theatre",
    },
    {
      id: 5,
      name: "Comedy",
    },
    {
      id: 6,
      name: "Food",
    },
    {
      id: 7,
      name: "Fashion",
    },
    {
      id: 8,
      name: "Sports",
    },
    {
      id: 9,
      name: "Tech",
    },
    {
      id: 10,
      name: "Travel",
    },
  ];
  return (
    <div className="hidden md:flex concert-one-regular w-fit h-full text-2xl flex-col gap-5 flex-wrap">
      <h1 className="text-4xl">Top Categories</h1>
      <ul>
        {categories.slice(0, 5).map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
