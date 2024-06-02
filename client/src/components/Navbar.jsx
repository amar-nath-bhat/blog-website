import React, { useState } from "react";

const Navbar = () => {
  const [isLogin, setLogin] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    setLogin(!isLogin);
  };

  const showDropDownFunc = () => {
    setShowDropDown(!showDropDown);
  };

  return (
    <nav className="bg-color-navbar flex-col concert-one-regular py-4">
      <div className="flex justify-between items-center text-4xl md:px-16 px-8">
        <a href="/" className="">
          <img src="logo-no-bg.png" alt="Fouxy" className="w-16 h-16" />
        </a>
        <div className="md:hidden block w-10 h-10">
          <img
            src="hamburger.png"
            alt="Menu"
            onClick={showDropDownFunc}
            className="cursor-pointer"
          />
        </div>
        <div className="hidden md:flex justify-center md:gap-10 gap-2 h-16">
          {isLogin ? (
            <>
              <a href="/" className="text-white">
                Home
              </a>
              <a href="/about" className="text-white">
                About
              </a>
              <a href="/blogs" className="text-white">
                Blogs
              </a>
              <a href="/" onClick={handleLogin} className="text-white">
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="text-white">
                Login
              </a>
              <a href="/signup" className="text-white">
                Signup
              </a>
            </>
          )}
        </div>
      </div>

      {showDropDown && (
        <div className="flex flex-col items-start gap-2 mx-10 text-xl">
          {isLogin ? (
            <>
              <a href="/" className="text-white">
                Home
              </a>
              <a href="/about" className="text-white">
                About
              </a>
              <a href="/blogs" className="text-white">
                Blogs
              </a>
              <a href="/" onClick={handleLogin} className="text-white">
                Logout
              </a>
            </>
          ) : (
            <>
              <a href="/login" className="text-white">
                Login
              </a>
              <a href="/signup" className="text-white">
                Signup
              </a>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
