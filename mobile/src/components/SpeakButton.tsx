/**
 * Text-to-speech button using expo-speech (the native equivalent of the web
 * app's Web Speech API). Free, private, and on-device. Reads the given text
 * aloud so parents can listen instead of read.
 */

import { useEffect, useState } from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import * as Speech from "expo-speech";
import { colors, font, radius, spacing } from "../theme.ts";

export const SpeakButton = ({ text, label = "Read aloud" }: { text: string; label?: string }) => {
  const [speaking, setSpeaking] = useState(false);

  // Stop any speech if the screen unmounts while talking.
  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  const toggle = () => {
    if (speaking) {
      Speech.stop();
      setSpeaking(false);
      return;
    }
    setSpeaking(true);
    Speech.speak(text, {
      rate: 0.95,
      onDone: () => setSpeaking(false),
      onStopped: () => setSpeaking(false),
      onError: () => setSpeaking(false),
    });
  };

  return (
    <Pressable
      onPress={toggle}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={speaking ? "Stop reading" : label}
    >
      <Text style={styles.icon}>{speaking ? "\u23F9" : "\uD83D\uDD0A"}</Text>
      <Text style={styles.label}>{speaking ? "Stop" : label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  btn: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    gap: spacing.sm,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: radius.pill,
    backgroundColor: colors.primarySoft,
  },
  pressed: { opacity: 0.7 },
  icon: { fontSize: font.body },
  label: { color: colors.primaryDark, fontWeight: "700", fontSize: font.small },
});
