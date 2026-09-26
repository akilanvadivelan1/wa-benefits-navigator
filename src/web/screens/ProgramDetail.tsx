import type { Program } from "../../core/types.ts";
import { PROGRAMS_BY_ID } from "../../core/programs/index.ts";
import { getLocalContact } from "../../core/countyContacts.ts";
import { SpeakButton } from "../components/SpeakButton.tsx";
import { useLang } from "../i18n/i18n.tsx";

interface Props {
  program: Program;
  county?: string;
  onBack: () => void;
  backLabel: string;
}

export const ProgramDetail = ({ program, county, onBack, backLabel }: Props) => {
  const { t } = useLang();
  const d = t.detail;
  const c = program.content;
  const localContact = program.hasCountyLocalContact
    ? getLocalContact(program.id, county)
    : undefined;

  const speakText = `${c.humanName}. ${c.exampleFirst} ${d.whatYouGet}: ${c.whatYouGet.join(". ")}.`;

  return (
    <div className="detail">
      <button className="back-link" onClick={onBack}>
        ‹ {backLabel}
      </button>

      <div className="detail-header">
        <div className="detail-header-top">
          <span className="detail-agency">{program.agencyName}</span>
        </div>
        <h1 className="detail-title">{c.humanName}</h1>
        <p className="detail-official">{c.officialName}</p>
        <p className="detail-subtitle">{c.oneLiner}</p>
        <SpeakButton text={speakText} label={d.readAloud} />
      </div>

      <div className="detail-grid">
        <div className="detail-main">
          <section className="detail-section">
            <h2>{d.whatItMeans}</h2>
            <p className="example-first">{c.exampleFirst}</p>
          </section>

          <section className="detail-section">
            <h2>{d.whatYouGet}</h2>
            <ul className="benefit-list">
              {c.whatYouGet.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="detail-section">
            <h2>{d.howToApply}</h2>
            <ol className="steps-list">
              {program.apply.steps.map((s, i) => (
                <li key={i}>{s}</li>
              ))}
            </ol>
          </section>

          <section className="detail-section">
            <h2>{d.tips}</h2>
            <ul className="tips-list">
              {c.tips.map((tip, i) => (
                <li key={i}>{tip}</li>
              ))}
            </ul>
          </section>
        </div>

        <aside className="detail-sidebar">
          <div className="sidebar-card sidebar-card-action">
            <h3>{d.takeAction}</h3>
            {program.apply.url && (
              <a className="btn btn-primary btn-block" href={program.apply.url} target="_blank" rel="noreferrer noopener">
                {d.learnOrApply}
              </a>
            )}
            {program.apply.phone && (
              <a className="btn btn-secondary btn-block" href={`tel:${program.apply.phone.replace(/[^0-9]/g, "")}`}>
                {d.call} {program.apply.phone}
              </a>
            )}
          </div>

          {localContact && (
            <div className="sidebar-card">
              <h3>{d.localContact}</h3>
              <p className="local-office">{localContact.office}</p>
              <a className="local-phone" href={`tel:${localContact.phone.replace(/[^0-9]/g, "")}`}>
                {localContact.phone}
              </a>
              <p className="local-note">{localContact.note}</p>
            </div>
          )}

          <div className="sidebar-card">
            <h3>{d.documents}</h3>
            <ul className="checklist">
              {program.apply.documents.map((d, i) => (
                <li key={i}>
                  <input type="checkbox" id={`doc-${program.id}-${i}`} />
                  <label htmlFor={`doc-${program.id}-${i}`}>{d}</label>
                </li>
              ))}
            </ul>
          </div>

          {program.unlocks.length > 0 && (
            <div className="sidebar-card">
              <h3>{d.unlocks}</h3>
              <ul className="related-programs">
                {program.unlocks.map((u) => (
                  <li key={u}>{PROGRAMS_BY_ID[u].content.officialName}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="sidebar-card">
            <h3>{d.sources}</h3>
            <ul className="citations">
              {program.citations.map((cit, i) => (
                <li key={i}>
                  <a href={cit.url} target="_blank" rel="noreferrer noopener">
                    {cit.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
};
