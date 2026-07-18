# Responsive Landing Page — Studio Lumen

A fully responsive, multi-page landing site for a fictional architecture & interior
design studio, built with plain **HTML5, CSS3 and vanilla JavaScript** — no
frameworks, no build tools, no dependencies to install.

The centerpiece is an **interactive fixed navigation bar** that starts transparent
over the hero image, smoothly swaps to a solid frosted background after 80px of
scroll, animates an underline on hover/active links, and collapses into a slide-in
hamburger menu on tablet and mobile.

---

## Project Overview

Studio Lumen is a 5-page marketing site: a homepage with all core sections, and
four dedicated inner pages (About, Services, Gallery, Contact) that share the same
navbar and footer for a consistent experience across the whole site.

---

## Features

**Navigation**
- Fixed navbar, visible on every page
- Transparent on load, solid + blurred background after scrolling 80px
- Smooth color/background transition
- Underline hover animation + active-link highlighting (updates as you scroll the homepage)
- Mobile hamburger icon that morphs into a close (X) icon
- Slide-in mobile menu with dimmed overlay
- Menu automatically closes after a link is tapped, or on <kbd>Esc</kbd>

**Sections (homepage)**
- Full-screen hero with heading, copy, dual CTAs and animated scroll cue
- About preview with image badge and bullet list
- 3 service cards with hover lift + image zoom
- Gallery preview grid with hover overlay captions
- 3 testimonial cards with star ratings
- Contact form with full client-side validation
- Footer with quick links, social icons and newsletter CTA

**Interactivity & Motion**
- Scroll-triggered fade-up / slide-in / zoom reveal animations (IntersectionObserver)
- Ripple/glow effect on every button click
- Card lift-on-hover, image zoom-on-hover, gallery caption reveal
- Scroll-progress bar fixed to the top of the viewport
- "Back to Top" button that fades in after 400px of scroll
- Smooth scrolling for every in-page anchor link
- `prefers-reduced-motion` respected — animations disable for users who request it

**Contact Form Validation**
- Empty-field checks for all 4 fields
- Regex email format validation
- Minimum name length (3 characters) and message length (10 characters)
- Inline error messages per field, cleared as the user retypes
- Success message shown on valid submit; page never refreshes (`preventDefault`)

**Responsive Design**
- Fluid layouts down to 4 breakpoints: 1200px / 992px / 860px (nav collapse) / 768px / 480px
- No horizontal scrolling at any width
- Images and grids reflow from 3 → 2 → 1 columns as the viewport narrows

---

## Folder Structure

```
Responsive-Landing-Page/
│
├── index.html          # Homepage — all sections
├── about.html           # About page
├── services.html         # Services page
├── gallery.html          # Gallery page
├── contact.html          # Contact page
│
├── css/
│   ├── style.css         # Variables, layout, components, all sections
│   ├── responsive.css     # Media queries (breakpoints)
│   └── animations.css     # Keyframes + scroll-reveal states
│
├── js/
│   ├── script.js         # Navbar scroll state, mobile menu, ripple, form validation
│   └── scroll.js         # Scroll progress bar, back-to-top, smooth scroll, reveal observer
│
├── images/
│   ├── hero.jpg, about.jpg, service1-3.jpg, gallery1-6.jpg, logo.png
│   (generated placeholder artwork in the site's blue color theme — swap with real photography anytime)
│
├── README.md
└── LICENSE
```

---

## Installation

No installation or build step is required — this is a static site.

1. Extract the ZIP file.
2. Open the `Responsive-Landing-Page` folder in **VS Code** (or any editor).

## How to Run

**Option A — Just open it**
Double-click `index.html` and it will open directly in your default browser.

**Option B — Live Server (recommended for the smoothest experience)**
1. Install the **Live Server** extension in VS Code.
2. Right-click `index.html` → **Open with Live Server**.
3. The site opens at `http://127.0.0.1:5500` (or similar) with auto-reload on save.

All internal links (`about.html`, `services.html`, etc.) and asset paths (`css/`,
`js/`, `images/`) are relative, so the project works identically whether opened
directly from the file system or through a local server.

---

## Screenshots

_Add screenshots of the live site here once you've opened it in your browser —
for example:_

- `docs/screenshot-hero.png` — Hero section, desktop
- `docs/screenshot-mobile-nav.png` — Mobile hamburger menu, open state
- `docs/screenshot-gallery.png` — Gallery grid with hover zoom

---

## Technologies Used

- **HTML5** — semantic markup (`header`, `main`, `section`, `footer`)
- **CSS3** — custom properties (variables), Flexbox, CSS Grid, keyframe animations, `backdrop-filter`
- **JavaScript (Vanilla, ES6)** — no libraries; uses `IntersectionObserver`, event delegation, regex validation
- **Google Fonts** — Poppins
- **Font Awesome 6** (CDN) — icon set

---

## Future Improvements

- Replace the generated placeholder images with real project photography
- Wire the contact form to a real backend (e.g. Formspree, Netlify Forms, or a small Express/Node endpoint) for actual email delivery
- Add a lightbox/modal for full-size gallery viewing
- Add a blog/case-studies section for individual project write-ups
- Add dark-mode theme toggle
- Internationalization (i18n) for multi-language support

---

## License

Released under the MIT License — see [LICENSE](LICENSE) for details.
