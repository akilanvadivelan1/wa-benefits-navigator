import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * Text-to-speech button using the browser's built-in Web Speech API.
 * Free, private, and offline. Reads the given text aloud so parents can
 * listen instead of read. Falls back gracefully if unsupported.
 */
import { useState } from "react";
export const SpeakButton = ({ text, label = "Read aloud" }) => {
    const [speaking, setSpeaking] = useState(false);
    const supported = typeof window !== "undefined" &&
        !!window.speechSynthesis &&
        !!window.SpeechSynthesisUtterance;
    if (!supported)
        return null;
    const toggle = () => {
        const synth = window.speechSynthesis;
        if (speaking) {
            synth.cancel();
            setSpeaking(false);
            return;
        }
        const Utterance = window.SpeechSynthesisUtterance;
        const utter = new Utterance(text);
        utter.rate = 0.95;
        utter.onend = () => setSpeaking(false);
        synth.speak(utter);
        setSpeaking(true);
    };
    return (_jsxs("button", { className: "speak-btn", onClick: toggle, "aria-pressed": speaking, children: [_jsx("span", { "aria-hidden": "true", children: speaking ? "⏹" : "🔊" }), speaking ? "Stop" : label] }));
};
