/**
 * Education programs: Special Education (IEP/504), Child Care Rate, Education Ombuds.
 */

import type { Program } from "../types.ts";
import {
  ageInRange,
  alwaysPasses,
  incomeAtOrBelow,
} from "../ruleHelpers.ts";

export const specialEducation: Program = {
  id: "specialEducation",
  category: "education",
  agency: "OSPI",
  agencyName: "Office of Superintendent of Public Instruction",
  content: {
    humanName: "Free support and therapies at your child's school",
    officialName: "Special Education (IEP and Section 504 Plan)",
    oneLiner:
      "Free specialized instruction, therapies, and accommodations at school for students with disabilities.",
    exampleFirst:
      "Imagine your child struggles in class and needs speech therapy, extra help, or accommodations to learn. Public schools must provide these for free through a written plan. A stronger plan with specialized teaching is an IEP, and a lighter plan with accommodations is a 504 Plan. (These come from federal laws called IDEA and Section 504.)",
    whatYouGet: [
      "Specially designed instruction tailored to your child (IEP)",
      "Speech, occupational, and physical therapy during the school day",
      "Behavioral support and, if needed, a one-on-one aide",
      "Accommodations like extra time, breaks, and seating (504 Plan)",
      "Transition planning for life after high school (starting at 16)",
    ],
    tips: [
      "Put your request for an evaluation in writing and keep a copy.",
      "You do not need a medical diagnosis first. The school must evaluate if a disability is suspected.",
      "You are an equal member of the IEP team. The school cannot decide without you.",
      "Services are free, and the school cannot reduce them without your consent.",
    ],
  },
  apply: {
    url: "https://ospi.k12.wa.us/student-success/special-education",
    steps: [
      "Write a letter to your school requesting a special education evaluation.",
      "The school responds and, with your consent, evaluates your child at no cost.",
      "The team meets to decide if your child qualifies.",
      "If eligible, an IEP is written and services begin after you sign consent.",
    ],
    documents: [
      "Written evaluation request",
      "Any medical or private evaluations you have",
      "Examples of schoolwork or teacher notes, if available",
    ],
  },
  citations: [
    { label: "OSPI Special Education", url: "https://ospi.k12.wa.us/student-success/special-education" },
    { label: "Supports for students with disabilities (OEO)", url: "https://www.oeo.wa.gov/en/education-issues/supports-students-disabilities/introduction-special-education" },
  ],
  dependsOn: [],
  unlocks: ["educationOmbuds"],
  noEligibilityBarriers: false,
  addresses: ["school", "therapy"],
  hasCountyLocalContact: false,
  rules: [
    ageInRange({
      id: "specialEd-age",
      description: "Serves students ages 3 to 22.",
      citation: { label: "OSPI Special Education", url: "https://ospi.k12.wa.us/student-success/special-education" },
      minBand: "3to5",
      maxBand: "18to22",
      required: true,
      weight: 4,
      passReason: "Your child is school age (3 to 22), when special education is available.",
      failReason: "School special education serves ages 3 to 22. For children under 3, look at ESIT early intervention.",
    }),
    alwaysPasses({
      id: "specialEd-disability",
      description: "For students whose disability affects their ability to learn.",
      citation: { label: "What is special education (OEO)", url: "https://www.oeo.wa.gov/en/education-issues/supports-students-disabilities/what-special-education" },
      reason: "If a disability affects learning, your child may qualify for an IEP or a 504 Plan.",
      weight: 2,
    }),
  ],
};

export const childCareRate: Program = {
  id: "childCareRate",
  category: "education",
  agency: "DCYF",
  agencyName: "Department of Children, Youth, and Families",
  content: {
    humanName: "Extra help paying for child care that fits your child's needs",
    officialName: "Working Connections Child Care - Special Needs Rate",
    oneLiner:
      "Subsidized child care, plus extra payment when your child needs a higher level of care.",
    exampleFirst:
      "Imagine you need child care so you can work, but your child needs extra support that regular care cannot easily provide. Working Connections helps pay for child care, and the Special Needs Rate adds extra money so a provider can give your child the higher level of care they need. (Officially the Working Connections Child Care Special Needs Rate.)",
    whatYouGet: [
      "Help paying for licensed child care while you work",
      "Extra payment on top for a child with special needs",
      "Coverage for children with a verified need up to age 19 (vs 13 normally)",
    ],
    tips: [
      "The special needs rate raises the age limit to under 19 and adds extra funding.",
      "You will need to verify your child's special need.",
      "Receiving this does not count against the TANF time limit.",
    ],
  },
  apply: {
    url: "https://dcyf.wa.gov/services/earlylearning-childcare/getting-help/wccc",
    steps: [
      "Apply for Working Connections Child Care online.",
      "Confirm your household income is within the limit (about 60% of state median income, expanding to 75%).",
      "Ask about the special needs rate and provide verification of your child's need.",
      "Choose a licensed provider.",
    ],
    documents: [
      "Proof of income",
      "Proof of work or approved activity",
      "Verification of the child's special need",
    ],
  },
  citations: [
    { label: "Special Needs Rate", url: "https://www.dcyf.wa.gov/services/earlylearning-childcare/getting-help/wccc/special-needs-rate" },
    { label: "Special needs rate rule (WAC 110-15-0220)", url: "https://app.leg.wa.gov/wac/default.aspx?cite=110-15-0220" },
    { label: "WCCC overview", url: "https://dcyf.wa.gov/services/earlylearning-childcare/getting-help/wccc" },
  ],
  dependsOn: [],
  unlocks: [],
  noEligibilityBarriers: false,
  addresses: ["cash", "navigation"],
  hasCountyLocalContact: false,
  rules: [
    ageInRange({
      id: "childCare-age",
      description: "Special needs rate covers children under 19 with a verified need.",
      citation: { label: "WAC 110-15-0220", url: "https://app.leg.wa.gov/wac/default.aspx?cite=110-15-0220" },
      minBand: "under3",
      maxBand: "18to22",
      required: true,
      weight: 2,
      passReason: "With a verified special need, care can be covered for children under 19.",
      failReason: "This rate covers children under 19 with a verified special need.",
    }),
    incomeAtOrBelow({
      id: "childCare-income",
      description: "For families at or below about 60% of state median income (expanding to 75%).",
      citation: { label: "WCCC eligibility", url: "https://dcyf.wa.gov/services/earlylearning-childcare/getting-help/wccc" },
      monthlyThreshold: 6000,
      required: false,
      weight: 2,
      passReason: "Your income range may fall within the Working Connections limit.",
      failReason: "Working Connections has an income limit (about 60% of state median income, expanding to 75%).",
    }),
  ],
};

export const educationOmbuds: Program = {
  id: "educationOmbuds",
  category: "support",
  agency: "Governor",
  agencyName: "Governor's Office of the Education Ombuds",
  content: {
    humanName: "A free guide to help you work things out with the school",
    officialName: "Office of the Education Ombuds (OEO)",
    oneLiner:
      "A free, neutral state office that helps you understand your rights and resolve concerns with your child's public school.",
    exampleFirst:
      "Imagine the school says your child does not qualify for services and you do not know what to do next. The Education Ombuds is a free, neutral guide who explains your rights, helps you talk with the school, and shows you your options. (Officially the Governor's Office of the Education Ombuds, or OEO.)",
    whatYouGet: [
      "Answers to any K-12 education question",
      "Help understanding IEPs, 504 plans, and evaluations",
      "Support communicating with the school or district",
      "Guidance on complaints, mediation, and due process",
    ],
    tips: [
      "It is free and open to everyone. No income limits.",
      "Call them early, even for simple questions. That is what they are for.",
      "Free interpretation is available in more than 150 languages.",
    ],
  },
  apply: {
    url: "https://www.oeo.wa.gov",
    phone: "1-866-297-2597",
    steps: [
      "Call 1-866-297-2597 (Monday to Thursday) or use the online intake.",
      "Describe your concern or question.",
      "OEO helps you understand your rights and options.",
      "With your permission, they may contact the school to help resolve it.",
    ],
    documents: [
      "No documents required to start",
    ],
  },
  citations: [
    { label: "Office of the Education Ombuds", url: "https://www.oeo.wa.gov" },
    { label: "How OEO can help", url: "https://oeo.wa.gov/en/how-can-oeo-help" },
  ],
  dependsOn: [],
  unlocks: [],
  noEligibilityBarriers: true,
  addresses: ["school", "navigation"],
  hasCountyLocalContact: false,
  rules: [
    alwaysPasses({
      id: "oeo-open",
      description: "Open to anyone with a concern about a WA public K-12 student.",
      citation: { label: "OEO FAQ", url: "https://www.oeo.wa.gov/en/about-us/frequently-asked-questions" },
      reason: "Anyone with a question about a Washington public school student can use this free service.",
      weight: 2,
    }),
  ],
};
