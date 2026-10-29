/* Home page */

const order = { live: 0, upcoming: 1, recent: 2 };
const carouselMatches = [...MATCHES].sort((a, b) => order[a.state] - order[b.state]);

function matchCard(m) {
  return `<article class="swiper-slide !h-auto relative flex flex-col bg-white rounded-xl shadow-card border border-slate-100 hover:-translate-y-1 hover:shadow-lift transition duration-300">
    <div class="px-4 pt-3 flex items-center justify-between gap-2 text-[11px] text-slate-500">
      <span class="flex items-center gap-1.5 min-w-0">${m.state === 'live' ? liveBadge() : ''}<span class="truncate">${m.desc} · ${SERIES[m.series].name.split(',')[0]}</span></span>${formatBadge(m.format)}
    </div>
    <a href="match-detail.html?id=${m.id}" class="block px-4 pt-3 pb-3 after:absolute after:inset-0 after:rounded-xl" aria-label="${TEAMS[m.teams[0]].name} vs ${TEAMS[m.teams[1]].name}, ${m.desc}. ${m.status}">
      <div class="space-y-2">${scoreLine(m, m.teams[0], true)}${scoreLine(m, m.teams[1], true)}</div>
      <p class="mt-3 text-xs font-semibold ${m.state === 'live' ? 'text-live' : statusColor(m)} truncate">${m.status}</p>
    </a>
    <div class="mt-auto border-t border-slate-100 bg-slate-50 rounded-b-xl px-4 py-2 flex items-center justify-between text-[11px] font-semibold uppercase tracking-wide text-slate-500">
      <a href="series.html?id=${m.series}&tab=Fixtures" class="relative z-10 flex items-center gap-1 hover:text-brand-500 min-h-[32px]">Schedule ${ICON.arrow}</a>
      <a href="series.html?id=${m.series}&tab=${SERIES[m.series].table ? 'Points Table' : 'Stats'}" class="relative z-10 hover:text-brand-500 min-h-[32px] flex items-center">${SERIES[m.series].table ? 'Table' : 'Stats'}</a>
    </div></article>`;
}
const promoCard = () => `<a href="${ADS.card.href}" class="swiper-slide !h-auto relative block rounded-xl overflow-hidden shadow-card hover:-translate-y-1 hover:shadow-glow transition duration-300 bg-navy-900">
  <img src="${ADS.card.img}" alt="${ADS.card.alt}" class="absolute inset-0 w-full h-full object-cover" loading="lazy"></a>`;

const cards = carouselMatches.map((m, i) => matchCard(m) + ((i + 1) % 3 === 0 ? promoCard() : '')).join('');

const news = NEWS.slice(1, 5), featured = NEWS[0], more = NEWS.slice(5);
const newsItem = (n, big) => `<li><a href="news.html?id=${n.id}" class="flex gap-3 py-3 group">
  <img src="${n.img}" alt="" class="${big ? 'w-24 h-16' : 'w-[72px] h-14'} rounded-lg object-cover shrink-0" loading="lazy">
  <span class="min-w-0"><span class="block text-sm font-semibold text-slate-800 group-hover:text-brand-500 leading-snug line-clamp-2">${n.title}</span>
  <span class="flex items-center gap-1 text-xs text-slate-400 mt-1">${ICON.clock}${n.time}</span></span></a></li>`;

const quick = [
  ['India – Men', 'matches.html?team=IND', flag('IND', 'w-9 h-9'), 'hover:border-brand-500'],
  ['India – Women', 'matches.html?team=INDW', flag('INDW', 'w-9 h-9'), 'hover:border-brand-500'],
  ['Games', 'games.html', `<span class="w-9 h-9 rounded-full bg-violet-600 text-white grid place-items-center">${ICON.game}</span>`, 'bg-violet-50 border-violet-200 text-violet-700 hover:border-violet-500'],
  ['Offers', 'games.html#offers', `<span class="w-9 h-9 rounded-full bg-orange-500 text-white grid place-items-center">${ICON.gift}</span>`, 'bg-orange-50 border-orange-200 text-orange-600 hover:border-orange-500']
];

function featuredGameCard(g) {
  return `<article class="group relative rounded-xl overflow-hidden bg-navy-900 shadow-card">
    <a href="game-detail.html?id=${g.id}" class="block aspect-[137/118] overflow-hidden"><img src="${g.img}" alt="${g.title}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy"></a>
    <div class="p-3 bg-gradient-to-b from-navy-800 to-navy-900">
      <p class="text-white text-xs font-medium mb-2 truncate">${g.tagline}</p>
      ${playBtn('Play Now →', `game-detail.html?id=${g.id}`, 'w-full text-xs py-1.5')}
    </div></article>`;
}

$('#content').innerHTML = `
  <h1 class="sr-only">MY99 EXCH live cricket scores</h1>
  <section class="relative" aria-label="Featured matches">
    <button type="button" data-scroll="-1" class="mc-prev hidden md:grid absolute -left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-card place-items-center text-slate-700 hover:text-brand-500 hover:shadow-lift transition" aria-label="Previous matches">${ICON.left}</button>
    <div id="mc-track" class="swiper py-2 -my-2 px-0.5"><div class="swiper-wrapper">${cards}</div></div>
    <button type="button" data-scroll="1" class="mc-next hidden md:grid absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white shadow-card place-items-center text-slate-700 hover:text-brand-500 hover:shadow-lift transition" aria-label="Next matches">${ICON.right}</button>
  </section>

  ${rotator(ADS.strip, 'aspect-[3/1] sm:aspect-[594/86]', 'Promotions', true)}

  ${card(`<h2 class="font-display text-xl font-bold px-4 pt-3">Quick Access</h2>
    <div class="grid grid-cols-2 2xl:grid-cols-4 gap-3 p-4 pt-3">${quick.map(([l, h, ic, c]) => `<a href="${h}" class="flex items-center gap-2.5 rounded-full border border-slate-200 pl-1.5 pr-4 min-h-[48px] text-sm font-semibold text-slate-700 shadow-sm hover:shadow-card transition duration-300 ${c}">${ic}<span class="truncate">${l}</span></a>`).join('')}</div>`)}

  <div class="grid gap-4 xl:grid-cols-2">
    ${card(`${sectionHead('Latest News', 'news.html')}<ul class="px-4 pb-2 divide-y divide-slate-100">${news.map(n => newsItem(n)).join('')}</ul>`)}
    ${card(`<a href="news.html?id=${featured.id}" class="group block p-3">
      <div class="relative rounded-lg overflow-hidden aspect-[259/115]"><img src="${featured.img}" alt="" class="w-full h-full object-cover group-hover:scale-105 transition duration-500"></div>
      <div class="px-1 pt-3">
        <span class="inline-block rounded px-2 py-0.5 text-[11px] font-bold bg-brand-50 text-brand-600 uppercase">${featured.cat}</span>
        <h3 class="font-display text-2xl font-bold leading-tight mt-2 group-hover:text-brand-500 transition">${featured.title}</h3>
        <p class="text-sm text-slate-500 mt-2">${featured.summary}</p>
        <div class="flex items-center justify-between mt-3 text-xs"><span class="flex items-center gap-1 text-slate-400">${ICON.clock}${featured.time}</span><span class="font-semibold text-brand-500 flex items-center gap-1">Read More ${ICON.arrow}</span></div>
      </div></a>`)}
  </div>

  ${mobilePromo()}

  ${card(`${sectionHead('Featured Games', 'games.html')}<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 pb-4">${GAMES.slice(0, 4).map(featuredGameCard).join('')}</div>`)}

  ${card(`${sectionHead('More News', 'news.html')}<ul class="px-4 pb-2 divide-y divide-slate-100">${more.map(n => newsItem(n, true)).join('')}</ul>`)}

  ${mobilePromo()}

  ${card(`${sectionHead('Live Matches', 'matches.html')}
    ${tabBar(['Live', 'Recent', 'Upcoming'], 'Live', { idPrefix: 'hm', label: 'Match state', panels: false })}
    <div class="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="hm-filters">${pills(['All', 'International', 'League', 'Domestic', 'Women'], 'All')}</div>
    <div id="hm-list"></div>`)}
`;

/* carousel arrows */
new Swiper('#mc-track', {
  slidesPerView: 1.2,
  spaceBetween: 12,
  breakpoints: { 768: { slidesPerView: 1.5 }, 1024: { slidesPerView: 2.5 } },
  speed: 500,
  grabCursor: true,
  freeMode: { enabled: false },
  navigation: { prevEl: '.mc-prev', nextEl: '.mc-next' },
  keyboard: { enabled: true, onlyInViewport: true },
  mousewheel: { forceToAxis: true },
  a11y: { prevSlideMessage: 'Previous matches', nextSlideMessage: 'Next matches' }
});

/* live matches widget */
let hmState = 'Live', hmCat = 'All';
function renderHome() {
  const list = MATCHES.filter(m => m.state === hmState.toLowerCase() && (hmCat === 'All' || m.cat === hmCat));
  const groups = {};
  list.forEach(m => (groups[m.cat] = groups[m.cat] || []).push(m));
  $('#hm-list').innerHTML = list.length ? Object.entries(groups).map(([cat, ms]) =>
    `<h3 class="px-4 py-1.5 bg-slate-100 text-xs font-bold uppercase text-slate-500">${cat}</h3>${ms.slice(0, 3).map(matchRow).join('')}`).join('')
    : `<p class="px-4 py-8 text-center text-sm text-slate-400">No ${hmState.toLowerCase()} matches in this category.</p>`;
}
initTabs($('#content [role=tablist]'), v => { hmState = v; renderHome(); });
$('#hm-filters').addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b) return; hmCat = b.dataset.filter; setPills($('#hm-filters'), hmCat); renderHome(); });
renderHome();
