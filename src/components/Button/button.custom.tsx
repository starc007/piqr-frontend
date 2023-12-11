import { FC } from "react";
import { ButtonProps } from "./typings";
import { Loader } from "..";

const CustomButton: FC<ButtonProps> = ({
  children,
  isLoading,
  cls,
  disabled,
  loaderColor,
  variant = "default",
  ...props
}) => {
  const style = {
    primary: `flex justify-center items-center border border-dark rounded-full bg-primary text-white ${cls} buttonCustom `,
    secondary: `flex justify-center items-center border-2 border-dark rounded-full bg-white text-dark ${cls} buttonCustom`,
    default: `flex justify-center items-center ${cls}`,
    tertiary: `flex justify-center items-center border border-dark rounded-full text-dark ${cls}`,
    primaryNoOutline: `flex justify-center items-center rounded-full bg-primary text-white disabled:opacity-70 disabled:cursor-not-allowed ${cls}`,
  };
  return (
    <button {...props} disabled={disabled} className={style[variant]}>
      {isLoading ? <Loader col={loaderColor} /> : children}
    </button>
  );
};

export default CustomButton;
