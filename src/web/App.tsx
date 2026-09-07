/**
 * App shell and simple screen router.
 *
 * The app is a single-page flow: Home -> Quiz -> Results -> Program Detail,
 * plus a Browse All Programs screen. Navigation is held in component state,
 * so there is no server and nothing is persisted.
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
import { NavBar } from "./components/NavBar.tsx";
import { Footer } from "./components/Footer.tsx";
import { Home } from "./screens/Home.tsx";
import { Quiz } from "./screens/Quiz.tsx";
import { Results } from "./screens/Results.tsx";
import { ProgramDetail } from "./screens/ProgramDetail.tsx";
import { Browse } from "./screens/Browse.tsx";

export type Screen =
  | { name: "home" }
  | { name: "quiz" }
  | { name: "results" }
  | { name: "detail"; programId: ProgramId; from: "results" | "browse" }
  | { name: "browse" };

export const App = () => {
  const [screen, setScreen] = useState<Screen>({ name: "home" });
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  const result: MatchResult | null = useMemo(
    () => (answers ? matchPrograms(answers) : null),
    [answers],
  );

  const goHome = () => setScreen({ name: "home" });
  const startQuiz = () => setScreen({ name: "quiz" });
  const openBrowse = () => setScreen({ name: "browse" });

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
      <NavBar
        onHome={goHome}
        onBrowse={openBrowse}
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
                ? "Back to All Programs"
                : "Back to Results"
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
      </main>
      <Footer />
    </div>
  );
};
