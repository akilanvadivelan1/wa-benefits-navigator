import { useState } from "react";
import type { Program, ProgramCategory, ProgramId } from "../../core/types.ts";
import { useLang } from "../i18n/i18n.tsx";

interface Props {
  programs: Program[];
  onOpenProgram: (id: ProgramId) => void;
  onStartQuiz: () => void;
}

export const Browse = ({ programs, onOpenProgram, onStartQuiz }: Props) => {
  const { t } = useLang();
  const [filter, setFilter] = useState<ProgramCategory | "all">("all");

  const CATEGORY_LABEL: Record<ProgramCategory, string> = {
    health: t.category.health,
    services: t.category.services,
    cash: t.category.cash,
    education: t.category.education,
    savings: t.category.savings,
    support: t.category.support,
  };

  const FILTERS: Array<{ value: ProgramCategory | "all"; label: string }> = [
    { value: "all", label: t.browse.filterAll },
    { value: "health", label: t.category.health },
    { value: "services", label: t.category.services },
    { value: "cash", label: t.category.cash },
    { value: "education", label: t.category.education },
    { value: "savings", label: t.category.savings },
    { value: "support", label: t.category.support },
  ];

  const visible =
    filter === "all" ? programs : programs.filter((p) => p.category === filter);

  return (
    <div className="browse">
      <div className="browse-header">
        <h1>{t.browse.title}</h1>
        <p>{t.browse.subtitle}</p>
      </div>

      <div className="browse-filters">
        {FILTERS.map((f) => (
          <button
            key={f.value}
            className={filter === f.value ? "filter-btn active" : "filter-btn"}
            onClick={() => setFilter(f.value)}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="programs-grid">
        {visible.map((p) => (
          <button key={p.id} className="program-card" onClick={() => onOpenProgram(p.id)}>
            <span className="program-card-top">
              <span className="program-card-agency">{p.agency}</span>
              <span className={`program-card-category cat-${p.category}`}>
                {CATEGORY_LABEL[p.category]}
              </span>
            </span>
            <span className="program-card-name">{p.content.humanName}</span>
            <span className="program-card-official">{p.content.officialName}</span>
            <span className="program-card-desc">{p.content.oneLiner}</span>
            <span className="program-card-arrow" aria-hidden="true">›</span>
          </button>
        ))}
      </div>

      <div className="browse-cta">
        <p>{t.browse.ctaText}</p>
        <button className="btn btn-accent" onClick={onStartQuiz}>
          {t.browse.ctaButton}
        </button>
      </div>
    </div>
  );
};
