'use strict';

const classname_Arrow = 'ocm-arw';
const classname_IconClose = 'ocm-sdb-icn-cls';
const classname_IconOpen = 'ocm-sdb-icn-opn-wrp';
const classname_LinkLevel1 = 'ocm-lnk-lvl-1';
const classname_Overlay = 'ocm-ovl';
const classname_Sidebar = 'ocm-sdb';

document.addEventListener('DOMContentLoaded', () => {
    let body = document.querySelector('body');
    let iconOpen = document.querySelector('.' + classname_IconOpen);
    let linkLevel1 = document.querySelectorAll('.' + classname_LinkLevel1);
    let overlay = document.querySelector('.' + classname_Overlay);
    let sidebar = document.querySelector('.' + classname_Sidebar);
    addEventsLvl1(linkLevel1);

    iconOpen.addEventListener('click', () => {
        let iconClose = document.querySelector('.' + classname_IconClose);
        let closingItems = [iconClose];
        openMenu(sidebar, overlay, body);
        addCloseEvents(closingItems, sidebar, overlay, body);
    });
});

function addCloseEvents(closingItems, sidebar, overlay, body) {
    // Hide overlay
    for (let i = 0; i < closingItems.length; i++) {
        closingItems[i].addEventListener('click', () => {
            sidebar.className = classname_Sidebar + ' ocm-hide';
            overlay.style.opacity = '0';
            overlay.style.display = 'none';
            body.style.overflow = '';

            let menuArrows = document.querySelectorAll('.' + classname_Arrow);
            let len = menuArrows.length;

            for (let i = 0; i < len; i++) {
                menuArrows[i].className = classname_Arrow;
            }
        });
    }
}

function addEventsLvl1(linkLevel1) {
    for (let i = 0; i < linkLevel1.length; i++) {
        if (linkLevel1[i].children.length > 0) {
            linkLevel1[i].addEventListener('click', evt => {
                handleClickLvl1(evt);
            });
        }
    }
}

function openMenu(sidebar, overlay, body) {
    body.style.overflow = 'hidden';
    sidebar.className = classname_Sidebar + ' ocm-show';
    overlay.style.opacity = '1';
    overlay.style.display = 'block';
    setPageYOffset();
}

function handleClickLvl1(evt) {
    let isOpenLevel1 = evt.currentTarget.closest('.' + classname_LinkLevel1).nextElementSibling.style.display === 'block';

    if (isOpenLevel1) {
        evt.currentTarget.closest('.' + classname_LinkLevel1).parentNode.childNodes[1].style.display = 'none';
        evt.currentTarget.closest('.' + classname_LinkLevel1).childNodes[1].classList.remove('rotate-90');
    } else {
        evt.currentTarget.closest('.' + classname_LinkLevel1).parentNode.childNodes[1].style.display = 'block';
        evt.currentTarget.closest('.' + classname_LinkLevel1).childNodes[1].classList.add('rotate-90');
    }
}

function setPageYOffset() {
    if (classname_Sidebar.length === 0) {
        window.requestAnimationFrame(setPageYOffset);
    } else {
        document.getElementsByClassName(classname_Sidebar)[0].style.top = window.pageYOffset.toString() + 'px';
    }
}
