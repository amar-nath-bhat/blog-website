import React, { useState } from "react";
import { Button } from "./Button";

const Navbar = ({ isAuthenticated }) => {
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropDownFunc = () => {
    setShowDropDown(!showDropDown);
  };

  const hometab = () => (
    <>
      <Button type={true} className="text-white" text="Home" href="/" />

      <Button type={true} className="text-white" text="About" href="/about" />

      <Button type={true} className="text-white" text="Blogs" href="/blogs" />

      <Button type={true} className="text-white" text="Logout" href="/signup" />
    </>
  );

  const logintab = () => (
    <>
      <Button type={true} className="text-white" text="Login" href="/login" />

      <Button type={true} className="text-white" text="Signup" href="/signup" />
    </>
  );

  return (
    <nav className="bg-color-navbar flex-col concert-one-regular py-4">
      <div className="flex justify-between items-center text-4xl md:px-16 px-8">
        <Button href="/" className="">
          <img src="logo-no-bg.png" alt="Fouxy" className="w-16 h-16" />
        </Button>
        <Button type={true} href="/" className="md:hidden block w-10 h-10">
          <img
            src="hamburger.png"
            alt="Menu"
            onClick={showDropDownFunc}
            className="cursor-pointer"
          />
        </Button>
        <div className="hidden md:flex justify-center md:gap-10 gap-2 h-16">
          {isAuthenticated ? hometab() : logintab()}
        </div>
      </div>

      {showDropDown && (
        <div className="flex flex-col items-start gap-2 mx-10 text-xl">
          {isAuthenticated ? hometab() : logintab()}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
