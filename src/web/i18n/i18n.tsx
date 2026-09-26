/**
 * Lightweight bilingual (English/Spanish) system.
 *
 * A React context holds the current language choice. The useLang hook returns
 * the active language plus a `t` object of translated strings. Everything is
 * client-side. The chosen language is remembered in localStorage only, so
 * nothing is sent anywhere.
 */

import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";
import { STRINGS } from "./strings.ts";
import type { Strings } from "./strings.ts";

export type Lang = "en" | "es";

interface LangContextValue {
  /** The user's explicit choice, or null if they have not chosen yet. */
  chosen: Lang | null;
  /** The active language to render with (defaults to English before a choice). */
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
}

const LangContext = createContext<LangContextValue>({
  chosen: null,
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
});

// Minimal localStorage typing (no full DOM lib in the shim).
declare const localStorage:
  | { getItem(k: string): string | null; setItem(k: string, v: string): void }
  | undefined;

function readSavedLang(): Lang | null {
  try {
    if (typeof localStorage === "undefined") return null;
    const saved = localStorage.getItem("wabn.lang");
    return saved === "en" || saved === "es" ? saved : null;
  } catch {
    return null;
  }
}

export const LanguageProvider = ({ children }: { children?: ReactNode }) => {
  const [chosen, setChosen] = useState<Lang | null>(readSavedLang());

  const setLang = (l: Lang) => {
    setChosen(l);
    try {
      if (typeof localStorage !== "undefined") localStorage.setItem("wabn.lang", l);
    } catch {
      // ignore storage errors (private mode, etc.)
    }
  };

  const active: Lang = chosen ?? "en";
  const value: LangContextValue = {
    chosen,
    lang: active,
    setLang,
    t: STRINGS[active],
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
};

/** Access the current language, setter, and translated strings. */
export function useLang(): LangContextValue {
  return useContext(LangContext);
}
