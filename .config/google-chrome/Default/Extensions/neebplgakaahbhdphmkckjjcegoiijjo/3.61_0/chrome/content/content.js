var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.arrayIteratorImpl = function(b) {
  var k = 0;
  return function() {
    return k < b.length ? {done:!1, value:b[k++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.makeIterator = function(b) {
  var k = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
  return k ? k.call(b) : $jscomp.arrayIterator(b);
};
$jscomp.arrayFromIterator = function(b) {
  for (var k, e = []; !(k = b.next()).done;) {
    e.push(k.value);
  }
  return e;
};
$jscomp.arrayFromIterable = function(b) {
  return b instanceof Array ? b : $jscomp.arrayFromIterator($jscomp.makeIterator(b));
};
$jscomp.owns = function(b, k) {
  return Object.prototype.hasOwnProperty.call(b, k);
};
$jscomp.assign = "function" == typeof Object.assign ? Object.assign : function(b, k) {
  for (var e = 1; e < arguments.length; e++) {
    var u = arguments[e];
    if (u) {
      for (var r in u) {
        $jscomp.owns(u, r) && (b[r] = u[r]);
      }
    }
  }
  return b;
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, k, e) {
  b != Array.prototype && b != Object.prototype && (b[k] = e.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, k, e, u) {
  if (k) {
    e = $jscomp.global;
    b = b.split(".");
    for (u = 0; u < b.length - 1; u++) {
      var r = b[u];
      r in e || (e[r] = {});
      e = e[r];
    }
    b = b[b.length - 1];
    u = e[b];
    k = k(u);
    k != u && null != k && $jscomp.defineProperty(e, b, {configurable:!0, writable:!0, value:k});
  }
};
$jscomp.polyfill("Object.assign", function(b) {
  return b || $jscomp.assign;
}, "es6", "es3");
$jscomp.checkStringArgs = function(b, k, e) {
  if (null == b) {
    throw new TypeError("The 'this' value for String.prototype." + e + " must not be null or undefined");
  }
  if (k instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + e + " must not be a regular expression");
  }
  return b + "";
};
$jscomp.polyfill("String.prototype.startsWith", function(b) {
  return b ? b : function(b, e) {
    var k = $jscomp.checkStringArgs(this, b, "startsWith");
    b += "";
    var r = k.length, y = b.length;
    e = Math.max(0, Math.min(e | 0, k.length));
    for (var C = 0; C < y && e < r;) {
      if (k[e++] != b[C++]) {
        return !1;
      }
    }
    return C >= y;
  };
}, "es6", "es3");
$jscomp.polyfill("Object.is", function(b) {
  return b ? b : function(b, e) {
    return b === e ? 0 !== b || 1 / b === 1 / e : b !== b && e !== e;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.prototype.includes", function(b) {
  return b ? b : function(b, e) {
    var k = this;
    k instanceof String && (k = String(k));
    var r = k.length;
    e = e || 0;
    for (0 > e && (e = Math.max(e + r, 0)); e < r; e++) {
      var y = k[e];
      if (y === b || Object.is(y, b)) {
        return !0;
      }
    }
    return !1;
  };
}, "es7", "es3");
$jscomp.polyfill("String.prototype.includes", function(b) {
  return b ? b : function(b, e) {
    return -1 !== $jscomp.checkStringArgs(this, b, "includes").indexOf(b, e || 0);
  };
}, "es6", "es3");
var scanner = function() {
  function b(b, e, m, k, c, r) {
    var t = new XMLHttpRequest, a = !1, h = setTimeout(function() {
      a = !0;
      r();
    }, k || 4000);
    t.onreadystatechange = function() {
      a || (clearTimeout(h), c(t));
    };
    t.onerror = r;
    t.open(e, b, !0);
    null == m ? t.send() : t.send(m);
  }
  function k(e, k) {
    var m = {};
    if (null == document.body) {
      m.status = 599, k(m);
    } else {
      if (document.body.textContent.match(/you're not a robot/)) {
        m.status = 403, k(m);
      } else {
        for (var r = document.evaluate("//comment()", document, null, XPathResult.ANY_TYPE, null), c = r.iterateNext(), u = ""; c;) {
          u += c, c = r.iterateNext();
        }
        if (u.match(/automated access/)) {
          m.status = 403, k(m);
        } else {
          if (u.match(/ref=cs_503_link/)) {
            m.status = 503, k(m);
          } else {
            var t = 0;
            if (e.scrapeFilters && 0 < e.scrapeFilters.length) {
              r = {};
              c = null;
              var a = "", h = null, p = {}, d = {}, B = !1, g = function(d, c, f) {
                var l = [];
                if (!d.selector) {
                  if (!d.regExp) {
                    return a = "invalid selector, sel/regexp", !1;
                  }
                  var b = document.getElementsByTagName("html")[0].innerHTML.match(new RegExp(d.regExp, "i"));
                  if (!b || b.length < d.reGroup) {
                    b = "regexp fail: html - " + d.name + f;
                    if (!1 === d.optional) {
                      return a = b, !1;
                    }
                    h += " // " + b;
                    return !0;
                  }
                  return b[d.reGroup];
                }
                b = c.querySelectorAll(d.selector);
                0 == b.length && (b = c.querySelectorAll(d.altSelector));
                if (0 == b.length) {
                  if (!0 === d.optional) {
                    return !0;
                  }
                  a = "selector no match: " + d.name + f;
                  return !1;
                }
                if (d.parentSelector && (b = [b[0].parentNode.querySelector(d.parentSelector)], null == b[0])) {
                  if (!0 === d.optional) {
                    return !0;
                  }
                  a = "parent selector no match: " + d.name + f;
                  return !1;
                }
                if ("undefined" != typeof d.multiple && null != d.multiple && (!0 === d.multiple && 1 > b.length || !1 === d.multiple && 1 < b.length)) {
                  if (!B) {
                    return B = !0, g(d, c, f);
                  }
                  f = "selector multiple mismatch: " + d.name + f + " found: " + b.length;
                  if (!1 === d.optional) {
                    d = "";
                    for (var e in b) {
                      !b.hasOwnProperty(e) || 1000 < d.length || (d += " - " + e + ": " + b[e].outerHTML + " " + b[e].getAttribute("class") + " " + b[e].getAttribute("id"));
                    }
                    a = f + d + " el: " + c.getAttribute("class") + " " + c.getAttribute("id");
                    return !1;
                  }
                  h += " // " + f;
                  return !0;
                }
                if (d.isListSelector) {
                  return p[d.name] = b, !0;
                }
                if (!d.attribute) {
                  return a = "selector attribute undefined?: " + d.name + f, !1;
                }
                for (var v in b) {
                  if (b.hasOwnProperty(v)) {
                    c = b[v];
                    if (!c) {
                      break;
                    }
                    if (d.childNode) {
                      d.childNode = Number(d.childNode);
                      c = c.childNodes;
                      if (c.length < d.childNode) {
                        b = "childNodes fail: " + c.length + " - " + d.name + f;
                        if (!1 === d.optional) {
                          return a = b, !1;
                        }
                        h += " // " + b;
                        return !0;
                      }
                      c = c[d.childNode];
                    }
                    c = "text" == d.attribute ? c.textContent : "html" == d.attribute ? c.innerHTML : c.getAttribute(d.attribute);
                    if (!c || 0 == c.length || 0 == c.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                      b = "selector attribute null: " + d.name + f;
                      if (!1 === d.optional) {
                        return a = b, !1;
                      }
                      h += " // " + b;
                      return !0;
                    }
                    if (d.regExp) {
                      e = c.match(new RegExp(d.regExp, "i"));
                      if (!e || e.length < d.reGroup) {
                        b = "regexp fail: " + c + " - " + d.name + f;
                        if (!1 === d.optional) {
                          return a = b, !1;
                        }
                        h += " // " + b;
                        return !0;
                      }
                      l.push(e[d.reGroup]);
                    } else {
                      l.push(c);
                    }
                    if (!d.multiple) {
                      break;
                    }
                  }
                }
                return d.multiple ? l : l[0];
              };
              u = document;
              var l = !1, D = {}, v;
              for (v in e.scrapeFilters) {
                D.$jscomp$loop$prop$pageType$69 = v;
                a: {
                  if (l) {
                    break;
                  }
                  D.$jscomp$loop$prop$pageFilter$66 = e.scrapeFilters[D.$jscomp$loop$prop$pageType$69];
                  var x = D.$jscomp$loop$prop$pageFilter$66.pageVersionTest, f = document.querySelectorAll(x.selector);
                  0 == f.length && (f = document.querySelectorAll(x.altSelector));
                  if (0 != f.length) {
                    if ("undefined" != typeof x.multiple && null != x.multiple) {
                      if (!0 === x.multiple && 2 > f.length) {
                        break a;
                      }
                      if (!1 === x.multiple && 1 < f.length) {
                        break a;
                      }
                    }
                    if (x.attribute) {
                      var q = null;
                      q = "text" == x.attribute ? "" : f[0].getAttribute(x.attribute);
                      if (null == q) {
                        break a;
                      }
                    }
                    c = D.$jscomp$loop$prop$pageType$69;
                    f = {};
                    for (var Q in D.$jscomp$loop$prop$pageFilter$66) {
                      if (l) {
                        break;
                      }
                      f.$jscomp$loop$prop$sel$61 = D.$jscomp$loop$prop$pageFilter$66[Q];
                      if (f.$jscomp$loop$prop$sel$61.name != x.name) {
                        if (f.$jscomp$loop$prop$sel$61.parentList) {
                          q = [];
                          if ("undefined" != typeof p[f.$jscomp$loop$prop$sel$61.parentList]) {
                            q = p[f.$jscomp$loop$prop$sel$61.parentList];
                          } else {
                            if (!0 === g(D.$jscomp$loop$prop$pageFilter$66[f.$jscomp$loop$prop$sel$61.parentList], u, D.$jscomp$loop$prop$pageType$69)) {
                              q = p[f.$jscomp$loop$prop$sel$61.parentList];
                            } else {
                              break;
                            }
                          }
                          d[f.$jscomp$loop$prop$sel$61.parentList] || (d[f.$jscomp$loop$prop$sel$61.parentList] = []);
                          var N = 0;
                          f.$jscomp$loop$prop$appendedHTMLOnce$63 = !1;
                          var n = {}, A;
                          for (A in q) {
                            if (l) {
                              break;
                            }
                            if (q.hasOwnProperty(A)) {
                              if ("stock" == f.$jscomp$loop$prop$sel$61.name) {
                                N++;
                                try {
                                  if (n.$jscomp$loop$prop$form$64 = void 0, n.$jscomp$loop$prop$offerId$59 = void 0, f.$jscomp$loop$prop$sel$61.selector && (n.$jscomp$loop$prop$form$64 = q[A].querySelector(f.$jscomp$loop$prop$sel$61.selector)), f.$jscomp$loop$prop$sel$61.altSelector && (n.$jscomp$loop$prop$offerId$59 = q[A].querySelector(f.$jscomp$loop$prop$sel$61.altSelector)), n.$jscomp$loop$prop$offerId$59 && (n.$jscomp$loop$prop$offerId$59 = n.$jscomp$loop$prop$offerId$59.getAttribute(f.$jscomp$loop$prop$sel$61.attribute)), 
                                  n.$jscomp$loop$prop$form$64) {
                                    n.$jscomp$loop$prop$iframe$57 = document.createElement("iframe");
                                    n.$jscomp$loop$prop$iframe$57.style.display = "none";
                                    n.$jscomp$loop$prop$iframe$57.name = f.$jscomp$loop$prop$sel$61.selector + "_" + n.$jscomp$loop$prop$offerId$59;
                                    document.body.appendChild(n.$jscomp$loop$prop$iframe$57);
                                    n.$jscomp$loop$prop$form$64.setAttribute("target", n.$jscomp$loop$prop$iframe$57.name);
                                    var J = n.$jscomp$loop$prop$form$64.querySelector('input[type="submit"]'), M = document.createElement("input");
                                    M.name = "submit.addToCart";
                                    M.value = J.getAttribute("value");
                                    var K = document.createElement("input");
                                    K.type = "hidden";
                                    var C = f.$jscomp$loop$prop$sel$61.regExp.split(";");
                                    K.name = C[0];
                                    K.value = C[1];
                                    n.$jscomp$loop$prop$qtySel$58 = JSON.parse(f.$jscomp$loop$prop$sel$61.childNode);
                                    n.$jscomp$loop$prop$form$64.appendChild(K);
                                    t++;
                                    n.$jscomp$loop$prop$mapIndex$62 = A + "";
                                    setTimeout(function(a, c) {
                                      return function() {
                                        var g = !1;
                                        a.$jscomp$loop$prop$iframe$57.onload = function() {
                                          if (!g) {
                                            a.$jscomp$loop$prop$iframe$57.onload = void 0;
                                            g = !0;
                                            var h = -1;
                                            try {
                                              for (var b = 0; b < a.$jscomp$loop$prop$qtySel$58.length; b++) {
                                                var f = a.$jscomp$loop$prop$qtySel$58[b][0];
                                                f = f.replace("[ID]", a.$jscomp$loop$prop$offerId$59);
                                                var p = a.$jscomp$loop$prop$qtySel$58[b][1], l = a.$jscomp$loop$prop$iframe$57.contentWindow.document.querySelector(f);
                                                if (l && (h = l.getAttribute(p))) {
                                                  break;
                                                }
                                              }
                                              if (!h) {
                                                throw "not found";
                                              }
                                              d[c.$jscomp$loop$prop$sel$61.parentList][a.$jscomp$loop$prop$mapIndex$62][c.$jscomp$loop$prop$sel$61.name] = h;
                                            } catch (R) {
                                              try {
                                                c.$jscomp$loop$prop$appendedHTMLOnce$63 || (c.$jscomp$loop$prop$appendedHTMLOnce$63 = !0, m.payload || (m.payload = [""]), null == m.payload[0] && (m.payload[0] = ""), m.payload[0] += " // toofast", e.dbg2 && m.payload.push(a.$jscomp$loop$prop$iframe$57.contentWindow.document.body.innerHTML));
                                              } catch (T) {
                                              }
                                            }
                                            0 == --t && k(m);
                                          }
                                        };
                                        a.$jscomp$loop$prop$form$64.submit();
                                      };
                                    }(n, f), N * f.$jscomp$loop$prop$sel$61.reGroup);
                                  }
                                } catch (L) {
                                }
                              } else {
                                if ("revealMAP" == f.$jscomp$loop$prop$sel$61.name) {
                                  n.$jscomp$loop$prop$revealMAP$67 = f.$jscomp$loop$prop$sel$61;
                                  var w = void 0;
                                  w = n.$jscomp$loop$prop$revealMAP$67.selector ? q[A].querySelector(n.$jscomp$loop$prop$revealMAP$67.selector) : q[A];
                                  if (null != w && w.textContent.match(new RegExp(n.$jscomp$loop$prop$revealMAP$67.regExp, "i"))) {
                                    w = document.location.href.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/);
                                    w = w[1];
                                    var y = D.$jscomp$loop$prop$pageFilter$66.sellerId;
                                    "undefined" == typeof y || null == y || null == w || 2 > w.length || (y = q[A].querySelector('input[name="oid"]').value, null == y || 20 > y + 0 || (w = n.$jscomp$loop$prop$revealMAP$67.altSelector.replace("OFFERID", y).replace("ASINID", w), t++, n.$jscomp$loop$prop$mapIndex$7$68 = A + "", b(w, "GET", null, 3000, function(a, c) {
                                      return function(g) {
                                        if (4 == g.readyState) {
                                          t--;
                                          if (200 == g.status) {
                                            try {
                                              var b = g.responseText, f = a.$jscomp$loop$prop$pageFilter$66.price;
                                              if (f && f.regExp) {
                                                if (b.match(/no valid offer--/)) {
                                                  d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68] || (d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68] = {}), d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68][c.$jscomp$loop$prop$revealMAP$67.name] = -1;
                                                } else {
                                                  var p = b.match(new RegExp("price info--\x3e(?:.|\\n)*?" + f.regExp + "(?:.|\\n)*?\x3c!--")), l = b.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                  if (!p || p.length < f.reGroup) {
                                                    h += " //  priceMAP regexp fail: " + (b + " - " + f.name + a.$jscomp$loop$prop$pageType$69);
                                                  } else {
                                                    var B = p[f.reGroup];
                                                    d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68] || (d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68] = {});
                                                    d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68][c.$jscomp$loop$prop$revealMAP$67.name] = B;
                                                    null != l && 2 == l.length && (d[c.$jscomp$loop$prop$revealMAP$67.parentList][c.$jscomp$loop$prop$mapIndex$7$68][c.$jscomp$loop$prop$revealMAP$67.name + "Shipping"] = l[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                  }
                                                }
                                              }
                                            } catch (R) {
                                            }
                                          }
                                          0 == t && k(m);
                                        }
                                      };
                                    }(D, n), function() {
                                      0 == --t && k(m);
                                    })));
                                  }
                                } else {
                                  w = g(f.$jscomp$loop$prop$sel$61, q[A], D.$jscomp$loop$prop$pageType$69);
                                  if (!1 === w) {
                                    l = !0;
                                    break;
                                  }
                                  if (!0 !== w) {
                                    if (d[f.$jscomp$loop$prop$sel$61.parentList][A] || (d[f.$jscomp$loop$prop$sel$61.parentList][A] = {}), f.$jscomp$loop$prop$sel$61.multiple) {
                                      for (var F in w) {
                                        w.hasOwnProperty(F) && !f.$jscomp$loop$prop$sel$61.keepBR && (w[F] = w[F].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                      }
                                      w = w.join("\u271c\u271c");
                                      d[f.$jscomp$loop$prop$sel$61.parentList][A][f.$jscomp$loop$prop$sel$61.name] = w;
                                    } else {
                                      d[f.$jscomp$loop$prop$sel$61.parentList][A][f.$jscomp$loop$prop$sel$61.name] = f.$jscomp$loop$prop$sel$61.keepBR ? w : w.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                    }
                                  }
                                }
                              }
                            }
                            n = {$jscomp$loop$prop$iframe$57:n.$jscomp$loop$prop$iframe$57, $jscomp$loop$prop$qtySel$58:n.$jscomp$loop$prop$qtySel$58, $jscomp$loop$prop$offerId$59:n.$jscomp$loop$prop$offerId$59, $jscomp$loop$prop$mapIndex$62:n.$jscomp$loop$prop$mapIndex$62, $jscomp$loop$prop$form$64:n.$jscomp$loop$prop$form$64, $jscomp$loop$prop$revealMAP$67:n.$jscomp$loop$prop$revealMAP$67, $jscomp$loop$prop$mapIndex$7$68:n.$jscomp$loop$prop$mapIndex$7$68};
                          }
                        } else {
                          q = g(f.$jscomp$loop$prop$sel$61, u, D.$jscomp$loop$prop$pageType$69);
                          if (!1 === q) {
                            l = !0;
                            break;
                          }
                          if (!0 !== q) {
                            if (f.$jscomp$loop$prop$sel$61.multiple) {
                              for (var G in q) {
                                q.hasOwnProperty(G) && !f.$jscomp$loop$prop$sel$61.keepBR && (q[G] = q[G].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                              }
                              q = q.join();
                            } else {
                              f.$jscomp$loop$prop$sel$61.keepBR || (q = q.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                            }
                            r[f.$jscomp$loop$prop$sel$61.name] = q;
                          }
                        }
                      }
                      f = {$jscomp$loop$prop$sel$61:f.$jscomp$loop$prop$sel$61, $jscomp$loop$prop$appendedHTMLOnce$63:f.$jscomp$loop$prop$appendedHTMLOnce$63};
                    }
                    l = !0;
                  }
                }
                D = {$jscomp$loop$prop$pageFilter$66:D.$jscomp$loop$prop$pageFilter$66, $jscomp$loop$prop$pageType$69:D.$jscomp$loop$prop$pageType$69};
              }
              if (null == c) {
                a += " // no pageVersion matched", m.status = 308, m.payload = [h, a, e.dbg1 ? document.getElementsByTagName("html")[0].innerHTML : ""];
              } else {
                if ("" === a) {
                  m.payload = [h];
                  m.scrapedData = r;
                  for (var E in d) {
                    m[E] = d[E];
                  }
                } else {
                  m.status = 305, m.payload = [h, a, e.dbg2 ? document.getElementsByTagName("html")[0].innerHTML : ""];
                }
              }
            } else {
              m.status = 306;
            }
            0 == t && k(m);
          }
        }
      }
    }
  }
  var e = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), u = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), r = -1 < navigator.userAgent.toLowerCase().indexOf("edge/");
  r && (window.chrome = window.browser);
  var y = !0;
  !e && !u && !r || e || u || r || (y = !1);
  window.self === window.top && (y = !1);
  window.sandboxHasRun && (y = !1);
  y && (window.sandboxHasRun = !0, window.addEventListener("message", function(b) {
    if (b.source == window.parent && b.data) {
      var e = b.data.value;
      "data" == b.data.key && e.url && e.url == document.location && setTimeout(function() {
        null == document.body ? setTimeout(function() {
          k(e, function(b) {
            window.parent.postMessage({sandbox:b}, "*");
          });
        }, 1500) : k(e, function(b) {
          window.parent.postMessage({sandbox:b}, "*");
        });
      }, 800);
    }
  }, !1), window.parent.postMessage({sandbox:document.location + "", isUrlMsg:!0}, "*"));
  window.addEventListener("error", function(b, e, k, r, c) {
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(c);
    return !1;
  });
  return {scan:k};
}();
(function() {
  console.time("AmazonLoaded");
  var b = !1, k = !1, e = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), u = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), r = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), y = u ? "firefox" : "chrome", C = !e && !u && !r, G = C ? "keepaChrome" : e ? "keepaOpera" : r ? "keepaEdge" : "keepaFirefox";
  !r || "undefined" != typeof window.chrome && "undefined" != typeof window.chrome.runtime || (window.chrome = window.browser);
  var m = !1;
  try {
    m = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (C || e || u || r) {
    if (window.keepaHasRun) {
      return;
    }
    window.keepaHasRun = !0;
  }
  var z = {amazonBridge:function() {
    var a = document.getElementsByTagName("head")[0], b = document.createElement("script");
    b.type = "text/javascript";
    b.src = "https://cdn.keepa.com/selectionHook2.js";
    a.appendChild(b);
    var p = 0;
    window.addEventListener("message", function(a) {
      if ("undefined" == typeof a.data.sandbox) {
        if ("https://keepa.com" == a.origin || "https://test.keepa.com" == a.origin) {
          if (a.data.hasOwnProperty("origin") && "keepaIframe" == a.data.origin) {
            c.handleIFrameMessage(a.data.key, a.data.value, function(c) {
              try {
                a.source.postMessage({origin:"keepaContentScript", key:a.data.key, value:c, id:a.data.id}, a.origin);
              } catch (x) {
              }
            });
          } else {
            if ("string" === typeof a.data) {
              var d = a.data.split(",");
              if (2 > d.length) {
                return;
              }
              if (2 < d.length) {
                for (var b = 2, h = d.length; b < h; b++) {
                  d[1] += "," + d[b];
                }
              }
              c.handleIFrameMessage(d[0], d[1], function(c) {
                a.source.postMessage({origin:"keepaContentScript", value:c}, a.origin);
              });
            }
          }
        }
        if (a.origin.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|jp|nl|ca|fr|es|it|in|com\.mx|com\.br|com\.au)/)) {
          z.staticBridge("log", "msg: " + a.data);
          try {
            var e = JSON.parse(a.data);
          } catch (v) {
            return;
          }
          (e = e.asin) && "null" != e && /([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(e) && (e != c.ASIN ? (c.ASIN = e, c.swapIFrame()) : 0 != p ? (window.clearTimeout(p), p = 1) : p = window.setTimeout(function() {
            c.swapIFrame();
          }, 1000));
        }
      }
    });
  }, storage:chrome.storage.local, iframeBridge:function() {
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    chrome.storage.local.get(a, c);
  }, set:function(a, c, b) {
    var d = {};
    d[a] = c;
    z.storage.set(d, b);
    "token" == a && 64 == c.length && (C || u || r) && chrome.storage.sync.set({KeepaHash:c}, function() {
    });
  }, remove:function(a, c) {
    z.storage.remove(a, c);
  }, staticBridge:function(a, c) {
    switch(a) {
      case "log":
        return null;
      case "showAlert":
        return chrome.runtime.sendMessage({type:"showAlert", val:c}), null;
      default:
        return null;
    }
  }}, c = {offset:1293836400000, offsetHours:359399, domain:0, yen:String.fromCharCode(165), iframeDocument:[], iframeWindow:[], iframeDOM:[], iframeJQ:[], iframeStorage:null, ASIN:null, tld:"", placeholder:"", storageIndex:-1, cssFlex:function() {
    var a = "flex", c = ["flex", "-webkit-flex", "-moz-box", "-webkit-box", "-ms-flexbox"], b = document.createElement("flexelement"), d;
    for (d in c) {
      try {
        if ("undefined" != b.style[c[d]]) {
          a = c[d];
          break;
        }
      } catch (B) {
      }
    }
    return a;
  }(), getDomain:function(a) {
    switch(a) {
      case "com":
        return 1;
      case "co.uk":
        return 2;
      case "de":
        return 3;
      case "fr":
        return 4;
      case "co.jp":
        return 5;
      case "jp":
        return 5;
      case "ca":
        return 6;
      case "it":
        return 8;
      case "es":
        return 9;
      case "in":
        return 10;
      case "com.mx":
        return 11;
      case "com.br":
        return 12;
      case "com.au":
        return 13;
      case "nl":
        return 14;
      default:
        return -1;
    }
  }, revealWorking:!1, juvecOnlyOnce:!1, revealMapOnlyOnce:!1, revealCache:{}, revealCacheStock:{}, revealMAP:function() {
    c.revealMapOnlyOnce || (c.revealMapOnlyOnce = !0, z.get("revealStock", function(a) {
      "undefined" == typeof a && (a = {});
      var b = 0;
      try {
        b = "0" != a.revealStock;
      } catch (I) {
      }
      try {
        if ((b || "com" == c.tld) && !c.revealWorking) {
          if (c.revealWorking = !0, document.getElementById("keepaMAP")) {
            c.revealWorking = !1;
          } else {
            var p = function() {
              var a = new MutationObserver(function(d) {
                setTimeout(function() {
                  c.revealMAP();
                }, 100);
                try {
                  a.disconnect();
                } catch (P) {
                }
              });
              a.observe(document.getElementById("keepaMAP").parentNode.parentNode.parentNode, {childList:!0, subtree:!0});
            }, d = function(a, d, b, g) {
              b && (c.revealCacheStock[g] = b);
              var f = "aod-offer-heading" == a.id, h = (f ? a.parentElement : a).querySelector(".keepaMAP");
              if (null == (f ? a.parentElement : a).querySelector(".keepaStock")) {
                null != h && null != h.parentElement && h.parentElement.remove();
                c.revealWorking = !1;
                h = document.createElement("div");
                var l = !1, e = document.createElement("div");
                e.id = "keepaMAP" + (f ? d + g : "");
                e.style = "font-size: 12px;color: #767676;" + (f ? "display:block;" : "");
                var B = document.createElement("div"), k = "juvecStock" == g;
                f && !d ? (B.className = "a-column a-size-small a-span9 a-span-last", e.className = "a-column a-span3" + (k ? " keepaStock" : " keepaMAP")) : e.className = k ? " keepaStock" : " keepaMAP";
                d ? (l = !0, e.textContent = "Hidden Price revealed by Keepa:", B.innerHTML = c.revealCache[g]) : c.revealCacheStock[g] && (l = c.revealCacheStock[g].stock, 999 == l && (l = "999+"), B.innerHTML = "<span style='font-weight: bold;'>" + l + "</span>" + (b.limit ? "&ensp;<span style='color:#da4c33'>max order limit</span>" : "") + (f ? "&emsp;<span style='color: #767676;'>(added by \u271c Keepa)</span>" : ""), e.innerHTML = "Stock" + (f ? "" : " (added by \u271c Keepa)"), l = !0);
                null != b && null != b.price && -1 != a.textContent.toLowerCase().indexOf("add to cart to see product details.") && (g = document.createElement("div"), b = 5 == c.domain ? b.price : (Number(b.price) / 100).toFixed(2), k = new Intl.NumberFormat(" en-US en-GB de-DE fr-FR ja-JP en-CA zh-CN it-IT es-ES hi-IN es-MX pt-BR en-AU nl-NL tr-TR".split(" ")[c.domain], {style:"currency", currency:" USD GBP EUR EUR JPY CAD CNY EUR EUR INR MXN BRL AUD EUR TRY".split(" ")[c.domain]}), g.innerHTML = 
                'Price: <span style="font-weight: bold;">' + k.format(b) + '</span>&ensp;<span style="color: #767676;">(by \u271c Keepa)</span>', h.appendChild(g));
                l && (h.appendChild(e), h.appendChild(B), f ? d ? a.appendChild(h) : null != a.parentElement.querySelector(".aod-offer-divider") && (h.className = "a-row", h.style = "padding-top: 4px;", a.parentElement.querySelector(".aod-offer-divider").before(h)) : a.appendChild(h), f || p());
              }
            }, e = "1 ATVPDKIKX0DER A3P5ROKL5A1OLE A3JWKAKR8XB7XF A1X6FK5RDHNB96 AN1VRQENFRJN5 A3DWYIK6Y9EEQB A1AJ19PSB66TGU A11IL2PNWYJU7H A1AT7YVPFBWXBL A3P5ROKL5A1OLE AVDBXBAVVSXLQ A1ZZFT5FULY4LN ANEGB3WVEVKZB".split(" "), g = document.location.href, l = function(a, b, g, f) {
              chrome.runtime.sendMessage({type:"getStock", asin:c.ASIN, oid:a, host:document.location.hostname, referer:document.location + "", domainId:c.domain, session:b}, function(c) {
                d(g, !1, c, a);
              });
            }, k = /&seller=([A-Z0-9]{9,21})($|&)/;
            if (0 < g.indexOf("/offer-listing/")) {
              try {
                var v = document.getElementById("olpTabContent");
                if (null == v && (v = document.getElementById("olpOfferList"), null == v)) {
                  return;
                }
                var x = v.querySelector('[role="grid"]');
                if (null != x) {
                  var f = x.childNodes, q;
                  for (q in f) {
                    if (f.hasOwnProperty(q)) {
                      var m = f[q];
                      if (null != m && "DIV" == m.nodeName) {
                        try {
                          var r = m.querySelector('input[name="offeringID.1"]');
                          if (r) {
                            var n = m.children[0], A = r.getAttribute("value"), u = m.querySelector('input[name="session-id"]');
                            if (u) {
                              var t = u.getAttribute("value"), y = m.querySelector('input[name="merchantID"]');
                              a = null;
                              null != y && (a = y.getAttribute("value"));
                              null == a && (a = null != m.querySelector('.olpSellerName img[alt="Amazon.' + c.tld + '"]') ? e[c.domain] : null);
                              if (null == a) {
                                var z = m.querySelector(".olpSellerName a");
                                null != z && (z = z.getAttribute("href"));
                                if (null != z) {
                                  var w = z.match(k);
                                  null != w && 1 < w.length && (a = w[1]);
                                }
                              }
                              -1 != m.textContent.toLowerCase().indexOf("add to cart to see product details.") ? l(A, t, n, !0) : b && l(A, t, n, !1);
                            }
                          }
                        } catch (I) {
                          console.log(I);
                        }
                      }
                    }
                  }
                }
              } catch (I) {
                c.reportBug(I, "MAP error: " + g);
              }
            } else {
              var C = new MutationObserver(function(a) {
                try {
                  var d = document.querySelectorAll("#aod-offer,#aod-pinned-offer");
                  if (null != d && 0 != d.length) {
                    for (var b in d) {
                      if (d.hasOwnProperty(b)) {
                        var f = d[b];
                        if (null != f && "DIV" == f.nodeName) {
                          var h = f.querySelector('input[name="offeringID.1"]');
                          if (h) {
                            var p = h.getAttribute("value"), B = f.children[0], n = f.querySelector('input[name="session-id"]');
                            if (n) {
                              var v = n.getAttribute("value"), x = f.querySelector('input[name="merchantID"]');
                              a = null;
                              null != x && (a = x.getAttribute("value"));
                              null == a && (a = null != f.querySelector('.olpSellerName img[alt="Amazon.' + c.tld + '"]') ? e[c.domain] : null);
                              if (null == a) {
                                var q = f.querySelector(".olpSellerName a, #aod-offer-soldBy a");
                                null != q && (q = q.getAttribute("href"));
                                null != q && q.match(k);
                              }
                              "undefined" === typeof c.revealCache[p] && -1 != f.textContent.toLowerCase().indexOf("add to cart to see product details.") ? (c.revealCache[p] = -2, l(p, v, B, !0)) : "undefined" === typeof c.revealCacheStock[p] && (c.revealCacheStock[p] = -2, l(p, v, B, !1));
                            }
                          }
                        }
                      }
                    }
                  }
                } catch (S) {
                  c.reportBug(S, "MAP error: " + g);
                }
              });
              C.observe(document.querySelector("body"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
              window.onunload = function O() {
                try {
                  window.detachEvent("onunload", O), C.disconnect();
                } catch (P) {
                }
              };
              var F = document.getElementById("price");
              if (null != F && /(our price|always remove it|add this item to your cart|see product details in cart|see price in cart)/i.test(F.textContent)) {
                var G = document.getElementById("merchant-info"), E = "";
                if (G) {
                  if (-1 == G.textContent.toLowerCase().indexOf("amazon.c")) {
                    var L = F.querySelector('span[data-action="a-modal"]');
                    if (L) {
                      var H = L.getAttribute("data-a-modal");
                      H.match(/offeringID\.1=(.*?)&amp/) && (E = RegExp.$1);
                    }
                    if (0 == E.length && !H.match(/map_help_pop_(.*?)"/)) {
                      c.revealWorking = !1;
                      return;
                    }
                  }
                  void 0 != c.revealCache[E] ? d(F, !1, c.revealCache[E], E) : chrome.runtime.sendMessage({type:"getStock", asin:c.ASIN, oid:E}, function(a) {
                    c.revealCache[E] = a;
                    d(F, !1, a, E);
                  });
                } else {
                  c.revealWorking = !1;
                }
              } else {
                c.revealWorking = !1;
              }
            }
          }
        }
      } catch (I) {
        c.revealWorking = !1;
      }
    }));
  }, onPageLoad:function() {
    c.tld = RegExp.$2;
    var a = RegExp.$4;
    c.ASIN || (c.ASIN = a);
    c.domain = c.getDomain(c.tld);
    z.get("s_boxType", function(a) {
      "undefined" == typeof a && (a = {});
      document.addEventListener("DOMContentLoaded", function(b) {
        z.amazonBridge();
        if ("0" == a.s_boxType) {
          c.swapIFrame();
        } else {
          var d = document.getElementsByClassName("bucketDivider"), h = 0;
          if (void 0 === d[h]) {
            if (void 0 === d[0]) {
              return;
            }
            h = 0;
          }
          b = document.createElement("div");
          b.setAttribute("id", "keepaButton");
          b.setAttribute("style", "background-color: #444; border: 0 solid #ccc; border-radius: 6px 6px 6px 6px; color: #fff;cursor: pointer; font-size: 12px; margin: 15px;\tpadding: 6px; text-decoration: none; text-shadow: none;\tfloat:left;\tbox-shadow: 0px 0px 7px 0px #888;");
          var g = document.createElement("style");
          g.appendChild(document.createTextNode("#keepaButton:hover{background-color:#666 !important}"));
          document.head.appendChild(g);
          b.addEventListener("click", function() {
            var a = document.getElementById("keepaButton");
            a.parentNode.removeChild(a);
            c.swapIFrame();
          }, !1);
          b.textContent = "Show KeepaBox";
          d = document.getElementsByClassName("lpo")[0] && d[1] && 0 == h ? d[1] : d[h];
          d = "promotions_feature_div" == d.parentNode.id ? d.parentNode : d;
          d.parentNode.insertBefore(b, d);
        }
      }, !1);
    });
  }, swapIFrame:function() {
    z.staticBridge("log", "swap in ASIN: " + c.ASIN);
    try {
      c.revealMAP(document, c.ASIN, c.tld);
    } catch (h) {
    }
    if (!document.getElementById("keepaButton")) {
      c.swapIFrame.swapTimer && clearTimeout(c.swapIFrame.swapTimer);
      c.swapIFrame.swapTimer = setTimeout(function() {
        m || (document.getElementById("keepaContainer") || c.getPlaceholderAndInsertIFrame(), c.swapIFrame.swapTimer = setTimeout(function() {
          document.getElementById("keepaContainer") || c.getPlaceholderAndInsertIFrame();
        }, 2000));
      }, 2000);
      var a = document.getElementById("keepaContainer");
      if (null != c.iframeStorage && a) {
        z.staticBridge("log", "swap in ASIN - found old iframe: " + c.ASIN + " element: " + a);
        try {
          c.iframeStorage.src = c.getIframeUrl(c.domain, c.ASIN);
        } catch (h) {
          console.error(h);
        }
      } else {
        c.getPlaceholderAndInsertIFrame();
      }
    }
  }, getDevicePixelRatio:function() {
    var a = 1;
    void 0 !== window.screen.systemXDPI && void 0 !== window.screen.logicalXDPI && window.screen.systemXDPI > window.screen.logicalXDPI ? a = window.screen.systemXDPI / window.screen.logicalXDPI : void 0 !== window.devicePixelRatio && (a = window.devicePixelRatio);
    return a;
  }, getPlaceholderAndInsertIFrame:function() {
    z.get(["keepaBoxPlaceholder", "keepaBoxPlaceholderBackup", "keepaBoxPlaceholderBackupClass"], function(a) {
      "undefined" == typeof a && (a = {});
      var b = 0, p = function() {
        if (!document.getElementById("keepaButton") && !document.getElementById("amazonlive-homepage-widget")) {
          if (m) {
            var d = document.getElementById("tellAFriendBox_feature_div");
            if (d && d.previousSibling) {
              z.get(["s_overlay"], function(a) {
                "undefined" == typeof a && (a = {});
                try {
                  var b = a.s_overlay;
                  try {
                    b = JSON.parse(b);
                  } catch (n) {
                  }
                  var h = Math.min(1000, 1.5 * window.innerWidth).toFixed(0), g = (h / (window.innerWidth / 200)).toFixed(0), e = "https://graph.keepa.com/pricehistory.png?type=2&asin=" + c.ASIN + "&domain=" + c.domain + "&width=" + h + "&height=" + g;
                  e = "undefined" == typeof b ? e + "&amazon=1&new=1&used=1&salesrank=1&range=365" : e + ("&amazon=" + b[0] + "&new=" + b[1] + "&used=" + b[2] + "&salesrank=" + b[3] + "&range=" + b[4]);
                  var p = document.createElement("img");
                  p.setAttribute("style", "margin-top: 15px; width: " + window.innerWidth + "px; height: 200px;");
                  p.setAttribute("id", "keepaImageContainer" + c.ASIN);
                  p.setAttribute("src", e);
                  d.previousSibling.after(p);
                  p.addEventListener("click", function() {
                    p.remove();
                    c.insertIFrame(d.previousSibling, !1, !0);
                  }, !1);
                } catch (n) {
                }
              });
              return;
            }
          }
          var h = document.getElementById("gpdp-btf-container");
          if (h && h.previousElementSibling) {
            c.insertIFrame(h.previousElementSibling, !1, !0);
          } else {
            if ((h = document.getElementsByClassName("mocaGlamorContainer")[0]) || (h = document.getElementById("dv-sims")), h || (h = document.getElementById("mas-terms-of-use")), h && h.nextSibling) {
              c.insertIFrame(h.nextSibling, !1, !0);
            } else {
              var g = a.keepaBoxPlaceholder || "bottomRow";
              h = !1;
              if (g = document.getElementById(g)) {
                "sims_fbt" == g.previousElementSibling.id && (g = g.previousElementSibling, "bucketDivider" == g.previousElementSibling.className && (g = g.previousElementSibling), h = !0), c.insertIFrame(g, h);
              } else {
                if (g = a.keepaBoxPlaceholderBackup || "elevatorBottom", g = document.getElementById(g)) {
                  c.insertIFrame(g, !0);
                } else {
                  if (g = document.getElementById("hover-zoom-end")) {
                    c.insertIFrame(g, !0);
                  } else {
                    if (g = a.keepaBoxPlaceholderBackupClass || "a-fixed-left-grid", (g = document.getElementsByClassName(g)[0]) && g.nextSibling) {
                      c.insertIFrame(g.nextSibling, !0);
                    } else {
                      h = 0;
                      g = document.getElementsByClassName("twisterMediaMatrix");
                      var l = !!document.getElementById("dm_mp3Player");
                      if ((g = 0 == g.length ? document.getElementById("handleBuy") : g[0]) && 0 == h && !l && null != g.nextElementSibling) {
                        var e = !1;
                        for (l = g; l;) {
                          if (l = l.parentNode, "table" === l.tagName.toLowerCase()) {
                            if ("buyboxrentTable" === l.className || /buyBox/.test(l.className) || "buyingDetailsGrid" === l.className) {
                              e = !0;
                            }
                            break;
                          } else {
                            if ("html" === l.tagName.toLowerCase()) {
                              break;
                            }
                          }
                        }
                        if (!e) {
                          g = g.nextElementSibling;
                          c.insertIFrame(g, !1);
                          return;
                        }
                      }
                      g = document.getElementsByClassName("bucketDivider");
                      0 == g.length && (g = document.getElementsByClassName("a-divider-normal"));
                      if (!g[h]) {
                        if (!g[0]) {
                          40 > b++ && window.setTimeout(function() {
                            p();
                          }, 100);
                          return;
                        }
                        h = 0;
                      }
                      for (l = g[h]; l && g[h];) {
                        if (l = l.parentNode, "table" === l.tagName.toLowerCase()) {
                          if ("buyboxrentTable" === l.className || /buyBox/.test(l.className) || "buyingDetailsGrid" === l.className) {
                            l = g[++h];
                          } else {
                            break;
                          }
                        } else {
                          if ("html" === l.tagName.toLowerCase()) {
                            break;
                          }
                        }
                      }
                      c.placeholder = g[h];
                      g[h] && g[h].parentNode && (z.staticBridge("log", "getPlaceholderAndInsertIFrame Insert"), h = document.getElementsByClassName("lpo")[0] && g[1] && 0 == h ? g[1] : g[h], c.insertIFrame(h, !1));
                    }
                  }
                }
              }
            }
          }
        }
      };
      p();
    });
  }, getAFComment:function(a) {
    for (a = [a]; 0 < a.length;) {
      for (var c = a.pop(), b = 0; b < c.childNodes.length; b++) {
        var d = c.childNodes[b];
        if (8 === d.nodeType && -1 < d.textContent.indexOf("MarkAF")) {
          return d;
        }
        a.push(d);
      }
    }
    return null;
  }, getIframeUrl:function(a, c) {
    return "https://keepa.com/iframe_addon.html#" + a + "-0-" + c;
  }, insertIFrame:function(a, b) {
    if (null != c.iframeStorage && document.getElementById("keepaContainer")) {
      c.swapIFrame();
    } else {
      var h = document.getElementById("hover-zoom-end"), d = function(a) {
        for (var c = document.getElementById(a), b = []; c;) {
          b.push(c), c.id = "a-different-id", c = document.getElementById(a);
        }
        for (c = 0; c < b.length; ++c) {
          b[c].id = a;
        }
        return b;
      }("hover-zoom-end");
      z.get("s_boxHorizontal", function(p) {
        "undefined" == typeof p && (p = {});
        if (null == a) {
          setTimeout(c.getPlaceholderAndInsertIFrame, 2000);
        } else {
          var g = p.s_boxHorizontal, l = window.innerWidth - 50;
          if (document.getElementById("keepaContainer")) {
            z.staticBridge("log", "could not find keepa container");
          } else {
            p = 0 < document.location.href.indexOf("/offer-listing/");
            var B = c.getIframeUrl(c.domain, c.ASIN), v = document.createElement("div");
            "0" != g || p ? v.setAttribute("style", "min-width: 935px; width: calc(100% - 30px); height: 320px; display: flex; border:0 none; margin: 10px 0 0;") : (l -= 550, 960 > l && (l = 960), v.setAttribute("style", "min-width: 935px; max-width:" + l + "px;display: flex;  height: 320px; border:0 none; margin: 10px 0 0;"));
            v.setAttribute("id", "keepaContainer");
            var x = document.createElement("iframe");
            g = document.createElement("div");
            g.setAttribute("id", "keepaClear");
            x.setAttribute("style", "width: 100%; height: 100%; border:0 none;overflow: hidden;");
            x.setAttribute("src", B);
            x.setAttribute("scrolling", "no");
            x.setAttribute("id", "keepa");
            k || (k = !0, console.timeEnd("AmazonLoaded"), console.time("KeepaBoxLoaded"), chrome.runtime.sendMessage({type:"optionalPermissionsRequired"}, function(a) {
              console.log("opr: ", a.value);
              if (!0 === a.value) {
                var c = function() {
                  chrome.runtime.sendMessage({type:"optionalPermissions"}, function(a) {
                    console.log(a);
                  });
                  document.body.removeEventListener("click", c);
                };
                document.body.addEventListener("click", c);
              }
            }));
            v.appendChild(x);
            l = !1;
            if (!b) {
              null == a.parentNode || "promotions_feature_div" !== a.parentNode.id && "dp-out-of-stock-top_feature_div" !== a.parentNode.id || (a = a.parentNode);
              try {
                var f = a.previousSibling.previousSibling;
                null != f && "technicalSpecifications_feature_div" == f.id && (a = f);
              } catch (M) {
              }
              0 < d.length && (h = d[d.length - 1]) && "centerCol" != h.parentElement.id && ((f = c.getFirstInDOM([a, h], document.body)) && 600 < f.parentElement.offsetWidth && (a = f), a === h && (l = !0));
              (f = document.getElementById("title") || document.getElementById("title_row")) && c.getFirstInDOM([a, f], document.body) !== f && (a = f);
            }
            f = document.getElementById("vellumMsg");
            null != f && (a = f);
            f = document.body;
            var q = document.documentElement;
            q = Math.max(f.scrollHeight, f.offsetHeight, q.clientHeight, q.scrollHeight, q.offsetHeight);
            var t = a.offsetTop / q;
            if (0.5 < t || 0 > t) {
              f = c.getAFComment(f), null != f && (t = a.offsetTop / q, 0.5 > t && (a = f));
            }
            if (a.parentNode) {
              p ? (a = document.getElementById("olpTabContent"), a || (a = document.getElementById("olpProduct"), a = a.nextSibling), a.parentNode.insertBefore(v, a)) : "burjPageDivider" == a.id ? (a.parentNode.insertBefore(v, a), b || a.parentNode.insertBefore(g, v.nextSibling)) : "bottomRow" == a.id ? (a.parentNode.insertBefore(v, a), b || a.parentNode.insertBefore(g, v.nextSibling)) : l ? (a.parentNode.insertBefore(v, a.nextSibling), b || a.parentNode.insertBefore(g, v.nextSibling)) : (a.parentNode.insertBefore(v, 
              a), b || a.parentNode.insertBefore(g, v));
              c.iframeStorage = x;
              v.style.display = c.cssFlex;
              var y = !1, n = 5;
              if (C || e || u || r) {
                if (m) {
                  return;
                }
                var A = setInterval(function() {
                  if (0 >= n--) {
                    clearInterval(A);
                  } else {
                    var a = null != document.getElementById("keepa" + c.ASIN);
                    try {
                      if (!a) {
                        throw c.getPlaceholderAndInsertIFrame(), 1;
                      }
                      if (y) {
                        throw 1;
                      }
                      document.getElementById("keepa" + c.ASIN).contentDocument.location = B;
                    } catch (K) {
                      clearInterval(A);
                    }
                  }
                }, 4000);
              }
              var J = function() {
                y = !0;
                x.removeEventListener("load", J, !1);
                c.synchronizeIFrame();
              };
              x.addEventListener("load", J, !1);
            } else {
              c.swapIFrame(), z.staticBridge("log", "placeholder.parentNode null...");
            }
          }
        }
      });
    }
  }, handleIFrameMessage:function(a, c, e) {
    switch(a) {
      case "resize":
        b || (b = !0, console.timeEnd("KeepaBoxLoaded"));
        c = "" + c;
        -1 == c.indexOf("px") && (c += "px");
        if (a = document.getElementById("keepaContainer")) {
          a.style.height = c;
        }
        break;
      case "alert":
        c = encodeURIComponent("Kindle Fire HD Tablet");
        a = encodeURIComponent("51e5r0yV5AL.jpg");
        z.staticBridge("showAlert", "https://keepa.com/app/notification.html#B0083PWAPW/1/0/0/16900/19000/" + a + "/" + c);
        break;
      case "ping":
        e({location:chrome.runtime.id + " " + document.location});
        break;
      case "storageGetAll":
        chrome.runtime.sendMessage({type:"getFreshStorage"}, function(a) {
          e({storage:a.value});
        });
        break;
      case "storageSet":
        chrome.runtime.sendMessage({type:"setStorage", key:c.key, val:c.val});
    }
  }, synchronizeIFrame:function() {
    z.iframeBridge();
    var a = 0;
    z.get("s_boxHorizontal", function(c) {
      "undefined" != typeof c && "undefined" != typeof c.s_boxHorizontal && (a = c.s_boxHorizontal);
    });
    var c = window.innerWidth, b = !1;
    m || window.addEventListener("resize", function() {
      b || (b = !0, window.setTimeout(function() {
        if (c != window.innerWidth && "0" == a) {
          c = window.innerWidth;
          var d = window.innerWidth - 50;
          d -= 550;
          935 > d && (d = 935);
          document.getElementById("keepaContainer").style.width = d;
        }
        b = !1;
      }, 100));
    }, !1);
  }, getFirstInDOM:function(a, b) {
    var h;
    for (b = b.firstChild; b; b = b.nextSibling) {
      if ("IFRAME" !== b.nodeName && 1 === b.nodeType) {
        if (-1 !== a.indexOf(b)) {
          return b;
        }
        if (h = c.getFirstInDOM(a, b)) {
          return h;
        }
      }
    }
    return null;
  }, getClipRect:function(a) {
    "string" === typeof a && (a = document.querySelector(a));
    var b = 0, e = 0, d = function(a) {
      b += a.offsetLeft;
      e += a.offsetTop;
      a.offsetParent && d(a.offsetParent);
    };
    d(a);
    return 0 == e && 0 == b ? c.getClipRect(a.parentNode) : {top:e, left:b, width:a.offsetWidth, height:a.offsetHeight};
  }, findPlaceholderBelowImages:function(a) {
    var b = a, e, d = 100;
    do {
      for (d--, e = null; !e;) {
        e = a.nextElementSibling, e || (e = a.parentNode.nextElementSibling), a = e ? e : a.parentNode.parentNode, !e || "IFRAME" !== e.nodeName && "SCRIPT" !== e.nodeName && 1 === e.nodeType || (e = null);
      }
    } while (0 < d && 100 < c.getClipRect(e).left);
    return e ? e : b;
  }, httpGet:function(a, c) {
    var b = new XMLHttpRequest;
    c && (b.onreadystatechange = function() {
      4 == b.readyState && c.call(this, b.responseText);
    });
    b.open("GET", a, !0);
    b.send();
  }, httpPost2:function(a, c, b, d, e) {
    var g = new XMLHttpRequest;
    d && (g.onreadystatechange = function() {
      4 == g.readyState && d.call(this, g.responseText);
    });
    g.withCredentials = e;
    g.open("POST", a, !0);
    g.setRequestHeader("Content-Type", b);
    g.send(c);
  }, httpPost:function(a, b, e, d) {
    c.httpPost2(a, b, "text/plain;charset=UTF-8", e, d);
  }, lastBugReport:0, reportBug:function(a, b, e) {
    var d = Date.now();
    if (!(6E5 > d - c.lastBugReport || /(dead object)|(Script error)|(\.location is null)/i.test(a))) {
      c.lastBugReport = d;
      d = "";
      try {
        d = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(d)) {
          return;
        }
        d = d.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (B) {
      }
      if ("object" == typeof a) {
        try {
          a = JSON.stringify(a);
        } catch (B) {
        }
      }
      null == e && (e = {exception:a, additional:b, url:document.location.toString(), stack:d});
      e.keepaType = G;
      e.version = "3.61";
      z.get("token", function(a) {
        "undefined" == typeof a && (a = {token:"undefined"});
        c.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + a.token + "&type=" + y, JSON.stringify(e));
      });
    }
  }};
  window.onerror = function(a, b, e, d, k) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var g = "";
    d = d || 0;
    if (k && k.stack) {
      g = k.stack;
      try {
        g = k.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(g)) {
          return;
        }
        g = g.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (l) {
      }
    }
    a = {msg:a, url:(b || document.location.toString()) + ":" + parseInt(e || 0) + ":" + parseInt(d || 0), stack:g};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    c.reportBug(null, null, a);
    return !1;
  };
  if (C || e || u || r) {
    if (window.self != window.top || /.*music\.amazon\..*/.test(document.location.href) || /.*primenow\.amazon\..*/.test(document.location.href) || /.*amazon\.com\/restaurants.*/.test(document.location.href)) {
      return;
    }
    var H = function(a) {
      chrome.runtime.sendMessage({type:"sendData", val:{key:"m1", payload:[a]}}, function() {
      });
    };
    chrome.runtime.sendMessage({type:"getStorage"}, function(a) {
      var b = document.location.href, k = !1;
      document.addEventListener("DOMContentLoaded", function(a) {
        if (!k) {
          try {
            if (b.startsWith("https://test.keepa.com") || b.startsWith("https://keepa.com")) {
              var c = document.createElement("div");
              c.id = "extension";
              c.setAttribute("type", u ? "Firefox" : C ? "Chrome" : e ? "Opera" : r ? "Edge" : "Unknown");
              c.setAttribute("version", "3.61");
              document.body.appendChild(c);
              k = !0;
            }
          } catch (l) {
          }
        }
      });
      var d = !1;
      /((\/images)|(\/review)|(\/customer-reviews)|(ask\/questions)|(\/product-reviews))/.test(b) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(b) || !b.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/[^.]*?(\/|[?&]ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !b.match(/^htt(p|ps):\/\/.*?\.amzn\.(com).*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) ? b.match(/^htt(p|ps):\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/[^.]*?\/(wishlist|registry)/) || 
      b.match(/^htt(p|ps):\/\/w*?\.amzn\.(com)[^.]*?\/(wishlist|registry)/) || (b.match(/^https?:\/\/.*?(?:seller).*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|nl|es|in|com\.mx|com\.br|com\.au)\//) ? H("s" + c.getDomain(RegExp.$1)) : b.match(/^https?:\/\/.*?(?:af.?ilia|part|assoc).*?\.amazon\.(de|com|co\.uk|co\.jp|nl|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/home/) && H("a" + c.getDomain(RegExp.$1))) : (c.onPageLoad(), d = !0);
      if (C || u || e || r) {
        if (m) {
          return;
        }
        a = /^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/(s([\/?])|gp\/bestsellers\/|gp\/search\/|.*?\/b\/)/;
        (d || b.match(a)) && document.addEventListener("DOMContentLoaded", function(a) {
          var e = null;
          chrome.runtime.sendMessage({type:"getFilters"}, function(a) {
            e = a;
            if (null != e && null != e.value) {
              var g = function() {
                var e = b.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\//);
                if (d || e) {
                  var f = c.getDomain(RegExp.$1);
                  scanner.scan(a.value, function(a) {
                    a.key = "f1";
                    a.domainId = f;
                    chrome.runtime.sendMessage({type:"sendData", val:a}, function(a) {
                    });
                  });
                }
              };
              g();
              var h = document.location.href, l = -1, f = -1, k = -1;
              f = setInterval(function() {
                h != document.location.href && (h = document.location.href, clearTimeout(k), k = setTimeout(function() {
                  g();
                }, 2000), clearTimeout(l), l = setTimeout(function() {
                  clearInterval(f);
                }, 180000));
              }, 2000);
              l = setTimeout(function() {
                clearInterval(f);
              }, 180000);
            }
          });
        });
      }
      document.location.href.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\//) && document.addEventListener("DOMContentLoaded", function(a) {
        setTimeout(function() {
          chrome.runtime.onMessage.addListener(function(a, b, d) {
            switch(a.key) {
              case "collectASINs":
                a = {};
                var e = !1;
                b = (document.querySelector("#main") || document.querySelector("#zg") || document.querySelector("#pageContent") || document.querySelector("#wishlist-page") || document.querySelector("#merchandised-content") || document.querySelector("[id^='contentGrid']") || document.querySelector("#container") || document.querySelector(".a-container") || document).getElementsByTagName("a");
                if (void 0 != b && null != b) {
                  for (var g = 0; g < b.length; g++) {
                    var f = b[g].href;
                    /\/images/.test(f) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(f) || !f.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !f.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (e = RegExp.$2, f = c.getDomain(RegExp.$1), "undefined" === typeof a[f] && (a[f] = []), a[f].includes(e) || a[f].push(e), e = !0);
                  }
                }
                if (e) {
                  d(a);
                } else {
                  return alert("Keepa: No product ASINs found on this page."), !1;
                }
                break;
              default:
                d({});
            }
          });
          z.get(["overlayPriceGraph", "s_overlay"], function(a) {
            "undefined" == typeof a && (a = {});
            try {
              var b = a.overlayPriceGraph, c = a.s_overlay;
              try {
                c = JSON.parse(c);
              } catch (n) {
              }
              var d;
              if (1 == b) {
                var e = document.getElementsByTagName("a"), f = 0 < document.location.href.indexOf("/offer-listing/");
                if (void 0 != e && null != e) {
                  for (d = 0; d < e.length; d++) {
                    var g = e[d].href;
                    /\/images/.test(g) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(g) || !g.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !g.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (f || -1 == g.indexOf("offer-listing")) && t.add_events(c, e[d], g, RegExp.$1, RegExp.$2);
                  }
                }
                var h = function(a) {
                  if ("A" == a.nodeName) {
                    var b = a.href;
                    /\/images/.test(b) || /\/e\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/.test(b) || !b.match(/^https?:\/\/.*?\.amazon\.(de|com|co\.uk|co\.jp|ca|fr|it|es|in|com\.mx|com\.br|com\.au)\/[^.]*?(?:\/|\?ASIN=)([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) && !b.match(/^https?:\/\/.*?\.amzn\.(com)[^.]*?\/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/) || (f || -1 == b.indexOf("offer-listing")) && t.add_events(c, a, b, RegExp.$1, RegExp.$2);
                  }
                }, k = new MutationObserver(function(a) {
                  a.forEach(function(a) {
                    try {
                      if ("childList" === a.type) {
                        for (d = 0; d < a.addedNodes.length; d++) {
                          h(a.addedNodes[d]);
                          for (var b = a.addedNodes[d].children; null != b && "undefined" != b && 0 < b.length;) {
                            for (var c = [], e = 0; e < b.length; e++) {
                              h(b[e]);
                              try {
                                if (b[e].children && 0 < b[e].children.length) {
                                  for (var f = 0; f < b[e].children.length && 30 > f; f++) {
                                    c.push(b[e].children[f]);
                                  }
                                }
                              } catch (w) {
                              }
                            }
                            b = c;
                          }
                        }
                      } else {
                        if (c = a.target.getElementsByTagName("a"), "undefined" != c && null != c) {
                          for (b = 0; b < c.length; b++) {
                            h(c[b]);
                          }
                        }
                      }
                      h(a.target);
                    } catch (w) {
                    }
                  });
                });
                k.observe(document.querySelector("html"), {childList:!0, attributes:!1, characterData:!1, subtree:!0, attributeOldValue:!1, characterDataOldValue:!1});
                window.onunload = function A() {
                  try {
                    window.detachEvent("onunload", A), k.disconnect();
                  } catch (J) {
                  }
                };
              }
            } catch (n) {
            }
          });
        }, 100);
      });
    });
  }
  var t = {image_urls_main:[], pf_preview_current:"", preview_images:[], tld:"", img_string:'<img style="border: 1px solid #ff9f29;  -moz-border-radius: 0px;  margin: -3px;   display:block;   position: relative;   top: -3px;   left: -3px;" src=\'', createNewImageElement:function(a) {
    a = a.createElement("img");
    a.style.borderTop = "2px solid #ff9f29";
    a.style.borderBottom = "3px solid grey";
    a.style.display = "block";
    a.style.position = "relative";
    a.style.padding = "5px";
    return a;
  }, preview_image:function(a, b, c, d, e) {
    try {
      var g = b.originalTarget.ownerDocument;
    } catch (x) {
      g = document;
    }
    if (!g.getElementById("pf_preview")) {
      var h = g.createElement("div");
      h.id = "pf_preview";
      h.addEventListener("mouseout", function(a) {
        t.clear_image(a);
      }, !1);
      h.style.boxShadow = "rgb(68, 68, 68) 0px 1px 7px -2px";
      h.style.position = "fixed";
      h.style.zIndex = "10000000";
      h.style.bottom = "0px";
      h.style.right = "0px";
      h.style.margin = "12px 12px";
      h.style.backgroundColor = "#fff";
      g.body.appendChild(h);
    }
    t.pf_preview_current = g.getElementById("pf_preview");
    if (!t.pf_preview_current.firstChild) {
      h = Math.max(Math.floor(0.3 * g.defaultView.innerHeight), 128);
      var k = Math.max(Math.floor(0.3 * g.defaultView.innerWidth), 128), p = 2;
      if (300 > k || 150 > h) {
        p = 1;
      }
      1000 < k && (k = 1000);
      1000 < h && (h = 1000);
      t.pf_preview_current.current = -1;
      t.pf_preview_current.a = d;
      t.pf_preview_current.href = c;
      t.pf_preview_current.size = Math.floor(1.1 * Math.min(k, h));
      g.defaultView.innerWidth - b.clientX < 1.05 * k && g.defaultView.innerHeight - b.clientY < 1.05 * h && (b = g.getElementById("pf_preview"), b.style.right = "", b.style.left = "6px");
      d = "https://graph.keepa.com/pricehistory.png?type=" + p + "&asin=" + d + "&domain=" + e + "&width=" + k + "&height=" + h;
      d = "undefined" == typeof a ? d + "&amazon=1&new=1&used=1&salesrank=1&range=365" : d + ("&amazon=" + a[0] + "&new=" + a[1] + "&used=" + a[2] + "&salesrank=" + a[3] + "&range=" + a[4]);
      g.getElementById("pf_preview").style.display = "block";
      a = t.createNewImageElement(g);
      a.setAttribute("src", d);
      t.pf_preview_current.appendChild(a);
    }
  }, clear_image:function(a) {
    try {
      try {
        var b = a.originalTarget.ownerDocument;
      } catch (d) {
        b = document;
      }
      var c = b.getElementById("pf_preview");
      c.style.display = "none";
      c.style.right = "2px";
      c.style.left = "";
      t.pf_preview_current.innerHTML = "";
    } catch (d) {
    }
  }, add_events:function(a, b, c, d, e) {
    0 <= c.indexOf("#") || (t.tld = d, "pf_prevImg" != b.getAttribute("keepaPreview") && (b.addEventListener("mouseover", function(b) {
      t.preview_image(a, b, c, e, d);
      return !0;
    }, !0), b.addEventListener("mouseout", function(a) {
      t.clear_image(a);
    }, !1), b.setAttribute("keepaPreview", "pf_prevImg")));
  }};
})();

