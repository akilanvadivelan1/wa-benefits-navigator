/**
 * Registry of all 15 programs.
 *
 * This is the single source of truth the rules engine iterates over.
 */

import type { Program, ProgramId } from "../types.ts";
import { appleHealth, abaLaunch } from "./health.ts";
import { dda, esit, cyshcn, respite } from "./services.ts";
import { ssi, tanf } from "./cash.ts";
import { specialEducation, childCareRate, educationOmbuds } from "./education.ts";
import { able, ddetf } from "./savings.ts";
import { kinship, parentToParent } from "./support.ts";

/** All programs, in a natural display order. */
export const ALL_PROGRAMS: Program[] = [
  appleHealth,
  dda,
  esit,
  specialEducation,
  cyshcn,
  ssi,
  tanf,
  able,
  ddetf,
  respite,
  kinship,
  childCareRate,
  parentToParent,
  abaLaunch,
  educationOmbuds,
];

/** Lookup a program by id. */
export const PROGRAMS_BY_ID: Record<ProgramId, Program> = ALL_PROGRAMS.reduce(
  (acc, p) => {
    acc[p.id] = p;
    return acc;
  },
  {} as Record<ProgramId, Program>,
);

export function getProgram(id: ProgramId): Program {
  return PROGRAMS_BY_ID[id];
}
