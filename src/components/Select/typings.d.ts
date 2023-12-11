import { React } from "react";
export interface SelectProps {
  isMulti?: boolean;
  cls?: string;
  options: {
    label: string;
    value: string;
  }[];
  labelCls?: string;
  label?: string;
  isCreatable?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  defaultValue?: {
    label: string;
    value: string;
  }[];
  placeholder?: string;
  isRequired?: boolean;
  isDisabled?: boolean;
  placement?: "top" | "bottom" | "auto";
}
