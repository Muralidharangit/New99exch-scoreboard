/* News list and article (news.html?id=...) */

const article = NEWS.find(n => n.id === qs('id'));
const ncat = qs('cat');

const listItem = n => `<li><a href="news.html?id=${n.id}" class="flex gap-4 py-4 group">
  <img src="${n.img}" alt="" class="w-28 h-20 md:w-40 md:h-24 rounded-lg object-cover shrink-0" loading="lazy">
  <span class="min-w-0"><span class="text-[11px] font-bold uppercase text-brand-600">${n.cat}</span>
  <span class="block font-display text-lg md:text-xl font-bold leading-snug group-hover:text-brand-500 transition">${n.title}</span>
  <span class="hidden sm:block text-sm text-slate-500 mt-1 line-clamp-2">${n.summary}</span>
  <span class="flex items-center gap-1 text-xs text-slate-400 mt-1">${ICON.clock}${n.time}</span></span></a></li>`;

if (article) {
  document.title = `${article.title} | MY99 EXCH News`;
  $('#content').innerHTML = `
    <nav class="text-xs text-slate-500" aria-label="Breadcrumb"><a href="news.html" class="hover:text-brand-500">News</a> / <a href="news.html?cat=${article.cat}" class="hover:text-brand-500">${article.cat}</a></nav>
    ${card(`<article class="p-5 md:p-8">
      <span class="rounded px-2 py-0.5 text-[11px] font-bold bg-brand-50 text-brand-600 uppercase">${article.cat}</span>
      <h1 class="font-display text-3xl md:text-4xl font-bold leading-tight mt-3">${article.title}</h1>
      <p class="text-slate-500 mt-2">${article.summary}</p>
      <p class="flex items-center gap-2 text-xs text-slate-400 mt-3 pb-4 border-b border-slate-100"><b class="text-slate-600">MY99 EXCH Desk</b> · ${ICON.clock}${article.time}</p>
      <img src="${article.img}" alt="" class="w-full rounded-lg my-5 aspect-[16/8] object-cover">
      <div class="prose-news">${NEWS_BODY.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="flex flex-wrap gap-2 mt-4">${['Cricket', article.cat, 'Live Scores'].map(t => `<span class="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-600">#${t.replace(/\s/g, '')}</span>`).join('')}</div>
    </article>`)}
    ${mobilePromo()}
    ${card(`${sectionHead('Related News', 'news.html')}<ul class="px-4 pb-2 divide-y divide-slate-100">${NEWS.filter(n => n !== article).slice(0, 4).map(listItem).join('')}</ul>`)}`;
} else {
  const cats = ['All', ...new Set(NEWS.map(n => n.cat))];
  let active = cats.includes(ncat) ? ncat : 'All';
  $('#content').innerHTML = `
    ${card(`<div class="px-4 pt-4"><h1 class="font-display text-3xl font-bold">Cricket News</h1><p class="text-sm text-slate-500">Latest stories, previews, squads and interviews.</p></div>
      <div class="flex gap-2 overflow-x-auto no-scrollbar px-4 py-3" id="n-filters">${pills(cats, active)}</div>
      <ul id="n-list" class="px-4 pb-2 divide-y divide-slate-100" aria-live="polite"></ul>`)}
    ${mobilePromo()}`;
  const render = () => { $('#n-list').innerHTML = NEWS.filter(n => active === 'All' || n.cat === active).map(listItem).join(''); };
  $('#n-filters').addEventListener('click', e => { const b = e.target.closest('[data-filter]'); if (!b) return; active = b.dataset.filter; setPills($('#n-filters'), active); render(); });
  render();
}
