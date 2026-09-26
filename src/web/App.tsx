/**
 * App shell and simple screen router.
 *
 * Flow: language gate (first visit) -> Home -> Quiz -> Results -> Program
 * Detail, plus Browse, About, and Sources screens. Navigation is held in
 * component state, so there is no server and nothing is persisted.
 */

import { useMemo, useState } from "react";
import type {
  MatchResult,
  Program,
  ProgramId,
  QuizAnswers,
} from "../core/types.ts";
import { matchPrograms } from "../core/engine.ts";
import { ALL_PROGRAMS, PROGRAMS_BY_ID } from "../core/programs/index.ts";
import { useLang } from "./i18n/i18n.tsx";
import { NavBar } from "./components/NavBar.tsx";
import { Footer } from "./components/Footer.tsx";
import { CursorGlow } from "./components/CursorGlow.tsx";
import { LanguageGate } from "./screens/LanguageGate.tsx";
import { Home } from "./screens/Home.tsx";
import { Quiz } from "./screens/Quiz.tsx";
import { Results } from "./screens/Results.tsx";
import { ProgramDetail } from "./screens/ProgramDetail.tsx";
import { Browse } from "./screens/Browse.tsx";
import { About } from "./screens/About.tsx";
import { Sources } from "./screens/Sources.tsx";

export type Screen =
  | { name: "home" }
  | { name: "quiz" }
  | { name: "results" }
  | { name: "detail"; programId: ProgramId; from: "results" | "browse" }
  | { name: "browse" }
  | { name: "about" }
  | { name: "sources" };

export const App = () => {
  const { chosen, t } = useLang();
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  const result: MatchResult | null = useMemo(
    () => (answers ? matchPrograms(answers) : null),
    [answers],
  );

  // Show the language gate until the user has explicitly chosen a language.
  if (chosen === null) {
    return <LanguageGate />;
  }

  const goHome = () => setScreen({ name: "home" });
  const startQuiz = () => setScreen({ name: "quiz" });
  const openBrowse = () => setScreen({ name: "browse" });
  const openAbout = () => setScreen({ name: "about" });
  const openSources = () => setScreen({ name: "sources" });

  const finishQuiz = (a: QuizAnswers) => {
    setAnswers(a);
    setScreen({ name: "results" });
  };

  const openDetail = (programId: ProgramId, from: "results" | "browse") =>
    setScreen({ name: "detail", programId, from });

  const program: Program | null =
    screen.name === "detail" ? PROGRAMS_BY_ID[screen.programId] : null;

  return (
    <div className="app">
      <CursorGlow />
      <NavBar
        onHome={goHome}
        onBrowse={openBrowse}
        onAbout={openAbout}
        onSources={openSources}
        active={screen.name}
      />
      <main className="app-main">
        {screen.name === "home" && (
          <Home onStartQuiz={startQuiz} onBrowse={openBrowse} />
        )}
        {screen.name === "quiz" && (
          <Quiz onComplete={finishQuiz} onExit={goHome} />
        )}
        {screen.name === "results" && result && answers && (
          <Results
            result={result}
            county={answers.county}
            onOpenProgram={(id) => openDetail(id, "results")}
            onRetake={startQuiz}
            onBrowse={openBrowse}
          />
        )}
        {screen.name === "detail" && program && (
          <ProgramDetail
            program={program}
            county={answers?.county}
            onBack={() =>
              setScreen(
                screen.name === "detail" && screen.from === "browse"
                  ? { name: "browse" }
                  : { name: "results" },
              )
            }
            backLabel={
              screen.name === "detail" && screen.from === "browse"
                ? t.detail.backPrograms
                : t.detail.backResults
            }
          />
        )}
        {screen.name === "browse" && (
          <Browse
            programs={ALL_PROGRAMS}
            onOpenProgram={(id) => openDetail(id, "browse")}
            onStartQuiz={startQuiz}
          />
        )}
        {screen.name === "about" && <About onStartQuiz={startQuiz} />}
        {screen.name === "sources" && <Sources />}
      </main>
      <Footer />
    </div>
  );
};
