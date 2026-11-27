// 28 Nov 11am: YOUR FIRST 1,000 FOLLOWERS: WHAT TO POST IN WEEK ONE. Paper style.
// Facts (opened 27 Nov 2026): Buffer, "How to Get More Followers on Instagram in 2026" (Aug 21, 2026; Buffer's own
// analysis of "52 million+ posts" from "200,000+ accounts"): "Posting 3–5 times per week grows followers 2× faster than
// posting 1–2 times"; "Instagram Reels earn 36% more reach than other post types"; "Replying to comments lifts
// engagement by 21%"; "better to post three times a week consistently than to post daily for two weeks and then
// disappear"; "Your first 1,000 followers usually come from consistency over a few months, not one viral moment";
// keywords in the name field make a profile "discoverable in Instagram search" ("Add one or two keywords"); trial reels
// = "a way to post a reel to a group of non-followers". The new-page story is a generic example. Loop line is nser's.
// No real person, no logos.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, rankCard, strike, magnifier, coins, barPair, clock } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a reel card (tall, play button) */
function reel(x, y, s, rot = 0, col = P.sea, mark = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -260, 300, 520, 20), '#FFFBF0'); rr(-126, -236, 252, 400, 10); ctx.fillStyle = col; ctx.fill();
  cut(P_poly([[-30, -86], [-30, 6], [46, -40]]), P.edge, { shadow: 0.3, edge: 0 });
  line([[-110, 200], [60, 200]], 'rgba(62,44,30,0.3)', 12);
  if (mark) { ctx.save(); ctx.globalAlpha = 0.85; K.label(mark, 0, 120, 34, P.edge); ctx.restore(); } ctx.restore(); }
/** a profile card: round avatar + big follower count */
function profile(x, y, s, count, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-340, -200, 680, 400, 24), '#FFFBF0'); cut(P_circ(-200, -30, 100), P.sea, { shadow: 0.3, edge: 4 }); circle(-200, -60, 40, P.edge); cut(() => { ctx.beginPath(); ctx.ellipse(-200, 30, 66, 40, 0, Math.PI, 0); }, P.edge, { shadow: 0, edge: 0 });
  K.label(String(count), 120, -50, 110, P.ink); K.label('FOLLOWERS', 120, 50, 40, P.sepia); line([[-280, 140], [280, 140]], 'rgba(62,44,30,0.25)', 12); ctx.restore(); }
/** a week strip: 7 day boxes; ticks = array of indexes with a post; p reveals them */
function week(x, y, s, ticks, p, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const D = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
  cut(P_rr(-470, -120, 940, 240, 20), '#FFFBF0');
  D.forEach((d, k) => { const bx = -400 + k * 133; K.label(d, bx, -70, 36, P.sepia); cut(P_rr(bx - 52, -36, 104, 120, 12), P.parchDark, { shadow: 0.2, edge: 3 });
    if (ticks.includes(k) && p * 7 > k) { const q = R2(clamp(p * 7 - k)); if (q > 0) { ctx.save(); ctx.translate(bx, 24); ctx.scale(q, q); cut(P_rr(-40, -48, 80, 96, 10), col, { shadow: 0.4, edge: 3 }); cut(P_poly([[-10, -20], [-10, 20], [18, 0]]), P.edge, { shadow: 0, edge: 0 }); ctx.restore(); } } });
  ctx.restore(); }
/** a search bar */
function search(x, y, s, text, p) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-420, -70, 840, 140, 70), '#FFFBF0'); ctx.strokeStyle = P.ink; ctx.lineWidth = 9; ctx.beginPath(); ctx.arc(-330, -8, 30, 0, TAU); ctx.stroke(); line([[-308, 14], [-280, 42]], P.ink, 9);
  const n = Math.floor(text.length * clamp(p)); ctx.font = '700 58px Caladea'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.ink; ctx.fillText(text.slice(0, n), -250, 4);
  if (p < 1 && Math.floor(p * 20) % 2 === 0) line([[-250 + ctx.measureText(text.slice(0, n)).width + 6, -30], [-250 + ctx.measureText(text.slice(0, n)).width + 6, 34]], P.crimson, 6);
  ctx.restore(); }
/** a stamp that slams in */
function stamp(text, x, y, p, rot = -0.08, col = P.crimson, w = 520, size = 76) { const sc = p <= 0 ? 0 : lerp(2.2, 1, eo(p)); if (!sc) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); cut(P_rr(-w / 2, -70, w, 140, 14), col); K.label(text, 0, 6, size, P.edge); ctx.restore(); }
/** a sleeping zzz */
function zzz(x, y, s, t) { if (s <= 0) return; ctx.save(); ctx.globalAlpha = clamp(s); for (let k = 0; k < 3; k++) K.label('Z', x + k * 50, y - k * 60 - 10 * Math.sin(t * 3 + k), 60 + k * 16, P.edge); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · new page, zero followers? what to post in week one
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'a creator with phone in a room, profile card reads 0 FOLLOWERS, crimson 0 pulses', draw(lt, d, t) {
      room(1);
      profile(540, 560, 1.0 * R2(seg(lt, 0.02, 0.22)), 0, -0.03);
      person({ x: 540, y: 1600, h: 600, arm: 80, top: M.hoodie2, glow: 0.6 });
      K.slip('NEW PAGE', 540, 230, R2(seg(lt, d * 0.35, d * 0.6)), -0.04, 64);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'WEEK ONE strip with empty days and a big gold ?, ribbon WHAT TO POST?', draw(lt, d, t) {
      dayPage(2);
      K.slip('WEEK ONE', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      week(540, 700, 1.0 * R2(seg(lt, 0.05, 0.25)), [], 0);
      bigMark('?', 540, 1120, R2(seg(lt, d * 0.25, d * 0.4)), 0.05 * Math.sin(t * 3), P.gold, 340);
      K.ribbon('WHAT TO POST?', 540, 1520, R2(seg(lt, d * 0.5, d * 0.8)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.45, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'pop', { gain: 0.6 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.8 }); }

  // 1 · simply put: first 1,000 come from months of consistency, not one viral reel
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, one VIRAL reel with a rocket-like gold burst gets struck through', draw(lt, d, t) {
      nightPage(3);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      reel(540, 850, 1.1 * R2(seg(lt, 0.05, 0.25)), 0.03, P.crimson, 'VIRAL');
      bigMark('✕', 780, 600, R2(seg(lt, d * 0.5, d * 0.65)), 0.1, P.crimson, 260);
      K.slip('ONE VIRAL REEL', 540, 1350, R2(seg(lt, d * 0.25, d * 0.45)), 0.03, 60);
      strike(260, 1360, 560, seg(lt, d * 0.55, d * 0.75));
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a row of many small reels over months, follower card counts up to 1,000: CONSISTENCY ribbon', draw(lt, d, t) {
      dayPage(4);
      for (let k = 0; k < 8; k++) reel(150 + (k % 4) * 260, 450 + Math.floor(k / 4) * 330, 0.5 * R2(seg(lt, d * (0.02 + k * 0.05), d * (0.12 + k * 0.05))), (k % 2 ? 0.04 : -0.04), [P.sea, P.forest, P.gold, P.royal][k % 4]);
      const n = Math.round(1000 * eo(seg(lt, d * 0.2, d * 0.7)));
      profile(540, 1180, 0.8 * R2(seg(lt, d * 0.1, d * 0.25)), n.toLocaleString('en-IN'), 0.02);
      K.ribbon('CONSISTENCY', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.55, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); [0.05, 0.15, 0.25, 0.35].forEach((a) => cue(mid + d1 * 0.5 * a, 'pop', { gain: 0.3 })); cue(mid + d1 * 0.5 * 0.65, 'sparkle', { gain: 0.6 }); }

  // 2 · Buffer looked at 52 million+ posts from 200,000+ accounts
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'a magnifier sweeps over a wall of tiny post cards; gold 52M+ POSTS and 200K+ ACCOUNTS', draw(lt, d, t) {
      dayPage(5);
      K.slip('BUFFER STUDY', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      for (let k = 0; k < 12; k++) postCard(160 + (k % 4) * 255, 520 + Math.floor(k / 4) * 230, 0.42 * R2(seg(lt, d * (0.03 + k * 0.025), d * (0.12 + k * 0.025))), (k % 2 ? 0.05 : -0.05));
      magnifier(lerp(200, 860, eio(seg(lt, d * 0.2, d * 0.9))), 700 + 60 * Math.sin(t * 2), 1.0 * R2(seg(lt, d * 0.15, d * 0.3)));
      bigMark('52M+', 540, 1270, R2(seg(lt, d * 0.3, d * 0.45)), -0.03, P.gold, 190); K.label('POSTS', 540, 1390, 50, P.ink);
      K.slip('200K+ ACCOUNTS', 540, 1560, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 62);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); for (let k = 0; k < 12; k += 3) cue(st + len(2) * (0.05 + k * 0.025), 'pop', { gain: 0.25 }); cue(st + len(2) * 0.35, 'slam', { gain: 0.8 }); cue(st + len(2) * 0.6, 'pop', { gain: 0.6 }); }

  // 3 · 3-5 posts a week grew followers 2x as fast as 1-2
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.45;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'two week strips: top 1-2 posts (stone), bottom 3-5 posts (gold)', draw(lt, d, t) {
      room(6);
      K.slip('1-2 A WEEK', 540, 330, R2(seg(lt, 0.02, 0.2)), -0.03, 60);
      week(540, 560, 0.95 * R2(seg(lt, 0.05, 0.2)), [1, 4], seg(lt, d * 0.1, d * 0.4), P.stone);
      K.slip('3-5 A WEEK', 540, 870, R2(seg(lt, d * 0.35, d * 0.5)), 0.03, 60);
      week(540, 1100, 0.95 * R2(seg(lt, d * 0.4, d * 0.55)), [0, 1, 3, 4, 6], seg(lt, d * 0.5, d * 0.9));
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.16, note: 'bar pair: 1-2 short stone bar, 3-5 crimson bar twice as tall, big gold 2X', draw(lt, d, t) {
      dayPage(7);
      barPair({ v: 1, label: '1-2 / WEEK', txt: '1X' }, { v: 2, label: '3-5 / WEEK', txt: '2X', hot: true }, 360, 1350, seg(lt, 0.05, 0.5), 700);
      K.ribbon('2X FASTER', 540, 1580, R2(seg(lt, d * 0.55, d * 0.85)), 100);
      K.slip('FOLLOWER GROWTH', 540, 330, R2(seg(lt, d * 0.02, d * 0.2)), -0.03, 58);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d3 * 0.45 * 0.5, 'pop', { gain: 0.4 }); cue(st + d3 * 0.45 * 0.7, 'sparkle', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d3 * 0.55 * 0.3, 'zip', { gain: 0.6 }); cue(mid + d3 * 0.55 * 0.65, 'slam', { gain: 0.8 }); }

  // 4 · you: new page, posted every day in week one, then got tired and vanished
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you with phone, week strip fills EVERY DAY with gold reels', draw(lt, d, t) {
      dayPage(8);
      week(540, 520, 0.95 * R2(seg(lt, 0.02, 0.2)), [0, 1, 2, 3, 4, 5, 6], seg(lt, d * 0.15, d * 0.8));
      person({ x: 540, y: 1650, h: 680, arm: 90 + 10 * Math.sin(t * 6), top: M.tee, glow: 0.8 });
      K.slip('EVERY DAY', 540, 260, R2(seg(lt, d * 0.3, d * 0.5)), -0.03, 70);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'night: same person asleep-tired, phone dark, zzz; week two strip all empty: GONE stamp', draw(lt, d, t) {
      nightPage(9);
      K.slip('WEEK TWO', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      week(540, 500, 0.95 * R2(seg(lt, 0.05, 0.2)), [], 0, P.stone);
      ctx.save(); ctx.translate(380, 1640); ctx.rotate(-0.1 * eo(seg(lt, d * 0.1, d * 0.4))); person({ x: 0, y: 0, h: 600, arm: 20, top: M.tee, glow: 0 }); ctx.restore();
      zzz(560, 1000, seg(lt, d * 0.3, d * 0.5), t);
      stamp('GONE', 760, 1350, seg(lt, d * 0.5, d * 0.7), 0.08, P.crimson, 360, 80);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 7; k++) cue(st + d4 * 0.5 * (0.15 + k * 0.09), 'pop', { gain: 0.25 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.4, 'thud', { gain: 0.5 }); cue(mid + d4 * 0.5 * 0.55, 'slam', { gain: 0.8 }); }

  // 5 · Buffer: 3x a week, steady, beats daily for two weeks then vanishing
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: '2 WEEKS DAILY then a gap: strip of 14 gold then 14 empty, struck through', draw(lt, d, t) {
      room(10);
      K.slip('DAILY, THEN GONE', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 60);
      for (let k = 0; k < 28; k++) { const q = R2(seg(lt, d * (0.05 + k * 0.012), d * (0.12 + k * 0.012))); if (q > 0) cut(P_rr(110 + (k % 7) * 125, 520 + Math.floor(k / 7) * 150, 100 * q, 110 * q, 10), k < 14 ? P.gold : P.parchDark, { shadow: 0.3, edge: 3 }); }
      bigMark('✕', 540, 1300, R2(seg(lt, d * 0.6, d * 0.75)), 0.1, P.crimson, 280);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: '3 A WEEK, STEADY: four weeks, 3 gold reels each, a gold tick; ribbon STEADY WINS', draw(lt, d, t) {
      dayPage(11);
      K.slip('3 A WEEK', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      for (let k = 0; k < 28; k++) { const on = [0, 2, 4].includes(k % 7), q = R2(seg(lt, d * (0.05 + k * 0.012), d * (0.12 + k * 0.012))); if (q > 0) cut(P_rr(110 + (k % 7) * 125, 520 + Math.floor(k / 7) * 150, 100 * q, 110 * q, 10), on ? P.gold : P.parchDark, { shadow: 0.3, edge: 3 }); }
      bigMark('✓', 540, 1290, R2(seg(lt, d * 0.5, d * 0.65)), -0.1, P.forest, 280);
      K.ribbon('STEADY WINS', 540, 1580, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.65, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); [0.1, 0.25, 0.4].forEach((a) => cue(mid + d5 * 0.55 * a, 'pop', { gain: 0.3 })); cue(mid + d5 * 0.55 * 0.55, 'sparkle', { gain: 0.6 }); cue(mid + d5 * 0.55 * 0.65, 'slam', { gain: 0.7 }); }

  // 6 · game changer: reels got 36% more reach; new people come through reels
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip; a reel card next to a photo post, reel grows taller; gold +36% REACH', draw(lt, d, t) {
      nightPage(12);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      postCard(300, 800, 0.9 * R2(seg(lt, 0.05, 0.2)), -0.05);
      reel(760, 800, (0.9 + 0.25 * eo(seg(lt, d * 0.35, d * 0.6))) * R2(seg(lt, 0.1, 0.25)), 0.04, P.crimson, 'REEL');
      bigMark('+36%', 540, 1350, R2(seg(lt, d * 0.4, d * 0.55)), -0.03, P.gold, 220);
      K.label('REACH', 540, 1500, 56, P.edge);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a reel in the middle, three new people walk toward it along dashed routes: NEW PEOPLE ribbon', draw(lt, d, t) {
      dayPage(13);
      reel(540, 640, 0.9 * R2(seg(lt, 0.02, 0.2)), 0.02, P.crimson, 'REEL');
      K.dashedRoute([[160, 1250], [400, 950]], seg(lt, d * 0.15, d * 0.4)); K.dashedRoute([[540, 1250], [540, 960]], seg(lt, d * 0.2, d * 0.45)); K.dashedRoute([[920, 1250], [680, 950]], seg(lt, d * 0.25, d * 0.5));
      person({ x: 160, y: 1600, h: 380, arm: 60, top: P.royal, glow: 0.5 }); person({ x: 540, y: 1600, h: 380, arm: 60, top: P.wine, glow: 0.5 }); person({ x: 920, y: 1600, h: 380, arm: 60, top: P.forest, glow: 0.5, dir: -1 });
      K.ribbon('NEW PEOPLE', 540, 1700, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.45, 'zip', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.55, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.25, 'plop', { gain: 0.4 }); cue(mid + d6 * 0.55 * 0.65, 'slam', { gain: 0.7 }); }

  // 7 · craziest: a trial reel goes first only to non-followers, so testing a hook is free
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip; a TRIAL REEL card goes to strangers (grey figures), followers side has a crimson X', draw(lt, d, t) {
      dayPage(14);
      K.slip('CRAZIEST PART', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      reel(540, 640, 0.8 * R2(seg(lt, 0.05, 0.2)), 0.02, P.gold, 'TRIAL');
      K.dashedRoute([[640, 900], [820, 1100]], seg(lt, d * 0.25, d * 0.5));
      person({ x: 820, y: 1560, h: 420, arm: 60, top: P.stoneDark, glow: eo(seg(lt, d * 0.45, d * 0.6)), dir: -1 }); K.slip('NON-FOLLOWERS', 800, 1650, R2(seg(lt, d * 0.45, d * 0.6)), 0.03, 46);
      person({ x: 260, y: 1560, h: 420, arm: 60, top: P.royal, glow: 0 }); K.slip('FOLLOWERS', 260, 1650, R2(seg(lt, d * 0.3, d * 0.45)), -0.03, 46);
      bigMark('✕', 260, 1000, R2(seg(lt, d * 0.55, d * 0.7)), 0.1, P.crimson, 200);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'two hook slips HOOK A / HOOK B on fish hooks, gold tick on one: TEST FOR FREE ribbon', draw(lt, d, t) {
      nightPage(15);
      rankCard('A', 'HOOK', 300, 600, R2(seg(lt, 0.02, 0.2)), -0.04, 420);
      rankCard('B', 'HOOK', 780, 600, R2(seg(lt, 0.1, 0.28)), 0.04, 420);
      reel(300, 1000, 0.55 * R2(seg(lt, 0.15, 0.3)), -0.03, P.stone); reel(780, 1000, 0.55 * R2(seg(lt, 0.2, 0.35)), 0.03, P.gold);
      bigMark('✓', 860, 1250, R2(seg(lt, d * 0.45, d * 0.6)), 0.1, P.gold, 200);
      K.ribbon('TEST FOR FREE', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.3, 'zip', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.6, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.4 }); cue(mid + d7 * 0.55 * 0.5, 'sparkle', { gain: 0.6 }); cue(mid + d7 * 0.55 * 0.65, 'slam', { gain: 0.7 }); }

  // 8 · week one step 1: one or two keywords in the name field, get found in search
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: '1 NAME FIELD card; search bar types HOME COOKING; the profile card pops below with a gold tick', draw(lt, d, t) {
      dayPage(16);
      rankCard(1, 'NAME FIELD', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 640);
      search(540, 560, R2(seg(lt, 0.08, 0.25)), 'home cooking', seg(lt, d * 0.2, d * 0.55));
      profile(540, 1000, 0.85 * R2(seg(lt, d * 0.55, d * 0.7)), '+1', 0.02);
      K.ribbon('1-2 KEYWORDS', 540, 1450, R2(seg(lt, d * 0.65, d * 0.9)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); for (let k = 0; k < 6; k++) cue(st + len(8) * (0.22 + k * 0.05), 'tock', { gain: 0.3 }); cue(st + len(8) * 0.58, 'pop', { gain: 0.6 }); cue(st + len(8) * 0.7, 'slam', { gain: 0.6 }); }

  // 9 · step 2: three reels a week + reply to every comment: +21% engagement
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.45;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: '2 THREE REELS card: week strip with 3 gold reels', draw(lt, d, t) {
      room(17);
      rankCard(2, '3 REELS A WEEK', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.02, 720);
      week(540, 700, 0.95 * R2(seg(lt, 0.05, 0.2)), [0, 2, 4], seg(lt, d * 0.2, d * 0.8));
      person({ x: 540, y: 1620, h: 560, arm: 80, top: M.hoodie, glow: 0.7 });
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.16, note: '3 REPLY card: phone with comment bubbles and your replies, gold +21%', draw(lt, d, t) {
      dayPage(18);
      rankCard(3, 'REPLY TO COMMENTS', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.02, 780);
      phoneBig(420, 880, 0.9 * R2(seg(lt, 0.05, 0.2)), -0.03, () => {
        bubble('love this!', -160, -260, R2(seg(lt, d * 0.15, d * 0.3)), false, 42);
        bubble('thank you!', 160, -150, R2(seg(lt, d * 0.25, d * 0.4)), true, 42);
        bubble('recipe?', -160, -30, R2(seg(lt, d * 0.35, d * 0.5)), false, 42);
        bubble('next reel!', 160, 80, R2(seg(lt, d * 0.45, d * 0.6)), true, 42); });
      bigMark('+21%', 720, 1360, R2(seg(lt, d * 0.55, d * 0.7)), 0.05, P.gold, 150);
      K.slip('ENGAGEMENT', 720, 1520, R2(seg(lt, d * 0.65, d * 0.85)), 0.03, 52);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.3, 0.45, 0.6].forEach((a) => cue(st + d9 * 0.45 * a, 'pop', { gain: 0.35 })); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); [0.2, 0.3, 0.4, 0.5].forEach((a) => cue(mid + d9 * 0.55 * a, 'pop', { gain: 0.3 })); cue(mid + d9 * 0.55 * 0.6, 'slam', { gain: 0.8 }); }

  // 10 · loop: not viral, regular (back to the beat-0 room, the card now climbing)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: profile card ticks up, VIRAL struck, REGULAR ribbon', draw(lt, d, t) {
      room(1);
      profile(540, 560, 1.0 * R2(seg(lt, 0.02, 0.2)), Math.round(lerp(0, 1000, eo(seg(lt, 0.05, d)))).toLocaleString('en-IN'), -0.03);
      K.slip('NOT VIRAL', 540, 950, R2(seg(lt, 0.05, 0.3)), -0.04, 70); strike(330, 960, 420, seg(lt, d * 0.3, d * 0.5));
      K.ribbon('REGULAR', 540, 1250, R2(seg(lt, d * 0.4, d * 0.8)), 130);
      person({ x: 540, y: 1750, h: 380, arm: 80, top: M.hoodie2, glow: 0.8 });
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(10) * 0.5, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend who just started a new page
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a 0-follower card cheers up, handle slip', draw(lt, d, t) {
      dayPage(19); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      profile(300, 1200, 0.5 * R2(seg(lt, d * 0.3, d * 0.45)), 0, -0.05); K.slip('NEW PAGE', 300, 1380, R2(seg(lt, d * 0.35, d * 0.5)), -0.03, 44);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'pop', { gain: 0.4 }); }

  return { shots: S, cues: CUES };
}
