var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.checkStringArgs = function(b, l, f) {
  if (null == b) {
    throw new TypeError("The 'this' value for String.prototype." + f + " must not be null or undefined");
  }
  if (l instanceof RegExp) {
    throw new TypeError("First argument to String.prototype." + f + " must not be a regular expression");
  }
  return b + "";
};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.defineProperty = $jscomp.ASSUME_ES5 || "function" == typeof Object.defineProperties ? Object.defineProperty : function(b, l, f) {
  b != Array.prototype && b != Object.prototype && (b[l] = f.value);
};
$jscomp.getGlobal = function(b) {
  return "undefined" != typeof window && window === b ? b : "undefined" != typeof global && null != global ? global : b;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.polyfill = function(b, l, f, h) {
  if (l) {
    f = $jscomp.global;
    b = b.split(".");
    for (h = 0; h < b.length - 1; h++) {
      var y = b[h];
      y in f || (f[y] = {});
      f = f[y];
    }
    b = b[b.length - 1];
    h = f[b];
    l = l(h);
    l != h && null != l && $jscomp.defineProperty(f, b, {configurable:!0, writable:!0, value:l});
  }
};
$jscomp.polyfill("String.prototype.startsWith", function(b) {
  return b ? b : function(b, f) {
    var h = $jscomp.checkStringArgs(this, b, "startsWith");
    b += "";
    var l = h.length, A = b.length;
    f = Math.max(0, Math.min(f | 0, h.length));
    for (var m = 0; m < A && f < l;) {
      if (h[f++] != b[m++]) {
        return !1;
      }
    }
    return m >= A;
  };
}, "es6", "es3");
$jscomp.polyfill("String.prototype.endsWith", function(b) {
  return b ? b : function(b, f) {
    var h = $jscomp.checkStringArgs(this, b, "endsWith");
    b += "";
    void 0 === f && (f = h.length);
    f = Math.max(0, Math.min(f | 0, h.length));
    for (var l = b.length; 0 < l && 0 < f;) {
      if (h[--f] != b[--l]) {
        return !1;
      }
    }
    return 0 >= l;
  };
}, "es6", "es3");
$jscomp.polyfill("Array.from", function(b) {
  return b ? b : function(b, f, h) {
    f = null != f ? f : function(b) {
      return b;
    };
    var l = [], A = "undefined" != typeof Symbol && Symbol.iterator && b[Symbol.iterator];
    if ("function" == typeof A) {
      b = A.call(b);
      for (var m = 0; !(A = b.next()).done;) {
        l.push(f.call(h, A.value, m++));
      }
    } else {
      for (A = b.length, m = 0; m < A; m++) {
        l.push(f.call(h, b[m], m));
      }
    }
    return l;
  };
}, "es6", "es3");
$jscomp.arrayIteratorImpl = function(b) {
  var l = 0;
  return function() {
    return l < b.length ? {done:!1, value:b[l++]} : {done:!0};
  };
};
$jscomp.arrayIterator = function(b) {
  return {next:$jscomp.arrayIteratorImpl(b)};
};
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function() {
  $jscomp.initSymbol = function() {
  };
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.SymbolClass = function(b, l) {
  this.$jscomp$symbol$id_ = b;
  $jscomp.defineProperty(this, "description", {configurable:!0, writable:!0, value:l});
};
$jscomp.SymbolClass.prototype.toString = function() {
  return this.$jscomp$symbol$id_;
};
$jscomp.Symbol = function() {
  function b(f) {
    if (this instanceof b) {
      throw new TypeError("Symbol is not a constructor");
    }
    return new $jscomp.SymbolClass($jscomp.SYMBOL_PREFIX + (f || "") + "_" + l++, f);
  }
  var l = 0;
  return b;
}();
$jscomp.initSymbolIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.iterator;
  b || (b = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("Symbol.iterator"));
  "function" != typeof Array.prototype[b] && $jscomp.defineProperty(Array.prototype, b, {configurable:!0, writable:!0, value:function() {
    return $jscomp.iteratorPrototype($jscomp.arrayIteratorImpl(this));
  }});
  $jscomp.initSymbolIterator = function() {
  };
};
$jscomp.initSymbolAsyncIterator = function() {
  $jscomp.initSymbol();
  var b = $jscomp.global.Symbol.asyncIterator;
  b || (b = $jscomp.global.Symbol.asyncIterator = $jscomp.global.Symbol("Symbol.asyncIterator"));
  $jscomp.initSymbolAsyncIterator = function() {
  };
};
$jscomp.iteratorPrototype = function(b) {
  $jscomp.initSymbolIterator();
  b = {next:b};
  b[$jscomp.global.Symbol.iterator] = function() {
    return this;
  };
  return b;
};
$jscomp.iteratorFromArray = function(b, l) {
  $jscomp.initSymbolIterator();
  b instanceof String && (b += "");
  var f = 0, h = {next:function() {
    if (f < b.length) {
      var y = f++;
      return {value:l(y, b[y]), done:!1};
    }
    h.next = function() {
      return {done:!0, value:void 0};
    };
    return h.next();
  }};
  h[Symbol.iterator] = function() {
    return h;
  };
  return h;
};
$jscomp.polyfill("Array.prototype.entries", function(b) {
  return b ? b : function() {
    return $jscomp.iteratorFromArray(this, function(b, f) {
      return [b, f];
    });
  };
}, "es6", "es3");
(function() {
  var b = window, l = !1;
  String.prototype.hashCode = function() {
    var a = 0, c;
    if (0 === this.length) {
      return a;
    }
    var d = 0;
    for (c = this.length; d < c; d++) {
      var b = this.charCodeAt(d);
      a = (a << 5) - a + b;
      a |= 0;
    }
    return a;
  };
  var f = window.opera || -1 < navigator.userAgent.indexOf(" OPR/"), h = -1 < navigator.userAgent.toLowerCase().indexOf("firefox"), y = -1 < navigator.userAgent.toLowerCase().indexOf("edge/"), A = h ? "firefox" : "chrome", m = !f && !h && !y, L = m ? "keepaChrome" : f ? "keepaOpera" : y ? "keepaEdge" : "keepaFirefox", D = !1;
  try {
    D = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent);
  } catch (a) {
  }
  if (m) {
    try {
      chrome.runtime.sendMessage("hnkcfpcejkafcihlgbojoidoihckciin", {type:"isActive"}, null, function(a) {
        chrome.runtime.lastError || a && a.isActive && (l = !0);
      });
    } catch (a) {
    }
  }
  y && (window.chrome = window.browser);
  var M = {}, O = 0, E = [], N = {}, Z = 0;
  Date.now();
  var aa = !1;
  if (m || f || h || y) {
    chrome.runtime.onMessage.addListener(function(a, c, d) {
      if (c.tab && c.tab.url || c.url) {
        switch(a.type) {
          case "getStorage":
            a.key && e.get(a.key, function() {
            });
            d({value:window.localStorage});
            break;
          case "getFreshStorage":
            if (1000 < Date.now() - O) {
              return e.iframeWin.postMessage({type:"getAllForKeepaBox"}, "*"), E.push(function() {
                d({value:M});
              }), !0;
            }
            d({value:M});
            break;
          case "setStorage":
            e.set(a.key, a.val);
            d({value:window.localStorage});
            break;
          case "getStock":
            return e.processStockJob(a, d), !0;
          case "removeStorage":
            e.remove(a.key);
            d({value:window.localStorage});
            break;
          case "getFilters":
            d({value:x.getFilters()});
            break;
          case "sendData":
            a = a.val;
            if (null != a.ratings) {
              if (c = a.ratings, 1000 > Z) {
                if ("f1" == a.key) {
                  if (c) {
                    for (var b = c.length; b--;) {
                      var t = c[b];
                      null == t || null == t.asin ? c.splice(b, 1) : (t = a.domainId + t.asin, N[t] ? c.splice(b, 1) : (N[t] = 1, Z++));
                    }
                    0 < c.length && q.sendPlainMessage(a);
                  }
                } else {
                  q.sendPlainMessage(a);
                }
              } else {
                N = null;
              }
            } else {
              q.sendPlainMessage(a);
            }
            d({});
            break;
          case "log":
            r.quiet || console.log(a.val);
            d({});
            break;
          case "refreshStorage":
            r.refreshSettings();
            d({value:window.localStorage});
            break;
          case "optionalPermissionsRequired":
            if (aa) {
              break;
            }
            aa = !0;
            d({value:m && "undefined" === typeof chrome.webRequest});
            break;
          case "optionalPermissionsDenied":
            e.set("optOut_crawl", "1");
            console.log("optionalPermissionsDenied");
            d({value:!0});
            break;
          case "optionalPermissions":
            return "undefined" === typeof chrome.webRequest && chrome.permissions.request({permissions:["webRequest", "webRequestBlocking"]}, function(a) {
              d({value:a});
              "undefined" != typeof a && (a ? (e.set("optOut_crawl", "0"), console.log("granted"), chrome.runtime.reload()) : (e.set("optOut_crawl", "1"), r.reportBug("permission denied"), console.log("denied")));
            }), !0;
          default:
            d({});
        }
      }
    });
    window.onload = function() {
      var a = document.getElementById("keepa_storage");
      a.src = "https://keepa.com/storageProxy" + (h ? "Firefox" : "") + ".html";
      a.onload = function() {
        document.getElementById("keepa_storage");
        r.register();
      };
    };
    try {
      chrome.browserAction.onClicked.addListener(function(a) {
        chrome.tabs.create({url:"https://keepa.com/#!manage"});
      });
    } catch (a) {
      console.log(a);
    }
  }
  var e = {storage:chrome.storage.local, contextMenu:function() {
    try {
      "Off" === e.storage.contextMenuActive ? chrome.contextMenus.removeAll() : (chrome.contextMenus.create({title:"View products on Keepa", contexts:["page"], documentUrlPatterns:"*://*.amazon.com/* *://*.amzn.com/* *://*.amazon.co.uk/* *://*.amazon.de/* *://*.amazon.fr/* *://*.amazon.it/* *://*.amazon.ca/* *://*.amazon.com.mx/* *://*.amazon.com.au/* *://*.amazon.es/* *://*.amazon.co.jp/* *://*.amazon.in/* *://*.amazon.com.br/*".split(" ")}), chrome.contextMenus.onClicked.addListener(function(a, 
      c) {
        chrome.tabs.sendMessage(c.id, {key:"collectASINs"}, {}, function(a) {
          "undefined" != typeof a && chrome.tabs.create({url:"https://keepa.com/#!viewer/" + encodeURIComponent(JSON.stringify(a))});
        });
      }));
    } catch (a) {
      console.log(a);
    }
  }, parseCookieHeader:function(a, c) {
    if (0 < c.indexOf("\n")) {
      c = c.split("\n");
      for (var d = 0; d < c.length; ++d) {
        var b = c[d].substring(0, c[d].indexOf(";")), t = b.indexOf("=");
        b = [b.substring(0, t), b.substring(t + 1)];
        2 == b.length && "-" != b[1] && a.push(b);
      }
    } else {
      c = c.substring(0, c.indexOf(";")), d = c.indexOf("="), c = [c.substring(0, d), c.substring(d + 1)], 2 == c.length && "-" != c[1] && a.push(c);
    }
  }, log:function(a) {
    r.quiet || console.log(a);
  }, iframeWin:null, operationComplete:!1, counter:0, stockInit:!1, stockReferer:[], stockSessions:[], stockCallbacks:[], stockOrigin:[], initStock:function() {
    if (!e.stockInit && "undefined" != typeof chrome.webRequest) {
      var a = "*://www.amazon.com/*?*kidkid* *://www.amazon.co.uk/*?*kidkid* *://www.amazon.es/*?*kidkid* *://www.amazon.nl/*?*kidkid* *://www.amazon.com.mx/*?*kidkid* *://www.amazon.it/*?*kidkid* *://www.amazon.in/*?*kidkid* *://www.amazon.de/*?*kidkid* *://www.amazon.fr/*?*kidkid* *://www.amazon.co.jp/*?*kidkid* *://www.amazon.ca/*?*kidkid* *://www.amazon.com.br/*?*kidkid* *://www.amazon.com.au/*?*kidkid* *://www.amazon.com.mx/*?*kidkid* *://smile.amazon.com/*?*kidkid* *://smile.amazon.co.uk/*?*kidkid* *://smile.amazon.es/*?*kidkid* *://smile.amazon.nl/*?*kidkid* *://smile.amazon.com.mx/*?*kidkid* *://smile.amazon.it/*?*kidkid* *://smile.amazon.in/*?*kidkid* *://smile.amazon.de/*?*kidkid* *://smile.amazon.fr/*?*kidkid* *://smile.amazon.co.jp/*?*kidkid* *://smile.amazon.ca/*?*kidkid* *://smile.amazon.com.br/*?*kidkid* *://smile.amazon.com.au/*?*kidkid* *://smile.amazon.com.mx/*?*kidkid*".split(" ");
      try {
        chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          var d = a.requestHeaders, c = {};
          try {
            var b = a.url.indexOf("kidkid");
            if (0 < b) {
              var F = a.url.substr(b + 7);
              if (0 < a.url.indexOf("cart/add.html") || 0 < a.url.indexOf("add-to-cart") || 0 < a.url.indexOf("item-dispatch")) {
                for (a = 0; a < d.length; ++a) {
                  if ("cookie" == d[a].name.toLowerCase() || "content-type" == d[a].name.toLowerCase()) {
                    d.splice(a, 1), a--;
                  }
                }
                if (19 > e.stockSessions[F].length) {
                  return c.cancel = !0, c;
                }
                d.push({name:"content-type", value:"application/x-www-form-urlencoded"});
                d.push({name:"cookie", value:e.stockSessions[F]});
                d.push({name:"sec-fetch-dest", value:"document"});
                d.push({name:"sec-fetch-mode", value:"navigate"});
                d.push({name:"sec-fetch-user", value:"?1"});
                d.push({name:"accept", value:"text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9"});
                d.push({name:"referer", value:e.stockReferer[F]});
              } else {
                for (a = 0; a < d.length; ++a) {
                  if ("cookie" == d[a].name.toLowerCase()) {
                    d.splice(a, 1);
                    break;
                  }
                }
              }
              d.push({name:"origin", value:"https://" + e.stockOrigin[F]});
              d.push({name:"cache-control", value:"max-age=0"});
              d.push({name:"upgrade-insecure-requests", value:"1"});
              d.push({name:"sec-fetch-site", value:"same-origin"});
              c.requestHeaders = d;
            } else {
              return console.error("unrecognized URL in onBeforeSendHeaders " + a.url), c.cancel = !0, c;
            }
          } catch (P) {
            console.error(P), c.cancel = !0;
          }
          return c;
        }, {urls:a}, m ? ["blocking", "requestHeaders", "extraHeaders"] : ["blocking", "requestHeaders"]), chrome.webRequest.onHeadersReceived.addListener(function(a) {
          var d = a.responseHeaders, c = {};
          try {
            var b = a.url.indexOf("kidkid"), F = [];
            if (0 < b) {
              var f = a.url.substr(b + 7);
              if (0 < a.url.indexOf("cart/add.html") || 0 < a.url.indexOf("add-to-cart") || 0 < a.url.indexOf("item-dispatch")) {
                for (var h = 0; h < d.length; ++h) {
                  "set-cookie" == d[h].name.toLowerCase() && (d.splice(h, 1), h--);
                }
                c.responseHeaders = d;
              } else {
                for (a = 0; a < d.length; ++a) {
                  h = d[a], "set-cookie" == h.name.toLowerCase() && e.parseCookieHeader(F, h.value);
                }
                c.cancel = !0;
                setTimeout(function() {
                  e.stockCallbacks[f](F);
                }, 10);
              }
            } else {
              return console.error("unrecognized URL in onHeadersReceived " + a.url), c.cancel = !0, c;
            }
          } catch (da) {
            console.error(da), c.cancel = !0;
          }
          return c;
        }, {urls:a}, m ? ["blocking", "responseHeaders", "extraHeaders"] : ["blocking", "responseHeaders"]), e.stockInit = !0;
      } catch (c) {
        console.error(c);
      }
    }
  }, stockServer:{stock:null, price:null, stockAdd:null, limit:null, zipCodes:null, stockEnabled:null}, processStockJob:function(a, c) {
    if (null == e.stockServer.stock) {
      console.log("stock retrieval not initialized");
    } else {
      if (0 == e.stockServer.stockEnabled[a.domainId]) {
        console.log("stock retrieval not supported for domain");
      } else {
        if (e.initStock(), e.stockInit) {
          a.id = e.counter++;
          a.id2 = e.counter++;
          e.stockOrigin[a.id2] = a.host;
          e.stockOrigin[a.id] = a.host;
          setTimeout(function() {
            delete e.stockSessions[a.id2];
            delete e.stockCallbacks[a.id];
            delete e.stockReferer[a.id2];
            delete e.stockOrigin[a.id2];
            delete e.stockOrigin[a.id];
          }, 120000);
          var d = e.stockServer.zipCodes[a.domainId];
          e.stockCallbacks[a.id] = function(d) {
            for (var b = "", X = !1, f = !1, h = 0, l = 0; l < d.length; ++l) {
              var m = d[l];
              b += m[0] + "=" + m[1] + "; ";
              "session-id" == m[0] && 19 == m[1].length && (X = !0, m[1] != a.session && (f = !0, h = m[1]));
            }
            a.cookie = b;
            X && f ? (e.stockSessions[a.id2] = b, e.stockReferer[a.id2] = a.referer, r.httpPost("https://" + a.host + "/gp/item-dispatch/ref=olp_atc_new_1?kidkid=" + a.id2, "session-id=" + h + "&qid=&sr=&signInToHUC=0&metric-asin." + a.asin + "=1&registryItemID.1=&registryID.1=&quantity.1=999&discoveredAsins.0=" + a.asin + "&canonicalAsin.0=" + a.asin + "&itemCount=1&offeringID.1=" + a.oid + "&isAddon=1&submit.addToCart=" + e.stockServer.stockAdd[a.domainId], function(d) {
              var b = d.match(new RegExp(e.stockServer.stock)), t = d.match(new RegExp(e.stockServer.price));
              d = (new RegExp(e.stockServer.limit)).test(d);
              b ? (b = parseInt(b[1]), c({stock:b, limit:d, price:t ? parseInt(t[1].replace(/[\D]/g, "")) / b : -1})) : console.log("failed for offer: ", a.asin + " " + a.oid);
            }, !1)) : console.log("session issue", X, f);
          };
          r.httpPost("https://" + a.host + "/gp/delivery/ajax/address-change.html?kidkid=" + a.id, "locationType=LOCATION_INPUT&zipCode=" + d + "&storeContext=generic&deviceType=web&pageType=Gateway&actionSource=glow&almBrandId=undefined", null, !1);
        }
      }
    }
  }, init:function() {
    e.iframeWin = document.getElementById("keepa_storage").contentWindow;
    e.iframeWin.postMessage({type:"getAll"}, "*");
    r.convertToStorage();
    var a = null;
    e.get(["token", "hashSynced"], function(c) {
      a = c.token;
      !a && (m || h || y) && (c = chrome.storage.sync, "undefined" == c && (c = chrome.storage.local), "undefined" != c && c.get("KeepaHash", function(d) {
        if (!chrome.runtime.lastError) {
          try {
            var c = d.KeepaHash;
            c && 64 == c.length ? (e.set("token", c), console.log("loaded token from sync")) : e.get({token:r.Guid.newGuid()}, function(d) {
              a = d.token;
            });
          } catch (t) {
            r.reportBug(t, "r9");
          }
        }
      }));
    });
    chrome.storage.onChanged.addListener(function(a, d) {
      if ("local" == d) {
        for (var c in a) {
          d = a[c], "string" != typeof d.oldValue && (d.oldValue = JSON.stringify(d.oldValue)), "string" != typeof d.newValue && (d.newValue = JSON.stringify(d.newValue)), d.oldValue != d.newValue && e.iframeWin.postMessage({type:"set", key:c, value:d.newValue}, "*");
        }
      }
    });
    window.addEventListener("message", function(a) {
      var d = a.data;
      if (d) {
        if ("string" === typeof d) {
          try {
            d = JSON.parse(d);
          } catch (Y) {
            return;
          }
        }
        if (d.log) {
          console.log(d.log);
        } else {
          var b = function() {
          };
          if (a.origin != r.url && a.origin != r.testUrl) {
            var c = x.getMessage();
            if (null != c && ("function" == typeof c.onDoneC && (b = c.onDoneC, delete c.onDoneC), "undefined" == typeof c.sent && d.sandbox && a.source == document.getElementById("keepa_data").contentWindow)) {
              if (d.sandbox == c.url) {
                x.setStatTime(40);
                try {
                  a.source.postMessage({key:"data", value:c}, "*");
                } catch (Y) {
                  x.abortJob(407), b();
                }
              } else {
                d.isUrlMsg ? (c.wasUrl = d.sandbox, x.abortJob(405)) : (c = x.getOutgoingMessage(c, d.sandbox), q.sendMessage(c)), b();
              }
            }
          } else {
            switch(d.type) {
              case "get":
                e.set(d.key, d.value);
                break;
              case "getAllForKeepaBox":
                c = {};
                b = !0;
                for (var f in d.value) {
                  f.startsWith("test_") || (console.log(f), (a = d.value[f]) && "null" != a && "" != a && "undefined" != a && (c[f] = a, b = !1));
                }
                if (!b) {
                  for (M = c, O = Date.now(); 0 < E.length;) {
                    if (f = E.pop(), null != f) {
                      f(c);
                    } else {
                      break;
                    }
                  }
                }
                break;
              case "getAll":
                f = d.value;
                b = {};
                a = !0;
                for (c in f) {
                  var h = f[c];
                  h && "null" != h && "" != h && "undefined" != h && (b[c] = h, a = !1);
                }
                a || e.setAll(b);
                break;
              case "update":
                e.get(d.key, function(a) {
                  a[d.key] != d.value && (d.value ? ("token" == d.key && document.location.reload(), e.set(d.key, d.value)) : e.remove(d.key));
                });
            }
          }
        }
      }
    });
  }, set:function(a, c, d) {
    var b = {};
    b[a] = c;
    e.storage.set(b, d);
    e.iframeWin.postMessage({type:"set", key:a, value:c}, "*");
    "token" == a && 64 == c.length && (m || h || y) && (a = chrome.storage.sync, "undefined" != a && a.set({KeepaHash:c}, function() {
    }));
  }, remove:function(a, c) {
    e.storage.remove(a, c);
    e.iframeWin.postMessage({type:"remove", key:a}, "*");
  }, get:function(a, c) {
    "function" != typeof c && (c = function() {
    });
    e.storage.get(a, function(d) {
      if ("string" == typeof a && void 0 == d[a]) {
        if (d = r.defaultSettings[a]) {
          e.set(a, d);
          var b = {};
          b[a] = d;
          c(b);
        } else {
          c({});
        }
      } else {
        c(d);
      }
    });
  }, getAll:function(a) {
    e.storage.get(a);
  }, setAll:function(a, b) {
    e.storage.set(a, b);
    void 0 != a.token && 64 == a.token.length && (m || h || y) && (b = chrome.storage.sync, "undefined" != b && b.set({KeepaHash:a.token}, function() {
    }));
  }};
  e.get(["install", "optOut_crawl"], function(a) {
  });
  (m || f || h) && e.contextMenu();
  var r = {quiet:!0, version:"3.61", browser:1, url:"https://keepa.com", testUrl:"https://test.keepa.com", getDomain:function(a) {
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
        return 1;
    }
  }, objectStorage:[], Guid:function() {
    var a = function(d, b, c) {
      return d.length >= b ? d : a(c + d, b, c || " ");
    }, b = function() {
      var a = (new Date).getTime();
      return "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx".replace(/x/g, function(d) {
        var b = (a + 16 * Math.random()) % 16 | 0;
        a = Math.floor(a / 16);
        return ("x" === d ? b : b & 7 | 8).toString(16);
      });
    };
    return {newGuid:function() {
      var d = "undefined" != typeof window.crypto.getRandomValues;
      if ("undefined" != typeof window.crypto && d) {
        d = new window.Uint16Array(16);
        window.crypto.getRandomValues(d);
        var c = "";
        for (f in d) {
          var e = d[f].toString(16);
          e = a(e, 4, "0");
          c += e;
        }
        var f = c;
      } else {
        f = b();
      }
      return f;
    }};
  }(), convertToStorage:function() {
    chrome.storage.local.get("migrated", function(a) {
      if (void 0 == a.migrated) {
        a = {migrated:1};
        for (var b in localStorage) {
          var d = localStorage[b];
          d && "function" != typeof d && (a[b] = d);
        }
        chrome.storage.local.set(a, function() {
          chrome.runtime.lastError || localStorage.clear();
        });
      }
    });
  }, defaultSettings:{s_merchantChart:"111", s_range:"2160", s_zoom:"0", s_extreme:"0", s_dateFormat:"D, M j G:i", s_percent:"5", s_merchantTrack:"100", s_boxVertical:"200", s_boxHorizontal:"0", s_boxType:"0", s_alerts:"0", s_alertTimer:"900000", extremeFilter:"0", revealStock:"0", optOut_crawl:"0"}, resetSettings:function() {
    console.log("loading default settings.");
    for (var a in r.defaultSettings) {
      e.set(a, r.defaultSettings[a]);
    }
    e.set("install", Date.now());
    e.set("token", r.Guid.newGuid());
  }, settingsArray:"s_merchantChart s_range s_zoom s_extreme s_dateFormat s_percent s_merchantTrack s_boxVertical s_boxHorizontal s_boxType s_alerts s_alertTimer extremeFilter revealStock".split(" "), refreshSettings:function() {
  }, register:function() {
    e.init();
    h ? e.set("addonVersionFirefox", r.version) : e.set("addonVersionChrome", r.version);
    try {
      chrome.runtime.setUninstallURL("https://dyn.keepa.com/app/stats/?type=uninstall&version=" + L + "." + r.version);
    } catch (a) {
    }
    m && setTimeout(function() {
      e.get("noFreshInstall", function(a) {
        if ("undefined" == typeof a.noFreshInstall) {
          try {
            e.set("noFreshInstall", 1);
          } catch (c) {
            r.reportBug(c);
          }
        }
      });
    }, 3000);
    e.get(["s_merchantChart", "token"], function(a) {
      void 0 != a.s_merchantChart && void 0 != a.token && 64 == a.token.length || r.resetSettings();
    });
    (m || f || h || y) && window.setTimeout(function() {
      q.initWebSocket();
    }, 800);
  }, unregister:function() {
  }, log:function(a) {
    e.log(a);
  }, lastBugReport:0, reportBug:function(a, b, d) {
    e.get(["install", "token"], function(c) {
      var e = Date.now();
      if (!(12E5 > e - r.lastBugReport || /(dead object)|(Script error)|(setUninstallURL)|(File error: Corrupted)|(operation is insecure)|(\.location is null)/i.test(a))) {
        r.lastBugReport = e;
        e = "";
        var f = r.version;
        b = b || "";
        try {
          if (e = Error().stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;"), !/(keepa|content)\.js/.test(e) || e.startsWith("https://www.amazon") || e.startsWith("https://smile.amazon") || e.startsWith("https://sellercentral")) {
            return;
          }
        } catch (P) {
        }
        try {
          e = e.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
        } catch (P) {
        }
        if ("object" == typeof a) {
          try {
            a = JSON.stringify(a);
          } catch (P) {
          }
        }
        null == d && (d = {exception:a, additional:b, url:document.location.toString(), stack:e});
        d.keepaType = L;
        d.version = f;
        setTimeout(function() {
          r.httpPost("https://dyn.keepa.com/service/bugreport/?user=" + c.token + "&type=" + A + "&version=" + f, JSON.stringify(d), null, !1);
        }, 50);
      }
    });
  }, httpGet:function(a, b, d) {
    var c = new XMLHttpRequest;
    b && (c.onreadystatechange = function() {
      4 == c.readyState && b.call(this, c.responseText);
    });
    c.withCredentials = d;
    c.open("GET", a, !0);
    c.send();
  }, httpPost:function(a, b, d, e) {
    var c = new XMLHttpRequest;
    d && (c.onreadystatechange = function() {
      4 == c.readyState && d.call(this, c.responseText);
    });
    c.withCredentials = e;
    c.open("POST", a, !0);
    c.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    c.send(b);
  }};
  window.addEventListener("error", function(a, b, d, e, f) {
    "object" === typeof a && a.srcElement && a.target && (a = "[object HTMLScriptElement]" == a.srcElement && "[object HTMLScriptElement]" == a.target ? "Error loading script" : "Event Error - target:" + a.target + " srcElement:" + a.srcElement);
    a = a.toString();
    var c = "";
    e = e || 0;
    if (f && f.stack) {
      c = f.stack;
      try {
        c = f.stack.split("\n").splice(1).splice(1).join("&ensp;&lArr;&ensp;");
        if (!/(keepa|content)\.js/.test(c)) {
          return;
        }
        c = c.replace(/chrome-extension:\/\/.*?\/content\//g, "").replace(/:[0-9]*?\)/g, ")").replace(/[ ]{2,}/g, "");
      } catch (P) {
      }
    }
    a = {msg:a, url:(b || document.location.toString()) + ":" + parseInt(d || 0) + ":" + parseInt(e || 0), stack:c};
    "ipbakfmnjdenbmoenhicfmoojdojjjem" != chrome.runtime.id && "blfpbjkajgamcehdbehfdioapoiibdmc" != chrome.runtime.id || console.log(a);
    r.reportBug(null, null, a);
    return !1;
  });
  var ba = 0;
  if (m || f || h || y) {
    var q = {server:["wss://push.keepa.com", "wss://push2.keepa.com"], serverIndex:0, clearTimeout:0, webSocket:null, sendPlainMessage:function(a) {
      D || (a = JSON.stringify(a), q.webSocket.send(pako.deflate(a)));
    }, sendMessage:function(a) {
      if (!D) {
        x.clearIframe();
        var c = pako.deflate(JSON.stringify(a));
        x.clearMessage();
        1 == q.webSocket.readyState && q.webSocket.send(c);
        403 == a.status && x.endSession(ba);
        b.console.clear();
      }
    }, initWebSocket:function() {
      D || e.get(["token", "optOut_crawl"], function(a) {
        var b = a.token, d = a.optOut_crawl;
        if (b && 64 == b.length) {
          var f = function() {
            delete localStorage.session;
            if (null == q.webSocket || 1 != q.webSocket.readyState) {
              q.serverIndex %= q.server.length;
              if ("undefined" == typeof d || "undefined" == d || null == d || "null" == d) {
                d = "0";
              }
              l && (d = "1");
              "undefined" === typeof chrome.webRequest && (d = "1");
              var a = new WebSocket(q.server[q.serverIndex] + "/apps/cloud/?user=" + b + "&app=" + L + "&version=" + r.version + "&optOut=" + d);
              a.binaryType = "arraybuffer";
              a.onmessage = function(a) {
                a = a.data;
                var b = null;
                a instanceof ArrayBuffer && (a = pako.inflate(a, {to:"string"}));
                try {
                  b = JSON.parse(a);
                } catch (Y) {
                  r.reportBug(Y, a);
                  return;
                }
                108 != b.status && (108108 == b.timeout ? b.stock && (e.stockServer.stock = b.stock, e.stockServer.stockAdd = b.stockAdd, e.stockServer.price = b.price, e.stockServer.limit = b.stockLimit, e.stockServer.zipCodes = b.zipCodes, e.stockServer.stockEnabled = b.stockEnabled) : (b.domainId && (ba = b.domainId), x.clearIframe(), x.onMessage(b)));
              };
              a.onclose = function(a) {
                setTimeout(function() {
                  f();
                }, 18E4 * Math.random());
              };
              a.onerror = function(b) {
                q.serverIndex++;
                a.close();
              };
              a.onopen = function() {
                x.abortJob(414);
              };
              q.webSocket = a;
            }
          };
          f();
        }
      });
    }};
  }
  if (m || f || h || y) {
    var x = function() {
      function a(a) {
        try {
          k.stats.times.push(a), k.stats.times.push(Date.now() - k.stats.start);
        } catch (n) {
        }
      }
      function c(b, d) {
        b.sent = !0;
        a(25);
        var c = b.key, v = b.messageId;
        b = b.stats;
        try {
          var g = z[B]["session-id"];
        } catch (Q) {
          g = "";
        }
        c = {key:c, messageId:v, stats:b, sessionId:g, payload:[], status:200};
        for (var e in d) {
          c[e] = d[e];
        }
        return c;
      }
      function d(b) {
        B = k.domainId;
        R = A(z);
        "object" != typeof z[B] && (z[B] = {});
        "undefined" == typeof k.headers.Accept && (k.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        l(b, !b.isAjax, function(d) {
          a(0);
          var e = {payload:[]};
          if (d.match(E)) {
            e.status = 403;
          } else {
            if (b.contentFilters && 0 < b.contentFilters.length) {
              for (var v in b.contentFilters) {
                var g = d.match(new RegExp(b.contentFilters[v]));
                if (g) {
                  e.payload[v] = g[1].replace(/\n/g, "");
                } else {
                  e.status = 305;
                  e.payload[v] = d;
                  break;
                }
              }
            } else {
              e.payload = [d];
            }
          }
          try {
            b.stats.times.push(3), b.stats.times.push(r.lastBugReport);
          } catch (u) {
          }
          "undefined" == typeof b.sent && (e = c(b, e), q.sendMessage(e));
        });
      }
      function f(b) {
        B = k.domainId;
        R = A(z);
        "object" != typeof z[B] && (z[B] = {});
        "undefined" == typeof k.headers.Accept && (k.headers.Accept = "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*!/!*;q=0.8");
        a(4);
        l(b, !b.isAjax, function(d, e) {
          a(6);
          if ("undefined" == typeof b.sent) {
            var f = {};
            try {
              for (var g = d.evaluate("//comment()", d, null, XPathResult.ANY_TYPE, null), n = g.iterateNext(), v = ""; n;) {
                v += n.textContent, n = g.iterateNext();
              }
              if (d.querySelector("body").textContent.match(E) || v.match(E)) {
                f.status = 403;
                if ("undefined" != typeof b.sent) {
                  return;
                }
                f = c(b, f);
                q.sendMessage(f);
                return;
              }
            } catch (C) {
            }
            a(7);
            if (b.scrapeFilters && 0 < b.scrapeFilters.length) {
              var h = {}, k = {}, l = {}, m = "", G = null, x = function() {
                if ("" === m) {
                  f.payload = [G];
                  f.scrapedData = l;
                  for (var a in k) {
                    f[a] = k[a];
                  }
                } else {
                  f.status = 305, f.payload = [G, m, ""];
                }
                try {
                  b.stats.times.push(99), b.stats.times.push(r.lastBugReport);
                } catch (ha) {
                }
                "undefined" == typeof b.sent && (f = c(b, f), q.sendMessage(f));
              }, A = function(a, b, c) {
                var e = [];
                if (!a.selector) {
                  if (!a.regExp) {
                    return m = "invalid selector, sel/regexp", !1;
                  }
                  e = d.querySelector("html").innerHTML.match(new RegExp(a.regExp));
                  if (!e || e.length < a.reGroup) {
                    c = "regexp fail: html - " + a.name + c;
                    if (!1 === a.optional) {
                      return m = c, !1;
                    }
                    G += " // " + c;
                    return !0;
                  }
                  return e[a.reGroup];
                }
                var g = b.querySelectorAll(a.selector);
                0 == g.length && (g = b.querySelectorAll(a.altSelector));
                if (0 == g.length) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  m = "selector no match: " + a.name + c;
                  return !1;
                }
                if (a.parentSelector && (g = [g[0].parentNode.querySelector(a.parentSelector)], null == g[0])) {
                  if (!0 === a.optional) {
                    return !0;
                  }
                  m = "parent selector no match: " + a.name + c;
                  return !1;
                }
                if ("undefined" != typeof a.multiple && null != a.multiple && (!0 === a.multiple && 1 > g.length || !1 === a.multiple && 1 < g.length)) {
                  c = "selector multiple mismatch: " + a.name + c + " found: " + g.length;
                  if (!1 === a.optional) {
                    return m = c, !1;
                  }
                  G += " // " + c;
                  return !0;
                }
                if (a.isListSelector) {
                  return h[a.name] = g, !0;
                }
                if (!a.attribute) {
                  return m = "selector attribute undefined?: " + a.name + c, !1;
                }
                for (var f in g) {
                  if (g.hasOwnProperty(f)) {
                    b = g[f];
                    if (!b) {
                      break;
                    }
                    if (a.childNode) {
                      a.childNode = Number(a.childNode);
                      b = b.childNodes;
                      if (b.length < a.childNode) {
                        c = "childNodes fail: " + b.length + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return m = c, !1;
                        }
                        G += " // " + c;
                        return !0;
                      }
                      b = b[a.childNode];
                    }
                    b = "text" == a.attribute ? b.textContent : "html" == a.attribute ? b.innerHTML : b.getAttribute(a.attribute);
                    if (!b || 0 == b.length || 0 == b.replace(/(\r\n|\n|\r)/gm, "").replace(/^\s+|\s+$/g, "").length) {
                      c = "selector attribute null: " + a.name + c;
                      if (!1 === a.optional) {
                        return m = c, !1;
                      }
                      G += " // " + c;
                      return !0;
                    }
                    if (a.regExp) {
                      var n = b.match(new RegExp(a.regExp));
                      if (!n || n.length < a.reGroup) {
                        c = "regexp fail: " + b + " - " + a.name + c;
                        if (!1 === a.optional) {
                          return m = c, !1;
                        }
                        G += " // " + c;
                        return !0;
                      }
                      e.push("undefined" == typeof n[a.reGroup] ? n[0] : n[a.reGroup]);
                    } else {
                      e.push(b);
                    }
                    if (!a.multiple) {
                      break;
                    }
                  }
                }
                return a.multiple ? e : e[0];
              };
              n = !1;
              g = {};
              for (var z in b.scrapeFilters) {
                g.$jscomp$loop$prop$pageType$67 = z;
                a: {
                  if (n) {
                    break;
                  }
                  g.$jscomp$loop$prop$pageFilter$64 = b.scrapeFilters[g.$jscomp$loop$prop$pageType$67];
                  g.$jscomp$loop$prop$pageVersionTest$65 = g.$jscomp$loop$prop$pageFilter$64.pageVersionTest;
                  v = d.querySelectorAll(g.$jscomp$loop$prop$pageVersionTest$65.selector);
                  0 == v.length && (v = d.querySelectorAll(g.$jscomp$loop$prop$pageVersionTest$65.altSelector));
                  if (0 != v.length) {
                    if ("undefined" != typeof g.$jscomp$loop$prop$pageVersionTest$65.multiple && null != g.$jscomp$loop$prop$pageVersionTest$65.multiple) {
                      if (!0 === g.$jscomp$loop$prop$pageVersionTest$65.multiple && 2 > v.length) {
                        break a;
                      }
                      if (!1 === g.$jscomp$loop$prop$pageVersionTest$65.multiple && 1 < v.length) {
                        break a;
                      }
                    }
                    if (g.$jscomp$loop$prop$pageVersionTest$65.attribute) {
                      var t = null;
                      t = "text" == g.$jscomp$loop$prop$pageVersionTest$65.attribute ? "" : v[0].getAttribute(g.$jscomp$loop$prop$pageVersionTest$65.attribute);
                      if (null == t) {
                        break a;
                      }
                    }
                    var B = g.$jscomp$loop$prop$pageType$67;
                    g.$jscomp$loop$prop$revealMAP$81 = g.$jscomp$loop$prop$pageFilter$64.revealMAP;
                    g.$jscomp$loop$prop$revealed$83 = !1;
                    g.$jscomp$loop$prop$afterAjaxFinished$84 = function(c) {
                      return function() {
                        var g = 0, e = [], n = 500, v = [], m = !1;
                        a(26);
                        var p = {}, H;
                        for (H in c.$jscomp$loop$prop$pageFilter$64) {
                          p.$jscomp$loop$prop$sel$69 = c.$jscomp$loop$prop$pageFilter$64[H];
                          if (!(p.$jscomp$loop$prop$sel$69.name == c.$jscomp$loop$prop$pageVersionTest$65.name || c.$jscomp$loop$prop$revealed$83 && "revealMAP" == p.$jscomp$loop$prop$sel$69.name)) {
                            var r = d;
                            if (p.$jscomp$loop$prop$sel$69.parentList) {
                              var u = [];
                              if ("undefined" != typeof h[p.$jscomp$loop$prop$sel$69.parentList]) {
                                u = h[p.$jscomp$loop$prop$sel$69.parentList];
                              } else {
                                if (!0 === A(c.$jscomp$loop$prop$pageFilter$64[p.$jscomp$loop$prop$sel$69.parentList], r, c.$jscomp$loop$prop$pageType$67)) {
                                  u = h[p.$jscomp$loop$prop$sel$69.parentList];
                                } else {
                                  break;
                                }
                              }
                              k[p.$jscomp$loop$prop$sel$69.parentList] || (k[p.$jscomp$loop$prop$sel$69.parentList] = []);
                              r = 0;
                              p.$jscomp$loop$prop$appendedHTMLOnce$70 = !1;
                              var q = {}, C;
                              for (C in u) {
                                if (u.hasOwnProperty(C)) {
                                  if ("stock" == p.$jscomp$loop$prop$sel$69.name) {
                                    r++;
                                    try {
                                      var w = void 0, t = void 0;
                                      p.$jscomp$loop$prop$sel$69.selector && (w = u[C].querySelector(p.$jscomp$loop$prop$sel$69.selector));
                                      p.$jscomp$loop$prop$sel$69.altSelector && (t = u[C].querySelector(p.$jscomp$loop$prop$sel$69.altSelector));
                                      t && (t = t.getAttribute(p.$jscomp$loop$prop$sel$69.attribute));
                                      if (w && t) {
                                        var z = w.querySelector('input[type="submit"]'), B = document.createElement("input");
                                        B.name = z.getAttribute("name");
                                        B.value = z.getAttribute("value");
                                        var Q = document.createElement("input");
                                        Q.type = "hidden";
                                        var S = p.$jscomp$loop$prop$sel$69.regExp.split(";");
                                        Q.name = S[0];
                                        Q.value = S[1];
                                        v.push(t);
                                        w.appendChild(Q);
                                        w.appendChild(B);
                                        var ca = Array.from((new FormData(w)).entries());
                                        q.$jscomp$loop$prop$postData$73 = [];
                                        for (t = 0; t < ca.length; t++) {
                                          var D = ca[t];
                                          null != D && 2 == D.length && ("mbbq" == D[0] && (D[1] = 0), q.$jscomp$loop$prop$postData$73.push(D[0] + "=" + encodeURIComponent(D[1])));
                                        }
                                        q.$jscomp$loop$prop$postData$73 = q.$jscomp$loop$prop$postData$73.join("&").replace(/%20/g, "+");
                                        q.$jscomp$loop$prop$url$72 = "https://" + (new URL(b.url)).hostname + w.getAttribute("action");
                                        n = p.$jscomp$loop$prop$sel$69.reGroup;
                                        e.push(function(a, c) {
                                          return function() {
                                            var d = 0 == e.length;
                                            g++;
                                            var n = new XMLHttpRequest, h = !1, u = function() {
                                              h = !0;
                                              0 == --g && 0 == e.length ? x() : 0 < e.length && e.shift()();
                                            }, l = setTimeout(u, 4000), p = function(c) {
                                              for (var e = 0; e < v.length; e++) {
                                                var g = v[e];
                                                try {
                                                  var n = 0;
                                                  a: for (; n < k[a.$jscomp$loop$prop$sel$69.parentList].length; n++) {
                                                    var h = -1, u = k[a.$jscomp$loop$prop$sel$69.parentList][n];
                                                    if (!(u[a.$jscomp$loop$prop$sel$69.name] >= h)) {
                                                      for (var p in u) {
                                                        if (u[p] == g) {
                                                          var l = JSON.parse(a.$jscomp$loop$prop$sel$69.childNode);
                                                          l[0] = l[0].replace("[ID]", g);
                                                          var H = c.match(new RegExp(l[0]));
                                                          if (H && !(2 > H.length)) {
                                                            var q = H[1].match(new RegExp(l[1]));
                                                            q && 2 == H.length && (h = q[1], !u[a.$jscomp$loop$prop$sel$69.name] || u[a.$jscomp$loop$prop$sel$69.name] < h) && (k[a.$jscomp$loop$prop$sel$69.parentList][n][a.$jscomp$loop$prop$sel$69.name] = h);
                                                            break a;
                                                          }
                                                        }
                                                      }
                                                    }
                                                  }
                                                } catch (ja) {
                                                  try {
                                                    a.$jscomp$loop$prop$appendedHTMLOnce$70 || (a.$jscomp$loop$prop$appendedHTMLOnce$70 = !0, f.payload || (f.payload = [""]), null == f.payload[0] && (f.payload[0] = ""), f.payload[0] += " // toofast", b.dbg2 && f.payload.push(c));
                                                  } catch (ka) {
                                                  }
                                                }
                                              }
                                              !m && 0 < c.indexOf(a.$jscomp$loop$prop$sel$69.parentSelector) && (m = !0);
                                              return !d;
                                            };
                                            n.onreadystatechange = function() {
                                              h || 4 != n.readyState || (clearTimeout(l), 200 == n.status && !p(n.responseText) && m && (g++, y(c.$jscomp$loop$prop$url$72, "GET", null, 4000, function(a) {
                                                p(a);
                                                0 == --g && 0 == e.length && x();
                                              })), 0 == --g && 0 == e.length && x());
                                            };
                                            n.onerror = u;
                                            n.open("POST", c.$jscomp$loop$prop$url$72, !0);
                                            n.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
                                            n.send(c.$jscomp$loop$prop$postData$73);
                                          };
                                        }(p, q));
                                      }
                                    } catch (fa) {
                                    }
                                  } else {
                                    if ("revealMAP" == p.$jscomp$loop$prop$sel$69.name) {
                                      q.$jscomp$loop$prop$revealMAP$37$74 = p.$jscomp$loop$prop$sel$69, w = void 0, w = q.$jscomp$loop$prop$revealMAP$37$74.selector ? u[C].querySelector(q.$jscomp$loop$prop$revealMAP$37$74.selector) : u[C], null != w && w.textContent.match(new RegExp(q.$jscomp$loop$prop$revealMAP$37$74.regExp)) && (w = b.url.match(/([BC][A-Z0-9]{9}|\d{9}(!?X|\d))/)[1], t = c.$jscomp$loop$prop$pageFilter$64.sellerId, "undefined" == typeof t || null == t || null == w || 2 > w.length || 
                                      (t = u[C].querySelector(p.$jscomp$loop$prop$sel$69.childNode).value, null == t || 20 > t + 0 || (w = q.$jscomp$loop$prop$revealMAP$37$74.altSelector.replace("OFFERID", t).replace("ASINID", w), g++, q.$jscomp$loop$prop$mapIndex$75 = C + "", y(w, "GET", null, 3000, function(a) {
                                        return function(b) {
                                          try {
                                            var d = c.$jscomp$loop$prop$pageFilter$64.price;
                                            if (d && d.regExp) {
                                              if (b.match(/no valid offer--/)) {
                                                k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75] || (k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75] = {}), k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75][a.$jscomp$loop$prop$revealMAP$37$74.name] = -1;
                                              } else {
                                                var n = b.match(new RegExp("price info--\x3e(?:.|\\n)*?" + d.regExp + "(?:.|\\n)*?\x3c!--")), f = b.match(/price info--\x3e(?:.|\n)*?(?:<span.*?size-small.*?">)([^]*?<\/span)(?:.|\n)*?\x3c!--/);
                                                if (!n || n.length < d.reGroup) {
                                                  G += " //  priceMAP regexp fail: " + (b + " - " + d.name + c.$jscomp$loop$prop$pageType$67);
                                                } else {
                                                  var v = n[d.reGroup];
                                                  k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75] || (k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75] = {});
                                                  k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75][a.$jscomp$loop$prop$revealMAP$37$74.name] = v;
                                                  null != f && 2 == f.length && (k[a.$jscomp$loop$prop$revealMAP$37$74.parentList][a.$jscomp$loop$prop$mapIndex$75][a.$jscomp$loop$prop$revealMAP$37$74.name + "Shipping"] = f[1].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                                }
                                              }
                                            }
                                          } catch (ia) {
                                          }
                                          0 == --g && 0 == e.length && x();
                                        };
                                      }(q), function() {
                                        0 == --g && 0 == e.length && x();
                                      }))));
                                    } else {
                                      w = A(p.$jscomp$loop$prop$sel$69, u[C], c.$jscomp$loop$prop$pageType$67);
                                      if (!1 === w) {
                                        break;
                                      }
                                      if (!0 !== w) {
                                        if (k[p.$jscomp$loop$prop$sel$69.parentList][C] || (k[p.$jscomp$loop$prop$sel$69.parentList][C] = {}), p.$jscomp$loop$prop$sel$69.multiple) {
                                          for (var E in w) {
                                            w.hasOwnProperty(E) && !p.$jscomp$loop$prop$sel$69.keepBR && (w[E] = w[E].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                          }
                                          w = w.join("\u271c\u271c");
                                          k[p.$jscomp$loop$prop$sel$69.parentList][C][p.$jscomp$loop$prop$sel$69.name] = w;
                                        } else {
                                          k[p.$jscomp$loop$prop$sel$69.parentList][C][p.$jscomp$loop$prop$sel$69.name] = p.$jscomp$loop$prop$sel$69.keepBR ? w : w.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " ");
                                        }
                                      }
                                    }
                                  }
                                }
                                q = {$jscomp$loop$prop$url$72:q.$jscomp$loop$prop$url$72, $jscomp$loop$prop$postData$73:q.$jscomp$loop$prop$postData$73, $jscomp$loop$prop$revealMAP$37$74:q.$jscomp$loop$prop$revealMAP$37$74, $jscomp$loop$prop$mapIndex$75:q.$jscomp$loop$prop$mapIndex$75};
                              }
                            } else {
                              u = A(p.$jscomp$loop$prop$sel$69, r, c.$jscomp$loop$prop$pageType$67);
                              if (!1 === u) {
                                break;
                              }
                              if (!0 !== u) {
                                if (p.$jscomp$loop$prop$sel$69.multiple) {
                                  for (var F in u) {
                                    u.hasOwnProperty(F) && !p.$jscomp$loop$prop$sel$69.keepBR && (u[F] = u[F].replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                  }
                                  u = u.join();
                                } else {
                                  p.$jscomp$loop$prop$sel$69.keepBR || (u = u.replace(/(\r\n|\n|\r)/gm, " ").replace(/^\s+|\s+$/g, "").replace(/\s{2,}/g, " "));
                                }
                                l[p.$jscomp$loop$prop$sel$69.name] = u;
                              }
                            }
                          }
                          p = {$jscomp$loop$prop$sel$69:p.$jscomp$loop$prop$sel$69, $jscomp$loop$prop$appendedHTMLOnce$70:p.$jscomp$loop$prop$appendedHTMLOnce$70};
                        }
                        try {
                          if (1 == e.length || (n + "").endsWith("8") && 0 < e.length) {
                            e.shift()();
                          } else {
                            for (p = 0; p < e.length; p++) {
                              setTimeout(function() {
                                0 < e.length && e.shift()();
                              }, p * n);
                            }
                          }
                        } catch (fa) {
                        }
                        0 == g && 0 == e.length && x();
                      };
                    }(g);
                    if (g.$jscomp$loop$prop$revealMAP$81) {
                      if (n = d.querySelector(g.$jscomp$loop$prop$revealMAP$81.selector), null != n) {
                        g.$jscomp$loop$prop$url$82 = n.getAttribute(g.$jscomp$loop$prop$revealMAP$81.attribute);
                        if (null == g.$jscomp$loop$prop$url$82 || 0 == g.$jscomp$loop$prop$url$82.length) {
                          g.$jscomp$loop$prop$afterAjaxFinished$84();
                          break;
                        }
                        0 != g.$jscomp$loop$prop$url$82.indexOf("http") && (n = document.createElement("a"), n.href = b.url, g.$jscomp$loop$prop$url$82 = n.origin + g.$jscomp$loop$prop$url$82);
                        l[g.$jscomp$loop$prop$revealMAP$81.name] = "1";
                        g.$jscomp$loop$prop$url$82 = g.$jscomp$loop$prop$url$82.replace(/(mapPopover.*?)(false)/, "$1true");
                        g.$jscomp$loop$prop$xhr$79 = new XMLHttpRequest;
                        g.$jscomp$loop$prop$hasTimeout$78 = !1;
                        g.$jscomp$loop$prop$ti$80 = setTimeout(function(a) {
                          return function() {
                            a.$jscomp$loop$prop$hasTimeout$78 = !0;
                            a.$jscomp$loop$prop$afterAjaxFinished$84();
                          };
                        }(g), 4000);
                        g.$jscomp$loop$prop$xhr$79.onreadystatechange = function(a) {
                          return function() {
                            if (!a.$jscomp$loop$prop$hasTimeout$78 && 4 == a.$jscomp$loop$prop$xhr$79.readyState) {
                              clearTimeout(a.$jscomp$loop$prop$ti$80);
                              if (200 == a.$jscomp$loop$prop$xhr$79.status) {
                                var b = a.$jscomp$loop$prop$xhr$79.responseText;
                                if (a.$jscomp$loop$prop$revealMAP$81.regExp) {
                                  var c = b.match(new RegExp(a.$jscomp$loop$prop$revealMAP$81.regExp));
                                  if (!c || c.length < a.$jscomp$loop$prop$revealMAP$81.reGroup) {
                                    if (c = d.querySelector(a.$jscomp$loop$prop$revealMAP$81.selector)) {
                                      var e = c.cloneNode(!1);
                                      e.innerHTML = b;
                                      c.parentNode.replaceChild(e, c);
                                    }
                                  } else {
                                    l[a.$jscomp$loop$prop$revealMAP$81.name] = c[a.$jscomp$loop$prop$revealMAP$81.reGroup], l[a.$jscomp$loop$prop$revealMAP$81.name + "url"] = a.$jscomp$loop$prop$url$82;
                                  }
                                }
                              }
                              a.$jscomp$loop$prop$revealed$83 = !0;
                              a.$jscomp$loop$prop$afterAjaxFinished$84();
                            }
                          };
                        }(g);
                        g.$jscomp$loop$prop$xhr$79.onerror = g.$jscomp$loop$prop$afterAjaxFinished$84;
                        g.$jscomp$loop$prop$xhr$79.open("GET", g.$jscomp$loop$prop$url$82, !0);
                        g.$jscomp$loop$prop$xhr$79.send();
                      } else {
                        g.$jscomp$loop$prop$afterAjaxFinished$84();
                      }
                    } else {
                      g.$jscomp$loop$prop$afterAjaxFinished$84();
                    }
                    n = !0;
                  }
                }
                g = {$jscomp$loop$prop$pageFilter$64:g.$jscomp$loop$prop$pageFilter$64, $jscomp$loop$prop$pageVersionTest$65:g.$jscomp$loop$prop$pageVersionTest$65, $jscomp$loop$prop$revealed$83:g.$jscomp$loop$prop$revealed$83, $jscomp$loop$prop$pageType$67:g.$jscomp$loop$prop$pageType$67, $jscomp$loop$prop$hasTimeout$78:g.$jscomp$loop$prop$hasTimeout$78, $jscomp$loop$prop$afterAjaxFinished$84:g.$jscomp$loop$prop$afterAjaxFinished$84, $jscomp$loop$prop$xhr$79:g.$jscomp$loop$prop$xhr$79, $jscomp$loop$prop$ti$80:g.$jscomp$loop$prop$ti$80, 
                $jscomp$loop$prop$revealMAP$81:g.$jscomp$loop$prop$revealMAP$81, $jscomp$loop$prop$url$82:g.$jscomp$loop$prop$url$82};
              }
              a(8);
              if (null == B) {
                m += " // no pageVersion matched";
                f.payload = [G, m, b.dbg1 ? e : ""];
                f.status = 308;
                a(10);
                try {
                  b.stats.times.push(99), b.stats.times.push(r.lastBugReport);
                } catch (C) {
                }
                "undefined" == typeof b.sent && (f = c(b, f), q.sendMessage(f));
              }
            } else {
              a(9), f.status = 306, "undefined" == typeof b.sent && (f = c(b, f), q.sendMessage(f));
            }
          }
        });
      }
      function l(c, d, e) {
        if (null != I && !T) {
          T = !0;
          for (var f = 1; f < I.length; f++) {
            var g = I[f];
            try {
              for (var n = window, v = 0; v < g.path.length - 1; v++) {
                n = n[g.path[v]];
              }
              if (g.b) {
                n[g.path[v]](U[g.index], g.a, g.b);
              } else {
                n[g.path[v]](U[g.index], g.a);
              }
            } catch (S) {
            }
          }
          b.console.clear();
        }
        J = c;
        var h = c.messageId;
        setTimeout(function() {
          null != J && J.messageId == h && (J = J = null);
        }, c.timeout);
        c.onDoneC = function() {
          J = null;
        };
        if (d) {
          a(11), d = document.getElementById("keepa_data"), d.removeAttribute("srcdoc"), d.src = c.url;
        } else {
          if (1 == c.httpMethod && (c.scrapeFilters && 0 < c.scrapeFilters.length && (M = c), !N && (N = !0, c.l && 0 < c.l.length))) {
            I = c.l;
            T = !0;
            for (d = 0; d < c.l.length; d++) {
              f = c.l[d];
              try {
                g = window;
                for (n = 0; n < f.path.length - 1; n++) {
                  g = g[f.path[n]];
                }
                if (f.b) {
                  g[f.path[n]](U[f.index], f.a, f.b);
                } else {
                  g[f.path[n]](U[f.index], f.a);
                }
              } catch (S) {
              }
            }
            b.console.clear();
          }
          y(c.url, O[c.httpMethod], c.postData, c.timeout, function(d) {
            a(12);
            if ("o0" == c.key) {
              e(d);
            } else {
              var g = document.getElementById("keepa_data_2");
              g.src = "";
              d = d.replace(/src=".*?"/g, 'src=""');
              if (null != k) {
                k.block && (d = d.replace(new RegExp(k.block, "g"), ""));
                a(13);
                var f = !1;
                g.srcdoc = d;
                a(18);
                g.onload = function() {
                  a(19);
                  f || (g.onload = void 0, f = !0, a(20), setTimeout(function() {
                    a(21);
                    var b = document.getElementById("keepa_data_2").contentWindow;
                    try {
                      e(b.document, d);
                    } catch (ea) {
                      r.reportBug(ea), L(410);
                    }
                  }, 80));
                };
              }
              b.console.clear();
            }
          });
        }
      }
      function m() {
        try {
          var a = document.getElementById("keepa_data");
          a.src = "";
          a.removeAttribute("srcdoc");
        } catch (G) {
        }
        try {
          var b = document.getElementById("keepa_data_2");
          b.src = "";
          b.removeAttribute("srcdoc");
        } catch (G) {
        }
        J = null;
      }
      function y(b, c, d, e, g) {
        var f = new XMLHttpRequest;
        if (g) {
          var n = !1, v = setTimeout(function() {
            n = !0;
            x.abortJob(413);
          }, e || 15000);
          f.onreadystatechange = function() {
            n || (2 == f.readyState && a(27), 4 == f.readyState && (clearTimeout(v), a(29), 503 != f.status && (0 == f.status || 399 < f.status) ? x.abortJob(415, [f.status]) : 50 > f.responseText.length && c == O[0] ? x.abortJob(416) : g.call(this, f.responseText)));
          };
          f.onerror = function() {
            x.abortJob(408);
          };
        }
        f.open(c, b, !0);
        null == d ? f.send() : f.send(d);
      }
      function A(a) {
        var b = "", c = "", d;
        for (d in a[B]) {
          var e = a[B][d];
          "-" != e && (b += c + d + "=" + e + ";", c = " ");
        }
        return b;
      }
      function D(a) {
        delete z["" + a];
        localStorage.cache = pako.deflate(JSON.stringify(z), {to:"string"});
      }
      function L(a, d) {
        if (null != k) {
          try {
            if ("undefined" != typeof k.sent) {
              return;
            }
            var e = c(k, {});
            d && (e.payload = d);
            e.status = a;
            q.sendMessage(e);
            m();
          } catch (H) {
            r.reportBug(H, "abort");
          }
        }
        b.console.clear();
      }
      var M = null, k = null, E = /automated access/, U = [function(a) {
      }, function(a) {
        if (null != k) {
          var b = !0;
          if (k.url == a.url) {
            K = a.frameId, V = a.tabId, W = a.parentFrameId, b = !1;
          } else {
            if (K == a.parentFrameId || W == a.parentFrameId || K == a.frameId) {
              b = !1;
            }
          }
          if (-2 != K && V == a.tabId) {
            a = a.requestHeaders;
            var c = {};
            (k.timeout + "").endsWith("108") || (k.headers.Cookie = b ? "" : R);
            for (var d in k.headers) {
              b = !1;
              for (var e = 0; e < a.length; ++e) {
                if (a[e].name.toLowerCase() == d.toLowerCase()) {
                  "" == k.headers[d] ? a.splice(e, 1) : a[e].value = k.headers[d];
                  b = !0;
                  break;
                }
              }
              b || "" == k.headers[d] || a.push({name:h ? d.toLowerCase() : d, value:k.headers[d]});
            }
            c.requestHeaders = a;
            return c;
          }
        }
      }, function(a) {
        var b = a.responseHeaders;
        try {
          if (V != a.tabId || null == k) {
            return;
          }
          for (var c = !1, d = [], f = 0; f < b.length; f++) {
            var h = b[f], m = h.name.toLowerCase();
            "set-cookie" == m ? e.parseCookieHeader(d, h.value) : "x-frame-options" == m && (b.splice(f, 1), f--);
          }
          for (f = 0; f < d.length; f++) {
            var l = d[f];
            if ("undefined" == typeof z[B][l[0]] || z[B][l[0]] != l[1]) {
              c = !0, z[B][l[0]] = l[1];
            }
          }
          !(k.timeout + "").endsWith("108") && c && k.url == a.url && (localStorage.cache = pako.deflate(JSON.stringify(z), {to:"string"}), R = A(z));
        } catch (S) {
        }
        return {responseHeaders:b};
      }, function(a) {
        if (null != k && k.url == a.url) {
          var b = 0;
          switch(a.error) {
            case "net::ERR_TUNNEL_CONNECTION_FAILED":
              b = 510;
              break;
            case "net::ERR_INSECURE_RESPONSE":
              b = 511;
              break;
            case "net::ERR_CONNECTION_REFUSED":
              b = 512;
              break;
            case "net::ERR_BAD_SSL_CLIENT_AUTH_CERT":
              b = 513;
              break;
            case "net::ERR_CONNECTION_CLOSED":
              b = 514;
              break;
            case "net::ERR_NAME_NOT_RESOLVED":
              b = 515;
              break;
            case "net::ERR_NAME_RESOLUTION_FAILED":
              b = 516;
              break;
            case "net::ERR_ABORTED":
            case "net::ERR_CONNECTION_ABORTED":
              b = 517;
              break;
            case "net::ERR_CONTENT_DECODING_FAILED":
              b = 518;
              break;
            case "net::ERR_NETWORK_ACCESS_DENIED":
              b = 519;
              break;
            case "net::ERR_NETWORK_CHANGED":
              b = 520;
              break;
            case "net::ERR_INCOMPLETE_CHUNKED_ENCODING":
              b = 521;
              break;
            case "net::ERR_CONNECTION_TIMED_OUT":
            case "net::ERR_TIMED_OUT":
              b = 522;
              break;
            case "net::ERR_CONNECTION_RESET":
              b = 523;
              break;
            case "net::ERR_NETWORK_IO_SUSPENDED":
              b = 524;
              break;
            case "net::ERR_EMPTY_RESPONSE":
              b = 525;
              break;
            case "net::ERR_SSL_PROTOCOL_ERROR":
              b = 526;
              break;
            case "net::ERR_ADDRESS_UNREACHABLE":
              b = 527;
              break;
            case "net::ERR_INTERNET_DISCONNECTED":
              b = 528;
              break;
            case "net::ERR_BLOCKED_BY_ADMINISTRATOR":
              b = 529;
              break;
            case "net::ERR_SSL_VERSION_OR_CIPHER_MISMATCH":
              b = 530;
              break;
            case "net::ERR_CONTENT_LENGTH_MISMATCH":
              b = 531;
              break;
            case "net::ERR_PROXY_CONNECTION_FAILED":
              b = 532;
              break;
            default:
              b = 533;
              return;
          }
          setTimeout(function() {
            x.setStatTime(33);
            x.abortJob(b);
          }, 0);
        }
      }], N = !1, T = !1, I = null, J = null, O = ["GET", "HEAD", "POST", "PUT", "DELETE"], z = {}, R = "", B = 1;
      try {
        localStorage.cache && (z = JSON.parse(pako.inflate(localStorage.cache, {to:"string"})));
      } catch (v) {
        setTimeout(function() {
          r.reportBug(v, pako.inflate(localStorage.cache, {to:"string"}));
        }, 2000);
      }
      var K = -2, V = -2, W = -2;
      return {onMessage:function(a) {
        "hhhh" == a.key && chrome.webRequest.onBeforeSendHeaders.addListener(function(a) {
          if (null != k) {
            var b = !0;
            k.url == a.url && (K = a.frameId, V = a.tabId, W = a.parentFrameId, b = !1);
            if (-2 != K && K == a.frameId && V == a.tabId && W == a.parentFrameId) {
              a = a.requestHeaders;
              var c = {};
              (k.timeout + "").endsWith("108") || (k.headers.Cookie = b ? "" : R);
              for (var d in k.headers) {
                b = !1;
                for (var e = 0; e < a.length; ++e) {
                  if (a[e].name.toLowerCase() == d.toLowerCase()) {
                    "" == k.headers[d] ? a.splice(e, 1) : a[e].value = k.headers[d];
                    b = !0;
                    break;
                  }
                }
                b || "" == k.headers[d] || a.push({name:h ? d.toLowerCase() : d, value:k.headers[d]});
              }
              c.requestHeaders = a;
              return c;
            }
          }
        }, {urls:["<all_urls>"]}, ["blocking", "requestHeaders"]);
        switch(a.key) {
          case "o0":
          case "o1":
            k = a, k.stats = {start:Date.now(), times:[]};
        }
        switch(a.key) {
          case "update":
            chrome.runtime.requestUpdateCheck(function(a, b) {
              "update_available" == a && chrome.runtime.reload();
            });
            break;
          case "o0":
            x.clearIframe();
            d(a);
            break;
          case "o1":
            x.clearIframe();
            f(a);
            break;
          case "o2":
            D(a.domainId);
            break;
          case "o3":
            document.location.reload(!1);
        }
      }, clearIframe:m, endSession:D, getOutgoingMessage:c, setStatTime:a, getFilters:function() {
        return M;
      }, getMessage:function() {
        return k;
      }, clearMessage:function() {
        k = null;
        if (null != I && T) {
          T = !1;
          for (var a = 1; a < I.length; a++) {
            var c = I[a];
            try {
              for (var d = window, e = 0; e < c.path.length - 1; e++) {
                d = d[c.path[e]];
              }
              d.removeListener(U[c.index]);
            } catch (g) {
            }
          }
          b.console.clear();
        }
      }, abortJob:L};
    }();
  }
})();

