import { Fragment as _Fragment, jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { WA_COUNTIES } from "../../core/counties.js";
import { AGE_OPTIONS, CAREGIVING_OPTIONS, CONDITION_OPTIONS, DEEP_STEP_META, DIAGNOSIS_OPTIONS, HELP_OPTIONS, INCOME_OPTIONS, INSURANCE_OPTIONS, LIVING_OPTIONS, NEEDS_OPTIONS, RESIDENCY_OPTIONS, STEP_META, SUPPORT_OPTIONS, } from "./quizContent.js";
// Step order: 6 core steps, then 5 deeper steps.
const ALL_STEP_META = [...STEP_META, ...DEEP_STEP_META];
const TOTAL_STEPS = ALL_STEP_META.length;
export const Quiz = ({ onComplete, onExit }) => {
    const [step, setStep] = useState(0);
    // Core answers
    const [ageBand, setAgeBand] = useState();
    const [conditions, setConditions] = useState([]);
    const [supportLevel, setSupportLevel] = useState();
    const [incomeBand, setIncomeBand] = useState();
    const [livingSituation, setLivingSituation] = useState();
    const [county, setCounty] = useState("");
    const [helpTypes, setHelpTypes] = useState([]);
    // Deeper answers
    const [diagnosisStatus, setDiagnosisStatus] = useState();
    const [specificNeeds, setSpecificNeeds] = useState([]);
    const [caregivingImpact, setCaregivingImpact] = useState();
    const [insuranceStatus, setInsuranceStatus] = useState();
    const [residencyStatus, setResidencyStatus] = useState();
    const [error, setError] = useState(null);
    const meta = ALL_STEP_META[step];
    const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);
    const isDeepStep = step >= STEP_META.length;
    const toggle = (list, value) => list.includes(value) ? list.filter((x) => x !== value) : [...list, value];
    // Required steps: only the core single-select ones. Deeper steps are optional.
    const canProceed = () => {
        switch (step) {
            case 0: return !!ageBand;
            case 1: return conditions.length > 0;
            case 2: return !!supportLevel;
            case 3: return !!incomeBand;
            case 4: return !!livingSituation;
            default: return true; // help types and all deeper steps are optional
        }
    };
    const submit = () => {
        onComplete({
            ageBand,
            conditions,
            supportLevel,
            incomeBand,
            livingSituation,
            county: county || undefined,
            helpTypes,
            alreadyEnrolled: insuranceStatus === "appleHealthAlready" ? ["appleHealth"] : [],
            diagnosisStatus,
            specificNeeds: specificNeeds.length ? specificNeeds : undefined,
            caregivingImpact,
            insuranceStatus,
            residencyStatus,
        });
    };
    const next = () => {
        if (!canProceed()) {
            setError("Please choose an answer to continue.");
            return;
        }
        setError(null);
        if (step < TOTAL_STEPS - 1)
            setStep(step + 1);
        else
            submit();
    };
    const back = () => {
        setError(null);
        if (step === 0)
            onExit();
        else
            setStep(step - 1);
    };
    const skip = () => {
        setError(null);
        if (step < TOTAL_STEPS - 1)
            setStep(step + 1);
        else
            submit();
    };
    return (_jsxs("div", { className: "quiz", children: [_jsxs("div", { className: "quiz-progress", children: [_jsx("div", { className: "progress-bar", children: _jsx("div", { className: "progress-fill", style: { width: `${progress}%` } }) }), _jsxs("span", { className: "progress-text", children: ["Step ", step + 1, " of ", TOTAL_STEPS, isDeepStep && " · a few optional questions to sharpen your results"] })] }), _jsxs("div", { className: "quiz-card", children: [_jsx("h2", { className: "quiz-question", children: meta.title }), _jsx("p", { className: "quiz-helper", children: meta.helper }), _jsxs("div", { className: "quiz-options", children: [step === 0 &&
                                AGE_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: ageBand === o.value, onClick: () => setAgeBand(o.value) }, o.value))), step === 1 &&
                                CONDITION_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: conditions.includes(o.value), multi: true, onClick: () => setConditions(toggle(conditions, o.value)) }, o.value))), step === 2 &&
                                SUPPORT_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: supportLevel === o.value, onClick: () => setSupportLevel(o.value) }, o.value))), step === 3 &&
                                INCOME_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: incomeBand === o.value, onClick: () => setIncomeBand(o.value) }, o.value))), step === 4 && (_jsxs(_Fragment, { children: [LIVING_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: livingSituation === o.value, onClick: () => setLivingSituation(o.value) }, o.value))), _jsxs("div", { className: "county-field", children: [_jsx("label", { htmlFor: "county", children: "Which county do you live in? (optional, helps us show local offices)" }), _jsxs("select", { id: "county", value: county, onChange: (e) => setCounty(e.target.value), children: [_jsx("option", { value: "", children: "Select a county" }), WA_COUNTIES.map((c) => (_jsx("option", { value: c, children: c }, c)))] })] })] })), step === 5 &&
                                HELP_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, selected: helpTypes.includes(o.value), multi: true, onClick: () => setHelpTypes(toggle(helpTypes, o.value)) }, o.value))), step === 6 &&
                                DIAGNOSIS_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: diagnosisStatus === o.value, onClick: () => setDiagnosisStatus(o.value) }, o.value))), step === 7 &&
                                NEEDS_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: specificNeeds.includes(o.value), multi: true, onClick: () => setSpecificNeeds(toggle(specificNeeds, o.value)) }, o.value))), step === 8 &&
                                CAREGIVING_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: caregivingImpact === o.value, onClick: () => setCaregivingImpact(o.value) }, o.value))), step === 9 &&
                                INSURANCE_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: insuranceStatus === o.value, onClick: () => setInsuranceStatus(o.value) }, o.value))), step === 10 &&
                                RESIDENCY_OPTIONS.map((o) => (_jsx(OptionCard, { label: o.label, description: o.description, selected: residencyStatus === o.value, onClick: () => setResidencyStatus(o.value) }, o.value)))] }), _jsxs("div", { className: "why-we-ask", children: [_jsx("strong", { children: "Why we ask:" }), " ", meta.whyWeAsk] }), error && _jsx("p", { className: "quiz-error", children: error }), _jsxs("div", { className: "quiz-nav", children: [_jsx("button", { className: "btn btn-secondary", onClick: back, children: step === 0 ? "Exit" : "Back" }), _jsxs("div", { className: "quiz-nav-right", children: [isDeepStep && step < TOTAL_STEPS - 1 && (_jsx("button", { className: "btn btn-ghost", onClick: skip, children: "Skip" })), _jsx("button", { className: "btn btn-primary", onClick: next, children: step === TOTAL_STEPS - 1 ? "See My Results" : "Next" })] })] })] })] }));
};
const OptionCard = ({ label, description, selected, multi, onClick }) => {
    return (_jsxs("button", { type: "button", className: selected ? "option-card selected" : "option-card", onClick: onClick, "aria-pressed": selected, children: [_jsxs("span", { className: "option-content", children: [_jsx("span", { className: "option-label", children: label }), description && _jsx("span", { className: "option-desc", children: description })] }), multi && _jsx("span", { className: selected ? "checkbox-indicator on" : "checkbox-indicator", "aria-hidden": "true" })] }));
};
