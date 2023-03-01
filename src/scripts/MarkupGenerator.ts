import { MenuItemProps } from "./types";
import { menuItems } from "./menuItems";

class MarkupGenerator {
  private readonly parentElementName: string;
 
  constructor(parentElementName: string) {
    this.parentElementName = parentElementName;
  }

  init() {
    const markup = this.generateMarkup();
    this.addMarkupToDom(this.parentElementName, markup);
  }

  addMarkupToDom(elementName: string, markup: string) {
    const parentElement = document.createElement("div");
    parentElement.className = elementName;
    const element = document.querySelector("." + elementName) as HTMLElement;
    element.insertAdjacentHTML("beforeend", markup);
  }

  generateMarkup() {
    let result = "";
    result += '<nav class="off-canvas-nav">';
    result += '<ul class="list-level-0">';

    menuItems?.forEach((menuItem: MenuItemProps) => {
      const childrenLevel0 = menuItem && menuItem.children;
      const hasChildrenLevel0 = childrenLevel0
        ? childrenLevel0.length > 0
        : false;
      result += this.getListItemMarkup(menuItem);

      if (hasChildrenLevel0) {
        result += this.getOpeningListMarkup(menuItem);
      }

      childrenLevel0 &&
        childrenLevel0.forEach((childLevel1) => {
          result += this.getListItemMarkup(childLevel1);
          const childrenLevel1 = childLevel1 && childLevel1.children;
          const hasChildrenLevel1 = childrenLevel1 && childrenLevel1.length > 0;

          if (hasChildrenLevel1) {
            result += this.getOpeningListMarkup(childLevel1);
          }

          childrenLevel1 &&
            childrenLevel1.forEach((childLevel2) => {
              result += this.getListItemMarkup(childLevel2);
              const childrenLevel2 = childLevel2 && childLevel2.children;
              const hasChildrenLevel2 = childrenLevel1.length > 0;

              if (hasChildrenLevel2) {
                result += this.getOpeningListMarkup(childLevel2);
              }

              childrenLevel2 &&
                childrenLevel2.forEach((childLevel2) => {
                  result += this.getListItemMarkup(childLevel2);
                });

              if (hasChildrenLevel2) {
                result += "</ul>";
              }
            });

          if (hasChildrenLevel1) {
            result += "</ul>";
          }
        });

      if (hasChildrenLevel0) {
        result += "</ul>";
      }
    });

    result += "</ul>";
    result += "</nav>";
    return result;
  }

  getListItemMarkup(menuItem: MenuItemProps) {
    const level = menuItem && menuItem.level;
    const toggleIcon = '<span class="link-arrow">&#8250;</span>';
    const icon =
      menuItem.children && menuItem?.children?.length > 0 ? toggleIcon : "";

    return `
      <li class="list-item">
        <a href="#" class="link-level-${level + 1}">
          ${menuItem.title} ${icon}
        </a>
      </li> 
    `.trim();
  }

  getOpeningListMarkup(menuItem: MenuItemProps) {
    const level = menuItem?.level;
    return `<ul class="list-level-${level + 1}">`;
  }
}

export default MarkupGenerator;
