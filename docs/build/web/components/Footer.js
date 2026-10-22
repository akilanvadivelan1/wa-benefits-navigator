import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLang } from "../i18n/i18n.js";
export const Footer = () => {
    const { t } = useLang();
    return (_jsx("footer", { className: "footer", children: _jsxs("div", { className: "footer-content", children: [_jsx("p", { className: "footer-disclaimer", children: t.footer.disclaimer }), _jsx("p", { className: "footer-meta", children: t.footer.meta })] }) }));
};
