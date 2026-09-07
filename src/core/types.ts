/**
 * WA Benefits Navigator - Core Type System
 *
 * This file defines the entire data model for the app. It is pure TypeScript
 * with no framework dependencies, so it ports cleanly to web and mobile.
 *
 * Design notes:
 * - Every program carries citations to official government sources (Pillar 1).
 * - Every program carries example-first, plain-language content (Pillar 2).
 * - The user's answers are the only input; nothing is stored or transmitted.
 */

// ---------------------------------------------------------------------------
// QUIZ ANSWERS (the only input to the engine)
// ---------------------------------------------------------------------------

/** Age band of the child. Drives age-gated programs (ESIT, IEP/504, transitions). */
export type AgeBand =
  | "under3"
  | "3to5"
  | "6to12"
  | "13to17"
  | "18to22";

/** Conditions/diagnoses. Multi-select. "suspected" means not yet diagnosed. */
export type Condition =
  | "autism"
  | "adhd"
  | "idd" // intellectual / developmental disability
  | "sensory"
  | "learning"
  | "speech"
  | "other"
  | "suspected";

/**
 * How much daily support the child needs (severity).
 * Explained to users with concrete examples, not clinical terms.
 */
export type SupportLevel = "mild" | "moderate" | "significant";

/** Household monthly income band. Drives income-tested programs. */
export type IncomeBand =
  | "under2000"
  | "2000to4000"
  | "4000to6000"
  | "6000to8000"
  | "over8000"
  | "preferNotToSay";

/** Child's living situation. Drives family-home and kinship programs. */
export type LivingSituation =
  | "withParents"
  | "withRelative"
  | "foster"
  | "other";

/** What kind of help the family is looking for. Used to prioritize results. */
export type HelpType =
  | "health"
  | "therapy"
  | "cash"
  | "school"
  | "respite"
  | "savings"
  | "navigation";

/**
 * Washington counties. Used only to surface local contacts (not eligibility).
 * Kept as a string to avoid a giant union; validated against a known list.
 */
export type County = string;

/** Programs the family is already enrolled in (optional). Avoids re-recommending. */
export type EnrolledProgram = ProgramId;

/** The complete set of answers a user provides. All fields optional except the ones the quiz requires. */
export interface QuizAnswers {
  ageBand?: AgeBand;
  conditions: Condition[];
  supportLevel?: SupportLevel;
  incomeBand?: IncomeBand;
  livingSituation?: LivingSituation;
  county?: County;
  helpTypes: HelpType[];
  alreadyEnrolled: EnrolledProgram[];
}

// ---------------------------------------------------------------------------
// PROGRAM IDENTIFIERS
// ---------------------------------------------------------------------------

export type ProgramId =
  | "appleHealth"
  | "dda"
  | "esit"
  | "specialEducation"
  | "cyshcn"
  | "ssi"
  | "tanf"
  | "able"
  | "ddetf"
  | "respite"
  | "kinship"
  | "childCareRate"
  | "parentToParent"
  | "abaLaunch"
  | "educationOmbuds";

/** Broad category used for filtering in the UI. */
export type ProgramCategory =
  | "health"
  | "services"
  | "cash"
  | "education"
  | "savings"
  | "support";

/** The administering agency. */
export type Agency =
  | "HCA"
  | "DSHS"
  | "DCYF"
  | "OSPI"
  | "DOH"
  | "SSA"
  | "Treasurer"
  | "Commerce"
  | "TheArc"
  | "UW"
  | "Governor";

// ---------------------------------------------------------------------------
// SOURCE CITATIONS (Pillar 1: every rule is defensible)
// ---------------------------------------------------------------------------

export interface Citation {
  /** Short human label, e.g. "WAC 388-845-0030" or "HCA Apple Health for Kids". */
  label: string;
  /** Official URL. */
  url: string;
}

// ---------------------------------------------------------------------------
// PLAIN-LANGUAGE CONTENT (Pillar 2: example-first, human explanations)
// ---------------------------------------------------------------------------

export interface ProgramContent {
  /** Plain-language "human name" that leads with the benefit, e.g. "Free health coverage for your child". */
  humanName: string;
  /** Official program name, e.g. "Apple Health (Medicaid)". */
  officialName: string;
  /** One-sentence "what this means for you". */
  oneLiner: string;
  /**
   * Example-first explanation. Structure: relatable scenario, then plain
   * explanation, then official term. No em-dashes or semicolons.
   */
  exampleFirst: string;
  /** Bulleted list of concrete things the family gets. */
  whatYouGet: string[];
  /** Plain-language tips for parents. */
  tips: string[];
}

// ---------------------------------------------------------------------------
// APPLICATION INFO
// ---------------------------------------------------------------------------

export interface ApplyInfo {
  /** Primary URL to apply or learn more. */
  url?: string;
  /** Phone number to call. */
  phone?: string;
  /** Ordered steps to apply, in plain language. */
  steps: string[];
  /** Documents the family should gather. */
  documents: string[];
}

// ---------------------------------------------------------------------------
// ELIGIBILITY RULES (the heart of the engine)
// ---------------------------------------------------------------------------

/**
 * A single eligibility rule. Each rule is a pure function of the answers plus
 * a weight and a human-readable reason. Rules never throw; unknown answers
 * simply produce a neutral result.
 */
export interface Rule {
  /** Stable id for debugging/tests. */
  id: string;
  /** What this rule checks, in plain language (shown in "why" explanations). */
  description: string;
  /** Official source backing this rule. */
  citation: Citation;
  /**
   * Evaluate the rule against the answers.
   * Returns a RuleOutcome describing how this rule affects the match.
   */
  evaluate: (answers: QuizAnswers) => RuleOutcome;
}

/**
 * The effect of a rule on a program's match.
 * - "pass": the family meets this criterion (adds positive score).
 * - "fail": the family does not meet a REQUIRED criterion (disqualifies).
 * - "unknown": we cannot tell from the answers (adds uncertainty).
 * - "boost": a soft positive signal (e.g., matches a requested help type).
 * - "neutral": no effect.
 */
export type RuleEffect = "pass" | "fail" | "unknown" | "boost" | "neutral";

export interface RuleOutcome {
  effect: RuleEffect;
  /** Weight of this outcome. Positive helps, higher = stronger. */
  weight: number;
  /** Whether this rule is a hard requirement (a "fail" disqualifies the program). */
  required: boolean;
  /** Plain-language reason shown to the user, e.g. "Your child is under 3". */
  reason: string;
}

// ---------------------------------------------------------------------------
// PROGRAM DEFINITION
// ---------------------------------------------------------------------------

export interface Program {
  id: ProgramId;
  category: ProgramCategory;
  agency: Agency;
  /** Human-readable agency name, e.g. "Health Care Authority". */
  agencyName: string;

  content: ProgramContent;
  apply: ApplyInfo;
  citations: Citation[];

  /**
   * Programs this one depends on. Used to order the action plan.
   * Example: DDA waivers depend on appleHealth, so appleHealth is applied first.
   */
  dependsOn: ProgramId[];

  /**
   * Programs this one helps unlock. Shown as "Unlocks these programs".
   * Example: appleHealth unlocks DDA waivers and ABA therapy.
   */
  unlocks: ProgramId[];

  /** The eligibility rules for this program. */
  rules: Rule[];

  /**
   * If true, this program has no eligibility barriers (anyone can access it),
   * e.g. CYSHCN care coordination, Parent to Parent, Education Ombuds.
   */
  noEligibilityBarriers: boolean;

  /** Help types this program addresses. Used for prioritization against requested help. */
  addresses: HelpType[];

  /** Local contact varies by county (CYSHCN, Kinship, P2P, NDCs). */
  hasCountyLocalContact: boolean;
}

// ---------------------------------------------------------------------------
// RESULTS (what the engine outputs)
// ---------------------------------------------------------------------------

/**
 * Honest confidence levels. We never say "you are approved".
 * - likelyEligible: strong match on primary criteria.
 * - mayQualify: depends on details we cannot fully determine.
 * - noBarriers: anyone can access this program.
 * - notLikely: a required criterion appears not to be met.
 */
export type Confidence =
  | "likelyEligible"
  | "mayQualify"
  | "noBarriers"
  | "notLikely";

/** A single reason contributing to a result, shown in the "why" section. */
export interface MatchReason {
  effect: RuleEffect;
  reason: string;
  citation: Citation;
}

/** The evaluated result for one program. */
export interface ProgramResult {
  program: Program;
  confidence: Confidence;
  /** Raw numeric score (higher = stronger match). For sorting/debugging. */
  score: number;
  /** Whether the family requested a help type this program addresses. */
  matchesRequestedHelp: boolean;
  /** Whether the family is already enrolled (per their answers). */
  alreadyEnrolled: boolean;
  /** Position in the recommended application order (1-based). */
  applyOrder: number;
  /** Plain-language reasons the engine reached this result. */
  reasons: MatchReason[];
  /** Short "why this first" note for the action plan, if applicable. */
  whyThisOrder?: string;
}

/** The complete result set returned to the UI. */
export interface MatchResult {
  /** Programs the family likely qualifies for or can access, in apply order. */
  recommended: ProgramResult[];
  /** Programs evaluated as not likely a fit (kept for transparency). */
  notLikely: ProgramResult[];
  /** Count summary for the results header. */
  summary: {
    likelyEligible: number;
    mayQualify: number;
    noBarriers: number;
    total: number;
  };
  /** The standard disclaimer to display with every result set. */
  disclaimer: string;
}
