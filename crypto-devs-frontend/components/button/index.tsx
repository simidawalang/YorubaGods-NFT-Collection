import React, { MouseEventHandler } from "react";

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: MouseEventHandler;
  content?: any;
  className?: string;
  variant?: string;
  size?: string;
}
const Button = ({
  type,
  className,
  variant,
  onClick,
  content,
  size
}: ButtonProps) => {
  return (
    <button type={type} className={`${className} ${variant} ${size}`} onClick={onClick}>
      {content}
    </button>
  );
};

export default Button;
