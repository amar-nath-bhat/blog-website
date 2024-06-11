import React, { useState } from "react";
import { Button } from "./Button";

const Navbar = () => {
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropDownFunc = () => {
    setShowDropDown(!showDropDown);
  };

  const buttonBorderFunc = (e) => {
    e.target.style.border = "1px solid white";
    e.target.style.borderRadius = "20%";
    e.target.style.padding = "3px";
  };

  const buttonBorderCollapseFunc = (e) => {
    e.target.style.border = "none";
    e.target.style.padding = "0";
  };

  const hometab = () => (
    <>
      <Button type={true} className="text-white" text="Home" href="/" />

      <Button type={true} className="text-white" text="About" href="/about" />

      <Button type={true} className="text-white" text="Blogs" href="/blogs" />

      <Button type={true} className="text-white" text="Logout" href="/signup" />
    </>
  );

  return (
    <nav className="bg-color-navbar flex-col concert-one-regular py-4">
      <div className="flex justify-between items-center text-4xl md:px-16 px-8">
        <Button type={true} href="/" className="">
          <img src="logo-no-bg.png" alt="Fouxy" className="w-16 h-16" />
        </Button>
        <Button className="md:hidden block w-8 h-8">
          <img
            src="hamburger.png"
            alt="Menu"
            onMouseOver={buttonBorderFunc}
            onMouseOut={buttonBorderCollapseFunc}
            onClick={showDropDownFunc}
            className="cursor-pointer"
          />
        </Button>
        <div className="hidden md:flex justify-center md:gap-10 gap-2 h-16">
          {hometab()}
        </div>
      </div>

      {showDropDown && (
        <div className="flex flex-col items-start gap-2 mx-10 text-xl">
          {hometab()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
