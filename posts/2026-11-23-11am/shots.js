// 23 Nov 11am: INSTAGRAM'S EDITS APP: FREE TOOLS FOR REELS. Paper style.
// Facts (opened 22 Nov 2026): Meta newsroom "Introducing Edits: A Streamlined Video Creation App" (22 Apr 2025, update
// 17 Dec 2025) and Instagram Creators blog "Introducing Edits": free on App Store + Google Play; camera capture up to
// 10 minutes; share straight to Instagram/Facebook or export with no watermark; frame-accurate timeline, green screen,
// transitions; real-time feedback on factors that can affect distribution (like skip rate); Dec 2025 update: more fonts
// for Indic languages, storyboards (scripts, teleprompter cues, clips, notes); sign in with your Instagram account.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, coins, laptop, clock,
  wallet, LL, geo } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** the Edits app icon: a paper tile with a scissor-ish "E" */
function appIcon(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -150, 300, 300, 64), P.ink); cut(P_rr(-110, -110, 220, 220, 44), P.crimson, { shadow: 0, edge: 4 });
  K.label('E', 0, 6, 170, P.edge); ctx.restore(); }
/** a clip timeline strip: n clips, a playhead at ph (0..1), cut = index of a clip being trimmed (shrinks by trim) */
function clips(x, y, w, n, p, ph = -1, cutAt = -1, trim = 0) { const cw = w / n;
  for (let k = 0; k < n; k++) { const a = R2(seg(p, k / n * 0.6, k / n * 0.6 + 0.3)); if (a <= 0) continue; const ww = (cw - 14) * (k === cutAt ? 1 - 0.5 * trim : 1);
    cut(P_rr(x + k * cw, y, ww * a, 120, 12), [P.sea, P.gold, P.forest, P.royal, P.wine][k % 5], { shadow: 0.4, edge: 4 }); }
  if (ph >= 0) { const px = x + w * ph; line([[px, y - 30], [px, y + 150]], P.crimson, 8); circle(px, y - 34, 16, P.crimson); } }
/** a green screen: a green panel with the creator cut-out in front and a city behind once keyed */
function greenScreen(x, y, s, key) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-260, -330, 520, 560, 14), key > 0.5 ? P.sky : '#6FA35A');
  if (key > 0.5) for (let k = 0; k < 4; k++) cut(P_rr(-240 + k * 125, 230 - 160 - k % 2 * 90, 100, 160 + k % 2 * 90, 4), k % 2 ? P.stone : P.stoneDark, { shadow: 0.3, edge: 3 });
  ctx.restore(); }
/** a watermark tag stuck on a reel; struck through when gone */
function watermark(x, y, s, gone) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.globalAlpha = 1 - 0.3 * gone;
  cut(P_rr(-150, -40, 300, 80, 10), 'rgba(255,251,240,0.85)', { shadow: 0.3, edge: 3 }); K.label('WATERMARK', 0, 2, 36, P.sepia); ctx.restore();
  if (gone > 0) { const w = 170 * s; line([[x - w, y + 30], [x - w + 2 * w * gone, y - 30]], P.crimson, 14); } }
/** a storyboard card with a title and ruled lines */
function card(x, y, s, word, rot = 0, col = '#FFFBF0') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -190, 300, 380, 12), col); K.label(word, 0, -130, 44, P.ink);
  for (let k = 0; k < 4; k++) line([[-110, -50 + k * 56], [110 - (k % 2) * 50, -50 + k * 56]], 'rgba(62,44,30,0.25)', 10); ctx.restore(); }
/** green tick / crimson cross */
function tick(x, y, k, ok = true) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 90), ok ? P.green : P.crimson);
  if (ok) line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); else { line([[-35, -35], [35, 35]], P.edge, 20); line([[35, -35], [-35, 35]], P.edge, 20); } ctx.restore(); }
/** inside a phone: a mini reel frame with a little person */
function reelFrame(f = 0) { cut(P_rr(-186, -370, 372, 740, 0), P.sea, { shadow: 0, edge: 0 }); person({ x: 0, y: 260, h: 420, arm: 40 + 20 * Math.sin(f), top: M.tee, phone: false }); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · paying to edit reels? Instagram has its own free app: Edits
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.45;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator at a desk, coins fly away out of a wallet, crimson PAYING? mark', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 640, arm: 60, top: M.tee });
      wallet(720, 1250, 0.8 * R2(seg(lt, 0.02, 0.2)), eo(seg(lt, 0.15, 0.35)));
      for (let k = 0; k < 3; k++) { const f = eo(seg(lt, 0.25 + k * 0.12, 0.7 + k * 0.12)); if (f > 0 && f < 1) coins(lerp(720, 940 - k * 120, f), lerp(1150, 500 - k * 60, f), 0.45, 2); }
      bigMark('PAYING?', 560, 640, R2(seg(lt, d * 0.35, d * 0.6)), -0.06, P.crimson, 170);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'Edits app icon pops big, FREE gold mark, ribbon EDITS', draw(lt, d, t) {
      dayPage(2);
      appIcon(540, 820, 1.4 * R2(seg(lt, 0.02, 0.25)), -0.04 + 0.03 * Math.sin(t * 2));
      bigMark('FREE', 820, 440, R2(seg(lt, 0.25, 0.45)), 0.1, P.gold, 160);
      K.ribbon('EDITS', 540, 1450, R2(seg(lt, 0.4, 0.7)), 150);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.2, 'plop', { gain: 0.5 }); cue(st + d0 * 0.3, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'slam', { gain: 0.8 }); cue(mid + 0.5, 'pop', { gain: 0.5 }); }

  // 1 · simply put: a free video editing app Meta launched in April 2025
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, big phone with a clip timeline, gold APRIL 2025 timeline', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('SIMPLY PUT', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      phoneBig(540, 880, 0.9 * R2(seg(lt, 0.05, 0.25)), 0.03, () => { reelFrame(t * 3); cut(P_rr(-186, 200, 372, 170, 0), P.ink, { shadow: 0, edge: 0 }); clips(-170, 230, 340, 4, seg(lt, 0.2, 0.6), lerp(0.1, 0.8, seg(lt, 0.3, 1))); });
      K.slip('VIDEO EDITOR', 540, 1380, R2(seg(lt, 0.3, 0.45)), 0.03, 62);
      K.timeline(['2025', 'APRIL'], 180, 1580, 720, eo(seg(lt, d * 0.55, d * 0.8)), lt > d * 0.7 ? 1 : 0);
    } });
    cue(st, 'whoosh'); cue(st + len(1) * 0.15, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.4, 'zip', { gain: 0.5 }); cue(st + len(1) * 0.7, 'slam', { gain: 0.6 }); }

  // 2 · camera records up to 10 minutes in one go
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'phone with crimson REC dot, clock hand sweeps, gold 10 MIN', draw(lt, d, t) {
      room(4);
      phoneBig(330, 950, 0.75 * R2(seg(lt, 0.02, 0.2)), -0.05, () => { reelFrame(t * 3); circle(-110, -300, 24 * (0.8 + 0.2 * Math.sin(t * 8)), P.crimson); K.label('REC', -40, -300, 40, P.crimson); });
      clock(780, 700, 1.0 * R2(seg(lt, 0.1, 0.3)), seg(lt, 0.2, 1) * 10);
      bigMark('10 MIN', 760, 1080, R2(seg(lt, d * 0.35, d * 0.55)), -0.05, P.gold, 160);
      K.ribbon('ONE TAKE', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(2) * 0.2, 'pop', { gain: 0.4 }); cue(st + len(2) * 0.4, 'slam', { gain: 0.7 }); }

  // 3 · export: no watermark, post anywhere
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'reel card with WATERMARK tag gets struck off, card flies along dashed routes to 3 post cards', draw(lt, d, t) {
      dayPage(5);
      phoneBig(540, 700, 0.62 * R2(seg(lt, 0.02, 0.18)), 0, () => reelFrame(t * 3));
      watermark(540, 900, 1.4 * R2(seg(lt, 0.08, 0.2)), eo(seg(lt, 0.25, 0.45)));
      K.ribbon('NO WATERMARK', 540, 1180, R2(seg(lt, 0.4, 0.6)), 110);
      [[220, 1500, -0.08], [540, 1540, 0], [860, 1500, 0.08]].forEach(([x, y, r], k) => { const g = eo(seg(lt, d * (0.55 + k * 0.08), d * (0.75 + k * 0.08))); if (g > 0) { K.dashedRoute([[540, 1260], [x, y - 200]], g); postCard(x, y, 0.45 * g, r, 0); } });
      K.slip('POST ANYWHERE', 540, 1800, R2(seg(lt, d * 0.75, d * 0.95)), -0.02, 56);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.3, 'zip', { gain: 0.6 }); cue(st + len(3) * 0.45, 'slam', { gain: 0.6 }); [0.6, 0.68, 0.76].forEach((a) => cue(st + len(3) * a, 'pop', { gain: 0.4 })); }

  // 4 · you: shoot, trim on the timeline, green screen, share straight to Instagram
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator filming, then a big timeline where one clip gets trimmed by a playhead', draw(lt, d, t) {
      dayPage(6, false);
      K.slip('YOU', 160, 260, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      person({ x: 270, y: 1150, h: 520, arm: 80, top: M.tee });
      K.slip('SHOOT', 700, 600, R2(seg(lt, 0.1, 0.25)), 0.03, 70);
      cut(P_rr(80, 1320, 920, 220, 20), P.ink, { shadow: 0.6, edge: 4 });
      clips(120, 1370, 840, 5, seg(lt, 0.25, 0.65), lerp(0.05, 0.55, seg(lt, 0.4, 0.9)), 2, eo(seg(lt, d * 0.65, d * 0.85)));
      K.ribbon('TRIM', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 130);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'green screen panel flips to a city, then the reel shoots up to an Instagram-like post card: SHARED', draw(lt, d, t) {
      room(7);
      greenScreen(400, 900, 0.9 * R2(seg(lt, 0.02, 0.18)), seg(lt, 0.25, 0.3));
      person({ x: 400, y: 1110, h: 440, arm: 40, top: M.tee, phone: false });
      K.slip('GREEN SCREEN', 400, 420, R2(seg(lt, 0.05, 0.2)), -0.03, 60);
      const g = eo(seg(lt, d * 0.5, d * 0.75)); if (g > 0) { K.dashedRoute([[640, 900], [820, 800]], g); postCard(840, 820, 0.6 * g, 0.06, eo(seg(lt, d * 0.75, d * 0.9))); }
      K.ribbon('SHARED', 540, 1600, R2(seg(lt, d * 0.6, d * 0.9)), 130);
    } });
    cue(st, 'whoosh'); cue(st + d4 * 0.5 * 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.75, 'zip', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.27, 'pop', { gain: 0.6 }); cue(mid + d4 * 0.5 * 0.6, 'zip', { gain: 0.5 }); cue(mid + d4 * 0.5 * 0.75, 'slam', { gain: 0.6 }); }

  // 5 · game changer: shows things like skip rate that affect reach
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, phone shows a reel; viewers swipe away (arrows), crimson SKIP RATE meter fills', draw(lt, d, t) {
      nightPage(8);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      phoneBig(330, 900, 0.7 * R2(seg(lt, 0.05, 0.22)), -0.04, () => reelFrame(t * 3));
      for (let k = 0; k < 3; k++) { const f = eo(seg(lt, 0.25 + k * 0.1, 0.5 + k * 0.1)); if (f > 0 && f < 1) { ctx.save(); ctx.globalAlpha = 1 - f; line([[330, 900 - k * 150], [330, 600 - k * 150 - 300 * f]], P.edge, 14); ctx.restore(); } }
      cut(P_rr(680, 560, 140, 640, 30), '#FFFBF0'); const m = 0.6 * eo(seg(lt, 0.3, 0.7)); if (m > 0) cut(P_rr(680, 1200 - 640 * m, 140, 640 * m, 30), P.crimson, { shadow: 0, edge: 3 });
      K.slip('SKIP RATE', 750, 480, R2(seg(lt, 0.3, 0.45)), 0.03, 60);
      K.ribbon('AFFECTS REACH', 540, 1600, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); [0.3, 0.4, 0.5].forEach((a) => cue(st + len(5) * a, 'zip', { gain: 0.35 })); cue(st + len(5) * 0.7, 'slam', { gain: 0.7 }); }

  // 6 · best part: December update, more fonts for Indian languages
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.14, note: 'BEST PART slip, gold DEC 2025 slip, font tiles Aa fan out over a small India map, NEW FONTS ribbon', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('BEST PART', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      K.slip('DEC 2025', 540, 400, R2(seg(lt, 0.15, 0.3)), 0.03, 64);
      const m = R2(seg(lt, 0.2, 0.4)); if (m > 0) { ctx.save(); ctx.translate(540, 1000); ctx.scale(m * 0.95, m * 0.95); ctx.translate(-510, -880); cut(P_poly(LL.map(([a, b]) => geo(a, b))), P.land); ctx.restore(); }
      [[260, 800, -0.15, P.crimson], [540, 760, 0, P.gold], [820, 800, 0.15, P.royal], [400, 1180, -0.08, P.forest], [680, 1180, 0.08, P.wine]].forEach(([x, y, r, c], k) => {
        const s = R2(seg(lt, d * (0.35 + k * 0.07), d * (0.5 + k * 0.07))); if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s); cut(P_rr(-100, -100, 200, 200, 24), c); K.label('Aa', 0, 6, 100, P.edge); ctx.restore(); });
      K.ribbon('INDIAN FONTS', 540, 1620, R2(seg(lt, d * 0.65, d * 0.95)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(6) * 0.2, 'pop', { gain: 0.5 }); [0.4, 0.47, 0.54, 0.61, 0.68].forEach((a) => cue(st + len(6) * a, 'pop', { gain: 0.35 })); cue(st + len(6) * 0.8, 'slam', { gain: 0.6 }); }

  // 7 · storyboards: script, teleprompter and notes in one place
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'three cards SCRIPT / PROMPTER / NOTES slide into one folder board, ONE PLACE ribbon', draw(lt, d, t) {
      room(10);
      K.slip('STORYBOARD', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      cut(P_rr(100, 560, 880, 640, 18), P.sepia, { shadow: 0.8, edge: 5 });
      [['SCRIPT', 260, -0.06], ['PROMPTER', 540, 0], ['NOTES', 820, 0.06]].forEach(([w, x, r], k) => { const f = eo(seg(lt, 0.15 + k * 0.15, 0.4 + k * 0.15)); card(lerp(x + (k - 1) * 200, x, f), lerp(1500, 880, f), 0.82 * R2(seg(lt, 0.12 + k * 0.15, 0.3 + k * 0.15)), w, r, k === 1 ? '#F2E3BC' : '#FFFBF0'); });
      K.ribbon('ONE PLACE', 540, 1600, R2(seg(lt, d * 0.65, d * 0.95)), 130);
    } });
    cue(st, 'whoosh'); [0.25, 0.4, 0.55].forEach((a) => cue(st + len(7) * a, 'thud', { gain: 0.45 })); cue(st + len(7) * 0.75, 'slam', { gain: 0.6 }); }

  // 8 · so: download Edits, sign in with your Instagram account
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, app icon drops into a phone with a download arrow, SIGN IN bubble + tick', draw(lt, d, t) {
      dayPage(11);
      K.slip('STEP 1', 200, 260, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      phoneBig(540, 1000, 0.85 * R2(seg(lt, 0.05, 0.2)), 0.02, () => { cut(P_rr(-186, -370, 372, 740, 0), '#F3E9D2', { shadow: 0, edge: 0 }); });
      const f = eo(seg(lt, 0.15, 0.45)); appIcon(540, lerp(360, 820, f), 0.6 * R2(seg(lt, 0.12, 0.25)));
      if (lt > d * 0.45) { line([[540, 1020], [540, 1150]], P.crimson, 14); line([[490, 1100], [540, 1160], [590, 1100]], P.crimson, 14); }
      K.slip('DOWNLOAD', 540, 1250, R2(seg(lt, d * 0.4, d * 0.55)), 0.02, 56);
      bubble('Sign in with Instagram', 110, 1620, R2(seg(lt, d * 0.6, d * 0.8)), false, 62);
      tick(900, 1450, R2(seg(lt, d * 0.8, d * 0.95)));
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.35, 'plop', { gain: 0.6 }); cue(st + len(8) * 0.6, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.85, 'slam', { gain: 0.6 }); }

  // 9 · edit your next reel there, check skip rate after posting
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 2 slip, timeline edits itself, then a magnifier-ish meter: SKIP RATE checked', draw(lt, d, t) {
      dayPage(12, false);
      K.slip('STEP 2', 200, 260, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      cut(P_rr(80, 560, 920, 220, 20), P.ink, { shadow: 0.6, edge: 4 });
      clips(120, 610, 840, 4, seg(lt, 0.05, 0.4), lerp(0.05, 0.95, seg(lt, 0.15, 0.55)));
      K.slip('EDIT', 540, 920, R2(seg(lt, 0.2, 0.35)), 0.03, 70);
      bar0(lt, d);
      K.ribbon('CHECK SKIP RATE', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 96);
    } });
    function bar0(lt, d) { const s = R2(seg(lt, d * 0.45, d * 0.6)); if (s <= 0) return; ctx.save(); ctx.translate(540, 1240); ctx.scale(s, s);
      cut(P_rr(-380, -60, 760, 120, 20), '#FFFBF0'); cut(P_rr(-380, -60, 760 * 0.35 * eo(seg(lt, d * 0.55, d * 0.8)) + 1, 120, 20), P.crimson, { shadow: 0, edge: 3 }); K.label('SKIP', -300, -120, 60, P.ink); ctx.restore(); }
    cue(st, 'whoosh'); cue(st + len(9) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(9) * 0.55, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.75, 'slam', { gain: 0.6 }); }

  // 10 · loop: free app, no watermark, no excuses (beat-0 room)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: creator, wallet stays shut (coins back in), app icon glows, crimson NO EXCUSES', draw(lt, d, t) {
      room(1);
      person({ x: 260, y: 1650, h: 640, arm: 70, top: M.tee, glow: eo(seg(lt, 0.2, 0.6)) });
      wallet(720, 1250, 0.8, 0);
      appIcon(720, 760, 0.8 * R2(seg(lt, 0.05, 0.25)), 0.05 * Math.sin(t * 3));
      K.slip('FREE · NO WATERMARK', 540, 300, R2(seg(lt, 0.15, 0.35)), -0.03, 56);
      K.ribbon('NO EXCUSES', 540, 480, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.55, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend who still posts reels with a watermark
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a WATERMARK tag on their phone lights up, handle slip', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      watermark(320, 1250, 1.3 * R2(seg(lt, d * 0.3, d * 0.45)), eo(seg(lt, d * 0.6, d * 0.8)));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.7, 'zip', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
