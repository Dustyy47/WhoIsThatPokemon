import React, { ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {}

const Button: React.FC<ButtonProps> = ({ children, className, ...props }) => {
  return (
    <button
      className={
        "h-full w-full rounded-common bg-slate-200 text-gray-900 hover:bg-slate-400 hover:text-white " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
