import type { Screen } from "../App.tsx";

interface Props {
  onHome: () => void;
  onBrowse: () => void;
  active: Screen["name"];
}

export const NavBar = ({ onHome, onBrowse, active }: Props) => {
  return (
    <nav className="navbar">
      <div className="nav-content">
        <button className="logo" onClick={onHome} aria-label="Go to home">
          <span className="logo-mark" aria-hidden="true">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <circle cx="16" cy="16" r="16" fill="#0F766E" />
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
        <div className="nav-links">
          <button
            className={active === "home" ? "nav-link active" : "nav-link"}
            onClick={onHome}
          >
            Home
          </button>
          <button
            className={active === "browse" ? "nav-link active" : "nav-link"}
            onClick={onBrowse}
          >
            All Programs
          </button>
        </div>
      </div>
    </nav>
  );
};
