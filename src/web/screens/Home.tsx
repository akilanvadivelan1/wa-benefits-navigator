import { useLang } from "../i18n/i18n.tsx";

interface Props {
  onStartQuiz: () => void;
  onBrowse: () => void;
}

export const Home = ({ onStartQuiz, onBrowse }: Props) => {
  const { t } = useLang();
  const h = t.home;

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            {h.badge}
          </span>
          <h1 className="hero-title">
            {h.titleLine1}
            <br />
            <span className="hero-title-accent">{h.titleLine2}</span>
          </h1>
          <p className="hero-subtitle">{h.subtitle}</p>
          <div className="hero-buttons">
            <button className="btn btn-accent btn-lg" onClick={onStartQuiz}>
              {h.ctaPrimary}
            </button>
            <button className="btn btn-secondary" onClick={onBrowse}>
              {h.ctaSecondary}
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">{h.statPrograms}</span>
            </div>
            <div className="stat">
              <span className="stat-number">{h.statTimeValue}</span>
              <span className="stat-label">{h.statTime}</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">{h.statFree}</span>
            </div>
          </div>
          <p className="hero-privacy">
            <span aria-hidden="true">🔒</span> {h.privacy}
          </p>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">{h.howTitle}</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-num">1</div>
            <h3>{h.step1Title}</h3>
            <p>{h.step1Body}</p>
          </div>
          <div className="feature-card">
            <div className="feature-num">2</div>
            <h3>{h.step2Title}</h3>
            <p>{h.step2Body}</p>
          </div>
          <div className="feature-card">
            <div className="feature-num">3</div>
            <h3>{h.step3Title}</h3>
            <p>{h.step3Body}</p>
          </div>
        </div>
      </section>

      <section className="reassure">
        <div className="reassure-inner">
          <h2>{h.reassureTitle}</h2>
          <p>{h.reassureBody}</p>
          <button className="btn btn-accent" onClick={onStartQuiz}>
            {h.reassureCta}
          </button>
        </div>
      </section>
    </div>
  );
};
