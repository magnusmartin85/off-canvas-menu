export type CssClassesProps = {
  [key: string]: string | { [key: number]: string };
};

export type MenuItemProps = {
  level: number;
  title: string;
  href: string;
  children: {
    level: number;
    title: string;
    href: string;
    children: {}[];
  }[];
};
