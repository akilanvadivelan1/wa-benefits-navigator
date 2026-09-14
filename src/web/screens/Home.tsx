interface Props {
  onStartQuiz: () => void;
  onBrowse: () => void;
}

export const Home = ({ onStartQuiz, onBrowse }: Props) => {
  return (
    <div className="home">
      <section className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-content">
          <span className="hero-badge">
            <span className="hero-badge-dot" aria-hidden="true" />
            For Washington families
          </span>
          <h1 className="hero-title">
            You are not alone in this.
            <br />
            <span className="hero-title-accent">Let us help you find support.</span>
          </h1>
          <p className="hero-subtitle">
            Raising a neuro-divergent or special needs child is a journey, and
            Washington has more than 15 programs to help. Answer a few gentle,
            plain-language questions and get a personalized plan that shows what
            your family likely qualifies for and exactly how to start.
          </p>
          <div className="hero-buttons">
            <button className="btn btn-accent btn-lg" onClick={onStartQuiz}>
              Find programs for my child
            </button>
            <button className="btn btn-secondary" onClick={onBrowse}>
              Browse all programs
            </button>
          </div>
          <div className="hero-stats">
            <div className="stat">
              <span className="stat-number">15+</span>
              <span className="stat-label">Programs</span>
            </div>
            <div className="stat">
              <span className="stat-number">2 min</span>
              <span className="stat-label">To get started</span>
            </div>
            <div className="stat">
              <span className="stat-number">100%</span>
              <span className="stat-label">Free and private</span>
            </div>
          </div>
          <p className="hero-privacy">
            <span aria-hidden="true">🔒</span> Your answers stay on your device.
            Nothing is saved or sent anywhere.
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

      <section className="reassure">
        <div className="reassure-inner">
          <h2>We know this can feel overwhelming</h2>
          <p>
            The system is confusing on purpose or not, it does not matter. What
            matters is that you do not have to figure it out alone. We explain
            every program in plain language, lead with real examples, and always
            point you to the official source so you can trust what you read.
          </p>
          <button className="btn btn-accent" onClick={onStartQuiz}>
            Start the 2 minute quiz
          </button>
        </div>
      </section>
    </div>
  );
};
