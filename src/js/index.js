import OffCanvasMenu from "./OffCanvasMenu";
import { MENU_ID } from "./constants";
import "../scss/off-canvas-menu.scss";

// TODO: Close other submenus not working with menu item nesting > 2
const menu = new OffCanvasMenu(MENU_ID, false, true, true);

menu.init();
