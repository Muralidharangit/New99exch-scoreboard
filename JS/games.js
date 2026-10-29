/* Games lobby */

let gcat = GAME_CATS.includes(qs('cat')) ? qs('cat') : 'All';
const banners = GAMES;
const bannerItem = g => `<a href="game-detail.html?id=${g.id}" class="shrink-0 w-56 mx-2 rounded-xl overflow-hidden shadow-card hover:shadow-glow transition relative">
  <img src="${g.img}" alt="${g.title}" class="w-full aspect-[7/6] object-cover" loading="lazy"></a>`;

const gameCard = g => `<article class="group relative flex flex-col rounded-xl overflow-hidden bg-navy-900 shadow-card hover:shadow-glow transition duration-300">
  <div class="relative aspect-[7/6] overflow-hidden"><img src="${g.img}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy"></div>
  <div class="p-3 bg-gradient-to-b from-navy-800 to-navy-900 flex-1 flex flex-col">
    <h3 class="text-white font-display text-lg font-bold leading-tight"><a href="game-detail.html?id=${g.id}" class="after:absolute after:inset-0">${g.title}</a></h3>
    <p class="text-white/70 text-xs mb-2">${g.cat} · ${g.players} playing</p>
    <a href="game-detail.html?id=${g.id}" class="relative z-10 mt-auto block text-center rounded-full py-2 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow">Play Now</a>
  </div></article>`;

$('#content').innerHTML = `
  <div class="relative rounded-xl overflow-hidden shadow-card">
    <img src="IMG/ads/strip.jpg" alt="" class="w-full h-44 md:h-56 object-cover object-right">
    <div class="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent flex flex-col justify-center p-6 md:p-10">
      <p class="text-gold-400 font-semibold text-sm uppercase tracking-widest">MY99 EXCH Games</p>
      <h1 class="font-display text-3xl md:text-5xl font-bold text-white leading-none mt-1">Free sports games.<br>Play anytime.</h1>
      <div class="mt-4">${playBtn('Explore Games', '#lobby')}</div>
    </div>
  </div>

  <section class="relative overflow-hidden" aria-label="Game banners">
    <div class="flex w-max animate-marquee hover:[animation-play-state:paused] py-2">${[...banners, ...banners].map(bannerItem).join('')}</div>
    <div class="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-page to-transparent"></div>
    <div class="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-page to-transparent"></div>
  </section>

  ${card(`<div id="lobby" class="scroll-mt-32"></div>
    <div class="flex items-center justify-between px-4 pt-4"><h2 class="font-display text-2xl font-bold">Games Lobby</h2><span id="g-count" class="text-xs text-slate-400"></span></div>
    ${tabBar(GAME_CATS, gcat, { idPrefix: 'gc', label: 'Game categories', panels: false })}
    <div id="g-grid" class="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 p-4" aria-live="polite"></div>`)}

  ${mobilePromo()}`;

function renderGames() {
  const list = GAMES.filter(g => gcat === 'All' || g.cat === gcat);
  $('#g-grid').innerHTML = list.map(gameCard).join('');
  $('#g-count').textContent = `${list.length} games`;
  const u = new URL(location); gcat === 'All' ? u.searchParams.delete('cat') : u.searchParams.set('cat', gcat); history.replaceState(null, '', u);
}
initTabs($('#content [role=tablist]'), v => { gcat = v; renderGames(); });
renderGames();
