import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation.ts";
import type { ProgramCategory } from "../core/types.ts";
import { ALL_PROGRAMS } from "../core/programs/index.ts";
import { AccentButton } from "../components/Buttons.tsx";
import { colors, font, radius, spacing } from "../theme.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Browse">;

const CATEGORY_LABEL: Record<ProgramCategory, string> = {
  health: "Health",
  services: "Services",
  cash: "Cash",
  education: "Education",
  savings: "Savings",
  support: "Support",
};

const FILTERS: Array<{ value: ProgramCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "health", label: "Health" },
  { value: "services", label: "Services" },
  { value: "cash", label: "Cash" },
  { value: "education", label: "Education" },
  { value: "savings", label: "Savings" },
  { value: "support", label: "Support" },
];

export const BrowseScreen = ({ navigation }: Props) => {
  const [filter, setFilter] = useState<ProgramCategory | "all">("all");
  const visible = filter === "all" ? ALL_PROGRAMS : ALL_PROGRAMS.filter((p) => p.category === filter);

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.title}>All Washington State programs</Text>
      <Text style={styles.intro}>
        These 15 programs span 5 state agencies and the federal government. Not sure which fit
        your family? Take the quiz for a personalized plan.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filters} contentContainerStyle={styles.filtersRow}>
        {FILTERS.map((f) => {
          const active = filter === f.value;
          return (
            <Pressable
              key={f.value}
              onPress={() => setFilter(f.value)}
              style={[styles.filterBtn, active && styles.filterBtnActive]}
            >
              <Text style={[styles.filterText, active && styles.filterTextActive]}>{f.label}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      {visible.map((p) => (
        <Pressable
          key={p.id}
          onPress={() => navigation.navigate("Detail", { programId: p.id, from: "browse" })}
          style={({ pressed }) => [styles.card, pressed && styles.pressed]}
        >
          <View style={styles.cardTop}>
            <Text style={styles.agency}>{p.agency}</Text>
            <View style={styles.categoryPill}>
              <Text style={styles.categoryText}>{CATEGORY_LABEL[p.category]}</Text>
            </View>
          </View>
          <Text style={styles.cardName}>{p.content.humanName}</Text>
          <Text style={styles.cardOfficial}>{p.content.officialName}</Text>
          <Text style={styles.cardDesc}>{p.content.oneLiner}</Text>
        </Pressable>
      ))}

      <View style={styles.cta}>
        <Text style={styles.ctaText}>Not sure which programs are right for your family?</Text>
        <AccentButton label="Take the eligibility quiz" onPress={() => navigation.navigate("Quiz")} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  title: { fontSize: font.h1, fontWeight: "800", color: colors.text, marginBottom: spacing.sm },
  intro: { fontSize: font.body, color: colors.textMuted, lineHeight: 24, marginBottom: spacing.lg },
  filters: { marginBottom: spacing.lg },
  filtersRow: { gap: spacing.sm, paddingRight: spacing.lg },
  filterBtn: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.cardAlt,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { color: colors.textMuted, fontWeight: "600", fontSize: font.small },
  filterTextActive: { color: colors.white },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: spacing.md,
  },
  pressed: { opacity: 0.85 },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  agency: { fontSize: font.tiny, fontWeight: "700", color: colors.textFaint, letterSpacing: 0.5 },
  categoryPill: { backgroundColor: colors.primarySoft, paddingHorizontal: spacing.md, paddingVertical: 2, borderRadius: radius.pill },
  categoryText: { fontSize: font.tiny, fontWeight: "700", color: colors.primaryDark },
  cardName: { fontSize: font.h3, fontWeight: "700", color: colors.text },
  cardOfficial: { fontSize: font.small, color: colors.textFaint, marginTop: 2 },
  cardDesc: { fontSize: font.small, color: colors.textMuted, lineHeight: 22, marginTop: spacing.sm },
  cta: {
    marginTop: spacing.lg,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    padding: spacing.xl,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: "center",
    gap: spacing.md,
  },
  ctaText: { fontSize: font.body, color: colors.textMuted, textAlign: "center" },
});
