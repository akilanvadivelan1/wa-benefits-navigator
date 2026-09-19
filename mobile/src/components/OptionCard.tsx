/**
 * A selectable option card used throughout the quiz. Supports single-select
 * (radio-like) and multi-select (checkbox-like) via the `multi` flag.
 */

import { Pressable, StyleSheet, Text, View } from "react-native";
import { colors, font, radius, spacing } from "../theme.ts";

interface Props {
  label: string;
  description?: string;
  selected: boolean;
  multi?: boolean;
  onPress: () => void;
}

export const OptionCard = ({ label, description, selected, multi, onPress }: Props) => {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole={multi ? "checkbox" : "radio"}
      accessibilityState={{ selected, checked: selected }}
      style={({ pressed }) => [
        styles.card,
        selected && styles.cardSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.content}>
        <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
        {description ? <Text style={styles.desc}>{description}</Text> : null}
      </View>
      <View style={[styles.indicator, multi ? styles.square : styles.circle, selected && styles.indicatorOn]}>
        {selected ? <Text style={styles.check}>{"\u2713"}</Text> : null}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  cardSelected: {
    borderColor: colors.primary,
    backgroundColor: colors.primarySoft,
  },
  pressed: { opacity: 0.85 },
  content: { flex: 1 },
  label: { fontSize: font.body, fontWeight: "600", color: colors.text },
  labelSelected: { color: colors.primaryDark },
  desc: { marginTop: spacing.xs, fontSize: font.small, color: colors.textMuted, lineHeight: 20 },
  indicator: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: colors.textFaint,
    alignItems: "center",
    justifyContent: "center",
  },
  circle: { borderRadius: radius.pill },
  square: { borderRadius: radius.sm },
  indicatorOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  check: { color: colors.white, fontSize: font.tiny, fontWeight: "900" },
});
