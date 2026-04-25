"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/timers-ext";
exports.ids = ["vendor-chunks/timers-ext"];
exports.modules = {

/***/ "(rsc)/./node_modules/timers-ext/max-timeout.js":
/*!************************************************!*\
  !*** ./node_modules/timers-ext/max-timeout.js ***!
  \************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = 2147483647;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdGltZXJzLWV4dC9tYXgtdGltZW91dC5qcyIsIm1hcHBpbmdzIjoiQUFBYTs7QUFFYiIsInNvdXJjZXMiOlsiQzpcXHNyY1xccHJvamVjdHNcXGluc2lnaHQtc3luYy1haVxcbm9kZV9tb2R1bGVzXFx0aW1lcnMtZXh0XFxtYXgtdGltZW91dC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSAyMTQ3NDgzNjQ3O1xuIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6WzBdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/timers-ext/max-timeout.js\n");

/***/ }),

/***/ "(rsc)/./node_modules/timers-ext/valid-timeout.js":
/*!**************************************************!*\
  !*** ./node_modules/timers-ext/valid-timeout.js ***!
  \**************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\nvar toPosInt   = __webpack_require__(/*! es5-ext/number/to-pos-integer */ \"(rsc)/./node_modules/es5-ext/number/to-pos-integer.js\")\n  , maxTimeout = __webpack_require__(/*! ./max-timeout */ \"(rsc)/./node_modules/timers-ext/max-timeout.js\");\n\nmodule.exports = function (value) {\n\tvalue = toPosInt(value);\n\tif (value > maxTimeout) throw new TypeError(value + \" exceeds maximum possible timeout\");\n\treturn value;\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvdGltZXJzLWV4dC92YWxpZC10aW1lb3V0LmpzIiwibWFwcGluZ3MiOiJBQUFhOztBQUViLGlCQUFpQixtQkFBTyxDQUFDLDRGQUErQjtBQUN4RCxpQkFBaUIsbUJBQU8sQ0FBQyxxRUFBZTs7QUFFeEM7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsiQzpcXHNyY1xccHJvamVjdHNcXGluc2lnaHQtc3luYy1haVxcbm9kZV9tb2R1bGVzXFx0aW1lcnMtZXh0XFx2YWxpZC10aW1lb3V0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdG9Qb3NJbnQgICA9IHJlcXVpcmUoXCJlczUtZXh0L251bWJlci90by1wb3MtaW50ZWdlclwiKVxuICAsIG1heFRpbWVvdXQgPSByZXF1aXJlKFwiLi9tYXgtdGltZW91dFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAodmFsdWUpIHtcblx0dmFsdWUgPSB0b1Bvc0ludCh2YWx1ZSk7XG5cdGlmICh2YWx1ZSA+IG1heFRpbWVvdXQpIHRocm93IG5ldyBUeXBlRXJyb3IodmFsdWUgKyBcIiBleGNlZWRzIG1heGltdW0gcG9zc2libGUgdGltZW91dFwiKTtcblx0cmV0dXJuIHZhbHVlO1xufTtcbiJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOlswXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/timers-ext/valid-timeout.js\n");

/***/ })

};
;