# WA Benefits Navigator, iPhone app (Phase 2)

A React Native (Expo) build of the WA Benefits Navigator for iPhone (and Android). It reuses the exact same portable rules engine and program data as the web app. Only the screens are rebuilt with native components.

## What this is

Phase 1 was a React web app. Phase 2 is this mobile app. The plan from the start was to keep the business logic framework-agnostic so it could power both. That paid off here: the entire `core/` folder (types, rules engine, all 15 programs, counties, and county contacts) was copied over unchanged and compiles with zero errors.

## What was reused vs rebuilt

Reused with no changes (the "brain"):

- `src/core/` (identical to the web app's `src/core/`): the type system, the scored eligibility engine, the 15 programs with citations, and county contacts.

Rebuilt as native (the "face"):

- Screens: Home, Quiz (11 steps), Results, Program Detail, Browse.
- Components: OptionCard, ConfidenceBadge, buttons, and a Read-aloud button.
- Navigation: a native stack (Home to Quiz to Results to Detail, plus Browse).

## The one platform swap

The web app read text aloud with the browser Web Speech API. Native has no browser, so the Read-aloud button uses `expo-speech`, which does the same thing on-device. The behavior for the user is the same: tap to listen, tap to stop.

Links and phone numbers use React Native's `Linking` (tapping a phone number opens the dialer, tapping a source opens the browser).

## Privacy model (unchanged)

Still client-side only. No server, no accounts, nothing stored or transmitted. Quiz answers live in app memory and are passed between screens as navigation parameters, then discarded.

## Run it on your iPhone (on a Mac)

You do not need a paid Apple Developer account or the App Store to demo this. Use Expo Go.

1. Install the dependencies:

   ```bash
   cd mobile
   npm install
   ```

2. Start the dev server:

   ```bash
   npx expo start
   ```

3. On your iPhone, install the free "Expo Go" app from the App Store, then scan the QR code shown in your terminal (use the Camera app, it will offer to open Expo Go). The app loads on your phone over your local network, so keep the Mac and phone on the same Wi-Fi.

To type-check the code:

```bash
npm run typecheck
```

## Project layout

```
mobile/
  App.tsx                 Navigation container and stack
  index.ts                Expo entry point
  app.json                Expo config (name, icons, bundle id)
  src/
    core/                 Portable brain, copied unchanged from the web app
    content/quizContent.ts  Quiz question text (example-first wording)
    components/           OptionCard, Badge, SpeakButton, Buttons
    screens/              Home, Quiz, Results, Detail, Browse
    navigation.ts         Route param types
    theme.ts              Colors, spacing, fonts
```

## Note for judges and reviewers

The eligibility logic that decides which programs a family may qualify for is the same code in both the web and mobile apps. That is the point of the architecture: one tested rules engine, two front ends.
