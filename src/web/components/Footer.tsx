import { DISCLAIMER } from "../../core/engine.ts";

export const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-disclaimer">{DISCLAIMER}</p>
        <p className="footer-meta">
          WA Benefits Navigator. Built for the Congressional App Challenge.
          Information is drawn from official Washington State and federal
          government sources.
        </p>
      </div>
    </footer>
  );
};
