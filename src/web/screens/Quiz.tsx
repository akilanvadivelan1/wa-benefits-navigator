import { useState } from "react";
import type {
  AgeBand,
  Condition,
  HelpType,
  IncomeBand,
  LivingSituation,
  QuizAnswers,
  SupportLevel,
} from "../../core/types.ts";
import { WA_COUNTIES } from "../../core/counties.ts";
import {
  AGE_OPTIONS,
  CONDITION_OPTIONS,
  HELP_OPTIONS,
  INCOME_OPTIONS,
  LIVING_OPTIONS,
  STEP_META,
  SUPPORT_OPTIONS,
} from "./quizContent.ts";

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onExit: () => void;
}

const TOTAL_STEPS = STEP_META.length;

export const Quiz = ({ onComplete, onExit }: Props) => {
  const [step, setStep] = useState(0);
  const [ageBand, setAgeBand] = useState<AgeBand | undefined>(undefined);
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [supportLevel, setSupportLevel] = useState<SupportLevel | undefined>(undefined);
  const [incomeBand, setIncomeBand] = useState<IncomeBand | undefined>(undefined);
  const [livingSituation, setLivingSituation] = useState<LivingSituation | undefined>(undefined);
  const [county, setCounty] = useState<string>("");
  const [helpTypes, setHelpTypes] = useState<HelpType[]>([]);
  const [error, setError] = useState<string | null>(null);

  const meta = STEP_META[step]!;
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!ageBand;
      case 1: return conditions.length > 0;
      case 2: return !!supportLevel;
      case 3: return !!incomeBand;
      case 4: return !!livingSituation;
      case 5: return true; // help types optional
      default: return true;
    }
  };

  const next = () => {
    if (!canProceed()) {
      setError("Please choose an answer to continue.");
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS - 1) {
      setStep(step + 1);
    } else {
      onComplete({
        ageBand,
        conditions,
        supportLevel,
        incomeBand,
        livingSituation,
        county: county || undefined,
        helpTypes,
        alreadyEnrolled: [],
      });
    }
  };

  const back = () => {
    setError(null);
    if (step === 0) onExit();
    else setStep(step - 1);
  };

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          Step {step + 1} of {TOTAL_STEPS}
        </span>
      </div>

      <div className="quiz-card">
        <h2 className="quiz-question">{meta.title}</h2>
        <p className="quiz-helper">{meta.helper}</p>

        <div className="quiz-options">
          {step === 0 &&
            AGE_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={ageBand === o.value}
                onClick={() => setAgeBand(o.value)}
              />
            ))}

          {step === 1 &&
            CONDITION_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={conditions.includes(o.value)}
                multi
                onClick={() => setConditions(toggle(conditions, o.value))}
              />
            ))}

          {step === 2 &&
            SUPPORT_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={supportLevel === o.value}
                onClick={() => setSupportLevel(o.value)}
              />
            ))}

          {step === 3 &&
            INCOME_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                description={o.description}
                selected={incomeBand === o.value}
                onClick={() => setIncomeBand(o.value)}
              />
            ))}

          {step === 4 && (
            <>
              {LIVING_OPTIONS.map((o) => (
                <OptionCard
                  key={o.value}
                  label={o.label}
                  description={o.description}
                  selected={livingSituation === o.value}
                  onClick={() => setLivingSituation(o.value)}
                />
              ))}
              <div className="county-field">
                <label htmlFor="county">
                  Which county do you live in? (optional, helps us show local
                  offices)
                </label>
                <select
                  id="county"
                  value={county}
                  onChange={(e: { target: { value: string } }) => setCounty(e.target.value)}
                >
                  <option value="">Select a county</option>
                  {WA_COUNTIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 5 &&
            HELP_OPTIONS.map((o) => (
              <OptionCard
                key={o.value}
                label={o.label}
                selected={helpTypes.includes(o.value)}
                multi
                onClick={() => setHelpTypes(toggle(helpTypes, o.value))}
              />
            ))}
        </div>

        <div className="why-we-ask">
          <strong>Why we ask:</strong> {meta.whyWeAsk}
        </div>

        {error && <p className="quiz-error">{error}</p>}

        <div className="quiz-nav">
          <button className="btn btn-secondary" onClick={back}>
            {step === 0 ? "Exit" : "Back"}
          </button>
          <button className="btn btn-primary" onClick={next}>
            {step === TOTAL_STEPS - 1 ? "See My Results" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
};

interface OptionCardProps {
  label: string;
  description?: string;
  selected: boolean;
  multi?: boolean;
  onClick: () => void;
}

const OptionCard = ({ label, description, selected, multi, onClick }: OptionCardProps) => {
  return (
    <button
      type="button"
      className={selected ? "option-card selected" : "option-card"}
      onClick={onClick}
      aria-pressed={selected}
    >
      <span className="option-content">
        <span className="option-label">{label}</span>
        {description && <span className="option-desc">{description}</span>}
      </span>
      {multi && <span className={selected ? "checkbox-indicator on" : "checkbox-indicator"} aria-hidden="true" />}
    </button>
  );
};
