!function(){"use strict";var e={21:function(e,t,n){Object.defineProperty(t,"__esModule",{value:!0});const l=n(923);t.default=class{constructor(e){this.parentElementName=e}init(){const e=this.generateMarkup();this.addMarkupToDom(this.parentElementName,e)}addMarkupToDom(e,t){document.createElement("div").className=e;document.querySelector("."+e).insertAdjacentHTML("beforeend",t)}generateMarkup(){let e="";return e+='<nav class="off-canvas-nav">',e+='<ul class="list-level-0">',null===l.menuItems||void 0===l.menuItems||l.menuItems.forEach((t=>{const n=t&&t.children,l=!!n&&n.length>0;e+=this.getListItemMarkup(t),l&&(e+=this.getOpeningListMarkup(t)),n&&n.forEach((t=>{e+=this.getListItemMarkup(t);const n=t&&t.children,l=n&&n.length>0;l&&(e+=this.getOpeningListMarkup(t)),n&&n.forEach((t=>{e+=this.getListItemMarkup(t);const l=t&&t.children,s=n.length>0;s&&(e+=this.getOpeningListMarkup(t)),l&&l.forEach((t=>{e+=this.getListItemMarkup(t)})),s&&(e+="</ul>")})),l&&(e+="</ul>")})),l&&(e+="</ul>")})),e+="</ul>",e+="</nav>",e}getListItemMarkup(e){var t;const n=e&&e.level,l=e.children&&(null===(t=null==e?void 0:e.children)||void 0===t?void 0:t.length)>0?'<span class="link-arrow">&#8250;</span>':"";return`\n      <li class="list-item">\n        <a href="#" class="link-level-${n+1}">\n          ${e.title} ${l}\n        </a>\n      </li> \n    `.trim()}getOpeningListMarkup(e){return`<ul class="list-level-${(null==e?void 0:e.level)+1}">`}}},751:function(e,t,n){var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const s=l(n(21)),o=n(717);t.default=class{constructor(e,t,n){this.body=document.querySelector("body"),this.iconOpen=document.querySelector("."+o.CSS_CLASSES.ICON_OPEN),this.sidebar=document.querySelector("."+o.CSS_CLASSES.SIDEBAR),this.closeOtherSubMenus=e||!1,this.closeMenuOnBackdropClick=t||!0,this.closeSubMenusOnMenuClose=n||!0}init(){new s.default("off-canvas-body").init(),this.waitForDomElement(".off-canvas-nav").then((()=>{const e=document.querySelectorAll("."+o.CSS_CLASSES.LINK_LEVEL[1]),t=document.querySelectorAll("."+o.CSS_CLASSES.LINK_LEVEL[2]);this.addEventsForLinks(e,1),this.addEventsForLinks(t,2),this.setMenuTitle(o.MENU_TITLE)}));this.iconOpen.addEventListener("click",(()=>{const e=document.querySelector("."+o.CSS_CLASSES.ICON_CLOSE),t=[];t.push(e),this.openMenu(this.sidebar,this.body),this.addCloseEvents(t,this.sidebar,this.body)}))}addBackdropToDom(){const e=document.createElement("div");e.className="off-canvas-backdrop",document.body.appendChild(e)}addCloseEvents(e,t,n){if(this.closeMenuOnBackdropClick){const t=document.querySelector("."+o.CSS_CLASSES.BACKDROP);e.push(t)}for(let l=0;l<e.length;l++){e[l].addEventListener("click",(()=>{this.hideSidebar(t),this.removeBackdropFromDom(),this.makeBodyScrollable(n),this.closeSubMenusOnMenuClose&&this.rotateMenuArrowsBack(),this.closeSubMenusOnMenuClose&&this.closeAllSubMenus()}))}}addEventsForLinks(e,t){null==e||e.forEach((e=>{null==e||e.addEventListener("click",(e=>{this.handleClickOnLevel(e,t)}))}))}closeAllSubMenus(){const e="."+o.CSS_CLASSES.SUBMENU_LEVEL[1]+",."+o.CSS_CLASSES.SUBMENU_LEVEL[2],t=document.querySelectorAll(e);for(let e=0;e<t.length;e++){t[e].style.display="none"}}handleClickOnLevel(e,t){const n=e.currentTarget,l=n.closest("."+o.CSS_CLASSES.LINK_LEVEL[t]),s=l.parentElement.nextElementSibling,r="block"===s.style.display,i=l.childNodes[1];r?(s.style.display="none",i.classList.remove("rotate-90"),n.classList.remove("active")):(this.closeOtherSubMenus&&this.closeAllSubMenus(),this.closeOtherSubMenus&&this.rotateMenuArrowsBack(),s.style.display="block",i.classList.add("rotate-90"),n.classList.add("active"))}handleSidebar(e){e.className=o.CSS_CLASSES.SIDEBAR+" show",e.style.visibility="visible"}hideSidebar(e){e.className=o.CSS_CLASSES.SIDEBAR}makeBodyScrollable(e){e.style.overflow=""}openMenu(e,t){this.preventBodyFromScrolling(t),this.handleSidebar(e),this.addBackdropToDom()}preventBodyFromScrolling(e){e.style.overflow="hidden"}removeBackdropFromDom(){const e=document.querySelector(".off-canvas-backdrop");e&&e.remove()}rotateMenuArrowsBack(){const e=document.querySelectorAll("."+o.CSS_CLASSES.ARROW),t=e.length;for(let n=0;n<t;n++)e[n].className=o.CSS_CLASSES.ARROW}setMenuTitle(e){document.querySelector(".off-canvas-title").innerHTML=e}waitForDomElement(e){return new Promise((t=>{if(document.querySelector(e))return t(document.querySelector(e));const n=new MutationObserver((()=>{document.querySelector(e)&&(t(document.querySelector(e)),n.disconnect())}));n.observe(document.body,{childList:!0,subtree:!0})}))}}},717:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.MENU_TITLE=t.CSS_CLASSES=void 0;t.CSS_CLASSES={ARROW:"link-arrow",BACKDROP:"off-canvas-backdrop",ICON_CLOSE:"icon-close",ICON_OPEN:"icon-open-container",SIDEBAR:"off-canvas",SUBMENU_LEVEL:{1:"list-level-1",2:"list-level-2"},LINK_LEVEL:{1:"link-level-1",2:"link-level-2"}};t.MENU_TITLE="Menu"},379:function(e,t,n){var l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),n(202);(new(l(n(751)).default)).init()},923:function(e,t){Object.defineProperty(t,"__esModule",{value:!0}),t.menuItems=void 0;t.menuItems=[{level:0,title:"Home",href:"#"},{level:0,title:"Services",href:"#",children:[{level:1,title:"UX-Design",href:"#",children:[{level:2,title:"Screendesign",href:"#"}]},{level:1,title:"Webdesign",href:"#"},{level:1,title:"Content Marketing",href:"#"}]},{level:0,title:"Team",href:"#",children:[{level:1,title:"John",href:"#"},{level:1,title:"Peter",href:"#"},{level:1,title:"Michael",href:"#"}]},{level:0,title:"Contact",href:"#"}]},202:function(e,t,n){e.exports=n.p+"off-canvas-menu.css"}},t={};function n(l){var s=t[l];if(void 0!==s)return s.exports;var o=t[l]={exports:{}};return e[l].call(o.exports,o,o.exports,n),o.exports}n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(e){if("object"==typeof window)return window}}(),function(){var e;n.g.importScripts&&(e=n.g.location+"");var t=n.g.document;if(!e&&t&&(t.currentScript&&(e=t.currentScript.src),!e)){var l=t.getElementsByTagName("script");l.length&&(e=l[l.length-1].src)}if(!e)throw new Error("Automatic publicPath is not supported in this browser");e=e.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=e}();n(379)}();