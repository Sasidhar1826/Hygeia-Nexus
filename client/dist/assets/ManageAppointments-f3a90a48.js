import{j as d,a as o,H as Oe,d as Se,M as je,am as Pe,y as Ee,Q as ue,A as Ie,O as Ue,P as Qe,r as Ge,B as ae}from"./index-c3da158f.js";import{s as u,m as C,r as k,A as Xe}from"./vendor-3ba6fd3e.js";import{C as Ve}from"./Card-66c37868.js";import{B as q}from"./Button-d4df2000.js";import{A as We}from"./AnimationContainer-978f4c1f.js";import{P as Je,c as ne}from"./PageTransition-e5168143.js";import{_ as Le}from"./typeof-7fd5df1e.js";import"./animations-c827faa9.js";import"./index-e7037912.js";function Q(e){if(e===null||e===!0||e===!1)return NaN;var r=Number(e);return isNaN(r)?r:r<0?Math.ceil(r):Math.floor(r)}function M(e,r){if(r.length<e)throw new TypeError(e+" argument"+(e>1?"s":"")+" required, but only "+r.length+" present")}function W(e){M(1,arguments);var r=Object.prototype.toString.call(e);return e instanceof Date||Le(e)==="object"&&r==="[object Date]"?new Date(e.getTime()):typeof e=="number"||r==="[object Number]"?new Date(e):((typeof e=="string"||r==="[object String]")&&typeof console<"u"&&(console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"),console.warn(new Error().stack)),new Date(NaN))}function Ke(e,r){M(2,arguments);var t=W(e).getTime(),a=Q(r);return new Date(t+a)}var Ze={};function ce(){return Ze}function et(e){var r=new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()));return r.setUTCFullYear(e.getFullYear()),e.getTime()-r.getTime()}function tt(e){return M(1,arguments),e instanceof Date||Le(e)==="object"&&Object.prototype.toString.call(e)==="[object Date]"}function rt(e){if(M(1,arguments),!tt(e)&&typeof e!="number")return!1;var r=W(e);return!isNaN(Number(r))}function at(e,r){M(2,arguments);var t=Q(r);return Ke(e,-t)}var nt=864e5;function it(e){M(1,arguments);var r=W(e),t=r.getTime();r.setUTCMonth(0,1),r.setUTCHours(0,0,0,0);var a=r.getTime(),n=t-a;return Math.floor(n/nt)+1}function le(e){M(1,arguments);var r=1,t=W(e),a=t.getUTCDay(),n=(a<r?7:0)+a-r;return t.setUTCDate(t.getUTCDate()-n),t.setUTCHours(0,0,0,0),t}function Re(e){M(1,arguments);var r=W(e),t=r.getUTCFullYear(),a=new Date(0);a.setUTCFullYear(t+1,0,4),a.setUTCHours(0,0,0,0);var n=le(a),i=new Date(0);i.setUTCFullYear(t,0,4),i.setUTCHours(0,0,0,0);var s=le(i);return r.getTime()>=n.getTime()?t+1:r.getTime()>=s.getTime()?t:t-1}function ot(e){M(1,arguments);var r=Re(e),t=new Date(0);t.setUTCFullYear(r,0,4),t.setUTCHours(0,0,0,0);var a=le(t);return a}var st=6048e5;function lt(e){M(1,arguments);var r=W(e),t=le(r).getTime()-ot(r).getTime();return Math.round(t/st)+1}function de(e,r){var t,a,n,i,s,h,f,v;M(1,arguments);var w=ce(),p=Q((t=(a=(n=(i=r==null?void 0:r.weekStartsOn)!==null&&i!==void 0?i:r==null||(s=r.locale)===null||s===void 0||(h=s.options)===null||h===void 0?void 0:h.weekStartsOn)!==null&&n!==void 0?n:w.weekStartsOn)!==null&&a!==void 0?a:(f=w.locale)===null||f===void 0||(v=f.options)===null||v===void 0?void 0:v.weekStartsOn)!==null&&t!==void 0?t:0);if(!(p>=0&&p<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");var x=W(e),T=x.getUTCDay(),$=(T<p?7:0)+T-p;return x.setUTCDate(x.getUTCDate()-$),x.setUTCHours(0,0,0,0),x}function qe(e,r){var t,a,n,i,s,h,f,v;M(1,arguments);var w=W(e),p=w.getUTCFullYear(),x=ce(),T=Q((t=(a=(n=(i=r==null?void 0:r.firstWeekContainsDate)!==null&&i!==void 0?i:r==null||(s=r.locale)===null||s===void 0||(h=s.options)===null||h===void 0?void 0:h.firstWeekContainsDate)!==null&&n!==void 0?n:x.firstWeekContainsDate)!==null&&a!==void 0?a:(f=x.locale)===null||f===void 0||(v=f.options)===null||v===void 0?void 0:v.firstWeekContainsDate)!==null&&t!==void 0?t:1);if(!(T>=1&&T<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var $=new Date(0);$.setUTCFullYear(p+1,0,T),$.setUTCHours(0,0,0,0);var B=de($,r),F=new Date(0);F.setUTCFullYear(p,0,T),F.setUTCHours(0,0,0,0);var _=de(F,r);return w.getTime()>=B.getTime()?p+1:w.getTime()>=_.getTime()?p:p-1}function dt(e,r){var t,a,n,i,s,h,f,v;M(1,arguments);var w=ce(),p=Q((t=(a=(n=(i=r==null?void 0:r.firstWeekContainsDate)!==null&&i!==void 0?i:r==null||(s=r.locale)===null||s===void 0||(h=s.options)===null||h===void 0?void 0:h.firstWeekContainsDate)!==null&&n!==void 0?n:w.firstWeekContainsDate)!==null&&a!==void 0?a:(f=w.locale)===null||f===void 0||(v=f.options)===null||v===void 0?void 0:v.firstWeekContainsDate)!==null&&t!==void 0?t:1),x=qe(e,r),T=new Date(0);T.setUTCFullYear(x,0,p),T.setUTCHours(0,0,0,0);var $=de(T,r);return $}var ct=6048e5;function ut(e,r){M(1,arguments);var t=W(e),a=de(t,r).getTime()-dt(t,r).getTime();return Math.round(a/ct)+1}function m(e,r){for(var t=e<0?"-":"",a=Math.abs(e).toString();a.length<r;)a="0"+a;return t+a}var mt={y:function(r,t){var a=r.getUTCFullYear(),n=a>0?a:1-a;return m(t==="yy"?n%100:n,t.length)},M:function(r,t){var a=r.getUTCMonth();return t==="M"?String(a+1):m(a+1,2)},d:function(r,t){return m(r.getUTCDate(),t.length)},a:function(r,t){var a=r.getUTCHours()/12>=1?"pm":"am";switch(t){case"a":case"aa":return a.toUpperCase();case"aaa":return a;case"aaaaa":return a[0];case"aaaa":default:return a==="am"?"a.m.":"p.m."}},h:function(r,t){return m(r.getUTCHours()%12||12,t.length)},H:function(r,t){return m(r.getUTCHours(),t.length)},m:function(r,t){return m(r.getUTCMinutes(),t.length)},s:function(r,t){return m(r.getUTCSeconds(),t.length)},S:function(r,t){var a=t.length,n=r.getUTCMilliseconds(),i=Math.floor(n*Math.pow(10,a-3));return m(i,t.length)}};const R=mt;var Z={am:"am",pm:"pm",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},ht={G:function(r,t,a){var n=r.getUTCFullYear()>0?1:0;switch(t){case"G":case"GG":case"GGG":return a.era(n,{width:"abbreviated"});case"GGGGG":return a.era(n,{width:"narrow"});case"GGGG":default:return a.era(n,{width:"wide"})}},y:function(r,t,a){if(t==="yo"){var n=r.getUTCFullYear(),i=n>0?n:1-n;return a.ordinalNumber(i,{unit:"year"})}return R.y(r,t)},Y:function(r,t,a,n){var i=qe(r,n),s=i>0?i:1-i;if(t==="YY"){var h=s%100;return m(h,2)}return t==="Yo"?a.ordinalNumber(s,{unit:"year"}):m(s,t.length)},R:function(r,t){var a=Re(r);return m(a,t.length)},u:function(r,t){var a=r.getUTCFullYear();return m(a,t.length)},Q:function(r,t,a){var n=Math.ceil((r.getUTCMonth()+1)/3);switch(t){case"Q":return String(n);case"QQ":return m(n,2);case"Qo":return a.ordinalNumber(n,{unit:"quarter"});case"QQQ":return a.quarter(n,{width:"abbreviated",context:"formatting"});case"QQQQQ":return a.quarter(n,{width:"narrow",context:"formatting"});case"QQQQ":default:return a.quarter(n,{width:"wide",context:"formatting"})}},q:function(r,t,a){var n=Math.ceil((r.getUTCMonth()+1)/3);switch(t){case"q":return String(n);case"qq":return m(n,2);case"qo":return a.ordinalNumber(n,{unit:"quarter"});case"qqq":return a.quarter(n,{width:"abbreviated",context:"standalone"});case"qqqqq":return a.quarter(n,{width:"narrow",context:"standalone"});case"qqqq":default:return a.quarter(n,{width:"wide",context:"standalone"})}},M:function(r,t,a){var n=r.getUTCMonth();switch(t){case"M":case"MM":return R.M(r,t);case"Mo":return a.ordinalNumber(n+1,{unit:"month"});case"MMM":return a.month(n,{width:"abbreviated",context:"formatting"});case"MMMMM":return a.month(n,{width:"narrow",context:"formatting"});case"MMMM":default:return a.month(n,{width:"wide",context:"formatting"})}},L:function(r,t,a){var n=r.getUTCMonth();switch(t){case"L":return String(n+1);case"LL":return m(n+1,2);case"Lo":return a.ordinalNumber(n+1,{unit:"month"});case"LLL":return a.month(n,{width:"abbreviated",context:"standalone"});case"LLLLL":return a.month(n,{width:"narrow",context:"standalone"});case"LLLL":default:return a.month(n,{width:"wide",context:"standalone"})}},w:function(r,t,a,n){var i=ut(r,n);return t==="wo"?a.ordinalNumber(i,{unit:"week"}):m(i,t.length)},I:function(r,t,a){var n=lt(r);return t==="Io"?a.ordinalNumber(n,{unit:"week"}):m(n,t.length)},d:function(r,t,a){return t==="do"?a.ordinalNumber(r.getUTCDate(),{unit:"date"}):R.d(r,t)},D:function(r,t,a){var n=it(r);return t==="Do"?a.ordinalNumber(n,{unit:"dayOfYear"}):m(n,t.length)},E:function(r,t,a){var n=r.getUTCDay();switch(t){case"E":case"EE":case"EEE":return a.day(n,{width:"abbreviated",context:"formatting"});case"EEEEE":return a.day(n,{width:"narrow",context:"formatting"});case"EEEEEE":return a.day(n,{width:"short",context:"formatting"});case"EEEE":default:return a.day(n,{width:"wide",context:"formatting"})}},e:function(r,t,a,n){var i=r.getUTCDay(),s=(i-n.weekStartsOn+8)%7||7;switch(t){case"e":return String(s);case"ee":return m(s,2);case"eo":return a.ordinalNumber(s,{unit:"day"});case"eee":return a.day(i,{width:"abbreviated",context:"formatting"});case"eeeee":return a.day(i,{width:"narrow",context:"formatting"});case"eeeeee":return a.day(i,{width:"short",context:"formatting"});case"eeee":default:return a.day(i,{width:"wide",context:"formatting"})}},c:function(r,t,a,n){var i=r.getUTCDay(),s=(i-n.weekStartsOn+8)%7||7;switch(t){case"c":return String(s);case"cc":return m(s,t.length);case"co":return a.ordinalNumber(s,{unit:"day"});case"ccc":return a.day(i,{width:"abbreviated",context:"standalone"});case"ccccc":return a.day(i,{width:"narrow",context:"standalone"});case"cccccc":return a.day(i,{width:"short",context:"standalone"});case"cccc":default:return a.day(i,{width:"wide",context:"standalone"})}},i:function(r,t,a){var n=r.getUTCDay(),i=n===0?7:n;switch(t){case"i":return String(i);case"ii":return m(i,t.length);case"io":return a.ordinalNumber(i,{unit:"day"});case"iii":return a.day(n,{width:"abbreviated",context:"formatting"});case"iiiii":return a.day(n,{width:"narrow",context:"formatting"});case"iiiiii":return a.day(n,{width:"short",context:"formatting"});case"iiii":default:return a.day(n,{width:"wide",context:"formatting"})}},a:function(r,t,a){var n=r.getUTCHours(),i=n/12>=1?"pm":"am";switch(t){case"a":case"aa":return a.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"aaa":return a.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"aaaaa":return a.dayPeriod(i,{width:"narrow",context:"formatting"});case"aaaa":default:return a.dayPeriod(i,{width:"wide",context:"formatting"})}},b:function(r,t,a){var n=r.getUTCHours(),i;switch(n===12?i=Z.noon:n===0?i=Z.midnight:i=n/12>=1?"pm":"am",t){case"b":case"bb":return a.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"bbb":return a.dayPeriod(i,{width:"abbreviated",context:"formatting"}).toLowerCase();case"bbbbb":return a.dayPeriod(i,{width:"narrow",context:"formatting"});case"bbbb":default:return a.dayPeriod(i,{width:"wide",context:"formatting"})}},B:function(r,t,a){var n=r.getUTCHours(),i;switch(n>=17?i=Z.evening:n>=12?i=Z.afternoon:n>=4?i=Z.morning:i=Z.night,t){case"B":case"BB":case"BBB":return a.dayPeriod(i,{width:"abbreviated",context:"formatting"});case"BBBBB":return a.dayPeriod(i,{width:"narrow",context:"formatting"});case"BBBB":default:return a.dayPeriod(i,{width:"wide",context:"formatting"})}},h:function(r,t,a){if(t==="ho"){var n=r.getUTCHours()%12;return n===0&&(n=12),a.ordinalNumber(n,{unit:"hour"})}return R.h(r,t)},H:function(r,t,a){return t==="Ho"?a.ordinalNumber(r.getUTCHours(),{unit:"hour"}):R.H(r,t)},K:function(r,t,a){var n=r.getUTCHours()%12;return t==="Ko"?a.ordinalNumber(n,{unit:"hour"}):m(n,t.length)},k:function(r,t,a){var n=r.getUTCHours();return n===0&&(n=24),t==="ko"?a.ordinalNumber(n,{unit:"hour"}):m(n,t.length)},m:function(r,t,a){return t==="mo"?a.ordinalNumber(r.getUTCMinutes(),{unit:"minute"}):R.m(r,t)},s:function(r,t,a){return t==="so"?a.ordinalNumber(r.getUTCSeconds(),{unit:"second"}):R.s(r,t)},S:function(r,t){return R.S(r,t)},X:function(r,t,a,n){var i=n._originalDate||r,s=i.getTimezoneOffset();if(s===0)return"Z";switch(t){case"X":return _e(s);case"XXXX":case"XX":return I(s);case"XXXXX":case"XXX":default:return I(s,":")}},x:function(r,t,a,n){var i=n._originalDate||r,s=i.getTimezoneOffset();switch(t){case"x":return _e(s);case"xxxx":case"xx":return I(s);case"xxxxx":case"xxx":default:return I(s,":")}},O:function(r,t,a,n){var i=n._originalDate||r,s=i.getTimezoneOffset();switch(t){case"O":case"OO":case"OOO":return"GMT"+Fe(s,":");case"OOOO":default:return"GMT"+I(s,":")}},z:function(r,t,a,n){var i=n._originalDate||r,s=i.getTimezoneOffset();switch(t){case"z":case"zz":case"zzz":return"GMT"+Fe(s,":");case"zzzz":default:return"GMT"+I(s,":")}},t:function(r,t,a,n){var i=n._originalDate||r,s=Math.floor(i.getTime()/1e3);return m(s,t.length)},T:function(r,t,a,n){var i=n._originalDate||r,s=i.getTime();return m(s,t.length)}};function Fe(e,r){var t=e>0?"-":"+",a=Math.abs(e),n=Math.floor(a/60),i=a%60;if(i===0)return t+String(n);var s=r||"";return t+String(n)+s+m(i,2)}function _e(e,r){if(e%60===0){var t=e>0?"-":"+";return t+m(Math.abs(e)/60,2)}return I(e,r)}function I(e,r){var t=r||"",a=e>0?"-":"+",n=Math.abs(e),i=m(Math.floor(n/60),2),s=m(n%60,2);return a+i+t+s}const ft=ht;var Ye=function(r,t){switch(r){case"P":return t.date({width:"short"});case"PP":return t.date({width:"medium"});case"PPP":return t.date({width:"long"});case"PPPP":default:return t.date({width:"full"})}},Be=function(r,t){switch(r){case"p":return t.time({width:"short"});case"pp":return t.time({width:"medium"});case"ppp":return t.time({width:"long"});case"pppp":default:return t.time({width:"full"})}},gt=function(r,t){var a=r.match(/(P+)(p+)?/)||[],n=a[1],i=a[2];if(!i)return Ye(r,t);var s;switch(n){case"P":s=t.dateTime({width:"short"});break;case"PP":s=t.dateTime({width:"medium"});break;case"PPP":s=t.dateTime({width:"long"});break;case"PPPP":default:s=t.dateTime({width:"full"});break}return s.replace("{{date}}",Ye(n,t)).replace("{{time}}",Be(i,t))},vt={p:Be,P:gt};const pt=vt;var bt=["D","DD"],yt=["YY","YYYY"];function wt(e){return bt.indexOf(e)!==-1}function xt(e){return yt.indexOf(e)!==-1}function Ae(e,r,t){if(e==="YYYY")throw new RangeError("Use `yyyy` instead of `YYYY` (in `".concat(r,"`) for formatting years to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(e==="YY")throw new RangeError("Use `yy` instead of `YY` (in `".concat(r,"`) for formatting years to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(e==="D")throw new RangeError("Use `d` instead of `D` (in `".concat(r,"`) for formatting days of the month to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"));if(e==="DD")throw new RangeError("Use `dd` instead of `DD` (in `".concat(r,"`) for formatting days of the month to the input `").concat(t,"`; see: https://github.com/date-fns/date-fns/blob/master/docs/unicodeTokens.md"))}var Ct={lessThanXSeconds:{one:"less than a second",other:"less than {{count}} seconds"},xSeconds:{one:"1 second",other:"{{count}} seconds"},halfAMinute:"half a minute",lessThanXMinutes:{one:"less than a minute",other:"less than {{count}} minutes"},xMinutes:{one:"1 minute",other:"{{count}} minutes"},aboutXHours:{one:"about 1 hour",other:"about {{count}} hours"},xHours:{one:"1 hour",other:"{{count}} hours"},xDays:{one:"1 day",other:"{{count}} days"},aboutXWeeks:{one:"about 1 week",other:"about {{count}} weeks"},xWeeks:{one:"1 week",other:"{{count}} weeks"},aboutXMonths:{one:"about 1 month",other:"about {{count}} months"},xMonths:{one:"1 month",other:"{{count}} months"},aboutXYears:{one:"about 1 year",other:"about {{count}} years"},xYears:{one:"1 year",other:"{{count}} years"},overXYears:{one:"over 1 year",other:"over {{count}} years"},almostXYears:{one:"almost 1 year",other:"almost {{count}} years"}},Tt=function(r,t,a){var n,i=Ct[r];return typeof i=="string"?n=i:t===1?n=i.one:n=i.other.replace("{{count}}",t.toString()),a!=null&&a.addSuffix?a.comparison&&a.comparison>0?"in "+n:n+" ago":n};const $t=Tt;function me(e){return function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:{},t=r.width?String(r.width):e.defaultWidth,a=e.formats[t]||e.formats[e.defaultWidth];return a}}var kt={full:"EEEE, MMMM do, y",long:"MMMM do, y",medium:"MMM d, y",short:"MM/dd/yyyy"},Dt={full:"h:mm:ss a zzzz",long:"h:mm:ss a z",medium:"h:mm:ss a",short:"h:mm a"},Mt={full:"{{date}} 'at' {{time}}",long:"{{date}} 'at' {{time}}",medium:"{{date}}, {{time}}",short:"{{date}}, {{time}}"},Ot={date:me({formats:kt,defaultWidth:"full"}),time:me({formats:Dt,defaultWidth:"full"}),dateTime:me({formats:Mt,defaultWidth:"full"})};const St=Ot;var Pt={lastWeek:"'last' eeee 'at' p",yesterday:"'yesterday at' p",today:"'today at' p",tomorrow:"'tomorrow at' p",nextWeek:"eeee 'at' p",other:"P"},Et=function(r,t,a,n){return Pt[r]};const Ut=Et;function ie(e){return function(r,t){var a=t!=null&&t.context?String(t.context):"standalone",n;if(a==="formatting"&&e.formattingValues){var i=e.defaultFormattingWidth||e.defaultWidth,s=t!=null&&t.width?String(t.width):i;n=e.formattingValues[s]||e.formattingValues[i]}else{var h=e.defaultWidth,f=t!=null&&t.width?String(t.width):e.defaultWidth;n=e.values[f]||e.values[h]}var v=e.argumentCallback?e.argumentCallback(r):r;return n[v]}}var Wt={narrow:["B","A"],abbreviated:["BC","AD"],wide:["Before Christ","Anno Domini"]},Ft={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["1st quarter","2nd quarter","3rd quarter","4th quarter"]},_t={narrow:["J","F","M","A","M","J","J","A","S","O","N","D"],abbreviated:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],wide:["January","February","March","April","May","June","July","August","September","October","November","December"]},Yt={narrow:["S","M","T","W","T","F","S"],short:["Su","Mo","Tu","We","Th","Fr","Sa"],abbreviated:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],wide:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]},At={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"morning",afternoon:"afternoon",evening:"evening",night:"night"}},Nt={narrow:{am:"a",pm:"p",midnight:"mi",noon:"n",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},abbreviated:{am:"AM",pm:"PM",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"},wide:{am:"a.m.",pm:"p.m.",midnight:"midnight",noon:"noon",morning:"in the morning",afternoon:"in the afternoon",evening:"in the evening",night:"at night"}},Lt=function(r,t){var a=Number(r),n=a%100;if(n>20||n<10)switch(n%10){case 1:return a+"st";case 2:return a+"nd";case 3:return a+"rd"}return a+"th"},Rt={ordinalNumber:Lt,era:ie({values:Wt,defaultWidth:"wide"}),quarter:ie({values:Ft,defaultWidth:"wide",argumentCallback:function(r){return r-1}}),month:ie({values:_t,defaultWidth:"wide"}),day:ie({values:Yt,defaultWidth:"wide"}),dayPeriod:ie({values:At,defaultWidth:"wide",formattingValues:Nt,defaultFormattingWidth:"wide"})};const qt=Rt;function oe(e){return function(r){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=t.width,n=a&&e.matchPatterns[a]||e.matchPatterns[e.defaultMatchWidth],i=r.match(n);if(!i)return null;var s=i[0],h=a&&e.parsePatterns[a]||e.parsePatterns[e.defaultParseWidth],f=Array.isArray(h)?zt(h,function(p){return p.test(s)}):Bt(h,function(p){return p.test(s)}),v;v=e.valueCallback?e.valueCallback(f):f,v=t.valueCallback?t.valueCallback(v):v;var w=r.slice(s.length);return{value:v,rest:w}}}function Bt(e,r){for(var t in e)if(e.hasOwnProperty(t)&&r(e[t]))return t}function zt(e,r){for(var t=0;t<e.length;t++)if(r(e[t]))return t}function Ht(e){return function(r){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},a=r.match(e.matchPattern);if(!a)return null;var n=a[0],i=r.match(e.parsePattern);if(!i)return null;var s=e.valueCallback?e.valueCallback(i[0]):i[0];s=t.valueCallback?t.valueCallback(s):s;var h=r.slice(n.length);return{value:s,rest:h}}}var jt=/^(\d+)(th|st|nd|rd)?/i,It=/\d+/i,Qt={narrow:/^(b|a)/i,abbreviated:/^(b\.?\s?c\.?|b\.?\s?c\.?\s?e\.?|a\.?\s?d\.?|c\.?\s?e\.?)/i,wide:/^(before christ|before common era|anno domini|common era)/i},Gt={any:[/^b/i,/^(a|c)/i]},Xt={narrow:/^[1234]/i,abbreviated:/^q[1234]/i,wide:/^[1234](th|st|nd|rd)? quarter/i},Vt={any:[/1/i,/2/i,/3/i,/4/i]},Jt={narrow:/^[jfmasond]/i,abbreviated:/^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i,wide:/^(january|february|march|april|may|june|july|august|september|october|november|december)/i},Kt={narrow:[/^j/i,/^f/i,/^m/i,/^a/i,/^m/i,/^j/i,/^j/i,/^a/i,/^s/i,/^o/i,/^n/i,/^d/i],any:[/^ja/i,/^f/i,/^mar/i,/^ap/i,/^may/i,/^jun/i,/^jul/i,/^au/i,/^s/i,/^o/i,/^n/i,/^d/i]},Zt={narrow:/^[smtwf]/i,short:/^(su|mo|tu|we|th|fr|sa)/i,abbreviated:/^(sun|mon|tue|wed|thu|fri|sat)/i,wide:/^(sunday|monday|tuesday|wednesday|thursday|friday|saturday)/i},er={narrow:[/^s/i,/^m/i,/^t/i,/^w/i,/^t/i,/^f/i,/^s/i],any:[/^su/i,/^m/i,/^tu/i,/^w/i,/^th/i,/^f/i,/^sa/i]},tr={narrow:/^(a|p|mi|n|(in the|at) (morning|afternoon|evening|night))/i,any:/^([ap]\.?\s?m\.?|midnight|noon|(in the|at) (morning|afternoon|evening|night))/i},rr={any:{am:/^a/i,pm:/^p/i,midnight:/^mi/i,noon:/^no/i,morning:/morning/i,afternoon:/afternoon/i,evening:/evening/i,night:/night/i}},ar={ordinalNumber:Ht({matchPattern:jt,parsePattern:It,valueCallback:function(r){return parseInt(r,10)}}),era:oe({matchPatterns:Qt,defaultMatchWidth:"wide",parsePatterns:Gt,defaultParseWidth:"any"}),quarter:oe({matchPatterns:Xt,defaultMatchWidth:"wide",parsePatterns:Vt,defaultParseWidth:"any",valueCallback:function(r){return r+1}}),month:oe({matchPatterns:Jt,defaultMatchWidth:"wide",parsePatterns:Kt,defaultParseWidth:"any"}),day:oe({matchPatterns:Zt,defaultMatchWidth:"wide",parsePatterns:er,defaultParseWidth:"any"}),dayPeriod:oe({matchPatterns:tr,defaultMatchWidth:"any",parsePatterns:rr,defaultParseWidth:"any"})};const nr=ar;var ir={code:"en-US",formatDistance:$t,formatLong:St,formatRelative:Ut,localize:qt,match:nr,options:{weekStartsOn:0,firstWeekContainsDate:1}};const or=ir;var sr=/[yYQqMLwIdDecihHKkms]o|(\w)\1*|''|'(''|[^'])+('|$)|./g,lr=/P+p+|P+|p+|''|'(''|[^'])+('|$)|./g,dr=/^'([^]*?)'?$/,cr=/''/g,ur=/[a-zA-Z]/;function mr(e,r,t){var a,n,i,s,h,f,v,w,p,x,T,$,B,F,_,G,P,ee;M(2,arguments);var X=String(r),E=ce(),Y=(a=(n=t==null?void 0:t.locale)!==null&&n!==void 0?n:E.locale)!==null&&a!==void 0?a:or,c=Q((i=(s=(h=(f=t==null?void 0:t.firstWeekContainsDate)!==null&&f!==void 0?f:t==null||(v=t.locale)===null||v===void 0||(w=v.options)===null||w===void 0?void 0:w.firstWeekContainsDate)!==null&&h!==void 0?h:E.firstWeekContainsDate)!==null&&s!==void 0?s:(p=E.locale)===null||p===void 0||(x=p.options)===null||x===void 0?void 0:x.firstWeekContainsDate)!==null&&i!==void 0?i:1);if(!(c>=1&&c<=7))throw new RangeError("firstWeekContainsDate must be between 1 and 7 inclusively");var A=Q((T=($=(B=(F=t==null?void 0:t.weekStartsOn)!==null&&F!==void 0?F:t==null||(_=t.locale)===null||_===void 0||(G=_.options)===null||G===void 0?void 0:G.weekStartsOn)!==null&&B!==void 0?B:E.weekStartsOn)!==null&&$!==void 0?$:(P=E.locale)===null||P===void 0||(ee=P.options)===null||ee===void 0?void 0:ee.weekStartsOn)!==null&&T!==void 0?T:0);if(!(A>=0&&A<=6))throw new RangeError("weekStartsOn must be between 0 and 6 inclusively");if(!Y.localize)throw new RangeError("locale must contain localize property");if(!Y.formatLong)throw new RangeError("locale must contain formatLong property");var U=W(e);if(!rt(U))throw new RangeError("Invalid time value");var te=et(U),re=at(U,te),V={firstWeekContainsDate:c,weekStartsOn:A,locale:Y,_originalDate:U},N=X.match(lr).map(function(D){var S=D[0];if(S==="p"||S==="P"){var J=pt[S];return J(D,Y.formatLong)}return D}).join("").match(sr).map(function(D){if(D==="''")return"'";var S=D[0];if(S==="'")return hr(D);var J=ft[S];if(J)return!(t!=null&&t.useAdditionalWeekYearTokens)&&xt(D)&&Ae(D,r,String(e)),!(t!=null&&t.useAdditionalDayOfYearTokens)&&wt(D)&&Ae(D,r,String(e)),J(re,D,Y.localize,V);if(S.match(ur))throw new RangeError("Format string contains an unescaped latin alphabet character `"+S+"`");return D}).join("");return N}function hr(e){var r=e.match(dr);return r?r[1].replace(cr,"'"):e}const fr=u.div`
  padding: ${e=>e.theme.spacing(3)};
  min-height: calc(100vh - 80px);
  background-color: ${e=>e.theme.colors.background.default};
  background-image: linear-gradient(
    to bottom right,
    ${e=>e.theme.colors.background.default},
    ${e=>e.theme.colors.background.paper}
  );
`,gr=u(C.div)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${e=>e.theme.spacing(4)};
  flex-wrap: wrap;
  gap: ${e=>e.theme.spacing(2)};
  padding-bottom: ${e=>e.theme.spacing(2)};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,vr=u(C.h1)`
  font-size: 1.8rem;
  color: ${e=>e.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,pr=u(C.div)`
  display: flex;
  align-items: center;
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(1)};
  width: 300px;
  border: 1px solid ${e=>e.theme.colors.border};
  box-shadow: ${e=>e.theme.shadows.small};
  transition: all 0.2s ease-in-out;

  &:focus-within {
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}30;
  }

  svg {
    margin: 0 ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.text.secondary};
  }

  input {
    border: none;
    outline: none;
    background: transparent;
    flex: 1;
    padding: ${e=>e.theme.spacing(1)};
    color: ${e=>e.theme.colors.text.primary};
    font-size: 0.95rem;
  }
`,br=u(C.div)`
  display: flex;
  gap: ${e=>e.theme.spacing(2)};
  margin-bottom: ${e=>e.theme.spacing(3)};
  flex-wrap: wrap;
  background-color: ${e=>e.theme.colors.background.paper};
  padding: ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.medium};
  box-shadow: ${e=>e.theme.shadows.small};
`,he=u.label`
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.9rem;
  font-weight: 500;

  svg {
    color: ${e=>e.theme.colors.primary.main};
  }
`,fe=u(C.div)`
  display: flex;
  flex-direction: column;
  gap: ${e=>e.theme.spacing(.5)};
`,ge=u.select`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.9rem;
  min-width: 140px;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 8px center;
  background-size: 16px;
  cursor: pointer;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}30;
  }

  &:hover {
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,yr=u.input`
  padding: ${e=>e.theme.spacing(1)}
    ${e=>e.theme.spacing(2)};
  border-radius: ${e=>e.theme.borderRadius.small};
  border: 1px solid ${e=>e.theme.colors.border};
  background-color: ${e=>e.theme.colors.background.paper};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.9rem;
  min-width: 140px;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}30;
  }

  &:hover {
    border-color: ${e=>e.theme.colors.primary.main};
  }
`,wr=u(C.table)`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  overflow: hidden;
  box-shadow: ${e=>e.theme.shadows.medium};
`,xr=u.thead`
  background-color: ${e=>e.theme.colors.background.default};
  border-bottom: 1px solid ${e=>e.theme.colors.border};
`,Cr=u(C.tr)`
  &:not(:last-child) {
    border-bottom: 1px solid ${e=>e.theme.colors.border};
  }

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
  }
`,H=u.th`
  padding: ${e=>e.theme.spacing(2)};
  text-align: left;
  font-weight: 600;
  color: ${e=>e.theme.colors.text.secondary};
  font-size: 0.9rem;
`,j=u.td`
  padding: ${e=>e.theme.spacing(2)};
  color: ${e=>e.theme.colors.text.primary};
  font-size: 0.9rem;
`,Ne=u(C.span)`
  display: inline-flex;
  align-items: center;
  padding: ${e=>e.theme.spacing(.5)}
    ${e=>e.theme.spacing(1.5)};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 0.85rem;
  font-weight: 500;
  gap: ${e=>e.theme.spacing(.5)};

  ${e=>{switch(e.status){case"confirmed":return`
          background-color: ${e.theme.colors.status.successLight};
          color: ${e.theme.colors.status.success};
        `;case"pending":return`
          background-color: ${e.theme.colors.status.warningLight};
          color: ${e.theme.colors.status.warning};
        `;case"cancelled":return`
          background-color: ${e.theme.colors.status.errorLight};
          color: ${e.theme.colors.status.error};
        `;case"completed":return`
          background-color: ${e.theme.colors.primary.light}50;
          color: ${e.theme.colors.primary.main};
        `;default:return`
          background-color: ${e.theme.colors.background.paper};
          color: ${e.theme.colors.text.secondary};
        `}}}
`,Tr=u.div`
  display: flex;
  gap: ${e=>e.theme.spacing(1)};
`,ve=u(q)`
  padding: ${e=>e.theme.spacing(.75)}
    ${e=>e.theme.spacing(1.25)};
  font-size: 0.85rem;
  position: relative;

  &:hover::after {
    content: "${e=>e.tooltip}";
    position: absolute;
    bottom: 100%;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 0.75rem;
    white-space: nowrap;
    pointer-events: none;
    margin-bottom: 5px;
    z-index: 100;
  }
`,$r=u(C.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(3px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  overflow-y: auto;
  padding: ${e=>e.theme.spacing(2)};
`,kr=u(C.div)`
  background-color: ${e=>e.theme.colors.background.paper};
  border-radius: ${e=>e.theme.borderRadius.medium};
  padding: ${e=>e.theme.spacing(4)};
  width: 100%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: ${e=>e.theme.shadows.large};
  position: relative;
`,pe=u.h2`
  font-size: 1.5rem;
  margin-bottom: ${e=>e.theme.spacing(3)};
  color: ${e=>e.theme.colors.text.primary};
  display: flex;
  align-items: center;
  gap: ${e=>e.theme.spacing(1)};
`,Dr=u.button`
  position: absolute;
  top: ${e=>e.theme.spacing(2)};
  right: ${e=>e.theme.spacing(2)};
  background: none;
  border: none;
  font-size: 1.2rem;
  color: ${e=>e.theme.colors.text.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(.5)};
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    background-color: ${e=>e.theme.colors.background.default};
    color: ${e=>e.theme.colors.text.primary};
  }
`,se=u.div`
  margin-bottom: ${e=>e.theme.spacing(3)};
`,O=u.label`
  display: block;
  margin-bottom: ${e=>e.theme.spacing(.75)};
  font-size: 0.9rem;
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`;u.input`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
  background-color: ${e=>e.theme.colors.background.paper};
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}30;
  }
`;const Mr=u.textarea`
  width: 100%;
  padding: ${e=>e.theme.spacing(1.5)};
  border: 1px solid ${e=>e.theme.colors.border};
  border-radius: ${e=>e.theme.borderRadius.small};
  font-size: 1rem;
  color: ${e=>e.theme.colors.text.primary};
  background-color: ${e=>e.theme.colors.background.paper};
  min-height: 100px;
  resize: vertical;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${e=>e.theme.colors.primary.main};
    box-shadow: 0 0 0 2px ${e=>e.theme.colors.primary.light}30;
  }
`,be=u.div`
  display: flex;
  justify-content: flex-end;
  gap: ${e=>e.theme.spacing(2)};
  margin-top: ${e=>e.theme.spacing(4)};
`,Or=u.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${e=>e.theme.spacing(6)};
  text-align: center;
`,Sr=u.div`
  margin-top: ${e=>e.theme.spacing(2)};
  color: ${e=>e.theme.colors.text.secondary};
  font-weight: 500;
`,Pr=u.div`
  text-align: center;
  padding: ${e=>e.theme.spacing(4)};
  color: ${e=>e.theme.colors.status.error};
  display: flex;
  flex-direction: column;
  align-items: center;
`,Er=u(Ve)`
  text-align: center;
  padding: ${e=>e.theme.spacing(6)};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`,ye={hidden:{opacity:0},visible:{opacity:1,transition:{staggerChildren:.1}}},Ur={hidden:{opacity:0,y:20},visible:{opacity:1,y:0}},Br=()=>{var xe,Ce,Te,$e,ke,De,Me;const[e,r]=k.useState([]),[t,a]=k.useState([]),[n,i]=k.useState([]),[s,h]=k.useState([]),[f,v]=k.useState(""),[w,p]=k.useState(""),[x,T]=k.useState(""),[$,B]=k.useState(""),[F,_]=k.useState(!0),[G,P]=k.useState(null),[ee,X]=k.useState(!1),[E,Y]=k.useState("view"),[c,A]=k.useState(null),[U,te]=k.useState({status:"",notes:""});k.useEffect(()=>{(async()=>{try{_(!0);const b=await ae.getAppointments(),y=await ae.getPatients(),g=await ae.getDoctors();r(Array.isArray(b)?b:[]),a(Array.isArray(b)?b:[]),i(Array.isArray(y)?y:[]),h(Array.isArray(g)?g:[]),_(!1)}catch(b){console.error("Error fetching data:",b),r([]),a([]),i([]),h([]),P("Failed to load appointments. Please try again later."),_(!1)}})()},[]),k.useEffect(()=>{re()},[f,w,x,$,e]);const re=l=>{const b=l||e;if(!Array.isArray(b)||b.length===0)return l||a([]),[];let y=[...b];if(f&&(y=y.filter(g=>{var L,K;return((L=g.patient)==null?void 0:L.name)&&g.patient.name.toLowerCase().includes(f.toLowerCase())||((K=g.doctor)==null?void 0:K.name)&&g.doctor.name.toLowerCase().includes(f.toLowerCase())||g.reason&&g.reason.toLowerCase().includes(f.toLowerCase())})),w&&(y=y.filter(g=>g.status===w)),x&&(y=y.filter(g=>{var L;return((L=g.doctor)==null?void 0:L._id)===x})),$){const g=new Date($);y=y.filter(L=>{if(!L.appointmentDate)return!1;const K=new Date(L.appointmentDate);return K.getDate()===g.getDate()&&K.getMonth()===g.getMonth()&&K.getFullYear()===g.getFullYear()})}return l||a(y),y},V=l=>mr(new Date(l),"MMM dd, yyyy"),N=l=>l,D=l=>{Y("view"),A(l),te({status:l.status,notes:l.notes||""}),X(!0)},S=l=>{Y("edit"),A(l),te({status:l.status,notes:l.notes||""}),X(!0)},J=l=>{Y("delete"),A(l),X(!0)},z=()=>{X(!1),A(null)},we=l=>{const{name:b,value:y}=l.target;te(g=>({...g,[b]:y}))},ze=async l=>{if(l.preventDefault(),!U){P("Invalid form data");return}try{if(E==="edit"&&c&&c._id){await ae.updateAppointment(c._id,U);const b=e.map(g=>g._id===c._id?{...g,...U}:g);r(b);const y=re(b);a(y)}else{P("Invalid operation or missing appointment data");return}z()}catch(b){console.error("Error saving appointment:",b),P("Failed to save appointment. Please try again.")}},He=async()=>{if(!c||!c._id){P("Cannot delete: Invalid appointment data"),z();return}try{await ae.deleteAppointment(c._id);const l=e.filter(y=>y._id!==c._id);r(l);const b=re(l);a(b||[]),z()}catch(l){console.error("Error deleting appointment:",l),P("Failed to delete appointment. Please try again.")}};return F?d(Or,{children:[o(We,{type:"loading",width:"200px",height:"200px"}),o(Sr,{children:"Loading appointments..."})]}):G?d(Pr,{children:[o(Oe,{size:40,style:{marginBottom:"1rem",color:"#EF4444"}}),o("h3",{style:{marginBottom:"0.5rem"},children:"Error Loading Data"}),o("p",{children:G}),o(q,{style:{marginTop:"1rem"},onClick:()=>window.location.reload(),children:"Try Again"})]}):o(Je,{children:d(fr,{children:[d(gr,{as:C.div,variants:ye,initial:"hidden",animate:"visible",children:[d(vr,{variants:ne,children:[o(Se,{}),"Manage Appointments"]}),d(pr,{variants:ne,children:[o(je,{}),o("input",{type:"text",placeholder:"Search appointments...",value:f,onChange:l=>v(l.target.value)})]})]}),d(br,{as:C.div,variants:ye,initial:"hidden",animate:"visible",children:[d(fe,{variants:ne,children:[d(he,{children:[o(Pe,{})," Status"]}),d(ge,{value:w,onChange:l=>p(l.target.value),children:[o("option",{value:"",children:"All Status"}),o("option",{value:"pending",children:"Pending"}),o("option",{value:"confirmed",children:"Confirmed"}),o("option",{value:"completed",children:"Completed"}),o("option",{value:"cancelled",children:"Cancelled"})]})]}),d(fe,{variants:ne,children:[d(he,{children:[o(Pe,{})," Doctor"]}),d(ge,{value:x,onChange:l=>T(l.target.value),children:[o("option",{value:"",children:"All Doctors"}),s.map(l=>o("option",{value:l._id,children:l.name},l._id))]})]}),d(fe,{variants:ne,children:[d(he,{children:[o(Se,{})," Date"]}),o(yr,{type:"date",value:$,onChange:l=>B(l.target.value)})]})]}),!t||t.length===0?d(Er,{as:C.div,initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{delay:.2},children:[o(We,{type:"emptyState",width:"200px",height:"200px",margin:"0 0 1rem 0"}),o("h3",{style:{marginBottom:"0.5rem"},children:"No Appointments Found"}),o("p",{children:f||w||x||$?"Try adjusting your filters to see more results.":"There are no appointments scheduled in the system yet."})]}):o(C.div,{variants:ye,initial:"hidden",animate:"visible",children:d(wr,{children:[o(xr,{children:d("tr",{children:[o(H,{children:"Patient"}),o(H,{children:"Doctor"}),o(H,{children:"Date"}),o(H,{children:"Time"}),o(H,{children:"Type"}),o(H,{children:"Status"}),o(H,{children:"Actions"})]})}),o("tbody",{children:t.map((l,b)=>{var y,g;return d(Cr,{as:C.tr,variants:Ur,custom:b,whileHover:{backgroundColor:"#f9fafb",transition:{duration:.1}},children:[o(j,{children:((y=l.patient)==null?void 0:y.name)||"Unknown"}),o(j,{children:((g=l.doctor)==null?void 0:g.name)||"Unknown"}),o(j,{children:l.appointmentDate?V(l.appointmentDate):"N/A"}),d(j,{children:[l.startTime?N(l.startTime):"N/A"," ","-"," ",l.endTime?N(l.endTime):"N/A"]}),o(j,{children:l.appointmentType||"General"}),o(j,{children:d(Ne,{status:l.status||"pending",initial:{scale:.8,opacity:0},animate:{scale:1,opacity:1},transition:{delay:.1*b},children:[l.status==="confirmed"&&o(Ee,{size:12}),l.status==="cancelled"&&o(ue,{size:12}),(l.status||"pending").charAt(0).toUpperCase()+(l.status||"pending").slice(1)]})}),o(j,{children:d(Tr,{children:[o(ve,{variant:"secondary",size:"small",onClick:()=>D(l),tooltip:"View details",children:o(Ie,{})}),o(ve,{variant:"primary",size:"small",onClick:()=>S(l),tooltip:"Edit appointment",children:o(Ue,{})}),o(ve,{variant:"danger",size:"small",onClick:()=>J(l),tooltip:"Delete appointment",children:o(Qe,{})})]})})]},l._id)})})]})}),o(Xe,{children:ee&&o($r,{initial:{opacity:0},animate:{opacity:1},exit:{opacity:0},children:d(kr,{initial:{y:20,opacity:0},animate:{y:0,opacity:1},exit:{y:-20,opacity:0},transition:{type:"spring",damping:25},children:[o(Dr,{onClick:z,children:o(ue,{})}),E==="view"&&d(C.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:[d(pe,{children:[o(Ge,{style:{color:"#3B82F6"}}),"Appointment Details"]}),d("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"16px",marginBottom:"24px"},children:[d("div",{children:[o(O,{children:"Patient"}),o("p",{children:((xe=c.patient)==null?void 0:xe.name)||"Unknown"})]}),d("div",{children:[o(O,{children:"Doctor"}),o("p",{children:((Ce=c.doctor)==null?void 0:Ce.name)||"Unknown"})]}),d("div",{children:[o(O,{children:"Department"}),o("p",{children:((Te=c.department)==null?void 0:Te.name)||"General"})]}),d("div",{children:[o(O,{children:"Date"}),o("p",{children:V(c.appointmentDate)})]}),d("div",{children:[o(O,{children:"Time"}),d("p",{children:[N(c.startTime)," -"," ",N(c.endTime)]})]}),d("div",{children:[o(O,{children:"Status"}),d(Ne,{status:c.status,children:[c.status==="confirmed"&&o(Ee,{size:12}),c.status==="cancelled"&&o(ue,{size:12}),c.status.charAt(0).toUpperCase()+c.status.slice(1)]})]})]}),d(se,{children:[o(O,{children:"Reason for Visit"}),o("p",{children:c.reason})]}),c.notes&&d(se,{children:[o(O,{children:"Notes"}),o("p",{children:c.notes})]}),d(be,{children:[o(q,{variant:"secondary",onClick:z,children:"Close"}),o(q,{onClick:()=>S(c),children:"Edit"})]})]}),E==="edit"&&d(C.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:[d(pe,{children:[o(Ue,{style:{color:"#3B82F6"}}),"Update Appointment"]}),d("form",{onSubmit:ze,children:[d("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:"16px",marginBottom:"24px"},children:[d("div",{children:[o(O,{children:"Patient"}),o("p",{children:(($e=c.patient)==null?void 0:$e.name)||"Unknown"})]}),d("div",{children:[o(O,{children:"Doctor"}),o("p",{children:((ke=c.doctor)==null?void 0:ke.name)||"Unknown"})]}),d("div",{children:[o(O,{children:"Date"}),o("p",{children:V(c.appointmentDate)})]}),d("div",{children:[o(O,{children:"Time"}),d("p",{children:[N(c.startTime)," -"," ",N(c.endTime)]})]})]}),d(se,{children:[o(O,{htmlFor:"status",children:"Status"}),d(ge,{id:"status",name:"status",value:U.status,onChange:we,required:!0,children:[o("option",{value:"pending",children:"Pending"}),o("option",{value:"confirmed",children:"Confirmed"}),o("option",{value:"completed",children:"Completed"}),o("option",{value:"cancelled",children:"Cancelled"})]})]}),d(se,{children:[o(O,{htmlFor:"notes",children:"Notes"}),o(Mr,{id:"notes",name:"notes",value:U.notes,onChange:we,placeholder:"Add notes about this appointment"})]}),d(be,{children:[o(q,{variant:"secondary",type:"button",onClick:z,children:"Cancel"}),o(q,{type:"submit",children:"Update Appointment"})]})]})]}),E==="delete"&&d(C.div,{initial:{opacity:0},animate:{opacity:1},transition:{delay:.2},children:[d(pe,{children:[o(Oe,{style:{color:"#EF4444"}}),"Delete Appointment"]}),d("p",{style:{marginBottom:"16px"},children:["Are you sure you want to delete this appointment for"," ",o("strong",{children:((De=c.patient)==null?void 0:De.name)||"Unknown"})," ","with"," ",o("strong",{children:((Me=c.doctor)==null?void 0:Me.name)||"Unknown"})," ","on"," ",o("strong",{children:V(c.appointmentDate)}),"?"]}),o("p",{style:{marginBottom:"24px",color:"#EF4444"},children:"This action cannot be undone."}),d(be,{children:[o(q,{variant:"secondary",onClick:z,children:"Cancel"}),o(q,{variant:"danger",onClick:He,children:"Delete Appointment"})]})]})]})})})]})})};export{Br as default};
//# sourceMappingURL=ManageAppointments-f3a90a48.js.map
