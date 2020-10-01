'use strict';Registry.require("crcrc helper statistics uri layout/default/htmlutil i18n layout/default/layout_helper".split(" "),()=>{const t=rea.FEATURES,r=Registry.get("crcrc").cr,g=Registry.get("crcrc").crc,u=Registry.get("helper"),p=Registry.get("layout/default/htmlutil"),K=Registry.get("statistics"),B=Registry.get("uri"),m=Registry.get("i18n"),y=Registry.get("layout"),C=Registry.get("layout/default/layout_helper"),q=C.images;let v=3;if(t.RUNTIME.MOBILE)try{window.matchMedia("(orientation: portrait)").matches&&
(v=1)}catch(n){}y.render(()=>{let n={},D;const y=(c,a)=>{const d=[];if(a.sub_menu_item){if(a.tabId&&(D=a.tabId),a.items.length){var b=g("table","actiontable at_"+a.name,"actiontable-"+a.name);E(b,a.items);d.push(b)}}else if(b=null,a.image?b=p.createIcon(q.get(a.image),a.name,a.id,null,""):a.enabler&&(b=p.createIcon(q.get(n.enabled?"button_ok":"cancel"),a.name,a.uuid,null,"")),b&&d.push(b),a.url||a.urls){b=r("span",a.name,a.id,"urls");var l=a.urls||[a];for(var f=0;f<l.length;f++){var e=l[f],h=document.createElement("span");
h.textContent=e.name;var k=a.urls?h:c;k.url=e.url;k.newtab=e.newtab;$(k).addClass("clickable").on("click auxclick",function(a){z(this.url,this.newtab);a.preventDefault()});b.appendChild(h);f<l.length-1&&(e=document.createElement("span"),e.textContent=" | ",b.appendChild(e))}d.push(b)}else if(a.globalhint)F(a.options);else if(a.button)b=g("span",a.display||"",a.name,a.id,"bu",!0),b.textContent=a.name,c.key=a.id,c.warning=a.warning,c.reload=a.reload,c.data=a.data,c.addEventListener("click",function(){let a=
!0;this.warning&&(a=L(this.warning));a&&M(this.key,{reload:this.reload,data:this.data})}),$(c).addClass("clickable"),d.push(b);else if(a.userscript){const w=g("table","",a.name,a.uuid,"tw");b=g("tr","",a.name,a.uuid,"tw_tr1");l=[b];f=g("div","clickable"+(a.active_count?"":" not_executed")+(a.deleted?" was_deleted":""),a.name,a.uuid,"ai");if(a.uuid){const d=[];h=null;h=a.blacklisted||a.foisted?"enabler_warning":a.enabled?a.contexter?"enabler_enabled enabler_later":"enabler_enabled":"enabler_disabled";
k=a.blacklisted||a.foisted||(a.enabled?m.getMessage("Enabled"):m.getMessage("Disabled"));e=function(b){if(b&&(0!=b.button||b.ctrlKey||b.metaKey))return z(rea.extension.getURL("options.html")+"#nav="+this.key,!0),b.stopPropagation(),b.preventDefault(),!1;a.foisted?A(a.uuid,"whitewash",!0):A(a.uuid,"enabled",!a.enabled)};h=p.createEnabler(h,a.uuid,"enabled",{append:"enabled",disabled:a.blacklisted||a.deleted,title:k},e);k=g("td","",a.name,a.uuid,"tw_td1");b.appendChild(k);k.appendChild(h);h=g("div",
"script_name",a.name,a.uuid,"name");h.textContent=m.getTranslation(a,"name");f.appendChild(h);f.uuid=a.uuid;f.key=a.uuid;if(!a.deleted&&!a.blacklisted){$(f).on("click auxclick",e);e=m.getMessage("Edit");k=p.createIcon(q.get("edit"),"",a.uuid,"edit_script",e);const b=g("span","clickable",a.name,a.uuid,"edit_script");b.setAttribute("title",e);b.textContent=e;d.push({always_visible:!1,id:"edit_script",img:k,text:b,oc:function(b){z(rea.extension.getURL("options.html")+"#nav="+a.uuid,!0)}})}a.blacklisted||
a.foisted?(c.setAttribute("title",a.blacklisted||a.foisted),$(f).addClass("crossedout")):h.title=a.active_count?m.getMessage("This_script_was_executed_0count0_times",a.active_count):a.all_time_active_count?m.getMessage("This_script_was_executed_0count0_times_but_is_not_active_anymore",a.all_time_active_count):m.getMessage("This_script_was_not_executed_yet");e=g("td","",a.name,a.uuid,"tw_td2");b.appendChild(e);e.appendChild(f);a.nnew||a.system||!a.abuse||(f=p.createIcon(q.get("flag"),"",a.uuid,"issue",
m.getMessage("Report_an_issue_to_the_script_hoster_")),e=g("span","clickable",a.name,a.uuid,"action_issue_expl"),e.textContent=m.getMessage("Report_an_issue_to_the_script_hoster_").split(/[\.\(]+/)[0],d.push({always_visible:!1,id:"action_issue_expl",img:f,text:e,oc:function(){G(a.uuid,"hoster")}}));a.nnew||a.system||!a.support||(f=p.createIcon(q.get("bug"),"",a.uuid,"bug",m.getMessage("Report_a_bug")),e=g("span","clickable",a.name,a.uuid,"action_issue_expl"),e.textContent=m.getMessage("Report_a_bug"),
d.push({always_visible:!1,id:"action_issue_expl",img:f,text:e,oc:function(){G(a.uuid,"author")}}));const n={};a.active_urls&&a.active_urls.forEach(b=>{var c=B.parse(b).hostname;if(!n[c]){n[c]=!0;var e="/"+B.getRegExpFromMatch("*://*."+c+"/*")+"/";if(!a.override||!a.override.use_excludes.includes(e)){c=m.getMessage("Exclude_0domain0",c);b=p.createIcon(q.get("no"),"",a.uuid,"domain"+b,c);var f=g("span","clickable",a.name,a.uuid,"action_domain");f.setAttribute("title",c);f.textContent=c;d.push({always_visible:!1,
id:"action_domain",img:b,text:f,oc:function(b){A(a.uuid,"add_excludes",[e])}})}}});if(a.menu_cmds){let b;try{b=new RegExp("^"+u.escapeForRegExp(a.name)+"[ -:+/]*")}catch(N){console.log(N)}a.menu_cmds.forEach(e=>{const f=g("span","clickable",a.name,a.uuid,"menucmd_"+a.id);f.setAttribute("title",a.name);const l=b?e.name.replace(b,""):e.name;f.textContent=l;const h=()=>{O(e.id,()=>{t.ACTIONMENU.CLOSE_ALLOWED&&window.close()})};if(e.accessKey){const a=e.accessKey[0].toUpperCase();if(P(a,h,c)){const b=
new RegExp(a,"i");let c=f.textContent.search(b);const d=[];-1==c&&(f.textContent+=" ("+a+")",c=f.textContent.search(b));d.push({text:f.textContent.substr(0,c)});d.push({text:f.textContent.substr(c,1),class:"underlined"});d.push({text:f.textContent.substr(c+1)});f.textContent="";d.forEach(a=>{const b=g("span",a.class||"",e.id,a);b.textContent=a.text;f.appendChild(b)})}else console.warn("Registering keyboard shortcut for '"+e.name+"' failed")}d.push({always_visible:!0,id:a.id,img:p.createIcon(q.get(e.image),
l,e.id,null,""),text:f,oc:h})})}if(!a.deleted&&d.length){const c=[];d.forEach(b=>{var d=a.uuid+b.id;const e=g("tr","scriptmenu"+(b.always_visible?" always_visible":""),a.name,a.uuid,"tw_tr1"),f=g("td","clickable",d,"tw_tdn",1,!0);d=g("td","clickable",d,"tw_tdn",2,!0);d.setAttribute("colspan","2");d.addEventListener("click",b.oc);d.appendChild([b.img,b.text]);e.appendChild([f,d]);c.push(e)});f=g("div","actionenablercol",a.name,a.uuid,"actionenablercol");e=g("i","actionenabler ifdisabled clickable far fa-"+
q.get("enabler"),a.name,a.uuid,"actionenabler");h=g("i","actionenabler ifenabled clickable far fa-"+q.get("enabler_enabled"),a.name,a.uuid,"actionenabler_enabled");$("body").get(0).addEventListener("click",()=>{$(w).removeClass("show_scriptmenu");k.removeClass("enabled")},!0);const k=$(f);$(e,h,f).click(a=>{k.toggleClass("enabled");$(w).toggleClass("show_scriptmenu");a.stopPropagation()});f.appendChild([e,h]);l=l.concat(c);e=g("td","",a.name,a.uuid,"tw_td3");b.appendChild(e);e.appendChild(f)}}w.appendChild(l);
d.push(w)}else b=r("span",a.name,a.id,"ai"),b.textContent=a.name,d.push(b);return d},E=(c,a,d)=>{Object.keys(a).forEach(b=>{b=a[b];if(!c)if(d[b.pos])b.items&&b.items.length&&$(d[b.pos]).show();else{console.warn("Warn(cAm): unknown pos "+b.pos);return}var g=c||d[b.pos];const f=g?r("tr",b.name,b.uuid||b.id,"outer"):null,e=y(f,b);if(e&&e.length){g.appendChild(f);for(let a,c=0;a=e[c];c++){g=c==e.length-1?3-c:0;const d=r("td","actiontd",b.name,b.uuid||b.id,c);0<g&&d.setAttribute("colspan",g);a&&d.appendChild(a);
f.appendChild(d)}}})},H=(c,a)=>{(a=document.getElementById("action"))?a.innerHTML="":(a=r("div"),a.setAttribute("id","action"),a.setAttribute("class","action"),$(document.body).append(a,status));var d=g("table","actionlayout","actionlayout");a.appendChild(d);a=g("tr","actionpostr","hor");const b=g("td","actionpostd","hor_west");a.appendChild(b);d.appendChild(a);const l=g("table","actionregion noborder ar_top","top"),f=g("table","actionregion noborder ar_right","right");let e;const h=g("table","actionregion noborder ar_left",
"left"),k=g("table","actionregion noborder ar_bottom","bottom");if(2<Math.min(n.action_menu_columns,v)){e=g("table","actionregion noborder ar_center","center");const b=g("td","actionpostd","hor_center");d=g("td","actionpostd","hor_east");b.appendChild(e);a.appendChild(b);a.appendChild(d)}else 1<Math.min(n.action_menu_columns,v)?(e=f,d=g("td","actionpostd","hor_east"),a.appendChild(d)):(e=h,d=b);$([e,f]).hide();b.appendChild(l);d.appendChild(f);b.appendChild(h);b.appendChild(k);E(null,c,{top:l,left:h,
center:e,right:f,bottom:k})},z=(c,a)=>{try{const d=()=>{a&&t.ACTIONMENU.CLOSE_ALLOWED&&window.close()};a?sendMessage({method:"newTab",url:c},d):rea.tabs.getSelected(null,b=>{rea.tabs.sendMessage(b.id,{method:"loadUrl",url:c,newtab:a},d)})}catch(d){console.warn("lU:",d)}},L=c=>{let a=confirm(c.msg),d={};a&&c.ok?d=c.ok:!a&&c.cancel&&(d=c.cancel);if(c.ok||c.cancel)a=!0;d.url&&sendMessage({method:"newTab",url:d.url},a=>{});return a},F=c=>{let a;const d=c.key||"general";(a=I[d])&&$(a).remove();I[d]=p.createGobalHint(u.copy(c,
{instant:!0}),document.getElementById("action"))},G=(c,a,d)=>{try{sendMessage({method:"reportAnIssue",uuid:c,to:a},a=>{d&&d()})}catch(b){console.warn("raI:",b)}},M=(c,a)=>{try{sendMessage({method:"buttonPress",name:c,data:a.data},c=>{a.reload&&rea.page.reload()})}catch(d){console.warn("rSU:",d)}},x={},Q=(c,a,d)=>{document.body.addEventListener("keydown",a=>{a.altKey||a.ctrlKey||a.shiftKey||Object.keys(x).forEach(b=>{(b=x[b])&&a.keyCode==b.key&&b.cb.apply(b.elem||window,[])})},!1)},P=(c,a,d)=>{c=c.charCodeAt(0);
if(x[c])return console.log("MenuCmdKeyListener: ...failed!"),!1;x[c]={key:c,cb:a,elem:d};return!0},O=(c,a)=>{try{sendMessage({method:"execMenuCmd",id:c},c=>{a&&a()})}catch(d){console.warn("Error(eMC):",d)}},A=(c,a,d)=>{try{c={method:"modifyScriptOptions",uuid:c},a&&""!=a&&(c[a]=d),sendMessage(c,a=>{document.getElementById("action").innerHTML="";a&&a.items&&(a.options&&(n=u.assign(n,a.options)),H(a.items))})}catch(b){console.warn("Error(mSo): "+b.message)}},R=(c,a)=>{const d=Date.now(),b=c.min_delay;
sendMessage({method:"loadTree",referrer:c.referrer,layout:c.layout,available_columns:v,uuid:c.uuid,tabId:c.tabId},c=>{c.options&&(n=u.assign(n,c.options),n.statistics_enabled&&K.init("act",rea.extension.manifest.version,!0,!1,!0));const f=Date.now()-d,e=()=>{a(c)};!b||f>=b?a(c):window.setTimeout(e,b-f)})},I={};rea.extension.onMessage.addListener((c,a,d)=>{"update"==c.method?J():"status"==c.method?(F(c.options),d({})):console.log('onMessage: Unknown method "'+c.method+'"')});const J=window.main=()=>
{R({referrer:"actions",min_delay:t.ACTIONMENU.MIN_DELAY,layout:!0,tabId:D},c=>{if(c.options&&c.options.layout_user_css){const a=document.createElement("style");a.innerHTML=c.options.layout_user_css;(document.head||document.body||document.documentElement||document).appendChild(a)}Q();H(c.items,!0)})};C.addStyle(J)})});
