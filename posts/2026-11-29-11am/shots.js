// 29 Nov 11am: INVOICES FOR BRAND DEALS IN INDIA: WHAT TO PUT ON ONE. Paper style.
// Facts (opened 28 Nov 2026): CGST Rules, Rule 46 "Tax invoice" (CBIC tax information portal): a tax invoice is issued by
// the registered person and must have the supplier's name, address and GSTIN; a consecutive serial number "not exceeding
// sixteen characters", "unique for a financial year"; date of issue; the recipient's name, address and GSTIN; HSN code for
// goods or services; description; taxable value; rate and amount of tax; place of supply with the state name for
// inter-state supply; signature (not needed for an electronic invoice). GST Council flyer "Tax Invoice and other such
// instruments": an invoice issued after the service must be issued "within the specified period of 30 days from the date
// of supply of service". The missing-details bill and the template / same-day / CA tips are nser's generic advice.
// No real person, no logos, no real brand.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, bigMark, rankCard, strike, magnifier, laptop, note, coins, pin } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper invoice sheet; rows = [[text, hot]] shown one by one as p goes 0..1; head = top title */
function invoice(x, y, s, rot = 0, rows = [], p = 1, head = 'INVOICE') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-300, -400, 600, 800, 12), '#FFFBF0'); cut(P_rr(-300, -400, 600, 120, 12), P.royal, { shadow: 0, edge: 0 });
  K.label(head, 0, -338, 62, P.edge);
  const n = rows.length; rows.forEach(([txt, hot], k) => { const q = clamp(p * n - k); if (q <= 0) return; const yy = -220 + k * (560 / Math.max(n, 1));
    ctx.save(); ctx.globalAlpha = q; if (txt) K.label(txt, 0, yy, txt.length > 14 ? 46 : 58, hot ? P.crimson : P.ink); else line([[-220, yy], [220 * (2 * q - 1), yy]], 'rgba(62,44,30,0.3)', 12); ctx.restore(); });
  ctx.restore(); }
/** a stamp that slams in */
function stamp(text, x, y, p, rot = -0.08, col = P.crimson, w = 520, size = 76) { const sc = p <= 0 ? 0 : lerp(2.2, 1, eo(p)); if (!sc) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); cut(P_rr(-w / 2, -70, w, 140, 14), col); K.label(text, 0, 6, size, P.edge); ctx.restore(); }
/** a desk calendar page with a big number */
function calPage(x, y, s, num, sub, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -220, 400, 440, 16), '#FFFBF0'); cut(P_rr(-200, -220, 400, 110, 16), P.crimson, { shadow: 0, edge: 0 });
  [-110, 110].forEach((cx) => circle(cx, -220, 16, P.ink)); K.label(String(num), 0, 40, 190, P.ink); K.label(sub, 0, 170, 44, P.sepia); ctx.restore(); }
/** a little paper building (the brand) */
function office(x, y, s, col = P.stone) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-150, -420, 300, 420, 8), col); for (let r = 0; r < 4; r++) for (let c = 0; c < 3; c++) cut(P_rr(-110 + c * 80, -380 + r * 90, 60, 60, 4), '#F3E9D2', { shadow: 0, edge: 2 });
  ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);
  const chat = (lt, d) => () => { K.label('BRAND', 0, -300, 46, P.ink); bubble('Send invoice', -170, -150, R2(seg(lt, d * 0.05, d * 0.2)), false, 48); bubble('OK!', 150, 0, R2(seg(lt, d * 0.25, d * 0.4)), true, 44); };

  // 0 · brand says send the invoice; what do I write on it?
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'phone: brand DM "Send the invoice", you reply OK!', draw(lt, d, t) {
      room(1);
      phoneBig(540, 900, 1.25 * R2(seg(lt, 0.02, 0.2)), -0.03, chat(lt, d));
      K.slip('BRAND DEAL', 540, 300, R2(seg(lt, d * 0.4, d * 0.6)), -0.03, 64);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a blank invoice sheet, creator scratching head, gold ? : WHAT TO WRITE?', draw(lt, d, t) {
      dayPage(2);
      invoice(640, 820, 0.95 * R2(seg(lt, 0.02, 0.2)), 0.04, [['', 0], ['', 0], ['', 0]], 0);
      bigMark('?', 640, 860, R2(seg(lt, d * 0.25, d * 0.4)), 0.06 * Math.sin(t * 3), P.gold, 340);
      person({ x: 170, y: 1600, h: 560, arm: 120 + 20 * Math.sin(t * 6), top: M.tee, glow: 0 });
      K.ribbon('WHAT TO WRITE?', 540, 1480, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.1, 'plop', { gain: 0.4 }); cue(st + d0 * 0.5 * 0.3, 'plop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'pop', { gain: 0.6 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.8 }); }

  // 1 · simply put: a one-page bill: who, what work, how much, when
  { const st = cs(1), d1 = len(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.14, note: 'SIMPLY PUT slip, invoice fills WHO / WHAT / ₹ HOW MUCH / WHEN rows', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 230, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      invoice(540, 900, 1.0 * R2(seg(lt, 0.05, 0.22)), -0.02, [['WHO', 0], ['WHAT WORK', 0], ['₹ HOW MUCH', 1], ['WHEN', 0]], seg(lt, d * 0.2, d * 0.85));
      K.ribbon('ONE PAGE', 540, 1480, R2(seg(lt, d * 0.75, d * 0.95)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.25, 0.4, 0.55, 0.7].forEach((a) => cue(st + d1 * a, 'slide', { gain: 0.35 })); cue(st + d1 * 0.8, 'slam', { gain: 0.6 }); }

  // 2 · GST registered → Rule 46 lists what a tax invoice must have
  { const st = cs(2), d2 = len(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'GST REGISTERED slip, a law book page RULE 46 opens, TAX INVOICE ribbon', draw(lt, d, t) {
      room(4);
      K.slip('GST REGISTERED?', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const o = eo(seg(lt, d * 0.15, d * 0.45)); ctx.save(); ctx.translate(540, 820);
      cut(P_rr(-380, -260, 380, 520, 10), P.wine); ctx.save(); ctx.scale(lerp(-1, 1, o), 1); cut(P_rr(0, -260, 380, 520, 10), o < 0.5 ? P.wine : '#FFFBF0'); ctx.restore();
      if (o > 0.6) { ctx.globalAlpha = clamp((o - 0.6) * 3); K.label('RULE', 190, -100, 64, P.ink); K.label('46', 190, 40, 170, P.crimson); }
      ctx.globalAlpha = 1; K.label('CGST', -190, 0, 60, P.edge); ctx.restore();
      K.ribbon('TAX INVOICE', 540, 1380, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.2, 'slide', { gain: 0.4, dur: 0.6 }); cue(st + len(2) * 0.45, 'thud', { gain: 0.6 }); cue(st + len(2) * 0.6, 'slam', { gain: 0.8 }); }

  // 3 · invoice number up to 16 characters, unique each financial year
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.5;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'INVOICE NO. slip, a number tag types itself INV/26-27/001, gold 16 MAX', draw(lt, d, t) {
      dayPage(5);
      K.slip('INVOICE NO.', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const s = 'INV/26-27/001', n = Math.floor(s.length * clamp(seg(lt, d * 0.1, d * 0.6)));
      cut(P_rr(110, 620, 860, 180, 20), '#FFFBF0'); K.label(s.slice(0, n), 540, 714, 84, P.ink);
      bigMark('16', 540, 1100, R2(seg(lt, d * 0.55, d * 0.7)), -0.03, P.gold, 260); K.label('CHARACTERS MAX', 540, 1300, 52, P.ink);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.16, note: 'timeline FY 26-27 with 001 002 003 tags in a row, UNIQUE ribbon', draw(lt, d, t) {
      nightPage(6);
      K.slip('EACH FINANCIAL YEAR', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 60);
      ['001', '002', '003'].forEach((s, k) => { const sc = R2(seg(lt, d * (0.1 + k * 0.12), d * (0.25 + k * 0.12))); if (sc <= 0) return; ctx.save(); ctx.translate(220 + k * 320, 800); ctx.rotate((k - 1) * 0.05); ctx.scale(sc, sc); cut(P_rr(-130, -90, 260, 180, 16), k === 2 ? P.gold : '#FFFBF0'); K.label(s, 0, 6, 80, P.ink); ctx.restore(); });
      K.dashedRoute([[220, 960], [860, 960]], seg(lt, d * 0.2, d * 0.6));
      K.ribbon('UNIQUE', 540, 1350, R2(seg(lt, d * 0.6, d * 0.9)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); for (let k = 0; k < 6; k++) cue(st + d3 * 0.5 * (0.1 + k * 0.08), 'tock', { gain: 0.3 }); cue(st + d3 * 0.5 * 0.6, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); [0.1, 0.22, 0.34].forEach((a) => cue(mid + d3 * 0.5 * a, 'pop', { gain: 0.4 })); cue(mid + d3 * 0.5 * 0.65, 'slam', { gain: 0.8 }); }

  // 4 · you: reel delivered, but no number, no date, no brand address
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.4;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you at a laptop: REEL DELIVERED tick', draw(lt, d, t) {
      room(7);
      laptop(560, 900, 1.15 * R2(seg(lt, 0.02, 0.2)), () => { cut(P_rr(-200, -380, 400, 300, 14), P.sea, { shadow: 0, edge: 2 }); cut(P_poly([[-40, -290], [-40, -170], [60, -230]]), P.edge, { shadow: 0.3, edge: 0 }); });
      bigMark('✓', 860, 420, R2(seg(lt, d * 0.4, d * 0.6)), -0.1, P.gold, 240);
      person({ x: 170, y: 1650, h: 560, arm: 70, top: M.tee, glow: 0.6 });
      K.slip('REEL DELIVERED', 600, 1200, R2(seg(lt, d * 0.5, d * 0.75)), 0.03, 64);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a messy bill: NO NUMBER / NO DATE / NO ADDRESS crimson crosses', draw(lt, d, t) {
      dayPage(8);
      invoice(540, 820, 1.0 * R2(seg(lt, 0.02, 0.2)), 0.03, [['NO NUMBER', 1], ['NO DATE', 1], ['NO ADDRESS', 1]], seg(lt, d * 0.1, d * 0.75), 'BILL');
      bigMark('✕', 860, 1220, R2(seg(lt, d * 0.75, d * 0.9)), 0.1, P.crimson, 260);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.4 * 0.45, 'sparkle', { gain: 0.6 }); cue(mid, 'whoosh'); [0.15, 0.35, 0.55].forEach((a) => cue(mid + d4 * 0.6 * a, 'thud', { gain: 0.5 })); cue(mid + d4 * 0.6 * 0.8, 'slam', { gain: 0.8 }); }

  // 5 · your name, address, GSTIN; then the brand's name, address, GSTIN
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU column: person + slips NAME / ADDRESS / GSTIN', draw(lt, d, t) {
      dayPage(9);
      K.slip('YOU', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      person({ x: 250, y: 1450, h: 700, arm: 60, top: M.tee, glow: 0.7 });
      ['NAME', 'ADDRESS', 'GSTIN'].forEach((s, k) => K.slip(s, 720, 600 + k * 220, R2(seg(lt, d * (0.2 + k * 0.18), d * (0.35 + k * 0.18))), (k - 1) * 0.03, 64));
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'BRAND column: paper office building + slips NAME / ADDRESS / GSTIN (GSTIN crimson ribbon)', draw(lt, d, t) {
      room(10);
      K.slip('THE BRAND', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      office(280, 1400, 1.4 * R2(seg(lt, 0.02, 0.22)), P.stone);
      ['NAME', 'ADDRESS'].forEach((s, k) => K.slip(s, 760, 620 + k * 240, R2(seg(lt, d * (0.2 + k * 0.18), d * (0.35 + k * 0.18))), (k - 1) * 0.03, 64));
      K.ribbon('GSTIN', 760, 1150, R2(seg(lt, d * 0.6, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.2, 0.38, 0.56].forEach((a) => cue(st + d5 * 0.45 * a, 'pop', { gain: 0.4 })); cue(mid, 'whoosh'); [0.2, 0.38].forEach((a) => cue(mid + d5 * 0.55 * a, 'pop', { gain: 0.4 })); cue(mid + d5 * 0.55 * 0.62, 'slam', { gain: 0.7 }); }

  // 6 · game changer: description, service code, taxable value, GST rate + amount
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, invoice rows 1 REEL + 3 STORIES / SERVICE CODE fill in', draw(lt, d, t) {
      dayPage(11);
      K.slip('GAME CHANGER', 540, 230, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      invoice(540, 920, 1.0 * R2(seg(lt, 0.05, 0.22)), -0.02, [['1 REEL + 3 STORIES', 0], ['SERVICE CODE', 0], ['', 0]], seg(lt, d * 0.2, d * 0.8), 'WORK');
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'two bars: TAXABLE VALUE (stone) + GST RATE / AMOUNT (gold %), coins', draw(lt, d, t) {
      nightPage(12);
      cut(P_rr(100, 420, 880, 220, 20), '#FFFBF0'); K.label('TAXABLE VALUE', 540, 490, 56, P.ink); K.label('₹ ____', 540, 580, 60, P.sepia);
      const g = R2(seg(lt, d * 0.3, d * 0.5)); if (g > 0) { ctx.save(); ctx.translate(540, 860); ctx.scale(g, g); cut(P_rr(-440, -110, 880, 220, 20), P.gold); K.label('GST RATE + AMOUNT', 0, 6, 60, P.edge); ctx.restore(); }
      bigMark('%', 800, 1250, R2(seg(lt, d * 0.55, d * 0.7)), 0.06, P.crimson, 300);
      coins(300, 1420, 1.2 * R2(seg(lt, d * 0.5, d * 0.7)), 5);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.5].forEach((a) => cue(st + d6 * 0.45 * a, 'slide', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.15, 'pop', { gain: 0.5 }); cue(mid + d6 * 0.55 * 0.4, 'slam', { gain: 0.7 }); cue(mid + d6 * 0.55 * 0.6, 'plop', { gain: 0.5 }); }

  // 7 · craziest: limit to send the invoice after the service: 30 days
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, reel card → dashed route → invoice, a clock', draw(lt, d, t) {
      dayPage(13);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      K.slip('SERVICE', 240, 640, R2(seg(lt, d * 0.1, d * 0.25)), -0.04, 56);
      K.dashedRoute([[240, 760], [540, 900], [840, 760]], seg(lt, d * 0.2, d * 0.7));
      invoice(840, 1150, 0.55 * R2(seg(lt, d * 0.55, d * 0.75)), 0.05, [['', 0], ['', 0]], 1);
      K.slip('INVOICE', 840, 640, R2(seg(lt, d * 0.6, d * 0.8)), 0.04, 56);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a desk calendar page 30 DAYS, gold LIMIT ribbon', draw(lt, d, t) {
      room(14);
      calPage(540, 800, 1.3 * R2(seg(lt, 0.02, 0.22)), Math.round(lerp(1, 30, eo(seg(lt, d * 0.1, d * 0.5)))), 'DAYS', -0.03);
      K.ribbon('30 DAY LIMIT', 540, 1400, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.2, 'zip', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.6, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); for (let k = 0; k < 5; k++) cue(mid + d7 * 0.55 * (0.1 + k * 0.08), 'tock', { gain: 0.3 }); cue(mid + d7 * 0.55 * 0.6, 'slam', { gain: 0.8 }); }

  // 8 · brand in another state → write state name in place of supply
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'India map: pin YOU in one state, pin BRAND in another, dashed route, PLACE OF SUPPLY ribbon', draw(lt, d, t) {
      K.parchment(15);
      cut(P_rr(120, 420, 840, 860, 30), P.land, { shadow: 1, edge: 7 });
      ctx.save(); ctx.setLineDash([20, 16]); line([[540, 420], [540, 1280]], 'rgba(62,44,30,0.45)', 6); ctx.restore();
      K.label('STATE A', 330, 500, 46, P.sepia); K.label('STATE B', 750, 500, 46, P.sepia);
      pin(330, 900, R2(seg(lt, d * 0.05, d * 0.2)), P.royal); K.slip('YOU', 330, 980, R2(seg(lt, d * 0.1, d * 0.25)), -0.03, 50);
      pin(750, 900, R2(seg(lt, d * 0.2, d * 0.35)), P.crimson); K.slip('BRAND', 750, 980, R2(seg(lt, d * 0.25, d * 0.4)), 0.03, 50);
      K.dashedRoute([[330, 780], [540, 700], [750, 780]], seg(lt, d * 0.3, d * 0.6));
      K.ribbon('PLACE OF SUPPLY', 540, 1450, R2(seg(lt, d * 0.6, d * 0.9)), 88);
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.1, 'plop', { gain: 0.5 }); cue(st + len(8) * 0.25, 'plop', { gain: 0.5 }); cue(st + len(8) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(8) * 0.7, 'slam', { gain: 0.8 }); }

  // 9 · step 1: one template, numbers in one series
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: '1 ONE TEMPLATE card, three invoice copies stack out of one, 001 002 003', draw(lt, d, t) {
      dayPage(16);
      rankCard(1, 'ONE TEMPLATE', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 640);
      [0, 1, 2].forEach((k) => { const f = eo(seg(lt, d * (0.2 + k * 0.15), d * (0.4 + k * 0.15))); invoice(lerp(540, 240 + k * 300, f), 900, 0.48 * R2(seg(lt, d * 0.1, d * 0.25)), (k - 1) * 0.06, [['00' + (k + 1), k === 2 ? 1 : 0], ['', 0], ['', 0]], 1); });
      K.ribbon('ONE SERIES', 540, 1400, R2(seg(lt, d * 0.7, d * 0.95)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.25, 0.4, 0.55].forEach((a) => cue(st + len(9) * a, 'slide', { gain: 0.35, dur: 0.3 })); cue(st + len(9) * 0.75, 'slam', { gain: 0.6 }); }

  // 10 · step 2: send it on delivery day; GST doubt → ask a CA
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.5;
    add({ id: 'S10a', at: st, cam: [540, 960], zoom: 0.12, note: '2 SAME DAY card: an invoice flies (dashed route) from the laptop to the brand building, DELIVERY DAY calendar', draw(lt, d, t) {
      room(17);
      rankCard(2, 'SAME DAY', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 560);
      calPage(260, 760, 0.8 * R2(seg(lt, 0.05, 0.2)), 'D', 'DELIVERY', -0.04);
      office(820, 1300, 1.0 * R2(seg(lt, 0.1, 0.25)), P.stone);
      const f = eio(seg(lt, d * 0.3, d * 0.8)); K.dashedRoute([[300, 1100], [560, 900], [800, 1000]], f);
      invoice(lerp(300, 800, f), lerp(1100, 1000, f) - 200 * Math.sin(f * Math.PI), 0.3 * R2(seg(lt, d * 0.25, d * 0.35)), f * 0.6, [['', 0]], 1);
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.16, note: 'GST doubt: creator with ? bubble, a CA figure with a ledger: ASK A CA ribbon', draw(lt, d, t) {
      dayPage(18);
      person({ x: 260, y: 1450, h: 620, arm: 60, top: M.tee, glow: 0.4 });
      bubble('GST?', 250, 560, R2(seg(lt, d * 0.1, d * 0.25)), false, 70);
      person({ x: 800, y: 1450, h: 640, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.35, d * 0.6)) });
      K.slip('CA', 800, 650, R2(seg(lt, d * 0.3, d * 0.45)), 0.03, 80);
      K.ribbon('ASK A CA', 540, 1620, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d10 * 0.5 * 0.3, 'whoosh', { gain: 0.5 }); cue(st + d10 * 0.5 * 0.8, 'sparkle', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d10 * 0.5 * 0.15, 'pop', { gain: 0.5 }); cue(mid + d10 * 0.5 * 0.4, 'sparkle', { gain: 0.5 }); cue(mid + d10 * 0.5 * 0.65, 'slam', { gain: 0.7 }); }

  // 11 · loop: what to write on an invoice? now you know (back to beat-0 phone)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: full invoice sheet with ticks, SENT ✓ stamp, NOW YOU KNOW ribbon', draw(lt, d, t) {
      room(1);
      invoice(540, 820, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.02, [['NO. + DATE', 0], ['YOU + BRAND', 0], ['WORK + CODE', 0], ['VALUE + GST', 1]], seg(lt, d * 0.05, d * 0.5));
      stamp('SENT ✓', 780, 1150, seg(lt, d * 0.5, d * 0.65), -0.1, P.forest, 360, 70);
      K.ribbon('NOW YOU KNOW', 540, 1480, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); [0.1, 0.2, 0.3, 0.4].forEach((a) => cue(st + len(11) * a, 'tock', { gain: 0.4 })); cue(st + len(11) * 0.55, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend whose first brand payment is on the way
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a ₹ note arriving, handle slip', draw(lt, d, t) {
      dayPage(20); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      note(300, lerp(1050, 1200, eo(seg(lt, d * 0.3, d * 0.6))), 1.0 * R2(seg(lt, d * 0.3, d * 0.45)), -0.1);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'plop', { gain: 0.4 }); }

  return { shots: S, cues: CUES };
}
