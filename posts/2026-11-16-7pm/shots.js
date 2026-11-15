// 16 Nov 7pm: COLLAB POSTS: ONE REEL, TWO AUDIENCES. Paper style. Facts: Buffer's Instagram Collab guide.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, magnifier, bigMark,
  hand, rankCard, strike, pin, indiaMap, geo, cup } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a small paper head-and-shoulders (a follower); col = which audience */
function fan(x, y, s, col) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.arc(0, 40, 46, Math.PI, 0); ctx.closePath(); }, col, { shadow: 0.4, edge: 3 }); cut(P_circ(0, -20, 30), P.skin, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a crowd of followers around (cx, cy); p pops them in; n heads */
function crowd(cx, cy, p, col, n = 9, seed = 0, spread = 1) { for (let i = 0; i < n; i++) { const a = i / n * 0.8; fan(cx + (i % 3 - 1) * 110 * spread + (rnd(i + seed) - 0.5) * 30, cy + Math.floor(i / 3) * 110 - 110, 0.9 * R2(seg(p, a, a + 0.3)), col); } }
/** an avatar circle */
const avatar = (x, y, r, col) => { cut(P_circ(x, y, r), col, { shadow: 0.4, edge: 3 }); circle(x, y - r * 0.2, r * 0.38, P.skin); };
/** a collab reel card: two avatars in the header (A + B), a play triangle, a heart/comment/share row; n = 1 or 2 names shown */
function collabCard(x, y, s, rot = 0, two = 1, likes = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -280, 400, 560, 18), '#FFFBF0');
  avatar(-150, -230, 30, P.royal); if (two > 0) { ctx.save(); ctx.globalAlpha = clamp(two); avatar(-100, -230, 30, P.wine); ctx.restore(); }
  line([[-50, -240], [60 + 60 * clamp(two), -240]], 'rgba(62,44,30,0.45)', 12);
  rr(-180, -180, 360, 340, 10); ctx.fillStyle = M.screen; ctx.fill(); cut(P_poly([[-34, -60], [-34, 50], [56, -5]]), P.crimson, { shadow: 0, edge: 0 });
  // heart, comment, share
  ctx.save(); ctx.translate(-150, 215); ctx.scale(1.3 + likes * 0.3, 1.3 + likes * 0.3); ctx.beginPath(); ctx.moveTo(0, 18); ctx.bezierCurveTo(-40, -10, -20, -40, 0, -18); ctx.bezierCurveTo(20, -40, 40, -10, 0, 18); ctx.fillStyle = likes ? P.crimson : 'rgba(62,44,30,0.4)'; ctx.fill(); ctx.restore();
  ctx.beginPath(); ctx.arc(-70, 210, 22, 0, TAU); ctx.lineWidth = 7; ctx.strokeStyle = P.ink; ctx.stroke();
  cut(P_poly([[-10, 230], [40, 200], [-10, 185]]), P.ink, { shadow: 0, edge: 0 });
  ctx.restore(); }
/** a paper button with text */
function button(text, x, y, sc, col = P.royal, size = 54) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = `700 ${size}px Caladea`;
  const w = ctx.measureText(text).width + 80; cut(P_rr(-w / 2, -size * 0.85, w, size * 1.7, size * 0.85), col, { shadow: 0.6, edge: 4 });
  ctx.fillStyle = P.edge; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(text, 0, 4); ctx.restore(); }
/** a paper profile grid (3x3 tiles), hl = index of the tile that is the collab post */
function grid(x, y, s, col, hl, p = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-200, -300, 400, 600, 20), '#FFFBF0'); avatar(-120, -220, 46, col); line([[-50, -230], [150, -230]], 'rgba(62,44,30,0.45)', 14);
  for (let i = 0; i < 9; i++) { const tx = -180 + (i % 3) * 122, ty = -140 + Math.floor(i / 3) * 140; rr(tx, ty, 114, 132, 6); ctx.fillStyle = i === hl ? (p > 0 ? P.crimson : P.stone) : (i % 2 ? P.stone : P.sea); ctx.fill(); }
  ctx.restore(); }
/** a tick in a circle */
function tick(x, y, sc) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); cut(P_circ(0, 0, 70), P.green); line([[-32, 0], [-8, 26], [36, -26]], P.edge, 16); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · one reel, two audiences at once, how? one reel card in the middle, two crowds (blue + wine) light up, crimson ?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'one reel card centre, ONE REEL ribbon, blue crowd left + wine crowd right pop in, big ? mark', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      collabCard(540, 760, 0.9 * R2(seg(lt, 0.02, 0.25)), Math.sin(t * 2) * 0.02, 0, 0);
      K.ribbon('ONE REEL', 540, 230, R2(seg(lt, 0.05, 0.3)), 100);
      crowd(220, 1420, seg(lt, d * 0.3, d * 0.8), P.royal, 6, 1, 0.8); crowd(860, 1420, seg(lt, d * 0.4, d * 0.9), P.wine, 6, 5, 0.8);
      K.label('2 AUDIENCES', 540, 1720, 56, P.crimson);
      bigMark('?', 900, 600, R2(seg(lt, d * 0.65, d * 0.85)), Math.sin(t * 3) * 0.12, P.crimson, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 4; k++) cue(st + len(0) * (0.3 + k * 0.12), 'pop', { gain: 0.3 }); cue(st + len(0) * 0.65, 'boing', { gain: 0.4 }); }

  // 1 · simply put, a Collab post shows on both creators' profiles: two profile grids, the same crimson tile on both
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.1, note: 'COLLAB POST ribbon, two profile grids (blue + wine), same crimson tile lights on both, BOTH PROFILES slip', draw(lt, d, t) {
      dayPage(2, false);
      K.ribbon('COLLAB POST', 540, 260, R2(seg(lt, 0.05, 0.35)), 96);
      const p = seg(lt, d * 0.45, d * 0.6);
      grid(290, 960, 0.95 * R2(seg(lt, 0.0, 0.25)), P.royal, 0, p); grid(790, 960, 0.95 * R2(seg(lt, 0.08, 0.33)), P.wine, 0, p);
      K.dashedRoute([[290, 760], [540, 640], [790, 760]], eo(seg(lt, d * 0.4, d * 0.6)));
      K.slip('BOTH PROFILES', 540, 1450, R2(seg(lt, d * 0.55, d * 0.8)), -0.03, 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + len(1) * 0.45, 'zip', { gain: 0.5 }); cue(st + len(1) * 0.55, 'slam', { gain: 0.5 }); }

  // 2 · tap Invite collaborators, the other creator accepts: phone with INVITE button, finger taps; second phone ACCEPT + tick
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.1, note: 'phone screen with INVITE COLLABORATORS button, a hand taps it, slip TAP', draw(lt, d, t) {
      dayPage(3);
      phoneBig(540, 960, 1.0, -0.02, () => { collabCard(0, -120, 0.7, 0, 0, 0); button('Invite collaborators', 0, 280, 0.8 * R2(seg(lt, 0.1, 0.35)) * (lt > d * 0.6 && lt < d * 0.7 ? 0.92 : 1), P.royal, 46); });
      hand(lerp(900, 640, eo(seg(lt, d * 0.3, d * 0.6))), lerp(1600, 1300, eo(seg(lt, d * 0.3, d * 0.6))), 1.1, -0.3, true);
      K.ribbon('INVITE', 540, 240, R2(seg(lt, 0.05, 0.35)), 104);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.12, note: 'the other creator (wine figure) gets a bubble "Collab invite", taps ACCEPT, green tick', draw(lt, d, t) {
      room(4);
      person({ x: 260, y: 1600, h: 640, arm: 80, top: P.wine, glow: 0.8 });
      bubble('Collab invite', 460, 520, R2(seg(lt, 0.05, 0.3)), false, 60);
      button('ACCEPT', 700, 860, R2(seg(lt, 0.25, 0.5)), P.green, 70);
      tick(700, 1120, R2(seg(lt, d * 0.55, d * 0.8)));
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d2 * 0.5 * 0.65, 'tock', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.05, 'plop', { gain: 0.5 }); cue(mid + len(2) * 0.5 * 0.55, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 3 · once accepted, goes to both sets of followers, both names on top: the card header grows 2nd avatar, two crowds flow in
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.5;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.1, note: 'card in centre, dashed routes to a blue crowd (left) and wine crowd (right), BOTH FOLLOWERS ribbon', draw(lt, d, t) {
      dayPage(5, false);
      collabCard(540, 640, 0.8, 0, 1, 0);
      K.dashedRoute([[440, 920], [300, 1100], [230, 1260]], eo(seg(lt, 0.1, 0.5))); K.dashedRoute([[640, 920], [780, 1100], [850, 1260]], eo(seg(lt, 0.15, 0.55)));
      crowd(230, 1460, seg(lt, d * 0.3, d * 0.9), P.royal, 6, 2, 0.7); crowd(850, 1460, seg(lt, d * 0.35, d * 0.95), P.wine, 6, 7, 0.7);
      K.ribbon('BOTH FOLLOWERS', 540, 200, R2(seg(lt, d * 0.2, d * 0.5)), 84);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 820], zoom: 0.16, note: 'close on the card header: two avatars + two name bars, BOTH NAMES slip', draw(lt, d, t) {
      dayPage(6);
      collabCard(540, 1000, 1.6, -0.02, seg(lt, 0.15, 0.45), 0);
      K.slip('BOTH NAMES', 540, 360, R2(seg(lt, d * 0.3, d * 0.55)), -0.03, 80);
      const p = eo(seg(lt, d * 0.45, d * 0.7)); if (p > 0) { ctx.save(); ctx.globalAlpha = p; ctx.lineWidth = 10; ctx.strokeStyle = P.crimson; ctx.beginPath(); ctx.ellipse(480, 640, 330, 90, -0.02, 0, TAU); ctx.stroke(); ctx.restore(); }
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); for (let k = 0; k < 4; k++) cue(st + d3 * 0.5 * (0.3 + k * 0.15), 'pop', { gain: 0.3 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.5 }); cue(mid + len(3) * 0.5 * 0.45, 'zip', { gain: 0.4 }); }

  // 4 · likes, comments, shares all add up on that one post: icons fly from both sides into one card, counter
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.1, note: 'one card; hearts and comment bubbles fly in from both sides (blue/wine), gold counter, ONE POST ribbon', draw(lt, d, t) {
      dayPage(7);
      collabCard(540, 900, 1.0, 0, 1, seg(lt, d * 0.3, d * 0.5));
      for (let k = 0; k < 6; k++) { const a = d * (0.05 + k * 0.1), f = eo(seg(lt, a, a + 0.5)); if (f <= 0 || f >= 1) continue; const sx = k % 2 ? 1100 : -20, sy = 500 + (k * 170) % 900;
        ctx.save(); ctx.translate(lerp(sx, 540, f), lerp(sy, 900, f)); ctx.scale(2.2, 2.2); ctx.beginPath(); ctx.moveTo(0, 18); ctx.bezierCurveTo(-40, -10, -20, -40, 0, -18); ctx.bezierCurveTo(20, -40, 40, -10, 0, 18); ctx.fillStyle = k % 2 ? P.wine : P.crimson; ctx.fill(); ctx.restore(); }
      K.label('LIKES  ·  COMMENTS  ·  SHARES', 540, 330, 46, P.ink);
      K.ribbon('ONE POST', 540, 1560, R2(seg(lt, d * 0.55, d * 0.8)), 104);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 6; k++) cue(st + len(4) * (0.05 + k * 0.1) + 0.3, 'plop', { gain: 0.35 }); cue(st + len(4) * 0.55, 'slam', { gain: 0.5 }); }

  // 5 · you: food reels in Pune, a cafe creator from your city collabs: India map pin Pune, then two figures, a cup and a plate
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.4;
    add({ id: 'S05a', at: st, cam: [540, 900], zoom: 0.08, note: 'India map, pin drops on Pune, YOU slip, FOOD REELS ribbon', draw(lt, d, t) {
      indiaMap(8); const [x, y] = geo(73.86, 18.52);
      pin(x, y, R2(seg(lt, 0.1, 0.4)));
      K.slip('PUNE', x + 160, y - 60, R2(seg(lt, 0.25, 0.5)), 0.03, 56);
      K.slip('YOU', 540, 1400, R2(seg(lt, d * 0.3, d * 0.55)), -0.03, 80);
      K.ribbon('FOOD REELS', 540, 1600, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.12, note: 'you (blue) and a cafe creator (wine) side by side, a coffee cup between, COLLAB ribbon, CAFE CREATOR slip', draw(lt, d, t) {
      room(9);
      person({ x: 260, y: 1650, h: 620, arm: 60, top: P.royal });
      person({ x: 820, y: 1650, h: 620, arm: 60, dir: -1, top: P.wine, glow: 0.5 });
      cut(P_rr(400, 1240, 280, 30, 6), P.sepia); cut(P_rr(520, 1270, 40, 220, 6), P.sepia); cup(540, 1240, 0.6, t);
      K.slip('CAFE CREATOR', 740, 820, R2(seg(lt, 0.1, 0.35)), 0.03, 58);
      K.ribbon('COLLAB', 540, 400, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'thud', { gain: 0.5 }); cue(st + 0.25, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'pop', { gain: 0.5 }); cue(mid + len(5) * 0.6 * 0.4, 'slam', { gain: 0.5 }); }

  // 6 · game changer: their followers who don't know you see your reel: wine crowd watching a phone with YOUR reel, NEW EYES
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, big phone showing your reel (blue avatar), wine crowd below looking up, NEW VIEWERS ribbon', draw(lt, d, t) {
      dayPage(10);
      phoneBig(540, 760, 0.8, 0.02, () => { collabCard(0, -10, 1.0, 0, 1, 0); });
      crowd(540, 1420, seg(lt, 0.1, 0.7), P.wine, 9, 3, 1.3);
      bubble('Who is this?', 120, 1200, R2(seg(lt, d * 0.35, d * 0.55)), false, 50);
      K.slip('GAME CHANGER', 540, 200, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      K.ribbon('NEW VIEWERS', 540, 1740, R2(seg(lt, d * 0.55, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 5; k++) cue(st + 0.15 + k * 0.12, 'pop', { gain: 0.25 }); cue(st + len(6) * 0.35, 'plop', { gain: 0.5 }); cue(st + len(6) * 0.55, 'slam', { gain: 0.5 }); }

  // 7 · up to five collaborators on one post: 5 avatars pop around the card, gold 5
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.1, note: 'one card centre, five avatar circles pop around it on dashed lines, gold 5, UP TO slip', draw(lt, d, t) {
      dayPage(11, false);
      const cols = [P.wine, P.green, P.gold, P.crimson, P.sepia], pts = [];
      for (let k = 0; k < 5; k++) { const ang = k < 3 ? -Math.PI / 2 + (k - 1) * 0.7 : Math.PI / 2 + (k - 3.5) * 0.9, r = 470;
        pts.push([540 + Math.cos(ang) * r * 0.85, 960 + Math.sin(ang) * r, R2(seg(lt, 0.1 + k * 0.1, 0.35 + k * 0.1))]); }
      pts.forEach(([px, py, s]) => { if (s > 0) K.dashedRoute([[540, 960], [px, py]], clamp(s)); });
      collabCard(540, 960, 0.8, 0, 1, 0);
      pts.forEach(([px, py, s], k) => { if (s > 0) { ctx.save(); ctx.translate(px, py); ctx.scale(s, s); avatar(0, 0, 70, cols[k]); ctx.restore(); } });
      bigMark('5', 900, 1000, R2(seg(lt, d * 0.5, d * 0.7)), -0.05, P.gold, 280);
      K.slip('UP TO 5 COLLABORATORS', 540, 1720, R2(seg(lt, d * 0.4, d * 0.65)), -0.02, 62);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 5; k++) cue(st + 0.1 + k * 0.1, 'pop', { gain: 0.45 }); cue(st + len(7) * 0.5, 'slam', { gain: 0.6 }); }

  // 8 · craziest: no minimum follower count: a follower meter with a bar struck out, 0 MIN
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, a MIN FOLLOWERS sign crossed out, a small creator figure walks in, NO MINIMUM ribbon', draw(lt, d, t) {
      dayPage(12); ground(1650, M.wall2);
      K.slip('CRAZIEST PART', 540, 220, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      cut(P_rr(200, 520, 680, 320, 14), '#FFFBF0'); K.label('MIN FOLLOWERS', 540, 600, 54, P.ink); bigMark('?', 540, 750, 1, 0, P.sepia, 130);
      const p = eo(seg(lt, d * 0.3, d * 0.5)); if (p > 0) { line([[220, 540], [220 + 640 * p, 540 + 280 * p]], P.crimson, 18); line([[860, 540], [860 - 640 * p, 540 + 280 * p]], P.crimson, 18); }
      person({ x: lerp(-100, 380, eo(seg(lt, 0.1, 0.6))), y: 1780, h: 520, arm: 50, top: P.royal, walk: t * 8 * (lt < 0.6 ? 1 : 0) });
      K.ribbon('NO MINIMUM', 620, 1180, R2(seg(lt, d * 0.5, d * 0.75)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.3, 'zip', { gain: 0.6 }); cue(st + len(8) * 0.5, 'slam', { gain: 0.6 }); }

  // 9 · pick three creators in your niche, send one reel idea, invite them when you post
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.55;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.08, note: '3 CREATORS ribbon, three rank cards with avatars, ONE IDEA chat bubble', draw(lt, d, t) {
      dayPage(13, false); K.ribbon('3 CREATORS', 540, 260, R2(seg(lt, 0.05, 0.35)), 100);
      ['Same niche', 'Same city', 'Same size'].forEach((w, k) => { const a = 0.15 + k * 0.15; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 600 + k * 240 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 600); });
      bubble('One reel idea?', 960, 1440, R2(seg(lt, d * 0.55, d * 0.8)), true, 64);
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.1, note: 'phone with INVITE button glowing, WHEN YOU POST ribbon, tick', draw(lt, d, t) {
      dayPage(14);
      phoneBig(540, 960, 0.95, -0.03, () => { collabCard(0, -120, 0.7, 0, seg(lt, d * 0.5, d * 0.7), 0); button('Invite collaborators', 0, 280, 0.8, P.royal, 46); });
      K.ribbon('WHEN YOU POST', 540, 260, R2(seg(lt, 0.05, 0.35)), 92);
      tick(840, 1420, R2(seg(lt, d * 0.55, d * 0.75)));
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.15 + k * 0.15, 'pop', { gain: 0.5 }); cue(st + d9 * 0.55 * 0.55, 'plop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(9) * 0.45 * 0.55, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 10 · one reel, two audiences (loops to beat 0: same set, both crowds now lit)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 set again: the card now has both avatars and a red heart, both crowds full, 2 AUDIENCES ribbon', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      collabCard(540, 760, 0.9, Math.sin(t * 2) * 0.02, 1, 1);
      K.slip('ONE REEL', 540, 230, 1, -0.03, 84);
      crowd(220, 1420, 1, P.royal, 6, 1, 0.8); crowd(860, 1420, 1, P.wine, 6, 5, 0.8);
      K.ribbon('2 AUDIENCES', 540, 1720, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.4, 'slam', { gain: 0.6 }); }

  // 11 · follow + send to the creator you want to collab with
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a card flies to a creator who lights up, handle slip', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); collabCard(lerp(240, 540, f), lerp(1250, 1180, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 0.05, 1, 0);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
