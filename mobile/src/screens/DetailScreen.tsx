import { useState, type ReactNode } from "react";
import { Linking, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation.ts";
import { PROGRAMS_BY_ID } from "../core/programs/index.ts";
import { getLocalContact } from "../core/countyContacts.ts";
import { SpeakButton } from "../components/SpeakButton.tsx";
import { PrimaryButton, SecondaryButton } from "../components/Buttons.tsx";
import { colors, font, radius, spacing } from "../theme.ts";

type Props = NativeStackScreenProps<RootStackParamList, "Detail">;

export const DetailScreen = ({ route }: Props) => {
  const { programId, county } = route.params;
  const program = PROGRAMS_BY_ID[programId];
  const c = program.content;
  const localContact = program.hasCountyLocalContact ? getLocalContact(program.id, county) : undefined;
  const [checked, setChecked] = useState<Record<number, boolean>>({});

  const speakText = `${c.humanName}. ${c.exampleFirst} What you get: ${c.whatYouGet.join(". ")}.`;

  const openUrl = (url: string) => Linking.openURL(url).catch(() => {});
  const callPhone = (phone: string) => Linking.openURL(`tel:${phone.replace(/[^0-9]/g, "")}`).catch(() => {});

  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content}>
      <Text style={styles.agency}>{program.agencyName}</Text>
      <Text style={styles.title}>{c.humanName}</Text>
      <Text style={styles.official}>{c.officialName}</Text>
      <Text style={styles.oneLiner}>{c.oneLiner}</Text>
      <View style={styles.speakWrap}>
        <SpeakButton text={speakText} />
      </View>

      <Section title="What this means for you">
        <Text style={styles.exampleFirst}>{c.exampleFirst}</Text>
      </Section>

      <Section title="What you get">
        {c.whatYouGet.map((item, i) => (
          <Bullet key={i} text={item} />
        ))}
      </Section>

      <Section title="How to apply">
        {program.apply.steps.map((s, i) => (
          <View key={i} style={styles.stepRow}>
            <View style={styles.stepNum}>
              <Text style={styles.stepNumText}>{i + 1}</Text>
            </View>
            <Text style={styles.stepText}>{s}</Text>
          </View>
        ))}
      </Section>

      <Section title="Take action">
        <View style={{ gap: spacing.md }}>
          {program.apply.url ? <PrimaryButton label="Learn more or apply" onPress={() => openUrl(program.apply.url!)} /> : null}
          {program.apply.phone ? <SecondaryButton label={`Call ${program.apply.phone}`} onPress={() => callPhone(program.apply.phone!)} /> : null}
        </View>
      </Section>

      {localContact ? (
        <Section title="Your local contact">
          <Text style={styles.localOffice}>{localContact.office}</Text>
          <Pressable onPress={() => callPhone(localContact.phone)}>
            <Text style={styles.localPhone}>{localContact.phone}</Text>
          </Pressable>
          <Text style={styles.localNote}>{localContact.note}</Text>
        </Section>
      ) : null}

      <Section title="Documents to gather">
        {program.apply.documents.map((d, i) => (
          <Pressable key={i} style={styles.checkRow} onPress={() => setChecked((prev) => ({ ...prev, [i]: !prev[i] }))}>
            <View style={[styles.checkbox, checked[i] && styles.checkboxOn]}>
              {checked[i] ? <Text style={styles.checkboxMark}>{"\u2713"}</Text> : null}
            </View>
            <Text style={styles.checkLabel}>{d}</Text>
          </Pressable>
        ))}
      </Section>

      <Section title="Tips for parents">
        {c.tips.map((t, i) => (
          <Bullet key={i} text={t} />
        ))}
      </Section>

      {program.unlocks.length > 0 ? (
        <Section title="Unlocks these programs">
          {program.unlocks.map((u) => (
            <Bullet key={u} text={PROGRAMS_BY_ID[u].content.officialName} />
          ))}
        </Section>
      ) : null}

      <Section title="Official sources">
        {program.citations.map((cit, i) => (
          <Pressable key={i} onPress={() => openUrl(cit.url)}>
            <Text style={styles.citation}>{cit.label}</Text>
          </Pressable>
        ))}
      </Section>
    </ScrollView>
  );
};

const Section = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.section}>
    <Text style={styles.sectionTitle}>{title}</Text>
    {children}
  </View>
);

const Bullet = ({ text }: { text: string }) => (
  <View style={styles.bulletRow}>
    <View style={styles.bulletDot} />
    <Text style={styles.bulletText}>{text}</Text>
  </View>
);

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl },
  agency: { fontSize: font.tiny, fontWeight: "700", color: colors.textFaint, letterSpacing: 0.5 },
  title: { fontSize: font.h1, fontWeight: "800", color: colors.text, marginTop: spacing.sm, lineHeight: 34 },
  official: { fontSize: font.body, color: colors.textFaint, marginTop: spacing.xs },
  oneLiner: { fontSize: font.body, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 24 },
  speakWrap: { marginTop: spacing.md },
  section: { marginTop: spacing.xl, backgroundColor: colors.card, borderRadius: radius.lg, padding: spacing.lg, borderWidth: 1, borderColor: colors.border },
  sectionTitle: { fontSize: font.h3, fontWeight: "800", color: colors.text, marginBottom: spacing.md },
  exampleFirst: { fontSize: font.body, color: colors.text, lineHeight: 24 },
  bulletRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.sm, alignItems: "flex-start" },
  bulletDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: colors.primary, marginTop: 7 },
  bulletText: { flex: 1, fontSize: font.body, color: colors.textMuted, lineHeight: 23 },
  stepRow: { flexDirection: "row", gap: spacing.md, marginBottom: spacing.md, alignItems: "flex-start" },
  stepNum: { width: 26, height: 26, borderRadius: 13, backgroundColor: colors.primarySoft, alignItems: "center", justifyContent: "center" },
  stepNumText: { color: colors.primaryDark, fontWeight: "800", fontSize: font.small },
  stepText: { flex: 1, fontSize: font.body, color: colors.textMuted, lineHeight: 23 },
  localOffice: { fontSize: font.body, fontWeight: "700", color: colors.text },
  localPhone: { fontSize: font.body, color: colors.primary, fontWeight: "700", marginTop: spacing.xs },
  localNote: { fontSize: font.small, color: colors.textMuted, marginTop: spacing.sm, lineHeight: 20 },
  checkRow: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.sm },
  checkbox: { width: 22, height: 22, borderRadius: radius.sm, borderWidth: 2, borderColor: colors.textFaint, alignItems: "center", justifyContent: "center" },
  checkboxOn: { backgroundColor: colors.primary, borderColor: colors.primary },
  checkboxMark: { color: colors.white, fontSize: font.tiny, fontWeight: "900" },
  checkLabel: { flex: 1, fontSize: font.body, color: colors.text },
  citation: { fontSize: font.body, color: colors.primary, fontWeight: "600", paddingVertical: spacing.xs, textDecorationLine: "underline" },
});
