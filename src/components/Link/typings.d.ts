import { LinkProps } from "next/link";

export interface NextLinkProps extends LinkProps {
  children?: React.ReactNode;
  text?: string;
  ref?: React.Ref<HTMLAnchorElement>;
  type?: string;
}
