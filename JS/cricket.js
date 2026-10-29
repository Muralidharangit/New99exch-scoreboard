/* Deterministic ball-by-ball innings simulator.
   Every innings in MATCHES is rebuilt delivery by delivery so the scorecard, commentary,
   overs, fall of wickets and graphs all add up to the headline score. */

function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
function rngFrom(str) {
  let h = 1779033703 ^ str.length;
  for (const c of str) { h = Math.imul(h ^ c.charCodeAt(0), 3432918353); h = h << 13 | h >>> 19; }
  return mulberry32(h);
}

const toBalls = o => { const [a, b = '0'] = String(o).split('.'); return +a * 6 + +b; };
const fmtOv = b => Math.floor(b / 6) + '.' + (b % 6);
const runRate = (r, balls) => balls ? (r * 6 / balls).toFixed(2) : '0.00';

const OUTCOMES = {
  T20:  [[0, .32], [1, .36], [2, .09], [3, .01], [4, .14], [6, .08]],
  ODI:  [[0, .45], [1, .35], [2, .07], [3, .01], [4, .09], [6, .03]],
  Test: [[0, .68], [1, .20], [2, .04], [3, .01], [4, .06], [6, .01]]
};
const COMM = {
  0: ['no run, solidly defended back down the pitch', 'no run, beaten outside off! Lovely shape away', 'no run, left alone outside off stump', 'no run, pushed to cover, straight to the fielder', 'no run, tucked to short leg', 'no run, good length, blocked'],
  1: ['1 run, worked off the pads to fine leg', '1 run, dabbed down to third man', '1 run, pushed to long-on for an easy single', '1 run, tapped into the off side and they scamper through'],
  2: ['2 runs, driven into the gap at deep cover, they come back for the second', '2 runs, flicked behind square, good running between the wickets'],
  3: ['3 runs, timed beautifully through extra cover, the fielder cuts it off just inside the rope'],
  4: ['FOUR, cracking cover drive! Races away to the boundary', 'FOUR, pulled hard through mid-wicket, no stopping that', 'FOUR, glanced fine, the keeper had no chance', 'FOUR, cut away square, the ball sped across the outfield'],
  6: ['SIX, launched over long-on! That is massive', 'SIX, slog-swept into the second tier', 'SIX, picked the length early and lofted it straight back over the bowler'],
  lb: ['1 leg bye, struck on the pad and they sneak a single'],
  wd: ['wide, sliding down the leg side'],
  W: ['Big moment in the game!', 'The bowler is pumped up.', 'That is a huge breakthrough.', 'Soft dismissal, the batter will be disappointed.']
};

function simulateInnings(m, idx) {
  const inn = m.inns[idx];
  const rnd = rngFrom(m.id + '#' + idx);
  const pick = arr => arr[Math.floor(rnd() * arr.length)];
  const bowlTeam = m.teams.find(t => t !== inn.t);
  const batSquad = squadOf(inn.t), bowlSquad = squadOf(bowlTeam);
  const N = toBalls(inn.o);

  const extras = Math.max(2, Math.round(inn.r * 0.045));
  const nWd = Math.ceil(extras / 2), nLb = extras - nWd;

  const legal = Array.from({ length: N }, () => {
    let x = rnd(), acc = 0;
    for (const [v, p] of OUTCOMES[m.format]) { acc += p; if (x < acc) return { runs: v }; }
    return { runs: 0 };
  });
  const wk = new Set();
  if (inn.w === 10) wk.add(N - 1);
  while (wk.size < inn.w) wk.add(6 + Math.floor(rnd() * Math.max(1, N - 8)));
  wk.forEach(i => { legal[i] = { runs: 0, wkt: true }; });
  for (let k = 0; k < nLb;) { const i = Math.floor(rnd() * N); if (!legal[i].wkt && !legal[i].lb) { legal[i] = { runs: 1, lb: true }; k++; } }

  // Nudge individual balls until the bat runs hit the target exactly
  const adj = legal.map((_, i) => i).filter(i => !legal[i].wkt && !legal[i].lb);
  const target = inn.r - extras;
  const up = { 0: 1, 1: 2, 2: 4, 3: 4, 4: 6 }, down = { 6: 4, 4: 1, 3: 1, 2: 1, 1: 0 };
  let sum = adj.reduce((s, i) => s + legal[i].runs, 0);
  for (let g = 0; sum !== target && g < 200000; g++) {
    const b = legal[pick(adj)], v = b.runs;
    if (sum < target && up[v] !== undefined && up[v] - v <= target - sum) { sum += up[v] - v; b.runs = up[v]; }
    else if (sum > target && down[v] !== undefined && v - down[v] <= sum - target) { sum -= v - down[v]; b.runs = down[v]; }
  }
  const wides = new Set();
  while (wides.size < nWd) wides.add(Math.floor(rnd() * N));

  const bat = batSquad.map((n, i) => ({ name: cleanName(n), full: n, i, r: 0, b: 0, f: 0, s: 0, out: null, batted: i < 2 }));
  const bowlers = [10, 9, 8, 7, 6].map(i => ({ name: cleanName(bowlSquad[i]), balls: 0, r: 0, w: 0, m: 0, wd: 0 }));
  const keeper = cleanName(bowlSquad.find(n => n.includes('(wk)')) || bowlSquad[4]);
  const fielders = bowlSquad.map(cleanName);

  let st = 0, ns = 1, next = 2, score = 0, wkts = 0, lb = 0, wd = 0, count = 0, cur = null;
  const overs = [], fow = [], comm = [];
  const label = () => Math.floor(count / 6) + '.' + (count % 6 + 1);
  const snap = () => {
    cur.score = score; cur.wk = wkts;
    cur.bat = [bat[st], bat[ns]].filter(Boolean).filter(b => !b.out).map(b => ({ name: b.name, r: b.r, b: b.b }));
    const bw = cur.bowler;
    cur.bowl = { name: bw.name, fig: `${fmtOv(bw.balls).replace(/\.0$/, '')}-${bw.m}-${bw.r}-${bw.w}` };
  };

  for (let i = 0; i < N; i++) {
    if (count % 6 === 0) {
      cur = { no: count / 6 + 1, bowler: bowlers[(count / 6) % 5], chips: [], runs: 0, conceded: 0, startScore: score };
      overs.push(cur);
    }
    const bw = cur.bowler, striker = bat[st];
    if (wides.has(i)) {
      score++; wd++; bw.r++; bw.wd++; cur.runs++; cur.conceded++; cur.chips.push('wd');
      comm.push({ ov: label(), bowler: bw.name, batter: striker.name, kind: 'wd', text: pick(COMM.wd) });
    }
    const b = legal[i];
    const lab = label();
    count++; bw.balls++; striker.b++;
    if (b.wkt) {
      const x = rnd();
      const f = pick(fielders.filter(n => n !== bw.name));
      striker.out = x < .45 ? `c ${f} b ${bw.name}` : x < .6 ? `c ${keeper} b ${bw.name}` : x < .78 ? `b ${bw.name}` : x < .95 ? `lbw b ${bw.name}` : `c & b ${bw.name}`;
      wkts++; bw.w++;
      fow.push({ score, wk: wkts, name: striker.name, ov: lab });
      cur.chips.push('W');
      comm.push({ ov: lab, bowler: bw.name, batter: striker.name, kind: 'W',
        text: `<b>OUT!</b> ${striker.out}. ${pick(COMM.W)} <b>${striker.name} ${striker.r}(${striker.b})</b> [4s-${striker.f} 6s-${striker.s}]` });
      if (next < 11) { st = next++; bat[st].batted = true; }
    } else if (b.lb) {
      score++; lb++; cur.runs++; cur.chips.push('lb');
      comm.push({ ov: lab, bowler: bw.name, batter: striker.name, kind: 'lb', text: pick(COMM.lb) });
      [st, ns] = [ns, st];
    } else {
      const v = b.runs;
      score += v; striker.r += v; bw.r += v; cur.runs += v; cur.conceded += v;
      if (v === 4) striker.f++;
      if (v === 6) striker.s++;
      cur.chips.push(String(v));
      comm.push({ ov: lab, bowler: bw.name, batter: striker.name, kind: String(v), text: pick(COMM[v]) });
      if (v % 2) [st, ns] = [ns, st];
    }
    if (count % 6 === 0) {
      if (cur.conceded === 0) bw.m++;
      [st, ns] = [ns, st];
      snap(); cur.done = true;
    }
  }
  if (cur && !cur.done) snap();
  if (score !== inn.r || wkts !== inn.w) console.warn('simulation drift', m.id, idx, score, inn.r, wkts, inn.w);

  return {
    team: inn.t, bowlTeam, score, wkts, balls: N, overs, fow, comm,
    bat: bat.filter(b => b.batted), dnb: bat.filter(b => !b.batted),
    bowlers: bowlers.filter(b => b.balls > 0),
    extras: { total: lb + wd, b: 0, lb, wd, nb: 0, p: 0 },
    striker: bat[st], nonStriker: bat[ns],
    currentBowler: cur.bowler,
    lastBowler: (overs[overs.length - 2] || cur).bowler
  };
}

const _innCache = {};
function inningsOf(m) {
  if (!m.inns) return [];
  return _innCache[m.id] = _innCache[m.id] || m.inns.map((_, i) => simulateInnings(m, i));
}

/* ball chip used in commentary, recent balls and over summaries */
function chip(v, size = 'w-7 h-7') {
  const cls = v === 'W' ? 'bg-live text-white' : v === '4' ? 'bg-blue-500 text-white' : v === '6' ? 'bg-gold-500 text-navy-900'
    : v === '0' ? 'bg-slate-200 text-slate-500' : v === 'wd' || v === 'lb' ? 'bg-brand-50 text-brand-700 ring-1 ring-brand-500/30' : 'bg-white text-slate-700 ring-1 ring-slate-200';
  const txt = v === '0' ? '•' : v;
  return `<span class="${size} shrink-0 rounded-full grid place-items-center text-[11px] font-bold ${cls}" aria-label="${v === '0' ? 'dot ball' : v}">${txt}</span>`;
}
