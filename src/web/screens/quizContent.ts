/**
 * Quiz question content, following the Example-First Principle.
 * Each option has a label and (optionally) a plain-language example/description.
 * The "why we ask" note explains why the question matters.
 */

import type {
  AgeBand,
  Condition,
  HelpType,
  IncomeBand,
  LivingSituation,
  SupportLevel,
} from "../../core/types.ts";

export interface Option<T> {
  value: T;
  label: string;
  description?: string;
}

export const AGE_OPTIONS: Option<AgeBand>[] = [
  { value: "under3", label: "Under 3 years old", description: "Birth to 2 years" },
  { value: "3to5", label: "3 to 5 years old", description: "Preschool age" },
  { value: "6to12", label: "6 to 12 years old", description: "Elementary or middle school" },
  { value: "13to17", label: "13 to 17 years old", description: "High school" },
  { value: "18to22", label: "18 to 22 years old", description: "Transition to adulthood" },
];

export const CONDITION_OPTIONS: Option<Condition>[] = [
  { value: "autism", label: "Autism Spectrum Disorder (ASD)", description: "Differences in social communication, behavior, or sensory processing." },
  { value: "adhd", label: "ADHD", description: "Trouble with attention, focus, or impulse control." },
  { value: "idd", label: "Intellectual or developmental disability", description: "Significant differences in learning and everyday skills that began in childhood." },
  { value: "sensory", label: "Sensory processing differences", description: "Strong reactions to sounds, textures, lights, or other input." },
  { value: "learning", label: "Learning disability", description: "For example, dyslexia (reading) or dyscalculia (math)." },
  { value: "speech", label: "Speech or language delay", description: "Trouble with talking or understanding language." },
  { value: "other", label: "Another neurodevelopmental condition", description: "Something not listed above." },
  { value: "suspected", label: "Not diagnosed yet, but we have concerns", description: "You suspect a delay or condition but do not have a diagnosis." },
];

export const SUPPORT_OPTIONS: Option<SupportLevel>[] = [
  {
    value: "mild",
    label: "A little extra help",
    description: 'For example, "My child gets dressed and eats on their own, but needs reminders to stay on task."',
  },
  {
    value: "moderate",
    label: "Regular daily support",
    description: 'For example, "My child needs help with daily tasks or has real trouble communicating what they need."',
  },
  {
    value: "significant",
    label: "Constant, hands-on support",
    description: 'For example, "My child needs someone with them at all times for safety and cannot do most tasks alone."',
  },
];

export const INCOME_OPTIONS: Option<IncomeBand>[] = [
  { value: "under2000", label: "Under $2,000 per month", description: "Likely qualifies for most income-based programs." },
  { value: "2000to4000", label: "$2,000 to $4,000 per month", description: "Likely qualifies for many income-based programs." },
  { value: "4000to6000", label: "$4,000 to $6,000 per month", description: "May qualify for some income-based programs." },
  { value: "6000to8000", label: "$6,000 to $8,000 per month", description: "May qualify for a few income-based programs." },
  { value: "over8000", label: "Over $8,000 per month", description: "Still eligible for many programs that do not look at income." },
  { value: "preferNotToSay", label: "I prefer not to say", description: "We will show all programs and note which ones depend on income." },
];

export const LIVING_OPTIONS: Option<LivingSituation>[] = [
  { value: "withParents", label: "Lives with a parent", description: "In the family home." },
  { value: "withRelative", label: "Lives with a relative", description: "For example, a grandparent, aunt, or uncle is the main caregiver." },
  { value: "foster", label: "In foster care", description: "Placed with a foster family." },
  { value: "other", label: "Another arrangement", description: "For example, a group home or residential setting." },
];

export const HELP_OPTIONS: Option<HelpType>[] = [
  { value: "health", label: "Health insurance or medical care" },
  { value: "therapy", label: "Therapy (ABA, speech, occupational, physical)" },
  { value: "cash", label: "Cash help or financial support" },
  { value: "school", label: "School support (IEP, 504, special education)" },
  { value: "respite", label: "A break from caregiving (respite)" },
  { value: "savings", label: "Saving for the future without losing benefits" },
  { value: "navigation", label: "Someone to help me figure it all out" },
];

export interface QuizStepMeta {
  title: string;
  helper: string;
  whyWeAsk: string;
  multi: boolean;
}

export const STEP_META: QuizStepMeta[] = [
  {
    title: "How old is your child?",
    helper: "Pick the range that fits. This is a starting point, not an exact age.",
    whyWeAsk: "Some programs are only for certain ages. For example, early therapy is for children under 3, and school services start at age 3.",
    multi: false,
  },
  {
    title: "What best describes your child?",
    helper: "Choose all that apply. If you are not sure, pick the last option.",
    whyWeAsk: "Some programs are built for specific conditions, like autism therapy. A diagnosis is not always required, but it helps us match you.",
    multi: true,
  },
  {
    title: "How much daily help does your child need?",
    helper: "Think about a normal day. There is no wrong answer.",
    whyWeAsk: "Some programs, like SSI cash benefits, require showing that a disability seriously affects daily life.",
    multi: false,
  },
  {
    title: "About how much does your household earn each month?",
    helper: "A rough range is fine. We never save this.",
    whyWeAsk: "Some programs are for families under a certain income. Others do not look at income at all, so this only helps us sort results.",
    multi: false,
  },
  {
    title: "Who does your child live with?",
    helper: "Choose the option that fits best.",
    whyWeAsk: "A few programs are built for specific situations. For example, some support relatives who are raising a child.",
    multi: false,
  },
  {
    title: "What kind of help are you looking for?",
    helper: "Choose all that apply. This helps us put the most useful programs first.",
    whyWeAsk: "We use this to prioritize your results. It does not remove any programs you might qualify for.",
    multi: true,
  },
];
