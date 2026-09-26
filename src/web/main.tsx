/**
 * Web entry point. Mounts the React app into #root.
 * At runtime, React is loaded from the CDN via the import map in index.html.
 */

import { createRoot } from "react-dom/client";
import { App } from "./App.tsx";
import { LanguageProvider } from "./i18n/i18n.tsx";

const container = document.getElementById("root");
if (container) {
  const root = createRoot(container);
  root.render(
    <LanguageProvider>
      <App />
    </LanguageProvider>,
  );
}
