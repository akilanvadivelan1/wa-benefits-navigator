import type { MatchResult, ProgramId } from "../../core/types.ts";
import { ConfidenceBadge } from "../components/Badge.tsx";
import { useLang } from "../i18n/i18n.tsx";

interface Props {
  result: MatchResult;
  county?: string;
  onOpenProgram: (id: ProgramId) => void;
  onRetake: () => void;
  onBrowse: () => void;
}

export const Results = ({ result, onOpenProgram, onRetake, onBrowse }: Props) => {
  const { t } = useLang();
  const r0 = t.results;
  const { recommended, notLikely, summary } = result;

  const firstStep = recommended[0];

  return (
    <div className="results">
      <div className="results-header">
        <div className="results-check" aria-hidden="true">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="#D1FAE5" />
            <path d="M13 20L18 25L27 16" stroke="#065F46" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
        <h1 className="results-title">
          {r0.titlePrefix} <span className="highlight">{summary.total} {r0.titleSuffix}</span>
        </h1>
        <p className="results-subtitle">{r0.subtitle}</p>
        <div className="results-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
            {r0.print}
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onRetake}>
            {r0.retake}
          </button>
        </div>
      </div>

      {firstStep && (
        <div className="results-callout">
          <span className="callout-icon" aria-hidden="true">i</span>
          <span>
            <strong>{r0.startWith} ({firstStep.program.content.officialName}).</strong>{" "}
            {firstStep.whyThisOrder ?? r0.strongFirst}
          </span>
        </div>
      )}

      <ol className="results-list">
        {recommended.map((r) => (
          <li key={r.program.id}>
            <button className="result-card" onClick={() => onOpenProgram(r.program.id)}>
              <span className="result-priority">{r.applyOrder}</span>
              <span className="result-content">
                <span className="result-top">
                  <ConfidenceBadge confidence={r.confidence} />
                  <span className="result-agency">{r.program.agencyName}</span>
                  {r.alreadyEnrolled && <span className="badge badge-gray">{r0.alreadyEnrolled}</span>}
                </span>
                <span className="result-name">{r.program.content.humanName}</span>
                <span className="result-official">{r.program.content.officialName}</span>
                <span className="result-desc">{r.program.content.oneLiner}</span>
                {r.whyThisOrder && (
                  <span className="result-why">{r.whyThisOrder}</span>
                )}
                {r.matchesRequestedHelp && (
                  <span className="result-match">{r0.matchesHelp}</span>
                )}
              </span>
              <span className="result-arrow" aria-hidden="true">›</span>
            </button>
          </li>
        ))}
      </ol>

      {notLikely.length > 0 && (
        <details className="not-likely">
          <summary>
            {r0.notLikelyTitle} ({notLikely.length})
          </summary>
          <ul>
            {notLikely.map((r) => {
              const reason = r.reasons.find((x) => x.effect === "fail");
              return (
                <li key={r.program.id}>
                  <strong>{r.program.content.officialName}</strong>
                  {reason && <span> {reason.reason}</span>}
                </li>
              );
            })}
          </ul>
        </details>
      )}

      <div className="results-footer">
        <button className="btn btn-primary" onClick={onBrowse}>
          {r0.browseAll}
        </button>
      </div>
    </div>
  );
};

// Minimal window typing for print (no full DOM lib in shim).
declare const window: { print(): void };
