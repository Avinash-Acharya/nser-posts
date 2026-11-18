// 19 Nov 7pm: GST BASICS FOR INDIAN CREATORS: WHEN YOU NEED TO REGISTER. Paper style.
// Facts: CBIC/GST Council flyer "Registration under GST Law": services threshold ₹20 lakh (₹10 lakh in Manipur, Mizoram,
// Nagaland, Tripura), all-India basis, PAN based; inter-state service suppliers below the limit exempt (Notif. 10/2017-IT).
// Kanakkupillai (10 Nov 2026): everything under your PAN adds up incl. AdSense/exports; most creator services 18% GST once
// registered; exports like AdSense can be zero-rated with an LUT filed before the first export invoice of the year.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet, note,
  laptop, pin, indiaMap, geo, CITY, gift } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper ledger page with n rows filled (gold amounts as bars, no fake figures) */
function ledger(x, y, s, rows, title = 'INCOME') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-260, -320, 520, 640, 16), '#FFFBF0'); K.label(title, 0, -255, 56, P.crimson); line([[-210, -210], [210, -210]], P.sepia, 5);
  for (let k = 0; k < 5; k++) { const yy = -140 + k * 95; line([[-210, yy + 35], [210, yy + 35]], 'rgba(62,44,30,0.18)', 3);
    if (k < rows) { rr(-210, yy - 18, 200, 30, 8); ctx.fillStyle = 'rgba(62,44,30,0.35)'; ctx.fill(); rr(60, yy - 18, 150, 30, 8); ctx.fillStyle = P.gold; ctx.fill(); } }
  ctx.restore(); }
/** a jar that fills to level (0..1) with a crimson limit line at lim */
function jar(x, y, s, level, lim = 0.8, txt = '₹20 LAKH') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-180, -330, 360, 560, 40), 'rgba(255,251,240,0.9)');
  const h = 500 * clamp(level); if (h > 2) cut(P_rr(-160, 210 - h, 320, h, 26), level >= lim ? P.crimson : P.gold, { shadow: 0, edge: 0 });
  const ly = 210 - 500 * lim; ctx.save(); ctx.setLineDash([22, 14]); line([[-220, ly], [220, ly]], P.crimson, 8); ctx.restore();
  K.label(txt, 0, ly - 50, 52, P.crimson); ctx.restore(); }
/** a PAN-style ID card (generic, no real numbers) */
function idCard(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-280, -170, 560, 340, 22), '#F3E3B8'); K.label('PAN', -150, -110, 56, P.royal);
  rr(-240, -60, 150, 180, 12); ctx.fillStyle = P.stone; ctx.fill(); circle(-165, 0, 40, P.stoneDark);
  for (let k = 0; k < 3; k++) { rr(-50, -40 + k * 60, 260 - k * 50, 26, 8); ctx.fillStyle = 'rgba(62,44,30,0.3)'; ctx.fill(); } ctx.restore(); }
/** a paper globe */
function globe(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_circ(0, 0, 120), P.sea);
  ctx.save(); ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.clip(); ell(-40, -30, 50, 35, P.forest, 0.3); ell(50, 40, 45, 60, P.forest); ctx.restore();
  ctx.strokeStyle = 'rgba(62,44,30,0.35)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.ellipse(0, 0, 50, 120, 0, 0, TAU); ctx.stroke(); line([[-120, 0], [120, 0]], 'rgba(62,44,30,0.35)', 4); ctx.restore(); }
/** a document with a stamp */
function doc(x, y, s, word, stamp = 0, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -260, 400, 520, 12), '#FFFBF0'); K.label(word, 0, -190, 56, P.ink);
  for (let k = 0; k < 5; k++) line([[-150, -100 + k * 60], [150 - (k % 2) * 60, -100 + k * 60]], 'rgba(62,44,30,0.25)', 10);
  if (stamp > 0) { ctx.save(); ctx.translate(70, 170); ctx.rotate(-0.25); ctx.scale(stamp, stamp); ctx.strokeStyle = P.crimson; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 70, 0, TAU); ctx.stroke(); K.label('OK', 0, 0, 52, P.crimson); ctx.restore(); }
  ctx.restore(); }
/** a stack of rupee notes */
function cash(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let k = 2; k >= 0; k--) { cut(P_rr(-170 + k * 10, -90 - k * 14, 340, 180, 14), k ? M.cashDark : M.cash, { shadow: 0.5, edge: 4 }); }
  circle(0, -0, 48, 'rgba(255,251,240,0.5)'); K.label('₹', 0, 0, 70, P.ink); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · brand deal money coming in? then the GST question comes too
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator with phone, cash stack flies in labelled BRAND DEAL, crimson GST? mark drops behind', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal });
      const f = eo(seg(lt, 0.05, 0.35)); cash(lerp(1000, 650, f), lerp(500, 800, f), 1.0 * R2(seg(lt, 0.05, 0.25)), -0.1);
      K.slip('BRAND DEAL', 650, 1050, R2(seg(lt, d * 0.2, d * 0.4)), 0.03, 66);
      bigMark('GST?', 600, 450, R2(seg(lt, d * 0.5, d * 0.7)), Math.sin(t * 3) * 0.06, P.crimson, 220);
      K.ribbon('NOW WHAT?', 540, 1780, R2(seg(lt, d * 0.55, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'plop', { gain: 0.5 }); cue(st + len(0) * 0.55, 'slam', { gain: 0.6 }); }

  // 1 · simply put: register when yearly turnover > 20 lakh (services)
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.4;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'GST REGISTRATION document, SERVICES slip, creator points at it', draw(lt, d, t) {
      dayPage(2, false);
      doc(560, 860, 1.2 * R2(seg(lt, 0.02, 0.3)), 'GST', 0, 0.03);
      K.slip('REGISTRATION', 560, 330, R2(seg(lt, 0.15, 0.35)), -0.03, 72);
      K.slip('FOR SERVICES', 560, 1350, R2(seg(lt, d * 0.4, d * 0.7)), 0.03, 66);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.14, note: 'jar fills with gold up to a crimson dashed ₹20 LAKH line then turns crimson, PER YEAR slip', draw(lt, d, t) {
      dayPage(3);
      jar(540, 980, 1.3, lerp(0.05, 0.85, eio(seg(lt, 0.1, 0.75))), 0.8);
      K.ribbon('ABOVE ₹20 LAKH', 540, 250, R2(seg(lt, d * 0.4, d * 0.7)), 90);
      K.slip('A YEAR', 540, 1650, R2(seg(lt, d * 0.55, d * 0.8)), 0.03, 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(1) * 0.6 * 0.3, 'bubbles', { dur: 1.2, gain: 0.3 }); cue(mid + len(1) * 0.6 * 0.75, 'thud', { gain: 0.6 }); }

  // 2 · Manipur, Mizoram, Nagaland, Tripura: ₹10 lakh
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 980], zoom: 0.12, note: 'India map with four NE state pins popping, gold ₹10 LAKH slip, 4 STATES label', draw(lt, d, t) {
      indiaMap(4);
      [[93.9, 24.7], [92.9, 23.2], [94.5, 26.1], [91.9, 23.8]].forEach(([lo, la], k) => { const [gx, y] = geo(lo, la), x = Math.min(gx, 960) - k * 30; pin(x, y, R2(seg(lt, d * (0.1 + k * 0.12), d * (0.25 + k * 0.12)))); });
      K.slip('MANIPUR · MIZORAM', 540, 230, R2(seg(lt, 0.05, 0.25)), -0.03, 52);
      K.slip('NAGALAND · TRIPURA', 540, 340, R2(seg(lt, d * 0.3, d * 0.5)), 0.03, 52);
      K.ribbon('₹10 LAKH', 540, 1600, R2(seg(lt, d * 0.55, d * 0.8)), 130);
    } });
    cue(st, 'whoosh'); [0.1, 0.22, 0.34, 0.46].forEach((a) => cue(st + len(2) * a, 'pop', { gain: 0.45 })); cue(st + len(2) * 0.6, 'slam', { gain: 0.6 }); }

  // 3 · counted for all India, on your PAN
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'PAN card centre, dashed lines from pins of several cities converge into it, ALL INDIA ribbon', draw(lt, d, t) {
      dayPage(5, false);
      const pts = [[180, 520], [900, 480], [150, 1350], [930, 1380], [540, 330]];
      const r = eo(seg(lt, d * 0.15, d * 0.6)); pts.forEach(([x, y], k) => { pin(x, y, R2(seg(lt, k * 0.08, 0.2 + k * 0.08)), k % 2 ? P.gold : P.crimson); K.dashedRoute([[x, y + 20], [lerp(x, 540, 0.5), lerp(y, 920, 0.5)], [540, 920]], r); });
      idCard(540, 940, 1.0 * R2(seg(lt, d * 0.3, d * 0.55)), -0.03);
      K.ribbon('ALL INDIA, 1 PAN', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.35, 'zip', { gain: 0.4 }); cue(st + len(3) * 0.45, 'slam', { gain: 0.5 }); }

  // 4 · you: brand deals + AdSense + foreign client — all adds up
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, creator at laptop, three income cards pop: BRAND DEALS (cash), ADSENSE (coins), FOREIGN CLIENT (globe)', draw(lt, d, t) {
      room(6);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: P.royal });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      cash(700, 520, 0.7 * R2(seg(lt, d * 0.12, d * 0.3)), 0.05); K.slip('BRAND DEALS', 700, 690, R2(seg(lt, d * 0.15, d * 0.35)), -0.02, 62);
      coins(700, 1000, 0.7 * R2(seg(lt, d * 0.35, d * 0.5)), 4); K.slip('ADSENSE', 700, 1110, R2(seg(lt, d * 0.38, d * 0.55)), 0.03, 62);
      globe(700, 1300, 0.8 * R2(seg(lt, d * 0.55, d * 0.7))); K.slip('FOREIGN CLIENT', 700, 1500, R2(seg(lt, d * 0.6, d * 0.8)), -0.02, 62);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.14, note: 'the three icons drop into the jar one by one, it rises toward the ₹20 LAKH line, ALL ADDS UP ribbon', draw(lt, d, t) {
      dayPage(7);
      const a = seg(lt, 0.05, 0.3), b = seg(lt, 0.3, 0.55), c = seg(lt, 0.55, 0.8);
      jar(540, 1100, 1.1, 0.15 + 0.2 * eo(a) + 0.2 * eo(b) + 0.2 * eo(c), 0.85);
      if (a < 1) cash(540, lerp(300, 900, eio(a)), 0.5, 0.1); if (b > 0 && b < 1) coins(540, lerp(300, 900, eio(b)), 0.5, 3); if (c > 0 && c < 1) globe(540, lerp(300, 900, eio(c)), 0.5);
      K.ribbon('IT ALL ADDS UP', 540, 1750, R2(seg(lt, d * 0.5, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + d4 * 0.5 * 0.2, 'pop', { gain: 0.5 }); cue(st + d4 * 0.5 * 0.42, 'pop', { gain: 0.5 }); cue(st + d4 * 0.5 * 0.6, 'pop', { gain: 0.5 });
    cue(mid, 'whoosh'); [0.25, 0.5, 0.75].forEach((x) => cue(mid + len(4) * 0.5 * x, 'plop', { gain: 0.5 })); }

  // 5 · below 20 lakh, clients in other states or abroad: registration not compulsory
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'jar below the line (gold), OTHER STATE pin + ABROAD globe either side, green tick, NOT COMPULSORY ribbon', draw(lt, d, t) {
      dayPage(8, false);
      jar(540, 1150, 1.0, 0.5, 0.85);
      pin(230, 640, R2(seg(lt, d * 0.15, d * 0.35))); K.slip('OTHER STATE', 250, 760, R2(seg(lt, d * 0.2, d * 0.4)), -0.04, 50);
      globe(850, 600, 0.8 * R2(seg(lt, d * 0.3, d * 0.5))); K.slip('ABROAD', 850, 760, R2(seg(lt, d * 0.35, d * 0.55)), 0.04, 54);
      const k = R2(seg(lt, d * 0.55, d * 0.7)); if (k > 0) { ctx.save(); ctx.translate(540, 1250); ctx.scale(k, k); cut(P_circ(0, 0, 90), P.green); line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); ctx.restore(); }
      K.ribbon('NO MUST-REGISTER', 540, 1650, R2(seg(lt, d * 0.6, d * 0.9)), 80);
    } });
    cue(st, 'whoosh'); cue(st + len(5) * 0.25, 'pop', { gain: 0.5 }); cue(st + len(5) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(5) * 0.6, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 6 · game changer: once registered, most creator services 18% GST
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, GST doc gets an OK stamp, REGISTERED slip', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('GAME CHANGER', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      doc(540, 900, 1.1 * R2(seg(lt, 0.05, 0.3)), 'GST', R2(seg(lt, d * 0.45, d * 0.65)), -0.03);
      K.slip('REGISTERED', 540, 1500, R2(seg(lt, d * 0.55, d * 0.8)), 0.03, 80);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'invoice with a gold big 18% stamp-like, ON CREATOR SERVICES ribbon', draw(lt, d, t) {
      dayPage(10);
      doc(540, 1050, 1.0, 'INVOICE', 0, 0.03);
      bigMark('18%', 540, 520, R2(seg(lt, 0.05, 0.3)), -0.04, P.gold, 300);
      K.slip('+ GST', 820, 760, R2(seg(lt, 0.25, 0.45)), 0.06, 70);
      K.ribbon('MOST CREATOR SERVICES', 540, 1650, R2(seg(lt, d * 0.4, d * 0.7)), 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.5, 'thud', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + 0.3, 'slam', { gain: 0.6 }); }

  // 7 · craziest: foreign income like AdSense can be a zero-rated export — file an LUT first
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'CRAZIEST PART slip, coins (ADSENSE) travel from a globe along a dashed route, big gold 0% ZERO-RATED', draw(lt, d, t) {
      dayPage(11, false);
      K.slip('CRAZIEST PART', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      globe(220, 620, 1.0 * R2(seg(lt, 0.05, 0.25))); K.slip('ADSENSE', 220, 820, R2(seg(lt, 0.1, 0.3)), -0.04, 56);
      K.dashedRoute([[320, 650], [600, 560], [820, 700]], eo(seg(lt, d * 0.2, d * 0.5))); coins(820, 820, 0.7 * R2(seg(lt, d * 0.4, d * 0.55)), 3);
      bigMark('0%', 540, 1220, R2(seg(lt, d * 0.5, d * 0.7)), -0.03, P.gold, 280);
      K.ribbon('ZERO-RATED EXPORT', 540, 1650, R2(seg(lt, d * 0.6, d * 0.9)), 80);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'LUT document filed first: hand drops it into a tray, FIRST then an export invoice, FILE LUT FIRST ribbon', draw(lt, d, t) {
      dayPage(12);
      doc(330, 900, 0.95 * R2(seg(lt, 0.02, 0.25)), 'LUT', R2(seg(lt, d * 0.35, d * 0.55)), -0.05);
      K.slip('1st', 330, 470, R2(seg(lt, 0.15, 0.35)), -0.05, 90);
      doc(790, 960, 0.75 * R2(seg(lt, d * 0.45, d * 0.65)), 'INVOICE', 0, 0.05);
      K.slip('2nd', 790, 620, R2(seg(lt, d * 0.5, d * 0.7)), 0.05, 80);
      K.ribbon('FILE LUT FIRST', 540, 1650, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d7 * 0.5 * 0.55, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(7) * 0.5 * 0.45, 'thud', { gain: 0.6 }); cue(mid + len(7) * 0.5 * 0.55, 'pop', { gain: 0.5 }); }

  // 8 · track total income every month
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'INCOME ledger rows fill one by one, a pen-hand, EVERY MONTH ribbon', draw(lt, d, t) {
      room(13);
      ledger(540, 900, 1.2 * R2(seg(lt, 0.02, 0.25)), Math.floor(5 * clamp(seg(lt, 0.25, 0.9)) + 0.01));
      hand(800, lerp(1200, 800, clamp(seg(lt, 0.25, 0.9))), 0.9, -0.3, true);
      K.ribbon('EVERY MONTH', 540, 1700, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); [0.3, 0.45, 0.6, 0.75].forEach((a) => cue(st + len(8) * a, 'tock', { gain: 0.5 })); }

  // 9 · near 20 lakh → talk to a CA and register
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'jar nearly at the line, creator talks to a CA figure (generic, briefcase-less) in speech bubbles, TALK TO A CA ribbon', draw(lt, d, t) {
      dayPage(14, false); ground(1650, M.wall2);
      jar(540, 700, 0.75 * R2(seg(lt, 0.02, 0.25)), 0.76, 0.85);
      person({ x: 240, y: 1650, h: 600, arm: 50, top: P.royal });
      person({ x: 840, y: 1650, h: 600, arm: 50, dir: -1, top: P.ink });
      K.slip('CA', 840, 1100, R2(seg(lt, d * 0.3, d * 0.5)), 0.04, 80);
      bubble('Near the limit?', 90, 960, R2(seg(lt, d * 0.25, d * 0.45)), false, 48);
      K.ribbon('TALK TO A CA', 540, 1780, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(9) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.6, 'slam', { gain: 0.5 }); }

  // 10 · loop: brand money comes in, no GST tension (beat-0 room)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: cash flies in, GST? mark gets a green tick instead, creator glows, NO TENSION ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal, glow: eo(seg(lt, d * 0.4, d * 0.7)) });
      const f = eo(seg(lt, 0.02, 0.3)); cash(lerp(1000, 650, f), lerp(500, 800, f), 1.0, -0.1);
      K.slip('BRAND DEAL', 650, 1050, 1, 0.03, 66);
      bigMark('GST?', 600, 450, 1 - eo(seg(lt, d * 0.3, d * 0.5)), 0, P.crimson, 220);
      const k = R2(seg(lt, d * 0.45, d * 0.65)); if (k > 0) { ctx.save(); ctx.translate(600, 450); ctx.scale(k, k); cut(P_circ(0, 0, 100), P.green); line([[-45, 0], [-10, 38], [50, -38]], P.edge, 22); ctx.restore(); }
      K.ribbon('NO TENSION', 540, 1780, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'plop', { gain: 0.5 }); cue(st + len(10) * 0.5, 'slam', { gain: 0.7 }); }

  // 11 · follow + send to the friend whose brand deals just started
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a GST doc flies to a friend holding cash who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); doc(lerp(240, 560, f), lerp(1250, 1200, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 'GST', 0, 0.1 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
