/**
 * Shared visual theme for the native app. Mirrors the warm web palette so the
 * iOS app looks consistent with the website.
 */

export const colors = {
  primary: "#0E7C74",
  primaryLight: "#16A79B",
  primaryDark: "#0B5E58",
  primary50: "#F0FBF9",
  primary100: "#CFF3EE",
  accent: "#FB7185",
  accentDark: "#E11D48",
  accentSoft: "#FFF1F2",
  white: "#FFFFFF",
  bg: "#FBF9F6",
  gray100: "#F4F1EC",
  gray200: "#E7E2DA",
  gray300: "#D6CFC4",
  gray500: "#7A7266",
  gray700: "#4A443C",
  gray900: "#2A2620",
  success: "#10B981",
  successLight: "#D6F5E6",
  successDark: "#065F46",
  warningLight: "#FEF3C7",
  warningDark: "#92400E",
  info: "#3B82F6",
  infoLight: "#E4EDFB",
  infoDark: "#1E40AF",
};

export const radius = {
  sm: 8,
  md: 10,
  lg: 16,
  xl: 22,
  pill: 9999,
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const font = {
  display: 34,
  h1: 28,
  h2: 22,
  h3: 18,
  body: 16,
  small: 14,
  caption: 12,
};

/** Confidence badge colors, mirroring the web. */
export const confidenceStyle = {
  likelyEligible: { bg: colors.successLight, text: colors.successDark },
  noBarriers: { bg: colors.infoLight, text: colors.infoDark },
  mayQualify: { bg: colors.warningLight, text: colors.warningDark },
  notLikely: { bg: colors.gray100, text: colors.gray500 },
};

/** Category chip colors, mirroring the web. */
export const categoryStyle: Record<string, { bg: string; text: string }> = {
  health: { bg: "#DBEAFE", text: "#1E40AF" },
  services: { bg: "#E0E7FF", text: "#3730A3" },
  cash: { bg: "#D1FAE5", text: "#065F46" },
  education: { bg: "#FEF3C7", text: "#92400E" },
  savings: { bg: "#F3E8FF", text: "#6B21A8" },
  support: { bg: "#FCE7F3", text: "#9D174D" },
};
