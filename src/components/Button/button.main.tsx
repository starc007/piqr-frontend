import { ButtonHTMLAttributes, FC } from "react";

import { Loader } from "@components";

import { ButtonProps } from "./typings";

const cmnCls =
  "relative flex justify-center disabled:opacity-70 items-center focus:outline-none before:absolute before:inset-0 before:rounded-full  before:transition before:duration-300 hover:before:scale-105 active:duration-75 active:before:scale-95";

const Button: FC<ButtonProps> = ({
  children,
  isLoading,
  cls,
  disabled,
  loaderColor,
  variant = "default",
  ...props
}) => {
  const style = {
    primary: `${cmnCls} before:bg-primary text-white ${cls} `,
    secondary: `${cmnCls} before:bg-secondary text-white ${cls} `,
    default: `${cmnCls} ${cls} before:bg-dark`,
    tertiary: `${cmnCls} bg-white text-primary ${cls} `,
    primaryNoOutline: `${cmnCls} bg-primary text-white ${cls} `,
  };
  return (
    <button {...props} disabled={disabled} className={style[variant]}>
      {isLoading ? (
        <Loader col={loaderColor} />
      ) : (
        <span className="relative text-white">{children}</span>
      )}
    </button>
  );
};

export default Button;
