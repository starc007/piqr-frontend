import { Menu, Transition } from "@headlessui/react";
import React, { Fragment } from "react";

import {
  DropdownButtonProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownProps,
} from "./typings";

const Dropdown = ({ children }: DropdownProps) => {
  return (
    <Menu
      as="div"
      className="relative flex items-center justify-center text-left"
    >
      {children}
    </Menu>
  );
};

const DropdownButton = ({ children, cls, ...props }: DropdownButtonProps) => {
  return (
    <Menu.Button
      className={`hover:bg-gray-100 transition duration-300 p-2 rounded-full ${cls}`}
      {...props}
    >
      {children}
    </Menu.Button>
  );
};

const DropdownContent = ({
  children,
  cls,
}: DropdownContentProps & {
  cls: string;
}) => {
  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={`absolute text-gray-700 font-medium  border-none right-0 mt-4 z-10 top-6 origin-top-right rounded-md bg-white shadow-xl ring-1 ring-gray-300 focus:outline-none ${cls}`}
      >
        {children}
      </Menu.Items>
    </Transition>
  );
};

export const DropdownItem = <T extends React.ElementType>({
  as,
  children,
  className,
  ...props
}: DropdownItemProps<T>) => {
  const Component = as || "div";
  return (
    <Menu.Item>
      <Component
        className={`w-full text-left cursor-pointer py-2.5 md:py-2 font-medium px-4 ${className}`}
        {...props}
      >
        {children}
      </Component>
    </Menu.Item>
  );
};

export { Dropdown, DropdownButton, DropdownContent };
