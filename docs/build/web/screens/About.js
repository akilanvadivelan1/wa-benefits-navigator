import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLang } from "../i18n/i18n.js";
export const About = ({ onStartQuiz }) => {
    const { t } = useLang();
    const a = t.about;
    return (_jsxs("div", { className: "page", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: a.title }), _jsx("p", { className: "page-lead", children: a.lead })] }), _jsxs("div", { className: "page-body", children: [_jsxs("section", { className: "page-section", children: [_jsx("h2", { children: a.problemTitle }), _jsx("p", { children: a.problemBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: a.approachTitle }), _jsx("p", { children: a.approachBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: a.privacyTitle }), _jsx("p", { children: a.privacyBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: a.roadmapTitle }), _jsx("p", { children: a.roadmapBody })] }), _jsxs("div", { className: "page-callout", children: [_jsxs("strong", { children: [a.disclaimerTitle, "."] }), " ", t.footer.disclaimer] }), _jsxs("div", { className: "page-cta", children: [_jsx("p", { children: a.builtFor }), _jsx("button", { className: "btn btn-accent", onClick: onStartQuiz, children: t.home.ctaPrimary })] })] })] }));
};
