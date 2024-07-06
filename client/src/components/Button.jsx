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
  return type ? (
    <Link
      className={className}
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
      onClick={(e) => onClicked(e)}
      onMouseEnter={(e) => buttonRiseFunc(e)}
      onMouseLeave={(e) => buttonFallFunc(e)}
      key="regularButton"
    >
      {children}
      {text}
    </button>
  );
};
