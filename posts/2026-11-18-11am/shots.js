// 18 Nov 11am: INSIGHTS BASICS: THE 3 NUMBERS THAT ACTUALLY MATTER. Paper style.
// Facts: Torro, Mosseri's 3 reach metrics (Feb 2025); Social Samosa, Instagram's Aug 2025 insights update (skip rate, retention chart); Fanpage Karma (skip rate = skips in first 3 s).
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, rankCard, strike,
  retention, clock, fishHook } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper report card: 3 rows, rv = rows filled, hl = highlighted row */
function reportCard(x, y, s, rot = 0, rows = ['WATCH TIME', 'LIKE RATE', 'SEND RATE'], rv = 3, hl = -1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-280, -330, 560, 660, 18), '#FFFBF0'); K.label('REPORT CARD', 0, -250, 56, P.crimson); line([[-220, -200], [220, -200]], P.sepia, 5);
  rows.forEach((w, k) => { const yy = -100 + k * 150; if (k === hl) { rr(-255, yy - 60, 510, 120, 12); ctx.fillStyle = 'rgba(200,149,47,0.3)'; ctx.fill(); }
    if (k < rv) { ctx.font = '700 56px Caladea'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = P.ink; ctx.fillText(w, -225, yy); tick(215, yy, 0.45); } });
  ctx.restore(); }
/** a tick in a circle */
function tick(x, y, sc) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_circ(0, 0, 70), P.green); line([[-32, 0], [-8, 26], [36, -26]], P.edge, 16); ctx.restore(); }
/** a paper heart */
function heart(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(0, 70); ctx.bezierCurveTo(-150, -30, -80, -150, 0, -70); ctx.bezierCurveTo(80, -150, 150, -30, 0, 70); ctx.closePath(); }, P.crimson); ctx.restore(); }
/** a paper plane (send) */
function plane(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_poly([[-120, 0], [130, -90], [20, 90]]), '#FFFBF0'); cut(P_poly([[-120, 0], [130, -90], [0, 20]]), '#EADFC6', { shadow: 0.2, edge: 3 }); ctx.restore(); }
/** a pile of numbers on paper slips */
function numberPile(lt, d) { const nums = ['1,284', '37%', '0:04', '9.1K', '212', '5', '+48', '3.2%', '61'];
  nums.forEach((n, k) => { const s = R2(seg(lt, 0.05 + k * 0.06, 0.3 + k * 0.06)); if (s <= 0) return; const x = 200 + (k % 3) * 340 + (rnd(k + 3) - 0.5) * 60, y = 620 + Math.floor(k / 3) * 300 + (rnd(k + 9) - 0.5) * 60;
    ctx.save(); ctx.translate(x, y); ctx.rotate((rnd(k) - 0.5) * 0.4); ctx.scale(s, s); cut(P_rr(-130, -70, 260, 140, 12), '#FFFBF0', { shadow: 0.6, edge: 4 }); K.label(n, 0, 4, 64, k % 2 ? P.gold : P.ink); ctx.restore(); }); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · you open Insights: a pile of numbers, which one? big ?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'INSIGHTS ribbon, a pile of number slips pops in, a big ? lands', draw(lt, d, t) {
      dayPage(1, false);
      K.ribbon('INSIGHTS', 540, 260, R2(seg(lt, 0.02, 0.25)), 110);
      numberPile(lt, d);
      bigMark('?', 540, 1560, R2(seg(lt, d * 0.6, d * 0.8)), Math.sin(t * 3) * 0.12, P.crimson, 300);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 6; k++) cue(st + 0.1 + k * 0.08, 'pop', { gain: 0.3 }); cue(st + len(0) * 0.65, 'boing', { gain: 0.5 }); }

  // 1 · simply put: Insights = your reel's report card, only 3 numbers matter
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.45;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.1, note: 'phone with a reel card turns into a REPORT CARD sheet, YOUR REEL slip', draw(lt, d, t) {
      room(2);
      const f = eo(seg(lt, d * 0.35, d * 0.7));
      if (f < 1) phoneBig(540, 1000, 1.0 * (1 - f), 0.02, () => postCard(0, -40, 0.95, 0, 1));
      reportCard(540, 980, 1.15 * f, -0.02, undefined, 0);
      K.slip('YOUR REEL', 540, 300, R2(seg(lt, 0.05, 0.3)), -0.03, 80);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.14, note: 'report card rows fill in one by one, gold big 3, ONLY 3 ribbon', draw(lt, d, t) {
      dayPage(3);
      reportCard(540, 1000, 1.15, -0.02, undefined, Math.floor(3 * clamp(seg(lt, d * 0.15, d * 0.75)) + 0.01));
      bigMark('3', 900, 420, R2(seg(lt, 0.05, 0.3)), 0.08, P.gold, 280);
      K.ribbon('ONLY 3 NUMBERS', 540, 1680, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + d1 * 0.45 * 0.5, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); [0.15, 0.4, 0.65].forEach((a) => cue(mid + len(1) * 0.55 * a, 'tock', { gain: 0.5 })); }

  // 2 · Mosseri: 3 signals for reach: watch time, like rate, send rate
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.35;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.1, note: 'generic faceless paper figure on a small stage with a mic stand, INSTAGRAM HEAD slip, REACH ribbon', draw(lt, d, t) {
      dayPage(4); ground(1650, M.wall2);
      cut(P_rr(140, 1580, 800, 80, 10), P.stone, { shadow: 0.6, edge: 4 });
      person({ x: 540, y: 1590, h: 640, arm: 30, top: M.denim });
      line([[740, 1590], [740, 1150]], P.ink, 10); circle(740, 1130, 30, P.ink);
      K.slip('INSTAGRAM HEAD', 540, 420, R2(seg(lt, 0.05, 0.3)), -0.03, 74);
      K.ribbon('3 REACH SIGNALS', 540, 260, R2(seg(lt, d * 0.3, d * 0.6)), 84);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.12, note: 'three numbered cards: 1 Watch time (clock), 2 Like rate (heart), 3 Send rate (plane), timed to the line', draw(lt, d, t) {
      dayPage(5, false);
      const w = ['Watch time', 'Like rate', 'Send rate'];
      w.forEach((x, k) => { const s = R2(seg(lt, d * (0.05 + k * 0.25), d * (0.25 + k * 0.25))); rankCard(k + 1, x, 470, 700 + k * 400, s, k % 2 ? 0.02 : -0.02, 620); });
      clock(900, 700, 0.6 * R2(seg(lt, d * 0.1, d * 0.3)), t);
      heart(900, 1100, 0.6 * R2(seg(lt, d * 0.35, d * 0.55)));
      plane(900, 1500, 0.6 * R2(seg(lt, d * 0.6, d * 0.8)), -0.2);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(mid, 'whoosh'); [0.1, 0.35, 0.6].forEach((a) => cue(mid + len(2) * 0.65 * a, 'slam', { gain: 0.5 })); }

  // 3 · one: watch time = how long they keep watching
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'big gold 1, a clock with spinning hands next to a phone playing a reel, WATCH TIME ribbon', draw(lt, d, t) {
      dayPage(6);
      bigMark('1', 200, 420, R2(seg(lt, 0.02, 0.25)), -0.06, P.gold, 260);
      phoneBig(380, 1050, 0.85, -0.03, () => postCard(0, -40, 0.95, 0, 0));
      clock(800, 900, 1.3 * R2(seg(lt, 0.1, 0.35)), t * 3);
      K.ribbon('WATCH TIME', 540, 1660, R2(seg(lt, d * 0.25, d * 0.55)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slam', { gain: 0.5 }); cue(st + 0.3, 'pop', { gain: 0.5 }); for (let k = 0; k < 6; k++) cue(st + 0.6 + k * 0.3, 'tock', { gain: 0.2 }); }

  // 4 · two and three: likes ÷ reach, sends ÷ reach
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.12, note: 'gold 2 + heart ÷ REACH slip, gold 3 + plane ÷ REACH slip', draw(lt, d, t) {
      dayPage(7, false);
      const a = R2(seg(lt, 0.02, 0.3)), b = R2(seg(lt, d * 0.35, d * 0.65));
      bigMark('2', 160, 640, a, -0.06, P.gold, 200); heart(380, 640, 0.75 * a); K.slip('÷ REACH', 760, 640, a, -0.02, 90);
      bigMark('3', 160, 1160, b, 0.05, P.gold, 200); plane(380, 1160, 0.75 * b, -0.2); K.slip('÷ REACH', 760, 1160, b, 0.02, 90);
      K.ribbon('LIKE RATE + SEND RATE', 540, 1640, R2(seg(lt, d * 0.6, d * 0.85)), 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'slam', { gain: 0.5 }); cue(st + len(4) * 0.4, 'slam', { gain: 0.5 }); }

  // 5 · you: 1,000 reached, 80 sent → send rate 8%
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, phone with your reel, gold REACHED counter to 1,000, paper planes fly out to small faceless friends, SENT 80', draw(lt, d, t) {
      dayPage(8); ground(1700, M.wall2);
      K.slip('YOU', 170, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      phoneBig(330, 1020, 0.8, -0.03, () => postCard(0, -40, 0.95, 0, 1));
      const n = Math.round(1000 * eo(seg(lt, 0.1, 0.5)) / 10) * 10; K.slip(`REACHED ${n.toLocaleString('en-IN')}`, 600, 470, R2(seg(lt, 0.08, 0.25)), 0.03, 70);
      for (let k = 0; k < 3; k++) { const f = eo(seg(lt, d * (0.45 + k * 0.1), d * (0.7 + k * 0.1))); if (f > 0) plane(lerp(420, 850, f), lerp(900, 800 + k * 280, f), 0.35, -0.2); }
      for (let k = 0; k < 3; k++) person({ x: 900, y: 920 + k * 280, h: 240, arm: 20, dir: -1, top: [P.wine, M.hoodie2, M.tee][k] });
      K.slip('SENT 80', 700, 1640, R2(seg(lt, d * 0.6, d * 0.85)), -0.03, 84);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: '80 ÷ 1,000 slip, big gold 8%, SEND RATE ribbon, plane', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('80 ÷ 1,000', 540, 460, R2(seg(lt, 0.05, 0.3)), -0.03, 110);
      bigMark('8%', 540, 960, R2(seg(lt, d * 0.25, d * 0.45)), -0.03, P.gold, 300);
      plane(860, 1300, 0.7 * R2(seg(lt, d * 0.3, d * 0.5)), -0.25 + Math.sin(t * 2) * 0.05);
      K.ribbon('SEND RATE', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 5; k++) cue(st + 0.2 + k * 0.15, 'tock', { gain: 0.25 }); [0.45, 0.55, 0.65].forEach((a) => cue(st + d5 * 0.5 * a, 'whoosh', { gain: 0.3 })); cue(mid, 'whoosh'); cue(mid + 0.15, 'pop', { gain: 0.5 }); cue(mid + len(5) * 0.5 * 0.45, 'slam', { gain: 0.7 }); }

  // 6 · game changer: skip rate = scrolled past in first 3 seconds
  { const st = cs(6), d6 = len(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, a thumb flicks reel cards up and away, gold 3 SEC slip, SKIP RATE ribbon', draw(lt, d, t) {
      dayPage(10);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      for (let k = 0; k < 3; k++) { const f = eio(seg(lt, d * (0.2 + k * 0.15), d * (0.38 + k * 0.15))); if (f < 1) postCard(540, lerp(1000, -300, f), 1.0, (k - 1) * 0.05, 0); }
      hand(700, 1350 - 120 * Math.abs(Math.sin(t * 5)), 1.2, -0.1, true);
      K.slip('FIRST 3 SEC', 700, 520, R2(seg(lt, d * 0.5, d * 0.7)), 0.06, 80);
      K.ribbon('SKIP RATE', 540, 1700, R2(seg(lt, d * 0.25, d * 0.5)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); [0.2, 0.35, 0.5].forEach((a) => cue(st + d6 * a, 'zip', { gain: 0.5 })); cue(st + d6 * 0.3, 'slam', { gain: 0.6 }); }

  // 7 · craziest: every reel gets a chart showing where people left
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'CRAZIEST PART slip, phone, a retention chart draws itself', draw(lt, d, t) {
      dayPage(11, false);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      retention(110, 560, 860, 760, seg(lt, d * 0.2, d * 0.95), 0.45, 0);
      K.ribbon('EVERY REEL', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'same chart, the drop zone glows crimson, magnified 0-3s, WHERE THEY LEFT ribbon', draw(lt, d, t) {
      dayPage(11, false);
      retention(110, 560, 860, 760, 1, 0.45, clamp(seg(lt, 0.1, 0.4)));
      K.slip('BIG DROP', 330, 470, R2(seg(lt, d * 0.2, d * 0.4)), -0.04, 70);
      K.ribbon('WHERE THEY LEFT', 540, 1620, R2(seg(lt, d * 0.35, d * 0.65)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + d7 * 0.3, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(7) * 0.5 * 0.25, 'slam', { gain: 0.6 }); }

  // 8 · high skip rate → change the first 3 seconds (the hook)
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'HIGH SKIP RATE slip, a fishing hook drops onto a reel card, NEW HOOK ribbon', draw(lt, d, t) {
      dayPage(12);
      K.slip('HIGH SKIP RATE', 540, 300, R2(seg(lt, 0.02, 0.25)), -0.03, 84);
      postCard(540, 1050, 1.25, 0.02, 0);
      fishHook(760, lerp(-200, 760, eob(seg(lt, d * 0.25, d * 0.6))), 1.2, -400);
      K.ribbon('CHANGE FIRST 3 SEC', 540, 1700, R2(seg(lt, d * 0.4, d * 0.7)), 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.5, 'thud', { gain: 0.6 }); }

  // 9 · low send rate → make a reel people want to send to a friend
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'LOW SEND RATE slip, creator sends a reel card as a paper plane to a friend who lights up, SEND-WORTHY ribbon', draw(lt, d, t) {
      dayPage(13); ground(1650, M.wall2);
      K.slip('LOW SEND RATE', 540, 300, R2(seg(lt, 0.02, 0.25)), -0.03, 84);
      person({ x: 230, y: 1650, h: 600, arm: 60, top: P.royal });
      const f = eo(seg(lt, d * 0.3, d * 0.75)); plane(lerp(330, 760, f), lerp(1050, 900, f) - Math.sin(f * Math.PI) * 220, 0.6 * R2(seg(lt, d * 0.25, d * 0.4)), -0.2);
      person({ x: 850, y: 1650, h: 600, arm: 50, dir: -1, top: P.wine, glow: f });
      K.ribbon('WORTH SENDING', 540, 1780, R2(seg(lt, d * 0.55, d * 0.85)), 88);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.3, 'whoosh', { gain: 0.5 }); cue(st + len(9) * 0.8, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 10 · loop: next time you open Insights, just these 3 numbers (back to beat 0, pile swept away)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'INSIGHTS ribbon again, the number pile is crossed away, the report card with 3 ticked rows', draw(lt, d, t) {
      dayPage(1, false);
      K.ribbon('INSIGHTS', 540, 260, 1, 110);
      reportCard(540, 1050, 1.1 * R2(seg(lt, 0.1, 0.4)), -0.02, undefined, 3);
      K.ribbon('JUST THESE 3', 540, 1720, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.6 }); cue(st + len(10) * 0.45, 'slam', { gain: 0.6 }); }

  // 11 · follow + send to the friend who only counts likes
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a paper plane flies to a friend holding a heart, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); plane(lerp(200, 640, f), lerp(1250, 1150, f), 0.5 * R2(seg(lt, d * 0.3, d * 0.5)), -0.2);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      heart(660, 1350, 0.4 * (1 - f));
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
