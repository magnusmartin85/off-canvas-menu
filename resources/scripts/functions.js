import {
  CLASSNAME_ARROW, CLASSNAME_BACKDROP,
  CLASSNAME_LINK_LEVEL_1,
  CLASSNAME_SIDEBAR,
  CLASSNAME_SUBMENU_LEVEL_1
} from './constants';
import {CLOSE_MENU_ON_BACKDROP_CLICK, CLOSE_OTHER_SUBMENUS, CLOSE_SUBMENUS_ON_MENU_CLOSE} from './config';

/**
 *
 */
function addBackdropToDom() {
  const backdropDiv = document.createElement('div');
  backdropDiv.className = 'off-canvas-backdrop';
  document.body.appendChild(backdropDiv);
}

/**
 * Add close events to provided closingItems e.g. backdrop and close icon.
 * @param {array} closingItems - DOM Elements that make the menu close.
 * @param {object} sidebar - DOM Element which contains the menu.
 * @param {object} body - DOM Element which contains the body.
 */
function addCloseEvents(closingItems, sidebar, body) {
  if (CLOSE_MENU_ON_BACKDROP_CLICK) {
    const backdrop = document.querySelector('.' + CLASSNAME_BACKDROP);
    closingItems.push(backdrop);
  }

  for (let i = 0; i < closingItems.length; i++) {
    closingItems[i].addEventListener('click', () => {
      hideSidebar(sidebar);
      removeBackdropFromDom();
      makeBodyScrollable(body);
      CLOSE_SUBMENUS_ON_MENU_CLOSE && rotateMenuArrowsBack();
      CLOSE_SUBMENUS_ON_MENU_CLOSE && closeAllSubmenus();
    });
  }
}

/**
 * Attach click listener to level 1 menu item links.
 * @param {NodeList} level1Links - List of level 1 links.
 */
function addEventsForLevel1Links(level1Links) {
  for (let i = 0; i < level1Links.length; i++) {
    if (level1Links[i].children.length > 0) {
      level1Links[i].addEventListener('click', evt => {
        handleClickLvl1(evt);
      });
    }
  }
}

/**
 *
 */
function closeAllSubmenus() {
  const submenuItems = document.querySelectorAll('.' + CLASSNAME_SUBMENU_LEVEL_1);
  for (let i = 0; i < submenuItems.length; i++) {
    submenuItems[i].style.display = 'none';
  }
}

/**
 *
 * @param evt
 */
function handleClickLvl1(evt) {
  let isOpenLevel1 = evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).nextElementSibling.style.display === 'block';

  if (isOpenLevel1) {
    evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).parentNode.childNodes[3].style.display = 'none';
    evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).childNodes[1].classList.remove('rotate-90');
  } else {
    CLOSE_OTHER_SUBMENUS && closeAllSubmenus();
    CLOSE_OTHER_SUBMENUS && rotateMenuArrowsBack();
    evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).parentNode.childNodes[3].style.display = 'block';
    evt.currentTarget.closest('.' + CLASSNAME_LINK_LEVEL_1).childNodes[1].classList.add('rotate-90');
  }
}

/**
 *
 * @param {object} sidebar - DOM Element which contains the menu.
 */
function handleSidebar(sidebar) {
  sidebar.className = CLASSNAME_SIDEBAR + ' show';
  sidebar.style.visibility = 'visible';
}

/**
 *
 * @param {object} sidebar - DOM Element which contains the menu.
 */
function hideSidebar(sidebar) {
  sidebar.className = CLASSNAME_SIDEBAR;
}

/**
 *
 * @param {object} body - DOM Element which contains the body.
 */
function makeBodyScrollable(body) {
  body.style.overflow = '';
}

/**
 *
 * @param {object} sidebar - DOM Element which contains the menu.
 * @param {object} body - DOM Element which contains the body.
 */
function openMenu(sidebar, body) {
  preventBodyFromScrolling(body);
  handleSidebar(sidebar);
  addBackdropToDom();
  setPageYOffset();
}

/**
 * s
 * @param {object} body - DOM Element which contains the body.
 */
function preventBodyFromScrolling(body) {
  body.style.overflow = 'hidden';
}

/**
 *
 */
function removeBackdropFromDom() {
  const backdropDiv = document.querySelector('.off-canvas-backdrop');
  backdropDiv && backdropDiv.remove();
}

/**
 *
 */
function rotateMenuArrowsBack() {
  let menuArrows = document.querySelectorAll('.' + CLASSNAME_ARROW);
  let len = menuArrows.length;

  for (let i = 0; i < len; i++) {
    menuArrows[i].className = CLASSNAME_ARROW;
  }
}

/**
 *
 */
function setPageYOffset() {
  if (CLASSNAME_SIDEBAR.length === 0) {
    window.requestAnimationFrame(setPageYOffset);
  } else {
    document.getElementsByClassName(CLASSNAME_SIDEBAR)[0].style.top = window.pageYOffset.toString() + 'px';
  }
}

export {
  addCloseEvents,
  addEventsForLevel1Links,
  openMenu,
  handleClickLvl1
};
