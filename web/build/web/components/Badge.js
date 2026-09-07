import { jsx as _jsx } from "react/jsx-runtime";
import { CONFIDENCE_LABEL } from "../../core/engine.js";
const CLASS_BY_CONFIDENCE = {
    likelyEligible: "badge badge-green",
    noBarriers: "badge badge-blue",
    mayQualify: "badge badge-yellow",
    notLikely: "badge badge-gray",
};
export const ConfidenceBadge = ({ confidence }) => {
    return _jsx("span", { className: CLASS_BY_CONFIDENCE[confidence], children: CONFIDENCE_LABEL[confidence] });
};
