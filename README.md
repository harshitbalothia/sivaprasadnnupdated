# Sivaprasad NN - Website

A static website (plain HTML, CSS and JavaScript). No build step, no framework, no database. Anyone on the team can open a file, change some text or a photo, save, and it goes live.

## What this is

A 9-page site for Sivaprasad NN, Carnatic vocalist:

| Page | File | Purpose |
|------|------|---------|
| Home | `index.html` | First impression, the three offerings, featured video |
| About | `about.html` | Full story, lineage, gurus, teaching |
| Repertoire | `repertoire.html` | Carnatic, dance, fusion, compositions |
| Performances | `performances.html` | Photo portfolio (visa-safe, no dates/locations) |
| Music & Video | `music.html` | YouTube library, sorted by type |
| Learn | `learn.html` | Online classes + Music Therapy |
| Ensembles | `book.html` | Booking his network of artists |
| Press | `press.html` | Quotes, awards, clipping wall |
| Contact | `contact.html` | Enquiry forms, WhatsApp, map |

## Folder structure

```
website/
├── index.html + 8 more .html pages   ← the pages
├── css/style.css                     ← ALL design (colours, fonts, spacing) in one file
├── js/
│   ├── data.js         ← EDIT THIS: videos, awards, quotes, contact details
│   ├── components.js   ← the shared top menu + footer (edit once, updates everywhere)
│   └── main.js         ← behaviour (galleries, lightbox). Rarely touched.
├── assets/
│   ├── photos/hero      ← big banner images
│   ├── photos/portrait  ← portraits used on About etc.
│   ├── photos/gallery   ← perf-01.jpg … perf-42.jpg (the Performances grid)
│   └── press            ← clip-01.jpg … clip-18.jpg (the press wall)
├── favicon.svg, robots.txt, sitemap.xml, vercel.json
└── EDITING-GUIDE.md, DEPLOY-GUIDE.md, CLAUDE.md, README.md  ← the docs
```

## The two rules that matter

1. **To change words, photos, videos, awards or contact details, you almost always only touch `js/data.js` or the relevant `.html` file.**
2. **To change colours or fonts, you only touch `css/style.css`** (all the colours are named at the very top).

## Start here

- Editing content: read **`EDITING-GUIDE.md`**
- Putting it online / pushing updates: read **`DEPLOY-GUIDE.md`**

## House rules (please keep)

- **No em dashes** (the long dash) anywhere that a visitor reads. Use commas or `·`.
- **Write `Rs.` not the rupee symbol** if you ever add prices.
- **No specific dates, years or foreign city names** on Performances or Press. This site is deliberately visa-safe. Keep it a portfolio, not a calendar.
- Keep the tone warm and human, never robotic.

Built by MarketinCrew.
