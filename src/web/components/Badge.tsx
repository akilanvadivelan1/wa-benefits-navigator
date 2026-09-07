import type { Confidence } from "../../core/types.ts";
import { CONFIDENCE_LABEL } from "../../core/engine.ts";

const CLASS_BY_CONFIDENCE: Record<Confidence, string> = {
  likelyEligible: "badge badge-green",
  noBarriers: "badge badge-blue",
  mayQualify: "badge badge-yellow",
  notLikely: "badge badge-gray",
};

export const ConfidenceBadge = ({ confidence }: { confidence: Confidence }) => {
  return <span className={CLASS_BY_CONFIDENCE[confidence]}>{CONFIDENCE_LABEL[confidence]}</span>;
};
