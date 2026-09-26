import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Language gate. Shown before the user enters the app, the first time they
 * visit (until they pick a language). Their choice is remembered, so returning
 * users skip straight into the app.
 */
import { useLang } from "../i18n/i18n.js";
import { STRINGS } from "../i18n/strings.js";
export const LanguageGate = () => {
    const { setLang } = useLang();
    return (_jsxs("div", { className: "gate", children: [_jsx("div", { className: "gate-glow", "aria-hidden": "true" }), _jsxs("div", { className: "gate-card", children: [_jsx("span", { className: "gate-mark", "aria-hidden": "true", children: _jsxs("svg", { width: "48", height: "48", viewBox: "0 0 32 32", fill: "none", children: [_jsx("circle", { cx: "16", cy: "16", r: "16", fill: "#0E7C74" }), _jsx("path", { d: "M10 16L14 20L22 12", stroke: "white", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round" })] }) }), _jsx("h1", { className: "gate-title", children: "WA Benefits Navigator" }), _jsxs("p", { className: "gate-subtitle", children: [STRINGS.en.gate.subtitle, " / ", STRINGS.es.gate.subtitle] }), _jsxs("div", { className: "gate-buttons", children: [_jsxs("button", { className: "gate-lang-btn", onClick: () => setLang("en"), children: [_jsx("span", { className: "gate-lang-name", children: "English" }), _jsx("span", { className: "gate-lang-sub", children: "Continue in English" })] }), _jsxs("button", { className: "gate-lang-btn", onClick: () => setLang("es"), children: [_jsx("span", { className: "gate-lang-name", children: "Espa\u00F1ol" }), _jsx("span", { className: "gate-lang-sub", children: "Continuar en espa\u00F1ol" })] })] })] })] }));
};
