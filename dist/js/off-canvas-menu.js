"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

!function () {
  "use strict";

  var e = "off-canvas";
  new ( /*#__PURE__*/function () {
    function _class2(e, t, l) {
      _classCallCheck(this, _class2);

      _defineProperty(this, "body", document.querySelector("body"));

      _defineProperty(this, "iconOpen", document.querySelector(".icon-open-container"));

      _defineProperty(this, "linkLevel1", document.querySelectorAll(".link-level-1"));

      _defineProperty(this, "sidebar", document.querySelector(".off-canvas"));

      this.closeOtherSubmenus = e, this.closeMenuOnBackdropClick = t, this.closeSubmenusOnMenuClose = l;
    }

    _createClass(_class2, [{
      key: "init",
      value: function init() {
        var _this = this;

        this.addEventsForLinksLevel1(this.linkLevel1), this.iconOpen.addEventListener("click", function () {
          var e = [document.querySelector(".icon-close")];
          _this.openMenu(_this.sidebar, _this.body), _this.addCloseEvents(e, _this.sidebar, _this.body);
        });
      }
    }, {
      key: "addBackdropToDom",
      value: function addBackdropToDom() {
        var e = document.createElement("div");
        e.className = "off-canvas-backdrop", document.body.appendChild(e);
      }
    }, {
      key: "addCloseEvents",
      value: function addCloseEvents(e, t, l) {
        var _this2 = this;

        if (this.closeMenuOnBackdropClick) {
          var _t = document.querySelector(".off-canvas-backdrop");

          e.push(_t);
        }

        for (var s = 0; s < e.length; s++) {
          e[s].addEventListener("click", function () {
            _this2.hideSidebar(t), _this2.removeBackdropFromDom(), _this2.makeBodyScrollable(l), _this2.closeSubmenusOnMenuClose && _this2.rotateMenuArrowsBack(), _this2.closeSubmenusOnMenuClose && _this2.closeAllSubmenus();
          });
        }
      }
    }, {
      key: "addEventsForLinksLevel1",
      value: function addEventsForLinksLevel1(e) {
        var _this3 = this;

        for (var t = 0; t < e.length; t++) {
          e[t].children.length > 0 && e[t].addEventListener("click", function (e) {
            _this3.handleClickOnLevel1(e);
          });
        }
      }
    }, {
      key: "closeAllSubmenus",
      value: function closeAllSubmenus() {
        var e = document.querySelectorAll(".list-level-1");

        for (var t = 0; t < e.length; t++) {
          e[t].style.display = "none";
        }
      }
    }, {
      key: "handleClickOnLevel1",
      value: function handleClickOnLevel1(e) {
        "block" === e.currentTarget.closest(".link-level-1").nextElementSibling.style.display ? (e.currentTarget.closest(".link-level-1").parentNode.childNodes[3].style.display = "none", e.currentTarget.closest(".link-level-1").childNodes[1].classList.remove("rotate-90")) : (this.closeOtherSubmenus && this.closeAllSubmenus(), this.closeOtherSubmenus && this.rotateMenuArrowsBack(), e.currentTarget.closest(".link-level-1").parentNode.childNodes[3].style.display = "block", e.currentTarget.closest(".link-level-1").childNodes[1].classList.add("rotate-90"));
      }
    }, {
      key: "handleSidebar",
      value: function handleSidebar(e) {
        e.className = "off-canvas show", e.style.visibility = "visible";
      }
    }, {
      key: "hideSidebar",
      value: function hideSidebar(t) {
        t.className = e;
      }
    }, {
      key: "makeBodyScrollable",
      value: function makeBodyScrollable(e) {
        e.style.overflow = "";
      }
    }, {
      key: "openMenu",
      value: function openMenu(e, t) {
        this.preventBodyFromScrolling(t), this.handleSidebar(e), this.addBackdropToDom(), this.setPageYOffset();
      }
    }, {
      key: "preventBodyFromScrolling",
      value: function preventBodyFromScrolling(e) {
        e.style.overflow = "hidden";
      }
    }, {
      key: "removeBackdropFromDom",
      value: function removeBackdropFromDom() {
        var e = document.querySelector(".off-canvas-backdrop");
        e && e.remove();
      }
    }, {
      key: "rotateMenuArrowsBack",
      value: function rotateMenuArrowsBack() {
        var e = document.querySelectorAll(".link-arrow"),
            t = e.length;

        for (var l = 0; l < t; l++) {
          e[l].className = "link-arrow";
        }
      }
    }, {
      key: "setPageYOffset",
      value: function setPageYOffset() {
        0 === e.length ? window.requestAnimationFrame(this.setPageYOffset) : document.getElementsByClassName(e)[0].style.top = window.pageYOffset.toString() + "px";
      }
    }]);

    return _class2;
  }())(!0, !0, !0).init();
}();