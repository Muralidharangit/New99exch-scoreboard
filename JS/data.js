/* MY99 EXCH — dummy data for the whole site */

const TEAMS = {
  IND: { name: 'India', iso: 'in' },
  AUS: { name: 'Australia', iso: 'au' },
  ENG: { name: 'England', iso: 'gb-eng' },
  PAK: { name: 'Pakistan', iso: 'pk' },
  SA:  { name: 'South Africa', iso: 'za' },
  NZ:  { name: 'New Zealand', iso: 'nz' },
  BAN: { name: 'Bangladesh', iso: 'bd' },
  WI:  { name: 'West Indies', color: '#7B1E3A' },
  SL:  { name: 'Sri Lanka', iso: 'lk' },
  AFG: { name: 'Afghanistan', iso: 'af' },
  INDW: { name: 'India Women', short: 'IND-W', iso: 'in' },
  AUSW: { name: 'Australia Women', short: 'AUS-W', iso: 'au' },
  ENGW: { name: 'England Women', short: 'ENG-W', iso: 'gb-eng' },
  SAW:  { name: 'South Africa Women', short: 'SA-W', iso: 'za' },
  MUM: { name: 'Mumbai', color: '#1D4ED8' },
  DEL: { name: 'Delhi', color: '#DC2626' },
  KAR: { name: 'Karnataka', color: '#B91C1C' },
  TN:  { name: 'Tamil Nadu', color: '#CA8A04' },
  CHS: { name: 'Chennai Strikers', color: '#EAB308' },
  KOR: { name: 'Kolkata Royals', color: '#6D28D9' },
  MMV: { name: 'Mumbai Mavericks', color: '#0EA5E9' },
  DLD: { name: 'Delhi Dynamos', color: '#E11D48' },
  BLB: { name: 'Bengaluru Blasters', color: '#991B1B' },
  HYH: { name: 'Hyderabad Hawks', color: '#F97316' }
};
const teamShort = c => TEAMS[c].short || c;

/* Batting order. Index 0-4 batters, 5-6 all-rounders, 7-10 bowlers; (wk)/(c) marked in name */
const SQUADS = {
  BAN: ['Mahmudul Hasan Joy','Shadman Islam','Najmul Hossain Shanto (c)','Mominul Haque','Mushfiqur Rahim','Litton Das (wk)','Mehidy Hasan Miraz','Taijul Islam','Taskin Ahmed','Nahid Rana','Hasan Mahmud'],
  WI:  ['Kraigg Brathwaite','Mikyle Louis','Keacy Carty','Alick Athanaze','Kavem Hodge','Joshua Da Silva (wk)','Roston Chase (c)','Justin Greaves','Alzarri Joseph','Jayden Seales','Shamar Joseph'],
  IND: ['Yashasvi Jaiswal','KL Rahul','Sai Sudharsan','Shubman Gill (c)','Rishabh Pant (wk)','Ravindra Jadeja','Washington Sundar','Nitish Kumar Reddy','Kuldeep Yadav','Jasprit Bumrah','Mohammed Siraj'],
  AUS: ['Usman Khawaja','Sam Konstas','Marnus Labuschagne','Steve Smith','Travis Head','Cameron Green','Alex Carey (wk)','Pat Cummins (c)','Mitchell Starc','Nathan Lyon','Josh Hazlewood'],
  ENG: ['Ben Duckett','Zak Crawley','Ollie Pope','Joe Root','Harry Brook','Ben Stokes (c)','Jamie Smith (wk)','Chris Woakes','Brydon Carse','Adil Rashid','Jofra Archer'],
  PAK: ['Saim Ayub','Fakhar Zaman','Babar Azam','Mohammad Rizwan (c) (wk)','Salman Ali Agha','Khushdil Shah','Faheem Ashraf','Shaheen Shah Afridi','Naseem Shah','Haris Rauf','Abrar Ahmed'],
  SA:  ['Ryan Rickelton (wk)','Reeza Hendricks','Aiden Markram (c)','Tristan Stubbs','David Miller','Dewald Brevis','Marco Jansen','Corbin Bosch','Kagiso Rabada','Keshav Maharaj','Lungi Ngidi'],
  NZ:  ['Devon Conway','Rachin Ravindra','Kane Williamson','Daryl Mitchell','Tom Latham (wk)','Glenn Phillips','Mitchell Santner (c)','Michael Bracewell','Matt Henry','Kyle Jamieson','Will ORourke'],
  SL:  ['Pathum Nissanka','Kusal Mendis (wk)','Kusal Perera','Charith Asalanka (c)','Kamindu Mendis','Janith Liyanage','Wanindu Hasaranga','Dunith Wellalage','Maheesh Theekshana','Matheesha Pathirana','Asitha Fernando'],
  AFG: ['Rahmanullah Gurbaz (wk)','Ibrahim Zadran','Sediqullah Atal','Rahmat Shah','Hashmatullah Shahidi (c)','Azmatullah Omarzai','Mohammad Nabi','Gulbadin Naib','Rashid Khan','Noor Ahmad','Fazalhaq Farooqi'],
  INDW: ['Smriti Mandhana','Shafali Verma','Jemimah Rodrigues','Harmanpreet Kaur (c)','Richa Ghosh (wk)','Deepti Sharma','Amanjot Kaur','Pooja Vastrakar','Radha Yadav','Renuka Singh','Shree Charani'],
  AUSW: ['Alyssa Healy (c) (wk)','Phoebe Litchfield','Ellyse Perry','Beth Mooney','Annabel Sutherland','Ashleigh Gardner','Tahlia McGrath','Georgia Wareham','Alana King','Megan Schutt','Kim Garth'],
  ENGW: ['Tammy Beaumont','Amy Jones (wk)','Heather Knight','Nat Sciver-Brunt (c)','Danni Wyatt-Hodge','Sophia Dunkley','Alice Capsey','Charlie Dean','Sophie Ecclestone','Lauren Bell','Kate Cross'],
  SAW: ['Laura Wolvaardt (c)','Tazmin Brits','Anneke Bosch','Sinalo Jafta (wk)','Chloe Tryon','Marizanne Kapp','Nadine de Klerk','Annerie Dercksen','Nonkululeko Mlaba','Ayabonga Khaka','Masabata Klaas']
};
const FIRST = ['Arjun','Rohan','Siddharth','Karan','Aditya','Varun','Rahul','Nikhil','Akash','Vikram','Harsh','Yash','Pranav','Dhruv','Ishan','Manav','Tanmay','Abhinav','Kunal','Shreyas','Ravi','Sameer'];
const LAST  = ['Sharma','Iyer','Patel','Nair','Desai','Reddy','Kulkarni','Menon','Chauhan','Saxena','Rana','Pillai','Bhat','Joshi','Thakur','Gill','Rao','Yadav','Mishra','Pandey','Kumar','Singh'];

function squadOf(code) {
  if (SQUADS[code]) return SQUADS[code];
  let h = [...code].reduce((a, c) => a * 31 + c.charCodeAt(0), 7);
  const out = [];
  for (let i = 0; i < 11; i++) {
    h = (h * 1103515245 + 12345) & 0x7fffffff;
    let n = FIRST[h % FIRST.length] + ' ' + LAST[(h >> 8) % LAST.length];
    if (out.some(o => o.startsWith(n))) n = FIRST[(h >> 4) % FIRST.length] + ' ' + LAST[(h >> 12) % LAST.length];
    if (i === 2) n += ' (c)';
    if (i === 4) n += ' (wk)';
    out.push(n);
  }
  SQUADS[code] = out;
  return out;
}
const cleanName = n => n.replace(/ \((c|wk)\)/g, '');
function roleOf(name, idx) {
  if (name.includes('(wk)')) return 'WK';
  if (idx <= 4) return 'BAT';
  if (idx <= 6) return 'AR';
  return 'BOWL';
}

const SERIES = {
  'wi-ban-2026':  { name: 'West Indies tour of Bangladesh, 2026', dates: 'Oct 27 – Nov 12, 2026', cat: 'International', teams: ['BAN','WI'], standing: 'Series level 0-0 (2 Tests)' },
  'aus-ind-2026': { name: 'Australia tour of India, 2026', dates: 'Oct 15 – Nov 20, 2026', cat: 'International', teams: ['IND','AUS'], standing: 'Australia lead 1-0 (4 Tests)' },
  'pak-eng-2026': { name: 'Pakistan tour of England, 2026', dates: 'Oct 24 – Nov 3, 2026', cat: 'International', teams: ['ENG','PAK'], standing: 'Pakistan lead 1-0 (3 ODIs)' },
  'nz-sa-2026':   { name: 'New Zealand tour of South Africa, 2026', dates: 'Oct 22 – Oct 31, 2026', cat: 'International', teams: ['SA','NZ'], standing: 'Series level 1-1 (3 T20Is)' },
  'afg-sl-2026':  { name: 'Afghanistan tour of Sri Lanka, 2026', dates: 'Oct 29 – Nov 4, 2026', cat: 'International', teams: ['SL','AFG'], standing: '3-match ODI series' },
  'ban-nz-2026':  { name: 'Bangladesh tour of New Zealand, 2026', dates: 'Oct 29 – Nov 6, 2026', cat: 'International', teams: ['NZ','BAN'], standing: '3-match T20I series' },
  'pak-aus-2026': { name: 'Pakistan tour of Australia, 2026', dates: 'Oct 20 – Oct 28, 2026', cat: 'International', teams: ['AUS','PAK'], standing: 'Australia won 3-0' },
  'eng-ind-2026': { name: 'England tour of India, 2026', dates: 'Nov 2 – Nov 9, 2026', cat: 'International', teams: ['IND','ENG'], standing: '3-match ODI series' },
  'ausw-indw-2026': { name: 'Australia Women tour of India, 2026', dates: 'Oct 21 – Oct 28, 2026', cat: 'Women', teams: ['INDW','AUSW'], standing: 'India Women won 2-1' },
  'saw-engw-2026':  { name: 'South Africa Women tour of England, 2026', dates: 'Oct 29 – Nov 5, 2026', cat: 'Women', teams: ['ENGW','SAW'], standing: '3-match T20I series' },
  'ranji-2026':   { name: 'Ranji Trophy, 2026-27', dates: 'Oct 15, 2026 – Feb 28, 2027', cat: 'Domestic', teams: ['MUM','DEL','KAR','TN'], table: 'ranji' },
  'ptl-2026':     { name: 'Premier T20 League, 2026', dates: 'Oct 10 – Nov 22, 2026', cat: 'League', teams: ['CHS','KOR','MMV','DLD','BLB','HYH'], table: 'ptl' }
};

/* inns: in batting order. o = overs as "overs.balls" */
const MATCHES = [
  { id: 'ban-wi', series: 'wi-ban-2026', desc: '1st Test', format: 'Test', state: 'live',
    inns: [{ t: 'WI', r: 289, w: 10, o: '92.3' }, { t: 'BAN', r: 238, w: 5, o: '83.1' }],
    status: 'Bangladesh trail by 51 runs', short: 'Day 3', session: 'Day 3: 1st Session',
    venue: 'Shere Bangla National Stadium, Mirpur, Dhaka', date: 'Mon, Oct 27 – Fri, Oct 31, 2026', time: '09:30 AM local',
    toss: 'West Indies won the toss and opted to bat', win: { BAN: 41, WI: 59 }, viewers: '18.6K' },
  { id: 'ind-aus', series: 'aus-ind-2026', desc: '2nd Test', format: 'Test', state: 'live',
    inns: [{ t: 'AUS', r: 451, w: 10, o: '120.0' }, { t: 'IND', r: 238, w: 5, o: '83.1' }],
    status: 'India trail by 213 runs', short: 'Day 2', session: 'Day 2: 3rd Session',
    venue: 'Eden Gardens, Kolkata', date: 'Tue, Oct 28 – Sat, Nov 1, 2026', time: '09:30 AM local',
    toss: 'Australia won the toss and opted to bat', win: { IND: 34, AUS: 66 }, viewers: '96.2K' },
  { id: 'eng-pak', series: 'pak-eng-2026', desc: '2nd ODI', format: 'ODI', state: 'live',
    inns: [{ t: 'PAK', r: 261, w: 8, o: '50.0' }, { t: 'ENG', r: 182, w: 7, o: '38.2' }],
    status: 'England need 80 runs in 70 balls', short: 'Live',
    venue: "Lord's, London", date: 'Wed, Oct 29, 2026', time: '10:30 AM local',
    toss: 'England won the toss and opted to bowl', win: { ENG: 28, PAK: 72 }, viewers: '41.7K' },
  { id: 'sa-nz', series: 'nz-sa-2026', desc: '3rd T20I', format: 'T20', state: 'live',
    inns: [{ t: 'NZ', r: 162, w: 7, o: '20.0' }, { t: 'SA', r: 160, w: 6, o: '18.3' }],
    status: 'South Africa need 3 runs in 9 balls', short: 'Live',
    venue: 'Kingsmead, Durban', date: 'Wed, Oct 29, 2026', time: '06:00 PM local',
    toss: 'South Africa won the toss and opted to bowl', win: { SA: 88, NZ: 12 }, viewers: '27.3K' },
  { id: 'sl-afg', series: 'afg-sl-2026', desc: '1st ODI', format: 'ODI', state: 'upcoming',
    teams: ['SL', 'AFG'], status: 'Match starts today at 10:00 AM', short: 'Today 10:00 AM',
    venue: 'R. Premadasa Stadium, Colombo', date: 'Wed, Oct 29, 2026', time: '10:00 AM local' },
  { id: 'nz-ban', series: 'ban-nz-2026', desc: '1st T20I', format: 'T20', state: 'upcoming',
    teams: ['NZ', 'BAN'], status: 'Match starts today at 2:00 PM', short: 'Today 2:00 PM',
    venue: 'Eden Park, Auckland', date: 'Wed, Oct 29, 2026', time: '02:00 PM local' },
  { id: 'engw-saw', series: 'saw-engw-2026', desc: '1st T20I', format: 'T20', state: 'live',
    inns: [{ t: 'SAW', r: 148, w: 5, o: '20.0' }, { t: 'ENGW', r: 122, w: 4, o: '16.0' }],
    status: 'England Women need 27 runs in 24 balls', short: 'Live',
    venue: 'The Oval, London', date: 'Wed, Oct 29, 2026', time: '02:30 PM local',
    toss: 'England Women won the toss and opted to bowl', win: { ENGW: 46, SAW: 54 }, viewers: '9.8K' },
  { id: 'mum-del', series: 'ranji-2026', desc: 'Elite Group A', format: 'Test', state: 'live',
    inns: [{ t: 'DEL', r: 268, w: 10, o: '88.4' }, { t: 'MUM', r: 275, w: 6, o: '90.0' }],
    status: 'Mumbai lead by 7 runs', short: 'Day 2', session: 'Day 2: Stumps',
    venue: 'Wankhede Stadium, Mumbai', date: 'Tue, Oct 28 – Fri, Oct 31, 2026', time: '09:30 AM local',
    toss: 'Delhi won the toss and opted to bat', win: { MUM: 57, DEL: 43 }, viewers: '5.1K' },
  { id: 'indw-ausw', series: 'ausw-indw-2026', desc: '3rd ODI', format: 'ODI', state: 'recent',
    inns: [{ t: 'INDW', r: 274, w: 6, o: '50.0' }, { t: 'AUSW', r: 247, w: 10, o: '48.2' }],
    status: 'India Women won by 27 runs', short: 'IND-W won',
    venue: 'Wankhede Stadium, Mumbai', date: 'Tue, Oct 28, 2026', time: '01:30 PM local',
    toss: 'India Women won the toss and opted to bat' },
  { id: 'chs-kor', series: 'ptl-2026', desc: 'Match 18', format: 'T20', state: 'recent',
    inns: [{ t: 'KOR', r: 171, w: 8, o: '20.0' }, { t: 'CHS', r: 172, w: 4, o: '18.4' }],
    status: 'Chennai Strikers won by 6 wkts', short: 'CHS won',
    venue: 'MA Chidambaram Stadium, Chennai', date: 'Tue, Oct 28, 2026', time: '07:30 PM local',
    toss: 'Chennai Strikers won the toss and opted to bowl' },
  { id: 'aus-pak', series: 'pak-aus-2026', desc: '3rd T20I', format: 'T20', state: 'recent',
    inns: [{ t: 'PAK', r: 158, w: 9, o: '20.0' }, { t: 'AUS', r: 159, w: 3, o: '16.2' }],
    status: 'Australia won by 7 wkts', short: 'AUS won',
    venue: 'Melbourne Cricket Ground', date: 'Tue, Oct 28, 2026', time: '07:10 PM local',
    toss: 'Australia won the toss and opted to bowl' },
  { id: 'mmv-dld', series: 'ptl-2026', desc: 'Match 19', format: 'T20', state: 'upcoming',
    teams: ['MMV', 'DLD'], status: 'Match starts tomorrow at 7:30 PM', short: 'Tomorrow 7:30 PM',
    venue: 'DY Patil Stadium, Navi Mumbai', date: 'Thu, Oct 30, 2026', time: '07:30 PM local' },
  { id: 'ind-eng', series: 'eng-ind-2026', desc: '1st ODI', format: 'ODI', state: 'upcoming',
    teams: ['IND', 'ENG'], status: 'Match starts Nov 2 at 1:30 PM', short: 'Nov 2, 1:30 PM',
    venue: 'Narendra Modi Stadium, Ahmedabad', date: 'Mon, Nov 2, 2026', time: '01:30 PM local' },
  { id: 'kar-tn', series: 'ranji-2026', desc: 'Elite Group A', format: 'Test', state: 'upcoming',
    teams: ['KAR', 'TN'], status: 'Match starts Nov 1 at 9:30 AM', short: 'Nov 1, 9:30 AM',
    venue: 'M. Chinnaswamy Stadium, Bengaluru', date: 'Sat, Nov 1 – Tue, Nov 4, 2026', time: '09:30 AM local' }
];
MATCHES.forEach(m => {
  m.teams = m.teams || [m.inns[0].t, m.inns[1].t];
  // display order: home side first for bilateral series
  const st = SERIES[m.series].teams;
  if (st.length === 2 && m.teams.every(t => st.includes(t))) m.teams = [...st];
  m.cat = SERIES[m.series].cat;
});
const matchById = id => MATCHES.find(m => m.id === id);
const scoreOf = (m, t) => (m.inns || []).find(i => i.t === t);

const NEWS = [
  { id: 'india-series-win', cat: 'Test', title: 'India eye series win after dominant performance', img: 'IMG/news/featured.jpg', time: '2 hours ago',
    summary: 'India are on the verge of a series win after a commanding performance in the 2nd Test against Australia.' },
  { id: 'rohit-comeback', cat: 'Interview', title: 'Rohit Sharma hints at Test comeback in 2026', img: 'IMG/news/n1.jpg', time: '2 hours ago',
    summary: 'The former captain says he is "still hungry" and has been working on his fitness with the domestic coaching staff.' },
  { id: 'india-women-odi', cat: 'Women', title: 'India Women eye series win in final ODI', img: 'IMG/news/n2.jpg', time: '4 hours ago',
    summary: 'A disciplined bowling effort set up a 27-run victory as India Women sealed the series 2-1 in Mumbai.' },
  { id: 'australia-squad', cat: 'Squads', title: 'Australia name strong squad for 2026 tour', img: 'IMG/news/n3.jpg', time: '6 hours ago',
    summary: 'Selectors have backed experience with a 16-member squad that includes two uncapped fast bowlers.' },
  { id: 'bangladesh-prepare', cat: 'Preview', title: 'Bangladesh prepare for West Indies Test', img: 'IMG/news/n4.jpg', time: '8 hours ago',
    summary: 'The hosts are expected to field three spinners on a dry Mirpur surface for the series opener.' },
  { id: 'pakistan-t20', cat: 'T20', title: 'Pakistan eye strong start in T20 series', img: 'IMG/news/n5.jpg', time: '10 hours ago',
    summary: 'A new-look top order will be tested against a pace attack that has dominated at home this season.' },
  { id: 'england-squad', cat: 'Squads', title: 'England announce squad for West Indies tour', img: 'IMG/news/n6.jpg', time: '12 hours ago',
    summary: 'Three uncapped players have been called up as England plan ahead for a busy 2027 schedule.' },
  { id: 'nz-momentum', cat: 'World Cup', title: 'New Zealand build momentum ahead of the World Cup', img: 'IMG/news/n7.jpg', time: '14 hours ago',
    summary: 'Back-to-back series wins have lifted the Black Caps up the rankings with the tournament months away.' },
  { id: 'sa-young-talent', cat: 'Domestic', title: "South Africa's young talent shines in domestic cricket", img: 'IMG/news/n8.jpg', time: '16 hours ago',
    summary: 'A 19-year-old all-rounder has lit up the domestic one-day cup with two centuries and 14 wickets.' }
];
const NEWS_BODY = [
  'The visitors arrived with plenty of questions to answer, but the opening sessions of the series have provided clear direction for both camps. Patience with the bat and discipline with the ball have been rewarded on surfaces that offered something for everyone.',
  'Speaking after the day\'s play, the team management praised the work ethic of the squad and highlighted the importance of building partnerships. "We spoke about controlling what we can control, and the players have bought into that," the head coach said.',
  'Analysts point to the middle overs as the phase that has decided recent results. Teams that rotated the strike and avoided clusters of wickets have consistently posted competitive totals, while the spinners have played a decisive role in the second half of each match.',
  'With the next fixture only days away, selectors are expected to retain the core of the XI, though conditions could prompt a change in the bowling combination. Fans can follow every ball live on MY99 EXCH with full scorecards, commentary and win-probability updates.'
];

const GAMES = [
  { id: 'cricket-clash', title: 'Cricket Clash', cat: 'Cricket', tag: 'HOT', img: 'IMG/games/cricket-clash.jpg', thumb: 'IMG/games/thumb-cricket.jpg', tagline: 'Real Cricket Action', players: '12.4K' },
  { id: 'stadium-kings', title: 'Stadium Kings', cat: 'Cricket', tag: 'NEW', img: 'IMG/games/stadium-kings.jpg', thumb: 'IMG/games/stadium-kings.jpg', tagline: 'Build Your Team', players: '8.1K' },
  { id: 'power-play', title: 'Power Play', cat: 'Cricket', tag: 'NEW', img: 'IMG/games/power-play.jpg', thumb: 'IMG/games/power-play.jpg', tagline: 'Fast. Fun. Rewarding.', players: '6.7K' },
  { id: 'super-over', title: 'Super Over', cat: 'Cricket', tag: 'HOT', img: 'IMG/games/super-over.jpg', thumb: 'IMG/games/super-over.jpg', tagline: 'One Over. Big Thrill.', players: '15.2K' },
  { id: 'roulette-royale', title: 'Roulette Royale', cat: 'Casino', tag: 'LIVE', img: 'IMG/games/thumb-roulette.jpg', thumb: 'IMG/games/thumb-roulette.jpg', tagline: 'Spin the royal wheel', players: '4.3K' },
  { id: 'teen-patti', title: 'Teen Patti', cat: 'Cards', tag: 'HOT', img: 'IMG/games/thumb-teenpatti.jpg', thumb: 'IMG/games/thumb-teenpatti.jpg', tagline: 'The classic three-card game', players: '22.9K' },
  { id: 'slots-bonanza', title: 'Slots Bonanza', cat: 'Slots', tag: 'NEW', img: 'IMG/games/thumb-slots.jpg', thumb: 'IMG/games/thumb-slots.jpg', tagline: 'Spin, match and win', players: '9.4K' },
  { id: 'live-casino', title: 'Live Casino', cat: 'Live Casino', tag: 'LIVE', img: 'IMG/ads/right-tall.jpg', thumb: 'IMG/ads/right-tall.jpg', tagline: 'Real dealers, real time', players: '11.0K' },
  { id: 'lucky-777', title: 'Lucky 777', cat: 'Slots', tag: 'HOT', img: 'IMG/ads/right-top.jpg', thumb: 'IMG/ads/right-top.jpg', tagline: 'Triple sevens jackpot', players: '7.2K' },
  { id: 'andar-bahar', title: 'Andar Bahar', cat: 'Cards', tag: 'LIVE', img: 'IMG/games/thumb-teenpatti.jpg', thumb: 'IMG/games/thumb-teenpatti.jpg', tagline: 'Pick a side, beat the dealer', players: '13.5K' },
  { id: 'lightning-roulette', title: 'Lightning Roulette', cat: 'Live Casino', tag: 'LIVE', img: 'IMG/games/thumb-roulette.jpg', thumb: 'IMG/games/thumb-roulette.jpg', tagline: 'Multipliers on every spin', players: '5.9K' },
  { id: 'fruit-frenzy', title: 'Fruit Frenzy', cat: 'Slots', tag: 'NEW', img: 'IMG/games/thumb-slots.jpg', thumb: 'IMG/games/thumb-slots.jpg', tagline: 'Juicy wins on every reel', players: '3.8K' }
];
const GAME_CATS = ['All', 'Cricket', 'Casino', 'Live Casino', 'Slots', 'Cards'];

/* Promotion slides. Image-only ads use `img`; text overlays use title/sub on top of game art */
const ADS = {
  tall: [
    { img: 'IMG/ads/left-tall.jpg', alt: 'MY99 EXCH – Big wins, bigger dreams. Play now', href: 'games.html' },
    { img: 'IMG/ads/right-tall.jpg', alt: 'MY99 EXCH – Play live casino and win big', href: 'game-detail.html?id=live-casino' },
    { img: 'IMG/games/super-over.jpg', title: 'Super Over', sub: 'One over. Big thrill.', href: 'game-detail.html?id=super-over' }
  ],
  tall2: [
    { img: 'IMG/ads/right-tall.jpg', alt: 'MY99 EXCH – Play live casino and win big', href: 'game-detail.html?id=live-casino' },
    { img: 'IMG/ads/left-tall.jpg', alt: 'MY99 EXCH – Big wins, bigger dreams. Play now', href: 'games.html' },
    { img: 'IMG/games/stadium-kings.jpg', title: 'Stadium Kings', sub: 'Build your dream XI', href: 'game-detail.html?id=stadium-kings' }
  ],
  box: [
    { img: 'IMG/ads/right-top.jpg', alt: 'MY99 EXCH – Casino, slots and live games. Play now', href: 'games.html?cat=Casino' },
    { img: 'IMG/games/power-play.jpg', title: 'Power Play', sub: 'Fast. Fun. Rewarding.', href: 'game-detail.html?id=power-play' },
    { img: 'IMG/games/cricket-clash.jpg', title: 'Cricket Clash', sub: 'Real cricket action', href: 'game-detail.html?id=cricket-clash' }
  ],
  strip: [
    { img: 'IMG/ads/strip.jpg', alt: 'Exciting games. Bigger rewards. Play now', href: 'games.html', pos: 'object-left' },
    { img: 'IMG/games/super-over.jpg', title: 'Super Over is live', sub: 'One over. Big thrill. Claim your welcome bonus.', href: 'game-detail.html?id=super-over' },
    { img: 'IMG/ads/right-top.jpg', title: 'Casino • Slots • Live Games', sub: 'Hundreds of games, one account.', href: 'games.html' }
  ],
  card: { img: 'IMG/ads/card-promo.jpg', alt: 'MY99 EXCH – Play cricket games. Play now', href: 'games.html?cat=Cricket' }
};

const TABLES = {
  ptl: [['CHS', 8, 6, 2, 12, '+0.842'], ['KOR', 8, 5, 3, 10, '+0.411'], ['MMV', 7, 4, 3, 8, '+0.126'], ['HYH', 8, 4, 4, 8, '-0.097'], ['BLB', 8, 3, 5, 6, '-0.388'], ['DLD', 7, 1, 6, 2, '-0.902']],
  ranji: [['MUM', 3, 2, 0, 16, '1.412'], ['KAR', 3, 1, 0, 13, '1.205'], ['DEL', 3, 1, 1, 9, '0.998'], ['TN', 3, 0, 2, 4, '0.811']]
};

const RANKINGS = {
  Test: [['AUS', 124], ['IND', 118], ['ENG', 112], ['SA', 106], ['NZ', 96], ['SL', 88], ['PAK', 82], ['WI', 76], ['BAN', 64], ['AFG', 48]],
  ODI: [['IND', 122], ['AUS', 116], ['SA', 110], ['PAK', 107], ['NZ', 104], ['SL', 98], ['ENG', 96], ['AFG', 90], ['BAN', 79], ['WI', 72]],
  T20: [['IND', 271], ['AUS', 267], ['ENG', 259], ['NZ', 254], ['SA', 251], ['WI', 248], ['PAK', 241], ['SL', 232], ['AFG', 229], ['BAN', 221]]
};
