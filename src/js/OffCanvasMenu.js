import {
  CLASSNAME_ARROW,
  CLASSNAME_BACKDROP,
  CLASSNAME_ICON_CLOSE,
  CLASSNAME_ICON_OPEN,
  CLASSNAME_LINK_LEVEL_1,
  CLASSNAME_SIDEBAR,
  CLASSNAME_SUBMENU_LEVEL_1
} from './constants';


class OffCanvasMenu {
  /**
   * @param {boolean} closeOtherSubmenus
   * @param {boolean} closeMenuOnBackdropClick
   * @param {boolean} closeSubmenusOnMenuClose
   */
  constructor(
    closeOtherSubmenus,
    closeMenuOnBackdropClick,
    closeSubmenusOnMenuClose
  ) {
    /**
     * Level 1 link lists with css class 'link-level-1' are closed when another level 1 lists is clicked.
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

  body = document.querySelector('body');
  iconOpen = document.querySelector('.' + CLASSNAME_ICON_OPEN);
  linkLevel1 = document.querySelectorAll('.' + CLASSNAME_LINK_LEVEL_1);
  sidebar = document.querySelector('.' + CLASSNAME_SIDEBAR);

  init() {
    this.addEventsForLinksLevel1(this.linkLevel1);

    this.iconOpen.addEventListener('click', () => {
      const iconClose = document.querySelector('.' + CLASSNAME_ICON_CLOSE);
      let closingItems = [iconClose];

      this.openMenu(this.sidebar, this.body);
      this.addCloseEvents(closingItems, this.sidebar, this.body);
    });
  }

  addBackdropToDom() {
    const backdropDiv = document.createElement('div');
    backdropDiv.className = 'off-canvas-backdrop';
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
      const backdrop = document.querySelector('.' + CLASSNAME_BACKDROP);
      closingItems.push(backdrop);
    }

    for (let i = 0; i < closingItems.length; i++) {
      closingItems[i].addEventListener('click', () => {
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
   * @param {NodeList} linksLevel1 - List of level 1 links.
   */
  addEventsForLinksLevel1(linksLevel1) {
    for (let i = 0; i < linksLevel1.length; i++) {
      if (linksLevel1[i].children.length > 0) {
        linksLevel1[i].addEventListener('click', evt => {
          this.handleClickOnLevel1(evt);
        });
      }
    }
  }

  closeAllSubmenus() {
    const submenuItems = document.querySelectorAll('.' + CLASSNAME_SUBMENU_LEVEL_1);
    for (let i = 0; i < submenuItems.length; i++) {
      submenuItems[i].style.display = 'none';
    }
  }

  /**
   *
   * @param {object} evt
   */
  handleClickOnLevel1(evt) {
    let isOpenLevel1 = evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).nextElementSibling.style.display === 'block';

    if (isOpenLevel1) {
      evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).parentNode.childNodes[3].style.display = 'none';
      evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).childNodes[1].classList.remove('rotate-90');
    } else {
      this.closeOtherSubmenus && this.closeAllSubmenus();
      this.closeOtherSubmenus && this.rotateMenuArrowsBack();
      evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).parentNode.childNodes[3].style.display = 'block';
      evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).childNodes[1].classList.add('rotate-90');
    }
  }

  /**
   *
   * @param {object} sidebar - DOM Element which contains the menu.
   */
  handleSidebar(sidebar) {
    sidebar.className = CLASSNAME_SIDEBAR + ' show';
    sidebar.style.visibility = 'visible';
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
    body.style.overflow = '';
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
    this.setPageYOffset();
  }

  /**
   *
   * @param {object} body - DOM Element which contains the body.
   */
  preventBodyFromScrolling(body) {
    body.style.overflow = 'hidden';
  }

  removeBackdropFromDom() {
    const backdropDiv = document.querySelector('.off-canvas-backdrop');
    backdropDiv && backdropDiv.remove();
  }

  rotateMenuArrowsBack() {
    let menuArrows = document.querySelectorAll('.' + CLASSNAME_ARROW);
    let len = menuArrows.length;

    for (let i = 0; i < len; i++) {
      menuArrows[i].className = CLASSNAME_ARROW;
    }
  }

  setPageYOffset() {
    if (CLASSNAME_SIDEBAR.length === 0) {
      window.requestAnimationFrame(this.setPageYOffset);
    } else {
      document.getElementsByClassName(CLASSNAME_SIDEBAR)[0].style.top = window.pageYOffset.toString() + 'px';
    }
  }
}

export default OffCanvasMenu;
