import type { Confidence } from "../../core/types.ts";
import { useLang } from "../i18n/i18n.tsx";

const CLASS_BY_CONFIDENCE: Record<Confidence, string> = {
  likelyEligible: "badge badge-green",
  noBarriers: "badge badge-blue",
  mayQualify: "badge badge-yellow",
  notLikely: "badge badge-gray",
};

export const ConfidenceBadge = ({ confidence }: { confidence: Confidence }) => {
  const { t } = useLang();
  return <span className={CLASS_BY_CONFIDENCE[confidence]}>{t.confidence[confidence]}</span>;
};
