import type { MatchResult, ProgramId } from "../../core/types.ts";
import { ConfidenceBadge } from "../components/Badge.tsx";

interface Props {
  result: MatchResult;
  county?: string;
  onOpenProgram: (id: ProgramId) => void;
  onRetake: () => void;
  onBrowse: () => void;
}

export const Results = ({ result, onOpenProgram, onRetake, onBrowse }: Props) => {
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
          Your child may qualify for <span className="highlight">{summary.total} programs</span>
        </h1>
        <p className="results-subtitle">
          Here are the programs we recommend, listed in the order you should
          apply. Tap any program to see what it does and how to apply.
        </p>
        <div className="results-actions">
          <button className="btn btn-secondary btn-sm" onClick={() => window.print()}>
            Print or Save as PDF
          </button>
          <button className="btn btn-secondary btn-sm" onClick={onRetake}>
            Retake Quiz
          </button>
        </div>
      </div>

      {firstStep && (
        <div className="results-callout">
          <span className="callout-icon" aria-hidden="true">i</span>
          <span>
            <strong>Start with #1 ({firstStep.program.content.officialName}).</strong>{" "}
            {firstStep.whyThisOrder ??
              "This is a strong first step based on your answers."}
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
                  {r.alreadyEnrolled && <span className="badge badge-gray">Already enrolled</span>}
                </span>
                <span className="result-name">{r.program.content.humanName}</span>
                <span className="result-official">{r.program.content.officialName}</span>
                <span className="result-desc">{r.program.content.oneLiner}</span>
                {r.whyThisOrder && (
                  <span className="result-why">{r.whyThisOrder}</span>
                )}
                {r.matchesRequestedHelp && (
                  <span className="result-match">Matches the help you asked for</span>
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
            Programs that are not likely a fit right now ({notLikely.length})
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
          Browse all 15 programs
        </button>
      </div>
    </div>
  );
};

// Minimal window typing for print (no full DOM lib in shim).
declare const window: { print(): void };
