import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Web entry point. Mounts the React app into #root.
 * At runtime, React is loaded from the CDN via the import map in index.html.
 */
import { createRoot } from "react-dom/client";
import { App } from "./App.js";
import { LanguageProvider } from "./i18n/i18n.js";
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(_jsx(LanguageProvider, { children: _jsx(App, {}) }));
}
