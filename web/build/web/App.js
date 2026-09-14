import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * App shell and simple screen router.
 *
 * The app is a single-page flow: Home -> Quiz -> Results -> Program Detail,
 * plus a Browse All Programs screen. Navigation is held in component state,
 * so there is no server and nothing is persisted.
 */
import { useMemo, useState } from "react";
import { matchPrograms } from "../core/engine.js";
import { ALL_PROGRAMS, PROGRAMS_BY_ID } from "../core/programs/index.js";
import { NavBar } from "./components/NavBar.js";
import { Footer } from "./components/Footer.js";
import { CursorGlow } from "./components/CursorGlow.js";
import { Home } from "./screens/Home.js";
import { Quiz } from "./screens/Quiz.js";
import { Results } from "./screens/Results.js";
import { ProgramDetail } from "./screens/ProgramDetail.js";
import { Browse } from "./screens/Browse.js";
export const App = () => {
    const [screen, setScreen] = useState({ name: "home" });
    const [answers, setAnswers] = useState(null);
    const result = useMemo(() => (answers ? matchPrograms(answers) : null), [answers]);
    const goHome = () => setScreen({ name: "home" });
    const startQuiz = () => setScreen({ name: "quiz" });
    const openBrowse = () => setScreen({ name: "browse" });
    const finishQuiz = (a) => {
        setAnswers(a);
        setScreen({ name: "results" });
    };
    const openDetail = (programId, from) => setScreen({ name: "detail", programId, from });
    const program = screen.name === "detail" ? PROGRAMS_BY_ID[screen.programId] : null;
    return (_jsxs("div", { className: "app", children: [_jsx(CursorGlow, {}), _jsx(NavBar, { onHome: goHome, onBrowse: openBrowse, active: screen.name }), _jsxs("main", { className: "app-main", children: [screen.name === "home" && (_jsx(Home, { onStartQuiz: startQuiz, onBrowse: openBrowse })), screen.name === "quiz" && (_jsx(Quiz, { onComplete: finishQuiz, onExit: goHome })), screen.name === "results" && result && answers && (_jsx(Results, { result: result, county: answers.county, onOpenProgram: (id) => openDetail(id, "results"), onRetake: startQuiz, onBrowse: openBrowse })), screen.name === "detail" && program && (_jsx(ProgramDetail, { program: program, county: answers?.county, onBack: () => setScreen(screen.name === "detail" && screen.from === "browse"
                            ? { name: "browse" }
                            : { name: "results" }), backLabel: screen.name === "detail" && screen.from === "browse"
                            ? "Back to All Programs"
                            : "Back to Results" })), screen.name === "browse" && (_jsx(Browse, { programs: ALL_PROGRAMS, onOpenProgram: (id) => openDetail(id, "browse"), onStartQuiz: startQuiz }))] }), _jsx(Footer, {})] }));
};
