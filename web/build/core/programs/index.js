/**
 * Registry of all 15 programs.
 *
 * This is the single source of truth the rules engine iterates over.
 */
import { appleHealth, abaLaunch } from "./health.js";
import { dda, esit, cyshcn, respite } from "./services.js";
import { ssi, tanf } from "./cash.js";
import { specialEducation, childCareRate, educationOmbuds } from "./education.js";
import { able, ddetf } from "./savings.js";
import { kinship, parentToParent } from "./support.js";
/** All programs, in a natural display order. */
export const ALL_PROGRAMS = [
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
export const PROGRAMS_BY_ID = ALL_PROGRAMS.reduce((acc, p) => {
    acc[p.id] = p;
    return acc;
}, {});
export function getProgram(id) {
    return PROGRAMS_BY_ID[id];
}
