/**
 * Rule helper builders.
 *
 * These small factory functions make program rule definitions concise and
 * consistent. Each returns a Rule whose evaluate() is a pure function of the
 * QuizAnswers. Rules never throw; missing answers produce "unknown".
 */
/** Ordered age bands, used for range comparisons. */
const AGE_ORDER = ["under3", "3to5", "6to12", "13to17", "18to22"];
/** Approximate numeric midpoint of each age band, for range checks. */
const AGE_MIN = {
    under3: 0,
    "3to5": 3,
    "6to12": 6,
    "13to17": 13,
    "18to22": 18,
};
const AGE_MAX = {
    under3: 2,
    "3to5": 5,
    "6to12": 12,
    "13to17": 17,
    "18to22": 22,
};
/** Ordered income bands, low to high. */
const INCOME_ORDER = [
    "under2000",
    "2000to4000",
    "4000to6000",
    "6000to8000",
    "over8000",
];
/** Approximate monthly income midpoint for each band (used for threshold checks). */
const INCOME_MIDPOINT = {
    under2000: 1000,
    "2000to4000": 3000,
    "4000to6000": 5000,
    "6000to8000": 7000,
    over8000: 10000,
};
function outcome(effect, weight, required, reason) {
    return { effect, weight, required, reason };
}
const NEUTRAL = outcome("neutral", 0, false, "");
/**
 * Age range rule. Passes if the child's age band overlaps [minBand, maxBand].
 * If age is unknown, returns "unknown".
 */
export function ageInRange(opts) {
    const weight = opts.weight ?? 2;
    const required = opts.required ?? true;
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: (a) => {
            if (!a.ageBand) {
                return outcome("unknown", 1, required, "We need the child's age to confirm this.");
            }
            const childMin = AGE_MIN[a.ageBand];
            const childMax = AGE_MAX[a.ageBand];
            const rangeMin = AGE_MIN[opts.minBand];
            const rangeMax = AGE_MAX[opts.maxBand];
            const overlaps = childMin <= rangeMax && childMax >= rangeMin;
            return overlaps
                ? outcome("pass", weight, required, opts.passReason)
                : outcome("fail", weight, required, opts.failReason);
        },
    };
}
/**
 * Condition rule. Passes if the child has ANY of the listed conditions.
 * "suspected" can optionally count as a soft match.
 */
export function hasAnyCondition(opts) {
    const weight = opts.weight ?? 3;
    const required = opts.required ?? true;
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: (a) => {
            if (!a.conditions || a.conditions.length === 0) {
                return outcome("unknown", 1, required, "We need to know your child's condition to confirm this.");
            }
            const match = a.conditions.some((c) => opts.conditions.includes(c));
            if (match)
                return outcome("pass", weight, required, opts.passReason);
            if (opts.suspectedCountsAsMaybe && a.conditions.includes("suspected")) {
                return outcome("unknown", 1, required, "A diagnosis is still being determined, so this may apply.");
            }
            return outcome("fail", weight, required, opts.failReason);
        },
    };
}
/**
 * Income-below-threshold rule. Passes if the household income band midpoint is
 * at or below the given monthly threshold. "preferNotToSay" returns "unknown".
 */
export function incomeAtOrBelow(opts) {
    const weight = opts.weight ?? 2;
    const required = opts.required ?? false;
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: (a) => {
            if (!a.incomeBand || a.incomeBand === "preferNotToSay") {
                return outcome("unknown", 1, required, "Income was not shared, so this depends on your household income.");
            }
            const midpoint = INCOME_MIDPOINT[a.incomeBand];
            return midpoint <= opts.monthlyThreshold
                ? outcome("pass", weight, required, opts.passReason)
                : outcome("fail", weight, required, opts.failReason);
        },
    };
}
/**
 * Living-situation rule. Passes if the child's living situation is one of the
 * listed values.
 */
export function livingIsOneOf(opts) {
    const weight = opts.weight ?? 2;
    const required = opts.required ?? true;
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: (a) => {
            if (!a.livingSituation) {
                return outcome("unknown", 1, required, "We need the child's living situation to confirm this.");
            }
            return opts.situations.includes(a.livingSituation)
                ? outcome("pass", weight, required, opts.passReason)
                : outcome("fail", weight, required, opts.failReason);
        },
    };
}
/**
 * Support-level rule. Passes if the child's support level is one of the listed
 * levels. Used for programs that require significant functional limitations
 * (e.g., SSI, CIIBS-style intensive support).
 */
export function supportLevelIsOneOf(opts) {
    const weight = opts.weight ?? 2;
    const required = opts.required ?? false;
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: (a) => {
            if (!a.supportLevel) {
                return outcome("unknown", 1, required, "We need to know how much daily support your child needs.");
            }
            return opts.levels.includes(a.supportLevel)
                ? outcome("pass", weight, required, opts.passReason)
                : outcome("fail", weight, required, opts.failReason);
        },
    };
}
/** A rule that always passes (e.g., a program open to all WA residents). */
export function alwaysPasses(opts) {
    return {
        id: opts.id,
        description: opts.description,
        citation: opts.citation,
        evaluate: () => outcome("pass", opts.weight ?? 1, false, opts.reason),
    };
}
export { NEUTRAL, AGE_ORDER, INCOME_ORDER };
