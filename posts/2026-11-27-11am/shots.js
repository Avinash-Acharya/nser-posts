// 27 Nov 11am: COPYRIGHT-SAFE MUSIC FOR REELS (INDIA). Paper style.
// Facts (opened 26 Nov 2026, Instagram Help Center): "Access to the licensed music library": library "intended for
// personal, non-commercial use"; "certain business accounts and certain types of posts do not have access";
// "Licensed music may also not be available in certain countries or regions"; Sound Collection = "over 14,000 songs
// and sounds which are entirely royalty free and safe to use in Reels and Instagram Stories", "can be used for
// commercial purposes like ads". "What audio you can use in your reel" + "Replace muted audio": changes to rights
// agreements can mute audio; "your post can still be viewed"; "You can only replace a muted track one time".
// "How to use music in your videos": "The more full-length recorded tracks ... the more likely the video may be
// limited (muted or blocked)", "Shorter clips of music are recommended", "There should always be a visual component".
// The café story is a generic example. Loop line is nser's. No real person, no logos, no real song.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, rankCard, strike, magnifier, coins } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a reel card (tall, play button) */
function reel(x, y, s, rot = 0, col = P.sea, mark = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -260, 300, 520, 20), '#FFFBF0'); rr(-126, -236, 252, 400, 10); ctx.fillStyle = col; ctx.fill();
  cut(P_poly([[-30, -86], [-30, 6], [46, -40]]), P.edge, { shadow: 0.3, edge: 0 });
  line([[-110, 200], [60, 200]], 'rgba(62,44,30,0.3)', 12);
  if (mark) { ctx.save(); ctx.globalAlpha = 0.8; K.label(mark, 0, 120, 34, P.edge); ctx.restore(); } ctx.restore(); }
/** a paper music note */
function mnote(x, y, s, rot = 0, col = P.ink) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.ellipse(-40, 60, 48, 36, -0.4, 0, TAU); }, col, { shadow: 0.5, edge: 4 });
  cut(P_rr(-4, -140, 18, 210, 6), col, { shadow: 0.5, edge: 3 });
  cut(P_poly([[6, -140], [90, -100], [90, -50], [6, -86]]), col, { shadow: 0.5, edge: 3 }); ctx.restore(); }
/** a speaker; muted = crimson X beside it, waves otherwise */
function speaker(x, y, s, muted = 0, t = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-120, -50], [-50, -50], [30, -130], [30, 130], [-50, 50], [-120, 50]]), P.stoneDark);
  if (muted > 0) { ctx.save(); ctx.globalAlpha = clamp(muted * 2); line([[80, -60], [200, 60]], P.crimson, 24); line([[200, -60], [80, 60]], P.crimson, 24); ctx.restore(); }
  else { ctx.strokeStyle = P.gold; ctx.lineWidth = 14; ctx.lineCap = 'round'; for (let k = 0; k < 3; k++) { ctx.beginPath(); ctx.arc(30, 0, 70 + k * 50 + 6 * Math.sin(t * 7 + k), -0.6, 0.6); ctx.stroke(); } }
  ctx.restore(); }
/** a paper library shelf with record sleeves */
function shelf(x, y, s, n = 5, cols = [P.crimson, P.royal, P.forest, P.gold, P.wine]) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-440, -220, 880, 440, 20), '#C9A574'); cut(P_rr(-440, 170, 880, 50, 10), P.sepia, { shadow: 0.4, edge: 3 });
  for (let k = 0; k < n; k++) { const xx = -350 + k * 175; cut(P_rr(xx - 70, -160, 140, 320, 10), cols[k % cols.length], { shadow: 0.4, edge: 4 }); circle(xx, 0, 34, P.edge); circle(xx, 0, 10, P.ink); }
  ctx.restore(); }
/** a café shopfront */
function cafe(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-300, -320, 600, 520, 18), '#E8D3A8'); for (let k = 0; k < 6; k++) cut(P_rr(-300 + k * 100, -380, 100, 90, 8), k % 2 ? P.crimson : P.edge, { shadow: 0.3, edge: 2 });
  K.label('CAFÉ', 0, -230, 70, P.ink); cut(P_rr(-240, -150, 200, 220, 10), P.sea, { shadow: 0, edge: 3 }); cut(P_rr(40, -150, 160, 350, 10), P.sepia, { shadow: 0, edge: 3 });
  ctx.restore(); }
/** a microphone */
function mic(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -200, 120, 200, 60), P.stoneDark); for (let k = 0; k < 3; k++) line([[-40, -150 + k * 40], [40, -150 + k * 40]], P.stone, 6);
  ctx.strokeStyle = P.sepia; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, -40, 90, 0, Math.PI); ctx.stroke(); cut(P_rr(-10, 50, 20, 110, 6), P.sepia, { shadow: 0.3, edge: 2 }); cut(P_rr(-70, 150, 140, 24, 10), P.sepia, { shadow: 0.3, edge: 2 }); ctx.restore(); }
/** a stamp that slams in */
function stamp(text, x, y, p, rot = -0.08, col = P.crimson, w = 520, size = 76) { const sc = p <= 0 ? 0 : lerp(2.2, 1, eo(p)); if (!sc) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); cut(P_rr(-w / 2, -70, w, 140, 14), col); K.label(text, 0, 6, size, P.edge); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · trending Bollywood song → audio muted? which music is safe
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'a reel with a TRENDING SONG note flies in, speaker loses its waves and gets a crimson X: MUTED stamp', draw(lt, d, t) {
      room(1);
      reel(330, 760, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05, P.gold);
      mnote(330, 700, 0.9 * R2(seg(lt, 0.1, 0.3)), 0.1 * Math.sin(t * 4), P.crimson);
      K.slip('TRENDING SONG', 330, 400, R2(seg(lt, 0.15, 0.35)), -0.04, 56);
      speaker(760, 820, 1.0 * R2(seg(lt, 0.2, 0.4)), seg(lt, d * 0.5, d * 0.6) > 0 ? seg(lt, d * 0.5, d * 0.6) : 0, t);
      stamp('MUTED', 540, 1350, seg(lt, d * 0.6, d * 0.8));
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'two music notes: one with a gold tick, one with crimson X, big ? between: SAFE? ribbon', draw(lt, d, t) {
      dayPage(2);
      mnote(300, 800, 1.3 * R2(seg(lt, 0.02, 0.2)), -0.08, P.forest); bigMark('✓', 330, 1150, R2(seg(lt, d * 0.25, d * 0.4)), -0.1, P.gold, 220);
      mnote(800, 800, 1.3 * R2(seg(lt, 0.08, 0.25)), 0.08, P.wine); bigMark('✕', 830, 1150, R2(seg(lt, d * 0.3, d * 0.45)), 0.1, P.crimson, 220);
      bigMark('?', 550, 700, R2(seg(lt, d * 0.15, d * 0.3)), 0.05 * Math.sin(t * 3), P.gold, 300);
      K.ribbon('WHICH IS SAFE?', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.55, 'thud', { gain: 0.7 }); cue(st + d0 * 0.5 * 0.65, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'pop', { gain: 0.5 }); cue(mid + d0 * 0.5 * 0.65, 'slam', { gain: 0.8 }); }

  // 1 · simply put: the library is for personal use, not business
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, the paper MUSIC LIBRARY shelf of records', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      shelf(540, 860, 1.0 * R2(seg(lt, 0.08, 0.3)));
      K.ribbon('MUSIC LIBRARY', 540, 1450, R2(seg(lt, d * 0.45, d * 0.75)), 100);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'PERSONAL ✓ card with a person, BUSINESS ✕ card with a briefcase, business struck', draw(lt, d, t) {
      nightPage(4);
      rankCard('✓', 'PERSONAL', 540, 520, R2(seg(lt, 0.02, 0.2)), -0.02, 700);
      rankCard('✕', 'BUSINESS', 540, 820, R2(seg(lt, d * 0.3, d * 0.45)), 0.02, 700); strike(220, 830, 640, seg(lt, d * 0.5, d * 0.65));
      person({ x: 300, y: 1650, h: 520, arm: 60, top: M.hoodie2, glow: eo(seg(lt, 0.1, 0.4)) });
      const b = R2(seg(lt, d * 0.35, d * 0.5)); if (b > 0) { ctx.save(); ctx.translate(780, 1380); ctx.scale(b, b); cut(P_rr(-150, -100, 300, 200, 18), P.sepia); cut(P_rr(-50, -140, 100, 50, 12), P.stoneDark, { shadow: 0.3, edge: 3 }); ctx.restore(); }
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.5, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.5 }); cue(mid + d1 * 0.5 * 0.55, 'zip', { gain: 0.6 }); }

  // 2 · some business accounts don't get it; some countries miss songs
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'BUSINESS ACCOUNT card in front of the shelf, shelf door locked with a crimson bar: NO ACCESS', draw(lt, d, t) {
      room(5);
      shelf(540, 700, 0.9 * R2(seg(lt, 0.02, 0.2)));
      const b = seg(lt, d * 0.3, d * 0.5); if (b > 0) cut(P_rr(540 - 420 * b, 680, 840 * b, 70, 12), P.crimson, { shadow: 0.5, edge: 3 });
      K.slip('SOME BUSINESS ACCOUNTS', 540, 1200, R2(seg(lt, 0.15, 0.35)), -0.02, 56);
      K.ribbon('NO ACCESS', 540, 1480, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'paper globe with pins, some notes greyed out: NOT EVERYWHERE slip', draw(lt, d, t) {
      dayPage(6);
      const g = R2(seg(lt, 0.02, 0.2)); if (g > 0) { ctx.save(); ctx.translate(540, 800); ctx.scale(g, g); cut(P_circ(0, 0, 340), P.sea); cut(() => { ctx.beginPath(); ctx.ellipse(-90, -60, 150, 110, 0.3, 0, TAU); }, P.forest, { shadow: 0.2, edge: 3 }); cut(() => { ctx.beginPath(); ctx.ellipse(140, 120, 110, 140, -0.2, 0, TAU); }, P.forest, { shadow: 0.2, edge: 3 }); ctx.restore(); }
      [[300, 560, P.ink], [800, 560, P.stone], [260, 1100, P.stone], [820, 1100, P.ink]].forEach(([x, y, c], k) => mnote(x, y, 0.5 * R2(seg(lt, d * (0.2 + k * 0.08), d * (0.3 + k * 0.08))), 0.1, c));
      K.slip('NOT IN EVERY COUNTRY', 540, 1450, R2(seg(lt, d * 0.55, d * 0.8)), 0.03, 62);
    } });
    cue(st, 'whoosh'); cue(st + d2 * 0.5 * 0.4, 'thud', { gain: 0.7 }); cue(st + d2 * 0.5 * 0.65, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); [0.25, 0.33, 0.41, 0.49].forEach((a) => cue(mid + d2 * 0.5 * a, 'pop', { gain: 0.3 })); }

  // 3 · Meta Sound Collection: 14,000+ songs and sounds, royalty free
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'SOUND COLLECTION ribbon, gold counter rolls to 14,000+, notes rain in, ROYALTY FREE stamp', draw(lt, d, t) {
      dayPage(7);
      K.ribbon('SOUND COLLECTION', 540, 300, R2(seg(lt, 0.02, 0.2)), 92);
      for (let k = 0; k < 8; k++) { const f = seg(lt, d * (0.1 + k * 0.05), d * (0.3 + k * 0.05)); if (f > 0) mnote(160 + (k % 4) * 250, lerp(400, 560 + Math.floor(k / 4) * 220, eo(f)), 0.45, (k % 2 ? -0.1 : 0.1), [P.crimson, P.royal, P.forest, P.wine][k % 4]); }
      const n = Math.round(14000 * eo(seg(lt, d * 0.15, d * 0.6)));
      bigMark(n.toLocaleString('en-IN') + (n >= 14000 ? '+' : ''), 540, 1150, R2(seg(lt, d * 0.15, d * 0.3)), -0.03, P.gold, 200);
      stamp('ROYALTY FREE', 540, 1500, seg(lt, d * 0.65, d * 0.85), -0.05, P.crimson, 640, 72);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); for (let k = 0; k < 8; k += 2) cue(st + len(3) * (0.15 + k * 0.05), 'pop', { gain: 0.3 }); cue(st + len(3) * 0.62, 'sparkle', { gain: 0.6 }); cue(st + len(3) * 0.72, 'slam', { gain: 0.8 }); }

  // 4 · you: making a paid reel for a café, drop in a hit film song
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you with phone in front of a CAFÉ shopfront, gold ₹ coins: PAID REEL slip', draw(lt, d, t) {
      dayPage(8);
      cafe(640, 900, 1.0 * R2(seg(lt, 0.02, 0.2)));
      person({ x: 230, y: 1650, h: 640, arm: 90, top: M.tee, glow: 0.7 });
      coins(860, 1450, 0.9 * R2(seg(lt, d * 0.35, d * 0.5)), 4);
      K.slip('PAID REEL', 640, 300, R2(seg(lt, d * 0.4, d * 0.6)), -0.03, 70);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a big FILM HIT note drops onto the café reel on the phone', draw(lt, d, t) {
      room(9);
      phoneBig(540, 900, 1.0 * R2(seg(lt, 0.02, 0.2)), 0.02, () => { cut(P_rr(-150, -300, 300, 420, 16), P.gold, { shadow: 0, edge: 3 }); K.label('CAFÉ', 0, -100, 60, P.ink); });
      const f = eo(seg(lt, d * 0.25, d * 0.55)); if (f > 0) mnote(lerp(800, 600, f), lerp(300, 820, f), 1.0, 0.1, P.crimson);
      K.slip('FILM HIT SONG', 540, 1450, R2(seg(lt, d * 0.5, d * 0.7)), 0.03, 66);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.4, 'sparkle', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.55, 'thud', { gain: 0.7 }); }

  // 5 · that's commercial: safe route = Sound Collection, works even in ads
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'COMMERCIAL stamp slams on the film-hit note, crimson X', draw(lt, d, t) {
      nightPage(10);
      mnote(540, 800, 1.6 * R2(seg(lt, 0.02, 0.2)), 0.06, P.crimson);
      stamp('COMMERCIAL', 540, 1250, seg(lt, d * 0.25, d * 0.5), -0.08, P.crimson, 620, 76);
      bigMark('✕', 820, 560, R2(seg(lt, d * 0.55, d * 0.7)), 0.1, P.crimson, 240);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'dashed route from the café reel to a SOUND COLLECTION shelf, then an AD card with a gold tick: EVEN IN ADS ribbon', draw(lt, d, t) {
      dayPage(11);
      reel(220, 600, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.05, P.gold, 'CAFÉ');
      K.dashedRoute([[300, 760], [540, 900], [720, 760]], seg(lt, d * 0.1, d * 0.4));
      shelf(780, 600, 0.45 * R2(seg(lt, d * 0.3, d * 0.45)), 3, [P.forest, P.gold, P.royal]);
      K.slip('SOUND COLLECTION', 780, 380, R2(seg(lt, d * 0.35, d * 0.5)), 0.03, 50);
      const a = R2(seg(lt, d * 0.45, d * 0.6)); if (a > 0) { ctx.save(); ctx.translate(540, 1150); ctx.scale(a, a); cut(P_rr(-200, -120, 400, 240, 18), '#FFFBF0'); cut(P_rr(-180, -100, 120, 50, 10), P.gold, { shadow: 0, edge: 2 }); K.label('AD', -120, -72, 40, P.ink); line([[-150, 20], [150, 20]], 'rgba(62,44,30,0.3)', 14); line([[-150, 70], [80, 70]], 'rgba(62,44,30,0.3)', 14); ctx.restore(); }
      bigMark('✓', 800, 1150, R2(seg(lt, d * 0.55, d * 0.7)), 0.1, P.gold, 200);
      K.ribbon('EVEN IN ADS', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.35, 'slam', { gain: 0.8 }); cue(st + d5 * 0.45 * 0.6, 'thud', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.55 * 0.2, 'zip', { gain: 0.5 }); cue(mid + d5 * 0.55 * 0.6, 'sparkle', { gain: 0.6 }); cue(mid + d5 * 0.55 * 0.7, 'slam', { gain: 0.7 }); }

  // 6 · game changer: rights agreements change → even an old post's audio can be muted
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, a RIGHTS AGREEMENT parchment gets a crimson CHANGED stamp', draw(lt, d, t) {
      nightPage(12);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const s = R2(seg(lt, 0.08, 0.25)); if (s > 0) { ctx.save(); ctx.translate(540, 850); ctx.rotate(-0.03); ctx.scale(s, s); cut(P_rr(-300, -380, 600, 760, 16), '#FFFBF0'); K.label('MUSIC RIGHTS', 0, -300, 50, P.ink); for (let k = 0; k < 6; k++) line([[-220, -200 + k * 80], [220 - (k % 2) * 80, -200 + k * 80]], 'rgba(62,44,30,0.3)', 14); ctx.restore(); }
      stamp('CHANGED', 560, 1100, seg(lt, d * 0.45, d * 0.65), -0.12, P.crimson, 480, 80);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'an OLD POST (calendar slip 2023-style "OLD") with speaker going muted: OLD POSTS TOO ribbon', draw(lt, d, t) {
      room(13);
      reel(360, 800, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.04, P.forest, 'OLD POST');
      speaker(800, 800, 0.9 * R2(seg(lt, 0.1, 0.25)), seg(lt, d * 0.35, d * 0.5), t);
      K.ribbon('OLD POSTS TOO', 540, 1500, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.5, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.4, 'thud', { gain: 0.7 }); cue(mid + d6 * 0.55 * 0.7, 'slam', { gain: 0.7 }); }

  // 7 · craziest: the post still shows, and you can replace muted audio, only once
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, muted reel still plays to viewers (an eye glows): STILL VISIBLE', draw(lt, d, t) {
      dayPage(14);
      K.slip('CRAZIEST PART', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      reel(540, 800, 1.0 * R2(seg(lt, 0.05, 0.2)), 0.02, P.forest);
      speaker(830, 520, 0.45 * R2(seg(lt, 0.1, 0.25)), 1, t);
      const e = R2(seg(lt, d * 0.35, d * 0.5)); if (e > 0) { ctx.save(); ctx.translate(540, 1250); ctx.scale(e, e); cut(() => { ctx.beginPath(); ctx.ellipse(0, 0, 160, 80, 0, 0, TAU); }, '#FFFBF0'); circle(0, 0, 55, P.royal); circle(0, 0, 22, P.ink); ctx.restore(); }
      K.slip('POST STILL SHOWS', 540, 1520, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 64);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'REPLACE AUDIO button: muted note swaps for a new gold note, a gold 1x badge: ONLY ONCE ribbon', draw(lt, d, t) {
      nightPage(15);
      const s = R2(seg(lt, 0.02, 0.18)); if (s > 0) { ctx.save(); ctx.translate(540, 360); ctx.scale(s, s); cut(P_rr(-300, -70, 600, 140, 70), P.royal); K.label('REPLACE AUDIO', 0, 6, 56, P.edge); ctx.restore(); }
      const f = eo(seg(lt, d * 0.2, d * 0.5)); mnote(lerp(540, 200, f), 850, 1.1 * (1 - f * 0.4), -0.1, P.stone); if (f > 0) mnote(lerp(1000, 640, f), 850, 1.1, 0.1, P.gold);
      const b = R2(seg(lt, d * 0.5, d * 0.65)); if (b > 0) { ctx.save(); ctx.translate(860, 1200); ctx.scale(b, b); cut(P_circ(0, 0, 110), P.gold); K.label('1x', 0, 6, 80, P.ink); ctx.restore(); }
      K.ribbon('ONLY ONCE', 540, 1520, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.4, 'sparkle', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.5 }); cue(mid + d7 * 0.55 * 0.35, 'zip', { gain: 0.6 }); cue(mid + d7 * 0.55 * 0.65, 'slam', { gain: 0.8 }); }

  // 8 · what to do: no full song, short clip, show something on screen
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.45;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: '1 SHORT CLIP card: a long FULL SONG strip gets snipped by paper scissors into a short gold piece', draw(lt, d, t) {
      dayPage(16);
      rankCard(1, 'SHORT CLIP', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 620);
      const s = R2(seg(lt, 0.05, 0.2)), c = eo(seg(lt, d * 0.35, d * 0.6));
      if (s > 0) { cut(P_rr(100, 760, 880 * s, 120, 20), c > 0 ? P.stone : P.crimson); for (let k = 0; k < 8; k++) circle(160 + k * 110, 820, 16, P.edge); K.label('FULL SONG', 540, 700, 50, P.ink); }
      if (c > 0) { cut(P_rr(340, lerp(760, 1100, c), 260, 120, 20), P.gold); K.label('CLIP', 470, lerp(826, 1166, c), 54, P.ink); }
      line([[lerp(1000, 620, eo(seg(lt, d * 0.2, d * 0.4))), 700], [lerp(1000, 620, eo(seg(lt, d * 0.2, d * 0.4))), 940]], P.crimson, 10);
      K.slip('SHORTER = SAFER', 540, 1450, R2(seg(lt, d * 0.6, d * 0.8)), 0.03, 66);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: '2 SHOW SOMETHING card: a reel full of a cooking scene (pot) + small note, not just a speaker', draw(lt, d, t) {
      room(17);
      rankCard(2, 'SHOW SOMETHING', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 700);
      phoneBig(400, 950, 0.95 * R2(seg(lt, 0.05, 0.2)), -0.03, () => { cut(P_rr(-150, -300, 300, 600, 16), P.sea, { shadow: 0, edge: 2 }); person({ x: 0, y: 260, h: 420, arm: 100 + 30 * Math.sin(t * 5), top: P.wine, phone: false }); });
      mnote(820, 760, 0.6 * R2(seg(lt, d * 0.3, d * 0.45)), 0.1 * Math.sin(t * 4), P.gold);
      speaker(820, 1180, 0.5 * R2(seg(lt, d * 0.4, d * 0.55)), 0, t);
      K.ribbon('NOT JUST AUDIO', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d8 * 0.45 * 0.3, 'zip', { gain: 0.6 }); cue(st + d8 * 0.45 * 0.5, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d8 * 0.55 * 0.4, 'pop', { gain: 0.6 }); }

  // 9 · brand reels: Sound Collection, or your own original audio
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: '3 BRAND REELS card: a BRAND reel with two arrows: SOUND COLLECTION shelf or a MIC (ORIGINAL AUDIO)', draw(lt, d, t) {
      dayPage(18);
      rankCard(3, 'BRAND REELS', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 600);
      reel(540, 700, 0.75 * R2(seg(lt, 0.05, 0.2)), 0.02, P.gold, 'BRAND');
      K.dashedRoute([[460, 920], [300, 1080]], seg(lt, d * 0.2, d * 0.4)); K.dashedRoute([[620, 920], [790, 1080]], seg(lt, d * 0.45, d * 0.65));
      shelf(300, 1250, 0.4 * R2(seg(lt, d * 0.3, d * 0.45)), 3, [P.forest, P.gold, P.royal]); K.slip('SOUND COLLECTION', 300, 1500, R2(seg(lt, d * 0.35, d * 0.5)), -0.03, 44);
      mic(790, 1260, 0.7 * R2(seg(lt, d * 0.55, d * 0.7)), 0.1); K.slip('YOUR VOICE', 790, 1500, R2(seg(lt, d * 0.6, d * 0.75)), 0.03, 48);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(9) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(9) * 0.4, 'pop', { gain: 0.6 }); cue(st + len(9) * 0.55, 'zip', { gain: 0.5 }); cue(st + len(9) * 0.65, 'pop', { gain: 0.6 }); }

  // 10 · loop: short song, big idea (back to the beat-0 room: the reel with a small note + big lightbulb-ish star)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: a tiny gold note beside a huge crimson IDEA card, speaker plays again with gold waves', draw(lt, d, t) {
      room(1);
      reel(330, 760, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05, P.gold);
      mnote(330, 700, 0.4 * R2(seg(lt, 0.1, 0.3)), 0.1 * Math.sin(t * 4), P.forest);
      speaker(760, 700, 0.8 * R2(seg(lt, 0.15, 0.35)), 0, t);
      K.slip('SHORT SONG', 330, 1150, R2(seg(lt, d * 0.2, d * 0.4)), -0.04, 60);
      K.ribbon('BIG IDEA', 540, 1450, R2(seg(lt, d * 0.5, d * 0.85)), 130);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.25, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.55, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend whose reel got muted
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a muted speaker, handle slip', draw(lt, d, t) {
      dayPage(19); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      speaker(250, 1250, 0.6 * R2(seg(lt, d * 0.3, d * 0.45)), 1, t);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
