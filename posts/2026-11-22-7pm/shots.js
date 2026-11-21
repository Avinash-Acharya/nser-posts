// 22 Nov 7pm: TDS ON CREATOR INCOME: WHY BRANDS DEDUCT TAX AND HOW TO CLAIM IT BACK (INDIA). Paper style.
// Facts (opened 21 Nov 2026), Income Tax Department pages "TDS on benefit or perquisite arising from business or
// profession" and "Section 194R": tax deducted at 10% of the value of the benefit/perquisite when it exceeds ₹20,000 per
// recipient in a financial year, on the full value; influencer FAQ: a product used for the service and "returned" is not
// a benefit/perquisite, a product kept is; deductor deposits the tax and issues Form 16A; the recipient "can get the
// credit of tax deducted under section 194R by furnishing its return of income".
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, gift,
  laptop, clock, wallet } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper form / document with a title and an optional crimson stamp */
function doc(x, y, s, word, stamp = 0, rot = 0, stampTxt = 'OK') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -260, 400, 520, 12), '#FFFBF0'); K.label(word, 0, -190, 56, P.ink);
  for (let k = 0; k < 5; k++) line([[-150, -100 + k * 60], [150 - (k % 2) * 60, -100 + k * 60]], 'rgba(62,44,30,0.25)', 10);
  if (stamp > 0) { ctx.save(); ctx.translate(70, 170); ctx.rotate(-0.25); ctx.scale(stamp, stamp); ctx.strokeStyle = P.crimson; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, 0, 80, 0, TAU); ctx.stroke(); K.label(stampTxt, 0, 0, 44, P.crimson); ctx.restore(); }
  ctx.restore(); }
/** a stack of rupee notes */
function cash(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (let k = 2; k >= 0; k--) cut(P_rr(-170 + k * 10, -90 - k * 14, 340, 180, 14), k ? (M.cashDark || '#7E9B6A') : (M.cash || '#A9C08E'), { shadow: 0.5, edge: 4 });
  circle(0, 0, 48, 'rgba(255,251,240,0.5)'); K.label('₹', 0, 0, 70, P.ink); ctx.restore(); }
/** a parcel box (PR package) */
function box(x, y, s, rot = 0, open = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-160, -120, 320, 240, 10), '#B98A55'); cut(P_rr(-30, -120, 60, 240, 0), '#D9B98A', { shadow: 0, edge: 0 });
  if (open > 0) { cut(P_poly([[-160, -120], [-30, -120], [-60 - 80 * open, -180 - 60 * open], [-190, -150]]), '#A9794A', { shadow: 0.4, edge: 3 }); cut(P_poly([[30, -120], [160, -120], [190, -150], [60 + 80 * open, -180 - 60 * open]]), '#A9794A', { shadow: 0.4, edge: 3 }); }
  ctx.restore(); }
/** a government building (columns + dome-less pediment) */
function govt(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-220, -200], [0, -320], [220, -200]]), P.stone); cut(P_rr(-220, -200, 440, 40, 4), P.stoneDark);
  for (let k = 0; k < 4; k++) cut(P_rr(-180 + k * 110, -160, 50, 220, 6), '#E6D8B8', { shadow: 0.4, edge: 3 });
  cut(P_rr(-240, 60, 480, 40, 4), P.stoneDark); K.label('GOVT', 0, -235, 40, P.ink); ctx.restore(); }
/** green tick / crimson cross in a circle */
function tick(x, y, k, ok = true) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 90), ok ? P.green : P.crimson);
  if (ok) line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); else { line([[-35, -35], [35, 35]], P.edge, 20); line([[35, -35], [-35, 35]], P.edge, 20); } ctx.restore(); }
/** a horizontal value bar; fill 0..1 of w; mark = x-fraction of a dashed threshold line */
function bar(x, y, w, h, fill, col, mark = -1) { cut(P_rr(x, y, w, h, 18), '#FFFBF0'); if (fill > 0) cut(P_rr(x, y, w * fill + 1, h, 18), col, { shadow: 0, edge: 3 });
  if (mark >= 0) { ctx.save(); ctx.setLineDash([14, 10]); ctx.lineWidth = 6; ctx.strokeStyle = P.ink; ctx.beginPath(); ctx.moveTo(x + w * mark, y - 40); ctx.lineTo(x + w * mark, y + h + 40); ctx.stroke(); ctx.restore(); } }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · tax on free products too? yes, it's called TDS
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator opens a PR box, crimson ₹ TAX? tag pops out, big TDS stamp', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      box(660, 1300, 1.1 * R2(seg(lt, 0.02, 0.2)), 0.03, eo(seg(lt, d * 0.15, d * 0.35)));
      K.slip('FREE PRODUCT', 660, 1550, R2(seg(lt, d * 0.1, d * 0.3)), 0.03, 60);
      bigMark('TAX?', 660, 860, R2(seg(lt, d * 0.3, d * 0.5)), -0.06, P.crimson, 200);
      K.ribbon('YES: TDS', 540, 360, R2(seg(lt, d * 0.6, d * 0.85)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(0) * 0.25, 'zip', { gain: 0.5 }); cue(st + len(0) * 0.4, 'slam', { gain: 0.6 }); cue(st + len(0) * 0.7, 'slam', { gain: 0.7 }); }

  // 1 · simply put: the payer deducts the tax and deposits it with the government
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, brand hands cash to creator; a slice of cash peels off along dashed route to govt building', draw(lt, d, t) {
      dayPage(2);
      K.slip('SIMPLY PUT', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const b = R2(seg(lt, 0.05, 0.2)); if (b > 0) { ctx.save(); ctx.translate(200, 1300); ctx.scale(b, b); cut(P_rr(-130, -380, 260, 380, 10), P.royal); cut(P_poly([[-160, -380], [160, -380], [130, -460], [-130, -460]]), P.crimson); K.label('BRAND', 0, -300, 50, P.parch); ctx.restore(); }
      person({ x: 860, y: 1300, h: 480, arm: 40, dir: -1, top: M.tee });
      const f = eo(seg(lt, 0.15, 0.45)); cash(lerp(260, 700, f), 1000, 0.6 * R2(seg(lt, 0.1, 0.2)), 0);
      govt(540, 640, 0.8 * R2(seg(lt, d * 0.45, d * 0.6)));
      const g = eo(seg(lt, d * 0.55, d * 0.85)); K.dashedRoute([[400, 1000], [450, 820], [540, 740]], g); if (g > 0) cash(lerp(400, 540, g), lerp(1000, 770, g), 0.3, 0.2);
      K.ribbon('CUT + DEPOSIT', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(1) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(1) * 0.55, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.75, 'slam', { gain: 0.6 }); }

  // 2 · above ₹20,000 of free products/benefits from one brand in a year → 10% TDS
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'ONE BRAND, 1 YEAR slips, boxes stack up, value bar fills past the dashed ₹20,000 line', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('1 BRAND · 1 YEAR', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 62);
      for (let k = 0; k < 4; k++) box(240 + k * 200, 760 - (k % 2) * 40, 0.55 * R2(seg(lt, 0.1 + k * 0.1, 0.25 + k * 0.1)), 0.04 * (k - 1.5), 0);
      bar(140, 1060, 800, 100, 0.85 * eo(seg(lt, 0.2, 0.8)), P.gold, 0.6);
      bigMark('₹20,000', 620, 1330, R2(seg(lt, 0.35, 0.55)), -0.03, P.gold, 140);
      K.ribbon('MORE THAN', 540, 1620, R2(seg(lt, d * 0.55, d * 0.85)), 120);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'big crimson 10% slams, TDS slip, govt building small behind', draw(lt, d, t) {
      dayPage(4);
      govt(820, 560, 0.6 * R2(seg(lt, 0.02, 0.2)));
      bigMark('10%', 460, 900, R2(seg(lt, 0.1, 0.3)), -0.05, P.crimson, 420);
      K.ribbon('TDS', 540, 1500, R2(seg(lt, 0.35, 0.6)), 150);
    } });
    cue(st, 'whoosh'); [0.15, 0.25, 0.35, 0.45].forEach((a) => cue(st + d2 * 0.5 * a, 'pop', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + len(2) * 0.5 * 0.2, 'slam', { gain: 0.8 }); }

  // 3 · on the full value, not just the part above 20,000
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'value bar: first only the part beyond the line glows (crossed out), then the whole bar glows crimson: FULL VALUE', draw(lt, d, t) {
      dayPage(5, false);
      const ph = lt > d * 0.45;
      bar(140, 800, 800, 120, 0.85, P.gold, 0.6);
      if (!ph) { cut(P_rr(140 + 480, 800, 800 * 0.25, 120, 0), P.wine, { shadow: 0, edge: 3 }); K.slip('ONLY ABOVE?', 740, 600, R2(seg(lt, 0.05, 0.2)), 0.04, 58); bigMark('X', 740, 860, R2(seg(lt, d * 0.25, d * 0.4)), 0, P.crimson, 260); }
      else { cut(P_rr(140, 800, 800 * 0.85, 120, 18), P.crimson, { shadow: 0, edge: 3 }); K.label('10%', 500, 866, 80, P.parch); tick(540, 1180, R2(seg(lt, d * 0.5, d * 0.65))); }
      K.ribbon('FULL VALUE', 540, 1600, R2(seg(lt, d * 0.5, d * 0.8)), 130);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.3, 'thud', { gain: 0.6 }); cue(st + len(3) * 0.48, 'zip', { gain: 0.5 }); cue(st + len(3) * 0.6, 'slam', { gain: 0.7 }); }

  // 4 · you: one brand sent ₹30,000 of products in a year → ₹3,000 TDS
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator with three boxes piling up, gold ₹30,000 tag', draw(lt, d, t) {
      room(6);
      K.slip('YOU', 160, 280, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      person({ x: 230, y: 1650, h: 640, arm: 50, top: M.tee });
      [[680, 1300], [680, 1060], [690, 820]].forEach(([x, y], k) => box(x, y, 0.75 * R2(seg(lt, 0.1 + k * 0.12, 0.25 + k * 0.12)), 0.04 * (k - 1), 0));
      bigMark('₹30,000', 600, 480, R2(seg(lt, d * 0.5, d * 0.7)), -0.04, P.gold, 160);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: '₹30,000 × 10% = big crimson ₹3,000, cash stack', draw(lt, d, t) {
      dayPage(7, false);
      K.slip('₹30,000 × 10%', 540, 360, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
      bigMark('=', 540, 620, R2(seg(lt, 0.15, 0.3)), 0, P.ink, 200);
      bigMark('₹3,000', 540, 900, R2(seg(lt, 0.25, 0.45)), -0.04, P.crimson, 230);
      cash(540, 1250, 0.9 * R2(seg(lt, 0.4, 0.55)), 0.05);
      K.ribbon('TDS', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 150);
    } });
    cue(st, 'whoosh'); [0.2, 0.32, 0.44].forEach((a) => cue(st + d4 * 0.5 * a, 'thud', { gain: 0.45 })); cue(mid, 'whoosh'); cue(mid + len(4) * 0.5 * 0.35, 'slam', { gain: 0.8 }); }

  // 5 · brand deposits the tax and gives you Form 16A
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'cash flies into govt building, then FORM 16A document slides to the creator, stamped', draw(lt, d, t) {
      dayPage(8);
      govt(300, 620, 0.75 * R2(seg(lt, 0.02, 0.18)));
      const f = eo(seg(lt, 0.05, 0.35)); if (f < 1) cash(lerp(800, 320, f), lerp(1000, 650, f), 0.5 * (1 - 0.6 * f), 0);
      K.slip('DEPOSITED', 300, 920, R2(seg(lt, 0.3, 0.42)), -0.04, 58);
      person({ x: 860, y: 1650, h: 520, arm: 50, dir: -1, top: M.tee });
      const g = eo(seg(lt, d * 0.45, d * 0.7)); doc(lerp(240, 560, g), lerp(1400, 1150, g), 0.65 * R2(seg(lt, d * 0.4, d * 0.55)), 'FORM 16A', R2(seg(lt, d * 0.7, d * 0.85)), 0.05 * (1 - g));
      K.ribbon('YOU GET FORM 16A', 540, 1760, R2(seg(lt, d * 0.65, d * 0.95)), 84);
    } });
    cue(st, 'whoosh'); cue(st + len(5) * 0.3, 'thud', { gain: 0.5 }); cue(st + len(5) * 0.5, 'zip', { gain: 0.5 }); cue(st + len(5) * 0.75, 'slam', { gain: 0.6 }); }

  // 6 · game changer: use the product and return it → not a benefit
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, box travels back along dashed route to brand shop, crimson NOT A BENEFIT, green tick', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('GAME CHANGER', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      person({ x: 220, y: 1250, h: 500, arm: 50, top: M.tee });
      const b = R2(seg(lt, 0.05, 0.2)); if (b > 0) { ctx.save(); ctx.translate(850, 1250); ctx.scale(b, b); cut(P_rr(-130, -380, 260, 380, 10), P.royal); cut(P_poly([[-160, -380], [160, -380], [130, -460], [-130, -460]]), P.crimson); K.label('BRAND', 0, -300, 50, P.parch); ctx.restore(); }
      K.dashedRoute([[330, 1000], [540, 850], [740, 1000]], eo(seg(lt, 0.2, 0.45)));
      const f = eio(seg(lt, 0.3, 0.6)); box(lerp(340, 760, f), lerp(1100, 1050, f) - Math.sin(f * Math.PI) * 220, 0.5, 0.1 * Math.sin(f * 6), 0);
      K.slip('USED + RETURNED', 540, 520, R2(seg(lt, 0.25, 0.4)), 0.03, 60);
      tick(540, 1420, R2(seg(lt, d * 0.6, d * 0.75)));
      K.ribbon('NOT A BENEFIT', 540, 1650, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(6) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(6) * 0.6, 'thud', { gain: 0.5 }); cue(st + len(6) * 0.7, 'slam', { gain: 0.7 }); }

  // 7 · but keep it → TDS applies
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.14, note: 'creator hugs the box at home, crimson 10% tag stamps onto it, KEPT = TDS ribbon', draw(lt, d, t) {
      room(10);
      person({ x: 360, y: 1650, h: 640, arm: 30, top: M.tee });
      box(560, 1180, 0.8 * R2(seg(lt, 0.02, 0.2)), -0.04, 0);
      K.slip('KEPT IT', 760, 520, R2(seg(lt, 0.1, 0.3)), 0.04, 70);
      bigMark('10%', 760, 820, R2(seg(lt, 0.35, 0.55)), 0.06, P.crimson, 220);
      K.ribbon('KEPT = TDS', 540, 1720, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(7) * 0.2, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.45, 'slam', { gain: 0.7 }); }

  // 8 · most important: deducted tax = credit in your name, but only when you file ITR
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.5;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: 'MOST IMPORTANT slip, ₹3,000 cash goes into a wallet labelled YOUR CREDIT', draw(lt, d, t) {
      dayPage(11);
      K.slip('MOST IMPORTANT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      wallet(540, 1000, 1.1 * R2(seg(lt, 0.05, 0.25)), eo(seg(lt, 0.2, 0.4)));
      const f = eo(seg(lt, 0.25, 0.55)); if (f < 1) cash(540, lerp(500, 900, f), 0.6 * (1 - 0.5 * f), 0.1);
      bigMark('₹3,000', 540, 620, R2(seg(lt, 0.5, 0.65)), -0.04, P.gold, 160);
      K.ribbon('YOUR CREDIT', 540, 1600, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.14, note: 'wallet locked behind a crimson ITR padlock-like doc; laptop shows ITR, ONLY IF YOU FILE ribbon', draw(lt, d, t) {
      nightPage(12);
      laptop(540, 1150, 1.0 * R2(seg(lt, 0.02, 0.2)), () => { cut(P_rr(-260, -380, 520, 320, 10), P.sky, { shadow: 0, edge: 0 }); K.label('ITR', 0, -220, 110, P.crimson); });
      K.slip('ONLY WHEN', 540, 360, R2(seg(lt, 0.1, 0.3)), -0.03, 70);
      K.ribbon('YOU FILE ITR', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d8 * 0.5 * 0.45, 'plop', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(8) * 0.5 * 0.5, 'slam', { gain: 0.7 }); }

  // 9 · so: ask every brand for Form 16A and keep it safe
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, three FORM 16A docs fan into a folder, ASK EVERY BRAND ribbon', draw(lt, d, t) {
      dayPage(13, false);
      K.slip('STEP 1', 200, 280, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      bubble('Form 16A please?', 300, 470, R2(seg(lt, 0.1, 0.3)), false, 54);
      [[340, -0.1], [540, 0], [740, 0.1]].forEach(([x, r], k) => doc(x, 950, 0.6 * R2(seg(lt, d * (0.1 + k * 0.1), d * (0.25 + k * 0.1))), '16A', 0, r));
      K.ribbon('ASK + KEEP SAFE', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); [0.35, 0.47, 0.59].forEach((a) => cue(st + len(9) * a, 'pop', { gain: 0.45 })); cue(st + len(9) * 0.75, 'slam', { gain: 0.6 }); }

  // 10 · at year end, file ITR and claim the credit
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 2 slip, timeline to YEAR END, laptop ITR doc gets OK stamp, CLAIM CREDIT ribbon', draw(lt, d, t) {
      dayPage(14);
      K.slip('STEP 2', 200, 280, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      K.timeline(['APR', 'YEAR END'], 160, 520, 760, eo(seg(lt, 0.05, 0.4)), lt > d * 0.35 ? 1 : 0);
      doc(540, 1000, 0.85 * R2(seg(lt, d * 0.12, d * 0.3)), 'ITR', R2(seg(lt, d * 0.55, d * 0.7)), -0.03, 'FILED');
      K.ribbon('CLAIM THE CREDIT', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 96);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.65, 'thud', { gain: 0.7 }); cue(st + len(10) * 0.8, 'slam', { gain: 0.6 }); }

  // 11 · loop: the tax was deducted, not lost (beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: creator with PR box, ₹ cash returns into hand glowing, CUT ≠ LOST ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 70, top: M.tee, glow: eo(seg(lt, 0.3, 0.8)) });
      box(660, 1300, 1.0, 0.03, 1);
      const f = eo(seg(lt, 0.1, 0.5)); cash(lerp(800, 380, f), lerp(500, 900, f), 0.6, 0.1 * (1 - f));
      K.ribbon('CUT, NOT LOST', 540, 360, R2(seg(lt, 0.3, 0.6)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(11) * 0.5, 'slam', { gain: 0.7 }); }

  // 12 · follow + send to the friend who gets PR packages every day
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, PR boxes pile beside a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      [[300, 1520], [300, 1360], [460, 1520]].forEach(([x, y], k) => box(x, y, 0.45 * R2(seg(lt, d * (0.3 + k * 0.1), d * (0.45 + k * 0.1))), 0.05 * (k - 1), 0));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
