/* Games lobby */

let gcat = GAME_CATS.includes(qs('cat')) ? qs('cat') : 'All';
const banners = [...GAMES.slice(0, 4), GAMES[7], GAMES[8]];
const bannerItem = g => `<a href="game-detail.html?id=${g.id}" class="shrink-0 w-56 mx-2 rounded-xl overflow-hidden shadow-card hover:shadow-glow transition relative">
  <img src="${g.img}" alt="${g.title}" class="w-full aspect-[4/3] object-cover" loading="lazy">
  <span class="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3 text-white text-sm font-bold">${g.title}</span></a>`;

const gameCard = g => `<article class="group relative rounded-xl overflow-hidden bg-navy-900 shadow-card aspect-[4/5]">
  <img src="${g.img}" alt="" class="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
  <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
  <span class="absolute top-2 left-2 rounded px-2 py-0.5 text-[10px] font-bold ${g.tag === 'HOT' ? 'bg-live text-white' : g.tag === 'NEW' ? 'bg-brand-500 text-white' : 'bg-gold-500 text-navy-900'}">${g.tag}</span>
  <div class="absolute inset-x-0 bottom-0 p-3">
    <h3 class="text-white font-display text-xl font-bold leading-tight"><a href="game-detail.html?id=${g.id}" class="after:absolute after:inset-0">${g.title}</a></h3>
    <p class="text-white/70 text-xs mb-2">${g.cat} · ${g.players} playing</p>
    <a href="game-detail.html?id=${g.id}" class="relative z-10 block text-center rounded-full py-2 text-xs font-bold text-navy-900 bg-gradient-to-r from-gold-300 via-gold-500 to-gold-600 shadow-glow md:translate-y-4 md:opacity-0 group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 transition duration-300">Play Now</a>
  </div></article>`;

$('#content').innerHTML = `
  <div class="relative rounded-xl overflow-hidden shadow-card">
    <img src="IMG/ads/strip.jpg" alt="" class="w-full h-44 md:h-56 object-cover object-right">
    <div class="absolute inset-0 bg-gradient-to-r from-navy-900 via-navy-900/80 to-transparent flex flex-col justify-center p-6 md:p-10">
      <p class="text-gold-400 font-semibold text-sm uppercase tracking-widest">MY99 EXCH Games</p>
      <h1 class="font-display text-3xl md:text-5xl font-bold text-white leading-none mt-1">Exciting games.<br>Bigger rewards.</h1>
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

  ${mobilePromo()}

  <section id="offers" class="scroll-mt-32 grid sm:grid-cols-3 gap-3">
    ${[['Welcome Bonus', '100% on your first deposit', 'from-brand-500 to-brand-700'], ['Weekly Cashback', 'Up to 10% back every Monday', 'from-navy-700 to-navy-900'], ['Refer & Earn', 'Invite friends, earn rewards', 'from-gold-600 to-orange-600']]
      .map(([t, s, c]) => `<div class="rounded-xl p-5 text-white bg-gradient-to-br ${c} shadow-card"><p class="text-xs uppercase tracking-wider opacity-80">Offer</p><h3 class="font-display text-2xl font-bold">${t}</h3><p class="text-sm opacity-90 mb-3">${s}</p>
        <button type="button" onclick="toast('Offers are for display only in this demo')" class="rounded-full bg-white/15 hover:bg-white/25 px-4 min-h-[40px] text-sm font-semibold transition">Claim now</button></div>`).join('')}
  </section>`;

function renderGames() {
  const list = GAMES.filter(g => gcat === 'All' || g.cat === gcat);
  $('#g-grid').innerHTML = list.map(gameCard).join('');
  $('#g-count').textContent = `${list.length} games`;
  const u = new URL(location); gcat === 'All' ? u.searchParams.delete('cat') : u.searchParams.set('cat', gcat); history.replaceState(null, '', u);
}
initTabs($('#content [role=tablist]'), v => { gcat = v; renderGames(); });
renderGames();
