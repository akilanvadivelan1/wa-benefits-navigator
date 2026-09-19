/**
 * County-level local contacts for programs that are administered locally.
 *
 * Several programs (CYSHCN care coordination, Kinship Navigator, Parent to
 * Parent) are delivered through local offices that vary by county. Eligibility
 * is the same statewide, but the office you call depends on where you live.
 *
 * For counties where we do not yet have a verified direct local number, we
 * point families to the statewide intake line, which routes them to their
 * local office. This keeps guidance accurate rather than guessing numbers.
 *
 * Sources:
 *  - CYSHCN coordinators: https://doh.wa.gov/am/node/8946 and statewide line 1-800-525-0127
 *  - Kinship Navigator (via Area Agencies on Aging): 1-800-422-3263 (press 8)
 *  - Parent to Parent (via The Arc of WA, every county): https://arcwa.org/parent-to-parent
 */

import type { ProgramId } from "./types.ts";

export interface LocalContact {
  /** The program this contact is for. */
  programId: ProgramId;
  /** Organization or office name. */
  office: string;
  /** Phone number to call. */
  phone: string;
  /** Optional website. */
  url?: string;
  /** True if this is the statewide intake line (routes to local office). */
  isStatewideIntake: boolean;
  /** Short note on how to use this contact. */
  note: string;
}

/** Statewide intake lines used as the reliable default for every county. */
const STATEWIDE: Record<"cyshcn" | "kinship" | "parentToParent", LocalContact> = {
  cyshcn: {
    programId: "cyshcn",
    office: "CYSHCN Statewide Line",
    phone: "1-800-525-0127",
    url: "https://www.doh.wa.gov/CYSHCN",
    isStatewideIntake: true,
    note: "Call this line and ask for the CYSHCN coordinator in your county.",
  },
  kinship: {
    programId: "kinship",
    office: "WA State Kinship Navigator",
    phone: "1-800-422-3263",
    url: "https://www.dshs.wa.gov/altsa/hcs/kinship-care/benefits",
    isStatewideIntake: true,
    note: "Call and press 8, then ask for the Kinship Navigator serving your county.",
  },
  parentToParent: {
    programId: "parentToParent",
    office: "Parent to Parent (The Arc of Washington)",
    phone: "1-888-754-8798",
    url: "https://arcwa.org/parent-to-parent",
    isStatewideIntake: true,
    note: "Ask to be connected to the Parent to Parent coordinator in your county.",
  },
};

/**
 * Verified direct local contacts for specific counties. Where a county is not
 * listed for a program, the statewide intake line is used automatically.
 * Only well-established local offices with published numbers are included.
 */
const COUNTY_OVERRIDES: Record<string, Partial<Record<ProgramId, LocalContact>>> = {
  King: {
    cyshcn: {
      programId: "cyshcn",
      office: "King County CYSHCN Program",
      phone: "206-296-4610",
      url: "https://kingcounty.gov/en/dept/dph/health-safety/health-centers-programs-services/childrens-health/children-with-special-health-care-needs",
      isStatewideIntake: false,
      note: "King County residents can contact the local CYSHCN program directly.",
    },
    parentToParent: {
      programId: "parentToParent",
      office: "King County Parent to Parent (The Arc of King County)",
      phone: "206-364-6337",
      url: "https://arcofkingcounty.org",
      isStatewideIntake: false,
      note: "The Arc of King County hosts Parent to Parent for King County families.",
    },
  },
  Pierce: {
    parentToParent: {
      programId: "parentToParent",
      office: "Pierce County Parent to Parent (PAVE)",
      phone: "253-565-2266",
      url: "https://wapave.org/pierce-parent-to-parent/",
      isStatewideIntake: false,
      note: "PAVE hosts Parent to Parent for Pierce County families.",
    },
  },
};

/**
 * Get the best local contact for a program in a given county.
 * Falls back to the statewide intake line when no verified local number exists.
 */
export function getLocalContact(
  programId: ProgramId,
  county: string | undefined,
): LocalContact | undefined {
  const statewideKey =
    programId === "cyshcn"
      ? "cyshcn"
      : programId === "kinship"
        ? "kinship"
        : programId === "parentToParent"
          ? "parentToParent"
          : undefined;

  if (!statewideKey) return undefined; // program has no county-local contact

  if (county && COUNTY_OVERRIDES[county]?.[programId]) {
    return COUNTY_OVERRIDES[county][programId];
  }
  return STATEWIDE[statewideKey];
}

/** Programs that have a county-varying local contact. */
export const COUNTY_LOCAL_PROGRAMS: ProgramId[] = ["cyshcn", "kinship", "parentToParent"];
