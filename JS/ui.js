/* MY99 EXCH — shared layout (header, match strip, sidebars, footer) and UI components */

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const qs = k => new URLSearchParams(location.search).get(k);
const PAGE = document.body.dataset.page;

const ICON = {
  chevron: '<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M5.3 7.3a1 1 0 0 1 1.4 0L10 10.6l3.3-3.3a1 1 0 1 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 0-1.4z"/></svg>',
  arrow: '<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10.3 4.3a1 1 0 0 1 1.4 0l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4-1.4l3.3-3.3H4a1 1 0 1 1 0-2h9.6l-3.3-3.3a1 1 0 0 1 0-1.4z"/></svg>',
  left: '<svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.7 4.3a1 1 0 0 1 0 1.4L8.4 10l4.3 4.3a1 1 0 0 1-1.4 1.4l-5-5a1 1 0 0 1 0-1.4l5-5a1 1 0 0 1 1.4 0z"/></svg>',
  right: '<svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M7.3 15.7a1 1 0 0 1 0-1.4l4.3-4.3-4.3-4.3a1 1 0 0 1 1.4-1.4l5 5a1 1 0 0 1 0 1.4l-5 5a1 1 0 0 1-1.4 0z"/></svg>',
  user: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-4.4 0-9 2.2-9 5v1a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-1c0-2.8-4.6-5-9-5z"/></svg>',
  menu: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16"/></svg>',
  close: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  ball: '<svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M7 5.5c2.5 3.5 2.5 9.5 0 13M17 5.5c-2.5 3.5-2.5 9.5 0 13" stroke-dasharray="2 2"/></svg>',
  clock: '<svg class="w-3.5 h-3.5" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="10" cy="10" r="7.5"/><path d="M10 6v4l2.5 1.5"/></svg>',
  eye: '<svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></svg>',
  play: '<svg class="w-4 h-4" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M6 4.5v11a1 1 0 0 0 1.5.9l9-5.5a1 1 0 0 0 0-1.8l-9-5.5A1 1 0 0 0 6 4.5z"/></svg>',
  home: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M3 11l9-8 9 8v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z"/></svg>',
  live: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M5.6 5.6a9 9 0 0 0 0 12.8M18.4 5.6a9 9 0 0 1 0 12.8M8.5 8.5a4.5 4.5 0 0 0 0 7M15.5 8.5a4.5 4.5 0 0 1 0 7"/></svg>',
  calendar: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></svg>',
  trophy: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M8 21h8M12 17v4M7 4h10v5a5 5 0 0 1-10 0zM7 6H4v2a3 3 0 0 0 3 3M17 6h3v2a3 3 0 0 1-3 3"/></svg>',
  game: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="2" y="7" width="20" height="11" rx="5"/><path d="M7 11v3M5.5 12.5h3M15.5 12h.01M18 13.5h.01"/></svg>',
  news: '<svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M7 8h10M7 12h10M7 16h6"/></svg>',
};

function flag(code, size = 'w-6 h-6') {
  const t = TEAMS[code];
  if (t.iso) return `<img src="https://flagcdn.com/w80/${t.iso}.png" alt="" class="${size} rounded-full object-cover ring-1 ring-slate-200 shrink-0" loading="lazy">`;
  return `<span class="${size} rounded-full grid place-items-center text-[8px] font-bold text-white shrink-0 ring-1 ring-black/10" style="background:${t.color}" aria-hidden="true">${teamShort(code).slice(0, 3)}</span>`;
}
const FORMAT_BADGE = { Test: 'bg-live text-white', ODI: 'bg-brand-500 text-white', T20: 'bg-gold-500 text-navy-900' };
const formatBadge = f => `<span class="rounded-full px-2 py-0.5 text-[11px] font-semibold ${FORMAT_BADGE[f]}">${f}</span>`;
const liveBadge = () => '<span class="bg-live text-white rounded px-1.5 text-[10px] leading-4 font-bold animate-livepulse">LIVE</span>';
const statusColor = m => m.state === 'live' ? 'text-live' : m.state === 'recent' ? 'text-brand-600' : 'text-slate-500';
const card = (inner, cls = '') => `<section class="bg-white rounded-xl shadow-card border border-slate-100 ${cls}">${inner}</section>`;
const sectionHead = (title, href, label = 'View All') => `<div class="flex items-center justify-between px-4 pt-4 pb-2">
  <h2 class="font-display text-xl font-bold text-slate-800 uppercase tracking-wide">${title}</h2>
  ${href ? `<a href="${href}" class="text-xs font-semibold text-brand-500 hover:text-brand-700 flex items-center gap-1 min-h-[44px] md:min-h-0">${label} ${ICON.arrow}</a>` : ''}</div>`;

function playBtn(label = 'Play Now', href = 'games.html', extra = '') {
  return `<a href="${href}" class="relative overflow-hidden whitespace-nowrap inline-flex items-center justify-center gap-1.5 rounded-full px-5 py-2 font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow hover:scale-105 transition duration-300 ${extra}">
    <span class="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-white/40 to-transparent" aria-hidden="true"></span>
    <span class="relative">${label}</span></a>`;
}

/* ---------- Promotion rotator (Swiper) ---------- */
function adInner(s, i, wide) {
  const src = `src="${s.img}"${i ? ' loading="lazy"' : ''}`;
  if (!s.title) return `<img ${src} alt="${s.alt}" class="w-full h-full object-cover ${s.pos || ''}" decoding="async">`;
  if (wide) return `<img ${src} alt="" class="absolute inset-0 w-full h-full object-cover object-right" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent"></span>
    <span class="absolute inset-0 flex items-center justify-between gap-4 px-5 md:px-8">
      <span class="min-w-0"><span class="block font-display font-bold uppercase leading-none text-gold-400 text-2xl md:text-3xl drop-shadow">${s.title}</span>
      <span class="block text-white/90 text-xs md:text-sm mt-1">${s.sub}</span></span>
      <span class="shrink-0 rounded-full px-4 md:px-6 py-2 text-xs md:text-sm font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">PLAY NOW →</span>
    </span>`;
  return `<img ${src} alt="" class="absolute inset-0 w-full h-full object-cover" decoding="async">
    <span class="absolute inset-0 bg-gradient-to-t from-navy-900/95 via-navy-900/40 to-navy-900/10"></span>
    <span class="absolute inset-x-0 bottom-0 p-4 flex flex-col items-center text-center gap-2">
      <img src="IMG/logo.webp" alt="MY99 EXCH" class="h-5 w-auto">
      <span class="font-display font-bold uppercase leading-none text-gold-400 text-2xl drop-shadow">${s.title}</span>
      <span class="text-white/90 text-xs">${s.sub}</span>
      <span class="mt-1 rounded-full px-4 py-1.5 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">PLAY NOW</span>
    </span>`;
}
function rotator(slides, aspect, label = 'Promotions', wide = false) {
  return `<div data-rotator role="region" aria-label="${label}">
    <div class="swiper rounded-xl overflow-hidden shadow-card bg-navy-900 ${aspect}">
      <div class="swiper-wrapper">${slides.map((s, i) => `<a href="${s.href}" class="swiper-slide relative block">${adInner(s, i, wide)}</a>`).join('')}</div>
    </div>
    <div class="promo-dots flex justify-center items-center mt-1 min-h-[24px]"></div></div>`;
}
function initRotators(root = document) {
  $$('[data-rotator]:not([data-ready])', root).forEach(el => {
    el.dataset.ready = 1;
    new Swiper($('.swiper', el), {
      loop: true,
      speed: 600,
      grabCursor: true,
      autoplay: { delay: 5000, pauseOnMouseEnter: true, disableOnInteraction: false },
      pagination: { el: $('.promo-dots', el), clickable: true },
      keyboard: { enabled: true, onlyInViewport: true },
      a11y: { prevSlideMessage: 'Previous promotion', nextSlideMessage: 'Next promotion', paginationBulletMessage: 'Show promotion {{index}}' },
      observer: true, observeParents: true
    });
  });
}
/* full-width promo slot shown between sections on phones only */
const mobilePromo = () => `<div class="md:hidden max-w-[300px] w-full mx-auto">${rotator(ADS.box, 'aspect-[22/30]', 'Sponsored')}</div>`;

/* ---------- Accessible tabs ---------- */
function initTabs(root, onChange) {
  const tabs = $$('[role=tab]', root);
  const select = (tab, focus) => {
    tabs.forEach(t => {
      const on = t === tab;
      t.setAttribute('aria-selected', on);
      t.tabIndex = on ? 0 : -1;
      t.classList.toggle('border-gold-500', on); t.classList.toggle('text-brand-700', on); t.classList.toggle('font-semibold', on);
      t.classList.toggle('border-transparent', !on); t.classList.toggle('text-slate-500', !on);
      const p = t.getAttribute('aria-controls') && document.getElementById(t.getAttribute('aria-controls'));
      if (p) p.hidden = !on;
    });
    if (focus) tab.focus();
    onChange && onChange(tab.dataset.value, tab);
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', e => {
      const k = { ArrowRight: 1, ArrowLeft: -1 }[e.key];
      if (k) { e.preventDefault(); select(tabs[(i + k + tabs.length) % tabs.length], true); }
      if (e.key === 'Home') { e.preventDefault(); select(tabs[0], true); }
      if (e.key === 'End') { e.preventDefault(); select(tabs[tabs.length - 1], true); }
    });
  });
  return { select: v => { const t = tabs.find(t => t.dataset.value === v); t && select(t); } };
}
function tabBar(items, active, { idPrefix = 'tab', label = 'Sections', panels = true } = {}) {
  return `<div role="tablist" aria-label="${label}" class="flex overflow-x-auto no-scrollbar border-b border-slate-200 px-2">
    ${items.map(v => {
      const on = v === active, key = v.toLowerCase().replace(/\s+/g, '-');
      return `<button type="button" role="tab" data-value="${v}" id="${idPrefix}-${key}"${panels ? ` aria-controls="${idPrefix}-panel-${key}"` : ''} aria-selected="${on}" tabindex="${on ? 0 : -1}"
        class="shrink-0 px-3 md:px-4 min-h-[44px] text-sm border-b-2 -mb-px transition duration-300 hover:text-brand-500 ${on ? 'border-gold-500 text-brand-700 font-semibold' : 'border-transparent text-slate-500'}">${v}</button>`;
    }).join('')}</div>`;
}
function pills(items, active, attr = 'data-filter') {
  return items.map(v => `<button type="button" ${attr}="${v}" aria-pressed="${v === active}"
    class="shrink-0 rounded-full px-3.5 min-h-[36px] text-xs font-semibold border transition duration-300 ${v === active ? 'bg-gold-500 border-gold-500 text-navy-900' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-500'}">${v}</button>`).join('');
}
function setPills(container, value, attr = 'data-filter') {
  $$(`[${attr}]`, container).forEach(b => {
    const on = b.getAttribute(attr) === value;
    b.setAttribute('aria-pressed', on);
    b.className = `shrink-0 rounded-full px-3.5 min-h-[36px] text-xs font-semibold border transition duration-300 ${on ? 'bg-gold-500 border-gold-500 text-navy-900' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-500 hover:text-brand-500'}`;
  });
}

function toast(msg) {
  let t = $('#toast');
  if (!t) { t = document.createElement('div'); t.id = 'toast'; t.setAttribute('role', 'status'); t.className = 'fixed left-1/2 -translate-x-1/2 bottom-20 md:bottom-8 z-[70] bg-navy-900 text-white text-sm px-4 py-3 rounded-lg shadow-lift transition duration-300 opacity-0'; document.body.append(t); }
  t.textContent = msg; t.classList.remove('opacity-0');
  clearTimeout(t._h); t._h = setTimeout(() => t.classList.add('opacity-0'), 2600);
}

/* ---------- Match helpers shared by pages ---------- */
function scoreLine(m, code, big) {
  const s = scoreOf(m, code);
  const txt = s ? `<span class="font-display font-bold ${big ? 'text-xl' : 'text-base'} text-slate-800">${s.r}${s.w < 10 ? '/' + s.w : ''}</span><span class="text-[11px] text-slate-400 ml-1">(${s.o})</span>` : '';
  return `<div class="flex items-center gap-2">${flag(code, 'w-5 h-5')}<span class="text-sm font-semibold ${s ? 'text-slate-700' : 'text-slate-500'} w-12">${teamShort(code)}</span>${txt}</div>`;
}

function matchRow(m) {
  const link = `match-detail.html?id=${m.id}`;
  const ln = 'text-brand-500 hover:text-brand-700 hover:underline';
  return `<div class="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-2 px-4 py-3 border-b border-slate-100 last:border-0 hover:bg-brand-50/60 transition">
    <div class="min-w-0">
      <div class="flex items-center gap-2 text-xs text-slate-500 mb-1.5">
        ${m.state === 'live' ? liveBadge() : ''}<a href="${link}" class="font-semibold text-slate-700 hover:text-brand-500">${teamShort(m.teams[0])} vs ${teamShort(m.teams[1])}, ${m.desc}</a> ${formatBadge(m.format)}
      </div>
      <div class="text-[11px] text-slate-400 mb-2 truncate">${m.venue} · ${m.date}</div>
      <div class="space-y-1">${scoreLine(m, m.teams[0])}${scoreLine(m, m.teams[1])}</div>
      <p class="text-xs font-semibold mt-2 ${statusColor(m)}">${m.status}</p>
    </div>
    <div class="flex sm:flex-col items-start sm:items-end justify-start gap-x-3 gap-y-1 text-xs font-medium flex-wrap">
      ${m.state === 'upcoming'
        ? `<a href="${link}&tab=info" class="${ln} min-h-[32px] flex items-center">Match Info</a><a href="${link}&tab=squads" class="${ln} min-h-[32px] flex items-center">Squads</a>`
        : `<a href="${link}&tab=live" class="${ln} min-h-[32px] flex items-center">Live Score</a><a href="${link}&tab=scorecard" class="${ln} min-h-[32px] flex items-center">Scorecard</a><a href="${link}&tab=full-commentary" class="${ln} min-h-[32px] flex items-center">Full Commentary</a>`}
    </div></div>`;
}

/* ---------- Layout ---------- */
const NAV = [
  { label: 'Live Scores', href: 'matches.html', page: 'matches' },
  { label: 'Schedule', href: 'matches.html?tab=Upcoming' },
  { label: 'Archives', href: 'matches.html?tab=Recent' },
  { label: 'News', page: 'news', items: [['Latest News', 'news.html'], ['Squads', 'news.html?cat=Squads'], ['Previews', 'news.html?cat=Preview'], ['Interviews', 'news.html?cat=Interview'], ['Women', 'news.html?cat=Women']] },
  { label: 'Series', page: 'series', items: [['All Series', 'series.html'], ...Object.entries(SERIES).slice(0, 7).map(([id, s]) => [s.name, `series.html?id=${id}`])] },
  { label: 'Teams', items: ['IND', 'AUS', 'ENG', 'PAK', 'SA', 'NZ', 'BAN', 'WI', 'SL', 'AFG'].map(c => [TEAMS[c].name, `matches.html?team=${c}&tab=Recent`]) },
  { label: 'Games', page: 'games', items: GAME_CATS.map(c => [c === 'All' ? 'All Games' : c, c === 'All' ? 'games.html' : `games.html?cat=${encodeURIComponent(c)}`]) },
  { label: 'Rankings', items: [['Test Rankings', 'page.html?p=rankings#Test'], ['ODI Rankings', 'page.html?p=rankings#ODI'], ['T20I Rankings', 'page.html?p=rankings#T20']] },
  { label: 'More', items: [['About Us', 'page.html?p=about'], ['Contact', 'page.html?p=contact'], ['Terms', 'page.html?p=terms'], ['Privacy', 'page.html?p=privacy']] }
];

function renderHeader() {
  const nav = NAV.map(n => n.items
    ? `<div class="relative group">
        <button type="button" class="flex items-center gap-1 px-2 2xl:px-3 py-2 text-white/90 hover:text-gold-400 transition ${n.page === PAGE ? 'text-gold-400' : ''}" aria-haspopup="true">${n.label}${ICON.chevron}</button>
        <div class="absolute left-0 top-full pt-2 hidden group-hover:block group-focus-within:block z-50">
          <ul class="bg-white rounded-lg shadow-lift py-2 min-w-[220px] border border-slate-100">
            ${n.items.map(([l, h]) => `<li><a href="${h}" class="block px-4 py-2 text-sm text-slate-700 hover:bg-brand-50 hover:text-brand-600">${l}</a></li>`).join('')}
          </ul></div></div>`
    : `<a href="${n.href}" class="px-2 2xl:px-3 py-2 text-white/90 hover:text-gold-400 transition ${n.page === PAGE ? 'text-gold-400' : ''}">${n.label}</a>`).join('');

  const strip = MATCHES.slice(0, 9).map(m => `<a href="match-detail.html?id=${m.id}" class="shrink-0 flex items-center gap-2.5 px-4 h-full border-r border-white/10 hover:bg-white/5 transition">
      <span class="flex -space-x-1.5">${flag(m.teams[0], 'w-5 h-5')}${flag(m.teams[1], 'w-5 h-5')}</span>
      <span class="leading-tight"><span class="block text-white font-semibold text-[13px]">${teamShort(m.teams[0])} vs ${teamShort(m.teams[1])}</span>
      <span class="block text-[11px] ${m.state === 'live' ? 'text-live font-semibold' : 'text-slate-400'}">${m.state === 'live' && m.short === 'Live' ? 'Live' : m.short}</span></span></a>`).join('');

  $('#site-header').outerHTML = `
  <a href="#content" class="sr-only focus:not-sr-only focus:absolute focus:z-[80] focus:bg-white focus:p-2">Skip to content</a>
  <header class="sticky top-0 z-50 shadow-md">
    <div class="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700">
      <div class="max-w-[1600px] mx-auto px-4 h-16 flex items-center gap-3">
        <button type="button" id="menu-btn" class="xl:hidden -ml-2 w-11 h-11 grid place-items-center text-white" aria-label="Open menu" aria-expanded="false" aria-controls="drawer">${ICON.menu}</button>
        <a href="index.html" class="shrink-0" aria-label="MY99 EXCH home"><img src="IMG/logo.webp" alt="MY99 EXCH" class="h-8 sm:h-10 w-auto drop-shadow"></a>
        <nav class="hidden xl:flex items-center text-sm font-semibold ml-2 whitespace-nowrap" aria-label="Main">${nav}</nav>
        <div class="ml-auto flex items-center gap-2 xl:gap-3">
          ${playBtn('Play Now', 'games.html', 'hidden sm:inline-flex text-sm')}
          <button type="button" class="w-10 h-10 rounded-full bg-navy-900/80 text-white grid place-items-center ring-2 ring-white/20 hover:ring-gold-500 transition" aria-label="Account" onclick="toast('Sign in is disabled in this demo')">${ICON.user}</button>
        </div>
      </div>
    </div>
    <div class="bg-strip text-sm text-slate-300">
      <div class="max-w-[1600px] mx-auto pl-4 md:px-4 h-12 flex items-stretch">
        <div class="hidden sm:flex items-center gap-2 pr-4 border-r border-white/10 text-white font-display font-bold text-lg tracking-wide">${ICON.ball} MATCHES</div>
        <div class="flex-1 flex overflow-x-auto whitespace-nowrap no-scrollbar" aria-label="Current matches">${strip}</div>
        <div class="relative flex items-center pl-2">
          <button type="button" id="all-btn" class="h-9 px-3 rounded-md bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center gap-1 transition" aria-expanded="false" aria-controls="all-panel">ALL ${ICON.chevron}</button>
          <div id="all-panel" hidden class="absolute right-0 top-full mt-1 w-80 max-h-[70vh] overflow-y-auto bg-white rounded-lg shadow-lift border border-slate-100 z-50 text-slate-700">
            ${['live', 'upcoming', 'recent'].map(st => `<p class="px-4 pt-3 pb-1 text-[11px] uppercase font-bold text-slate-400">${st}</p>` +
              MATCHES.filter(m => m.state === st).map(m => `<a href="match-detail.html?id=${m.id}" class="flex items-center gap-2 px-4 py-2 hover:bg-brand-50">
                <span class="flex -space-x-1.5">${flag(m.teams[0], 'w-5 h-5')}${flag(m.teams[1], 'w-5 h-5')}</span>
                <span class="text-sm min-w-0"><b class="font-semibold">${teamShort(m.teams[0])} vs ${teamShort(m.teams[1])}</b> <span class="text-slate-400">· ${m.desc}</span><span class="block text-[11px] truncate ${statusColor(m)}">${m.status}</span></span></a>`).join('')).join('')}
          </div>
        </div>
      </div>
    </div>
  </header>
  <div id="drawer" hidden class="fixed inset-0 z-[60] xl:hidden">
    <div class="absolute inset-0 bg-black/50" data-close></div>
    <nav class="absolute left-0 top-0 bottom-0 w-[84%] max-w-xs bg-white overflow-y-auto shadow-lift" aria-label="Mobile">
      <div class="flex items-center justify-between h-16 px-4 bg-brand-500"><img src="IMG/logo.webp" alt="MY99 EXCH" class="h-8"><button type="button" class="w-11 h-11 grid place-items-center text-white" data-close aria-label="Close menu">${ICON.close}</button></div>
      <div class="p-2">${NAV.map(n => n.items
        ? `<details class="group"><summary class="flex items-center justify-between px-3 min-h-[44px] font-semibold text-slate-700 cursor-pointer list-none">${n.label}<span class="transition group-open:rotate-180">${ICON.chevron}</span></summary>
            ${n.items.map(([l, h]) => `<a href="${h}" class="block pl-6 pr-3 py-2.5 text-sm text-slate-600 hover:text-brand-500">${l}</a>`).join('')}</details>`
        : `<a href="${n.href}" class="flex items-center px-3 min-h-[44px] font-semibold text-slate-700 hover:text-brand-500">${n.label}</a>`).join('')}
        <div class="p-3">${playBtn('Play Now', 'games.html', 'w-full')}</div>
      </div>
    </nav>
  </div>`;

  const drawer = $('#drawer'), mb = $('#menu-btn');
  const setDrawer = open => { drawer.hidden = !open; mb.setAttribute('aria-expanded', open); document.body.style.overflow = open ? 'hidden' : ''; };
  mb.addEventListener('click', () => setDrawer(true));
  $$('[data-close]', drawer).forEach(b => b.addEventListener('click', () => setDrawer(false)));
  const allBtn = $('#all-btn'), allPanel = $('#all-panel');
  allBtn.addEventListener('click', e => { e.stopPropagation(); allPanel.hidden = !allPanel.hidden; allBtn.setAttribute('aria-expanded', !allPanel.hidden); });
  document.addEventListener('click', e => { if (!allPanel.contains(e.target)) { allPanel.hidden = true; allBtn.setAttribute('aria-expanded', false); } });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { allPanel.hidden = true; setDrawer(false); } });
}

function renderSidebars() {
  const left = $('#left-sidebar');
  if (left) left.innerHTML = `<div class="sticky top-28">
    ${rotator(ADS.tall, 'aspect-[28/69]')}
    ${card(`<h2 class="font-display font-bold text-lg px-4 pt-3 pb-1">Quick Links</h2>
      <ul class="pb-2">${[['Live Matches', 'matches.html', ICON.live, 'bg-red-50 text-live'], ['Upcoming', 'matches.html?tab=Upcoming', ICON.calendar, 'bg-blue-50 text-blue-600'],
        ['Results', 'matches.html?tab=Recent', ICON.trophy, 'bg-amber-50 text-gold-600'], ['Games', 'games.html', ICON.game, 'bg-brand-50 text-brand-600']]
        .map(([l, h, ic, c]) => `<li><a href="${h}" class="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 transition border-t border-slate-100 first:border-0"><span class="w-8 h-8 rounded-full grid place-items-center ${c}">${ic}</span>${l}</a></li>`).join('')}</ul>`, 'mt-3')}</div>`;

  const right = $('#right-sidebar');
  if (right) right.innerHTML = `
    <div class="max-w-[300px] mx-auto">${rotator(ADS.box, 'aspect-[22/30]')}</div>
    ${card(`${sectionHead('Featured Games', 'games.html')}
      <ul class="px-4 pb-3 divide-y divide-slate-100">${GAMES.filter(g => ['cricket-clash', 'football-clash', 'basketball-clash', 'game-clash'].includes(g.id)).map(g => `
        <li class="flex items-center gap-3 py-2.5">
          <a href="game-detail.html?id=${g.id}" class="shrink-0 w-16 h-16 rounded-lg overflow-hidden"><img src="${g.thumb}" alt="" class="w-full h-full object-cover hover:scale-110 transition duration-500" loading="lazy"></a>
          <div class="flex-1 min-w-0"><a href="game-detail.html?id=${g.id}" class="block font-semibold text-sm text-slate-800 hover:text-brand-500">${g.title}</a><span class="text-xs text-slate-400">${g.cat}</span></div>
          <a href="game-detail.html?id=${g.id}" class="shrink-0 rounded-full px-4 py-1.5 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 hover:shadow-glow transition">Play</a>
        </li>`).join('')}</ul>`)}
    <div class="max-w-[280px] mx-auto">${rotator(ADS.tall2, 'aspect-[28/69]')}</div>`;
}

function renderFooter() {
  $('#site-footer').outerHTML = `
  <footer class="bg-gradient-to-r from-brand-700 via-brand-500 to-brand-700 text-white/80 mt-8 pb-20 md:pb-0">
    <div class="max-w-[1600px] mx-auto px-4 py-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      <div><img src="IMG/logo.webp" alt="MY99 EXCH" class="h-10 mb-3"><p class="text-sm leading-relaxed">Live cricket scores, ball-by-ball commentary, news and games — all in one place.</p></div>
      <div><h3 class="text-white font-display font-bold text-lg mb-3">Cricket</h3><ul class="space-y-2 text-sm">
        <li><a class="hover:text-gold-400" href="matches.html">Live Scores</a></li><li><a class="hover:text-gold-400" href="matches.html?tab=Upcoming">Schedule</a></li>
        <li><a class="hover:text-gold-400" href="series.html">Series</a></li><li><a class="hover:text-gold-400" href="news.html">News</a></li><li><a class="hover:text-gold-400" href="page.html?p=rankings">Rankings</a></li></ul></div>
      <div><h3 class="text-white font-display font-bold text-lg mb-3">Company</h3><ul class="space-y-2 text-sm">
        <li><a class="hover:text-gold-400" href="page.html?p=about">About</a></li><li><a class="hover:text-gold-400" href="page.html?p=contact">Contact</a></li>
        <li><a class="hover:text-gold-400" href="page.html?p=terms">Terms</a></li><li><a class="hover:text-gold-400" href="page.html?p=privacy">Privacy</a></li></ul></div>
      <div><h3 class="text-white font-display font-bold text-lg mb-3">Follow us</h3>
        <div class="flex gap-2 mb-5">${[['Facebook', 'M14 8h3V4h-3a4 4 0 0 0-4 4v2H8v4h2v8h4v-8h3l1-4h-4V8z'], ['X', 'M4 4l16 16M20 4L4 20'], ['Instagram', 'M7 3h10a4 4 0 0 1 4 4v10a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V7a4 4 0 0 1 4-4zm5 5a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm5.5-1.5h.01'], ['YouTube', 'M3 8a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v8a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3zm7 1v6l5-3z'], ['Telegram', 'M21 4L3 11l6 2 2 6 3-4 5 4z']]
          .map(([n, d]) => `<a href="#" aria-label="${n}" class="w-11 h-11 rounded-full bg-white/10 hover:bg-gold-500 hover:text-navy-900 grid place-items-center transition"><svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"><path d="${d}"/></svg></a>`).join('')}</div>
      </div>
    </div>
    <div class="border-t border-white/15"><div class="max-w-[1600px] mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between gap-2 text-xs">
      <span>© 2026 MY99 EXCH. All rights reserved.</span><span>Live scores · Commentary · News</span></div></div>
  </footer>
  <nav class="fixed bottom-0 inset-x-0 z-50 bg-white/95 backdrop-blur border-t border-slate-200 md:hidden" aria-label="Bottom">
    <div class="grid grid-cols-5">${[['Home', 'index.html', ICON.home, 'home'], ['Live', 'matches.html', ICON.live, 'matches'], ['Series', 'series.html', ICON.calendar, 'series'], ['Games', 'games.html', ICON.game, 'games'], ['News', 'news.html', ICON.news, 'news']]
      .map(([l, h, ic, p]) => `<a href="${h}" class="flex flex-col items-center justify-center gap-0.5 h-14 text-[11px] font-medium ${p === PAGE ? 'text-brand-600' : 'text-slate-500'}"${p === PAGE ? ' aria-current="page"' : ''}>${ic}${l}</a>`).join('')}</div>
  </nav>`;
}

/* ---------- Floating WhatsApp button ---------- */
const WHATSAPP = { number: '919999999999', text: 'Hi MY99 EXCH, I need help.' };
function renderWhatsApp() {
  const href = `https://wa.me/${WHATSAPP.number}?text=${encodeURIComponent(WHATSAPP.text)}`;
  const wa = document.createElement('div');
  wa.className = 'fixed right-4 bottom-20 md:bottom-6 md:right-6 z-[60] flex items-end gap-3';
  wa.innerHTML = `
    <div id="wa-bubble" hidden class="wa-pop relative max-w-[220px] rounded-2xl rounded-br-sm bg-white shadow-lift border border-slate-100 pl-4 pr-8 py-3 mb-2">
      <button type="button" id="wa-close" class="absolute top-1 right-1 w-7 h-7 grid place-items-center text-slate-400 hover:text-slate-700" aria-label="Close chat message">&times;</button>
      <p class="text-sm font-semibold text-slate-800">Need help?</p>
      <a href="${href}" target="_blank" rel="noopener" class="text-xs text-[#128C7E] font-semibold hover:underline">Chat with us on WhatsApp →</a>
    </div>
    <a href="${href}" target="_blank" rel="noopener" aria-label="Chat with us on WhatsApp" class="relative shrink-0 w-14 h-14 rounded-full bg-[#25D366] text-white grid place-items-center shadow-lift hover:scale-110 transition">
      <span class="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-60" aria-hidden="true"></span>
      <span class="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-live ring-2 ring-white animate-livepulse" aria-hidden="true"></span>
      <svg class="relative w-8 h-8" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true"><path d="M16 3a13 13 0 0 0-11.2 19.6L3 29l6.6-1.7A13 13 0 1 0 16 3zm0 23.7c-2 0-4-.6-5.7-1.6l-.4-.2-3.9 1 1-3.8-.3-.4A10.7 10.7 0 1 1 16 26.7zm5.9-8c-.3-.2-1.9-1-2.2-1-.3-.2-.5-.2-.7.1l-1 1.3c-.2.2-.4.2-.7.1-.3-.2-1.4-.5-2.6-1.6-1-.9-1.6-1.9-1.8-2.2-.2-.3 0-.5.1-.7l.5-.6.3-.5c.1-.2 0-.4 0-.6l-1-2.4c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.6.1-.9.4-.3.3-1.2 1.1-1.2 2.8s1.2 3.3 1.4 3.5c.2.2 2.4 3.6 5.7 5 .8.4 1.4.6 1.9.7.8.3 1.5.2 2.1.1.6-.1 1.9-.8 2.2-1.5.3-.7.3-1.4.2-1.5-.1-.2-.3-.3-.6-.4z"/></svg>
    </a>`;
  document.body.appendChild(wa);
  const bubble = $('#wa-bubble', wa);
  let closed = false;
  try { closed = sessionStorage.getItem('wa-closed') === '1'; } catch (e) {}
  if (!closed) setTimeout(() => { bubble.hidden = false; }, 2500);
  $('#wa-close', wa).addEventListener('click', () => {
    bubble.hidden = true;
    try { sessionStorage.setItem('wa-closed', '1'); } catch (e) {}
  });
}

function initLayout() {
  renderHeader();
  renderSidebars();
  renderFooter();
  renderWhatsApp();
}
initLayout();
// page scripts render their content synchronously; pick up every rotator once they are done
document.addEventListener('DOMContentLoaded', () => initRotators());
