// 27 Nov 7pm: INSTAGRAM CREATOR MARKETPLACE: HOW BRANDS FIND CREATORS (INDIA). Paper style.
// Facts (opened 26 Nov 2026): Meta Newsroom (21 Feb 2024): "a tool for brands and creators to connect and
// collaborate"; tested in the US from 2022; "expanding the creator marketplace to eight new markets" incl. India;
// brands "search for creators, filtering for creator and audience attributes"; brand messages go to "a dedicated
// Partnership Messages folder"; creators "create a portfolio". Business Today (22 Feb 2024) confirms India.
// Instagram Help "Get started as a creator on Meta Creator Marketplace": for business and creator accounts; join via
// Professional dashboard > Branded content > Join creator marketplace; pick Preferred brand partners, those brands
// "will see you below Interested creators"; brands can "access insights like your average reach and number of
// followers"; "always disclose your branded content with the paid partnership label". "About Meta Creator Marketing
// Hub": for "branded content and partnership ads". Fitness creator = generic example. Loop line is nser's.
// No real person, no logos, no real brand.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, rankCard, strike, magnifier, gift } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a brand shop: awning + sign */
function shop(x, y, s, name = 'BRAND', col = P.royal) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-240, -260, 480, 440, 16), '#E8D3A8'); for (let k = 0; k < 6; k++) cut(P_rr(-240 + k * 80, -320, 80, 80, 8), k % 2 ? col : P.edge, { shadow: 0.3, edge: 2 });
  K.label(name, 0, -180, 58, P.ink); cut(P_rr(-190, -100, 170, 190, 10), P.sea, { shadow: 0, edge: 3 }); cut(P_rr(30, -100, 150, 280, 10), P.sepia, { shadow: 0, edge: 3 }); ctx.restore(); }
/** a search bar with a magnifier */
function searchBar(x, y, s, text = '', p = 1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-400, -70, 800, 140, 70), '#FFFBF0'); ctx.strokeStyle = P.ink; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(-320, -8, 30, 0, TAU); ctx.stroke(); line([[-298, 14], [-270, 42]], P.ink, 10);
  const txt = text.slice(0, Math.round(text.length * clamp(p))); ctx.font = '700 54px Caladea'; ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(txt, -240, 4); ctx.restore(); }
/** a filter chip */
function chip(text, x, y, s, on = false) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.font = '700 46px Caladea'; const w = ctx.measureText(text).width + 70;
  cut(P_rr(-w / 2, -45, w, 90, 45), on ? P.gold : '#FFFBF0', { shadow: 0.5, edge: 4 }); K.label(text, 0, 4, 46, P.ink); ctx.restore(); }
/** a small creator avatar card */
function creatorCard(x, y, s, col = P.wine, glow = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-110, -140, 220, 280, 18), glow > 0 ? lerp(0, 1, glow) > 0.5 ? '#FFF3C9' : '#FFFBF0' : '#FFFBF0');
  circle(0, -50, 44, P.skin); cut(() => { ctx.beginPath(); ctx.ellipse(0, 70, 80, 60, 0, Math.PI, 0); ctx.closePath(); }, col, { shadow: 0.2, edge: 2 }); ctx.restore(); }
/** a paper folder with label */
function folder(x, y, s, text, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-300, -180], [-120, -180], [-80, -130], [300, -130], [300, 200], [-300, 200]]), col); cut(P_rr(-300, -90, 600, 290, 14), '#E0B45A', { shadow: 0.4, edge: 3 });
  K.label(text, 0, 60, 52, P.ink); ctx.restore(); }
/** an envelope */
function envelope(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-160, -100, 320, 200, 12), '#FFFBF0'); line([[-150, -90], [0, 20], [150, -90]], P.stoneDark, 8); ctx.restore(); }
/** paper globe with n pins */
function globe(x, y, s, pinP = 1, t = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_circ(0, 0, 330), P.sea); cut(() => { ctx.beginPath(); ctx.ellipse(-120, -60, 140, 110, 0.3, 0, TAU); }, P.forest, { shadow: 0.2, edge: 3 }); cut(() => { ctx.beginPath(); ctx.ellipse(130, 40, 120, 150, -0.2, 0, TAU); }, P.forest, { shadow: 0.2, edge: 3 });
  ctx.restore(); }
/** a stat tile: label + bar (no fake number) */
function statTile(label, x, y, s, fill = 0.7, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-380, -110, 760, 220, 20), '#FFFBF0'); K.label(label, -170, -40, 50, P.ink); cut(P_rr(-340, 20, 680, 50, 25), P.stone, { shadow: 0, edge: 2 }); if (fill > 0) cut(P_rr(-340, 20, 680 * fill, 50, 25), col, { shadow: 0, edge: 2 }); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · how do brands find new creators? a marketplace inside Instagram
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'a BRAND shop with a magnifier sweeping over a crowd of creator cards: big ?', draw(lt, d, t) {
      room(1);
      shop(300, 700, 0.9 * R2(seg(lt, 0.02, 0.2)));
      for (let k = 0; k < 6; k++) creatorCard(640 + (k % 3) * 150, 620 + Math.floor(k / 3) * 300, 0.55 * R2(seg(lt, d * (0.1 + k * 0.05), d * (0.2 + k * 0.05))), [P.wine, P.royal, P.forest][k % 3]);
      magnifier(lerp(620, 960, 0.5 + 0.5 * Math.sin(t * 2.2)), 1200, 0.7 * R2(seg(lt, d * 0.3, d * 0.45)));
      bigMark('?', 300, 1300, R2(seg(lt, d * 0.5, d * 0.7)), 0.05 * Math.sin(t * 3), P.gold, 320);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a phone opens like a market: stalls inside the screen, INSIDE INSTAGRAM ribbon', draw(lt, d, t) {
      dayPage(2);
      phoneBig(540, 820, 1.1 * R2(seg(lt, 0.02, 0.2)), 0.02, () => { shop(0, -40, 0.6 * R2(seg(lt, d * 0.2, d * 0.4)), 'MARKET', P.crimson); creatorCard(-90, 260, 0.5 * R2(seg(lt, d * 0.35, d * 0.5)), P.wine); creatorCard(90, 260, 0.5 * R2(seg(lt, d * 0.4, d * 0.55)), P.royal); });
      K.ribbon('INSIDE INSTAGRAM', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.4, 'zip', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.6, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'pop', { gain: 0.5 }); cue(mid + d0 * 0.5 * 0.65, 'slam', { gain: 0.8 }); }

  // 1 · simply put: where brands and creators meet, for branded content and partnership ads
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, brand shop left, creator right, dashed route meets in the middle with a gold seal: MEET', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      shop(260, 900, 0.7 * R2(seg(lt, 0.05, 0.2)));
      person({ x: 830, y: 1250, h: 560, arm: 60, dir: -1, top: P.wine, glow: 0.6 * R2(seg(lt, 0.1, 0.3)) });
      K.dashedRoute([[420, 1000], [540, 1060], [700, 1000]], seg(lt, d * 0.25, d * 0.55));
      K.ribbon('CREATOR MARKETPLACE', 540, 1480, R2(seg(lt, d * 0.55, d * 0.85)), 62);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'two cards: BRANDED CONTENT (post with gold tag) + PARTNERSHIP ADS (post with AD badge)', draw(lt, d, t) {
      nightPage(4);
      postCard(300, 800, 0.9 * R2(seg(lt, 0.02, 0.2)), -0.05); K.slip('BRANDED CONTENT', 300, 1180, R2(seg(lt, d * 0.15, d * 0.35)), -0.03, 50);
      postCard(780, 800, 0.9 * R2(seg(lt, d * 0.3, d * 0.45)), 0.05);
      const a = R2(seg(lt, d * 0.4, d * 0.55)); if (a > 0) { ctx.save(); ctx.translate(880, 560); ctx.scale(a, a); cut(P_rr(-80, -45, 160, 90, 14), P.gold); K.label('AD', 0, 4, 52, P.ink); ctx.restore(); }
      K.slip('PARTNERSHIP ADS', 780, 1180, R2(seg(lt, d * 0.45, d * 0.65)), 0.03, 50);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.4, 'zip', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.7, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.5 }); cue(mid + d1 * 0.5 * 0.5, 'pop', { gain: 0.6 }); }

  // 2 · tested in the US in 2022; Feb 2024: 8 new markets incl. India
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.45;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'gold 2022 slip, globe with one TEST pin', draw(lt, d, t) {
      dayPage(5);
      K.slip('2022 · US TEST', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      globe(540, 900, 1.0 * R2(seg(lt, 0.05, 0.25)));
      K.label('TEST', 360, 790, 50 * R2(seg(lt, d * 0.4, d * 0.55)), P.edge);
      const p = R2(seg(lt, d * 0.3, d * 0.45)); if (p > 0) { ctx.save(); ctx.translate(380, 760); ctx.scale(p, p); cut(() => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-40, -50, -46, -80, -46, -96); ctx.arc(0, -96, 46, Math.PI, 0); ctx.bezierCurveTo(46, -80, 40, -50, 0, 0); ctx.closePath(); }, P.crimson, { shadow: 0.6, edge: 4 }); ctx.restore(); }
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'FEB 2024 slip, 8 gold pins pop on the globe with counter, the INDIA pin is crimson + big: INDIA ribbon', draw(lt, d, t) {
      nightPage(6);
      K.slip('FEB 2024', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      globe(540, 860, 1.0 * R2(seg(lt, 0.02, 0.15)));
      const pts = [[300, 700], [420, 620], [700, 640], [780, 760], [620, 980], [380, 1000], [760, 1040]];
      pts.forEach(([x, y], k) => { const s = R2(seg(lt, d * (0.15 + k * 0.05), d * (0.25 + k * 0.05))); if (s > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s * 0.6, s * 0.6); cut(P_circ(0, 0, 40), P.gold, { shadow: 0.5, edge: 4 }); ctx.restore(); } });
      const ip = R2(seg(lt, d * 0.5, d * 0.65)); if (ip > 0) { ctx.save(); ctx.translate(600, 840); ctx.scale(ip, ip); cut(P_circ(0, 0, 56), P.crimson, { shadow: 0.6, edge: 5 }); ctx.restore(); }
      const n = Math.round(8 * clamp(seg(lt, d * 0.15, d * 0.6)));
      bigMark(String(n), 540, 1330, R2(seg(lt, d * 0.15, d * 0.3)), 0.05, P.gold, 200); K.slip('NEW MARKETS', 540, 1480, R2(seg(lt, d * 0.3, d * 0.45)), 0.03, 56);
      K.ribbon('INCL. INDIA', 540, 1660, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d2 * 0.45 * 0.35, 'pop', { gain: 0.6 }); cue(mid, 'whoosh'); for (let k = 0; k < 7; k += 2) cue(mid + d2 * 0.55 * (0.17 + k * 0.05), 'pop', { gain: 0.3 }); cue(mid + d2 * 0.55 * 0.55, 'thud', { gain: 0.7 }); cue(mid + d2 * 0.55 * 0.7, 'slam', { gain: 0.8 }); }

  // 3 · brands search for creators with creator + audience filters
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'a laptop-wide search bar types "creators", two filter chips CREATOR / AUDIENCE turn gold, results grid filters to 3 cards', draw(lt, d, t) {
      dayPage(7);
      searchBar(540, 320, 1.0 * R2(seg(lt, 0.02, 0.2)), 'creators...', seg(lt, d * 0.1, d * 0.35));
      chip('CREATOR', 330, 500, R2(seg(lt, d * 0.3, d * 0.42)), seg(lt, d * 0.4, d * 0.45) > 0);
      chip('AUDIENCE', 730, 500, R2(seg(lt, d * 0.38, d * 0.5)), seg(lt, d * 0.5, d * 0.55) > 0);
      const keep = seg(lt, d * 0.6, d * 0.75);
      for (let k = 0; k < 9; k++) { const kept = k % 4 === 0; const s = R2(seg(lt, d * (0.1 + k * 0.02), d * (0.2 + k * 0.02))) * (kept ? 1 : 1 - keep); creatorCard(230 + (k % 3) * 310, 800 + Math.floor(k / 3) * 330, 0.85 * s, [P.wine, P.royal, P.forest][k % 3]); }
      K.ribbon('FILTERED', 540, 1720, R2(seg(lt, d * 0.7, d * 0.95)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.5, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.65, 'zip', { gain: 0.6 }); cue(st + len(3) * 0.75, 'slam', { gain: 0.7 }); }

  // 4 · you: fitness creator joined + picked favourite brands
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you with a paper dumbbell, FITNESS CREATOR slip, JOINED stamp', draw(lt, d, t) {
      room(8);
      person({ x: 360, y: 1650, h: 680, arm: 110 + 20 * Math.sin(t * 5), top: M.tee, glow: 0.7 });
      const b = R2(seg(lt, 0.1, 0.3)); if (b > 0) { ctx.save(); ctx.translate(720, 900 + 30 * Math.sin(t * 5)); ctx.scale(b, b); cut(P_rr(-160, -14, 320, 28, 10), P.stoneDark); cut(P_rr(-200, -70, 60, 140, 12), P.ink); cut(P_rr(140, -70, 60, 140, 12), P.ink); ctx.restore(); }
      K.slip('FITNESS CREATOR', 540, 320, R2(seg(lt, 0.15, 0.35)), -0.03, 64);
      const s = seg(lt, d * 0.55, d * 0.75), sc = s <= 0 ? 0 : lerp(2.2, 1, eo(s)); if (sc) { ctx.save(); ctx.translate(800, 1320); ctx.rotate(-0.1); ctx.scale(sc, sc); cut(P_rr(-200, -65, 400, 130, 14), P.crimson); K.label('JOINED', 0, 6, 70, P.edge); ctx.restore(); }
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'PREFERRED BRANDS list: three shop cards, two get gold ticks', draw(lt, d, t) {
      dayPage(9);
      K.slip('PREFERRED BRANDS', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      [[P.royal, 'SHOES'], [P.forest, 'PROTEIN'], [P.crimson, 'APPAREL']].forEach(([c, nm], k) => { shop(220 + k * 320, 820, 0.55 * R2(seg(lt, 0.05 + k * 0.08, 0.2 + k * 0.08)), '', c); K.slip(nm, 220 + k * 320, 1060, R2(seg(lt, 0.1 + k * 0.08, 0.3 + k * 0.08)), 0.02, 44);
        if (k !== 1) bigMark('✓', 220 + k * 320, 1280, R2(seg(lt, d * (0.4 + k * 0.1), d * (0.5 + k * 0.1))), 0.1, P.gold, 200); });
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.6, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); [0.45, 0.65].forEach((a) => cue(mid + d4 * 0.5 * a, 'sparkle', { gain: 0.5 })); }

  // 5 · that brand searches → you show under Interested creators
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.14, note: 'brand laptop screen: INTERESTED CREATORS heading, your card slides in first with a gold glow, crimson pin', draw(lt, d, t) {
      nightPage(10);
      shop(540, 520, 0.6 * R2(seg(lt, 0.02, 0.2)), 'SHOES', P.royal);
      const s = R2(seg(lt, d * 0.15, d * 0.3)); if (s > 0) { ctx.save(); ctx.translate(540, 1150); ctx.scale(s, s); cut(P_rr(-440, -280, 880, 560, 24), '#FFFBF0'); K.label('INTERESTED CREATORS', 0, -210, 50, P.ink); ctx.restore(); }
      const f = eo(seg(lt, d * 0.35, d * 0.6)); creatorCard(lerp(-200, 280, f), 1210, 0.9, P.crimson, 1);
      creatorCard(560, 1210, 0.9 * R2(seg(lt, d * 0.25, d * 0.4)), P.stone); creatorCard(800, 1210, 0.9 * R2(seg(lt, d * 0.28, d * 0.43)), P.stone);
      K.slip('YOU', 280, 1500, R2(seg(lt, d * 0.6, d * 0.75)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(5) * 0.45, 'zip', { gain: 0.6 }); cue(st + len(5) * 0.62, 'sparkle', { gain: 0.7 }); cue(st + len(5) * 0.68, 'slam', { gain: 0.6 }); }

  // 6 · game changer: message not lost in requests → Partnership messages folder
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, a messy REQUESTS pile of grey envelopes, one brand envelope gets lost: struck', draw(lt, d, t) {
      room(11);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      for (let k = 0; k < 7; k++) envelope(380 + (k % 3) * 160 + 20 * Math.sin(k * 2), 760 + Math.floor(k / 3) * 90, 0.8 * R2(seg(lt, d * (0.05 + k * 0.03), d * (0.15 + k * 0.03))), (k % 3 - 1) * 0.2);
      K.slip('REQUESTS', 540, 1150, R2(seg(lt, d * 0.3, d * 0.45)), 0.03, 64);
      bigMark('✕', 820, 640, R2(seg(lt, d * 0.55, d * 0.7)), 0.1, P.crimson, 220);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a gold envelope flies into a big PARTNERSHIP folder at the top: ribbon', draw(lt, d, t) {
      dayPage(12);
      folder(540, 760, 1.2 * R2(seg(lt, 0.02, 0.2)), 'PARTNERSHIP');
      const f = eo(seg(lt, d * 0.25, d * 0.55)); if (f < 1) envelope(lerp(900, 540, f), lerp(1400, 780, f), lerp(1, 0.6, f), lerp(0.3, 0, f));
      K.slip('MESSAGES', 540, 1100, R2(seg(lt, d * 0.5, d * 0.65)), 0.03, 70);
      K.ribbon('NOT LOST', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.1, 0.2].forEach((a) => cue(st + d6 * 0.45 * a, 'pop', { gain: 0.3 })); cue(st + d6 * 0.45 * 0.6, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.3, 'zip', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.6, 'thud', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.7, 'slam', { gain: 0.8 }); }

  // 7 · craziest: brand sees your average reach + followers → your numbers are your pitch
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, magnifier over two stat tiles: AVG REACH + FOLLOWERS bars fill', draw(lt, d, t) {
      nightPage(13);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      statTile('AVG REACH', 540, 640, R2(seg(lt, 0.05, 0.2)), 0.75 * eo(seg(lt, d * 0.2, d * 0.5)));
      statTile('FOLLOWERS', 540, 920, R2(seg(lt, 0.12, 0.27)), 0.55 * eo(seg(lt, d * 0.3, d * 0.6)), P.royal);
      magnifier(lerp(380, 760, 0.5 + 0.5 * Math.sin(t * 2.2)), 1300, 0.75 * R2(seg(lt, d * 0.35, d * 0.5)));
      K.slip('BRANDS SEE THIS', 540, 1600, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 64);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'the stat tiles fold into a pitch letter handed to the brand shop: NUMBERS = PITCH ribbon', draw(lt, d, t) {
      dayPage(14);
      shop(780, 700, 0.7 * R2(seg(lt, 0.02, 0.2)), 'BRAND', P.royal);
      const f = eo(seg(lt, d * 0.15, d * 0.5)); statTile('AVG REACH', 360, lerp(1000, 900, f), 0.55 * (1 - f * 0.4) * R2(seg(lt, 0.02, 0.15)), 0.75); statTile('FOLLOWERS', 360, lerp(1160, 1000, f), 0.55 * (1 - f * 0.4) * R2(seg(lt, 0.05, 0.18)), 0.55, P.royal);
      envelope(lerp(360, 760, eo(seg(lt, d * 0.45, d * 0.7))), lerp(1200, 1000, eo(seg(lt, d * 0.45, d * 0.7))), 0.9 * R2(seg(lt, d * 0.35, d * 0.5)), 0.05);
      K.ribbon('NUMBERS = PITCH', 540, 1520, R2(seg(lt, d * 0.6, d * 0.9)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.35, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d7 * 0.55 * 0.55, 'zip', { gain: 0.6 }); cue(mid + d7 * 0.55 * 0.7, 'slam', { gain: 0.8 }); }

  // 8 · what to do: professional account → Professional dashboard → Branded content → join
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.45;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: '1 PRO ACCOUNT card, a phone profile flips from PERSONAL to PROFESSIONAL', draw(lt, d, t) {
      dayPage(15);
      rankCard(1, 'PRO ACCOUNT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 620);
      const fl = seg(lt, d * 0.35, d * 0.6), sx = Math.abs(Math.cos(fl * Math.PI));
      phoneBig(540, 960, 1.0 * R2(seg(lt, 0.05, 0.2)), 0.02, () => { circle(0, -200, 80, P.stone); ctx.save(); ctx.scale(sx || 0.01, 1); chip(fl < 0.5 ? 'PERSONAL' : 'PROFESSIONAL', 0, 0, 0.75, fl >= 0.5); ctx.restore(); });
      K.slip('STEP 1', 540, 1500, R2(seg(lt, d * 0.6, d * 0.8)), 0.03, 64);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: '2 JOIN card, a dashed tap path: DASHBOARD → BRANDED CONTENT → JOIN chips, last one gold', draw(lt, d, t) {
      room(16);
      rankCard(2, 'JOIN', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 480);
      chip('DASHBOARD', 540, 560, R2(seg(lt, 0.1, 0.25)));
      K.dashedRoute([[540, 620], [540, 760]], seg(lt, d * 0.2, d * 0.35)); chip('BRANDED CONTENT', 540, 820, R2(seg(lt, d * 0.3, d * 0.42)));
      K.dashedRoute([[540, 880], [540, 1020]], seg(lt, d * 0.42, d * 0.55)); chip('JOIN MARKETPLACE', 540, 1080, R2(seg(lt, d * 0.5, d * 0.62)), seg(lt, d * 0.65, d * 0.7) > 0);
      bigMark('✓', 860, 1250, R2(seg(lt, d * 0.65, d * 0.8)), 0.1, P.gold, 200);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d8 * 0.45 * 0.48, 'zip', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); [0.15, 0.36, 0.56].forEach((a) => cue(mid + d8 * 0.55 * a, 'pop', { gain: 0.5 })); cue(mid + d8 * 0.55 * 0.7, 'sparkle', { gain: 0.6 }); }

  // 9 · set up your portfolio + paid partnership label on every brand deal
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.5;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: '3 PORTFOLIO card, a 2x2 grid of your posts pops in', draw(lt, d, t) {
      dayPage(17);
      rankCard(3, 'PORTFOLIO', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 560);
      for (let k = 0; k < 4; k++) postCard(330 + (k % 2) * 420, 760 + Math.floor(k / 2) * 520, 0.75 * R2(seg(lt, d * (0.15 + k * 0.08), d * (0.28 + k * 0.08))), (k % 2 ? 0.04 : -0.04));
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.16, note: '4 LABEL card: a brand post gets a "Paid partnership" strip stamped on top: EVERY DEAL ribbon', draw(lt, d, t) {
      nightPage(18);
      rankCard(4, 'LABEL IT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 520);
      postCard(540, 900, 1.3 * R2(seg(lt, 0.05, 0.2)), 0.02);
      const s = seg(lt, d * 0.3, d * 0.5), sc = s <= 0 ? 0 : lerp(2, 1, eo(s)); if (sc) { ctx.save(); ctx.translate(540, 560); ctx.rotate(-0.03); ctx.scale(sc, sc); cut(P_rr(-300, -50, 600, 100, 12), '#FFFBF0'); K.label('Paid partnership', 0, 4, 52, P.royal); ctx.restore(); }
      K.ribbon('EVERY DEAL', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.2, 0.28, 0.36, 0.44].forEach((a) => cue(st + d9 * 0.5 * a, 'pop', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d9 * 0.5 * 0.4, 'thud', { gain: 0.7 }); cue(mid + d9 * 0.5 * 0.7, 'slam', { gain: 0.7 }); }

  // 10 · loop: don't chase brands, let them come to you (back to beat-0 room: the brand shop now walks the envelope to you)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: brand shop on the left, its envelope flies to you on the right, you glow: LET THEM COME ribbon', draw(lt, d, t) {
      room(1);
      shop(280, 700, 0.8 * R2(seg(lt, 0.02, 0.2)));
      person({ x: 800, y: 1450, h: 620, arm: 100, dir: -1, top: P.crimson, glow: eo(seg(lt, d * 0.5, d * 0.8)) });
      const f = eo(seg(lt, d * 0.15, d * 0.5)); envelope(lerp(300, 720, f), lerp(900, 920, f) - 120 * Math.sin(f * Math.PI), 0.8 * R2(seg(lt, 0.1, 0.2)), 0.1 * Math.sin(t * 3));
      K.ribbon('LET THEM COME', 540, 1650, R2(seg(lt, d * 0.5, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.3, 'zip', { gain: 0.6 }); cue(st + len(10) * 0.55, 'sparkle', { gain: 0.5 }); cue(st + len(10) * 0.65, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend tired of DMing brands
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a pile of unanswered envelopes, handle slip', draw(lt, d, t) {
      dayPage(19); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      for (let k = 0; k < 4; k++) envelope(240 + (k % 2) * 60, 1300 - k * 60, 0.6 * R2(seg(lt, d * (0.3 + k * 0.05), d * (0.4 + k * 0.05))), (k % 2 - 0.5) * 0.3);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.forest, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
