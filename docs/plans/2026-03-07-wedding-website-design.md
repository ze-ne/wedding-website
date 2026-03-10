# Wedding Website Design
**Zené Sekou & Noah Banholzer — August 1, 2026**

## Overview

A multi-page static HTML/CSS/JS wedding website hosted at `ze_ne.github.io/wedding-website`. Clean, modern aesthetic with subtle wisteria/botanical accents reflecting the arboretum venue.

---

## Details

- **Couple:** Zené Sekou & Noah Banholzer
- **Date:** August 1, 2026
- **Venue:** Wisteria Hall, 2300 Arboretum Dr E, Seattle, WA 98112
- **Schedule:** Arrive by 4:00 PM · Ceremony 4:30–5:00 PM · Cocktail Hour · Reception
- **Dress code:** Cocktail
- **Base URL:** `ze_ne.github.io/wedding-website`

---

## File Structure

```
wedding-website/
├── index.html          # Hero / splash
├── details.html        # Event details
├── rsvp.html           # RSVP (embedded Google Form)
├── travel.html         # Travel & accommodations
├── registry.html       # Registry
├── faq.html            # FAQ
├── css/
│   └── style.css
├── js/
│   └── carousel.js
└── images/             # Carousel photos
```

---

## Visual Design

### Typography
- **Headings / couple names:** `Cormorant Garamond` (Google Fonts) — elegant serif contrast
- **Body / nav / UI:** `DM Sans` (Google Fonts) — clean, modern sans-serif

### Color Palette
| Role | Color |
|------|-------|
| Page background | `#f6f8db` |
| Botanical accents, nav links, active states | `#a1ac4e` |
| Soft highlights, card backgrounds | `#c3dbff` |
| Accent buttons, hover states | `#e5a39d` |
| Gold details, dividers | `#eec474` |

### Botanical / Wisteria Elements
- Decorative SVG wisteria vine/cluster on the hero page
- Subtle SVG dividers between content sections
- Small corner accents on FAQ items and travel cards

### Navigation
- Sticky horizontal nav bar with `#f6f8db` background
- Logo: `Z & N` (left) in Cormorant Garamond
- Page links (right): Details · RSVP · Travel · Registry · FAQ
- Active page indicated with `#a1ac4e` underline

---

## Pages

### `index.html` — Hero / Splash
- Full-width auto-advancing photo carousel with manual controls and fade transitions
- Images sourced from `/images/` directory
- Overlay: "Zené & Noah" (Cormorant Garamond), "August 1, 2026 · Seattle, WA" subtitle
- Wisteria SVG accent beneath the names
- Welcome copy: "We're getting married and we'd love to celebrate with you."
- CTA button linking to `rsvp.html`

### `details.html` — Event Details
- Venue name, address, and embedded Google Maps
- Timeline card: Arrive 4:00 PM · Ceremony 4:30–5:00 PM · Cocktail Hour · Reception
- Dress code callout: Cocktail

### `rsvp.html` — RSVP
- Brief RSVP-by prompt (date TBD)
- Full-width embedded Google Form (iframe)

### `travel.html` — Travel & Accommodations
- Card layout (`#c3dbff` backgrounds) for: nearby hotels, parking info, airport/transit info
- Placeholder content to be filled in

### `registry.html` — Registry
- Cards linking to registry services (URLs to be filled in)

### `faq.html` — FAQ
- Accordion-style Q&A with wisteria corner accents
- Placeholder questions to be filled in

---

## Key Decisions

- **Static HTML/CSS/JS** — no build step, easy to maintain and host on GitHub Pages
- **RSVP via embedded Google Form** — avoids backend complexity
- **Multi-page architecture** — clean separation, easy to share individual links
- **Wisteria/botanical SVG accents** — thematic without overwhelming the minimal aesthetic
