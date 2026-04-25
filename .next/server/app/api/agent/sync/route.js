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
exports.id = "app/api/agent/sync/route";
exports.ids = ["app/api/agent/sync/route"];
exports.modules = {

/***/ "(rsc)/./app/api/agent/sync/route.ts":
/*!*************************************!*\
  !*** ./app/api/agent/sync/route.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST),\n/* harmony export */   maxDuration: () => (/* binding */ maxDuration)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var _supabase_ssr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @supabase/ssr */ \"(rsc)/./node_modules/@supabase/ssr/dist/module/index.js\");\n/* harmony import */ var next_headers__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/headers */ \"(rsc)/./node_modules/next/dist/api/headers.js\");\n/* harmony import */ var _lib_agent_sync__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/agent/sync */ \"(rsc)/./lib/agent/sync.ts\");\n\n\n\n\nconst maxDuration = 300;\nasync function POST(req) {\n    console.log(\"[Sync] ▶ POST /api/agent/sync — request received\");\n    const startMs = Date.now();\n    let productId;\n    try {\n        const body = await req.json();\n        productId = body?.productId ?? undefined;\n    } catch  {\n    // no body is fine — will sync all products\n    }\n    // Build an authenticated server client so RLS filters by the current user\n    const cookieStore = await (0,next_headers__WEBPACK_IMPORTED_MODULE_2__.cookies)();\n    const supabase = (0,_supabase_ssr__WEBPACK_IMPORTED_MODULE_1__.createServerClient)(\"https://ypmmathpjmkqrrnuamzo.supabase.co\", \"sb_publishable_GvJYIuZ1bTxJmc120Sx0Yw__dy6lGt1\", {\n        cookies: {\n            getAll: ()=>cookieStore.getAll(),\n            setAll: (cookiesToSet)=>{\n                try {\n                    cookiesToSet.forEach(({ name, value, options })=>cookieStore.set(name, value, options));\n                } catch  {}\n            }\n        }\n    });\n    const { data: { user } } = await supabase.auth.getUser();\n    if (!user) {\n        console.warn(\"[Sync] ✗ Unauthorized — no active session\");\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Unauthorized\"\n        }, {\n            status: 401\n        });\n    }\n    console.log(`[Sync]   Authenticated as ${user.email}`);\n    try {\n        if (productId) {\n            console.log(`[Sync]   Scoped to product: ${productId}`);\n        }\n        const result = await (0,_lib_agent_sync__WEBPACK_IMPORTED_MODULE_3__.runGlobalSync)(supabase, productId);\n        const elapsed = ((Date.now() - startMs) / 1000).toFixed(1);\n        console.log(`[Sync] ✓ Complete in ${elapsed}s — ${result.totalSaved} saved across ${result.productsProcessed} product(s)`);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json(result);\n    } catch (err) {\n        const message = err instanceof Error ? err.message : \"Sync failed\";\n        console.error(\"[Sync] ✗ Fatal error:\", message);\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: message\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9hcHAvYXBpL2FnZW50L3N5bmMvcm91dGUudHMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTJDO0FBQ1E7QUFDWjtBQUNVO0FBRTFDLE1BQU1JLGNBQWMsSUFBSTtBQUV4QixlQUFlQyxLQUFLQyxHQUFZO0lBQ3JDQyxRQUFRQyxHQUFHLENBQUM7SUFDWixNQUFNQyxVQUFVQyxLQUFLQyxHQUFHO0lBRXhCLElBQUlDO0lBQ0osSUFBSTtRQUNGLE1BQU1DLE9BQU8sTUFBTVAsSUFBSVEsSUFBSTtRQUMzQkYsWUFBWUMsTUFBTUQsYUFBYUc7SUFDakMsRUFBRSxPQUFNO0lBQ04sMkNBQTJDO0lBQzdDO0lBRUEsMEVBQTBFO0lBQzFFLE1BQU1DLGNBQWMsTUFBTWQscURBQU9BO0lBQ2pDLE1BQU1lLFdBQVdoQixpRUFBa0JBLENBQ2pDaUIsMENBQW9DLEVBQ3BDQSxnREFBeUMsRUFDekM7UUFDRWhCLFNBQVM7WUFDUG9CLFFBQVEsSUFBTU4sWUFBWU0sTUFBTTtZQUNoQ0MsUUFBUSxDQUFDQztnQkFDUCxJQUFJO29CQUNGQSxhQUFhQyxPQUFPLENBQUMsQ0FBQyxFQUFFQyxJQUFJLEVBQUVDLEtBQUssRUFBRUMsT0FBTyxFQUFFLEdBQzVDWixZQUFZYSxHQUFHLENBQUNILE1BQU1DLE9BQU9DO2dCQUVqQyxFQUFFLE9BQU0sQ0FBQztZQUNYO1FBQ0Y7SUFDRjtJQUdGLE1BQU0sRUFBRUUsTUFBTSxFQUFFQyxJQUFJLEVBQUUsRUFBRSxHQUFHLE1BQU1kLFNBQVNlLElBQUksQ0FBQ0MsT0FBTztJQUN0RCxJQUFJLENBQUNGLE1BQU07UUFDVHhCLFFBQVEyQixJQUFJLENBQUM7UUFDYixPQUFPbEMscURBQVlBLENBQUNjLElBQUksQ0FBQztZQUFFcUIsT0FBTztRQUFlLEdBQUc7WUFBRUMsUUFBUTtRQUFJO0lBQ3BFO0lBRUE3QixRQUFRQyxHQUFHLENBQUMsQ0FBQywwQkFBMEIsRUFBRXVCLEtBQUtNLEtBQUssRUFBRTtJQUVyRCxJQUFJO1FBQ0YsSUFBSXpCLFdBQVc7WUFDYkwsUUFBUUMsR0FBRyxDQUFDLENBQUMsNEJBQTRCLEVBQUVJLFdBQVc7UUFDeEQ7UUFDQSxNQUFNMEIsU0FBUyxNQUFNbkMsOERBQWFBLENBQUNjLFVBQVVMO1FBQzdDLE1BQU0yQixVQUFVLENBQUMsQ0FBQzdCLEtBQUtDLEdBQUcsS0FBS0YsT0FBTSxJQUFLLElBQUcsRUFBRytCLE9BQU8sQ0FBQztRQUN4RGpDLFFBQVFDLEdBQUcsQ0FDVCxDQUFDLHFCQUFxQixFQUFFK0IsUUFBUSxJQUFJLEVBQUVELE9BQU9HLFVBQVUsQ0FBQyxjQUFjLEVBQUVILE9BQU9JLGlCQUFpQixDQUFDLFdBQVcsQ0FBQztRQUUvRyxPQUFPMUMscURBQVlBLENBQUNjLElBQUksQ0FBQ3dCO0lBQzNCLEVBQUUsT0FBT0ssS0FBSztRQUNaLE1BQU1DLFVBQVVELGVBQWVFLFFBQVFGLElBQUlDLE9BQU8sR0FBRztRQUNyRHJDLFFBQVE0QixLQUFLLENBQUMseUJBQXlCUztRQUN2QyxPQUFPNUMscURBQVlBLENBQUNjLElBQUksQ0FBQztZQUFFcUIsT0FBT1M7UUFBUSxHQUFHO1lBQUVSLFFBQVE7UUFBSTtJQUM3RDtBQUNGIiwic291cmNlcyI6WyJDOlxcc3JjXFxwcm9qZWN0c1xcaW5zaWdodC1zeW5jLWFpXFxhcHBcXGFwaVxcYWdlbnRcXHN5bmNcXHJvdXRlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiO1xuaW1wb3J0IHsgY3JlYXRlU2VydmVyQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zc3JcIjtcbmltcG9ydCB7IGNvb2tpZXMgfSBmcm9tIFwibmV4dC9oZWFkZXJzXCI7XG5pbXBvcnQgeyBydW5HbG9iYWxTeW5jIH0gZnJvbSBcIkAvbGliL2FnZW50L3N5bmNcIjtcblxuZXhwb3J0IGNvbnN0IG1heER1cmF0aW9uID0gMzAwO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXE6IFJlcXVlc3QpIHtcbiAgY29uc29sZS5sb2coXCJbU3luY10g4pa2IFBPU1QgL2FwaS9hZ2VudC9zeW5jIOKAlCByZXF1ZXN0IHJlY2VpdmVkXCIpO1xuICBjb25zdCBzdGFydE1zID0gRGF0ZS5ub3coKTtcblxuICBsZXQgcHJvZHVjdElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgYm9keSA9IGF3YWl0IHJlcS5qc29uKCk7XG4gICAgcHJvZHVjdElkID0gYm9keT8ucHJvZHVjdElkID8/IHVuZGVmaW5lZDtcbiAgfSBjYXRjaCB7XG4gICAgLy8gbm8gYm9keSBpcyBmaW5lIOKAlCB3aWxsIHN5bmMgYWxsIHByb2R1Y3RzXG4gIH1cblxuICAvLyBCdWlsZCBhbiBhdXRoZW50aWNhdGVkIHNlcnZlciBjbGllbnQgc28gUkxTIGZpbHRlcnMgYnkgdGhlIGN1cnJlbnQgdXNlclxuICBjb25zdCBjb29raWVTdG9yZSA9IGF3YWl0IGNvb2tpZXMoKTtcbiAgY29uc3Qgc3VwYWJhc2UgPSBjcmVhdGVTZXJ2ZXJDbGllbnQoXG4gICAgcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMISxcbiAgICBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19TVVBBQkFTRV9BTk9OX0tFWSEsXG4gICAge1xuICAgICAgY29va2llczoge1xuICAgICAgICBnZXRBbGw6ICgpID0+IGNvb2tpZVN0b3JlLmdldEFsbCgpLFxuICAgICAgICBzZXRBbGw6IChjb29raWVzVG9TZXQpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29va2llc1RvU2V0LmZvckVhY2goKHsgbmFtZSwgdmFsdWUsIG9wdGlvbnMgfSkgPT5cbiAgICAgICAgICAgICAgY29va2llU3RvcmUuc2V0KG5hbWUsIHZhbHVlLCBvcHRpb25zKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGNhdGNoIHt9XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH1cbiAgKTtcblxuICBjb25zdCB7IGRhdGE6IHsgdXNlciB9IH0gPSBhd2FpdCBzdXBhYmFzZS5hdXRoLmdldFVzZXIoKTtcbiAgaWYgKCF1c2VyKSB7XG4gICAgY29uc29sZS53YXJuKFwiW1N5bmNdIOKclyBVbmF1dGhvcml6ZWQg4oCUIG5vIGFjdGl2ZSBzZXNzaW9uXCIpO1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlVuYXV0aG9yaXplZFwiIH0sIHsgc3RhdHVzOiA0MDEgfSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhgW1N5bmNdICAgQXV0aGVudGljYXRlZCBhcyAke3VzZXIuZW1haWx9YCk7XG5cbiAgdHJ5IHtcbiAgICBpZiAocHJvZHVjdElkKSB7XG4gICAgICBjb25zb2xlLmxvZyhgW1N5bmNdICAgU2NvcGVkIHRvIHByb2R1Y3Q6ICR7cHJvZHVjdElkfWApO1xuICAgIH1cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBydW5HbG9iYWxTeW5jKHN1cGFiYXNlLCBwcm9kdWN0SWQpO1xuICAgIGNvbnN0IGVsYXBzZWQgPSAoKERhdGUubm93KCkgLSBzdGFydE1zKSAvIDEwMDApLnRvRml4ZWQoMSk7XG4gICAgY29uc29sZS5sb2coXG4gICAgICBgW1N5bmNdIOKckyBDb21wbGV0ZSBpbiAke2VsYXBzZWR9cyDigJQgJHtyZXN1bHQudG90YWxTYXZlZH0gc2F2ZWQgYWNyb3NzICR7cmVzdWx0LnByb2R1Y3RzUHJvY2Vzc2VkfSBwcm9kdWN0KHMpYFxuICAgICk7XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHJlc3VsdCk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBlcnIgaW5zdGFuY2VvZiBFcnJvciA/IGVyci5tZXNzYWdlIDogXCJTeW5jIGZhaWxlZFwiO1xuICAgIGNvbnNvbGUuZXJyb3IoXCJbU3luY10g4pyXIEZhdGFsIGVycm9yOlwiLCBtZXNzYWdlKTtcbiAgICByZXR1cm4gTmV4dFJlc3BvbnNlLmpzb24oeyBlcnJvcjogbWVzc2FnZSB9LCB7IHN0YXR1czogNTAwIH0pO1xuICB9XG59XG4iXSwibmFtZXMiOlsiTmV4dFJlc3BvbnNlIiwiY3JlYXRlU2VydmVyQ2xpZW50IiwiY29va2llcyIsInJ1bkdsb2JhbFN5bmMiLCJtYXhEdXJhdGlvbiIsIlBPU1QiLCJyZXEiLCJjb25zb2xlIiwibG9nIiwic3RhcnRNcyIsIkRhdGUiLCJub3ciLCJwcm9kdWN0SWQiLCJib2R5IiwianNvbiIsInVuZGVmaW5lZCIsImNvb2tpZVN0b3JlIiwic3VwYWJhc2UiLCJwcm9jZXNzIiwiZW52IiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfVVJMIiwiTkVYVF9QVUJMSUNfU1VQQUJBU0VfQU5PTl9LRVkiLCJnZXRBbGwiLCJzZXRBbGwiLCJjb29raWVzVG9TZXQiLCJmb3JFYWNoIiwibmFtZSIsInZhbHVlIiwib3B0aW9ucyIsInNldCIsImRhdGEiLCJ1c2VyIiwiYXV0aCIsImdldFVzZXIiLCJ3YXJuIiwiZXJyb3IiLCJzdGF0dXMiLCJlbWFpbCIsInJlc3VsdCIsImVsYXBzZWQiLCJ0b0ZpeGVkIiwidG90YWxTYXZlZCIsInByb2R1Y3RzUHJvY2Vzc2VkIiwiZXJyIiwibWVzc2FnZSIsIkVycm9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./app/api/agent/sync/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/filter.ts":
/*!*****************************!*\
  !*** ./lib/agent/filter.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   filterWithAI: () => (/* binding */ filterWithAI)\n/* harmony export */ });\n/* harmony import */ var _anthropic_ai_sdk__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @anthropic-ai/sdk */ \"(rsc)/./node_modules/@anthropic-ai/sdk/index.mjs\");\n\nconst client = new _anthropic_ai_sdk__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\nconst BATCH_SIZE = 20;\nasync function filterBatch(product, batch) {\n    const productContext = product.description ? `\"${product.name}\" — ${product.description}` : `\"${product.name}\"`;\n    const prompt = `You are a strict quality filter for user feedback data.\n\nProduct: ${productContext}\n\nMark an item RELEVANT only if ALL four conditions are met:\n1. It contains direct, first-hand user experience with \"${product.name}\" — a real review, complaint, praise, bug report, or feature request\n2. The content is about the correct product — reject anything about a different product that happens to share the name\n3. It is NOT marketing copy, a press release, official documentation, sponsored content, or promotional material\n4. The product is the PRIMARY subject — passing mentions in articles about something else do not qualify\n\nFor each relevant item provide:\n- sentiment: Positive | Negative | Neutral | Mixed\n- title: concise summary of the feedback (max 80 chars)\n\nReturn ONLY a valid JSON array, no other text:\n[{ \"index\": 0, \"relevant\": true, \"sentiment\": \"...\", \"title\": \"...\" }, { \"index\": 1, \"relevant\": false }, ...]\n\nItems to evaluate:\n${batch.map((r, i)=>`[${i}] SOURCE: ${r.source}\nTITLE: ${r.title}\nTEXT: ${r.text.slice(0, 400).replace(/\\n+/g, \" \")}\n---`).join(\"\\n\")}`;\n    const message = await client.messages.create({\n        model: \"claude-sonnet-4-6\",\n        max_tokens: 1024,\n        messages: [\n            {\n                role: \"user\",\n                content: prompt\n            }\n        ]\n    });\n    const raw = message.content[0].type === \"text\" ? message.content[0].text : \"[]\";\n    const jsonMatch = raw.match(/\\[[\\s\\S]*\\]/);\n    const decisions = JSON.parse(jsonMatch ? jsonMatch[0] : \"[]\");\n    return decisions.filter((d)=>d.relevant && d.sentiment && d.title).map((d)=>({\n            ...batch[d.index],\n            sentiment: d.sentiment,\n            cleanTitle: d.title\n        }));\n}\nasync function filterWithAI(product, results) {\n    if (!results.length) return [];\n    const filtered = [];\n    for(let i = 0; i < results.length; i += BATCH_SIZE){\n        const batch = results.slice(i, i + BATCH_SIZE);\n        const batchFiltered = await filterBatch(product, batch);\n        filtered.push(...batchFiltered);\n    }\n    return filtered;\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWdlbnQvZmlsdGVyLnRzIiwibWFwcGluZ3MiOiI7Ozs7O0FBQTBDO0FBRzFDLE1BQU1DLFNBQVMsSUFBSUQseURBQVNBO0FBQzVCLE1BQU1FLGFBQWE7QUFTbkIsZUFBZUMsWUFDYkMsT0FBc0QsRUFDdERDLEtBQWtCO0lBRWxCLE1BQU1DLGlCQUFpQkYsUUFBUUcsV0FBVyxHQUN0QyxDQUFDLENBQUMsRUFBRUgsUUFBUUksSUFBSSxDQUFDLElBQUksRUFBRUosUUFBUUcsV0FBVyxFQUFFLEdBQzVDLENBQUMsQ0FBQyxFQUFFSCxRQUFRSSxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRXZCLE1BQU1DLFNBQVMsQ0FBQzs7U0FFVCxFQUFFSCxlQUFlOzs7d0RBRzhCLEVBQUVGLFFBQVFJLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7OztBQWF2RSxFQUFFSCxNQUNDSyxHQUFHLENBQ0YsQ0FBQ0MsR0FBR0MsSUFBTSxDQUFDLENBQUMsRUFBRUEsRUFBRSxVQUFVLEVBQUVELEVBQUVFLE1BQU0sQ0FBQztPQUNsQyxFQUFFRixFQUFFRyxLQUFLLENBQUM7TUFDWCxFQUFFSCxFQUFFSSxJQUFJLENBQUNDLEtBQUssQ0FBQyxHQUFHLEtBQUtDLE9BQU8sQ0FBQyxRQUFRLEtBQUs7R0FDL0MsQ0FBQyxFQUVEQyxJQUFJLENBQUMsT0FBTztJQUViLE1BQU1DLFVBQVUsTUFBTWxCLE9BQU9tQixRQUFRLENBQUNDLE1BQU0sQ0FBQztRQUMzQ0MsT0FBTztRQUNQQyxZQUFZO1FBQ1pILFVBQVU7WUFBQztnQkFBRUksTUFBTTtnQkFBUUMsU0FBU2hCO1lBQU87U0FBRTtJQUMvQztJQUVBLE1BQU1pQixNQUFNUCxRQUFRTSxPQUFPLENBQUMsRUFBRSxDQUFDRSxJQUFJLEtBQUssU0FBU1IsUUFBUU0sT0FBTyxDQUFDLEVBQUUsQ0FBQ1YsSUFBSSxHQUFHO0lBQzNFLE1BQU1hLFlBQVlGLElBQUlHLEtBQUssQ0FBQztJQUM1QixNQUFNQyxZQUEwQkMsS0FBS0MsS0FBSyxDQUFDSixZQUFZQSxTQUFTLENBQUMsRUFBRSxHQUFHO0lBRXRFLE9BQU9FLFVBQ0pHLE1BQU0sQ0FBQyxDQUFDQyxJQUFNQSxFQUFFQyxRQUFRLElBQUlELEVBQUVFLFNBQVMsSUFBSUYsRUFBRXBCLEtBQUssRUFDbERKLEdBQUcsQ0FBQyxDQUFDd0IsSUFBTztZQUNYLEdBQUc3QixLQUFLLENBQUM2QixFQUFFRyxLQUFLLENBQUM7WUFDakJELFdBQVdGLEVBQUVFLFNBQVM7WUFDdEJFLFlBQVlKLEVBQUVwQixLQUFLO1FBQ3JCO0FBQ0o7QUFFTyxlQUFleUIsYUFDcEJuQyxPQUFzRCxFQUN0RG9DLE9BQW9CO0lBRXBCLElBQUksQ0FBQ0EsUUFBUUMsTUFBTSxFQUFFLE9BQU8sRUFBRTtJQUU5QixNQUFNQyxXQUE2QixFQUFFO0lBQ3JDLElBQUssSUFBSTlCLElBQUksR0FBR0EsSUFBSTRCLFFBQVFDLE1BQU0sRUFBRTdCLEtBQUtWLFdBQVk7UUFDbkQsTUFBTUcsUUFBUW1DLFFBQVF4QixLQUFLLENBQUNKLEdBQUdBLElBQUlWO1FBQ25DLE1BQU15QyxnQkFBZ0IsTUFBTXhDLFlBQVlDLFNBQVNDO1FBQ2pEcUMsU0FBU0UsSUFBSSxJQUFJRDtJQUNuQjtJQUNBLE9BQU9EO0FBQ1QiLCJzb3VyY2VzIjpbIkM6XFxzcmNcXHByb2plY3RzXFxpbnNpZ2h0LXN5bmMtYWlcXGxpYlxcYWdlbnRcXGZpbHRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQW50aHJvcGljIGZyb20gXCJAYW50aHJvcGljLWFpL3Nka1wiO1xuaW1wb3J0IHR5cGUgeyBSYXdSZXN1bHQsIEZpbHRlcmVkUmVzdWx0LCBTZW50aW1lbnQgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5jb25zdCBjbGllbnQgPSBuZXcgQW50aHJvcGljKCk7XG5jb25zdCBCQVRDSF9TSVpFID0gMjA7XG5cbmludGVyZmFjZSBBSURlY2lzaW9uIHtcbiAgaW5kZXg6IG51bWJlcjtcbiAgcmVsZXZhbnQ6IGJvb2xlYW47XG4gIHNlbnRpbWVudD86IFNlbnRpbWVudDtcbiAgdGl0bGU/OiBzdHJpbmc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGZpbHRlckJhdGNoKFxuICBwcm9kdWN0OiB7IG5hbWU6IHN0cmluZzsgZGVzY3JpcHRpb24/OiBzdHJpbmcgfCBudWxsIH0sXG4gIGJhdGNoOiBSYXdSZXN1bHRbXVxuKTogUHJvbWlzZTxGaWx0ZXJlZFJlc3VsdFtdPiB7XG4gIGNvbnN0IHByb2R1Y3RDb250ZXh0ID0gcHJvZHVjdC5kZXNjcmlwdGlvblxuICAgID8gYFwiJHtwcm9kdWN0Lm5hbWV9XCIg4oCUICR7cHJvZHVjdC5kZXNjcmlwdGlvbn1gXG4gICAgOiBgXCIke3Byb2R1Y3QubmFtZX1cImA7XG5cbiAgY29uc3QgcHJvbXB0ID0gYFlvdSBhcmUgYSBzdHJpY3QgcXVhbGl0eSBmaWx0ZXIgZm9yIHVzZXIgZmVlZGJhY2sgZGF0YS5cblxuUHJvZHVjdDogJHtwcm9kdWN0Q29udGV4dH1cblxuTWFyayBhbiBpdGVtIFJFTEVWQU5UIG9ubHkgaWYgQUxMIGZvdXIgY29uZGl0aW9ucyBhcmUgbWV0OlxuMS4gSXQgY29udGFpbnMgZGlyZWN0LCBmaXJzdC1oYW5kIHVzZXIgZXhwZXJpZW5jZSB3aXRoIFwiJHtwcm9kdWN0Lm5hbWV9XCIg4oCUIGEgcmVhbCByZXZpZXcsIGNvbXBsYWludCwgcHJhaXNlLCBidWcgcmVwb3J0LCBvciBmZWF0dXJlIHJlcXVlc3RcbjIuIFRoZSBjb250ZW50IGlzIGFib3V0IHRoZSBjb3JyZWN0IHByb2R1Y3Qg4oCUIHJlamVjdCBhbnl0aGluZyBhYm91dCBhIGRpZmZlcmVudCBwcm9kdWN0IHRoYXQgaGFwcGVucyB0byBzaGFyZSB0aGUgbmFtZVxuMy4gSXQgaXMgTk9UIG1hcmtldGluZyBjb3B5LCBhIHByZXNzIHJlbGVhc2UsIG9mZmljaWFsIGRvY3VtZW50YXRpb24sIHNwb25zb3JlZCBjb250ZW50LCBvciBwcm9tb3Rpb25hbCBtYXRlcmlhbFxuNC4gVGhlIHByb2R1Y3QgaXMgdGhlIFBSSU1BUlkgc3ViamVjdCDigJQgcGFzc2luZyBtZW50aW9ucyBpbiBhcnRpY2xlcyBhYm91dCBzb21ldGhpbmcgZWxzZSBkbyBub3QgcXVhbGlmeVxuXG5Gb3IgZWFjaCByZWxldmFudCBpdGVtIHByb3ZpZGU6XG4tIHNlbnRpbWVudDogUG9zaXRpdmUgfCBOZWdhdGl2ZSB8IE5ldXRyYWwgfCBNaXhlZFxuLSB0aXRsZTogY29uY2lzZSBzdW1tYXJ5IG9mIHRoZSBmZWVkYmFjayAobWF4IDgwIGNoYXJzKVxuXG5SZXR1cm4gT05MWSBhIHZhbGlkIEpTT04gYXJyYXksIG5vIG90aGVyIHRleHQ6XG5beyBcImluZGV4XCI6IDAsIFwicmVsZXZhbnRcIjogdHJ1ZSwgXCJzZW50aW1lbnRcIjogXCIuLi5cIiwgXCJ0aXRsZVwiOiBcIi4uLlwiIH0sIHsgXCJpbmRleFwiOiAxLCBcInJlbGV2YW50XCI6IGZhbHNlIH0sIC4uLl1cblxuSXRlbXMgdG8gZXZhbHVhdGU6XG4ke2JhdGNoXG4gIC5tYXAoXG4gICAgKHIsIGkpID0+IGBbJHtpfV0gU09VUkNFOiAke3Iuc291cmNlfVxuVElUTEU6ICR7ci50aXRsZX1cblRFWFQ6ICR7ci50ZXh0LnNsaWNlKDAsIDQwMCkucmVwbGFjZSgvXFxuKy9nLCBcIiBcIil9XG4tLS1gXG4gIClcbiAgLmpvaW4oXCJcXG5cIil9YDtcblxuICBjb25zdCBtZXNzYWdlID0gYXdhaXQgY2xpZW50Lm1lc3NhZ2VzLmNyZWF0ZSh7XG4gICAgbW9kZWw6IFwiY2xhdWRlLXNvbm5ldC00LTZcIixcbiAgICBtYXhfdG9rZW5zOiAxMDI0LFxuICAgIG1lc3NhZ2VzOiBbeyByb2xlOiBcInVzZXJcIiwgY29udGVudDogcHJvbXB0IH1dLFxuICB9KTtcblxuICBjb25zdCByYXcgPSBtZXNzYWdlLmNvbnRlbnRbMF0udHlwZSA9PT0gXCJ0ZXh0XCIgPyBtZXNzYWdlLmNvbnRlbnRbMF0udGV4dCA6IFwiW11cIjtcbiAgY29uc3QganNvbk1hdGNoID0gcmF3Lm1hdGNoKC9cXFtbXFxzXFxTXSpcXF0vKTtcbiAgY29uc3QgZGVjaXNpb25zOiBBSURlY2lzaW9uW10gPSBKU09OLnBhcnNlKGpzb25NYXRjaCA/IGpzb25NYXRjaFswXSA6IFwiW11cIik7XG5cbiAgcmV0dXJuIGRlY2lzaW9uc1xuICAgIC5maWx0ZXIoKGQpID0+IGQucmVsZXZhbnQgJiYgZC5zZW50aW1lbnQgJiYgZC50aXRsZSlcbiAgICAubWFwKChkKSA9PiAoe1xuICAgICAgLi4uYmF0Y2hbZC5pbmRleF0sXG4gICAgICBzZW50aW1lbnQ6IGQuc2VudGltZW50IGFzIFNlbnRpbWVudCxcbiAgICAgIGNsZWFuVGl0bGU6IGQudGl0bGUhLFxuICAgIH0pKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZpbHRlcldpdGhBSShcbiAgcHJvZHVjdDogeyBuYW1lOiBzdHJpbmc7IGRlc2NyaXB0aW9uPzogc3RyaW5nIHwgbnVsbCB9LFxuICByZXN1bHRzOiBSYXdSZXN1bHRbXVxuKTogUHJvbWlzZTxGaWx0ZXJlZFJlc3VsdFtdPiB7XG4gIGlmICghcmVzdWx0cy5sZW5ndGgpIHJldHVybiBbXTtcblxuICBjb25zdCBmaWx0ZXJlZDogRmlsdGVyZWRSZXN1bHRbXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHJlc3VsdHMubGVuZ3RoOyBpICs9IEJBVENIX1NJWkUpIHtcbiAgICBjb25zdCBiYXRjaCA9IHJlc3VsdHMuc2xpY2UoaSwgaSArIEJBVENIX1NJWkUpO1xuICAgIGNvbnN0IGJhdGNoRmlsdGVyZWQgPSBhd2FpdCBmaWx0ZXJCYXRjaChwcm9kdWN0LCBiYXRjaCk7XG4gICAgZmlsdGVyZWQucHVzaCguLi5iYXRjaEZpbHRlcmVkKTtcbiAgfVxuICByZXR1cm4gZmlsdGVyZWQ7XG59XG4iXSwibmFtZXMiOlsiQW50aHJvcGljIiwiY2xpZW50IiwiQkFUQ0hfU0laRSIsImZpbHRlckJhdGNoIiwicHJvZHVjdCIsImJhdGNoIiwicHJvZHVjdENvbnRleHQiLCJkZXNjcmlwdGlvbiIsIm5hbWUiLCJwcm9tcHQiLCJtYXAiLCJyIiwiaSIsInNvdXJjZSIsInRpdGxlIiwidGV4dCIsInNsaWNlIiwicmVwbGFjZSIsImpvaW4iLCJtZXNzYWdlIiwibWVzc2FnZXMiLCJjcmVhdGUiLCJtb2RlbCIsIm1heF90b2tlbnMiLCJyb2xlIiwiY29udGVudCIsInJhdyIsInR5cGUiLCJqc29uTWF0Y2giLCJtYXRjaCIsImRlY2lzaW9ucyIsIkpTT04iLCJwYXJzZSIsImZpbHRlciIsImQiLCJyZWxldmFudCIsInNlbnRpbWVudCIsImluZGV4IiwiY2xlYW5UaXRsZSIsImZpbHRlcldpdGhBSSIsInJlc3VsdHMiLCJsZW5ndGgiLCJmaWx0ZXJlZCIsImJhdGNoRmlsdGVyZWQiLCJwdXNoIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/filter.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/sources/appstore.ts":
/*!***************************************!*\
  !*** ./lib/agent/sources/appstore.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   searchAppStore: () => (/* binding */ searchAppStore)\n/* harmony export */ });\nlet _store = null;\nfunction getStore() {\n    if (!_store) {\n        // eslint-disable-next-line @typescript-eslint/no-require-imports\n        _store = __webpack_require__(/*! app-store-scraper */ \"(rsc)/./node_modules/app-store-scraper/index.js\");\n    }\n    return _store;\n}\nasync function searchAppStore(productName) {\n    try {\n        const store = getStore();\n        const apps = await store.search({\n            term: productName,\n            limit: 3,\n            country: \"us\"\n        });\n        if (!apps.length) return [];\n        const results = [];\n        for (const app of apps.slice(0, 2)){\n            const reviews = await store.reviews({\n                id: app.id,\n                sort: store.sort.RECENT,\n                page: 1,\n                country: \"us\"\n            });\n            for (const r of reviews){\n                const dateStr = r.updated instanceof Date ? r.updated.toISOString().split(\"T\")[0] : new Date(r.updated).toISOString().split(\"T\")[0];\n                results.push({\n                    source: \"App Store\",\n                    title: r.title || `${r.score}-star review`,\n                    text: r.text,\n                    url: `https://apps.apple.com/app/id${app.id}`,\n                    date: dateStr,\n                    rating: r.score,\n                    author: r.userName\n                });\n            }\n        }\n        return results;\n    } catch  {\n        return [];\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWdlbnQvc291cmNlcy9hcHBzdG9yZS50cyIsIm1hcHBpbmdzIjoiOzs7O0FBWUEsSUFBSUEsU0FBZ0M7QUFDcEMsU0FBU0M7SUFDUCxJQUFJLENBQUNELFFBQVE7UUFDWCxpRUFBaUU7UUFDakVBLFNBQVNFLG1CQUFPQSxDQUFDLDBFQUFtQjtJQUN0QztJQUNBLE9BQU9GO0FBQ1Q7QUFFTyxlQUFlRyxlQUFlQyxXQUFtQjtJQUN0RCxJQUFJO1FBQ0YsTUFBTUMsUUFBUUo7UUFDZCxNQUFNSyxPQUFPLE1BQU1ELE1BQU1FLE1BQU0sQ0FBQztZQUFFQyxNQUFNSjtZQUFhSyxPQUFPO1lBQUdDLFNBQVM7UUFBSztRQUM3RSxJQUFJLENBQUNKLEtBQUtLLE1BQU0sRUFBRSxPQUFPLEVBQUU7UUFFM0IsTUFBTUMsVUFBdUIsRUFBRTtRQUMvQixLQUFLLE1BQU1DLE9BQU9QLEtBQUtRLEtBQUssQ0FBQyxHQUFHLEdBQUk7WUFDbEMsTUFBTUMsVUFBVSxNQUFNVixNQUFNVSxPQUFPLENBQUM7Z0JBQ2xDQyxJQUFJSCxJQUFJRyxFQUFFO2dCQUNWQyxNQUFNWixNQUFNWSxJQUFJLENBQUNDLE1BQU07Z0JBQ3ZCQyxNQUFNO2dCQUNOVCxTQUFTO1lBQ1g7WUFDQSxLQUFLLE1BQU1VLEtBQUtMLFFBQVM7Z0JBQ3ZCLE1BQU1NLFVBQ0pELEVBQUVFLE9BQU8sWUFBWUMsT0FDakJILEVBQUVFLE9BQU8sQ0FBQ0UsV0FBVyxHQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsR0FDckMsSUFBSUYsS0FBS0gsRUFBRUUsT0FBTyxFQUFFRSxXQUFXLEdBQUdDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckRiLFFBQVFjLElBQUksQ0FBQztvQkFDWEMsUUFBUTtvQkFDUkMsT0FBT1IsRUFBRVEsS0FBSyxJQUFJLEdBQUdSLEVBQUVTLEtBQUssQ0FBQyxZQUFZLENBQUM7b0JBQzFDQyxNQUFNVixFQUFFVSxJQUFJO29CQUNaQyxLQUFLLENBQUMsNkJBQTZCLEVBQUVsQixJQUFJRyxFQUFFLEVBQUU7b0JBQzdDZ0IsTUFBTVg7b0JBQ05ZLFFBQVFiLEVBQUVTLEtBQUs7b0JBQ2ZLLFFBQVFkLEVBQUVlLFFBQVE7Z0JBQ3BCO1lBQ0Y7UUFDRjtRQUNBLE9BQU92QjtJQUNULEVBQUUsT0FBTTtRQUNOLE9BQU8sRUFBRTtJQUNYO0FBQ0YiLCJzb3VyY2VzIjpbIkM6XFxzcmNcXHByb2plY3RzXFxpbnNpZ2h0LXN5bmMtYWlcXGxpYlxcYWdlbnRcXHNvdXJjZXNcXGFwcHN0b3JlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgUmF3UmVzdWx0IH0gZnJvbSBcIi4uL3R5cGVzXCI7XG5cbmludGVyZmFjZSBBcHBTdG9yZU1vZHVsZSB7XG4gIHNlYXJjaDogKG9wdHM6IHsgdGVybTogc3RyaW5nOyBsaW1pdDogbnVtYmVyOyBjb3VudHJ5OiBzdHJpbmcgfSkgPT4gUHJvbWlzZTxcbiAgICBBcnJheTx7IGlkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cbiAgPjtcbiAgcmV2aWV3czogKG9wdHM6IHsgaWQ6IHN0cmluZzsgc29ydDogbnVtYmVyOyBwYWdlOiBudW1iZXI7IGNvdW50cnk6IHN0cmluZyB9KSA9PiBQcm9taXNlPFxuICAgIEFycmF5PHsgdXNlck5hbWU6IHN0cmluZzsgc2NvcmU6IG51bWJlcjsgdGl0bGU6IHN0cmluZzsgdGV4dDogc3RyaW5nOyB1cGRhdGVkOiBzdHJpbmcgfCBEYXRlIH0+XG4gID47XG4gIHNvcnQ6IHsgUkVDRU5UOiBudW1iZXIgfTtcbn1cblxubGV0IF9zdG9yZTogQXBwU3RvcmVNb2R1bGUgfCBudWxsID0gbnVsbDtcbmZ1bmN0aW9uIGdldFN0b3JlKCk6IEFwcFN0b3JlTW9kdWxlIHtcbiAgaWYgKCFfc3RvcmUpIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXJlcXVpcmUtaW1wb3J0c1xuICAgIF9zdG9yZSA9IHJlcXVpcmUoXCJhcHAtc3RvcmUtc2NyYXBlclwiKSBhcyBBcHBTdG9yZU1vZHVsZTtcbiAgfVxuICByZXR1cm4gX3N0b3JlO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VhcmNoQXBwU3RvcmUocHJvZHVjdE5hbWU6IHN0cmluZyk6IFByb21pc2U8UmF3UmVzdWx0W10+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBzdG9yZSA9IGdldFN0b3JlKCk7XG4gICAgY29uc3QgYXBwcyA9IGF3YWl0IHN0b3JlLnNlYXJjaCh7IHRlcm06IHByb2R1Y3ROYW1lLCBsaW1pdDogMywgY291bnRyeTogXCJ1c1wiIH0pO1xuICAgIGlmICghYXBwcy5sZW5ndGgpIHJldHVybiBbXTtcblxuICAgIGNvbnN0IHJlc3VsdHM6IFJhd1Jlc3VsdFtdID0gW107XG4gICAgZm9yIChjb25zdCBhcHAgb2YgYXBwcy5zbGljZSgwLCAyKSkge1xuICAgICAgY29uc3QgcmV2aWV3cyA9IGF3YWl0IHN0b3JlLnJldmlld3Moe1xuICAgICAgICBpZDogYXBwLmlkLFxuICAgICAgICBzb3J0OiBzdG9yZS5zb3J0LlJFQ0VOVCxcbiAgICAgICAgcGFnZTogMSxcbiAgICAgICAgY291bnRyeTogXCJ1c1wiLFxuICAgICAgfSk7XG4gICAgICBmb3IgKGNvbnN0IHIgb2YgcmV2aWV3cykge1xuICAgICAgICBjb25zdCBkYXRlU3RyID1cbiAgICAgICAgICByLnVwZGF0ZWQgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAgICAgICA/IHIudXBkYXRlZC50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXVxuICAgICAgICAgICAgOiBuZXcgRGF0ZShyLnVwZGF0ZWQpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuICAgICAgICByZXN1bHRzLnB1c2goe1xuICAgICAgICAgIHNvdXJjZTogXCJBcHAgU3RvcmVcIixcbiAgICAgICAgICB0aXRsZTogci50aXRsZSB8fCBgJHtyLnNjb3JlfS1zdGFyIHJldmlld2AsXG4gICAgICAgICAgdGV4dDogci50ZXh0LFxuICAgICAgICAgIHVybDogYGh0dHBzOi8vYXBwcy5hcHBsZS5jb20vYXBwL2lkJHthcHAuaWR9YCxcbiAgICAgICAgICBkYXRlOiBkYXRlU3RyLFxuICAgICAgICAgIHJhdGluZzogci5zY29yZSxcbiAgICAgICAgICBhdXRob3I6IHIudXNlck5hbWUsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0cztcbiAgfSBjYXRjaCB7XG4gICAgcmV0dXJuIFtdO1xuICB9XG59XG4iXSwibmFtZXMiOlsiX3N0b3JlIiwiZ2V0U3RvcmUiLCJyZXF1aXJlIiwic2VhcmNoQXBwU3RvcmUiLCJwcm9kdWN0TmFtZSIsInN0b3JlIiwiYXBwcyIsInNlYXJjaCIsInRlcm0iLCJsaW1pdCIsImNvdW50cnkiLCJsZW5ndGgiLCJyZXN1bHRzIiwiYXBwIiwic2xpY2UiLCJyZXZpZXdzIiwiaWQiLCJzb3J0IiwiUkVDRU5UIiwicGFnZSIsInIiLCJkYXRlU3RyIiwidXBkYXRlZCIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwicHVzaCIsInNvdXJjZSIsInRpdGxlIiwic2NvcmUiLCJ0ZXh0IiwidXJsIiwiZGF0ZSIsInJhdGluZyIsImF1dGhvciIsInVzZXJOYW1lIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/sources/appstore.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/sources/googleplay.ts":
/*!*****************************************!*\
  !*** ./lib/agent/sources/googleplay.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   searchGooglePlay: () => (/* binding */ searchGooglePlay)\n/* harmony export */ });\nlet _gplay = null;\nfunction getGPlay() {\n    if (!_gplay) {\n        // eslint-disable-next-line @typescript-eslint/no-require-imports\n        _gplay = __webpack_require__(/*! google-play-scraper */ \"(rsc)/./node_modules/google-play-scraper/index.js\");\n    }\n    return _gplay;\n}\nasync function searchGooglePlay(productName) {\n    try {\n        const gplay = getGPlay();\n        const apps = await gplay.search({\n            term: productName,\n            num: 3,\n            lang: \"en\",\n            country: \"us\"\n        });\n        if (!apps.length) return [];\n        const results = [];\n        for (const app of apps.slice(0, 1)){\n            const { data: reviews } = await gplay.reviews({\n                appId: app.appId,\n                sort: gplay.sort.NEWEST,\n                num: 10,\n                lang: \"en\",\n                country: \"us\"\n            });\n            for (const r of reviews){\n                const dateStr = r.date instanceof Date ? r.date.toISOString().split(\"T\")[0] : new Date(r.date).toISOString().split(\"T\")[0];\n                results.push({\n                    source: \"Google Play\",\n                    title: r.title || `${r.score}-star review`,\n                    text: r.text,\n                    url: r.url || `https://play.google.com/store/apps/details?id=${app.appId}`,\n                    date: dateStr,\n                    rating: r.score,\n                    author: r.userName\n                });\n            }\n        }\n        return results;\n    } catch  {\n        return [];\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWdlbnQvc291cmNlcy9nb29nbGVwbGF5LnRzIiwibWFwcGluZ3MiOiI7Ozs7QUFvQkEsSUFBSUEsU0FBa0M7QUFDdEMsU0FBU0M7SUFDUCxJQUFJLENBQUNELFFBQVE7UUFDWCxpRUFBaUU7UUFDakVBLFNBQVNFLG1CQUFPQSxDQUFDLDhFQUFxQjtJQUN4QztJQUNBLE9BQU9GO0FBQ1Q7QUFFTyxlQUFlRyxpQkFBaUJDLFdBQW1CO0lBQ3hELElBQUk7UUFDRixNQUFNQyxRQUFRSjtRQUNkLE1BQU1LLE9BQU8sTUFBTUQsTUFBTUUsTUFBTSxDQUFDO1lBQUVDLE1BQU1KO1lBQWFLLEtBQUs7WUFBR0MsTUFBTTtZQUFNQyxTQUFTO1FBQUs7UUFDdkYsSUFBSSxDQUFDTCxLQUFLTSxNQUFNLEVBQUUsT0FBTyxFQUFFO1FBRTNCLE1BQU1DLFVBQXVCLEVBQUU7UUFDL0IsS0FBSyxNQUFNQyxPQUFPUixLQUFLUyxLQUFLLENBQUMsR0FBRyxHQUFJO1lBQ2xDLE1BQU0sRUFBRUMsTUFBTUMsT0FBTyxFQUFFLEdBQUcsTUFBTVosTUFBTVksT0FBTyxDQUFDO2dCQUM1Q0MsT0FBT0osSUFBSUksS0FBSztnQkFDaEJDLE1BQU1kLE1BQU1jLElBQUksQ0FBQ0MsTUFBTTtnQkFDdkJYLEtBQUs7Z0JBQ0xDLE1BQU07Z0JBQ05DLFNBQVM7WUFDWDtZQUNBLEtBQUssTUFBTVUsS0FBS0osUUFBUztnQkFDdkIsTUFBTUssVUFDSkQsRUFBRUUsSUFBSSxZQUFZQyxPQUNkSCxFQUFFRSxJQUFJLENBQUNFLFdBQVcsR0FBR0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQ2xDLElBQUlGLEtBQUtILEVBQUVFLElBQUksRUFBRUUsV0FBVyxHQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xEYixRQUFRYyxJQUFJLENBQUM7b0JBQ1hDLFFBQVE7b0JBQ1JDLE9BQU9SLEVBQUVRLEtBQUssSUFBSSxHQUFHUixFQUFFUyxLQUFLLENBQUMsWUFBWSxDQUFDO29CQUMxQ0MsTUFBTVYsRUFBRVUsSUFBSTtvQkFDWkMsS0FBS1gsRUFBRVcsR0FBRyxJQUFJLENBQUMsOENBQThDLEVBQUVsQixJQUFJSSxLQUFLLEVBQUU7b0JBQzFFSyxNQUFNRDtvQkFDTlcsUUFBUVosRUFBRVMsS0FBSztvQkFDZkksUUFBUWIsRUFBRWMsUUFBUTtnQkFDcEI7WUFDRjtRQUNGO1FBQ0EsT0FBT3RCO0lBQ1QsRUFBRSxPQUFNO1FBQ04sT0FBTyxFQUFFO0lBQ1g7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHNyY1xccHJvamVjdHNcXGluc2lnaHQtc3luYy1haVxcbGliXFxhZ2VudFxcc291cmNlc1xcZ29vZ2xlcGxheS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFJhd1Jlc3VsdCB9IGZyb20gXCIuLi90eXBlc1wiO1xuXG5pbnRlcmZhY2UgR29vZ2xlUGxheU1vZHVsZSB7XG4gIHNlYXJjaDogKG9wdHM6IHsgdGVybTogc3RyaW5nOyBudW06IG51bWJlcjsgbGFuZzogc3RyaW5nOyBjb3VudHJ5OiBzdHJpbmcgfSkgPT4gUHJvbWlzZTxcbiAgICBBcnJheTx7IGFwcElkOiBzdHJpbmc7IHRpdGxlOiBzdHJpbmcgfT5cbiAgPjtcbiAgcmV2aWV3czogKG9wdHM6IHsgYXBwSWQ6IHN0cmluZzsgc29ydDogbnVtYmVyOyBudW06IG51bWJlcjsgbGFuZzogc3RyaW5nOyBjb3VudHJ5OiBzdHJpbmcgfSkgPT4gUHJvbWlzZTx7XG4gICAgZGF0YTogQXJyYXk8e1xuICAgICAgdXNlck5hbWU6IHN0cmluZztcbiAgICAgIHNjb3JlOiBudW1iZXI7XG4gICAgICB0aXRsZTogc3RyaW5nIHwgbnVsbDtcbiAgICAgIHRleHQ6IHN0cmluZztcbiAgICAgIGRhdGU6IERhdGUgfCBzdHJpbmc7XG4gICAgICB2ZXJzaW9uOiBzdHJpbmc7XG4gICAgICB1cmw6IHN0cmluZztcbiAgICB9PjtcbiAgfT47XG4gIHNvcnQ6IHsgTkVXRVNUOiBudW1iZXIgfTtcbn1cblxubGV0IF9ncGxheTogR29vZ2xlUGxheU1vZHVsZSB8IG51bGwgPSBudWxsO1xuZnVuY3Rpb24gZ2V0R1BsYXkoKTogR29vZ2xlUGxheU1vZHVsZSB7XG4gIGlmICghX2dwbGF5KSB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1yZXF1aXJlLWltcG9ydHNcbiAgICBfZ3BsYXkgPSByZXF1aXJlKFwiZ29vZ2xlLXBsYXktc2NyYXBlclwiKSBhcyBHb29nbGVQbGF5TW9kdWxlO1xuICB9XG4gIHJldHVybiBfZ3BsYXk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hHb29nbGVQbGF5KHByb2R1Y3ROYW1lOiBzdHJpbmcpOiBQcm9taXNlPFJhd1Jlc3VsdFtdPiB7XG4gIHRyeSB7XG4gICAgY29uc3QgZ3BsYXkgPSBnZXRHUGxheSgpO1xuICAgIGNvbnN0IGFwcHMgPSBhd2FpdCBncGxheS5zZWFyY2goeyB0ZXJtOiBwcm9kdWN0TmFtZSwgbnVtOiAzLCBsYW5nOiBcImVuXCIsIGNvdW50cnk6IFwidXNcIiB9KTtcbiAgICBpZiAoIWFwcHMubGVuZ3RoKSByZXR1cm4gW107XG5cbiAgICBjb25zdCByZXN1bHRzOiBSYXdSZXN1bHRbXSA9IFtdO1xuICAgIGZvciAoY29uc3QgYXBwIG9mIGFwcHMuc2xpY2UoMCwgMSkpIHtcbiAgICAgIGNvbnN0IHsgZGF0YTogcmV2aWV3cyB9ID0gYXdhaXQgZ3BsYXkucmV2aWV3cyh7XG4gICAgICAgIGFwcElkOiBhcHAuYXBwSWQsXG4gICAgICAgIHNvcnQ6IGdwbGF5LnNvcnQuTkVXRVNULFxuICAgICAgICBudW06IDEwLFxuICAgICAgICBsYW5nOiBcImVuXCIsXG4gICAgICAgIGNvdW50cnk6IFwidXNcIixcbiAgICAgIH0pO1xuICAgICAgZm9yIChjb25zdCByIG9mIHJldmlld3MpIHtcbiAgICAgICAgY29uc3QgZGF0ZVN0ciA9XG4gICAgICAgICAgci5kYXRlIGluc3RhbmNlb2YgRGF0ZVxuICAgICAgICAgICAgPyByLmRhdGUudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF1cbiAgICAgICAgICAgIDogbmV3IERhdGUoci5kYXRlKS50b0lTT1N0cmluZygpLnNwbGl0KFwiVFwiKVswXTtcbiAgICAgICAgcmVzdWx0cy5wdXNoKHtcbiAgICAgICAgICBzb3VyY2U6IFwiR29vZ2xlIFBsYXlcIixcbiAgICAgICAgICB0aXRsZTogci50aXRsZSB8fCBgJHtyLnNjb3JlfS1zdGFyIHJldmlld2AsXG4gICAgICAgICAgdGV4dDogci50ZXh0LFxuICAgICAgICAgIHVybDogci51cmwgfHwgYGh0dHBzOi8vcGxheS5nb29nbGUuY29tL3N0b3JlL2FwcHMvZGV0YWlscz9pZD0ke2FwcC5hcHBJZH1gLFxuICAgICAgICAgIGRhdGU6IGRhdGVTdHIsXG4gICAgICAgICAgcmF0aW5nOiByLnNjb3JlLFxuICAgICAgICAgIGF1dGhvcjogci51c2VyTmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9IGNhdGNoIHtcbiAgICByZXR1cm4gW107XG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJfZ3BsYXkiLCJnZXRHUGxheSIsInJlcXVpcmUiLCJzZWFyY2hHb29nbGVQbGF5IiwicHJvZHVjdE5hbWUiLCJncGxheSIsImFwcHMiLCJzZWFyY2giLCJ0ZXJtIiwibnVtIiwibGFuZyIsImNvdW50cnkiLCJsZW5ndGgiLCJyZXN1bHRzIiwiYXBwIiwic2xpY2UiLCJkYXRhIiwicmV2aWV3cyIsImFwcElkIiwic29ydCIsIk5FV0VTVCIsInIiLCJkYXRlU3RyIiwiZGF0ZSIsIkRhdGUiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwicHVzaCIsInNvdXJjZSIsInRpdGxlIiwic2NvcmUiLCJ0ZXh0IiwidXJsIiwicmF0aW5nIiwiYXV0aG9yIiwidXNlck5hbWUiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/sources/googleplay.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/sources/reddit.ts":
/*!*************************************!*\
  !*** ./lib/agent/sources/reddit.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   searchReddit: () => (/* binding */ searchReddit)\n/* harmony export */ });\nconst USER_AGENT = \"InsightSyncAI/1.0 (feedback aggregator)\";\nconst SEARCH_LIMIT = 10;\nasync function searchReddit(productName) {\n    const query = encodeURIComponent(`\"${productName}\"`);\n    const url = `https://www.reddit.com/search.json?q=${query}&sort=new&limit=${SEARCH_LIMIT}&type=link&restrict_sr=false`;\n    const res = await fetch(url, {\n        headers: {\n            \"User-Agent\": USER_AGENT,\n            Accept: \"application/json\"\n        },\n        next: {\n            revalidate: 0\n        }\n    });\n    if (!res.ok) return [];\n    const json = await res.json();\n    const posts = json?.data?.children ?? [];\n    return posts.map((post)=>({\n            source: \"Reddit\",\n            title: post.data.title,\n            text: post.data.selftext || post.data.title,\n            url: `https://reddit.com${post.data.permalink}`,\n            date: new Date(post.data.created_utc * 1000).toISOString().split(\"T\")[0],\n            author: post.data.author\n        }));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWdlbnQvc291cmNlcy9yZWRkaXQudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU1BLGFBQWE7QUFDbkIsTUFBTUMsZUFBZTtBQW1CZCxlQUFlQyxhQUFhQyxXQUFtQjtJQUNwRCxNQUFNQyxRQUFRQyxtQkFBbUIsQ0FBQyxDQUFDLEVBQUVGLFlBQVksQ0FBQyxDQUFDO0lBQ25ELE1BQU1HLE1BQU0sQ0FBQyxxQ0FBcUMsRUFBRUYsTUFBTSxnQkFBZ0IsRUFBRUgsYUFBYSw0QkFBNEIsQ0FBQztJQUV0SCxNQUFNTSxNQUFNLE1BQU1DLE1BQU1GLEtBQUs7UUFDM0JHLFNBQVM7WUFDUCxjQUFjVDtZQUNkVSxRQUFRO1FBQ1Y7UUFDQUMsTUFBTTtZQUFFQyxZQUFZO1FBQUU7SUFDeEI7SUFFQSxJQUFJLENBQUNMLElBQUlNLEVBQUUsRUFBRSxPQUFPLEVBQUU7SUFFdEIsTUFBTUMsT0FBUSxNQUFNUCxJQUFJTyxJQUFJO0lBQzVCLE1BQU1DLFFBQVFELE1BQU1FLE1BQU1DLFlBQVksRUFBRTtJQUV4QyxPQUFPRixNQUFNRyxHQUFHLENBQUMsQ0FBQ0MsT0FBVTtZQUMxQkMsUUFBUTtZQUNSQyxPQUFPRixLQUFLSCxJQUFJLENBQUNLLEtBQUs7WUFDdEJDLE1BQU1ILEtBQUtILElBQUksQ0FBQ08sUUFBUSxJQUFJSixLQUFLSCxJQUFJLENBQUNLLEtBQUs7WUFDM0NmLEtBQUssQ0FBQyxrQkFBa0IsRUFBRWEsS0FBS0gsSUFBSSxDQUFDUSxTQUFTLEVBQUU7WUFDL0NDLE1BQU0sSUFBSUMsS0FBS1AsS0FBS0gsSUFBSSxDQUFDVyxXQUFXLEdBQUcsTUFBTUMsV0FBVyxHQUFHQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDeEVDLFFBQVFYLEtBQUtILElBQUksQ0FBQ2MsTUFBTTtRQUMxQjtBQUNGIiwic291cmNlcyI6WyJDOlxcc3JjXFxwcm9qZWN0c1xcaW5zaWdodC1zeW5jLWFpXFxsaWJcXGFnZW50XFxzb3VyY2VzXFxyZWRkaXQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBSYXdSZXN1bHQgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY29uc3QgVVNFUl9BR0VOVCA9IFwiSW5zaWdodFN5bmNBSS8xLjAgKGZlZWRiYWNrIGFnZ3JlZ2F0b3IpXCI7XG5jb25zdCBTRUFSQ0hfTElNSVQgPSAxMDtcblxuaW50ZXJmYWNlIFJlZGRpdFBvc3Qge1xuICBkYXRhOiB7XG4gICAgdGl0bGU6IHN0cmluZztcbiAgICBzZWxmdGV4dDogc3RyaW5nO1xuICAgIHBlcm1hbGluazogc3RyaW5nO1xuICAgIGNyZWF0ZWRfdXRjOiBudW1iZXI7XG4gICAgYXV0aG9yOiBzdHJpbmc7XG4gICAgc2NvcmU6IG51bWJlcjtcbiAgfTtcbn1cblxuaW50ZXJmYWNlIFJlZGRpdFNlYXJjaFJlc3BvbnNlIHtcbiAgZGF0YToge1xuICAgIGNoaWxkcmVuOiBSZWRkaXRQb3N0W107XG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hSZWRkaXQocHJvZHVjdE5hbWU6IHN0cmluZyk6IFByb21pc2U8UmF3UmVzdWx0W10+IHtcbiAgY29uc3QgcXVlcnkgPSBlbmNvZGVVUklDb21wb25lbnQoYFwiJHtwcm9kdWN0TmFtZX1cImApO1xuICBjb25zdCB1cmwgPSBgaHR0cHM6Ly93d3cucmVkZGl0LmNvbS9zZWFyY2guanNvbj9xPSR7cXVlcnl9JnNvcnQ9bmV3JmxpbWl0PSR7U0VBUkNIX0xJTUlUfSZ0eXBlPWxpbmsmcmVzdHJpY3Rfc3I9ZmFsc2VgO1xuXG4gIGNvbnN0IHJlcyA9IGF3YWl0IGZldGNoKHVybCwge1xuICAgIGhlYWRlcnM6IHtcbiAgICAgIFwiVXNlci1BZ2VudFwiOiBVU0VSX0FHRU5ULFxuICAgICAgQWNjZXB0OiBcImFwcGxpY2F0aW9uL2pzb25cIixcbiAgICB9LFxuICAgIG5leHQ6IHsgcmV2YWxpZGF0ZTogMCB9LFxuICB9KTtcblxuICBpZiAoIXJlcy5vaykgcmV0dXJuIFtdO1xuXG4gIGNvbnN0IGpzb24gPSAoYXdhaXQgcmVzLmpzb24oKSkgYXMgUmVkZGl0U2VhcmNoUmVzcG9uc2U7XG4gIGNvbnN0IHBvc3RzID0ganNvbj8uZGF0YT8uY2hpbGRyZW4gPz8gW107XG5cbiAgcmV0dXJuIHBvc3RzLm1hcCgocG9zdCkgPT4gKHtcbiAgICBzb3VyY2U6IFwiUmVkZGl0XCIgYXMgY29uc3QsXG4gICAgdGl0bGU6IHBvc3QuZGF0YS50aXRsZSxcbiAgICB0ZXh0OiBwb3N0LmRhdGEuc2VsZnRleHQgfHwgcG9zdC5kYXRhLnRpdGxlLFxuICAgIHVybDogYGh0dHBzOi8vcmVkZGl0LmNvbSR7cG9zdC5kYXRhLnBlcm1hbGlua31gLFxuICAgIGRhdGU6IG5ldyBEYXRlKHBvc3QuZGF0YS5jcmVhdGVkX3V0YyAqIDEwMDApLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdLFxuICAgIGF1dGhvcjogcG9zdC5kYXRhLmF1dGhvcixcbiAgfSkpO1xufVxuIl0sIm5hbWVzIjpbIlVTRVJfQUdFTlQiLCJTRUFSQ0hfTElNSVQiLCJzZWFyY2hSZWRkaXQiLCJwcm9kdWN0TmFtZSIsInF1ZXJ5IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwidXJsIiwicmVzIiwiZmV0Y2giLCJoZWFkZXJzIiwiQWNjZXB0IiwibmV4dCIsInJldmFsaWRhdGUiLCJvayIsImpzb24iLCJwb3N0cyIsImRhdGEiLCJjaGlsZHJlbiIsIm1hcCIsInBvc3QiLCJzb3VyY2UiLCJ0aXRsZSIsInRleHQiLCJzZWxmdGV4dCIsInBlcm1hbGluayIsImRhdGUiLCJEYXRlIiwiY3JlYXRlZF91dGMiLCJ0b0lTT1N0cmluZyIsInNwbGl0IiwiYXV0aG9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/sources/reddit.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/sources/web.ts":
/*!**********************************!*\
  !*** ./lib/agent/sources/web.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   searchWeb: () => (/* binding */ searchWeb)\n/* harmony export */ });\nconst MAX_RESULTS = 5;\nconst MAX_CONTENT_CHARS = 2500;\nasync function searchWeb(productName) {\n    const apiKey = process.env.TAVILY_API_KEY;\n    if (!apiKey) {\n        console.warn(\"[Sync]   ⚠ TAVILY_API_KEY not set — skipping web search\");\n        return [];\n    }\n    const query = `${productName} customer reviews forums feedback`;\n    console.log(`[Sync]     [Web] Searching Tavily: \"${query}\"`);\n    const res = await fetch(\"https://api.tavily.com/search\", {\n        method: \"POST\",\n        headers: {\n            \"Content-Type\": \"application/json\"\n        },\n        body: JSON.stringify({\n            api_key: apiKey,\n            query,\n            search_depth: \"advanced\",\n            include_raw_content: true,\n            max_results: MAX_RESULTS\n        })\n    });\n    if (!res.ok) {\n        console.warn(`[Sync]     [Web] Tavily returned ${res.status}`);\n        return [];\n    }\n    const data = await res.json();\n    if (data.error) {\n        console.warn(`[Sync]     [Web] Tavily error: ${data.error}`);\n        return [];\n    }\n    const results = data.results ?? [];\n    console.log(`[Sync]     [Web] Tavily returned ${results.length} pages`);\n    return results.filter((r)=>r.score > 0.3).map((r)=>{\n        const text = r.raw_content ? r.raw_content.replace(/\\s+/g, \" \").trim().slice(0, MAX_CONTENT_CHARS) : r.content;\n        let domain = r.url;\n        try {\n            domain = new URL(r.url).hostname.replace(/^www\\./, \"\");\n        } catch  {\n        // keep original url as fallback\n        }\n        const date = r.published_date ? new Date(r.published_date).toISOString().split(\"T\")[0] : new Date().toISOString().split(\"T\")[0];\n        return {\n            source: domain,\n            title: r.title,\n            text,\n            url: r.url,\n            date,\n            author: domain\n        };\n    });\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYWdlbnQvc291cmNlcy93ZWIudHMiLCJtYXBwaW5ncyI6Ijs7OztBQUVBLE1BQU1BLGNBQWM7QUFDcEIsTUFBTUMsb0JBQW9CO0FBZ0JuQixlQUFlQyxVQUFVQyxXQUFtQjtJQUNqRCxNQUFNQyxTQUFTQyxRQUFRQyxHQUFHLENBQUNDLGNBQWM7SUFDekMsSUFBSSxDQUFDSCxRQUFRO1FBQ1hJLFFBQVFDLElBQUksQ0FBQztRQUNiLE9BQU8sRUFBRTtJQUNYO0lBRUEsTUFBTUMsUUFBUSxHQUFHUCxZQUFZLGlDQUFpQyxDQUFDO0lBQy9ESyxRQUFRRyxHQUFHLENBQUMsQ0FBQyxvQ0FBb0MsRUFBRUQsTUFBTSxDQUFDLENBQUM7SUFFM0QsTUFBTUUsTUFBTSxNQUFNQyxNQUFNLGlDQUFpQztRQUN2REMsUUFBUTtRQUNSQyxTQUFTO1lBQUUsZ0JBQWdCO1FBQW1CO1FBQzlDQyxNQUFNQyxLQUFLQyxTQUFTLENBQUM7WUFDbkJDLFNBQVNmO1lBQ1RNO1lBQ0FVLGNBQWM7WUFDZEMscUJBQXFCO1lBQ3JCQyxhQUFhdEI7UUFDZjtJQUNGO0lBRUEsSUFBSSxDQUFDWSxJQUFJVyxFQUFFLEVBQUU7UUFDWGYsUUFBUUMsSUFBSSxDQUFDLENBQUMsaUNBQWlDLEVBQUVHLElBQUlZLE1BQU0sRUFBRTtRQUM3RCxPQUFPLEVBQUU7SUFDWDtJQUVBLE1BQU1DLE9BQXVCLE1BQU1iLElBQUljLElBQUk7SUFDM0MsSUFBSUQsS0FBS0UsS0FBSyxFQUFFO1FBQ2RuQixRQUFRQyxJQUFJLENBQUMsQ0FBQywrQkFBK0IsRUFBRWdCLEtBQUtFLEtBQUssRUFBRTtRQUMzRCxPQUFPLEVBQUU7SUFDWDtJQUVBLE1BQU1DLFVBQVVILEtBQUtHLE9BQU8sSUFBSSxFQUFFO0lBQ2xDcEIsUUFBUUcsR0FBRyxDQUFDLENBQUMsaUNBQWlDLEVBQUVpQixRQUFRQyxNQUFNLENBQUMsTUFBTSxDQUFDO0lBRXRFLE9BQU9ELFFBQ0pFLE1BQU0sQ0FBQyxDQUFDQyxJQUFNQSxFQUFFQyxLQUFLLEdBQUcsS0FDeEJDLEdBQUcsQ0FBQyxDQUFDRjtRQUNKLE1BQU1HLE9BQU9ILEVBQUVJLFdBQVcsR0FDdEJKLEVBQUVJLFdBQVcsQ0FBQ0MsT0FBTyxDQUFDLFFBQVEsS0FBS0MsSUFBSSxHQUFHQyxLQUFLLENBQUMsR0FBR3JDLHFCQUNuRDhCLEVBQUVRLE9BQU87UUFFYixJQUFJQyxTQUFTVCxFQUFFVSxHQUFHO1FBQ2xCLElBQUk7WUFDRkQsU0FBUyxJQUFJRSxJQUFJWCxFQUFFVSxHQUFHLEVBQUVFLFFBQVEsQ0FBQ1AsT0FBTyxDQUFDLFVBQVU7UUFDckQsRUFBRSxPQUFNO1FBQ04sZ0NBQWdDO1FBQ2xDO1FBRUEsTUFBTVEsT0FBT2IsRUFBRWMsY0FBYyxHQUN6QixJQUFJQyxLQUFLZixFQUFFYyxjQUFjLEVBQUVFLFdBQVcsR0FBR0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEdBQ3RELElBQUlGLE9BQU9DLFdBQVcsR0FBR0MsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBRTFDLE9BQU87WUFDTEMsUUFBUVQ7WUFDUlUsT0FBT25CLEVBQUVtQixLQUFLO1lBQ2RoQjtZQUNBTyxLQUFLVixFQUFFVSxHQUFHO1lBQ1ZHO1lBQ0FPLFFBQVFYO1FBQ1Y7SUFDRjtBQUNKIiwic291cmNlcyI6WyJDOlxcc3JjXFxwcm9qZWN0c1xcaW5zaWdodC1zeW5jLWFpXFxsaWJcXGFnZW50XFxzb3VyY2VzXFx3ZWIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHR5cGUgeyBSYXdSZXN1bHQgfSBmcm9tIFwiLi4vdHlwZXNcIjtcblxuY29uc3QgTUFYX1JFU1VMVFMgPSA1O1xuY29uc3QgTUFYX0NPTlRFTlRfQ0hBUlMgPSAyNTAwO1xuXG5pbnRlcmZhY2UgVGF2aWx5UmVzdWx0IHtcbiAgdGl0bGU6IHN0cmluZztcbiAgdXJsOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbiAgcmF3X2NvbnRlbnQ/OiBzdHJpbmc7XG4gIHNjb3JlOiBudW1iZXI7XG4gIHB1Ymxpc2hlZF9kYXRlPzogc3RyaW5nO1xufVxuXG5pbnRlcmZhY2UgVGF2aWx5UmVzcG9uc2Uge1xuICByZXN1bHRzOiBUYXZpbHlSZXN1bHRbXTtcbiAgZXJyb3I/OiBzdHJpbmc7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZWFyY2hXZWIocHJvZHVjdE5hbWU6IHN0cmluZyk6IFByb21pc2U8UmF3UmVzdWx0W10+IHtcbiAgY29uc3QgYXBpS2V5ID0gcHJvY2Vzcy5lbnYuVEFWSUxZX0FQSV9LRVk7XG4gIGlmICghYXBpS2V5KSB7XG4gICAgY29uc29sZS53YXJuKFwiW1N5bmNdICAg4pqgIFRBVklMWV9BUElfS0VZIG5vdCBzZXQg4oCUIHNraXBwaW5nIHdlYiBzZWFyY2hcIik7XG4gICAgcmV0dXJuIFtdO1xuICB9XG5cbiAgY29uc3QgcXVlcnkgPSBgJHtwcm9kdWN0TmFtZX0gY3VzdG9tZXIgcmV2aWV3cyBmb3J1bXMgZmVlZGJhY2tgO1xuICBjb25zb2xlLmxvZyhgW1N5bmNdICAgICBbV2ViXSBTZWFyY2hpbmcgVGF2aWx5OiBcIiR7cXVlcnl9XCJgKTtcblxuICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaChcImh0dHBzOi8vYXBpLnRhdmlseS5jb20vc2VhcmNoXCIsIHtcbiAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgIGhlYWRlcnM6IHsgXCJDb250ZW50LVR5cGVcIjogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSxcbiAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XG4gICAgICBhcGlfa2V5OiBhcGlLZXksXG4gICAgICBxdWVyeSxcbiAgICAgIHNlYXJjaF9kZXB0aDogXCJhZHZhbmNlZFwiLFxuICAgICAgaW5jbHVkZV9yYXdfY29udGVudDogdHJ1ZSxcbiAgICAgIG1heF9yZXN1bHRzOiBNQVhfUkVTVUxUUyxcbiAgICB9KSxcbiAgfSk7XG5cbiAgaWYgKCFyZXMub2spIHtcbiAgICBjb25zb2xlLndhcm4oYFtTeW5jXSAgICAgW1dlYl0gVGF2aWx5IHJldHVybmVkICR7cmVzLnN0YXR1c31gKTtcbiAgICByZXR1cm4gW107XG4gIH1cblxuICBjb25zdCBkYXRhOiBUYXZpbHlSZXNwb25zZSA9IGF3YWl0IHJlcy5qc29uKCk7XG4gIGlmIChkYXRhLmVycm9yKSB7XG4gICAgY29uc29sZS53YXJuKGBbU3luY10gICAgIFtXZWJdIFRhdmlseSBlcnJvcjogJHtkYXRhLmVycm9yfWApO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdHMgPSBkYXRhLnJlc3VsdHMgPz8gW107XG4gIGNvbnNvbGUubG9nKGBbU3luY10gICAgIFtXZWJdIFRhdmlseSByZXR1cm5lZCAke3Jlc3VsdHMubGVuZ3RofSBwYWdlc2ApO1xuXG4gIHJldHVybiByZXN1bHRzXG4gICAgLmZpbHRlcigocikgPT4gci5zY29yZSA+IDAuMylcbiAgICAubWFwKChyKSA9PiB7XG4gICAgICBjb25zdCB0ZXh0ID0gci5yYXdfY29udGVudFxuICAgICAgICA/IHIucmF3X2NvbnRlbnQucmVwbGFjZSgvXFxzKy9nLCBcIiBcIikudHJpbSgpLnNsaWNlKDAsIE1BWF9DT05URU5UX0NIQVJTKVxuICAgICAgICA6IHIuY29udGVudDtcblxuICAgICAgbGV0IGRvbWFpbiA9IHIudXJsO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZG9tYWluID0gbmV3IFVSTChyLnVybCkuaG9zdG5hbWUucmVwbGFjZSgvXnd3d1xcLi8sIFwiXCIpO1xuICAgICAgfSBjYXRjaCB7XG4gICAgICAgIC8vIGtlZXAgb3JpZ2luYWwgdXJsIGFzIGZhbGxiYWNrXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRhdGUgPSByLnB1Ymxpc2hlZF9kYXRlXG4gICAgICAgID8gbmV3IERhdGUoci5wdWJsaXNoZWRfZGF0ZSkudG9JU09TdHJpbmcoKS5zcGxpdChcIlRcIilbMF1cbiAgICAgICAgOiBuZXcgRGF0ZSgpLnRvSVNPU3RyaW5nKCkuc3BsaXQoXCJUXCIpWzBdO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBzb3VyY2U6IGRvbWFpbixcbiAgICAgICAgdGl0bGU6IHIudGl0bGUsXG4gICAgICAgIHRleHQsXG4gICAgICAgIHVybDogci51cmwsXG4gICAgICAgIGRhdGUsXG4gICAgICAgIGF1dGhvcjogZG9tYWluLFxuICAgICAgfTtcbiAgICB9KTtcbn1cbiJdLCJuYW1lcyI6WyJNQVhfUkVTVUxUUyIsIk1BWF9DT05URU5UX0NIQVJTIiwic2VhcmNoV2ViIiwicHJvZHVjdE5hbWUiLCJhcGlLZXkiLCJwcm9jZXNzIiwiZW52IiwiVEFWSUxZX0FQSV9LRVkiLCJjb25zb2xlIiwid2FybiIsInF1ZXJ5IiwibG9nIiwicmVzIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJhcGlfa2V5Iiwic2VhcmNoX2RlcHRoIiwiaW5jbHVkZV9yYXdfY29udGVudCIsIm1heF9yZXN1bHRzIiwib2siLCJzdGF0dXMiLCJkYXRhIiwianNvbiIsImVycm9yIiwicmVzdWx0cyIsImxlbmd0aCIsImZpbHRlciIsInIiLCJzY29yZSIsIm1hcCIsInRleHQiLCJyYXdfY29udGVudCIsInJlcGxhY2UiLCJ0cmltIiwic2xpY2UiLCJjb250ZW50IiwiZG9tYWluIiwidXJsIiwiVVJMIiwiaG9zdG5hbWUiLCJkYXRlIiwicHVibGlzaGVkX2RhdGUiLCJEYXRlIiwidG9JU09TdHJpbmciLCJzcGxpdCIsInNvdXJjZSIsInRpdGxlIiwiYXV0aG9yIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/sources/web.ts\n");

/***/ }),

/***/ "(rsc)/./lib/agent/sync.ts":
/*!***************************!*\
  !*** ./lib/agent/sync.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   runGlobalSync: () => (/* binding */ runGlobalSync)\n/* harmony export */ });\n/* harmony import */ var _sources_reddit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sources/reddit */ \"(rsc)/./lib/agent/sources/reddit.ts\");\n/* harmony import */ var _sources_appstore__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sources/appstore */ \"(rsc)/./lib/agent/sources/appstore.ts\");\n/* harmony import */ var _sources_googleplay__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./sources/googleplay */ \"(rsc)/./lib/agent/sources/googleplay.ts\");\n/* harmony import */ var _sources_web__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./sources/web */ \"(rsc)/./lib/agent/sources/web.ts\");\n/* harmony import */ var _filter__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter */ \"(rsc)/./lib/agent/filter.ts\");\n\n\n\n\n\nasync function getExistingUrls(supabase, productId) {\n    const { data } = await supabase.from(\"feedback\").select(\"source_url\").eq(\"product_id\", productId).not(\"source_url\", \"is\", null);\n    return new Set((data ?? []).map((r)=>r.source_url).filter(Boolean));\n}\nasync function syncProduct(supabase, product) {\n    console.log(`[Sync] ──────────────────────────────────────────────────`);\n    console.log(`[Sync] Starting sync for \"${product.name}\" — Max 5 Tavily results`);\n    console.log(`[Sync]   → Fetching from Reddit, App Store, Google Play, Web…`);\n    const [redditResults, appStoreResults, googlePlayResults, webResults] = await Promise.allSettled([\n        (0,_sources_reddit__WEBPACK_IMPORTED_MODULE_0__.searchReddit)(product.name),\n        (0,_sources_appstore__WEBPACK_IMPORTED_MODULE_1__.searchAppStore)(product.name),\n        (0,_sources_googleplay__WEBPACK_IMPORTED_MODULE_2__.searchGooglePlay)(product.name),\n        (0,_sources_web__WEBPACK_IMPORTED_MODULE_3__.searchWeb)(product.name)\n    ]);\n    const counts = {\n        Reddit: redditResults.status === \"fulfilled\" ? redditResults.value.length : 0,\n        \"App Store\": appStoreResults.status === \"fulfilled\" ? appStoreResults.value.length : 0,\n        \"Google Play\": googlePlayResults.status === \"fulfilled\" ? googlePlayResults.value.length : 0,\n        Web: webResults.status === \"fulfilled\" ? webResults.value.length : 0\n    };\n    if (redditResults.status === \"rejected\") console.warn(`[Sync]   ⚠ Reddit failed:`, redditResults.reason);\n    if (appStoreResults.status === \"rejected\") console.warn(`[Sync]   ⚠ App Store failed:`, appStoreResults.reason);\n    if (googlePlayResults.status === \"rejected\") console.warn(`[Sync]   ⚠ Google Play failed:`, googlePlayResults.reason);\n    if (webResults.status === \"rejected\") console.warn(`[Sync]   ⚠ Web search failed:`, webResults.reason);\n    console.log(`[Sync]   → \"${product.name}\" — raw: Reddit=${counts.Reddit}, App Store=${counts[\"App Store\"]}, Google Play=${counts[\"Google Play\"]}, Web=${counts.Web}`);\n    const allResults = [\n        ...redditResults.status === \"fulfilled\" ? redditResults.value : [],\n        ...appStoreResults.status === \"fulfilled\" ? appStoreResults.value : [],\n        ...googlePlayResults.status === \"fulfilled\" ? googlePlayResults.value : [],\n        ...webResults.status === \"fulfilled\" ? webResults.value : []\n    ];\n    if (!allResults.length) {\n        console.log(`[Sync]   → \"${product.name}\" — no results found, skipping`);\n        return {\n            productId: product.id,\n            productName: product.name,\n            found: 0,\n            saved: 0,\n            skipped: 0\n        };\n    }\n    console.log(`[Sync]   → \"${product.name}\" — sending ${allResults.length} items to AI filter…`);\n    const relevant = await (0,_filter__WEBPACK_IMPORTED_MODULE_4__.filterWithAI)(product, allResults);\n    console.log(`[Sync]   → \"${product.name}\" — AI kept ${relevant.length} genuine feedback items`);\n    const existingUrls = await getExistingUrls(supabase, product.id);\n    const toSave = relevant.filter((r)=>!existingUrls.has(r.url));\n    const skipped = relevant.length - toSave.length;\n    if (skipped > 0) {\n        console.log(`[Sync]   → \"${product.name}\" — skipping ${skipped} duplicate(s)`);\n    }\n    for (const item of toSave){\n        await supabase.from(\"feedback\").insert({\n            title: item.cleanTitle,\n            raw_text: item.text,\n            source: item.source,\n            source_type: \"External\",\n            sentiment: item.sentiment,\n            date: item.date,\n            analyzed: false,\n            product_id: product.id,\n            source_url: item.url\n        });\n    }\n    console.log(`[Sync]   ✓ \"${product.name}\" — saved ${toSave.length} new item(s)`);\n    return {\n        productId: product.id,\n        productName: product.name,\n        found: allResults.length,\n        saved: toSave.length,\n        skipped\n    };\n}\nasync function runGlobalSync(supabase, productId) {\n    let query = supabase.from(\"products\").select(\"id, name, description\").order(\"created_at\", {\n        ascending: false\n    });\n    if (productId) {\n        query = query.eq(\"id\", productId);\n    }\n    const { data: products, error } = await query;\n    if (error) {\n        console.error(\"[Sync] Failed to fetch products:\", error.message);\n        throw new Error(`Failed to fetch products: ${error.message}`);\n    }\n    if (!products?.length) {\n        console.log(\"[Sync] No products found — nothing to sync\");\n        return {\n            productsProcessed: 0,\n            totalFound: 0,\n            totalSaved: 0,\n            perProduct: []\n        };\n    }\n    console.log(`[Sync] Starting sync for ${products.length} product(s): ${products.map((p)=>`\"${p.name}\"`).join(\", \")}`);\n    const perProduct = [];\n    for (const product of products){\n        const result = await syncProduct(supabase, product);\n        perProduct.push(result);\n    }\n    return {\n        productsProcessed: products.length,\n        totalFound: perProduct.reduce((s, r)=>s + r.found, 0),\n        totalSaved: perProduct.reduce((s, r)=>s + r.saved, 0),\n        perProduct\n    };\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUEsRUFBRWxELElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRW1ELElBQUksQ0FBQyxPQUFPO0lBRzVHLE1BQU1GLGFBQWtDLEVBQUU7SUFDMUMsS0FBSyxNQUFNcEQsV0FBVzZDLFNBQVU7UUFDOUIsTUFBTVUsU0FBUyxNQUFNeEQsWUFBWWIsVUFBVWM7UUFDM0NvRCxXQUFXSSxJQUFJLENBQUNEO0lBQ2xCO0lBRUEsT0FBTztRQUNMTixtQkFBbUJKLFNBQVMvQixNQUFNO1FBQ2xDb0MsWUFBWUUsV0FBV0ssTUFBTSxDQUFDLENBQUNDLEdBQUcvRCxJQUFNK0QsSUFBSS9ELEVBQUUwQixLQUFLLEVBQUU7UUFDckQ4QixZQUFZQyxXQUFXSyxNQUFNLENBQUMsQ0FBQ0MsR0FBRy9ELElBQU0rRCxJQUFJL0QsRUFBRTJCLEtBQUssRUFBRTtRQUNyRDhCO0lBQ0Y7QUFDRiIsInNvdXJjZXMiOlsiQzpcXHNyY1xccHJvamVjdHNcXGluc2lnaHQtc3luYy1haVxcbGliXFxhZ2VudFxcc3luYy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgdHlwZSB7IFN1cGFiYXNlQ2xpZW50IH0gZnJvbSBcIkBzdXBhYmFzZS9zdXBhYmFzZS1qc1wiO1xuaW1wb3J0IHsgc2VhcmNoUmVkZGl0IH0gZnJvbSBcIi4vc291cmNlcy9yZWRkaXRcIjtcbmltcG9ydCB7IHNlYXJjaEFwcFN0b3JlIH0gZnJvbSBcIi4vc291cmNlcy9hcHBzdG9yZVwiO1xuaW1wb3J0IHsgc2VhcmNoR29vZ2xlUGxheSB9IGZyb20gXCIuL3NvdXJjZXMvZ29vZ2xlcGxheVwiO1xuaW1wb3J0IHsgc2VhcmNoV2ViIH0gZnJvbSBcIi4vc291cmNlcy93ZWJcIjtcbmltcG9ydCB7IGZpbHRlcldpdGhBSSB9IGZyb20gXCIuL2ZpbHRlclwiO1xuaW1wb3J0IHR5cGUgeyBSYXdSZXN1bHQsIFN5bmNSZXN1bHQsIFByb2R1Y3RTeW5jUmVzdWx0IH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXhpc3RpbmdVcmxzKHN1cGFiYXNlOiBTdXBhYmFzZUNsaWVudCwgcHJvZHVjdElkOiBzdHJpbmcpOiBQcm9taXNlPFNldDxzdHJpbmc+PiB7XG4gIGNvbnN0IHsgZGF0YSB9ID0gYXdhaXQgc3VwYWJhc2VcbiAgICAuZnJvbShcImZlZWRiYWNrXCIpXG4gICAgLnNlbGVjdChcInNvdXJjZV91cmxcIilcbiAgICAuZXEoXCJwcm9kdWN0X2lkXCIsIHByb2R1Y3RJZClcbiAgICAubm90KFwic291cmNlX3VybFwiLCBcImlzXCIsIG51bGwpO1xuICByZXR1cm4gbmV3IFNldCgoZGF0YSA/PyBbXSkubWFwKChyKSA9PiAoci5zb3VyY2VfdXJsIGFzIHN0cmluZykpLmZpbHRlcihCb29sZWFuKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHN5bmNQcm9kdWN0KFxuICBzdXBhYmFzZTogU3VwYWJhc2VDbGllbnQsXG4gIHByb2R1Y3Q6IHsgaWQ6IHN0cmluZzsgbmFtZTogc3RyaW5nOyBkZXNjcmlwdGlvbjogc3RyaW5nIHwgbnVsbCB9XG4pOiBQcm9taXNlPFByb2R1Y3RTeW5jUmVzdWx0PiB7XG4gIGNvbnNvbGUubG9nKGBbU3luY10g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAYCk7XG4gIGNvbnNvbGUubG9nKGBbU3luY10gU3RhcnRpbmcgc3luYyBmb3IgXCIke3Byb2R1Y3QubmFtZX1cIiDigJQgTWF4IDUgVGF2aWx5IHJlc3VsdHNgKTtcbiAgY29uc29sZS5sb2coYFtTeW5jXSAgIOKGkiBGZXRjaGluZyBmcm9tIFJlZGRpdCwgQXBwIFN0b3JlLCBHb29nbGUgUGxheSwgV2Vi4oCmYCk7XG5cbiAgY29uc3QgW3JlZGRpdFJlc3VsdHMsIGFwcFN0b3JlUmVzdWx0cywgZ29vZ2xlUGxheVJlc3VsdHMsIHdlYlJlc3VsdHNdID1cbiAgICBhd2FpdCBQcm9taXNlLmFsbFNldHRsZWQoW1xuICAgICAgc2VhcmNoUmVkZGl0KHByb2R1Y3QubmFtZSksXG4gICAgICBzZWFyY2hBcHBTdG9yZShwcm9kdWN0Lm5hbWUpLFxuICAgICAgc2VhcmNoR29vZ2xlUGxheShwcm9kdWN0Lm5hbWUpLFxuICAgICAgc2VhcmNoV2ViKHByb2R1Y3QubmFtZSksXG4gICAgXSk7XG5cbiAgY29uc3QgY291bnRzID0ge1xuICAgIFJlZGRpdDogICAgICAgIHJlZGRpdFJlc3VsdHMuc3RhdHVzICAgICAgPT09IFwiZnVsZmlsbGVkXCIgPyByZWRkaXRSZXN1bHRzLnZhbHVlLmxlbmd0aCAgICAgIDogMCxcbiAgICBcIkFwcCBTdG9yZVwiOiAgIGFwcFN0b3JlUmVzdWx0cy5zdGF0dXMgICAgPT09IFwiZnVsZmlsbGVkXCIgPyBhcHBTdG9yZVJlc3VsdHMudmFsdWUubGVuZ3RoICAgIDogMCxcbiAgICBcIkdvb2dsZSBQbGF5XCI6IGdvb2dsZVBsYXlSZXN1bHRzLnN0YXR1cyAgPT09IFwiZnVsZmlsbGVkXCIgPyBnb29nbGVQbGF5UmVzdWx0cy52YWx1ZS5sZW5ndGggIDogMCxcbiAgICBXZWI6ICAgICAgICAgICB3ZWJSZXN1bHRzLnN0YXR1cyAgICAgICAgID09PSBcImZ1bGZpbGxlZFwiID8gd2ViUmVzdWx0cy52YWx1ZS5sZW5ndGggICAgICAgICA6IDAsXG4gIH07XG5cbiAgaWYgKHJlZGRpdFJlc3VsdHMuc3RhdHVzICAgICAgPT09IFwicmVqZWN0ZWRcIikgY29uc29sZS53YXJuKGBbU3luY10gICDimqAgUmVkZGl0IGZhaWxlZDpgLCAgICAgICByZWRkaXRSZXN1bHRzLnJlYXNvbik7XG4gIGlmIChhcHBTdG9yZVJlc3VsdHMuc3RhdHVzICAgID09PSBcInJlamVjdGVkXCIpIGNvbnNvbGUud2FybihgW1N5bmNdICAg4pqgIEFwcCBTdG9yZSBmYWlsZWQ6YCwgICAgIGFwcFN0b3JlUmVzdWx0cy5yZWFzb24pO1xuICBpZiAoZ29vZ2xlUGxheVJlc3VsdHMuc3RhdHVzICA9PT0gXCJyZWplY3RlZFwiKSBjb25zb2xlLndhcm4oYFtTeW5jXSAgIOKaoCBHb29nbGUgUGxheSBmYWlsZWQ6YCwgICBnb29nbGVQbGF5UmVzdWx0cy5yZWFzb24pO1xuICBpZiAod2ViUmVzdWx0cy5zdGF0dXMgICAgICAgICA9PT0gXCJyZWplY3RlZFwiKSBjb25zb2xlLndhcm4oYFtTeW5jXSAgIOKaoCBXZWIgc2VhcmNoIGZhaWxlZDpgLCAgICB3ZWJSZXN1bHRzLnJlYXNvbik7XG5cbiAgY29uc29sZS5sb2coXG4gICAgYFtTeW5jXSAgIOKGkiBcIiR7cHJvZHVjdC5uYW1lfVwiIOKAlCByYXc6IFJlZGRpdD0ke2NvdW50cy5SZWRkaXR9LCBBcHAgU3RvcmU9JHtjb3VudHNbXCJBcHAgU3RvcmVcIl19LCBHb29nbGUgUGxheT0ke2NvdW50c1tcIkdvb2dsZSBQbGF5XCJdfSwgV2ViPSR7Y291bnRzLldlYn1gXG4gICk7XG5cbiAgY29uc3QgYWxsUmVzdWx0czogUmF3UmVzdWx0W10gPSBbXG4gICAgLi4uKHJlZGRpdFJlc3VsdHMuc3RhdHVzICAgICAgPT09IFwiZnVsZmlsbGVkXCIgPyByZWRkaXRSZXN1bHRzLnZhbHVlICAgICAgOiBbXSksXG4gICAgLi4uKGFwcFN0b3JlUmVzdWx0cy5zdGF0dXMgICAgPT09IFwiZnVsZmlsbGVkXCIgPyBhcHBTdG9yZVJlc3VsdHMudmFsdWUgICAgOiBbXSksXG4gICAgLi4uKGdvb2dsZVBsYXlSZXN1bHRzLnN0YXR1cyAgPT09IFwiZnVsZmlsbGVkXCIgPyBnb29nbGVQbGF5UmVzdWx0cy52YWx1ZSAgOiBbXSksXG4gICAgLi4uKHdlYlJlc3VsdHMuc3RhdHVzICAgICAgICAgPT09IFwiZnVsZmlsbGVkXCIgPyB3ZWJSZXN1bHRzLnZhbHVlICAgICAgICAgOiBbXSksXG4gIF07XG5cbiAgaWYgKCFhbGxSZXN1bHRzLmxlbmd0aCkge1xuICAgIGNvbnNvbGUubG9nKGBbU3luY10gICDihpIgXCIke3Byb2R1Y3QubmFtZX1cIiDigJQgbm8gcmVzdWx0cyBmb3VuZCwgc2tpcHBpbmdgKTtcbiAgICByZXR1cm4geyBwcm9kdWN0SWQ6IHByb2R1Y3QuaWQsIHByb2R1Y3ROYW1lOiBwcm9kdWN0Lm5hbWUsIGZvdW5kOiAwLCBzYXZlZDogMCwgc2tpcHBlZDogMCB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coYFtTeW5jXSAgIOKGkiBcIiR7cHJvZHVjdC5uYW1lfVwiIOKAlCBzZW5kaW5nICR7YWxsUmVzdWx0cy5sZW5ndGh9IGl0ZW1zIHRvIEFJIGZpbHRlcuKApmApO1xuICBjb25zdCByZWxldmFudCA9IGF3YWl0IGZpbHRlcldpdGhBSShwcm9kdWN0LCBhbGxSZXN1bHRzKTtcbiAgY29uc29sZS5sb2coYFtTeW5jXSAgIOKGkiBcIiR7cHJvZHVjdC5uYW1lfVwiIOKAlCBBSSBrZXB0ICR7cmVsZXZhbnQubGVuZ3RofSBnZW51aW5lIGZlZWRiYWNrIGl0ZW1zYCk7XG5cbiAgY29uc3QgZXhpc3RpbmdVcmxzID0gYXdhaXQgZ2V0RXhpc3RpbmdVcmxzKHN1cGFiYXNlLCBwcm9kdWN0LmlkKTtcbiAgY29uc3QgdG9TYXZlID0gcmVsZXZhbnQuZmlsdGVyKChyKSA9PiAhZXhpc3RpbmdVcmxzLmhhcyhyLnVybCkpO1xuICBjb25zdCBza2lwcGVkID0gcmVsZXZhbnQubGVuZ3RoIC0gdG9TYXZlLmxlbmd0aDtcblxuICBpZiAoc2tpcHBlZCA+IDApIHtcbiAgICBjb25zb2xlLmxvZyhgW1N5bmNdICAg4oaSIFwiJHtwcm9kdWN0Lm5hbWV9XCIg4oCUIHNraXBwaW5nICR7c2tpcHBlZH0gZHVwbGljYXRlKHMpYCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGl0ZW0gb2YgdG9TYXZlKSB7XG4gICAgYXdhaXQgc3VwYWJhc2UuZnJvbShcImZlZWRiYWNrXCIpLmluc2VydCh7XG4gICAgICB0aXRsZTogaXRlbS5jbGVhblRpdGxlLFxuICAgICAgcmF3X3RleHQ6IGl0ZW0udGV4dCxcbiAgICAgIHNvdXJjZTogaXRlbS5zb3VyY2UsXG4gICAgICBzb3VyY2VfdHlwZTogXCJFeHRlcm5hbFwiLFxuICAgICAgc2VudGltZW50OiBpdGVtLnNlbnRpbWVudCxcbiAgICAgIGRhdGU6IGl0ZW0uZGF0ZSxcbiAgICAgIGFuYWx5emVkOiBmYWxzZSxcbiAgICAgIHByb2R1Y3RfaWQ6IHByb2R1Y3QuaWQsXG4gICAgICBzb3VyY2VfdXJsOiBpdGVtLnVybCxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKGBbU3luY10gICDinJMgXCIke3Byb2R1Y3QubmFtZX1cIiDigJQgc2F2ZWQgJHt0b1NhdmUubGVuZ3RofSBuZXcgaXRlbShzKWApO1xuXG4gIHJldHVybiB7XG4gICAgcHJvZHVjdElkOiBwcm9kdWN0LmlkLFxuICAgIHByb2R1Y3ROYW1lOiBwcm9kdWN0Lm5hbWUsXG4gICAgZm91bmQ6IGFsbFJlc3VsdHMubGVuZ3RoLFxuICAgIHNhdmVkOiB0b1NhdmUubGVuZ3RoLFxuICAgIHNraXBwZWQsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBydW5HbG9iYWxTeW5jKHN1cGFiYXNlOiBTdXBhYmFzZUNsaWVudCwgcHJvZHVjdElkPzogc3RyaW5nKTogUHJvbWlzZTxTeW5jUmVzdWx0PiB7XG4gIGxldCBxdWVyeSA9IHN1cGFiYXNlXG4gICAgLmZyb20oXCJwcm9kdWN0c1wiKVxuICAgIC5zZWxlY3QoXCJpZCwgbmFtZSwgZGVzY3JpcHRpb25cIilcbiAgICAub3JkZXIoXCJjcmVhdGVkX2F0XCIsIHsgYXNjZW5kaW5nOiBmYWxzZSB9KTtcblxuICBpZiAocHJvZHVjdElkKSB7XG4gICAgcXVlcnkgPSBxdWVyeS5lcShcImlkXCIsIHByb2R1Y3RJZCk7XG4gIH1cblxuICBjb25zdCB7IGRhdGE6IHByb2R1Y3RzLCBlcnJvciB9ID0gYXdhaXQgcXVlcnk7XG5cbiAgaWYgKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcihcIltTeW5jXSBGYWlsZWQgdG8gZmV0Y2ggcHJvZHVjdHM6XCIsIGVycm9yLm1lc3NhZ2UpO1xuICAgIHRocm93IG5ldyBFcnJvcihgRmFpbGVkIHRvIGZldGNoIHByb2R1Y3RzOiAke2Vycm9yLm1lc3NhZ2V9YCk7XG4gIH1cblxuICBpZiAoIXByb2R1Y3RzPy5sZW5ndGgpIHtcbiAgICBjb25zb2xlLmxvZyhcIltTeW5jXSBObyBwcm9kdWN0cyBmb3VuZCDigJQgbm90aGluZyB0byBzeW5jXCIpO1xuICAgIHJldHVybiB7IHByb2R1Y3RzUHJvY2Vzc2VkOiAwLCB0b3RhbEZvdW5kOiAwLCB0b3RhbFNhdmVkOiAwLCBwZXJQcm9kdWN0OiBbXSB9O1xuICB9XG5cbiAgY29uc29sZS5sb2coXG4gICAgYFtTeW5jXSBTdGFydGluZyBzeW5jIGZvciAke3Byb2R1Y3RzLmxlbmd0aH0gcHJvZHVjdChzKTogJHtwcm9kdWN0cy5tYXAoKHApID0+IGBcIiR7cC5uYW1lfVwiYCkuam9pbihcIiwgXCIpfWBcbiAgKTtcblxuICBjb25zdCBwZXJQcm9kdWN0OiBQcm9kdWN0U3luY1Jlc3VsdFtdID0gW107XG4gIGZvciAoY29uc3QgcHJvZHVjdCBvZiBwcm9kdWN0cykge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHN5bmNQcm9kdWN0KHN1cGFiYXNlLCBwcm9kdWN0KTtcbiAgICBwZXJQcm9kdWN0LnB1c2gocmVzdWx0KTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgcHJvZHVjdHNQcm9jZXNzZWQ6IHByb2R1Y3RzLmxlbmd0aCxcbiAgICB0b3RhbEZvdW5kOiBwZXJQcm9kdWN0LnJlZHVjZSgocywgcikgPT4gcyArIHIuZm91bmQsIDApLFxuICAgIHRvdGFsU2F2ZWQ6IHBlclByb2R1Y3QucmVkdWNlKChzLCByKSA9PiBzICsgci5zYXZlZCwgMCksXG4gICAgcGVyUHJvZHVjdCxcbiAgfTtcbn1cbiJdLCJuYW1lcyI6WyJzZWFyY2hSZWRkaXQiLCJzZWFyY2hBcHBTdG9yZSIsInNlYXJjaEdvb2dsZVBsYXkiLCJzZWFyY2hXZWIiLCJmaWx0ZXJXaXRoQUkiLCJnZXRFeGlzdGluZ1VybHMiLCJzdXBhYmFzZSIsInByb2R1Y3RJZCIsImRhdGEiLCJmcm9tIiwic2VsZWN0IiwiZXEiLCJub3QiLCJTZXQiLCJtYXAiLCJyIiwic291cmNlX3VybCIsImZpbHRlciIsIkJvb2xlYW4iLCJzeW5jUHJvZHVjdCIsInByb2R1Y3QiLCJjb25zb2xlIiwibG9nIiwibmFtZSIsInJlZGRpdFJlc3VsdHMiLCJhcHBTdG9yZVJlc3VsdHMiLCJnb29nbGVQbGF5UmVzdWx0cyIsIndlYlJlc3VsdHMiLCJQcm9taXNlIiwiYWxsU2V0dGxlZCIsImNvdW50cyIsIlJlZGRpdCIsInN0YXR1cyIsInZhbHVlIiwibGVuZ3RoIiwiV2ViIiwid2FybiIsInJlYXNvbiIsImFsbFJlc3VsdHMiLCJpZCIsInByb2R1Y3ROYW1lIiwiZm91bmQiLCJzYXZlZCIsInNraXBwZWQiLCJyZWxldmFudCIsImV4aXN0aW5nVXJscyIsInRvU2F2ZSIsImhhcyIsInVybCIsIml0ZW0iLCJpbnNlcnQiLCJ0aXRsZSIsImNsZWFuVGl0bGUiLCJyYXdfdGV4dCIsInRleHQiLCJzb3VyY2UiLCJzb3VyY2VfdHlwZSIsInNlbnRpbWVudCIsImRhdGUiLCJhbmFseXplZCIsInByb2R1Y3RfaWQiLCJydW5HbG9iYWxTeW5jIiwicXVlcnkiLCJvcmRlciIsImFzY2VuZGluZyIsInByb2R1Y3RzIiwiZXJyb3IiLCJtZXNzYWdlIiwiRXJyb3IiLCJwcm9kdWN0c1Byb2Nlc3NlZCIsInRvdGFsRm91bmQiLCJ0b3RhbFNhdmVkIiwicGVyUHJvZHVjdCIsInAiLCJqb2luIiwicmVzdWx0IiwicHVzaCIsInJlZHVjZSIsInMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/agent/sync.ts\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Fsync%2Froute&page=%2Fapi%2Fagent%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Fsync%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Fsync%2Froute&page=%2Fapi%2Fagent%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Fsync%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_src_projects_insight_sync_ai_app_api_agent_sync_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/agent/sync/route.ts */ \"(rsc)/./app/api/agent/sync/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/agent/sync/route\",\n        pathname: \"/api/agent/sync\",\n        filename: \"route\",\n        bundlePath: \"app/api/agent/sync/route\"\n    },\n    resolvedPagePath: \"C:\\\\src\\\\projects\\\\insight-sync-ai\\\\app\\\\api\\\\agent\\\\sync\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_src_projects_insight_sync_ai_app_api_agent_sync_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZhZ2VudCUyRnN5bmMlMkZyb3V0ZSZwYWdlPSUyRmFwaSUyRmFnZW50JTJGc3luYyUyRnJvdXRlJmFwcFBhdGhzPSZwYWdlUGF0aD1wcml2YXRlLW5leHQtYXBwLWRpciUyRmFwaSUyRmFnZW50JTJGc3luYyUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDc3JjJTVDcHJvamVjdHMlNUNpbnNpZ2h0LXN5bmMtYWklNUNhcHAmcGFnZUV4dGVuc2lvbnM9dHN4JnBhZ2VFeHRlbnNpb25zPXRzJnBhZ2VFeHRlbnNpb25zPWpzeCZwYWdlRXh0ZW5zaW9ucz1qcyZyb290RGlyPUMlM0ElNUNzcmMlNUNwcm9qZWN0cyU1Q2luc2lnaHQtc3luYy1haSZpc0Rldj10cnVlJnRzY29uZmlnUGF0aD10c2NvbmZpZy5qc29uJmJhc2VQYXRoPSZhc3NldFByZWZpeD0mbmV4dENvbmZpZ091dHB1dD0mcHJlZmVycmVkUmVnaW9uPSZtaWRkbGV3YXJlQ29uZmlnPWUzMCUzRCEiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBK0Y7QUFDdkM7QUFDcUI7QUFDbUI7QUFDaEc7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLHlHQUFtQjtBQUMzQztBQUNBLGNBQWMsa0VBQVM7QUFDdkI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLFlBQVk7QUFDWixDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0EsUUFBUSxzREFBc0Q7QUFDOUQ7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDMEY7O0FBRTFGIiwic291cmNlcyI6WyIiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLW1vZHVsZXMvYXBwLXJvdXRlL21vZHVsZS5jb21waWxlZFwiO1xuaW1wb3J0IHsgUm91dGVLaW5kIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvcm91dGUta2luZFwiO1xuaW1wb3J0IHsgcGF0Y2hGZXRjaCBhcyBfcGF0Y2hGZXRjaCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2xpYi9wYXRjaC1mZXRjaFwiO1xuaW1wb3J0ICogYXMgdXNlcmxhbmQgZnJvbSBcIkM6XFxcXHNyY1xcXFxwcm9qZWN0c1xcXFxpbnNpZ2h0LXN5bmMtYWlcXFxcYXBwXFxcXGFwaVxcXFxhZ2VudFxcXFxzeW5jXFxcXHJvdXRlLnRzXCI7XG4vLyBXZSBpbmplY3QgdGhlIG5leHRDb25maWdPdXRwdXQgaGVyZSBzbyB0aGF0IHdlIGNhbiB1c2UgdGhlbSBpbiB0aGUgcm91dGVcbi8vIG1vZHVsZS5cbmNvbnN0IG5leHRDb25maWdPdXRwdXQgPSBcIlwiXG5jb25zdCByb3V0ZU1vZHVsZSA9IG5ldyBBcHBSb3V0ZVJvdXRlTW9kdWxlKHtcbiAgICBkZWZpbml0aW9uOiB7XG4gICAgICAgIGtpbmQ6IFJvdXRlS2luZC5BUFBfUk9VVEUsXG4gICAgICAgIHBhZ2U6IFwiL2FwaS9hZ2VudC9zeW5jL3JvdXRlXCIsXG4gICAgICAgIHBhdGhuYW1lOiBcIi9hcGkvYWdlbnQvc3luY1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvYWdlbnQvc3luYy9yb3V0ZVwiXG4gICAgfSxcbiAgICByZXNvbHZlZFBhZ2VQYXRoOiBcIkM6XFxcXHNyY1xcXFxwcm9qZWN0c1xcXFxpbnNpZ2h0LXN5bmMtYWlcXFxcYXBwXFxcXGFwaVxcXFxhZ2VudFxcXFxzeW5jXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzIH0gPSByb3V0ZU1vZHVsZTtcbmZ1bmN0aW9uIHBhdGNoRmV0Y2goKSB7XG4gICAgcmV0dXJuIF9wYXRjaEZldGNoKHtcbiAgICAgICAgd29ya0FzeW5jU3RvcmFnZSxcbiAgICAgICAgd29ya1VuaXRBc3luY1N0b3JhZ2VcbiAgICB9KTtcbn1cbmV4cG9ydCB7IHJvdXRlTW9kdWxlLCB3b3JrQXN5bmNTdG9yYWdlLCB3b3JrVW5pdEFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MsIHBhdGNoRmV0Y2gsICB9O1xuXG4vLyMgc291cmNlTWFwcGluZ1VSTD1hcHAtcm91dGUuanMubWFwIl0sIm5hbWVzIjpbXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Fsync%2Froute&page=%2Fapi%2Fagent%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Fsync%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

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

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "dns":
/*!**********************!*\
  !*** external "dns" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("dns");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("events");

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

/***/ "http2":
/*!************************!*\
  !*** external "http2" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("http2");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("https");

/***/ }),

/***/ "keyv":
/*!***********************!*\
  !*** external "keyv" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("keyv");

/***/ }),

/***/ "net":
/*!**********************!*\
  !*** external "net" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("net");

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

/***/ "node:assert":
/*!******************************!*\
  !*** external "node:assert" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:assert");

/***/ }),

/***/ "node:async_hooks":
/*!***********************************!*\
  !*** external "node:async_hooks" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:async_hooks");

/***/ }),

/***/ "node:buffer":
/*!******************************!*\
  !*** external "node:buffer" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:buffer");

/***/ }),

/***/ "node:console":
/*!*******************************!*\
  !*** external "node:console" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:console");

/***/ }),

/***/ "node:crypto":
/*!******************************!*\
  !*** external "node:crypto" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:crypto");

/***/ }),

/***/ "node:diagnostics_channel":
/*!*******************************************!*\
  !*** external "node:diagnostics_channel" ***!
  \*******************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:diagnostics_channel");

/***/ }),

/***/ "node:dns":
/*!***************************!*\
  !*** external "node:dns" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:dns");

/***/ }),

/***/ "node:events":
/*!******************************!*\
  !*** external "node:events" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:events");

/***/ }),

/***/ "node:fs":
/*!**************************!*\
  !*** external "node:fs" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs");

/***/ }),

/***/ "node:fs/promises":
/*!***********************************!*\
  !*** external "node:fs/promises" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:fs/promises");

/***/ }),

/***/ "node:http":
/*!****************************!*\
  !*** external "node:http" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http");

/***/ }),

/***/ "node:http2":
/*!*****************************!*\
  !*** external "node:http2" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:http2");

/***/ }),

/***/ "node:net":
/*!***************************!*\
  !*** external "node:net" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:net");

/***/ }),

/***/ "node:path":
/*!****************************!*\
  !*** external "node:path" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:path");

/***/ }),

/***/ "node:perf_hooks":
/*!**********************************!*\
  !*** external "node:perf_hooks" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:perf_hooks");

/***/ }),

/***/ "node:querystring":
/*!***********************************!*\
  !*** external "node:querystring" ***!
  \***********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:querystring");

/***/ }),

/***/ "node:sqlite":
/*!******************************!*\
  !*** external "node:sqlite" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:sqlite");

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

/***/ "node:timers":
/*!******************************!*\
  !*** external "node:timers" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:timers");

/***/ }),

/***/ "node:tls":
/*!***************************!*\
  !*** external "node:tls" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:tls");

/***/ }),

/***/ "node:url":
/*!***************************!*\
  !*** external "node:url" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:url");

/***/ }),

/***/ "node:util":
/*!****************************!*\
  !*** external "node:util" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util");

/***/ }),

/***/ "node:util/types":
/*!**********************************!*\
  !*** external "node:util/types" ***!
  \**********************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:util/types");

/***/ }),

/***/ "node:worker_threads":
/*!**************************************!*\
  !*** external "node:worker_threads" ***!
  \**************************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:worker_threads");

/***/ }),

/***/ "node:zlib":
/*!****************************!*\
  !*** external "node:zlib" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("node:zlib");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("os");

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

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("querystring");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "string_decoder":
/*!*********************************!*\
  !*** external "string_decoder" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("string_decoder");

/***/ }),

/***/ "timers":
/*!*************************!*\
  !*** external "timers" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("timers");

/***/ }),

/***/ "tls":
/*!**********************!*\
  !*** external "tls" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tls");

/***/ }),

/***/ "tty":
/*!**********************!*\
  !*** external "tty" ***!
  \**********************/
/***/ ((module) => {

"use strict";
module.exports = require("tty");

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
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/@supabase","vendor-chunks/tslib","vendor-chunks/iceberg-js","vendor-chunks/cookie","vendor-chunks/formdata-node","vendor-chunks/ramda","vendor-chunks/undici","vendor-chunks/es5-ext","vendor-chunks/ajv","vendor-chunks/parse5","vendor-chunks/xmlbuilder","vendor-chunks/cheerio","vendor-chunks/@anthropic-ai","vendor-chunks/sshpk","vendor-chunks/got","vendor-chunks/request","vendor-chunks/google-play-scraper","vendor-chunks/iconv-lite","vendor-chunks/css-select","vendor-chunks/har-schema","vendor-chunks/htmlparser2","vendor-chunks/memoizee","vendor-chunks/app-store-scraper","vendor-chunks/entities","vendor-chunks/domutils","vendor-chunks/form-data-encoder","vendor-chunks/http2-wrapper","vendor-chunks/asynckit","vendor-chunks/tough-cookie","vendor-chunks/es6-symbol","vendor-chunks/xml2js","vendor-chunks/nth-check","vendor-chunks/cheerio-select","vendor-chunks/asn1","vendor-chunks/whatwg-url","vendor-chunks/whatwg-mimetype","vendor-chunks/type","vendor-chunks/qs","vendor-chunks/http-signature","vendor-chunks/encoding-sniffer","vendor-chunks/domhandler","vendor-chunks/dom-serializer","vendor-chunks/css-what","vendor-chunks/agentkeepalive","vendor-chunks/whatwg-encoding","vendor-chunks/uuid","vendor-chunks/throttled-request","vendor-chunks/ext","vendor-chunks/ecc-jsbn","vendor-chunks/parse5-parser-stream","vendor-chunks/parse5-htmlparser2-tree-adapter","vendor-chunks/tr46","vendor-chunks/timers-ext","vendor-chunks/mime-db","vendor-chunks/har-validator","vendor-chunks/get-stream","vendor-chunks/domelementtype","vendor-chunks/decompress-response","vendor-chunks/aws4","vendor-chunks/web-streams-polyfill","vendor-chunks/node-fetch","vendor-chunks/psl","vendor-chunks/wrappy","vendor-chunks/webidl-conversions","vendor-chunks/verror","vendor-chunks/url-parse","vendor-chunks/uri-js","vendor-chunks/universalify","vendor-chunks/tweetnacl","vendor-chunks/tunnel-agent","vendor-chunks/supports-color","vendor-chunks/sax","vendor-chunks/safer-buffer","vendor-chunks/safe-buffer","vendor-chunks/responselike","vendor-chunks/resolve-alpn","vendor-chunks/requires-port","vendor-chunks/quick-lru","vendor-chunks/querystringify","vendor-chunks/punycode","vendor-chunks/pump","vendor-chunks/performance-now","vendor-chunks/p-cancelable","vendor-chunks/once","vendor-chunks/oauth-sign","vendor-chunks/normalize-url","vendor-chunks/next-tick","vendor-chunks/ms","vendor-chunks/mimic-response","vendor-chunks/mime-types","vendor-chunks/lru-queue","vendor-chunks/lowercase-keys","vendor-chunks/jsprim","vendor-chunks/json-stringify-safe","vendor-chunks/json-schema","vendor-chunks/json-schema-traverse","vendor-chunks/jsbn","vendor-chunks/isstream","vendor-chunks/is-typedarray","vendor-chunks/is-promise","vendor-chunks/humanize-ms","vendor-chunks/http-cache-semantics","vendor-chunks/has-flag","vendor-chunks/forever-agent","vendor-chunks/fast-json-stable-stringify","vendor-chunks/fast-deep-equal","vendor-chunks/extsprintf","vendor-chunks/extend","vendor-chunks/event-target-shim","vendor-chunks/event-emitter","vendor-chunks/end-of-stream","vendor-chunks/delayed-stream","vendor-chunks/defer-to-connect","vendor-chunks/d","vendor-chunks/core-util-is","vendor-chunks/combined-stream","vendor-chunks/clone-response","vendor-chunks/caseless","vendor-chunks/cacheable-request","vendor-chunks/cacheable-lookup","vendor-chunks/boolbase","vendor-chunks/bcrypt-pbkdf","vendor-chunks/aws-sign2","vendor-chunks/assert-plus","vendor-chunks/abort-controller","vendor-chunks/@szmarczak","vendor-chunks/@sindresorhus"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fagent%2Fsync%2Froute&page=%2Fapi%2Fagent%2Fsync%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fagent%2Fsync%2Froute.ts&appDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Csrc%5Cprojects%5Cinsight-sync-ai&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();