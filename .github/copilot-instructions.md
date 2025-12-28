# GitHub Copilot / AI Agent Instructions

This repository is a small React + Vite TypeScript single-page site that showcases a Chiang Mai trip itinerary. The guidance below is focused and concrete so an AI coding agent can be immediately productive.

**Big Picture**
- **Framework:** Vite + React + TypeScript. Entry point: `src/index.tsx` -> `src/App.tsx`.
- **Data-driven UI:** The itinerary and all content are authored in `src/components/ItineraryData.ts`. Editing or adding days, highlights, tips, or checklist items should be done here (not by editing `App.tsx` markup).
- **Styling:** Utility-first classes appear throughout (`index.css` / `App.css` contain theme tokens like `thai-gold`). Inspect those files for color tokens and global CSS rules.
- **Static assets:** Images live in the repository `images/` folder and are referenced as strings like `images/day1.jpg`. Ensure added image files match those paths.

**Build / Dev / Deploy**
- Dev server: `npm run dev` (runs `vite`).
- Build: `npm run build` (runs `tsc -b` then `vite build`). Type-checking is enforced by the `tsc -b` step.
- Preview build: `npm run preview`.
- Deploy to GitHub Pages: `npm run deploy` (uses `gh-pages -d dist`). Note: `vite.config.ts` sets `base: '/chiang-mai-2026/'` — update this if the repo name or GH pages path changes.
- Lint: `npm run lint` (ESLint config is project-scoped).

**Project-specific patterns & conventions**
- Central data store: `src/components/ItineraryData.ts` exports typed interfaces (`DaySchedule`, `ItineraryItem`, `HighlightItem`, etc.) and constant arrays (`ITINERARY`, `FOOD_HIGHLIGHTS`, `MARKET_HIGHLIGHTS`, `TRIP_DETAILS`). Always keep data shape consistent with these interfaces.
- Image replacement in UI is ephemeral: `App.tsx` uses `URL.createObjectURL(file)` to show uploaded images in `customImages` state. These object URLs are not persisted — to make uploads permanent you must implement storage (upload to `public/`, cloud, or commit files).
- Icon usage: icons are provided by `lucide-react`. The `IconMap` in `src/App.tsx` maps item kinds to icon components — follow that approach when adding new icon-able item types.
- Components are primarily presentational and read directly from data files; prefer updating `ItineraryData.ts` rather than duplicating hard-coded content inside components.

**Integration & dependency notes**
- `framer-motion` is used for small entrance/hover animations; prefer adding `motion` elements when animation is needed.
- `vite` is overridden via `package.json` to `rolldown-vite` (see `devDependencies` / `overrides`). Be careful when changing `vite` or related plugins.
- Deployment depends on `gh-pages` and the `base` setting in `vite.config.ts`. Confirm both before running `npm run deploy`.

**Common tasks and examples**
- Add a new day: Open `src/components/ItineraryData.ts`, append a `DaySchedule` object to `ITINERARY` with `id: 'dayN'`, `date`, `title`, `items` array and `imageUrl` (place image in `images/`).
- Change hero text: Update `TRIP_DETAILS.title`/`subtitle` in `src/components/ItineraryData.ts` or edit the default `heroImage` in `src/App.tsx` state.
- Fix a type error: run `npm run build` locally to surface `tsc` diagnostics; tests are not present, so TypeScript and linting are the primary safety gates.

**Where to look for behavior that trips newcomers**
- Search `src/App.tsx` for image upload handlers (`handleImageUpload`, `handleHeroUpload`) — they only mutate in-memory state (no persistence).
- Static asset resolution: images referenced with string paths expect files in the repo `images/` folder (not necessarily `public/`). If assets fail to load in production, check `vite.config.ts` `base` value.

**Do not assume** (be conservative)
- Do not assume server-side APIs exist — this repo is a purely client-side static site.
- Do not move data into components; keep content in `ItineraryData.ts` to preserve the single source of truth.

If anything in this file is unclear or you'd like the instructions to emphasize a different workflow (e.g., adding persistent uploads or internationalization), tell me where to expand or what to prioritize and I will iterate.
