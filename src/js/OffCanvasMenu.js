import {
  CLASSNAME_ARROW,
  CLASSNAME_BACKDROP,
  CLASSNAME_ICON_CLOSE,
  CLASSNAME_ICON_OPEN,
  CLASSNAME_LINK_LEVEL,
  CLASSNAME_SIDEBAR,
  CLASSNAME_SUBMENU_LEVEL,
  MENU_TITLE,
} from "./constants";
import MarkupGenerator from "./MarkupGenerator/MarkupGenerator";

class OffCanvasMenu {
  /**
   * @param {string} menuId
   * @param {boolean} closeOtherSubmenus
   * @param {boolean} closeMenuOnBackdropClick
   * @param {boolean} closeSubmenusOnMenuClose
   */
  constructor(
    menuId,
    closeOtherSubmenus,
    closeMenuOnBackdropClick,
    closeSubmenusOnMenuClose
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

  body = document.querySelector("body");
  iconOpen = document.querySelector("." + CLASSNAME_ICON_OPEN);
  sidebar = document.querySelector("." + CLASSNAME_SIDEBAR);

  init() {
    const mg = new MarkupGenerator("off-canvas-body");

    mg.init();

    this.waitForDomElement(".off-canvas-nav").then(() => {
      const linkLevel1 = document.querySelectorAll(
        "." + CLASSNAME_LINK_LEVEL[1]
      );

      const linkLevel2 = document.querySelectorAll(
        "." + CLASSNAME_LINK_LEVEL[2]
      );

      this.addEventsForLinks(linkLevel1, 1);
      this.addEventsForLinks(linkLevel2, 2);

      this.setMenuTitle(MENU_TITLE);
    });

    this.iconOpen.addEventListener("click", () => {
      const iconClose = document.querySelector("." + CLASSNAME_ICON_CLOSE);
      let closingItems = [iconClose];

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
  addCloseEvents(closingItems, sidebar, body) {
    if (this.closeMenuOnBackdropClick) {
      const backdrop = document.querySelector("." + CLASSNAME_BACKDROP);
      closingItems.push(backdrop);
    }

    for (let i = 0; i < closingItems.length; i++) {
      closingItems[i].addEventListener("click", () => {
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
  addEventsForLinks(links, level) {
    links &&
      links.forEach((link) => {
        link &&
          link.addEventListener("click", (evt) => {
            this.handleClickOnLevel(evt, level);
          });
      });
  }

  closeAllSubmenus() {
    const submenuItems = document.querySelectorAll(
      "." + CLASSNAME_SUBMENU_LEVEL[1],
      "." + CLASSNAME_SUBMENU_LEVEL[2]
    );
    console.warn(submenuItems);
    for (let i = 0; i < submenuItems.length; i++) {
      submenuItems[i].style.display = "none";
    }
  }

  /**
   *
   * @param {object} evt
   * @param {number} level
   */
  handleClickOnLevel(evt, level) {
    let isOpen =
      evt.currentTarget.closest("." + CLASSNAME_LINK_LEVEL[level] + "")
        .parentElement.nextElementSibling.style.display === "block";

    if (isOpen) {
      evt.currentTarget.closest(
        "." + CLASSNAME_LINK_LEVEL[level]
      ).parentElement.nextElementSibling.style.display = "none";
      evt.currentTarget
        .closest("." + CLASSNAME_LINK_LEVEL[level])
        .childNodes[1].classList.remove("rotate-90");
    } else {
      this.closeOtherSubmenus && this.closeAllSubmenus();
      this.closeOtherSubmenus && this.rotateMenuArrowsBack();
      evt.currentTarget.closest(
        "." + CLASSNAME_LINK_LEVEL[level]
      ).parentElement.nextElementSibling.style.display = "block";
      evt.currentTarget
        .closest("." + CLASSNAME_LINK_LEVEL[level])
        .childNodes[1].classList.add("rotate-90");
    }
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   */
  handleSidebar(sidebar) {
    sidebar.className = CLASSNAME_SIDEBAR + " show";
    sidebar.style.visibility = "visible";
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   */
  hideSidebar(sidebar) {
    sidebar.className = CLASSNAME_SIDEBAR;
  }

  /**
   *
   * @param {object} body - DOM Element which contains the body.
   */
  makeBodyScrollable(body) {
    body.style.overflow = "";
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   * @param {object} body - DOM Element which contains the body.
   */
  openMenu(sidebar, body) {
    this.preventBodyFromScrolling(body);
    this.handleSidebar(sidebar);
    this.addBackdropToDom();
  }

  /**
   *
   * @param {object} body - DOM Element which contains the body.
   */
  preventBodyFromScrolling(body) {
    body.style.overflow = "hidden";
  }

  removeBackdropFromDom() {
    const backdropDiv = document.querySelector(".off-canvas-backdrop");
    backdropDiv && backdropDiv.remove();
  }

  rotateMenuArrowsBack() {
    let menuArrows = document.querySelectorAll("." + CLASSNAME_ARROW);
    let len = menuArrows.length;

    for (let i = 0; i < len; i++) {
      menuArrows[i].className = CLASSNAME_ARROW;
    }
  }

  /**
   * @param {string} title
   */
  setMenuTitle(title) {
    const headline = document.querySelector(".off-canvas-title");
    headline.innerHTML = title;
  }

  waitForDomElement(selector) {
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
        subtree: true,
      });
    });
  }
}

export default OffCanvasMenu;
