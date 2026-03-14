# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal racing resume website for Zachariah Rosenberg — a single-page static site designed to be shared with racing teams. Deployed to GitHub Pages.

## Commands

- `npm run dev` — Start Vite dev server (hot reload)
- `npm run build` — Production build to `dist/`
- `npm run preview` — Preview the production build locally

No tests, linting, or CI configured yet.

## Architecture

**Stack:** Vite + React 19 + Tailwind CSS v4 (via `@tailwindcss/vite` plugin) + Papaparse

**Data flow:** The site computes headline stats (laps, races, podiums) dynamically from the CSV track log. Curated race highlights are maintained separately as structured data.

- `src/data/track-log.csv` — Full driving log (source of truth for aggregate stats). Exported from Google Sheets. Update this file and stats auto-update.
- `src/data/trackLog.js` — Imports the CSV via `?raw`, parses with Papaparse, exports `trackLog` array and computed `stats` object.
- `src/data/resume.js` — Manually curated profile info, achievements, credentials, and highlighted race results. Edit this file to update the resume content.
- `src/App.jsx` — All UI components and layout in a single file. Section components: `Hero`, `Credentials`, `RaceResults`, `Footer`.

**Photos:** Place images in `public/images/`. The hero expects `public/images/headshot.jpg`.

**Tailwind v4 setup:** No `tailwind.config.js`. Theme customization is in `src/index.css` via `@theme {}` block. Font is Inter (loaded from Google Fonts CDN in `index.html`).

## GitHub Pages Deployment

Build output goes to `dist/`. To deploy via GitHub Pages, either use the `gh-pages` npm package or configure a GitHub Action to deploy the `dist/` folder. If deploying to a subpath (e.g., `username.github.io/zr-racing-site/`), set `base: '/zr-racing-site/'` in `vite.config.js`.
