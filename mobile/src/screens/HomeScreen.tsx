import { ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation.ts";
import { PrimaryButton, SecondaryButton } from "../components/Buttons.tsx";
import { colors, font, radius, spacing } from "../theme.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const STEPS = [
  {
    num: "1",
    title: "Answer a few questions",
    body: "Tell us about your child's age, needs, and your family situation. Every question is explained in plain language with examples. It takes about 2 minutes.",
  },
  {
    num: "2",
    title: "Get matched",
    body: "We check your answers against every program's real eligibility rules and show what your family likely qualifies for, with honest confidence levels.",
  },
  {
    num: "3",
    title: "Take action",
    body: "Get a step-by-step plan in the order you should apply, with direct links, phone numbers, and the documents to gather.",
  },
];

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <View style={styles.hero}>
        <View style={styles.badge}>
          <View style={styles.badgeDot} />
          <Text style={styles.badgeText}>For Washington families</Text>
        </View>
        <Text style={styles.title}>You are not alone in this.</Text>
        <Text style={styles.titleAccent}>Let us help you find support.</Text>
        <Text style={styles.subtitle}>
          Raising a neuro-divergent or special needs child is a journey, and Washington has
          more than 15 programs to help. Answer a few gentle, plain-language questions and get
          a personalized plan that shows what your family likely qualifies for and exactly how
          to start.
        </Text>

        <View style={styles.buttons}>
          <PrimaryButton label="Find programs for my child" onPress={() => navigation.navigate("Quiz")} />
          <SecondaryButton label="Browse all programs" onPress={() => navigation.navigate("Browse")} />
        </View>

        <View style={styles.stats}>
          <Stat number="15+" label="Programs" />
          <Stat number="2 min" label="To get started" />
          <Stat number="100%" label="Free and private" />
        </View>

        <Text style={styles.privacy}>
          {"\uD83D\uDD12"} Your answers stay on your device. Nothing is saved or sent anywhere.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How it works</Text>
        {STEPS.map((s) => (
          <View key={s.num} style={styles.stepCard}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{s.num}</Text>
            </View>
            <Text style={styles.stepTitle}>{s.title}</Text>
            <Text style={styles.stepBody}>{s.body}</Text>
          </View>
        ))}
      </View>

      <View style={styles.reassure}>
        <Text style={styles.reassureTitle}>We know this can feel overwhelming</Text>
        <Text style={styles.reassureBody}>
          You do not have to figure it out alone. We explain every program in plain language,
          lead with real examples, and always point you to the official source so you can trust
          what you read.
        </Text>
        <PrimaryButton label="Start the 2 minute quiz" onPress={() => navigation.navigate("Quiz")} />
      </View>
    </ScrollView>
  );
};

const Stat = ({ number, label }: { number: string; label: string }) => (
  <View style={styles.stat}>
    <Text style={styles.statNumber}>{number}</Text>
    <Text style={styles.statLabel}>{label}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  hero: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    backgroundColor: colors.primarySoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    marginBottom: spacing.lg,
  },
  badgeDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: colors.primary },
  badgeText: { color: colors.primaryDark, fontWeight: "700", fontSize: font.tiny },
  title: { fontSize: font.h1, fontWeight: "800", color: colors.text, lineHeight: 36 },
  titleAccent: { fontSize: font.h1, fontWeight: "800", color: colors.primary, lineHeight: 36, marginBottom: spacing.md },
  subtitle: { fontSize: font.body, color: colors.textMuted, lineHeight: 24 },
  buttons: { marginTop: spacing.xl, gap: spacing.md },
  stats: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: spacing.xl,
    paddingTop: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  stat: { alignItems: "center", flex: 1 },
  statNumber: { fontSize: font.h2, fontWeight: "800", color: colors.primary },
  statLabel: { fontSize: font.tiny, color: colors.textMuted, marginTop: spacing.xs },
  privacy: { marginTop: spacing.lg, fontSize: font.small, color: colors.textMuted, textAlign: "center" },

  section: { marginTop: spacing.xl },
  sectionTitle: { fontSize: font.h2, fontWeight: "800", color: colors.text, marginBottom: spacing.lg },
  stepCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  stepNum: {
    width: 36,
    height: 36,
    borderRadius: radius.pill,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  stepNumText: { color: colors.white, fontWeight: "800", fontSize: font.body },
  stepTitle: { fontSize: font.h3, fontWeight: "700", color: colors.text, marginBottom: spacing.xs },
  stepBody: { fontSize: font.small, color: colors.textMuted, lineHeight: 22 },

  reassure: {
    marginTop: spacing.xl,
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xl,
  },
  reassureTitle: { fontSize: font.h2, fontWeight: "800", color: colors.white, marginBottom: spacing.md },
  reassureBody: { fontSize: font.body, color: colors.primarySoft, lineHeight: 24, marginBottom: spacing.xl },
});
