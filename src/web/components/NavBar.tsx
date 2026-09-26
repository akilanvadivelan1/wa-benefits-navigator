import type { Screen } from "../App.tsx";
import { useLang } from "../i18n/i18n.tsx";

interface Props {
  onHome: () => void;
  onBrowse: () => void;
  onAbout: () => void;
  onSources: () => void;
  active: Screen["name"];
}

export const NavBar = ({ onHome, onBrowse, onAbout, onSources, active }: Props) => {
  const { lang, setLang, t } = useLang();

  return (
    <nav className="navbar">
      <div className="nav-content">
        <button className="logo" onClick={onHome} aria-label={t.nav.goHome}>
          <span className="logo-mark" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
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
          <span className="logo-text">WA Benefits Navigator</span>
        </button>

        <div className="nav-right">
          <div className="nav-links">
            <button className={active === "home" ? "nav-link active" : "nav-link"} onClick={onHome}>
              {t.nav.home}
            </button>
            <button className={active === "browse" ? "nav-link active" : "nav-link"} onClick={onBrowse}>
              {t.nav.programs}
            </button>
            <button className={active === "about" ? "nav-link active" : "nav-link"} onClick={onAbout}>
              {t.nav.about}
            </button>
            <button className={active === "sources" ? "nav-link active" : "nav-link"} onClick={onSources}>
              {t.nav.sources}
            </button>
          </div>

          <div className="lang-toggle" role="group" aria-label={t.nav.language}>
            <button
              className={lang === "en" ? "lang-btn active" : "lang-btn"}
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
            >
              EN
            </button>
            <button
              className={lang === "es" ? "lang-btn active" : "lang-btn"}
              onClick={() => setLang("es")}
              aria-pressed={lang === "es"}
            >
              ES
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
