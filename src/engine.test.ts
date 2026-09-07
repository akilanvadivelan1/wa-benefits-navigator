/**
 * Engine tests. Run with: npm run test
 *
 * These are lightweight assertions (no test framework needed) that verify the
 * matching engine behaves correctly for representative family scenarios.
 */

import { matchPrograms } from "./core/engine.ts";
import { ALL_PROGRAMS } from "./core/programs/index.ts";
import { getLocalContact } from "./core/countyContacts.ts";
import type { ProgramId, ProgramResult, QuizAnswers } from "./core/types.ts";

let passed = 0;
let failed = 0;

function assert(condition: boolean, message: string): void {
  if (condition) {
    passed += 1;
  } else {
    failed += 1;
    console.error(`  FAIL: ${message}`);
  }
}

function findResult(results: ProgramResult[], id: ProgramId): ProgramResult | undefined {
  return results.find((r) => r.program.id === id);
}

function idsInOrder(results: ProgramResult[]): ProgramId[] {
  return results.map((r) => r.program.id);
}

// ---------------------------------------------------------------------------
// Scenario 1: 7-year-old with autism, low-moderate income, lives with parents,
// moderate support, wants health + therapy + school help.
// ---------------------------------------------------------------------------
console.log("Scenario 1: 7yo autism, $3k/mo, with parents, moderate support");
{
  const answers: QuizAnswers = {
    ageBand: "6to12",
    conditions: ["autism"],
    supportLevel: "moderate",
    incomeBand: "2000to4000",
    livingSituation: "withParents",
    county: "King",
    helpTypes: ["health", "therapy", "school"],
    alreadyEnrolled: [],
  };
  const result = matchPrograms(answers);

  assert(!!findResult(result.recommended, "appleHealth"), "Apple Health should be recommended");
  assert(!!findResult(result.recommended, "dda"), "DDA should be recommended");
  assert(!!findResult(result.recommended, "specialEducation"), "Special Education should be recommended");
  assert(!!findResult(result.recommended, "cyshcn"), "CYSHCN (no barriers) should be recommended");

  // Dependency ordering: Apple Health must come before DDA, DDA before respite.
  const order = idsInOrder(result.recommended);
  const idxApple = order.indexOf("appleHealth");
  const idxDda = order.indexOf("dda");
  const idxRespite = order.indexOf("respite");
  assert(idxApple >= 0 && idxDda >= 0 && idxApple < idxDda, "Apple Health should come before DDA");
  if (idxRespite >= 0) {
    assert(idxDda < idxRespite, "DDA should come before Respite");
  }

  // ESIT is birth-to-3 only, so a 7-year-old should NOT get it.
  assert(!findResult(result.recommended, "esit"), "ESIT should NOT be recommended for a 7-year-old");
  assert(!!findResult(result.notLikely, "esit"), "ESIT should be in notLikely for a 7-year-old");

  // ABA LAUNCH is under-6 only, so a 7-year-old should NOT get it.
  assert(!findResult(result.recommended, "abaLaunch"), "ABA LAUNCH should NOT be recommended for a 7-year-old");

  // Apple Health should be the first item (root dependency).
  assert(order[0] === "appleHealth", "Apple Health should be first in the apply order");

  // CYSHCN should be flagged as no barriers.
  const cyshcn = findResult(result.recommended, "cyshcn");
  assert(cyshcn?.confidence === "noBarriers", "CYSHCN should have noBarriers confidence");
}

// ---------------------------------------------------------------------------
// Scenario 2: 2-year-old, suspected delay, wants therapy + navigation.
// ---------------------------------------------------------------------------
console.log("Scenario 2: 2yo suspected delay, wants therapy + navigation");
{
  const answers: QuizAnswers = {
    ageBand: "under3",
    conditions: ["suspected", "speech"],
    supportLevel: "mild",
    incomeBand: "4000to6000",
    livingSituation: "withParents",
    county: "Pierce",
    helpTypes: ["therapy", "navigation"],
    alreadyEnrolled: [],
  };
  const result = matchPrograms(answers);

  assert(!!findResult(result.recommended, "esit"), "ESIT should be recommended for a 2-year-old");
  // Special education is 3+, so a 2-year-old should not get it.
  assert(!findResult(result.recommended, "specialEducation"), "Special Education should NOT be recommended for a 2-year-old");
  assert(!!findResult(result.notLikely, "specialEducation"), "Special Education should be in notLikely for a 2-year-old");
}

// ---------------------------------------------------------------------------
// Scenario 3: 4-year-old with autism, low income, near Seattle.
// ABA LAUNCH should be recommended (under 6 + autism).
// ---------------------------------------------------------------------------
console.log("Scenario 3: 4yo autism, low income");
{
  const answers: QuizAnswers = {
    ageBand: "3to5",
    conditions: ["autism"],
    supportLevel: "significant",
    incomeBand: "under2000",
    livingSituation: "withParents",
    county: "King",
    helpTypes: ["therapy", "cash"],
    alreadyEnrolled: [],
  };
  const result = matchPrograms(answers);

  assert(!!findResult(result.recommended, "abaLaunch"), "ABA LAUNCH should be recommended for a 4yo with autism");
  assert(!!findResult(result.recommended, "ssi"), "SSI should be recommended (significant support, low income)");

  // SSI with significant support + low income should be at least mayQualify.
  const ssi = findResult(result.recommended, "ssi");
  assert(
    ssi?.confidence === "likelyEligible" || ssi?.confidence === "mayQualify",
    "SSI should be likelyEligible or mayQualify",
  );
}

// ---------------------------------------------------------------------------
// Scenario 4: 10-year-old raised by grandmother (kinship).
// Kinship should be recommended; requires withRelative.
// ---------------------------------------------------------------------------
console.log("Scenario 4: 10yo raised by grandmother (kinship)");
{
  const answers: QuizAnswers = {
    ageBand: "6to12",
    conditions: ["adhd"],
    supportLevel: "moderate",
    incomeBand: "under2000",
    livingSituation: "withRelative",
    county: "Spokane",
    helpTypes: ["cash", "navigation"],
    alreadyEnrolled: [],
  };
  const result = matchPrograms(answers);

  assert(!!findResult(result.recommended, "kinship"), "Kinship should be recommended for a child raised by a relative");

  // For a child living with parents, kinship should NOT appear.
  const withParents = matchPrograms({ ...answers, livingSituation: "withParents" });
  assert(!findResult(withParents.recommended, "kinship"), "Kinship should NOT be recommended when living with parents");
}

// ---------------------------------------------------------------------------
// Scenario 5: Already enrolled in Apple Health should be flagged.
// ---------------------------------------------------------------------------
console.log("Scenario 5: already enrolled in Apple Health");
{
  const answers: QuizAnswers = {
    ageBand: "6to12",
    conditions: ["autism"],
    supportLevel: "moderate",
    incomeBand: "2000to4000",
    livingSituation: "withParents",
    county: "King",
    helpTypes: ["therapy"],
    alreadyEnrolled: ["appleHealth"],
  };
  const result = matchPrograms(answers);
  const apple = findResult(result.recommended, "appleHealth");
  assert(apple?.alreadyEnrolled === true, "Apple Health should be flagged as already enrolled");
}

// ---------------------------------------------------------------------------
// Scenario 6: Minimal answers (only age) should not crash and should still
// return open-access programs.
// ---------------------------------------------------------------------------
console.log("Scenario 6: minimal answers (only age)");
{
  const answers: QuizAnswers = {
    ageBand: "6to12",
    conditions: [],
    helpTypes: [],
    alreadyEnrolled: [],
  };
  const result = matchPrograms(answers);
  assert(result.recommended.length > 0, "Should still recommend at least the no-barrier programs");
  assert(!!findResult(result.recommended, "cyshcn"), "CYSHCN should appear even with minimal answers");
  assert(!!findResult(result.recommended, "educationOmbuds"), "Education Ombuds should appear even with minimal answers");
}

// ---------------------------------------------------------------------------
// Structural checks across all programs.
// ---------------------------------------------------------------------------
console.log("Structural checks on all 15 programs");
{
  assert(ALL_PROGRAMS.length === 15, `Should have 15 programs (found ${ALL_PROGRAMS.length})`);
  for (const p of ALL_PROGRAMS) {
    assert(p.content.humanName.length > 0, `${p.id} has a human name`);
    assert(p.content.exampleFirst.startsWith("Imagine"), `${p.id} leads with an example ("Imagine...")`);
    assert(p.citations.length > 0, `${p.id} has at least one citation`);
    assert(p.rules.length > 0, `${p.id} has at least one rule`);
    // No em-dashes or semicolons in user-facing one-liners (style rule).
    assert(!/[—;]/.test(p.content.oneLiner), `${p.id} one-liner avoids em-dash and semicolon`);
    assert(!/[—;]/.test(p.content.exampleFirst), `${p.id} exampleFirst avoids em-dash and semicolon`);
  }
}

// ---------------------------------------------------------------------------
// County contacts.
// ---------------------------------------------------------------------------
console.log("County contact lookups");
{
  // King County has a verified direct CYSHCN number.
  const kingCyshcn = getLocalContact("cyshcn", "King");
  assert(kingCyshcn?.phone === "206-296-4610", "King County CYSHCN should use the local number");
  assert(kingCyshcn?.isStatewideIntake === false, "King County CYSHCN should be a direct local contact");

  // A county with no override should fall back to the statewide intake line.
  const adamsCyshcn = getLocalContact("cyshcn", "Adams");
  assert(adamsCyshcn?.isStatewideIntake === true, "Adams County CYSHCN should fall back to statewide intake");
  assert(adamsCyshcn?.phone === "1-800-525-0127", "Statewide CYSHCN line should be used as fallback");

  // Kinship always has a statewide navigator line.
  const kinshipContact = getLocalContact("kinship", undefined);
  assert(kinshipContact?.phone === "1-800-422-3263", "Kinship should use the statewide navigator line");

  // A program with no county-local contact returns undefined.
  const appleContact = getLocalContact("appleHealth", "King");
  assert(appleContact === undefined, "Programs without county-local contacts return undefined");
}

// ---------------------------------------------------------------------------
// Report
// ---------------------------------------------------------------------------
console.log("");
console.log(`Tests complete: ${passed} passed, ${failed} failed`);
// `process` is provided by the Node runtime. Declared here because we run
// without installed @types/node (the sandbox has no package registry access).
declare const process: { exit(code: number): never };
if (failed > 0) {
  process.exit(1);
}
