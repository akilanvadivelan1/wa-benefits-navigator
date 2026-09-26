/**
 * Language gate. Shown before the user enters the app, the first time they
 * visit (until they pick a language). Their choice is remembered, so returning
 * users skip straight into the app.
 */

import { useLang } from "../i18n/i18n.tsx";
import { STRINGS } from "../i18n/strings.ts";

export const LanguageGate = () => {
  const { setLang } = useLang();

  return (
    <div className="gate">
      <div className="gate-glow" aria-hidden="true" />
      <div className="gate-card">
        <span className="gate-mark" aria-hidden="true">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="16" fill="#0E7C74" />
            <path
              d="M10 16L14 20L22 12"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
        <h1 className="gate-title">WA Benefits Navigator</h1>
        {/* Show the prompt in both languages so anyone understands it. */}
        <p className="gate-subtitle">
          {STRINGS.en.gate.subtitle} / {STRINGS.es.gate.subtitle}
        </p>
        <div className="gate-buttons">
          <button className="gate-lang-btn" onClick={() => setLang("en")}>
            <span className="gate-lang-name">English</span>
            <span className="gate-lang-sub">Continue in English</span>
          </button>
          <button className="gate-lang-btn" onClick={() => setLang("es")}>
            <span className="gate-lang-name">Español</span>
            <span className="gate-lang-sub">Continuar en español</span>
          </button>
        </div>
      </div>
    </div>
  );
};
