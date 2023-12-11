export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  isLoading?: boolean;
  cls?: string;
  disabled?: boolean;
  loaderColor?: string;
  variant?:
    | "primary"
    | "secondary"
    | "default"
    | "tertiary"
    | "primaryNoOutline";
}
