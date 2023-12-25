export type DropdownProps = {
  children: React.ReactNode;
  cls?: string;
};

export type DropdownButtonProps = {
  children: React.ReactNode;
  cls?: string;
};

export type DropdownContentProps = {
  children: React.ReactNode;
};

export type DropdownItemProps<T extends React.ElementType> = {
  as?: T;
  children: React.ReactNode;
} & React.ComponentPropsWithRef<T>;
