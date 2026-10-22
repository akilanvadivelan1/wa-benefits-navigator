import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useLang } from "../i18n/i18n.js";
/** Official primary sources shown on the Sources page. */
const AGENCY_LINKS = [
    { key: "agencyHealth", url: "https://www.hca.wa.gov/about-hca/programs-and-initiatives/apple-health-medicaid/" },
    { key: "agencyDshs", url: "https://www.dshs.wa.gov/dda" },
    { key: "agencyDcyf", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
    { key: "agencyOspi", url: "https://ospi.k12.wa.us/student-success/special-education" },
    { key: "agencyDoh", url: "https://www.doh.wa.gov/CYSHCN" },
    { key: "agencySsa", url: "https://www.ssa.gov/ssi/text-child-ussi.htm" },
];
export const Sources = () => {
    const { t } = useLang();
    const s = t.sources;
    return (_jsxs("div", { className: "page", children: [_jsxs("div", { className: "page-header", children: [_jsx("h1", { children: s.title }), _jsx("p", { className: "page-lead", children: s.lead })] }), _jsxs("div", { className: "page-body", children: [_jsxs("section", { className: "page-section", children: [_jsx("h2", { children: s.howTitle }), _jsx("p", { children: s.howBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: s.engineTitle }), _jsx("p", { children: s.engineBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: s.honestTitle }), _jsx("p", { children: s.honestBody })] }), _jsxs("section", { className: "page-section", children: [_jsx("h2", { children: s.listTitle }), _jsx("ul", { className: "source-list", children: AGENCY_LINKS.map((item) => (_jsx("li", { children: _jsx("a", { href: item.url, target: "_blank", rel: "noreferrer noopener", children: s[item.key] }) }, item.key))) }), _jsx("p", { className: "source-verify", children: s.verifyNote })] })] })] }));
};
