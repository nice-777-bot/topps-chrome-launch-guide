# REVIEW BRIEF — read-only defect review, topps-chrome-launch-guide

You are an independent reviewer. Do NOT edit any file. Do NOT run npm install. You may run
`npx tsc --noEmit`, `npm run build`, and read anything in the repo. Output a severity-tagged
finding list (CRITICAL / MAJOR / MINOR / NIT) with file:line and a one-line fix each. If a
category is clean, say so in one line.

Review scope: `app/` (layout.tsx, page.tsx, components, retro.css), `data/launch-data.json`,
`BUILD-NOTES.md`.

Check, in priority order:

1. **Data fidelity.** Every price, URL (verbatim, including %C2%AE and ?v= query), time
   (2026-11-18T13:00:00-05:00 / "1:00 PM ET"), rule ("one entry per person", "Maximum of
   2 per customer", "Free to enter", no-discount-codes, no-cancel-after-window, silent
   payment-failure) must match `data/launch-data.json` exactly. Flag any invented fact.
2. **Links are real anchors.** All 7 data.links render as <a href> with the exact URL.
   Link text must not overflow its window (overflow-wrap anywhere on the anchor).
3. **Design-system compliance (NavNav Retro Mac).** No hardcoded hex outside SVG data-URIs;
   only var(--*) tokens from app/retro.css. No font-weight >400 on ChicagoFLF text. No
   border-radius above 7px. No blur shadows. No gradients outside pinstripes/progress.
   Window chrome (title bar, pinstripes, close box) present on every section window and
   preserved at 390px. Body copy in Geneva/Verdana 12px stack, NOT ChicagoFLF (Chicago only
   on headings, nav, buttons, badges, table headers, window titles). Exactly one primary
   button per view (zero is also fine). Page background var(--desktop) #87b387, not white.
4. **Build correctness.** No `LayoutProps<"/">` or other Next 16 generated-type imports in
   layout.tsx. `npx tsc --noEmit` clean. `npm run build` clean, `/` static.
5. **Hydration safety.** Countdown renders server/client-identical initial markup (dashes or
   fixed ref), ticks in useEffect/useState, no hydration mismatch, no setInterval leak.
6. **Content completeness.** Sections present: menubar, hero (datetimeHuman + timezoneNote +
   release.summary), countdown, four boxes (all four with price/channel/status/note), prep
   checklist (6 items), sale-time (EQL steps + Topps steps), after-submit (4 items), all-links
   window (7 rows with status badges LIVE / AT LAUNCH), footer disclaimer + "Verified Nov 17, 2026".
7. **Voice.** No exclamation marks. Short sentences. No hype. One retro gag per section max.

End with a verdict line: SHIP or FIX-FIRST, and if FIX-FIRST list the blocking findings by number.
