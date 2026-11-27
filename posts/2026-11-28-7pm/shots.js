// 28 Nov 7pm: REELS LENGTH: SHORT VS LONG, WHAT INSTAGRAM SAYS. Paper style.
// Facts (opened 27 Nov 2026): Instagram Creators blog "The latest with Instagram" (Jan 21, 2025): "Previously, only reels
// up to 90 seconds were eligible for recommendation, but now reels up to 3 minutes will be eligible to be seen by
// non-followers in places like the Reels tab and Explore." Buffer, "How Long Should Instagram Reels Be? We Analyzed 2.7
// Million Reels" (Nov 12, 2026): "Instagram Reels can be up to 20 minutes long"; "only reels of three minutes or less are
// eligible for recommendation to new audiences"; reach vs each account's own baseline: 90-179 s +7.4% (average across
// accounts), under 15 s to 89 s all within about 3% of baseline, 180 s+ -49.3%; 180 s+ engagement rate +2.65 points,
// "comfortably the highest of any bucket"; tip: "Cut it into a series", longer reels "for your existing audience".
// The five-minute tutorial story is a generic example. Loop line is nser's. No real person, no logos.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, rankCard, strike, magnifier, barPair, clock, laptop } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a reel card (tall, play button); h = height multiplier for long reels */
function reel(x, y, s, rot = 0, col = P.sea, mark = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -260, 300, 520, 20), '#FFFBF0'); rr(-126, -236, 252, 400, 10); ctx.fillStyle = col; ctx.fill();
  cut(P_poly([[-30, -86], [-30, 6], [46, -40]]), P.edge, { shadow: 0.3, edge: 0 });
  line([[-110, 200], [60, 200]], 'rgba(62,44,30,0.3)', 12);
  if (mark) { ctx.save(); ctx.globalAlpha = 0.9; K.label(mark, 0, 120, 38, P.edge); ctx.restore(); } ctx.restore(); }
/** a paper length bar: a track 0..max, fill to v, tick marks with labels */
function lengthBar(x, y, w, v, max, marks, col = P.gold) { cut(P_rr(x, y - 40, w, 80, 40), '#FFFBF0');
  const fw = w * clamp(v / max); if (fw > 10) cut(P_rr(x + 6, y - 32, fw - 12, 64, 32), col, { shadow: 0.2, edge: 2 });
  marks.forEach(([m, txt, hot]) => { const mx = x + w * m / max; line([[mx, y - 60], [mx, y + 60]], hot ? P.crimson : P.ink, 8); K.label(txt, mx, y + 110, 44, hot ? P.crimson : P.ink); }); }
/** a stamp that slams in */
function stamp(text, x, y, p, rot = -0.08, col = P.crimson, w = 520, size = 76) { const sc = p <= 0 ? 0 : lerp(2.2, 1, eo(p)); if (!sc) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); cut(P_rr(-w / 2, -70, w, 140, 14), col); K.label(text, 0, 6, size, P.edge); ctx.restore(); }
/** scissors */
function scissors(x, y, s, open = 0.3, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const k of [-1, 1]) { ctx.save(); ctx.rotate(k * open); cut(P_poly([[0, -10], [200, -6], [200, 6], [0, 10]]), '#7A7F86', { shadow: 0.4, edge: 3 }); ctx.lineWidth = 18; ctx.strokeStyle = P.crimson; ctx.beginPath(); ctx.ellipse(-70, k * 40, 50, 34, 0, 0, TAU); ctx.stroke(); ctx.restore(); }
  circle(0, 0, 12, P.ink); ctx.restore(); }
/** a heart */
function heart(x, y, s, col = P.crimson) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(() => { ctx.beginPath(); ctx.moveTo(0, 60); ctx.bezierCurveTo(-140, -30, -70, -140, 0, -60); ctx.bezierCurveTo(70, -140, 140, -30, 0, 60); ctx.closePath(); }, col, { shadow: 0.5, edge: 4 }); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · short or long? what Instagram and the data say
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'a SHORT reel card and a tall LONG reel card side by side, gold ? between', draw(lt, d, t) {
      room(1);
      reel(290, 900, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.05, P.sea, 'SHORT');
      ctx.save(); ctx.translate(790, 820); ctx.scale(1, 1.0 + 0.4 * eo(seg(lt, d * 0.2, d * 0.6))); reel(0, 0, 0.75 * R2(seg(lt, 0.08, 0.25)), 0.04, P.royal, 'LONG'); ctx.restore();
      bigMark('?', 540, 560, R2(seg(lt, d * 0.4, d * 0.55)), 0.06 * Math.sin(t * 3), P.gold, 300);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a paper stopwatch spinning, two slips INSTAGRAM SAYS + THE DATA', draw(lt, d, t) {
      dayPage(2);
      clock(540, 720, 2.0 * R2(seg(lt, 0.02, 0.2)), t * 2);
      K.slip('WHAT INSTAGRAM SAYS', 540, 1200, R2(seg(lt, d * 0.2, d * 0.4)), -0.03, 60);
      K.ribbon('+ THE DATA', 540, 1480, R2(seg(lt, d * 0.5, d * 0.8)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.3, 'slide', { gain: 0.4, dur: 0.6 }); cue(st + d0 * 0.5 * 0.5, 'pop', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'pop', { gain: 0.5 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.8 }); }

  // 1 · simply put: up to 3 minutes can reach new people, longer can't
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, length bar fills to a crimson 3:00 line', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      lengthBar(120, 720, 840, 3 * eo(seg(lt, d * 0.1, d * 0.7)), 5, [[3, '3:00', true]], P.gold);
      bigMark('3 MIN', 540, 1150, R2(seg(lt, d * 0.5, d * 0.65)), -0.03, P.gold, 220);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a reel under 3 min walks to new people (tick), an over-3 reel blocked (X): NEW PEOPLE ribbon', draw(lt, d, t) {
      nightPage(4);
      reel(260, 560, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.04, P.gold, '≤ 3:00'); bigMark('✓', 260, 880, R2(seg(lt, d * 0.3, d * 0.45)), -0.1, P.gold, 200);
      reel(800, 560, 0.6 * R2(seg(lt, 0.08, 0.25)), 0.04, P.stone, '3:00+'); bigMark('✕', 800, 880, R2(seg(lt, d * 0.4, d * 0.55)), 0.1, P.crimson, 200);
      person({ x: 260, y: 1500, h: 420, arm: 60, top: P.forest, glow: eo(seg(lt, d * 0.35, d * 0.6)) });
      person({ x: 800, y: 1500, h: 420, arm: 60, top: P.royal, glow: 0, dir: -1 });
      K.ribbon('NEW PEOPLE', 540, 1650, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.15, 'slide', { gain: 0.4, dur: 0.8 }); cue(st + d1 * 0.5 * 0.55, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d1 * 0.5 * 0.35, 'sparkle', { gain: 0.5 }); cue(mid + d1 * 0.5 * 0.45, 'thud', { gain: 0.6 }); }

  // 2 · earlier only up to 90 s recommended; Jan 2025 → 3 minutes
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.45;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'BEFORE slip, length bar stuck at 90s with a stone stop', draw(lt, d, t) {
      room(5);
      K.slip('BEFORE', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      lengthBar(170, 700, 740, 1.5 * eo(seg(lt, d * 0.1, d * 0.5)), 3, [[1.5, '90 SEC', true]], P.stone);
      bigMark('90s', 540, 1150, R2(seg(lt, d * 0.45, d * 0.6)), -0.03, P.gold, 240);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'timeline 2024 → 2025 marker moves to JAN 2025, bar extends from 90s to 3:00: 3 MINUTES ribbon', draw(lt, d, t) {
      dayPage(6);
      K.timeline(['2024', 'JAN 2025'], 220, 420, 640, eo(seg(lt, d * 0.05, d * 0.35)), seg(lt, d * 0.05, d * 0.35) >= 1 ? 1 : 0);
      lengthBar(170, 900, 740, lerp(1.5, 3, eo(seg(lt, d * 0.35, d * 0.7))), 3, [[1.5, '90s', false], [3, '3:00', true]], P.gold);
      K.ribbon('3 MINUTES', 540, 1400, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d2 * 0.45 * 0.45, 'thud', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d2 * 0.55 * 0.2, 'zip', { gain: 0.5 }); cue(mid + d2 * 0.55 * 0.4, 'slide', { gain: 0.5, dur: 0.8 }); cue(mid + d2 * 0.55 * 0.65, 'slam', { gain: 0.8 }); }

  // 3 · now up to 20 min, but over 3 min isn't recommended to non-followers
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.45;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'NOW slip, a very tall reel stretches, gold 20 MIN', draw(lt, d, t) {
      dayPage(7);
      K.slip('NOW', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      ctx.save(); ctx.translate(320, 860); ctx.scale(1, 1 + 0.6 * eo(seg(lt, d * 0.15, d * 0.6))); reel(0, 0, 0.8 * R2(seg(lt, 0.05, 0.2)), 0, P.royal); ctx.restore();
      bigMark('20', 780, 760, R2(seg(lt, d * 0.35, d * 0.5)), 0.04, P.gold, 300); if (seg(lt, d * 0.35, d * 0.5) > 0) K.label('MIN', 780, 950, 70, P.ink);
      K.slip('MAX LENGTH', 780, 1150, R2(seg(lt, d * 0.5, d * 0.7)), 0.03, 54);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a 3:00+ reel heads to strangers but a NOT RECOMMENDED stamp blocks the dashed route', draw(lt, d, t) {
      nightPage(8);
      reel(260, 700, 0.7 * R2(seg(lt, 0.02, 0.2)), -0.04, P.royal, '3:00+');
      K.dashedRoute([[400, 700], [760, 700]], seg(lt, d * 0.1, d * 0.4));
      person({ x: 850, y: 1000, h: 380, arm: 60, top: P.stoneDark, glow: 0, dir: -1 }); K.slip('NON-FOLLOWERS', 820, 1090, R2(seg(lt, d * 0.2, d * 0.35)), 0.03, 44);
      stamp('NOT RECOMMENDED', 540, 1350, seg(lt, d * 0.45, d * 0.65), -0.06, P.crimson, 840, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d3 * 0.45 * 0.2, 'slide', { gain: 0.4, dur: 0.8 }); cue(st + d3 * 0.45 * 0.4, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d3 * 0.55 * 0.15, 'zip', { gain: 0.5 }); cue(mid + d3 * 0.55 * 0.5, 'slam', { gain: 0.9 }); }

  // 4 · you: a full five-minute tutorial in one reel
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.14, note: 'you at a laptop editing, the timeline on screen runs to 5:00 (crimson), phone shows ONE REEL', draw(lt, d, t) {
      room(9);
      laptop(540, 880, 1.2 * R2(seg(lt, 0.02, 0.2)), () => { K.label('TUTORIAL', 0, -340, 50, P.ink); cut(P_rr(-260, -260, 520, 140, 10), P.sea, { shadow: 0, edge: 2 });
        const w = 520 * eo(seg(lt, d * 0.15, d * 0.7)); if (w > 8) cut(P_rr(-260, -100, w, 40, 10), P.crimson, { shadow: 0, edge: 0 }); });
      bigMark('5:00', 540, 300, R2(seg(lt, d * 0.5, d * 0.65)), -0.03, P.crimson, 200);
      person({ x: 180, y: 1650, h: 560, arm: 70, top: M.tee, glow: 0.6 });
      K.slip('ONE REEL', 720, 1200, R2(seg(lt, d * 0.6, d * 0.8)), 0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + len(4) * 0.15, 'slide', { gain: 0.4, dur: 1.2 }); cue(st + len(4) * 0.55, 'slam', { gain: 0.7 }); cue(st + len(4) * 0.65, 'pop', { gain: 0.5 }); }

  // 5 · Buffer's 2.7M-reel study: over 3 min got about half the reach
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'BUFFER STUDY slip, magnifier over a wall of reels, gold 2.7M REELS', draw(lt, d, t) {
      dayPage(10);
      K.slip('BUFFER STUDY', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      for (let k = 0; k < 10; k++) reel(150 + (k % 5) * 195, 540 + Math.floor(k / 5) * 300, 0.4 * R2(seg(lt, d * (0.03 + k * 0.03), d * (0.12 + k * 0.03))), (k % 2 ? 0.05 : -0.05), [P.sea, P.forest, P.gold, P.royal, P.wine][k % 5]);
      magnifier(lerp(200, 860, eio(seg(lt, d * 0.2, d * 0.9))), 700, 1.0 * R2(seg(lt, d * 0.15, d * 0.3)));
      bigMark('2.7M', 540, 1300, R2(seg(lt, d * 0.4, d * 0.55)), -0.03, P.gold, 220); K.label('REELS', 540, 1440, 56, P.ink);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'bar pair: usual reach vs 3:00+ reach about half, crimson -49%: HALF THE REACH ribbon', draw(lt, d, t) {
      dayPage(11);
      K.slip('REACH', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      barPair({ v: 100, label: 'USUAL', txt: '100%' }, { v: 51, label: '3:00+', txt: '-49%', hot: true }, 360, 1300, seg(lt, 0.05, 0.5), 700);
      K.ribbon('HALF THE REACH', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); for (let k = 0; k < 10; k += 3) cue(st + d5 * 0.45 * (0.05 + k * 0.03), 'pop', { gain: 0.25 }); cue(st + d5 * 0.45 * 0.45, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.55 * 0.3, 'thud', { gain: 0.7 }); cue(mid + d5 * 0.55 * 0.65, 'slam', { gain: 0.8 }); }

  // 6 · game changer: 90 s to 3 min got ~7% more reach than the account's usual, on average
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, length bar with a gold zone between 1:30 and 3:00 (SWEET SPOT)', draw(lt, d, t) {
      dayPage(12);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const z = eo(seg(lt, d * 0.2, d * 0.6)); cut(P_rr(120, 700 - 40, 840, 80, 40), '#FFFBF0'); if (z > 0) cut(P_rr(120 + 840 * 0.3, 700 - 32, 840 * 0.3 * z, 64, 20), P.gold, { shadow: 0.2, edge: 2 });
      [[0.3, '1:30'], [0.6, '3:00']].forEach(([m, s]) => { line([[120 + 840 * m, 640], [120 + 840 * m, 760]], P.crimson, 8); K.label(s, 120 + 840 * m, 820, 46, P.crimson); });
      K.ribbon('SWEET SPOT', 540, 1150, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a 1:30-3:00 reel with a gold +7.4% badge, small AVERAGE slip, line chart up arrow', draw(lt, d, t) {
      nightPage(13);
      reel(250, 860, 0.9 * R2(seg(lt, 0.02, 0.2)), -0.04, P.gold, '1:30-3:00');
      bigMark('+7.4%', 690, 560, R2(seg(lt, d * 0.25, d * 0.4)), 0.04, P.gold, 150);
      K.slip('REACH', 690, 740, R2(seg(lt, d * 0.35, d * 0.5)), 0.03, 56);
      K.slip('ON AVERAGE', 540, 1300, R2(seg(lt, d * 0.55, d * 0.75)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.25, 'slide', { gain: 0.5, dur: 0.8 }); cue(st + d6 * 0.45 * 0.6, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.3, 'sparkle', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.6, 'pop', { gain: 0.5 }); }

  // 7 · craziest: under 90 s, length made almost no difference
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, four reels labelled 15s 30s 60s 89s line up', draw(lt, d, t) {
      dayPage(14);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      ['15s', '30s', '60s', '89s'].forEach((s, k) => reel(165 + k * 250, 800, 0.55 * R2(seg(lt, d * (0.1 + k * 0.1), d * (0.25 + k * 0.1))), (k % 2 ? 0.04 : -0.04), [P.sea, P.forest, P.royal, P.wine][k], s));
      K.slip('UNDER 90 SEC', 540, 1250, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 64);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'four equal stone bars, a level line across them: ABOUT THE SAME ribbon, ±3% slip', draw(lt, d, t) {
      room(15);
      const g = eo(seg(lt, 0.05, 0.45)); ['15s', '30s', '60s', '89s'].forEach((s, k) => { const h = 500 * g * [0.98, 1.03, 1.02, 0.99][k]; const bx = 165 + k * 250; if (h > 2) cut(P_rr(bx - 90, 1200 - h, 180, h, 10), P.stone); K.label(s, bx, 1260, 46); });
      const q = seg(lt, d * 0.45, d * 0.6); if (q > 0) { ctx.save(); ctx.setLineDash([24, 18]); line([[60, 700], [60 + 960 * q, 700]], P.crimson, 8); ctx.restore(); }
      K.slip('±3%', 540, 450, R2(seg(lt, d * 0.5, d * 0.65)), -0.03, 70);
      K.ribbon('ABOUT THE SAME', 540, 1480, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.15, 0.25, 0.35, 0.45].forEach((a) => cue(st + d7 * 0.45 * a, 'pop', { gain: 0.3 })); cue(mid, 'whoosh'); cue(mid + d7 * 0.55 * 0.2, 'slide', { gain: 0.4, dur: 0.6 }); cue(mid + d7 * 0.55 * 0.5, 'zip', { gain: 0.5 }); cue(mid + d7 * 0.55 * 0.7, 'slam', { gain: 0.7 }); }

  // 8 · twist: over 3 min had less reach but the highest engagement
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'the 3:00+ reel: small REACH arrow down (crimson), hearts pop out: TOP ENGAGEMENT ribbon', draw(lt, d, t) {
      dayPage(16);
      reel(540, 760, 1.0 * R2(seg(lt, 0.02, 0.2)), 0.03, P.royal, '3:00+');
      K.slip('REACH ↓', 230, 400, R2(seg(lt, d * 0.15, d * 0.3)), -0.05, 60);
      for (let k = 0; k < 5; k++) { const f = seg(lt, d * (0.4 + k * 0.06), d * (0.6 + k * 0.06)); if (f > 0) heart(lerp(700, 640 + k * 70, eo(f)), lerp(700, 380 - (k % 2) * 80, eo(f)), 0.55 * R2(f), k % 2 ? P.crimson : P.wine); }
      K.ribbon('TOP ENGAGEMENT', 540, 1400, R2(seg(lt, d * 0.6, d * 0.9)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + len(8) * 0.2, 'thud', { gain: 0.5 }); [0.45, 0.51, 0.57, 0.63, 0.69].forEach((a) => cue(st + len(8) * a, 'plop', { gain: 0.3 })); cue(st + len(8) * 0.7, 'slam', { gain: 0.7 }); }

  // 9 · step 1: to reach new people keep it under 3 minutes
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: '1 UNDER 3 MIN card, length bar filled to just before the crimson 3:00 line, gold tick, new people', draw(lt, d, t) {
      room(17);
      rankCard(1, 'UNDER 3 MIN', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.02, 640);
      lengthBar(120, 660, 840, 2.8 * eo(seg(lt, d * 0.1, d * 0.5)), 4, [[3, '3:00', true]], P.forest);
      bigMark('✓', 540, 1000, R2(seg(lt, d * 0.5, d * 0.65)), -0.1, P.gold, 240);
      person({ x: 260, y: 1620, h: 420, arm: 60, top: P.royal, glow: 0.7 }); person({ x: 820, y: 1620, h: 420, arm: 60, top: P.wine, glow: 0.7, dir: -1 });
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(9) * 0.1, 'slide', { gain: 0.4, dur: 0.8 }); cue(st + len(9) * 0.55, 'sparkle', { gain: 0.6 }); }

  // 10 · step 2: long content → cut into a series, or keep long video for followers
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.5;
    add({ id: 'S10a', at: st, cam: [540, 960], zoom: 0.12, note: '2 SERIES card: scissors snip a long crimson strip into PART 1 / 2 / 3 reels', draw(lt, d, t) {
      dayPage(18);
      rankCard(2, 'CUT A SERIES', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 640);
      const c = eo(seg(lt, d * 0.35, d * 0.7));
      if (c < 1) cut(P_rr(120, 560, 840, 120, 20), P.crimson);
      scissors(lerp(980, 380, eo(seg(lt, d * 0.1, d * 0.4))), 620, 0.8 * R2(seg(lt, 0.05, 0.2)) * (c < 1 ? 1 : 0), 0.25 + 0.15 * Math.sin(t * 14));
      ['PART 1', 'PART 2', 'PART 3'].forEach((s, k) => reel(220 + k * 320, lerp(620, 1100, c), 0.55 * (c > 0 ? 1 : 0), (k - 1) * 0.05, P.crimson, s));
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.16, note: '3 FOLLOWERS card: a long reel goes to a group of followers (glowing phones): FOR FOLLOWERS ribbon', draw(lt, d, t) {
      nightPage(19);
      rankCard(3, 'LONG = FOLLOWERS', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 780);
      ctx.save(); ctx.translate(540, 680); ctx.scale(1, 1.3); reel(0, 0, 0.7 * R2(seg(lt, 0.05, 0.2)), 0, P.royal, 'LONG'); ctx.restore();
      [180, 420, 660, 900].forEach((x, k) => person({ x, y: 1550, h: 360, arm: 60, top: [P.forest, P.wine, M.hoodie, P.royal][k], glow: eo(seg(lt, d * (0.3 + k * 0.08), d * (0.5 + k * 0.08))), dir: k > 1 ? -1 : 1 }));
      K.ribbon('YOUR FOLLOWERS', 540, 1700, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d10 * 0.5 * 0.2, 'zip', { gain: 0.6 }); cue(st + d10 * 0.5 * 0.4, 'zip', { gain: 0.6 }); cue(st + d10 * 0.5 * 0.6, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d10 * 0.5 * 0.5, 'sparkle', { gain: 0.5 }); cue(mid + d10 * 0.5 * 0.7, 'slam', { gain: 0.6 }); }

  // 11 · loop: short or long? under three minutes (back to beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: SHORT and LONG reels, the LONG one shrinks to fit, gold UNDER 3 MIN ribbon', draw(lt, d, t) {
      room(1);
      reel(290, 900, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.05, P.sea, 'SHORT');
      ctx.save(); ctx.translate(790, 820); ctx.scale(1, 1.4 - 0.4 * eo(seg(lt, d * 0.2, d * 0.6))); reel(0, 0, 0.75 * R2(seg(lt, 0.05, 0.2)), 0.04, P.royal, 'LONG'); ctx.restore();
      K.slip('SHORT OR LONG?', 540, 300, R2(seg(lt, 0.05, 0.25)), -0.03, 64);
      K.ribbon('UNDER 3 MIN', 540, 1450, R2(seg(lt, d * 0.45, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.25, 'slide', { gain: 0.4, dur: 0.5 }); cue(st + len(11) * 0.5, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend who posts five-minute reels
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a 5:00 reel, handle slip', draw(lt, d, t) {
      dayPage(20); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      reel(280, 1250, 0.6 * R2(seg(lt, d * 0.3, d * 0.45)), -0.05, P.royal, '5:00');
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'pop', { gain: 0.4 }); }

  return { shots: S, cues: CUES };
}
