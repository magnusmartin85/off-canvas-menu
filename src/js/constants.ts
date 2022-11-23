import { CssClassesProps } from "./types";

const MENU_ID = "offCanvasMenu";

const CSS_CLASSES: CssClassesProps = {
  ARROW: "link-arrow",
  BACKDROP: "off-canvas-backdrop",
  ICON_CLOSE: "icon-close",
  ICON_OPEN: "icon-open-container",
  SIDEBAR: "off-canvas",
  SUBMENU_LEVEL: {
    1: "list-level-1",
    2: "list-level-2"
  },
  LINK_LEVEL: {
    1: "link-level-1",
    2: "link-level-2"
  }
};

// Appears in the Off-Canvas Menu header
const MENU_TITLE = "Menu";

export { CSS_CLASSES, MENU_TITLE, MENU_ID };
