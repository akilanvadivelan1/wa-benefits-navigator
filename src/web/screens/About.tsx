import { useLang } from "../i18n/i18n.tsx";

interface Props {
  onStartQuiz: () => void;
}

export const About = ({ onStartQuiz }: Props) => {
  const { t } = useLang();
  const a = t.about;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{a.title}</h1>
        <p className="page-lead">{a.lead}</p>
      </div>

      <div className="page-body">
        <section className="page-section">
          <h2>{a.problemTitle}</h2>
          <p>{a.problemBody}</p>
        </section>

        <section className="page-section">
          <h2>{a.approachTitle}</h2>
          <p>{a.approachBody}</p>
        </section>

        <section className="page-section">
          <h2>{a.privacyTitle}</h2>
          <p>{a.privacyBody}</p>
        </section>

        <section className="page-section">
          <h2>{a.roadmapTitle}</h2>
          <p>{a.roadmapBody}</p>
        </section>

        <div className="page-callout">
          <strong>{a.disclaimerTitle}.</strong> {t.footer.disclaimer}
        </div>

        <div className="page-cta">
          <p>{a.builtFor}</p>
          <button className="btn btn-accent" onClick={onStartQuiz}>
            {t.home.ctaPrimary}
          </button>
        </div>
      </div>
    </div>
  );
};
