/**
 * Reusable buttons matching the web app's primary/secondary/accent styles.
 */

import { Pressable, StyleSheet, Text } from "react-native";
import { colors, font, radius, spacing } from "../theme.ts";

interface Props {
  label: string;
  onPress: () => void;
}

export const PrimaryButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles.primary, pressed && styles.pressed]} accessibilityRole="button">
    <Text style={styles.primaryText}>{label}</Text>
  </Pressable>
);

export const AccentButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles.accent, pressed && styles.pressed]} accessibilityRole="button">
    <Text style={styles.primaryText}>{label}</Text>
  </Pressable>
);

export const SecondaryButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles.secondary, pressed && styles.pressed]} accessibilityRole="button">
    <Text style={styles.secondaryText}>{label}</Text>
  </Pressable>
);

export const GhostButton = ({ label, onPress }: Props) => (
  <Pressable onPress={onPress} style={({ pressed }) => [styles.base, styles.ghost, pressed && styles.pressed]} accessibilityRole="button">
    <Text style={styles.ghostText}>{label}</Text>
  </Pressable>
);

const styles = StyleSheet.create({
  base: {
    paddingVertical: spacing.md + 2,
    paddingHorizontal: spacing.xl,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  pressed: { opacity: 0.85 },
  primary: { backgroundColor: colors.primary },
  accent: { backgroundColor: colors.accent },
  primaryText: { color: colors.white, fontWeight: "700", fontSize: font.body },
  secondary: { backgroundColor: colors.cardAlt, borderWidth: 1, borderColor: colors.border },
  secondaryText: { color: colors.text, fontWeight: "700", fontSize: font.body },
  ghost: { backgroundColor: "transparent" },
  ghostText: { color: colors.textMuted, fontWeight: "600", fontSize: font.body },
});
