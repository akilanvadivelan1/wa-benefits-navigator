import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button, ConfidenceBadge } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font } from "../theme.ts";
import type { MatchResult, ProgramId } from "../../src/core/types.ts";

interface Props {
  result: MatchResult;
  onOpenProgram: (id: ProgramId) => void;
  onRetake: () => void;
  onBrowse: () => void;
  onHome: () => void;
}

export function ResultsScreen({ result, onOpenProgram, onRetake, onBrowse, onHome }: Props) {
  const { t } = useLang();
  const r0 = t.results;
  const { recommended, notLikely, summary } = result;
  const first = recommended[0];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header onHome={onHome} />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.check}>
          <Text style={styles.checkMark}>✓</Text>
        </View>
        <Text style={styles.title}>
          {r0.titlePrefix} <Text style={styles.highlight}>{summary.total} {r0.titleSuffix}</Text>
        </Text>
        <Text style={styles.subtitle}>{r0.subtitle}</Text>

        {first ? (
          <View style={styles.callout}>
            <Text style={styles.calloutText}>
              <Text style={styles.calloutStrong}>{r0.startWith} ({first.program.content.officialName}). </Text>
              {first.whyThisOrder ?? r0.strongFirst}
            </Text>
          </View>
        ) : null}

        {recommended.map((r) => (
          <Pressable key={r.program.id} style={styles.card} onPress={() => onOpenProgram(r.program.id)}>
            <View style={styles.priority}>
              <Text style={styles.priorityText}>{r.applyOrder}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <View style={styles.cardTop}>
                <ConfidenceBadge confidence={r.confidence} />
              </View>
              <Text style={styles.agency}>{r.program.agencyName}</Text>
              <Text style={styles.name}>{r.program.content.humanName}</Text>
              <Text style={styles.official}>{r.program.content.officialName}</Text>
              <Text style={styles.desc}>{r.program.content.oneLiner}</Text>
              {r.whyThisOrder ? <Text style={styles.why}>{r.whyThisOrder}</Text> : null}
              {r.matchesRequestedHelp ? <Text style={styles.match}>{r0.matchesHelp}</Text> : null}
            </View>
            <Text style={styles.arrow}>›</Text>
          </Pressable>
        ))}

        {notLikely.length > 0 ? (
          <View style={styles.notLikely}>
            <Text style={styles.notLikelyTitle}>{r0.notLikelyTitle} ({notLikely.length})</Text>
            {notLikely.map((r) => {
              const reason = r.reasons.find((x) => x.effect === "fail");
              return (
                <Text key={r.program.id} style={styles.notLikelyItem}>
                  {r.program.content.officialName}{reason ? `. ${reason.reason}` : ""}
                </Text>
              );
            })}
          </View>
        ) : null}

        <View style={styles.actions}>
          <Button label={r0.retake} onPress={onRetake} variant="secondary" fullWidth />
          <Button label={r0.browseAll} onPress={onBrowse} variant="primary" fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  check: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.successLight, alignItems: "center", justifyContent: "center", alignSelf: "center", marginBottom: spacing.md },
  checkMark: { color: colors.successDark, fontSize: 26, fontWeight: "700" },
  title: { fontSize: font.h1, fontWeight: "700", color: colors.gray900, textAlign: "center", marginBottom: spacing.sm },
  highlight: { color: colors.primary },
  subtitle: { fontSize: font.small, color: colors.gray500, textAlign: "center", marginBottom: spacing.lg, lineHeight: 20 },
  callout: { backgroundColor: colors.infoLight, borderLeftWidth: 4, borderLeftColor: colors.info, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md },
  calloutText: { fontSize: font.small, color: colors.gray700, lineHeight: 20 },
  calloutStrong: { fontWeight: "700" },
  card: { flexDirection: "row", gap: spacing.md, backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray200, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  priority: { width: 32, height: 32, borderRadius: 16, backgroundColor: colors.primary, alignItems: "center", justifyContent: "center" },
  priorityText: { color: colors.white, fontWeight: "700" },
  cardTop: { flexDirection: "row", marginBottom: 4 },
  agency: { fontSize: 12, color: colors.gray500 },
  name: { fontSize: 16, fontWeight: "600", color: colors.gray900, marginTop: 2 },
  official: { fontSize: 12, color: colors.gray500 },
  desc: { fontSize: font.small, color: colors.gray700, marginTop: 4, lineHeight: 20 },
  why: { fontSize: 13, color: colors.primaryDark, fontStyle: "italic", marginTop: 4 },
  match: { fontSize: 12, color: colors.successDark, fontWeight: "600", marginTop: 4 },
  arrow: { fontSize: 24, color: colors.gray300, alignSelf: "center" },
  notLikely: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray200, borderStyle: "dashed", borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.sm },
  notLikelyTitle: { fontWeight: "600", color: colors.gray700, marginBottom: spacing.sm },
  notLikelyItem: { fontSize: 13, color: colors.gray500, marginBottom: 6, lineHeight: 18 },
  actions: { gap: spacing.md, marginTop: spacing.xl },
});
