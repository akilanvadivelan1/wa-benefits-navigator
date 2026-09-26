import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { getQuizContent } from "../../src/web/screens/quizContent.ts";
import { WA_COUNTIES } from "../../src/core/counties.ts";
import { colors, radius, spacing, font } from "../theme.ts";
import type {
  AgeBand,
  CaregivingImpact,
  Condition,
  DiagnosisStatus,
  HelpType,
  IncomeBand,
  InsuranceStatus,
  LivingSituation,
  QuizAnswers,
  ResidencyStatus,
  SpecificNeed,
  SupportLevel,
} from "../../src/core/types.ts";

interface Props {
  onComplete: (a: QuizAnswers) => void;
  onExit: () => void;
}

const CORE_STEPS = 6;

export function QuizScreen({ onComplete, onExit }: Props) {
  const { lang, t } = useLang();
  const content = getQuizContent(lang);
  const stepMeta = content.stepMeta;
  const total = stepMeta.length;

  const [step, setStep] = useState(0);
  const [ageBand, setAgeBand] = useState<AgeBand | undefined>();
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [supportLevel, setSupportLevel] = useState<SupportLevel | undefined>();
  const [incomeBand, setIncomeBand] = useState<IncomeBand | undefined>();
  const [livingSituation, setLivingSituation] = useState<LivingSituation | undefined>();
  const [county, setCounty] = useState<string | undefined>();
  const [helpTypes, setHelpTypes] = useState<HelpType[]>([]);
  const [diagnosisStatus, setDiagnosisStatus] = useState<DiagnosisStatus | undefined>();
  const [specificNeeds, setSpecificNeeds] = useState<SpecificNeed[]>([]);
  const [caregivingImpact, setCaregivingImpact] = useState<CaregivingImpact | undefined>();
  const [insuranceStatus, setInsuranceStatus] = useState<InsuranceStatus | undefined>();
  const [residencyStatus, setResidencyStatus] = useState<ResidencyStatus | undefined>();
  const [error, setError] = useState<string | null>(null);

  const meta = stepMeta[step]!;
  const progress = Math.round(((step + 1) / total) * 100);
  const isDeep = step >= CORE_STEPS;

  function toggle<T>(list: T[], v: T): T[] {
    return list.includes(v) ? list.filter((x) => x !== v) : [...list, v];
  }

  function canProceed(): boolean {
    if (step === 0) return !!ageBand;
    if (step === 1) return conditions.length > 0;
    if (step === 2) return !!supportLevel;
    if (step === 3) return !!incomeBand;
    if (step === 4) return !!livingSituation;
    return true;
  }

  function submit() {
    onComplete({
      ageBand,
      conditions,
      supportLevel,
      incomeBand,
      livingSituation,
      county,
      helpTypes,
      alreadyEnrolled: insuranceStatus === "appleHealthAlready" ? ["appleHealth"] : [],
      diagnosisStatus,
      specificNeeds: specificNeeds.length ? specificNeeds : undefined,
      caregivingImpact,
      insuranceStatus,
      residencyStatus,
    });
  }

  function next() {
    if (!canProceed()) {
      setError(t.quiz.chooseToContinue);
      return;
    }
    setError(null);
    if (step < total - 1) setStep(step + 1);
    else submit();
  }

  function back() {
    setError(null);
    if (step === 0) onExit();
    else setStep(step - 1);
  }

  function skip() {
    setError(null);
    if (step < total - 1) setStep(step + 1);
    else submit();
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.progressWrap}>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {t.quiz.stepOf} {step + 1} {t.quiz.of} {total}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>{meta.title}</Text>
        <Text style={styles.helper}>{meta.helper}</Text>

        {step === 0 && content.age.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={ageBand === o.value} onPress={() => setAgeBand(o.value)} />
        ))}
        {step === 1 && content.conditions.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} multi selected={conditions.includes(o.value)} onPress={() => setConditions(toggle(conditions, o.value))} />
        ))}
        {step === 2 && content.support.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={supportLevel === o.value} onPress={() => setSupportLevel(o.value)} />
        ))}
        {step === 3 && content.income.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={incomeBand === o.value} onPress={() => setIncomeBand(o.value)} />
        ))}
        {step === 4 && (
          <>
            {content.living.map((o) => (
              <Option key={o.value} label={o.label} description={o.description} selected={livingSituation === o.value} onPress={() => setLivingSituation(o.value)} />
            ))}
            <Text style={styles.countyLabel}>{t.quiz.countyLabel}</Text>
            <View style={styles.countyGrid}>
              {WA_COUNTIES.map((c) => (
                <Pressable key={c} onPress={() => setCounty(c)} style={[styles.countyChip, county === c && styles.countyChipActive]}>
                  <Text style={[styles.countyChipText, county === c && styles.countyChipTextActive]}>{c}</Text>
                </Pressable>
              ))}
            </View>
          </>
        )}
        {step === 5 && content.help.map((o) => (
          <Option key={o.value} label={o.label} multi selected={helpTypes.includes(o.value)} onPress={() => setHelpTypes(toggle(helpTypes, o.value))} />
        ))}
        {step === 6 && content.diagnosis.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={diagnosisStatus === o.value} onPress={() => setDiagnosisStatus(o.value)} />
        ))}
        {step === 7 && content.needs.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} multi selected={specificNeeds.includes(o.value)} onPress={() => setSpecificNeeds(toggle(specificNeeds, o.value))} />
        ))}
        {step === 8 && content.caregiving.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={caregivingImpact === o.value} onPress={() => setCaregivingImpact(o.value)} />
        ))}
        {step === 9 && content.insurance.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={insuranceStatus === o.value} onPress={() => setInsuranceStatus(o.value)} />
        ))}
        {step === 10 && content.residency.map((o) => (
          <Option key={o.value} label={o.label} description={o.description} selected={residencyStatus === o.value} onPress={() => setResidencyStatus(o.value)} />
        ))}

        <View style={styles.whyBox}>
          <Text style={styles.whyText}>
            <Text style={styles.whyStrong}>{t.quiz.whyWeAsk} </Text>
            {meta.whyWeAsk}
          </Text>
        </View>

        {error && <Text style={styles.error}>{error}</Text>}

        <View style={styles.nav}>
          <Button label={step === 0 ? t.quiz.exit : t.quiz.back} onPress={back} variant="secondary" />
          <View style={styles.navRight}>
            {isDeep && step < total - 1 && <Button label={t.quiz.skip} onPress={skip} variant="ghost" />}
            <Button label={step === total - 1 ? t.quiz.seeResults : t.quiz.next} onPress={next} variant="primary" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Option({
  label,
  description,
  selected,
  multi,
  onPress,
}: {
  label: string;
  description?: string;
  selected: boolean;
  multi?: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.option, selected && styles.optionSelected]}>
      <View style={{ flex: 1 }}>
        <Text style={styles.optionLabel}>{label}</Text>
        {description ? <Text style={styles.optionDesc}>{description}</Text> : null}
      </View>
      {multi ? (
        <View style={[styles.checkbox, selected && styles.checkboxOn]}>
          {selected ? <Text style={styles.checkboxMark}>✓</Text> : null}
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  progressWrap: { padding: spacing.lg },
  progressTrack: { height: 8, backgroundColor: colors.gray200, borderRadius: radius.pill, overflow: "hidden" },
  progressFill: { height: 8, backgroundColor: colors.primary, borderRadius: radius.pill },
  progressText: { fontSize: 13, color: colors.gray500, marginTop: 6, fontWeight: "500" },
  content: { paddingHorizontal: spacing.lg, paddingBottom: spacing.xxl * 2 },
  question: { fontSize: font.h2, fontWeight: "600", color: colors.gray900, marginBottom: 6 },
  helper: { fontSize: font.small, color: colors.gray500, marginBottom: spacing.lg },
  option: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.md,
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: radius.md,
    padding: spacing.lg,
    backgroundColor: colors.white,
    marginBottom: spacing.sm,
  },
  optionSelected: { borderColor: colors.primary, backgroundColor: colors.primary50 },
  optionLabel: { fontSize: 15, fontWeight: "500", color: colors.gray900 },
  optionDesc: { fontSize: 13, color: colors.gray500, marginTop: 2, lineHeight: 18 },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: colors.gray300,
    alignItems: "center",
    justifyContent: "center",
  },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxMark: { color: colors.white, fontSize: 14, fontWeight: "700" },
  countyLabel: { fontSize: font.small, color: colors.gray700, marginTop: spacing.md, marginBottom: spacing.sm },
  countyGrid: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm },
  countyChip: {
    borderWidth: 1,
    borderColor: colors.gray200,
    borderRadius: radius.pill,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: colors.white,
  },
  countyChipActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  countyChipText: { fontSize: 13, color: colors.gray700 },
  countyChipTextActive: { color: colors.white },
  whyBox: {
    backgroundColor: colors.infoLight,
    borderLeftWidth: 4,
    borderLeftColor: colors.info,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
  },
  whyText: { fontSize: font.small, color: colors.gray700, lineHeight: 20 },
  whyStrong: { fontWeight: "700" },
  error: { color: "#B91C1C", fontSize: font.small, marginTop: spacing.md },
  nav: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginTop: spacing.xl },
  navRight: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
});
