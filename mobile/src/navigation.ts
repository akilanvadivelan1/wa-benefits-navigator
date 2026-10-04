/**
 * Navigation param types for the native stack.
 * Home -> Quiz -> Results -> Detail, plus Browse (which also opens Detail).
 */

import type { ProgramId, QuizAnswers } from "./core/types.ts";

export type RootStackParamList = {
  Home: undefined;
  Quiz: undefined;
  Results: { answers: QuizAnswers };
  Detail: { programId: ProgramId; county?: string; from: "results" | "browse" };
  Browse: undefined;
};
