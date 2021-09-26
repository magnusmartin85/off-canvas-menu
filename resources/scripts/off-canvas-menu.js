'use strict';

import {
    CLASSNAME_ICON_CLOSE,
    CLASSNAME_ICON_OPEN,
    CLASSNAME_LINK_LEVEL_1,
    CLASSNAME_OVERLAY,
    CLASSNAME_SIDEBAR
} from './constants';
import {addCloseEvents, addEventsLvl1, openMenu} from './functions';
import {CLOSE_MENU_ON_OVERLAY_CLICK} from './config';

document.addEventListener('DOMContentLoaded', () => {
    const body = document.querySelector('body');
    const iconOpen = document.querySelector('.' + CLASSNAME_ICON_OPEN);
    const linkLevel1 = document.querySelectorAll('.' + CLASSNAME_LINK_LEVEL_1);
    const overlay = document.querySelector('.' + CLASSNAME_OVERLAY);
    const sidebar = document.querySelector('.' + CLASSNAME_SIDEBAR);
    addEventsLvl1(linkLevel1);

    iconOpen.addEventListener('click', () => {
        const iconClose = document.querySelector('.' + CLASSNAME_ICON_CLOSE);
        let closingItems = [iconClose];
        if(CLOSE_MENU_ON_OVERLAY_CLICK) {
            closingItems.push(overlay);
        }

        openMenu(sidebar, overlay, body);
        addCloseEvents(closingItems, sidebar, overlay, body);
    });
});

