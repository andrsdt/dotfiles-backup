(function(g){"object"==typeof exports&&"object"==typeof module?g(require("../../lib/codemirror")):"function"==typeof define&&define.amd?define(["../../lib/codemirror"],g):g(CodeMirror)})(function(g){function n(b){if(b.getOption("disableInput"))return g.Pass;for(var d=b.listSelections(),a,m=[],k=0;k<d.length;k++){var h=d[k].head;if(!/\bcomment\b/.test(b.getTokenTypeAt(h)))return g.Pass;var c=b.getModeAt(h);if(!a)a=c;else if(a!=c)return g.Pass;c=null;if(a.blockCommentStart&&a.blockCommentContinue){var e=
b.getLine(h.line).slice(0,h.ch),l=e.lastIndexOf(a.blockCommentEnd),f;if(-1==l||l!=h.ch-a.blockCommentEnd.length)if(-1<(f=e.lastIndexOf(a.blockCommentStart))&&f>l){if(c=e.slice(0,f),/\S/.test(c))for(c="",e=0;e<f;++e)c+=" "}else-1<(f=e.indexOf(a.blockCommentContinue))&&!/\S/.test(e.slice(0,f))&&(c=e.slice(0,f));null!=c&&(c+=a.blockCommentContinue)}null==c&&a.lineComment&&p(b)&&(e=b.getLine(h.line),f=e.indexOf(a.lineComment),-1<f&&(c=e.slice(0,f),c=/\S/.test(c)?null:c+(a.lineComment+e.slice(f+a.lineComment.length).match(/^\s*/)[0])));
if(null==c)return g.Pass;m[k]="\n"+c}b.operation(function(){for(var a=d.length-1;0<=a;a--)b.replaceRange(m[a],d[a].from(),d[a].to(),"+insert")})}function p(b){return(b=b.getOption("continueComments"))&&"object"==typeof b?!1!==b.continueLineComment:!0}g.defineOption("continueComments",null,function(b,d,a){a&&a!=g.Init&&b.removeKeyMap("continueComment");d&&(a="Enter","string"==typeof d?a=d:"object"==typeof d&&d.key&&(a=d.key),d={name:"continueComment"},d[a]=n,b.addKeyMap(d))})});
