/* Static pages: about, contact, terms, privacy, rankings */

const PAGES = {
  about: ['About MY99 EXCH', `<p>MY99 EXCH brings you fast, accurate live cricket scores, ball-by-ball commentary, full scorecards and the latest news from every major international, league and domestic competition.</p>
    <p>Alongside the cricket, our games section offers free-to-play cricket games — batting, bowling, strategy and quizzes.</p>`],
  contact: ['Contact Us', `<p>We usually reply within 24 hours.</p>
    <form class="grid gap-3 max-w-lg mt-4" onsubmit="event.preventDefault();this.reset();toast('Thanks! Your message has been noted (demo).')">
      <label class="text-sm font-semibold text-slate-600">Name<input required class="mt-1 w-full rounded-lg border border-slate-200 px-3 min-h-[44px] focus:border-brand-500 outline-none"></label>
      <label class="text-sm font-semibold text-slate-600">Email<input required type="email" class="mt-1 w-full rounded-lg border border-slate-200 px-3 min-h-[44px] focus:border-brand-500 outline-none"></label>
      <label class="text-sm font-semibold text-slate-600">Message<textarea required rows="4" class="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 focus:border-brand-500 outline-none"></textarea></label>
      <button class="justify-self-start rounded-full bg-brand-500 hover:bg-brand-600 text-white font-semibold px-6 min-h-[44px] transition">Send message</button></form>`],
  terms: ['Terms & Conditions', `<p>By using MY99 EXCH you agree to use the site for lawful purposes only. Scores and statistics are provided for information and may be delayed.</p><p>All games on MY99 EXCH are free to play and involve no real money.</p>`],
  privacy: ['Privacy Policy', `<p>We collect only the information needed to run the service, such as preferences stored in your browser. We never sell personal data.</p><p>You can clear stored preferences at any time from your browser settings.</p>`],
  rankings: ['Team Rankings', null]
};
const key = PAGES[qs('p')] ? qs('p') : 'about';
const [title, html] = PAGES[key];
document.title = `${title} | MY99 EXCH`;

if (key === 'rankings') {
  const fmts = Object.keys(RANKINGS);
  const start = fmts.includes(location.hash.slice(1)) ? location.hash.slice(1) : 'Test';
  $('#content').innerHTML = card(`<h1 class="font-display text-3xl font-bold px-4 pt-4">${title}</h1>
    ${tabBar(fmts, start, { idPrefix: 'rk', label: 'Format' })}
    ${fmts.map(f => `<div id="rk-panel-${f.toLowerCase()}" role="tabpanel" aria-labelledby="rk-${f.toLowerCase()}" ${f === start ? '' : 'hidden'}>
      <table class="w-full text-sm"><thead><tr class="bg-slate-100 text-slate-500 uppercase text-xs"><th class="px-4 py-2 text-left">Rank</th><th class="px-4 py-2 text-left">Team</th><th class="px-4 py-2 text-right">Rating</th></tr></thead>
      <tbody>${RANKINGS[f].map(([t, r], i) => `<tr class="border-b border-slate-100 hover:bg-brand-50"><td class="px-4 py-2.5 font-bold ${i < 3 ? 'text-gold-600' : 'text-slate-400'}">${i + 1}</td>
        <td class="px-4 py-2.5"><span class="flex items-center gap-2 font-semibold">${flag(t, 'w-6 h-6')}${TEAMS[t].name}</span></td><td class="px-4 py-2.5 text-right font-display text-lg font-bold">${r}</td></tr>`).join('')}</tbody></table></div>`).join('')}`, 'overflow-hidden');
  initTabs($('#content [role=tablist]'), v => history.replaceState(null, '', '#' + v));
} else {
  $('#content').innerHTML = card(`<article class="p-5 md:p-8 prose-news"><h1 class="font-display text-3xl font-bold mb-4">${title}</h1>${html}</article>`) + mobilePromo();
}
