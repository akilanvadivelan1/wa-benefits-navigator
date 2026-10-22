import { jsx as _jsx } from "react/jsx-runtime";
/**
 * Lightweight bilingual (English/Spanish) system.
 *
 * A React context holds the current language choice. The useLang hook returns
 * the active language plus a `t` object of translated strings. Everything is
 * client-side. The chosen language is remembered in localStorage only, so
 * nothing is sent anywhere.
 */
import { createContext, useContext, useState } from "react";
import { STRINGS } from "./strings.js";
const LangContext = createContext({
    chosen: null,
    lang: "en",
    setLang: () => { },
    t: STRINGS.en,
});
function readSavedLang() {
    try {
        if (typeof localStorage === "undefined")
            return null;
        const saved = localStorage.getItem("wabn.lang");
        return saved === "en" || saved === "es" ? saved : null;
    }
    catch {
        return null;
    }
}
export const LanguageProvider = ({ children }) => {
    const [chosen, setChosen] = useState(readSavedLang());
    const setLang = (l) => {
        setChosen(l);
        try {
            if (typeof localStorage !== "undefined")
                localStorage.setItem("wabn.lang", l);
        }
        catch {
            // ignore storage errors (private mode, etc.)
        }
    };
    const active = chosen ?? "en";
    const value = {
        chosen,
        lang: active,
        setLang,
        t: STRINGS[active],
    };
    return _jsx(LangContext.Provider, { value: value, children: children });
};
/** Access the current language, setter, and translated strings. */
export function useLang() {
    return useContext(LangContext);
}
