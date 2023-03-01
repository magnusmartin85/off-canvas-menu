import { MenuItemProps } from "./types";

const menuItems: MenuItemProps[] = [
  {
    level: 0,
    title: "Home",
    href: "#"
  },
  {
    level: 0,
    title: "Services",
    href: "#",
    children: [
      {
        level: 1,
        title: "UX-Design",
        href: "#",
        children: [
          {
            level: 2,
            title: "Screendesign",
            href: "#"
          }
        ]
      },
      {
        level: 1,
        title: "Webdesign",
        href: "#"
      },
      {
        level: 1,
        title: "Content Marketing",
        href: "#"
      }
    ]
  },
  {
    level: 0,
    title: "Team",
    href: "#",
    children: [
      {
        level: 1,
        title: "John",
        href: "#"
      },
      {
        level: 1,
        title: "Peter",
        href: "#"
      },
      {
        level: 1,
        title: "Michael",
        href: "#"
      }
    ]
  },
  {
    level: 0,
    title: "Contact",
    href: "#"
  }
];

export { menuItems };
