/**
 * Public entry point for the portable core library.
 * The React web app (and later a mobile app) imports everything from here.
 */

export * from "./types.ts";
export { ALL_PROGRAMS, PROGRAMS_BY_ID, getProgram } from "./programs/index.ts";
export { matchPrograms, DISCLAIMER, CONFIDENCE_LABEL } from "./engine.ts";
export { WA_COUNTIES, isValidCounty } from "./counties.ts";
export { getLocalContact, COUNTY_LOCAL_PROGRAMS } from "./countyContacts.ts";
export type { LocalContact } from "./countyContacts.ts";
