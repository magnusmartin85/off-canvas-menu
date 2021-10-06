import {CLASSNAME_ICON_CLOSE, CLASSNAME_ICON_OPEN, CLASSNAME_LINK_LEVEL_1, CLASSNAME_SIDEBAR} from './constants';
import {addCloseEvents, addEventsForLevel1Links, openMenu} from './functions';

const body = document.querySelector('body');
const iconOpen = document.querySelector('.' + CLASSNAME_ICON_OPEN);
const linkLevel1 = document.querySelectorAll('.' + CLASSNAME_LINK_LEVEL_1);
const sidebar = document.querySelector('.' + CLASSNAME_SIDEBAR);
addEventsForLevel1Links(linkLevel1);

iconOpen.addEventListener('click', () => {
  const iconClose = document.querySelector('.' + CLASSNAME_ICON_CLOSE);
  let closingItems = [iconClose];

  openMenu(sidebar, body);
  addCloseEvents(closingItems, sidebar, body);
});

