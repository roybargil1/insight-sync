/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/analyze/route";
exports.ids = ["app/api/analyze/route"];
exports.modules = {

/***/ "(rsc)/./app/api/analyze/route.ts":
/*!**********************************!*\
  !*** ./app/api/analyze/route.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _anthropic_ai_sdk__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @anthropic-ai/sdk */ \"(rsc)/./node_modules/@anthropic-ai/sdk/index.mjs\");\n\n\nconst client = new _anthropic_ai_sdk__WEBPACK_IMPORTED_MODULE_1__[\"default\"]({\n    apiKey: process.env.ANTHROPIC_API_KEY\n});\nasync function POST(req) {\n    const { title, raw_text, existingSummary } = await req.json();\n    const message = await client.messages.create({\n        model: \"claude-sonnet-4-6\",\n        max_tokens: 1024,\n        messages: [\n            {\n                role: \"user\",\n                content: `You are a senior product analyst. Analyze the following user feedback.\n\nFeedback title: \"${title}\"\nFeedback text: \"${raw_text}\"\n\nExisting insights already in the system:\n${existingSummary || \"None\"}\n\nReturn a JSON object with ONLY these fields (no markdown, no extra text):\n{\n  \"sentiment\": \"Positive\" | \"Negative\" | \"Neutral\" | \"Mixed\",\n  \"insight_name\": \"<concise insight title, max 8 words>\",\n  \"insight_category\": \"Feature Request\" | \"Bug\" | \"UI/UX\" | \"Positive\",\n  \"insight_severity\": <integer 1-5>,\n  \"insight_description\": \"<1-2 sentence summary>\",\n  \"matching_insight_id\": \"<existing insight ID if this clearly relates to one, otherwise null>\"\n}`\n            }\n        ]\n    });\n    const text = message.content[0].type === \"text\" ? message.content[0].text : \"{}\";\n    const jsonMatch = text.match(/\\{[\\s\\S]*\\}/);\n    const result = JSON.parse(jsonMatch ? jsonMatch[0] : text);\n    return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FuYWx5emUvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQXdEO0FBQ2Q7QUFFMUMsTUFBTUUsU0FBUyxJQUFJRCx5REFBU0EsQ0FBQztJQUFFRSxRQUFRQyxRQUFRQyxHQUFHLENBQUNDLGlCQUFpQjtBQUFDO0FBRTlELGVBQWVDLEtBQUtDLEdBQWdCO0lBQ3pDLE1BQU0sRUFBRUMsS0FBSyxFQUFFQyxRQUFRLEVBQUVDLGVBQWUsRUFBRSxHQUFHLE1BQU1ILElBQUlJLElBQUk7SUFFM0QsTUFBTUMsVUFBVSxNQUFNWCxPQUFPWSxRQUFRLENBQUNDLE1BQU0sQ0FBQztRQUMzQ0MsT0FBTztRQUNQQyxZQUFZO1FBQ1pILFVBQVU7WUFDUjtnQkFDRUksTUFBTTtnQkFDTkMsU0FBUyxDQUFDOztpQkFFRCxFQUFFVixNQUFNO2dCQUNULEVBQUVDLFNBQVM7OztBQUczQixFQUFFQyxtQkFBbUIsT0FBTzs7Ozs7Ozs7OztDQVUzQixDQUFDO1lBQ0k7U0FDRDtJQUNIO0lBRUEsTUFBTVMsT0FBT1AsUUFBUU0sT0FBTyxDQUFDLEVBQUUsQ0FBQ0UsSUFBSSxLQUFLLFNBQVNSLFFBQVFNLE9BQU8sQ0FBQyxFQUFFLENBQUNDLElBQUksR0FBRztJQUU1RSxNQUFNRSxZQUFZRixLQUFLRyxLQUFLLENBQUM7SUFDN0IsTUFBTUMsU0FBU0MsS0FBS0MsS0FBSyxDQUFDSixZQUFZQSxTQUFTLENBQUMsRUFBRSxHQUFHRjtJQUVyRCxPQUFPcEIscURBQVlBLENBQUNZLElBQUksQ0FBQ1k7QUFDM0IiLCJzb3VyY2VzIjpbIkM6XFxzcmNcXHByb2plY3RzXFxpbnNpZ2h0LXN5bmMtYWlcXGFwcFxcYXBpXFxhbmFseXplXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZXh0UmVxdWVzdCwgTmV4dFJlc3BvbnNlIH0gZnJvbSBcIm5leHQvc2VydmVyXCI7XG5pbXBvcnQgQW50aHJvcGljIGZyb20gXCJAYW50aHJvcGljLWFpL3Nka1wiO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgQW50aHJvcGljKHsgYXBpS2V5OiBwcm9jZXNzLmVudi5BTlRIUk9QSUNfQVBJX0tFWSB9KTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIFBPU1QocmVxOiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCB7IHRpdGxlLCByYXdfdGV4dCwgZXhpc3RpbmdTdW1tYXJ5IH0gPSBhd2FpdCByZXEuanNvbigpO1xuXG4gIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBjbGllbnQubWVzc2FnZXMuY3JlYXRlKHtcbiAgICBtb2RlbDogXCJjbGF1ZGUtc29ubmV0LTQtNlwiLFxuICAgIG1heF90b2tlbnM6IDEwMjQsXG4gICAgbWVzc2FnZXM6IFtcbiAgICAgIHtcbiAgICAgICAgcm9sZTogXCJ1c2VyXCIsXG4gICAgICAgIGNvbnRlbnQ6IGBZb3UgYXJlIGEgc2VuaW9yIHByb2R1Y3QgYW5hbHlzdC4gQW5hbHl6ZSB0aGUgZm9sbG93aW5nIHVzZXIgZmVlZGJhY2suXG5cbkZlZWRiYWNrIHRpdGxlOiBcIiR7dGl0bGV9XCJcbkZlZWRiYWNrIHRleHQ6IFwiJHtyYXdfdGV4dH1cIlxuXG5FeGlzdGluZyBpbnNpZ2h0cyBhbHJlYWR5IGluIHRoZSBzeXN0ZW06XG4ke2V4aXN0aW5nU3VtbWFyeSB8fCBcIk5vbmVcIn1cblxuUmV0dXJuIGEgSlNPTiBvYmplY3Qgd2l0aCBPTkxZIHRoZXNlIGZpZWxkcyAobm8gbWFya2Rvd24sIG5vIGV4dHJhIHRleHQpOlxue1xuICBcInNlbnRpbWVudFwiOiBcIlBvc2l0aXZlXCIgfCBcIk5lZ2F0aXZlXCIgfCBcIk5ldXRyYWxcIiB8IFwiTWl4ZWRcIixcbiAgXCJpbnNpZ2h0X25hbWVcIjogXCI8Y29uY2lzZSBpbnNpZ2h0IHRpdGxlLCBtYXggOCB3b3Jkcz5cIixcbiAgXCJpbnNpZ2h0X2NhdGVnb3J5XCI6IFwiRmVhdHVyZSBSZXF1ZXN0XCIgfCBcIkJ1Z1wiIHwgXCJVSS9VWFwiIHwgXCJQb3NpdGl2ZVwiLFxuICBcImluc2lnaHRfc2V2ZXJpdHlcIjogPGludGVnZXIgMS01PixcbiAgXCJpbnNpZ2h0X2Rlc2NyaXB0aW9uXCI6IFwiPDEtMiBzZW50ZW5jZSBzdW1tYXJ5PlwiLFxuICBcIm1hdGNoaW5nX2luc2lnaHRfaWRcIjogXCI8ZXhpc3RpbmcgaW5zaWdodCBJRCBpZiB0aGlzIGNsZWFybHkgcmVsYXRlcyB0byBvbmUsIG90aGVyd2lzZSBudWxsPlwiXG59YCxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG5cbiAgY29uc3QgdGV4dCA9IG1lc3NhZ2UuY29udGVudFswXS50eXBlID09PSBcInRleHRcIiA/IG1lc3NhZ2UuY29udGVudFswXS50ZXh0IDogXCJ7fVwiO1xuXG4gIGNvbnN0IGpzb25NYXRjaCA9IHRleHQubWF0Y2goL1xce1tcXHNcXFNdKlxcfS8pO1xuICBjb25zdCByZXN1bHQgPSBKU09OLnBhcnNlKGpzb25NYXRjaCA/IGpzb25NYXRjaFswXSA6IHRleHQpO1xuXG4gIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbihyZXN1bHQpO1xufVxuIl0sIm5hbWVzIjpbIk5leHRSZXNwb25zZSIsIkFudGhyb3BpYyIsImNsaWVudCIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJBTlRIUk9QSUNfQVBJX0tFWSIsIlBPU1QiLCJyZXEiLCJ0aXRsZSIsInJhd190ZXh0IiwiZXhpc3RpbmdTdW1tYXJ5IiwianNvbiIsIm1lc3NhZ2UiLCJtZXNzYWdlcyIsImNyZWF0ZSIsIm1vZGVsIiwibWF4X3Rva2VucyIsInJvbGUiLCJjb250ZW50IiwidGV4dCIsInR5cGUiLCJqc29uTWF0Y2giLCJtYXRjaCIsInJlc3VsdCIsIkpTT04iLCJwYXJzZSJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/analyze/route.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_src_projects_insight_sync_ai_app_api_analyze_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/analyze/route.ts */ \"(rsc)/./app/api/analyze/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/analyze/route\",\n        pathname: \"/api/analyze\",\n        filename: \"route\",\n        bundlePath: \"app/api/analyze/route\"\n    },\n    resolvedPagePath: \"C:\\\\src\\\\projects\\\\insight-sync-ai\\\\app\\\\api\\\\analyze\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_src_projects_insight_sync_ai_app_api_analyze_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhbmFseXplJTJGcm91dGUmcGFnZT0lMkZhcGklMkZhbmFseXplJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGYW5hbHl6ZSUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDc3JjJTVDcHJvamVjdHMlNUNpbnNpZ2h0LXN5bmMtYWklNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNzcmMlNUNwcm9qZWN0cyU1Q2luc2lnaHQtc3luYy1haSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDZTtBQUM1RjtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IseUdBQW1CO0FBQzNDO0FBQ0EsY0FBYyxrRUFBUztBQUN2QjtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsWUFBWTtBQUNaLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQSxRQUFRLHNEQUFzRDtBQUM5RDtBQUNBLFdBQVcsNEVBQVc7QUFDdEI7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUMwRjs7QUFFMUYiLCJzb3VyY2VzIjpbIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBcHBSb3V0ZVJvdXRlTW9kdWxlIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUtbW9kdWxlcy9hcHAtcm91dGUvbW9kdWxlLmNvbXBpbGVkXCI7XG5pbXBvcnQgeyBSb3V0ZUtpbmQgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcc3JjXFxcXHByb2plY3RzXFxcXGluc2lnaHQtc3luYy1haVxcXFxhcHBcXFxcYXBpXFxcXGFuYWx5emVcXFxccm91dGUudHNcIjtcbi8vIFdlIGluamVjdCB0aGUgbmV4dENvbmZpZ091dHB1dCBoZXJlIHNvIHRoYXQgd2UgY2FuIHVzZSB0aGVtIGluIHRoZSByb3V0ZVxuLy8gbW9kdWxlLlxuY29uc3QgbmV4dENvbmZpZ091dHB1dCA9IFwiXCJcbmNvbnN0IHJvdXRlTW9kdWxlID0gbmV3IEFwcFJvdXRlUm91dGVNb2R1bGUoe1xuICAgIGRlZmluaXRpb246IHtcbiAgICAgICAga2luZDogUm91dGVLaW5kLkFQUF9ST1VURSxcbiAgICAgICAgcGFnZTogXCIvYXBpL2FuYWx5emUvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9hbmFseXplXCIsXG4gICAgICAgIGZpbGVuYW1lOiBcInJvdXRlXCIsXG4gICAgICAgIGJ1bmRsZVBhdGg6IFwiYXBwL2FwaS9hbmFseXplL3JvdXRlXCJcbiAgICB9LFxuICAgIHJlc29sdmVkUGFnZVBhdGg6IFwiQzpcXFxcc3JjXFxcXHByb2plY3RzXFxcXGluc2lnaHQtc3luYy1haVxcXFxhcHBcXFxcYXBpXFxcXGFuYWx5emVcXFxccm91dGUudHNcIixcbiAgICBuZXh0Q29uZmlnT3V0cHV0LFxuICAgIHVzZXJsYW5kXG59KTtcbi8vIFB1bGwgb3V0IHRoZSBleHBvcnRzIHRoYXQgd2UgbmVlZCB0byBleHBvc2UgZnJvbSB0aGUgbW9kdWxlLiBUaGlzIHNob3VsZFxuLy8gYmUgZWxpbWluYXRlZCB3aGVuIHdlJ3ZlIG1vdmVkIHRoZSBvdGhlciByb3V0ZXMgdG8gdGhlIG5ldyBmb3JtYXQuIFRoZXNlXG4vLyBhcmUgdXNlZCB0byBob29rIGludG8gdGhlIHJvdXRlLlxuY29uc3QgeyB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICB3b3JrQXN5bmNTdG9yYWdlLFxuICAgICAgICB3b3JrVW5pdEFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcywgcGF0Y2hGZXRjaCwgIH07XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWFwcC1yb3V0ZS5qcy5tYXAiXSwibmFtZXMiOltdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "../app-render/after-task-async-storage.external":
/*!***********************************************************************************!*\
  !*** external "next/dist/server/app-render/after-task-async-storage.external.js" ***!
  \***********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/after-task-async-storage.external.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:stream":
/*!******************************!*\
  !*** external "node:stream" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream");

/***/ }),

/***/ "node:stream/web":
/*!**********************************!*\
  !*** external "node:stream/web" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:stream/web");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ }),

/***/ "punycode":
/*!***************************!*\
  !*** external "punycode" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("punycode");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("util");

/***/ }),

/***/ "worker_threads":
/*!*********************************!*\
  !*** external "worker_threads" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("worker_threads");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/formdata-node","vendor-chunks/@anthropic-ai","vendor-chunks/form-data-encoder","vendor-chunks/whatwg-url","vendor-chunks/agentkeepalive","vendor-chunks/tr46","vendor-chunks/web-streams-polyfill","vendor-chunks/node-fetch","vendor-chunks/webidl-conversions","vendor-chunks/ms","vendor-chunks/humanize-ms","vendor-chunks/event-target-shim","vendor-chunks/abort-controller"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fanalyze%2Froute&page=%2Fapi%2Fanalyze%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fanalyze%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();