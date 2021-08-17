var event = {};

function trigger(t, e) {
    event[e] && t.dispatchEvent(event[e])
}

function createCustomEvent(t) {
    "function" == typeof Event ? event[t] = new Event(t) : (event[t] = document.createEvent("HTMLEvents"), event[t].initEvent(t, !0, !0))
}

function isElement(t) {
    return t instanceof Element
}

function remove(t) {
    t.parentNode.removeChild(t)
}

function forEach(t, e) {
    ("string" == typeof t || t instanceof String) && (t = document.querySelectorAll(t)), t && Array.prototype.forEach.call(t, e)
}

function hasClass(t, e) {
    var i = new RegExp(e, "g");
    return null !== t.className.match(i)
}

function addClass(t, e) {
    hasClass(t, e) || (t.className += " " + e)
}
var removeClass = function (t, e) {
    var i = " " + t.className.replace(/[\t\r\n]/g, " ") + " ";
    if (hasClass(t, e)) {
        for (; 0 <= i.indexOf(" " + e + " ");) i = i.replace(" " + e + " ", " ");
        t.className = i.replace(/^\s+|\s+$/g, "")
    }
};

function getCSS(t, e) {
    return window.getComputedStyle(t, null)[e]
}

function getPrefix() {
    var t = window.getComputedStyle(document.documentElement, ""),
        e = (Array.prototype.slice.call(t).join("").match(/-(moz|webkit|ms)-/) || "" === t.OLink && ["", "o"])[1];
    return {
        dom: "WebKit|Moz|MS|O".match(new RegExp("(" + e + ")", "i"))[1],
        lowercase: e,
        css: "-" + e + "-",
        js: e[0].toUpperCase() + e.substr(1)
    }
}
var properties_to_prefix = ["transform", "appearance", "filter", "animation"];

function setCSS(t, e, i) {
    for (var s in e) t.style[s] = e[s], -1 < properties_to_prefix.indexOf(s) && (t.style[getPrefix().css + s] = e[s]);
    i && "function" == typeof i && setTimeout(function () {
        i()
    }, getTransitionDuration(t))
}

function getTransitionDuration(t) {
    return toDuration(window.getComputedStyle(t, null)["transition-duration"])
}

function toDuration(t) {
    return -1 < t.indexOf(",") && (t = (t = t.split(","))[0]), -1 < t.indexOf("ms") ? t.replace(/[a-zA-Z]+/g, "") : 1e3 * t.replace(/[a-zA-Z]+/g, "")
}
var getClosest = function (t, e) {
    for (Element.prototype.matches || (Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector || function (t) {
        for (var e = (this.document || this.ownerDocument).querySelectorAll(t), i = e.length; 0 <= --i && e.item(i) !== this;);
        return -1 < i
    }); t && t !== document; t = t.parentNode)
        if (t.matches(e)) return t;
    return null
};

function postAjax(t, e, i) {
    var s = "string" == typeof e ? e : Object.keys(e).map(function (t) {
        return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
    }).join("&"),
        r = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Microsoft.XMLHTTP");
    return r.open("POST", t), r.onreadystatechange = function () {
        200 == r.status ? 3 < r.readyState && i(r.responseText) : (console.log("error", r.status), console.trace(s))
    }, r.setRequestHeader("X-Requested-With", "XMLHttpRequest"), r.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"), r.send(s), r
}

function throttle(i, s, r) {
    var n, a, o, l = null,
        h = 0;
    r || (r = {});
    var u = function () {
        h = !1 === r.leading ? 0 : Date.now(), l = null, o = i.apply(n, a), l || (n = a = null)
    };
    return function () {
        var t = Date.now();
        h || !1 !== r.leading || (h = t);
        var e = s - (t - h);
        return n = this, a = arguments, e <= 0 || s < e ? (l && (clearTimeout(l), l = null), h = t, o = i.apply(n, a), l || (n = a = null)) : l || !1 === r.trailing || (l = setTimeout(u, e)), o
    }
}

function debounce(s, r, n) {
    var a;
    return function () {
        var t = this,
            e = arguments,
            i = n && !a;
        clearTimeout(a), a = setTimeout(function () {
            a = null, n || s.apply(t, e)
        }, r), i && s.apply(t, e)
    }
}

function wrap(t, e) {
    e || (e = "div");
    var i = document.createElement(e);
    return t.parentNode.insertBefore(i, t), i.appendChild(t), i
}

function wrapChildren(t, e) {
    e || (e = "div");
    for (var i = document.createElement(e); t.firstChild;) i.appendChild(t.firstChild);
    return t.innerHTML = "", t.appendChild(i), i
} ! function (t, e) {
    "use strict";
    var i;
    if ("object" == typeof exports) {
        try {
            i = require("moment")
        } catch (t) { }
        module.exports = e(i)
    } else "function" == typeof define && define.amd ? define(function (t) {
        try {
            i = t("moment")
        } catch (t) { }
        return e(i)
    }) : t.Pikaday = e(t.moment)
}(this, function (i) {
    "use strict";
    var n = "function" == typeof i,
        a = !!window.addEventListener,
        f = window.document,
        h = window.setTimeout,
        o = function (t, e, i, s) {
            a ? t.addEventListener(e, i, !!s) : t.attachEvent("on" + e, i)
        },
        e = function (t, e, i, s) {
            a ? t.removeEventListener(e, i, !!s) : t.detachEvent("on" + e, i)
        },
        l = function (t, e) {
            return -1 !== (" " + t.className + " ").indexOf(" " + e + " ")
        },
        _ = function (t, e) {
            l(t, e) || (t.className = "" === t.className ? e : t.className + " " + e)
        },
        p = function (t, e) {
            var i;
            t.className = (i = (" " + t.className + " ").replace(" " + e + " ", " ")).trim ? i.trim() : i.replace(/^\s+|\s+$/g, "")
        },
        g = function (t) {
            return /Array/.test(Object.prototype.toString.call(t))
        },
        L = function (t) {
            return /Date/.test(Object.prototype.toString.call(t)) && !isNaN(t.getTime())
        },
        X = function (t, e) {
            return [31, (i = t, i % 4 == 0 && i % 100 != 0 || i % 400 == 0 ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][e];
            var i
        },
        j = function (t) {
            L(t) && t.setHours(0, 0, 0, 0)
        },
        Y = function (t, e) {
            return t.getTime() === e.getTime()
        },
        u = function (t, e, i) {
            var s, r;
            for (s in e) (r = void 0 !== t[s]) && "object" == typeof e[s] && null !== e[s] && void 0 === e[s].nodeName ? L(e[s]) ? i && (t[s] = new Date(e[s].getTime())) : g(e[s]) ? i && (t[s] = e[s].slice(0)) : t[s] = u({}, e[s], i) : !i && r || (t[s] = e[s]);
            return t
        },
        r = function (t, e, i) {
            var s;
            f.createEvent ? ((s = f.createEvent("HTMLEvents")).initEvent(e, !0, !1), s = u(s, i), t.dispatchEvent(s)) : f.createEventObject && (s = f.createEventObject(), s = u(s, i), t.fireEvent("on" + e, s))
        },
        s = function (t) {
            return t.month < 0 && (t.year -= Math.ceil(Math.abs(t.month) / 12), t.month += 12), 11 < t.month && (t.year += Math.floor(Math.abs(t.month) / 12), t.month -= 12), t
        },
        c = {
            field: null,
            bound: void 0,
            ariaLabel: "Use the arrow keys to pick a date",
            position: "bottom left",
            reposition: !0,
            format: "YYYY-MM-DD",
            toString: null,
            parse: null,
            defaultDate: null,
            setDefaultDate: !1,
            firstDay: 0,
            formatStrict: !1,
            minDate: null,
            maxDate: null,
            yearRange: 10,
            showWeekNumber: !1,
            pickWholeWeek: !1,
            minYear: 0,
            maxYear: 9999,
            minMonth: void 0,
            maxMonth: void 0,
            startRange: null,
            endRange: null,
            isRTL: !1,
            yearSuffix: "",
            showMonthAfterYear: !1,
            showDaysInNextAndPreviousMonths: !1,
            enableSelectionDaysInNextAndPreviousMonths: !1,
            numberOfMonths: 1,
            mainCalendar: "left",
            container: void 0,
            blurFieldOnSelect: !0,
            i18n: {
                previousMonth: "Mois précédent",
                nextMonth: "Mois suivant",
                months: ["Janvier", "Février", "Mars", "Avil", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"],
                weekdays: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi"],
                weekdaysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"]
            },
            theme: null,
            events: [],
            onSelect: null,
            onOpen: null,
            onClose: null,
            onDraw: null,
            keyboardInput: !0
        },
        d = function (t, e, i) {
            for (e += t.firstDay; 7 <= e;) e -= 7;
            return i ? t.i18n.weekdaysShort[e] : t.i18n.weekdays[e]
        },
        B = function (t) {
            var e = [],
                i = "false";
            if (t.isEmpty) {
                if (!t.showDaysInNextAndPreviousMonths) return '<td class="is-empty"></td>';
                e.push("is-outside-current-month"), t.enableSelectionDaysInNextAndPreviousMonths || e.push("is-selection-disabled")
            }
            return t.isDisabled && e.push("is-disabled"), t.isToday && e.push("is-today"), t.isSelected && (e.push("is-selected"), i = "true"), t.hasEvent && e.push("has-event"), t.isInRange && e.push("is-inrange"), t.isStartRange && e.push("is-startrange"), t.isEndRange && e.push("is-endrange"), '<td data-day="' + t.day + '" class="' + e.join(" ") + '" aria-selected="' + i + '"><button class="pika-button pika-day" type="button" data-pika-year="' + t.year + '" data-pika-month="' + t.month + '" data-pika-day="' + t.day + '">' + t.day + "</button></td>"
        },
        m = function (t, e, i, s, r, n) {
            var a, o, l, h, u, c = t._o,
                f = i === c.minYear,
                _ = i === c.maxYear,
                p = '<div id="' + n + '" class="pika-title" role="heading" aria-live="assertive">',
                d = !0,
                m = !0;
            for (l = [], a = 0; a < 12; a++) l.push('<option value="' + (i === r ? a - e : 12 + a - e) + '"' + (a === s ? ' selected="selected"' : "") + (f && a < c.minMonth || _ && a > c.maxMonth ? 'disabled="disabled"' : "") + ">" + c.i18n.months[a] + "</option>");
            for (h = '<div class="pika-label">' + c.i18n.months[s] + '<select class="pika-select pika-select-month" tabindex="-1">' + l.join("") + "</select></div>", o = g(c.yearRange) ? (a = c.yearRange[0], c.yearRange[1] + 1) : (a = i - c.yearRange, 1 + i + c.yearRange), l = []; a < o && a <= c.maxYear; a++) a >= c.minYear && l.push('<option value="' + a + '"' + (a === i ? ' selected="selected"' : "") + ">" + a + "</option>");
            return u = '<div class="pika-label">' + i + c.yearSuffix + '<select class="pika-select pika-select-year" tabindex="-1">' + l.join("") + "</select></div>", c.showMonthAfterYear ? p += u + h : p += h + u, f && (0 === s || c.minMonth >= s) && (d = !1), _ && (11 === s || c.maxMonth <= s) && (m = !1), 0 === e && (p += '<button class="pika-prev' + (d ? "" : " is-disabled") + '" type="button">' + c.i18n.previousMonth + "</button>"), e === t._o.numberOfMonths - 1 && (p += '<button class="pika-next' + (m ? "" : " is-disabled") + '" type="button">' + c.i18n.nextMonth + "</button>"), p + "</div>"
        },
        q = function (t, e, i) {
            return '<table cellpadding="0" cellspacing="0" class="pika-table" role="grid" aria-labelledby="' + i + '">' + function (t) {
                var e, i = [];
                for (t.showWeekNumber && i.push("<th></th>"), e = 0; e < 7; e++) i.push('<th scope="col"><abbr title="' + d(t, e) + '">' + d(t, e, !0) + "</abbr></th>");
                return "<thead><tr>" + (t.isRTL ? i.reverse() : i).join("") + "</tr></thead>"
            }(t) + ("<tbody>" + e.join("") + "</tbody>") + "</table>"
        },
        t = function (t) {
            var s = this,
                r = s.config(t);
            s._onMouseDown = function (t) {
                if (s._v) {
                    var e = (t = t || window.event).target || t.srcElement;
                    if (e)
                        if (l(e, "is-disabled") || (!l(e, "pika-button") || l(e, "is-empty") || l(e.parentNode, "is-disabled") ? l(e, "pika-prev") ? s.prevMonth() : l(e, "pika-next") && s.nextMonth() : (s.setDate(new Date(e.getAttribute("data-pika-year"), e.getAttribute("data-pika-month"), e.getAttribute("data-pika-day"))), r.bound && h(function () {
                            s.hide(), r.blurFieldOnSelect && r.field && r.field.blur()
                        }, 100))), l(e, "pika-select")) s._c = !0;
                        else {
                            if (!t.preventDefault) return t.returnValue = !1;
                            t.preventDefault()
                        }
                }
            }, s._onChange = function (t) {
                var e = (t = t || window.event).target || t.srcElement;
                e && (l(e, "pika-select-month") ? s.gotoMonth(e.value) : l(e, "pika-select-year") && s.gotoYear(e.value))
            }, s._onKeyChange = function (t) {
                if (t = t || window.event, s.isVisible()) switch (t.keyCode) {
                    case 13:
                    case 27:
                        r.field && r.field.blur();
                        break;
                    case 37:
                        t.preventDefault(), s.adjustDate("subtract", 1);
                        break;
                    case 38:
                        s.adjustDate("subtract", 7);
                        break;
                    case 39:
                        s.adjustDate("add", 1);
                        break;
                    case 40:
                        s.adjustDate("add", 7)
                }
            }, s._onInputChange = function (t) {
                var e;
                t.firedBy !== s && (e = r.parse ? r.parse(r.field.value, r.format) : n ? (e = i(r.field.value, r.format, r.formatStrict)) && e.isValid() ? e.toDate() : null : new Date(Date.parse(r.field.value)), L(e) && s.setDate(e), s._v || s.show())
            }, s._onInputFocus = function () {
                s.show()
            }, s._onInputClick = function () {
                s.show()
            }, s._onInputBlur = function () {
                var t = f.activeElement;
                do {
                    if (l(t, "pika-single")) return
                } while (t = t.parentNode);
                s._c || (s._b = h(function () {
                    s.hide()
                }, 50)), s._c = !1
            }, s._onClick = function (t) {
                var e = (t = t || window.event).target || t.srcElement,
                    i = e;
                if (e) {
                    !a && l(e, "pika-select") && (e.onchange || (e.setAttribute("onchange", "return;"), o(e, "change", s._onChange)));
                    do {
                        if (l(i, "pika-single") || i === r.trigger) return
                    } while (i = i.parentNode);
                    s._v && e !== r.trigger && i !== r.trigger && s.hide()
                }
            }, s.el = f.createElement("div"), s.el.className = "pika-single" + (r.isRTL ? " is-rtl" : "") + (r.theme ? " " + r.theme : ""), o(s.el, "mousedown", s._onMouseDown, !0), o(s.el, "touchend", s._onMouseDown, !0), o(s.el, "change", s._onChange), r.keyboardInput && o(f, "keydown", s._onKeyChange), r.field && (r.container ? r.container.appendChild(s.el) : r.bound ? f.body.appendChild(s.el) : r.field.parentNode.insertBefore(s.el, r.field.nextSibling), o(r.field, "change", s._onInputChange), r.defaultDate || (n && r.field.value ? r.defaultDate = i(r.field.value, r.format).toDate() : r.defaultDate = new Date(Date.parse(r.field.value)), r.setDefaultDate = !0));
            var e = r.defaultDate;
            L(e) ? r.setDefaultDate ? s.setDate(e, !0) : s.gotoDate(e) : s.gotoDate(new Date), r.bound ? (this.hide(), s.el.className += " is-bound", o(r.trigger, "click", s._onInputClick), o(r.trigger, "focus", s._onInputFocus), o(r.trigger, "blur", s._onInputBlur)) : this.show()
        };
    return t.prototype = {
        config: function (t) {
            this._o || (this._o = u({}, c, !0));
            var e = u(this._o, t, !0);
            e.isRTL = !!e.isRTL, e.field = e.field && e.field.nodeName ? e.field : null, e.theme = "string" == typeof e.theme && e.theme ? e.theme : null, e.bound = !!(void 0 !== e.bound ? e.field && e.bound : e.field), e.trigger = e.trigger && e.trigger.nodeName ? e.trigger : e.field, e.disableWeekends = !!e.disableWeekends, e.disableDayFn = "function" == typeof e.disableDayFn ? e.disableDayFn : null;
            var i = parseInt(e.numberOfMonths, 10) || 1;
            if (e.numberOfMonths = 4 < i ? 4 : i, L(e.minDate) || (e.minDate = !1), L(e.maxDate) || (e.maxDate = !1), e.minDate && e.maxDate && e.maxDate < e.minDate && (e.maxDate = e.minDate = !1), e.minDate && this.setMinDate(e.minDate), e.maxDate && this.setMaxDate(e.maxDate), g(e.yearRange)) {
                var s = (new Date).getFullYear() - 10;
                e.yearRange[0] = parseInt(e.yearRange[0], 10) || s, e.yearRange[1] = parseInt(e.yearRange[1], 10) || s
            } else e.yearRange = Math.abs(parseInt(e.yearRange, 10)) || c.yearRange, 100 < e.yearRange && (e.yearRange = 100);
            return e
        },
        toString: function (t) {
            return t = t || this._o.format, L(this._d) ? this._o.toString ? this._o.toString(this._d, t) : n ? i(this._d).format(t) : this._d.toDateString() : ""
        },
        getMoment: function () {
            return n ? i(this._d) : null
        },
        setMoment: function (t, e) {
            n && i.isMoment(t) && this.setDate(t.toDate(), e)
        },
        getDate: function () {
            return L(this._d) ? new Date(this._d.getTime()) : null
        },
        setDate: function (t, e) {
            if (!t) return this._d = null, this._o.field && (this._o.field.value = "", r(this._o.field, "change", {
                firedBy: this
            })), this.draw();
            if ("string" == typeof t && (t = new Date(Date.parse(t))), L(t)) {
                var i = this._o.minDate,
                    s = this._o.maxDate;
                L(i) && t < i ? t = i : L(s) && s < t && (t = s), this._d = new Date(t.getTime()), j(this._d), this.gotoDate(this._d), this._o.field && (this._o.field.value = this.toString(), r(this._o.field, "change", {
                    firedBy: this
                })), e || "function" != typeof this._o.onSelect || this._o.onSelect.call(this, this.getDate())
            }
        },
        gotoDate: function (t) {
            var e = !0;
            if (L(t)) {
                if (this.calendars) {
                    var i = new Date(this.calendars[0].year, this.calendars[0].month, 1),
                        s = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1),
                        r = t.getTime();
                    s.setMonth(s.getMonth() + 1), s.setDate(s.getDate() - 1), e = r < i.getTime() || s.getTime() < r
                }
                e && (this.calendars = [{
                    month: t.getMonth(),
                    year: t.getFullYear()
                }], "right" === this._o.mainCalendar && (this.calendars[0].month += 1 - this._o.numberOfMonths)), this.adjustCalendars()
            }
        },
        adjustDate: function (t, e) {
            var i, s = this.getDate() || new Date,
                r = 24 * parseInt(e) * 60 * 60 * 1e3;
            "add" === t ? i = new Date(s.valueOf() + r) : "subtract" === t && (i = new Date(s.valueOf() - r)), this.setDate(i)
        },
        adjustCalendars: function () {
            this.calendars[0] = s(this.calendars[0]);
            for (var t = 1; t < this._o.numberOfMonths; t++) this.calendars[t] = s({
                month: this.calendars[0].month + t,
                year: this.calendars[0].year
            });
            this.draw()
        },
        gotoToday: function () {
            this.gotoDate(new Date)
        },
        gotoMonth: function (t) {
            isNaN(t) || (this.calendars[0].month = parseInt(t, 10), this.adjustCalendars())
        },
        nextMonth: function () {
            this.calendars[0].month++ , this.adjustCalendars()
        },
        prevMonth: function () {
            this.calendars[0].month-- , this.adjustCalendars()
        },
        gotoYear: function (t) {
            isNaN(t) || (this.calendars[0].year = parseInt(t, 10), this.adjustCalendars())
        },
        setMinDate: function (t) {
            t instanceof Date ? (j(t), this._o.minDate = t, this._o.minYear = t.getFullYear(), this._o.minMonth = t.getMonth()) : (this._o.minDate = c.minDate, this._o.minYear = c.minYear, this._o.minMonth = c.minMonth, this._o.startRange = c.startRange), this.draw()
        },
        setMaxDate: function (t) {
            t instanceof Date ? (j(t), this._o.maxDate = t, this._o.maxYear = t.getFullYear(), this._o.maxMonth = t.getMonth()) : (this._o.maxDate = c.maxDate, this._o.maxYear = c.maxYear, this._o.maxMonth = c.maxMonth, this._o.endRange = c.endRange), this.draw()
        },
        setStartRange: function (t) {
            this._o.startRange = t
        },
        setEndRange: function (t) {
            this._o.endRange = t
        },
        draw: function (t) {
            if (this._v || t) {
                var e, i = this._o,
                    s = i.minYear,
                    r = i.maxYear,
                    n = i.minMonth,
                    a = i.maxMonth,
                    o = "";
                this._y <= s && (this._y = s, !isNaN(n) && this._m < n && (this._m = n)), this._y >= r && (this._y = r, !isNaN(a) && this._m > a && (this._m = a)), e = "pika-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
                for (var l = 0; l < i.numberOfMonths; l++) o += '<div class="pika-lendar">' + m(this, l, this.calendars[l].year, this.calendars[l].month, this.calendars[0].year, e) + this.render(this.calendars[l].year, this.calendars[l].month, e) + "</div>";
                this.el.innerHTML = o, i.bound && "hidden" !== i.field.type && h(function () {
                    i.trigger.focus()
                }, 1), "function" == typeof this._o.onDraw && this._o.onDraw(this), i.bound && i.field.setAttribute("aria-label", i.ariaLabel)
            }
        },
        adjustPosition: function () {
            var t, e, i, s, r, n, a, o, l, h, u, c;
            if (!this._o.container) {
                if (this.el.style.position = "absolute", e = t = this._o.trigger, i = this.el.offsetWidth, s = this.el.offsetHeight, r = window.innerWidth || f.documentElement.clientWidth, n = window.innerHeight || f.documentElement.clientHeight, a = window.pageYOffset || f.body.scrollTop || f.documentElement.scrollTop, c = u = !0, "function" == typeof t.getBoundingClientRect) o = (h = t.getBoundingClientRect()).left + window.pageXOffset, l = h.bottom + window.pageYOffset;
                else
                    for (o = e.offsetLeft, l = e.offsetTop + e.offsetHeight; e = e.offsetParent;) o += e.offsetLeft, l += e.offsetTop;
                (this._o.reposition && r < o + i || -1 < this._o.position.indexOf("right") && 0 < o - i + t.offsetWidth) && (o = o - i + t.offsetWidth, u = !1), (this._o.reposition && n + a < l + s || -1 < this._o.position.indexOf("top") && 0 < l - s - t.offsetHeight) && (l = l - s - t.offsetHeight, c = !1), this.el.style.left = o + "px", this.el.style.top = l + "px", _(this.el, u ? "left-aligned" : "right-aligned"), _(this.el, c ? "bottom-aligned" : "top-aligned"), p(this.el, u ? "right-aligned" : "left-aligned"), p(this.el, c ? "top-aligned" : "bottom-aligned")
            }
        },
        render: function (t, e, i) {
            var s = this._o,
                r = new Date,
                n = X(t, e),
                a = new Date(t, e, 1).getDay(),
                o = [],
                l = [];
            j(r), 0 < s.firstDay && (a -= s.firstDay) < 0 && (a += 7);
            for (var h = 0 === e ? 11 : e - 1, u = 11 === e ? 0 : e + 1, c = 0 === e ? t - 1 : t, f = 11 === e ? t + 1 : t, _ = X(c, h), p = n + a, d = p; 7 < d;) d -= 7;
            p += 7 - d;
            for (var m, g, v, y, b, w, x, T = !1, k = 0, P = 0; k < p; k++) {
                var S = new Date(t, e, k - a + 1),
                    D = !!L(this._d) && Y(S, this._d),
                    O = Y(S, r),
                    R = -1 !== s.events.indexOf(S.toDateString()),
                    C = k < a || n + a <= k,
                    M = k - a + 1,
                    A = e,
                    N = t,
                    z = s.startRange && Y(s.startRange, S),
                    I = s.endRange && Y(s.endRange, S),
                    E = s.startRange && s.endRange && s.startRange < S && S < s.endRange;
                C && (N = k < a ? (M = _ + M, A = h, c) : (M -= n, A = u, f));
                var F = {
                    day: M,
                    month: A,
                    year: N,
                    hasEvent: R,
                    isSelected: D,
                    isToday: O,
                    isDisabled: s.minDate && S < s.minDate || s.maxDate && S > s.maxDate || s.disableWeekends && (void 0, 0 === (x = S.getDay()) || 6 === x) || s.disableDayFn && s.disableDayFn(S),
                    isEmpty: C,
                    isStartRange: z,
                    isEndRange: I,
                    isInRange: E,
                    showDaysInNextAndPreviousMonths: s.showDaysInNextAndPreviousMonths,
                    enableSelectionDaysInNextAndPreviousMonths: s.enableSelectionDaysInNextAndPreviousMonths
                };
                s.pickWholeWeek && D && (T = !0), l.push(B(F)), 7 == ++P && (s.showWeekNumber && l.unshift((v = k - a, y = e, b = t, w = void 0, w = new Date(b, 0, 1), '<td class="pika-week">' + Math.ceil(((new Date(b, y, v) - w) / 864e5 + w.getDay() + 1) / 7) + "</td>")), o.push((m = l, g = s.isRTL, '<tr class="pika-row' + (s.pickWholeWeek ? " pick-whole-week" : "") + (T ? " is-selected" : "") + '">' + (g ? m.reverse() : m).join("") + "</tr>")), P = 0, T = !(l = []))
            }
            return q(s, o, i)
        },
        isVisible: function () {
            return this._v
        },
        show: function () {
            this.isVisible() || (this._v = !0, this.draw(), p(this.el, "is-hidden"), this._o.bound && (o(f, "click", this._onClick), this.adjustPosition()), "function" == typeof this._o.onOpen && this._o.onOpen.call(this))
        },
        hide: function () {
            var t = this._v;
            !1 !== t && (this._o.bound && e(f, "click", this._onClick), this.el.style.position = "static", this.el.style.left = "auto", this.el.style.top = "auto", _(this.el, "is-hidden"), this._v = !1, void 0 !== t && "function" == typeof this._o.onClose && this._o.onClose.call(this))
        },
        destroy: function () {
            var t = this._o;
            this.hide(), e(this.el, "mousedown", this._onMouseDown, !0), e(this.el, "touchend", this._onMouseDown, !0), e(this.el, "change", this._onChange), t.keyboardInput && e(f, "keydown", this._onKeyChange), t.field && (e(t.field, "change", this._onInputChange), t.bound && (e(t.trigger, "click", this._onInputClick), e(t.trigger, "focus", this._onInputFocus), e(t.trigger, "blur", this._onInputBlur))), this.el.parentNode && this.el.parentNode.removeChild(this.el)
        }
    }, t
}),
    function (t, e) {
        "object" == typeof exports && "undefined" != typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define(e) : t.Splitting = e()
    }(this, function () {
        "use strict";
        var n = document,
            u = n.createTextNode.bind(n);

        function f(t, e, i) {
            t.style.setProperty(e, i)
        }

        function c(t, e) {
            return t.appendChild(e)
        }

        function _(t, e, i, s) {
            var r = n.createElement("span");
            return e && (r.className = e), i && (!s && r.setAttribute("data-" + e, i), r.textContent = i), t && c(t, r) || r
        }

        function p(t, e) {
            return t.getAttribute("data-" + e)
        }

        function d(t, e) {
            return t && 0 != t.length ? t.nodeName ? [t] : [].slice.call(t[0].nodeName ? t : (e || n).querySelectorAll(t)) : []
        }

        function a(t) {
            for (var e = []; t--;) e[t] = [];
            return e
        }

        function m(t, e) {
            t && t.some(e)
        }

        function o(e) {
            return function (t) {
                return e[t]
            }
        }
        var l = {};

        function t(t, e, i, s) {
            return {
                by: t,
                depends: e,
                key: i,
                split: s
            }
        }

        function i(t) {
            return function e(i, t, s) {
                var r = s.indexOf(i);
                if (-1 == r) s.unshift(i), m(l[i].depends, function (t) {
                    e(t, i, s)
                });
                else {
                    var n = s.indexOf(t);
                    s.splice(r, 1), s.splice(n, 0, i)
                }
                return s
            }(t, 0, []).map(o(l))
        }

        function e(t) {
            l[t.by] = t
        }

        function g(t, s, r, n, a) {
            t.normalize();
            var o = [],
                l = document.createDocumentFragment();
            n && o.push(t.previousSibling);
            var h = [];
            return d(t.childNodes).some(function (t) {
                if (!t.tagName || t.hasChildNodes()) {
                    if (t.childNodes && t.childNodes.length) return h.push(t), void o.push.apply(o, g(t, s, r, n, a));
                    var e = t.wholeText || "",
                        i = e.trim();
                    i.length && (" " === e[0] && h.push(u(" ")), m(i.split(r), function (t, e) {
                        e && a && h.push(_(l, "whitespace", " ", a));
                        var i = _(l, s, t);
                        o.push(i), h.push(i)
                    }), " " === e[e.length - 1] && h.push(u(" ")))
                } else h.push(t)
            }), m(h, function (t) {
                c(l, t)
            }), t.innerHTML = "", c(t, l), o
        }
        var r = "words",
            s = t(r, 0, "word", function (t) {
                return g(t, "word", /\s+/, 0, 1)
            }),
            v = "chars",
            h = t(v, [r], "char", function (t, i, e) {
                var s = [];
                return m(e[r], function (t, e) {
                    s.push.apply(s, g(t, "char", "", i.whitespace && e))
                }), s
            });

        function y(e) {
            var c = (e = e || {}).key;
            return d(e.target || "[data-splitting]").map(function (l) {
                var h = l["🍌"];
                if (!e.force && h) return h;
                h = l["🍌"] = {
                    el: l
                };
                var t = i(e.by || p(l, "splitting") || v),
                    u = function (t, e) {
                        for (var i in e) t[i] = e[i];
                        return t
                    }({}, e);
                return m(t, function (t) {
                    if (t.split) {
                        var e = t.by,
                            i = (c ? "-" + c : "") + t.key,
                            s = t.split(l, u, h);
                        i && (r = l, o = (a = "--" + i) + "-index", m(n = s, function (t, e) {
                            Array.isArray(t) ? m(t, function (t) {
                                f(t, o, e)
                            }) : f(t, o, e)
                        }), f(r, a + "-total", n.length)), h[e] = s, l.classList.add(e)
                    }
                    var r, n, a, o
                }), l.classList.add("splitting"), h
            })
        }

        function b(t, e, i) {
            var s = d(e.matching || t.children, t),
                r = {};
            return m(s, function (t) {
                var e = Math.round(t[i]);
                (r[e] || (r[e] = [])).push(t)
            }), Object.keys(r).map(Number).sort(w).map(o(r))
        }

        function w(t, e) {
            return t - e
        }
        y.html = function (t) {
            var e = (t = t || {}).target = _();
            return e.innerHTML = t.content, y(t), e.outerHTML
        }, y.add = e;
        var x = t("lines", [r], "line", function (t, e, i) {
            return b(t, {
                matching: i[r]
            }, "offsetTop")
        }),
            T = t("items", 0, "item", function (t, e) {
                return d(e.matching || t.children, t)
            }),
            k = t("rows", 0, "row", function (t, e) {
                return b(t, e, "offsetTop")
            }),
            P = t("cols", 0, "col", function (t, e) {
                return b(t, e, "offsetLeft")
            }),
            S = t("grid", ["rows", "cols"]),
            D = "layout",
            O = t(D, 0, 0, function (t, e) {
                var i = e.rows = +(e.rows || p(t, "rows") || 1),
                    s = e.columns = +(e.columns || p(t, "columns") || 1);
                if (e.image = e.image || p(t, "image") || t.currentSrc || t.src, e.image) {
                    var r = d("img", t)[0];
                    e.image = r && (r.currentSrc || r.src)
                }
                e.image && f(t, "background-image", "url(" + e.image + ")");
                for (var n = i * s, a = [], o = _(0, "cell-grid"); n--;) {
                    var l = _(o, "cell");
                    _(l, "cell-inner"), a.push(l)
                }
                return c(t, o), a
            }),
            R = t("cellRows", [D], "row", function (t, e, i) {
                var s = e.rows,
                    r = a(s);
                return m(i[D], function (t, e, i) {
                    r[Math.floor(e / (i.length / s))].push(t)
                }), r
            }),
            C = t("cellColumns", [D], "col", function (t, e, i) {
                var s = e.columns,
                    r = a(s);
                return m(i[D], function (t, e) {
                    r[e % s].push(t)
                }), r
            }),
            M = t("cells", ["cellRows", "cellColumns"], "cell", function (t, e, i) {
                return i[D]
            });
        return e(s), e(h), e(x), e(T), e(k), e(P), e(S), e(O), e(R), e(C), e(M), y
    });
var _gsScope = "undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window;

function waitForImages(t, e, i) {
    var s = t.length,
        r = 0,
        n = new Date;
    if (0 == s) return i && i(1), void (e && o());

    function a() {
        r++ , console.log("image loaded"), i && i(r / s), r == s && e && o()
    }

    function o() {
        var t = new Date - n;
        0 < t && t < 1e3 ? setTimeout(e, 1e3 - t) : e()
    }
    forEach(t, function (t, e) {
        var i = new Image,
            s = t.getAttribute("src");
        s ? (i.src = s, i.complete || i.naturalWidth ? a.apply(i) : ((i = new Image).onload = a, i.onerror = a, i.onabort = a, i.src = s)) : a()
    })
}

function toggleScroll(t) {
    hasClass(t, "js-scroll-disabled") ? enableScroll(t) : disableScroll(t)
} (_gsScope._gsQueue || (_gsScope._gsQueue = [])).push(function () {
    "use strict";
    var t, l, e, T, w, x, k, g, i, v, P, y, b, _, p, m, s;
    _gsScope._gsDefine("TweenMax", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (s, u, m) {
        var g = function (t) {
            var e, i = [],
                s = t.length;
            for (e = 0; e !== s; i.push(t[e++]));
            return i
        },
            v = function (t, e, i) {
                var s, r, n = t.cycle;
                for (s in n) r = n[s], t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                delete t.cycle
            },
            y = function (t, e, i) {
                m.call(this, t, e, i), this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._dirty = !0, this.render = y.prototype.render
            },
            b = 1e-10,
            w = m._internals,
            x = w.isSelector,
            T = w.isArray,
            t = y.prototype = m.to({}, .1, {}),
            k = [];
        y.version = "1.18.4", t.constructor = y, t.kill()._gc = !1, y.killTweensOf = y.killDelayedCallsTo = m.killTweensOf, y.getTweensOf = m.getTweensOf, y.lagSmoothing = m.lagSmoothing, y.ticker = m.ticker, y.render = m.render, t.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), m.prototype.invalidate.call(this)
        }, t.updateTo = function (t, e) {
            var i, s = this.ratio,
                r = this.vars.immediateRender || t.immediateRender;
            for (i in e && this._startTime < this._timeline._time && (this._startTime = this._timeline._time, this._uncache(!1), this._gc ? this._enabled(!0, !1) : this._timeline.insert(this, this._startTime - this._delay)), t) this.vars[i] = t[i];
            if (this._initted || r)
                if (e) this._initted = !1, r && this.render(0, !0, !0);
                else if (this._gc && this._enabled(!0, !1), this._notifyPluginsOfEnabled && this._firstPT && m._onPluginEvent("_onDisable", this), .998 < this._time / this._duration) {
                    var n = this._totalTime;
                    this.render(0, !0, !1), this._initted = !1, this.render(n, !0, !1)
                } else if (this._initted = !1, this._init(), 0 < this._time || r)
                    for (var a, o = 1 / (1 - s), l = this._firstPT; l;) a = l.s + l.c, l.c *= o, l.s = a - l.c, l = l._next;
            return this
        }, t.render = function (t, e, i) {
            this._initted || 0 === this._duration && this.vars.repeat && this.invalidate();
            var s, r, n, a, o, l, h, u, c = this._dirty ? this.totalDuration() : this._totalDuration,
                f = this._time,
                _ = this._totalTime,
                p = this._cycle,
                d = this._duration,
                m = this._rawPrevTime;
            if (c - 1e-7 <= t ? (this._totalTime = c, this._cycle = this._repeat, this._yoyo && 0 != (1 & this._cycle) ? (this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0) : (this._time = d, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1), this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === d && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (m < 0 || t <= 0 && -1e-7 <= t || m === b && "isPause" !== this.data) && m !== t && (i = !0, b < m && (r = "onReverseComplete")), this._rawPrevTime = u = !e || t || m === t ? t : b)) : t < 1e-7 ? (this._totalTime = this._time = this._cycle = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== _ || 0 === d && 0 < m) && (r = "onReverseComplete", s = this._reversed), t < 0 && (this._active = !1, 0 === d && (this._initted || !this.vars.lazy || i) && (0 <= m && (i = !0), this._rawPrevTime = u = !e || t || m === t ? t : b)), this._initted || (i = !0)) : (this._totalTime = this._time = t, 0 !== this._repeat && (a = d + this._repeatDelay, this._cycle = this._totalTime / a >> 0, 0 !== this._cycle && this._cycle === this._totalTime / a && _ <= t && this._cycle-- , this._time = this._totalTime - this._cycle * a, this._yoyo && 0 != (1 & this._cycle) && (this._time = d - this._time), this._time > d ? this._time = d : this._time < 0 && (this._time = 0)), this._easeType ? (o = this._time / d, (1 === (l = this._easeType) || 3 === l && .5 <= o) && (o = 1 - o), 3 === l && (o *= 2), 1 === (h = this._easePower) ? o *= o : 2 === h ? o *= o * o : 3 === h ? o *= o * o * o : 4 === h && (o *= o * o * o * o), 1 === l ? this.ratio = 1 - o : 2 === l ? this.ratio = o : this._time / d < .5 ? this.ratio = o / 2 : this.ratio = 1 - o / 2) : this.ratio = this._ease.getRatio(this._time / d)), f !== this._time || i || p !== this._cycle) {
                if (!this._initted) {
                    if (this._init(), !this._initted || this._gc) return;
                    if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = f, this._totalTime = _, this._rawPrevTime = m, this._cycle = p, w.lazyTweens.push(this), void (this._lazy = [t, e]);
                    this._time && !s ? this.ratio = this._ease.getRatio(this._time / d) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                }
                for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== f && 0 <= t && (this._active = !0), 0 === _ && (2 === this._initted && 0 < t && this._init(), this._startAt && (0 <= t ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._totalTime || 0 === d) && (e || this._callback("onStart"))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                this._onUpdate && (t < 0 && this._startAt && this._startTime && this._startAt.render(t, e, i), e || (this._totalTime !== _ || r) && this._callback("onUpdate")), this._cycle !== p && (e || this._gc || this.vars.onRepeat && this._callback("onRepeat")), r && (!this._gc || i) && (t < 0 && this._startAt && !this._onUpdate && this._startTime && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === d && this._rawPrevTime === b && u !== b && (this._rawPrevTime = 0))
            } else _ !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, y.to = function (t, e, i) {
            return new y(t, e, i)
        }, y.from = function (t, e, i) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new y(t, e, i)
        }, y.fromTo = function (t, e, i, s) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new y(t, e, s)
        }, y.staggerTo = y.allTo = function (t, e, i, s, r, n, a) {
            s = s || 0;
            var o, l, h, u, c = 0,
                f = [],
                _ = function () {
                    i.onComplete && i.onComplete.apply(i.onCompleteScope || this, arguments), r.apply(a || i.callbackScope || this, n || k)
                },
                p = i.cycle,
                d = i.startAt && i.startAt.cycle;
            for (T(t) || ("string" == typeof t && (t = m.selector(t) || t), x(t) && (t = g(t))), t = t || [], s < 0 && ((t = g(t)).reverse(), s *= -1), o = t.length - 1, h = 0; h <= o; h++) {
                for (u in l = {}, i) l[u] = i[u];
                if (p && v(l, t, h), d) {
                    for (u in d = l.startAt = {}, i.startAt) d[u] = i.startAt[u];
                    v(l.startAt, t, h)
                }
                l.delay = c + (l.delay || 0), h === o && r && (l.onComplete = _), f[h] = new y(t[h], e, l), c += s
            }
            return f
        }, y.staggerFrom = y.allFrom = function (t, e, i, s, r, n, a) {
            return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, y.staggerTo(t, e, i, s, r, n, a)
        }, y.staggerFromTo = y.allFromTo = function (t, e, i, s, r, n, a, o) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, y.staggerTo(t, e, s, r, n, a, o)
        }, y.delayedCall = function (t, e, i, s, r) {
            return new y(e, 0, {
                delay: t,
                onComplete: e,
                onCompleteParams: i,
                callbackScope: s,
                onReverseComplete: e,
                onReverseCompleteParams: i,
                immediateRender: !1,
                useFrames: r,
                overwrite: 0
            })
        }, y.set = function (t, e) {
            return new y(t, 0, e)
        }, y.isTweening = function (t) {
            return 0 < m.getTweensOf(t, !0).length
        };
        var n = function (t, e) {
            for (var i = [], s = 0, r = t._first; r;) r instanceof m ? i[s++] = r : (e && (i[s++] = r), s = (i = i.concat(n(r, e))).length), r = r._next;
            return i
        },
            c = y.getAllTweens = function (t) {
                return n(s._rootTimeline, t).concat(n(s._rootFramesTimeline, t))
            };
        y.killAll = function (t, e, i, s) {
            null == e && (e = !0), null == i && (i = !0);
            var r, n, a, o = c(0 != s),
                l = o.length,
                h = e && i && s;
            for (a = 0; a < l; a++) n = o[a], (h || n instanceof u || (r = n.target === n.vars.onComplete) && i || e && !r) && (t ? n.totalTime(n._reversed ? 0 : n.totalDuration()) : n._enabled(!1, !1))
        }, y.killChildTweensOf = function (t, e) {
            if (null != t) {
                var i, s, r, n, a, o = w.tweenLookup;
                if ("string" == typeof t && (t = m.selector(t) || t), x(t) && (t = g(t)), T(t))
                    for (n = t.length; - 1 < --n;) y.killChildTweensOf(t[n], e);
                else {
                    for (r in i = [], o)
                        for (s = o[r].target.parentNode; s;) s === t && (i = i.concat(o[r].tweens)), s = s.parentNode;
                    for (a = i.length, n = 0; n < a; n++) e && i[n].totalTime(i[n].totalDuration()), i[n]._enabled(!1, !1)
                }
            }
        };
        var r = function (t, e, i, s) {
            e = !1 !== e, i = !1 !== i;
            for (var r, n, a = c(s = !1 !== s), o = e && i && s, l = a.length; - 1 < --l;) n = a[l], (o || n instanceof u || (r = n.target === n.vars.onComplete) && i || e && !r) && n.paused(t)
        };
        return y.pauseAll = function (t, e, i) {
            r(!0, t, e, i)
        }, y.resumeAll = function (t, e, i) {
            r(!1, t, e, i)
        }, y.globalTimeScale = function (t) {
            var e = s._rootTimeline,
                i = m.ticker.time;
            return arguments.length ? (t = t || b, e._startTime = i - (i - e._startTime) * e._timeScale / t, e = s._rootFramesTimeline, i = m.ticker.frame, e._startTime = i - (i - e._startTime) * e._timeScale / t, e._timeScale = s._rootTimeline._timeScale = t, t) : e._timeScale
        }, t.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, t.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, t.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, t.duration = function (t) {
            return arguments.length ? s.prototype.duration.call(this, t) : this._duration
        }, t.totalDuration = function (t) {
            return arguments.length ? -1 === this._repeat ? this : this.duration((t - this._repeat * this._repeatDelay) / (this._repeat + 1)) : (this._dirty && (this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat, this._dirty = !1), this._totalDuration)
        }, t.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, t.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, t.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, y
    }, !0), _gsScope._gsDefine("TimelineLite", ["core.Animation", "core.SimpleTimeline", "TweenLite"], function (u, c, f) {
        var _ = function (t) {
            c.call(this, t), this._labels = {}, this.autoRemoveChildren = !0 === this.vars.autoRemoveChildren, this.smoothChildTiming = !0 === this.vars.smoothChildTiming, this._sortChildren = !0, this._onUpdate = this.vars.onUpdate;
            var e, i, s = this.vars;
            for (i in s) e = s[i], m(e) && -1 !== e.join("").indexOf("{self}") && (s[i] = this._swapSelfInParams(e));
            m(s.tweens) && this.add(s.tweens, 0, s.align, s.stagger)
        },
            d = 1e-10,
            t = f._internals,
            e = _._internals = {},
            p = t.isSelector,
            m = t.isArray,
            g = t.lazyTweens,
            v = t.lazyRender,
            a = _gsScope._gsDefine.globals,
            y = function (t) {
                var e, i = {};
                for (e in t) i[e] = t[e];
                return i
            },
            b = function (t, e, i) {
                var s, r, n = t.cycle;
                for (s in n) r = n[s], t[s] = "function" == typeof r ? r.call(e[i], i) : r[i % r.length];
                delete t.cycle
            },
            n = e.pauseCallback = function () { },
            w = function (t) {
                var e, i = [],
                    s = t.length;
                for (e = 0; e !== s; i.push(t[e++]));
                return i
            },
            i = _.prototype = new c;
        return _.version = "1.18.4", i.constructor = _, i.kill()._gc = i._forcingPlayhead = i._hasPause = !1, i.to = function (t, e, i, s) {
            var r = i.repeat && a.TweenMax || f;
            return e ? this.add(new r(t, e, i), s) : this.set(t, i, s)
        }, i.from = function (t, e, i, s) {
            return this.add((i.repeat && a.TweenMax || f).from(t, e, i), s)
        }, i.fromTo = function (t, e, i, s, r) {
            var n = s.repeat && a.TweenMax || f;
            return e ? this.add(n.fromTo(t, e, i, s), r) : this.set(t, s, r)
        }, i.staggerTo = function (t, e, i, s, r, n, a, o) {
            var l, h, u = new _({
                onComplete: n,
                onCompleteParams: a,
                callbackScope: o,
                smoothChildTiming: this.smoothChildTiming
            }),
                c = i.cycle;
            for ("string" == typeof t && (t = f.selector(t) || t), p(t = t || []) && (t = w(t)), (s = s || 0) < 0 && ((t = w(t)).reverse(), s *= -1), h = 0; h < t.length; h++)(l = y(i)).startAt && (l.startAt = y(l.startAt), l.startAt.cycle && b(l.startAt, t, h)), c && b(l, t, h), u.to(t[h], e, l, h * s);
            return this.add(u, r)
        }, i.staggerFrom = function (t, e, i, s, r, n, a, o) {
            return i.immediateRender = 0 != i.immediateRender, i.runBackwards = !0, this.staggerTo(t, e, i, s, r, n, a, o)
        }, i.staggerFromTo = function (t, e, i, s, r, n, a, o, l) {
            return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, this.staggerTo(t, e, s, r, n, a, o, l)
        }, i.call = function (t, e, i, s) {
            return this.add(f.delayedCall(0, t, e, i), s)
        }, i.set = function (t, e, i) {
            return i = this._parseTimeOrLabel(i, 0, !0), null == e.immediateRender && (e.immediateRender = i === this._time && !this._paused), this.add(new f(t, 0, e), i)
        }, _.exportRoot = function (t, e) {
            null == (t = t || {}).smoothChildTiming && (t.smoothChildTiming = !0);
            var i, s, r = new _(t),
                n = r._timeline;
            for (null == e && (e = !0), n._remove(r, !0), r._startTime = 0, r._rawPrevTime = r._time = r._totalTime = n._time, i = n._first; i;) s = i._next, e && i instanceof f && i.target === i.vars.onComplete || r.add(i, i._startTime - i._delay), i = s;
            return n.add(r, 0), r
        }, i.add = function (t, e, i, s) {
            var r, n, a, o, l, h;
            if ("number" != typeof e && (e = this._parseTimeOrLabel(e, 0, !0, t)), !(t instanceof u)) {
                if (t instanceof Array || t && t.push && m(t)) {
                    for (i = i || "normal", s = s || 0, r = e, n = t.length, a = 0; a < n; a++) m(o = t[a]) && (o = new _({
                        tweens: o
                    })), this.add(o, r), "string" != typeof o && "function" != typeof o && ("sequence" === i ? r = o._startTime + o.totalDuration() / o._timeScale : "start" === i && (o._startTime -= o.delay())), r += s;
                    return this._uncache(!0)
                }
                if ("string" == typeof t) return this.addLabel(t, e);
                if ("function" != typeof t) throw "Cannot add " + t + " into the timeline; it is not a tween, timeline, function, or string.";
                t = f.delayedCall(0, t)
            }
            if (c.prototype.add.call(this, t, e), (this._gc || this._time === this._duration) && !this._paused && this._duration < this.duration())
                for (h = (l = this).rawTime() > t._startTime; l._timeline;) h && l._timeline.smoothChildTiming ? l.totalTime(l._totalTime, !0) : l._gc && l._enabled(!0, !1), l = l._timeline;
            return this
        }, i.remove = function (t) {
            if (t instanceof u) {
                this._remove(t, !1);
                var e = t._timeline = t.vars.useFrames ? u._rootFramesTimeline : u._rootTimeline;
                return t._startTime = (t._paused ? t._pauseTime : e._time) - (t._reversed ? t.totalDuration() - t._totalTime : t._totalTime) / t._timeScale, this
            }
            if (t instanceof Array || t && t.push && m(t)) {
                for (var i = t.length; - 1 < --i;) this.remove(t[i]);
                return this
            }
            return "string" == typeof t ? this.removeLabel(t) : this.kill(null, t)
        }, i._remove = function (t, e) {
            c.prototype._remove.call(this, t, e);
            var i = this._last;
            return i ? this._time > i._startTime + i._totalDuration / i._timeScale && (this._time = this.duration(), this._totalTime = this._totalDuration) : this._time = this._totalTime = this._duration = this._totalDuration = 0, this
        }, i.append = function (t, e) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t))
        }, i.insert = i.insertMultiple = function (t, e, i, s) {
            return this.add(t, e || 0, i, s)
        }, i.appendMultiple = function (t, e, i, s) {
            return this.add(t, this._parseTimeOrLabel(null, e, !0, t), i, s)
        }, i.addLabel = function (t, e) {
            return this._labels[t] = this._parseTimeOrLabel(e), this
        }, i.addPause = function (t, e, i, s) {
            var r = f.delayedCall(0, n, i, s || this);
            return r.vars.onComplete = r.vars.onReverseComplete = e, r.data = "isPause", this._hasPause = !0, this.add(r, t)
        }, i.removeLabel = function (t) {
            return delete this._labels[t], this
        }, i.getLabelTime = function (t) {
            return null != this._labels[t] ? this._labels[t] : -1
        }, i._parseTimeOrLabel = function (t, e, i, s) {
            var r;
            if (s instanceof u && s.timeline === this) this.remove(s);
            else if (s && (s instanceof Array || s.push && m(s)))
                for (r = s.length; - 1 < --r;) s[r] instanceof u && s[r].timeline === this && this.remove(s[r]);
            if ("string" == typeof e) return this._parseTimeOrLabel(e, i && "number" == typeof t && null == this._labels[e] ? t - this.duration() : 0, i);
            if (e = e || 0, "string" != typeof t || !isNaN(t) && null == this._labels[t]) null == t && (t = this.duration());
            else {
                if (-1 === (r = t.indexOf("="))) return null == this._labels[t] ? i ? this._labels[t] = this.duration() + e : e : this._labels[t] + e;
                e = parseInt(t.charAt(r - 1) + "1", 10) * Number(t.substr(r + 1)), t = 1 < r ? this._parseTimeOrLabel(t.substr(0, r - 1), 0, i) : this.duration()
            }
            return Number(t) + e
        }, i.seek = function (t, e) {
            return this.totalTime("number" == typeof t ? t : this._parseTimeOrLabel(t), !1 !== e)
        }, i.stop = function () {
            return this.paused(!0)
        }, i.gotoAndPlay = function (t, e) {
            return this.play(t, e)
        }, i.gotoAndStop = function (t, e) {
            return this.pause(t, e)
        }, i.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, r, n, a, o, l, h, u = this._dirty ? this.totalDuration() : this._totalDuration,
                c = this._time,
                f = this._startTime,
                _ = this._timeScale,
                p = this._paused;
            if (u - 1e-7 <= t) this._totalTime = this._time = u, this._reversed || this._hasPausedChild() || (r = !0, a = "onComplete", o = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && -1e-7 <= t || this._rawPrevTime < 0 || this._rawPrevTime === d) && this._rawPrevTime !== t && this._first && (o = !0, this._rawPrevTime > d && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : d, t = u + 1e-4;
            else if (t < 1e-7)
                if (this._totalTime = this._time = 0, (0 !== c || 0 === this._duration && this._rawPrevTime !== d && (0 < this._rawPrevTime || t < 0 && 0 <= this._rawPrevTime)) && (a = "onReverseComplete", r = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (o = r = !0, a = "onReverseComplete") : 0 <= this._rawPrevTime && this._first && (o = !0), this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : d, 0 === t && r)
                        for (s = this._first; s && 0 === s._startTime;) s._duration || (r = !1), s = s._next;
                    t = 0, this._initted || (o = !0)
                }
            else {
                if (this._hasPause && !this._forcingPlayhead && !e) {
                    if (c <= t)
                        for (s = this._first; s && s._startTime <= t && !l;) s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (l = s), s = s._next;
                    else
                        for (s = this._last; s && s._startTime >= t && !l;) s._duration || "isPause" === s.data && 0 < s._rawPrevTime && (l = s), s = s._prev;
                    l && (this._time = t = l._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
                }
                this._totalTime = this._time = this._rawPrevTime = t
            }
            if (this._time !== c && this._first || i || o || l) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._time !== c && 0 < t && (this._active = !0), 0 === c && this.vars.onStart && 0 !== this._time && (e || this._callback("onStart")), c <= (h = this._time))
                    for (s = this._first; s && (n = s._next, h === this._time && (!this._paused || p));)(s._active || s._startTime <= h && !s._paused && !s._gc) && (l === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = n;
                else
                    for (s = this._last; s && (n = s._prev, h === this._time && (!this._paused || p));) {
                        if (s._active || s._startTime <= c && !s._paused && !s._gc) {
                            if (l === s) {
                                for (l = s._prev; l && l.endTime() > this._time;) l.render(l._reversed ? l.totalDuration() - (t - l._startTime) * l._timeScale : (t - l._startTime) * l._timeScale, e, i), l = l._prev;
                                l = null, this.pause()
                            }
                            s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                        }
                        s = n
                    }
                this._onUpdate && (e || (g.length && v(), this._callback("onUpdate"))), a && (this._gc || (f === this._startTime || _ !== this._timeScale) && (0 === this._time || u >= this.totalDuration()) && (r && (g.length && v(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
            }
        }, i._hasPausedChild = function () {
            for (var t = this._first; t;) {
                if (t._paused || t instanceof _ && t._hasPausedChild()) return !0;
                t = t._next
            }
            return !1
        }, i.getChildren = function (t, e, i, s) {
            s = s || -9999999999;
            for (var r = [], n = this._first, a = 0; n;) n._startTime < s || (n instanceof f ? !1 !== e && (r[a++] = n) : (!1 !== i && (r[a++] = n), !1 !== t && (a = (r = r.concat(n.getChildren(!0, e, i))).length))), n = n._next;
            return r
        }, i.getTweensOf = function (t, e) {
            var i, s, r = this._gc,
                n = [],
                a = 0;
            for (r && this._enabled(!0, !0), s = (i = f.getTweensOf(t)).length; - 1 < --s;)(i[s].timeline === this || e && this._contains(i[s])) && (n[a++] = i[s]);
            return r && this._enabled(!1, !0), n
        }, i.recent = function () {
            return this._recent
        }, i._contains = function (t) {
            for (var e = t.timeline; e;) {
                if (e === this) return !0;
                e = e.timeline
            }
            return !1
        }, i.shiftChildren = function (t, e, i) {
            i = i || 0;
            for (var s, r = this._first, n = this._labels; r;) r._startTime >= i && (r._startTime += t), r = r._next;
            if (e)
                for (s in n) n[s] >= i && (n[s] += t);
            return this._uncache(!0)
        }, i._kill = function (t, e) {
            if (!t && !e) return this._enabled(!1, !1);
            for (var i = e ? this.getTweensOf(e) : this.getChildren(!0, !0, !1), s = i.length, r = !1; - 1 < --s;) i[s]._kill(t, e) && (r = !0);
            return r
        }, i.clear = function (t) {
            var e = this.getChildren(!1, !0, !0),
                i = e.length;
            for (this._time = this._totalTime = 0; - 1 < --i;) e[i]._enabled(!1, !1);
            return !1 !== t && (this._labels = {}), this._uncache(!0)
        }, i.invalidate = function () {
            for (var t = this._first; t;) t.invalidate(), t = t._next;
            return u.prototype.invalidate.call(this)
        }, i._enabled = function (t, e) {
            if (t === this._gc)
                for (var i = this._first; i;) i._enabled(t, !0), i = i._next;
            return c.prototype._enabled.call(this, t, e)
        }, i.totalTime = function (t, e, i) {
            this._forcingPlayhead = !0;
            var s = u.prototype.totalTime.apply(this, arguments);
            return this._forcingPlayhead = !1, s
        }, i.duration = function (t) {
            return arguments.length ? (0 !== this.duration() && 0 !== t && this.timeScale(this._duration / t), this) : (this._dirty && this.totalDuration(), this._duration)
        }, i.totalDuration = function (t) {
            if (arguments.length) return t && this.totalDuration() ? this.timeScale(this._totalDuration / t) : this;
            if (this._dirty) {
                for (var e, i, s = 0, r = this._last, n = 999999999999; r;) e = r._prev, r._dirty && r.totalDuration(), r._startTime > n && this._sortChildren && !r._paused ? this.add(r, r._startTime - r._delay) : n = r._startTime, r._startTime < 0 && !r._paused && (s -= r._startTime, this._timeline.smoothChildTiming && (this._startTime += r._startTime / this._timeScale), this.shiftChildren(-r._startTime, !1, -9999999999), n = 0), s < (i = r._startTime + r._totalDuration / r._timeScale) && (s = i), r = e;
                this._duration = this._totalDuration = s, this._dirty = !1
            }
            return this._totalDuration
        }, i.paused = function (t) {
            if (!t)
                for (var e = this._first, i = this._time; e;) e._startTime === i && "isPause" === e.data && (e._rawPrevTime = 0), e = e._next;
            return u.prototype.paused.apply(this, arguments)
        }, i.usesFrames = function () {
            for (var t = this._timeline; t._timeline;) t = t._timeline;
            return t === u._rootFramesTimeline
        }, i.rawTime = function () {
            return this._paused ? this._totalTime : (this._timeline.rawTime() - this._startTime) * this._timeScale
        }, _
    }, !0), _gsScope._gsDefine("TimelineMax", ["TimelineLite", "TweenLite", "easing.Ease"], function (e, a, t) {
        var i = function (t) {
            e.call(this, t), this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._cycle = 0, this._yoyo = !0 === this.vars.yoyo, this._dirty = !0
        },
            S = 1e-10,
            s = a._internals,
            D = s.lazyTweens,
            O = s.lazyRender,
            o = new t(null, null, 1, 0),
            r = i.prototype = new e;
        return r.constructor = i, r.kill()._gc = !1, i.version = "1.18.4", r.invalidate = function () {
            return this._yoyo = !0 === this.vars.yoyo, this._repeat = this.vars.repeat || 0, this._repeatDelay = this.vars.repeatDelay || 0, this._uncache(!0), e.prototype.invalidate.call(this)
        }, r.addCallback = function (t, e, i, s) {
            return this.add(a.delayedCall(0, t, i, s), e)
        }, r.removeCallback = function (t, e) {
            if (t)
                if (null == e) this._kill(null, t);
                else
                    for (var i = this.getTweensOf(t, !1), s = i.length, r = this._parseTimeOrLabel(e); - 1 < --s;) i[s]._startTime === r && i[s]._enabled(!1, !1);
            return this
        }, r.removePause = function (t) {
            return this.removeCallback(e._internals.pauseCallback, t)
        }, r.tweenTo = function (t, e) {
            e = e || {};
            var i, s, r, n = {
                ease: o,
                useFrames: this.usesFrames(),
                immediateRender: !1
            };
            for (s in e) n[s] = e[s];
            return n.time = this._parseTimeOrLabel(t), i = Math.abs(Number(n.time) - this._time) / this._timeScale || .001, r = new a(this, i, n), n.onStart = function () {
                r.target.paused(!0), r.vars.time !== r.target.time() && i === r.duration() && r.duration(Math.abs(r.vars.time - r.target.time()) / r.target._timeScale), e.onStart && r._callback("onStart")
            }, r
        }, r.tweenFromTo = function (t, e, i) {
            i = i || {}, t = this._parseTimeOrLabel(t), i.startAt = {
                onComplete: this.seek,
                onCompleteParams: [t],
                callbackScope: this
            }, i.immediateRender = !1 !== i.immediateRender;
            var s = this.tweenTo(e, i);
            return s.duration(Math.abs(s.vars.time - t) / this._timeScale || .001)
        }, r.render = function (t, e, i) {
            this._gc && this._enabled(!0, !1);
            var s, r, n, a, o, l, h, u, c = this._dirty ? this.totalDuration() : this._totalDuration,
                f = this._duration,
                _ = this._time,
                p = this._totalTime,
                d = this._startTime,
                m = this._timeScale,
                g = this._rawPrevTime,
                v = this._paused,
                y = this._cycle;
            if (c - 1e-7 <= t) this._locked || (this._totalTime = c, this._cycle = this._repeat), this._reversed || this._hasPausedChild() || (r = !0, a = "onComplete", o = !!this._timeline.autoRemoveChildren, 0 === this._duration && (t <= 0 && -1e-7 <= t || g < 0 || g === S) && g !== t && this._first && (o = !0, S < g && (a = "onReverseComplete"))), this._rawPrevTime = this._duration || !e || t || this._rawPrevTime === t ? t : S, this._yoyo && 0 != (1 & this._cycle) ? this._time = t = 0 : t = (this._time = f) + 1e-4;
            else if (t < 1e-7)
                if (this._locked || (this._totalTime = this._cycle = 0), ((this._time = 0) !== _ || 0 === f && g !== S && (0 < g || t < 0 && 0 <= g) && !this._locked) && (a = "onReverseComplete", r = this._reversed), t < 0) this._active = !1, this._timeline.autoRemoveChildren && this._reversed ? (o = r = !0, a = "onReverseComplete") : 0 <= g && this._first && (o = !0), this._rawPrevTime = t;
                else {
                    if (this._rawPrevTime = f || !e || t || this._rawPrevTime === t ? t : S, 0 === t && r)
                        for (s = this._first; s && 0 === s._startTime;) s._duration || (r = !1), s = s._next;
                    t = 0, this._initted || (o = !0)
                }
            else if (0 === f && g < 0 && (o = !0), this._time = this._rawPrevTime = t, this._locked || (this._totalTime = t, 0 !== this._repeat && (l = f + this._repeatDelay, this._cycle = this._totalTime / l >> 0, 0 !== this._cycle && this._cycle === this._totalTime / l && p <= t && this._cycle-- , this._time = this._totalTime - this._cycle * l, this._yoyo && 0 != (1 & this._cycle) && (this._time = f - this._time), this._time > f ? t = (this._time = f) + 1e-4 : this._time < 0 ? this._time = t = 0 : t = this._time)), this._hasPause && !this._forcingPlayhead && !e) {
                if (_ <= (t = this._time))
                    for (s = this._first; s && s._startTime <= t && !h;) s._duration || "isPause" !== s.data || s.ratio || 0 === s._startTime && 0 === this._rawPrevTime || (h = s), s = s._next;
                else
                    for (s = this._last; s && s._startTime >= t && !h;) s._duration || "isPause" === s.data && 0 < s._rawPrevTime && (h = s), s = s._prev;
                h && (this._time = t = h._startTime, this._totalTime = t + this._cycle * (this._totalDuration + this._repeatDelay))
            }
            if (this._cycle !== y && !this._locked) {
                var b = this._yoyo && 0 != (1 & y),
                    w = b === (this._yoyo && 0 != (1 & this._cycle)),
                    x = this._totalTime,
                    T = this._cycle,
                    k = this._rawPrevTime,
                    P = this._time;
                if (this._totalTime = y * f, this._cycle < y ? b = !b : this._totalTime += f, this._time = _, this._rawPrevTime = 0 === f ? g - 1e-4 : g, this._cycle = y, this._locked = !0, _ = b ? 0 : f, this.render(_, e, 0 === f), e || this._gc || this.vars.onRepeat && this._callback("onRepeat"), _ !== this._time) return;
                if (w && (_ = b ? f + 1e-4 : -1e-4, this.render(_, !0, !1)), this._locked = !1, this._paused && !v) return;
                this._time = P, this._totalTime = x, this._cycle = T, this._rawPrevTime = k
            }
            if (this._time !== _ && this._first || i || o || h) {
                if (this._initted || (this._initted = !0), this._active || !this._paused && this._totalTime !== p && 0 < t && (this._active = !0), 0 === p && this.vars.onStart && 0 !== this._totalTime && (e || this._callback("onStart")), _ <= (u = this._time))
                    for (s = this._first; s && (n = s._next, u === this._time && (!this._paused || v));)(s._active || s._startTime <= this._time && !s._paused && !s._gc) && (h === s && this.pause(), s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)), s = n;
                else
                    for (s = this._last; s && (n = s._prev, u === this._time && (!this._paused || v));) {
                        if (s._active || s._startTime <= _ && !s._paused && !s._gc) {
                            if (h === s) {
                                for (h = s._prev; h && h.endTime() > this._time;) h.render(h._reversed ? h.totalDuration() - (t - h._startTime) * h._timeScale : (t - h._startTime) * h._timeScale, e, i), h = h._prev;
                                h = null, this.pause()
                            }
                            s._reversed ? s.render((s._dirty ? s.totalDuration() : s._totalDuration) - (t - s._startTime) * s._timeScale, e, i) : s.render((t - s._startTime) * s._timeScale, e, i)
                        }
                        s = n
                    }
                this._onUpdate && (e || (D.length && O(), this._callback("onUpdate"))), a && (this._locked || this._gc || (d === this._startTime || m !== this._timeScale) && (0 === this._time || c >= this.totalDuration()) && (r && (D.length && O(), this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[a] && this._callback(a)))
            } else p !== this._totalTime && this._onUpdate && (e || this._callback("onUpdate"))
        }, r.getActive = function (t, e, i) {
            null == t && (t = !0), null == e && (e = !0), null == i && (i = !1);
            var s, r, n = [],
                a = this.getChildren(t, e, i),
                o = 0,
                l = a.length;
            for (s = 0; s < l; s++)(r = a[s]).isActive() && (n[o++] = r);
            return n
        }, r.getLabelAfter = function (t) {
            t || 0 !== t && (t = this._time);
            var e, i = this.getLabelsArray(),
                s = i.length;
            for (e = 0; e < s; e++)
                if (i[e].time > t) return i[e].name;
            return null
        }, r.getLabelBefore = function (t) {
            null == t && (t = this._time);
            for (var e = this.getLabelsArray(), i = e.length; - 1 < --i;)
                if (e[i].time < t) return e[i].name;
            return null
        }, r.getLabelsArray = function () {
            var t, e = [],
                i = 0;
            for (t in this._labels) e[i++] = {
                time: this._labels[t],
                name: t
            };
            return e.sort(function (t, e) {
                return t.time - e.time
            }), e
        }, r.progress = function (t, e) {
            return arguments.length ? this.totalTime(this.duration() * (this._yoyo && 0 != (1 & this._cycle) ? 1 - t : t) + this._cycle * (this._duration + this._repeatDelay), e) : this._time / this.duration()
        }, r.totalProgress = function (t, e) {
            return arguments.length ? this.totalTime(this.totalDuration() * t, e) : this._totalTime / this.totalDuration()
        }, r.totalDuration = function (t) {
            return arguments.length ? -1 !== this._repeat && t ? this.timeScale(this.totalDuration() / t) : this : (this._dirty && (e.prototype.totalDuration.call(this), this._totalDuration = -1 === this._repeat ? 999999999999 : this._duration * (this._repeat + 1) + this._repeatDelay * this._repeat), this._totalDuration)
        }, r.time = function (t, e) {
            return arguments.length ? (this._dirty && this.totalDuration(), t > this._duration && (t = this._duration), this._yoyo && 0 != (1 & this._cycle) ? t = this._duration - t + this._cycle * (this._duration + this._repeatDelay) : 0 !== this._repeat && (t += this._cycle * (this._duration + this._repeatDelay)), this.totalTime(t, e)) : this._time
        }, r.repeat = function (t) {
            return arguments.length ? (this._repeat = t, this._uncache(!0)) : this._repeat
        }, r.repeatDelay = function (t) {
            return arguments.length ? (this._repeatDelay = t, this._uncache(!0)) : this._repeatDelay
        }, r.yoyo = function (t) {
            return arguments.length ? (this._yoyo = t, this) : this._yoyo
        }, r.currentLabel = function (t) {
            return arguments.length ? this.seek(t, !0) : this.getLabelBefore(this._time + 1e-8)
        }, i
    }, !0), T = 180 / Math.PI, w = [], x = [], k = [], g = {}, i = _gsScope._gsDefine.globals, v = function (t, e, i, s) {
        this.a = t, this.b = e, this.c = i, this.d = s, this.da = s - t, this.ca = i - t, this.ba = e - t
    }, P = function (t, e, i, s) {
        var r = {
            a: t
        },
            n = {},
            a = {},
            o = {
                c: s
            },
            l = (t + e) / 2,
            h = (e + i) / 2,
            u = (i + s) / 2,
            c = (l + h) / 2,
            f = (h + u) / 2,
            _ = (f - c) / 8;
        return r.b = l + (t - l) / 4, n.b = c + _, r.c = n.a = (r.b + n.b) / 2, n.c = a.a = (c + f) / 2, a.b = f - _, o.b = u + (s - u) / 4, a.c = o.a = (a.b + o.b) / 2, [r, n, a, o]
    }, y = function (t, e, i, s, r) {
        var n, a, o, l, h, u, c, f, _, p, d, m, g, v = t.length - 1,
            y = 0,
            b = t[0].a;
        for (n = 0; n < v; n++) a = (h = t[y]).a, o = h.d, l = t[y + 1].d, f = r ? (d = w[n], g = ((m = x[n]) + d) * e * .25 / (s ? .5 : k[n] || .5), o - ((u = o - (o - a) * (s ? .5 * e : 0 !== d ? g / d : 0)) + (((c = o + (l - o) * (s ? .5 * e : 0 !== m ? g / m : 0)) - u) * (3 * d / (d + m) + .5) / 4 || 0))) : o - ((u = o - (o - a) * e * .5) + (c = o + (l - o) * e * .5)) / 2, u += f, c += f, h.c = _ = u, h.b = 0 !== n ? b : b = h.a + .6 * (h.c - h.a), h.da = o - a, h.ca = _ - a, h.ba = b - a, i ? (p = P(a, b, _, o), t.splice(y, 1, p[0], p[1], p[2], p[3]), y += 4) : y++ , b = c;
        (h = t[y]).b = b, h.c = b + .4 * (h.d - b), h.da = h.d - h.a, h.ca = h.c - h.a, h.ba = b - h.a, i && (p = P(h.a, b, h.c, h.d), t.splice(y, 1, p[0], p[1], p[2], p[3]))
    }, b = function (t, e, i, s) {
        var r, n, a, o, l, h, u = [];
        if (s)
            for (n = (t = [s].concat(t)).length; - 1 < --n;) "string" == typeof (h = t[n][e]) && "=" === h.charAt(1) && (t[n][e] = s[e] + Number(h.charAt(0) + h.substr(2)));
        if ((r = t.length - 2) < 0) return u[0] = new v(t[0][e], 0, 0, t[r < -1 ? 0 : 1][e]), u;
        for (n = 0; n < r; n++) a = t[n][e], o = t[n + 1][e], u[n] = new v(a, 0, 0, o), i && (l = t[n + 2][e], w[n] = (w[n] || 0) + (o - a) * (o - a), x[n] = (x[n] || 0) + (l - o) * (l - o));
        return u[n] = new v(t[n][e], 0, 0, t[n + 1][e]), u
    }, _ = function (t, e, i, s, r, n) {
        var a, o, l, h, u, c, f, _, p = {},
            d = [],
            m = n || t[0];
        for (o in r = "string" == typeof r ? "," + r + "," : ",x,y,z,left,top,right,bottom,marginTop,marginLeft,marginRight,marginBottom,paddingLeft,paddingTop,paddingRight,paddingBottom,backgroundPosition,backgroundPosition_y,", null == e && (e = 1), t[0]) d.push(o);
        if (1 < t.length) {
            for (_ = t[t.length - 1], f = !0, a = d.length; - 1 < --a;)
                if (o = d[a], .05 < Math.abs(m[o] - _[o])) {
                    f = !1;
                    break
                } f && (t = t.concat(), n && t.unshift(n), t.push(t[1]), n = t[t.length - 3])
        }
        for (w.length = x.length = k.length = 0, a = d.length; - 1 < --a;) o = d[a], g[o] = -1 !== r.indexOf("," + o + ","), p[o] = b(t, o, g[o], n);
        for (a = w.length; - 1 < --a;) w[a] = Math.sqrt(w[a]), x[a] = Math.sqrt(x[a]);
        if (!s) {
            for (a = d.length; - 1 < --a;)
                if (g[o])
                    for (c = (l = p[d[a]]).length - 1, h = 0; h < c; h++) u = l[h + 1].da / x[h] + l[h].da / w[h] || 0, k[h] = (k[h] || 0) + u * u;
            for (a = k.length; - 1 < --a;) k[a] = Math.sqrt(k[a])
        }
        for (a = d.length, h = i ? 4 : 1; - 1 < --a;) l = p[o = d[a]], y(l, e, i, s, g[o]), f && (l.splice(0, h), l.splice(l.length - h, h));
        return p
    }, p = function (t, e, i) {
        for (var s, r, n, a, o, l, h, u, c, f, _, p = 1 / i, d = t.length; - 1 < --d;)
            for (n = (f = t[d]).a, a = f.d - n, o = f.c - n, l = f.b - n, s = r = 0, u = 1; u <= i; u++) s = r - (r = ((h = p * u) * h * a + 3 * (c = 1 - h) * (h * o + c * l)) * h), e[_ = d * i + u - 1] = (e[_] || 0) + s * s
    }, m = _gsScope._gsDefine.plugin({
        propName: "bezier",
        priority: -1,
        version: "1.3.5",
        API: 2,
        global: !0,
        init: function (t, e, i) {
            this._target = t, e instanceof Array && (e = {
                values: e
            }), this._func = {}, this._round = {}, this._props = [], this._timeRes = null == e.timeResolution ? 6 : parseInt(e.timeResolution, 10);
            var s, r, n, a, o, l = e.values || [],
                h = {},
                u = l[0],
                c = e.autoRotate || i.vars.orientToBezier;
            for (s in this._autoRotate = c ? c instanceof Array ? c : [
                ["x", "y", "rotation", !0 === c ? 0 : Number(c) || 0]
            ] : null, u) this._props.push(s);
            for (n = this._props.length; - 1 < --n;) s = this._props[n], this._overwriteProps.push(s), r = this._func[s] = "function" == typeof t[s], h[s] = r ? t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]() : parseFloat(t[s]), o || h[s] !== l[0][s] && (o = h);
            if (this._beziers = "cubic" !== e.type && "quadratic" !== e.type && "soft" !== e.type ? _(l, isNaN(e.curviness) ? 1 : e.curviness, !1, "thruBasic" === e.type, e.correlate, o) : function (t, e, i) {
                var s, r, n, a, o, l, h, u, c, f, _, p = {},
                    d = "cubic" === (e = e || "soft") ? 3 : 2,
                    m = "soft" === e,
                    g = [];
                if (m && i && (t = [i].concat(t)), null == t || t.length < d + 1) throw "invalid Bezier data";
                for (c in t[0]) g.push(c);
                for (l = g.length; - 1 < --l;) {
                    for (p[c = g[l]] = o = [], f = 0, u = t.length, h = 0; h < u; h++) s = null == i ? t[h][c] : "string" == typeof (_ = t[h][c]) && "=" === _.charAt(1) ? i[c] + Number(_.charAt(0) + _.substr(2)) : Number(_), m && 1 < h && h < u - 1 && (o[f++] = (s + o[f - 2]) / 2), o[f++] = s;
                    for (u = f - d + 1, h = f = 0; h < u; h += d) s = o[h], r = o[h + 1], n = o[h + 2], a = 2 === d ? 0 : o[h + 3], o[f++] = _ = 3 === d ? new v(s, r, n, a) : new v(s, (2 * r + s) / 3, (2 * r + n) / 3, n);
                    o.length = f
                }
                return p
            }(l, e.type, h), this._segCount = this._beziers[s].length, this._timeRes) {
                var f = function (t, e) {
                    var i, s, r, n, a = [],
                        o = [],
                        l = 0,
                        h = 0,
                        u = (e = e >> 0 || 6) - 1,
                        c = [],
                        f = [];
                    for (i in t) p(t[i], a, e);
                    for (r = a.length, s = 0; s < r; s++) l += Math.sqrt(a[s]), f[n = s % e] = l, n === u && (h += l, c[n = s / e >> 0] = f, o[n] = h, l = 0, f = []);
                    return {
                        length: h,
                        lengths: o,
                        segments: c
                    }
                }(this._beziers, this._timeRes);
                this._length = f.length, this._lengths = f.lengths, this._segments = f.segments, this._l1 = this._li = this._s1 = this._si = 0, this._l2 = this._lengths[0], this._curSeg = this._segments[0], this._s2 = this._curSeg[0], this._prec = 1 / this._curSeg.length
            }
            if (c = this._autoRotate)
                for (this._initialRotations = [], c[0] instanceof Array || (this._autoRotate = c = [c]), n = c.length; - 1 < --n;) {
                    for (a = 0; a < 3; a++) s = c[n][a], this._func[s] = "function" == typeof t[s] && t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)];
                    s = c[n][2], this._initialRotations[n] = (this._func[s] ? this._func[s].call(this._target) : this._target[s]) || 0
                }
            return this._startRatio = i.vars.runBackwards ? 1 : 0, !0
        },
        set: function (t) {
            var e, i, s, r, n, a, o, l, h, u, c = this._segCount,
                f = this._func,
                _ = this._target,
                p = t !== this._startRatio;
            if (this._timeRes) {
                if (h = this._lengths, u = this._curSeg, t *= this._length, s = this._li, t > this._l2 && s < c - 1) {
                    for (l = c - 1; s < l && (this._l2 = h[++s]) <= t;);
                    this._l1 = h[s - 1], this._li = s, this._curSeg = u = this._segments[s], this._s2 = u[this._s1 = this._si = 0]
                } else if (t < this._l1 && 0 < s) {
                    for (; 0 < s && (this._l1 = h[--s]) >= t;);
                    0 === s && t < this._l1 ? this._l1 = 0 : s++ , this._l2 = h[s], this._li = s, this._curSeg = u = this._segments[s], this._s1 = u[(this._si = u.length - 1) - 1] || 0, this._s2 = u[this._si]
                }
                if (e = s, t -= this._l1, s = this._si, t > this._s2 && s < u.length - 1) {
                    for (l = u.length - 1; s < l && (this._s2 = u[++s]) <= t;);
                    this._s1 = u[s - 1], this._si = s
                } else if (t < this._s1 && 0 < s) {
                    for (; 0 < s && (this._s1 = u[--s]) >= t;);
                    0 === s && t < this._s1 ? this._s1 = 0 : s++ , this._s2 = u[s], this._si = s
                }
                a = (s + (t - this._s1) / (this._s2 - this._s1)) * this._prec || 0
            } else a = (t - (e = t < 0 ? 0 : 1 <= t ? c - 1 : c * t >> 0) * (1 / c)) * c;
            for (i = 1 - a, s = this._props.length; - 1 < --s;) r = this._props[s], o = (a * a * (n = this._beziers[r][e]).da + 3 * i * (a * n.ca + i * n.ba)) * a + n.a, this._round[r] && (o = Math.round(o)), f[r] ? _[r](o) : _[r] = o;
            if (this._autoRotate) {
                var d, m, g, v, y, b, w, x = this._autoRotate;
                for (s = x.length; - 1 < --s;) r = x[s][2], b = x[s][3] || 0, w = !0 === x[s][4] ? 1 : T, n = this._beziers[x[s][0]], d = this._beziers[x[s][1]], n && d && (n = n[e], d = d[e], m = n.a + (n.b - n.a) * a, m += ((v = n.b + (n.c - n.b) * a) - m) * a, v += (n.c + (n.d - n.c) * a - v) * a, g = d.a + (d.b - d.a) * a, g += ((y = d.b + (d.c - d.b) * a) - g) * a, y += (d.c + (d.d - d.c) * a - y) * a, o = p ? Math.atan2(y - g, v - m) * w + b : this._initialRotations[s], f[r] ? _[r](o) : _[r] = o)
            }
        }
    }), s = m.prototype, m.bezierThrough = _, m.cubicToQuadratic = P, m._autoCSS = !0, m.quadraticToCubic = function (t, e, i) {
        return new v(t, (2 * e + t) / 3, (2 * e + i) / 3, i)
    }, m._cssRegister = function () {
        var t = i.CSSPlugin;
        if (t) {
            var e = t._internals,
                _ = e._parseToProxy,
                p = e._setPluginRatio,
                d = e.CSSPropTween;
            e._registerComplexSpecialProp("bezier", {
                parser: function (t, e, i, s, r, n) {
                    e instanceof Array && (e = {
                        values: e
                    }), n = new m;
                    var a, o, l, h = e.values,
                        u = h.length - 1,
                        c = [],
                        f = {};
                    if (u < 0) return r;
                    for (a = 0; a <= u; a++) l = _(t, h[a], s, r, n, u !== a), c[a] = l.end;
                    for (o in e) f[o] = e[o];
                    return f.values = c, (r = new d(t, "bezier", 0, 0, l.pt, 2)).data = l, r.plugin = n, r.setRatio = p, 0 === f.autoRotate && (f.autoRotate = !0), !f.autoRotate || f.autoRotate instanceof Array || (a = !0 === f.autoRotate ? 0 : Number(f.autoRotate), f.autoRotate = null != l.end.left ? [
                        ["left", "top", "rotation", a, !1]
                    ] : null != l.end.x && [
                        ["x", "y", "rotation", a, !1]
                    ]), f.autoRotate && (s._transform || s._enableTransforms(!1), l.autoRotate = s._target._gsTransform), n._onInitTween(l.proxy, f, s._tween), r
                }
            })
        }
    }, s._roundProps = function (t, e) {
        for (var i = this._overwriteProps, s = i.length; - 1 < --s;)(t[i[s]] || t.bezier || t.bezierThrough) && (this._round[i[s]] = e)
    }, s._kill = function (t) {
        var e, i, s = this._props;
        for (e in this._beziers)
            if (e in t)
                for (delete this._beziers[e], delete this._func[e], i = s.length; - 1 < --i;) s[i] === e && s.splice(i, 1);
        return this._super._kill.call(this, t)
    }, _gsScope._gsDefine("plugins.CSSPlugin", ["plugins.TweenPlugin", "TweenLite"], function (n, j) {
        var p, k, Y, _, B = function () {
            n.call(this, "css"), this._overwriteProps.length = 0, this.setRatio = B.prototype.setRatio
        },
            h = _gsScope._gsDefine.globals,
            d = {},
            t = B.prototype = new n("css");
        (t.constructor = B).version = "1.18.4", B.API = 2, B.defaultTransformPerspective = 0, B.defaultSkewType = "compensated", B.defaultSmoothOrigin = !0, t = "px", B.suffixMap = {
            top: t,
            right: t,
            bottom: t,
            left: t,
            width: t,
            height: t,
            fontSize: t,
            padding: t,
            margin: t,
            perspective: t,
            lineHeight: ""
        };
        var D, m, g, L, v, P, e, i, O = /(?:\-|\.|\b)(\d|\.|e\-)+/g,
            R = /(?:\d|\-\d|\.\d|\-\.\d|\+=\d|\-=\d|\+=.\d|\-=\.\d)+/g,
            y = /(?:\+=|\-=|\-|\b)[\d\-\.]+[a-zA-Z0-9]*(?:%|\b)/gi,
            u = /(?![+-]?\d*\.?\d+|[+-]|e[+-]\d+)[^0-9]/g,
            S = /(?:\d|\-|\+|=|#|\.)*/g,
            C = /opacity *= *([^)]*)/i,
            b = /opacity:([^;]*)/i,
            a = /alpha\(opacity *=.+?\)/i,
            w = /^(rgb|hsl)/,
            o = /([A-Z])/g,
            l = /-([a-z])/gi,
            x = /(^(?:url\(\"|url\())|(?:(\"\))$|\)$)/gi,
            c = function (t, e) {
                return e.toUpperCase()
            },
            f = /(?:Left|Right|Width)/i,
            T = /(M11|M12|M21|M22)=[\d\-\.e]+/gi,
            M = /progid\:DXImageTransform\.Microsoft\.Matrix\(.+?\)/i,
            A = /,(?=[^\)]*(?:\(|$))/gi,
            N = /[\s,\(]/i,
            X = Math.PI / 180,
            q = 180 / Math.PI,
            z = {},
            I = document,
            s = function (t) {
                return I.createElementNS ? I.createElementNS("http://www.w3.org/1999/xhtml", t) : I.createElement(t)
            },
            E = s("div"),
            F = s("img"),
            r = B._internals = {
                _specialProps: d
            },
            W = navigator.userAgent,
            V = (e = W.indexOf("Android"), i = s("a"), g = -1 !== W.indexOf("Safari") && -1 === W.indexOf("Chrome") && (-1 === e || 3 < Number(W.substr(e + 8, 1))), v = g && Number(W.substr(W.indexOf("Version/") + 8, 1)) < 6, L = -1 !== W.indexOf("Firefox"), (/MSIE ([0-9]{1,}[\.0-9]{0,})/.exec(W) || /Trident\/.*rv:([0-9]{1,}[\.0-9]{0,})/.exec(W)) && (P = parseFloat(RegExp.$1)), !!i && (i.style.cssText = "top:1px;opacity:.55;", /^0.55/.test(i.style.opacity))),
            U = function (t) {
                return C.test("string" == typeof t ? t : (t.currentStyle ? t.currentStyle.filter : t.style.filter) || "") ? parseFloat(RegExp.$1) / 100 : 1
            },
            H = function (t) {
                window.console && console.log(t)
            },
            Z = "",
            $ = "",
            G = function (t, e) {
                var i, s, r = (e = e || E).style;
                if (void 0 !== r[t]) return t;
                for (t = t.charAt(0).toUpperCase() + t.substr(1), i = ["O", "Moz", "ms", "Ms", "Webkit"], s = 5; - 1 < --s && void 0 === r[i[s] + t];);
                return 0 <= s ? (Z = "-" + ($ = 3 === s ? "ms" : i[s]).toLowerCase() + "-", $ + t) : null
            },
            Q = I.defaultView ? I.defaultView.getComputedStyle : function () { },
            J = B.getStyle = function (t, e, i, s, r) {
                var n;
                return V || "opacity" !== e ? (!s && t.style[e] ? n = t.style[e] : (i = i || Q(t)) ? n = i[e] || i.getPropertyValue(e) || i.getPropertyValue(e.replace(o, "-$1").toLowerCase()) : t.currentStyle && (n = t.currentStyle[e]), null == r || n && "none" !== n && "auto" !== n && "auto auto" !== n ? n : r) : U(t)
            },
            K = r.convertToPixels = function (t, e, i, s, r) {
                if ("px" === s || !s) return i;
                if ("auto" === s || !i) return 0;
                var n, a, o, l = f.test(e),
                    h = t,
                    u = E.style,
                    c = i < 0;
                if (c && (i = -i), "%" === s && -1 !== e.indexOf("border")) n = i / 100 * (l ? t.clientWidth : t.clientHeight);
                else {
                    if (u.cssText = "border:0 solid red;position:" + J(t, "position") + ";line-height:0;", "%" !== s && h.appendChild && "v" !== s.charAt(0) && "rem" !== s) u[l ? "borderLeftWidth" : "borderTopWidth"] = i + s;
                    else {
                        if (a = (h = t.parentNode || I.body)._gsCache, o = j.ticker.frame, a && l && a.time === o) return a.width * i / 100;
                        u[l ? "width" : "height"] = i + s
                    }
                    h.appendChild(E), n = parseFloat(E[l ? "offsetWidth" : "offsetHeight"]), h.removeChild(E), l && "%" === s && !1 !== B.cacheWidths && ((a = h._gsCache = h._gsCache || {}).time = o, a.width = n / i * 100), 0 !== n || r || (n = K(t, e, i, s, !0))
                }
                return c ? -n : n
            },
            tt = r.calculateOffset = function (t, e, i) {
                if ("absolute" !== J(t, "position", i)) return 0;
                var s = "left" === e ? "Left" : "Top",
                    r = J(t, "margin" + s, i);
                return t["offset" + s] - (K(t, e, parseFloat(r), r.replace(S, "")) || 0)
            },
            et = function (t, e) {
                var i, s, r, n = {};
                if (e = e || Q(t, null))
                    if (i = e.length)
                        for (; - 1 < --i;)(-1 === (r = e[i]).indexOf("-transform") || At === r) && (n[r.replace(l, c)] = e.getPropertyValue(r));
                    else
                        for (i in e) (-1 === i.indexOf("Transform") || Mt === i) && (n[i] = e[i]);
                else if (e = t.currentStyle || t.style)
                    for (i in e) "string" == typeof i && void 0 === n[i] && (n[i.replace(l, c)] = e[i]);
                return V || (n.opacity = U(t)), s = Wt(t, e, !1), n.rotation = s.rotation, n.skewX = s.skewX, n.scaleX = s.scaleX, n.scaleY = s.scaleY, n.x = s.x, n.y = s.y, zt && (n.z = s.z, n.rotationX = s.rotationX, n.rotationY = s.rotationY, n.scaleZ = s.scaleZ), n.filters && delete n.filters, n
            },
            it = function (t, e, i, s, r) {
                var n, a, o, l = {},
                    h = t.style;
                for (a in i) "cssText" !== a && "length" !== a && isNaN(a) && (e[a] !== (n = i[a]) || r && r[a]) && -1 === a.indexOf("Origin") && ("number" == typeof n || "string" == typeof n) && (l[a] = "auto" !== n || "left" !== a && "top" !== a ? "" !== n && "auto" !== n && "none" !== n || "string" != typeof e[a] || "" === e[a].replace(u, "") ? n : 0 : tt(t, a), void 0 !== h[a] && (o = new gt(h, a, h[a], o)));
                if (s)
                    for (a in s) "className" !== a && (l[a] = s[a]);
                return {
                    difs: l,
                    firstMPT: o
                }
            },
            st = {
                width: ["Left", "Right"],
                height: ["Top", "Bottom"]
            },
            rt = ["marginLeft", "marginRight", "marginTop", "marginBottom"],
            nt = function (t, e, i) {
                if ("svg" === (t.nodeName + "").toLowerCase()) return (i || Q(t))[e] || 0;
                if (t.getBBox && Yt(t)) return t.getBBox()[e] || 0;
                var s = parseFloat("width" === e ? t.offsetWidth : t.offsetHeight),
                    r = st[e],
                    n = r.length;
                for (i = i || Q(t, null); - 1 < --n;) s -= parseFloat(J(t, "padding" + r[n], i, !0)) || 0, s -= parseFloat(J(t, "border" + r[n] + "Width", i, !0)) || 0;
                return s
            },
            at = function (t, e) {
                if ("contain" === t || "auto" === t || "auto auto" === t) return t + " ";
                (null == t || "" === t) && (t = "0 0");
                var i, s = t.split(" "),
                    r = -1 !== t.indexOf("left") ? "0%" : -1 !== t.indexOf("right") ? "100%" : s[0],
                    n = -1 !== t.indexOf("top") ? "0%" : -1 !== t.indexOf("bottom") ? "100%" : s[1];
                if (3 < s.length && !e) {
                    for (s = t.split(", ").join(",").split(","), t = [], i = 0; i < s.length; i++) t.push(at(s[i]));
                    return t.join(",")
                }
                return null == n ? n = "center" === r ? "50%" : "0" : "center" === n && (n = "50%"), ("center" === r || isNaN(parseFloat(r)) && -1 === (r + "").indexOf("=")) && (r = "50%"), t = r + " " + n + (2 < s.length ? " " + s[2] : ""), e && (e.oxp = -1 !== r.indexOf("%"), e.oyp = -1 !== n.indexOf("%"), e.oxr = "=" === r.charAt(1), e.oyr = "=" === n.charAt(1), e.ox = parseFloat(r.replace(u, "")), e.oy = parseFloat(n.replace(u, "")), e.v = t), e || t
            },
            ot = function (t, e) {
                return "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) : parseFloat(t) - parseFloat(e) || 0
            },
            lt = function (t, e) {
                return null == t ? e : "string" == typeof t && "=" === t.charAt(1) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(t.substr(2)) + e : parseFloat(t) || 0
            },
            ht = function (t, e, i, s) {
                var r, n, a, o, l;
                return (o = null == t ? e : "number" == typeof t ? t : (r = 360, n = t.split("_"), a = ((l = "=" === t.charAt(1)) ? parseInt(t.charAt(0) + "1", 10) * parseFloat(n[0].substr(2)) : parseFloat(n[0])) * (-1 === t.indexOf("rad") ? 1 : q) - (l ? 0 : e), n.length && (s && (s[i] = e + a), -1 !== t.indexOf("short") && ((a %= r) !== a % 180 && (a = a < 0 ? a + r : a - r)), -1 !== t.indexOf("_cw") && a < 0 ? a = (a + 3599999999640) % r - (a / r | 0) * r : -1 !== t.indexOf("ccw") && 0 < a && (a = (a - 3599999999640) % r - (a / r | 0) * r)), e + a)) < 1e-6 && -1e-6 < o && (o = 0), o
            },
            ut = {
                aqua: [0, 255, 255],
                lime: [0, 255, 0],
                silver: [192, 192, 192],
                black: [0, 0, 0],
                maroon: [128, 0, 0],
                teal: [0, 128, 128],
                blue: [0, 0, 255],
                navy: [0, 0, 128],
                white: [255, 255, 255],
                fuchsia: [255, 0, 255],
                olive: [128, 128, 0],
                yellow: [255, 255, 0],
                orange: [255, 165, 0],
                gray: [128, 128, 128],
                purple: [128, 0, 128],
                green: [0, 128, 0],
                red: [255, 0, 0],
                pink: [255, 192, 203],
                cyan: [0, 255, 255],
                transparent: [255, 255, 255, 0]
            },
            ct = function (t, e, i) {
                return 255 * (6 * (t = t < 0 ? t + 1 : 1 < t ? t - 1 : t) < 1 ? e + (i - e) * t * 6 : t < .5 ? i : 3 * t < 2 ? e + (i - e) * (2 / 3 - t) * 6 : e) + .5 | 0
            },
            ft = B.parseColor = function (t, e) {
                var i, s, r, n, a, o, l, h, u, c, f;
                if (t)
                    if ("number" == typeof t) i = [t >> 16, t >> 8 & 255, 255 & t];
                    else {
                        if ("," === t.charAt(t.length - 1) && (t = t.substr(0, t.length - 1)), ut[t]) i = ut[t];
                        else if ("#" === t.charAt(0)) 4 === t.length && (t = "#" + (s = t.charAt(1)) + s + (r = t.charAt(2)) + r + (n = t.charAt(3)) + n), i = [(t = parseInt(t.substr(1), 16)) >> 16, t >> 8 & 255, 255 & t];
                        else if ("hsl" === t.substr(0, 3))
                            if (i = f = t.match(O), e) {
                                if (-1 !== t.indexOf("=")) return t.match(R)
                            } else a = Number(i[0]) % 360 / 360, o = Number(i[1]) / 100, s = 2 * (l = Number(i[2]) / 100) - (r = l <= .5 ? l * (o + 1) : l + o - l * o), 3 < i.length && (i[3] = Number(t[3])), i[0] = ct(a + 1 / 3, s, r), i[1] = ct(a, s, r), i[2] = ct(a - 1 / 3, s, r);
                        else i = t.match(O) || ut.transparent;
                        i[0] = Number(i[0]), i[1] = Number(i[1]), i[2] = Number(i[2]), 3 < i.length && (i[3] = Number(i[3]))
                    }
                else i = ut.black;
                return e && !f && (s = i[0] / 255, r = i[1] / 255, n = i[2] / 255, l = ((h = Math.max(s, r, n)) + (u = Math.min(s, r, n))) / 2, h === u ? a = o = 0 : (c = h - u, o = .5 < l ? c / (2 - h - u) : c / (h + u), a = h === s ? (r - n) / c + (r < n ? 6 : 0) : h === r ? (n - s) / c + 2 : (s - r) / c + 4, a *= 60), i[0] = a + .5 | 0, i[1] = 100 * o + .5 | 0, i[2] = 100 * l + .5 | 0), i
            },
            _t = function (t, e) {
                var i, s, r, n = t.match(pt) || [],
                    a = 0,
                    o = n.length ? "" : t;
                for (i = 0; i < n.length; i++) s = n[i], a += (r = t.substr(a, t.indexOf(s, a) - a)).length + s.length, 3 === (s = ft(s, e)).length && s.push(1), o += r + (e ? "hsla(" + s[0] + "," + s[1] + "%," + s[2] + "%," + s[3] : "rgba(" + s.join(",")) + ")";
                return o + t.substr(a)
            },
            pt = "(?:\\b(?:(?:rgb|rgba|hsl|hsla)\\(.+?\\))|\\B#(?:[0-9a-f]{3}){1,2}\\b";
        for (t in ut) pt += "|" + t + "\\b";
        pt = new RegExp(pt + ")", "gi"), B.colorStringFilter = function (t) {
            var e, i = t[0] + t[1];
            pt.test(i) && (e = -1 !== i.indexOf("hsl(") || -1 !== i.indexOf("hsla("), t[0] = _t(t[0], e), t[1] = _t(t[1], e)), pt.lastIndex = 0
        }, j.defaultStringFilter || (j.defaultStringFilter = B.colorStringFilter);
        var dt = function (t, e, n, a) {
            if (null == t) return function (t) {
                return t
            };
            var o, l = e ? (t.match(pt) || [""])[0] : "",
                h = t.split(l).join("").match(y) || [],
                u = t.substr(0, t.indexOf(h[0])),
                c = ")" === t.charAt(t.length - 1) ? ")" : "",
                f = -1 !== t.indexOf(" ") ? " " : ",",
                _ = h.length,
                p = 0 < _ ? h[0].replace(O, "") : "";
            return _ ? o = e ? function (t) {
                var e, i, s, r;
                if ("number" == typeof t) t += p;
                else if (a && A.test(t)) {
                    for (r = t.replace(A, "|").split("|"), s = 0; s < r.length; s++) r[s] = o(r[s]);
                    return r.join(",")
                }
                if (e = (t.match(pt) || [l])[0], s = (i = t.split(e).join("").match(y) || []).length, _ > s--)
                    for (; ++s < _;) i[s] = n ? i[(s - 1) / 2 | 0] : h[s];
                return u + i.join(f) + f + e + c + (-1 !== t.indexOf("inset") ? " inset" : "")
            } : function (t) {
                var e, i, s;
                if ("number" == typeof t) t += p;
                else if (a && A.test(t)) {
                    for (i = t.replace(A, "|").split("|"), s = 0; s < i.length; s++) i[s] = o(i[s]);
                    return i.join(",")
                }
                if (s = (e = t.match(y) || []).length, _ > s--)
                    for (; ++s < _;) e[s] = n ? e[(s - 1) / 2 | 0] : h[s];
                return u + e.join(f) + c
            } : function (t) {
                return t
            }
        },
            mt = function (h) {
                return h = h.split(","),
                    function (t, e, i, s, r, n, a) {
                        var o, l = (e + "").split(" ");
                        for (a = {}, o = 0; o < 4; o++) a[h[o]] = l[o] = l[o] || l[(o - 1) / 2 >> 0];
                        return s.parse(t, a, r, n)
                    }
            },
            gt = (r._setPluginRatio = function (t) {
                this.plugin.setRatio(t);
                for (var e, i, s, r, n, a = this.data, o = a.proxy, l = a.firstMPT; l;) e = o[l.v], l.r ? e = Math.round(e) : e < 1e-6 && -1e-6 < e && (e = 0), l.t[l.p] = e, l = l._next;
                if (a.autoRotate && (a.autoRotate.rotation = o.rotation), 1 === t || 0 === t)
                    for (l = a.firstMPT, n = 1 === t ? "e" : "b"; l;) {
                        if ((i = l.t).type) {
                            if (1 === i.type) {
                                for (r = i.xs0 + i.s + i.xs1, s = 1; s < i.l; s++) r += i["xn" + s] + i["xs" + (s + 1)];
                                i[n] = r
                            }
                        } else i[n] = i.s + i.xs0;
                        l = l._next
                    }
            }, function (t, e, i, s, r) {
                this.t = t, this.p = e, this.v = i, this.r = r, s && ((s._prev = this)._next = s)
            }),
            vt = (r._parseToProxy = function (t, e, i, s, r, n) {
                var a, o, l, h, u, c = s,
                    f = {},
                    _ = {},
                    p = i._transform,
                    d = z;
                for (i._transform = null, z = e, s = u = i.parse(t, e, s, r), z = d, n && (i._transform = p, c && (c._prev = null, c._prev && (c._prev._next = null))); s && s !== c;) {
                    if (s.type <= 1 && (_[o = s.p] = s.s + s.c, f[o] = s.s, n || (h = new gt(s, "s", o, h, s.r), s.c = 0), 1 === s.type))
                        for (a = s.l; 0 < --a;) l = "xn" + a, _[o = s.p + "_" + l] = s.data[l], f[o] = s[l], n || (h = new gt(s, l, o, h, s.rxp[l]));
                    s = s._next
                }
                return {
                    proxy: f,
                    end: _,
                    firstMPT: h,
                    pt: u
                }
            }, r.CSSPropTween = function (t, e, i, s, r, n, a, o, l, h, u) {
                this.t = t, this.p = e, this.s = i, this.c = s, this.n = a || e, t instanceof vt || _.push(this.n), this.r = o, this.type = n || 0, l && (this.pr = l, p = !0), this.b = void 0 === h ? i : h, this.e = void 0 === u ? i + s : u, r && ((this._next = r)._prev = this)
            }),
            yt = function (t, e, i, s, r, n) {
                var a = new vt(t, e, i, s - i, r, -1, n);
                return a.b = i, a.e = a.xs0 = s, a
            },
            bt = B.parseComplex = function (t, e, i, s, r, n, a, o, l, h) {
                a = new vt(t, e, 0, 0, a, h ? 2 : 1, null, !1, o, i = i || n || "", s), s += "", r && pt.test(s + i) && (s = [i, s], B.colorStringFilter(s), i = s[0], s = s[1]);
                var u, c, f, _, p, d, m, g, v, y, b, w, x, T = i.split(", ").join(",").split(" "),
                    k = s.split(", ").join(",").split(" "),
                    P = T.length,
                    S = !1 !== D;
                for ((-1 !== s.indexOf(",") || -1 !== i.indexOf(",")) && (T = T.join(" ").replace(A, ", ").split(" "), k = k.join(" ").replace(A, ", ").split(" "), P = T.length), P !== k.length && (P = (T = (n || "").split(" ")).length), a.plugin = l, a.setRatio = h, u = pt.lastIndex = 0; u < P; u++)
                    if (_ = T[u], p = k[u], (g = parseFloat(_)) || 0 === g) a.appendXtra("", g, ot(p, g), p.replace(R, ""), S && -1 !== p.indexOf("px"), !0);
                    else if (r && pt.test(_)) w = ")" + ((w = p.indexOf(")") + 1) ? p.substr(w) : ""), x = -1 !== p.indexOf("hsl") && V, _ = ft(_, x), p = ft(p, x), (v = 6 < _.length + p.length) && !V && 0 === p[3] ? (a["xs" + a.l] += a.l ? " transparent" : "transparent", a.e = a.e.split(k[u]).join("transparent")) : (V || (v = !1), x ? a.appendXtra(v ? "hsla(" : "hsl(", _[0], ot(p[0], _[0]), ",", !1, !0).appendXtra("", _[1], ot(p[1], _[1]), "%,", !1).appendXtra("", _[2], ot(p[2], _[2]), v ? "%," : "%" + w, !1) : a.appendXtra(v ? "rgba(" : "rgb(", _[0], p[0] - _[0], ",", !0, !0).appendXtra("", _[1], p[1] - _[1], ",", !0).appendXtra("", _[2], p[2] - _[2], v ? "," : w, !0), v && (_ = _.length < 4 ? 1 : _[3], a.appendXtra("", _, (p.length < 4 ? 1 : p[3]) - _, w, !1))), pt.lastIndex = 0;
                    else if (d = _.match(O)) {
                        if (!(m = p.match(R)) || m.length !== d.length) return a;
                        for (c = f = 0; c < d.length; c++) b = d[c], y = _.indexOf(b, f), a.appendXtra(_.substr(f, y - f), Number(b), ot(m[c], b), "", S && "px" === _.substr(y + b.length, 2), 0 === c), f = y + b.length;
                        a["xs" + a.l] += _.substr(f)
                    } else a["xs" + a.l] += a.l || a["xs" + a.l] ? " " + p : p;
                if (-1 !== s.indexOf("=") && a.data) {
                    for (w = a.xs0 + a.data.s, u = 1; u < a.l; u++) w += a["xs" + u] + a.data["xn" + u];
                    a.e = w + a["xs" + u]
                }
                return a.l || (a.type = -1, a.xs0 = a.e), a.xfirst || a
            },
            wt = 9;
        for ((t = vt.prototype).l = t.pr = 0; 0 < --wt;) t["xn" + wt] = 0, t["xs" + wt] = "";
        t.xs0 = "", t._next = t._prev = t.xfirst = t.data = t.plugin = t.setRatio = t.rxp = null, t.appendXtra = function (t, e, i, s, r, n) {
            var a = this,
                o = a.l;
            return a["xs" + o] += n && (o || a["xs" + o]) ? " " + t : t || "", i || 0 === o || a.plugin ? (a.l++ , a.type = a.setRatio ? 2 : 1, a["xs" + a.l] = s || "", 0 < o ? (a.data["xn" + o] = e + i, a.rxp["xn" + o] = r, a["xn" + o] = e, a.plugin || (a.xfirst = new vt(a, "xn" + o, e, i, a.xfirst || a, 0, a.n, r, a.pr), a.xfirst.xs0 = 0)) : (a.data = {
                s: e + i
            }, a.rxp = {}, a.s = e, a.c = i, a.r = r)) : a["xs" + o] += e + (s || ""), a
        };
        var xt = function (t, e) {
            e = e || {}, this.p = e.prefix && G(t) || t, d[t] = d[this.p] = this, this.format = e.formatter || dt(e.defaultValue, e.color, e.collapsible, e.multi), e.parser && (this.parse = e.parser), this.clrs = e.color, this.multi = e.multi, this.keyword = e.keyword, this.dflt = e.defaultValue, this.pr = e.priority || 0
        },
            Tt = r._registerComplexSpecialProp = function (t, e, i) {
                "object" != typeof e && (e = {
                    parser: i
                });
                var s, r = t.split(","),
                    n = e.defaultValue;
                for (i = i || [n], s = 0; s < r.length; s++) e.prefix = 0 === s && e.prefix, e.defaultValue = i[s] || n, new xt(r[s], e)
            },
            kt = function (t) {
                if (!d[t]) {
                    var l = t.charAt(0).toUpperCase() + t.substr(1) + "Plugin";
                    Tt(t, {
                        parser: function (t, e, i, s, r, n, a) {
                            var o = h.com.greensock.plugins[l];
                            return o ? (o._cssRegister(), d[i].parse(t, e, i, s, r, n, a)) : (H("Error: " + l + " js file not loaded."), r)
                        }
                    })
                }
            };
        (t = xt.prototype).parseComplex = function (t, e, i, s, r, n) {
            var a, o, l, h, u, c, f = this.keyword;
            if (this.multi && (A.test(i) || A.test(e) ? (o = e.replace(A, "|").split("|"), l = i.replace(A, "|").split("|")) : f && (o = [e], l = [i])), l) {
                for (h = l.length > o.length ? l.length : o.length, a = 0; a < h; a++) e = o[a] = o[a] || this.dflt, i = l[a] = l[a] || this.dflt, f && ((u = e.indexOf(f)) !== (c = i.indexOf(f)) && (-1 === c ? o[a] = o[a].split(f).join("") : -1 === u && (o[a] += " " + f)));
                e = o.join(", "), i = l.join(", ")
            }
            return bt(t, this.p, e, i, this.clrs, this.dflt, s, this.pr, r, n)
        }, t.parse = function (t, e, i, s, r, n, a) {
            return this.parseComplex(t.style, this.format(J(t, this.p, Y, !1, this.dflt)), this.format(e), r, n)
        }, B.registerSpecialProp = function (t, l, h) {
            Tt(t, {
                parser: function (t, e, i, s, r, n, a) {
                    var o = new vt(t, i, 0, 0, r, 2, i, !1, h);
                    return o.plugin = n, o.setRatio = l(t, e, s._tween, i), o
                },
                priority: h
            })
        }, B.useSVGTransformAttr = g || L;
        var Pt, St, Dt, Ot, Rt, Ct = "scaleX,scaleY,scaleZ,x,y,z,skewX,skewY,rotation,rotationX,rotationY,perspective,xPercent,yPercent".split(","),
            Mt = G("transform"),
            At = Z + "transform",
            Nt = G("transformOrigin"),
            zt = null !== G("perspective"),
            It = r.Transform = function () {
                this.perspective = parseFloat(B.defaultTransformPerspective) || 0, this.force3D = !(!1 === B.defaultForce3D || !zt) && (B.defaultForce3D || "auto")
            },
            Et = window.SVGElement,
            Ft = function (t, e, i) {
                var s, r = I.createElementNS("http://www.w3.org/2000/svg", t),
                    n = /([a-z])([A-Z])/g;
                for (s in i) r.setAttributeNS(null, s.replace(n, "$1-$2").toLowerCase(), i[s]);
                return e.appendChild(r), r
            },
            Lt = I.documentElement,
            Xt = (Rt = P || /Android/i.test(W) && !window.chrome, I.createElementNS && !Rt && (St = Ft("svg", Lt), Ot = (Dt = Ft("rect", St, {
                width: 100,
                height: 50,
                x: 100
            })).getBoundingClientRect().width, Dt.style[Nt] = "50% 50%", Dt.style[Mt] = "scaleX(0.5)", Rt = Ot === Dt.getBoundingClientRect().width && !(L && zt), Lt.removeChild(St)), Rt),
            jt = function (t, e, i, s, r, n) {
                var a, o, l, h, u, c, f, _, p, d, m, g, v, y, b = t._gsTransform,
                    w = qt(t, !0);
                b && (v = b.xOrigin, y = b.yOrigin), (!s || (a = s.split(" ")).length < 2) && (f = t.getBBox(), a = [(-1 !== (e = at(e).split(" "))[0].indexOf("%") ? parseFloat(e[0]) / 100 * f.width : parseFloat(e[0])) + f.x, (-1 !== e[1].indexOf("%") ? parseFloat(e[1]) / 100 * f.height : parseFloat(e[1])) + f.y]), i.xOrigin = h = parseFloat(a[0]), i.yOrigin = u = parseFloat(a[1]), s && w !== Bt && (c = w[0], f = w[1], _ = w[2], p = w[3], d = w[4], o = h * (p / (g = c * p - f * _)) + u * (-_ / g) + (_ * (m = w[5]) - p * d) / g, l = h * (-f / g) + u * (c / g) - (c * m - f * d) / g, h = i.xOrigin = a[0] = o, u = i.yOrigin = a[1] = l), b && (n && (i.xOffset = b.xOffset, i.yOffset = b.yOffset, b = i), r || !1 !== r && !1 !== B.defaultSmoothOrigin ? (o = h - v, l = u - y, b.xOffset += o * w[0] + l * w[2] - o, b.yOffset += o * w[1] + l * w[3] - l) : b.xOffset = b.yOffset = 0), n || t.setAttribute("data-svg-origin", a.join(" "))
            },
            Yt = function (t) {
                return !!(Et && t.getBBox && t.getCTM && function (t) {
                    try {
                        return t.getBBox()
                    } catch (t) { }
                }(t) && (!t.parentNode || t.parentNode.getBBox && t.parentNode.getCTM))
            },
            Bt = [1, 0, 0, 1, 0, 0],
            qt = function (t, e) {
                var i, s, r, n, a, o = t._gsTransform || new It;
                if (Mt ? s = J(t, At, null, !0) : t.currentStyle && (s = (s = t.currentStyle.filter.match(T)) && 4 === s.length ? [s[0].substr(4), Number(s[2].substr(4)), Number(s[1].substr(4)), s[3].substr(4), o.x || 0, o.y || 0].join(",") : ""), i = !s || "none" === s || "matrix(1, 0, 0, 1, 0, 0)" === s, (o.svg || t.getBBox && Yt(t)) && (i && -1 !== (t.style[Mt] + "").indexOf("matrix") && (s = t.style[Mt], i = 0), r = t.getAttribute("transform"), i && r && (-1 !== r.indexOf("matrix") ? (s = r, i = 0) : -1 !== r.indexOf("translate") && (s = "matrix(1,0,0,1," + r.match(/(?:\-|\b)[\d\-\.e]+\b/gi).join(",") + ")", i = 0))), i) return Bt;
                for (r = (s || "").match(O) || [], wt = r.length; - 1 < --wt;) n = Number(r[wt]), r[wt] = (a = n - (n |= 0)) ? (1e5 * a + (a < 0 ? -.5 : .5) | 0) / 1e5 + n : n;
                return e && 6 < r.length ? [r[0], r[1], r[4], r[5], r[12], r[13]] : r
            },
            Wt = r.getTransform = function (t, e, i, s) {
                if (t._gsTransform && i && !s) return t._gsTransform;
                var r, n, a, o, l, h, u = i && t._gsTransform || new It,
                    c = u.scaleX < 0,
                    f = zt && (parseFloat(J(t, Nt, e, !1, "0 0 0").split(" ")[2]) || u.zOrigin) || 0,
                    _ = parseFloat(B.defaultTransformPerspective) || 0;
                if (u.svg = !(!t.getBBox || !Yt(t)), u.svg && (jt(t, J(t, Nt, Y, !1, "50% 50%") + "", u, t.getAttribute("data-svg-origin")), Pt = B.useSVGTransformAttr || Xt), (r = qt(t)) !== Bt) {
                    if (16 === r.length) {
                        var p, d, m, g, v, y = r[0],
                            b = r[1],
                            w = r[2],
                            x = r[3],
                            T = r[4],
                            k = r[5],
                            P = r[6],
                            S = r[7],
                            D = r[8],
                            O = r[9],
                            R = r[10],
                            C = r[12],
                            M = r[13],
                            A = r[14],
                            N = r[11],
                            z = Math.atan2(P, R);
                        u.zOrigin && (C = D * (A = -u.zOrigin) - r[12], M = O * A - r[13], A = R * A + u.zOrigin - r[14]), u.rotationX = z * q, z && (p = T * (g = Math.cos(-z)) + D * (v = Math.sin(-z)), d = k * g + O * v, m = P * g + R * v, D = T * -v + D * g, O = k * -v + O * g, R = P * -v + R * g, N = S * -v + N * g, T = p, k = d, P = m), z = Math.atan2(-w, R), u.rotationY = z * q, z && (d = b * (g = Math.cos(-z)) - O * (v = Math.sin(-z)), m = w * g - R * v, O = b * v + O * g, R = w * v + R * g, N = x * v + N * g, y = p = y * g - D * v, b = d, w = m), z = Math.atan2(b, y), u.rotation = z * q, z && (y = y * (g = Math.cos(-z)) + T * (v = Math.sin(-z)), d = b * g + k * v, k = b * -v + k * g, P = w * -v + P * g, b = d), u.rotationX && 359.9 < Math.abs(u.rotationX) + Math.abs(u.rotation) && (u.rotationX = u.rotation = 0, u.rotationY = 180 - u.rotationY), u.scaleX = (1e5 * Math.sqrt(y * y + b * b) + .5 | 0) / 1e5, u.scaleY = (1e5 * Math.sqrt(k * k + O * O) + .5 | 0) / 1e5, u.scaleZ = (1e5 * Math.sqrt(P * P + R * R) + .5 | 0) / 1e5, u.skewX = T || k ? Math.atan2(T, k) * q + u.rotation : u.skewX || 0, 90 < Math.abs(u.skewX) && Math.abs(u.skewX) < 270 && (c ? (u.scaleX *= -1, u.skewX += u.rotation <= 0 ? 180 : -180, u.rotation += u.rotation <= 0 ? 180 : -180) : (u.scaleY *= -1, u.skewX += u.skewX <= 0 ? 180 : -180)), u.perspective = N ? 1 / (N < 0 ? -N : N) : 0, u.x = C, u.y = M, u.z = A, u.svg && (u.x -= u.xOrigin - (u.xOrigin * y - u.yOrigin * T), u.y -= u.yOrigin - (u.yOrigin * b - u.xOrigin * k))
                    } else if ((!zt || s || !r.length || u.x !== r[4] || u.y !== r[5] || !u.rotationX && !u.rotationY) && (void 0 === u.x || "none" !== J(t, "display", e))) {
                        var I = 6 <= r.length,
                            E = I ? r[0] : 1,
                            F = r[1] || 0,
                            L = r[2] || 0,
                            X = I ? r[3] : 1;
                        u.x = r[4] || 0, u.y = r[5] || 0, a = Math.sqrt(E * E + F * F), o = Math.sqrt(X * X + L * L), l = E || F ? Math.atan2(F, E) * q : u.rotation || 0, h = L || X ? Math.atan2(L, X) * q + l : u.skewX || 0, 90 < Math.abs(h) && Math.abs(h) < 270 && (c ? (a *= -1, h += l <= 0 ? 180 : -180, l += l <= 0 ? 180 : -180) : (o *= -1, h += h <= 0 ? 180 : -180)), u.scaleX = a, u.scaleY = o, u.rotation = l, u.skewX = h, zt && (u.rotationX = u.rotationY = u.z = 0, u.perspective = _, u.scaleZ = 1), u.svg && (u.x -= u.xOrigin - (u.xOrigin * E + u.yOrigin * L), u.y -= u.yOrigin - (u.xOrigin * F + u.yOrigin * X))
                    }
                    for (n in u.zOrigin = f, u) u[n] < 2e-5 && -2e-5 < u[n] && (u[n] = 0)
                }
                return i && ((t._gsTransform = u).svg && (Pt && t.style[Mt] ? j.delayedCall(.001, function () {
                    Zt(t.style, Mt)
                }) : !Pt && t.getAttribute("transform") && j.delayedCall(.001, function () {
                    t.removeAttribute("transform")
                }))), u
            },
            Vt = function (t) {
                var e, i, s = this.data,
                    r = -s.rotation * X,
                    n = r + s.skewX * X,
                    a = 1e5,
                    o = (Math.cos(r) * s.scaleX * a | 0) / a,
                    l = (Math.sin(r) * s.scaleX * a | 0) / a,
                    h = (Math.sin(n) * -s.scaleY * a | 0) / a,
                    u = (Math.cos(n) * s.scaleY * a | 0) / a,
                    c = this.t.style,
                    f = this.t.currentStyle;
                if (f) {
                    i = l, l = -h, h = -i, e = f.filter, c.filter = "";
                    var _, p, d = this.t.offsetWidth,
                        m = this.t.offsetHeight,
                        g = "absolute" !== f.position,
                        v = "progid:DXImageTransform.Microsoft.Matrix(M11=" + o + ", M12=" + l + ", M21=" + h + ", M22=" + u,
                        y = s.x + d * s.xPercent / 100,
                        b = s.y + m * s.yPercent / 100;
                    if (null != s.ox && (y += (_ = (s.oxp ? d * s.ox * .01 : s.ox) - d / 2) - (_ * o + (p = (s.oyp ? m * s.oy * .01 : s.oy) - m / 2) * l), b += p - (_ * h + p * u)), g ? v += ", Dx=" + ((_ = d / 2) - (_ * o + (p = m / 2) * l) + y) + ", Dy=" + (p - (_ * h + p * u) + b) + ")" : v += ", sizingMethod='auto expand')", -1 !== e.indexOf("DXImageTransform.Microsoft.Matrix(") ? c.filter = e.replace(M, v) : c.filter = v + " " + e, (0 === t || 1 === t) && 1 === o && 0 === l && 0 === h && 1 === u && (g && -1 === v.indexOf("Dx=0, Dy=0") || C.test(e) && 100 !== parseFloat(RegExp.$1) || -1 === e.indexOf(e.indexOf("Alpha")) && c.removeAttribute("filter")), !g) {
                        var w, x, T, k = P < 8 ? 1 : -1;
                        for (_ = s.ieOffsetX || 0, p = s.ieOffsetY || 0, s.ieOffsetX = Math.round((d - ((o < 0 ? -o : o) * d + (l < 0 ? -l : l) * m)) / 2 + y), s.ieOffsetY = Math.round((m - ((u < 0 ? -u : u) * m + (h < 0 ? -h : h) * d)) / 2 + b), wt = 0; wt < 4; wt++) T = (i = -1 !== (w = f[x = rt[wt]]).indexOf("px") ? parseFloat(w) : K(this.t, x, parseFloat(w), w.replace(S, "")) || 0) !== s[x] ? wt < 2 ? -s.ieOffsetX : -s.ieOffsetY : wt < 2 ? _ - s.ieOffsetX : p - s.ieOffsetY, c[x] = (s[x] = Math.round(i - T * (0 === wt || 2 === wt ? 1 : k))) + "px"
                    }
                }
            },
            Ut = r.set3DTransformRatio = r.setTransformRatio = function (t) {
                var e, i, s, r, n, a, o, l, h, u, c, f, _, p, d, m, g, v, y, b, w, x, T, k = this.data,
                    P = this.t.style,
                    S = k.rotation,
                    D = k.rotationX,
                    O = k.rotationY,
                    R = k.scaleX,
                    C = k.scaleY,
                    M = k.scaleZ,
                    A = k.x,
                    N = k.y,
                    z = k.z,
                    I = k.svg,
                    E = k.perspective,
                    F = k.force3D;
                if (!((1 !== t && 0 !== t || "auto" !== F || this.tween._totalTime !== this.tween._totalDuration && this.tween._totalTime) && F || z || E || O || D || 1 !== M) || Pt && I || !zt) S || k.skewX || I ? (S *= X, x = k.skewX * X, T = 1e5, e = Math.cos(S) * R, r = Math.sin(S) * R, i = Math.sin(S - x) * -C, n = Math.cos(S - x) * C, x && "simple" === k.skewType && (g = Math.tan(x), i *= g = Math.sqrt(1 + g * g), n *= g, k.skewY && (e *= g, r *= g)), I && (A += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, N += k.yOrigin - (k.xOrigin * r + k.yOrigin * n) + k.yOffset, Pt && (k.xPercent || k.yPercent) && (p = this.t.getBBox(), A += .01 * k.xPercent * p.width, N += .01 * k.yPercent * p.height), A < (p = 1e-6) && -p < A && (A = 0), N < p && -p < N && (N = 0)), y = (e * T | 0) / T + "," + (r * T | 0) / T + "," + (i * T | 0) / T + "," + (n * T | 0) / T + "," + A + "," + N + ")", I && Pt ? this.t.setAttribute("transform", "matrix(" + y) : P[Mt] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + y) : P[Mt] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix(" : "matrix(") + R + ",0,0," + C + "," + A + "," + N + ")";
                else {
                    if (L && (R < (p = 1e-4) && -p < R && (R = M = 2e-5), C < p && -p < C && (C = M = 2e-5), !E || k.z || k.rotationX || k.rotationY || (E = 0)), S || k.skewX) S *= X, d = e = Math.cos(S), m = r = Math.sin(S), k.skewX && (S -= k.skewX * X, d = Math.cos(S), m = Math.sin(S), "simple" === k.skewType && (g = Math.tan(k.skewX * X), d *= g = Math.sqrt(1 + g * g), m *= g, k.skewY && (e *= g, r *= g))), i = -m, n = d;
                    else {
                        if (!(O || D || 1 !== M || E || I)) return void (P[Mt] = (k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) translate3d(" : "translate3d(") + A + "px," + N + "px," + z + "px)" + (1 !== R || 1 !== C ? " scale(" + R + "," + C + ")" : ""));
                        e = n = 1, i = r = 0
                    }
                    h = 1, s = a = o = l = u = c = 0, f = E ? -1 / E : 0, _ = k.zOrigin, p = 1e-6, b = ",", w = "0", (S = O * X) && (d = Math.cos(S), u = f * (o = -(m = Math.sin(S))), s = e * m, a = r * m, f *= h = d, e *= d, r *= d), (S = D * X) && (g = i * (d = Math.cos(S)) + s * (m = Math.sin(S)), v = n * d + a * m, l = h * m, c = f * m, s = i * -m + s * d, a = n * -m + a * d, h *= d, f *= d, i = g, n = v), 1 !== M && (s *= M, a *= M, h *= M, f *= M), 1 !== C && (i *= C, n *= C, l *= C, c *= C), 1 !== R && (e *= R, r *= R, o *= R, u *= R), (_ || I) && (_ && (A += s * -_, N += a * -_, z += h * -_ + _), I && (A += k.xOrigin - (k.xOrigin * e + k.yOrigin * i) + k.xOffset, N += k.yOrigin - (k.xOrigin * r + k.yOrigin * n) + k.yOffset), A < p && -p < A && (A = w), N < p && -p < N && (N = w), z < p && -p < z && (z = 0)), y = k.xPercent || k.yPercent ? "translate(" + k.xPercent + "%," + k.yPercent + "%) matrix3d(" : "matrix3d(", y += (e < p && -p < e ? w : e) + b + (r < p && -p < r ? w : r) + b + (o < p && -p < o ? w : o), y += b + (u < p && -p < u ? w : u) + b + (i < p && -p < i ? w : i) + b + (n < p && -p < n ? w : n), D || O || 1 !== M ? (y += b + (l < p && -p < l ? w : l) + b + (c < p && -p < c ? w : c) + b + (s < p && -p < s ? w : s), y += b + (a < p && -p < a ? w : a) + b + (h < p && -p < h ? w : h) + b + (f < p && -p < f ? w : f) + b) : y += ",0,0,0,0,1,0,", y += A + b + N + b + z + b + (E ? 1 + -z / E : 1) + ")", P[Mt] = y
                }
            };
        (t = It.prototype).x = t.y = t.z = t.skewX = t.skewY = t.rotation = t.rotationX = t.rotationY = t.zOrigin = t.xPercent = t.yPercent = t.xOffset = t.yOffset = 0, t.scaleX = t.scaleY = t.scaleZ = 1, Tt("transform,scale,scaleX,scaleY,scaleZ,x,y,z,rotation,rotationX,rotationY,rotationZ,skewX,skewY,shortRotation,shortRotationX,shortRotationY,shortRotationZ,transformOrigin,svgOrigin,transformPerspective,directionalRotation,parseTransform,force3D,skewType,xPercent,yPercent,smoothOrigin", {
            parser: function (t, e, i, s, r, n, a) {
                if (s._lastParsedTransform === a) return r;
                s._lastParsedTransform = a;
                var o, l, h, u, c, f, _, p, d, m, g = t._gsTransform,
                    v = t.style,
                    y = Ct.length,
                    b = a,
                    w = {},
                    x = "transformOrigin";
                if (a.display ? (h = J(t, "display"), v.display = "block", o = Wt(t, Y, !0, a.parseTransform), v.display = h) : o = Wt(t, Y, !0, a.parseTransform), s._transform = o, "string" == typeof b.transform && Mt) (h = E.style)[Mt] = b.transform, h.display = "block", h.position = "absolute", I.body.appendChild(E), l = Wt(E, null, !1), o.svg && (p = o.xOrigin, d = o.yOrigin, l.x -= o.xOffset, l.y -= o.yOffset, (b.transformOrigin || b.svgOrigin) && (u = {}, jt(t, at(b.transformOrigin), u, b.svgOrigin, b.smoothOrigin, !0), p = u.xOrigin, d = u.yOrigin, l.x -= u.xOffset - o.xOffset, l.y -= u.yOffset - o.yOffset), (p || d) && (m = qt(E), l.x -= p - (p * m[0] + d * m[2]), l.y -= d - (p * m[1] + d * m[3]))), I.body.removeChild(E), l.perspective || (l.perspective = o.perspective), null != b.xPercent && (l.xPercent = lt(b.xPercent, o.xPercent)), null != b.yPercent && (l.yPercent = lt(b.yPercent, o.yPercent));
                else if ("object" == typeof b) {
                    if (l = {
                        scaleX: lt(null != b.scaleX ? b.scaleX : b.scale, o.scaleX),
                        scaleY: lt(null != b.scaleY ? b.scaleY : b.scale, o.scaleY),
                        scaleZ: lt(b.scaleZ, o.scaleZ),
                        x: lt(b.x, o.x),
                        y: lt(b.y, o.y),
                        z: lt(b.z, o.z),
                        xPercent: lt(b.xPercent, o.xPercent),
                        yPercent: lt(b.yPercent, o.yPercent),
                        perspective: lt(b.transformPerspective, o.perspective)
                    }, null != (_ = b.directionalRotation))
                        if ("object" == typeof _)
                            for (h in _) b[h] = _[h];
                        else b.rotation = _;
                    "string" == typeof b.x && -1 !== b.x.indexOf("%") && (l.x = 0, l.xPercent = lt(b.x, o.xPercent)), "string" == typeof b.y && -1 !== b.y.indexOf("%") && (l.y = 0, l.yPercent = lt(b.y, o.yPercent)), l.rotation = ht("rotation" in b ? b.rotation : "shortRotation" in b ? b.shortRotation + "_short" : "rotationZ" in b ? b.rotationZ : o.rotation - o.skewY, o.rotation - o.skewY, "rotation", w), zt && (l.rotationX = ht("rotationX" in b ? b.rotationX : "shortRotationX" in b ? b.shortRotationX + "_short" : o.rotationX || 0, o.rotationX, "rotationX", w), l.rotationY = ht("rotationY" in b ? b.rotationY : "shortRotationY" in b ? b.shortRotationY + "_short" : o.rotationY || 0, o.rotationY, "rotationY", w)), l.skewX = ht(b.skewX, o.skewX - o.skewY), (l.skewY = ht(b.skewY, o.skewY)) && (l.skewX += l.skewY, l.rotation += l.skewY)
                }
                for (zt && null != b.force3D && (o.force3D = b.force3D, f = !0), o.skewType = b.skewType || o.skewType || B.defaultSkewType, (c = o.force3D || o.z || o.rotationX || o.rotationY || l.z || l.rotationX || l.rotationY || l.perspective) || null == b.scale || (l.scaleZ = 1); - 1 < --y;)(1e-6 < (u = l[i = Ct[y]] - o[i]) || u < -1e-6 || null != b[i] || null != z[i]) && (f = !0, r = new vt(o, i, o[i], u, r), i in w && (r.e = w[i]), r.xs0 = 0, r.plugin = n, s._overwriteProps.push(r.n));
                return u = b.transformOrigin, o.svg && (u || b.svgOrigin) && (p = o.xOffset, d = o.yOffset, jt(t, at(u), l, b.svgOrigin, b.smoothOrigin), r = yt(o, "xOrigin", (g ? o : l).xOrigin, l.xOrigin, r, x), r = yt(o, "yOrigin", (g ? o : l).yOrigin, l.yOrigin, r, x), (p !== o.xOffset || d !== o.yOffset) && (r = yt(o, "xOffset", g ? p : o.xOffset, o.xOffset, r, x), r = yt(o, "yOffset", g ? d : o.yOffset, o.yOffset, r, x)), u = Pt ? null : "0px 0px"), (u || zt && c && o.zOrigin) && (Mt ? (f = !0, i = Nt, u = (u || J(t, i, Y, !1, "50% 50%")) + "", (r = new vt(v, i, 0, 0, r, -1, x)).b = v[i], r.plugin = n, r.xs0 = r.e = zt ? (h = o.zOrigin, u = u.split(" "), o.zOrigin = (2 < u.length && (0 === h || "0px" !== u[2]) ? parseFloat(u[2]) : h) || 0, r.xs0 = r.e = u[0] + " " + (u[1] || "50%") + " 0px", (r = new vt(o, "zOrigin", 0, 0, r, -1, r.n)).b = h, o.zOrigin) : u) : at(u + "", o)), f && (s._transformType = o.svg && Pt || !c && 3 !== this._transformType ? 2 : 3), r
            },
            prefix: !0
        }), Tt("boxShadow", {
            defaultValue: "0px 0px 0px 0px #999",
            prefix: !0,
            color: !0,
            multi: !0,
            keyword: "inset"
        }), Tt("borderRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, s, r, n) {
                e = this.format(e);
                var a, o, l, h, u, c, f, _, p, d, m, g, v, y, b, w, x = ["borderTopLeftRadius", "borderTopRightRadius", "borderBottomRightRadius", "borderBottomLeftRadius"],
                    T = t.style;
                for (p = parseFloat(t.offsetWidth), d = parseFloat(t.offsetHeight), a = e.split(" "), o = 0; o < x.length; o++) this.p.indexOf("border") && (x[o] = G(x[o])), -1 !== (u = h = J(t, x[o], Y, !1, "0px")).indexOf(" ") && (u = (h = u.split(" "))[0], h = h[1]), c = l = a[o], f = parseFloat(u), g = u.substr((f + "").length), "" === (m = (v = "=" === c.charAt(1)) ? (_ = parseInt(c.charAt(0) + "1", 10), c = c.substr(2), _ *= parseFloat(c), c.substr((_ + "").length - (_ < 0 ? 1 : 0)) || "") : (_ = parseFloat(c), c.substr((_ + "").length))) && (m = k[i] || g), m !== g && (y = K(t, "borderLeft", f, g), b = K(t, "borderTop", f, g), h = "%" === m ? (u = y / p * 100 + "%", b / d * 100 + "%") : "em" === m ? (u = y / (w = K(t, "borderLeft", 1, "em")) + "em", b / w + "em") : (u = y + "px", b + "px"), v && (c = parseFloat(u) + _ + m, l = parseFloat(h) + _ + m)), r = bt(T, x[o], u + " " + h, c + " " + l, !1, "0px", r);
                return r
            },
            prefix: !0,
            formatter: dt("0px 0px 0px 0px", !1, !0)
        }), Tt("borderBottomLeftRadius,borderBottomRightRadius,borderTopLeftRadius,borderTopRightRadius", {
            defaultValue: "0px",
            parser: function (t, e, i, s, r, n) {
                return bt(t.style, i, this.format(J(t, i, Y, !1, "0px 0px")), this.format(e), !1, "0px", r)
            },
            prefix: !0,
            formatter: dt("0px 0px", !1, !0)
        }), Tt("backgroundPosition", {
            defaultValue: "0 0",
            parser: function (t, e, i, s, r, n) {
                var a, o, l, h, u, c, f = "background-position",
                    _ = Y || Q(t, null),
                    p = this.format((_ ? P ? _.getPropertyValue(f + "-x") + " " + _.getPropertyValue(f + "-y") : _.getPropertyValue(f) : t.currentStyle.backgroundPositionX + " " + t.currentStyle.backgroundPositionY) || "0 0"),
                    d = this.format(e);
                if (-1 !== p.indexOf("%") != (-1 !== d.indexOf("%")) && d.split(",").length < 2 && ((c = J(t, "backgroundImage").replace(x, "")) && "none" !== c)) {
                    for (a = p.split(" "), o = d.split(" "), F.setAttribute("src", c), l = 2; - 1 < --l;)(h = -1 !== (p = a[l]).indexOf("%")) !== (-1 !== o[l].indexOf("%")) && (u = 0 === l ? t.offsetWidth - F.width : t.offsetHeight - F.height, a[l] = h ? parseFloat(p) / 100 * u + "px" : parseFloat(p) / u * 100 + "%");
                    p = a.join(" ")
                }
                return this.parseComplex(t.style, p, d, r, n)
            },
            formatter: at
        }), Tt("backgroundSize", {
            defaultValue: "0 0",
            formatter: at
        }), Tt("perspective", {
            defaultValue: "0px",
            prefix: !0
        }), Tt("perspectiveOrigin", {
            defaultValue: "50% 50%",
            prefix: !0
        }), Tt("transformStyle", {
            prefix: !0
        }), Tt("backfaceVisibility", {
            prefix: !0
        }), Tt("userSelect", {
            prefix: !0
        }), Tt("margin", {
            parser: mt("marginTop,marginRight,marginBottom,marginLeft")
        }), Tt("padding", {
            parser: mt("paddingTop,paddingRight,paddingBottom,paddingLeft")
        }), Tt("clip", {
            defaultValue: "rect(0px,0px,0px,0px)",
            parser: function (t, e, i, s, r, n) {
                var a, o, l;
                return e = P < 9 ? (o = t.currentStyle, l = P < 8 ? " " : ",", a = "rect(" + o.clipTop + l + o.clipRight + l + o.clipBottom + l + o.clipLeft + ")", this.format(e).split(",").join(l)) : (a = this.format(J(t, this.p, Y, !1, this.dflt)), this.format(e)), this.parseComplex(t.style, a, e, r, n)
            }
        }), Tt("textShadow", {
            defaultValue: "0px 0px 0px #999",
            color: !0,
            multi: !0
        }), Tt("autoRound,strictUnits", {
            parser: function (t, e, i, s, r) {
                return r
            }
        }), Tt("border", {
            defaultValue: "0px solid #000",
            parser: function (t, e, i, s, r, n) {
                return this.parseComplex(t.style, this.format(J(t, "borderTopWidth", Y, !1, "0px") + " " + J(t, "borderTopStyle", Y, !1, "solid") + " " + J(t, "borderTopColor", Y, !1, "#000")), this.format(e), r, n)
            },
            color: !0,
            formatter: function (t) {
                var e = t.split(" ");
                return e[0] + " " + (e[1] || "solid") + " " + (t.match(pt) || ["#000"])[0]
            }
        }), Tt("borderWidth", {
            parser: mt("borderTopWidth,borderRightWidth,borderBottomWidth,borderLeftWidth")
        }), Tt("float,cssFloat,styleFloat", {
            parser: function (t, e, i, s, r, n) {
                var a = t.style,
                    o = "cssFloat" in a ? "cssFloat" : "styleFloat";
                return new vt(a, o, 0, 0, r, -1, i, !1, 0, a[o], e)
            }
        });
        var Ht = function (t) {
            var e, i = this.t,
                s = i.filter || J(this.data, "filter") || "",
                r = this.s + this.c * t | 0;
            100 === r && (e = -1 === s.indexOf("atrix(") && -1 === s.indexOf("radient(") && -1 === s.indexOf("oader(") ? (i.removeAttribute("filter"), !J(this.data, "filter")) : (i.filter = s.replace(a, ""), !0)), e || (this.xn1 && (i.filter = s = s || "alpha(opacity=" + r + ")"), -1 === s.indexOf("pacity") ? 0 === r && this.xn1 || (i.filter = s + " alpha(opacity=" + r + ")") : i.filter = s.replace(C, "opacity=" + r))
        };
        Tt("opacity,alpha,autoAlpha", {
            defaultValue: "1",
            parser: function (t, e, i, s, r, n) {
                var a = parseFloat(J(t, "opacity", Y, !1, "1")),
                    o = t.style,
                    l = "autoAlpha" === i;
                return "string" == typeof e && "=" === e.charAt(1) && (e = ("-" === e.charAt(0) ? -1 : 1) * parseFloat(e.substr(2)) + a), l && 1 === a && "hidden" === J(t, "visibility", Y) && 0 !== e && (a = 0), V ? r = new vt(o, "opacity", a, e - a, r) : ((r = new vt(o, "opacity", 100 * a, 100 * (e - a), r)).xn1 = l ? 1 : 0, o.zoom = 1, r.type = 2, r.b = "alpha(opacity=" + r.s + ")", r.e = "alpha(opacity=" + (r.s + r.c) + ")", r.data = t, r.plugin = n, r.setRatio = Ht), l && ((r = new vt(o, "visibility", 0, 0, r, -1, null, !1, 0, 0 !== a ? "inherit" : "hidden", 0 === e ? "hidden" : "inherit")).xs0 = "inherit", s._overwriteProps.push(r.n), s._overwriteProps.push(i)), r
            }
        });
        var Zt = function (t, e) {
            e && (t.removeProperty ? (("ms" === e.substr(0, 2) || "webkit" === e.substr(0, 6)) && (e = "-" + e), t.removeProperty(e.replace(o, "-$1").toLowerCase())) : t.removeAttribute(e))
        },
            $t = function (t) {
                if (this.t._gsClassPT = this, 1 === t || 0 === t) {
                    this.t.setAttribute("class", 0 === t ? this.b : this.e);
                    for (var e = this.data, i = this.t.style; e;) e.v ? i[e.p] = e.v : Zt(i, e.p), e = e._next;
                    1 === t && this.t._gsClassPT === this && (this.t._gsClassPT = null)
                } else this.t.getAttribute("class") !== this.e && this.t.setAttribute("class", this.e)
            };
        Tt("className", {
            parser: function (t, e, i, s, r, n, a) {
                var o, l, h, u, c, f = t.getAttribute("class") || "",
                    _ = t.style.cssText;
                if ((r = s._classNamePT = new vt(t, i, 0, 0, r, 2)).setRatio = $t, r.pr = -11, p = !0, r.b = f, l = et(t, Y), h = t._gsClassPT) {
                    for (u = {}, c = h.data; c;) u[c.p] = 1, c = c._next;
                    h.setRatio(1)
                }
                return (t._gsClassPT = r).e = "=" !== e.charAt(1) ? e : f.replace(new RegExp("(?:\\s|^)" + e.substr(2) + "(?![\\w-])"), "") + ("+" === e.charAt(0) ? " " + e.substr(2) : ""), t.setAttribute("class", r.e), o = it(t, l, et(t), a, u), t.setAttribute("class", f), r.data = o.firstMPT, t.style.cssText = _, r.xfirst = s.parse(t, o.difs, r, n)
            }
        });
        var Gt = function (t) {
            if ((1 === t || 0 === t) && this.data._totalTime === this.data._totalDuration && "isFromStart" !== this.data.data) {
                var e, i, s, r, n, a = this.t.style,
                    o = d.transform.parse;
                if ("all" === this.e) r = !(a.cssText = "");
                else
                    for (s = (e = this.e.split(" ").join("").split(",")).length; - 1 < --s;) i = e[s], d[i] && (d[i].parse === o ? r = !0 : i = "transformOrigin" === i ? Nt : d[i].p), Zt(a, i);
                r && (Zt(a, Mt), (n = this.t._gsTransform) && (n.svg && (this.t.removeAttribute("data-svg-origin"), this.t.removeAttribute("transform")), delete this.t._gsTransform))
            }
        };
        for (Tt("clearProps", {
            parser: function (t, e, i, s, r) {
                return (r = new vt(t, i, 0, 0, r, 2)).setRatio = Gt, r.e = e, r.pr = -10, r.data = s._tween, p = !0, r
            }
        }), t = "bezier,throwProps,physicsProps,physics2D".split(","), wt = t.length; wt--;) kt(t[wt]);
        (t = B.prototype)._firstPT = t._lastParsedTransform = t._transform = null, t._onInitTween = function (t, e, i) {
            if (!t.nodeType) return !1;
            this._target = t, this._tween = i, this._vars = e, D = e.autoRound, p = !1, k = e.suffixMap || B.suffixMap, Y = Q(t, ""), _ = this._overwriteProps;
            var s, r, n, a, o, l, h, u, c, f = t.style;
            if (m && "" === f.zIndex && (("auto" === (s = J(t, "zIndex", Y)) || "" === s) && this._addLazySet(f, "zIndex", 0)), "string" == typeof e && (a = f.cssText, s = et(t, Y), f.cssText = a + ";" + e, s = it(t, s, et(t)).difs, !V && b.test(e) && (s.opacity = parseFloat(RegExp.$1)), e = s, f.cssText = a), e.className ? this._firstPT = r = d.className.parse(t, e.className, "className", this, null, null, e) : this._firstPT = r = this.parse(t, e, null), this._transformType) {
                for (c = 3 === this._transformType, Mt ? g && (m = !0, "" === f.zIndex && (("auto" === (h = J(t, "zIndex", Y)) || "" === h) && this._addLazySet(f, "zIndex", 0)), v && this._addLazySet(f, "WebkitBackfaceVisibility", this._vars.WebkitBackfaceVisibility || (c ? "visible" : "hidden"))) : f.zoom = 1, n = r; n && n._next;) n = n._next;
                u = new vt(t, "transform", 0, 0, null, 2), this._linkCSSP(u, null, n), u.setRatio = Mt ? Ut : Vt, u.data = this._transform || Wt(t, Y, !0), u.tween = i, u.pr = -1, _.pop()
            }
            if (p) {
                for (; r;) {
                    for (l = r._next, n = a; n && n.pr > r.pr;) n = n._next;
                    (r._prev = n ? n._prev : o) ? r._prev._next = r : a = r, (r._next = n) ? n._prev = r : o = r, r = l
                }
                this._firstPT = a
            }
            return !0
        }, t.parse = function (t, e, i, s) {
            var r, n, a, o, l, h, u, c, f, _, p = t.style;
            for (r in e) h = e[r], (n = d[r]) ? i = n.parse(t, h, r, this, i, s, e) : (l = J(t, r, Y) + "", f = "string" == typeof h, "color" === r || "fill" === r || "stroke" === r || -1 !== r.indexOf("Color") || f && w.test(h) ? (f || (h = (3 < (h = ft(h)).length ? "rgba(" : "rgb(") + h.join(",") + ")"), i = bt(p, r, l, h, !0, "transparent", i, 0, s)) : f && N.test(h) ? i = bt(p, r, l, h, !0, null, i, 0, s) : (u = (a = parseFloat(l)) || 0 === a ? l.substr((a + "").length) : "", ("" === l || "auto" === l) && (u = "width" === r || "height" === r ? (a = nt(t, r, Y), "px") : "left" === r || "top" === r ? (a = tt(t, r, Y), "px") : (a = "opacity" !== r ? 0 : 1, "")), "" === (c = (_ = f && "=" === h.charAt(1)) ? (o = parseInt(h.charAt(0) + "1", 10), h = h.substr(2), o *= parseFloat(h), h.replace(S, "")) : (o = parseFloat(h), f ? h.replace(S, "") : "")) && (c = r in k ? k[r] : u), h = o || 0 === o ? (_ ? o + a : o) + c : e[r], u !== c && "" !== c && (o || 0 === o) && a && (a = K(t, r, a, u), "%" === c ? (a /= K(t, r, 100, "%") / 100, !0 !== e.strictUnits && (l = a + "%")) : "em" === c || "rem" === c || "vw" === c || "vh" === c ? a /= K(t, r, 1, c) : "px" !== c && (o = K(t, r, o, c), c = "px"), _ && (o || 0 === o) && (h = o + a + c)), _ && (o += a), !a && 0 !== a || !o && 0 !== o ? void 0 !== p[r] && (h || h + "" != "NaN" && null != h) ? (i = new vt(p, r, o || a || 0, 0, i, -1, r, !1, 0, l, h)).xs0 = "none" !== h || "display" !== r && -1 === r.indexOf("Style") ? h : l : H("invalid " + r + " tween value: " + e[r]) : (i = new vt(p, r, a, o - a, i, 0, r, !1 !== D && ("px" === c || "zIndex" === r), 0, l, h)).xs0 = c)), s && i && !i.plugin && (i.plugin = s);
            return i
        }, t.setRatio = function (t) {
            var e, i, s, r = this._firstPT;
            if (1 !== t || this._tween._time !== this._tween._duration && 0 !== this._tween._time)
                if (t || this._tween._time !== this._tween._duration && 0 !== this._tween._time || -1e-6 === this._tween._rawPrevTime)
                    for (; r;) {
                        if (e = r.c * t + r.s, r.r ? e = Math.round(e) : e < 1e-6 && -1e-6 < e && (e = 0), r.type)
                            if (1 === r.type)
                                if (2 === (s = r.l)) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2;
                                else if (3 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3;
                                else if (4 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4;
                                else if (5 === s) r.t[r.p] = r.xs0 + e + r.xs1 + r.xn1 + r.xs2 + r.xn2 + r.xs3 + r.xn3 + r.xs4 + r.xn4 + r.xs5;
                                else {
                                    for (i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                } else -1 === r.type ? r.t[r.p] = r.xs0 : r.setRatio && r.setRatio(t);
                        else r.t[r.p] = e + r.xs0;
                        r = r._next
                    } else
                    for (; r;) 2 !== r.type ? r.t[r.p] = r.b : r.setRatio(t), r = r._next;
            else
                for (; r;) {
                    if (2 !== r.type)
                        if (r.r && -1 !== r.type)
                            if (e = Math.round(r.s + r.c), r.type) {
                                if (1 === r.type) {
                                    for (s = r.l, i = r.xs0 + e + r.xs1, s = 1; s < r.l; s++) i += r["xn" + s] + r["xs" + (s + 1)];
                                    r.t[r.p] = i
                                }
                            } else r.t[r.p] = e + r.xs0;
                        else r.t[r.p] = r.e;
                    else r.setRatio(t);
                    r = r._next
                }
        }, t._enableTransforms = function (t) {
            this._transform = this._transform || Wt(this._target, Y, !0), this._transformType = this._transform.svg && Pt || !t && 3 !== this._transformType ? 2 : 3
        };
        var Qt = function (t) {
            this.t[this.p] = this.e, this.data._linkCSSP(this, this._next, null, !0)
        };
        t._addLazySet = function (t, e, i) {
            var s = this._firstPT = new vt(t, e, 0, 0, this._firstPT, 2);
            s.e = i, s.setRatio = Qt, s.data = this
        }, t._linkCSSP = function (t, e, i, s) {
            return t && (e && (e._prev = t), t._next && (t._next._prev = t._prev), t._prev ? t._prev._next = t._next : this._firstPT === t && (this._firstPT = t._next, s = !0), i ? i._next = t : s || null !== this._firstPT || (this._firstPT = t), t._next = e, t._prev = i), t
        }, t._kill = function (t) {
            var e, i, s, r = t;
            if (t.autoAlpha || t.alpha) {
                for (i in r = {}, t) r[i] = t[i];
                r.opacity = 1, r.autoAlpha && (r.visibility = 1)
            }
            return t.className && (e = this._classNamePT) && ((s = e.xfirst) && s._prev ? this._linkCSSP(s._prev, e._next, s._prev._prev) : s === this._firstPT && (this._firstPT = e._next), e._next && this._linkCSSP(e._next, e._next._next, s._prev), this._classNamePT = null), n.prototype._kill.call(this, r)
        };
        var Jt = function (t, e, i) {
            var s, r, n, a;
            if (t.slice)
                for (r = t.length; - 1 < --r;) Jt(t[r], e, i);
            else
                for (r = (s = t.childNodes).length; - 1 < --r;) a = (n = s[r]).type, n.style && (e.push(et(n)), i && i.push(n)), 1 !== a && 9 !== a && 11 !== a || !n.childNodes.length || Jt(n, e, i)
        };
        return B.cascadeTo = function (t, e, i) {
            var s, r, n, a, o = j.to(t, e, i),
                l = [o],
                h = [],
                u = [],
                c = [],
                f = j._internals.reservedProps;
            for (t = o._targets || o.target, Jt(t, h, c), o.render(e, !0, !0), Jt(t, u), o.render(0, !0, !0), o._enabled(!0), s = c.length; - 1 < --s;)
                if ((r = it(c[s], h[s], u[s])).firstMPT) {
                    for (n in r = r.difs, i) f[n] && (r[n] = i[n]);
                    for (n in a = {}, r) a[n] = h[s][n];
                    l.push(j.fromTo(c[s], e, a, r))
                } return l
        }, n.activate([B]), B
    }, !0), t = _gsScope._gsDefine.plugin({
        propName: "roundProps",
        version: "1.5",
        priority: -1,
        API: 2,
        init: function (t, e, i) {
            return this._tween = i, !0
        }
    }), l = function (t) {
        for (; t;) t.f || t.blob || (t.r = 1), t = t._next
    }, (e = t.prototype)._onInitAllProps = function () {
        for (var t, e, i, s = this._tween, r = s.vars.roundProps.join ? s.vars.roundProps : s.vars.roundProps.split(","), n = r.length, a = {}, o = s._propLookup.roundProps; - 1 < --n;) a[r[n]] = 1;
        for (n = r.length; - 1 < --n;)
            for (t = r[n], e = s._firstPT; e;) i = e._next, e.pg ? e.t._roundProps(a, !0) : e.n === t && (2 === e.f && e.t ? l(e.t._firstPT) : (this._add(e.t, t, e.s, e.c), i && (i._prev = e._prev), e._prev ? e._prev._next = i : s._firstPT === e && (s._firstPT = i), e._next = e._prev = null, s._propLookup[t] = o)), e = i;
        return !1
    }, e._add = function (t, e, i, s) {
        this._addTween(t, e, i, i + s, e, !0), this._overwriteProps.push(e)
    }, _gsScope._gsDefine.plugin({
        propName: "attr",
        API: 2,
        version: "0.5.0",
        init: function (t, e, i) {
            var s;
            if ("function" != typeof t.setAttribute) return !1;
            for (s in e) this._addTween(t, "setAttribute", t.getAttribute(s) + "", e[s] + "", s, !1, s), this._overwriteProps.push(s);
            return !0
        }
    }), _gsScope._gsDefine.plugin({
        propName: "directionalRotation",
        version: "0.2.1",
        API: 2,
        init: function (t, e, i) {
            "object" != typeof e && (e = {
                rotation: e
            }), this.finals = {};
            var s, r, n, a, o, l = !0 === e.useRadians ? 2 * Math.PI : 360;
            for (s in e) "useRadians" !== s && (r = (o = (e[s] + "").split("_"))[0], n = parseFloat("function" != typeof t[s] ? t[s] : t[s.indexOf("set") || "function" != typeof t["get" + s.substr(3)] ? s : "get" + s.substr(3)]()), a = (this.finals[s] = "string" == typeof r && "=" === r.charAt(1) ? n + parseInt(r.charAt(0) + "1", 10) * Number(r.substr(2)) : Number(r) || 0) - n, o.length && (-1 !== (r = o.join("_")).indexOf("short") && ((a %= l) !== a % (l / 2) && (a = a < 0 ? a + l : a - l)), -1 !== r.indexOf("_cw") && a < 0 ? a = (a + 9999999999 * l) % l - (a / l | 0) * l : -1 !== r.indexOf("ccw") && 0 < a && (a = (a - 9999999999 * l) % l - (a / l | 0) * l)), (1e-6 < a || a < -1e-6) && (this._addTween(t, s, n, n + a, s), this._overwriteProps.push(s)));
            return !0
        },
        set: function (t) {
            var e;
            if (1 !== t) this._super.setRatio.call(this, t);
            else
                for (e = this._firstPT; e;) e.f ? e.t[e.p](this.finals[e.p]) : e.t[e.p] = this.finals[e.p], e = e._next
        }
    })._autoCSS = !0, _gsScope._gsDefine("easing.Back", ["easing.Ease"], function (m) {
        var e, i, t, s = _gsScope.GreenSockGlobals || _gsScope,
            r = s.com.greensock,
            n = 2 * Math.PI,
            a = Math.PI / 2,
            o = r._class,
            l = function (t, e) {
                var i = o("easing." + t, function () { }, !0),
                    s = i.prototype = new m;
                return s.constructor = i, s.getRatio = e, i
            },
            h = m.register || function () { },
            u = function (t, e, i, s, r) {
                var n = o("easing." + t, {
                    easeOut: new e,
                    easeIn: new i,
                    easeInOut: new s
                }, !0);
                return h(n, t), n
            },
            g = function (t, e, i) {
                this.t = t, this.v = e, i && (((this.next = i).prev = this).c = i.v - e, this.gap = i.t - t)
            },
            c = function (t, e) {
                var i = o("easing." + t, function (t) {
                    this._p1 = t || 0 === t ? t : 1.70158, this._p2 = 1.525 * this._p1
                }, !0),
                    s = i.prototype = new m;
                return s.constructor = i, s.getRatio = e, s.config = function (t) {
                    return new i(t)
                }, i
            },
            f = u("Back", c("BackOut", function (t) {
                return (t -= 1) * t * ((this._p1 + 1) * t + this._p1) + 1
            }), c("BackIn", function (t) {
                return t * t * ((this._p1 + 1) * t - this._p1)
            }), c("BackInOut", function (t) {
                return (t *= 2) < 1 ? .5 * t * t * ((this._p2 + 1) * t - this._p2) : .5 * ((t -= 2) * t * ((this._p2 + 1) * t + this._p2) + 2)
            })),
            _ = o("easing.SlowMo", function (t, e, i) {
                e = e || 0 === e ? e : .7, null == t ? t = .7 : 1 < t && (t = 1), this._p = 1 !== t ? e : 0, this._p1 = (1 - t) / 2, this._p2 = t, this._p3 = this._p1 + this._p2, this._calcEnd = !0 === i
            }, !0),
            p = _.prototype = new m;
        return p.constructor = _, p.getRatio = function (t) {
            var e = t + (.5 - t) * this._p;
            return t < this._p1 ? this._calcEnd ? 1 - (t = 1 - t / this._p1) * t : e - (t = 1 - t / this._p1) * t * t * t * e : t > this._p3 ? this._calcEnd ? 1 - (t = (t - this._p3) / this._p1) * t : e + (t - e) * (t = (t - this._p3) / this._p1) * t * t * t : this._calcEnd ? 1 : e
        }, _.ease = new _(.7, .7), p.config = _.config = function (t, e, i) {
            return new _(t, e, i)
        }, (p = (e = o("easing.SteppedEase", function (t) {
            t = t || 1, this._p1 = 1 / t, this._p2 = t + 1
        }, !0)).prototype = new m).constructor = e, p.getRatio = function (t) {
            return t < 0 ? t = 0 : 1 <= t && (t = .999999999), (this._p2 * t >> 0) * this._p1
        }, p.config = e.config = function (t) {
            return new e(t)
        }, (p = (i = o("easing.RoughEase", function (t) {
            for (var e, i, s, r, n, a, o = (t = t || {}).taper || "none", l = [], h = 0, u = 0 | (t.points || 20), c = u, f = !1 !== t.randomize, _ = !0 === t.clamp, p = t.template instanceof m ? t.template : null, d = "number" == typeof t.strength ? .4 * t.strength : .4; - 1 < --c;) e = f ? Math.random() : 1 / u * c, i = p ? p.getRatio(e) : e, s = "none" === o ? d : "out" === o ? (r = 1 - e) * r * d : "in" === o ? e * e * d : (r = e < .5 ? 2 * e : 2 * (1 - e)) * r * .5 * d, f ? i += Math.random() * s - .5 * s : c % 2 ? i += .5 * s : i -= .5 * s, _ && (1 < i ? i = 1 : i < 0 && (i = 0)), l[h++] = {
                x: e,
                y: i
            };
            for (l.sort(function (t, e) {
                return t.x - e.x
            }), a = new g(1, 1, null), c = u; - 1 < --c;) n = l[c], a = new g(n.x, n.y, a);
            this._prev = new g(0, 0, 0 !== a.t ? a : a.next)
        }, !0)).prototype = new m).constructor = i, p.getRatio = function (t) {
            var e = this._prev;
            if (t > e.t) {
                for (; e.next && t >= e.t;) e = e.next;
                e = e.prev
            } else
                for (; e.prev && t <= e.t;) e = e.prev;
            return (this._prev = e).v + (t - e.t) / e.gap * e.c
        }, p.config = function (t) {
            return new i(t)
        }, i.ease = new i, u("Bounce", l("BounceOut", function (t) {
            return t < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375
        }), l("BounceIn", function (t) {
            return (t = 1 - t) < 1 / 2.75 ? 1 - 7.5625 * t * t : t < 2 / 2.75 ? 1 - (7.5625 * (t -= 1.5 / 2.75) * t + .75) : t < 2.5 / 2.75 ? 1 - (7.5625 * (t -= 2.25 / 2.75) * t + .9375) : 1 - (7.5625 * (t -= 2.625 / 2.75) * t + .984375)
        }), l("BounceInOut", function (t) {
            var e = t < .5;
            return t = (t = e ? 1 - 2 * t : 2 * t - 1) < 1 / 2.75 ? 7.5625 * t * t : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75 : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375 : 7.5625 * (t -= 2.625 / 2.75) * t + .984375, e ? .5 * (1 - t) : .5 * t + .5
        })), u("Circ", l("CircOut", function (t) {
            return Math.sqrt(1 - (t -= 1) * t)
        }), l("CircIn", function (t) {
            return -(Math.sqrt(1 - t * t) - 1)
        }), l("CircInOut", function (t) {
            return (t *= 2) < 1 ? -.5 * (Math.sqrt(1 - t * t) - 1) : .5 * (Math.sqrt(1 - (t -= 2) * t) + 1)
        })), u("Elastic", (t = function (t, e, i) {
            var s = o("easing." + t, function (t, e) {
                this._p1 = 1 <= t ? t : 1, this._p2 = (e || i) / (t < 1 ? t : 1), this._p3 = this._p2 / n * (Math.asin(1 / this._p1) || 0), this._p2 = n / this._p2
            }, !0),
                r = s.prototype = new m;
            return r.constructor = s, r.getRatio = e, r.config = function (t, e) {
                return new s(t, e)
            }, s
        })("ElasticOut", function (t) {
            return this._p1 * Math.pow(2, -10 * t) * Math.sin((t - this._p3) * this._p2) + 1
        }, .3), t("ElasticIn", function (t) {
            return -this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2)
        }, .3), t("ElasticInOut", function (t) {
            return (t *= 2) < 1 ? this._p1 * Math.pow(2, 10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * -.5 : this._p1 * Math.pow(2, -10 * (t -= 1)) * Math.sin((t - this._p3) * this._p2) * .5 + 1
        }, .45)), u("Expo", l("ExpoOut", function (t) {
            return 1 - Math.pow(2, -10 * t)
        }), l("ExpoIn", function (t) {
            return Math.pow(2, 10 * (t - 1)) - .001
        }), l("ExpoInOut", function (t) {
            return (t *= 2) < 1 ? .5 * Math.pow(2, 10 * (t - 1)) : .5 * (2 - Math.pow(2, -10 * (t - 1)))
        })), u("Sine", l("SineOut", function (t) {
            return Math.sin(t * a)
        }), l("SineIn", function (t) {
            return 1 - Math.cos(t * a)
        }), l("SineInOut", function (t) {
            return -.5 * (Math.cos(Math.PI * t) - 1)
        })), o("easing.EaseLookup", {
            find: function (t) {
                return m.map[t]
            }
        }, !0), h(s.SlowMo, "SlowMo", "ease,"), h(i, "RoughEase", "ease,"), h(e, "SteppedEase", "ease,"), f
    }, !0)
}), _gsScope._gsDefine && _gsScope._gsQueue.pop()(),
    function (_, t) {
        "use strict";
        var e, i, p = _.GreenSockGlobals = _.GreenSockGlobals || _;
        if (!p.TweenLite) {
            var s, r, n, d, m, g = function (t) {
                var e, i = t.split("."),
                    s = p;
                for (e = 0; e < i.length; e++) s[i[e]] = s = s[i[e]] || {};
                return s
            },
                c = g("com.greensock"),
                v = 1e-10,
                l = function (t) {
                    var e, i = [],
                        s = t.length;
                    for (e = 0; e !== s; i.push(t[e++]));
                    return i
                },
                y = function () { },
                b = (e = Object.prototype.toString, i = e.call([]), function (t) {
                    return null != t && (t instanceof Array || "object" == typeof t && !!t.push && e.call(t) === i)
                }),
                w = {},
                x = function (l, h, u, c) {
                    this.sc = w[l] ? w[l].sc : [], (w[l] = this).gsClass = null, this.func = u;
                    var f = [];
                    this.check = function (t) {
                        for (var e, i, s, r, n, a = h.length, o = a; - 1 < --a;)(e = w[h[a]] || new x(h[a], [])).gsClass ? (f[a] = e.gsClass, o--) : t && e.sc.push(this);
                        if (0 === o && u)
                            for (s = (i = ("com.greensock." + l).split(".")).pop(), r = g(i.join("."))[s] = this.gsClass = u.apply(u, f), c && (p[s] = r, !(n = "undefined" != typeof module && module.exports) && "function" == typeof define && define.amd ? define((_.GreenSockAMDPath ? _.GreenSockAMDPath + "/" : "") + l.split(".").pop(), [], function () {
                                return r
                            }) : "TweenMax" === l && n && (module.exports = r)), a = 0; a < this.sc.length; a++) this.sc[a].check()
                    }, this.check(!0)
                },
                a = _._gsDefine = function (t, e, i, s) {
                    return new x(t, e, i, s)
                },
                f = c._class = function (t, e, i) {
                    return e = e || function () { }, a(t, [], function () {
                        return e
                    }, i), e
                };
            a.globals = p;
            var o = [0, 0, 1, 1],
                h = [],
                u = f("easing.Ease", function (t, e, i, s) {
                    this._func = t, this._type = i || 0, this._power = s || 0, this._params = e ? o.concat(e) : o
                }, !0),
                T = u.map = {},
                k = u.register = function (t, e, i, s) {
                    for (var r, n, a, o, l = e.split(","), h = l.length, u = (i || "easeIn,easeOut,easeInOut").split(","); - 1 < --h;)
                        for (n = l[h], r = s ? f("easing." + n, null, !0) : c.easing[n] || {}, a = u.length; - 1 < --a;) o = u[a], T[n + "." + o] = T[o + n] = r[o] = t.getRatio ? t : t[o] || new t
                };
            for ((n = u.prototype)._calcEnd = !1, n.getRatio = function (t) {
                if (this._func) return this._params[0] = t, this._func.apply(null, this._params);
                var e = this._type,
                    i = this._power,
                    s = 1 === e ? 1 - t : 2 === e ? t : t < .5 ? 2 * t : 2 * (1 - t);
                return 1 === i ? s *= s : 2 === i ? s *= s * s : 3 === i ? s *= s * s * s : 4 === i && (s *= s * s * s * s), 1 === e ? 1 - s : 2 === e ? s : t < .5 ? s / 2 : 1 - s / 2
            }, r = (s = ["Linear", "Quad", "Cubic", "Quart", "Quint,Strong"]).length; - 1 < --r;) n = s[r] + ",Power" + r, k(new u(null, null, 1, r), n, "easeOut", !0), k(new u(null, null, 2, r), n, "easeIn" + (0 === r ? ",easeNone" : "")), k(new u(null, null, 3, r), n, "easeInOut");
            T.linear = c.easing.Linear.easeIn, T.swing = c.easing.Quad.easeInOut;
            var P = f("events.EventDispatcher", function (t) {
                this._listeners = {}, this._eventTarget = t || this
            });
            (n = P.prototype).addEventListener = function (t, e, i, s, r) {
                r = r || 0;
                var n, a, o = this._listeners[t],
                    l = 0;
                for (null == o && (this._listeners[t] = o = []), a = o.length; - 1 < --a;)(n = o[a]).c === e && n.s === i ? o.splice(a, 1) : 0 === l && n.pr < r && (l = a + 1);
                o.splice(l, 0, {
                    c: e,
                    s: i,
                    up: s,
                    pr: r
                }), this !== d || m || d.wake()
            }, n.removeEventListener = function (t, e) {
                var i, s = this._listeners[t];
                if (s)
                    for (i = s.length; - 1 < --i;)
                        if (s[i].c === e) return void s.splice(i, 1)
            }, n.dispatchEvent = function (t) {
                var e, i, s, r = this._listeners[t];
                if (r)
                    for (e = r.length, i = this._eventTarget; - 1 < --e;)(s = r[e]) && (s.up ? s.c.call(s.s || i, {
                        type: t,
                        target: i
                    }) : s.c.call(s.s || i))
            };
            var S = _.requestAnimationFrame,
                D = _.cancelAnimationFrame,
                O = Date.now || function () {
                    return (new Date).getTime()
                },
                R = O();
            for (r = (s = ["ms", "moz", "webkit", "o"]).length; - 1 < --r && !S;) S = _[s[r] + "RequestAnimationFrame"], D = _[s[r] + "CancelAnimationFrame"] || _[s[r] + "CancelRequestAnimationFrame"];
            f("Ticker", function (t, e) {
                var r, n, a, o, l, h = this,
                    u = O(),
                    i = !(!1 === e || !S) && "auto",
                    c = 500,
                    f = 33,
                    _ = function (t) {
                        var e, i, s = O() - R;
                        c < s && (u += s - f), R += s, h.time = (R - u) / 1e3, e = h.time - l, (!r || 0 < e || !0 === t) && (h.frame++ , l += e + (o <= e ? .004 : o - e), i = !0), !0 !== t && (a = n(_)), i && h.dispatchEvent("tick")
                    };
                P.call(h), h.time = h.frame = 0, h.tick = function () {
                    _(!0)
                }, h.lagSmoothing = function (t, e) {
                    c = t || 1e10, f = Math.min(e, c, 0)
                }, h.sleep = function () {
                    null != a && (i && D ? D(a) : clearTimeout(a), n = y, a = null, h === d && (m = !1))
                }, h.wake = function (t) {
                    null !== a ? h.sleep() : t ? u += -R + (R = O()) : 10 < h.frame && (R = O() - c + 5), n = 0 === r ? y : i && S ? S : function (t) {
                        return setTimeout(t, 1e3 * (l - h.time) + 1 | 0)
                    }, h === d && (m = !0), _(2)
                }, h.fps = function (t) {
                    return arguments.length ? (o = 1 / ((r = t) || 60), l = this.time + o, void h.wake()) : r
                }, h.useRAF = function (t) {
                    return arguments.length ? (h.sleep(), i = t, void h.fps(r)) : i
                }, h.fps(t), setTimeout(function () {
                    "auto" === i && h.frame < 5 && "hidden" !== document.visibilityState && h.useRAF(!1)
                }, 1500)
            }), (n = c.Ticker.prototype = new c.events.EventDispatcher).constructor = c.Ticker;
            var C = f("core.Animation", function (t, e) {
                if (this.vars = e = e || {}, this._duration = this._totalDuration = t || 0, this._delay = Number(e.delay) || 0, this._timeScale = 1, this._active = !0 === e.immediateRender, this.data = e.data, this._reversed = !0 === e.reversed, Z) {
                    m || d.wake();
                    var i = this.vars.useFrames ? H : Z;
                    i.add(this, i._time), this.vars.paused && this.paused(!0)
                }
            });
            d = C.ticker = new c.Ticker, (n = C.prototype)._dirty = n._gc = n._initted = n._paused = !1, n._totalTime = n._time = 0, n._rawPrevTime = -1, n._next = n._last = n._onUpdate = n._timeline = n.timeline = null, n._paused = !1;
            var M = function () {
                m && 2e3 < O() - R && d.wake(), setTimeout(M, 2e3)
            };
            M(), n.play = function (t, e) {
                return null != t && this.seek(t, e), this.reversed(!1).paused(!1)
            }, n.pause = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!0)
            }, n.resume = function (t, e) {
                return null != t && this.seek(t, e), this.paused(!1)
            }, n.seek = function (t, e) {
                return this.totalTime(Number(t), !1 !== e)
            }, n.restart = function (t, e) {
                return this.reversed(!1).paused(!1).totalTime(t ? -this._delay : 0, !1 !== e, !0)
            }, n.reverse = function (t, e) {
                return null != t && this.seek(t || this.totalDuration(), e), this.reversed(!0).paused(!1)
            }, n.render = function (t, e, i) { }, n.invalidate = function () {
                return this._time = this._totalTime = 0, this._initted = this._gc = !1, this._rawPrevTime = -1, (this._gc || !this.timeline) && this._enabled(!0), this
            }, n.isActive = function () {
                var t, e = this._timeline,
                    i = this._startTime;
                return !e || !this._gc && !this._paused && e.isActive() && (t = e.rawTime()) >= i && t < i + this.totalDuration() / this._timeScale
            }, n._enabled = function (t, e) {
                return m || d.wake(), this._gc = !t, this._active = this.isActive(), !0 !== e && (t && !this.timeline ? this._timeline.add(this, this._startTime - this._delay) : !t && this.timeline && this._timeline._remove(this, !0)), !1
            }, n._kill = function (t, e) {
                return this._enabled(!1, !1)
            }, n.kill = function (t, e) {
                return this._kill(t, e), this
            }, n._uncache = function (t) {
                for (var e = t ? this : this.timeline; e;) e._dirty = !0, e = e.timeline;
                return this
            }, n._swapSelfInParams = function (t) {
                for (var e = t.length, i = t.concat(); - 1 < --e;) "{self}" === t[e] && (i[e] = this);
                return i
            }, n._callback = function (t) {
                var e = this.vars;
                e[t].apply(e[t + "Scope"] || e.callbackScope || this, e[t + "Params"] || h)
            }, n.eventCallback = function (t, e, i, s) {
                if ("on" === (t || "").substr(0, 2)) {
                    var r = this.vars;
                    if (1 === arguments.length) return r[t];
                    null == e ? delete r[t] : (r[t] = e, r[t + "Params"] = b(i) && -1 !== i.join("").indexOf("{self}") ? this._swapSelfInParams(i) : i, r[t + "Scope"] = s), "onUpdate" === t && (this._onUpdate = e)
                }
                return this
            }, n.delay = function (t) {
                return arguments.length ? (this._timeline.smoothChildTiming && this.startTime(this._startTime + t - this._delay), this._delay = t, this) : this._delay
            }, n.duration = function (t) {
                return arguments.length ? (this._duration = this._totalDuration = t, this._uncache(!0), this._timeline.smoothChildTiming && 0 < this._time && this._time < this._duration && 0 !== t && this.totalTime(this._totalTime * (t / this._duration), !0), this) : (this._dirty = !1, this._duration)
            }, n.totalDuration = function (t) {
                return this._dirty = !1, arguments.length ? this.duration(t) : this._totalDuration
            }, n.time = function (t, e) {
                return arguments.length ? (this._dirty && this.totalDuration(), this.totalTime(t > this._duration ? this._duration : t, e)) : this._time
            }, n.totalTime = function (t, e, i) {
                if (m || d.wake(), !arguments.length) return this._totalTime;
                if (this._timeline) {
                    if (t < 0 && !i && (t += this.totalDuration()), this._timeline.smoothChildTiming) {
                        this._dirty && this.totalDuration();
                        var s = this._totalDuration,
                            r = this._timeline;
                        if (s < t && !i && (t = s), this._startTime = (this._paused ? this._pauseTime : r._time) - (this._reversed ? s - t : t) / this._timeScale, r._dirty || this._uncache(!1), r._timeline)
                            for (; r._timeline;) r._timeline._time !== (r._startTime + r._totalTime) / r._timeScale && r.totalTime(r._totalTime, !0), r = r._timeline
                    }
                    this._gc && this._enabled(!0, !1), (this._totalTime !== t || 0 === this._duration) && (I.length && G(), this.render(t, e, !1), I.length && G())
                }
                return this
            }, n.progress = n.totalProgress = function (t, e) {
                var i = this.duration();
                return arguments.length ? this.totalTime(i * t, e) : i ? this._time / i : this.ratio
            }, n.startTime = function (t) {
                return arguments.length ? (t !== this._startTime && (this._startTime = t, this.timeline && this.timeline._sortChildren && this.timeline.add(this, t - this._delay)), this) : this._startTime
            }, n.endTime = function (t) {
                return this._startTime + (0 != t ? this.totalDuration() : this.duration()) / this._timeScale
            }, n.timeScale = function (t) {
                if (!arguments.length) return this._timeScale;
                if (t = t || v, this._timeline && this._timeline.smoothChildTiming) {
                    var e = this._pauseTime,
                        i = e || 0 === e ? e : this._timeline.totalTime();
                    this._startTime = i - (i - this._startTime) * this._timeScale / t
                }
                return this._timeScale = t, this._uncache(!1)
            }, n.reversed = function (t) {
                return arguments.length ? (t != this._reversed && (this._reversed = t, this.totalTime(this._timeline && !this._timeline.smoothChildTiming ? this.totalDuration() - this._totalTime : this._totalTime, !0)), this) : this._reversed
            }, n.paused = function (t) {
                if (!arguments.length) return this._paused;
                var e, i, s = this._timeline;
                return t != this._paused && s && (m || t || d.wake(), i = (e = s.rawTime()) - this._pauseTime, !t && s.smoothChildTiming && (this._startTime += i, this._uncache(!1)), this._pauseTime = t ? e : null, this._paused = t, this._active = this.isActive(), !t && 0 !== i && this._initted && this.duration() && (e = s.smoothChildTiming ? this._totalTime : (e - this._startTime) / this._timeScale, this.render(e, e === this._totalTime, !0))), this._gc && !t && this._enabled(!0, !1), this
            };
            var A = f("core.SimpleTimeline", function (t) {
                C.call(this, 0, t), this.autoRemoveChildren = this.smoothChildTiming = !0
            });
            (n = A.prototype = new C).constructor = A, n.kill()._gc = !1, n._first = n._last = n._recent = null, n._sortChildren = !1, n.add = n.insert = function (t, e, i, s) {
                var r, n;
                if (t._startTime = Number(e || 0) + t._delay, t._paused && this !== t._timeline && (t._pauseTime = t._startTime + (this.rawTime() - t._startTime) / t._timeScale), t.timeline && t.timeline._remove(t, !0), t.timeline = t._timeline = this, t._gc && t._enabled(!0, !0), r = this._last, this._sortChildren)
                    for (n = t._startTime; r && r._startTime > n;) r = r._prev;
                return r ? (t._next = r._next, r._next = t) : (t._next = this._first, this._first = t), t._next ? t._next._prev = t : this._last = t, t._prev = r, this._recent = t, this._timeline && this._uncache(!0), this
            }, n._remove = function (t, e) {
                return t.timeline === this && (e || t._enabled(!1, !0), t._prev ? t._prev._next = t._next : this._first === t && (this._first = t._next), t._next ? t._next._prev = t._prev : this._last === t && (this._last = t._prev), t._next = t._prev = t.timeline = null, t === this._recent && (this._recent = this._last), this._timeline && this._uncache(!0)), this
            }, n.render = function (t, e, i) {
                var s, r = this._first;
                for (this._totalTime = this._time = this._rawPrevTime = t; r;) s = r._next, (r._active || t >= r._startTime && !r._paused) && (r._reversed ? r.render((r._dirty ? r.totalDuration() : r._totalDuration) - (t - r._startTime) * r._timeScale, e, i) : r.render((t - r._startTime) * r._timeScale, e, i)), r = s
            }, n.rawTime = function () {
                return m || d.wake(), this._totalTime
            };
            var N = f("TweenLite", function (t, e, i) {
                if (C.call(this, e, i), this.render = N.prototype.render, null == t) throw "Cannot tween a null target.";
                this.target = t = "string" != typeof t ? t : N.selector(t) || t;
                var s, r, n, a = t.jquery || t.length && t !== _ && t[0] && (t[0] === _ || t[0].nodeType && t[0].style && !t.nodeType),
                    o = this.vars.overwrite;
                if (this._overwrite = o = null == o ? U[N.defaultOverwrite] : "number" == typeof o ? o >> 0 : U[o], (a || t instanceof Array || t.push && b(t)) && "number" != typeof t[0])
                    for (this._targets = n = l(t), this._propLookup = [], this._siblings = [], s = 0; s < n.length; s++)(r = n[s]) ? "string" != typeof r ? r.length && r !== _ && r[0] && (r[0] === _ || r[0].nodeType && r[0].style && !r.nodeType) ? (n.splice(s--, 1), this._targets = n = n.concat(l(r))) : (this._siblings[s] = Q(r, this, !1), 1 === o && 1 < this._siblings[s].length && K(r, this, null, 1, this._siblings[s])) : "string" == typeof (r = n[s--] = N.selector(r)) && n.splice(s + 1, 1) : n.splice(s--, 1);
                else this._propLookup = {}, this._siblings = Q(t, this, !1), 1 === o && 1 < this._siblings.length && K(t, this, null, 1, this._siblings);
                (this.vars.immediateRender || 0 === e && 0 === this._delay && !1 !== this.vars.immediateRender) && (this._time = -v, this.render(Math.min(0, -this._delay)))
            }, !0),
                z = function (t) {
                    return t && t.length && t !== _ && t[0] && (t[0] === _ || t[0].nodeType && t[0].style && !t.nodeType)
                };
            (n = N.prototype = new C).constructor = N, n.kill()._gc = !1, n.ratio = 0, n._firstPT = n._targets = n._overwrittenProps = n._startAt = null, n._notifyPluginsOfEnabled = n._lazy = !1, N.version = "1.18.4", N.defaultEase = n._ease = new u(null, null, 1, 1), N.defaultOverwrite = "auto", N.ticker = d, N.autoSleep = 120, N.lagSmoothing = function (t, e) {
                d.lagSmoothing(t, e)
            }, N.selector = _.$ || _.jQuery || function (t) {
                var e = _.$ || _.jQuery;
                return e ? (N.selector = e)(t) : "undefined" == typeof document ? t : document.querySelectorAll ? document.querySelectorAll(t) : document.getElementById("#" === t.charAt(0) ? t.substr(1) : t)
            };
            var I = [],
                E = {},
                F = /(?:(-|-=|\+=)?\d*\.?\d*(?:e[\-+]?\d+)?)[0-9]/gi,
                L = function (t) {
                    for (var e, i = this._firstPT; i;) e = i.blob ? t ? this.join("") : this.start : i.c * t + i.s, i.r ? e = Math.round(e) : e < 1e-6 && -1e-6 < e && (e = 0), i.f ? i.fp ? i.t[i.p](i.fp, e) : i.t[i.p](e) : i.t[i.p] = e, i = i._next
                },
                X = function (t, e, i, s) {
                    var r, n, a, o, l, h, u, c = [t, e],
                        f = 0,
                        _ = "",
                        p = 0;
                    for (c.start = t, i && (i(c), t = c[0], e = c[1]), c.length = 0, r = t.match(F) || [], n = e.match(F) || [], s && (s._next = null, s.blob = 1, c._firstPT = s), l = n.length, o = 0; o < l; o++) u = n[o], _ += (h = e.substr(f, e.indexOf(u, f) - f)) || !o ? h : ",", f += h.length, p ? p = (p + 1) % 5 : "rgba(" === h.substr(-5) && (p = 1), u === r[o] || r.length <= o ? _ += u : (_ && (c.push(_), _ = ""), a = parseFloat(r[o]), c.push(a), c._firstPT = {
                        _next: c._firstPT,
                        t: c,
                        p: c.length - 1,
                        s: a,
                        c: ("=" === u.charAt(1) ? parseInt(u.charAt(0) + "1", 10) * parseFloat(u.substr(2)) : parseFloat(u) - a) || 0,
                        f: 0,
                        r: p && p < 4
                    }), f += u.length;
                    return (_ += e.substr(f)) && c.push(_), c.setRatio = L, c
                },
                j = function (t, e, i, s, r, n, a, o) {
                    var l, h = "get" === i ? t[e] : i,
                        u = typeof t[e],
                        c = "string" == typeof s && "=" === s.charAt(1),
                        f = {
                            t: t,
                            p: e,
                            s: h,
                            f: "function" === u,
                            pg: 0,
                            n: r || e,
                            r: n,
                            pr: 0,
                            c: c ? parseInt(s.charAt(0) + "1", 10) * parseFloat(s.substr(2)) : parseFloat(s) - h || 0
                        };
                    return "number" !== u && ("function" === u && "get" === i && (l = e.indexOf("set") || "function" != typeof t["get" + e.substr(3)] ? e : "get" + e.substr(3), f.s = h = a ? t[l](a) : t[l]()), "string" == typeof h && (a || isNaN(h)) ? (f.fp = a, f = {
                        t: X(h, s, o || N.defaultStringFilter, f),
                        p: "setRatio",
                        s: 0,
                        c: 1,
                        f: 2,
                        pg: 0,
                        n: r || e,
                        pr: 0
                    }) : c || (f.s = parseFloat(h), f.c = parseFloat(s) - f.s || 0)), f.c ? ((f._next = this._firstPT) && (f._next._prev = f), this._firstPT = f) : void 0
                },
                Y = N._internals = {
                    isArray: b,
                    isSelector: z,
                    lazyTweens: I,
                    blobDif: X
                },
                B = N._plugins = {},
                q = Y.tweenLookup = {},
                W = 0,
                V = Y.reservedProps = {
                    ease: 1,
                    delay: 1,
                    overwrite: 1,
                    onComplete: 1,
                    onCompleteParams: 1,
                    onCompleteScope: 1,
                    useFrames: 1,
                    runBackwards: 1,
                    startAt: 1,
                    onUpdate: 1,
                    onUpdateParams: 1,
                    onUpdateScope: 1,
                    onStart: 1,
                    onStartParams: 1,
                    onStartScope: 1,
                    onReverseComplete: 1,
                    onReverseCompleteParams: 1,
                    onReverseCompleteScope: 1,
                    onRepeat: 1,
                    onRepeatParams: 1,
                    onRepeatScope: 1,
                    easeParams: 1,
                    yoyo: 1,
                    immediateRender: 1,
                    repeat: 1,
                    repeatDelay: 1,
                    data: 1,
                    paused: 1,
                    reversed: 1,
                    autoCSS: 1,
                    lazy: 1,
                    onOverwrite: 1,
                    callbackScope: 1,
                    stringFilter: 1
                },
                U = {
                    none: 0,
                    all: 1,
                    auto: 2,
                    concurrent: 3,
                    allOnStart: 4,
                    preexisting: 5,
                    true: 1,
                    false: 0
                },
                H = C._rootFramesTimeline = new A,
                Z = C._rootTimeline = new A,
                $ = 30,
                G = Y.lazyRender = function () {
                    var t, e = I.length;
                    for (E = {}; - 1 < --e;)(t = I[e]) && !1 !== t._lazy && (t.render(t._lazy[0], t._lazy[1], !0), t._lazy = !1);
                    I.length = 0
                };
            Z._startTime = d.time, H._startTime = d.frame, Z._active = H._active = !0, setTimeout(G, 1), C._updateRoot = N.render = function () {
                var t, e, i;
                if (I.length && G(), Z.render((d.time - Z._startTime) * Z._timeScale, !1, !1), H.render((d.frame - H._startTime) * H._timeScale, !1, !1), I.length && G(), d.frame >= $) {
                    for (i in $ = d.frame + (parseInt(N.autoSleep, 10) || 120), q) {
                        for (t = (e = q[i].tweens).length; - 1 < --t;) e[t]._gc && e.splice(t, 1);
                        0 === e.length && delete q[i]
                    }
                    if ((!(i = Z._first) || i._paused) && N.autoSleep && !H._first && 1 === d._listeners.tick.length) {
                        for (; i && i._paused;) i = i._next;
                        i || d.sleep()
                    }
                }
            }, d.addEventListener("tick", C._updateRoot);
            var Q = function (t, e, i) {
                var s, r, n = t._gsTweenID;
                if (q[n || (t._gsTweenID = n = "t" + W++)] || (q[n] = {
                    target: t,
                    tweens: []
                }), e && ((s = q[n].tweens)[r = s.length] = e, i))
                    for (; - 1 < --r;) s[r] === e && s.splice(r, 1);
                return q[n].tweens
            },
                J = function (t, e, i, s) {
                    var r, n, a = t.vars.onOverwrite;
                    return a && (r = a(t, e, i, s)), (a = N.onOverwrite) && (n = a(t, e, i, s)), !1 !== r && !1 !== n
                },
                K = function (t, e, i, s, r) {
                    var n, a, o, l;
                    if (1 === s || 4 <= s) {
                        for (l = r.length, n = 0; n < l; n++)
                            if ((o = r[n]) !== e) o._gc || o._kill(null, t, e) && (a = !0);
                            else if (5 === s) break;
                        return a
                    }
                    var h, u = e._startTime + v,
                        c = [],
                        f = 0,
                        _ = 0 === e._duration;
                    for (n = r.length; - 1 < --n;)(o = r[n]) === e || o._gc || o._paused || (o._timeline !== e._timeline ? (h = h || tt(e, 0, _), 0 === tt(o, h, _) && (c[f++] = o)) : o._startTime <= u && o._startTime + o.totalDuration() / o._timeScale > u && ((_ || !o._initted) && u - o._startTime <= 2e-10 || (c[f++] = o)));
                    for (n = f; - 1 < --n;)
                        if (o = c[n], 2 === s && o._kill(i, t, e) && (a = !0), 2 !== s || !o._firstPT && o._initted) {
                            if (2 !== s && !J(o, e)) continue;
                            o._enabled(!1, !1) && (a = !0)
                        } return a
                },
                tt = function (t, e, i) {
                    for (var s = t._timeline, r = s._timeScale, n = t._startTime; s._timeline;) {
                        if (n += s._startTime, r *= s._timeScale, s._paused) return -100;
                        s = s._timeline
                    }
                    return e < (n /= r) ? n - e : i && n === e || !t._initted && n - e < 2 * v ? v : (n += t.totalDuration() / t._timeScale / r) > e + v ? 0 : n - e - v
                };
            n._init = function () {
                var t, e, i, s, r, n = this.vars,
                    a = this._overwrittenProps,
                    o = this._duration,
                    l = !!n.immediateRender,
                    h = n.ease;
                if (n.startAt) {
                    for (s in this._startAt && (this._startAt.render(-1, !0), this._startAt.kill()), r = {}, n.startAt) r[s] = n.startAt[s];
                    if (r.overwrite = !1, r.immediateRender = !0, r.lazy = l && !1 !== n.lazy, r.startAt = r.delay = null, this._startAt = N.to(this.target, 0, r), l)
                        if (0 < this._time) this._startAt = null;
                        else if (0 !== o) return
                } else if (n.runBackwards && 0 !== o)
                    if (this._startAt) this._startAt.render(-1, !0), this._startAt.kill(), this._startAt = null;
                    else {
                        for (s in 0 !== this._time && (l = !1), i = {}, n) V[s] && "autoCSS" !== s || (i[s] = n[s]);
                        if (i.overwrite = 0, i.data = "isFromStart", i.lazy = l && !1 !== n.lazy, i.immediateRender = l, this._startAt = N.to(this.target, 0, i), l) {
                            if (0 === this._time) return
                        } else this._startAt._init(), this._startAt._enabled(!1), this.vars.immediateRender && (this._startAt = null)
                    } if (this._ease = h = h ? h instanceof u ? h : "function" == typeof h ? new u(h, n.easeParams) : T[h] || N.defaultEase : N.defaultEase, n.easeParams instanceof Array && h.config && (this._ease = h.config.apply(h, n.easeParams)), this._easeType = this._ease._type, this._easePower = this._ease._power, this._firstPT = null, this._targets)
                    for (t = this._targets.length; - 1 < --t;) this._initProps(this._targets[t], this._propLookup[t] = {}, this._siblings[t], a ? a[t] : null) && (e = !0);
                else e = this._initProps(this.target, this._propLookup, this._siblings, a);
                if (e && N._onPluginEvent("_onInitAllProps", this), a && (this._firstPT || "function" != typeof this.target && this._enabled(!1, !1)), n.runBackwards)
                    for (i = this._firstPT; i;) i.s += i.c, i.c = -i.c, i = i._next;
                this._onUpdate = n.onUpdate, this._initted = !0
            }, n._initProps = function (t, e, i, s) {
                var r, n, a, o, l, h;
                if (null == t) return !1;
                for (r in E[t._gsTweenID] && G(), this.vars.css || t.style && t !== _ && t.nodeType && B.css && !1 !== this.vars.autoCSS && function (t, e) {
                    var i, s = {};
                    for (i in t) V[i] || i in e && "transform" !== i && "x" !== i && "y" !== i && "width" !== i && "height" !== i && "className" !== i && "border" !== i || !(!B[i] || B[i] && B[i]._autoCSS) || (s[i] = t[i], delete t[i]);
                    t.css = s
                }(this.vars, t), this.vars)
                    if (h = this.vars[r], V[r]) h && (h instanceof Array || h.push && b(h)) && -1 !== h.join("").indexOf("{self}") && (this.vars[r] = h = this._swapSelfInParams(h, this));
                    else if (B[r] && (o = new B[r])._onInitTween(t, this.vars[r], this)) {
                        for (this._firstPT = l = {
                            _next: this._firstPT,
                            t: o,
                            p: "setRatio",
                            s: 0,
                            c: 1,
                            f: 1,
                            n: r,
                            pg: 1,
                            pr: o._priority
                        }, n = o._overwriteProps.length; - 1 < --n;) e[o._overwriteProps[n]] = this._firstPT;
                        (o._priority || o._onInitAllProps) && (a = !0), (o._onDisable || o._onEnable) && (this._notifyPluginsOfEnabled = !0), l._next && (l._next._prev = l)
                    } else e[r] = j.call(this, t, r, "get", h, r, 0, null, this.vars.stringFilter);
                return s && this._kill(s, t) ? this._initProps(t, e, i, s) : 1 < this._overwrite && this._firstPT && 1 < i.length && K(t, this, e, this._overwrite, i) ? (this._kill(e, t), this._initProps(t, e, i, s)) : (this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration) && (E[t._gsTweenID] = !0), a)
            }, n.render = function (t, e, i) {
                var s, r, n, a, o = this._time,
                    l = this._duration,
                    h = this._rawPrevTime;
                if (l - 1e-7 <= t) this._totalTime = this._time = l, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (s = !0, r = "onComplete", i = i || this._timeline.autoRemoveChildren), 0 === l && (this._initted || !this.vars.lazy || i) && (this._startTime === this._timeline._duration && (t = 0), (h < 0 || t <= 0 && -1e-7 <= t || h === v && "isPause" !== this.data) && h !== t && (i = !0, v < h && (r = "onReverseComplete")), this._rawPrevTime = a = !e || t || h === t ? t : v);
                else if (t < 1e-7) this._totalTime = this._time = 0, this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0, (0 !== o || 0 === l && 0 < h) && (r = "onReverseComplete", s = this._reversed), t < 0 && (this._active = !1, 0 === l && (this._initted || !this.vars.lazy || i) && (0 <= h && (h !== v || "isPause" !== this.data) && (i = !0), this._rawPrevTime = a = !e || t || h === t ? t : v)), this._initted || (i = !0);
                else if (this._totalTime = this._time = t, this._easeType) {
                    var u = t / l,
                        c = this._easeType,
                        f = this._easePower;
                    (1 === c || 3 === c && .5 <= u) && (u = 1 - u), 3 === c && (u *= 2), 1 === f ? u *= u : 2 === f ? u *= u * u : 3 === f ? u *= u * u * u : 4 === f && (u *= u * u * u * u), this.ratio = 1 === c ? 1 - u : 2 === c ? u : t / l < .5 ? u / 2 : 1 - u / 2
                } else this.ratio = this._ease.getRatio(t / l);
                if (this._time !== o || i) {
                    if (!this._initted) {
                        if (this._init(), !this._initted || this._gc) return;
                        if (!i && this._firstPT && (!1 !== this.vars.lazy && this._duration || this.vars.lazy && !this._duration)) return this._time = this._totalTime = o, this._rawPrevTime = h, I.push(this), void (this._lazy = [t, e]);
                        this._time && !s ? this.ratio = this._ease.getRatio(this._time / l) : s && this._ease._calcEnd && (this.ratio = this._ease.getRatio(0 === this._time ? 0 : 1))
                    }
                    for (!1 !== this._lazy && (this._lazy = !1), this._active || !this._paused && this._time !== o && 0 <= t && (this._active = !0), 0 === o && (this._startAt && (0 <= t ? this._startAt.render(t, e, i) : r || (r = "_dummyGS")), this.vars.onStart && (0 !== this._time || 0 === l) && (e || this._callback("onStart"))), n = this._firstPT; n;) n.f ? n.t[n.p](n.c * this.ratio + n.s) : n.t[n.p] = n.c * this.ratio + n.s, n = n._next;
                    this._onUpdate && (t < 0 && this._startAt && -1e-4 !== t && this._startAt.render(t, e, i), e || (this._time !== o || s || i) && this._callback("onUpdate")), r && (!this._gc || i) && (t < 0 && this._startAt && !this._onUpdate && -1e-4 !== t && this._startAt.render(t, e, i), s && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), !e && this.vars[r] && this._callback(r), 0 === l && this._rawPrevTime === v && a !== v && (this._rawPrevTime = 0))
                }
            }, n._kill = function (t, e, i) {
                if ("all" === t && (t = null), null == t && (null == e || e === this.target)) return this._lazy = !1, this._enabled(!1, !1);
                e = "string" != typeof e ? e || this._targets || this.target : N.selector(e) || e;
                var s, r, n, a, o, l, h, u, c, f = i && this._time && i._startTime === this._startTime && this._timeline === i._timeline;
                if ((b(e) || z(e)) && "number" != typeof e[0])
                    for (s = e.length; - 1 < --s;) this._kill(t, e[s], i) && (l = !0);
                else {
                    if (this._targets) {
                        for (s = this._targets.length; - 1 < --s;)
                            if (e === this._targets[s]) {
                                o = this._propLookup[s] || {}, this._overwrittenProps = this._overwrittenProps || [], r = this._overwrittenProps[s] = t ? this._overwrittenProps[s] || {} : "all";
                                break
                            }
                    } else {
                        if (e !== this.target) return !1;
                        o = this._propLookup, r = this._overwrittenProps = t ? this._overwrittenProps || {} : "all"
                    }
                    if (o) {
                        if (h = t || o, u = t !== r && "all" !== r && t !== o && ("object" != typeof t || !t._tempKill), i && (N.onOverwrite || this.vars.onOverwrite)) {
                            for (n in h) o[n] && (c || (c = []), c.push(n));
                            if ((c || !t) && !J(this, i, e, c)) return !1
                        }
                        for (n in h) (a = o[n]) && (f && (a.f ? a.t[a.p](a.s) : a.t[a.p] = a.s, l = !0), a.pg && a.t._kill(h) && (l = !0), a.pg && 0 !== a.t._overwriteProps.length || (a._prev ? a._prev._next = a._next : a === this._firstPT && (this._firstPT = a._next), a._next && (a._next._prev = a._prev), a._next = a._prev = null), delete o[n]), u && (r[n] = 1);
                        !this._firstPT && this._initted && this._enabled(!1, !1)
                    }
                }
                return l
            }, n.invalidate = function () {
                return this._notifyPluginsOfEnabled && N._onPluginEvent("_onDisable", this), this._firstPT = this._overwrittenProps = this._startAt = this._onUpdate = null, this._notifyPluginsOfEnabled = this._active = this._lazy = !1, this._propLookup = this._targets ? {} : [], C.prototype.invalidate.call(this), this.vars.immediateRender && (this._time = -v, this.render(Math.min(0, -this._delay))), this
            }, n._enabled = function (t, e) {
                if (m || d.wake(), t && this._gc) {
                    var i, s = this._targets;
                    if (s)
                        for (i = s.length; - 1 < --i;) this._siblings[i] = Q(s[i], this, !0);
                    else this._siblings = Q(this.target, this, !0)
                }
                return C.prototype._enabled.call(this, t, e), !(!this._notifyPluginsOfEnabled || !this._firstPT) && N._onPluginEvent(t ? "_onEnable" : "_onDisable", this)
            }, N.to = function (t, e, i) {
                return new N(t, e, i)
            }, N.from = function (t, e, i) {
                return i.runBackwards = !0, i.immediateRender = 0 != i.immediateRender, new N(t, e, i)
            }, N.fromTo = function (t, e, i, s) {
                return s.startAt = i, s.immediateRender = 0 != s.immediateRender && 0 != i.immediateRender, new N(t, e, s)
            }, N.delayedCall = function (t, e, i, s, r) {
                return new N(e, 0, {
                    delay: t,
                    onComplete: e,
                    onCompleteParams: i,
                    callbackScope: s,
                    onReverseComplete: e,
                    onReverseCompleteParams: i,
                    immediateRender: !1,
                    lazy: !1,
                    useFrames: r,
                    overwrite: 0
                })
            }, N.set = function (t, e) {
                return new N(t, 0, e)
            }, N.getTweensOf = function (t, e) {
                if (null == t) return [];
                var i, s, r, n;
                if (t = "string" != typeof t ? t : N.selector(t) || t, (b(t) || z(t)) && "number" != typeof t[0]) {
                    for (i = t.length, s = []; - 1 < --i;) s = s.concat(N.getTweensOf(t[i], e));
                    for (i = s.length; - 1 < --i;)
                        for (n = s[i], r = i; - 1 < --r;) n === s[r] && s.splice(i, 1)
                } else
                    for (i = (s = Q(t).concat()).length; - 1 < --i;)(s[i]._gc || e && !s[i].isActive()) && s.splice(i, 1);
                return s
            }, N.killTweensOf = N.killDelayedCallsTo = function (t, e, i) {
                "object" == typeof e && (i = e, e = !1);
                for (var s = N.getTweensOf(t, e), r = s.length; - 1 < --r;) s[r]._kill(i, t)
            };
            var et = f("plugins.TweenPlugin", function (t, e) {
                this._overwriteProps = (t || "").split(","), this._propName = this._overwriteProps[0], this._priority = e || 0, this._super = et.prototype
            }, !0);
            if (n = et.prototype, et.version = "1.18.0", et.API = 2, n._firstPT = null, n._addTween = j, n.setRatio = L, n._kill = function (t) {
                var e, i = this._overwriteProps,
                    s = this._firstPT;
                if (null != t[this._propName]) this._overwriteProps = [];
                else
                    for (e = i.length; - 1 < --e;) null != t[i[e]] && i.splice(e, 1);
                for (; s;) null != t[s.n] && (s._next && (s._next._prev = s._prev), s._prev ? (s._prev._next = s._next, s._prev = null) : this._firstPT === s && (this._firstPT = s._next)), s = s._next;
                return !1
            }, n._roundProps = function (t, e) {
                for (var i = this._firstPT; i;)(t[this._propName] || null != i.n && t[i.n.split(this._propName + "_").join("")]) && (i.r = e), i = i._next
            }, N._onPluginEvent = function (t, e) {
                var i, s, r, n, a, o = e._firstPT;
                if ("_onInitAllProps" === t) {
                    for (; o;) {
                        for (a = o._next, s = r; s && s.pr > o.pr;) s = s._next;
                        (o._prev = s ? s._prev : n) ? o._prev._next = o : r = o, (o._next = s) ? s._prev = o : n = o, o = a
                    }
                    o = e._firstPT = r
                }
                for (; o;) o.pg && "function" == typeof o.t[t] && o.t[t]() && (i = !0), o = o._next;
                return i
            }, et.activate = function (t) {
                for (var e = t.length; - 1 < --e;) t[e].API === et.API && (B[(new t[e])._propName] = t[e]);
                return !0
            }, a.plugin = function (t) {
                if (!(t && t.propName && t.init && t.API)) throw "illegal plugin definition.";
                var e, i = t.propName,
                    s = t.priority || 0,
                    r = t.overwriteProps,
                    n = {
                        init: "_onInitTween",
                        set: "setRatio",
                        kill: "_kill",
                        round: "_roundProps",
                        initAll: "_onInitAllProps"
                    },
                    a = f("plugins." + i.charAt(0).toUpperCase() + i.substr(1) + "Plugin", function () {
                        et.call(this, i, s), this._overwriteProps = r || []
                    }, !0 === t.global),
                    o = a.prototype = new et(i);
                for (e in (o.constructor = a).API = t.API, n) "function" == typeof t[e] && (o[n[e]] = t[e]);
                return a.version = t.version, et.activate([a]), a
            }, s = _._gsQueue) {
                for (r = 0; r < s.length; r++) s[r]();
                for (n in w) w[n].func || _.console.log("GSAP encountered missing dependency: com.greensock." + n)
            }
            m = !1
        }
    }("undefined" != typeof module && module.exports && "undefined" != typeof global ? global : this || window);
var scroll_target = null,
    touchMove = function (t) {
        var e = (t = t || window.event).target || t.srcElement;
        if (console.log(e), e !== scroll_target) return t.returnValue = !1, t.cancelBubble = !0, t.preventDefault && (t.preventDefault(), t.stopPropagation()), !1
    };

function enableScroll(t) {
    removeClass(t, "js-scroll-disabled"), isMobileTablet || setCSS(t, {
        "max-height": "",
        overflow: ""
    })
}

function disableScroll(t) {
    addClass(t, "js-scroll-disabled"), isMobileTablet || setCSS(t, {
        "max-height": "100%",
        overflow: "hidden"
    })
}

function mobileAndTabletcheck() {
    var t, e = !1;
    return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
}

function mobilecheck() {
    var t, e = !1;
    return t = navigator.userAgent || navigator.vendor || window.opera, (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(t) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(t.substr(0, 4))) && (e = !0), e
}

function removeHovers() {
    forEach(document.querySelectorAll(".g-hover"), function (t) {
        removeClass(t, "g-hover")
    })
}

function cropImages(t) {
    t || (t = document), forEach(t.querySelectorAll(".g-crop-image"), function (t, e) {
        cropImage(t)
    })
}

function cropImage(t) {
    var e = t.querySelector("img");
    e && (console.log(e), removeClass(t, "m-fill-height"), removeClass(t, "m-fill-width"), addClass(t, "g-crop-image-fallback"), addClass(t, parseFloat(window.getComputedStyle(e).height) < parseFloat(window.getComputedStyle(t).height) ? "m-fill-height" : "m-fill-width"))
}

function checkBrowser() {
    var t = document.body;
    isIE && t.classList.add("ie"), isEdge && t.classList.add("edge"), isSafari && t.classList.add("safari"), isFirefox && t.classList.add("firefox"), isChromeIOS && t.classList.add("safari"), isSafariIOS && t.classList.add("safari"), isFirefoxIOS && t.classList.add("safari"), isAndroid && t.classList.add("android")
}

function stagger(t, i, s, r) {
    r || (r = function () {
        return !0
    }), forEach(t, function (t, e) {
        0 < e ? setTimeout(function () {
            r() && i(t)
        }, s * e) : i(t)
    })
}
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
/*
     _ _      _       _
 ___| (_) ___| | __  (_)___
/ __| | |/ __| |/ /  | / __|
\__ \ | | (__|   < _ | \__ \
|___/_|_|\___|_|\_(_)/ |___/
                   |__/

 Version: 1.8.0
  Author: Ken Wheeler
 Website: http://kenwheeler.github.io
    Docs: http://kenwheeler.github.io/slick
    Repo: http://github.com/kenwheeler/slick
  Issues: http://github.com/kenwheeler/slick/issues

 */
/* global window, document, define, jQuery, setInterval, clearInterval */
;(function(factory) {
    'use strict';
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else if (typeof exports !== 'undefined') {
        module.exports = factory(require('jquery'));
    } else {
        factory(jQuery);
    }

}(function($) {
    'use strict';
    var Slick = window.Slick || {};

    Slick = (function() {

        var instanceUid = 0;

        function Slick(element, settings) {

            var _ = this, dataSettings;

            _.defaults = {
                accessibility: true,
                adaptiveHeight: false,
                appendArrows: $(element),
                appendDots: $(element),
                arrows: true,
                asNavFor: null,
                prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                autoplay: false,
                autoplaySpeed: 3000,
                centerMode: false,
                centerPadding: '50px',
                cssEase: 'ease',
                customPaging: function(slider, i) {
                    return $('<button type="button" />').text(i + 1);
                },
                dots: false,
                dotsClass: 'slick-dots',
                draggable: true,
                easing: 'linear',
                edgeFriction: 0.35,
                fade: false,
                focusOnSelect: false,
                focusOnChange: false,
                infinite: true,
                initialSlide: 0,
                lazyLoad: 'ondemand',
                mobileFirst: false,
                pauseOnHover: true,
                pauseOnFocus: true,
                pauseOnDotsHover: false,
                respondTo: 'window',
                responsive: null,
                rows: 1,
                rtl: false,
                slide: '',
                slidesPerRow: 1,
                slidesToShow: 1,
                slidesToScroll: 1,
                speed: 500,
                swipe: true,
                swipeToSlide: false,
                touchMove: true,
                touchThreshold: 5,
                useCSS: true,
                useTransform: true,
                variableWidth: false,
                vertical: false,
                verticalSwiping: false,
                waitForAnimate: true,
                zIndex: 1000
            };

            _.initials = {
                animating: false,
                dragging: false,
                autoPlayTimer: null,
                currentDirection: 0,
                currentLeft: null,
                currentSlide: 0,
                direction: 1,
                $dots: null,
                listWidth: null,
                listHeight: null,
                loadIndex: 0,
                $nextArrow: null,
                $prevArrow: null,
                scrolling: false,
                slideCount: null,
                slideWidth: null,
                $slideTrack: null,
                $slides: null,
                sliding: false,
                slideOffset: 0,
                swipeLeft: null,
                swiping: false,
                $list: null,
                touchObject: {},
                transformsEnabled: false,
                unslicked: false
            };

            $.extend(_, _.initials);

            _.activeBreakpoint = null;
            _.animType = null;
            _.animProp = null;
            _.breakpoints = [];
            _.breakpointSettings = [];
            _.cssTransitions = false;
            _.focussed = false;
            _.interrupted = false;
            _.hidden = 'hidden';
            _.paused = true;
            _.positionProp = null;
            _.respondTo = null;
            _.rowCount = 1;
            _.shouldClick = true;
            _.$slider = $(element);
            _.$slidesCache = null;
            _.transformType = null;
            _.transitionType = null;
            _.visibilityChange = 'visibilitychange';
            _.windowWidth = 0;
            _.windowTimer = null;

            dataSettings = $(element).data('slick') || {};

            _.options = $.extend({}, _.defaults, settings, dataSettings);

            _.currentSlide = _.options.initialSlide;

            _.originalSettings = _.options;

            if (typeof document.mozHidden !== 'undefined') {
                _.hidden = 'mozHidden';
                _.visibilityChange = 'mozvisibilitychange';
            } else if (typeof document.webkitHidden !== 'undefined') {
                _.hidden = 'webkitHidden';
                _.visibilityChange = 'webkitvisibilitychange';
            }

            _.autoPlay = $.proxy(_.autoPlay, _);
            _.autoPlayClear = $.proxy(_.autoPlayClear, _);
            _.autoPlayIterator = $.proxy(_.autoPlayIterator, _);
            _.changeSlide = $.proxy(_.changeSlide, _);
            _.clickHandler = $.proxy(_.clickHandler, _);
            _.selectHandler = $.proxy(_.selectHandler, _);
            _.setPosition = $.proxy(_.setPosition, _);
            _.swipeHandler = $.proxy(_.swipeHandler, _);
            _.dragHandler = $.proxy(_.dragHandler, _);
            _.keyHandler = $.proxy(_.keyHandler, _);

            _.instanceUid = instanceUid++;

            // A simple way to check for HTML strings
            // Strict HTML recognition (must start with <)
            // Extracted from jQuery v1.11 source
            _.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/;


            _.registerBreakpoints();
            _.init(true);

        }

        return Slick;

    }());

    Slick.prototype.activateADA = function() {
        var _ = this;

        _.$slideTrack.find('.slick-active').attr({
            'aria-hidden': 'false'
        }).find('a, input, button, select').attr({
            'tabindex': '0'
        });

    };

    Slick.prototype.addSlide = Slick.prototype.slickAdd = function(markup, index, addBefore) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            addBefore = index;
            index = null;
        } else if (index < 0 || (index >= _.slideCount)) {
            return false;
        }

        _.unload();

        if (typeof(index) === 'number') {
            if (index === 0 && _.$slides.length === 0) {
                $(markup).appendTo(_.$slideTrack);
            } else if (addBefore) {
                $(markup).insertBefore(_.$slides.eq(index));
            } else {
                $(markup).insertAfter(_.$slides.eq(index));
            }
        } else {
            if (addBefore === true) {
                $(markup).prependTo(_.$slideTrack);
            } else {
                $(markup).appendTo(_.$slideTrack);
            }
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slides.each(function(index, element) {
            $(element).attr('data-slick-index', index);
        });

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.animateHeight = function() {
        var _ = this;
        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.animate({
                height: targetHeight
            }, _.options.speed);
        }
    };

    Slick.prototype.animateSlide = function(targetLeft, callback) {

        var animProps = {},
            _ = this;

        _.animateHeight();

        if (_.options.rtl === true && _.options.vertical === false) {
            targetLeft = -targetLeft;
        }
        if (_.transformsEnabled === false) {
            if (_.options.vertical === false) {
                _.$slideTrack.animate({
                    left: targetLeft
                }, _.options.speed, _.options.easing, callback);
            } else {
                _.$slideTrack.animate({
                    top: targetLeft
                }, _.options.speed, _.options.easing, callback);
            }

        } else {

            if (_.cssTransitions === false) {
                if (_.options.rtl === true) {
                    _.currentLeft = -(_.currentLeft);
                }
                $({
                    animStart: _.currentLeft
                }).animate({
                    animStart: targetLeft
                }, {
                    duration: _.options.speed,
                    easing: _.options.easing,
                    step: function(now) {
                        now = Math.ceil(now);
                        if (_.options.vertical === false) {
                            animProps[_.animType] = 'translate(' +
                                now + 'px, 0px)';
                            _.$slideTrack.css(animProps);
                        } else {
                            animProps[_.animType] = 'translate(0px,' +
                                now + 'px)';
                            _.$slideTrack.css(animProps);
                        }
                    },
                    complete: function() {
                        if (callback) {
                            callback.call();
                        }
                    }
                });

            } else {

                _.applyTransition();
                targetLeft = Math.ceil(targetLeft);

                if (_.options.vertical === false) {
                    animProps[_.animType] = 'translate3d(' + targetLeft + 'px, 0px, 0px)';
                } else {
                    animProps[_.animType] = 'translate3d(0px,' + targetLeft + 'px, 0px)';
                }
                _.$slideTrack.css(animProps);

                if (callback) {
                    setTimeout(function() {

                        _.disableTransition();

                        callback.call();
                    }, _.options.speed);
                }

            }

        }

    };

    Slick.prototype.getNavTarget = function() {

        var _ = this,
            asNavFor = _.options.asNavFor;

        if ( asNavFor && asNavFor !== null ) {
            asNavFor = $(asNavFor).not(_.$slider);
        }

        return asNavFor;

    };

    Slick.prototype.asNavFor = function(index) {

        var _ = this,
            asNavFor = _.getNavTarget();

        if ( asNavFor !== null && typeof asNavFor === 'object' ) {
            asNavFor.each(function() {
                var target = $(this).slick('getSlick');
                if(!target.unslicked) {
                    target.slideHandler(index, true);
                }
            });
        }

    };

    Slick.prototype.applyTransition = function(slide) {

        var _ = this,
            transition = {};

        if (_.options.fade === false) {
            transition[_.transitionType] = _.transformType + ' ' + _.options.speed + 'ms ' + _.options.cssEase;
        } else {
            transition[_.transitionType] = 'opacity ' + _.options.speed + 'ms ' + _.options.cssEase;
        }

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.autoPlay = function() {

        var _ = this;

        _.autoPlayClear();

        if ( _.slideCount > _.options.slidesToShow ) {
            _.autoPlayTimer = setInterval( _.autoPlayIterator, _.options.autoplaySpeed );
        }

    };

    Slick.prototype.autoPlayClear = function() {

        var _ = this;

        if (_.autoPlayTimer) {
            clearInterval(_.autoPlayTimer);
        }

    };

    Slick.prototype.autoPlayIterator = function() {

        var _ = this,
            slideTo = _.currentSlide + _.options.slidesToScroll;

        if ( !_.paused && !_.interrupted && !_.focussed ) {

            if ( _.options.infinite === false ) {

                if ( _.direction === 1 && ( _.currentSlide + 1 ) === ( _.slideCount - 1 )) {
                    _.direction = 0;
                }

                else if ( _.direction === 0 ) {

                    slideTo = _.currentSlide - _.options.slidesToScroll;

                    if ( _.currentSlide - 1 === 0 ) {
                        _.direction = 1;
                    }

                }

            }

            _.slideHandler( slideTo );

        }

    };

    Slick.prototype.buildArrows = function() {

        var _ = this;

        if (_.options.arrows === true ) {

            _.$prevArrow = $(_.options.prevArrow).addClass('slick-arrow');
            _.$nextArrow = $(_.options.nextArrow).addClass('slick-arrow');

            if( _.slideCount > _.options.slidesToShow ) {

                _.$prevArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');
                _.$nextArrow.removeClass('slick-hidden').removeAttr('aria-hidden tabindex');

                if (_.htmlExpr.test(_.options.prevArrow)) {
                    _.$prevArrow.prependTo(_.options.appendArrows);
                }

                if (_.htmlExpr.test(_.options.nextArrow)) {
                    _.$nextArrow.appendTo(_.options.appendArrows);
                }

                if (_.options.infinite !== true) {
                    _.$prevArrow
                        .addClass('slick-disabled')
                        .attr('aria-disabled', 'true');
                }

            } else {

                _.$prevArrow.add( _.$nextArrow )

                    .addClass('slick-hidden')
                    .attr({
                        'aria-disabled': 'true',
                        'tabindex': '-1'
                    });

            }

        }

    };

    Slick.prototype.buildDots = function() {

        var _ = this,
            i, dot;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$slider.addClass('slick-dotted');

            dot = $('<ul />').addClass(_.options.dotsClass);

            for (i = 0; i <= _.getDotCount(); i += 1) {
                dot.append($('<li />').append(_.options.customPaging.call(this, _, i)));
            }

            _.$dots = dot.appendTo(_.options.appendDots);

            _.$dots.find('li').first().addClass('slick-active');

        }

    };

    Slick.prototype.buildOut = function() {

        var _ = this;

        _.$slides =
            _.$slider
                .children( _.options.slide + ':not(.slick-cloned)')
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        _.$slides.each(function(index, element) {
            $(element)
                .attr('data-slick-index', index)
                .data('originalStyling', $(element).attr('style') || '');
        });

        _.$slider.addClass('slick-slider');

        _.$slideTrack = (_.slideCount === 0) ?
            $('<div class="slick-track"/>').appendTo(_.$slider) :
            _.$slides.wrapAll('<div class="slick-track"/>').parent();

        _.$list = _.$slideTrack.wrap(
            '<div class="slick-list"/>').parent();
        _.$slideTrack.css('opacity', 0);

        if (_.options.centerMode === true || _.options.swipeToSlide === true) {
            _.options.slidesToScroll = 1;
        }

        $('img[data-lazy]', _.$slider).not('[src]').addClass('slick-loading');

        _.setupInfinite();

        _.buildArrows();

        _.buildDots();

        _.updateDots();


        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        if (_.options.draggable === true) {
            _.$list.addClass('draggable');
        }

    };

    Slick.prototype.buildRows = function() {

        var _ = this, a, b, c, newSlides, numOfSlides, originalSlides,slidesPerSection;

        newSlides = document.createDocumentFragment();
        originalSlides = _.$slider.children();

        if(_.options.rows > 0) {

            slidesPerSection = _.options.slidesPerRow * _.options.rows;
            numOfSlides = Math.ceil(
                originalSlides.length / slidesPerSection
            );

            for(a = 0; a < numOfSlides; a++){
                var slide = document.createElement('div');
                for(b = 0; b < _.options.rows; b++) {
                    var row = document.createElement('div');
                    for(c = 0; c < _.options.slidesPerRow; c++) {
                        var target = (a * slidesPerSection + ((b * _.options.slidesPerRow) + c));
                        if (originalSlides.get(target)) {
                            row.appendChild(originalSlides.get(target));
                        }
                    }
                    slide.appendChild(row);
                }
                newSlides.appendChild(slide);
            }

            _.$slider.empty().append(newSlides);
            _.$slider.children().children().children()
                .css({
                    'width':(100 / _.options.slidesPerRow) + '%',
                    'display': 'inline-block'
                });

        }

    };

    Slick.prototype.checkResponsive = function(initial, forceUpdate) {

        var _ = this,
            breakpoint, targetBreakpoint, respondToWidth, triggerBreakpoint = false;
        var sliderWidth = _.$slider.width();
        var windowWidth = window.innerWidth || $(window).width();

        if (_.respondTo === 'window') {
            respondToWidth = windowWidth;
        } else if (_.respondTo === 'slider') {
            respondToWidth = sliderWidth;
        } else if (_.respondTo === 'min') {
            respondToWidth = Math.min(windowWidth, sliderWidth);
        }

        if ( _.options.responsive &&
            _.options.responsive.length &&
            _.options.responsive !== null) {

            targetBreakpoint = null;

            for (breakpoint in _.breakpoints) {
                if (_.breakpoints.hasOwnProperty(breakpoint)) {
                    if (_.originalSettings.mobileFirst === false) {
                        if (respondToWidth < _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    } else {
                        if (respondToWidth > _.breakpoints[breakpoint]) {
                            targetBreakpoint = _.breakpoints[breakpoint];
                        }
                    }
                }
            }

            if (targetBreakpoint !== null) {
                if (_.activeBreakpoint !== null) {
                    if (targetBreakpoint !== _.activeBreakpoint || forceUpdate) {
                        _.activeBreakpoint =
                            targetBreakpoint;
                        if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                            _.unslick(targetBreakpoint);
                        } else {
                            _.options = $.extend({}, _.originalSettings,
                                _.breakpointSettings[
                                    targetBreakpoint]);
                            if (initial === true) {
                                _.currentSlide = _.options.initialSlide;
                            }
                            _.refresh(initial);
                        }
                        triggerBreakpoint = targetBreakpoint;
                    }
                } else {
                    _.activeBreakpoint = targetBreakpoint;
                    if (_.breakpointSettings[targetBreakpoint] === 'unslick') {
                        _.unslick(targetBreakpoint);
                    } else {
                        _.options = $.extend({}, _.originalSettings,
                            _.breakpointSettings[
                                targetBreakpoint]);
                        if (initial === true) {
                            _.currentSlide = _.options.initialSlide;
                        }
                        _.refresh(initial);
                    }
                    triggerBreakpoint = targetBreakpoint;
                }
            } else {
                if (_.activeBreakpoint !== null) {
                    _.activeBreakpoint = null;
                    _.options = _.originalSettings;
                    if (initial === true) {
                        _.currentSlide = _.options.initialSlide;
                    }
                    _.refresh(initial);
                    triggerBreakpoint = targetBreakpoint;
                }
            }

            // only trigger breakpoints during an actual break. not on initialize.
            if( !initial && triggerBreakpoint !== false ) {
                _.$slider.trigger('breakpoint', [_, triggerBreakpoint]);
            }
        }

    };

    Slick.prototype.changeSlide = function(event, dontAnimate) {

        var _ = this,
            $target = $(event.currentTarget),
            indexOffset, slideOffset, unevenOffset;

        // If target is a link, prevent default action.
        if($target.is('a')) {
            event.preventDefault();
        }

        // If target is not the <li> element (ie: a child), find the <li>.
        if(!$target.is('li')) {
            $target = $target.closest('li');
        }

        unevenOffset = (_.slideCount % _.options.slidesToScroll !== 0);
        indexOffset = unevenOffset ? 0 : (_.slideCount - _.currentSlide) % _.options.slidesToScroll;

        switch (event.data.message) {

            case 'previous':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : _.options.slidesToShow - indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide - slideOffset, false, dontAnimate);
                }
                break;

            case 'next':
                slideOffset = indexOffset === 0 ? _.options.slidesToScroll : indexOffset;
                if (_.slideCount > _.options.slidesToShow) {
                    _.slideHandler(_.currentSlide + slideOffset, false, dontAnimate);
                }
                break;

            case 'index':
                var index = event.data.index === 0 ? 0 :
                    event.data.index || $target.index() * _.options.slidesToScroll;

                _.slideHandler(_.checkNavigable(index), false, dontAnimate);
                $target.children().trigger('focus');
                break;

            default:
                return;
        }

    };

    Slick.prototype.checkNavigable = function(index) {

        var _ = this,
            navigables, prevNavigable;

        navigables = _.getNavigableIndexes();
        prevNavigable = 0;
        if (index > navigables[navigables.length - 1]) {
            index = navigables[navigables.length - 1];
        } else {
            for (var n in navigables) {
                if (index < navigables[n]) {
                    index = prevNavigable;
                    break;
                }
                prevNavigable = navigables[n];
            }
        }

        return index;
    };

    Slick.prototype.cleanUpEvents = function() {

        var _ = this;

        if (_.options.dots && _.$dots !== null) {

            $('li', _.$dots)
                .off('click.slick', _.changeSlide)
                .off('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .off('mouseleave.slick', $.proxy(_.interrupt, _, false));

            if (_.options.accessibility === true) {
                _.$dots.off('keydown.slick', _.keyHandler);
            }
        }

        _.$slider.off('focus.slick blur.slick');

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow && _.$prevArrow.off('click.slick', _.changeSlide);
            _.$nextArrow && _.$nextArrow.off('click.slick', _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow && _.$prevArrow.off('keydown.slick', _.keyHandler);
                _.$nextArrow && _.$nextArrow.off('keydown.slick', _.keyHandler);
            }
        }

        _.$list.off('touchstart.slick mousedown.slick', _.swipeHandler);
        _.$list.off('touchmove.slick mousemove.slick', _.swipeHandler);
        _.$list.off('touchend.slick mouseup.slick', _.swipeHandler);
        _.$list.off('touchcancel.slick mouseleave.slick', _.swipeHandler);

        _.$list.off('click.slick', _.clickHandler);

        $(document).off(_.visibilityChange, _.visibility);

        _.cleanUpSlideEvents();

        if (_.options.accessibility === true) {
            _.$list.off('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().off('click.slick', _.selectHandler);
        }

        $(window).off('orientationchange.slick.slick-' + _.instanceUid, _.orientationChange);

        $(window).off('resize.slick.slick-' + _.instanceUid, _.resize);

        $('[draggable!=true]', _.$slideTrack).off('dragstart', _.preventDefault);

        $(window).off('load.slick.slick-' + _.instanceUid, _.setPosition);

    };

    Slick.prototype.cleanUpSlideEvents = function() {

        var _ = this;

        _.$list.off('mouseenter.slick', $.proxy(_.interrupt, _, true));
        _.$list.off('mouseleave.slick', $.proxy(_.interrupt, _, false));

    };

    Slick.prototype.cleanUpRows = function() {

        var _ = this, originalSlides;

        if(_.options.rows > 0) {
            originalSlides = _.$slides.children().children();
            originalSlides.removeAttr('style');
            _.$slider.empty().append(originalSlides);
        }

    };

    Slick.prototype.clickHandler = function(event) {

        var _ = this;

        if (_.shouldClick === false) {
            event.stopImmediatePropagation();
            event.stopPropagation();
            event.preventDefault();
        }

    };

    Slick.prototype.destroy = function(refresh) {

        var _ = this;

        _.autoPlayClear();

        _.touchObject = {};

        _.cleanUpEvents();

        $('.slick-cloned', _.$slider).detach();

        if (_.$dots) {
            _.$dots.remove();
        }

        if ( _.$prevArrow && _.$prevArrow.length ) {

            _.$prevArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.prevArrow )) {
                _.$prevArrow.remove();
            }
        }

        if ( _.$nextArrow && _.$nextArrow.length ) {

            _.$nextArrow
                .removeClass('slick-disabled slick-arrow slick-hidden')
                .removeAttr('aria-hidden aria-disabled tabindex')
                .css('display','');

            if ( _.htmlExpr.test( _.options.nextArrow )) {
                _.$nextArrow.remove();
            }
        }


        if (_.$slides) {

            _.$slides
                .removeClass('slick-slide slick-active slick-center slick-visible slick-current')
                .removeAttr('aria-hidden')
                .removeAttr('data-slick-index')
                .each(function(){
                    $(this).attr('style', $(this).data('originalStyling'));
                });

            _.$slideTrack.children(this.options.slide).detach();

            _.$slideTrack.detach();

            _.$list.detach();

            _.$slider.append(_.$slides);
        }

        _.cleanUpRows();

        _.$slider.removeClass('slick-slider');
        _.$slider.removeClass('slick-initialized');
        _.$slider.removeClass('slick-dotted');

        _.unslicked = true;

        if(!refresh) {
            _.$slider.trigger('destroy', [_]);
        }

    };

    Slick.prototype.disableTransition = function(slide) {

        var _ = this,
            transition = {};

        transition[_.transitionType] = '';

        if (_.options.fade === false) {
            _.$slideTrack.css(transition);
        } else {
            _.$slides.eq(slide).css(transition);
        }

    };

    Slick.prototype.fadeSlide = function(slideIndex, callback) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).css({
                zIndex: _.options.zIndex
            });

            _.$slides.eq(slideIndex).animate({
                opacity: 1
            }, _.options.speed, _.options.easing, callback);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 1,
                zIndex: _.options.zIndex
            });

            if (callback) {
                setTimeout(function() {

                    _.disableTransition(slideIndex);

                    callback.call();
                }, _.options.speed);
            }

        }

    };

    Slick.prototype.fadeSlideOut = function(slideIndex) {

        var _ = this;

        if (_.cssTransitions === false) {

            _.$slides.eq(slideIndex).animate({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            }, _.options.speed, _.options.easing);

        } else {

            _.applyTransition(slideIndex);

            _.$slides.eq(slideIndex).css({
                opacity: 0,
                zIndex: _.options.zIndex - 2
            });

        }

    };

    Slick.prototype.filterSlides = Slick.prototype.slickFilter = function(filter) {

        var _ = this;

        if (filter !== null) {

            _.$slidesCache = _.$slides;

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.filter(filter).appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.focusHandler = function() {

        var _ = this;

        _.$slider
            .off('focus.slick blur.slick')
            .on('focus.slick blur.slick', '*', function(event) {

            event.stopImmediatePropagation();
            var $sf = $(this);

            setTimeout(function() {

                if( _.options.pauseOnFocus ) {
                    _.focussed = $sf.is(':focus');
                    _.autoPlay();
                }

            }, 0);

        });
    };

    Slick.prototype.getCurrent = Slick.prototype.slickCurrentSlide = function() {

        var _ = this;
        return _.currentSlide;

    };

    Slick.prototype.getDotCount = function() {

        var _ = this;

        var breakPoint = 0;
        var counter = 0;
        var pagerQty = 0;

        if (_.options.infinite === true) {
            if (_.slideCount <= _.options.slidesToShow) {
                 ++pagerQty;
            } else {
                while (breakPoint < _.slideCount) {
                    ++pagerQty;
                    breakPoint = counter + _.options.slidesToScroll;
                    counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
                }
            }
        } else if (_.options.centerMode === true) {
            pagerQty = _.slideCount;
        } else if(!_.options.asNavFor) {
            pagerQty = 1 + Math.ceil((_.slideCount - _.options.slidesToShow) / _.options.slidesToScroll);
        }else {
            while (breakPoint < _.slideCount) {
                ++pagerQty;
                breakPoint = counter + _.options.slidesToScroll;
                counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
            }
        }

        return pagerQty - 1;

    };

    Slick.prototype.getLeft = function(slideIndex) {

        var _ = this,
            targetLeft,
            verticalHeight,
            verticalOffset = 0,
            targetSlide,
            coef;

        _.slideOffset = 0;
        verticalHeight = _.$slides.first().outerHeight(true);

        if (_.options.infinite === true) {
            if (_.slideCount > _.options.slidesToShow) {
                _.slideOffset = (_.slideWidth * _.options.slidesToShow) * -1;
                coef = -1

                if (_.options.vertical === true && _.options.centerMode === true) {
                    if (_.options.slidesToShow === 2) {
                        coef = -1.5;
                    } else if (_.options.slidesToShow === 1) {
                        coef = -2
                    }
                }
                verticalOffset = (verticalHeight * _.options.slidesToShow) * coef;
            }
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                if (slideIndex + _.options.slidesToScroll > _.slideCount && _.slideCount > _.options.slidesToShow) {
                    if (slideIndex > _.slideCount) {
                        _.slideOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * _.slideWidth) * -1;
                        verticalOffset = ((_.options.slidesToShow - (slideIndex - _.slideCount)) * verticalHeight) * -1;
                    } else {
                        _.slideOffset = ((_.slideCount % _.options.slidesToScroll) * _.slideWidth) * -1;
                        verticalOffset = ((_.slideCount % _.options.slidesToScroll) * verticalHeight) * -1;
                    }
                }
            }
        } else {
            if (slideIndex + _.options.slidesToShow > _.slideCount) {
                _.slideOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * _.slideWidth;
                verticalOffset = ((slideIndex + _.options.slidesToShow) - _.slideCount) * verticalHeight;
            }
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.slideOffset = 0;
            verticalOffset = 0;
        }

        if (_.options.centerMode === true && _.slideCount <= _.options.slidesToShow) {
            _.slideOffset = ((_.slideWidth * Math.floor(_.options.slidesToShow)) / 2) - ((_.slideWidth * _.slideCount) / 2);
        } else if (_.options.centerMode === true && _.options.infinite === true) {
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2) - _.slideWidth;
        } else if (_.options.centerMode === true) {
            _.slideOffset = 0;
            _.slideOffset += _.slideWidth * Math.floor(_.options.slidesToShow / 2);
        }

        if (_.options.vertical === false) {
            targetLeft = ((slideIndex * _.slideWidth) * -1) + _.slideOffset;
        } else {
            targetLeft = ((slideIndex * verticalHeight) * -1) + verticalOffset;
        }

        if (_.options.variableWidth === true) {

            if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
            } else {
                targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow);
            }

            if (_.options.rtl === true) {
                if (targetSlide[0]) {
                    targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                } else {
                    targetLeft =  0;
                }
            } else {
                targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
            }

            if (_.options.centerMode === true) {
                if (_.slideCount <= _.options.slidesToShow || _.options.infinite === false) {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex);
                } else {
                    targetSlide = _.$slideTrack.children('.slick-slide').eq(slideIndex + _.options.slidesToShow + 1);
                }

                if (_.options.rtl === true) {
                    if (targetSlide[0]) {
                        targetLeft = (_.$slideTrack.width() - targetSlide[0].offsetLeft - targetSlide.width()) * -1;
                    } else {
                        targetLeft =  0;
                    }
                } else {
                    targetLeft = targetSlide[0] ? targetSlide[0].offsetLeft * -1 : 0;
                }

                targetLeft += (_.$list.width() - targetSlide.outerWidth()) / 2;
            }
        }

        return targetLeft;

    };

    Slick.prototype.getOption = Slick.prototype.slickGetOption = function(option) {

        var _ = this;

        return _.options[option];

    };

    Slick.prototype.getNavigableIndexes = function() {

        var _ = this,
            breakPoint = 0,
            counter = 0,
            indexes = [],
            max;

        if (_.options.infinite === false) {
            max = _.slideCount;
        } else {
            breakPoint = _.options.slidesToScroll * -1;
            counter = _.options.slidesToScroll * -1;
            max = _.slideCount * 2;
        }

        while (breakPoint < max) {
            indexes.push(breakPoint);
            breakPoint = counter + _.options.slidesToScroll;
            counter += _.options.slidesToScroll <= _.options.slidesToShow ? _.options.slidesToScroll : _.options.slidesToShow;
        }

        return indexes;

    };

    Slick.prototype.getSlick = function() {

        return this;

    };

    Slick.prototype.getSlideCount = function() {

        var _ = this,
            slidesTraversed, swipedSlide, centerOffset;

        centerOffset = _.options.centerMode === true ? _.slideWidth * Math.floor(_.options.slidesToShow / 2) : 0;

        if (_.options.swipeToSlide === true) {
            _.$slideTrack.find('.slick-slide').each(function(index, slide) {
                if (slide.offsetLeft - centerOffset + ($(slide).outerWidth() / 2) > (_.swipeLeft * -1)) {
                    swipedSlide = slide;
                    return false;
                }
            });

            slidesTraversed = Math.abs($(swipedSlide).attr('data-slick-index') - _.currentSlide) || 1;

            return slidesTraversed;

        } else {
            return _.options.slidesToScroll;
        }

    };

    Slick.prototype.goTo = Slick.prototype.slickGoTo = function(slide, dontAnimate) {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'index',
                index: parseInt(slide)
            }
        }, dontAnimate);

    };

    Slick.prototype.init = function(creation) {

        var _ = this;

        if (!$(_.$slider).hasClass('slick-initialized')) {

            $(_.$slider).addClass('slick-initialized');

            _.buildRows();
            _.buildOut();
            _.setProps();
            _.startLoad();
            _.loadSlider();
            _.initializeEvents();
            _.updateArrows();
            _.updateDots();
            _.checkResponsive(true);
            _.focusHandler();

        }

        if (creation) {
            _.$slider.trigger('init', [_]);
        }

        if (_.options.accessibility === true) {
            _.initADA();
        }

        if ( _.options.autoplay ) {

            _.paused = false;
            _.autoPlay();

        }

    };

    Slick.prototype.initADA = function() {
        var _ = this,
                numDotGroups = Math.ceil(_.slideCount / _.options.slidesToShow),
                tabControlIndexes = _.getNavigableIndexes().filter(function(val) {
                    return (val >= 0) && (val < _.slideCount);
                });

        _.$slides.add(_.$slideTrack.find('.slick-cloned')).attr({
            'aria-hidden': 'true',
            'tabindex': '-1'
        }).find('a, input, button, select').attr({
            'tabindex': '-1'
        });

        if (_.$dots !== null) {
            _.$slides.not(_.$slideTrack.find('.slick-cloned')).each(function(i) {
                var slideControlIndex = tabControlIndexes.indexOf(i);

                $(this).attr({
                    'role': 'tabpanel',
                    'id': 'slick-slide' + _.instanceUid + i,
                    'tabindex': -1
                });

                if (slideControlIndex !== -1) {
                   var ariaButtonControl = 'slick-slide-control' + _.instanceUid + slideControlIndex
                   if ($('#' + ariaButtonControl).length) {
                     $(this).attr({
                         'aria-describedby': ariaButtonControl
                     });
                   }
                }
            });

            _.$dots.attr('role', 'tablist').find('li').each(function(i) {
                var mappedSlideIndex = tabControlIndexes[i];

                $(this).attr({
                    'role': 'presentation'
                });

                $(this).find('button').first().attr({
                    'role': 'tab',
                    'id': 'slick-slide-control' + _.instanceUid + i,
                    'aria-controls': 'slick-slide' + _.instanceUid + mappedSlideIndex,
                    'aria-label': (i + 1) + ' of ' + numDotGroups,
                    'aria-selected': null,
                    'tabindex': '-1'
                });

            }).eq(_.currentSlide).find('button').attr({
                'aria-selected': 'true',
                'tabindex': '0'
            }).end();
        }

        for (var i=_.currentSlide, max=i+_.options.slidesToShow; i < max; i++) {
          if (_.options.focusOnChange) {
            _.$slides.eq(i).attr({'tabindex': '0'});
          } else {
            _.$slides.eq(i).removeAttr('tabindex');
          }
        }

        _.activateADA();

    };

    Slick.prototype.initArrowEvents = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {
            _.$prevArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'previous'
               }, _.changeSlide);
            _.$nextArrow
               .off('click.slick')
               .on('click.slick', {
                    message: 'next'
               }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$prevArrow.on('keydown.slick', _.keyHandler);
                _.$nextArrow.on('keydown.slick', _.keyHandler);
            }
        }

    };

    Slick.prototype.initDotEvents = function() {

        var _ = this;

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {
            $('li', _.$dots).on('click.slick', {
                message: 'index'
            }, _.changeSlide);

            if (_.options.accessibility === true) {
                _.$dots.on('keydown.slick', _.keyHandler);
            }
        }

        if (_.options.dots === true && _.options.pauseOnDotsHover === true && _.slideCount > _.options.slidesToShow) {

            $('li', _.$dots)
                .on('mouseenter.slick', $.proxy(_.interrupt, _, true))
                .on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initSlideEvents = function() {

        var _ = this;

        if ( _.options.pauseOnHover ) {

            _.$list.on('mouseenter.slick', $.proxy(_.interrupt, _, true));
            _.$list.on('mouseleave.slick', $.proxy(_.interrupt, _, false));

        }

    };

    Slick.prototype.initializeEvents = function() {

        var _ = this;

        _.initArrowEvents();

        _.initDotEvents();
        _.initSlideEvents();

        _.$list.on('touchstart.slick mousedown.slick', {
            action: 'start'
        }, _.swipeHandler);
        _.$list.on('touchmove.slick mousemove.slick', {
            action: 'move'
        }, _.swipeHandler);
        _.$list.on('touchend.slick mouseup.slick', {
            action: 'end'
        }, _.swipeHandler);
        _.$list.on('touchcancel.slick mouseleave.slick', {
            action: 'end'
        }, _.swipeHandler);

        _.$list.on('click.slick', _.clickHandler);

        $(document).on(_.visibilityChange, $.proxy(_.visibility, _));

        if (_.options.accessibility === true) {
            _.$list.on('keydown.slick', _.keyHandler);
        }

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        $(window).on('orientationchange.slick.slick-' + _.instanceUid, $.proxy(_.orientationChange, _));

        $(window).on('resize.slick.slick-' + _.instanceUid, $.proxy(_.resize, _));

        $('[draggable!=true]', _.$slideTrack).on('dragstart', _.preventDefault);

        $(window).on('load.slick.slick-' + _.instanceUid, _.setPosition);
        $(_.setPosition);

    };

    Slick.prototype.initUI = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.show();
            _.$nextArrow.show();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.show();

        }

    };

    Slick.prototype.keyHandler = function(event) {

        var _ = this;
         //Dont slide if the cursor is inside the form fields and arrow keys are pressed
        if(!event.target.tagName.match('TEXTAREA|INPUT|SELECT')) {
            if (event.keyCode === 37 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'next' :  'previous'
                    }
                });
            } else if (event.keyCode === 39 && _.options.accessibility === true) {
                _.changeSlide({
                    data: {
                        message: _.options.rtl === true ? 'previous' : 'next'
                    }
                });
            }
        }

    };

    Slick.prototype.lazyLoad = function() {

        var _ = this,
            loadRange, cloneRange, rangeStart, rangeEnd;

        function loadImages(imagesScope) {

            $('img[data-lazy]', imagesScope).each(function() {

                var image = $(this),
                    imageSource = $(this).attr('data-lazy'),
                    imageSrcSet = $(this).attr('data-srcset'),
                    imageSizes  = $(this).attr('data-sizes') || _.$slider.attr('data-sizes'),
                    imageToLoad = document.createElement('img');

                imageToLoad.onload = function() {

                    image
                        .animate({ opacity: 0 }, 100, function() {

                            if (imageSrcSet) {
                                image
                                    .attr('srcset', imageSrcSet );

                                if (imageSizes) {
                                    image
                                        .attr('sizes', imageSizes );
                                }
                            }

                            image
                                .attr('src', imageSource)
                                .animate({ opacity: 1 }, 200, function() {
                                    image
                                        .removeAttr('data-lazy data-srcset data-sizes')
                                        .removeClass('slick-loading');
                                });
                            _.$slider.trigger('lazyLoaded', [_, image, imageSource]);
                        });

                };

                imageToLoad.onerror = function() {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                };

                imageToLoad.src = imageSource;

            });

        }

        if (_.options.centerMode === true) {
            if (_.options.infinite === true) {
                rangeStart = _.currentSlide + (_.options.slidesToShow / 2 + 1);
                rangeEnd = rangeStart + _.options.slidesToShow + 2;
            } else {
                rangeStart = Math.max(0, _.currentSlide - (_.options.slidesToShow / 2 + 1));
                rangeEnd = 2 + (_.options.slidesToShow / 2 + 1) + _.currentSlide;
            }
        } else {
            rangeStart = _.options.infinite ? _.options.slidesToShow + _.currentSlide : _.currentSlide;
            rangeEnd = Math.ceil(rangeStart + _.options.slidesToShow);
            if (_.options.fade === true) {
                if (rangeStart > 0) rangeStart--;
                if (rangeEnd <= _.slideCount) rangeEnd++;
            }
        }

        loadRange = _.$slider.find('.slick-slide').slice(rangeStart, rangeEnd);

        if (_.options.lazyLoad === 'anticipated') {
            var prevSlide = rangeStart - 1,
                nextSlide = rangeEnd,
                $slides = _.$slider.find('.slick-slide');

            for (var i = 0; i < _.options.slidesToScroll; i++) {
                if (prevSlide < 0) prevSlide = _.slideCount - 1;
                loadRange = loadRange.add($slides.eq(prevSlide));
                loadRange = loadRange.add($slides.eq(nextSlide));
                prevSlide--;
                nextSlide++;
            }
        }

        loadImages(loadRange);

        if (_.slideCount <= _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-slide');
            loadImages(cloneRange);
        } else
        if (_.currentSlide >= _.slideCount - _.options.slidesToShow) {
            cloneRange = _.$slider.find('.slick-cloned').slice(0, _.options.slidesToShow);
            loadImages(cloneRange);
        } else if (_.currentSlide === 0) {
            cloneRange = _.$slider.find('.slick-cloned').slice(_.options.slidesToShow * -1);
            loadImages(cloneRange);
        }

    };

    Slick.prototype.loadSlider = function() {

        var _ = this;

        _.setPosition();

        _.$slideTrack.css({
            opacity: 1
        });

        _.$slider.removeClass('slick-loading');

        _.initUI();

        if (_.options.lazyLoad === 'progressive') {
            _.progressiveLazyLoad();
        }

    };

    Slick.prototype.next = Slick.prototype.slickNext = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'next'
            }
        });

    };

    Slick.prototype.orientationChange = function() {

        var _ = this;

        _.checkResponsive();
        _.setPosition();

    };

    Slick.prototype.pause = Slick.prototype.slickPause = function() {

        var _ = this;

        _.autoPlayClear();
        _.paused = true;

    };

    Slick.prototype.play = Slick.prototype.slickPlay = function() {

        var _ = this;

        _.autoPlay();
        _.options.autoplay = true;
        _.paused = false;
        _.focussed = false;
        _.interrupted = false;

    };

    Slick.prototype.postSlide = function(index) {

        var _ = this;

        if( !_.unslicked ) {

            _.$slider.trigger('afterChange', [_, index]);

            _.animating = false;

            if (_.slideCount > _.options.slidesToShow) {
                _.setPosition();
            }

            _.swipeLeft = null;

            if ( _.options.autoplay ) {
                _.autoPlay();
            }

            if (_.options.accessibility === true) {
                _.initADA();

                if (_.options.focusOnChange) {
                    var $currentSlide = $(_.$slides.get(_.currentSlide));
                    $currentSlide.attr('tabindex', 0).focus();
                }
            }

        }

    };

    Slick.prototype.prev = Slick.prototype.slickPrev = function() {

        var _ = this;

        _.changeSlide({
            data: {
                message: 'previous'
            }
        });

    };

    Slick.prototype.preventDefault = function(event) {

        event.preventDefault();

    };

    Slick.prototype.progressiveLazyLoad = function( tryCount ) {

        tryCount = tryCount || 1;

        var _ = this,
            $imgsToLoad = $( 'img[data-lazy]', _.$slider ),
            image,
            imageSource,
            imageSrcSet,
            imageSizes,
            imageToLoad;

        if ( $imgsToLoad.length ) {

            image = $imgsToLoad.first();
            imageSource = image.attr('data-lazy');
            imageSrcSet = image.attr('data-srcset');
            imageSizes  = image.attr('data-sizes') || _.$slider.attr('data-sizes');
            imageToLoad = document.createElement('img');

            imageToLoad.onload = function() {

                if (imageSrcSet) {
                    image
                        .attr('srcset', imageSrcSet );

                    if (imageSizes) {
                        image
                            .attr('sizes', imageSizes );
                    }
                }

                image
                    .attr( 'src', imageSource )
                    .removeAttr('data-lazy data-srcset data-sizes')
                    .removeClass('slick-loading');

                if ( _.options.adaptiveHeight === true ) {
                    _.setPosition();
                }

                _.$slider.trigger('lazyLoaded', [ _, image, imageSource ]);
                _.progressiveLazyLoad();

            };

            imageToLoad.onerror = function() {

                if ( tryCount < 3 ) {

                    /**
                     * try to load the image 3 times,
                     * leave a slight delay so we don't get
                     * servers blocking the request.
                     */
                    setTimeout( function() {
                        _.progressiveLazyLoad( tryCount + 1 );
                    }, 500 );

                } else {

                    image
                        .removeAttr( 'data-lazy' )
                        .removeClass( 'slick-loading' )
                        .addClass( 'slick-lazyload-error' );

                    _.$slider.trigger('lazyLoadError', [ _, image, imageSource ]);

                    _.progressiveLazyLoad();

                }

            };

            imageToLoad.src = imageSource;

        } else {

            _.$slider.trigger('allImagesLoaded', [ _ ]);

        }

    };

    Slick.prototype.refresh = function( initializing ) {

        var _ = this, currentSlide, lastVisibleIndex;

        lastVisibleIndex = _.slideCount - _.options.slidesToShow;

        // in non-infinite sliders, we don't want to go past the
        // last visible index.
        if( !_.options.infinite && ( _.currentSlide > lastVisibleIndex )) {
            _.currentSlide = lastVisibleIndex;
        }

        // if less slides than to show, go to start.
        if ( _.slideCount <= _.options.slidesToShow ) {
            _.currentSlide = 0;

        }

        currentSlide = _.currentSlide;

        _.destroy(true);

        $.extend(_, _.initials, { currentSlide: currentSlide });

        _.init();

        if( !initializing ) {

            _.changeSlide({
                data: {
                    message: 'index',
                    index: currentSlide
                }
            }, false);

        }

    };

    Slick.prototype.registerBreakpoints = function() {

        var _ = this, breakpoint, currentBreakpoint, l,
            responsiveSettings = _.options.responsive || null;

        if ( $.type(responsiveSettings) === 'array' && responsiveSettings.length ) {

            _.respondTo = _.options.respondTo || 'window';

            for ( breakpoint in responsiveSettings ) {

                l = _.breakpoints.length-1;

                if (responsiveSettings.hasOwnProperty(breakpoint)) {
                    currentBreakpoint = responsiveSettings[breakpoint].breakpoint;

                    // loop through the breakpoints and cut out any existing
                    // ones with the same breakpoint number, we don't want dupes.
                    while( l >= 0 ) {
                        if( _.breakpoints[l] && _.breakpoints[l] === currentBreakpoint ) {
                            _.breakpoints.splice(l,1);
                        }
                        l--;
                    }

                    _.breakpoints.push(currentBreakpoint);
                    _.breakpointSettings[currentBreakpoint] = responsiveSettings[breakpoint].settings;

                }

            }

            _.breakpoints.sort(function(a, b) {
                return ( _.options.mobileFirst ) ? a-b : b-a;
            });

        }

    };

    Slick.prototype.reinit = function() {

        var _ = this;

        _.$slides =
            _.$slideTrack
                .children(_.options.slide)
                .addClass('slick-slide');

        _.slideCount = _.$slides.length;

        if (_.currentSlide >= _.slideCount && _.currentSlide !== 0) {
            _.currentSlide = _.currentSlide - _.options.slidesToScroll;
        }

        if (_.slideCount <= _.options.slidesToShow) {
            _.currentSlide = 0;
        }

        _.registerBreakpoints();

        _.setProps();
        _.setupInfinite();
        _.buildArrows();
        _.updateArrows();
        _.initArrowEvents();
        _.buildDots();
        _.updateDots();
        _.initDotEvents();
        _.cleanUpSlideEvents();
        _.initSlideEvents();

        _.checkResponsive(false, true);

        if (_.options.focusOnSelect === true) {
            $(_.$slideTrack).children().on('click.slick', _.selectHandler);
        }

        _.setSlideClasses(typeof _.currentSlide === 'number' ? _.currentSlide : 0);

        _.setPosition();
        _.focusHandler();

        _.paused = !_.options.autoplay;
        _.autoPlay();

        _.$slider.trigger('reInit', [_]);

    };

    Slick.prototype.resize = function() {

        var _ = this;

        if ($(window).width() !== _.windowWidth) {
            clearTimeout(_.windowDelay);
            _.windowDelay = window.setTimeout(function() {
                _.windowWidth = $(window).width();
                _.checkResponsive();
                if( !_.unslicked ) { _.setPosition(); }
            }, 50);
        }
    };

    Slick.prototype.removeSlide = Slick.prototype.slickRemove = function(index, removeBefore, removeAll) {

        var _ = this;

        if (typeof(index) === 'boolean') {
            removeBefore = index;
            index = removeBefore === true ? 0 : _.slideCount - 1;
        } else {
            index = removeBefore === true ? --index : index;
        }

        if (_.slideCount < 1 || index < 0 || index > _.slideCount - 1) {
            return false;
        }

        _.unload();

        if (removeAll === true) {
            _.$slideTrack.children().remove();
        } else {
            _.$slideTrack.children(this.options.slide).eq(index).remove();
        }

        _.$slides = _.$slideTrack.children(this.options.slide);

        _.$slideTrack.children(this.options.slide).detach();

        _.$slideTrack.append(_.$slides);

        _.$slidesCache = _.$slides;

        _.reinit();

    };

    Slick.prototype.setCSS = function(position) {

        var _ = this,
            positionProps = {},
            x, y;

        if (_.options.rtl === true) {
            position = -position;
        }
        x = _.positionProp == 'left' ? Math.ceil(position) + 'px' : '0px';
        y = _.positionProp == 'top' ? Math.ceil(position) + 'px' : '0px';

        positionProps[_.positionProp] = position;

        if (_.transformsEnabled === false) {
            _.$slideTrack.css(positionProps);
        } else {
            positionProps = {};
            if (_.cssTransitions === false) {
                positionProps[_.animType] = 'translate(' + x + ', ' + y + ')';
                _.$slideTrack.css(positionProps);
            } else {
                positionProps[_.animType] = 'translate3d(' + x + ', ' + y + ', 0px)';
                _.$slideTrack.css(positionProps);
            }
        }

    };

    Slick.prototype.setDimensions = function() {

        var _ = this;

        if (_.options.vertical === false) {
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: ('0px ' + _.options.centerPadding)
                });
            }
        } else {
            _.$list.height(_.$slides.first().outerHeight(true) * _.options.slidesToShow);
            if (_.options.centerMode === true) {
                _.$list.css({
                    padding: (_.options.centerPadding + ' 0px')
                });
            }
        }

        _.listWidth = _.$list.width();
        _.listHeight = _.$list.height();


        if (_.options.vertical === false && _.options.variableWidth === false) {
            _.slideWidth = Math.ceil(_.listWidth / _.options.slidesToShow);
            _.$slideTrack.width(Math.ceil((_.slideWidth * _.$slideTrack.children('.slick-slide').length)));

        } else if (_.options.variableWidth === true) {
            _.$slideTrack.width(5000 * _.slideCount);
        } else {
            _.slideWidth = Math.ceil(_.listWidth);
            _.$slideTrack.height(Math.ceil((_.$slides.first().outerHeight(true) * _.$slideTrack.children('.slick-slide').length)));
        }

        var offset = _.$slides.first().outerWidth(true) - _.$slides.first().width();
        if (_.options.variableWidth === false) _.$slideTrack.children('.slick-slide').width(_.slideWidth - offset);

    };

    Slick.prototype.setFade = function() {

        var _ = this,
            targetLeft;

        _.$slides.each(function(index, element) {
            targetLeft = (_.slideWidth * index) * -1;
            if (_.options.rtl === true) {
                $(element).css({
                    position: 'relative',
                    right: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            } else {
                $(element).css({
                    position: 'relative',
                    left: targetLeft,
                    top: 0,
                    zIndex: _.options.zIndex - 2,
                    opacity: 0
                });
            }
        });

        _.$slides.eq(_.currentSlide).css({
            zIndex: _.options.zIndex - 1,
            opacity: 1
        });

    };

    Slick.prototype.setHeight = function() {

        var _ = this;

        if (_.options.slidesToShow === 1 && _.options.adaptiveHeight === true && _.options.vertical === false) {
            var targetHeight = _.$slides.eq(_.currentSlide).outerHeight(true);
            _.$list.css('height', targetHeight);
        }

    };

    Slick.prototype.setOption =
    Slick.prototype.slickSetOption = function() {

        /**
         * accepts arguments in format of:
         *
         *  - for changing a single option's value:
         *     .slick("setOption", option, value, refresh )
         *
         *  - for changing a set of responsive options:
         *     .slick("setOption", 'responsive', [{}, ...], refresh )
         *
         *  - for updating multiple values at once (not responsive)
         *     .slick("setOption", { 'option': value, ... }, refresh )
         */

        var _ = this, l, item, option, value, refresh = false, type;

        if( $.type( arguments[0] ) === 'object' ) {

            option =  arguments[0];
            refresh = arguments[1];
            type = 'multiple';

        } else if ( $.type( arguments[0] ) === 'string' ) {

            option =  arguments[0];
            value = arguments[1];
            refresh = arguments[2];

            if ( arguments[0] === 'responsive' && $.type( arguments[1] ) === 'array' ) {

                type = 'responsive';

            } else if ( typeof arguments[1] !== 'undefined' ) {

                type = 'single';

            }

        }

        if ( type === 'single' ) {

            _.options[option] = value;


        } else if ( type === 'multiple' ) {

            $.each( option , function( opt, val ) {

                _.options[opt] = val;

            });


        } else if ( type === 'responsive' ) {

            for ( item in value ) {

                if( $.type( _.options.responsive ) !== 'array' ) {

                    _.options.responsive = [ value[item] ];

                } else {

                    l = _.options.responsive.length-1;

                    // loop through the responsive object and splice out duplicates.
                    while( l >= 0 ) {

                        if( _.options.responsive[l].breakpoint === value[item].breakpoint ) {

                            _.options.responsive.splice(l,1);

                        }

                        l--;

                    }

                    _.options.responsive.push( value[item] );

                }

            }

        }

        if ( refresh ) {

            _.unload();
            _.reinit();

        }

    };

    Slick.prototype.setPosition = function() {

        var _ = this;

        _.setDimensions();

        _.setHeight();

        if (_.options.fade === false) {
            _.setCSS(_.getLeft(_.currentSlide));
        } else {
            _.setFade();
        }

        _.$slider.trigger('setPosition', [_]);

    };

    Slick.prototype.setProps = function() {

        var _ = this,
            bodyStyle = document.body.style;

        _.positionProp = _.options.vertical === true ? 'top' : 'left';

        if (_.positionProp === 'top') {
            _.$slider.addClass('slick-vertical');
        } else {
            _.$slider.removeClass('slick-vertical');
        }

        if (bodyStyle.WebkitTransition !== undefined ||
            bodyStyle.MozTransition !== undefined ||
            bodyStyle.msTransition !== undefined) {
            if (_.options.useCSS === true) {
                _.cssTransitions = true;
            }
        }

        if ( _.options.fade ) {
            if ( typeof _.options.zIndex === 'number' ) {
                if( _.options.zIndex < 3 ) {
                    _.options.zIndex = 3;
                }
            } else {
                _.options.zIndex = _.defaults.zIndex;
            }
        }

        if (bodyStyle.OTransform !== undefined) {
            _.animType = 'OTransform';
            _.transformType = '-o-transform';
            _.transitionType = 'OTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.MozTransform !== undefined) {
            _.animType = 'MozTransform';
            _.transformType = '-moz-transform';
            _.transitionType = 'MozTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.MozPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.webkitTransform !== undefined) {
            _.animType = 'webkitTransform';
            _.transformType = '-webkit-transform';
            _.transitionType = 'webkitTransition';
            if (bodyStyle.perspectiveProperty === undefined && bodyStyle.webkitPerspective === undefined) _.animType = false;
        }
        if (bodyStyle.msTransform !== undefined) {
            _.animType = 'msTransform';
            _.transformType = '-ms-transform';
            _.transitionType = 'msTransition';
            if (bodyStyle.msTransform === undefined) _.animType = false;
        }
        if (bodyStyle.transform !== undefined && _.animType !== false) {
            _.animType = 'transform';
            _.transformType = 'transform';
            _.transitionType = 'transition';
        }
        _.transformsEnabled = _.options.useTransform && (_.animType !== null && _.animType !== false);
    };


    Slick.prototype.setSlideClasses = function(index) {

        var _ = this,
            centerOffset, allSlides, indexOffset, remainder;

        allSlides = _.$slider
            .find('.slick-slide')
            .removeClass('slick-active slick-center slick-current')
            .attr('aria-hidden', 'true');

        _.$slides
            .eq(index)
            .addClass('slick-current');

        if (_.options.centerMode === true) {

            var evenCoef = _.options.slidesToShow % 2 === 0 ? 1 : 0;

            centerOffset = Math.floor(_.options.slidesToShow / 2);

            if (_.options.infinite === true) {

                if (index >= centerOffset && index <= (_.slideCount - 1) - centerOffset) {
                    _.$slides
                        .slice(index - centerOffset + evenCoef, index + centerOffset + 1)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    indexOffset = _.options.slidesToShow + index;
                    allSlides
                        .slice(indexOffset - centerOffset + 1 + evenCoef, indexOffset + centerOffset + 2)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

                if (index === 0) {

                    allSlides
                        .eq(allSlides.length - 1 - _.options.slidesToShow)
                        .addClass('slick-center');

                } else if (index === _.slideCount - 1) {

                    allSlides
                        .eq(_.options.slidesToShow)
                        .addClass('slick-center');

                }

            }

            _.$slides
                .eq(index)
                .addClass('slick-center');

        } else {

            if (index >= 0 && index <= (_.slideCount - _.options.slidesToShow)) {

                _.$slides
                    .slice(index, index + _.options.slidesToShow)
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else if (allSlides.length <= _.options.slidesToShow) {

                allSlides
                    .addClass('slick-active')
                    .attr('aria-hidden', 'false');

            } else {

                remainder = _.slideCount % _.options.slidesToShow;
                indexOffset = _.options.infinite === true ? _.options.slidesToShow + index : index;

                if (_.options.slidesToShow == _.options.slidesToScroll && (_.slideCount - index) < _.options.slidesToShow) {

                    allSlides
                        .slice(indexOffset - (_.options.slidesToShow - remainder), indexOffset + remainder)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                } else {

                    allSlides
                        .slice(indexOffset, indexOffset + _.options.slidesToShow)
                        .addClass('slick-active')
                        .attr('aria-hidden', 'false');

                }

            }

        }

        if (_.options.lazyLoad === 'ondemand' || _.options.lazyLoad === 'anticipated') {
            _.lazyLoad();
        }
    };

    Slick.prototype.setupInfinite = function() {

        var _ = this,
            i, slideIndex, infiniteCount;

        if (_.options.fade === true) {
            _.options.centerMode = false;
        }

        if (_.options.infinite === true && _.options.fade === false) {

            slideIndex = null;

            if (_.slideCount > _.options.slidesToShow) {

                if (_.options.centerMode === true) {
                    infiniteCount = _.options.slidesToShow + 1;
                } else {
                    infiniteCount = _.options.slidesToShow;
                }

                for (i = _.slideCount; i > (_.slideCount -
                        infiniteCount); i -= 1) {
                    slideIndex = i - 1;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex - _.slideCount)
                        .prependTo(_.$slideTrack).addClass('slick-cloned');
                }
                for (i = 0; i < infiniteCount  + _.slideCount; i += 1) {
                    slideIndex = i;
                    $(_.$slides[slideIndex]).clone(true).attr('id', '')
                        .attr('data-slick-index', slideIndex + _.slideCount)
                        .appendTo(_.$slideTrack).addClass('slick-cloned');
                }
                _.$slideTrack.find('.slick-cloned').find('[id]').each(function() {
                    $(this).attr('id', '');
                });

            }

        }

    };

    Slick.prototype.interrupt = function( toggle ) {

        var _ = this;

        if( !toggle ) {
            _.autoPlay();
        }
        _.interrupted = toggle;

    };

    Slick.prototype.selectHandler = function(event) {

        var _ = this;

        var targetElement =
            $(event.target).is('.slick-slide') ?
                $(event.target) :
                $(event.target).parents('.slick-slide');

        var index = parseInt(targetElement.attr('data-slick-index'));

        if (!index) index = 0;

        if (_.slideCount <= _.options.slidesToShow) {

            _.slideHandler(index, false, true);
            return;

        }

        _.slideHandler(index);

    };

    Slick.prototype.slideHandler = function(index, sync, dontAnimate) {

        var targetSlide, animSlide, oldSlide, slideLeft, targetLeft = null,
            _ = this, navTarget;

        sync = sync || false;

        if (_.animating === true && _.options.waitForAnimate === true) {
            return;
        }

        if (_.options.fade === true && _.currentSlide === index) {
            return;
        }

        if (sync === false) {
            _.asNavFor(index);
        }

        targetSlide = index;
        targetLeft = _.getLeft(targetSlide);
        slideLeft = _.getLeft(_.currentSlide);

        _.currentLeft = _.swipeLeft === null ? slideLeft : _.swipeLeft;

        if (_.options.infinite === false && _.options.centerMode === false && (index < 0 || index > _.getDotCount() * _.options.slidesToScroll)) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        } else if (_.options.infinite === false && _.options.centerMode === true && (index < 0 || index > (_.slideCount - _.options.slidesToScroll))) {
            if (_.options.fade === false) {
                targetSlide = _.currentSlide;
                if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
                    _.animateSlide(slideLeft, function() {
                        _.postSlide(targetSlide);
                    });
                } else {
                    _.postSlide(targetSlide);
                }
            }
            return;
        }

        if ( _.options.autoplay ) {
            clearInterval(_.autoPlayTimer);
        }

        if (targetSlide < 0) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = _.slideCount - (_.slideCount % _.options.slidesToScroll);
            } else {
                animSlide = _.slideCount + targetSlide;
            }
        } else if (targetSlide >= _.slideCount) {
            if (_.slideCount % _.options.slidesToScroll !== 0) {
                animSlide = 0;
            } else {
                animSlide = targetSlide - _.slideCount;
            }
        } else {
            animSlide = targetSlide;
        }

        _.animating = true;

        _.$slider.trigger('beforeChange', [_, _.currentSlide, animSlide]);

        oldSlide = _.currentSlide;
        _.currentSlide = animSlide;

        _.setSlideClasses(_.currentSlide);

        if ( _.options.asNavFor ) {

            navTarget = _.getNavTarget();
            navTarget = navTarget.slick('getSlick');

            if ( navTarget.slideCount <= navTarget.options.slidesToShow ) {
                navTarget.setSlideClasses(_.currentSlide);
            }

        }

        _.updateDots();
        _.updateArrows();

        if (_.options.fade === true) {
            if (dontAnimate !== true) {

                _.fadeSlideOut(oldSlide);

                _.fadeSlide(animSlide, function() {
                    _.postSlide(animSlide);
                });

            } else {
                _.postSlide(animSlide);
            }
            _.animateHeight();
            return;
        }

        if (dontAnimate !== true && _.slideCount > _.options.slidesToShow) {
            _.animateSlide(targetLeft, function() {
                _.postSlide(animSlide);
            });
        } else {
            _.postSlide(animSlide);
        }

    };

    Slick.prototype.startLoad = function() {

        var _ = this;

        if (_.options.arrows === true && _.slideCount > _.options.slidesToShow) {

            _.$prevArrow.hide();
            _.$nextArrow.hide();

        }

        if (_.options.dots === true && _.slideCount > _.options.slidesToShow) {

            _.$dots.hide();

        }

        _.$slider.addClass('slick-loading');

    };

    Slick.prototype.swipeDirection = function() {

        var xDist, yDist, r, swipeAngle, _ = this;

        xDist = _.touchObject.startX - _.touchObject.curX;
        yDist = _.touchObject.startY - _.touchObject.curY;
        r = Math.atan2(yDist, xDist);

        swipeAngle = Math.round(r * 180 / Math.PI);
        if (swipeAngle < 0) {
            swipeAngle = 360 - Math.abs(swipeAngle);
        }

        if ((swipeAngle <= 45) && (swipeAngle >= 0)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle <= 360) && (swipeAngle >= 315)) {
            return (_.options.rtl === false ? 'left' : 'right');
        }
        if ((swipeAngle >= 135) && (swipeAngle <= 225)) {
            return (_.options.rtl === false ? 'right' : 'left');
        }
        if (_.options.verticalSwiping === true) {
            if ((swipeAngle >= 35) && (swipeAngle <= 135)) {
                return 'down';
            } else {
                return 'up';
            }
        }

        return 'vertical';

    };

    Slick.prototype.swipeEnd = function(event) {

        var _ = this,
            slideCount,
            direction;

        _.dragging = false;
        _.swiping = false;

        if (_.scrolling) {
            _.scrolling = false;
            return false;
        }

        _.interrupted = false;
        _.shouldClick = ( _.touchObject.swipeLength > 10 ) ? false : true;

        if ( _.touchObject.curX === undefined ) {
            return false;
        }

        if ( _.touchObject.edgeHit === true ) {
            _.$slider.trigger('edge', [_, _.swipeDirection() ]);
        }

        if ( _.touchObject.swipeLength >= _.touchObject.minSwipe ) {

            direction = _.swipeDirection();

            switch ( direction ) {

                case 'left':
                case 'down':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide + _.getSlideCount() ) :
                            _.currentSlide + _.getSlideCount();

                    _.currentDirection = 0;

                    break;

                case 'right':
                case 'up':

                    slideCount =
                        _.options.swipeToSlide ?
                            _.checkNavigable( _.currentSlide - _.getSlideCount() ) :
                            _.currentSlide - _.getSlideCount();

                    _.currentDirection = 1;

                    break;

                default:


            }

            if( direction != 'vertical' ) {

                _.slideHandler( slideCount );
                _.touchObject = {};
                _.$slider.trigger('swipe', [_, direction ]);

            }

        } else {

            if ( _.touchObject.startX !== _.touchObject.curX ) {

                _.slideHandler( _.currentSlide );
                _.touchObject = {};

            }

        }

    };

    Slick.prototype.swipeHandler = function(event) {

        var _ = this;

        if ((_.options.swipe === false) || ('ontouchend' in document && _.options.swipe === false)) {
            return;
        } else if (_.options.draggable === false && event.type.indexOf('mouse') !== -1) {
            return;
        }

        _.touchObject.fingerCount = event.originalEvent && event.originalEvent.touches !== undefined ?
            event.originalEvent.touches.length : 1;

        _.touchObject.minSwipe = _.listWidth / _.options
            .touchThreshold;

        if (_.options.verticalSwiping === true) {
            _.touchObject.minSwipe = _.listHeight / _.options
                .touchThreshold;
        }

        switch (event.data.action) {

            case 'start':
                _.swipeStart(event);
                break;

            case 'move':
                _.swipeMove(event);
                break;

            case 'end':
                _.swipeEnd(event);
                break;

        }

    };

    Slick.prototype.swipeMove = function(event) {

        var _ = this,
            edgeWasHit = false,
            curLeft, swipeDirection, swipeLength, positionOffset, touches, verticalSwipeLength;

        touches = event.originalEvent !== undefined ? event.originalEvent.touches : null;

        if (!_.dragging || _.scrolling || touches && touches.length !== 1) {
            return false;
        }

        curLeft = _.getLeft(_.currentSlide);

        _.touchObject.curX = touches !== undefined ? touches[0].pageX : event.clientX;
        _.touchObject.curY = touches !== undefined ? touches[0].pageY : event.clientY;

        _.touchObject.swipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curX - _.touchObject.startX, 2)));

        verticalSwipeLength = Math.round(Math.sqrt(
            Math.pow(_.touchObject.curY - _.touchObject.startY, 2)));

        if (!_.options.verticalSwiping && !_.swiping && verticalSwipeLength > 4) {
            _.scrolling = true;
            return false;
        }

        if (_.options.verticalSwiping === true) {
            _.touchObject.swipeLength = verticalSwipeLength;
        }

        swipeDirection = _.swipeDirection();

        if (event.originalEvent !== undefined && _.touchObject.swipeLength > 4) {
            _.swiping = true;
            event.preventDefault();
        }

        positionOffset = (_.options.rtl === false ? 1 : -1) * (_.touchObject.curX > _.touchObject.startX ? 1 : -1);
        if (_.options.verticalSwiping === true) {
            positionOffset = _.touchObject.curY > _.touchObject.startY ? 1 : -1;
        }


        swipeLength = _.touchObject.swipeLength;

        _.touchObject.edgeHit = false;

        if (_.options.infinite === false) {
            if ((_.currentSlide === 0 && swipeDirection === 'right') || (_.currentSlide >= _.getDotCount() && swipeDirection === 'left')) {
                swipeLength = _.touchObject.swipeLength * _.options.edgeFriction;
                _.touchObject.edgeHit = true;
            }
        }

        if (_.options.vertical === false) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        } else {
            _.swipeLeft = curLeft + (swipeLength * (_.$list.height() / _.listWidth)) * positionOffset;
        }
        if (_.options.verticalSwiping === true) {
            _.swipeLeft = curLeft + swipeLength * positionOffset;
        }

        if (_.options.fade === true || _.options.touchMove === false) {
            return false;
        }

        if (_.animating === true) {
            _.swipeLeft = null;
            return false;
        }

        _.setCSS(_.swipeLeft);

    };

    Slick.prototype.swipeStart = function(event) {

        var _ = this,
            touches;

        _.interrupted = true;

        if (_.touchObject.fingerCount !== 1 || _.slideCount <= _.options.slidesToShow) {
            _.touchObject = {};
            return false;
        }

        if (event.originalEvent !== undefined && event.originalEvent.touches !== undefined) {
            touches = event.originalEvent.touches[0];
        }

        _.touchObject.startX = _.touchObject.curX = touches !== undefined ? touches.pageX : event.clientX;
        _.touchObject.startY = _.touchObject.curY = touches !== undefined ? touches.pageY : event.clientY;

        _.dragging = true;

    };

    Slick.prototype.unfilterSlides = Slick.prototype.slickUnfilter = function() {

        var _ = this;

        if (_.$slidesCache !== null) {

            _.unload();

            _.$slideTrack.children(this.options.slide).detach();

            _.$slidesCache.appendTo(_.$slideTrack);

            _.reinit();

        }

    };

    Slick.prototype.unload = function() {

        var _ = this;

        $('.slick-cloned', _.$slider).remove();

        if (_.$dots) {
            _.$dots.remove();
        }

        if (_.$prevArrow && _.htmlExpr.test(_.options.prevArrow)) {
            _.$prevArrow.remove();
        }

        if (_.$nextArrow && _.htmlExpr.test(_.options.nextArrow)) {
            _.$nextArrow.remove();
        }

        _.$slides
            .removeClass('slick-slide slick-active slick-visible slick-current')
            .attr('aria-hidden', 'true')
            .css('width', '');

    };

    Slick.prototype.unslick = function(fromBreakpoint) {

        var _ = this;
        _.$slider.trigger('unslick', [_, fromBreakpoint]);
        _.destroy();

    };

    Slick.prototype.updateArrows = function() {

        var _ = this,
            centerOffset;

        centerOffset = Math.floor(_.options.slidesToShow / 2);

        if ( _.options.arrows === true &&
            _.slideCount > _.options.slidesToShow &&
            !_.options.infinite ) {

            _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');
            _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            if (_.currentSlide === 0) {

                _.$prevArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$nextArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - _.options.slidesToShow && _.options.centerMode === false) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            } else if (_.currentSlide >= _.slideCount - 1 && _.options.centerMode === true) {

                _.$nextArrow.addClass('slick-disabled').attr('aria-disabled', 'true');
                _.$prevArrow.removeClass('slick-disabled').attr('aria-disabled', 'false');

            }

        }

    };

    Slick.prototype.updateDots = function() {

        var _ = this;

        if (_.$dots !== null) {

            _.$dots
                .find('li')
                    .removeClass('slick-active')
                    .end();

            _.$dots
                .find('li')
                .eq(Math.floor(_.currentSlide / _.options.slidesToScroll))
                .addClass('slick-active');

        }

    };

    Slick.prototype.visibility = function() {

        var _ = this;

        if ( _.options.autoplay ) {

            if ( document[_.hidden] ) {

                _.interrupted = true;

            } else {

                _.interrupted = false;

            }

        }

    };

    $.fn.slick = function() {
        var _ = this,
            opt = arguments[0],
            args = Array.prototype.slice.call(arguments, 1),
            l = _.length,
            i,
            ret;
        for (i = 0; i < l; i++) {
            if (typeof opt == 'object' || typeof opt == 'undefined')
                _[i].slick = new Slick(_[i], opt);
            else
                ret = _[i].slick[opt].apply(_[i].slick, args);
            if (typeof ret != 'undefined') return ret;
        }
        return _;
    };

}));
