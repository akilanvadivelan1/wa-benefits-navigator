import { useLang } from "../i18n/i18n.tsx";

export const Footer = () => {
  const { t } = useLang();
  return (
    <footer className="footer">
      <div className="footer-content">
        <p className="footer-disclaimer">{t.footer.disclaimer}</p>
        <p className="footer-meta">{t.footer.meta}</p>
      </div>
    </footer>
  );
};
