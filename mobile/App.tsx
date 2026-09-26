/**
 * Native app root. Uses simple state-based navigation (like the web app) to
 * keep the dependency surface small and predictable. Wraps everything in the
 * language provider and shows the language gate until a language is chosen.
 */

import { useMemo, useState } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import type { MatchResult, ProgramId, QuizAnswers } from "../src/core/types.ts";
import { matchPrograms } from "../src/core/engine.ts";
import { PROGRAMS_BY_ID } from "../src/core/programs/index.ts";
import { LanguageProvider, useLang } from "./i18n.tsx";
import { LanguageGate } from "./screens/LanguageGate.tsx";
import { HomeScreen } from "./screens/HomeScreen.tsx";
import { QuizScreen } from "./screens/QuizScreen.tsx";
import { ResultsScreen } from "./screens/ResultsScreen.tsx";
import { ProgramDetailScreen } from "./screens/ProgramDetailScreen.tsx";
import { BrowseScreen } from "./screens/BrowseScreen.tsx";
import { AboutScreen } from "./screens/AboutScreen.tsx";
import { SourcesScreen } from "./screens/SourcesScreen.tsx";

export type Route =
  | { name: "home" }
  | { name: "quiz" }
  | { name: "results" }
  | { name: "detail"; programId: ProgramId; from: "results" | "browse" }
  | { name: "browse" }
  | { name: "about" }
  | { name: "sources" };

function Shell() {
  const { chosen, ready } = useLang();
  const [route, setRoute] = useState<Route>({ name: "home" });
  const [answers, setAnswers] = useState<QuizAnswers | null>(null);

  const result: MatchResult | null = useMemo(
    () => (answers ? matchPrograms(answers) : null),
    [answers],
  );

  // Wait for the saved language to load, then show the gate if not chosen.
  if (!ready) return null;
  if (chosen === null) return <LanguageGate />;

  const finishQuiz = (a: QuizAnswers) => {
    setAnswers(a);
    setRoute({ name: "results" });
  };

  switch (route.name) {
    case "home":
      return (
        <HomeScreen
          onStartQuiz={() => setRoute({ name: "quiz" })}
          onBrowse={() => setRoute({ name: "browse" })}
          onAbout={() => setRoute({ name: "about" })}
          onSources={() => setRoute({ name: "sources" })}
        />
      );
    case "quiz":
      return <QuizScreen onComplete={finishQuiz} onExit={() => setRoute({ name: "home" })} />;
    case "results":
      return result && answers ? (
        <ResultsScreen
          result={result}
          onOpenProgram={(id) => setRoute({ name: "detail", programId: id, from: "results" })}
          onRetake={() => setRoute({ name: "quiz" })}
          onBrowse={() => setRoute({ name: "browse" })}
          onHome={() => setRoute({ name: "home" })}
        />
      ) : null;
    case "detail":
      return (
        <ProgramDetailScreen
          program={PROGRAMS_BY_ID[route.programId]}
          county={answers?.county}
          onBack={() =>
            setRoute(route.from === "browse" ? { name: "browse" } : { name: "results" })
          }
        />
      );
    case "browse":
      return (
        <BrowseScreen
          onOpenProgram={(id) => setRoute({ name: "detail", programId: id, from: "browse" })}
          onStartQuiz={() => setRoute({ name: "quiz" })}
          onHome={() => setRoute({ name: "home" })}
        />
      );
    case "about":
      return <AboutScreen onStartQuiz={() => setRoute({ name: "quiz" })} onHome={() => setRoute({ name: "home" })} />;
    case "sources":
      return <SourcesScreen onHome={() => setRoute({ name: "home" })} />;
    default:
      return null;
  }
}

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <LanguageProvider>
        <Shell />
      </LanguageProvider>
    </SafeAreaProvider>
  );
}
