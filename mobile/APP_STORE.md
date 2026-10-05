# Publishing WA Benefits Navigator to the App Store

This guide takes the app from your Mac to the Apple App Store using Expo's EAS
service, which builds and signs the app in the cloud and submits it to Apple.

You have a paid Apple Developer membership, which is the main prerequisite.
Everything that requires your Apple identity (login, agreements, the actual
"release" tap) must be done by you. The build config and assets are already set
up in this repo.

Estimated time: about 1 to 2 hours of your active work, then Apple review
(often 1 to 3 days, sometimes longer).

---

## Before you start, gather these from your Apple Developer account

1. **Apple Team ID**: appleid at https://developer.apple.com/account -> Membership
   details -> Team ID (a 10-character code like `ABCDE12345`).
2. The Apple ID email you use for the developer account.

You do NOT need to create signing certificates by hand. EAS generates and
manages them for you when you log in.

---

## Step 1: Install the EAS command line tool

On your Mac, in Terminal:

```bash
npm install -g eas-cli
```

Check it:

```bash
eas --version
```

---

## Step 2: Log in to Expo

```bash
eas login
```

If you do not have an Expo account, create a free one at https://expo.dev
first, then log in. (Expo is the build service, separate from Apple.)

---

## Step 3: Link the project

From the `mobile` folder:

```bash
cd mobile
eas init
```

This creates an EAS project and fills in the `projectId`. When it asks to
update app.json, say yes. (This replaces the `REPLACE_AFTER_EAS_INIT`
placeholder automatically.)

---

## Step 4: Create the app record in App Store Connect

1. Go to https://appstoreconnect.apple.com -> My Apps -> the plus button ->
   New App.
2. Platform: iOS. Name: `WA Benefits Navigator`. Primary language: English.
3. Bundle ID: select `org.wabenefits.navigator`.
   - If it is not in the list, go to
     https://developer.apple.com/account/resources/identifiers and register a
     new App ID with that exact bundle identifier first, then come back.
4. SKU: any unique text, for example `wabn-ios-001`.
5. Create the app. Then open it and note the **Apple ID number** shown under
   App Information (a long number). This is the `ascAppId`.

---

## Step 5: Fill in the two IDs in eas.json

Open `mobile/eas.json` and replace:

- `REPLACE_WITH_APP_STORE_CONNECT_APP_ID` with the Apple ID number from Step 4.
- `REPLACE_WITH_YOUR_APPLE_TEAM_ID` with your Team ID.

Save the file.

---

## Step 6: Build the app in the cloud

```bash
eas build --platform ios --profile production
```

- The first time, EAS asks to log in to your Apple account and will create the
  signing certificate and provisioning profile for you. Follow the prompts and
  say yes to letting EAS manage credentials.
- The build runs on Expo's servers and takes roughly 15 to 30 minutes.
- When it finishes, you get a link to the build.

---

## Step 7: Submit the build to Apple

```bash
eas submit --platform ios --profile production --latest
```

This uploads the finished build to App Store Connect. It may ask for an
app-specific password or to confirm your Apple login. When it is done, the
build appears in App Store Connect under your app, in the TestFlight / Build
section (it may take a few minutes to finish processing).

---

## Step 8: Complete the App Store listing (in App Store Connect)

Apple will not let you submit for review until these are filled in. In your
app's page at https://appstoreconnect.apple.com:

- **Screenshots**: required. Easiest way to capture them: run the app in the
  iPhone simulator (`npx expo start --ios`), navigate to each screen, and press
  Cmd+S to save a screenshot. You need 6.7-inch iPhone screenshots (for
  example, iPhone 15 Pro Max). Upload at least 3 (Home, Quiz, Results look
  great).
- **Description**: a short paragraph about the app. There is suggested copy at
  the bottom of this file.
- **Keywords**: for example `benefits, autism, special needs, Washington,
  disability, Medicaid, IEP, family`.
- **Support URL**: your GitHub repo URL works, or the live website.
- **Privacy Policy URL**: required. See the note below.
- **App Privacy**: answer the data questions. This app collects NO data and
  sends nothing to a server, so you select "Data Not Collected". That is a
  genuine strength to highlight.
- **Age rating**: fill out the questionnaire (this app is 4+).
- **Category**: Medical or Reference both fit. Reference is simpler for review.
- **Pricing**: Free.

Then choose the build you uploaded in Step 7, and click **Add for Review** ->
**Submit for Review**.

---

## About the Privacy Policy URL (required by Apple)

Apple requires a privacy policy link even for apps that collect nothing. The
simplest option: add a short privacy page to your website or a markdown file in
the repo and link to it. Suggested text:

> WA Benefits Navigator does not collect, store, or share any personal
> information. Your quiz answers stay on your device and are never sent to a
> server. The app contains no accounts, no tracking, and no analytics.

Ask and this can be added to the website as a /privacy page.

---

## Honest expectations

- **Review time**: usually 1 to 3 days, sometimes longer. Plan for it.
- **Rejections happen** and are normal. Common reasons: missing privacy policy,
  incomplete metadata, or questions about the content. Apple tells you exactly
  what to fix, you fix it, and resubmit. It is not the end if the first try
  bounces.
- **Benefits/health topics** can draw extra questions. Being clearly
  informational (not giving medical or legal advice, which this app does not)
  and showing the disclaimer helps.
- The app shows a disclaimer that the agency makes the final decision, which is
  good to keep.

---

## Suggested App Store description

> Raising a neuro-divergent or special needs child in Washington State means
> navigating more than 15 government programs across 5 agencies, each with its
> own rules. WA Benefits Navigator makes it simple.
>
> Answer a few plain-language questions and get a personalized, prioritized
> plan showing the programs your family likely qualifies for, with honest
> eligibility levels, direct links, phone numbers, and the documents to gather.
>
> Every program is explained with real examples, in English or Spanish, and
> every eligibility rule is backed by an official government source.
>
> Private by design: your answers never leave your device.
>
> This app provides general guidance. The agency that runs each program makes
> the final eligibility decision.

---

## Quick command summary

```bash
npm install -g eas-cli
eas login
cd mobile
eas init
# edit eas.json with your ascAppId and appleTeamId
eas build --platform ios --profile production
eas submit --platform ios --profile production --latest
# then finish the listing in App Store Connect and Submit for Review
```
