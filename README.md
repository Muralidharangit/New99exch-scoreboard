# MY99 EXCH — Live Cricket Scores

A static cricket live-score website with live scores, ball-by-ball commentary, scorecards, series, news and free-to-play cricket games. The page flow follows Cricbuzz, with MY99 EXCH branding.

There is no build step and no backend. Every page is plain HTML that loads Tailwind and Swiper from a CDN, and vanilla JavaScript renders the content from dummy data.

---

## 1. Tech stack

| Layer | What we used | Where it is loaded |
|---|---|---|
| Markup | Static HTML5. Each page is a shell with empty placeholders. | `*.html` |
| Styling | **Tailwind CSS Play CDN**, set up by a custom config | `https://cdn.tailwindcss.com` and [JS/tw-config.js](JS/tw-config.js) |
| Extra CSS | Swiper dot styles, focus ring, scrollbar hiding, news prose, reduced motion | [CSS/style.css](CSS/style.css) |
| Sliders | **Swiper 11.1.14** for the banner rotators and the home match carousel | jsDelivr: `swiper@11.1.14/swiper-bundle.min.css` / `.min.js` |
| Fonts | **Inter** (body) and **Rajdhani** (headings, `font-display`) | Google Fonts |
| Flags | flagcdn.com PNGs. Teams without an ISO code get a coloured initials badge. | `flag()` in [JS/ui.js](JS/ui.js) |
| Scripting | Vanilla JavaScript (ES2020) with no framework, no modules and no bundler | `JS/*.js` |
| Icons | Inline SVGs | `ICON` object in [JS/ui.js](JS/ui.js) |

### Tailwind theme ([JS/tw-config.js](JS/tw-config.js))

- **Colours**
  - `brand`: teal, `#0F766E` / `#14B8A6`. Used for the header, the footer and accents.
  - `strip`: the match strip under the header.
  - `navy`: dark panels and game cards.
  - `gold`: `#FFB800`, for Play Now buttons and active dots.
  - `live`: red, for LIVE badges and wickets.
  - `page`: the page background.
- **Shadows**: `shadow-card`, `shadow-lift`, `shadow-glow`.
- **Animations**: `animate-marquee` (game banner ticker), `animate-shimmer` (Play Now buttons), `animate-livepulse` (LIVE dot).

---

## 2. Folder structure

```
MY99EXCH-SCORE/
├── index.html          Home
├── matches.html        Match centre (Live / Recent / Upcoming)
├── match-detail.html   One match: info, live, scorecard, commentary…
├── series.html         Series list and series detail
├── news.html           News list and article
├── games.html          Games lobby
├── game-detail.html    One game
├── page.html           Static pages (About, Contact, Terms, Privacy, Rankings)
├── CSS/
│   └── style.css
├── JS/
│   ├── tw-config.js    Tailwind theme
│   ├── data.js         All dummy data (teams, squads, series, matches, news, games, ads)
│   ├── cricket.js      Ball-by-ball innings simulator
│   ├── ui.js           Shared layout + UI helpers (header, sidebars, footer, tabs, sliders)
│   ├── home.js         ┐
│   ├── matches.js      │
│   ├── match-detail.js │
│   ├── series.js       │  One script per page
│   ├── news.js         │
│   ├── games.js        │
│   ├── game-detail.js  │
│   └── page.js         ┘
└── IMG/
    ├── logo.webp
    ├── ads/            Banner ads
    ├── games/          Game artwork
    ├── news/           News photos
    └── zip/            Backup of the original crops (not used by the site)
```

---

## 3. How a page works

All 8 HTML files share the same shell. They differ only in the `data-page` value on `<body>` and in which page script loads last.

```html
<body data-page="home">
  <header id="site-header"></header>
  <main class="max-w-[1600px] mx-auto px-4 py-4 grid
               grid-cols-1 md:grid-cols-[1fr_280px] lg:grid-cols-[1fr_300px]
               xl:grid-cols-[210px_1fr_310px] 2xl:grid-cols-[240px_1fr_340px] gap-4 xl:gap-5">
    <aside id="left-sidebar" class="hidden xl:block"></aside>
    <section id="content"></section>
    <aside id="right-sidebar"></aside>
  </main>
  <footer id="site-footer"></footer>

  <script src="…swiper-bundle.min.js"></script>
  <script src="JS/data.js"></script>
  <script src="JS/cricket.js"></script>
  <script src="JS/ui.js"></script>
  <script src="JS/home.js"></script>   <!-- page script -->
</body>
```

1. **`ui.js`** fills the placeholders that every page shares:
   - **Header:** the teal bar with the logo and nav, the live match strip, and the mobile drawer.
   - **Left sidebar:** the tall banner rotator and Quick Links.
   - **Right sidebar:** the 300×250 rotator, Featured Games and the 300×600 rotator.
   - **Footer:** the teal footer and the mobile bottom nav.

   It uses `data-page` to highlight the active nav item. On `DOMContentLoaded` it calls `initRotators()` to start every Swiper banner.
2. **The page script** writes the page's own content into `#content`.

### Responsive layout

| Width | Layout |
|---|---|
| < 768px (mobile) | Single column. Banners appear inline between sections. Bottom nav bar and hamburger drawer. |
| 768–1279px (tablet / small laptop) | Content plus right sidebar. Desktop nav is still collapsed. |
| ≥ 1280px (`xl`, laptop) | Full 3 columns: left banner, content, right sidebar. Full desktop nav. |
| ≥ 1536px (`2xl`) | Wider sidebars. Content is capped at 1600px. |

Sidebars are sticky. Touch targets are at least 44px.

---

## 4. Pages

| Page | URL | Script | What it shows |
|---|---|---|---|
| **Home** | `index.html` | [home.js](JS/home.js) | See the list below this table. |
| **Matches** | `matches.html?tab=Live&team=IND` | [matches.js](JS/matches.js) | Live / Recent / Upcoming tabs and category pills, grouped by series. An optional `?team=` filter. The URL stays in sync. |
| **Match detail** | `match-detail.html?id=ind-aus&tab=Scorecard` | [match-detail.js](JS/match-detail.js) | Navy score hero. Tabs: Info, Live, Scorecard, Squads, Overs, Graphs, Highlights, Full Commentary, News (see below). |
| **Series** | `series.html` / `series.html?id=aus-ind-2026&tab=Points Table` | [series.js](JS/series.js) | All series. One series has Fixtures, Points Table and Stats tabs. Stats are totalled from the simulated innings. |
| **News** | `news.html` / `news.html?id=rohit-comeback` | [news.js](JS/news.js) | News list with category pills, and a full article view. |
| **Games** | `games.html` | [games.js](JS/games.js) | Hero ("Free sports games. Play anytime."), a scrolling game banner marquee, and a lobby with category tabs. |
| **Game detail** | `game-detail.html?id=cricket-clash` | [game-detail.js](JS/game-detail.js) | Game banner, About, How to play, related games. |
| **Static pages** | `page.html?p=about` (`about`, `contact`, `terms`, `privacy`, `rankings`) | [page.js](JS/page.js) | About, Contact (demo form), Terms, Privacy, ICC-style Rankings tabs. |

The home page shows, from top to bottom:
1. Match card carousel: 2.5 cards on desktop, 1.5 on tablet, 1.2 on mobile, with a promo card after every 3 matches.
2. Strip banner slider.
3. Quick Access: India Men, India Women, Games, Series.
4. Latest News, plus a featured story.
5. Featured Games.
6. More News.
7. Live Matches widget with tabs and filters.

The match detail tabs work like this:
- **Live:** current batters and bowler, key stats, recent balls, and an animated win-probability bar.
- **Scorecard:** batting and bowling cards, extras, fall of wickets, and Did Not Bat.
- **Squads:** both playing XIs with role icons.
- **Overs:** a ball-by-ball list of every over.
- **Graphs:** a Manhattan chart and a worm chart, both drawn as SVG.
- **Full Commentary:** over summaries and a "Load more" button.

Tabs are lazy. A panel renders the first time it is opened, and the active tab is kept in `?tab=`.

---

## 5. Data and the cricket simulator

### [JS/data.js](JS/data.js)

| Constant | Contents |
|---|---|
| `TEAMS` | International men and women, domestic (MUM, DEL, KAR, TN) and league teams (CHS, KOR, MMV, DLD, BLB, HYH). Each has a name, short code, flag code and colour. |
| `SQUADS` | Real player names for the main teams. `squadOf()` generates squads for the others. |
| `SERIES` | 12 series, with standings or points tables |
| `MATCHES` | 14 matches. Each has a format (Test, ODI or T20), a state (`live`, `recent` or `upcoming`), innings `{t, r, w, o}`, venue, toss, win %, and viewer count. |
| `NEWS`, `NEWS_BODY` | 9 news stories and the article body text |
| `GAMES`, `GAME_CATS` | 6 free games: Cricket Clash, Football Clash, Basketball Clash, Game Clash, Cricket Clash: India, Cricket Quiz. Categories: Cricket, Football, Basketball, Esports, Quiz. |
| `ADS` | Banner slide sets: `tall`, `tall2`, `box`, `strip`, `card` |
| `TABLES`, `RANKINGS` | League points tables and team rankings |

### [JS/cricket.js](JS/cricket.js): deterministic simulator

Each match only stores a headline score, for example `{ t: 'IND', r: 287, w: 6, o: '72.4' }`. `simulateInnings()` rebuilds that innings one delivery at a time. Its random generator (`mulberry32`) is seeded by the match id, so a match gives the same result on every load.

**The result:** the scorecard, commentary, over-by-over list, fall of wickets and graphs all add up to the headline score. If they ever don't, it logs a `simulation drift` warning in the console.

To add or change a match, edit its `inns` in `MATCHES`. Everything else is generated from that.

---

## 6. Images

All images were cropped from the original design mockup. Banner images are shown as-is. Some rotator slides instead use game art with a text overlay and a PLAY NOW button, built by `adInner()` in `ui.js`.

### `IMG/logo.webp`
| File | Size | Used in |
|---|---|---|
| `logo.webp` | 1354×271 | Header, footer, ad overlays |

### `IMG/ads/`: banners
| File | Size (px) | Used in |
|---|---|---|
| `1.png` ("Big Wins Bigger Dreams"), `2.png` / `3.png` ("View Score") | 280×690 | Left sidebar tall rotator (`ADS.tall`) and right sidebar bottom rotator (`ADS.tall2`) |
| `l1.png` (Cricket), `l2.png` (Football), `l3.png` (Badminton) | 220×300 | Right sidebar top rotator and mobile inline promos (`ADS.box`), promo cards in the home match carousel, sponsor box in the match detail hero (`l1.png`) |
| `s1.png` (Sportsbook), `s2.png` (Cricket), `s3.png` (Badminton) | 1200×200 (aspect 6:1) | Home strip banner slider (`ADS.strip`) |
| `strip.jpg` | 1188×172 | Games page hero background |
| `left-tall.jpg`, `card-promo.jpg` | — | Old mockup crops, no longer used |

### `IMG/games/`: game artwork (280×240)
| File | Game | Category |
|---|---|---|
| `1.png` | Cricket Clash | Cricket |
| `2.png` | Football Clash | Football |
| `3.png` | Basketball Clash | Basketball |
| `4.png` | Game Clash | Esports |
| `5.png` | Cricket Clash: India | Cricket |

Cricket Quiz (Quiz) uses `IMG/news/featured.jpg`.

### `IMG/news/`: news photos
| File | Size (px) | Used in |
|---|---|---|
| `featured.jpg` | 518×230 | Home featured story, news hero |
| `n1.jpg` – `n4.jpg` | 120×96 | Latest News thumbnails |
| `n5.jpg` – `n8.jpg` | 146×84 | More News thumbnails |

### `IMG/zip/`
`IMG/zip/` is a backup copy of the original crops. It includes the old casino banners (`right-top.jpg`, `right-tall.jpg`, `thumb-roulette.jpg`, `thumb-slots.jpg`, `thumb-teenpatti.jpg`), which were removed from the site. The site does not use this folder. **Delete it before deploying**, or the casino images will go live with the site.

---

## 7. Sliders (Swiper)

| Slider | Where | Settings |
|---|---|---|
| Banner rotators | Left tall, right box, right tall, home strip, mobile inline promos | Built by `rotator()` and started by `initRotators()` in `ui.js`. Loop, autoplay every 5 s (pauses on hover), 600 ms transition, clickable gold dots (`.promo-dots`), keyboard and a11y. |
| Match carousel | Home, top | Built in `home.js`. `slidesPerView` is 1.2 on mobile, 1.5 at ≥768px and 2.5 at ≥1024px. Arrow buttons, drag, keyboard and horizontal mouse-wheel. |
| Games marquee | Games page | A CSS `animate-marquee` loop, not Swiper. It pauses on hover. |

---

## 8. Accessibility

- **Tabs:** real `role="tablist"` / `tab` / `tabpanel` markup, with Arrow, Home and End key support (`initTabs()` in `ui.js`).
- **Focus:** a visible gold focus ring on `:focus-visible`.
- **Touch targets:** at least 44px.
- **Screen readers:**
  - the home page has an `sr-only` `<h1>`
  - images and links have alt text or `aria-label`s
  - ball chips have ARIA labels such as "dot ball"
- **Reduced motion:** `prefers-reduced-motion` turns animations off.

---

## 9. Running locally

The site needs a local web server, because some browsers block scripts on pages opened directly from `file://`.

```bash
cd MY99EXCH-SCORE
python3 -m http.server 8765
# open http://localhost:8765
```

There is nothing to install or build. To deploy, upload the folder to any static host (Netlify, Vercel, GitHub Pages, cPanel and so on). Leave out `IMG/zip/`.

---

## 10. Common edits

| Task | Where |
|---|---|
| Change brand colours or fonts | [JS/tw-config.js](JS/tw-config.js) |
| Add or edit a match or score | `MATCHES` in [JS/data.js](JS/data.js) |
| Add a news story | `NEWS` in [JS/data.js](JS/data.js), plus an image in `IMG/news/` |
| Add a game | `GAMES` in [JS/data.js](JS/data.js), plus art in `IMG/games/`. Add About text for a new category in `ABOUT` in [JS/game-detail.js](JS/game-detail.js). |
| Change banner slides | `ADS` in [JS/data.js](JS/data.js) |
| Change nav, header or footer links | `NAV`, `renderHeader()` and `renderFooter()` in [JS/ui.js](JS/ui.js) |
| Edit About, Terms or Privacy text | `PAGES` in [JS/page.js](JS/page.js) |

---

## 11. Content notes

- **Content policy:** the site has no betting or casino content. Every game is free to play with no real money, and the Terms page says so.
- **Banner slogans:** `ads/1.png` ("BIG WINS BIGGER DREAMS") and `strip.jpg` ("BIGGER REWARDS") have reward-style slogans printed into the images.
- **Dummy data:** all scores, players' stats, news stories and viewer counts are made up for demo purposes.
