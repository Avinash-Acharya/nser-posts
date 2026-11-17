// 18 Nov 7pm: TRIAL REELS: TEST A REEL ON NON-FOLLOWERS FIRST. Paper style.
// Facts: Instagram Creators blog + Meta Newsroom (10 Dec 2024): shown to non-followers first, not in followers' Feed/grid,
// only you see it's a trial, metrics after ~24 h (views, likes, comments, shares), optional auto-share if it performs well in 72 h.
// Social Media Today (10 Dec 2024): a flop can be dropped without your audience knowing.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, rankCard, strike,
  clock, pin, cup } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper toggle switch; on = 0..1 */
function toggle(x, y, s, on, word = 'TRIAL') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-150, -70, 300, 140, 70), on > 0.5 ? P.green : P.stone, { shadow: 0.6, edge: 5 });
  cut(P_circ(lerp(-80, 80, eio(clamp(on))), 0, 56), '#FFFBF0', { shadow: 0.5, edge: 4 });
  K.label(word, 0, -120, 56, P.ink); ctx.restore(); }
/** a 3x3 profile grid; gap = index of a hidden (dashed) tile */
function grid(x, y, s, gap = -1, fillGap = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-260, -260, 520, 520, 14), '#FFFBF0');
  for (let k = 0; k < 9; k++) { const gx = -165 + (k % 3) * 165, gy = -165 + Math.floor(k / 3) * 165;
    if (k === gap) { ctx.save(); ctx.setLineDash([14, 10]); rr(gx - 70, gy - 70, 140, 140, 8); ctx.lineWidth = 5; ctx.strokeStyle = P.crimson; ctx.stroke(); ctx.restore();
      if (fillGap > 0) { ctx.save(); ctx.globalAlpha = fillGap; rr(gx - 70, gy - 70, 140, 140, 8); ctx.fillStyle = P.gold; ctx.fill(); ctx.restore(); } }
    else { rr(gx - 70, gy - 70, 140, 140, 8); ctx.fillStyle = [P.sea, P.forest, P.stone][k % 3]; ctx.fill(); } }
  ctx.restore(); }
/** a stats card: rows of [label, value]; rv rows shown */
function statsCard(x, y, s, rv) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-280, -300, 560, 600, 18), '#FFFBF0'); K.label('RESULTS', 0, -230, 56, P.crimson); line([[-220, -185], [220, -185]], P.sepia, 5);
  [['Views', '2,400'], ['Likes', '180'], ['Comments', '22'], ['Shares', '64']].forEach(([a, b], k) => { if (k >= rv) return; const yy = -120 + k * 100;
    ctx.font = '700 56px Caladea'; ctx.textBaseline = 'middle'; ctx.textAlign = 'left'; ctx.fillStyle = P.ink; ctx.fillText(a, -225, yy); ctx.textAlign = 'right'; ctx.fillStyle = P.gold; ctx.fillText(b, 225, yy); });
  K.label('example', 0, 265, 32, P.sepia); ctx.restore(); }
/** a crowd of small faceless figures; tint = top colour, glow 0..1 */
function crowd(x0, y, n, h, tops, glow = 0, dir = 1) { for (let k = 0; k < n; k++) person({ x: x0 + k * h * 0.42, y, h, arm: 20, dir, top: tops[k % tops.length], glow }); }
/** a bowl of food */
function bowl(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ell(0, -40, 150, 50, '#F2C14E'); circle(-50, -60, 22, P.crimson); circle(40, -70, 18, P.green); circle(5, -55, 16, P.crimson);
  cut(() => { ctx.beginPath(); ctx.moveTo(-170, -40); ctx.quadraticCurveTo(0, 160, 170, -40); ctx.closePath(); }, P.royal); ctx.restore(); }
/** paper mountains + sun (travel) */
function mountains(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  circle(110, -230, 60, '#EFC66A'); cut(P_poly([[-260, 0], [-90, -260], [60, 0]]), P.forest); cut(P_poly([[-40, 0], [130, -200], [280, 0]]), M.hoodie2); ctx.restore(); }
/** a waste bin */
function bin(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-110, -150], [110, -150], [85, 150], [-85, 150]]), P.stone); cut(P_rr(-130, -180, 260, 40, 10), P.stoneDark, { shadow: 0.4, edge: 4 }); ctx.restore(); }
/** a week strip: 7 day boxes, mark = index of starred day */
function week(x, y, s, p) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-430, -110, 860, 220, 16), '#FFFBF0'); 'MTWTFSS'.split('').forEach((c, k) => { const cx = -360 + k * 120; K.label(c, cx, -50, 44, P.sepia); rr(cx - 45, -10, 90, 90, 8); ctx.fillStyle = 'rgba(62,44,30,0.12)'; ctx.fill(); });
  if (p > 0) { ctx.save(); ctx.translate(-360, 35); ctx.scale(p, p); cut(P_circ(0, 0, 40), P.crimson, { shadow: 0.4, edge: 3 }); ctx.restore(); }
  ctx.restore(); }

/** a tick (ok) or cross in a circle */
function mark(x, y, sc, ok) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_circ(0, 0, 80), ok ? P.green : P.crimson);
  if (ok) line([[-36, 0], [-8, 30], [40, -30]], P.edge, 18); else { line([[-32, -32], [32, 32]], P.edge, 18); line([[32, -32], [-32, 32]], P.edge, 18); } ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · new idea, scared followers won't like it
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator (blue) holds a NEW IDEA slip, followers crowd frowns behind, crimson ? , SCARED? ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal });
      K.slip('NEW IDEA', 300, 500, R2(seg(lt, 0.05, 0.3)), -0.05, 80);
      crowd(660, 1560, 4, 280, [P.wine, M.hoodie2, M.tee, M.hoodie], 0, -1);
      K.slip('FOLLOWERS', 760, 1060, R2(seg(lt, d * 0.3, d * 0.5)), 0.03, 60);
      bigMark('?', 780, 600, R2(seg(lt, d * 0.5, d * 0.7)), Math.sin(t * 3) * 0.12, P.crimson, 260);
      K.ribbon('SCARED?', 540, 1780, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'plop', { gain: 0.6 }); cue(st + len(0) * 0.6, 'boing', { gain: 0.4 }); }

  // 1 · simply put: trial reels go first to non-followers
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'TRIAL REELS ribbon, a reel card slides away from the followers group (greyed) toward a NON-FOLLOWERS group that lights up', draw(lt, d, t) {
      dayPage(2, false); ground(1650, M.wall2);
      K.ribbon('TRIAL REELS', 540, 250, R2(seg(lt, 0.02, 0.25)), 110);
      const f = eo(seg(lt, d * 0.3, d * 0.75));
      postCard(lerp(540, 820, f), lerp(700, 900, f), 0.7, 0.03, 0);
      ctx.save(); ctx.globalAlpha = 0.45; crowd(90, 1600, 3, 260, [P.stone]); ctx.restore();
      K.label('followers', 230, 1700, 40, P.sepia);
      crowd(700, 1600, 3, 260, [P.wine, M.hoodie2, M.tee], f);
      K.slip('NON-FOLLOWERS', 720, 1200, R2(seg(lt, d * 0.4, d * 0.6)), 0.03, 62);
      K.slip('FIRST', 260, 600, R2(seg(lt, d * 0.55, d * 0.75)), -0.05, 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slam', { gain: 0.5 }); cue(st + len(1) * 0.4, 'slide', { gain: 0.5 }); cue(st + len(1) * 0.6, 'sparkle', { dur: 0.5, gain: 0.4 }); }

  // 2 · followers won't see it in Feed or on your grid
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'phone FEED (crossed) and profile GRID with a dashed empty tile, NOT IN FEED / NOT ON GRID slips', draw(lt, d, t) {
      dayPage(3);
      phoneBig(290, 900, 0.75 * R2(seg(lt, 0.02, 0.25)), -0.04, () => postCard(0, -40, 0.95, 0, 0));
      K.slip('NOT IN FEED', 290, 360, R2(seg(lt, 0.1, 0.3)), -0.04, 64);
      grid(790, 950, 0.75 * R2(seg(lt, d * 0.4, d * 0.6)), 4);
      K.slip('NOT ON GRID', 790, 560, R2(seg(lt, d * 0.5, d * 0.7)), 0.04, 64);
      K.ribbon('HIDDEN FROM FOLLOWERS', 540, 1660, R2(seg(lt, d * 0.55, d * 0.85)), 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.45, 'pop', { gain: 0.5 }); }

  // 3 · only you know it's a trial
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'creator alone under a soft spotlight holding a reel card with a gold TRIAL tag, ONLY YOU ribbon', draw(lt, d, t) {
      nightPage(4);
      ctx.save(); ctx.globalAlpha = 0.25; ctx.beginPath(); ctx.moveTo(460, 0); ctx.lineTo(620, 0); ctx.lineTo(900, 1650); ctx.lineTo(180, 1650); ctx.closePath(); ctx.fillStyle = '#FFF2C8'; ctx.fill(); ctx.restore();
      person({ x: 420, y: 1650, h: 700, arm: 70, top: P.royal });
      postCard(720, 900, 0.8, 0.05, 0);
      K.slip('TRIAL', 720, 640, R2(seg(lt, 0.1, 0.35)), 0.05, 70);
      K.ribbon('ONLY YOU KNOW', 540, 1780, R2(seg(lt, d * 0.3, d * 0.6)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.4, 'slam', { gain: 0.5 }); }

  // 4 · you: food creator wants to try a travel reel → Trial toggle before sharing
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, creator with a food bowl, a thought bubble with mountains (travel), FOOD → TRAVEL slips', draw(lt, d, t) {
      room(5);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      bowl(560, 1180, 0.9 * R2(seg(lt, 0.08, 0.3)));
      K.slip('FOOD CREATOR', 600, 1420, R2(seg(lt, d * 0.1, d * 0.35)), -0.03, 60);
      const a = R2(seg(lt, d * 0.45, d * 0.7)); if (a > 0) { ctx.save(); ctx.translate(760, 620); ctx.scale(a, a); cut(() => { ctx.beginPath(); ctx.ellipse(0, 0, 260, 200, 0, 0, TAU); }, '#FFFBF0'); mountains(0, 100, 0.75); ctx.restore(); }
      K.slip('TRAVEL REEL?', 760, 360, R2(seg(lt, d * 0.6, d * 0.85)), 0.04, 64);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.14, note: 'big phone share screen with a reel, a TRIAL toggle that a finger flips green, BEFORE SHARING ribbon', draw(lt, d, t) {
      dayPage(6, false);
      phoneBig(540, 900, 0.95, 0, () => mountains(0, 40, 0.6));
      toggle(540, 1640, R2(seg(lt, 0.05, 0.25)), seg(lt, d * 0.35, d * 0.5));
      hand(720, lerp(1900, 1720, eo(seg(lt, d * 0.2, d * 0.35))), 1.0, -0.2, true);
      K.ribbon('BEFORE YOU SHARE', 540, 250, R2(seg(lt, d * 0.4, d * 0.7)), 86);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + d4 * 0.5 * 0.5, 'plop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(4) * 0.5 * 0.42, 'tock', { gain: 0.7 }); }

  // 5 · ~24 hours later: views, likes, comments, shares
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'clock spins, gold ~24 HRS slip, RESULTS card rows fill: Views, Likes, Comments, Shares (example numbers)', draw(lt, d, t) {
      dayPage(7);
      clock(230, 420, 1.0 * R2(seg(lt, 0.02, 0.2)), t * 6);
      K.slip('~24 HRS', 640, 420, R2(seg(lt, 0.1, 0.3)), 0.03, 110);
      statsCard(540, 1150, 1.15 * R2(seg(lt, d * 0.15, d * 0.35)), Math.floor(4 * clamp(seg(lt, d * 0.3, d * 0.9)) + 0.01));
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.35, 0.5, 0.65, 0.8].forEach((a) => cue(st + len(5) * a, 'tock', { gain: 0.5 })); }

  // 6 · game changer: does well in first 72 hours → Instagram can auto-share with followers
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, gold big 72 HRS, a reel card with a rising arrow line', draw(lt, d, t) {
      dayPage(8, false);
      K.slip('GAME CHANGER', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      bigMark('72 HRS', 540, 650, R2(seg(lt, d * 0.3, d * 0.55)), -0.03, P.gold, 200);
      postCard(380, 1200, 0.9, -0.04, 1);
      const p = eo(seg(lt, d * 0.4, d * 0.9)); line([[600, 1450], [lerp(600, 960, p), lerp(1450, 1000, p)]], P.green, 14);
      K.slip('DOES WELL', 790, 1550, R2(seg(lt, d * 0.6, d * 0.85)), 0.03, 64);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'reel card flies into the profile grid filling the dashed tile, followers crowd lights up, AUTO-SHARED ribbon', draw(lt, d, t) {
      dayPage(9); ground(1650, M.wall2);
      const f = eio(seg(lt, 0.05, 0.4));
      grid(540, 720, 0.95, 4, f > 0.95 ? 1 : 0);
      if (f < 0.95) postCard(lerp(900, 540, f), lerp(1200, 720, f), lerp(0.6, 0.3, f), 0.1, 1);
      crowd(150, 1600, 6, 230, [P.wine, M.hoodie2, M.tee, M.hoodie], eo(seg(lt, 0.4, 0.7)));
      K.ribbon('AUTO-SHARED', 540, 1780, R2(seg(lt, d * 0.3, d * 0.6)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.4, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.35, 'thud', { gain: 0.5 }); cue(mid + 0.6, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 7 · craziest: flops → most followers never know
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, a reel card marked FLOP drops into a bin, followers crowd calm, NOBODY KNOWS ribbon', draw(lt, d, t) {
      dayPage(10, false); ground(1650, M.wall2);
      K.slip('CRAZIEST PART', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      bin(300, 1470, 1.1);
      const f = eio(seg(lt, d * 0.3, d * 0.6)); if (f < 1) postCard(lerp(540, 300, f), lerp(700, 1350, f), lerp(0.9, 0.4, f), f * 1.2, 0);
      K.slip('FLOP', 640, 520, R2(seg(lt, d * 0.1, d * 0.3)) * (1 - f), 0.06, 90);
      crowd(640, 1600, 3, 260, [P.wine, M.hoodie2, M.tee], 0.3);
      K.ribbon('FOLLOWERS DON\'T KNOW', 540, 1780, R2(seg(lt, d * 0.55, d * 0.85)), 74);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.6, 'thud', { gain: 0.6 }); cue(st + len(7) * 0.65, 'boing', { gain: 0.3 }); }

  // 8 · one new idea in a trial every week
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'week strip with a crimson dot on Monday, TRIAL toggle switches on, 1 IDEA / WEEK ribbon', draw(lt, d, t) {
      dayPage(11);
      week(540, 620, R2(seg(lt, 0.02, 0.25)), R2(seg(lt, d * 0.3, d * 0.5)));
      toggle(540, 1150, 1.3 * R2(seg(lt, 0.1, 0.3)), seg(lt, d * 0.5, d * 0.65));
      K.ribbon('1 IDEA A WEEK', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.58, 'tock', { gain: 0.6 }); }

  // 9 · works → share with everyone; doesn't → learn
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'two cards: tick reel → SHARE WITH ALL, cross reel → LEARN (magnifier style), split page', draw(lt, d, t) {
      dayPage(12, false);
      const a = R2(seg(lt, 0.02, 0.3)), b = R2(seg(lt, d * 0.45, d * 0.7));
      postCard(290, 820, 0.85 * a, -0.04, 1); mark(290, 1250, 1.2 * a, true); K.slip('SHARE WITH ALL', 290, 1520, a, -0.03, 54);
      postCard(790, 820, 0.85 * b, 0.04, 0); mark(790, 1250, 1.2 * b, false); K.slip('LEARN', 790, 1520, b, 0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(9) * 0.5, 'slam', { gain: 0.5 }); }

  // 10 · loop: why be scared now? (beat-0 set, the creator smiles, followers fine)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: creator with NEW IDEA slip glows, the ? is struck out, NO FEAR ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal, glow: 0.8 });
      K.slip('NEW IDEA', 300, 500, 1, -0.05, 80);
      crowd(660, 1560, 4, 280, [P.wine, M.hoodie2, M.tee, M.hoodie], 0.5, -1);
      bigMark('?', 780, 600, 1 - eo(seg(lt, d * 0.2, d * 0.5)), 0, P.crimson, 260);
      toggle(780, 680, R2(seg(lt, d * 0.35, d * 0.6)), 1);
      K.ribbon('NO FEAR', 540, 1780, R2(seg(lt, d * 0.4, d * 0.7)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(10) * 0.5, 'tock', { gain: 0.6 }); }

  // 11 · follow + send to the friend scared to try something new
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a TRIAL toggle flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); toggle(lerp(240, 560, f), lerp(1250, 1200, f), 0.45 * R2(seg(lt, d * 0.3, d * 0.5)), f, '');
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
