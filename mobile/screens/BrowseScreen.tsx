import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header, Button } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font, categoryStyle } from "../theme.ts";
import { ALL_PROGRAMS } from "../../src/core/programs/index.ts";
import type { ProgramCategory, ProgramId } from "../../src/core/types.ts";

interface Props {
  onOpenProgram: (id: ProgramId) => void;
  onStartQuiz: () => void;
  onHome: () => void;
}

export function BrowseScreen({ onOpenProgram, onStartQuiz, onHome }: Props) {
  const { t } = useLang();
  const [filter, setFilter] = useState<ProgramCategory | "all">("all");

  const catLabel: Record<ProgramCategory, string> = {
    health: t.category.health,
    services: t.category.services,
    cash: t.category.cash,
    education: t.category.education,
    savings: t.category.savings,
    support: t.category.support,
  };

  const filters: Array<{ value: ProgramCategory | "all"; label: string }> = [
    { value: "all", label: t.browse.filterAll },
    { value: "health", label: t.category.health },
    { value: "services", label: t.category.services },
    { value: "cash", label: t.category.cash },
    { value: "education", label: t.category.education },
    { value: "savings", label: t.category.savings },
    { value: "support", label: t.category.support },
  ];

  const visible = filter === "all" ? ALL_PROGRAMS : ALL_PROGRAMS.filter((p) => p.category === filter);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header onHome={onHome} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t.browse.title}</Text>
        <Text style={styles.subtitle}>{t.browse.subtitle}</Text>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filters}>
          {filters.map((f) => (
            <Pressable key={f.value} onPress={() => setFilter(f.value)} style={[styles.filterBtn, filter === f.value && styles.filterBtnActive]}>
              <Text style={[styles.filterText, filter === f.value && styles.filterTextActive]}>{f.label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {visible.map((p) => {
          const cat = categoryStyle[p.category]!;
          return (
            <Pressable key={p.id} style={styles.card} onPress={() => onOpenProgram(p.id)}>
              <View style={styles.cardTop}>
                <Text style={styles.cardAgency}>{p.agency}</Text>
                <View style={[styles.catChip, { backgroundColor: cat.bg }]}>
                  <Text style={[styles.catChipText, { color: cat.text }]}>{catLabel[p.category]}</Text>
                </View>
              </View>
              <Text style={styles.cardName}>{p.content.humanName}</Text>
              <Text style={styles.cardOfficial}>{p.content.officialName}</Text>
              <Text style={styles.cardDesc}>{p.content.oneLiner}</Text>
            </Pressable>
          );
        })}

        <View style={styles.cta}>
          <Text style={styles.ctaText}>{t.browse.ctaText}</Text>
          <Button label={t.browse.ctaButton} onPress={onStartQuiz} variant="accent" fullWidth />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  title: { fontSize: font.h1, fontWeight: "700", color: colors.gray900, textAlign: "center" },
  subtitle: { fontSize: font.small, color: colors.gray500, textAlign: "center", marginTop: spacing.sm, marginBottom: spacing.lg, lineHeight: 20 },
  filters: { gap: spacing.sm, paddingBottom: spacing.md },
  filterBtn: { borderWidth: 1, borderColor: colors.gray200, borderRadius: radius.pill, paddingHorizontal: 16, paddingVertical: 8, backgroundColor: colors.white },
  filterBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  filterText: { fontSize: 13, color: colors.gray700, fontWeight: "500" },
  filterTextActive: { color: colors.white },
  card: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray200, borderRadius: radius.lg, padding: spacing.lg, marginBottom: spacing.md },
  cardTop: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  cardAgency: { fontSize: 11, fontWeight: "700", color: colors.gray500, letterSpacing: 0.5 },
  catChip: { borderRadius: radius.pill, paddingHorizontal: 10, paddingVertical: 3 },
  catChipText: { fontSize: 11, fontWeight: "700" },
  cardName: { fontSize: 16, fontWeight: "600", color: colors.gray900 },
  cardOfficial: { fontSize: 12, color: colors.gray500, marginTop: 2 },
  cardDesc: { fontSize: 13, color: colors.gray700, marginTop: 6, lineHeight: 19 },
  cta: { backgroundColor: colors.primary50, borderWidth: 1, borderColor: colors.primary100, borderRadius: radius.xl, padding: spacing.xl, marginTop: spacing.md, alignItems: "center" },
  ctaText: { fontSize: 15, color: colors.gray700, marginBottom: spacing.md, textAlign: "center" },
});
