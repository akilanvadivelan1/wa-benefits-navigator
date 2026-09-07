/**
 * Savings and financial planning programs: ABLE account and DDETF.
 */
import { alwaysPasses, hasAnyCondition } from "../ruleHelpers.js";
export const able = {
    id: "able",
    category: "savings",
    agency: "Treasurer",
    agencyName: "Office of the Washington State Treasurer",
    content: {
        humanName: "A savings account that will not cost your child their benefits",
        officialName: "WA State ABLE Savings Program",
        oneLiner: "A tax-advantaged savings account that lets your child save money without losing SSI or Medicaid.",
        exampleFirst: "Imagine you want to save for your child's future, but you are afraid that having more than $2,000 in savings will make them lose SSI or Medicaid. An ABLE account lets your family save well beyond that limit for disability-related needs, without losing benefits, and the growth is tax-free. (Officially the WA State ABLE Savings Program.)",
        whatYouGet: [
            "Save without affecting SSI or Medicaid eligibility",
            "Tax-free growth and tax-free withdrawals for qualified needs",
            "An ABLE Visa card for easy spending",
            "Use funds for education, housing, transportation, therapy, and more",
        ],
        tips: [
            "The disability must have started before age 26 to open an account.",
            "You control the account and can withdraw anytime for qualified disability expenses.",
            "Great for everyday disability costs and smaller savings, unlike a formal trust.",
        ],
    },
    apply: {
        url: "https://www.washingtonstateable.com",
        steps: [
            "Confirm the disability began before age 26.",
            "Open an account online at washingtonstateable.com.",
            "Set up contributions from family or friends.",
            "Use funds for qualified disability-related expenses.",
        ],
        documents: [
            "Proof of disability onset before age 26",
            "Basic identification and banking information",
        ],
    },
    citations: [
        { label: "WA State ABLE", url: "https://www.washingtonstateable.com" },
        { label: "HCA ABLE overview", url: "https://www.hca.wa.gov/node/16996" },
    ],
    dependsOn: [],
    unlocks: [],
    noEligibilityBarriers: false,
    addresses: ["savings"],
    hasCountyLocalContact: false,
    rules: [
        hasAnyCondition({
            id: "able-disability",
            description: "For people with a qualifying disability that began before age 26.",
            citation: { label: "WA State ABLE eligibility", url: "https://www.washingtonstateable.com" },
            conditions: ["autism", "idd", "adhd", "sensory", "learning", "speech", "other"],
            required: false,
            weight: 2,
            passReason: "A disability that began in childhood can qualify for an ABLE account.",
            failReason: "ABLE is for people with a disability that began before age 26.",
            suspectedCountsAsMaybe: true,
        }),
        alwaysPasses({
            id: "able-savings-help",
            description: "Especially useful for families who want to save.",
            citation: { label: "WA State ABLE benefits", url: "https://www.washingtonstateable.com/benefits" },
            reason: "Helpful for any family that wants to save for the future without risking benefits.",
            weight: 1,
        }),
    ],
};
export const ddetf = {
    id: "ddetf",
    category: "savings",
    agency: "Commerce",
    agencyName: "Washington State Department of Commerce",
    content: {
        humanName: "A protected trust to save larger amounts for your child's future",
        officialName: "Developmental Disabilities Endowment Trust Fund (DDETF)",
        oneLiner: "A state-run special needs trust that protects larger savings and inheritances without affecting benefits.",
        exampleFirst: "Imagine grandparents want to leave money for your child, or your child receives a settlement, but you worry it will disqualify them from SSI and Medicaid. This state-run trust holds that money safely so it does not count against benefits, and the state even matches part of your enrollment. (Officially the Developmental Disabilities Endowment Trust Fund, or DDETF.)",
        whatYouGet: [
            "A protected trust that keeps savings from counting against benefits",
            "A state match on part of your enrollment contribution",
            "Professional investment management",
            "Funds for life-enriching needs like education, recreation, and technology",
        ],
        tips: [
            "Your child must be DDA-eligible to open an account, so enroll in DDA first.",
            "A Trust I (family contributions) has no Medicaid payback, which is great for estate planning.",
            "You do not need a private attorney. State staff help you enroll.",
            "Best for larger sums. For everyday costs, an ABLE account may be simpler.",
        ],
    },
    apply: {
        url: "https://ddetf.wa.gov/process/",
        steps: [
            "Confirm your child is DDA-eligible.",
            "Get the enrollment forms from the DDETF website.",
            "Complete the Joinder Agreement and a disbursement plan.",
            "Sign, notarize, and submit with proof of DDA eligibility.",
        ],
        documents: [
            "Proof of DDA eligibility",
            "Completed and notarized Joinder Agreement",
            "Disbursement plan",
        ],
    },
    citations: [
        { label: "DDETF overview", url: "https://ddetf.wa.gov/overview/" },
        { label: "DDETF enrollment process", url: "https://ddetf.wa.gov/process/" },
        { label: "DDETF account types", url: "https://ddetf.wa.gov/accounts/" },
    ],
    dependsOn: ["dda"],
    unlocks: [],
    noEligibilityBarriers: false,
    addresses: ["savings"],
    hasCountyLocalContact: false,
    rules: [
        hasAnyCondition({
            id: "ddetf-disability",
            description: "Requires a developmental disability that meets DDA criteria.",
            citation: { label: "DDETF eligibility", url: "https://ddetf.wa.gov/process/" },
            conditions: ["autism", "idd", "other"],
            required: true,
            weight: 2,
            passReason: "Your child's condition may meet the DDA-based eligibility this trust requires.",
            failReason: "This trust requires a developmental disability that meets DDA criteria.",
            suspectedCountsAsMaybe: true,
        }),
    ],
};
