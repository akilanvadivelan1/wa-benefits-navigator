/**
 * Native i18n. Reuses the exact same string dictionary as the web app
 * (src/web/i18n/strings.ts has no web dependencies, so it is safe to import),
 * and stores the chosen language with AsyncStorage.
 */

import { createContext, useContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { STRINGS } from "../src/web/i18n/strings.ts";
import type { Strings } from "../src/web/i18n/strings.ts";

export type Lang = "en" | "es";

interface LangContextValue {
  chosen: Lang | null;
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Strings;
  ready: boolean;
}

const LangContext = createContext<LangContextValue>({
  chosen: null,
  lang: "en",
  setLang: () => {},
  t: STRINGS.en,
  ready: false,
});

const STORAGE_KEY = "wabn.lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [chosen, setChosen] = useState<Lang | null>(null);
  const [ready, setReady] = useState(false);

  // Load the saved language once on startup.
  useEffect(() => {
    let active = true;
    AsyncStorage.getItem(STORAGE_KEY)
      .then((saved) => {
        if (!active) return;
        if (saved === "en" || saved === "es") setChosen(saved);
      })
      .catch(() => {})
      .finally(() => {
        if (active) setReady(true);
      });
    return () => {
      active = false;
    };
  }, []);

  const setLang = (l: Lang) => {
    setChosen(l);
    AsyncStorage.setItem(STORAGE_KEY, l).catch(() => {});
  };

  const active: Lang = chosen ?? "en";
  const value: LangContextValue = {
    chosen,
    lang: active,
    setLang,
    t: STRINGS[active],
    ready,
  };

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
  return useContext(LangContext);
}
