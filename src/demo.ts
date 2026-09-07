/**
 * Human-readable demo of the matching engine. Run with: npm run demo
 *
 * Prints the personalized action plan for a sample family so you can see
 * exactly what the engine produces before the UI is built.
 */

import { matchPrograms, CONFIDENCE_LABEL } from "./core/engine.ts";
import type { QuizAnswers } from "./core/types.ts";

const sampleFamily: QuizAnswers = {
  ageBand: "6to12",
  conditions: ["autism", "sensory"],
  supportLevel: "moderate",
  incomeBand: "2000to4000",
  livingSituation: "withParents",
  county: "King",
  helpTypes: ["health", "therapy", "school"],
  alreadyEnrolled: [],
};

function line(char = "-", n = 72): string {
  return char.repeat(n);
}

console.log(line("="));
console.log("WA BENEFITS NAVIGATOR - SAMPLE RESULT");
console.log(line("="));
console.log("");
console.log("Family answers:");
console.log("  Child age band:     7 years (6 to 12)");
console.log("  Conditions:         Autism, Sensory Processing");
console.log("  Daily support:      Moderate");
console.log("  Household income:   $2,000 to $4,000 / month");
console.log("  Living situation:   Lives with parents");
console.log("  County:             King");
console.log("  Looking for help:   Health coverage, Therapy, School support");
console.log("");

const result = matchPrograms(sampleFamily);

console.log(line("="));
console.log(
  `RESULT: ${result.summary.total} programs recommended ` +
    `(${result.summary.likelyEligible} likely, ${result.summary.mayQualify} may qualify, ` +
    `${result.summary.noBarriers} open to all)`,
);
console.log(line("="));
console.log("");
console.log("YOUR ACTION PLAN (apply in this order):");
console.log("");

for (const r of result.recommended) {
  const label = CONFIDENCE_LABEL[r.confidence];
  console.log(`${r.applyOrder}. ${r.program.content.humanName}`);
  console.log(`   (${r.program.content.officialName}) - ${r.program.agencyName}`);
  console.log(`   Status: ${label}`);
  console.log(`   What it does: ${r.program.content.oneLiner}`);
  if (r.whyThisOrder) {
    console.log(`   Why this order: ${r.whyThisOrder}`);
  }
  if (r.matchesRequestedHelp) {
    console.log(`   * Matches the help you asked for`);
  }
  // Show up to two "why we think so" reasons.
  const shown = r.reasons.filter((x) => x.effect === "pass" || x.effect === "unknown").slice(0, 2);
  for (const reason of shown) {
    console.log(`   - ${reason.reason}`);
  }
  console.log("");
}

if (result.notLikely.length > 0) {
  console.log(line("-"));
  console.log("NOT LIKELY A FIT RIGHT NOW (shown for transparency):");
  for (const r of result.notLikely) {
    const reason = r.reasons.find((x) => x.effect === "fail");
    console.log(`  - ${r.program.content.officialName}`);
    if (reason) console.log(`      ${reason.reason}`);
  }
  console.log("");
}

console.log(line("-"));
console.log("DISCLAIMER:");
console.log(`  ${result.disclaimer}`);
console.log(line("="));
