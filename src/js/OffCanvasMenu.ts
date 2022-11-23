import MarkupGenerator from "./MarkupGenerator/MarkupGenerator";
import { CSS_CLASSES, MENU_TITLE } from "./constants";

class OffCanvasMenu {
  private menuId: string;
  private readonly closeOtherSubmenus: boolean;
  private readonly closeMenuOnBackdropClick: boolean;
  private readonly closeSubmenusOnMenuClose: boolean;

  constructor(
    menuId: string,
    closeOtherSubmenus: boolean,
    closeMenuOnBackdropClick: boolean,
    closeSubmenusOnMenuClose: boolean
  ) {
    this.menuId = menuId;

    /**
     * Level 1 link lists with css class 'link-level-1' are closed when another level 1 list is clicked.
     * Only one level 1 link list can be open at once.
     * @type {boolean}
     */
    this.closeOtherSubmenus = closeOtherSubmenus;

    /**
     * Close menu after click on backdrop (css class 'off-canvas-backdrop).
     * @type {boolean}
     */
    this.closeMenuOnBackdropClick = closeMenuOnBackdropClick;

    /**
     * Close all level 1 lists when menu is closed.
     * @type {boolean}
     */
    this.closeSubmenusOnMenuClose = closeSubmenusOnMenuClose;
  }

  body = document.querySelector("body") as HTMLElement;
  iconOpen = document.querySelector("." + CSS_CLASSES.ICON_OPEN) as HTMLElement;
  sidebar = document.querySelector("." + CSS_CLASSES.SIDEBAR) as HTMLElement;

  init() {
    const markupGenerator = new MarkupGenerator("off-canvas-body");

    markupGenerator.init();

    this.waitForDomElement(".off-canvas-nav").then(() => {
      const linkLevel1 = document.querySelectorAll(
        "." + CSS_CLASSES.LINK_LEVEL[1]
      );

      const linkLevel2 = document.querySelectorAll(
        "." + CSS_CLASSES.LINK_LEVEL[2]
      );

      this.addEventsForLinks(linkLevel1, 1);
      this.addEventsForLinks(linkLevel2, 2);

      this.setMenuTitle(MENU_TITLE);
    });

    const iconOpen = this.iconOpen as HTMLElement;

    iconOpen.addEventListener("click", () => {
      const iconClose = document.querySelector("." + CSS_CLASSES.ICON_CLOSE);
      const closingItems = [];
      closingItems.push(iconClose);

      this.openMenu(this.sidebar, this.body);
      this.addCloseEvents(closingItems, this.sidebar, this.body);
    });
  }

  addBackdropToDom() {
    const backdropDiv = document.createElement("div");
    backdropDiv.className = "off-canvas-backdrop";
    document.body.appendChild(backdropDiv);
  }

  /**
   * Add close events to provided closingItems e.g. backdrop and close icon.
   * @param {array} closingItems - DOM Elements that trigger menu close.
   * @param {object} sidebar - DOM Element which contains the menu.
   * @param {object} body - DOM Element which contains the body.
   */
  addCloseEvents(
    closingItems: (Element | null)[],
    sidebar: HTMLElement,
    body: HTMLElement
  ) {
    if (this.closeMenuOnBackdropClick) {
      const backdrop = document.querySelector(
        "." + CSS_CLASSES.BACKDROP
      ) as HTMLElement;
      closingItems.push(backdrop);
    }

    for (let i = 0; i < closingItems.length; i++) {
      const currentClosingItem = closingItems[i] as HTMLElement;

      currentClosingItem.addEventListener("click", () => {
        this.hideSidebar(sidebar);
        this.removeBackdropFromDom();
        this.makeBodyScrollable(body);
        this.closeSubmenusOnMenuClose && this.rotateMenuArrowsBack();
        this.closeSubmenusOnMenuClose && this.closeAllSubmenus();
      });
    }
  }

  /**
   * Attach click listener to level 1 menu item links.
   * @param {NodeList} links - List of links.
   * @param {number} level - Number of level to add events for.
   */
  addEventsForLinks(links: any[] | NodeListOf<Element>, level: number) {
    links?.forEach((link) => {
      link?.addEventListener("click", (evt: Event) => {
        this.handleClickOnLevel(evt, level);
      });
    });
  }

  closeAllSubmenus() {
    const cssClass =
      "." +
      CSS_CLASSES.SUBMENU_LEVEL[1] +
      "," +
      "." +
      CSS_CLASSES.SUBMENU_LEVEL[2];
    const submenuItems = document.querySelectorAll(cssClass);

    for (let i = 0; i < submenuItems.length; i++) {
      const currentSubmenuItem = submenuItems[i] as HTMLElement;
      currentSubmenuItem.style.display = "none";
    }
  }

  handleClickOnLevel(evt: Event, level: number) {
    const currentTarget = evt.currentTarget as Element;
    const closestLink = currentTarget.closest(
      "." + CSS_CLASSES.LINK_LEVEL[level]
    ) as Element;
    const parentElement = closestLink.parentElement as HTMLElement;
    const nextElementSibling = parentElement.nextElementSibling as HTMLElement;
    const isOpen = nextElementSibling.style.display === "block";
    const firstChild = closestLink.childNodes[1] as HTMLElement;

    if (isOpen) {
      nextElementSibling.style.display = "none";
      firstChild.classList.remove("rotate-90");
    } else {
      this.closeOtherSubmenus && this.closeAllSubmenus();
      this.closeOtherSubmenus && this.rotateMenuArrowsBack();
      nextElementSibling.style.display = "block";
      firstChild.classList.add("rotate-90");
    }
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   */
  handleSidebar(sidebar: HTMLElement) {
    sidebar.className = CSS_CLASSES.SIDEBAR + " show";
    sidebar.style.visibility = "visible";
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   */
  hideSidebar(sidebar: HTMLElement) {
    sidebar.className = <string>CSS_CLASSES.SIDEBAR;
  }

  /**
   *
   * @param {object} body - DOM Element which contains the body.
   */
  makeBodyScrollable(body: HTMLElement) {
    body.style.overflow = "";
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   * @param {object} body - DOM Element which contains the body.
   */
  openMenu(sidebar: HTMLElement, body: HTMLElement) {
    this.preventBodyFromScrolling(body);
    this.handleSidebar(sidebar);
    this.addBackdropToDom();
  }

  /**
   *
   * @param {object} body - DOM Element which contains the body.
   */
  preventBodyFromScrolling(body: { style: { overflow: string } }) {
    body.style.overflow = "hidden";
  }

  removeBackdropFromDom() {
    const backdropDiv = document.querySelector(".off-canvas-backdrop");
    backdropDiv && backdropDiv.remove();
  }

  rotateMenuArrowsBack() {
    let menuArrows = document.querySelectorAll("." + CSS_CLASSES.ARROW);
    let len = menuArrows.length;

    for (let i = 0; i < len; i++) {
      menuArrows[i].className = <string>CSS_CLASSES.ARROW;
    }
  }

  setMenuTitle(title: string) {
    const headline = document.querySelector(".off-canvas-title") as HTMLElement;
    headline.innerHTML = title;
  }

  waitForDomElement(selector: string) {
    return new Promise((resolve) => {
      if (document.querySelector(selector)) {
        return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(() => {
        if (document.querySelector(selector)) {
          resolve(document.querySelector(selector));
          observer.disconnect();
        }
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true
      });
    });
  }
}

export default OffCanvasMenu;
