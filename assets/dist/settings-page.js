(()=>{var t={712:(t,e,n)=>{var s=n(680).Symbol;t.exports=s},741:(t,e,n)=>{var s=n(712),o=n(166),r=n(899),i=s?s.toStringTag:void 0;t.exports=function(t){return null==t?void 0===t?"[object Undefined]":"[object Null]":i&&i in Object(t)?o(t):r(t)}},976:(t,e,n)=>{var s=n(153),o=/^\s+/;t.exports=function(t){return t?t.slice(0,s(t)+1).replace(o,""):t}},883:(t,e,n)=>{var s="object"==typeof n.g&&n.g&&n.g.Object===Object&&n.g;t.exports=s},166:(t,e,n)=>{var s=n(712),o=Object.prototype,r=o.hasOwnProperty,i=o.toString,u=s?s.toStringTag:void 0;t.exports=function(t){var e=r.call(t,u),n=t[u];try{t[u]=void 0;var s=!0}catch(t){}var o=i.call(t);return s&&(e?t[u]=n:delete t[u]),o}},899:t=>{var e=Object.prototype.toString;t.exports=function(t){return e.call(t)}},680:(t,e,n)=>{var s=n(883),o="object"==typeof self&&self&&self.Object===Object&&self,r=s||o||Function("return this")();t.exports=r},153:t=>{var e=/\s/;t.exports=function(t){for(var n=t.length;n--&&e.test(t.charAt(n)););return n}},942:(t,e,n)=>{var s=n(31),o=n(526),r=n(123),i=Math.max,u=Math.min;t.exports=function(t,e,n){var a,c,l,p,f,v,g=0,b=!1,w=!1,d=!0;if("function"!=typeof t)throw new TypeError("Expected a function");function _(e){var n=a,s=c;return a=c=void 0,g=e,p=t.apply(s,n)}function y(t){var n=t-v;return void 0===v||n>=e||n<0||w&&t-g>=l}function m(){var t=o();if(y(t))return x(t);f=setTimeout(m,function(t){var n=e-(t-v);return w?u(n,l-(t-g)):n}(t))}function x(t){return f=void 0,d&&a?_(t):(a=c=void 0,p)}function h(){var t=o(),n=y(t);if(a=arguments,c=this,v=t,n){if(void 0===f)return function(t){return g=t,f=setTimeout(m,e),b?_(t):p}(v);if(w)return clearTimeout(f),f=setTimeout(m,e),_(v)}return void 0===f&&(f=setTimeout(m,e)),p}return e=r(e)||0,s(n)&&(b=!!n.leading,l=(w="maxWait"in n)?i(r(n.maxWait)||0,e):l,d="trailing"in n?!!n.trailing:d),h.cancel=function(){void 0!==f&&clearTimeout(f),g=0,a=v=c=f=void 0},h.flush=function(){return void 0===f?p:x(o())},h}},31:t=>{t.exports=function(t){var e=typeof t;return null!=t&&("object"==e||"function"==e)}},108:t=>{t.exports=function(t){return null!=t&&"object"==typeof t}},573:(t,e,n)=>{var s=n(741),o=n(108);t.exports=function(t){return"symbol"==typeof t||o(t)&&"[object Symbol]"==s(t)}},526:(t,e,n)=>{var s=n(680);t.exports=function(){return s.Date.now()}},123:(t,e,n)=>{var s=n(976),o=n(31),r=n(573),i=/^[-+]0x[0-9a-f]+$/i,u=/^0b[01]+$/i,a=/^0o[0-7]+$/i,c=parseInt;t.exports=function(t){if("number"==typeof t)return t;if(r(t))return NaN;if(o(t)){var e="function"==typeof t.valueOf?t.valueOf():t;t=o(e)?e+"":e}if("string"!=typeof t)return 0===t?t:+t;t=s(t);var n=u.test(t);return n||a.test(t)?c(t.slice(2),n?2:8):i.test(t)?NaN:+t}}},e={};function n(s){var o=e[s];if(void 0!==o)return o.exports;var r=e[s]={exports:{}};return t[s](r,r.exports,n),r.exports}n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var s in e)n.o(e,s)&&!n.o(t,s)&&Object.defineProperty(t,s,{enumerable:!0,get:e[s]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),(()=>{"use strict";const t=window.wp.url;var e=n(942),s=n.n(e);jQuery(document).ready((function(){!function(e){const n=e("#js-wsuwp-cost-tables-settings");function o(t){const n=Date.now(),s=t.closest(".wsuwp-cost-tables-settings__kvp-group").dataset.groupLabel,o=`\n\t\t\t<li class="wsuwp-cost-tables-settings__kvp-item">\n\t\t\t<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--name" type="text" name="settings[${s}][${n}][name]" value="" placeholder="name" /></div>\n\t\t\t<div class="wsuwp-cost-tables-settings__input-container"><input class="wsuwp-cost-tables-settings__input wsuwp-cost-tables-settings__input--slug" type="text" name="settings[${s}][${n}][slug]" value="" placeholder="slug" /></div>\n\t\t\t<div><button type="button" title="Remove" aria-label="Remove" class="wsuwp-cost-tables-settings__remove-btn"><span class="dashicons dashicons-trash" aria-hidden="true"></span></button></div>\n\t\t\t</li>\n\t\t\t`;e(t).append(o)}n.on("click",(function(t){!function(t){const e=t.target.closest(".wsuwp-cost-tables-settings__remove-btn"),n=t.target.closest(".wsuwp-cost-tables-settings__kvp-add");e&&confirm("Are you sure?")&&function(t){const e=t.closest(".wsuwp-cost-tables-settings__kvp-list");t.closest(".wsuwp-cost-tables-settings__kvp-item").remove(),0===e.childElementCount&&o(e)}(e),n&&o(n.previousElementSibling)}(t)})),n.on("keyup",s()((function(e){const n=e.target.closest(".wsuwp-cost-tables-settings__input--name");if(n){const e=n.closest(".wsuwp-cost-tables-settings__kvp-item")?.querySelector(".wsuwp-cost-tables-settings__input--slug:not([readonly])");if(e){const s=e.closest(".wsuwp-cost-tables-settings__kvp-group"),o=s.dataset.preSlug||"",r=s.dataset.postSlug||"",i=(0,t.cleanForSlug)(n.value);e.value=o+i+r}}}),150))}(jQuery)}))})()})();