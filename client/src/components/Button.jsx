import React from "react";
import { useNavigate } from "react-router-dom";

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
    <a
      className={className}
      onClick={onClicked}
      onMouseEnter={(e) => buttonRiseFunc(e)}
      onMouseLeave={(e) => buttonFallFunc(e)}
      key="linkButton"
    >
      {children}
      {text}
    </a>
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
