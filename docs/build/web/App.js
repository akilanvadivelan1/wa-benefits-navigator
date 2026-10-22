import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * App shell and simple screen router.
 *
 * Flow: language gate (first visit) -> Home -> Quiz -> Results -> Program
 * Detail, plus Browse, About, and Sources screens. Navigation is held in
 * component state, so there is no server and nothing is persisted.
 */
import { useMemo, useState } from "react";
import { matchPrograms } from "../core/engine.js";
import { ALL_PROGRAMS, PROGRAMS_BY_ID } from "../core/programs/index.js";
import { useLang } from "./i18n/i18n.js";
import { NavBar } from "./components/NavBar.js";
import { Footer } from "./components/Footer.js";
import { CursorGlow } from "./components/CursorGlow.js";
import { LanguageGate } from "./screens/LanguageGate.js";
import { Home } from "./screens/Home.js";
import { Quiz } from "./screens/Quiz.js";
import { Results } from "./screens/Results.js";
import { ProgramDetail } from "./screens/ProgramDetail.js";
import { Browse } from "./screens/Browse.js";
import { About } from "./screens/About.js";
import { Sources } from "./screens/Sources.js";
export const App = () => {
    const { chosen, t } = useLang();
    const [screen, setScreen] = useState({ name: "home" });
    const [answers, setAnswers] = useState(null);
    const result = useMemo(() => (answers ? matchPrograms(answers) : null), [answers]);
    // Show the language gate until the user has explicitly chosen a language.
    if (chosen === null) {
        return _jsx(LanguageGate, {});
    }
    const goHome = () => setScreen({ name: "home" });
    const startQuiz = () => setScreen({ name: "quiz" });
    const openBrowse = () => setScreen({ name: "browse" });
    const openAbout = () => setScreen({ name: "about" });
    const openSources = () => setScreen({ name: "sources" });
    const finishQuiz = (a) => {
        setAnswers(a);
        setScreen({ name: "results" });
    };
    const openDetail = (programId, from) => setScreen({ name: "detail", programId, from });
    const program = screen.name === "detail" ? PROGRAMS_BY_ID[screen.programId] : null;
    return (_jsxs("div", { className: "app", children: [_jsx(CursorGlow, {}), _jsx(NavBar, { onHome: goHome, onBrowse: openBrowse, onAbout: openAbout, onSources: openSources, active: screen.name }), _jsxs("main", { className: "app-main", children: [screen.name === "home" && (_jsx(Home, { onStartQuiz: startQuiz, onBrowse: openBrowse })), screen.name === "quiz" && (_jsx(Quiz, { onComplete: finishQuiz, onExit: goHome })), screen.name === "results" && result && answers && (_jsx(Results, { result: result, county: answers.county, onOpenProgram: (id) => openDetail(id, "results"), onRetake: startQuiz, onBrowse: openBrowse })), screen.name === "detail" && program && (_jsx(ProgramDetail, { program: program, county: answers?.county, onBack: () => setScreen(screen.name === "detail" && screen.from === "browse"
                            ? { name: "browse" }
                            : { name: "results" }), backLabel: screen.name === "detail" && screen.from === "browse"
                            ? t.detail.backPrograms
                            : t.detail.backResults })), screen.name === "browse" && (_jsx(Browse, { programs: ALL_PROGRAMS, onOpenProgram: (id) => openDetail(id, "browse"), onStartQuiz: startQuiz })), screen.name === "about" && _jsx(About, { onStartQuiz: startQuiz }), screen.name === "sources" && _jsx(Sources, {})] }), _jsx(Footer, {})] }));
};
