// 26 Nov 7pm: INSTAGRAM'S ORIGINAL CONTENT RULES: WHY REPOSTS LOSE REACH. Paper style.
// Facts (opened 25 Nov 2026): Engadget (30 Apr 2024): Reels from accounts that posted unoriginal content "10 or more
// times over the previous 30 days" lose recommendations; Instagram "will actively replace reposted Reels with the
// 'original' clip" in suggestions; "significant" changes like "recording voice-overs or reaction clips" or posts
// "materially edited to become a meme" are fine. TechCrunch (30 Apr 2026): the rule now covers photos and carousels;
// accounts that "regularly repost content they didn't create" aren't eligible for recommendations "across the app,
// including users' feeds and the 'Discover' tab"; followers still see posts; "adding watermarks or changing the speed
// of a video" isn't enough; a screenshot with the username for credit "doesn't qualify"; memes ok if you "add an
// element that enhances the content". Loop line is nser's. No real person, no logos.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, strike, rankCard, magnifier } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a reel card (tall, play button); col = picture colour; mark = optional corner text */
function reel(x, y, s, rot = 0, col = P.sea, mark = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -260, 300, 520, 20), '#FFFBF0'); rr(-126, -236, 252, 400, 10); ctx.fillStyle = col; ctx.fill();
  cut(P_poly([[-30, -86], [-30, 6], [46, -40]]), P.edge, { shadow: 0.3, edge: 0 });
  line([[-110, 200], [60, 200]], 'rgba(62,44,30,0.3)', 12);
  if (mark) { ctx.save(); ctx.globalAlpha = 0.75; K.label(mark, 0, 120, 34, P.edge); ctx.restore(); } ctx.restore(); }
/** a paper copy stack: two offset reels */
function copies(x, y, s, n = 3) { for (let k = n - 1; k >= 0; k--) reel(x + k * 40, y - k * 30, s, 0.04 * k, P.sea); }
/** a microphone */
function mic(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -200, 120, 200, 60), P.stoneDark); for (let k = 0; k < 3; k++) line([[-40, -150 + k * 40], [40, -150 + k * 40]], P.stone, 6);
  ctx.strokeStyle = P.sepia; ctx.lineWidth = 12; ctx.beginPath(); ctx.arc(0, -40, 90, 0, Math.PI); ctx.stroke(); cut(P_rr(-10, 50, 20, 110, 6), P.sepia, { shadow: 0.3, edge: 2 }); cut(P_rr(-70, 150, 140, 24, 10), P.sepia, { shadow: 0.3, edge: 2 }); ctx.restore(); }
/** a paper star sticker */
function star(x, y, s, rot = 0, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const pts = []; for (let k = 0; k < 10; k++) { const r = k % 2 ? 45 : 100, a = -Math.PI / 2 + k * Math.PI / 5; pts.push([r * Math.cos(a), r * Math.sin(a)]); } cut(P_poly(pts), col); ctx.restore(); }
/** a calendar page */
function calendar(x, y, s, val, top, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-210, -170, 420, 340, 20), '#FFFBF0'); cut(P_rr(-210, -170, 420, 100, 20), P.crimson, { shadow: 0, edge: 0 }); cut(P_rr(-210, -100, 420, 30, 0), P.crimson, { shadow: 0, edge: 0 });
  K.label(top, 0, -118, 40, P.edge); K.label(val, 0, 50, 90, P.gold); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · you reposted a viral reel, zero views? it's the original content rule
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'a VIRAL reel card gets copied onto your phone, view counter drops to a crimson 0', draw(lt, d, t) {
      room(1);
      reel(300, 700, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05, P.crimson); K.slip('VIRAL', 300, 400, R2(seg(lt, 0.1, 0.3)), -0.04, 60);
      const f = eo(seg(lt, d * 0.2, d * 0.5)); if (f > 0) reel(lerp(300, 780, f), lerp(700, 760, f), lerp(1.0, 0.9, f), lerp(-0.05, 0.05, f), P.crimson, 'REPOST');
      bigMark('0', 780, 1300, R2(seg(lt, d * 0.55, d * 0.75)), 0.06, P.crimson, 300); K.slip('VIEWS', 780, 1520, R2(seg(lt, d * 0.65, d * 0.85)), 0.04, 60);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'giant ORIGINAL stamp slams onto a reel card, RULE ribbon', draw(lt, d, t) {
      dayPage(2);
      reel(540, 760, 1.2 * R2(seg(lt, 0.02, 0.2)), 0.02);
      const s = seg(lt, d * 0.2, d * 0.45), sc = s <= 0 ? 0 : lerp(2.2, 1, eo(s)); if (sc) { ctx.save(); ctx.translate(540, 1100); ctx.rotate(-0.1); ctx.scale(sc, sc); cut(P_rr(-260, -70, 520, 140, 14), P.crimson); K.label('ORIGINAL?', 0, 6, 80, P.edge); ctx.restore(); }
      K.ribbon('THE RULE', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.35, 'zip', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.6, 'thud', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.4, 'slam', { gain: 0.8 }); }

  // 1 · simply put: keep reposting what you didn't make → no recommendations
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, a stack of copied reels grows: NOT YOURS slip', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const n = 1 + Math.floor(3 * seg(lt, d * 0.15, d * 0.6)); copies(480, 900, 1.0 * R2(seg(lt, 0.05, 0.2)), n);
      K.slip('NOT YOURS', 540, 1450, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 70);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'RECOMMENDED shelf with your reel slot: crimson strike + big X: NO RECS ribbon', draw(lt, d, t) {
      nightPage(4);
      const s = R2(seg(lt, 0.02, 0.2)); if (s > 0) { ctx.save(); ctx.translate(540, 760); ctx.scale(s, s); cut(P_rr(-440, -260, 880, 520, 24), '#FFFBF0'); K.label('RECOMMENDED', 0, -200, 54, P.ink); reel(-250, 60, 0.6, 0, P.forest); reel(0, 60, 0.6, 0, P.royal); reel(250, 60, 0.6, 0, P.sea); ctx.restore(); }
      bigMark('✕', 790, 820, R2(seg(lt, d * 0.35, d * 0.5)), -0.1, P.crimson, 300);
      K.ribbon('NO RECS', 540, 1500, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.45].forEach((a) => cue(st + d1 * 0.5 * a, 'pop', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + d1 * 0.5 * 0.4, 'slam', { gain: 0.8 }); }

  // 2 · 2024: Reels, 10+ reposts in 30 days → recommendations stop
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'gold 2024 slip, calendar 30 DAYS, ten small reel cards pop in a grid with a gold 10 counter, last one struck', draw(lt, d, t) {
      dayPage(5);
      K.slip('2024 · REELS', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      calendar(540, 560, 0.9 * R2(seg(lt, 0.1, 0.3)), '30 DAYS', 'IN', 0.03);
      for (let k = 0; k < 10; k++) { const a = R2(seg(lt, d * (0.25 + k * 0.04), d * (0.33 + k * 0.04))); reel(180 + (k % 5) * 180, 960 + Math.floor(k / 5) * 300, 0.36 * a, (k % 3 - 1) * 0.05); }
      bigMark(String(Math.round(10 * clamp(seg(lt, d * 0.25, d * 0.65)))) + '+', 540, 1640, R2(seg(lt, d * 0.3, d * 0.45)), -0.04, P.gold, 180);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); for (let k = 0; k < 10; k += 2) cue(st + len(2) * (0.27 + k * 0.04), 'pop', { gain: 0.3 }); cue(st + len(2) * 0.68, 'thud', { gain: 0.7 }); }

  // 3 · since April 2026: photos and carousels too
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'APRIL 2026 calendar, then a PHOTO card and a fanned CAROUSEL join the reel: TOO ribbon', draw(lt, d, t) {
      room(6);
      calendar(540, 420, 0.95 * R2(seg(lt, 0.02, 0.2)), 'APR 2026', 'SINCE', -0.03);
      reel(200, 980, 0.6 * R2(seg(lt, 0.1, 0.3)), -0.05); K.slip('REELS', 200, 1180, R2(seg(lt, 0.15, 0.35)), -0.04, 50);
      postCard(540, 980, 0.75 * R2(seg(lt, d * 0.35, d * 0.5)), 0.02); K.slip('PHOTOS', 540, 1180, R2(seg(lt, d * 0.4, d * 0.55)), 0.03, 50);
      const c = R2(seg(lt, d * 0.5, d * 0.65)); [2, 1, 0].forEach((k) => postCard(860 + k * 30, 980 - k * 20, 0.6 * c, 0.05 + k * 0.08)); K.slip('CAROUSELS', 870, 1180, R2(seg(lt, d * 0.55, d * 0.7)), 0.04, 50);
      K.ribbon('ALL OF THEM', 540, 1570, R2(seg(lt, d * 0.65, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(3) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.55, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.7, 'slam', { gain: 0.7 }); }

  // 4 · you: took someone's funny reel, added your watermark, sped it up
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you at desk grab a FUNNY reel from a phone (paper hand lifts it)', draw(lt, d, t) {
      room(7);
      person({ x: 230, y: 1650, h: 620, arm: 90, top: M.hoodie2, glow: 0.7 });
      const f = eo(seg(lt, d * 0.2, d * 0.7)); reel(lerp(800, 560, f), lerp(700, 900, f), 0.9 * R2(seg(lt, 0.02, 0.2)), lerp(0.08, -0.04, f), P.gold);
      K.slip('FUNNY', lerp(800, 560, f), lerp(380, 580, f), R2(seg(lt, 0.1, 0.3)), 0.04, 60);
      K.slip('NOT YOURS', 760, 1450, R2(seg(lt, d * 0.6, d * 0.8)), 0.03, 60);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'same reel gets a @ME watermark stamped on, then a gold 1.5x fast-forward badge: WATERMARK + SPEED slips', draw(lt, d, t) {
      dayPage(8);
      reel(540, 780, 1.25, -0.02, P.gold, seg(lt, d * 0.15, d * 0.3) > 0 ? '@ME' : '');
      K.slip('WATERMARK', 300, 360, R2(seg(lt, d * 0.15, d * 0.3)), -0.05, 58);
      const s = R2(seg(lt, d * 0.5, d * 0.65)); if (s > 0) { ctx.save(); ctx.translate(820, 1180); ctx.scale(s, s); cut(P_circ(0, 0, 110), P.gold); K.label('1.5x', 0, 6, 70, P.ink); ctx.restore(); }
      K.slip('SPEED UP', 540, 1520, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.4, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.2, 'thud', { gain: 0.6 }); cue(mid + d4 * 0.5 * 0.55, 'zip', { gain: 0.6 }); }

  // 5 · Instagram: not enough; screenshot with username credit doesn't count either
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'watermark + speed cards both struck crimson: NOT ENOUGH ribbon', draw(lt, d, t) {
      nightPage(9);
      rankCard('✕', '@ME WATERMARK', 540, 600, R2(seg(lt, 0.02, 0.2)), -0.02, 760); strike(200, 610, 680, seg(lt, d * 0.25, d * 0.4));
      rankCard('✕', '1.5x SPEED', 540, 840, R2(seg(lt, 0.1, 0.3)), 0.02, 760); strike(200, 850, 680, seg(lt, d * 0.35, d * 0.5));
      K.ribbon('NOT ENOUGH', 540, 1400, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a screenshot card with "@someone" username line, magnifier, crimson X: DOESN\'T COUNT slip', draw(lt, d, t) {
      dayPage(10);
      const s = R2(seg(lt, 0.02, 0.2)); if (s > 0) { ctx.save(); ctx.translate(540, 760); ctx.rotate(-0.03); ctx.scale(s, s); cut(P_rr(-260, -340, 520, 680, 20), '#FFFBF0'); rr(-220, -300, 440, 460, 10); ctx.fillStyle = P.gold; ctx.fill();
        cut(P_poly([[-40, -120], [-40, -20], [50, -70]]), P.edge, { shadow: 0.3, edge: 0 }); K.label('@someone', 0, 240, 54, P.royal); ctx.restore(); }
      K.slip('SCREENSHOT', 540, 300, R2(seg(lt, 0.1, 0.3)), -0.03, 64);
      magnifier(lerp(700, 640, 0.5 + 0.5 * Math.sin(t * 2)), 1000, 0.7 * R2(seg(lt, d * 0.2, d * 0.35)));
      bigMark('✕', 820, 640, R2(seg(lt, d * 0.45, d * 0.6)), 0.1, P.crimson, 260);
      K.slip("DOESN'T COUNT", 540, 1450, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.3, 'zip', { gain: 0.5 }); cue(st + d5 * 0.45 * 0.42, 'zip', { gain: 0.5 }); cue(st + d5 * 0.45 * 0.6, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.55 * 0.5, 'slam', { gain: 0.8 }); }

  // 6 · game changer: two identical reels → Instagram shows the original in recommendations
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, two identical reels side by side, = sign, magnifier scans: SAME? slip', draw(lt, d, t) {
      nightPage(11);
      K.slip('GAME CHANGER', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      reel(290, 850, 0.9 * R2(seg(lt, 0.05, 0.2)), -0.04, P.gold); reel(790, 850, 0.9 * R2(seg(lt, 0.15, 0.3)), 0.04, P.gold, 'COPY');
      K.label('=', 540, 850, 160 * R2(seg(lt, d * 0.3, d * 0.45)), P.gold);
      magnifier(lerp(250, 830, 0.5 + 0.5 * Math.sin(t * 2.5)), 1300, 0.7 * R2(seg(lt, d * 0.4, d * 0.55)));
      K.slip('SAME?', 540, 1600, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 70);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'the copy slides off the RECOMMENDED shelf, the original slides in with a gold star: ORIGINAL WINS ribbon', draw(lt, d, t) {
      dayPage(12, false);
      const s = R2(seg(lt, 0.02, 0.15)); if (s > 0) { ctx.save(); ctx.translate(540, 820); ctx.scale(s, s); cut(P_rr(-440, -380, 880, 760, 24), '#FFFBF0'); K.label('RECOMMENDED', 0, -320, 54, P.ink); ctx.restore(); }
      const f = eo(seg(lt, d * 0.15, d * 0.45)); reel(lerp(540, 1300, f), 880, 0.95 * s, 0.1 * f, P.gold, 'COPY');
      const g = eo(seg(lt, d * 0.18, d * 0.45)); if (g > 0) reel(lerp(-300, 540, g), 880, 0.95, 0, P.gold);
      star(680, 640, 0.9 * R2(seg(lt, d * 0.55, d * 0.7)), 0.2);
      K.ribbon('ORIGINAL WINS', 540, 1580, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.35, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.25, 'zip', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.6, 'sparkle', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.7, 'slam', { gain: 0.8 }); }

  // 7 · craziest: followers still see you; you just don't reach new people in feeds and Discover
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, your three followers still glow with your post: FOLLOWERS ✓', draw(lt, d, t) {
      room(13);
      K.slip('CRAZIEST PART', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      reel(540, 640, 0.7 * R2(seg(lt, 0.05, 0.2)), 0.02, P.gold);
      [200, 540, 880].forEach((x, k) => person({ x, y: 1600, h: 460, arm: 60, top: [M.hoodie, P.royal, P.wine][k], glow: eo(seg(lt, d * (0.3 + k * 0.1), d * (0.45 + k * 0.1))) }));
      K.slip('FOLLOWERS STILL SEE', 540, 1700, R2(seg(lt, d * 0.55, d * 0.75)), 0.02, 56);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'FEED and DISCOVER doors closed with crimson bars; new people outside stay grey: NO NEW REACH ribbon', draw(lt, d, t) {
      nightPage(14);
      [['FEED', 300], ['DISCOVER', 780]].forEach(([w, x], k) => { const s = R2(seg(lt, 0.02 + k * 0.1, 0.2 + k * 0.1)); if (s > 0) { ctx.save(); ctx.translate(x, 760); ctx.scale(s, s); cut(P_rr(-180, -280, 360, 560, 24), '#FFFBF0'); K.label(w, 0, -210, 50, P.ink); cut(P_rr(-130, -140, 260, 360, 14), P.sea, { shadow: 0, edge: 2 }); ctx.restore(); }
        const b = seg(lt, d * (0.3 + k * 0.1), d * (0.45 + k * 0.1)); if (b > 0) cut(P_rr(x - 200 * b, 740, 400 * b, 60, 10), P.crimson, { shadow: 0.4, edge: 3 }); });
      [[200, M.tee], [540, M.hoodie2], [880, P.stoneDark]].forEach(([x, c]) => person({ x, y: 1650, h: 380, arm: 40, top: c, glow: 0 }));
      K.ribbon('NO NEW PEOPLE', 540, 1220, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.35, 0.45, 0.55].forEach((a) => cue(st + d7 * 0.45 * a, 'sparkle', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + d7 * 0.55 * 0.35, 'thud', { gain: 0.6 }); cue(mid + d7 * 0.55 * 0.45, 'thud', { gain: 0.6 }); cue(mid + d7 * 0.55 * 0.7, 'slam', { gain: 0.8 }); }

  // 8 · what to do: your own voice-over on a clip, or your reaction
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.45;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: '1 VOICE-OVER card, a microphone beside a reel, sound waves into the reel', draw(lt, d, t) {
      dayPage(15);
      rankCard(1, 'VOICE-OVER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 620);
      reel(700, 880, 1.0 * R2(seg(lt, 0.05, 0.2)), 0.04, P.gold);
      mic(260, 900, 1.0 * R2(seg(lt, 0.15, 0.35)), -0.1);
      for (let k = 0; k < 3; k++) { const on = seg(lt, d * (0.35 + k * 0.1), d * (0.45 + k * 0.1)); if (on > 0) { ctx.strokeStyle = P.crimson; ctx.lineWidth = 12; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(330, 820, 60 + k * 45 + 8 * Math.sin(t * 8), -0.6, 0.6); ctx.stroke(); } }
      K.slip('YOUR VOICE', 540, 1450, R2(seg(lt, d * 0.5, d * 0.7)), 0.03, 70);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: '2 REACTION card, a reel in the top corner and you below reacting (big !), YOUR TAKE ribbon', draw(lt, d, t) {
      room(16);
      rankCard(2, 'REACTION', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 580);
      reel(760, 720, 0.75 * R2(seg(lt, 0.05, 0.2)), 0.05, P.gold);
      person({ x: 320, y: 1650, h: 640, arm: 130, top: M.tee, phone: false, bob: -10 * Math.abs(Math.sin(t * 6)) });
      bigMark('!', 520, 760, R2(seg(lt, d * 0.3, d * 0.45)), 0.1, P.crimson, 300);
      K.ribbon('YOUR TAKE', 540, 1540, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d8 * 0.45 * 0.4, 'sparkle', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d8 * 0.55 * 0.35, 'pop', { gain: 0.7 }); }

  // 9 · memes: add something of your own that makes it better
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: '3 MEME card, a plain photo gets your caption strip + gold star sticker slapped on: + YOUR TWIST', draw(lt, d, t) {
      dayPage(17);
      rankCard(3, 'MEME', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 480);
      postCard(540, 860, 1.4 * R2(seg(lt, 0.05, 0.2)), -0.02);
      const c = seg(lt, d * 0.3, d * 0.45), sc = c <= 0 ? 0 : lerp(2, 1, eo(c)); if (sc) { ctx.save(); ctx.translate(540, 560); ctx.rotate(-0.04); ctx.scale(sc, sc); cut(P_rr(-260, -50, 520, 100, 10), '#FFFBF0'); K.label('ME ON MONDAY', 0, 4, 52, P.ink); ctx.restore(); }
      star(790, 1080, 0.9 * R2(seg(lt, d * 0.5, d * 0.65)), 0.2);
      K.ribbon('+ SOMETHING NEW', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(9) * 0.38, 'thud', { gain: 0.6 }); cue(st + len(9) * 0.55, 'sparkle', { gain: 0.6 }); cue(st + len(9) * 0.7, 'slam', { gain: 0.7 }); }

  // 10 · loop: don't copy, add your twist (back to beat-0 room: the viral reel, now with your mic + star)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: COPY card struck out on the left, your reel with star + mic on the right: ADD YOUR TWIST ribbon', draw(lt, d, t) {
      room(1);
      reel(290, 800, 0.85 * R2(seg(lt, 0.02, 0.2)), -0.05, P.crimson, 'COPY'); strike(140, 820, 300, seg(lt, d * 0.2, d * 0.35));
      reel(790, 800, 0.85 * R2(seg(lt, d * 0.3, d * 0.45)), 0.05, P.crimson); star(900, 560, 0.6 * R2(seg(lt, d * 0.45, d * 0.6)), 0.2); mic(640, 1230, 0.6 * R2(seg(lt, d * 0.45, d * 0.6)), -0.1);
      K.ribbon('ADD YOUR TWIST', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.27, 'zip', { gain: 0.6 }); cue(st + len(10) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.6, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend who only reposts
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a stack of copies, handle slip', draw(lt, d, t) {
      dayPage(18); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      copies(260, 1280, 0.5 * R2(seg(lt, d * 0.3, d * 0.45)), 3);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
