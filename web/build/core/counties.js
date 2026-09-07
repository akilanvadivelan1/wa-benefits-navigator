/**
 * Washington counties. Used only to surface local contacts for programs that
 * are administered locally (CYSHCN, Kinship Navigator, Parent to Parent, NDCs).
 * County selection never changes eligibility, only which local office to call.
 */
export const WA_COUNTIES = [
    "Adams", "Asotin", "Benton", "Chelan", "Clallam", "Clark", "Columbia",
    "Cowlitz", "Douglas", "Ferry", "Franklin", "Garfield", "Grant",
    "Grays Harbor", "Island", "Jefferson", "King", "Kitsap", "Kittitas",
    "Klickitat", "Lewis", "Lincoln", "Mason", "Okanogan", "Pacific",
    "Pend Oreille", "Pierce", "San Juan", "Skagit", "Skamania", "Snohomish",
    "Spokane", "Stevens", "Thurston", "Wahkiakum", "Walla Walla", "Whatcom",
    "Whitman", "Yakima",
];
export function isValidCounty(name) {
    return WA_COUNTIES.includes(name);
}
