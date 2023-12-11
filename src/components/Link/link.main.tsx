import Link from "next/link";
import { NextLinkProps } from "./typings";
import { FC, HTMLProps } from "react";

const CustomLink: FC<NextLinkProps & HTMLProps<HTMLAnchorElement>> = ({
  children,
  text,
  ref,
  ...props
}) => {
  return (
    <Link ref={ref} {...props}>
      {text ? text : children}
    </Link>
  );
};

export default CustomLink;
