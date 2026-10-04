import { useMemo, useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation.ts";
import { matchPrograms } from "../core/engine.ts";
import { ConfidenceBadge, GrayBadge } from "../components/Badge.tsx";
import { PrimaryButton, SecondaryButton } from "../components/Buttons.tsx";
import { colors, font, radius, spacing } from "../theme.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Results">;

export const ResultsScreen = ({ navigation, route }: Props) => {
  const { answers } = route.params;
  const result = useMemo(() => matchPrograms(answers), [answers]);
  const { recommended, notLikely, summary } = result;
  const firstStep = recommended[0];
  const [showNotLikely, setShowNotLikely] = useState(false);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.header}>
        <View style={styles.check}>
          <Text style={styles.checkMark}>{"\u2713"}</Text>
        </View>
        <Text style={styles.title}>
          Your child may qualify for <Text style={styles.highlight}>{summary.total} programs</Text>
        </Text>
        <Text style={styles.subtitle}>
          Here are the programs we recommend, listed in the order you should apply. Tap any
          program to see what it does and how to apply.
        </Text>
        <View style={styles.headerActions}>
          <SecondaryButton label="Retake Quiz" onPress={() => navigation.navigate("Quiz")} />
        </View>
      </View>

      {firstStep ? (
        <View style={styles.callout}>
          <View style={styles.calloutIcon}>
            <Text style={styles.calloutIconText}>i</Text>
          </View>
          <Text style={styles.calloutText}>
            <Text style={styles.calloutStrong}>Start with #1 ({firstStep.program.content.officialName}). </Text>
            {firstStep.whyThisOrder ?? "This is a strong first step based on your answers."}
          </Text>
        </View>
      ) : null}

      {recommended.map((r) => (
        <Pressable
          key={r.program.id}
          onPress={() => navigation.navigate("Detail", { programId: r.program.id, county: answers.county, from: "results" })}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
          <View style={styles.priority}>
            <Text style={styles.priorityText}>{r.applyOrder}</Text>
          </View>
          <View style={styles.cardBody}>
            <View style={styles.cardTop}>
              <ConfidenceBadge confidence={r.confidence} />
              {r.alreadyEnrolled ? <GrayBadge label="Already enrolled" /> : null}
            </View>
            <Text style={styles.agency}>{r.program.agencyName}</Text>
            <Text style={styles.name}>{r.program.content.humanName}</Text>
            <Text style={styles.official}>{r.program.content.officialName}</Text>
            <Text style={styles.desc}>{r.program.content.oneLiner}</Text>
            {r.whyThisOrder ? <Text style={styles.why}>{r.whyThisOrder}</Text> : null}
            {r.matchesRequestedHelp ? <Text style={styles.match}>{"\u2713"} Matches the help you asked for</Text> : null}
          </View>
        </Pressable>
      ))}

      {notLikely.length > 0 ? (
        <View style={styles.notLikely}>
          <Pressable onPress={() => setShowNotLikely((v) => !v)} style={styles.notLikelyHeader}>
            <Text style={styles.notLikelyTitle}>
              Programs that are not likely a fit right now ({notLikely.length})
            </Text>
            <Text style={styles.notLikelyChevron}>{showNotLikely ? "\u25B2" : "\u25BC"}</Text>
          </Pressable>
          {showNotLikely
            ? notLikely.map((r) => {
                const reason = r.reasons.find((x) => x.effect === "fail");
                return (
                  <View key={r.program.id} style={styles.notLikelyItem}>
                    <Text style={styles.notLikelyName}>{r.program.content.officialName}</Text>
                    {reason ? <Text style={styles.notLikelyReason}>{reason.reason}</Text> : null}
                  </View>
                );
              })
            : null}
        </View>
      ) : null}

      <View style={styles.footer}>
        <PrimaryButton label="Browse all 15 programs" onPress={() => navigation.navigate("Browse")} />
      </View>

      <Text style={styles.disclaimer}>{result.disclaimer}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  header: { alignItems: "center", marginBottom: spacing.lg },
  check: { width: 56, height: 56, borderRadius: 28, backgroundColor: colors.greenBg, alignItems: "center", justifyContent: "center", marginBottom: spacing.md },
  checkMark: { color: colors.green, fontSize: 28, fontWeight: "900" },
  title: { fontSize: font.h2, fontWeight: "800", color: colors.text, textAlign: "center", lineHeight: 30 },
  highlight: { color: colors.primary },
  subtitle: { fontSize: font.small, color: colors.textMuted, textAlign: "center", lineHeight: 22, marginTop: spacing.sm },
  headerActions: { marginTop: spacing.lg, alignSelf: "stretch" },
  callout: { flexDirection: "row", gap: spacing.md, backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: spacing.lg, marginBottom: spacing.lg },
  calloutIcon: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  calloutIconText: { color: colors.white, fontWeight: "800", fontSize: font.small, fontStyle: "italic" },
  calloutText: { flex: 1, fontSize: font.small, color: colors.primaryDark, lineHeight: 20 },
  calloutStrong: { fontWeight: "800" },
  card: { flexDirection: "row", gap: spacing.md, backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border, marginBottom: spacing.md },
  pressed: { opacity: 0.85 },
  priority: { width: 32, height: 32, borderRadius: radius.pill, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  priorityText: { color: colors.white, fontWeight: "800", fontSize: font.body },
  cardBody: { flex: 1 },
  cardTop: { flexDirection: "row", gap: spacing.sm, marginBottom: spacing.xs, flexWrap: "wrap" },
  agency: { fontSize: font.tiny, fontWeight: "700", color: colors.textFaint },
  name: { fontSize: font.h3, fontWeight: "700", color: colors.text, marginTop: 2 },
  official: { fontSize: font.small, color: colors.textFaint, marginTop: 1 },
  desc: { fontSize: font.small, color: colors.textMuted, lineHeight: 21, marginTop: spacing.sm },
  why: { fontSize: font.small, color: colors.primaryDark, marginTop: spacing.sm, fontStyle: "italic" },
  match: { fontSize: font.tiny, color: colors.green, fontWeight: "700", marginTop: spacing.sm },
  notLikely: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.sm },
  notLikelyHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  notLikelyTitle: { flex: 1, fontSize: font.small, fontWeight: "700", color: colors.textMuted },
  notLikelyChevron: { fontSize: font.tiny, color: colors.textMuted, marginLeft: spacing.sm },
  notLikelyItem: { marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  notLikelyName: { fontSize: font.small, fontWeight: "700", color: colors.text },
  notLikelyReason: { fontSize: font.small, color: colors.textMuted, marginTop: 2, lineHeight: 20 },
  footer: { marginTop: spacing.lg },
  disclaimer: { fontSize: font.tiny, color: colors.textFaint, lineHeight: 18, marginTop: spacing.xl, textAlign: "center" },
});
