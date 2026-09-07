import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
const CATEGORY_LABEL = {
    health: "Health",
    services: "Services",
    cash: "Cash",
    education: "Education",
    savings: "Savings",
    support: "Support",
};
const FILTERS = [
    { value: "all", label: "All" },
    { value: "health", label: "Health" },
    { value: "services", label: "Services" },
    { value: "cash", label: "Cash" },
    { value: "education", label: "Education" },
    { value: "savings", label: "Savings" },
    { value: "support", label: "Support" },
];
export const Browse = ({ programs, onOpenProgram, onStartQuiz }) => {
    const [filter, setFilter] = useState("all");
    const visible = filter === "all" ? programs : programs.filter((p) => p.category === filter);
    return (_jsxs("div", { className: "browse", children: [_jsxs("div", { className: "browse-header", children: [_jsx("h1", { children: "All Washington State programs" }), _jsx("p", { children: "These 15 programs span 5 state agencies and the federal government. Not sure which fit your family? Take the quiz for a personalized plan." })] }), _jsx("div", { className: "browse-filters", children: FILTERS.map((f) => (_jsx("button", { className: filter === f.value ? "filter-btn active" : "filter-btn", onClick: () => setFilter(f.value), children: f.label }, f.value))) }), _jsx("div", { className: "programs-grid", children: visible.map((p) => (_jsxs("button", { className: "program-card", onClick: () => onOpenProgram(p.id), children: [_jsxs("span", { className: "program-card-top", children: [_jsx("span", { className: "program-card-agency", children: p.agency }), _jsx("span", { className: `program-card-category cat-${p.category}`, children: CATEGORY_LABEL[p.category] })] }), _jsx("span", { className: "program-card-name", children: p.content.humanName }), _jsx("span", { className: "program-card-official", children: p.content.officialName }), _jsx("span", { className: "program-card-desc", children: p.content.oneLiner }), _jsx("span", { className: "program-card-arrow", "aria-hidden": "true", children: "\u203A" })] }, p.id))) }), _jsxs("div", { className: "browse-cta", children: [_jsx("p", { children: "Not sure which programs are right for your family?" }), _jsx("button", { className: "btn btn-accent", onClick: onStartQuiz, children: "Take the eligibility quiz" })] })] }));
};
