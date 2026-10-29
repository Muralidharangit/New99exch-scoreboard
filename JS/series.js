/* Series list (series.html) and series page (series.html?id=...) */

const sid = qs('id');
const s = SERIES[sid];

if (!s) {
  $('#content').innerHTML = card(`<div class="px-4 pt-4 pb-2"><h1 class="font-display text-3xl font-bold">Cricket Series</h1></div>
    ${['International', 'League', 'Domestic', 'Women'].map(c => `<h2 class="px-4 py-2 bg-slate-100 text-xs font-bold uppercase text-slate-500">${c}</h2>
      <ul>${Object.entries(SERIES).filter(([, x]) => x.cat === c).map(([id, x]) => `<li><a href="series.html?id=${id}" class="flex items-center justify-between gap-3 px-4 py-3 border-b border-slate-100 hover:bg-brand-50 transition">
        <span><span class="block font-semibold text-slate-800">${x.name}</span><span class="text-xs text-slate-400">${x.dates}</span></span>
        <span class="flex -space-x-1.5">${x.teams.slice(0, 4).map(t => flag(t, 'w-6 h-6')).join('')}</span></a></li>`).join('')}</ul>`).join('')}`);
} else {
  document.title = `${s.name} | MY99 EXCH`;
  const TABS = ['Fixtures', 'Points Table', 'Stats'];
  const active = TABS.includes(qs('tab')) ? qs('tab') : 'Fixtures';
  const ms = MATCHES.filter(m => m.series === sid);

  // pad bilateral series with the remaining fixtures so the schedule looks complete
  const extra = [];
  if (!s.table) {
    const fmt = ms[0].format, n = fmt === 'Test' ? 2 : 3, label = fmt === 'Test' ? 'Test' : fmt === 'ODI' ? 'ODI' : 'T20I';
    for (let i = 1; i <= n; i++) {
      const d = `${['1st', '2nd', '3rd'][i - 1]} ${label}`;
      if (!ms.some(m => m.desc === d)) extra.push({ desc: d, teams: s.teams, venue: ms[0].venue, when: i < +ms[0].desc[0] ? 'Completed' : `Nov ${i * 3 + 1}, 2026`, done: i < +ms[0].desc[0] });
    }
  }
  const fixtures = `<ul>${ms.map(m => `<li class="border-b border-slate-100">${matchRow(m)}</li>`).join('')}
    ${extra.map(f => `<li class="px-4 py-3 border-b border-slate-100 flex flex-wrap items-center justify-between gap-2">
      <span><span class="block text-sm font-semibold text-slate-700">${teamShort(f.teams[0])} vs ${teamShort(f.teams[1])}, ${f.desc}</span><span class="text-xs text-slate-400">${f.venue}</span></span>
      <span class="text-xs font-semibold ${f.done ? 'text-brand-600' : 'text-slate-500'}">${f.when}</span></li>`).join('')}</ul>`;

  const table = s.table
    ? `<div class="overflow-x-auto"><table class="w-full text-sm"><thead><tr class="bg-slate-100 text-slate-500 uppercase text-xs"><th class="px-3 py-2 text-left">#</th><th class="px-3 py-2 text-left">Team</th><th class="px-3 py-2">M</th><th class="px-3 py-2">W</th><th class="px-3 py-2">L</th><th class="px-3 py-2">Pts</th><th class="px-3 py-2">${s.table === 'ptl' ? 'NRR' : 'Quotient'}</th></tr></thead>
      <tbody>${TABLES[s.table].map((r, i) => `<tr class="border-b border-slate-100 hover:bg-brand-50 ${i < (s.table === 'ptl' ? 4 : 2) ? '' : 'text-slate-500'}"><td class="px-3 py-2.5">${i + 1}</td><td class="px-3 py-2.5"><span class="flex items-center gap-2 font-semibold">${flag(r[0], 'w-5 h-5')}${TEAMS[r[0]].name}</span></td>
        ${r.slice(1).map((v, k) => `<td class="px-3 py-2.5 text-center tabular-nums ${k === 3 ? 'font-bold text-slate-800' : ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
      <p class="px-4 py-3 text-xs text-slate-400">Top ${s.table === 'ptl' ? 'four teams qualify for the playoffs' : 'two teams qualify for the knockouts'}.</p>`
    : `<div class="p-6 text-center"><p class="font-display text-2xl font-bold">${s.standing}</p><div class="flex justify-center gap-6 mt-4">${s.teams.map(t => `<span class="flex flex-col items-center gap-2">${flag(t, 'w-12 h-12')}<b class="text-sm">${TEAMS[t].name}</b></span>`).join('')}</div>
      <p class="text-xs text-slate-400 mt-4">Bilateral series — no points table.</p></div>`;

  // aggregate player stats from every simulated innings in the series
  const runs = {}, wkts = {};
  ms.forEach(m => inningsOf(m).forEach(inn => {
    inn.bat.forEach(b => { const k = b.name; runs[k] = runs[k] || { name: k, team: inn.team, r: 0, b: 0, inns: 0 }; runs[k].r += b.r; runs[k].b += b.b; runs[k].inns++; });
    inn.bowlers.forEach(b => { const k = b.name; wkts[k] = wkts[k] || { name: k, team: inn.bowlTeam, w: 0, r: 0, balls: 0 }; wkts[k].w += b.w; wkts[k].r += b.r; wkts[k].balls += b.balls; });
  }));
  const topR = Object.values(runs).sort((a, b) => b.r - a.r).slice(0, 5), topW = Object.values(wkts).sort((a, b) => b.w - a.w || a.r - b.r).slice(0, 5);
  const statTable = (title, cols, rows) => `<div><h3 class="font-display text-xl font-bold px-4 pt-4 pb-2">${title}</h3><div class="overflow-x-auto"><table class="w-full text-sm">
    <thead><tr class="bg-slate-100 text-slate-500 uppercase text-xs">${cols.map((c, i) => `<th class="px-3 py-2 ${i ? 'text-right' : 'text-left'}">${c}</th>`).join('')}</tr></thead>
    <tbody>${rows.map(r => `<tr class="border-b border-slate-100 hover:bg-brand-50">${r.map((v, i) => `<td class="px-3 py-2 ${i ? 'text-right tabular-nums' : ''}">${v}</td>`).join('')}</tr>`).join('')}</tbody></table></div></div>`;
  const stats = topR.length
    ? `<div class="grid xl:grid-cols-2 gap-2 pb-4">${statTable('Most Runs', ['Player', 'Inns', 'Runs', 'SR'], topR.map(p => [`<span class="flex items-center gap-2">${flag(p.team, 'w-4 h-4')}<b class="font-semibold">${p.name}</b></span>`, p.inns, `<b>${p.r}</b>`, (p.r * 100 / Math.max(1, p.b)).toFixed(1)]))}
      ${statTable('Most Wickets', ['Player', 'Overs', 'Wkts', 'Econ'], topW.map(p => [`<span class="flex items-center gap-2">${flag(p.team, 'w-4 h-4')}<b class="font-semibold">${p.name}</b></span>`, fmtOv(p.balls), `<b>${p.w}</b>`, (p.r * 6 / p.balls).toFixed(2)]))}</div>`
    : '<p class="p-8 text-center text-sm text-slate-400">Stats will appear once the series gets under way.</p>';

  $('#content').innerHTML = `
    <div class="relative rounded-xl overflow-hidden bg-gradient-to-br from-navy-700 to-navy-900 text-white p-6">
      <div class="absolute -right-10 -bottom-16 w-60 h-60 rounded-full bg-gold-500/20 blur-3xl" aria-hidden="true"></div>
      <a href="series.html" class="text-xs text-white/60 hover:text-gold-400">← All series</a>
      <h1 class="font-display text-3xl md:text-4xl font-bold mt-1">${s.name}</h1>
      <p class="text-sm text-white/70 mt-1">${s.dates} · ${s.cat}</p>
      <div class="flex -space-x-2 mt-4">${s.teams.map(t => flag(t, 'w-10 h-10')).join('')}</div>
    </div>
    ${card(`${tabBar(TABS, active, { idPrefix: 'sr', label: 'Series sections' })}
      <div id="sr-panel-fixtures" role="tabpanel" aria-labelledby="sr-fixtures" ${active === 'Fixtures' ? '' : 'hidden'}>${fixtures}</div>
      <div id="sr-panel-points-table" role="tabpanel" aria-labelledby="sr-points-table" ${active === 'Points Table' ? '' : 'hidden'}>${table}</div>
      <div id="sr-panel-stats" role="tabpanel" aria-labelledby="sr-stats" ${active === 'Stats' ? '' : 'hidden'}>${stats}</div>`, 'overflow-hidden')}
    ${mobilePromo()}`;
  initTabs($('#content [role=tablist]'), v => { const u = new URL(location); u.searchParams.set('tab', v); history.replaceState(null, '', u); });
}
