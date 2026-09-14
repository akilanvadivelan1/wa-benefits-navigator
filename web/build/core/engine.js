/**
 * WA Benefits Navigator - Rules Engine
 *
 * Pure, framework-agnostic matching engine. Given a family's QuizAnswers, it:
 *  1. Evaluates every program's rules.
 *  2. Computes an honest confidence level per program.
 *  3. Sorts recommended programs into a dependency-aware "apply in this order"
 *     plan (prerequisites first).
 *  4. Attaches plain-language reasons and "why this first" notes.
 *
 * The engine never throws on missing answers. Unknown inputs produce
 * "mayQualify" rather than a false "notLikely".
 */
import { ALL_PROGRAMS, PROGRAMS_BY_ID } from "./programs/index.js";
export const DISCLAIMER = "This is general guidance. The agency that runs each program makes the final decision. Program details and income limits change over time, so please confirm with the agency before you apply.";
/**
 * Evaluate a single program against the answers.
 * Scoring logic:
 *  - Each rule contributes its weight when it passes.
 *  - A failed REQUIRED rule disqualifies the program (confidence notLikely).
 *  - A failed non-required rule reduces confidence but does not disqualify.
 *  - "unknown" outcomes add uncertainty and pull a program toward "mayQualify".
 */
function evaluateProgram(program, answers) {
    const reasons = [];
    let score = 0;
    let hasRequiredFail = false;
    let hasUnknown = false;
    let hasNonRequiredFail = false;
    let passedRequired = 0;
    let totalRequired = 0;
    for (const rule of program.rules) {
        let outcome;
        try {
            outcome = rule.evaluate(answers);
        }
        catch {
            // A rule should never throw, but if it does, treat as unknown.
            outcome = { effect: "unknown", weight: 1, required: false, reason: "" };
        }
        if (outcome.required)
            totalRequired += 1;
        switch (outcome.effect) {
            case "pass":
                score += outcome.weight;
                if (outcome.required)
                    passedRequired += 1;
                if (outcome.reason) {
                    reasons.push({ effect: "pass", reason: outcome.reason, citation: rule.citation });
                }
                break;
            case "boost":
                score += outcome.weight;
                if (outcome.reason) {
                    reasons.push({ effect: "boost", reason: outcome.reason, citation: rule.citation });
                }
                break;
            case "fail":
                if (outcome.required) {
                    hasRequiredFail = true;
                }
                else {
                    hasNonRequiredFail = true;
                    score -= outcome.weight;
                }
                if (outcome.reason) {
                    reasons.push({ effect: "fail", reason: outcome.reason, citation: rule.citation });
                }
                break;
            case "unknown":
                hasUnknown = true;
                if (outcome.reason) {
                    reasons.push({ effect: "unknown", reason: outcome.reason, citation: rule.citation });
                }
                break;
            case "neutral":
            default:
                break;
        }
    }
    // Does the program address a help type the family asked for?
    const matchesRequestedHelp = answers.helpTypes.length > 0 &&
        program.addresses.some((h) => answers.helpTypes.includes(h));
    if (matchesRequestedHelp)
        score += 2;
    const alreadyEnrolled = answers.alreadyEnrolled.includes(program.id);
    const confidence = computeConfidence({
        program,
        hasRequiredFail,
        hasUnknown,
        hasNonRequiredFail,
        passedRequired,
        totalRequired,
        score,
    });
    return { program, confidence, score, reasons, matchesRequestedHelp, alreadyEnrolled };
}
function computeConfidence(ctx) {
    // Programs open to everyone are always accessible.
    if (ctx.program.noEligibilityBarriers)
        return "noBarriers";
    // A failed hard requirement means not likely a fit.
    if (ctx.hasRequiredFail)
        return "notLikely";
    // All required rules passed and nothing is uncertain: strong match.
    const allRequiredPassed = ctx.totalRequired === 0 || ctx.passedRequired === ctx.totalRequired;
    if (allRequiredPassed && !ctx.hasUnknown && ctx.score > 0) {
        return ctx.hasNonRequiredFail ? "mayQualify" : "likelyEligible";
    }
    // Otherwise, it depends on details we cannot fully determine.
    return "mayQualify";
}
// ---------------------------------------------------------------------------
// Dependency-aware ordering (topological sort)
// ---------------------------------------------------------------------------
/**
 * Order the recommended programs so that prerequisites come before the programs
 * that depend on them. Within the same dependency level, sort by score
 * (strongest match first), then by requested-help match, then by category.
 */
function orderByDependencies(evaluations) {
    const included = new Set(evaluations.map((e) => e.program.id));
    const byId = new Map(evaluations.map((e) => [e.program.id, e]));
    // Compute a dependency "depth": how many included prerequisites precede it.
    const depthCache = new Map();
    function depth(id, seen) {
        if (depthCache.has(id))
            return depthCache.get(id);
        if (seen.has(id))
            return 0; // guard against cycles
        seen.add(id);
        const program = PROGRAMS_BY_ID[id];
        const deps = program.dependsOn.filter((d) => included.has(d));
        const d = deps.length === 0 ? 0 : 1 + Math.max(...deps.map((dep) => depth(dep, seen)));
        depthCache.set(id, d);
        return d;
    }
    // How many included programs depend on this one (its role as a prerequisite).
    const unlockCount = (id) => PROGRAMS_BY_ID[id].unlocks.filter((u) => included.has(u)).length;
    return [...evaluations].sort((a, b) => {
        const da = depth(a.program.id, new Set());
        const db = depth(b.program.id, new Set());
        if (da !== db)
            return da - db; // fewer prerequisites first
        // At the same depth, programs that unlock more included programs come first
        // (apply the prerequisite before the things that depend on it).
        const ua = unlockCount(a.program.id);
        const ub = unlockCount(b.program.id);
        if (ua !== ub)
            return ub - ua;
        // Confidence tier: likelyEligible/noBarriers before mayQualify.
        const tier = (e) => e.confidence === "likelyEligible" ? 0 : e.confidence === "noBarriers" ? 1 : 2;
        const ta = tier(a);
        const tb = tier(b);
        if (ta !== tb)
            return ta - tb;
        // Requested-help match next.
        if (a.matchesRequestedHelp !== b.matchesRequestedHelp) {
            return a.matchesRequestedHelp ? -1 : 1;
        }
        // Then by score.
        return b.score - a.score;
    });
}
/** Build a plain-language "why this order" note based on dependencies. */
function whyThisOrder(program, includedIds) {
    const activeDeps = program.dependsOn.filter((d) => includedIds.has(d));
    if (activeDeps.length > 0) {
        const names = activeDeps.map((d) => PROGRAMS_BY_ID[d].content.officialName).join(" and ");
        return `Apply after ${names}, which this program builds on.`;
    }
    const activeUnlocks = program.unlocks.filter((u) => includedIds.has(u));
    if (activeUnlocks.length > 0) {
        const names = activeUnlocks.map((u) => PROGRAMS_BY_ID[u].content.officialName).join(" and ");
        return `Start here. It helps unlock ${names}.`;
    }
    return undefined;
}
// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------
/**
 * Match a family's answers against all programs and return a structured,
 * ordered result set with honest confidence levels and plain-language reasons.
 */
export function matchPrograms(answers) {
    const evaluations = ALL_PROGRAMS.map((p) => evaluateProgram(p, answers));
    const recommendedEvals = evaluations.filter((e) => e.confidence !== "notLikely");
    const notLikelyEvals = evaluations.filter((e) => e.confidence === "notLikely");
    const ordered = orderByDependencies(recommendedEvals);
    const includedIds = new Set(ordered.map((e) => e.program.id));
    const recommended = ordered.map((e, i) => ({
        program: e.program,
        confidence: e.confidence,
        score: e.score,
        matchesRequestedHelp: e.matchesRequestedHelp,
        alreadyEnrolled: e.alreadyEnrolled,
        applyOrder: i + 1,
        reasons: e.reasons,
        whyThisOrder: whyThisOrder(e.program, includedIds),
    }));
    const notLikely = notLikelyEvals.map((e) => ({
        program: e.program,
        confidence: e.confidence,
        score: e.score,
        matchesRequestedHelp: e.matchesRequestedHelp,
        alreadyEnrolled: e.alreadyEnrolled,
        applyOrder: 0,
        reasons: e.reasons,
    }));
    const summary = {
        likelyEligible: recommended.filter((r) => r.confidence === "likelyEligible").length,
        mayQualify: recommended.filter((r) => r.confidence === "mayQualify").length,
        noBarriers: recommended.filter((r) => r.confidence === "noBarriers").length,
        total: recommended.length,
    };
    return { recommended, notLikely, summary, disclaimer: DISCLAIMER };
}
/** Confidence labels for display. */
export const CONFIDENCE_LABEL = {
    likelyEligible: "Likely Eligible",
    mayQualify: "May Qualify - Check Eligibility",
    noBarriers: "No Eligibility Barriers",
    notLikely: "Not Likely a Fit",
};
