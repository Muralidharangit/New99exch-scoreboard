/* Single game page */

const g = GAMES.find(x => x.id === qs('id')) || GAMES[0];
document.title = `${g.title} – Play Online | MY99 EXCH`;
const ABOUT = {
  Cricket: ['Pick your batting style, read the bowler and time your shots to build the biggest score before the overs run out.', ['Choose a match mode and your team.', 'Swipe or tap to play each delivery.', 'Hit boundaries to build multipliers.', 'Finish on top of the leaderboard to win rewards.']],
  Casino: ['A premium table game with smooth animations and live statistics for every round.', ['Pick your chip value.', 'Place your selections on the table.', 'Watch the round play out.', 'Winnings are credited instantly.']],
  'Live Casino': ['Real dealers streamed in HD, with chat and multiple camera angles for the full casino feel.', ['Join an open table.', 'Place your selections before the timer ends.', 'Follow the dealer live.', 'Results settle automatically.']],
  Slots: ['Colourful reels, bonus rounds and free spins packed into a quick, mobile-friendly slot.', ['Set your spin value.', 'Tap spin or use auto-play.', 'Match symbols across paylines.', 'Trigger bonus rounds for extra rewards.']],
  Cards: ['The classic card game, rebuilt for fast rounds and a clean mobile layout.', ['Join a table that suits you.', 'Receive your cards.', 'Decide to play or fold.', 'Best hand wins the round.']]
};
const [desc, steps] = ABOUT[g.cat];
const related = GAMES.filter(x => x.id !== g.id).sort((a, b) => (b.cat === g.cat) - (a.cat === g.cat)).slice(0, 4);

$('#content').innerHTML = `
  <nav class="text-xs text-slate-500" aria-label="Breadcrumb"><a href="games.html" class="hover:text-brand-500">Games</a> / <a href="games.html?cat=${encodeURIComponent(g.cat)}" class="hover:text-brand-500">${g.cat}</a> / <span class="text-slate-700">${g.title}</span></nav>
  <div class="relative rounded-xl overflow-hidden shadow-card bg-navy-900">
    <img src="${g.img}" alt="" class="absolute inset-0 w-full h-full object-cover opacity-40 blur-sm scale-110">
    <div class="relative grid md:grid-cols-[280px_1fr] gap-6 p-5 md:p-8 items-center">
      <img src="${g.img}" alt="${g.title}" class="w-full aspect-square object-cover rounded-xl shadow-glow ring-2 ring-gold-500/60">
      <div class="text-white">
        <span class="rounded px-2 py-0.5 text-[11px] font-bold bg-gold-500 text-navy-900">${g.tag}</span>
        <h1 class="font-display text-4xl md:text-5xl font-bold mt-2 leading-none">${g.title}</h1>
        <p class="text-white/80 mt-2">${g.tagline}</p>
        <div class="flex flex-wrap gap-4 mt-4 text-sm text-white/80"><span>Category: <b class="text-white">${g.cat}</b></span><span>Playing now: <b class="text-white">${g.players}</b></span><span>Rating: <b class="text-gold-400">★ 4.${(g.title.length % 5) + 4}</b></span></div>
        <div class="mt-6 flex flex-wrap gap-3">${playBtn('Play Now', '#', 'text-base px-8 py-3" onclick="event.preventDefault();toast(\'Game launch is disabled in this demo\')')}
          <button type="button" onclick="toast('Demo mode coming soon')" class="rounded-full border border-white/30 px-6 min-h-[48px] text-sm font-semibold hover:bg-white/10 transition">Try Demo</button></div>
      </div>
    </div>
  </div>
  <div class="grid lg:grid-cols-2 gap-4">
    ${card(`<div class="p-5"><h2 class="font-display text-2xl font-bold mb-2">About the game</h2><p class="text-sm text-slate-600 leading-relaxed">${desc}</p>
      <ul class="mt-4 grid grid-cols-2 gap-2 text-sm">${['Instant play', 'Mobile friendly', 'Secure & fair', '24×7 support'].map(f => `<li class="flex items-center gap-2 text-slate-600"><span class="w-5 h-5 rounded-full bg-brand-50 text-brand-600 grid place-items-center text-xs">✓</span>${f}</li>`).join('')}</ul></div>`)}
    ${card(`<div class="p-5"><h2 class="font-display text-2xl font-bold mb-3">How to play</h2>
      <ol class="space-y-3">${steps.map((s, i) => `<li class="flex gap-3 text-sm text-slate-600"><span class="w-7 h-7 shrink-0 rounded-full bg-gold-500 text-navy-900 font-bold grid place-items-center">${i + 1}</span><span class="pt-1">${s}</span></li>`).join('')}</ol></div>`)}
  </div>
  ${mobilePromo()}
  ${card(`${sectionHead('Related Games', 'games.html')}<div class="grid grid-cols-2 lg:grid-cols-4 gap-3 px-4 pb-4">${related.map(r => `<a href="game-detail.html?id=${r.id}" class="group rounded-xl overflow-hidden bg-navy-900 shadow-card">
    <span class="block aspect-square overflow-hidden"><img src="${r.img}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy"></span>
    <span class="block p-3 text-white"><b class="font-display text-lg">${r.title}</b><span class="block text-xs text-white/60">${r.cat}</span></span></a>`).join('')}</div>`)}
  <p class="text-xs text-slate-400 text-center">18+ only. Please play responsibly. <a class="underline" href="page.html?p=responsible">Responsible Gaming</a></p>`;
