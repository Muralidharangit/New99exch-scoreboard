/* Match centre: Info | Live | Scorecard | Squads | Overs | Graphs | Highlights | Full Commentary | News */

const m = matchById(qs('id')) || MATCHES[0];
const S = SERIES[m.series];
const inns = inningsOf(m);
const cur = inns[inns.length - 1];
const started = m.state !== 'upcoming';
const [home, away] = S.teams.length === 2 && m.teams.every(t => S.teams.includes(t)) ? S.teams : m.teams;
const TABS = ['Info', 'Live', 'Scorecard', 'Squads', 'Overs', 'Graphs', 'Highlights', 'Full Commentary', 'News'];
const keyOf = v => v.toLowerCase().replace(/\s+/g, '-');
let active = TABS.find(t => keyOf(t) === qs('tab')) || (started ? 'Live' : 'Info');

document.title = `${TEAMS[home].name} vs ${TEAMS[away].name}, ${m.desc} – Live Score | MY99 EXCH`;

const th = 'px-3 py-2 text-right font-semibold';
const td = 'px-3 py-2 text-right tabular-nums';
const tableHead = cols => `<thead><tr class="bg-slate-100 text-slate-500 uppercase text-xs">${cols.map((c, i) => `<th scope="col" class="${i ? th : 'px-3 py-2 text-left font-semibold'}">${c}</th>`).join('')}</tr></thead>`;
const sr = (r, b) => b ? (r * 100 / b).toFixed(2) : '0.00';
const eco = (r, balls) => balls ? (r * 6 / balls).toFixed(2) : '0.00';
const notStarted = () => `<div class="p-10 text-center"><p class="font-display text-2xl font-bold text-slate-700">Match yet to begin</p>
  <p class="text-sm text-slate-500 mt-1">${m.status}. Check back for live scores and ball-by-ball commentary.</p>
  <button type="button" onclick="tabs.select('Squads')" class="mt-4 rounded-full border border-brand-500 text-brand-600 px-5 min-h-[44px] text-sm font-semibold hover:bg-brand-50">View squads</button></div>`;

/* ---------- Header + score hero ---------- */
function hero() {
  if (!started) return `<div class="bg-gradient-to-br from-navy-700 to-navy-900 text-white rounded-xl p-6 grid md:grid-cols-[1fr_260px] gap-6 items-center">
    <div><div class="flex items-center gap-4 md:gap-6">
      <div class="text-center">${flag(m.teams[0], 'w-14 h-14')}<p class="font-display font-bold text-xl mt-2">${teamShort(m.teams[0])}</p></div>
      <span class="font-display text-2xl text-white/50">VS</span>
      <div class="text-center">${flag(m.teams[1], 'w-14 h-14')}<p class="font-display font-bold text-xl mt-2">${teamShort(m.teams[1])}</p></div></div>
      <p class="mt-4 text-gold-400 font-semibold">${m.status}</p></div>
    ${sponsor()}</div>`;

  const prev = inns.slice(0, -1).map(i => `<span class="flex items-center gap-2">${flag(i.team, 'w-5 h-5')}<b>${teamShort(i.team)}</b> ${i.score}${i.wkts < 10 ? '/' + i.wkts : ''} <span class="text-white/50">(${fmtOv(i.balls)})</span></span>`).join('');
  const chasing = m.format !== 'Test' && inns.length === 2 && m.state === 'live';
  const need = chasing ? inns[0].score + 1 - cur.score : 0;
  const ballsLeft = chasing ? (m.format === 'T20' ? 120 : 300) - cur.balls : 0;
  const rates = [`CRR: <b class="text-white">${runRate(cur.score, cur.balls)}</b>`];
  if (chasing) rates.push(`REQ: <b class="text-white">${runRate(need, ballsLeft)}</b>`, `Target: <b class="text-white">${inns[0].score + 1}</b>`);
  return `<div class="bg-gradient-to-br from-navy-700 to-navy-900 text-white rounded-xl p-5 md:p-6 grid md:grid-cols-[1fr_260px] gap-6 items-center relative overflow-hidden">
    <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full bg-brand-500/20 blur-3xl" aria-hidden="true"></div>
    <div class="relative">
      <div class="flex flex-wrap gap-x-5 gap-y-1 text-sm text-white/80">${prev}</div>
      <div class="flex items-center gap-3 mt-3">${flag(cur.team, 'w-10 h-10')}
        <p class="font-display text-4xl md:text-5xl font-bold leading-none" aria-live="polite">${teamShort(cur.team)} ${cur.score}${cur.wkts < 10 ? '/' + cur.wkts : ''} <span class="text-xl md:text-2xl text-white/60 font-semibold">(${fmtOv(cur.balls)})</span></p></div>
      <p class="mt-3 flex flex-wrap gap-x-4 text-sm text-white/70">${rates.join('')}</p>
      ${m.session ? `<p class="mt-2 text-sm text-white/80">${m.session}</p>` : ''}
      <p class="mt-1 font-semibold text-gold-400">${m.status}</p>
    </div>
    ${sponsor()}</div>`;
}
const sponsor = () => `<a href="games.html" class="relative hidden md:block rounded-lg overflow-hidden ring-1 ring-white/10 hover:ring-gold-500 transition">
  <img src="IMG/ads/right-top.jpg" alt="MY99 EXCH – Casino, slots and live games" class="w-full aspect-[300/204] object-cover" loading="lazy">
  <span class="absolute top-1.5 left-1.5 text-[9px] uppercase tracking-wider bg-black/50 text-white/80 px-1.5 rounded">Sponsored</span></a>`;

/* ---------- Live panel ---------- */
function lastWicketInfo(inn) {
  const f = inn.fow[inn.fow.length - 1];
  if (!f) return null;
  const b = inn.bat.find(x => x.name === f.name);
  return `${f.name} ${b.r}(${b.b}) – ${f.score}/${f.wk} in ${f.ov} ov`;
}
function partnership(inn) {
  let r = 0, b = 0;
  for (let i = inn.comm.length - 1; i >= 0 && inn.comm[i].kind !== 'W'; i--) {
    const c = inn.comm[i];
    r += c.kind === 'wd' || c.kind === 'lb' ? 1 : +c.kind;
    if (c.kind !== 'wd') b++;
  }
  return `${r}(${b})`;
}
function last10(inn) {
  const o = inn.overs.slice(-10);
  const r = o.reduce((s, x) => s + x.runs, 0), w = o.reduce((s, x) => s + x.chips.filter(c => c === 'W').length, 0);
  return `${r} runs, ${w} wkt${w === 1 ? '' : 's'}`;
}
function recentBalls(inn) {
  const out = [];
  inn.overs.slice(-3).forEach((o, i) => { if (i) out.push('<span class="w-px h-6 bg-slate-300 mx-1" aria-hidden="true"></span>'); o.chips.forEach(c => out.push(chip(c))); });
  return out.join('');
}

function livePanel() {
  const batters = [cur.striker, cur.nonStriker].filter(b => b && !b.out);
  const bowlers = [cur.currentBowler, cur.lastBowler].filter((b, i, a) => a.indexOf(b) === i);
  const extra = m.format === 'Test'
    ? ['Overs left today', m.session && m.session.includes('Stumps') ? '0.0' : fmtOv(Math.max(0, 540 - inns.reduce((s, i) => s + i.balls, 0) % 540))]
    : m.state === 'live' && inns.length === 2 ? ['Equation', `${inns[0].score + 1 - cur.score} needed off ${(m.format === 'T20' ? 120 : 300) - cur.balls} balls`] : ['Run rate', runRate(cur.score, cur.balls)];
  const stats = [['Partnership', partnership(cur)], ['Last Wicket', lastWicketInfo(cur) || '—'], extra, ['Last 10 overs', last10(cur)], ['Toss', m.toss]];
  const win = m.win && m.state === 'live' ? m.win : null;
  const [wa, wb] = win ? Object.keys(win) : [];

  return card(`<div class="grid lg:grid-cols-[1fr_280px] gap-4 p-4">
    <div class="space-y-4 min-w-0">
      <div class="overflow-x-auto"><table class="w-full text-sm">${tableHead(['Batter', 'R', 'B', '4s', '6s', 'SR'])}
        <tbody>${batters.map(b => `<tr class="border-b border-slate-100 hover:bg-brand-50"><td class="px-3 py-2 font-semibold text-brand-600">${b.name}${b === cur.striker ? ' *' : ''}</td>
          <td class="${td} font-bold">${b.r}</td><td class="${td}">${b.b}</td><td class="${td}">${b.f}</td><td class="${td}">${b.s}</td><td class="${td}">${sr(b.r, b.b)}</td></tr>`).join('')}</tbody></table></div>
      <div class="overflow-x-auto"><table class="w-full text-sm">${tableHead(['Bowler', 'O', 'M', 'R', 'W', 'ECO'])}
        <tbody>${bowlers.map(b => `<tr class="border-b border-slate-100 hover:bg-brand-50"><td class="px-3 py-2 font-semibold text-brand-600">${b.name}${b === cur.currentBowler ? ' *' : ''}</td>
          <td class="${td}">${fmtOv(b.balls)}</td><td class="${td}">${b.m}</td><td class="${td}">${b.r}</td><td class="${td} font-bold">${b.w}</td><td class="${td}">${eco(b.r, b.balls)}</td></tr>`).join('')}</tbody></table></div>
    </div>
    <aside class="rounded-lg bg-slate-50 border border-slate-100 p-4" aria-label="Key stats">
      <h3 class="font-display text-lg font-bold mb-2">Key Stats</h3>
      <dl class="space-y-2.5 text-sm">${stats.map(([k, v]) => `<div><dt class="text-xs text-slate-400">${k}</dt><dd class="font-medium text-slate-700">${v}</dd></div>`).join('')}</dl>
    </aside>
  </div>
  <div class="border-t border-slate-100 px-4 py-3 grid gap-4 lg:grid-cols-[1fr_280px] items-center">
    <div class="flex items-center gap-2 min-w-0"><span class="text-xs font-semibold text-slate-500 shrink-0">Recent:</span><div class="flex items-center gap-1 overflow-x-auto no-scrollbar">${recentBalls(cur)}</div></div>
    ${win ? `<div><div class="flex justify-between text-xs font-semibold mb-1"><span class="text-brand-600">${teamShort(wa)} ${win[wa]}%</span><span class="text-slate-400">Win Probability</span><span class="text-live">${teamShort(wb)} ${win[wb]}%</span></div>
      <div class="h-2 rounded-full flex overflow-hidden bg-slate-200" role="img" aria-label="Win probability ${TEAMS[wa].name} ${win[wa]} percent, ${TEAMS[wb].name} ${win[wb]} percent">
        <span data-win="${win[wa]}" class="bg-brand-500 transition-all duration-1000" style="width:50%"></span><span data-win="${win[wb]}" class="bg-live transition-all duration-1000" style="width:50%"></span></div></div>`
      : `<p class="text-sm font-semibold ${statusColor(m)}">${m.status}</p>`}
  </div>`);
}

/* ---------- Commentary ---------- */
function overSummary(inn, o) {
  return `<div class="my-3 rounded-lg border border-slate-200 bg-slate-50 p-3 text-xs">
    <div class="flex flex-wrap items-center gap-x-4 gap-y-2">
      <div class="min-w-[80px]"><b class="text-slate-800 text-sm">Over ${o.no}</b><div class="text-slate-500">${o.runs} run${o.runs === 1 ? '' : 's'}</div></div>
      <div class="flex flex-wrap gap-1">${o.chips.map(c => chip(c, 'w-6 h-6')).join('')}</div>
      <b class="ml-auto font-display text-base text-slate-800">${teamShort(inn.team)} ${o.score}/${o.wk}</b>
    </div>
    <div class="mt-2 pt-2 border-t border-slate-200 flex flex-wrap justify-between gap-2 text-slate-600">
      <span>${o.bat.map(b => `${b.name} <b>${b.r}(${b.b})</b>`).join(' · ')}</span><span>${o.bowl.name} <b>${o.bowl.fig}</b></span>
    </div></div>`;
}
function ballRow(c) {
  const hi = ['4', '6', 'W'].includes(c.kind);
  return `<div class="flex gap-3 py-3 border-b border-slate-100 last:border-0">
    <div class="w-12 shrink-0 flex flex-col items-center gap-1"><b class="text-sm text-slate-800 tabular-nums">${c.ov}</b>${hi ? chip(c.kind, 'w-6 h-6') : ''}</div>
    <p class="text-sm text-slate-700 leading-relaxed">${c.bowler} to ${c.batter}, ${c.text}</p></div>`;
}
function commentary(inn, fromOver, count) {
  const byOver = {};
  inn.comm.forEach(c => (byOver[parseInt(c.ov) + 1] = byOver[parseInt(c.ov) + 1] || []).push(c));
  const overs = inn.overs.slice().reverse().slice(fromOver, fromOver + count);
  return overs.map(o => (o.done ? overSummary(inn, o) : '') + (byOver[o.no] || []).slice().reverse().map(ballRow).join('')).join('');
}
function commentaryBlock(inn, count, id) {
  return `<div id="${id}">${commentary(inn, 0, count)}</div>
    ${inn.overs.length > count ? `<button type="button" data-more="${id}" data-from="${count}" class="mt-3 w-full rounded-lg border border-slate-200 min-h-[44px] text-sm font-semibold text-brand-600 hover:bg-brand-50 transition">Load more commentary</button>` : ''}`;
}
document.addEventListener('click', e => {
  const b = e.target.closest('[data-more]');
  if (!b) return;
  const inn = inns[+(b.dataset.inn ?? inns.length - 1)];
  const from = +b.dataset.from;
  $('#' + b.dataset.more).insertAdjacentHTML('beforeend', commentary(inn, from, 10));
  b.dataset.from = from + 10;
  if (from + 10 >= inn.overs.length) b.remove();
});

/* ---------- Scorecard ---------- */
function scorecard(inn, i) {
  const ex = inn.extras;
  return `<details class="group border border-slate-200 rounded-lg overflow-hidden" ${i === inns.length - 1 ? 'open' : ''}>
    <summary class="list-none cursor-pointer flex items-center justify-between gap-3 px-4 min-h-[48px] bg-brand-500 text-white">
      <span class="flex items-center gap-2 font-semibold text-sm sm:text-base min-w-0">${flag(inn.team, "w-5 h-5")}<span class="truncate">${TEAMS[inn.team].name} Innings</span></span>
      <span class="flex items-center gap-2 font-display font-bold text-base sm:text-lg whitespace-nowrap">${inn.score}-${inn.wkts} (${fmtOv(inn.balls)} Ov)<span class="transition group-open:rotate-180">${ICON.chevron}</span></span></summary>
    <div class="overflow-x-auto"><table class="w-full text-sm min-w-[560px]">${tableHead(['Batter', '', 'R', 'B', '4s', '6s', 'SR'])}<tbody>
      ${inn.bat.map(b => `<tr class="border-b border-slate-100 hover:bg-brand-50"><td class="px-3 py-2 font-semibold text-brand-600 whitespace-nowrap">${b.full.replace(' (c)', ' <span class="text-slate-400 font-normal">(c)</span>').replace(' (wk)', ' <span class="text-slate-400 font-normal">(wk)</span>')}</td>
        <td class="px-3 py-2 text-xs text-slate-500">${b.out || 'not out'}</td><td class="${td} font-bold">${b.r}</td><td class="${td}">${b.b}</td><td class="${td}">${b.f}</td><td class="${td}">${b.s}</td><td class="${td}">${sr(b.r, b.b)}</td></tr>`).join('')}
      <tr class="border-b border-slate-100"><td class="px-3 py-2 font-semibold">Extras</td><td class="px-3 py-2 text-xs text-slate-500">(b ${ex.b}, lb ${ex.lb}, w ${ex.wd}, nb ${ex.nb}, p ${ex.p})</td><td class="${td} font-bold">${ex.total}</td><td colspan="4"></td></tr>
      <tr class="bg-slate-50"><td class="px-3 py-2 font-bold">Total</td><td class="px-3 py-2 text-xs text-slate-500">${cur === inn && m.state === 'live' ? 'batting' : ''}</td><td class="${td} font-bold" colspan="5" style="text-align:left">${inn.score}-${inn.wkts} (${fmtOv(inn.balls)} Ov, RR: ${runRate(inn.score, inn.balls)})</td></tr>
    </tbody></table></div>
    ${inn.dnb.length ? `<p class="px-4 py-2 text-xs border-t border-slate-100"><b class="text-slate-600">${inn.wkts === 10 || m.state === 'recent' ? 'Did not bat' : 'Yet to bat'}:</b> <span class="text-slate-500">${inn.dnb.map(b => b.name).join(', ')}</span></p>` : ''}
    ${inn.fow.length ? `<div class="px-4 py-3 border-t border-slate-100"><p class="text-xs font-bold uppercase text-slate-500 mb-1.5">Fall of Wickets</p>
      <p class="text-xs text-slate-600 leading-relaxed">${inn.fow.map(f => `<span class="whitespace-nowrap"><b>${f.score}-${f.wk}</b> (${f.name}, ${f.ov})</span>`).join(', ')}</p></div>` : ''}
    <div class="overflow-x-auto border-t border-slate-100"><table class="w-full text-sm min-w-[480px]">${tableHead(['Bowler', 'O', 'M', 'R', 'W', 'NB', 'WD', 'ECO'])}<tbody>
      ${inn.bowlers.map(b => `<tr class="border-b border-slate-100 hover:bg-brand-50"><td class="px-3 py-2 font-semibold text-brand-600">${b.name}</td><td class="${td}">${fmtOv(b.balls)}</td><td class="${td}">${b.m}</td><td class="${td}">${b.r}</td><td class="${td} font-bold">${b.w}</td><td class="${td}">0</td><td class="${td}">${b.wd}</td><td class="${td}">${eco(b.r, b.balls)}</td></tr>`).join('')}
    </tbody></table></div></details>`;
}

/* ---------- Squads ---------- */
const ROLE = { BAT: ['🏏', 'Batter'], BOWL: ['🎯', 'Bowler'], AR: ['⚡', 'All-rounder'], WK: ['🧤', 'Wicketkeeper'] };
function squads() {
  return `<div class="grid sm:grid-cols-2 gap-4 p-4">${[home, away].map(t => `<div>
    <h3 class="flex items-center gap-2 font-display text-xl font-bold pb-2 border-b-2 border-gold-500">${flag(t, 'w-7 h-7')}${TEAMS[t].name}</h3>
    <ul class="divide-y divide-slate-100">${squadOf(t).map((p, i) => { const [ic, lbl] = ROLE[roleOf(p, i)]; return `<li class="flex items-center gap-3 py-2.5">
      <span class="w-9 h-9 rounded-full bg-brand-50 grid place-items-center text-base" aria-hidden="true">${ic}</span>
      <span class="min-w-0"><span class="block text-sm font-semibold text-slate-800">${cleanName(p)}${p.includes('(c)') ? ' <span class="text-[10px] font-bold bg-gold-500 text-navy-900 rounded px-1">C</span>' : ''}</span>
      <span class="block text-xs text-slate-400">${lbl}</span></span></li>`; }).join('')}</ul></div>`).join('')}</div>`;
}

/* ---------- Overs ---------- */
function oversList(inn) {
  return inn.overs.slice().reverse().map(o => `<div class="flex items-center gap-3 px-4 py-2.5 border-b border-slate-100 hover:bg-brand-50">
    <span class="w-14 shrink-0 text-xs font-bold text-slate-500">Ov ${o.no}</span>
    <div class="flex flex-wrap gap-1 flex-1">${o.chips.map(c => chip(c, 'w-6 h-6')).join('')}</div>
    <span class="text-xs text-slate-500 w-14 text-right">${o.runs} runs</span>
    <b class="text-sm font-display w-16 text-right">${o.score}/${o.wk}</b></div>`).join('');
}
function inningsPills(id) {
  return inns.length > 1 ? `<div class="flex gap-2 px-4 pt-4 pb-1" data-inn-pills="${id}">${inns.map((inn, i) => `<button type="button" data-inn="${i}" aria-pressed="${i === inns.length - 1}"
    class="rounded-full px-3.5 min-h-[36px] text-xs font-semibold border transition ${i === inns.length - 1 ? 'bg-gold-500 border-gold-500 text-navy-900' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-500'}">${teamShort(inn.team)} Innings</button>`).join('')}</div>` : '';
}
function bindInningsPills(id, render) {
  const wrap = $(`[data-inn-pills="${id}"]`);
  if (!wrap) return;
  wrap.addEventListener('click', e => {
    const b = e.target.closest('[data-inn]'); if (!b) return;
    $$('[data-inn]', wrap).forEach(x => { const on = x === b; x.setAttribute('aria-pressed', on); x.className = `rounded-full px-3.5 min-h-[36px] text-xs font-semibold border transition ${on ? 'bg-gold-500 border-gold-500 text-navy-900' : 'bg-white border-slate-200 text-slate-600 hover:border-brand-500'}`; });
    render(+b.dataset.inn);
  });
}

/* ---------- Graphs (inline SVG) ---------- */
function manhattan(inn) {
  const W = 640, H = 220, P = 28, n = inn.overs.length;
  const max = Math.max(6, ...inn.overs.map(o => o.runs));
  const bw = (W - P * 2) / n;
  const ticks = [0, Math.round(max / 2), max];
  return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="Runs per over for ${TEAMS[inn.team].name}">
    ${ticks.map(t => { const y = H - P - (t / max) * (H - P * 2); return `<line x1="${P}" x2="${W - P}" y1="${y}" y2="${y}" stroke="#E2E8F0"/><text x="${P - 6}" y="${y + 4}" font-size="10" text-anchor="end" fill="#94A3B8">${t}</text>`; }).join('')}
    ${inn.overs.map((o, i) => { const h = (o.runs / max) * (H - P * 2), x = P + i * bw, y = H - P - h, w = o.chips.includes('W');
      return `<rect x="${x + bw * .15}" y="${y}" width="${Math.max(1, bw * .7)}" height="${h}" rx="1.5" fill="${w ? '#E53935' : '#0B7A6F'}"><title>Over ${o.no}: ${o.runs} runs${w ? ', wicket' : ''}</title></rect>
        ${w ? `<circle cx="${x + bw / 2}" cy="${y - 6}" r="3.5" fill="#E53935"/>` : ''}`; }).join('')}
    <text x="${W / 2}" y="${H - 6}" font-size="10" text-anchor="middle" fill="#94A3B8">Overs</text></svg>`;
}
function worm() {
  const W = 640, H = 220, P = 28;
  const maxO = Math.max(...inns.map(i => i.overs.length)), maxR = Math.max(...inns.map(i => i.score));
  const colors = ['#0B7A6F', '#FFB800', '#1A2B6D', '#E53935'];
  const x = o => P + (o / maxO) * (W - P * 2), y = r => H - P - (r / maxR) * (H - P * 2);
  return `<svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="Worm chart comparing cumulative runs">
    ${[0, .5, 1].map(f => `<line x1="${P}" x2="${W - P}" y1="${y(maxR * f)}" y2="${y(maxR * f)}" stroke="#E2E8F0"/><text x="${P - 6}" y="${y(maxR * f) + 4}" font-size="10" text-anchor="end" fill="#94A3B8">${Math.round(maxR * f)}</text>`).join('')}
    ${inns.map((inn, k) => `<polyline fill="none" stroke="${colors[k]}" stroke-width="2.5" stroke-linejoin="round" points="${P},${y(0)} ${inn.overs.map(o => `${x(o.no)},${y(o.score)}`).join(' ')}"/>`).join('')}
    </svg><div class="flex gap-4 justify-center text-xs mt-2">${inns.map((inn, k) => `<span class="flex items-center gap-1.5"><span class="w-3 h-1 rounded" style="background:${colors[k]}"></span>${teamShort(inn.team)}</span>`).join('')}</div>`;
}

/* ---------- Panels ---------- */
const P = {
  'Info': () => {
    const rows = [['Match', `${teamShort(m.teams[0])} vs ${teamShort(m.teams[1])}, ${m.desc}`], ['Series', `<a class="text-brand-500 hover:underline" href="series.html?id=${m.series}">${S.name}</a>`],
      ['Date', m.date], ['Time', m.time], ['Toss', m.toss || 'Not yet'], ['Venue', m.venue], ['Umpires', 'Richard Illingworth, Chris Gaffaney'], ['Third Umpire', 'Michael Gough'], ['Match Referee', 'Richie Richardson']];
    return `<div class="p-4"><h3 class="font-display text-xl font-bold mb-2">Match Info</h3>
      <dl class="divide-y divide-slate-100 text-sm">${rows.map(([k, v]) => `<div class="grid grid-cols-[120px_1fr] gap-3 py-2.5"><dt class="font-semibold text-slate-500">${k}</dt><dd class="text-slate-700">${v}</dd></div>`).join('')}</dl>
      <h3 class="font-display text-xl font-bold mt-6 mb-2">Venue Guide</h3>
      <dl class="divide-y divide-slate-100 text-sm">${[['Stadium', m.venue.split(',')[0]], ['City', m.venue.split(',').slice(1).join(',').trim() || '—'], ['Capacity', '35,000'], ['Ends', 'Pavilion End, Media End']]
        .map(([k, v]) => `<div class="grid grid-cols-[120px_1fr] gap-3 py-2.5"><dt class="font-semibold text-slate-500">${k}</dt><dd class="text-slate-700">${v}</dd></div>`).join('')}</dl></div>`;
  },
  'Live': () => started ? `<div class="space-y-4 p-4 bg-page">
      ${livePanel()}
      <div class="flex flex-wrap gap-2">${[['Graphs', `onclick="tabs.select('Graphs')"`], ['Series Stats', `href="series.html?id=${m.series}&tab=Stats"`], ['Schedule', `href="series.html?id=${m.series}&tab=Fixtures"`]]
        .map(([l, a]) => `<${a.startsWith('href') ? 'a' : 'button type="button"'} ${a} class="rounded-full border border-slate-200 bg-white px-4 min-h-[44px] flex items-center text-sm font-semibold text-slate-700 hover:border-brand-500 hover:text-brand-600 transition">${l}</${a.startsWith('href') ? 'a' : 'button'}>`).join('')}</div>
      ${mobilePromo()}
      ${card(`<div class="flex items-center justify-between px-4 pt-4"><h3 class="font-display text-xl font-bold">Commentary</h3><button type="button" onclick="tabs.select('Full Commentary')" class="text-xs font-semibold text-brand-500 hover:underline min-h-[44px]">Full commentary →</button></div>
        <div class="px-4 pb-4">${commentaryBlock(cur, 4, 'live-comm')}</div>`)}</div>` : notStarted(),
  'Scorecard': () => started ? `<div class="p-4 space-y-4">${inns.map(scorecard).join('')}<p class="text-sm font-semibold ${statusColor(m)}">${m.status}</p></div>` : notStarted(),
  'Squads': squads,
  'Overs': () => started ? `${inningsPills('ov')}<div id="ov-list" class="py-2">${oversList(cur)}</div>` : notStarted(),
  'Graphs': () => started ? `<div class="p-4 space-y-6">${inningsPills('gr')}
      <div><h3 class="font-display text-xl font-bold mb-2">Manhattan</h3><div id="gr-man">${manhattan(cur)}</div></div>
      <div><h3 class="font-display text-xl font-bold mb-2">Worm</h3>${worm()}</div></div>` : notStarted(),
  'Highlights': () => started ? `<div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">${inns.flatMap(i => i.comm.filter(c => ['4', '6', 'W'].includes(c.kind)).slice(-3).reverse().map(c => ({ c, t: i.team })))
      .map(({ c }, k) => `<button type="button" onclick="toast('Video highlights are not available in this demo')" class="group text-left rounded-xl overflow-hidden border border-slate-100 shadow-card hover:shadow-lift transition">
        <span class="relative block aspect-video overflow-hidden"><img src="${NEWS[(k % 8) + 1].img}" alt="" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" loading="lazy">
        <span class="absolute inset-0 bg-black/30 grid place-items-center"><span class="w-12 h-12 rounded-full bg-gold-500 text-navy-900 grid place-items-center shadow-glow">${ICON.play}</span></span>
        <span class="absolute bottom-2 right-2 text-[10px] bg-black/70 text-white px-1.5 rounded">0:${20 + k * 7}</span></span>
        <span class="block p-3 text-sm font-semibold text-slate-700">${c.kind === 'W' ? 'WICKET' : c.kind === '6' ? 'SIX' : 'FOUR'}: ${c.batter} (${c.ov} ov)</span></button>`).join('')}</div>` : notStarted(),
  'Full Commentary': () => started ? `${inningsPills('fc')}<div class="p-4" id="fc-wrap">${commentaryBlock(cur, 10, 'fc-list')}</div>` : notStarted(),
  'News': () => `<ul class="divide-y divide-slate-100 px-4">${NEWS.slice(0, 6).map(n => `<li><a href="news.html?id=${n.id}" class="flex gap-3 py-3 group">
      <img src="${n.img}" alt="" class="w-24 h-16 rounded-lg object-cover shrink-0" loading="lazy"><span><span class="block text-sm font-semibold group-hover:text-brand-500">${n.title}</span><span class="block text-xs text-slate-400 mt-1">${n.time}</span></span></a></li>`).join('')}</ul>`
};
const afterRender = {
  'Live': () => setTimeout(() => $$('[data-win]').forEach(s => s.style.width = s.dataset.win + '%'), 150),
  'Overs': () => bindInningsPills('ov', i => $('#ov-list').innerHTML = oversList(inns[i])),
  'Graphs': () => bindInningsPills('gr', i => $('#gr-man').innerHTML = manhattan(inns[i])),
  'Full Commentary': () => bindInningsPills('fc', i => {
    $('#fc-wrap').innerHTML = commentaryBlock(inns[i], 10, 'fc-list');
    const more = $('#fc-wrap [data-more]'); if (more) more.dataset.inn = i;
  })
};

/* ---------- Page ---------- */
$('#content').innerHTML = `
  <div class="space-y-1">
    <div class="flex flex-wrap items-start justify-between gap-3">
      <h1 class="font-display text-2xl md:text-[28px] leading-tight font-bold text-slate-800 max-w-3xl">${TEAMS[home].name} vs ${TEAMS[away].name}, ${m.desc}, ${S.name} – <span id="title-tab">${active === 'Info' ? 'Info' : 'Commentary'}</span></h1>
      ${m.state === 'live' ? `<span class="flex items-center gap-1.5 rounded-full bg-white shadow-card px-3 py-1.5 text-xs font-semibold text-slate-600">${ICON.eye}<span class="w-1.5 h-1.5 rounded-full bg-live animate-livepulse"></span>${m.viewers} watching</span>` : ''}
    </div>
    <p class="text-xs md:text-sm text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
      <span><b class="text-slate-600">Series:</b> <a href="series.html?id=${m.series}" class="hover:text-brand-500">${S.name}</a></span>
      <span><b class="text-slate-600">Venue:</b> ${m.venue}</span><span><b class="text-slate-600">Date &amp; Time:</b> ${m.date}, ${m.time}</span></p>
  </div>
  ${card(tabBar(TABS, active, { idPrefix: 'md', label: 'Match centre' }), 'sticky top-28 z-30')}
  ${hero()}
  ${card(TABS.map(t => `<div id="md-panel-${keyOf(t)}" role="tabpanel" aria-labelledby="md-${keyOf(t)}" tabindex="0" ${t === active ? '' : 'hidden'}></div>`).join(''), 'overflow-hidden')}`;

const rendered = new Set();
function show(t) {
  if (!rendered.has(t)) {
    $(`#md-panel-${keyOf(t)}`).innerHTML = P[t]();
    rendered.add(t);
    afterRender[t] && afterRender[t]();
    initRotators($(`#md-panel-${keyOf(t)}`));
  }
  $('#title-tab').textContent = t === 'Live' || t.includes('Commentary') ? 'Commentary' : t;
  const u = new URL(location); u.searchParams.set('id', m.id); u.searchParams.set('tab', keyOf(t)); history.replaceState(null, '', u);
}
const tabs = initTabs($('#content [role=tablist]'), show);
show(active);
