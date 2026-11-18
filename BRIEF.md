# BRIEF — 2026 Topps Chrome Football Launch Guide (one-pager)

You are building a single-page Next.js (App Router, TypeScript) launch guide for the
2026 Topps Chrome Football release: Tuesday, November 18, 2026, 1:00 PM ET.
It must be done in one pass. Do not ask questions; make reasonable choices and log them.

## Hard rules

1. DATA IS FROZEN. Import every fact from `data/launch-data.json`. Do not edit that file.
   Do not invent prices, dates, rules, or URLs. If the JSON lacks something, write no fact
   rather than a guess.
2. DESIGN IS FROZEN. This project uses the NavNav Retro Mac (System 7) design.
   - `app/retro.css` is ALREADY in the project (tokens, window chrome, cursors, @font-face).
     Import it from `app/layout.tsx` and delete/stop-importing `app/globals.css` if it conflicts.
   - Font: `public/fonts/ChicagoFLF.ttf` is ALREADY in place, served at `/fonts/ChicagoFLF.ttf`.
   - Read `/root/.hermes/skills/navnav-retro-mac/references/components.md` for exact component
     CSS (window, title bar, buttons, badges, file list, footer). Read
     `references/design-tokens.md` and `references/layout-and-responsive.md` if you need more.
     Use ONLY the CSS custom properties from `app/retro.css`. NEVER hard-code a hex value in a
     component. Never bold ChicagoFLF. No border-radius above 7px. No blur shadows. No gradients
     outside pinstripes/progress. No hand cursor. Exactly one primary button per view.
   - Layout: green desktop, sticky menubar, one centered column (width min(820px,100%)) of
     stacked `.window` elements. Keep full window chrome (title bar, close box, pinstripes) at
     390px mobile width. Body text 12px Geneva/Verdana stack.
3. NO NEW DEPENDENCIES. No npm install. No Tailwind. Plain React + CSS. TypeScript strict.
4. DO NOT touch `.git`, do not commit. Build only; the operator commits.

## Page structure (top to bottom)

1. **Menubar**: brand "Chrome Launch Guide" left; right side "Nov 18 — 1:00 PM ET".
2. **Hero** (text straight on the green desktop, no window): eyebrow "2026 TOPPS CHROME FOOTBALL",
   ChicagoFLF h1, and the release summary sentence from data (`release.summary`), plus
   `release.datetimeHuman` and `release.timezoneNote`.
3. **Window "Countdown"**: a client component counting down to `release.datetimeISO`
   (2026-11-18T13:00:00-05:00). Four mono figures (days hours minutes seconds) in brand green.
   When it hits zero show "The window is open. Go." Use `setInterval` in `useEffect`; render
   placeholder dashes on the server so hydration matches. Honor `prefers-reduced-motion` (it is
   a text update; no animation needed).
4. **Window "The Four Boxes"**: 4 cards (data.boxes) — name (ChicagoFLF, brand green),
   price (mono), channel badge (LIVE for status "live", AT LAUNCH for "at-launch"), channelNote,
   and the url as a text link. Grid 2x2 on desktop, 1 column at 640px.
5. **Window "Before 1:00 PM"**: numbered prep checklist (data.prep). Use the wizard/step badge
   style from components.md.
6. **Window "At 1:00 PM ET"**: two sub-panels side by side (stack at 800px):
   data.saleTime.eql and data.saleTime.topps, each with its title and ordered steps.
7. **Window "After you submit"**: the four items from data.after as a simple list.
8. **Window "All the links"**: a file-list style (icon grid or table) of data.links — label,
   status badge (LIVE / AT LAUNCH), and note. Every URL must render as a real anchor with
   href. Long URLs must not overflow (break-word).
9. **Window "The checklist"** (optional if it fits): one short paragraph of data.chases.
10. **Footer** on the desktop: data.unofficialDisclaimer as fine print, plus a small
    "Verified Nov 17, 2026" badge.

## Voice

Deadpan, short declarative sentences, no exclamation marks. One understated retro gag per
section at most. The copy skeleton is in the data file; you may add short connective lines,
but facts come only from data. Buttons are verbs. Use plain words; explain a term once
(draw = a lottery, not a queue).

## Known pitfalls (from prior builds — avoid)

- Do NOT use Next 16 generated types like `LayoutProps<"/">` in layout.tsx (they exist only
  after a full build and break fresh/Vercel checkouts). Use `Readonly<{ children: ReactNode }>`.
- Import `./retro.css` (not globals.css) so the retro tokens actually load.
- The countdown must render identical markup on server and client for the initial state
  (use dashes or compute from a fixed ref), then tick client-side.
- Keep long URLs inside windows: `overflow-wrap: anywhere` on link text.
- All content sections must remain real DOM text (no images of text).

## Verification (required, in order)

1. `npx tsc --noEmit` — zero errors.
2. `npm run build` — zero errors, route `/` prerenders static.
3. Start the server (`npm run start -- -p 3111` in background is fine), curl
   `http://localhost:3111/`, and confirm these strings appear in the served HTML:
   "1:00 PM ET", "Hobby Box", "US$439.99", "US$789.99", "US$14.99", "US$24.99",
   "launches.topps.com", "Free to enter", "Maximum of 2 per customer".
4. Write `BUILD-NOTES.md`: what you built, every deviation from this brief and why, and the
   verification results (paste the curl check output summary).

## Deliverable

Working single-page app in this repo, building clean. BUILD-NOTES.md at repo root.
