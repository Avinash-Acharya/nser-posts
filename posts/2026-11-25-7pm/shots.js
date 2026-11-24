// 25 Nov 7pm: BATCH-CREATE A WEEK OF REELS IN ONE DAY. Paper style.
// Facts (opened 24 Nov 2026): TechCrunch, "Instagram rolls out an in-app scheduling tool to all professional
// accounts" (8 Nov 2022): businesses and creators (professional accounts) can schedule posts, reels and carousels
// "up to 75 days in advance"; steps: Advanced settings → "Schedule this post" toggle → pick date and time;
// scheduled posts sit in "Scheduled Content". The batching method (idea list, outfit changes, one edit session,
// rest of week for comments/ideas) is nser's advice, not a sourced fact. No real person, no logo.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, ringLight, bigMark, hand, clock, strike, rankCard } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a day card (calendar page) with a day name and a value */
function dayCard(x, y, s, day = 'MON', val = '?', rot = 0, col = P.crimson, vcol = P.crimson) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-110, -130, 220, 260, 16), '#FFFBF0'); cut(P_rr(-110, -130, 220, 70, 16), col, { shadow: 0, edge: 0 }); cut(P_rr(-110, -80, 220, 20, 0), col, { shadow: 0, edge: 0 });
  K.label(day, 0, -95, 36, P.edge); K.label(val, 0, 40, 100, vcol); ctx.restore(); }
/** a paper camera on a tripod */
function camera(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  line([[0, 60], [-90, 420]], P.ink, 12); line([[0, 60], [90, 420]], P.ink, 12); line([[0, 60], [0, 420]], P.ink, 12);
  cut(P_rr(-130, -80, 260, 160, 22), '#2B2B2B'); cut(P_rr(-60, -110, 80, 40, 10), '#2B2B2B', { shadow: 0.3, edge: 3 });
  cut(P_circ(20, 0, 58), P.stoneDark, { shadow: 0.3, edge: 4 }); cut(P_circ(20, 0, 34), P.screen ?? '#1F2A36', { shadow: 0, edge: 0 }); circle(-95, -50, 10, P.crimson); ctx.restore(); }
/** a paper shirt on a hanger */
function shirt(x, y, s, col, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = P.ink; ctx.lineWidth = 8; ctx.beginPath(); ctx.arc(0, -150, 22, Math.PI, 0); ctx.stroke(); line([[-130, -90], [0, -130], [130, -90]], P.ink, 8);
  cut(P_poly([[-70, -120], [-160, -60], [-120, 10], [-90, -20], [-90, 150], [90, 150], [90, -20], [120, 10], [160, -60], [70, -120], [0, -90]]), col); ctx.restore(); }
/** a notepad with lines; n lines ticked (0..5) */
function notepad(x, y, s, n = 0, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-240, -330, 480, 660, 16), '#FFFBF0'); cut(P_rr(-240, -330, 480, 70, 16), P.gold, { shadow: 0, edge: 0 });
  for (let k = 0; k < 5; k++) { const yy = -190 + k * 110; line([[-130, yy], [k % 2 ? 150 : 190, yy]], 'rgba(62,44,30,0.3)', 12); K.label(String(k + 1), -190, yy + 2, 44, P.sepia);
    if (k < n) { const p = clamp(n - k); ctx.save(); ctx.globalAlpha = p; K.label('HOOK', 120, yy - 42, 26, P.crimson); ctx.restore(); } }
  ctx.restore(); }
/** a toggle switch; on 0..1 */
function toggle(x, y, s, on = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-80, -42, 160, 84, 42), on > 0.5 ? P.green : P.stoneDark, { shadow: 0.3, edge: 3 }); cut(P_circ(lerp(-38, 38, eo(clamp(on))), 0, 32), P.edge, { shadow: 0.4, edge: 2 }); ctx.restore(); }
/** a light bulb idea */
function bulb(x, y, s, glow = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow > 0) { ctx.save(); ctx.globalAlpha = 0.35 * glow; circle(0, -20, 150, P.gold); ctx.restore(); }
  cut(P_circ(0, -30, 90), glow > 0.5 ? '#F2C14E' : '#FFFBF0'); cut(P_rr(-45, 50, 90, 70, 12), P.stoneDark, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a paper sun */
function sun(x, y, s, t = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(t * 0.3);
  for (let k = 0; k < 10; k++) { ctx.save(); ctx.rotate(k * TAU / 10); cut(P_poly([[-18, -110], [18, -110], [0, -160]]), P.gold, { shadow: 0.2, edge: 2 }); ctx.restore(); }
  cut(P_circ(0, 0, 90), '#EFC66A'); ctx.restore(); }
/** a little reel tile row: n of 5 shown */
function reelRow(y, p, s = 0.42) { [0, 1, 2, 3, 4].forEach((k) => postCard(140 + k * 200, y, s * R2(clamp(p * 5 - k)), (k - 2) * 0.04)); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · every morning: which reel do I make today?
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'morning room, sun in window, creator with a giant crimson ? over the head, TODAY? slip', draw(lt, d, t) {
      room(1);
      sun(840, 380, 0.8 * R2(seg(lt, 0.02, 0.2)), t);
      person({ x: 360, y: 1650, h: 660, arm: 30, top: M.hoodie, phone: false });
      bigMark('?', 360, 660, R2(seg(lt, d * 0.25, d * 0.5)), 0.1 * Math.sin(t * 3), P.crimson, 320);
      K.slip("TODAY'S REEL?", 720, 1000, R2(seg(lt, d * 0.45, d * 0.65)), 0.04, 64);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'five day cards MON..FRI each pop with a crimson ?, EVERY MORNING ribbon', draw(lt, d, t) {
      dayPage(2);
      ['MON', 'TUE', 'WED', 'THU', 'FRI'].forEach((dn, k) => dayCard(k % 2 ? 320 + (k - 1) * 220 : 210 + k * 165, k % 2 ? 1060 : 720, 0.95 * R2(seg(lt, 0.02 + d * k * 0.1, 0.2 + d * k * 0.1)), dn, '?', (k - 2) * 0.05));
      K.ribbon('EVERY MORNING', 540, 1560, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.5 * 0.3, 'boing', { gain: 0.5 }); cue(mid, 'whoosh'); [0, 0.1, 0.2, 0.3, 0.4].forEach((a) => cue(mid + 0.05 + d0 * 0.5 * a, 'pop', { gain: 0.4 })); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.6 }); }

  // 1 · simply put: a whole week of reels in a single day
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.14, note: 'SIMPLY PUT slip, five reel cards fly into one SUNDAY day card, 1 DAY = 1 WEEK ribbon', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      dayCard(540, 980, 1.5 * R2(seg(lt, 0.1, 0.3)), 'SUN', '1 DAY', 0.02, P.royal, P.gold);
      [0, 1, 2, 3, 4].forEach((k) => { const f = eo(seg(lt, d * (0.25 + k * 0.07), d * (0.45 + k * 0.07))); if (f < 1) postCard(lerp(140 + k * 200, 540, f), lerp(520, 980, f), 0.4 * (1 - f * 0.7) * R2(seg(lt, d * 0.15, d * 0.3)), (k - 2) * 0.1); });
      K.ribbon('= 1 WEEK', 540, 1580, R2(seg(lt, d * 0.65, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.37, 0.44, 0.51, 0.58].forEach((a) => cue(st + len(1) * a, 'zip', { gain: 0.3 })); cue(st + len(1) * 0.7, 'slam', { gain: 0.8 }); }

  // 2 · setting up camera, light, outfit eats your time
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'camera, ring light, shirt pop in a row with slips; a clock spins fast: TIME GONE ribbon', draw(lt, d, t) {
      nightPage(4);
      camera(200, 640, 0.8 * R2(seg(lt, 0.02, 0.2)), -0.04); K.slip('CAMERA', 200, 1170, R2(seg(lt, 0.1, 0.3)), -0.04, 54);
      ringLight(540, 860, 0.7 * R2(seg(lt, d * 0.15, d * 0.3))); K.slip('LIGHT', 540, 1170, R2(seg(lt, d * 0.2, d * 0.35)), 0.03, 54);
      shirt(860, 720, 0.9 * R2(seg(lt, d * 0.3, d * 0.45)), M.tee, 0.06); K.slip('OUTFIT', 860, 1170, R2(seg(lt, d * 0.35, d * 0.5)), 0.04, 54);
      clock(540, 1400, 0.8 * R2(seg(lt, d * 0.45, d * 0.6)), t * 8);
      K.ribbon('TIME GONE', 540, 1640, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); [0.05, 0.2, 0.33].forEach((a) => cue(st + len(2) * a, 'pop', { gain: 0.5 })); cue(st + len(2) * 0.5, 'tock', { gain: 0.6 }); cue(st + len(2) * 0.65, 'slam', { gain: 0.7 }); }

  // 3 · you: Sunday, light set up once, five reels back to back
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.45;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'SUNDAY day card, ring light switches on ONCE (gold glow), creator in front of camera', draw(lt, d, t) {
      room(5);
      dayCard(830, 330, 0.9 * R2(seg(lt, 0.02, 0.2)), 'SUN', 'GO', 0.05, P.royal, P.green);
      const on = seg(lt, d * 0.35, d * 0.5); if (on > 0) { ctx.save(); ctx.globalAlpha = 0.35 * on; circle(260, 524, 230, P.gold); ctx.restore(); }
      ringLight(260, 1000, 0.85);
      camera(820, 1000, 0.75, 0);
      person({ x: 480, y: 1650, h: 600, arm: 20, top: M.tee, phone: false });
      K.slip('SET UP ONCE', 540, 210, R2(seg(lt, d * 0.5, d * 0.7)), -0.03, 64);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.16, note: 'five reel cards snap in a row one by one, gold 5 REELS mark, BACK TO BACK ribbon', draw(lt, d, t) {
      dayPage(6, false);
      reelRow(720, seg(lt, 0.02, d * 0.6));
      bigMark('5 REELS', 540, 1150, R2(seg(lt, d * 0.55, d * 0.75)), -0.05, P.gold, 180);
      K.ribbon('BACK TO BACK', 540, 1580, R2(seg(lt, d * 0.65, d * 0.95)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d3 * 0.45 * 0.4, 'sparkle', { gain: 0.6 }); cue(mid, 'whoosh'); [0.05, 0.17, 0.29, 0.41, 0.53].forEach((a) => cue(mid + d3 * 0.55 * a, 'pop', { gain: 0.4 })); cue(mid + d3 * 0.55 * 0.6, 'slam', { gain: 0.8 }); }

  // 4 · step 1: all ideas in one list, each with its hook
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.14, note: '1 IDEA LIST card, notepad lines fill 1..5 each getting a crimson HOOK tag, paper hand with pen', draw(lt, d, t) {
      dayPage(7);
      rankCard(1, 'IDEA LIST', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 640);
      notepad(540, 1000, 1.1 * R2(seg(lt, 0.1, 0.3)), 5 * seg(lt, d * 0.3, d * 0.9), 0.02);
      hand(lerp(760, 820, 0.5 + 0.5 * Math.sin(t * 8)), lerp(800, 1300, seg(lt, d * 0.3, d * 0.9)), 0.8 * R2(seg(lt, d * 0.2, d * 0.3)), -0.5, true);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.35, 0.47, 0.59, 0.71, 0.83].forEach((a) => cue(st + len(4) * a, 'pop', { gain: 0.35 })); }

  // 5 · step 2: change outfits so each looks like a different day
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.14, note: '2 CHANGE OUTFIT card, creator whose top swaps colour, day slip below swaps MON→TUE→WED…', draw(lt, d, t) {
      room(8);
      rankCard(2, 'CHANGE OUTFIT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 760);
      const k = Math.min(4, Math.floor(clamp(seg(lt, d * 0.2, d * 0.95)) * 5)), tops = [M.tee, M.hoodie2, P.royal, M.hoodie, P.wine], days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];
      person({ x: 360, y: 1650, h: 680, arm: 50, top: tops[k], phone: false });
      [0, 1, 2].forEach((j) => shirt(840, 620 + j * 280, 0.55 * R2(seg(lt, 0.1 + j * 0.1, 0.3 + j * 0.1)), tops[(k + j + 1) % 5], 0.05));
      dayCard(820, 1450, 0.8 * R2(seg(lt, d * 0.2, d * 0.35)), days[k], 'GO', 0.04, P.royal, P.green);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.2, 0.35, 0.5, 0.65, 0.8].forEach((a) => cue(st + len(5) * a, 'zip', { gain: 0.35 })); }

  // 6 · step 3: edit all together in one style
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.14, note: '3 EDIT TOGETHER card, laptop with five same-colour clip strips on a timeline, ONE STYLE ribbon', draw(lt, d, t) {
      nightPage(9);
      rankCard(3, 'EDIT TOGETHER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 760);
      laptop(540, 1150, 1.2 * R2(seg(lt, 0.1, 0.3)), () => { for (let k = 0; k < 5; k++) { const s = R2(seg(lt, d * (0.25 + k * 0.08), d * (0.35 + k * 0.08))); if (s > 0) cut(P_rr(-280 + k * 114, -260, 104 * s, 130, 8), P.gold, { shadow: 0.2, edge: 2 }); }
        line([[-290, -60], [290, -60]], P.sepia, 6); const px = lerp(-280, 290, (t * 0.4) % 1); line([[px, -300], [px, -80]], P.crimson, 6); });
      K.ribbon('ONE STYLE', 540, 1580, R2(seg(lt, d * 0.65, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.25, 0.33, 0.41, 0.49, 0.57].forEach((a) => cue(st + len(6) * a, 'pop', { gain: 0.35 })); cue(st + len(6) * 0.7, 'slam', { gain: 0.6 }); }

  // 7 · game changer: with a professional account, schedule reels inside Instagram
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, PRO ACCOUNT badge stamps onto a phone', draw(lt, d, t) {
      nightPage(10);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      phoneBig(540, 1000, 1.0 * R2(seg(lt, 0.1, 0.3)), -0.02, () => { postCard(0, -60, 0.9, 0); });
      const s = seg(lt, d * 0.4, d * 0.6), sc = s <= 0 ? 0 : lerp(2.4, 1, eo(s)); if (sc) bigMark('PRO', 760, 640, sc, 0.15, P.crimson, 150);
      K.ribbon('PRO ACCOUNT', 540, 1640, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'phone screen: SCHEDULE row with a toggle flipping on, clock beside: SCHEDULE IT', draw(lt, d, t) {
      dayPage(11);
      phoneBig(420, 960, 1.0, 0.02, () => { cut(P_rr(-170, -80, 340, 120, 20), '#FFFBF0', { shadow: 0.3, edge: 2 }); K.label('SCHEDULE', -40, -18, 40, P.ink); toggle(110, -20, 0.6, seg(lt, d * 0.3, d * 0.45)); });
      clock(850, 760, 0.8 * R2(seg(lt, 0.05, 0.25)), t * 2);
      K.ribbon('INSIDE INSTAGRAM', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 88);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.5 * 0.5, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d7 * 0.5 * 0.35, 'tock', { gain: 0.7 }); cue(mid + d7 * 0.5 * 0.6, 'slam', { gain: 0.5 }); }

  // 8 · craziest: up to 75 days ahead
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.16, note: 'CRAZIEST PART slip, day cards flip fast in a stack, gold 75 DAYS stamps, AHEAD ribbon', draw(lt, d, t) {
      nightPage(12);
      K.slip('CRAZIEST PART', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const n = Math.floor(75 * eo(seg(lt, 0.1, d * 0.6)));
      for (let k = 0; k < 3; k++) dayCard(540 + (k - 1) * 30, 860 - k * 20, 1.4 * R2(seg(lt, 0.05, 0.25)), 'DAY', String(Math.max(0, n - 2 + k)), (k - 1) * 0.06, P.royal, P.gold);
      bigMark('75 DAYS', 540, 1340, R2(seg(lt, d * 0.55, d * 0.75)), -0.04, P.gold, 190);
      K.ribbon('AHEAD', 540, 1660, R2(seg(lt, d * 0.65, d * 0.95)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.2, 'slide', { gain: 0.6, dur: 0.6 }); cue(st + len(8) * 0.6, 'slam', { gain: 0.9 }); }

  // 9 · how: Advanced settings → schedule on → pick the date
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: 'phone flow: ADVANCED row tapped, SCHEDULE toggle on, date card; three slips 1-2-3 with a dashed route', draw(lt, d, t) {
      dayPage(13);
      phoneBig(540, 820, 1.0 * R2(seg(lt, 0.02, 0.2)), 0, () => {
        const a = seg(lt, d * 0.1, d * 0.25); cut(P_rr(-170, -300, 340, 100, 18), a > 0 ? '#F2E2B5' : '#FFFBF0', { shadow: 0.3, edge: 2 }); K.label('ADVANCED', 0, -248, 38, P.ink);
        cut(P_rr(-170, -150, 340, 100, 18), '#FFFBF0', { shadow: 0.3, edge: 2 }); K.label('SCHEDULE', -50, -98, 34, P.ink); toggle(110, -100, 0.5, seg(lt, d * 0.4, d * 0.5));
        const s = R2(seg(lt, d * 0.65, d * 0.8)); if (s > 0) { ctx.save(); ctx.translate(0, 140); ctx.scale(s, s); dayCard(0, 0, 0.9, 'DATE', '25', 0, P.crimson, P.gold); ctx.restore(); } });
      K.slip('1 SETTINGS', 220, 1380, R2(seg(lt, d * 0.15, d * 0.3)), -0.04, 50);
      K.slip('2 ON', 540, 1460, R2(seg(lt, d * 0.4, d * 0.55)), 0.03, 50);
      K.slip('3 DATE', 860, 1380, R2(seg(lt, d * 0.65, d * 0.8)), 0.04, 50);
      hand(lerp(940, 740, eo(seg(lt, d * 0.05, d * 0.2))), lerp(1000, 620, eo(seg(lt, d * 0.05, d * 0.2))) + (lt > d * 0.35 ? lerp(0, 240, eo(seg(lt, d * 0.35, d * 0.45))) : 0), 0.8, -0.5, true);
    } });
    cue(st, 'whoosh'); cue(st + len(9) * 0.18, 'tock', { gain: 0.6 }); cue(st + len(9) * 0.45, 'tock', { gain: 0.6 }); cue(st + len(9) * 0.72, 'pop', { gain: 0.6 }); }

  // 10 · rest of the week: reply to comments, new ideas
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'REST OF WEEK slip, creator relaxed with phone, comment bubbles + reply hearts, a bulb lights up: REPLY + IDEAS', draw(lt, d, t) {
      room(14);
      K.slip('REST OF THE WEEK?', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 60);
      person({ x: 280, y: 1650, h: 620, arm: 70, top: M.hoodie2, glow: 0.7 });
      bubble('Love this!', 440, 520, R2(seg(lt, d * 0.2, d * 0.35)), false, 52);
      bubble('Thank you!', 1000, 680, R2(seg(lt, d * 0.3, d * 0.45)), true, 52);
      K.slip('REPLY', 760, 840, R2(seg(lt, d * 0.35, d * 0.5)), 0.04, 60);
      bulb(780, 1150, 1.0 * R2(seg(lt, d * 0.55, d * 0.7)), seg(lt, d * 0.65, d * 0.8));
      K.slip('NEW IDEAS', 780, 1420, R2(seg(lt, d * 0.65, d * 0.8)), -0.04, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.28, 'pop', { gain: 0.4 }); cue(st + len(10) * 0.38, 'pop', { gain: 0.4 }); cue(st + len(10) * 0.65, 'sparkle', { gain: 0.6 }); }

  // 11 · loop: now mornings bring no question, just the reel (beat-0 morning room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 morning room: the ? gets struck out, phone glows with the reel going live: JUST THE REEL', draw(lt, d, t) {
      room(1);
      sun(840, 380, 0.8, t);
      person({ x: 360, y: 1650, h: 660, arm: 70, top: M.hoodie, glow: eo(seg(lt, d * 0.4, d * 0.7)) });
      bigMark('?', 360, 660, R2(seg(lt, 0.02, 0.15)) * (1 - seg(lt, d * 0.35, d * 0.5)), 0, P.crimson, 320); if (lt < d * 0.4) strike(250, 680, 240, seg(lt, d * 0.15, d * 0.35));
      postCard(790, 980, 0.8 * R2(seg(lt, d * 0.45, d * 0.6)), 0.05, seg(lt, d * 0.6, d * 0.8));
      K.ribbon('JUST THE REEL', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.2, 'zip', { gain: 0.6 }); cue(st + len(11) * 0.5, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.7, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend who wonders this every morning
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a ? and a MON card, handle slip', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      dayCard(300, 1220, 0.8 * R2(seg(lt, d * 0.3, d * 0.45)), 'MON', '?', -0.06);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
