(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-375669ca"],{2743:function(t,e,n){var a=n("9e2d");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var o=n("85cb").default;o("f6e41d48",a,!0,{sourceMap:!1,shadowMode:!1})},"54aa":function(t,e,n){"use strict";var a=n("3d55"),o=RegExp.prototype.exec;t.exports=function(t,e){var n=t.exec;if("function"===typeof n){var i=n.call(t,e);if("object"!==typeof i)throw new TypeError("RegExp exec method returned something other than an Object or null");return i}if("RegExp"!==a(t))throw new TypeError("RegExp#exec called on incompatible receiver");return o.call(t,e)}},"6bcc":function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("el-row",[n("div",{directives:[{name:"loading",rawName:"v-loading",value:t.isLoading,expression:"isLoading"}],staticStyle:{"background-color":"#ffffff"}},[n("div",{staticClass:"mark-title-style"},[n("span",[t._v(t._s(this.$route.params.mark))])]),n("div",[n("el-table",{staticClass:"list",staticStyle:{width:"100%"},attrs:{data:t.testHistoryList,"highlight-current-row":"",stripe:""}},[n("el-table-column",{attrs:{prop:"name",label:t.$t("testPage.apiName_label"),align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[t._v("\n                        "+t._s(t.timestampToTimeFun(e.row.createTime))+"\n                    ")]}}])}),n("el-table-column",{attrs:{prop:"interfaceCount",label:t.$t("testPage.apiCount_label"),align:"right"}}),n("el-table-column",{attrs:{prop:"successCount",label:t.$t("testPage.summarySuccess_label"),align:"right"}}),n("el-table-column",{attrs:{prop:"failCount",label:t.$t("testPage.summaryFail_label"),align:"right"}}),n("el-table-column",{attrs:{label:t.$t("testPage.operation"),width:"300",align:"center"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("a",{staticClass:"tableActionStyle",attrs:{target:"_blank"},on:{click:function(n){t.linkReasonPageMethod(e.row)}}},[t._v(t._s(t.$t("testPage.linkReasonPage_button")))])]}}])})],1),0!=t.paginationData.total?n("el-pagination",{staticClass:"pagination",attrs:{"current-page":t.paginationData.pageNo+1,"page-size":t.paginationData.pageSize,layout:"total, sizes, prev, pager, next, jumper",total:t.paginationData.total},on:{"size-change":t.sizeChange,"current-change":t.currentChange}}):t._e()],1)])])},o=[],i=(n("d75a"),n("7ea5")),r=(n("f4b1"),n("a2f3"),n("e468"),n("f2de"));n("cd03");function c(t){for(var e="".concat(t,"="),n=document.cookie.split(";"),a=0;a<n.length;a++){var o=n[a];while(" "==o.charAt(0))o=o.substring(1);if(-1!=o.indexOf(e))return o.substring(e.length,o.length)}return""}function s(t,e,n){var a=new Date;a.setDate(a.getDate()+n),document.cookie="".concat(t,"=").concat(escape(e)).concat(null==n?"":";expires=".concat(a.toGMTString()))}function l(t){var e=new Date;e.setTime(e.getTime()-1);var n=c(t);null!=n&&(document.cookie="".concat(t,"=").concat(n,";expires=").concat(e.toGMTString()))}function u(t){var e=document.createElement("div");null!=e.textContent?e.textContent=t:e.innerText=t;var n=e.innerHTML;return e=null,n}function p(t){var e=document.createElement("div");e.innerHTML=t;var n=e.innerText||e.textContent;return e=null,n}function g(t){var e=t,n=document.documentElement.scrollTop||document.body.scrollTop,a=e/50;if(e>n)i();else{var o=n-e+100;a=o/50,r()}function i(){n<e?(n+=a,document.documentElement.scrollTop=n,document.body.scrollTop=n,setTimeout(i,10)):(document.documentElement.scrollTop=e,document.body.scrollTop=e,window.pageYOffset=e)}function r(){n>e?(n-=a,document.documentElement.scrollTop=n,document.body.scrollTop=n,setTimeout(r,10)):(document.documentElement.scrollTop=e,document.body.scrollTop=e,window.pageYOffset=e)}}function d(t){var e=new Date(t),n="".concat(e.getFullYear(),"-"),a="".concat(e.getMonth()+1<10?"0".concat(e.getMonth()+1):e.getMonth()+1,"-"),o="".concat(e.getDate()<10?"0".concat(e.getDate()):e.getDate()," "),i="".concat(e.getHours()<10?"0".concat(e.getHours()):e.getHours(),":"),r="".concat(e.getMinutes()<10?"0".concat(e.getMinutes()):e.getMinutes(),":"),c=e.getSeconds()<10?"0".concat(e.getSeconds()):e.getSeconds();return n+a+o+i+r+c}var f={getCookie:c,setCookie:s,delCookie:l,HTMLEncode:u,HTMLDecode:p,jump:g,timestampToTime:d},h={name:"testReportHistory",data:function(){return{isLoading:!1,testHistoryList:[],paginationData:{pageNo:0,pageSize:10,total:0,totalPages:0,pagerCount:6}}},mounted:function(){this.getTestHistoryListMethod("first")},methods:Object(i["a"])({},Object(r["b"])(["getTestHistoryListApi"]),{getTestHistoryListMethod:function(t){var e=this;this.isLoading=!0;var n={pageNo:"first"==t?0:this.paginationData.pageNo,pageSize:this.paginationData.pageSize,f_eq_mark:this.$route.params.mark},a=Object.assign(n);this.getTestHistoryListApi(a).then(function(t){e.isLoading=!1,t&&t.data?(e.testHistoryList=t.data,e.paginationData.pageNo=t.pageNo,e.paginationData.pageSize=t.pageSize,e.paginationData.total=t.total):e.testHistoryList=[]})},timestampToTimeFun:function(t){return t?f.timestampToTime(t):"---"},linkReasonPageMethod:function(t){this.$router.push({name:"reasonList",params:{mark:t.mark,serialNo:this.$route.params.serialNo}})},sizeChange:function(t){this.paginationData.pageSize=t,this.getTestHistoryListMethod()},currentChange:function(t){this.paginationData.pageNo=t-1,this.getTestHistoryListMethod()}})},m=h,v=(n("a30e"),n("048f")),x=Object(v["a"])(m,a,o,!1,null,"8c0e48fe",null);x.options.__file="testReportHistory.vue";e["default"]=x.exports},"6c5a":function(t,e,n){var a=n("1068"),o=n("85eb"),i=n("26dc")("match");t.exports=function(t){var e;return a(t)&&(void 0!==(e=t[i])?!!e:"RegExp"==o(t))}},"6e77":function(t,e,n){"use strict";n("c95e");var a=n("f6d5"),o=n("4c4f"),i=n("7372"),r=n("da87"),c=n("26dc"),s=n("7861"),l=c("species"),u=!i(function(){var t=/./;return t.exec=function(){var t=[];return t.groups={a:"7"},t},"7"!=="".replace(t,"$<a>")}),p=function(){var t=/(?:)/,e=t.exec;t.exec=function(){return e.apply(this,arguments)};var n="ab".split(t);return 2===n.length&&"a"===n[0]&&"b"===n[1]}();t.exports=function(t,e,n){var g=c(t),d=!i(function(){var e={};return e[g]=function(){return 7},7!=""[t](e)}),f=d?!i(function(){var e=!1,n=/a/;return n.exec=function(){return e=!0,null},"split"===t&&(n.constructor={},n.constructor[l]=function(){return n}),n[g](""),!e}):void 0;if(!d||!f||"replace"===t&&!u||"split"===t&&!p){var h=/./[g],m=n(r,g,""[t],function(t,e,n,a,o){return e.exec===s?d&&!o?{done:!0,value:h.call(e,n,a)}:{done:!0,value:t.call(n,e,a)}:{done:!1}}),v=m[0],x=m[1];a(String.prototype,t,v),o(RegExp.prototype,g,2==e?function(t,e){return x.call(t,this,e)}:function(t){return x.call(t,this)})}}},7861:function(t,e,n){"use strict";var a=n("b7c3"),o=RegExp.prototype.exec,i=String.prototype.replace,r=o,c="lastIndex",s=function(){var t=/a/,e=/b*/g;return o.call(t,"a"),o.call(e,"a"),0!==t[c]||0!==e[c]}(),l=void 0!==/()??/.exec("")[1],u=s||l;u&&(r=function(t){var e,n,r,u,p=this;return l&&(n=new RegExp("^"+p.source+"$(?!\\s)",a.call(p))),s&&(e=p[c]),r=o.call(p,t),s&&r&&(p[c]=p.global?r.index+r[0].length:e),l&&r&&r.length>1&&i.call(r[0],n,function(){for(u=1;u<arguments.length-2;u++)void 0===arguments[u]&&(r[u]=void 0)}),r}),t.exports=r},"9e2d":function(t,e,n){e=t.exports=n("690e")(!1),e.push([t.i,".tableActionStyle[data-v-8c0e48fe]{font-family:PingFangSC-Medium;font-size:12px;color:#016ad5;letter-spacing:.86px;text-align:left;margin-right:10px}.list[data-v-8c0e48fe]{padding:0 30px}.list.el-table[data-v-8c0e48fe]:before{height:0!important}.mark-title-style[data-v-8c0e48fe]{height:60px;line-height:60px;border-bottom:1px solid #edeff4;padding-left:30px;font-size:14px;color:#686f79}",""])},a30e:function(t,e,n){"use strict";var a=n("2743"),o=n.n(a);o.a},a6c0:function(t,e,n){"use strict";var a=n("e85f")(!0);t.exports=function(t,e,n){return e+(n?a(t,e).length:1)}},b7c3:function(t,e,n){"use strict";var a=n("853b");t.exports=function(){var t=a(this),e="";return t.global&&(e+="g"),t.ignoreCase&&(e+="i"),t.multiline&&(e+="m"),t.unicode&&(e+="u"),t.sticky&&(e+="y"),e}},c95e:function(t,e,n){"use strict";var a=n("7861");n("9736")({target:"RegExp",proto:!0,forced:a!==/./.exec},{exec:a})},cd03:function(t,e,n){"use strict";var a=n("6c5a"),o=n("853b"),i=n("7a5b"),r=n("a6c0"),c=n("5cda"),s=n("54aa"),l=n("7861"),u=Math.min,p=[].push,g="split",d="length",f="lastIndex",h=!!function(){try{return new RegExp("x","y")}catch(t){}}();n("6e77")("split",2,function(t,e,n,m){var v=n;return"c"=="abbc"[g](/(b)*/)[1]||4!="test"[g](/(?:)/,-1)[d]||2!="ab"[g](/(?:ab)*/)[d]||4!="."[g](/(.?)(.?)/)[d]||"."[g](/()()/)[d]>1||""[g](/.?/)[d]?v=function(t,e){var o=String(this);if(void 0===t&&0===e)return[];if(!a(t))return n.call(o,t,e);var i,r,c,s=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,h=void 0===e?4294967295:e>>>0,m=new RegExp(t.source,u+"g");while(i=l.call(m,o)){if(r=m[f],r>g&&(s.push(o.slice(g,i.index)),i[d]>1&&i.index<o[d]&&p.apply(s,i.slice(1)),c=i[0][d],g=r,s[d]>=h))break;m[f]===i.index&&m[f]++}return g===o[d]?!c&&m.test("")||s.push(""):s.push(o.slice(g)),s[d]>h?s.slice(0,h):s}:"0"[g](void 0,0)[d]&&(v=function(t,e){return void 0===t&&0===e?[]:n.call(this,t,e)}),[function(n,a){var o=t(this),i=void 0==n?void 0:n[e];return void 0!==i?i.call(n,o,a):v.call(String(o),n,a)},function(t,e){var a=m(v,t,this,e,v!==n);if(a.done)return a.value;var l=o(t),p=String(this),g=i(l,RegExp),d=l.unicode,f=(l.ignoreCase?"i":"")+(l.multiline?"m":"")+(l.unicode?"u":"")+(h?"y":"g"),x=new g(h?l:"^(?:"+l.source+")",f),b=void 0===e?4294967295:e>>>0;if(0===b)return[];if(0===p.length)return null===s(x,p)?[p]:[];var y=0,T=0,w=[];while(T<p.length){x.lastIndex=h?T:0;var k,S=s(x,h?p:p.slice(T));if(null===S||(k=u(c(x.lastIndex+(h?0:T)),p.length))===y)T=r(p,T,d);else{if(w.push(p.slice(y,T)),w.length===b)return w;for(var C=1;C<=S.length-1;C++)if(w.push(S[C]),w.length===b)return w;T=y=k}}return w.push(p.slice(y)),w}]})},e85f:function(t,e,n){var a=n("a5f4"),o=n("da87");t.exports=function(t){return function(e,n){var i,r,c=String(o(e)),s=a(n),l=c.length;return s<0||s>=l?t?"":void 0:(i=c.charCodeAt(s),i<55296||i>56319||s+1===l||(r=c.charCodeAt(s+1))<56320||r>57343?t?c.charAt(s):i:t?c.slice(s,s+2):r-56320+(i-55296<<10)+65536)}}}}]);
//# sourceMappingURL=chunk-375669ca.a1ca74ad.js.map