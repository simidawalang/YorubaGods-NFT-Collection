import React, { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  content?: any;
  className?: string;
  variant?: string;
}
const Button = ({
  type,
  className,
  variant,
  onClick,
  content,
}: ButtonProps) => {
  return (
    <button type={type} className={`${className} ${variant}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
