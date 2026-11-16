// 17 Nov 7pm: HOW INDIAN CREATORS PRICE A BRAND DEAL (RATE CARD BASICS). Paper style.
// Facts: Kofluence 2025 report sneak peek (Jun 2025); Boss Wallah micro-influencer rates (Aug 2026); Social Samosa (Sep 2025).
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, note, coins, wallet, bigMark,
  hand, rankCard, strike, stringLights } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper rate card: title + rows [label, price]; rv = how many rows are filled in */
function rateCard(x, y, s, rot = 0, prices = ['₹ ?', '₹ ?', '₹ ?'], rv = 3, hl = -1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-260, -330, 520, 660, 18), '#FFFBF0'); K.label('RATE CARD', 0, -250, 58, P.crimson); line([[-200, -200], [200, -200]], P.sepia, 5);
  ['Reel', 'Story', 'Post'].forEach((w, k) => { const yy = -110 + k * 150; if (k === hl) { rr(-235, yy - 60, 470, 120, 12); ctx.fillStyle = 'rgba(200,149,47,0.3)'; ctx.fill(); }
    ctx.font = '700 60px Caladea'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = P.ink; ctx.fillText(w, -210, yy);
    if (k < rv) { ctx.textAlign = 'right'; ctx.fillStyle = P.gold; ctx.fillText(prices[k], 210, yy); } });
  ctx.restore(); }
/** a paper eye (views) */
function eye(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(-200, 0); ctx.quadraticCurveTo(0, -170, 200, 0); ctx.quadraticCurveTo(0, 170, -200, 0); ctx.closePath(); }, '#FFFBF0');
  cut(P_circ(0, 0, 80), P.royal, { shadow: 0.3, edge: 4 }); circle(0, 0, 36, P.ink); circle(22, -22, 14, '#F7EFDC'); ctx.restore(); }
/** a little oil lamp (diya) */
function diya(x, y, s, t) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(-80, 0); ctx.quadraticCurveTo(0, 90, 80, 0); ctx.closePath(); }, '#B5652F');
  const f = 1 + Math.sin(t * 10) * 0.08; ctx.save(); ctx.scale(f, f); ctx.beginPath(); ctx.moveTo(0, -80); ctx.quadraticCurveTo(30, -20, 0, -4); ctx.quadraticCurveTo(-30, -20, 0, -80); ctx.fillStyle = '#F2C14E'; ctx.fill(); ctx.restore(); ctx.restore(); }
/** an AD tag */
function adTag(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-80, -40, 160, 80, 16), P.gold, { shadow: 0.5, edge: 3 }); K.label('AD', 0, 2, 52, P.ink); ctx.restore(); }
/** a tick in a circle */
function tick(x, y, sc) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_circ(0, 0, 70), P.green); line([[-32, 0], [-8, 26], [36, -26]], P.edge, 16); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · a brand asks your rate, you go silent: phone DM bubble, creator frozen, "..." bubble, big ?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator (blue) holding phone, brand bubble "What\'s your rate?", your bubble "...", big ? , YOUR RATE? ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 300, y: 1650, h: 680, arm: 70, top: P.royal, glow: 0.7 });
      bubble("What's your rate?", 220, 480, R2(seg(lt, 0.05, 0.3)), false, 64);
      bubble('...', 420, 860, R2(seg(lt, d * 0.5, d * 0.7)), true, 80);
      bigMark('?', 820, 1150, R2(seg(lt, d * 0.6, d * 0.8)), Math.sin(t * 3) * 0.12, P.crimson, 300);
      K.ribbon('YOUR RATE?', 540, 1780, R2(seg(lt, d * 0.3, d * 0.6)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'plop', { gain: 0.6 }); cue(st + len(0) * 0.5, 'pop', { gain: 0.4 }); cue(st + len(0) * 0.65, 'boing', { gain: 0.4 }); }

  // 1 · simply put, a rate card: one page, reel / story / post
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'a RATE CARD sheet drops in, rows Reel / Story / Post highlight one by one, ONE PAGE ribbon', draw(lt, d, t) {
      dayPage(2, false);
      rateCard(540, lerp(-400, 960, eo(seg(lt, 0, 0.3))), 1.25, -0.02, undefined, 3, lt < d * 0.3 ? -1 : Math.min(2, Math.floor((lt - d * 0.3) / (d * 0.2))));
      K.ribbon('ONE PAGE', 540, 1720, R2(seg(lt, d * 0.3, d * 0.55)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'thud', { gain: 0.6 }); [0.3, 0.5, 0.7].forEach((a) => cue(st + len(1) * a, 'tock', { gain: 0.5 })); }

  // 2 · Kofluence: nano creators (1K-10K) get ₹500-5,000 per reel
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.45;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.1, note: 'REPORT slip with a paper report sheet, a small creator figure, 1K-10K FOLLOWERS slip, NANO ribbon', draw(lt, d, t) {
      dayPage(3); ground(1650, M.wall2);
      const a = R2(seg(lt, 0.02, 0.3)); if (a > 0) { ctx.save(); ctx.translate(760, 760); ctx.rotate(0.05); ctx.scale(a, a); cut(P_rr(-180, -240, 360, 480, 10), '#FFFBF0'); K.label('REPORT', 0, -170, 50, P.crimson); for (let k = 0; k < 5; k++) line([[-130, -80 + k * 60], [130 - (k % 2) * 60, -80 + k * 60]], 'rgba(62,44,30,0.4)', 12); ctx.restore(); }
      person({ x: 290, y: 1650, h: 560, arm: 50, top: P.royal });
      K.slip('1K–10K FOLLOWERS', 540, 1180, R2(seg(lt, d * 0.35, d * 0.6)), -0.03, 64);
      K.ribbon('NANO CREATORS', 540, 260, R2(seg(lt, d * 0.2, d * 0.45)), 90);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.14, note: 'gold ₹500 – ₹5,000 slip, rupee notes fan out, PER REEL ribbon, small Kofluence 2025 label', draw(lt, d, t) {
      dayPage(4, false);
      for (let k = 0; k < 5; k++) { const s = R2(seg(lt, 0.1 + k * 0.08, 0.35 + k * 0.08)); if (s > 0) note(540 + (k - 2) * 120, 1200 + Math.abs(k - 2) * 30, 1.0 * s, (k - 2) * 0.18); }
      K.slip('₹500 – ₹5,000', 540, 640, R2(seg(lt, 0.05, 0.3)), -0.02, 110);
      K.label('Kofluence report, 2025', 540, 800, 40, P.sepia);
      K.ribbon('PER REEL', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + d2 * 0.45 * 0.5, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'slam', { gain: 0.6 }); for (let k = 0; k < 5; k++) cue(mid + 0.15 + k * 0.1, 'pop', { gain: 0.3 }); }

  // 3 · more than followers, your views matter: followers card shrinks, big eye grows
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'FOLLOWERS slip shrinks and is struck, a big paper eye grows, VIEWS ribbon', draw(lt, d, t) {
      dayPage(5);
      const sh = lerp(1, 0.6, eo(seg(lt, d * 0.2, d * 0.5)));
      K.slip('FOLLOWERS', 300, 420, sh, -0.04, 70); strike(150, 430, 300 * sh, eo(seg(lt, d * 0.3, d * 0.5)));
      eye(560, 1000, 1.6 * R2(seg(lt, 0.05, 0.35)));
      K.ribbon('VIEWS', 540, 1560, R2(seg(lt, d * 0.45, d * 0.75)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(3) * 0.45, 'pop', { gain: 0.6 }); cue(st + len(3) * 0.5, 'slam', { gain: 0.5 }); }

  // 4 · formula: avg views ÷ 1,000 × ₹100-400
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.1, note: 'FORMULA ribbon, three slips stack: AVG VIEWS, ÷ 1,000, × ₹100–400, an eye beside the first', draw(lt, d, t) {
      dayPage(6, false);
      K.ribbon('FORMULA', 540, 260, R2(seg(lt, 0.02, 0.25)), 110);
      eye(220, 620, 0.5 * R2(seg(lt, 0.1, 0.3)));
      K.slip('AVG VIEWS', 600, 620, R2(seg(lt, 0.12, 0.35)), -0.03, 84);
      K.slip('÷ 1,000', 540, 940, R2(seg(lt, d * 0.35, d * 0.55)), 0.03, 110);
      K.slip('× ₹100–400', 540, 1280, R2(seg(lt, d * 0.6, d * 0.8)), -0.02, 110);
      coins(540, 1680, 0.9, Math.round(1 + 4 * eo(seg(lt, d * 0.65, d * 0.95))));
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(4) * 0.4, 'slam', { gain: 0.5 }); cue(st + len(4) * 0.65, 'slam', { gain: 0.6 }); }

  // 5 · you: 20,000 avg views → 20 × ₹200 = ₹4,000 a reel
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, phone showing a reel with an eye + gold 20,000 views counting up', draw(lt, d, t) {
      dayPage(7);
      const n = Math.round(20000 * eo(seg(lt, 0.15, 0.8)) / 100) * 100;
      phoneBig(540, 1000, 1.0, 0.02, () => { postCard(0, -80, 0.95, 0, 1); eye(-70, 250, 0.3); ctx.font = '700 62px Caladea'; ctx.fillStyle = P.gold; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(n.toLocaleString('en-IN'), 0, 254); });
      K.slip('YOU', 180, 400, R2(seg(lt, 0.05, 0.25)), -0.05, 80);
      K.slip('AVG VIEWS', 800, 400, R2(seg(lt, d * 0.3, d * 0.55)), 0.04, 64);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: '20 × ₹200 slip, then big gold ₹4,000 and PER REEL ribbon, coin stack', draw(lt, d, t) {
      dayPage(8, false); ground(1700, M.wall2);
      K.slip('20 × ₹200', 540, 480, R2(seg(lt, 0.05, 0.3)), -0.03, 110);
      bigMark('₹4,000', 540, 960, R2(seg(lt, d * 0.25, d * 0.45)), -0.03, P.gold, 220);
      coins(540, 1560, 1.2, Math.round(1 + 6 * eo(seg(lt, d * 0.45, d * 0.9))));
      K.ribbon('PER REEL', 540, 1260, R2(seg(lt, d * 0.65, d * 0.9)), 96);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 6; k++) cue(st + 0.2 + k * 0.15, 'tock', { gain: 0.25 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'pop', { gain: 0.5 }); cue(mid + len(5) * 0.55 * 0.45, 'slam', { gain: 0.7 }); }

  // 6 · game changer: brand runs your reel in its ads → charge separately
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, your reel card gets a gold AD tag and moves to a brand shop sign, rate card adds an AD row, + AD FEE ribbon', draw(lt, d, t) {
      dayPage(9);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      postCard(340, 900, 1.1, -0.04, 1); adTag(470, 650, R2(seg(lt, d * 0.25, d * 0.45)));
      const a = R2(seg(lt, d * 0.5, d * 0.7)); if (a > 0) { ctx.save(); ctx.translate(800, 1050); ctx.rotate(0.04); ctx.scale(a, a); cut(P_rr(-180, -150, 360, 300, 14), '#FFFBF0'); K.label('AD USE', 0, -70, 56, P.ink); K.label('EXTRA ₹', 0, 40, 64, P.gold); ctx.restore(); }
      K.ribbon('CHARGE SEPARATELY', 540, 1600, R2(seg(lt, d * 0.6, d * 0.85)), 78);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.3, 'pop', { gain: 0.6 }); cue(st + len(6) * 0.55, 'slam', { gain: 0.6 }); }

  // 7 · craziest: festive season, rate cards go up 15-30%
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'night page, string lights, diyas, rate card, gold +15–30% slip, FESTIVE SEASON ribbon', draw(lt, d, t) {
      nightPage(10); stringLights(t, 160);
      K.slip('CRAZIEST PART', 540, 330, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      rateCard(540, 980, 0.95, 0.02, ['₹ +', '₹ +', '₹ +'], Math.floor(3 * clamp(seg(lt, d * 0.4, d * 0.7)) + 0.01));
      for (let k = 0; k < 3; k++) diya(240 + k * 300, 1560, 1.1 * R2(seg(lt, 0.1 + k * 0.1, 0.35 + k * 0.1)), t + k);
      K.slip('+15–30%', 820, 560, R2(seg(lt, d * 0.35, d * 0.55)), 0.06, 100);
      K.ribbon('FESTIVE SEASON', 540, 1780, R2(seg(lt, d * 0.5, d * 0.8)), 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'sparkle', { dur: 0.7, gain: 0.5 }); cue(st + len(7) * 0.4, 'slam', { gain: 0.6 }); }

  // 8 · brand haggles: don't drop the rate, cut deliverables
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.4;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.1, note: 'brand bubble "Lower price?", rate card with ₹ locked (crossed-out down arrow), RATE STAYS slip', draw(lt, d, t) {
      dayPage(11, false);
      bubble('Lower price?', 560, 380, R2(seg(lt, 0.05, 0.3)), false, 70);
      rateCard(540, 1080, 1.0, -0.02, ['₹4,000', '₹1,500', '₹3,000'], 3, 0);
      K.slip('RATE STAYS', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), -0.03, 84);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.12, note: 'three deliverable cards (Reel, Story, Post), two get struck, CUT THE WORK ribbon', draw(lt, d, t) {
      dayPage(12);
      K.ribbon('CUT THE WORK', 540, 280, R2(seg(lt, 0.02, 0.25)), 100);
      ['1 Reel', '3 Stories', '2 Posts'].forEach((w, k) => rankCard(k + 1, w, 540, 680 + k * 280, R2(seg(lt, 0.05 + k * 0.1, 0.3 + k * 0.1)), k % 2 ? 0.02 : -0.02, 600));
      strike(250, 960, 580, eo(seg(lt, d * 0.4, d * 0.55))); strike(250, 1240, 580, eo(seg(lt, d * 0.55, d * 0.7)));
      tick(890, 680, R2(seg(lt, d * 0.7, d * 0.85)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'plop', { gain: 0.5 }); cue(st + d8 * 0.4 * 0.5, 'slam', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(8) * 0.6 * 0.45, 'zip', { gain: 0.6 }); cue(mid + len(8) * 0.6 * 0.6, 'zip', { gain: 0.6 }); }

  // 9 · ask a new brand for half the money upfront
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'NEW BRAND slip, open wallet, half the notes fly in first, gold 50% UPFRONT ribbon, tick', draw(lt, d, t) {
      dayPage(13); ground(1650, M.wall2);
      K.slip('NEW BRAND', 540, 300, R2(seg(lt, 0.02, 0.25)), -0.03, 74);
      wallet(540, 1250, 1.3, eo(seg(lt, 0.05, 0.3)));
      for (let k = 0; k < 2; k++) { const f = eo(seg(lt, d * (0.25 + k * 0.12), d * (0.5 + k * 0.12))); if (f > 0 && f < 1) note(lerp(1100, 540, f), lerp(500, 1120, f), 0.8, 0.3 * (1 - f)); }
      bigMark('50%', 540, 760, R2(seg(lt, d * 0.3, d * 0.5)), -0.04, P.gold, 230);
      K.ribbon('UPFRONT', 540, 1660, R2(seg(lt, d * 0.5, d * 0.75)), 110);
      tick(880, 1100, R2(seg(lt, d * 0.75, d * 0.9)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + len(9) * 0.35, 'slam', { gain: 0.6 }); cue(st + len(9) * 0.8, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 10 · next time a brand asks, the answer's ready (loops to beat 0)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 set again: brand bubble "What\'s your rate?", the creator now holds up a filled rate card, ANSWER READY ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal, glow: 0.7 });
      bubble("What's your rate?", 220, 420, 1, false, 64);
      rateCard(700, 1060, 0.75 * R2(seg(lt, 0.1, 0.4)), 0.05, ['₹4,000', '₹1,500', '₹3,000'], 3);
      K.ribbon('ANSWER READY', 540, 1780, R2(seg(lt, d * 0.35, d * 0.65)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.6 }); cue(st + len(10) * 0.4, 'slam', { gain: 0.6 }); }

  // 11 · follow + send to the friend who charges too little
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a rate card flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); rateCard(lerp(240, 540, f), lerp(1250, 1200, f), 0.35 * R2(seg(lt, d * 0.3, d * 0.5)), 0.05, ['₹4,000', '₹1,500', '₹3,000'], 3);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
