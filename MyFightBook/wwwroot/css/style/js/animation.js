"use strict";
var _createClass = function () {
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var App = function () {
    function n(e) {
        if (_classCallCheck(this, n), this.last_window_width = window.innerWidth, this.scroll.y = 0, this.rem_scale = 1, this.defs = {}, this.$tab_focus = null, e)
            for (var i in this.defs) !e[i] && 0 != e[i] || (t.defs[i] = e[i]);
        this.superinit()
    }
    return _createClass(n, [{
        key: "superinit",
        value: function () {
            var e = this;
            window.addEventListener("load", function () {
                checkBrowser(), e.getRems(), e.appEvents(), setTimeout(function () {
                    trigger(document, "appInit")
                }, 1)
            })
        }
    }, {
        key: "appEvents",
        value: function () {
            var t = this;
            document.body.onresize = debounce(function () {
                if (window.innerWidth == t.last_window_width) return !1;
                t.last_window_width = window.innerWidth, t.getRems(), trigger(document, "appResize")
            }, 200), document.addEventListener("scroll", throttle(this.scroll.bind(this))), document.addEventListener("keyup", function (e) {
                9 == e.keyCode && (t.$tab_focus && removeClass(t.$tab_focus, "m-focus"), addClass(document.activeElement, "m-focus"), t.$tab_focus = document.activeElement)
            }), document.addEventListener("click", function (e) {
                t.$tab_focus && removeClass(t.$tab_focus, "m-focus")
            })
        }
    }, {
        key: "getRems",
        value: function () {
            this.rem_scale = parseFloat(getCSS(document.documentElement, "font-size"))
        }
    }, {
        key: "scroll",
        value: function () {
            this.smoothscroll && this.smoothscroll.defs.trigger_scroll || (this.scroll.y = window.pageYOffset, trigger(document, "appScroll"))
        }
    }, {
        key: "superresize",
        value: function () {
            isIE && cropImages()
        }
    }, {
        key: "setupGlobal",
        value: function () {
            window.innerWidth <= 768 && removeHovers(), lazyLoad(), setTimeout(function () {
                waitForImages(document.querySelectorAll(".js-wait-for-images img"), function () {
                    trigger(document, "appReady"), isIE && cropImages()
                })
            }, 0)
        }
    }]), n
}();

function lazyLoad() {
    forEach(document.querySelectorAll(".js-lazy"), function (e, t) {
        e.setAttribute("srcset", e.getAttribute("data-srcset")), e.setAttribute("sizes", e.getAttribute("data-sizes")), e.removeAttribute("data-srcset"), e.removeAttribute("data-sizes"), setTimeout(function () {
            e.setAttribute("src", e.getAttribute("data-src")), e.removeAttribute("data-src"), removeClass(e, "js-lazy")
        }, 0)
    })
}
_createClass = function () {
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
}();
var _get = function e(t, i, n) {
    null === t && (t = Function.prototype);
    var s = Object.getOwnPropertyDescriptor(t, i);
    if (void 0 === s) {
        var o = Object.getPrototypeOf(t);
        return null === o ? void 0 : e(o, i, n)
    }
    if ("value" in s) return s.value;
    var r = s.get;
    return void 0 !== r ? r.call(n) : void 0
};

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _possibleConstructorReturn(e, t) {
    if (!e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return !t || "object" != typeof t && "function" != typeof t ? e : t
}

function _inherits(e, t) {
    if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function, not " + typeof t);
    e.prototype = Object.create(t && t.prototype, {
        constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
        }
    }), t && (Object.setPrototypeOf ? Object.setPrototypeOf(e, t) : e.__proto__ = t)
}
var UrbanGaming = function () {
    function i(e) {
        _classCallCheck(this, i);
        var t = _possibleConstructorReturn(this, (i.__proto__ || Object.getPrototypeOf(i)).call(this, e));
        return t.$overlay = document.querySelector(".a-overlay"), document.addEventListener("appInit", t.init.bind(t)), t
    }
    return _inherits(i, App), _createClass(i, [{
        key: "init",
        value: function () {
            this.bindEvents(), this.initPage(), this.resize()
        }
    }, {
        key: "bindEvents",
        value: function () {
            document.addEventListener("appResize", this.resize.bind(this))
        }
    }, {
        key: "resize",
        value: function () {
            _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "superresize", this).call(this)
        }
    }, {
        key: "showOverlay",
        value: function (e) {
            addClass(this.$overlay, "m-visible"), e && setCSS(this.$overlay, {
                "z-index": e
            })
        }
    }, {
        key: "hideOverlay",
        value: function () {
            removeClass(this.$overlay, "m-visible"), setCSS(this.$overlay, {
                "z-index": ""
            })
        }
    }, {
        key: "initPage",
        value: function (e) {
            switch (null == e && (e = document.getElementsByClassName("main-page")[0]), _get(i.prototype.__proto__ || Object.getPrototypeOf(i.prototype), "setupGlobal", this).call(this), this.page_id = e.id, this.page_id) {
                case "p-homepage":
                    this.page = new HomePage;
                    break;
                default:
                    this.page = new Page
            }
        }
    }]), i
}(), app = new UrbanGaming;

_createClass = function () {
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

_createClass = function () {
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var Animations = function () {
    function i(e, t) {
        _classCallCheck(this, i), this.$animatables = document.querySelectorAll("[data-anim]"), this.animate_at = 200, document.addEventListener("appReady", this.init.bind(this))
    }
    return _createClass(i, [{
        key: "init",
        value: function () {
            this.prepare(), this.bindEvents(), this.resize()
        }
    }, {
        key: "bindEvents",
        value: function () {
            document.addEventListener("appScroll", this.scroll.bind(this)), document.addEventListener("appResize", this.resize.bind(this))
        }
    }, {
        key: "resize",
        value: function () {
            this.setup(), this.scroll()
        }
    }, {
        key: "prepare",
        value: function () {
            var e = document.querySelectorAll('[data-anim="word-up"], .t-h1, .splitting');
            Splitting({
                target: e,
                by: "words",
                key: null
            }), forEach(document.querySelectorAll(".word"), function (e, t) {
                e.innerHTML = "<span>" + e.innerHTML + "</span>"
            })
        }
    }, {
        key: "setup",
        value: function () {
            var n = this;
            this.animatables = [], forEach(this.$animatables, function (e, t) {
                var i = {
                    $node: e,
                    animated: !1,
                    animation: e.getAttribute("data-anim")
                };
                n.animatables.push(i)
            })
        }
    }, {
        key: "scroll",
        value: function () {
            var i = this;
            forEach(this.animatables, function (e, t) {
                !e.animated && i.isInView(e) && i.animate(e)
            })
        }
    }, {
        key: "isInView",
        value: function (e) {
            window.pageYOffset;
            return e.$node.getBoundingClientRect().top - window.innerHeight + this.animate_at < 0
        }
    }, {
        key: "animate",
        value: function (e) {
            switch (e.animated = !0, setCSS(e.$node, {
                visibility: "visible"
            }), e.animation) {
                case "word-up":
                    TweenMax.staggerFrom(e.$node.querySelectorAll(".word span"), 1, {
                        y: "100%",
                        ease: Power4.easeOut,
                        clearProps: "all"
                    }, .15)
            }
        }
    }]), i
}();

document.body.removeAttribute("style");
var TM = TweenMax,
    ua = window.navigator.userAgent,
    isOpera = !!window.opera || 0 <= navigator.userAgent.indexOf(" OPR/"),
    isFirefox = "undefined" != typeof InstallTrigger,
    isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    isChrome = !!window.chrome && !isOpera,
    isIE = !!document.documentMode,
    isEdge = 0 <= navigator.userAgent.indexOf(" Edge/"),
    isChromeIOS = navigator.userAgent.match("CriOS"),
    isFirefoxIOS = 0 < navigator.userAgent.indexOf("FxiOS"),
    iOS = !!ua.match(/iPad/i) || !!ua.match(/iPhone/i),
    hasWebkit = !!ua.match(/WebKit/i),
    isSafariIOS = iOS && hasWebkit && !ua.match(/CriOS/i),
    isAndroid = 0 < ua.toLowerCase().indexOf("android"),
    isWindows = -1 !== navigator.userAgent.indexOf("Windows"),
    isMobileTablet = mobileAndTabletcheck(),
    isTouch = window.isMobileTablet,
    isMobile = !!window.isMobileTablet && mobilecheck(),
    isRetina = 1 < window.devicePixelRatio || window.matchMedia && window.matchMedia("(-webkit-min-device-pixel-ratio: 1.5),(-moz-min-device-pixel-ratio: 1.5),(min-device-pixel-ratio: 1.5)").matches;
createCustomEvent("appResize"), createCustomEvent("appInit"), createCustomEvent("appReady"), createCustomEvent("appScroll"), createCustomEvent("reset");

_createClass = function () {
    function n(e, t) {
        for (var i = 0; i < t.length; i++) {
            var n = t[i];
            n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n)
        }
    }
    return function (e, t, i) {
        return t && n(e.prototype, t), i && n(e, i), e
    }
}();

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}
var Page = function () {
    function t(e) {
        _classCallCheck(this, t), this.superinit()
    }
    return _createClass(t, [{
        key: "superinit",
        value: function () {
            addClass(document.querySelector(".main-page")), setTimeout(function () {}, 0), new Animations;}
    }]), t
}();