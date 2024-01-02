import { FC } from "react";

import { Loader } from "@components";

import { ButtonProps } from "./typings";

const cmnCls =
  "flex justify-center disabled:opacity-60 items-center focus:outline-none rounded-full";

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
    primary: `${cmnCls} bg-primary text-white ${cls} `,
    secondary: `${cmnCls} bg-dark text-white ${cls} `,
    default: `${cmnCls} ${cls} text-dark bg-gray-100`,
    tertiary: `${cmnCls} ${cls}`,
    primaryNoOutline: `${cmnCls} bg-primary text-white ${cls}`,
    tertiaryOutline: `${cmnCls} ${cls} border border-gray-300`,
  };
  return (
    <button {...props} disabled={disabled} className={style[variant]}>
      {isLoading ? <Loader col={loaderColor} /> : children}
    </button>
  );
};

export default Button;
