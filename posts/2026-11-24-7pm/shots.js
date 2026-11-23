// 24 Nov 7pm: CONTRACTS 101: 5 THINGS TO CHECK BEFORE YOU SIGN A BRAND DEAL (INDIA). Paper style.
// Facts (opened 23 Nov 2026): Wikipedia "Indian Contract Act, 1872": Section 2(h) defines a contract as "an agreement
// that is enforceable by law". Wikipedia "Copyright law of India": the author is generally the first owner (employer
// owns works under a contract of service, unless agreed otherwise); section 19: "Assignment can only be in writing",
// it must specify the work, the period and the territory; if the period is not specified it is deemed five years; if
// the territory is not specified it is presumed limited to India. Checks 1, 2, 4, 5 (deliverables, payment, usage,
// exclusivity) are nser's checklist advice, not legal facts. No real person, no logo.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, clock, magnifier, strike, note, coins, indiaMap, rankCard } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a contract sheet: title, text lines, signature line; sig 0..1 draws a scribble */
function contract(x, y, s, rot = 0, sig = 0, title = 'CONTRACT') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-260, -360, 520, 720, 12), '#FFFBF0'); K.label(title, 0, -290, 52, P.ink);
  for (let k = 0; k < 8; k++) line([[-200, -200 + k * 50], [k % 3 === 2 ? 80 : 200, -200 + k * 50]], 'rgba(62,44,30,0.25)', 10);
  line([[-200, 270], [80, 270]], P.ink, 4);
  if (sig > 0) { ctx.save(); ctx.beginPath(); ctx.rect(-200, 180, 280 * clamp(sig), 100); ctx.clip(); ctx.strokeStyle = P.royal; ctx.lineWidth = 8; ctx.lineCap = 'round'; ctx.beginPath();
    for (let i = 0; i <= 40; i++) { const u = i / 40, px = -190 + 260 * u, py = 245 + 22 * Math.sin(u * 18) - 10 * u; i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); } ctx.stroke(); ctx.restore(); }
  ctx.restore(); }
/** a pen */
function pen(x, y, s, rot = -0.7) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-20, -200, 40, 220, 14), P.ink); cut(P_poly([[-20, 20], [20, 20], [0, 70]]), P.gold, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a big circled © mark */
function copy(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_circ(0, 0, 150), P.crimson); cut(P_circ(0, 0, 112), '#FFFBF0', { shadow: 0, edge: 0 });
  K.label('C', 0, 8, 150, P.crimson); ctx.restore(); }
/** a calendar page with a gold date */
function calendar(x, y, s, day = '15', rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -160, 300, 320, 20), '#FFFBF0'); cut(P_rr(-150, -160, 300, 90, 20), P.crimson, { shadow: 0, edge: 0 }); cut(P_rr(-150, -100, 300, 30, 0), P.crimson, { shadow: 0, edge: 0 });
  K.label('DUE', 0, -112, 44, P.edge); K.label(day, 0, 60, 130, P.gold); ctx.restore(); }
/** a paper padlock */
function lock(x, y, s, open = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.translate(0, -open * 60); ctx.strokeStyle = P.stoneDark; ctx.lineWidth = 34; ctx.beginPath(); ctx.arc(0, -90, 90, Math.PI, 0); ctx.lineTo(90, -40); ctx.moveTo(-90, -90); ctx.lineTo(-90, -40); ctx.stroke(); ctx.restore();
  cut(P_rr(-150, -60, 300, 230, 30), P.gold); cut(P_circ(0, 40, 26), P.ink, { shadow: 0, edge: 0 }); ctx.restore(); }
/** a paper product box with a letter */
function product(x, y, s, letter, col, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-90, -160, 180, 320, 30), col); cut(P_rr(-50, -200, 100, 50, 10), P.stoneDark, { shadow: 0.3, edge: 3 });
  cut(P_circ(0, 0, 60), '#FFFBF0', { shadow: 0.2, edge: 3 }); K.label(letter, 0, 4, 64, P.ink); ctx.restore(); }
/** a big gold step number in a circle + word, for the 5 checks */
function step(n, word, y, sc) { rankCard(n, word, 540, y, sc, -0.02, 700); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · contract arrived, you signed without reading?
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator in room, a contract sheet flies in from the brand box, BRAND DEAL slip', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      product(860, 1300, 1.0 * R2(seg(lt, 0.02, 0.18)), 'B', P.royal, 0.05);
      const f = eo(seg(lt, 0.15, 0.55)); contract(lerp(900, 600, f), lerp(1100, 760, f), 0.8 * R2(seg(lt, 0.12, 0.3)), lerp(0.3, -0.04, f));
      K.slip('BRAND DEAL', 540, 260, R2(seg(lt, d * 0.4, d * 0.6)), -0.03, 70);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'pen scribbles a signature fast, crimson UNREAD? stamp over the text lines', draw(lt, d, t) {
      dayPage(2);
      contract(540, 860, 1.4, -0.02, seg(lt, 0.1, 0.45));
      pen(lerp(330, 640, seg(lt, 0.1, 0.45)), 1120 + 20 * Math.sin(t * 30), 1, -0.7);
      bigMark('UNREAD?', 540, 640, R2(seg(lt, d * 0.5, d * 0.7)), -0.12, P.crimson, 150);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.5 * 0.3, 'zip', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.6, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.2, 'zip', { gain: 0.6 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.8 }); }

  // 1 · simply put: contract = an agreement enforceable by law; sign it, you're bound
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, AGREEMENT sheet + gold law seal stamps on it → ENFORCEABLE ribbon', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('SIMPLY PUT', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      contract(540, 900, 1.1 * R2(seg(lt, 0.05, 0.2)), 0.02, 0, 'AGREEMENT');
      const f = seg(lt, 0.4, 0.6); if (f > 0) K.seal(700, lerp(400, 1100, eo(f)), 1.1, 'L');
      K.ribbon('ENFORCEABLE BY LAW', 540, 1580, R2(seg(lt, d * 0.6, d * 0.9)), 80);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'signed contract, a ribbon chain binds creator to it, BOUND slip', draw(lt, d, t) {
      room(4);
      person({ x: 260, y: 1650, h: 600, arm: 40, top: M.tee, phone: false });
      contract(780, 880, 0.9, 0.04, 1);
      K.dashedRoute([[340, 1150], [520, 1050], [620, 980]], eo(seg(lt, 0.1, 0.4)));
      bigMark('SIGNED = BOUND', 540, 320, R2(seg(lt, d * 0.35, d * 0.6)), -0.03, P.crimson, 110);
    } });
    cue(st, 'whoosh'); cue(st + d1 * 0.5 * 0.5, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d1 * 0.5 * 0.25, 'zip', { gain: 0.5 }); cue(mid + d1 * 0.5 * 0.5, 'thud', { gain: 0.6 }); }

  // 2 · check these 5 things before you sign
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'gold 5 CHECKS, magnifier over contract, five tick boxes pop down the side', draw(lt, d, t) {
      nightPage(5);
      bigMark('5 CHECKS', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.04, P.gold, 170);
      contract(420, 1000, 1.0 * R2(seg(lt, 0.05, 0.2)), -0.03);
      magnifier(lerp(560, 420, Math.sin(t * 2) * 0.5 + 0.5), 940, 0.9 * R2(seg(lt, 0.2, 0.35)));
      for (let k = 0; k < 5; k++) { const s = R2(seg(lt, d * (0.3 + k * 0.1), d * (0.4 + k * 0.1))); if (s <= 0) continue; ctx.save(); ctx.translate(880, 720 + k * 130); ctx.scale(s, s); cut(P_rr(-45, -45, 90, 90, 14), '#FFFBF0', { shadow: 0.4, edge: 3 }); ctx.restore(); }
      K.ribbon('BEFORE YOU SIGN', 540, 1660, R2(seg(lt, d * 0.5, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(2) * 0.1, 'slam', { gain: 0.6 }); [0.35, 0.45, 0.55, 0.65, 0.75].forEach((a) => cue(st + len(2) * a, 'pop', { gain: 0.35 })); }

  // 3 · 1: deliverables: how many reels, stories, by when, in writing
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.5;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: '1 DELIVERABLES card, reel post cards ×3 and story phones ×2 count up', draw(lt, d, t) {
      dayPage(6);
      step(1, 'DELIVERABLES', 260, R2(seg(lt, 0.02, 0.2)));
      [0, 1, 2].forEach((k) => postCard(220 + k * 160, 820 + k * 30, 0.6 * R2(seg(lt, 0.15 + k * 0.1, 0.3 + k * 0.1)), (k - 1) * 0.08));
      K.slip('3 REELS', 380, 1150, R2(seg(lt, 0.4, 0.55)), -0.04, 60);
      [0, 1].forEach((k) => phoneBig(780 + k * 120, 880, 0.35 * R2(seg(lt, 0.45 + k * 0.1, 0.6 + k * 0.1)), (k ? 0.08 : -0.05)));
      K.slip('2 STORIES', 840, 1150, R2(seg(lt, 0.65, 0.8)), 0.04, 60);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.16, note: 'calendar with gold date, BY WHEN slip, contract line gets a crimson tick: IN WRITING ribbon', draw(lt, d, t) {
      dayPage(7, false);
      calendar(300, 760, 1.2 * R2(seg(lt, 0.02, 0.18)), '10', -0.05);
      K.slip('BY WHEN?', 300, 1080, R2(seg(lt, 0.15, 0.3)), -0.04, 60);
      contract(760, 880, 0.75 * R2(seg(lt, 0.2, 0.35)), 0.04);
      K.ribbon('IN WRITING', 540, 1560, R2(seg(lt, d * 0.5, d * 0.8)), 130);
    } });
    cue(st, 'whoosh'); [0.15, 0.25, 0.35].forEach((a) => cue(st + d3 * 0.5 * a, 'pop', { gain: 0.4 })); cue(st + d3 * 0.5 * 0.55, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d3 * 0.5 * 0.2, 'thud', { gain: 0.5 }); cue(mid + d3 * 0.5 * 0.6, 'slam', { gain: 0.6 }); }

  // 4 · 2: payment: how much, by what date
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.12, note: '2 PAYMENT card, ₹ notes + coins stack, calendar DUE date with gold, HOW MUCH + BY WHEN slips', draw(lt, d, t) {
      dayPage(8);
      step(2, 'PAYMENT', 260, R2(seg(lt, 0.02, 0.2)));
      note(320, 760, 1.2 * R2(seg(lt, 0.15, 0.3)), -0.06); note(340, 900, 1.2 * R2(seg(lt, 0.22, 0.37)), 0.05);
      coins(320, 1220, 1.0 * R2(seg(lt, 0.3, 0.45)), 5);
      calendar(790, 900, 1.1 * R2(seg(lt, d * 0.45, d * 0.6)), '30', 0.05);
      K.slip('HOW MUCH?', 320, 1420, R2(seg(lt, d * 0.3, d * 0.45)), -0.04, 60);
      K.slip('BY WHEN?', 790, 1240, R2(seg(lt, d * 0.6, d * 0.75)), 0.04, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(4) * 0.2, 'pop', { gain: 0.4 }); cue(st + len(4) * 0.35, 'thud', { gain: 0.5 }); cue(st + len(4) * 0.55, 'pop', { gain: 0.5 }); }

  // 5 · 3 (biggest): who owns the reel? usually the maker: you
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: '3 OWNERSHIP card + BIGGEST slip, reel card with big crimson ?', draw(lt, d, t) {
      nightPage(9);
      step(3, 'WHO OWNS IT?', 260, R2(seg(lt, 0.02, 0.2)));
      K.slip('THE BIGGEST', 540, 460, R2(seg(lt, 0.15, 0.3)), 0.04, 60);
      postCard(540, 960, 1.2 * R2(seg(lt, 0.2, 0.35)), -0.03);
      bigMark('?', 820, 1300, R2(seg(lt, d * 0.5, d * 0.7)), 0.08 * Math.sin(t * 3), P.crimson, 300);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'creator holds the reel card, crimson © stamps next to them, gold YOU slip, USUALLY THE MAKER ribbon', draw(lt, d, t) {
      room(10);
      person({ x: 300, y: 1650, h: 620, arm: 80, top: M.tee, glow: eo(seg(lt, 0.4, 0.7)) });
      postCard(560, 820, 0.8, 0.05);
      copy(820, 520, R2(seg(lt, 0.2, 0.4)));
      bigMark('YOU', 820, 1120, R2(seg(lt, d * 0.4, d * 0.6)), 0.04, P.gold, 160);
      K.ribbon('USUALLY THE MAKER', 540, 1500, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.6 }); cue(st + d5 * 0.5 * 0.6, 'thud', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.5 * 0.3, 'slam', { gain: 0.7 }); cue(mid + d5 * 0.5 * 0.5, 'pop', { gain: 0.5 }); }

  // 6 · India: copyright assignment only in writing, naming work, period, territory
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'India map, © passes from creator hand to brand box only via a contract sheet: ONLY IN WRITING', draw(lt, d, t) {
      indiaMap(11);
      K.slip('INDIA', 540, 200, R2(seg(lt, 0.02, 0.18)), -0.03, 70);
      copy(260, 760, 0.8 * R2(seg(lt, 0.1, 0.25)));
      K.dashedRoute([[360, 780], [540, 760], [720, 780]], eo(seg(lt, 0.25, 0.55)));
      product(820, 800, 0.8 * R2(seg(lt, 0.15, 0.3)), 'B', P.royal, 0.05);
      contract(540, 1200, 0.6 * R2(seg(lt, 0.4, 0.55)), -0.03);
      K.ribbon('ONLY IN WRITING', 540, 1640, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'contract sheet with three tagged slips: WORK, PERIOD, TERRITORY', draw(lt, d, t) {
      dayPage(12, false);
      contract(540, 900, 1.3, 0.02, 0, 'ASSIGNMENT');
      K.slip('WORK', 300, 640, R2(seg(lt, 0.1, 0.28)), -0.05, 70);
      K.slip('PERIOD', 780, 900, R2(seg(lt, 0.35, 0.52)), 0.05, 70);
      K.slip('TERRITORY', 360, 1180, R2(seg(lt, 0.6, 0.77)), -0.04, 70);
    } });
    cue(st, 'whoosh'); cue(st + d6 * 0.45 * 0.35, 'zip', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.7, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); [0.15, 0.4, 0.65].forEach((a) => cue(mid + d6 * 0.55 * a, 'pop', { gain: 0.5 })); }

  // 7 · craziest: period not written → law treats it as 5 years
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.14, note: 'CRAZIEST PART slip, PERIOD slot blank ___ on sheet, clock spins, gold 5 YEARS stamps', draw(lt, d, t) {
      nightPage(13);
      K.slip('CRAZIEST PART', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      K.slip('PERIOD: ____', 540, 480, R2(seg(lt, 0.1, 0.28)), 0.03, 70);
      clock(540, 860, 1.2 * R2(seg(lt, 0.2, 0.35)), seg(lt, 0.2, 0.9) * 60);
      bigMark('5 YEARS', 540, 1300, R2(seg(lt, d * 0.5, d * 0.7)), -0.04, P.gold, 190);
      K.ribbon('BY DEFAULT', 540, 1640, R2(seg(lt, d * 0.65, d * 0.95)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(7) * 0.15, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(7) * 0.55, 'slam', { gain: 0.8 }); }

  // 8 · territory not written → just India
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'India map lights up gold, TERRITORY: ____ slip, ONLY INDIA ribbon', draw(lt, d, t) {
      indiaMap(14);
      K.slip('TERRITORY: ____', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const r = (t * 0.8) % 1; ctx.save(); ctx.globalAlpha = (1 - r) * clamp(seg(lt, 0.2, 0.4)); ctx.strokeStyle = P.gold; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(540, 900, 300 + 200 * r, 0, TAU); ctx.stroke(); ctx.restore();
      K.ribbon('ONLY INDIA', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 130);
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.15, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.45, 'slam', { gain: 0.7 }); }

  // 9 · 4: usage: can the brand run your reel as an ad, and for how many days
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.5;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: '4 USAGE card, your reel card gets an AD tag and multiplies onto phones', draw(lt, d, t) {
      dayPage(15);
      step(4, 'USAGE', 260, R2(seg(lt, 0.02, 0.2)));
      postCard(540, 820, 1.0 * R2(seg(lt, 0.1, 0.25)), -0.03);
      K.slip('AD', 760, 600, R2(seg(lt, 0.3, 0.45)), 0.1, 80);
      [[200, 1300], [540, 1360], [880, 1300]].forEach(([x, y], k) => phoneBig(x, y, 0.32 * R2(seg(lt, 0.45 + k * 0.08, 0.6 + k * 0.08)), (k - 1) * 0.1, () => postCard(0, -40, 0.9, 0)));
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.16, note: 'calendar + gold HOW MANY DAYS?, clock', draw(lt, d, t) {
      dayPage(16, false);
      calendar(540, 760, 1.4 * R2(seg(lt, 0.02, 0.18)), '?', -0.03);
      clock(830, 1150, 0.7 * R2(seg(lt, 0.15, 0.3)), t * 3);
      K.ribbon('HOW MANY DAYS?', 540, 1500, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d9 * 0.5 * 0.35, 'pop', { gain: 0.5 }); [0.5, 0.58, 0.66].forEach((a) => cue(st + d9 * 0.5 * a, 'pop', { gain: 0.35 })); cue(mid, 'whoosh'); cue(mid + d9 * 0.5 * 0.5, 'slam', { gain: 0.6 }); }

  // 10 · 5: exclusivity: how many days you can't work with other brands
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.5;
    add({ id: 'S10a', at: st, cam: [540, 960], zoom: 0.12, note: '5 EXCLUSIVITY card, padlock snaps shut in front of other brand boxes C and D', draw(lt, d, t) {
      nightPage(17);
      step(5, 'EXCLUSIVITY', 260, R2(seg(lt, 0.02, 0.2)));
      product(300, 1000, 1.0 * R2(seg(lt, 0.1, 0.25)), 'C', P.green, -0.05);
      product(780, 1000, 1.0 * R2(seg(lt, 0.15, 0.3)), 'D', P.wine, 0.05);
      lock(540, lerp(500, 1080, eo(seg(lt, 0.35, 0.6))), 1.0 * R2(seg(lt, 0.3, 0.4)), 1 - seg(lt, d * 0.6, d * 0.75));
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.16, note: 'other brand cards struck off, gold calendar with ? days, HOW LONG? ribbon', draw(lt, d, t) {
      dayPage(18);
      [['C', P.green, 240], ['D', P.wine, 540], ['E', P.sea, 840]].forEach(([l, c, x], k) => { product(x, 820, 0.8, l, c, (k - 1) * 0.05); strike(x - 110, 820, 220, seg(lt, 0.15 + k * 0.1, 0.3 + k * 0.1)); });
      K.slip('OTHER BRANDS', 540, 400, R2(seg(lt, 0.02, 0.18)), -0.03, 64);
      K.ribbon('FOR HOW LONG?', 540, 1500, R2(seg(lt, d * 0.45, d * 0.75)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d10 * 0.5 * 0.55, 'thud', { gain: 0.7 }); cue(mid, 'whoosh'); [0.2, 0.32, 0.44].forEach((a) => cue(mid + d10 * 0.5 * a, 'zip', { gain: 0.4 })); cue(mid + d10 * 0.5 * 0.65, 'slam', { gain: 0.6 }); }

  // 11 · loop: read, ask, then sign (beat-0 room, now signed slowly)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: creator, contract; slips READ / ASK / SIGN with ticks, signature draws calmly', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee, glow: eo(seg(lt, 0.6, 0.9)) });
      product(860, 1300, 1.0, 'B', P.royal, 0.05);
      contract(600, 760, 0.8, -0.04, seg(lt, d * 0.6, d * 0.95));
      K.slip('READ', 230, 300, R2(seg(lt, 0.05, 0.2)), -0.05, 70); K.slip('ASK', 540, 230, R2(seg(lt, d * 0.3, d * 0.45)), 0.04, 70); K.slip('SIGN', 850, 300, R2(seg(lt, d * 0.55, d * 0.7)), -0.03, 70);
    } });
    cue(st, 'whoosh'); [0.1, 0.38, 0.62].forEach((a) => cue(st + len(11) * a, 'pop', { gain: 0.5 })); cue(st + len(11) * 0.85, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend whose first brand deal is coming
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with FIRST DEAL slip and a contract, handle slip', draw(lt, d, t) {
      dayPage(19); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      contract(300, 1260, 0.45 * R2(seg(lt, d * 0.3, d * 0.45)), -0.06);
      K.slip('1ST DEAL', 300, 1040, R2(seg(lt, d * 0.35, d * 0.5)), -0.04, 60);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
