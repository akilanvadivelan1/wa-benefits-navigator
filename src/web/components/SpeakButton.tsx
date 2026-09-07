/**
 * Text-to-speech button using the browser's built-in Web Speech API.
 * Free, private, and offline. Reads the given text aloud so parents can
 * listen instead of read. Falls back gracefully if unsupported.
 */

import { useState } from "react";

// Minimal typing for the Web Speech API (no DOM lib types for this in shim).
interface SpeechLike {
  speak(u: unknown): void;
  cancel(): void;
}
declare const window: {
  speechSynthesis?: SpeechLike;
  SpeechSynthesisUtterance?: new (text: string) => unknown;
};

export const SpeakButton = ({ text, label = "Read aloud" }: { text: string; label?: string }) => {
  const [speaking, setSpeaking] = useState(false);

  const supported =
    typeof window !== "undefined" &&
    !!window.speechSynthesis &&
    !!window.SpeechSynthesisUtterance;

  if (!supported) return null;

  const toggle = () => {
    const synth = window.speechSynthesis!;
    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }
    const Utterance = window.SpeechSynthesisUtterance!;
    const utter = new Utterance(text) as { onend: (() => void) | null; rate: number };
    utter.rate = 0.95;
    utter.onend = () => setSpeaking(false);
    synth.speak(utter);
    setSpeaking(true);
  };

  return (
    <button className="speak-btn" onClick={toggle} aria-pressed={speaking}>
      <span aria-hidden="true">{speaking ? "⏹" : "🔊"}</span>
      {speaking ? "Stop" : label}
    </button>
  );
};
