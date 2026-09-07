/**
 * Family support programs: Kinship Care and Parent to Parent.
 */
import { alwaysPasses, livingIsOneOf } from "../ruleHelpers.js";
export const kinship = {
    id: "kinship",
    category: "support",
    agency: "DSHS",
    agencyName: "DSHS Aging and Long-Term Support Administration",
    content: {
        humanName: "Support if you are a relative raising a child",
        officialName: "Kinship Care and Kinship Caregivers Support Program (KCSP)",
        oneLiner: "Support, information, and some financial help for relatives or close family friends raising a child.",
        exampleFirst: "Imagine you are a grandparent suddenly raising your grandchild and you do not know where to turn for help. Kinship programs connect you to information, referrals, and some financial support, even if you are not part of the formal foster system. (Officially Kinship Care and the Kinship Caregivers Support Program, or KCSP.)",
        whatYouGet: [
            "A Kinship Navigator who connects you to services",
            "Some financial help for urgent needs (KCSP)",
            "Help with child care, food, and health coverage",
            "Access to child-only TANF cash with no income test on you",
        ],
        tips: [
            "You do not have to be part of the foster system to get help.",
            "The income test for helping the child has been repealed, so your income may not block support.",
            "A relative caring for a child can get child-only TANF with no time limit.",
        ],
    },
    apply: {
        url: "https://www.dshs.wa.gov/altsa/hcs/kinship-care/benefits",
        phone: "1-800-422-3263",
        steps: [
            "Call 1-800-422-3263 (press 8) or the Help Me Grow line at 1-800-322-2588.",
            "Ask for the Kinship Navigator in your county.",
            "Explain your situation and what you need.",
            "The navigator connects you to KCSP funds and other supports.",
        ],
        documents: [
            "Proof of your relationship to the child, if available",
            "Information about the child's needs",
        ],
    },
    citations: [
        { label: "Kinship Care benefits", url: "https://www.dshs.wa.gov/altsa/hcs/kinship-care/benefits" },
        { label: "KCSP (LTC Manual Ch. 17b)", url: "https://www.dshs.wa.gov/sites/default/files/ALTSA/hcs/documents/LTCManual/Chapter%2017b.pdf" },
    ],
    dependsOn: [],
    unlocks: ["tanf"],
    noEligibilityBarriers: false,
    addresses: ["cash", "navigation"],
    hasCountyLocalContact: true,
    rules: [
        livingIsOneOf({
            id: "kinship-living",
            description: "For children being raised by a relative or suitable person.",
            citation: { label: "Kinship Care", url: "https://www.dshs.wa.gov/node/298" },
            situations: ["withRelative"],
            required: true,
            weight: 4,
            passReason: "Your child is being raised by a relative, which is what kinship programs support.",
            failReason: "Kinship programs are specifically for relatives or family friends raising a child.",
        }),
    ],
};
export const parentToParent = {
    id: "parentToParent",
    category: "support",
    agency: "TheArc",
    agencyName: "The Arc of Washington",
    content: {
        humanName: "A parent who has been there, to talk to and lean on",
        officialName: "Parent to Parent (P2P)",
        oneLiner: "Free peer support that connects you with another parent who has raised a child with similar needs.",
        exampleFirst: "Imagine you just got a diagnosis and feel alone, wishing you could talk to someone who truly gets it. Parent to Parent matches you with a trained parent who has raised a child with similar needs, so you have someone to lean on and learn from. It is free, with no waitlist, and open to all families. (Officially Parent to Parent, or P2P.)",
        whatYouGet: [
            "A one-on-one match with an experienced parent mentor",
            "Emotional support and someone who understands",
            "Information and help finding your next step",
            "Local support groups and events",
        ],
        tips: [
            "It is free, has no waitlist, and welcomes all families.",
            "Coordinators are themselves parents of children with disabilities.",
            "Available in every Washington county.",
        ],
    },
    apply: {
        url: "https://arcwa.org/parent-to-parent",
        phone: "1-888-754-8798",
        steps: [
            "Find your county's Parent to Parent coordinator on arcwa.org.",
            "Reach out by phone or online.",
            "Share a little about your family and your child.",
            "Get matched with a trained parent mentor.",
        ],
        documents: [
            "No documents required",
        ],
    },
    citations: [
        { label: "The Arc WA Parent to Parent", url: "https://arcwa.org/parent-to-parent" },
        { label: "PAVE Parent to Parent", url: "https://wapave.org/parent-to-parent-p2p-connects-caregivers-statewide-for-support/" },
    ],
    dependsOn: [],
    unlocks: [],
    noEligibilityBarriers: true,
    addresses: ["navigation"],
    hasCountyLocalContact: true,
    rules: [
        alwaysPasses({
            id: "p2p-open",
            description: "Open to all families of children with disabilities or special health care needs.",
            citation: { label: "Parent to Parent", url: "https://arcwa.org/parent-to-parent" },
            reason: "Free peer support open to all families, with no waitlist and no cost.",
            weight: 2,
        }),
    ],
};
