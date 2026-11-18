# Build notes

## Built

A single-page Next.js App Router launch guide at `/`, using strict TypeScript, React, and plain CSS. The page includes the sticky menubar, desktop hero, all seven requested windows (including the optional chase checklist), and the disclaimer and verification badge.

The supplied `app/retro.css` and local ChicagoFLF font provide the System 7 styling. `app/launch.css` adds the page layout using only existing color/font tokens. The old starter `globals.css` and `page.module.css` were removed; the root layout imports `retro.css` first. Google font imports were removed. The layout uses `Readonly<{ children: ReactNode }>`.

Only the countdown is a client component. Its server and initial client state contain four `--` placeholders. An effect updates the remaining time every second, calculates from the absolute timestamp to avoid interval drift, clamps at zero, and cleans up its interval. At zero it displays “The window is open. Go.” The timer does not animate or announce every second; the opening message uses a status announcement. Reduced-motion preferences disable animation and transitions.

All release/product facts and external anchor destinations come from `data/launch-data.json`. Every box and link URL is a real anchor and uses `overflow-wrap: anywhere`. All substantive content is real DOM text. No packages were installed or added. No Git commands were run and `.git` was not modified by this work.

## Choices and deviations

- Kept the frozen JSON byte-for-byte. SHA-256 before and after: `f9a3e10ed67c14ea8b43a6bfc346e4853ddc83c9bc9c55e9575ea9cdad0b8d4d`.
- Preserved the human release date exactly, including its supplied “Tuesday” weekday. The countdown uses the ISO timestamp as requested. No calendar correction or external fact checking was applied to frozen data.
- Derived the short menubar date and time from `release.datetimeHuman`; derived the verification badge date from `unofficialDisclaimer`. No independent factual dates were introduced.
- Chose “Your launch-day field guide.” for the hero heading. Added the requested draw definition and one countdown gag. Other substantive copy is taken directly from the JSON.
- The single primary action, “Open launch page”, uses the first entry of `data.links`, identified there as “Landing page (start here)”. Other destinations remain text links.
- Title-bar close, zoom, and collapse boxes are decorative spans, hidden from assistive technology. The guide stays fully visible; these are not inactive buttons.
- Used numbered wizard badges for preparation, two sale panels above 800px, a two-column box grid above 640px, and a Finder-style file list. Full title bars and controls remain in the mobile markup. The centered desktop column uses the supplied `min(820px, 100%)` width with 16px gutters.
- The supplied reference CSS uses decorative gradients for title boxes and window resize grips, conflicting with the brief's “no gradients outside pinstripes/progress” rule. Page overrides use flat bevels and double borders for those details. The supplied stylesheet itself remains unchanged.
- Added `experimental.useTypeScriptCli: false` to `next.config.ts`. The first production build compiled successfully but failed with `Could not parse output from TypeScript's --showConfig.` A direct spawned CLI check returned exit 0 with empty stdout. The installed Next.js documentation describes this option as using the TypeScript JavaScript compiler API instead. This retains build-time type checking with the installed TypeScript 5.9.3; it does not ignore errors. No dependency or version change was needed.
- Runtime verification is incomplete because the sandbox denies local TCP server binding. The required curl check was attempted and failed; static HTML checks below are a fallback, not a claim that the HTTP check passed. A browser smoke-check attempt also did not become ready and was stopped. Responsive layout and client hydration were not visually/runtime verified.

## Verification, in requested order

After the compiler configuration fix, repeated the required sequence:

1. `npx tsc --noEmit` — PASS, exit 0, no TypeScript errors.
2. `npm run build` — PASS, exit 0. TypeScript completed successfully; all four static pages generated. Build route summary:

   ```text
   Route (app)
   ┌ ○ /
   └ ○ /_not-found

   ○  (Static)  prerendered as static content
   ```

3. Production server and curl — BLOCKED by environment:

   ```text
   npm run start -- -p 3111
   Error: listen EPERM: operation not permitted 0.0.0.0:3111

   npm run start -- -p 3111 -H 127.0.0.1
   Error: listen EPERM: operation not permitted 127.0.0.1:3111

   curl --max-time 5 -fsS http://localhost:3111/ -o /tmp/chrome-launch-served.html
   curl: (7) Failed to connect to localhost port 3111 after 0 ms: Couldn't connect to server
   ```

   Fallback check output against `.next/server/app/index.html`:

   ```text
   PASS static HTML: 1:00 PM ET
   PASS static HTML: Hobby Box
   PASS static HTML: US$439.99
   PASS static HTML: US$789.99
   PASS static HTML: US$14.99
   PASS static HTML: US$24.99
   PASS static HTML: launches.topps.com
   PASS static HTML: Free to enter
   PASS static HTML: Maximum of 2 per customer
   PASS: required strings appear in visible DOM text, not only serialized data
   PASS: every box/link URL has a real anchor; exactly one primary action
   PASS: seven window sections; four server-rendered countdown placeholders
   PASS: verification badge; frozen JSON SHA-256 unchanged
   PASS: no hard-coded hex colors in added components or styles
   PASS: no new dependencies (package manifest retained)
   ```

4. Wrote this `BUILD-NOTES.md` with the implementation choices, deviations, successful checks, and the unresolved runtime verification limitation.

The operator can finish HTTP verification in an environment that permits listening on port 3111 by running `npm run start -- -p 3111` and repeating the curl check. A browser pass at 390px is also still recommended to confirm the rendered mobile layout and countdown hydration.
