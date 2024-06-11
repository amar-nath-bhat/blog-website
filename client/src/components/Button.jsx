import React from "react";
import { Link, useNavigate } from "react-router-dom";

const buttonRiseFunc = (e) => {
  e.target.style.transform = "scale(1.1)";
};
const buttonFallFunc = (e) => {
  e.target.style.transform = "scale(1)";
};

export const Button = ({
  type,
  href,
  text,
  onClicked,
  className,
  children,
}) => {
  const navigate = useNavigate();
  const navigateTo = (e) => {
    if (href === "/signup" || href === "/login") sessionStorage.clear();
    e.preventDefault();
    if (onClicked) (e) => onClicked(e);
    navigate(href);
  };
  return type ? (
    <Link
      className={className}
      onClick={(e) => navigateTo(e)}
      onMouseEnter={(e) => buttonRiseFunc(e)}
      onMouseLeave={(e) => buttonFallFunc(e)}
      key="linkButton"
      to={href}
    >
      {children}
      {text}
    </Link>
  ) : (
    <button
      className={className}
      onClick={onClicked}
      onMouseEnter={(e) => buttonRiseFunc(e)}
      onMouseLeave={(e) => buttonFallFunc(e)}
      key="regularButton"
    >
      {children}
      {text}
    </button>
  );
};
