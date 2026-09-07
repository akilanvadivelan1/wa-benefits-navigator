# WA Benefits Navigator

Helps parents of neuro-divergent and special needs children in Washington State discover, understand, and act on the government programs their child likely qualifies for.

Built for the Congressional App Challenge 2026.

## Architecture

This project separates the portable "brain" from the "face":

```
wa-benefits-navigator/
  src/
    core/            <- Pure TypeScript. No framework. Ports to web + mobile.
      types.ts       <- The type system (data model, quiz, results)
      programs/      <- The 15 programs, as data
      rules/         <- The scored rules engine
    demo.ts          <- Runnable demo of the engine
    engine.test.ts   <- Runnable tests
```

The `core` folder contains all business logic (program data + eligibility rules + matching engine). It has zero UI dependencies, so the same code powers the React web app now and a React Native mobile app later.

## The Two Pillars

1. High-bar rules engine: every eligibility rule is traced to an official government source and produces honest confidence levels.
2. Example-first, human explanations: plain language everywhere, benefit-first, acronym-second.

## Project layout

```
wa-benefits-navigator/
  src/
    core/            Portable TypeScript brain (data + rules engine). No UI deps.
      types.ts       The type system
      programs/      The 15 programs, as data with official citations
      engine.ts      The scored, dependency-aware matching engine
      counties.ts, countyContacts.ts   County list and local office contacts
    web/             React UI (compiled to browser ESM)
      App.tsx, main.tsx
      screens/       Home, Quiz, Results, ProgramDetail, Browse
      components/    NavBar, Footer, Badge, SpeakButton (Web Speech API)
    demo.ts          Runnable engine demo
    engine.test.ts   120 assertions across representative scenarios
  web/               Static site root (index.html, styles.css)
    build/           Compiled app output (committed so it runs without tooling)
```

## Running the engine (no dependencies needed)

The core uses Node's built-in TypeScript support. If your shell has a broken
`NODE_OPTIONS`, prefix commands with `unset NODE_OPTIONS &&`.

```bash
npm run demo       # print the sample family's action plan
npm run test       # run the engine tests (120 assertions)
npm run typecheck  # verify core types
```

## Building and viewing the web app

The web app loads React from an ESM CDN via an import map, so there is no
bundler and no package install. Compile the TypeScript UI to browser JS with
the TypeScript compiler, then serve the static `web/` folder.

```bash
npm run build:web  # tsc -> web/build/ (browser ESM)
npm run serve      # serves web/ at http://localhost:8080
```

Then open http://localhost:8080 in a browser. Because the CDN import map needs
network access for React, view it in a normal browser (not an offline sandbox).

## Architecture notes

- Client-side only. No server, no database, no accounts. Quiz answers live in
  browser memory and are never saved or transmitted.
- The `core` folder is framework-agnostic, so the same rules engine and data
  can power a future React Native mobile app. Only the `web` UI layer is
  web-specific.

## Disclaimer

This app provides general guidance only. The agency that runs each program makes the final eligibility decision. Program figures and thresholds change over time and should be re-verified against official sources.
