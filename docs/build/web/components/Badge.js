import { jsx as _jsx } from "react/jsx-runtime";
import { useLang } from "../i18n/i18n.js";
const CLASS_BY_CONFIDENCE = {
    likelyEligible: "badge badge-green",
    noBarriers: "badge badge-blue",
    mayQualify: "badge badge-yellow",
    notLikely: "badge badge-gray",
};
export const ConfidenceBadge = ({ confidence }) => {
    const { t } = useLang();
    return _jsx("span", { className: CLASS_BY_CONFIDENCE[confidence], children: t.confidence[confidence] });
};
