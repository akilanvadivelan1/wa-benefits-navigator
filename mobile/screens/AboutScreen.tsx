import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font } from "../theme.ts";

interface Props {
  onStartQuiz: () => void;
  onHome: () => void;
}

export function AboutScreen({ onStartQuiz, onHome }: Props) {
  const { t } = useLang();
  const a = t.about;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header onHome={onHome} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{a.title}</Text>
        <Text style={styles.lead}>{a.lead}</Text>

        <Block title={a.problemTitle} body={a.problemBody} />
        <Block title={a.approachTitle} body={a.approachBody} />
        <Block title={a.privacyTitle} body={a.privacyBody} />
        <Block title={a.roadmapTitle} body={a.roadmapBody} />

        <View style={styles.callout}>
          <Text style={styles.calloutText}>
            <Text style={styles.calloutStrong}>{a.disclaimerTitle}. </Text>
            {t.footer.disclaimer}
          </Text>
        </View>

        <View style={styles.cta}>
          <Text style={styles.ctaText}>{a.builtFor}</Text>
          <Button label={t.home.ctaPrimary} onPress={onStartQuiz} variant="accent" fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Block({ title, body }: { title: string; body: string }) {
  return (
    <View style={styles.block}>
      <Text style={styles.blockTitle}>{title}</Text>
      <Text style={styles.blockBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  title: { fontSize: font.h1, fontWeight: "700", color: colors.gray900, textAlign: "center", marginBottom: spacing.sm },
  lead: { fontSize: font.body, color: colors.gray700, textAlign: "center", lineHeight: 24, marginBottom: spacing.lg },
  block: { marginBottom: spacing.lg },
  blockTitle: { fontSize: font.h3, fontWeight: "600", color: colors.primaryDark, marginBottom: 6 },
  blockBody: { fontSize: font.small, color: colors.gray700, lineHeight: 22 },
  callout: { backgroundColor: colors.infoLight, borderLeftWidth: 4, borderLeftColor: colors.info, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.lg },
  calloutText: { fontSize: 13, color: colors.gray700, lineHeight: 20 },
  calloutStrong: { fontWeight: "700" },
  cta: { backgroundColor: colors.primary50, borderWidth: 1, borderColor: colors.primary100, borderRadius: radius.xl, padding: spacing.xl, alignItems: "center" },
  ctaText: { fontSize: 15, color: colors.gray700, marginBottom: spacing.md, textAlign: "center" },
});
