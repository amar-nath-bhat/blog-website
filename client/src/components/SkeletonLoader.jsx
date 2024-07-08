import React from "react";

const SkeletonLoader = () => {
  return (
    <section className="shadow-lg bg-color-default shadow-black rounded-lg w-full flex flex-col gap-3 border-2 border-black p-5 animate-pulse">
      <div className="h-[30vh] md:h-[50vh] w-full rounded-lg bg-gray-300" />
      <article className="flex flex-col gap-1 concert-one-regular">
        <div className="h-8 w-3/4 bg-gray-300 rounded" />
        <hr className="border-black mt-1" />
        <div className="flex flex-col gap-2">
          <div className="h-6 w-full bg-gray-300 rounded" />
          <div className="h-6 w-1/2 bg-gray-300 rounded mt-2" />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-1">
              <div className="w-7 h-7 bg-gray-300 rounded-full" />
              <div className="h-6 w-10 bg-gray-300 rounded" />
            </div>
            <div className="bg-gray-300 text-white rounded-2xl font-bold px-3 text-lg pb-2 h-8 w-20" />
          </div>
        </div>
      </article>
    </section>
  );
};

export default SkeletonLoader;
