import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { useLang } from "../i18n/i18n.js";
export const Browse = ({ programs, onOpenProgram, onStartQuiz }) => {
    const { t } = useLang();
    const [filter, setFilter] = useState("all");
    const CATEGORY_LABEL = {
        health: t.category.health,
        services: t.category.services,
        cash: t.category.cash,
        education: t.category.education,
        savings: t.category.savings,
        support: t.category.support,
    };
    const FILTERS = [
        { value: "all", label: t.browse.filterAll },
        { value: "health", label: t.category.health },
        { value: "services", label: t.category.services },
        { value: "cash", label: t.category.cash },
        { value: "education", label: t.category.education },
        { value: "savings", label: t.category.savings },
        { value: "support", label: t.category.support },
    ];
    const visible = filter === "all" ? programs : programs.filter((p) => p.category === filter);
    return (_jsxs("div", { className: "browse", children: [_jsxs("div", { className: "browse-header", children: [_jsx("h1", { children: t.browse.title }), _jsx("p", { children: t.browse.subtitle })] }), _jsx("div", { className: "browse-filters", children: FILTERS.map((f) => (_jsx("button", { className: filter === f.value ? "filter-btn active" : "filter-btn", onClick: () => setFilter(f.value), children: f.label }, f.value))) }), _jsx("div", { className: "programs-grid", children: visible.map((p) => (_jsxs("button", { className: "program-card", onClick: () => onOpenProgram(p.id), children: [_jsxs("span", { className: "program-card-top", children: [_jsx("span", { className: "program-card-agency", children: p.agency }), _jsx("span", { className: `program-card-category cat-${p.category}`, children: CATEGORY_LABEL[p.category] })] }), _jsx("span", { className: "program-card-name", children: p.content.humanName }), _jsx("span", { className: "program-card-official", children: p.content.officialName }), _jsx("span", { className: "program-card-desc", children: p.content.oneLiner }), _jsx("span", { className: "program-card-arrow", "aria-hidden": "true", children: "\u203A" })] }, p.id))) }), _jsxs("div", { className: "browse-cta", children: [_jsx("p", { children: t.browse.ctaText }), _jsx("button", { className: "btn btn-accent", onClick: onStartQuiz, children: t.browse.ctaButton })] })] }));
};
