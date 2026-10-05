# Running the WA Benefits Navigator iOS app on your Mac

This is the native app, built with Expo (React Native). It reuses the exact
same rules engine, 15 programs, and translations as the website, and adds a
native iOS/Android interface. Follow these steps on your Mac.

You do NOT need to write any code. You run commands and, if anything fails,
copy the error back so it can be fixed.

---

## Step 0: What you need

- A Mac (you have one)
- Xcode installed from the Mac App Store (large download, do this first if needed)
- Node.js 18 or newer

Check what you have. Open the Terminal app and run:

```bash
node --version
npm --version
xcode-select -p
```

- If `node` is missing, install it from https://nodejs.org (LTS version).
- If `xcode-select -p` prints an error, run `xcode-select --install`.
- For the iPhone Simulator you also need the full Xcode app (not just the
  command line tools). Open Xcode once and let it finish installing components.

---

## Step 1: Get the code

If you have not already cloned the repo:

```bash
git clone https://github.com/akilanvadivelan1/wa-benefits-navigator.git
cd wa-benefits-navigator
```

If you already have it, update it:

```bash
cd wa-benefits-navigator
git pull
```

Then switch to the branch with the mobile app (or main, once it is merged):

```bash
git checkout add-ios-app
```

---

## Step 2: Install the app's dependencies

```bash
cd mobile
npm install
```

This downloads Expo, React Native, and everything the app needs. It can take a
few minutes the first time.

---

## Step 3: Run it on the iOS Simulator

```bash
npx expo start --ios
```

The first time, it may ask to install "Expo Go" or build a dev client, and it
will open the iPhone Simulator automatically. Give it a minute to bundle.

You should see the language gate (English or Spanish), then the app.

If the simulator does not open automatically:
1. Run `npx expo start`
2. Press the `i` key in the terminal to open iOS.

---

## Step 4 (optional): Run it on your real iPhone

1. Install the free "Expo Go" app from the App Store on your iPhone.
2. Make sure your iPhone and Mac are on the same Wi-Fi network.
3. Run `npx expo start` in the `mobile` folder.
4. Scan the QR code shown in the terminal with your iPhone camera.
5. It opens in Expo Go.

---

## Step 5 (optional, advanced): Open the native project in Xcode

Expo Go is the easiest way to run and demo the app. If you specifically need
the raw Xcode project (for example, to submit to the App Store later):

```bash
cd mobile
npx expo prebuild --platform ios
open ios/*.xcworkspace
```

This generates a real `ios/` Xcode project you can open and run with the Run
button in Xcode. Note: submitting to the App Store also requires a paid Apple
Developer account ($99/year) and an adult's involvement. For the Congressional
App Challenge you do NOT need to submit to the App Store. Running in the
Simulator or Expo Go is enough to demo it.

---

## Features (same as the website)

- Language gate on first launch (English or Spanish), remembered on the device
- EN/ES toggle in the header
- The full 11-step eligibility quiz with example-first questions
- Personalized, prioritized results with honest confidence levels
- Program detail screens with what-you-get, how-to-apply, tips, local county
  contacts, document checklist, official sources, and text-to-speech (native
  voice via expo-speech)
- Browse all 15 programs with category filters
- About and Sources pages

Everything runs on the device. No accounts, no server, nothing is sent anywhere.

---

## Troubleshooting

- "Unable to resolve module ../src/core/..." : make sure you ran the commands
  from inside the `mobile` folder, and that the whole repo (including `src/core`)
  was cloned. The app imports the shared engine from one level up.

- A red error mentioning a `.ts` file resolution: the included `metro.config.js`
  already handles explicit `.ts` extensions. Make sure you did not delete it,
  then stop the server (Ctrl+C) and run `npx expo start -c` to clear the cache.

- Simulator will not open: open the Xcode app once, go to
  Settings, Platforms, and make sure an iOS Simulator runtime is installed.

- Anything else: copy the full error text from the terminal and share it, and
  it can be fixed. Remember the app cannot be built or tested from the original
  Linux development environment, only on your Mac.
```
