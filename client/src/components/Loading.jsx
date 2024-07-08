import React from "react";

const Loading = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-color-default z-50">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
        <span className="mt-4 text-xl font-semibold text-white">
          Loading...
        </span>
      </div>
    </div>
  );
};

export default Loading;
