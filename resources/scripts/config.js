/**
 * Level 1 link lists with css class 'link-level-1' are closed when another level 1 lists is clicked.
 * Only one level 1 link list can be open at once.
 * @type {boolean}
 */
const CLOSE_OTHER_SUBMENUS = false;

/**
 * Close menu after click on backdrop (css class 'off-canvas-backdrop).
 * @type {boolean}
 */
const CLOSE_MENU_ON_BACKDROP_CLICK = true;

/**
 * Close all level 1 lists when menu is closed.
 * @type {boolean}
 */
const CLOSE_SUBMENUS_ON_MENU_CLOSE = true;

export {
    CLOSE_OTHER_SUBMENUS,
    CLOSE_MENU_ON_BACKDROP_CLICK,
    CLOSE_SUBMENUS_ON_MENU_CLOSE
};
