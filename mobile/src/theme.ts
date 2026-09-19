/**
 * Shared visual theme for the mobile app.
 *
 * Mirrors the web app's palette: a calm teal primary, soft accent red, and
 * the four confidence badge colors (green, blue, yellow, gray). Kept as plain
 * constants so any screen can import them without a styling framework.
 */

export const colors = {
  // Brand
  primary: "#0F766E",
  primaryDark: "#115E59",
  primarySoft: "#CCFBF1",
  accent: "#E11D48",
  accentSoft: "#FFE4E6",

  // Surfaces
  bg: "#F8FAFC",
  card: "#FFFFFF",
  cardAlt: "#F1F5F9",
  border: "#E2E8F0",

  // Text
  text: "#0F172A",
  textMuted: "#475569",
  textFaint: "#94A3B8",

  // Confidence badges (match web)
  green: "#065F46",
  greenBg: "#D1FAE5",
  blue: "#1E40AF",
  blueBg: "#DBEAFE",
  yellow: "#92400E",
  yellowBg: "#FEF3C7",
  gray: "#334155",
  grayBg: "#E2E8F0",

  white: "#FFFFFF",
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 999,
} as const;

export const font = {
  h1: 30,
  h2: 22,
  h3: 18,
  body: 16,
  small: 14,
  tiny: 12,
} as const;
