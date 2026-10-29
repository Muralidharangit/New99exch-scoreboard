/* Live Scores / Schedule / Archives — match list grouped by series */

const STATES = ['Live', 'Recent', 'Upcoming'];
const CATS = ['All', 'International', 'League', 'Domestic', 'Women'];
let state = STATES.includes(qs('tab')) ? qs('tab') : 'Live';
let cat = CATS.includes(qs('cat')) ? qs('cat') : 'All';
const team = TEAMS[qs('team')] ? qs('team') : null;
const titles = { Live: 'Live Cricket Scores', Recent: 'Recent Results', Upcoming: 'Cricket Schedule' };

$('#content').innerHTML = `
  ${card(`<div class="px-4 pt-4">
      <h1 class="font-display text-2xl md:text-3xl font-bold" id="ml-title">${titles[state]}</h1>
      ${team ? `<p class="text-sm text-slate-500 mt-1 flex items-center gap-2">${flag(team, 'w-5 h-5')} Showing matches for <b class="text-slate-700">${TEAMS[team].name}</b> · <a class="text-brand-500 hover:underline" href="matches.html?tab=${state}">Clear</a></p>` : ''}
    </div>
    <div class="mt-2">${tabBar(STATES, state, { idPrefix: 'ml', label: 'Match state', panels: false })}</div>
    <div class="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="ml-filters">${pills(CATS, cat)}</div>
    <div id="ml-list" aria-live="polite"></div>`)}
  ${mobilePromo()}`;

function render() {
  const list = MATCHES.filter(m => m.state === state.toLowerCase() && (cat === 'All' || m.cat === cat) && (!team || m.teams.includes(team)));
  const groups = {};
  list.forEach(m => (groups[m.series] = groups[m.series] || []).push(m));
  $('#ml-title').textContent = titles[state];
  $('#ml-list').innerHTML = list.length ? Object.entries(groups).map(([sid, ms]) => `
    <div class="flex items-center justify-between px-4 py-2 bg-slate-100 border-y border-slate-200">
      <a href="series.html?id=${sid}" class="text-sm font-bold text-slate-700 hover:text-brand-500">${SERIES[sid].name}</a>
      <span class="text-[11px] uppercase font-semibold text-slate-400">${SERIES[sid].cat}</span>
    </div>${ms.map(matchRow).join('')}`).join('')
    : `<div class="px-4 py-12 text-center"><p class="text-slate-500 font-medium">No ${state.toLowerCase()} matches${cat !== 'All' ? ' in ' + cat : ''}${team ? ' for ' + TEAMS[team].name : ''}.</p>
       <a href="matches.html" class="inline-block mt-3 text-sm font-semibold text-brand-500 hover:underline">See all live matches</a></div>`;
  const u = new URL(location); u.searchParams.set('tab', state); cat === 'All' ? u.searchParams.delete('cat') : u.searchParams.set('cat', cat);
  history.replaceState(null, '', u);
}
initTabs($('#content [role=tablist]'), v => { state = v; render(); });
$('#ml-filters').addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b) return; cat = b.dataset.filter; setPills($('#ml-filters'), cat); render(); });
render();
