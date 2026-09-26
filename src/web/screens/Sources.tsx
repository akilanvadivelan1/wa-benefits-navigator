import { useLang } from "../i18n/i18n.tsx";

/** Official primary sources shown on the Sources page. */
const AGENCY_LINKS: Array<{ key: keyof AgencyKeys; url: string }> = [
  { key: "agencyHealth", url: "https://www.hca.wa.gov/about-hca/programs-and-initiatives/apple-health-medicaid/" },
  { key: "agencyDshs", url: "https://www.dshs.wa.gov/dda" },
  { key: "agencyDcyf", url: "https://www.dcyf.wa.gov/services/child-development-supports/esit" },
  { key: "agencyOspi", url: "https://ospi.k12.wa.us/student-success/special-education" },
  { key: "agencyDoh", url: "https://www.doh.wa.gov/CYSHCN" },
  { key: "agencySsa", url: "https://www.ssa.gov/ssi/text-child-ussi.htm" },
];

interface AgencyKeys {
  agencyHealth: string;
  agencyDshs: string;
  agencyDcyf: string;
  agencyOspi: string;
  agencyDoh: string;
  agencySsa: string;
}

export const Sources = () => {
  const { t } = useLang();
  const s = t.sources;

  return (
    <div className="page">
      <div className="page-header">
        <h1>{s.title}</h1>
        <p className="page-lead">{s.lead}</p>
      </div>

      <div className="page-body">
        <section className="page-section">
          <h2>{s.howTitle}</h2>
          <p>{s.howBody}</p>
        </section>

        <section className="page-section">
          <h2>{s.engineTitle}</h2>
          <p>{s.engineBody}</p>
        </section>

        <section className="page-section">
          <h2>{s.honestTitle}</h2>
          <p>{s.honestBody}</p>
        </section>

        <section className="page-section">
          <h2>{s.listTitle}</h2>
          <ul className="source-list">
            {AGENCY_LINKS.map((item) => (
              <li key={item.key}>
                <a href={item.url} target="_blank" rel="noreferrer noopener">
                  {s[item.key]}
                </a>
              </li>
            ))}
          </ul>
          <p className="source-verify">{s.verifyNote}</p>
        </section>
      </div>
    </div>
  );
};
