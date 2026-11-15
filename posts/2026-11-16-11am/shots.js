// 16 Nov 11am: YEARS OF POSTING BEFORE THE FIRST HIT (MrBeast's first five years, as a generic paper figure). Paper style.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, magnifier, bigMark,
  hand, clock, rankCard, strike, retention } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a video card with a play triangle (no logos); views = little eye count under it */
function videoCard(x, y, s, rot = 0, hot = false) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -120, 400, 240, 16), hot ? '#3A2A22' : M.screen, { shadow: 0.6, edge: 4 }); cut(P_poly([[-36, -54], [-36, 54], [56, 0]]), hot ? P.gold : P.crimson, { shadow: 0, edge: 0 }); ctx.restore(); }
/** a gem-shaped plaque (milestone; no platform logo) */
function gemPlaque(x, y, s, glow = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow) { ctx.save(); ctx.globalAlpha = 0.35 * glow; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; line([[Math.cos(a) * 260, Math.sin(a) * 260], [Math.cos(a) * 380, Math.sin(a) * 380]], P.gold, 16); } ctx.restore(); }
  cut(P_rr(-220, -220, 440, 440, 20), '#E8E4DA');
  cut(P_poly([[-120, -60], [-60, -130], [60, -130], [120, -60], [0, 110]]), '#9DB4B0', { shadow: 0.4, edge: 5 });
  line([[-120, -60], [120, -60]], '#F7EFDC', 6); line([[-60, -130], [0, 110]], 'rgba(255,255,255,0.5)', 5); line([[60, -130], [0, 110]], 'rgba(255,255,255,0.5)', 5); ctx.restore(); }
/** a paper "0 views" eye tag */
function viewsTag(text, x, y, sc) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  cut(P_rr(-120, -40, 240, 80, 40), '#FFFBF0', { shadow: 0.5, edge: 3 }); ctx.beginPath(); ctx.ellipse(-70, 0, 30, 18, 0, 0, TAU); ctx.lineWidth = 6; ctx.strokeStyle = P.ink; ctx.stroke(); circle(-70, 0, 8, P.ink);
  ctx.font = '700 40px Caladea'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.ink; ctx.fillText(text, -30, 4); ctx.restore(); }
/** a red paper stop sign */
function stopSign(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-14, 0, 28, 420, 6), P.stoneDark, { shadow: 0.5, edge: 3 });
  const oct = []; for (let i = 0; i < 8; i++) { const a = Math.PI / 8 + i * TAU / 8; oct.push([Math.cos(a) * 170, Math.sin(a) * 170]); }
  cut(P_poly(oct), P.crimson); ctx.font = '700 92px Caladea'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.edge; ctx.fillText('STOP?', 0, 6); ctx.restore(); }
/** the creator: a generic paper figure (never a real person's likeness) */
const kid = (o) => person({ top: M.tee, arm: 40, ...o });

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · five years, nobody watches, would you stop? a wall of video cards all on "0 views", a figure, STOP? sign
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'five video cards tagged 0 views, 5 YEARS ribbon, a figure next to a STOP? sign', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      for (let k = 0; k < 4; k++) { const a = 0.1 + k * 0.12; videoCard(300 + (k % 2) * 480, 560 + Math.floor(k / 2) * 330, 0.85 * R2(seg(lt, a, a + 0.3)), (rnd(k) - 0.5) * 0.2); viewsTag('0', 300 + (k % 2) * 480, 700 + Math.floor(k / 2) * 330, R2(seg(lt, a + 0.2, a + 0.45))); }
      K.ribbon('5 YEARS', 540, 230, R2(seg(lt, 0.05, 0.35)), 104);
      kid({ x: 300, y: 1800, h: 520, glow: 0.2 });
      stopSign(760, 1300, R2(seg(lt, d * 0.55, d * 0.8)), Math.sin(t * 3) * 0.06);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 4; k++) cue(st + 0.1 + k * 0.12, 'pop', { gain: 0.4 }); cue(st + len(0) * 0.55, 'boing', { gain: 0.5 }); }

  // 1 · simply put, the first hit doesn't come on day one: calendar page DAY 1 struck out, HIT ribbon far away on a dashed route
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.1, note: 'DAY 1 slip struck out, dashed route to a far gold FIRST HIT ribbon', draw(lt, d, t) {
      dayPage(2, false);
      clock(800, 1500, 1.3, lt * 6); person({ x: 230, y: 1800, h: 460, arm: 50, top: M.tee });
      K.slip('DAY 1', 280, 500, R2(seg(lt, 0.0, 0.2)), -0.04, 90); strike(160, 510, 240, eo(seg(lt, d * 0.3, d * 0.45)));
      K.dashedRoute([[280, 620], [420, 900], [760, 820], [620, 1080]], eo(seg(lt, d * 0.35, d * 0.8)));
      K.ribbon('FIRST HIT', 560, 1180, R2(seg(lt, d * 0.65, d * 0.9)), 96);
      K.label('NOT YET', 760, 520, 56, P.crimson);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(1) * 0.65, 'slam', { gain: 0.5 }); }

  // 2 · meet MrBeast: Feb 2012, first video at 13: kid figure at a laptop, FEB 2012 ribbon, AGE 13 slip, name slip
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.1, note: 'name slip MRBEAST, young paper figure beside a laptop with one video card, FEB 2012 ribbon, AGE 13 slip', draw(lt, d, t) {
      room(3);
      laptop(640, 1300, 1.0, () => { ctx.fillStyle = '#F3E9D2'; ctx.fillRect(-306, -418, 612, 376); videoCard(0, -230, 0.8 * R2(seg(lt, d * 0.4, d * 0.65))); });
      kid({ x: 220, y: 1640, h: 520, arm: 70 });
      K.slip('MRBEAST', 540, 260, R2(seg(lt, 0.05, 0.3)), -0.03, 80);
      K.ribbon('FEB 2012', 540, 500, R2(seg(lt, d * 0.25, d * 0.5)), 96);
      K.slip('AGE 13', 820, 760, R2(seg(lt, d * 0.65, d * 0.85)), 0.04, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.25, 'slam', { gain: 0.4 }); cue(st + len(2) * 0.4, 'tock', { gain: 0.4 }); cue(st + len(2) * 0.65, 'pop', { gain: 0.5 }); }

  // 3 · four years later, mid-2016, only ~30,000 subscribers: timeline 2012 → 2016, counter crawls to 30K
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.1, note: 'timeline 2012 → 2016, slow gold counter to 30K, ONLY slip, 4 YEARS label', draw(lt, d, t) {
      dayPage(4, false);
      K.timeline([2012, 2016], 200, 520, 680, eo(seg(lt, 0.05, d * 0.45)), 1);
      K.label('4 YEARS', 540, 400, 52, P.sepia);
      const v = Math.round(30 * eo(seg(lt, d * 0.05, d * 0.85))); bigMark(`${v}K`, 540, 1050, R2(seg(lt, 0.02, 0.25)), -0.03, P.gold, 300);
      K.slip('SUBSCRIBERS', 540, 1330, R2(seg(lt, d * 0.4, d * 0.6)), -0.03, 70);
      K.ribbon('ONLY', 540, 1560, R2(seg(lt, d * 0.6, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + len(3) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.6, 'slam', { gain: 0.5 }); }

  // 4 · you: four years posting, friends ask "how long?": figure with phone, friends' bubbles pop
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, a figure posting (glowing phone), three friend bubbles "How long?" "Still?" "Get a job", 4 YEARS label', draw(lt, d, t) {
      room(5);
      person({ x: 280, y: 1560, h: 680, arm: 75, glow: 0.8, top: P.royal });
      K.slip('YOU', 280, 300, R2(seg(lt, 0.05, 0.3)), -0.04, 96);
      K.label('4 YEARS OF POSTS', 640, 480, 46, P.sepia);
      ['How long?', 'Still posting?', 'How long?'].forEach((w, k) => { const a = d * (0.4 + k * 0.14); bubble(w, 1000, 760 + k * 190, R2(seg(lt, a, a + 0.25)), true, 58); });
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(st + len(4) * (0.4 + k * 0.14), 'plop', { gain: 0.5 }); }

  // 5 · game changer: he didn't just post, he studied viral videos: POST struck, magnifier over video cards
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER ribbon, JUST POST slip struck out', draw(lt, d, t) {
      dayPage(6);
      K.ribbon('GAME CHANGER', 540, 420, R2(seg(lt, 0.05, 0.35)), 92);
      K.slip('JUST POST', 540, 1000, R2(seg(lt, 0.25, 0.5)), -0.03, 100); strike(340, 1010, 400, eo(seg(lt, d * 0.6, d * 0.85)));
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.12, note: 'three viral video cards, magnifier slides over them, STUDY ribbon', draw(lt, d, t) {
      dayPage(7, false);
      for (let k = 0; k < 3; k++) { const a = 0.05 + k * 0.1; videoCard(540, 640 + k * 300, 0.9 * R2(seg(lt, a, a + 0.3)), (k - 1) * 0.04, true); }
      magnifier(lerp(900, 640, eo(seg(lt, d * 0.3, d * 0.7))), lerp(700, 940, eo(seg(lt, d * 0.3, d * 0.9))), 1.2);
      K.label('VIRAL', 230, 480, 50, P.crimson);
      K.ribbon('STUDY', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + d5 * 0.45 * 0.6, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); for (let k = 0; k < 3; k++) cue(mid + 0.05 + k * 0.1, 'pop', { gain: 0.4 }); cue(mid + (d5 * 0.55) * 0.4, 'slam', { gain: 0.5 }); }

  // 6 · in his words: five years obsessed with studying virality: laptop with charts, notes pile, OBSESSED slip, night
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.1, note: 'night desk, laptop with retention chart, a figure leaning in, 5 YEARS ribbon, OBSESSED slip', draw(lt, d, t) {
      nightPage(8); ground(1500, '#3A3F5C');
      laptop(620, 1480, 1.1, () => { retention(-290, -400, 580, 340, seg(lt, 0.1, d * 0.8), 0.5, 0); });
      kid({ x: 200, y: 1800, h: 600, arm: 85, glow: 0.6 });
      K.ribbon('5 YEARS', 540, 260, R2(seg(lt, 0.05, 0.35)), 100);
      K.slip('OBSESSED', 540, 560, R2(seg(lt, d * 0.4, d * 0.65)), -0.04, 90);
      K.label('"STUDYING VIRALITY"', 540, 740, 44, P.edge);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.15, 'slide', { gain: 0.4 }); cue(st + len(6) * 0.4, 'slam', { gain: 0.5 }); }

  // 7 · Jan 2017, counting to 100,000 video became the breakthrough: counter 1 → 100,000, video card blows up
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'JAN 2017 ribbon, a video card with a gold counter rolling to 100,000, COUNTING slip', draw(lt, d, t) {
      dayPage(9, false);
      K.ribbon('JAN 2017', 540, 260, R2(seg(lt, 0.05, 0.35)), 104);
      videoCard(540, 820, 1.4 * R2(seg(lt, 0.15, 0.45)), -0.02);
      const v = Math.round(100000 * eio(seg(lt, d * 0.3, d * 0.95))); bigMark(v.toLocaleString('en-US'), 540, 1300, R2(seg(lt, d * 0.25, d * 0.4)), -0.02, P.gold, 190);
      K.slip('COUNTING TO', 540, 1580, R2(seg(lt, d * 0.3, d * 0.5)), 0.03, 70);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'the video card glows with gold rays, views tags explode around it, BREAKTHROUGH ribbon', draw(lt, d, t) {
      dayPage(10);
      const g = seg(lt, 0.1, 0.6); ctx.save(); ctx.globalAlpha = 0.4 * g; for (let k = 0; k < 14; k++) { const a = k / 14 * TAU + t * 0.2; line([[540 + Math.cos(a) * 330, 860 + Math.sin(a) * 330], [540 + Math.cos(a) * 470, 860 + Math.sin(a) * 470]], P.gold, 18); } ctx.restore();
      videoCard(540, 860, 1.3 * R2(seg(lt, 0.02, 0.3)), 0.02, true);
      ['VIEWS', 'VIEWS', 'VIEWS'].forEach((w, k) => viewsTag(w, [240, 840, 300][k], [560, 620, 1180][k], R2(seg(lt, d * (0.2 + k * 0.12), d * (0.4 + k * 0.12)))));
      K.ribbon('BREAKTHROUGH', 540, 1480, R2(seg(lt, d * 0.35, d * 0.65)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + d7 * 0.5 * 0.3, 'tick', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'sparkle', { dur: 1.0, gain: 0.5 }); for (let k = 0; k < 3; k++) cue(mid + len(7) * 0.5 * (0.2 + k * 0.12), 'pop', { gain: 0.4 }); }

  // 8 · craziest: the counting took 40 hours: a clock spinning fast, 40 HOURS gold
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST slip, a clock spinning fast, gold 40 HOURS, tired figure', draw(lt, d, t) {
      room(11);
      clock(540, 640, 2.0, lt * 30);
      const v = Math.round(40 * eo(seg(lt, d * 0.2, d * 0.7))); bigMark(`${v}`, 540, 1130, R2(seg(lt, d * 0.15, d * 0.35)), -0.03, P.gold, 280);
      K.ribbon('HOURS', 540, 1340, R2(seg(lt, d * 0.4, d * 0.65)), 96);
      K.slip('CRAZIEST PART', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.15, 'tock', { gain: 0.4 }); cue(st + len(8) * 0.4, 'slam', { gain: 0.6 }); }

  // 9 · June 2026: first creator to 500 million subscribers: timeline 2012 → 2017 → 2026, gem plaque, 500M
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.4;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.1, note: 'timeline 2012 → 2017 → 2026, marker runs to 2026, JUNE 2026 ribbon', draw(lt, d, t) {
      dayPage(12, false);
      K.ribbon('JUNE 2026', 540, 420, R2(seg(lt, 0.05, 0.35)), 110);
      K.timeline([2012, 2017, 2026], 160, 1000, 760, eo(seg(lt, 0.1, d * 0.9)), 2);
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.14, note: 'gem plaque glows, counter to 500M gold, FIRST CREATOR slip', draw(lt, d, t) {
      dayPage(13);
      gemPlaque(540, 780, 1.1 * R2(seg(lt, 0.05, 0.35)), seg(lt, 0.3, 0.8));
      const v = Math.round(500 * eo(seg(lt, 0.1, d * 0.6))); bigMark(`${v}M`, 540, 1300, R2(seg(lt, 0.1, 0.3)), -0.03, P.gold, 280);
      K.slip('FIRST CREATOR', 540, 1580, R2(seg(lt, d * 0.5, d * 0.75)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.15, 'slide', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'sparkle', { dur: 1.0, gain: 0.5 }); cue(mid + d9 * 0.6 * 0.6, 'slam', { gain: 0.6 }); }

  // 10 · pick 3 viral videos, write the first 3 seconds, try it in your next reel
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.6;
    add({ id: 'S10a', at: st, cam: [540, 960], zoom: 0.08, note: '3 VIRAL VIDEOS ribbon, three rank cards, FIRST 3 SEC slip on a note', draw(lt, d, t) {
      dayPage(14, false); K.ribbon('3 VIRAL VIDEOS', 540, 280, R2(seg(lt, 0.05, 0.35)), 88);
      ['Video one', 'Video two', 'Video three'].forEach((w, k) => { const a = 0.15 + k * 0.15; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 620 + k * 240 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 600); });
      K.slip('FIRST 3 SECONDS', 540, 1440, R2(seg(lt, d * 0.5, d * 0.75)), -0.03, 72);
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.1, note: 'NEXT REEL ribbon, a phone posts one card, TRY IT slip', draw(lt, d, t) {
      dayPage(15);
      phoneBig(540, 960, 0.95, -0.03, () => { postCard(0, -40, 1.0, 0, seg(lt, d * 0.5, d * 0.7)); });
      K.ribbon('NEXT REEL', 540, 280, R2(seg(lt, 0.05, 0.35)), 100);
      K.slip('TRY IT', 540, 1560, R2(seg(lt, d * 0.3, d * 0.6)), -0.03, 80);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.15 + k * 0.15, 'pop', { gain: 0.5 }); cue(st + d10 * 0.6 * 0.5, 'zip', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + (d10 * 0.4) * 0.3, 'pop', { gain: 0.5 }); }

  // 11 · don't stop, study (loops to beat 0: the same 0-views wall + STOP? sign, now struck, STUDY ribbon)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 set again: STOP? sign knocked over, figure with magnifier glow, STUDY ribbon', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      for (let k = 0; k < 4; k++) videoCard(300 + (k % 2) * 480, 560 + Math.floor(k / 2) * 330, 0.85, (rnd(k) - 0.5) * 0.2, k === 3 && lt > d * 0.5);
      kid({ x: 300, y: 1800, h: 520, glow: 1 });
      stopSign(760, 1300, 1 - eo(seg(lt, 0.1, 0.45)), lerp(0, 0.8, eio(seg(lt, 0.05, 0.45))));
      K.ribbon('STUDY', 710, 1240, R2(seg(lt, d * 0.45, d * 0.7)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'thud', { gain: 0.5 }); cue(st + len(11) * 0.45, 'slam', { gain: 0.6 }); }

  // 12 · follow + send to a creator who's about to quit
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a video card flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); videoCard(lerp(240, 540, f), lerp(1250, 1150, f), 0.6 * R2(seg(lt, d * 0.3, d * 0.5)), 0.05);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: M.tee, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
