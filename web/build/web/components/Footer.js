import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { DISCLAIMER } from "../../core/engine.js";
export const Footer = () => {
    return (_jsx("footer", { className: "footer", children: _jsxs("div", { className: "footer-content", children: [_jsx("p", { className: "footer-disclaimer", children: DISCLAIMER }), _jsx("p", { className: "footer-meta", children: "WA Benefits Navigator. Built for the Congressional App Challenge. Information is drawn from official Washington State and federal government sources." })] }) }));
};
