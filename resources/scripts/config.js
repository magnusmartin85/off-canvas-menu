/**
 * Level 1 lists with css class '.ocm-lst-lvl-1' are closed when another level 1 lists is opened.
 * Only one level 1 list can be open at once.
 * @type {boolean}
 */
const CLOSE_OTHER_SUBMENUS = false;

/**
 * Close menu after click on overlay (css class '.ocm-ovl').
 * @type {boolean}
 */
const CLOSE_MENU_ON_OVERLAY_CLICK = false;

/**
 * Close all level 1 lists when menu closes.
 * @type {boolean}
 */
const CLOSE_SUBMENUS_ON_MENU_CLOSE = false;

export {
    CLOSE_OTHER_SUBMENUS,
    CLOSE_MENU_ON_OVERLAY_CLICK,
    CLOSE_SUBMENUS_ON_MENU_CLOSE
};
