import { useState } from "react";
import type { Program, ProgramCategory, ProgramId } from "../../core/types.ts";

interface Props {
  programs: Program[];
  onOpenProgram: (id: ProgramId) => void;
  onStartQuiz: () => void;
}

const CATEGORY_LABEL: Record<ProgramCategory, string> = {
  health: "Health",
  services: "Services",
  cash: "Cash",
  education: "Education",
  savings: "Savings",
  support: "Support",
};

const FILTERS: Array<{ value: ProgramCategory | "all"; label: string }> = [
  { value: "all", label: "All" },
  { value: "health", label: "Health" },
  { value: "services", label: "Services" },
  { value: "cash", label: "Cash" },
  { value: "education", label: "Education" },
  { value: "savings", label: "Savings" },
  { value: "support", label: "Support" },
];

export const Browse = ({ programs, onOpenProgram, onStartQuiz }: Props) => {
  const [filter, setFilter] = useState<ProgramCategory | "all">("all");

  const visible =
    filter === "all" ? programs : programs.filter((p) => p.category === filter);

  return (
    <div className="browse">
      <div className="browse-header">
        <h1>All Washington State programs</h1>
        <p>
          These 15 programs span 5 state agencies and the federal government.
          Not sure which fit your family? Take the quiz for a personalized plan.
        </p>
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
        <p>Not sure which programs are right for your family?</p>
        <button className="btn btn-accent" onClick={onStartQuiz}>
          Take the eligibility quiz
        </button>
      </div>
    </div>
  );
};
