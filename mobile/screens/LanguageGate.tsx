import { Pressable, Text, View, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useLang } from "../i18n.tsx";
import { STRINGS } from "../../src/web/i18n/strings.ts";
import { colors, radius, spacing } from "../theme.ts";

export function LanguageGate() {
  const { setLang } = useLang();
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.center}>
        <View style={styles.mark}>
          <Text style={styles.markCheck}>✓</Text>
        </View>
        <Text style={styles.title}>WA Benefits Navigator</Text>
        <Text style={styles.subtitle}>
          {STRINGS.en.gate.subtitle} / {STRINGS.es.gate.subtitle}
        </Text>
        <View style={styles.buttons}>
          <Pressable style={styles.langBtn} onPress={() => setLang("en")}>
            <Text style={styles.langName}>English</Text>
            <Text style={styles.langSub}>Continue in English</Text>
          </Pressable>
          <Pressable style={styles.langBtn} onPress={() => setLang("es")}>
            <Text style={styles.langName}>Español</Text>
            <Text style={styles.langSub}>Continuar en español</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.bg },
  center: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  mark: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.lg,
  },
  markCheck: { color: colors.white, fontWeight: "700", fontSize: 30 },
  title: { fontSize: 24, fontWeight: "700", color: colors.gray900, marginBottom: spacing.sm },
  subtitle: { fontSize: 14, color: colors.gray500, textAlign: "center", marginBottom: spacing.xl },
  buttons: { alignSelf: "stretch", gap: spacing.md },
  langBtn: {
    borderWidth: 2,
    borderColor: colors.gray200,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    backgroundColor: colors.white,
  },
  langName: { fontSize: 18, fontWeight: "700", color: colors.gray900 },
  langSub: { fontSize: 13, color: colors.gray500, marginTop: 2 },
});
