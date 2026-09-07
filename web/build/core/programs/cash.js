/**
 * Cash benefit programs: SSI and TANF.
 */
import { alwaysPasses, incomeAtOrBelow, supportLevelIsOneOf, } from "../ruleHelpers.js";
export const ssi = {
    id: "ssi",
    category: "cash",
    agency: "SSA",
    agencyName: "Social Security Administration (federal)",
    content: {
        humanName: "Monthly cash to help with the extra costs of a disability",
        officialName: "Supplemental Security Income (SSI)",
        oneLiner: "A monthly cash payment (up to about $994) for children with disabilities in families with limited income and savings.",
        exampleFirst: "Imagine the extra costs of raising your child, special equipment, therapies, missed work, add up fast. SSI is a monthly check from the federal government to help with those costs, for children whose disability seriously affects daily life and whose family has limited income. (Officially Supplemental Security Income, or SSI.)",
        whatYouGet: [
            "Up to about $994 per month in 2026",
            "Automatic Apple Health (Medicaid) coverage in Washington once approved",
            "A benefit that can continue and be re-evaluated at age 18",
        ],
        tips: [
            "It is about how much the disability affects daily life, not just the diagnosis.",
            "Expect a denial the first time for many families, and always appeal. Many families win at the hearing stage.",
            "Getting SSI automatically gives your child full Apple Health coverage in Washington.",
            "At 18, the review uses adult rules and parents' income no longer counts, so some children who were denied qualify then.",
        ],
    },
    apply: {
        url: "https://www.ssa.gov/ssi/text-apply-ussi.htm",
        phone: "1-800-772-1213",
        steps: [
            "Call 1-800-772-1213 to start an application.",
            "Gather medical, school, and therapy records that show daily impact.",
            "Complete the application and the parent function report.",
            "If denied, appeal. Consider a disability advocate who works on contingency.",
        ],
        documents: [
            "Medical records and diagnosis",
            "Psychological or neuropsychological evaluations",
            "IEP and school records",
            "Therapy notes (speech, OT, ABA)",
            "A parent description of daily challenges",
        ],
    },
    citations: [
        { label: "SSI for children", url: "https://www.ssa.gov/ssi/text-child-ussi.htm" },
        { label: "SSI 2026 amount", url: "https://www.ssa.gov/ssi/amount" },
        { label: "SSI auto Apple Health (WAC 182-505-0210)", url: "https://app.leg.wa.gov/wac/default.aspx?cite=182-505-0210" },
    ],
    dependsOn: [],
    unlocks: ["appleHealth"],
    noEligibilityBarriers: false,
    addresses: ["cash"],
    hasCountyLocalContact: false,
    rules: [
        supportLevelIsOneOf({
            id: "ssi-severity",
            description: "The disability must cause marked and severe functional limitations.",
            citation: { label: "SSI childhood disability standard", url: "https://www.ssa.gov/ssi/text-child-ussi.htm" },
            levels: ["moderate", "significant"],
            required: false,
            weight: 3,
            passReason: "Your child's level of daily support suggests the disability may significantly affect functioning, which SSI looks for.",
            failReason: "SSI requires a disability that seriously affects daily life. Milder needs are less likely to qualify.",
        }),
        incomeAtOrBelow({
            id: "ssi-income",
            description: "SSI has strict income and resource limits, with parental income partly counted (deeming).",
            citation: { label: "SSI deeming", url: "https://www.ssa.gov/ssi/spotlights/spot-deeming.htm" },
            monthlyThreshold: 4000,
            required: false,
            weight: 2,
            passReason: "Your income range may fall within SSI limits after the deeming rules are applied.",
            failReason: "Higher household income often reduces or removes the SSI benefit for a child, though it is worth checking, especially near age 18.",
        }),
    ],
};
export const tanf = {
    id: "tanf",
    category: "cash",
    agency: "DSHS",
    agencyName: "DSHS Economic Services Administration",
    content: {
        humanName: "Monthly cash help for families with low income",
        officialName: "Temporary Assistance for Needy Families (TANF)",
        oneLiner: "Monthly cash to help low-income families with children cover rent, food, and basic needs.",
        exampleFirst: "Imagine you had to cut back on work to care for your child and money is tight for rent and groceries. TANF provides a monthly cash payment to help low-income families with children cover basic needs. (Officially Temporary Assistance for Needy Families, or TANF.)",
        whatYouGet: [
            "Monthly cash (about $706 for a family of three with no income)",
            "Possible child care help through Working Connections",
            "Transportation and job support if needed",
            "A possible exemption from work requirements if you care for a special needs child",
        ],
        tips: [
            "If you cannot work because you care for your special needs child full time, ask about the work-requirement exemption.",
            "If you receive SSI yourself, your child may still get child-only TANF with no time limit.",
            "TANF can bridge the gap while you wait for an SSI decision.",
        ],
    },
    apply: {
        url: "https://www.washingtonconnection.org",
        phone: "1-877-501-2233",
        steps: [
            "Apply online at washingtonconnection.org or by phone.",
            "Provide income, residency, and information about your children.",
            "Ask about a WorkFirst exemption if you care for a child with special needs.",
            "If eligible, monthly cash begins.",
        ],
        documents: [
            "Photo ID",
            "Proof of income",
            "Proof of residency",
            "Children's birth certificates and Social Security numbers",
        ],
    },
    citations: [
        { label: "TANF program", url: "https://www.dshs.wa.gov/esa/community-services-offices/temporary-assistance-needy-families" },
        { label: "WorkFirst exemptions", url: "https://www.dshs.wa.gov/esa/chapter-6-resolving-issues/68-exemptions" },
    ],
    dependsOn: [],
    unlocks: ["childCareRate"],
    noEligibilityBarriers: false,
    addresses: ["cash"],
    hasCountyLocalContact: false,
    rules: [
        incomeAtOrBelow({
            id: "tanf-income",
            description: "TANF is for low-income families with children.",
            citation: { label: "TANF eligibility", url: "https://www.dshs.wa.gov/esa/community-services-offices/temporary-assistance-needy-families" },
            monthlyThreshold: 2000,
            required: false,
            weight: 3,
            passReason: "Your income range is in the range TANF is designed to help.",
            failReason: "TANF is for very low-income families, so higher income usually does not qualify.",
        }),
        alwaysPasses({
            id: "tanf-children",
            description: "The family must include a minor child or a pregnant individual.",
            citation: { label: "Who is eligible for TANF (WAC 388-400-0005)", url: "https://app.leg.wa.gov/wac/default.aspx?cite=388-400-0005" },
            reason: "TANF is for families that include a minor child.",
            weight: 1,
        }),
    ],
};
