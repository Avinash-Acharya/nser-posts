// 20 Nov 7pm: BARTER VS PAID DEALS: WHEN TO SAY NO TO FREE PRODUCTS. Paper style.
// Facts: CBDT Circular 12/2022 FAQs (via TaxGuru) + ClearTax: TDS 10% on business benefits/perquisites given to a
// resident when the total in a financial year exceeds ₹20,000; products kept by influencers = benefit (TDS applies,
// value is business income for the recipient, s.28(iv)); products returned to the brand after use = no TDS.
// TDSMAN (Aug 2026): same rule continues under Income-tax Act 2025 s.393(1) from 1 Apr 2026, 10% above ₹20,000.
// The ₹30,000 phone is a hypothetical example (said as "picture it").
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet, note,
  laptop, gift, clock, ringLight, strike } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a document with a title and an optional stamp */
function doc(x, y, s, word, stamp = 0, rot = 0, stampTxt = 'OK') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -260, 400, 520, 12), '#FFFBF0'); K.label(word, 0, -190, 56, P.ink);
  for (let k = 0; k < 5; k++) line([[-150, -100 + k * 60], [150 - (k % 2) * 60, -100 + k * 60]], 'rgba(62,44,30,0.25)', 10);
  if (stamp > 0) { ctx.save(); ctx.translate(70, 170); ctx.rotate(-0.25); ctx.scale(stamp, stamp); ctx.strokeStyle = P.crimson; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke(); K.label(stampTxt, 0, 0, 44, P.crimson); ctx.restore(); }
  ctx.restore(); }
/** a little phone */
function mobile(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-80, -150, 160, 300, 24), '#1F1D1A'); rr(-66, -132, 132, 250, 14); ctx.fillStyle = M.screen; ctx.fill(); ctx.restore(); }
/** a price tag */
function tag(txt, x, y, s, rot = 0, col = P.gold, size = 90) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_poly([[-220, -90], [150, -90], [220, 0], [150, 90], [-220, 90]]), col); circle(150, 0, 18, P.parch); K.label(txt, -40, 4, size, P.edge); ctx.restore(); }
/** a balance scale tilted by tilt (-1..1, + = right side down) */
function scale2(x, y, s, tilt, left, right) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-30, 0], [30, 0], [60, 420], [-60, 420]]), P.sepia); cut(P_rr(-160, 400, 320, 40, 12), P.sepia);
  ctx.save(); ctx.rotate(tilt * 0.25); cut(P_rr(-360, -18, 720, 36, 14), P.ink);
  for (const [sx, fn] of [[-330, left], [330, right]]) { ctx.save(); ctx.translate(sx, 0); ctx.rotate(-tilt * 0.25); line([[0, 0], [-90, 160]], P.ink, 5); line([[0, 0], [90, 160]], P.ink, 5);
    cut(() => { ctx.beginPath(); ctx.ellipse(0, 165, 130, 30, 0, 0, TAU); }, P.gold, { shadow: 0.5, edge: 4 }); if (fn) fn(); ctx.restore(); }
  ctx.restore(); circle(0, 0, 30, P.gold); ctx.restore(); }
/** a cardboard box */
function box(x, y, s, rot = 0, open = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-160, -120, 320, 240, 10), '#B98A55'); cut(P_rr(-30, -120, 60, 240, 0), '#D9B98A', { shadow: 0, edge: 0 });
  if (open > 0) { cut(P_poly([[-160, -120], [-30, -120], [-60 - 80 * open, -180 - 60 * open], [-190, -150]]), '#A9794A', { shadow: 0.4, edge: 3 }); cut(P_poly([[30, -120], [160, -120], [190, -150], [60 + 80 * open, -180 - 60 * open]]), '#A9794A', { shadow: 0.4, edge: 3 }); }
  ctx.restore(); }
/** green tick / crimson cross in a circle */
function tick(x, y, k, ok = true) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 90), ok ? P.green : P.crimson);
  if (ok) line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); else { line([[-35, -35], [35, 35]], P.edge, 20); line([[35, -35], [-35, 35]], P.edge, 20); } ctx.restore(); }
/** a little house (rent) */
function house(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-150, -120, 300, 240, 8), '#E6D2A8'); cut(P_poly([[-190, -110], [0, -280], [190, -110]]), P.crimson); cut(P_rr(-40, 20, 80, 100, 6), P.sepia, { shadow: 0, edge: 3 }); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · a brand sent a free product. but is free really free?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator in room, PR box slides in and opens, gift pops out with FREE tag, crimson ? mark', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 60, top: P.wine });
      const f = eo(seg(lt, 0.02, 0.3)); box(lerp(1100, 700, f), 1250, 1.0, 0, eo(seg(lt, d * 0.25, d * 0.45)));
      gift(700, lerp(1150, 950, eo(seg(lt, d * 0.35, d * 0.55))), 0.9 * R2(seg(lt, d * 0.35, d * 0.5)), 0.05);
      tag('FREE', 700, 560, 0.8 * R2(seg(lt, d * 0.4, d * 0.6)), -0.06, P.green, 90);
      bigMark('?', 300, 450, R2(seg(lt, d * 0.65, d * 0.85)), Math.sin(t * 3) * 0.08, P.crimson, 300);
      K.ribbon('REALLY FREE?', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(0) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.5, 'sparkle', { dur: 0.4, gain: 0.4 }); cue(st + len(0) * 0.75, 'slam', { gain: 0.6 }); }

  // 1 · simply put: barter = product instead of money, your reel in return
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.4;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, BARTER ribbon, ₹ note slides away crossed, gift slides in instead', draw(lt, d, t) {
      dayPage(2, false);
      K.slip('SIMPLY PUT', 540, 280, R2(seg(lt, 0.02, 0.25)), -0.03, 70);
      const f = eio(seg(lt, 0.2, 0.6)); note(lerp(540, -200, f), 800, 1.4, 0.05);
      gift(lerp(1300, 540, f), 1000, 1.3, 0);
      K.ribbon('BARTER', 540, 1500, R2(seg(lt, d * 0.4, d * 0.7)), 130);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.14, note: 'balance scale: gift on one pan, phone with REEL on the other, levels out, PRODUCT ⇄ REEL slips', draw(lt, d, t) {
      dayPage(3);
      scale2(540, 800, 1.1, lerp(0.8, 0, eo(seg(lt, 0.1, 0.6))) + Math.sin(t * 2) * 0.03, () => gift(0, 150, 0.5, 0), () => mobile(0, 40, 0.7, 0));
      K.slip('PRODUCT', 240, 1350, R2(seg(lt, 0.1, 0.3)), -0.04, 62);
      K.slip('YOUR REEL', 830, 1350, R2(seg(lt, 0.3, 0.5)), 0.04, 56);
      K.ribbon('A SWAP', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d1 * 0.4 * 0.4, 'zip', { gain: 0.4 }); cue(st + d1 * 0.4 * 0.7, 'slam', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(1) * 0.6 * 0.5, 'thud', { gain: 0.5 }); }

  // 2 · under tax rules, a product you keep counts as business income
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'TAX RULES document, gift moves onto an INCOME ledger page and gets a gold ₹ tag, KEPT = INCOME ribbon', draw(lt, d, t) {
      dayPage(4, false);
      K.slip('TAX RULES', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 72);
      doc(540, 900, 1.3 * R2(seg(lt, 0.05, 0.3)), 'INCOME', 0, -0.02);
      const f = eio(seg(lt, 0.3, 0.6)); gift(lerp(1250, 540, f), lerp(600, 1000, f), 0.8, 0.1 * (1 - f));
      K.slip('YOU KEEP IT', 820, 560, R2(seg(lt, d * 0.25, d * 0.45)), 0.05, 56);
      K.ribbon('KEPT = INCOME', 540, 1650, R2(seg(lt, d * 0.55, d * 0.8)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(2) * 0.45, 'plop', { gain: 0.5 }); cue(st + len(2) * 0.65, 'slam', { gain: 0.6 }); }

  // 3 · over ₹20,000 in a year → brand deducts 10% TDS
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.5;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'gifts stack up past a crimson dashed ₹20,000 line, IN A YEAR slip', draw(lt, d, t) {
      room(5);
      const n = Math.floor(4 * clamp(seg(lt, 0.05, 0.7))) + 1;
      for (let k = 0; k < n; k++) gift(540 + (k % 2 ? 40 : -40), 1380 - k * 170, 0.75, (k % 2 ? 0.05 : -0.05));
      ctx.save(); ctx.setLineDash([22, 14]); line([[150, 900], [930, 900]], P.crimson, 8); ctx.restore(); K.label('₹20,000', 820, 840, 64, P.crimson);
      K.slip('IN A YEAR', 540, 300, R2(seg(lt, 0.05, 0.25)), -0.03, 74);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.14, note: 'big gold 10% mark, scissors-like strike cuts a slice off a ₹ note, TDS ribbon, BRAND slip', draw(lt, d, t) {
      dayPage(6);
      bigMark('10%', 540, 560, R2(seg(lt, 0.02, 0.25)), -0.04, P.gold, 320);
      note(540, 1050, 1.6, 0.03);
      strike(300, 1100, 480, eo(seg(lt, 0.35, 0.55)));
      K.slip('BRAND DEDUCTS', 540, 1300, R2(seg(lt, d * 0.4, d * 0.6)), 0.03, 62);
      K.ribbon('TDS', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 150);
    } });
    cue(st, 'whoosh'); [0.15, 0.3, 0.45, 0.6].forEach((a) => cue(st + d3 * 0.5 * a, 'plop', { gain: 0.45 })); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.7 }); cue(mid + len(3) * 0.5 * 0.45, 'zip', { gain: 0.5 }); }

  // 4 · you: you got a ₹30,000 phone, made the reel, kept the phone
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, ring light, creator holds a phone with gold ₹30,000 tag, REEL bubble, then KEPT slip', draw(lt, d, t) {
      room(7);
      ringLight(860, 1050, 0.75);
      person({ x: 300, y: 1650, h: 660, arm: 70, top: P.wine });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      mobile(500, 720, 1.3 * R2(seg(lt, 0.05, 0.25)), 0.1);
      tag('₹30,000', 480, 420, 0.75 * R2(seg(lt, d * 0.2, d * 0.4)), -0.05, P.gold, 80);
      bubble('Reel done!', 560, 1050, R2(seg(lt, d * 0.45, d * 0.6)), false, 52);
      K.ribbon('KEPT IT', 540, 1700, R2(seg(lt, d * 0.7, d * 0.9)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(4) * 0.3, 'plop', { gain: 0.5 }); cue(st + len(4) * 0.5, 'pop', { gain: 0.5 }); cue(st + len(4) * 0.75, 'thud', { gain: 0.5 }); }

  // 5 · not a single rupee came, but 30,000 counts as income
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'empty open wallet, big crimson ₹0, a moth-like dust puff, CASH IN slip', draw(lt, d, t) {
      dayPage(8, false);
      wallet(540, 1050, 1.4 * R2(seg(lt, 0.02, 0.25)), true);
      bigMark('₹0', 540, 560, R2(seg(lt, 0.2, 0.45)), -0.04, P.crimson, 300);
      K.slip('CASH IN', 540, 1400, R2(seg(lt, d * 0.4, d * 0.65)), 0.03, 70);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: 'INCOME document with a gold ₹30,000 tag stamped on, COUNTED slip', draw(lt, d, t) {
      dayPage(9);
      doc(540, 1000, 1.3, 'INCOME', 0, 0.02);
      tag('₹30,000', 540, 1050, 0.9 * R2(seg(lt, 0.1, 0.35)), -0.06, P.gold, 80);
      K.ribbon('STILL COUNTS', 540, 1650, R2(seg(lt, d * 0.4, d * 0.7)), 100);
      K.slip('INCOME', 540, 350, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.35, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(5) * 0.55 * 0.25, 'slam', { gain: 0.6 }); }

  // 6 · game changer: return the product after the reel → no TDS
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, box with phone travels back along a dashed route to a BRAND door/house, RETURN IT', draw(lt, d, t) {
      dayPage(10); ground(1650, M.wall2);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      person({ x: 200, y: 1650, h: 560, arm: 60, top: P.wine });
      house(850, 1250, 1.0 * R2(seg(lt, 0.05, 0.25))); K.slip('BRAND', 850, 1450, R2(seg(lt, 0.1, 0.3)), 0.04, 60);
      const f = eio(seg(lt, 0.3, 0.8)); K.dashedRoute([[320, 1100], [560, 850], [800, 1050]], eo(seg(lt, 0.25, 0.6))); box(lerp(330, 820, f), lerp(1050, 1080, f) - Math.sin(f * Math.PI) * 250, 0.5, 0);
      K.ribbon('RETURN IT', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'TDS document with crimson strike-through and a green tick, NO TDS ribbon', draw(lt, d, t) {
      dayPage(11, false);
      doc(540, 900, 1.3, 'TDS', 0, -0.03);
      strike(300, 720, 480, eo(seg(lt, 0.15, 0.35)));
      tick(780, 1200, R2(seg(lt, 0.35, 0.55)));
      K.ribbon('NO TDS', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 140);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.5, 'whoosh', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(6) * 0.55 * 0.25, 'zip', { gain: 0.5 }); cue(mid + len(6) * 0.55 * 0.45, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 7 · craziest: a free product doesn't pay rent, but your shooting + editing time is spent
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'CRAZIEST PART slip, gift tries to go into RENT house slot and bounces with crimson cross', draw(lt, d, t) {
      dayPage(12, false);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      house(540, 1000, 1.4 * R2(seg(lt, 0.05, 0.25))); K.slip('RENT', 540, 1250, R2(seg(lt, 0.1, 0.3)), 0.03, 70);
      const f = seg(lt, 0.3, 0.7); gift(lerp(200, 380, eo(f)) - (f > 0.7 ? (f - 0.7) * 400 : 0), 600 + Math.sin(f * Math.PI) * -100, 0.6, 0.2);
      tick(780, 640, R2(seg(lt, d * 0.55, d * 0.7)), false);
      K.ribbon("DOESN'T PAY RENT", 540, 1650, R2(seg(lt, d * 0.6, d * 0.85)), 84);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'laptop editing timeline + clock spinning fast, SHOOT + EDIT slips, YOUR TIME ribbon', draw(lt, d, t) {
      room(13);
      laptop(540, 1350, 1.1, () => { for (let k = 0; k < 4; k++) cut(P_rr(-270 + k * 140, -200, 120, 70, 8), [P.crimson, P.gold, P.royal, P.green][k], { shadow: 0, edge: 2 }); line([[-280, -100], [280, -100]], 'rgba(62,44,30,0.3)', 10); });
      clock(540, 600, 1.2 * R2(seg(lt, 0.05, 0.25)), t * 10);
      K.slip('SHOOT', 200, 380, R2(seg(lt, 0.15, 0.35)), -0.05, 70); K.slip('EDIT', 880, 380, R2(seg(lt, 0.3, 0.5)), 0.05, 70);
      K.ribbon('YOUR TIME', 540, 1650, R2(seg(lt, d * 0.45, d * 0.75)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.6, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(7) * 0.55 * 0.3, 'tock', { gain: 0.5 }); cue(mid + len(7) * 0.55 * 0.5, 'tock', { gain: 0.5 }); }

  // 8 · take barter only for a product you'd buy anyway
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, two gifts: one with WOULD BUY tag gets green tick, other gets crimson cross', draw(lt, d, t) {
      dayPage(14, false);
      K.slip('STEP 1', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
      gift(300, 1000, 1.1 * R2(seg(lt, 0.05, 0.25)), -0.05); gift(780, 1000, 1.1 * R2(seg(lt, 0.1, 0.3)), 0.05);
      K.slip('WOULD BUY', 300, 1150, R2(seg(lt, d * 0.25, d * 0.45)), -0.04, 56);
      tick(300, 600, R2(seg(lt, d * 0.4, d * 0.55))); tick(780, 600, R2(seg(lt, d * 0.5, d * 0.65)), false);
      K.ribbon('BARTER ONLY IF', 540, 1650, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.45, 'sparkle', { dur: 0.4, gain: 0.5 }); cue(st + len(8) * 0.55, 'thud', { gain: 0.5 }); }

  // 9 · for other deals, send your rate card and ask for money
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: 'STEP 2 slip, RATE CARD document flies out, ₹ notes come back, ASK FOR ₹ ribbon', draw(lt, d, t) {
      dayPage(15);
      K.slip('STEP 2', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
      const f = eio(seg(lt, 0.1, 0.45)); doc(lerp(300, 700, f), lerp(1000, 800, f), 0.9, 'RATE CARD', 0, lerp(-0.1, 0.05, f));
      const g = eio(seg(lt, 0.5, 0.8)); if (g > 0) { note(lerp(900, 330, g), 1250, 0.9, -0.05); note(lerp(1000, 380, g), 1330, 0.9, 0.06); }
      K.ribbon('ASK FOR ₹', 540, 1650, R2(seg(lt, d * 0.55, d * 0.85)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(9) * 0.25, 'zip', { gain: 0.5 }); cue(st + len(9) * 0.6, 'plop', { gain: 0.5 }); cue(st + len(9) * 0.7, 'slam', { gain: 0.5 }); }

  // 10 · expensive item → ask a CA first
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 3 slip, big gift with gold ₹₹₹ tag, creator talks to CA figure, ASK A CA ribbon', draw(lt, d, t) {
      dayPage(16, false); ground(1650, M.wall2);
      K.slip('STEP 3', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
      gift(540, 800, 1.0 * R2(seg(lt, 0.05, 0.25)), 0); tag('₹₹₹', 540, 480, 0.6 * R2(seg(lt, 0.2, 0.4)), -0.05, P.gold, 90);
      person({ x: 220, y: 1650, h: 580, arm: 50, top: P.wine });
      person({ x: 860, y: 1650, h: 580, arm: 50, dir: -1, top: P.ink });
      K.slip('CA', 860, 1120, R2(seg(lt, d * 0.35, d * 0.5)), 0.04, 80);
      K.ribbon('ASK A CA FIRST', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.45, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.65, 'slam', { gain: 0.5 }); }

  // 11 · loop: a free product isn't always free (beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: box + gift with FREE tag, the tag gets struck through in crimson, ? returns', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 60, top: P.wine });
      box(700, 1250, 1.0, 0, 1); gift(700, 950, 0.9, 0.05);
      tag('FREE', 700, 560, 0.8, -0.06, P.green, 90);
      strike(560, 590, 300, eo(seg(lt, d * 0.3, d * 0.5)));
      bigMark('?', 300, 450, R2(seg(lt, d * 0.5, d * 0.7)), Math.sin(t * 3) * 0.08, P.crimson, 300);
      K.ribbon('NOT ALWAYS FREE', 540, 1700, R2(seg(lt, d * 0.45, d * 0.75)), 90);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.4, 'zip', { gain: 0.6 }); cue(st + len(11) * 0.55, 'slam', { gain: 0.7 }); }

  // 12 · follow + send to the friend who gets PR packages every day
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a box flies to a friend surrounded by PR boxes who lights up, handle slip', draw(lt, d, t) {
      dayPage(17); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      box(930, 1550, 0.4, 0.05); box(950, 1460, 0.35, -0.08);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); box(lerp(240, 600, f), lerp(1250, 1200, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 0.2 * (1 - f));
      person({ x: 780, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
