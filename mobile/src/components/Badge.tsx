/**
 * Confidence badge. Same four states and colors as the web app, rendered as
 * a native pill.
 */

import { StyleSheet, Text, View } from "react-native";
import type { Confidence } from "../core/types.ts";
import { CONFIDENCE_LABEL } from "../core/engine.ts";
import { colors, font, radius, spacing } from "../theme.ts";

const STYLE_BY_CONFIDENCE: Record<Confidence, { bg: string; fg: string }> = {
  likelyEligible: { bg: colors.greenBg, fg: colors.green },
  noBarriers: { bg: colors.blueBg, fg: colors.blue },
  mayQualify: { bg: colors.yellowBg, fg: colors.yellow },
  notLikely: { bg: colors.grayBg, fg: colors.gray },
};

export const ConfidenceBadge = ({ confidence }: { confidence: Confidence }) => {
  const s = STYLE_BY_CONFIDENCE[confidence];
  return (
    <View style={[styles.badge, { backgroundColor: s.bg }]}>
      <Text style={[styles.text, { color: s.fg }]}>{CONFIDENCE_LABEL[confidence]}</Text>
    </View>
  );
};

export const GrayBadge = ({ label }: { label: string }) => (
  <View style={[styles.badge, { backgroundColor: colors.grayBg }]}>
    <Text style={[styles.text, { color: colors.gray }]}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  badge: {
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 1,
    borderRadius: radius.pill,
  },
  text: {
    fontSize: font.tiny,
    fontWeight: "700",
  },
});
