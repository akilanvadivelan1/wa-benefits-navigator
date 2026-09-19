import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation.ts";
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
} from "../core/types.ts";
import { WA_COUNTIES } from "../core/counties.ts";
import {
  AGE_OPTIONS,
  CAREGIVING_OPTIONS,
  CONDITION_OPTIONS,
  DEEP_STEP_META,
  DIAGNOSIS_OPTIONS,
  HELP_OPTIONS,
  INCOME_OPTIONS,
  INSURANCE_OPTIONS,
  LIVING_OPTIONS,
  NEEDS_OPTIONS,
  RESIDENCY_OPTIONS,
  STEP_META,
  SUPPORT_OPTIONS,
} from "../content/quizContent.ts";
import { OptionCard } from "../components/OptionCard.tsx";
import { GhostButton, PrimaryButton, SecondaryButton } from "../components/Buttons.tsx";
import { colors, font, radius, spacing } from "../theme.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Quiz">;

const ALL_STEP_META = [...STEP_META, ...DEEP_STEP_META];
const TOTAL_STEPS = ALL_STEP_META.length;

export const QuizScreen = ({ navigation }: Props) => {
  const [step, setStep] = useState(0);
  // Core answers
  const [ageBand, setAgeBand] = useState<AgeBand | undefined>();
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [supportLevel, setSupportLevel] = useState<SupportLevel | undefined>();
  const [incomeBand, setIncomeBand] = useState<IncomeBand | undefined>();
  const [livingSituation, setLivingSituation] = useState<LivingSituation | undefined>();
  const [county, setCounty] = useState<string>("");
  const [helpTypes, setHelpTypes] = useState<HelpType[]>([]);
  // Deeper answers
  const [diagnosisStatus, setDiagnosisStatus] = useState<DiagnosisStatus | undefined>();
  const [specificNeeds, setSpecificNeeds] = useState<SpecificNeed[]>([]);
  const [caregivingImpact, setCaregivingImpact] = useState<CaregivingImpact | undefined>();
  const [insuranceStatus, setInsuranceStatus] = useState<InsuranceStatus | undefined>();
  const [residencyStatus, setResidencyStatus] = useState<ResidencyStatus | undefined>();
  const [countyOpen, setCountyOpen] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const meta = ALL_STEP_META[step]!;
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);
  const isDeepStep = step >= STEP_META.length;

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!ageBand;
      case 1: return conditions.length > 0;
      case 2: return !!supportLevel;
      case 3: return !!incomeBand;
      case 4: return !!livingSituation;
      default: return true;
    }
  };

  const submit = () => {
    const answers: QuizAnswers = {
      ageBand,
      conditions,
      supportLevel,
      incomeBand,
      livingSituation,
      county: county || undefined,
      helpTypes,
      alreadyEnrolled: insuranceStatus === "appleHealthAlready" ? ["appleHealth"] : [],
      diagnosisStatus,
      specificNeeds: specificNeeds.length ? specificNeeds : undefined,
      caregivingImpact,
      insuranceStatus,
      residencyStatus,
    };
    navigation.navigate("Results", { answers });
  };

  const next = () => {
    if (!canProceed()) {
      setError("Please choose an answer to continue.");
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };

  const back = () => {
    setError(null);
    if (step === 0) navigation.goBack();
    else setStep(step - 1);
  };

  const skip = () => {
    setError(null);
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };

  return (
    <View style={styles.screen}>
      <View style={styles.progressWrap}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          Step {step + 1} of {TOTAL_STEPS}
          {isDeepStep ? "  \u00B7  a few optional questions to sharpen your results" : ""}
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.question}>{meta.title}</Text>
        <Text style={styles.helper}>{meta.helper}</Text>

        <View style={styles.options}>
          {step === 0 &&
            AGE_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={ageBand === o.value} onPress={() => setAgeBand(o.value)} />
            ))}

          {step === 1 &&
            CONDITION_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={conditions.includes(o.value)} multi onPress={() => setConditions(toggle(conditions, o.value))} />
            ))}

          {step === 2 &&
            SUPPORT_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={supportLevel === o.value} onPress={() => setSupportLevel(o.value)} />
            ))}

          {step === 3 &&
            INCOME_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={incomeBand === o.value} onPress={() => setIncomeBand(o.value)} />
            ))}

          {step === 4 && (
            <>
              {LIVING_OPTIONS.map((o) => (
                <OptionCard key={o.value} label={o.label} description={o.description} selected={livingSituation === o.value} onPress={() => setLivingSituation(o.value)} />
              ))}
              <View style={styles.countyField}>
                <Text style={styles.countyLabel}>Which county do you live in? (optional, helps us show local offices)</Text>
                <Pressable style={styles.countySelect} onPress={() => setCountyOpen((v) => !v)}>
                  <Text style={county ? styles.countyValue : styles.countyPlaceholder}>{county || "Select a county"}</Text>
                  <Text style={styles.countyChevron}>{countyOpen ? "\u25B2" : "\u25BC"}</Text>
                </Pressable>
                {countyOpen && (
                  <View style={styles.countyList}>
                    <ScrollView style={styles.countyScroll} nestedScrollEnabled>
                      <Pressable style={styles.countyItem} onPress={() => { setCounty(""); setCountyOpen(false); }}>
                        <Text style={styles.countyItemText}>Select a county</Text>
                      </Pressable>
                      {WA_COUNTIES.map((c) => (
                        <Pressable key={c} style={styles.countyItem} onPress={() => { setCounty(c); setCountyOpen(false); }}>
                          <Text style={styles.countyItemText}>{c}</Text>
                        </Pressable>
                      ))}
                    </ScrollView>
                  </View>
                )}
              </View>
            </>
          )}

          {step === 5 &&
            HELP_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} selected={helpTypes.includes(o.value)} multi onPress={() => setHelpTypes(toggle(helpTypes, o.value))} />
            ))}

          {step === 6 &&
            DIAGNOSIS_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={diagnosisStatus === o.value} onPress={() => setDiagnosisStatus(o.value)} />
            ))}

          {step === 7 &&
            NEEDS_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={specificNeeds.includes(o.value)} multi onPress={() => setSpecificNeeds(toggle(specificNeeds, o.value))} />
            ))}

          {step === 8 &&
            CAREGIVING_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={caregivingImpact === o.value} onPress={() => setCaregivingImpact(o.value)} />
            ))}

          {step === 9 &&
            INSURANCE_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={insuranceStatus === o.value} onPress={() => setInsuranceStatus(o.value)} />
            ))}

          {step === 10 &&
            RESIDENCY_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={residencyStatus === o.value} onPress={() => setResidencyStatus(o.value)} />
            ))}
        </View>

        <View style={styles.whyBox}>
          <Text style={styles.whyText}>
            <Text style={styles.whyStrong}>Why we ask: </Text>
            {meta.whyWeAsk}
          </Text>
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}
      </ScrollView>

      <View style={styles.nav}>
        <View style={styles.navLeft}>
          <SecondaryButton label={step === 0 ? "Exit" : "Back"} onPress={back} />
        </View>
        <View style={styles.navRight}>
          {isDeepStep && step < TOTAL_STEPS - 1 ? <GhostButton label="Skip" onPress={skip} /> : null}
          <PrimaryButton label={step === TOTAL_STEPS - 1 ? "See My Results" : "Next"} onPress={next} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  progressWrap: { padding: spacing.lg, paddingBottom: spacing.sm },
  progressBar: { height: 8, borderRadius: radius.pill, backgroundColor: colors.cardAlt, overflow: "hidden" },
  progressFill: { height: 8, borderRadius: radius.pill, backgroundColor: colors.primary },
  progressText: { fontSize: font.tiny, color: colors.textMuted, marginTop: spacing.sm },
  content: { padding: spacing.lg, paddingTop: spacing.sm, paddingBottom: spacing.xl },
  question: { fontSize: font.h2, fontWeight: "800", color: colors.text, marginBottom: spacing.xs },
  helper: { fontSize: font.small, color: colors.textMuted, marginBottom: spacing.lg, lineHeight: 20 },
  options: { gap: spacing.md },
  whyBox: { marginTop: spacing.lg, backgroundColor: colors.primarySoft, borderRadius: radius.md, padding: spacing.lg },
  whyText: { fontSize: font.small, color: colors.primaryDark, lineHeight: 20 },
  whyStrong: { fontWeight: "800" },
  error: { marginTop: spacing.md, color: colors.accent, fontWeight: "600", fontSize: font.small },
  nav: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: spacing.lg,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.card,
    gap: spacing.md,
  },
  navLeft: { flex: 1 },
  navRight: { flex: 1, flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: spacing.sm },
  countyField: { marginTop: spacing.sm },
  countyLabel: { fontSize: font.small, color: colors.textMuted, marginBottom: spacing.sm },
  countySelect: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.border,
    borderRadius: radius.md,
    padding: spacing.md,
    backgroundColor: colors.card,
  },
  countyValue: { fontSize: font.body, color: colors.text },
  countyPlaceholder: { fontSize: font.body, color: colors.textFaint },
  countyChevron: { fontSize: font.tiny, color: colors.textMuted },
  countyList: { borderWidth: 1, borderColor: colors.border, borderRadius: radius.md, marginTop: spacing.sm, backgroundColor: colors.card },
  countyScroll: { maxHeight: 220 },
  countyItem: { paddingVertical: spacing.md, paddingHorizontal: spacing.lg, borderBottomWidth: 1, borderBottomColor: colors.border },
  countyItemText: { fontSize: font.body, color: colors.text },
});
