import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font } from "../theme.ts";

interface Props {
  onStartQuiz: () => void;
  onBrowse: () => void;
  onAbout: () => void;
  onSources: () => void;
}

export function HomeScreen({ onStartQuiz, onBrowse, onAbout, onSources }: Props) {
  const { t } = useLang();
  const h = t.home;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{h.badge}</Text>
        </View>
        <Text style={styles.title}>{h.titleLine1}</Text>
        <Text style={styles.titleAccent}>{h.titleLine2}</Text>
        <Text style={styles.subtitle}>{h.subtitle}</Text>

        <View style={styles.buttons}>
          <Button label={h.ctaPrimary} onPress={onStartQuiz} variant="accent" fullWidth />
          <Button label={h.ctaSecondary} onPress={onBrowse} variant="secondary" fullWidth />
        </View>

        <View style={styles.stats}>
          <Stat number="15+" label={h.statPrograms} />
          <Stat number={h.statTimeValue} label={h.statTime} />
          <Stat number="100%" label={h.statFree} />
        </View>

        <Text style={styles.privacy}>🔒 {h.privacy}</Text>

        <Text style={styles.sectionTitle}>{h.howTitle}</Text>
        <Step num="1" title={h.step1Title} body={h.step1Body} />
        <Step num="2" title={h.step2Title} body={h.step2Body} />
        <Step num="3" title={h.step3Title} body={h.step3Body} />

        <View style={styles.reassure}>
          <Text style={styles.reassureTitle}>{h.reassureTitle}</Text>
          <Text style={styles.reassureBody}>{h.reassureBody}</Text>
          <Button label={h.reassureCta} onPress={onStartQuiz} variant="accent" fullWidth />
        </View>

        <View style={styles.footerLinks}>
          <Pressable onPress={onAbout}><Text style={styles.footerLink}>{t.nav.about}</Text></Pressable>
          <Pressable onPress={onSources}><Text style={styles.footerLink}>{t.nav.sources}</Text></Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statNumber}>{number}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function Step({ num, title, body }: { num: string; title: string; body: string }) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNum}>
        <Text style={styles.stepNumText}>{num}</Text>
      </View>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.xl, paddingBottom: spacing.xxl * 2 },
  badge: {
    alignSelf: "flex-start",
    backgroundColor: colors.primary100,
    borderRadius: radius.pill,
    paddingHorizontal: 14,
    paddingVertical: 6,
    marginBottom: spacing.md,
  },
  badgeText: { color: colors.primaryDark, fontWeight: "600", fontSize: 13 },
  title: { fontSize: font.display, fontWeight: "700", color: colors.gray900, lineHeight: 40 },
  titleAccent: { fontSize: font.display, fontWeight: "700", color: colors.primary, lineHeight: 40, marginBottom: spacing.lg },
  subtitle: { fontSize: font.body, color: colors.gray700, lineHeight: 24, marginBottom: spacing.xl },
  buttons: { gap: spacing.md, marginBottom: spacing.xl },
  stats: {
    flexDirection: "row",
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.pill,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
  },
  stat: { flex: 1, alignItems: "center" },
  statNumber: { fontSize: 22, fontWeight: "700", color: colors.primary },
  statLabel: { fontSize: 12, color: colors.gray500 },
  privacy: { fontSize: 13, color: colors.gray500, textAlign: "center", marginBottom: spacing.xxl },
  sectionTitle: { fontSize: font.h2, fontWeight: "600", textAlign: "center", marginBottom: spacing.lg, color: colors.gray900 },
  stepCard: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  stepNum: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  stepNumText: { color: colors.white, fontWeight: "700", fontSize: 18 },
  stepTitle: { fontSize: font.h3, fontWeight: "600", marginBottom: 4, color: colors.gray900 },
  stepBody: { fontSize: font.small, color: colors.gray500, lineHeight: 20 },
  reassure: {
    backgroundColor: colors.primary50,
    borderWidth: 1,
    borderColor: colors.primary100,
    borderRadius: radius.xl,
    padding: spacing.xl,
    marginTop: spacing.lg,
    alignItems: "center",
  },
  reassureTitle: { fontSize: font.h2, fontWeight: "600", textAlign: "center", marginBottom: spacing.sm, color: colors.gray900 },
  reassureBody: { fontSize: font.small, color: colors.gray700, lineHeight: 22, textAlign: "center", marginBottom: spacing.lg },
  footerLinks: { flexDirection: "row", justifyContent: "center", gap: spacing.xl, marginTop: spacing.xl },
  footerLink: { color: colors.primary, fontWeight: "600", fontSize: font.small },
});
