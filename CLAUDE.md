# CLAUDE.md - Sivaprasad NN website

Instructions for any AI assistant (or developer) working on this site. Read this first.

## What this is
A static website: plain HTML + CSS + JavaScript. **No framework, no build step, no server.** It is hosted on Vercel, deployed automatically from GitHub. Open any `.html` file directly in a browser to preview.

## Architecture (keep it this way)
- Every page is a standalone `.html` file with its own hero + content hardcoded, so it renders even if JavaScript fails (progressive enhancement).
- The shared **top menu and footer** are injected by `js/components.js` into `<div id="site-header">` and `<div id="site-footer">`. Edit the nav/footer once there, not on every page.
- All **editable content** (videos, awards, press quotes, contact details, counts) lives in `js/data.js`. Prefer changing data.js over hardcoding content in pages.
- `js/main.js` renders galleries, the YouTube library, the lightbox, scroll reveals and the contact-form tabs. It reads `data.js`.
- **All design tokens** (colours, fonts, spacing) are at the top of `css/style.css` under `:root`. Change colours there, never inline.

## Content data contracts (in js/data.js)
- `videos`: `{ id, title, group }` where `group` is `carnatic` | `dance` | `fusion`.
- `awards`: `{ yr, ti }`, newest first.
- `quotes`: `{ q, by }`.
- `galleryCount` / `pressCount`: integers matching the number of files in `assets/photos/gallery` (`perf-NN.jpg`) and `assets/press` (`clip-NN.jpg`).

## Hard rules (client is Manan Mehta / MarketinCrew)
1. **No em dashes (the long dash) anywhere a visitor reads.** Use commas or `·`. This is a firm client rule.
2. **Never use the rupee glyph.** If prices appear, write `Rs.`.
3. **Visa-safe content.** This artist travels to the US on a P3 artist visa. The public site must NOT list specific performance dates, years, or foreign city names. Performances stay a curated portfolio; US work is framed as "collaborations". Do not add a tour calendar or event dates.
4. **Rounded corners, warm and human.** Keep the classical, dignified tone. Never make copy feel AI-generated.
5. **Mobile-first.** Test narrow screens; the nav collapses to a burger under 940px.

## Deploying
Push to the `main` branch on GitHub and Vercel auto-publishes. See `DEPLOY-GUIDE.md`. Do not add a Node build; it is a static site (`vercel.json` handles clean URLs and caching).

## Assets
Optimized web copies only live in `assets/`. The full, sorted originals are in the client folder `_ORGANIZED-DATA/` (professional photos, press scans, source PDFs, biodata). Pull new imagery from there.

## The source of truth for facts
Bio, awards, gurus, compositions and press quotes all come from the client's biodata PDF and the signed proposal (in the client folder). Do not invent credentials, dates, or venues.
