// 14 Nov 7pm: WHEN DOES YOUR INDIAN AUDIENCE ACTUALLY SCROLL? Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, skyline, magnifier, bigMark,
  hand, clock, rankCard, strike, barPair, indiaMap, geo, CITY, pin } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

const txt = (s, x, y, size, col = P.ink, align = 'center') => { ctx.font = `700 ${size}px Caladea`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
/** a paper "best time to post" chart card: 6 bars by hour, `hot` = index of the crimson bar; p grows the bars */
function timeChart(x, y, w, h, p, hot = 3, vals = [0.3, 0.45, 0.55, 1, 0.6, 0.4], labs = ['9A', '12P', '3P', '7P', '9P', '11P'], sc = 1) { if (sc <= 0) return;
  ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_rr(-w / 2, -h / 2, w, h, 14), '#FFFBF0');
  const bw = (w - 120) / vals.length, base = h / 2 - 90, hm = h - 220;
  vals.forEach((v, k) => { const bh = hm * v * eo(clamp(p * 1.4 - k * 0.08)); const bx = -w / 2 + 60 + k * bw + 10; if (bh > 2) cut(P_rr(bx, base - bh, bw - 20, bh, 6), k === hot ? P.crimson : P.stone, { shadow: 0.4, edge: 3 }); txt(labs[k], bx + (bw - 20) / 2, base + 45, 34, k === hot ? P.crimson : P.ink); });
  ctx.restore(); }
/** a 14-day calendar grid; n = days ticked */
function twoWeeks(x, y, n, sc = 1) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_rr(-380, -240, 760, 480, 14), '#FFFBF0');
  cut(P_rr(-380, -240, 760, 80, 14), P.crimson, { shadow: 0, edge: 0 }); txt('2 WEEKS', 0, -198, 48, '#FFFBF0');
  for (let i = 0; i < 14; i++) { const cx = -320 + (i % 7) * 107, cy = -90 + Math.floor(i / 7) * 150; rr(cx - 40, cy - 50, 80, 100, 6); ctx.fillStyle = 'rgba(62,44,30,0.08)'; ctx.fill();
    if (i < n) { ctx.lineWidth = 10; ctx.strokeStyle = P.green; ctx.lineCap = 'round'; ctx.beginPath(); ctx.moveTo(cx - 20, cy); ctx.lineTo(cx - 4, cy + 18); ctx.lineTo(cx + 24, cy - 20); ctx.stroke(); } }
  ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · "best time to post?" everyone sells a chart: three hands push chart cards at a creator
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'BEST TIME? ribbon, chart cards fly in from 3 sides around a creator', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      person({ x: 780, y: 1760, h: 520, arm: 40, top: M.hoodie2 });
      K.ribbon('BEST TIME?', 540, 250, R2(seg(lt, 0.05, 0.4)), 96);
      [[-1, 300, 600], [1, 780, 820], [-1, 300, 1060]].forEach(([s, x, y], k) => { const a = 0.4 + k * d * 0.18, p = eo(seg(lt, a, a + 0.4)); if (p > 0) timeChart(lerp(s < 0 ? -400 : 1480, x, p), y, 420, 320, seg(lt, a + 0.2, a + 0.9), [3, 1, 4][k], undefined, undefined, 1); });
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(st + 0.4 + k * len(0) * 0.18, 'slide', { gain: 0.4 }); }

  // 1 · simply put, the chart = someone else's audience average: a crowd of grey people pours into one chart
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.1, note: 'chart card; a grey crowd behind it labelled SOMEONE ELSE + AVERAGE slip', draw(lt, d, t) {
      dayPage(2); ground(1650, M.wall2);
      for (let k = 0; k < 6; k++) person({ x: 120 + k * 168, y: 1850, h: 360, arm: 30, top: P.stone, bob: Math.sin(t * 3 + k) * 4 });
      timeChart(540, 860, 760, 600, seg(lt, 0, 0.8));
      K.slip("SOMEONE ELSE'S", 540, 300, R2(seg(lt, d * 0.4, d * 0.65)), -0.03, 64);
      K.ribbon('AVERAGE', 540, 1260, R2(seg(lt, d * 0.6, d * 0.85)), 80);
    } });
    cue(st, 'whoosh'); cue(st + len(1) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.6, 'pop', { gain: 0.5 }); }

  // 2 · so when does YOUR audience scroll? a clock spins, big ?
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.12, note: 'clock spins fast, crimson ?, YOUR AUDIENCE slip', draw(lt, d, t) {
      dayPage(3); ground(1650, M.wall2);
      clock(420, 900, 2.0, lt * 10);
      bigMark('?', 820, 760, R2(seg(lt, 0.3, 0.6)), Math.sin(t * 2) * 0.1, P.crimson, 420);
      K.slip('YOUR AUDIENCE', 540, 1400, R2(seg(lt, d * 0.4, d * 0.7)), 0.03, 72);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'tock', { gain: 0.3 }); cue(st + 0.3, 'boing', { gain: 0.4 }); }

  // 3 · EY: Indians spent 1.1 trillion hours on phones in 2024: India map full of glowing phones, gold numbers
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 900], zoom: 0.08, note: 'India map, phone glows pop on cities, 2024 ribbon, 1.1 TRILLION HRS slip', draw(lt, d, t) {
      indiaMap(4);
      Object.values(CITY).forEach(([lo, la], k) => { const [x, y] = geo(lo, la), a = d * (0.15 + k * 0.08), s = R2(seg(lt, a, a + 0.3)); if (s > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-26, -46, 52, 92, 10), '#1F1D1A', { shadow: 0.5, edge: 3 }); rr(-19, -38, 38, 72, 5); ctx.fillStyle = P.gold; ctx.fill(); ctx.restore(); } });
      K.ribbon('2024', 540, 200, R2(seg(lt, 0.05, 0.35)), 90);
      K.slip('1.1 TRILLION HRS', 540, 1520, R2(seg(lt, d * 0.6, d * 0.85)), -0.03, 80);
      K.label('SOURCE: EY', 540, 1660, 36);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.4 }); for (let k = 0; k < 6; k++) cue(st + len(3) * (0.15 + k * 0.08), 'pop', { gain: 0.35 }); cue(st + len(3) * 0.6, 'thud', { gain: 0.5 }); }

  // 4 · that's 5 hours a day: a big gold 5 HRS next to a phone + clock
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.14, note: 'big gold 5, HRS / DAY slip, a phone in hand', draw(lt, d, t) {
      dayPage(5, false);
      bigMark('5', 380, 900, R2(seg(lt, 0, 0.35)), -0.06, P.gold, 640);
      phoneBig(800, 980, 0.8, 0.08, () => { ctx.fillStyle = M.screen; ctx.fillRect(-186, -370, 372, 740); clock(0, 0, 1.0, lt * 6); });
      K.slip('HRS / DAY', 540, 1400, R2(seg(lt, 0.3, 0.7)), -0.03, 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'slam', { gain: 0.6 }); cue(st + 0.35, 'pop', { gain: 0.5 }); }

  // 5 · nearly 70% on social media, games and video: a pie-ish bar, three icons
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.08, note: 'gold ~70% bar fills, three cards: SOCIAL / GAMES / VIDEO', draw(lt, d, t) {
      dayPage(6, false);
      K.ribbon('~70%', 540, 300, R2(seg(lt, 0.05, 0.4)), 110);
      cut(P_rr(140, 520, 800, 110, 20), '#FFFBF0'); const f = eo(seg(lt, 0.2, d * 0.5)); if (f > 0) cut(P_rr(155, 535, 770 * 0.7 * f, 80, 14), P.crimson, { shadow: 0, edge: 2 });
      K.label('PHONE TIME', 540, 690, 36);
      ['SOCIAL MEDIA', 'GAMES', 'VIDEOS'].forEach((w, k) => { const a = d * (0.35 + k * 0.15); rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 900 + k * 220 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 620); });
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.2, 'slide', { gain: 0.4 }); for (let k = 0; k < 3; k++) cue(st + len(5) * (0.35 + k * 0.15), 'pop', { gain: 0.5 }); }

  // 6 · you post at 7 PM (chart said so), your audience = college kids scrolling at 11 PM
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator posts at 7 PM (dusk), POST bubble, 7 PM ribbon, empty room', draw(lt, d, t) {
      room(7); ctx.save(); ctx.globalAlpha = 0.2; ctx.fillStyle = M.night; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore();
      clock(800, 500, 1.1, 0.4); person({ x: 380, y: 1560, h: 700, arm: 75, glow: 0.7, top: P.crimson });
      K.ribbon('7 PM', 540, 230, R2(seg(lt, 0.05, 0.35)), 96);
      bubble('Posted!', 420, 620, R2(seg(lt, 0.3, 0.6)), false, 72);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 980], zoom: 0.12, note: 'night page: 3 students on phones glowing at 11 PM, COLLEGE KIDS slip', draw(lt, d, t) {
      nightPage(8); ground(1650, '#3B3550');
      K.ribbon('11 PM', 540, 260, R2(seg(lt, 0.05, 0.35)), 96);
      [[220, P.royal, 1], [540, M.hoodie, 1], [860, P.green, -1]].forEach(([x, c, dir], k) => person({ x, y: 1660, h: 520, arm: 75, dir, glow: 0.8 + 0.2 * Math.sin(t * 4 + k), top: c }));
      K.slip('COLLEGE KIDS', 540, 1780, R2(seg(lt, 0.3, 0.6)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.05, 'pop', { gain: 0.5 }); }

  // 7 · game changer: your own views beat any chart: the generic chart gets struck out, YOUR chart peaks at 11 PM
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.08, note: 'small generic chart struck out, big YOUR VIEWS chart with crimson 11P bar', draw(lt, d, t) {
      dayPage(9, false);
      timeChart(540, 420, 520, 360, 1, 3, undefined, undefined, 0.8); strike(330, 440, 420, eo(seg(lt, 0.3, 0.6)));
      timeChart(540, 1100, 860, 660, seg(lt, d * 0.2, d * 0.9), 5, [0.2, 0.3, 0.25, 0.35, 0.6, 1], undefined, R2(seg(lt, 0.1, 0.45)));
      K.ribbon('YOUR VIEWS', 540, 1560, R2(seg(lt, d * 0.6, d * 0.85)), 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'zip', { gain: 0.5 }); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.6, 'sparkle', { dur: 0.6, gain: 0.4 }); }

  // 8 · craziest part: they're already on the phone, the only question is WHEN: a phone glows, big crimson WHEN?
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'a hand holding a glowing phone, ALREADY ON IT slip, then WHEN? ribbon', draw(lt, d, t) {
      dayPage(10); ground(1650, M.wall2);
      phoneBig(540, 1000, 1.1, -0.04, () => { postCard(0, -60, 0.9, 0, 0.5 + 0.5 * Math.sin(t * 4)); });
      hand(600, 1420, 1.2, -0.1);
      K.slip('ALREADY ON IT', 540, 380, R2(seg(lt, 0.2, 0.5)), -0.03, 70);
      K.ribbon('WHEN?', 540, 1720, R2(seg(lt, d * 0.55, d * 0.8)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.55, 'slam', { gain: 0.6 }); }

  // 9 · pick 3 slots, test 2 weeks, keep the winner
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.5;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.08, note: '3 SLOTS ribbon, three slot cards 1 PM / 7 PM / 11 PM', draw(lt, d, t) {
      dayPage(11, false); K.ribbon('3 SLOTS', 540, 300, R2(seg(lt, 0.05, 0.35)), 96);
      ['1 PM', '7 PM', '11 PM'].forEach((w, k) => { const a = 0.25 + k * 0.25; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 640 + k * 260 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 560); });
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.1, note: '14-day calendar ticks fill, the 11 PM card gets a gold WINNER seal', draw(lt, d, t) {
      dayPage(12, false); twoWeeks(540, 700, Math.floor(14 * seg(lt, 0.1, d * 0.6)), R2(seg(lt, 0, 0.3)));
      rankCard(1, '11 PM', 540, 1240, R2(seg(lt, d * 0.55, d * 0.75)), -0.02, 560);
      K.ribbon('WINNER', 540, 1480, R2(seg(lt, d * 0.7, d * 0.9)), 84);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.25 + k * 0.25, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'tock', { gain: 0.4 }); cue(mid + (d9 / 2) * 0.7, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 10 · post on your audience's time: the night students again, the creator's post lands on their phones (loops to beat 6)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.1, note: 'night: creator posts at 11 PM, three students light up with hearts, THEIR TIME ribbon', draw(lt, d, t) {
      nightPage(13); ground(1650, '#3B3550');
      [[220, P.royal, 1], [540, M.hoodie, 1], [860, P.green, -1]].forEach(([x, c, dir], k) => { person({ x, y: 1660, h: 520, arm: 75, dir, glow: 1, top: c }); const s = R2(seg(lt, d * (0.3 + k * 0.12), d * (0.3 + k * 0.12) + 0.3)); bigMark('♥', x + dir * 60, 1000, s * 0.35, 0, P.crimson, 300); });
      K.ribbon('THEIR TIME', 540, 300, R2(seg(lt, 0.05, 0.4)), 96);
      K.slip('NOT THE CHART’S', 540, 600, R2(seg(lt, d * 0.6, d * 0.85)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(st + len(10) * (0.3 + k * 0.12), 'pop', { gain: 0.5 }); }

  // 11 · follow + send: nser seal, the 7 PM chart gets a paper plane, handle slip
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, handle, the old 7P chart struck out', draw(lt, d, t) {
      dayPage(14); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 520, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 880, R2(seg(lt, 0.6, 1.0)), 84);
      timeChart(540, 1240, 520, 360, 1, 3, undefined, undefined, R2(seg(lt, d * 0.5, d * 0.7)) * 0.8); strike(330, 1260, 420, eo(seg(lt, d * 0.7, d * 0.85)));
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.7, 'zip', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
