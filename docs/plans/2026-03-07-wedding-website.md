# Wedding Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a complete multi-page static wedding website for Zené & Noah, hosted at ze_ne.github.io/wedding-website.

**Architecture:** Multi-page static HTML/CSS/JS with a shared stylesheet and nav. No build step. Each page is a standalone HTML file sharing `css/style.css` and a consistent nav bar.

**Tech Stack:** HTML5, CSS3 (custom properties), vanilla JS, Google Fonts (Cormorant Garamond + DM Sans)

---

## Color Reference
```
--color-bg:      #f6f8db  (page background)
--color-green:   #a1ac4e  (nav links, accents, active)
--color-blue:    #c3dbff  (card backgrounds, highlights)
--color-rose:    #e5a39d  (buttons, hover)
--color-gold:    #eec474  (dividers, details)
--color-text:    #2d2d2d  (body text)
```

---

### Task 1: Project scaffold & shared CSS

**Files:**
- Create: `css/style.css`
- Create: `index.html` (shell only)

**Step 1: Create the CSS file with design tokens and base styles**

```css
/* css/style.css */
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

:root {
  --color-bg:    #f6f8db;
  --color-green: #a1ac4e;
  --color-blue:  #c3dbff;
  --color-rose:  #e5a39d;
  --color-gold:  #eec474;
  --color-text:  #2d2d2d;
  --font-serif:  'Cormorant Garamond', Georgia, serif;
  --font-sans:   'DM Sans', system-ui, sans-serif;
}

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: var(--font-sans);
  font-weight: 300;
  line-height: 1.6;
}

h1, h2, h3 {
  font-family: var(--font-serif);
  font-weight: 400;
}

a { color: inherit; text-decoration: none; }

img { max-width: 100%; display: block; }

.container {
  max-width: 860px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

/* --- NAV --- */
.site-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: var(--color-bg);
  border-bottom: 1px solid var(--color-gold);
  padding: 0.75rem 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.nav-logo {
  font-family: var(--font-serif);
  font-size: 1.4rem;
  letter-spacing: 0.05em;
  color: var(--color-text);
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

.nav-links a {
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--color-text);
  padding-bottom: 2px;
  border-bottom: 2px solid transparent;
  transition: border-color 0.2s, color 0.2s;
}

.nav-links a:hover,
.nav-links a.active {
  color: var(--color-green);
  border-bottom-color: var(--color-green);
}

/* --- BUTTONS --- */
.btn {
  display: inline-block;
  padding: 0.75rem 2rem;
  background: var(--color-rose);
  color: #fff;
  font-family: var(--font-sans);
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.1s;
}

.btn:hover { background: #d8877f; transform: translateY(-1px); }

/* --- SECTION DIVIDER (wisteria vine) --- */
.divider {
  text-align: center;
  margin: 3rem 0;
  color: var(--color-green);
  font-size: 1.5rem;
  letter-spacing: 0.5rem;
  opacity: 0.5;
}

/* --- CARDS --- */
.card {
  background: var(--color-blue);
  padding: 1.5rem 2rem;
  margin-bottom: 1rem;
}

/* --- PAGE HEADER --- */
.page-header {
  text-align: center;
  padding: 4rem 1.5rem 2rem;
}

.page-header h1 {
  font-size: clamp(2rem, 5vw, 3.5rem);
  margin-bottom: 0.5rem;
}

.page-header p {
  color: var(--color-green);
  font-size: 0.9rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

/* --- FOOTER --- */
.site-footer {
  text-align: center;
  padding: 2rem;
  margin-top: 4rem;
  border-top: 1px solid var(--color-gold);
  font-size: 0.8rem;
  color: #888;
}

/* --- RESPONSIVE NAV --- */
@media (max-width: 600px) {
  .nav-links { gap: 1rem; }
  .nav-links a { font-size: 0.75rem; }
}
```

**Step 2: Create minimal `index.html` shell to verify nav renders**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zené & Noah — August 1, 2026</title>
  <link rel="stylesheet" href="css/style.css">
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html" class="active">Home</a></li>
      <li><a href="details.html">Details</a></li>
      <li><a href="rsvp.html">RSVP</a></li>
      <li><a href="travel.html">Travel</a></li>
      <li><a href="registry.html">Registry</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>
  <main>
    <p style="padding:2rem">Shell — hero coming in Task 2</p>
  </main>
  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>
</body>
</html>
```

**Step 3: Open `index.html` in browser and verify nav looks correct**

Check: sticky nav, logo left, links right, gold bottom border, correct font.

**Step 4: Commit**

```bash
git add css/style.css index.html
git commit -m "feat: add shared CSS design system and nav shell"
```

---

### Task 2: Hero page — carousel

**Files:**
- Modify: `index.html`
- Create: `js/carousel.js`
- Create: `images/.gitkeep` (so the folder is tracked)

**Step 1: Add carousel HTML to `index.html` (replace the `<main>` shell)**

```html
<!-- Replace <main> contents in index.html -->
<main>
  <!-- CAROUSEL -->
  <section class="carousel" aria-label="Wedding photo carousel">
    <div class="carousel-track" id="carouselTrack">
      <!-- Add <img> tags here as photos become available -->
      <!-- Example: <img src="images/photo1.jpg" alt="Zené and Noah"> -->
      <div class="carousel-placeholder">
        <span>Photos coming soon</span>
      </div>
    </div>
    <button class="carousel-btn carousel-btn--prev" id="prevBtn" aria-label="Previous photo">&#8249;</button>
    <button class="carousel-btn carousel-btn--next" id="nextBtn" aria-label="Next photo">&#8250;</button>
    <div class="carousel-dots" id="carouselDots"></div>
  </section>

  <!-- HERO TEXT -->
  <section class="hero-text">
    <div class="hero-wisteria" aria-hidden="true">
      <svg width="200" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 30 Q30 10 50 30 Q70 50 90 30 Q110 10 130 30 Q150 50 170 30 Q190 10 200 25" stroke="#a1ac4e" stroke-width="1.5" fill="none" opacity="0.6"/>
        <circle cx="50" cy="30" r="3" fill="#c3dbff" opacity="0.7"/>
        <circle cx="90" cy="30" r="4" fill="#e5a39d" opacity="0.6"/>
        <circle cx="130" cy="30" r="3" fill="#c3dbff" opacity="0.7"/>
        <circle cx="55" cy="42" r="3" fill="#eec474" opacity="0.5"/>
        <circle cx="85" cy="44" r="4" fill="#c3dbff" opacity="0.6"/>
        <circle cx="125" cy="42" r="3" fill="#e5a39d" opacity="0.5"/>
        <circle cx="45" cy="20" r="3" fill="#eec474" opacity="0.5"/>
        <circle cx="95" cy="18" r="3" fill="#c3dbff" opacity="0.6"/>
        <circle cx="135" cy="20" r="3" fill="#e5a39d" opacity="0.5"/>
      </svg>
    </div>
    <h1>Zené &amp; Noah</h1>
    <p class="hero-date">August 1, 2026 &middot; Seattle, WA</p>
    <p class="hero-welcome">We're getting married and we'd love to celebrate with you.</p>
    <a href="rsvp.html" class="btn">RSVP</a>
  </section>
</main>
```

**Step 2: Add carousel + hero CSS to `css/style.css`**

```css
/* --- CAROUSEL --- */
.carousel {
  position: relative;
  width: 100%;
  overflow: hidden;
  background: #e8e8d8;
  aspect-ratio: 16/7;
  max-height: 520px;
}

.carousel-track {
  display: flex;
  width: 100%;
  height: 100%;
  transition: transform 0.6s ease;
}

.carousel-track img {
  min-width: 100%;
  height: 100%;
  object-fit: cover;
  flex-shrink: 0;
}

.carousel-placeholder {
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-family: var(--font-serif);
  font-size: 1.2rem;
  letter-spacing: 0.1em;
}

.carousel-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(246,248,219,0.7);
  border: none;
  font-size: 2rem;
  padding: 0.25rem 0.75rem;
  cursor: pointer;
  color: var(--color-text);
  transition: background 0.2s;
  line-height: 1;
}

.carousel-btn:hover { background: rgba(246,248,219,0.95); }
.carousel-btn--prev { left: 1rem; }
.carousel-btn--next { right: 1rem; }

.carousel-dots {
  position: absolute;
  bottom: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.4rem;
}

.carousel-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgba(255,255,255,0.5);
  border: none;
  cursor: pointer;
  transition: background 0.2s;
}

.carousel-dot.active { background: #fff; }

/* --- HERO TEXT --- */
.hero-text {
  text-align: center;
  padding: 3rem 1.5rem 4rem;
}

.hero-wisteria {
  margin-bottom: 1.5rem;
}

.hero-text h1 {
  font-size: clamp(2.5rem, 8vw, 5rem);
  letter-spacing: 0.02em;
  margin-bottom: 0.5rem;
}

.hero-date {
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-green);
  margin-bottom: 1rem;
}

.hero-welcome {
  font-family: var(--font-serif);
  font-size: 1.2rem;
  color: #555;
  margin-bottom: 2rem;
  font-style: italic;
}
```

**Step 3: Create `js/carousel.js`**

```js
// js/carousel.js
(function () {
  const track = document.getElementById('carouselTrack');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const dotsContainer = document.getElementById('carouselDots');

  if (!track) return;

  const slides = Array.from(track.children);
  if (slides.length <= 1) {
    if (prevBtn) prevBtn.style.display = 'none';
    if (nextBtn) nextBtn.style.display = 'none';
    return;
  }

  let current = 0;
  let timer;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(index) {
    slides[current].setAttribute('aria-hidden', 'true');
    current = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${current * 100}%)`;
    document.querySelectorAll('.carousel-dot').forEach((d, i) => {
      d.classList.toggle('active', i === current);
    });
    resetTimer();
  }

  function resetTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), 5000);
  }

  prevBtn.addEventListener('click', () => goTo(current - 1));
  nextBtn.addEventListener('click', () => goTo(current + 1));

  resetTimer();
})();
```

**Step 4: Add `<script>` tag to bottom of `index.html` body**

```html
  <script src="js/carousel.js"></script>
</body>
```

**Step 5: Create images folder**

```bash
touch images/.gitkeep
```

**Step 6: Open `index.html` in browser and verify**

Check: carousel renders (placeholder or images), prev/next buttons work, dots appear, hero text and wisteria SVG display correctly, RSVP button links to rsvp.html.

**Step 7: Commit**

```bash
git add index.html css/style.css js/carousel.js images/.gitkeep
git commit -m "feat: add hero page with photo carousel and wisteria accent"
```

---

### Task 3: Details page

**Files:**
- Create: `details.html`

**Step 1: Create `details.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Details — Zené & Noah</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .timeline { list-style: none; margin: 2rem 0; }
    .timeline li {
      display: flex;
      gap: 1.5rem;
      padding: 1rem 0;
      border-bottom: 1px solid var(--color-gold);
      align-items: baseline;
    }
    .timeline li:last-child { border-bottom: none; }
    .timeline-time {
      font-family: var(--font-serif);
      font-size: 1rem;
      color: var(--color-green);
      min-width: 90px;
      white-space: nowrap;
    }
    .timeline-event { font-size: 0.95rem; }
    .detail-badge {
      display: inline-block;
      background: var(--color-gold);
      color: var(--color-text);
      font-size: 0.8rem;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      padding: 0.3rem 1rem;
      margin-top: 0.5rem;
    }
    .map-wrapper {
      margin: 2rem 0;
      border: 1px solid var(--color-gold);
      overflow: hidden;
    }
    .map-wrapper iframe {
      width: 100%;
      height: 320px;
      border: none;
      display: block;
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="details.html" class="active">Details</a></li>
      <li><a href="rsvp.html">RSVP</a></li>
      <li><a href="travel.html">Travel</a></li>
      <li><a href="registry.html">Registry</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>

  <main>
    <div class="page-header">
      <p>Join us</p>
      <h1>Wedding Details</h1>
    </div>

    <div class="container">

      <div class="card">
        <h2 style="font-size:1.5rem; margin-bottom:0.25rem;">Wisteria Hall</h2>
        <p style="color:#666; margin-bottom:0.75rem;">2300 Arboretum Dr E, Seattle, WA 98112</p>
        <span class="detail-badge">Cocktail Attire</span>
      </div>

      <div class="divider">&#10022; &#10022; &#10022;</div>

      <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin-bottom:0.5rem;">Schedule</h2>
      <ul class="timeline">
        <li>
          <span class="timeline-time">4:00 PM</span>
          <span class="timeline-event">Doors open — guests arrive and find their seats</span>
        </li>
        <li>
          <span class="timeline-time">4:30 PM</span>
          <span class="timeline-event">Ceremony begins</span>
        </li>
        <li>
          <span class="timeline-time">5:00 PM</span>
          <span class="timeline-event">Cocktail hour</span>
        </li>
        <li>
          <span class="timeline-time">Evening</span>
          <span class="timeline-event">Reception — dinner, dancing, and celebration</span>
        </li>
      </ul>

      <div class="divider">&#10022; &#10022; &#10022;</div>

      <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin-bottom:0.5rem;">Venue</h2>
      <div class="map-wrapper">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2688.0!2d-122.2947!3d47.6408!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s2300+Arboretum+Dr+E%2C+Seattle%2C+WA+98112!5e0!3m2!1sen!2sus!4v1"
          allowfullscreen=""
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Wisteria Hall map">
        </iframe>
      </div>
      <p style="font-size:0.85rem; color:#888; margin-top:0.5rem;">
        <a href="https://maps.google.com/?q=2300+Arboretum+Dr+E,+Seattle,+WA+98112" target="_blank" rel="noopener" style="color:var(--color-green);">Open in Google Maps &#8599;</a>
      </p>

    </div>
  </main>

  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>
</body>
</html>
```

**Step 2: Open `details.html` in browser and verify**

Check: nav active state on Details, timeline renders, map iframe loads, dress code badge visible.

**Step 3: Commit**

```bash
git add details.html
git commit -m "feat: add event details page with timeline and map"
```

---

### Task 4: RSVP page

**Files:**
- Create: `rsvp.html`

**Step 1: Create `rsvp.html`**

Note: Replace `YOUR_GOOGLE_FORM_ID` with the actual Google Form embed URL when available.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>RSVP — Zené & Noah</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .rsvp-intro {
      text-align: center;
      max-width: 500px;
      margin: 0 auto 2rem;
      font-family: var(--font-serif);
      font-size: 1.1rem;
      color: #555;
      font-style: italic;
    }
    .rsvp-frame-wrapper {
      background: #fff;
      border: 1px solid var(--color-gold);
      overflow: hidden;
    }
    .rsvp-frame-wrapper iframe {
      width: 100%;
      min-height: 700px;
      border: none;
      display: block;
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="details.html">Details</a></li>
      <li><a href="rsvp.html" class="active">RSVP</a></li>
      <li><a href="travel.html">Travel</a></li>
      <li><a href="registry.html">Registry</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>

  <main>
    <div class="page-header">
      <p>We hope you can make it</p>
      <h1>RSVP</h1>
    </div>

    <div class="container">
      <p class="rsvp-intro">
        Please RSVP by <strong>June 1, 2026</strong>. We'd love to know if you can join us.
      </p>

      <div class="rsvp-frame-wrapper">
        <!-- Replace the src below with your Google Form embed URL -->
        <!-- To get it: Google Forms → Send → Embed → copy the src URL -->
        <iframe
          src="YOUR_GOOGLE_FORM_EMBED_URL"
          title="RSVP Form"
          frameborder="0"
          marginheight="0"
          marginwidth="0">
          Loading…
        </iframe>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>
</body>
</html>
```

**Step 2: Open `rsvp.html` in browser and verify**

Check: nav active, intro text visible, iframe area renders (will show blank/error until real form URL is added — that's expected).

**Step 3: Commit**

```bash
git add rsvp.html
git commit -m "feat: add RSVP page with Google Form iframe placeholder"
```

---

### Task 5: Travel & Accommodations page

**Files:**
- Create: `travel.html`

**Step 1: Create `travel.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Travel — Zené & Noah</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .travel-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
      gap: 1.25rem;
      margin: 2rem 0;
    }
    .travel-card {
      background: var(--color-blue);
      padding: 1.5rem;
      position: relative;
    }
    .travel-card::before {
      content: '';
      display: block;
      width: 24px;
      height: 3px;
      background: var(--color-green);
      margin-bottom: 1rem;
    }
    .travel-card h3 {
      font-family: var(--font-serif);
      font-size: 1.2rem;
      margin-bottom: 0.5rem;
    }
    .travel-card p {
      font-size: 0.9rem;
      color: #555;
      line-height: 1.6;
    }
    .travel-card a {
      color: var(--color-green);
      text-decoration: underline;
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="details.html">Details</a></li>
      <li><a href="rsvp.html">RSVP</a></li>
      <li><a href="travel.html" class="active">Travel</a></li>
      <li><a href="registry.html">Registry</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>

  <main>
    <div class="page-header">
      <p>Getting here</p>
      <h1>Travel &amp; Accommodations</h1>
    </div>

    <div class="container">

      <div class="divider">&#10022; &#10022; &#10022;</div>

      <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin-bottom:1rem;">Where to Stay</h2>
      <div class="travel-grid">
        <div class="travel-card">
          <h3>Hotel Placeholder A</h3>
          <p>Address and details to be added. Approximately X minutes from the venue.<br>
          <a href="#" target="_blank" rel="noopener">Book here &#8599;</a></p>
        </div>
        <div class="travel-card">
          <h3>Hotel Placeholder B</h3>
          <p>Address and details to be added. Approximately X minutes from the venue.<br>
          <a href="#" target="_blank" rel="noopener">Book here &#8599;</a></p>
        </div>
        <div class="travel-card">
          <h3>Hotel Placeholder C</h3>
          <p>Address and details to be added. Approximately X minutes from the venue.<br>
          <a href="#" target="_blank" rel="noopener">Book here &#8599;</a></p>
        </div>
      </div>

      <div class="divider">&#10022; &#10022; &#10022;</div>

      <h2 style="font-family:var(--font-serif); font-size:1.8rem; margin-bottom:1rem;">Getting There</h2>
      <div class="travel-grid">
        <div class="travel-card">
          <h3>By Car</h3>
          <p>Wisteria Hall is located at 2300 Arboretum Dr E, Seattle, WA 98112. Parking details to be added.</p>
        </div>
        <div class="travel-card">
          <h3>By Transit</h3>
          <p>Transit directions and nearby stops to be added.</p>
        </div>
        <div class="travel-card">
          <h3>From the Airport</h3>
          <p>Seattle-Tacoma International Airport (SEA) is approximately X miles away. Rideshare and transit options to be added.</p>
        </div>
      </div>

    </div>
  </main>

  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>
</body>
</html>
```

**Step 2: Verify in browser — cards render in grid, active nav state correct.**

**Step 3: Commit**

```bash
git add travel.html
git commit -m "feat: add travel and accommodations page"
```

---

### Task 6: Registry page

**Files:**
- Create: `registry.html`

**Step 1: Create `registry.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registry — Zené & Noah</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .registry-intro {
      text-align: center;
      max-width: 520px;
      margin: 0 auto 2.5rem;
      font-family: var(--font-serif);
      font-size: 1.1rem;
      color: #555;
      font-style: italic;
    }
    .registry-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 1.25rem;
      margin: 2rem 0;
    }
    .registry-card {
      background: var(--color-blue);
      padding: 2rem 1.5rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1rem;
    }
    .registry-card h3 {
      font-family: var(--font-serif);
      font-size: 1.3rem;
    }
    .registry-card p {
      font-size: 0.85rem;
      color: #666;
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="details.html">Details</a></li>
      <li><a href="rsvp.html">RSVP</a></li>
      <li><a href="travel.html">Travel</a></li>
      <li><a href="registry.html" class="active">Registry</a></li>
      <li><a href="faq.html">FAQ</a></li>
    </ul>
  </nav>

  <main>
    <div class="page-header">
      <p>Gifts</p>
      <h1>Registry</h1>
    </div>

    <div class="container">
      <p class="registry-intro">
        Your presence is truly the greatest gift. If you'd like to give something, we're registered at the following:
      </p>

      <div class="registry-grid">
        <!-- Add/remove cards as needed. Replace href="#" with actual registry URL. -->
        <div class="registry-card">
          <h3>Registry Name A</h3>
          <p>Description or note about this registry.</p>
          <a href="#" target="_blank" rel="noopener" class="btn">View Registry &#8599;</a>
        </div>
        <div class="registry-card">
          <h3>Registry Name B</h3>
          <p>Description or note about this registry.</p>
          <a href="#" target="_blank" rel="noopener" class="btn">View Registry &#8599;</a>
        </div>
      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>
</body>
</html>
```

**Step 2: Verify in browser.**

**Step 3: Commit**

```bash
git add registry.html
git commit -m "feat: add registry page"
```

---

### Task 7: FAQ page

**Files:**
- Create: `faq.html`

**Step 1: Create `faq.html`**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FAQ — Zené & Noah</title>
  <link rel="stylesheet" href="css/style.css">
  <style>
    .faq-list { margin: 2rem 0; }
    .faq-item {
      border-bottom: 1px solid var(--color-gold);
      position: relative;
    }
    .faq-item::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 3px;
      height: 100%;
      background: var(--color-green);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .faq-item.open::before { opacity: 1; }
    .faq-question {
      width: 100%;
      background: none;
      border: none;
      text-align: left;
      padding: 1.25rem 2rem 1.25rem 1rem;
      font-family: var(--font-serif);
      font-size: 1.1rem;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: var(--color-text);
    }
    .faq-question::after {
      content: '+';
      font-size: 1.4rem;
      color: var(--color-green);
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .faq-item.open .faq-question::after {
      transform: rotate(45deg);
    }
    .faq-answer {
      max-height: 0;
      overflow: hidden;
      transition: max-height 0.3s ease, padding 0.2s;
      padding: 0 1rem;
      font-size: 0.95rem;
      color: #555;
      line-height: 1.7;
    }
    .faq-item.open .faq-answer {
      max-height: 300px;
      padding: 0 1rem 1.25rem;
    }
  </style>
</head>
<body>
  <nav class="site-nav">
    <span class="nav-logo">Z &amp; N</span>
    <ul class="nav-links">
      <li><a href="index.html">Home</a></li>
      <li><a href="details.html">Details</a></li>
      <li><a href="rsvp.html">RSVP</a></li>
      <li><a href="travel.html">Travel</a></li>
      <li><a href="registry.html">Registry</a></li>
      <li><a href="faq.html" class="active">FAQ</a></li>
    </ul>
  </nav>

  <main>
    <div class="page-header">
      <p>Questions?</p>
      <h1>FAQ</h1>
    </div>

    <div class="container">
      <div class="faq-list">

        <div class="faq-item">
          <button class="faq-question">What is the dress code?</button>
          <div class="faq-answer">
            The dress code is cocktail attire. Think semi-formal — dresses, jumpsuits, suits, or dress pants and a blouse. We'll be outdoors at an arboretum, so you may want to consider the terrain when choosing footwear.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">Is the venue indoors or outdoors?</button>
          <div class="faq-answer">
            Details to be added. The venue is Wisteria Hall at the Washington Park Arboretum.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">Are children welcome?</button>
          <div class="faq-answer">
            Answer to be added.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">Will there be parking at the venue?</button>
          <div class="faq-answer">
            Parking details to be added.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">What should I do if I have dietary restrictions?</button>
          <div class="faq-answer">
            Please note any dietary restrictions in your RSVP and we'll do our best to accommodate you.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">When is the RSVP deadline?</button>
          <div class="faq-answer">
            Please RSVP by June 1, 2026.
          </div>
        </div>

        <!-- Add more questions as needed by duplicating a .faq-item block -->

      </div>
    </div>
  </main>

  <footer class="site-footer">
    <p>Zené &amp; Noah &middot; August 1, 2026 &middot; Seattle, WA</p>
  </footer>

  <script>
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.addEventListener('click', () => {
        const item = btn.parentElement;
        const isOpen = item.classList.contains('open');
        document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
        if (!isOpen) item.classList.add('open');
      });
    });
  </script>
</body>
</html>
```

**Step 2: Verify in browser — accordion opens/closes, wisteria green accent bar appears on open item.**

**Step 3: Commit**

```bash
git add faq.html
git commit -m "feat: add FAQ page with accordion"
```

---

### Task 8: GitHub Pages setup

**Files:**
- Modify: `index.html` — verify all relative paths are correct for `/wedding-website/` base

**Step 1: Verify all asset paths use relative paths (not `/`-rooted)**

All links in HTML should be:
- `href="css/style.css"` ✓ (not `/css/style.css`)
- `href="index.html"` ✓ (not `/index.html`)
- `src="js/carousel.js"` ✓

**Step 2: Push to GitHub and enable Pages**

```bash
git remote -v   # verify origin is set to ze_ne/wedding-website
git push origin main
```

Then in GitHub → Settings → Pages → Source: Deploy from branch → `main` → `/ (root)`.

**Step 3: Visit `ze_ne.github.io/wedding-website` and verify all pages load**

Check: nav links work, carousel, map iframe, fonts load correctly.

**Step 4: Commit any path fixes found**

```bash
git add -A
git commit -m "fix: correct asset paths for GitHub Pages"
```
