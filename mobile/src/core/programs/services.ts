/**
 * Disability services programs: DDA, ESIT, CYSHCN, Respite.
 */

import type { Program } from "../types.ts";
import {
  ageInRange,
  alwaysPasses,
  diagnosisStatusIsOneOf,
  hasAnyCondition,
  hasAnySpecificNeed,
  livingIsOneOf,
} from "../ruleHelpers.ts";

export const dda: Program = {
  id: "dda",
  category: "services",
  agency: "DSHS",
  agencyName: "Developmental Disabilities Administration (DSHS)",
  content: {
    humanName: "Help with daily care, therapies, and caregiver breaks",
    officialName: "Developmental Disabilities Administration (DDA)",
    oneLiner:
      "The main gateway to services like in-home care, respite breaks, therapies, and specialized waivers for children with developmental disabilities.",
    exampleFirst:
      "Imagine you need a trained helper to assist your child with daily tasks, plus regular breaks so you do not burn out. DDA is the doorway to all of that. Once your child is enrolled, it opens access to in-home care, respite, and special programs called waivers. (Officially the Developmental Disabilities Administration, or DDA.)",
    whatYouGet: [
      "A trained helper for daily tasks like bathing, dressing, and eating",
      "Respite care so you can rest or run errands",
      "Access to five waiver programs with therapies and support",
      "Skills training and, later, employment support",
      "A case manager to help coordinate services",
    ],
    tips: [
      "Enrolling in DDA is the first step. It is separate from requesting specific services.",
      "Your child usually needs Apple Health to receive DDA waiver services.",
      "Start early. Some waivers have waitlists, and being enrolled keeps your options open.",
    ],
  },
  apply: {
    url: "https://www.dshs.wa.gov/dda/consumers-and-families/eligibility",
    steps: [
      "Submit a DDA eligibility application (you can do this at any age).",
      "DDA reviews whether your child meets developmental disability criteria.",
      "If eligible, your child is enrolled in DDA.",
      "Then request specific services or a waiver.",
    ],
    documents: [
      "Diagnosis and medical records",
      "Psychological or developmental evaluations",
      "Proof of Washington residency",
      "Apple Health information (if enrolled)",
    ],
  },
  citations: [
    { label: "DDA", url: "https://www.dshs.wa.gov/dda" },
    { label: "DDA eligibility", url: "https://www.dshs.wa.gov/dda/consumers-and-families/eligibility" },
  ],
  dependsOn: ["appleHealth"],
  unlocks: ["respite", "ddetf"],
  noEligibilityBarriers: false,
  addresses: ["therapy", "respite", "navigation"],
  hasCountyLocalContact: false,
  rules: [
    hasAnyCondition({
      id: "dda-condition",
      description: "Serves people with developmental disabilities that began before age 18.",
      citation: { label: "How to enroll in DDA", url: "https://www.dshs.wa.gov/dda/consumers-and-families/eligibility" },
      conditions: ["autism", "idd", "other"],
      required: true,
      weight: 4,
      passReason: "Your child's condition may meet DDA developmental disability criteria.",
      failReason: "DDA serves developmental disabilities like autism or intellectual disability. Other conditions may not meet its criteria.",
      suspectedCountsAsMaybe: true,
    }),
    alwaysPasses({
      id: "dda-note-eligibility",
      description: "Final DDA eligibility is determined by an assessment.",
      citation: { label: "DDA enrollment", url: "https://www.dshs.wa.gov/dda/consumers-and-families/eligibility" },
      reason: "DDA confirms eligibility through its own assessment process.",
      weight: 1,
    }),
  ],
};

export const esit: Program = {
  id: "esit",
  category: "services",
  agency: "DCYF",
  agencyName: "Department of Children, Youth, and Families",
  content: {
    humanName: "Early therapy and support for babies and toddlers",
    officialName: "Early Support for Infants and Toddlers (ESIT)",
    oneLiner:
      "Free early therapy and family support for children from birth to age 3 who have delays or disabilities.",
    exampleFirst:
      "Imagine your 18-month-old is not talking yet or is slow to reach milestones, and you are worried. ESIT sends specialists to evaluate your child and provide therapy like speech and physical therapy, often in your home, at no cost. (Officially Early Support for Infants and Toddlers, or ESIT.)",
    whatYouGet: [
      "Developmental evaluation at no cost",
      "Speech, occupational, and physical therapy",
      "A service coordinator to guide your family",
      "A whole-family plan called an IFSP",
    ],
    tips: [
      "You do not need a doctor's referral to ask for an evaluation.",
      "This is for children under 3. Around age 3, the school system takes over with an IEP.",
      "Services are family-centered and often happen in your home.",
    ],
  },
  apply: {
    url: "https://www.dcyf.wa.gov/services/child-development-supports/esit",
    phone: "1-800-322-2588",
    steps: [
      "Call the Help Me Grow WA Hotline at 1-800-322-2588.",
      "Give written permission for an early intervention evaluation.",
      "If a delay or disability is found, ESIT develops an IFSP with you.",
      "Services begin based on the plan.",
    ],
    documents: [
      "Any existing medical or developmental records",
      "Proof of the child's date of birth",
    ],
  },
  citations: [
    { label: "ESIT program", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
    { label: "Early intervention (PAVE)", url: "https://wapave.org/early-intervention-how-to-access-services-for-children-birth-to-3-in-washington/" },
  ],
  dependsOn: [],
  unlocks: ["specialEducation"],
  noEligibilityBarriers: false,
  addresses: ["therapy", "navigation"],
  hasCountyLocalContact: true,
  rules: [
    ageInRange({
      id: "esit-age",
      description: "Serves children from birth to age 3.",
      citation: { label: "ESIT", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
      minBand: "under3",
      maxBand: "under3",
      required: true,
      weight: 4,
      passReason: "Your child is under 3, the age ESIT serves.",
      failReason: "ESIT is only for children under 3. For older children, look at school special education.",
    }),
    hasAnyCondition({
      id: "esit-delay",
      description: "For children with a developmental delay or disability.",
      citation: { label: "ESIT eligibility", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
      conditions: ["autism", "idd", "speech", "sensory", "other", "suspected"],
      required: false,
      weight: 2,
      passReason: "A delay or disability may qualify your child for an evaluation.",
      failReason: "ESIT focuses on developmental delays or disabilities.",
      suspectedCountsAsMaybe: true,
    }),
    diagnosisStatusIsOneOf({
      id: "esit-no-diagnosis-needed",
      description: "ESIT helps even without a diagnosis. Concerns alone are enough to ask for an evaluation.",
      citation: { label: "ESIT", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
      statuses: ["diagnosed", "inProcess", "none"],
      required: false,
      weight: 1,
      passReason: "You do not need a diagnosis. If you have any concern, you can request a free evaluation.",
      failReason: "",
    }),
  ],
};

export const cyshcn: Program = {
  id: "cyshcn",
  category: "services",
  agency: "DOH",
  agencyName: "Washington State Department of Health",
  content: {
    humanName: "A free guide to help you find and connect services",
    officialName: "Children and Youth with Special Health Care Needs (CYSHCN)",
    oneLiner:
      "A free helper who connects your family to the right services, evaluations, and providers, with no eligibility barriers.",
    exampleFirst:
      "Imagine your child sees several specialists and none of them talk to each other, and you feel lost. A CYSHCN coordinator acts as your guide, connecting the pieces and helping you find evaluations and providers. Anyone can use it. (Officially the Children and Youth with Special Health Care Needs program.)",
    whatYouGet: [
      "A local coordinator who helps you navigate services",
      "Referrals to Neurodevelopmental Centers for evaluation and therapy",
      "Connections to feeding teams, autism centers, and specialists",
      "Help planning the move from child to adult services",
    ],
    tips: [
      "There are no eligibility requirements, so this is a great first call if you feel lost.",
      "Every county has a coordinator you can contact.",
      "It works alongside DDA, Apple Health, and schools, not instead of them.",
    ],
  },
  apply: {
    url: "https://www.doh.wa.gov/CYSHCN",
    phone: "1-800-525-0127",
    steps: [
      "Call the state line at 1-800-525-0127 or your county health department.",
      "Ask for the CYSHCN coordinator.",
      "Explain your child's needs and what you are trying to find.",
      "The coordinator connects you to services and providers.",
    ],
    documents: [
      "No documents required to start",
    ],
  },
  citations: [
    { label: "CYSHCN program", url: "https://www.doh.wa.gov/CYSHCN" },
    { label: "CYSHCN partners and NDCs", url: "https://doh.wa.gov/am/node/8946" },
  ],
  dependsOn: [],
  unlocks: [],
  noEligibilityBarriers: true,
  addresses: ["navigation", "therapy"],
  hasCountyLocalContact: true,
  rules: [
    ageInRange({
      id: "cyshcn-age",
      description: "Serves children from birth to 18.",
      citation: { label: "CYSHCN eligibility", url: "https://doh.wa.gov/you-and-your-family/infants-and-children/health-and-safety/children-and-youth-special-health-care-needs" },
      minBand: "under3",
      maxBand: "13to17",
      required: false,
      weight: 1,
      passReason: "CYSHCN serves children from birth to 18.",
      failReason: "CYSHCN focuses on children under 18, though older youth can ask about transition help.",
    }),
    alwaysPasses({
      id: "cyshcn-open",
      description: "No eligibility requirements to access CYSHCN coordination.",
      citation: { label: "CYSHCN", url: "https://www.doh.wa.gov/CYSHCN" },
      reason: "There are no eligibility barriers. Any family with a child who has special health needs can use it.",
      weight: 2,
    }),
  ],
};

export const respite: Program = {
  id: "respite",
  category: "services",
  agency: "DSHS",
  agencyName: "Developmental Disabilities Administration (DSHS)",
  content: {
    humanName: "Trusted care for your child so you can take a break",
    officialName: "Respite Care (through DDA)",
    oneLiner:
      "Short-term care from a trained helper so you, the main caregiver, can rest, run errands, or take a break.",
    exampleFirst:
      "Imagine you have not slept a full night in months because your child wakes often, and you are exhausted. Respite care sends a trained, caring helper to watch your child so you can rest or take time for yourself. It is short-term help focused on giving you a break. (Officially Respite Care through DDA.)",
    whatYouGet: [
      "A trained helper who cares for your child for a set number of hours",
      "Care in your home or at an approved setting",
      "A break for you as the primary caregiver",
      "Hours are based on an assessment in your service plan",
    ],
    tips: [
      "A respite helper can be a relative or family friend, as long as they are not the main caregiver.",
      "Enhanced Respite for children can be up to 30 days per calendar year.",
      "You usually access respite through a DDA waiver, so enroll in DDA first.",
    ],
  },
  apply: {
    url: "https://www.dshs.wa.gov/dda/respite",
    steps: [
      "Enroll your child in DDA and request a waiver.",
      "Ask your DDA case manager about respite hours.",
      "Respite hours are assessed and added to your service plan.",
      "Choose a qualified respite provider.",
    ],
    documents: [
      "DDA enrollment confirmation",
      "Current service plan",
    ],
  },
  citations: [
    { label: "DDA Respite", url: "https://www.dshs.wa.gov/dda/respite" },
    { label: "Respite rules (WAC 388-845-1620)", url: "https://app.leg.wa.gov/WAC/default.aspx?cite=388-845-1620" },
    { label: "Enhanced Respite for children (Policy 4.03)", url: "https://manuals.dshs.wa.gov/sites/default/files/DDA/dda/documents/policy/policy4.03.pdf" },
  ],
  dependsOn: ["dda"],
  unlocks: [],
  noEligibilityBarriers: false,
  addresses: ["respite"],
  hasCountyLocalContact: false,
  rules: [
    hasAnyCondition({
      id: "respite-condition",
      description: "Respite is a DDA waiver service, so the child needs a qualifying developmental disability.",
      citation: { label: "DDA respite", url: "https://www.dshs.wa.gov/dda/respite" },
      conditions: ["autism", "idd", "other"],
      required: true,
      weight: 3,
      passReason: "Your child's condition may qualify for DDA, which provides respite.",
      failReason: "Respite through DDA requires a qualifying developmental disability.",
      suspectedCountsAsMaybe: true,
    }),
    hasAnySpecificNeed({
      id: "respite-intensive-needs",
      description: "Families facing intense behaviors, safety supervision, or sleep disruption benefit most from respite.",
      citation: { label: "DDA respite", url: "https://www.dshs.wa.gov/dda/respite" },
      needs: ["behavior", "safety", "sleep", "medical"],
      weight: 2,
      boostReason: "Because your child needs intensive supervision, a caregiver break through respite is especially relevant.",
    }),
  ],
};
