import { CSS_CLASSES } from "./constants";

class OffCanvasMenu {
  private readonly closeOtherSubMenus: boolean;
  private readonly closeMenuOnBackdropClick: boolean;
  private readonly closeSubMenusOnMenuClose: boolean;

  constructor(
    closeOtherSubMenus?: boolean,
    closeMenuOnBackdropClick?: boolean,
    closeSubMenusOnMenuClose?: boolean
  ) {
    /**
     * Level 1 link lists with css class 'link-level-1' are closed when another level 1 list is clicked.
     * Only one level 1 link list can be open at once.
     * @type {boolean}
     */
    this.closeOtherSubMenus = closeOtherSubMenus || false;

    /**
     * Close menu after click on backdrop (css class 'off-canvas-backdrop').
     * @type {boolean}
     */
    this.closeMenuOnBackdropClick = closeMenuOnBackdropClick || true;

    /**
     * Close all level 1 lists when menu is closed.
     * @type {boolean}
     */
    this.closeSubMenusOnMenuClose = closeSubMenusOnMenuClose || true;
  }

  body = document.querySelector("body") as HTMLElement;
  iconOpen = document.querySelector("." + CSS_CLASSES.ICON_OPEN) as HTMLElement;
  sidebar = document.querySelector("." + CSS_CLASSES.SIDEBAR) as HTMLElement;

  init() {
    const linkLevel1 = document.querySelectorAll(
      "." + CSS_CLASSES.LINK_LEVEL[1]
    );

    const linkLevel2 = document.querySelectorAll(
      "." + CSS_CLASSES.LINK_LEVEL[2]
    );

    this.addEventsForLinks(linkLevel1, 1);
    this.addEventsForLinks(linkLevel2, 2);

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
        this.closeSubMenusOnMenuClose && this.rotateMenuArrowsBack();
        this.closeSubMenusOnMenuClose && this.closeAllSubMenus();
      });
    }
  }

  /**
   * Attach click listener to level 1 menu item links.
   * @param {NodeList} links - List of links.
   * @param {number} level - Number of level to add events for.
   */
  addEventsForLinks(links: NodeListOf<Element>, level: number) {
    links?.forEach((link) => {
      link?.addEventListener("click", (evt: Event) => {
        this.handleClickOnLevel(evt, level);
      });
    });
  }

  closeAllSubMenus() {
    const cssClass =
      "." +
      CSS_CLASSES.SUBMENU_LEVEL[1] +
      "," +
      "." +
      CSS_CLASSES.SUBMENU_LEVEL[2];
    const subMenuItems = document.querySelectorAll(cssClass);

    for (let i = 0; i < subMenuItems.length; i++) {
      const currentSubMenuItem = subMenuItems[i] as HTMLElement;
      currentSubMenuItem.style.display = "none";
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
      currentTarget.classList.remove("active");
    } else {
      this.closeOtherSubMenus && this.closeAllSubMenus();
      this.closeOtherSubMenus && this.rotateMenuArrowsBack();
      nextElementSibling.style.display = "block";
      firstChild.classList.add("rotate-90");
      currentTarget.classList.add("active");
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
    const menuArrows = document.querySelectorAll("." + CSS_CLASSES.ARROW);
    const len = menuArrows.length;

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
