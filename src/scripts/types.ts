export type CssClassesProps = {
  [key: string]: string | { [key: number]: string };
};

export type MenuItemProps = {
  children?: MenuItemChildrenProps;
  href: string;
  level: number;
  title: string;
};

export type MenuItemChildProps = {
  children?: MenuItemChildrenProps;
  href: string;
  level: number;
  title: string;
};

export type MenuItemChildrenProps = MenuItemChildProps[];
