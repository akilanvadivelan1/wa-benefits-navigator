import { useState } from "react";
import { ScrollView, Text, View, StyleSheet, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import * as Speech from "expo-speech";
import { Header, Button } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font } from "../theme.ts";
import type { Program } from "../../src/core/types.ts";
import { PROGRAMS_BY_ID } from "../../src/core/programs/index.ts";
import { getLocalContact } from "../../src/core/countyContacts.ts";

interface Props {
  program: Program;
  county?: string;
  onBack: () => void;
}

export function ProgramDetailScreen({ program, county, onBack }: Props) {
  const { lang, t } = useLang();
  const d = t.detail;
  const c = program.content;
  const [speaking, setSpeaking] = useState(false);
  const localContact = program.hasCountyLocalContact ? getLocalContact(program.id, county) : undefined;

  const speakText = `${c.humanName}. ${c.exampleFirst} ${d.whatYouGet}: ${c.whatYouGet.join(". ")}.`;

  function toggleSpeak() {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    Speech.speak(speakText, {
      language: lang === "es" ? "es-ES" : "en-US",
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
    });
  }

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header />
      <ScrollView contentContainerStyle={styles.content}>
        <Pressable onPress={onBack}><Text style={styles.back}>‹ {d.backResults}</Text></Pressable>

        <Text style={styles.agency}>{program.agencyName}</Text>
        <Text style={styles.title}>{c.humanName}</Text>
        <Text style={styles.official}>{c.officialName}</Text>
        <Text style={styles.subtitle}>{c.oneLiner}</Text>

        <Pressable onPress={toggleSpeak} style={styles.speak}>
          <Text style={styles.speakText}>{speaking ? `⏹ ${d.stop}` : `🔊 ${d.readAloud}`}</Text>
        </Pressable>

        <Section title={d.whatItMeans}>
          <Text style={styles.body}>{c.exampleFirst}</Text>
        </Section>

        <Section title={d.whatYouGet}>
          {c.whatYouGet.map((item, i) => (
            <Text key={i} style={styles.bullet}>✓  {item}</Text>
          ))}
        </Section>

        <Section title={d.howToApply}>
          {program.apply.steps.map((s, i) => (
            <Text key={i} style={styles.step}>{i + 1}. {s}</Text>
          ))}
        </Section>

        <Section title={d.tips}>
          {c.tips.map((tip, i) => (
            <Text key={i} style={styles.bullet}>💡  {tip}</Text>
          ))}
        </Section>

        <View style={styles.actionCard}>
          <Text style={styles.actionTitle}>{d.takeAction}</Text>
          {program.apply.url ? (
            <Button label={d.learnOrApply} onPress={() => Linking.openURL(program.apply.url!)} variant="primary" fullWidth />
          ) : null}
          {program.apply.phone ? (
            <Button label={`${d.call} ${program.apply.phone}`} onPress={() => Linking.openURL(`tel:${program.apply.phone!.replace(/[^0-9]/g, "")}`)} variant="secondary" fullWidth />
          ) : null}
        </View>

        {localContact ? (
          <Section title={d.localContact}>
            <Text style={styles.localOffice}>{localContact.office}</Text>
            <Pressable onPress={() => Linking.openURL(`tel:${localContact.phone.replace(/[^0-9]/g, "")}`)}>
              <Text style={styles.localPhone}>{localContact.phone}</Text>
            </Pressable>
            <Text style={styles.body}>{localContact.note}</Text>
          </Section>
        ) : null}

        <Section title={d.documents}>
          {program.apply.documents.map((doc, i) => (
            <Text key={i} style={styles.bullet}>☐  {doc}</Text>
          ))}
        </Section>

        {program.unlocks.length > 0 ? (
          <Section title={d.unlocks}>
            {program.unlocks.map((u) => (
              <Text key={u} style={styles.bullet}>•  {PROGRAMS_BY_ID[u].content.officialName}</Text>
            ))}
          </Section>
        ) : null}

        <Section title={d.sources}>
          {program.citations.map((cit, i) => (
            <Pressable key={i} onPress={() => Linking.openURL(cit.url)}>
              <Text style={styles.link}>{cit.label}</Text>
            </Pressable>
          ))}
        </Section>
      </ScrollView>
    </SafeAreaView>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  content: { padding: spacing.lg, paddingBottom: spacing.xxl * 2 },
  back: { color: colors.gray500, fontSize: font.small, marginBottom: spacing.md },
  agency: { fontSize: 13, color: colors.gray500 },
  title: { fontSize: font.h1, fontWeight: "700", color: colors.gray900, marginTop: 2 },
  official: { fontSize: 14, color: colors.gray500, marginTop: 2 },
  subtitle: { fontSize: font.body, color: colors.gray700, marginTop: spacing.sm, lineHeight: 22 },
  speak: { alignSelf: "flex-start", backgroundColor: colors.gray100, borderRadius: radius.pill, paddingHorizontal: 14, paddingVertical: 8, marginTop: spacing.md },
  speakText: { fontSize: 13, fontWeight: "600", color: colors.gray700 },
  section: { backgroundColor: colors.white, borderWidth: 1, borderColor: colors.gray200, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.md },
  sectionTitle: { fontSize: font.h3, fontWeight: "600", color: colors.primaryDark, marginBottom: spacing.sm },
  body: { fontSize: font.small, color: colors.gray700, lineHeight: 22 },
  bullet: { fontSize: font.small, color: colors.gray700, lineHeight: 24 },
  step: { fontSize: font.small, color: colors.gray700, lineHeight: 24, marginBottom: 2 },
  actionCard: { backgroundColor: colors.primary50, borderWidth: 1, borderColor: colors.primary100, borderRadius: radius.lg, padding: spacing.lg, marginTop: spacing.md, gap: spacing.sm },
  actionTitle: { fontSize: font.h3, fontWeight: "600", color: colors.gray900, marginBottom: spacing.sm },
  localOffice: { fontSize: 14, fontWeight: "600", color: colors.gray900 },
  localPhone: { fontSize: 18, fontWeight: "700", color: colors.primary, marginVertical: 4 },
  link: { fontSize: 14, color: colors.primary, marginBottom: 6 },
});
