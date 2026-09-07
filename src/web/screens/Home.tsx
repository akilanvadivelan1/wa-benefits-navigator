interface Props {
  onStartQuiz: () => void;
  onBrowse: () => void;
}

export const Home = ({ onStartQuiz, onBrowse }: Props) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-content">
          <span className="hero-badge">Washington State Programs</span>
          <h1 className="hero-title">
            Find the right programs for your child in minutes
          </h1>
          <p className="hero-subtitle">
            There are more than 15 programs across 5 state agencies and the
            federal government for neuro-divergent and special needs children.
            Answer a few plain-language questions and get a personalized plan
            that shows what your family likely qualifies for and how to apply.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-accent btn-lg" onClick={onStartQuiz}>
              Find Programs for My Child
            </button>
            <button className="btn btn-secondary" onClick={onBrowse}>
              Browse All Programs
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Programs</span>
            </div>
            <div className="stat">
              <span className="stat-number">5</span>
              <span className="stat-label">State Agencies</span>
            </div>
            <div className="stat">
              <span className="stat-number">Free</span>
              <span className="stat-label">and Private</span>
            </div>
          </div>
          <p className="hero-privacy">
            Your answers stay on your device. Nothing is saved or sent anywhere.
          </p>
        </div>
      </section>

      <section className="features">
        <h2 className="section-title">How it works</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-num">1</div>
            <h3>Answer a few questions</h3>
            <p>
              Tell us about your child's age, needs, and your family situation.
              Every question is explained in plain language with examples. It
              takes about 2 minutes.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-num">2</div>
            <h3>Get matched</h3>
            <p>
              We check your answers against every program's real eligibility
              rules and show what your family likely qualifies for, with honest
              confidence levels.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-num">3</div>
            <h3>Take action</h3>
            <p>
              Get a step-by-step plan in the order you should apply, with direct
              links, phone numbers, and the documents to gather.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
