/**
 * Shared native UI building blocks used across screens.
 */

import { Pressable, Text, View, StyleSheet } from "react-native";
import type { ReactNode } from "react";
import { colors, radius, spacing, font, confidenceStyle } from "./theme.ts";
import { useLang } from "./i18n.tsx";
import type { Confidence } from "../src/core/types.ts";

/** Top header with the app name and an EN/ES language toggle. */
export function Header({ onHome }: { onHome?: () => void }) {
  const { lang, setLang } = useLang();
  return (
    <View style={styles.header}>
      <Pressable style={styles.logoRow} onPress={onHome} accessibilityRole="button">
        <View style={styles.logoDot}>
          <Text style={styles.logoCheck}>✓</Text>
        </View>
        <Text style={styles.logoText}>WA Benefits Navigator</Text>
      </Pressable>
      <View style={styles.langToggle}>
        <Pressable
          style={[styles.langBtn, lang === "en" && styles.langBtnActive]}
          onPress={() => setLang("en")}
        >
          <Text style={[styles.langBtnText, lang === "en" && styles.langBtnTextActive]}>EN</Text>
        </Pressable>
        <Pressable
          style={[styles.langBtn, lang === "es" && styles.langBtnActive]}
          onPress={() => setLang("es")}
        >
          <Text style={[styles.langBtnText, lang === "es" && styles.langBtnTextActive]}>ES</Text>
        </Pressable>
      </View>
    </View>
  );
}

type BtnVariant = "primary" | "secondary" | "accent" | "ghost";

export function Button({
  label,
  onPress,
  variant = "primary",
  fullWidth,
}: {
  label: string;
  onPress: () => void;
  variant?: BtnVariant;
  fullWidth?: boolean;
}) {
  const v = BTN_STYLE[variant];
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      style={({ pressed }) => [
        styles.btn,
        { backgroundColor: v.bg, borderColor: v.border, borderWidth: v.border ? 2 : 0 },
        fullWidth && { alignSelf: "stretch" },
        pressed && { opacity: 0.85 },
      ]}
    >
      <Text style={[styles.btnText, { color: v.text }]}>{label}</Text>
    </Pressable>
  );
}

const BTN_STYLE: Record<BtnVariant, { bg: string; text: string; border?: string }> = {
  primary: { bg: colors.primary, text: colors.white },
  accent: { bg: colors.accent, text: colors.white },
  secondary: { bg: colors.white, text: colors.primary, border: colors.primary },
  ghost: { bg: "transparent", text: colors.gray500 },
};

/** Colored confidence badge with the translated label. */
export function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const { t } = useLang();
  const s = confidenceStyle[confidence];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.badgeText, { color: s.text }]}>{t.confidence[confidence]}</Text>
    </View>
  );
}

/** A simple card surface. */
export function Card({ children, style }: { children: ReactNode; style?: object }) {
  return <View style={[styles.card, style]}>{children}</View>;
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.gray200,
  },
  logoRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flexShrink: 1 },
  logoDot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  logoCheck: { color: colors.white, fontWeight: "700", fontSize: 16 },
  logoText: { fontWeight: "700", fontSize: 15, color: colors.gray900, flexShrink: 1 },
  langToggle: {
    flexDirection: "row",
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.pill,
    overflow: "hidden",
    backgroundColor: colors.gray100,
  },
  langBtn: { paddingHorizontal: 12, paddingVertical: 6 },
  langBtnActive: { backgroundColor: colors.primary },
  langBtnText: { fontSize: 12, fontWeight: "700", color: colors.gray500 },
  langBtnTextActive: { color: colors.white },
  btn: {
    paddingHorizontal: spacing.xl,
    paddingVertical: 14,
    borderRadius: radius.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: { fontSize: font.body, fontWeight: "600" },
  badge: { paddingHorizontal: 10, paddingVertical: 3, borderRadius: radius.pill, alignSelf: "flex-start" },
  badgeText: { fontSize: 11, fontWeight: "700" },
  card: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
});
