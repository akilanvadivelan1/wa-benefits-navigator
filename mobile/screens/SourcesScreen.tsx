import { ScrollView, Text, View, StyleSheet, Pressable, Linking } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Header } from "../components.tsx";
import { useLang } from "../i18n.tsx";
import { colors, radius, spacing, font } from "../theme.ts";

interface Props {
  onHome: () => void;
}

const AGENCY_LINKS: Array<{ key: "agencyHealth" | "agencyDshs" | "agencyDcyf" | "agencyOspi" | "agencyDoh" | "agencySsa"; url: string }> = [
  { key: "agencyHealth", url: "https://www.hca.wa.gov/about-hca/programs-and-initiatives/apple-health-medicaid/" },
  { key: "agencyDshs", url: "https://www.dshs.wa.gov/dda" },
  { key: "agencyDcyf", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
  { key: "agencyOspi", url: "https://ospi.k12.wa.us/student-success/special-education" },
  { key: "agencyDoh", url: "https://www.doh.wa.gov/CYSHCN" },
  { key: "agencySsa", url: "https://www.ssa.gov/ssi/text-child-ussi.htm" },
];

export function SourcesScreen({ onHome }: Props) {
  const { t } = useLang();
  const s = t.sources;

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <Header onHome={onHome} />
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{s.title}</Text>
        <Text style={styles.lead}>{s.lead}</Text>

        <Block title={s.howTitle} body={s.howBody} />
        <Block title={s.engineTitle} body={s.engineBody} />
        <Block title={s.honestTitle} body={s.honestBody} />

        <View style={styles.block}>
          <Text style={styles.blockTitle}>{s.listTitle}</Text>
          {AGENCY_LINKS.map((item) => (
            <Pressable key={item.key} onPress={() => Linking.openURL(item.url)}>
              <Text style={styles.link}>→ {s[item.key]}</Text>
            </Pressable>
          ))}
          <Text style={styles.verify}>{s.verifyNote}</Text>
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
  link: { fontSize: 14, color: colors.primary, marginBottom: 8, lineHeight: 20 },
  verify: { fontSize: 13, color: colors.gray500, fontStyle: "italic", marginTop: spacing.sm },
});
