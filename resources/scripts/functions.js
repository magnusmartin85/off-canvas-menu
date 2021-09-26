import {
    CLASSNAME_ARROW,
    CLASSNAME_LINK_LEVEL_1,
    CLASSNAME_OCM_HIDE,
    CLASSNAME_SIDEBAR,
    CLASSNAME_SUBMENU_LEVEL_1
} from './constants';
import {CLOSE_OTHER_SUBMENUS, CLOSE_SUBMENUS_ON_MENU_CLOSE} from './config';

/**
 *
 * @param closingItems
 * @param sidebar
 * @param overlay
 * @param body
 */
function addCloseEvents(closingItems, sidebar, overlay, body) {
    for (let i = 0; i < closingItems.length; i++) {
        closingItems[i].addEventListener('click', () => {
            hideSidebar(sidebar);
            hideOverlay(overlay);
            body.style.overflow = '';

            CLOSE_SUBMENUS_ON_MENU_CLOSE && rotateMenuArrowsBack();
            CLOSE_SUBMENUS_ON_MENU_CLOSE && closeAllSubmenus();
        });
    }
}

/**
 *
 * @param linkLevel1
 */
function addEventsLvl1(linkLevel1) {
    for (let i = 0; i < linkLevel1.length; i++) {
        if (linkLevel1[i].children.length > 0) {
            linkLevel1[i].addEventListener('click', evt => {
                handleClickLvl1(evt);
            });
        }
    }
}

/**
 *
 * @param sidebar
 * @param overlay
 * @param body
 */
function openMenu(sidebar, overlay, body) {
    body.style.overflow = 'hidden';
    sidebar.className = CLASSNAME_SIDEBAR + ' ocm-show';
    overlay.style.opacity = '1';
    overlay.style.display = 'block';
    setPageYOffset();
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
 */
function setPageYOffset() {
    if (CLASSNAME_SIDEBAR.length === 0) {
        window.requestAnimationFrame(setPageYOffset);
    } else {
        document.getElementsByClassName(CLASSNAME_SIDEBAR)[0].style.top = window.pageYOffset.toString() + 'px';
    }
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
 * @param sidebar
 */
function hideSidebar(sidebar) {
    sidebar.className = CLASSNAME_SIDEBAR + ' ' + CLASSNAME_OCM_HIDE;
}

/**
 *
 * @param overlay
 */
function hideOverlay(overlay) {
    overlay.style.opacity = '0';
    overlay.style.display = 'none';
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

export {
    addCloseEvents,
    addEventsLvl1,
    openMenu,
    handleClickLvl1
};
