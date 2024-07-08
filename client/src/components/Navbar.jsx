import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { API } from "../services/api";
import { useDispatch } from "react-redux";
import { _logout } from "../app/authSlice.js";

const Navbar = ({ isAuthenticated, setIsAuthenticated }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showDropDown, setShowDropDown] = useState(false);

  const showDropDownFunc = () => {
    // console.log(showDropDown);
    setShowDropDown(!showDropDown);
  };

  useEffect(() => {
    if (showDropDown) {
      showDropDownFunc();
    }
  }, []);

  const handleLogout = async () => {
    try {
      console.log("Logging out...");
      await API.userLogout();
      dispatch(_logout());
      setIsAuthenticated(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const NAV_ITEMS = [
    { name: "Home", link: "/" },
    { name: "Blogs", link: "/blogs" },
    { name: "Create", link: "/create" },
    { name: "Login", link: "/login" },
    { name: "Signup", link: "/signup" },
  ];

  return (
    <nav className="bg-color-navbar flex-col concert-one-regular py-4">
      <div className="flex justify-between items-center text-4xl md:px-16 px-8">
        <button onClick={() => navigate("/")}>
          <img src="logo-no-bg.png" alt="Fouxy" className="w-16 h-16" />
        </button>
        <button
          className="md:hidden block w-8 h-8 hover-button"
          onClick={(e) => showDropDownFunc(e)}
        >
          <img src="hamburger.png" alt="Menu" className="cursor-pointer" />
        </button>
        <div className="hidden md:flex justify-center items-center md:gap-10 gap-2 h-16">
          {NAV_ITEMS.slice(0, 3).map((item, index) => (
            <Link
              className="text-white hover-button"
              to={item.link}
              key={index}
            >
              {item.name}
            </Link>
          ))}
          {!isAuthenticated ? (
            NAV_ITEMS.slice(3, 5).map((item, index) => (
              <Link
                className="text-white hover-button"
                to={item.link}
                key={index}
              >
                {item.name}
              </Link>
            ))
          ) : (
            <button
              className="text-white hover-button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          )}
        </div>
      </div>

      {showDropDown && (
        <div className="flex flex-col items-start gap-2 mx-10 text-xl">
          {NAV_ITEMS.slice(0, 3).map((item, index) => (
            <Link
              className="text-white hover-button"
              to={item.link}
              key={index}
            >
              {item.name}
            </Link>
          ))}
          {!isAuthenticated ? (
            NAV_ITEMS.slice(3, 5).map((item, index) => (
              <Link
                className="text-white hover-button"
                to={item.link}
                key={index}
              >
                {item.name}
              </Link>
            ))
          ) : (
            <button
              className="text-white hover-button"
              onClick={() => handleLogout()}
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
