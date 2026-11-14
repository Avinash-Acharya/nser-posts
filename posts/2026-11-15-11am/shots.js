// 15 Nov 11am: CAROUSEL OR REEL? WHEN TO USE WHICH. Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, skyline, magnifier, bigMark,
  hand, clock, rankCard, strike, barPair } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

const txt = (s, x, y, size, col = P.ink, align = 'center') => { ctx.font = `700 ${size}px Caladea`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
/** a fanned stack of n carousel slides with page dots; p fans them out */
function carousel(x, y, sc, p = 1, n = 4, rot = 0) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  for (let k = n - 1; k >= 0; k--) { const f = eo(clamp(p)); ctx.save(); ctx.translate(k * 46 * f, -k * 18 * f); ctx.rotate(k * 0.05 * f);
    cut(P_rr(-180, -220, 360, 440, 14), k ? '#F3E9D2' : '#FFFBF0', { shadow: 0.6, edge: 4 });
    if (!k) { line([[-120, -130], [120, -130]], P.crimson, 18); line([[-120, -60], [90, -60]], 'rgba(62,44,30,0.35)', 14); line([[-120, -10], [110, -10]], 'rgba(62,44,30,0.35)', 14); line([[-120, 40], [60, 40]], 'rgba(62,44,30,0.35)', 14); }
    ctx.restore(); }
  for (let k = 0; k < n; k++) circle(-((n - 1) * 30) / 2 + k * 30, 270, 10, k ? 'rgba(62,44,30,0.3)' : P.ink);
  ctx.restore(); }
/** a phone playing a reel: big play triangle + a progress bar; t animates */
function reelPhone(x, y, s, rot, t) { phoneBig(x, y, s, rot, () => { ctx.fillStyle = M.screen; ctx.fillRect(-186, -370, 372, 740);
  cut(P_poly([[-50, -80], [-50, 80], [80, 0]]), '#FFFBF0', { shadow: 0, edge: 0 });
  rr(-150, 300, 300, 12, 6); ctx.fillStyle = 'rgba(255,255,255,0.25)'; ctx.fill(); rr(-150, 300, 300 * ((t * 0.3) % 1), 12, 6); ctx.fillStyle = P.crimson; ctx.fill(); }); }
/** small grey "stranger" heads in a row, n popped in by p */
function crowd(x0, y, n, p, gap = 110, col = P.stone) { for (let k = 0; k < n; k++) { const s = R2(seg(p, k / n * 0.7, k / n * 0.7 + 0.3)); if (s <= 0) continue; ctx.save(); ctx.translate(x0 + k * gap, y); ctx.scale(s, s); cut(P_circ(0, -60, 34), P.skin, { shadow: 0.4, edge: 3 }); cut(P_rr(-44, -24, 88, 90, 30), col, { shadow: 0.4, edge: 3 }); ctx.restore(); } }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · reel or carousel? same confusion every post: creator between a reel phone and a carousel stack, a big ?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'REEL? vs CAROUSEL? slips, phone left, slide stack right, creator in the middle with a ?', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      reelPhone(250, 860, 0.62, -0.08 + Math.sin(t * 2) * 0.03, t);
      carousel(820, 880, R2(seg(lt, 0.25, 0.55)), seg(lt, 0.4, 0.9), 4, 0.06 + Math.sin(t * 2 + 1) * 0.03);
      person({ x: 540, y: 1760, h: 480, arm: 30, top: M.hoodie2 });
      K.slip('REEL?', 250, 360, R2(seg(lt, 0.05, 0.3)), -0.04, 72);
      K.slip('CAROUSEL?', 820, 360, R2(seg(lt, 0.3, 0.55)), 0.04, 72);
      bigMark('?', 540, 1080, R2(seg(lt, d * 0.55, d * 0.8)), Math.sin(t * 3) * 0.12, P.crimson, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.55, 'boing', { gain: 0.4 }); }

  // 1 · simply put: reel = reach new people, carousel = teach
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.1, note: 'split page: reel phone + NEW PEOPLE crowd on top; carousel + TEACH ribbon below', draw(lt, d, t) {
      dayPage(2, false);
      reelPhone(260, 560, 0.5, -0.05, t); ctx.save(); ctx.translate(560, 700); ctx.scale(1.6, 1.6); crowd(0, 0, 4, seg(lt, 0.1, d * 0.45), 75); ctx.restore();
      K.slip('NEW PEOPLE', 700, 380, R2(seg(lt, 0.15, 0.4)), -0.03, 66);
      line([[90, 1000], [990, 1000]], 'rgba(62,44,30,0.3)', 6);
      carousel(300, 1360, R2(seg(lt, d * 0.45, d * 0.65)), seg(lt, d * 0.5, d * 0.9), 4);
      K.ribbon('TEACH', 760, 1360, R2(seg(lt, d * 0.6, d * 0.85)), 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.45, 'slide', { gain: 0.4 }); cue(st + len(1) * 0.6, 'pop', { gain: 0.5 }); }

  // 2 · Instagram says: in Reels, most of what you see is from accounts you don't follow
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.08, note: 'phone scrolls reels; each card tagged NOT FOLLOWING; ribbon MOSTLY STRANGERS; source label', draw(lt, d, t) {
      dayPage(3); ground(1650, M.wall2);
      phoneBig(540, 950, 1.0, 0, () => { ctx.fillStyle = M.screen; ctx.fillRect(-186, -370, 372, 740); const off = (lt * 260) % 480;
        for (let k = -1; k < 3; k++) { postCard(0, -200 + k * 480 - off, 0.85, 0, 0); } });
      ['NOT FOLLOWING', 'NOT FOLLOWING', 'FOLLOWING'].forEach((w, k) => { const a = d * (0.2 + k * 0.15); K.slip(w, k % 2 ? 680 : 400, 620 + k * 330, R2(seg(lt, a, a + 0.25)), k % 2 ? 0.04 : -0.04, 56); });
      K.ribbon('MOSTLY NEW', 540, 260, R2(seg(lt, d * 0.65, d * 0.85)), 92);
      K.label('SOURCE: INSTAGRAM', 540, 1560, 36);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); for (let k = 0; k < 3; k++) cue(st + len(2) * (0.2 + k * 0.15), 'pop', { gain: 0.45 }); cue(st + len(2) * 0.65, 'slam', { gain: 0.5 }); }

  // 3 · a study of 3 million+ posts, accounts under 10K: a magnifier over a mountain of post cards
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.1, note: 'pile of post cards, magnifier sweeps, gold 3M+ POSTS ribbon, UNDER 10K slip', draw(lt, d, t) {
      dayPage(4, false);
      for (let k = 0; k < 14; k++) { const a = k * 0.04; const s = R2(seg(lt, a, a + 0.3)); if (s > 0) postCard(160 + (k % 5) * 190 + (Math.floor(k / 5) % 2) * 90, 860 + Math.floor(k / 5) * 200, 0.55 * s, (rnd(k) - 0.5) * 0.5, 0); }
      magnifier(lerp(260, 820, eio(seg(lt, 0.2, d * 0.9))), 960, 1.2);
      K.ribbon('3M+ POSTS', 540, 300, R2(seg(lt, 0.1, 0.4)), 100);
      K.slip('UNDER 10K FOLLOWERS', 540, 1520, R2(seg(lt, d * 0.5, d * 0.8)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + 0.2, 'slide', { gain: 0.4 }); cue(st + len(3) * 0.5, 'pop', { gain: 0.5 }); }

  // 4 · reels reached nearly 3x the non-followers of carousels: bar pair
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 980], zoom: 0.1, note: 'barPair REELS ~3x (crimson) vs CAROUSELS 1x, NEW PEOPLE ribbon, source label', draw(lt, d, t) {
      dayPage(5, false);
      K.ribbon('NEW PEOPLE', 540, 260, R2(seg(lt, 0.05, 0.35)), 92);
      barPair({ v: 3, label: 'REELS', txt: '~3x', hot: true }, { v: 1, label: 'CAROUSELS', txt: '1x' }, 360, 1420, seg(lt, 0.2, d * 0.8), 780);
      K.label('FANPAGE KARMA, 2026', 540, 1620, 36);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.2, 'slide', { gain: 0.5 }); cue(st + len(4) * 0.8, 'slam', { gain: 0.6 }); }

  // 5 · you: a whole day on a 10-slide carousel, not one new follower
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator at laptop, clock spins a whole day, 10 SLIDES slip, slides stack up', draw(lt, d, t) {
      room(6); clock(820, 420, 1.0, lt * 8);
      laptop(540, 1380, 0.95, () => { carousel(0, -230, 0.55, 1, 3); });
      person({ x: 200, y: 1700, h: 560, arm: 40, top: P.crimson, phone: false });
      K.slip('10 SLIDES', 330, 330, R2(seg(lt, 0.1, 0.4)), -0.04, 72);
      K.ribbon('ALL DAY', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 84);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.12, note: 'phone notification: +0 NEW FOLLOWERS, gold 0 big, empty chair', draw(lt, d, t) {
      nightPage(7); ground(1650, '#3B3550');
      phoneBig(540, 920, 0.95, 0.04, () => { ctx.fillStyle = '#F3E9D2'; ctx.fillRect(-186, -370, 372, 740); txt('NEW', 0, -140, 60); txt('FOLLOWERS', 0, -70, 52); });
      bigMark('0', 540, 1180, R2(seg(lt, 0.15, 0.45)), -0.05, P.gold, 420);
      K.ribbon('NOT ONE', 540, 280, R2(seg(lt, d * 0.4, d * 0.7)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + 0.2, 'tock', { gain: 0.3 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'thud', { gain: 0.6 }); }

  // 6 · game changer: pick the format by your GOAL, not habit: a target with a dart; "habit" struck out
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.1, note: 'paper target, dart lands, GOAL ribbon; HABIT slip struck out', draw(lt, d, t) {
      dayPage(8, false);
      [[300, P.crimson], [220, '#FFFBF0'], [140, P.crimson], [60, '#FFFBF0']].forEach(([r, c]) => cut(P_circ(540, 900, r * R2(seg(lt, 0.05, 0.35))), c, { shadow: 0.5, edge: 4 }));
      const dp = eo(seg(lt, d * 0.3, d * 0.5)); if (dp > 0) { ctx.save(); ctx.translate(lerp(1100, 560, dp), lerp(500, 880, dp)); ctx.rotate(-0.6); cut(P_rr(0, -9, 240, 18, 9), P.ink); cut(P_poly([[200, 0], [270, -40], [250, 0], [270, 40]]), P.gold, { shadow: 0.3, edge: 2 }); ctx.restore(); }
      K.ribbon('GOAL', 540, 300, R2(seg(lt, d * 0.45, d * 0.7)), 100);
      K.slip('HABIT', 540, 1440, R2(seg(lt, d * 0.6, d * 0.75)), -0.03, 80); strike(400, 1450, 290, eo(seg(lt, d * 0.75, d * 0.9)));
    } });
    cue(st, 'whoosh'); cue(st + len(6) * 0.45, 'thud', { gain: 0.6 }); cue(st + len(6) * 0.5, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.75, 'zip', { gain: 0.5 }); }

  // 7 · craziest: even at 1M+ followers, reels reach ~2x the non-followers
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.08, note: 'big account: a crowd of grey heads, gold 1M+ ribbon', draw(lt, d, t) {
      dayPage(9); ground(1650, M.wall2);
      for (let r = 0; r < 3; r++) crowd(130 + (r % 2) * 55, 1100 + r * 220, 8, seg(lt, 0.05 + r * 0.1, 0.9), 110, [P.stone, P.royal, P.green][r]);
      K.ribbon('1M+ FOLLOWERS', 540, 420, R2(seg(lt, 0.1, 0.4)), 84);
      K.slip('EVEN HERE', 540, 700, R2(seg(lt, d * 0.5, d * 0.8)), -0.03, 70);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 980], zoom: 0.1, note: 'barPair REELS ~2x vs CAROUSELS 1x, NEW PEOPLE label', draw(lt, d, t) {
      dayPage(10, false);
      K.ribbon('STILL ~2x', 540, 260, R2(seg(lt, 0.05, 0.35)), 96);
      barPair({ v: 2, label: 'REELS', txt: '~2x', hot: true }, { v: 1, label: 'CAROUSELS', txt: '1x' }, 360, 1420, 0.15 + 0.85 * seg(lt, 0, d * 0.7), 700);
      K.label('NON-FOLLOWERS REACHED', 540, 1620, 36);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'slide', { gain: 0.5 }); cue(mid + d7 * 0.4, 'slam', { gain: 0.5 }); }

  // 8 · new people -> reel, teaching steps -> carousel, great idea -> both
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.6;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.08, note: 'two rule cards: NEW PEOPLE -> REEL (phone), STEPS -> CAROUSEL (stack)', draw(lt, d, t) {
      dayPage(11, false);
      K.slip('NEW PEOPLE?', 540, 260, R2(seg(lt, 0.05, 0.3)), -0.03, 70);
      reelPhone(540, 650, 0.55, -0.04 + Math.sin(t * 2) * 0.03, t * R2(seg(lt, 0.1, 0.4)));
      K.slip('TEACHING STEPS?', 540, 1080, R2(seg(lt, d * 0.5, d * 0.7)), 0.03, 70);
      carousel(540, 1450, R2(seg(lt, d * 0.55, d * 0.8)), seg(lt, d * 0.6, d * 0.95), 4);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.12, note: 'GREAT IDEA? -> BOTH: phone and carousel side by side, gold BOTH ribbon', draw(lt, d, t) {
      dayPage(12);
      K.slip('GREAT IDEA?', 540, 300, R2(seg(lt, 0.05, 0.3)), -0.03, 70);
      reelPhone(320, 920, 0.6, -0.08, t); carousel(780, 940, R2(seg(lt, 0.15, 0.4)), 1, 4, 0.05);
      K.ribbon('BOTH', 540, 1500, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d8 * 0.6 * 0.5, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + (d8 * 0.4) * 0.4, 'slam', { gain: 0.6 }); }

  // 9 · check Insights: followers vs non-followers: a laptop with a split bar + magnifier
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.1, note: 'laptop with Insights split bar FOLLOWERS (stone) / NON (crimson), INSIGHTS ribbon, magnifier', draw(lt, d, t) {
      room(13);
      laptop(540, 1250, 1.2, () => { const f = eo(seg(lt, 0.2, d * 0.7)); rr(-260, -300, 520, 90, 12); ctx.fillStyle = P.stone; ctx.fill(); rr(-260, -300, 520 * 0.55 * f, 90, 12); ctx.fillStyle = P.crimson; ctx.fill();
        txt('NON', -140, -150, 48, P.crimson); txt('FOLLOWERS', 120, -150, 48); });
      magnifier(lerp(900, 760, eo(seg(lt, 0.3, 0.8))), 760, 0.9);
      K.ribbon('INSIGHTS', 540, 320, R2(seg(lt, 0.05, 0.35)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.2, 'tock', { gain: 0.5 }); cue(st + 0.3, 'slide', { gain: 0.4 }); }

  // 10 · next time no confusion, one question: who do you want to reach? (loops to beat 0)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'creator again between phone and stack; the ? turns into WHO? ribbon; new people pop in', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      reelPhone(250, 860, 0.62, -0.08, t); carousel(820, 880, 1, 1, 4, 0.06);
      person({ x: 540, y: 1760, h: 480, arm: 30, top: M.hoodie2 });
      bigMark('?', 540, 1080, R2(1 - seg(lt, 0.1, 0.35)), 0, P.crimson, 300);
      K.ribbon('WHO?', 540, 330, R2(seg(lt, d * 0.45, d * 0.7)), 120);
      K.slip('ONE QUESTION', 540, 560, R2(seg(lt, 0.25, 0.5)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.45, 'slam', { gain: 0.6 }); }

  // 11 · follow + send
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, phone + stack fly to a friend, handle slip', draw(lt, d, t) {
      dayPage(14); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); reelPhone(lerp(260, 560, f), lerp(1250, 1150, f), 0.5 * R2(seg(lt, d * 0.3, d * 0.5)), 0.1, t);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
