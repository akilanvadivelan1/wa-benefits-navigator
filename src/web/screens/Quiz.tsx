import { useState } from "react";
import type {
  AgeBand,
  CaregivingImpact,
  Condition,
  DiagnosisStatus,
  HelpType,
  IncomeBand,
  InsuranceStatus,
  LivingSituation,
  QuizAnswers,
  ResidencyStatus,
  SpecificNeed,
  SupportLevel,
} from "../../core/types.ts";
import { WA_COUNTIES } from "../../core/counties.ts";
import {
  AGE_OPTIONS,
  CAREGIVING_OPTIONS,
  CONDITION_OPTIONS,
  DEEP_STEP_META,
  DIAGNOSIS_OPTIONS,
  HELP_OPTIONS,
  INCOME_OPTIONS,
  INSURANCE_OPTIONS,
  LIVING_OPTIONS,
  NEEDS_OPTIONS,
  RESIDENCY_OPTIONS,
  STEP_META,
  SUPPORT_OPTIONS,
} from "./quizContent.ts";

interface Props {
  onComplete: (answers: QuizAnswers) => void;
  onExit: () => void;
}

// Step order: 6 core steps, then 5 deeper steps.
const ALL_STEP_META = [...STEP_META, ...DEEP_STEP_META];
const TOTAL_STEPS = ALL_STEP_META.length;

export const Quiz = ({ onComplete, onExit }: Props) => {
  const [step, setStep] = useState(0);
  // Core answers
  const [ageBand, setAgeBand] = useState<AgeBand | undefined>();
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [supportLevel, setSupportLevel] = useState<SupportLevel | undefined>();
  const [incomeBand, setIncomeBand] = useState<IncomeBand | undefined>();
  const [livingSituation, setLivingSituation] = useState<LivingSituation | undefined>();
  const [county, setCounty] = useState<string>("");
  const [helpTypes, setHelpTypes] = useState<HelpType[]>([]);
  // Deeper answers
  const [diagnosisStatus, setDiagnosisStatus] = useState<DiagnosisStatus | undefined>();
  const [specificNeeds, setSpecificNeeds] = useState<SpecificNeed[]>([]);
  const [caregivingImpact, setCaregivingImpact] = useState<CaregivingImpact | undefined>();
  const [insuranceStatus, setInsuranceStatus] = useState<InsuranceStatus | undefined>();
  const [residencyStatus, setResidencyStatus] = useState<ResidencyStatus | undefined>();

  const [error, setError] = useState<string | null>(null);

  const meta = ALL_STEP_META[step]!;
  const progress = Math.round(((step + 1) / TOTAL_STEPS) * 100);
  const isDeepStep = step >= STEP_META.length;

  const toggle = <T,>(list: T[], value: T): T[] =>
    list.includes(value) ? list.filter((x) => x !== value) : [...list, value];

  // Required steps: only the core single-select ones. Deeper steps are optional.
  const canProceed = (): boolean => {
    switch (step) {
      case 0: return !!ageBand;
      case 1: return conditions.length > 0;
      case 2: return !!supportLevel;
      case 3: return !!incomeBand;
      case 4: return !!livingSituation;
      default: return true; // help types and all deeper steps are optional
    }
  };

  const submit = () => {
    onComplete({
      ageBand,
      conditions,
      supportLevel,
      incomeBand,
      livingSituation,
      county: county || undefined,
      helpTypes,
      alreadyEnrolled: insuranceStatus === "appleHealthAlready" ? ["appleHealth"] : [],
      diagnosisStatus,
      specificNeeds: specificNeeds.length ? specificNeeds : undefined,
      caregivingImpact,
      insuranceStatus,
      residencyStatus,
    });
  };

  const next = () => {
    if (!canProceed()) {
      setError("Please choose an answer to continue.");
      return;
    }
    setError(null);
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };

  const back = () => {
    setError(null);
    if (step === 0) onExit();
    else setStep(step - 1);
  };

  const skip = () => {
    setError(null);
    if (step < TOTAL_STEPS - 1) setStep(step + 1);
    else submit();
  };

  return (
    <div className="quiz">
      <div className="quiz-progress">
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${progress}%` }} />
        </div>
        <span className="progress-text">
          Step {step + 1} of {TOTAL_STEPS}
          {isDeepStep && " · a few optional questions to sharpen your results"}
        </span>
      </div>

      <div className="quiz-card">
        <h2 className="quiz-question">{meta.title}</h2>
        <p className="quiz-helper">{meta.helper}</p>

        <div className="quiz-options">
          {step === 0 &&
            AGE_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={ageBand === o.value} onClick={() => setAgeBand(o.value)} />
            ))}

          {step === 1 &&
            CONDITION_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={conditions.includes(o.value)} multi onClick={() => setConditions(toggle(conditions, o.value))} />
            ))}

          {step === 2 &&
            SUPPORT_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={supportLevel === o.value} onClick={() => setSupportLevel(o.value)} />
            ))}

          {step === 3 &&
            INCOME_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={incomeBand === o.value} onClick={() => setIncomeBand(o.value)} />
            ))}

          {step === 4 && (
            <>
              {LIVING_OPTIONS.map((o) => (
                <OptionCard key={o.value} label={o.label} description={o.description} selected={livingSituation === o.value} onClick={() => setLivingSituation(o.value)} />
              ))}
              <div className="county-field">
                <label htmlFor="county">
                  Which county do you live in? (optional, helps us show local offices)
                </label>
                <select id="county" value={county} onChange={(e: { target: { value: string } }) => setCounty(e.target.value)}>
                  <option value="">Select a county</option>
                  {WA_COUNTIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </>
          )}

          {step === 5 &&
            HELP_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} selected={helpTypes.includes(o.value)} multi onClick={() => setHelpTypes(toggle(helpTypes, o.value))} />
            ))}

          {step === 6 &&
            DIAGNOSIS_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={diagnosisStatus === o.value} onClick={() => setDiagnosisStatus(o.value)} />
            ))}

          {step === 7 &&
            NEEDS_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={specificNeeds.includes(o.value)} multi onClick={() => setSpecificNeeds(toggle(specificNeeds, o.value))} />
            ))}

          {step === 8 &&
            CAREGIVING_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={caregivingImpact === o.value} onClick={() => setCaregivingImpact(o.value)} />
            ))}

          {step === 9 &&
            INSURANCE_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={insuranceStatus === o.value} onClick={() => setInsuranceStatus(o.value)} />
            ))}

          {step === 10 &&
            RESIDENCY_OPTIONS.map((o) => (
              <OptionCard key={o.value} label={o.label} description={o.description} selected={residencyStatus === o.value} onClick={() => setResidencyStatus(o.value)} />
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
          <div className="quiz-nav-right">
            {isDeepStep && step < TOTAL_STEPS - 1 && (
              <button className="btn btn-ghost" onClick={skip}>Skip</button>
            )}
            <button className="btn btn-primary" onClick={next}>
              {step === TOTAL_STEPS - 1 ? "See My Results" : "Next"}
            </button>
          </div>
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
