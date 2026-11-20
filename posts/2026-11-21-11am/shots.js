// 21 Nov 11am: THE MEDIA KIT: ONE PAGE THAT GETS BRANDS TO REPLY. Paper style.
// Facts (opened 20 Nov 2026): CreatorsJet "Influencer Media Kit" (updated 20 Oct 2026): "There is no minimum follower
// count", "One or two pages is a useful starting point for a PDF", bio "in two or three sentences ... what you create
// and who your content is for", "Rates are optional, but scope is essential", business email, "Check your metrics ...
// before each new pitch". Metricool: followers, age/gender split and engagement rate are the vital metrics; share
// previous partnerships and results. Agility PR: audience demographics (location, age, gender), past projects.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet, note,
  laptop, magnifier, clock } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper PDF page: header band + n section blocks appear with p (0..1); hi = index of the crimson block */
function kit(x, y, s, rot = 0, p = 1, hi = -1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-230, -310, 460, 620, 16), P.parch);
  cut(P_rr(-200, -280, 400, 70, 10), P.ink, { shadow: 0, edge: 2 }); K.label('MEDIA KIT', 0, -244, 40, P.parch);
  const rows = [[-190, -190, 380, 80], [-190, -90, 180, 120], [10, -90, 180, 120], [-190, 50, 380, 90], [-190, 160, 380, 60], [-190, 238, 380, 44]];
  const cols = [P.gold, P.royal, P.green, P.wine, P.stone, P.crimson];
  rows.forEach((r, k) => { const a = clamp(p * rows.length - k); if (a <= 0) return; ctx.save(); ctx.globalAlpha = a;
    cut(P_rr(...r, 8), k === hi ? P.crimson : cols[k], { shadow: 0.3, edge: 2 }); ctx.restore(); });
  ctx.restore(); }
/** a paper envelope (email) */
function envelope(x, y, s, rot = 0, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -130, 400, 260, 14), col); line([[-190, -120], [0, 20], [190, -120]], P.edge, 10); K.label('@', 0, 70, 70, P.edge); ctx.restore(); }
/** a little bar chart */
function bars(x, y, s, p = 1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  [0.4, 0.7, 0.55, 1].forEach((h, k) => { const hh = 300 * h * eo(clamp(p * 1.4 - k * 0.15)); if (hh > 2) cut(P_rr(-180 + k * 95, -hh, 70, hh, 8), k === 3 ? P.gold : P.royal, { shadow: 0.4, edge: 3 }); });
  line([[-200, 4], [200, 4]], P.ink, 8); ctx.restore(); }
/** a skincare bottle */
function bottle(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-30, -200, 60, 60, 8), P.ink); cut(P_rr(-80, -150, 160, 300, 30), P.green); cut(P_rr(-55, -60, 110, 110, 10), P.parch, { shadow: 0.3, edge: 2 }); ctx.restore(); }
/** a tick in a green circle */
function tick(x, y, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 80), P.green); line([[-36, 0], [-8, 30], [40, -30]], P.edge, 18); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · you DMed a brand and no reply? maybe no media kit
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator in room with big phone: sent DM bubble, SEEN, no reply, crimson ? mark, NO MEDIA KIT ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      phoneBig(700, 880, 0.95 * R2(seg(lt, 0.02, 0.2)), 0.04, () => { cut(P_rr(-186, -370, 372, 600, 0), P.sky, { shadow: 0, edge: 0 });
        bubble('Hi! Collab?', 170, -200, R2(seg(lt, d * 0.1, d * 0.25)), true, 46);
        K.label('Seen', 120, -120, 36, P.ink); });
      K.slip('BRAND DM', 700, 300, R2(seg(lt, 0.05, 0.25)), -0.03, 60);
      bigMark('?', 230, 520, R2(seg(lt, d * 0.4, d * 0.55)), Math.sin(t * 3) * 0.06, P.crimson, 300);
      K.ribbon('NO MEDIA KIT?', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(0) * 0.15, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.45, 'thud', { gain: 0.6 }); cue(st + len(0) * 0.65, 'slam', { gain: 0.6 }); }

  // 1 · simply put: your creator resume, one PDF that tells a brand who you are
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, media kit page builds block by block, CREATOR RESUME ribbon, PDF slip', draw(lt, d, t) {
      dayPage(2, false);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      kit(540, 900, 1.15 * R2(seg(lt, 0.08, 0.3)), lerp(-0.2, -0.03, eo(seg(lt, 0.08, 0.5))), seg(lt, d * 0.2, d * 0.75));
      K.slip('1 PDF', 860, 520, R2(seg(lt, d * 0.35, d * 0.5)), 0.06, 64);
      K.ribbon('CREATOR RESUME', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.45, 0.6].forEach((a) => cue(st + len(1) * a, 'tock', { gain: 0.4 })); cue(st + len(1) * 0.55, 'slam', { gain: 0.5 }); }

  // 2 · no minimum follower count; one or two pages is enough
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'GOOD NEWS slip, MIN FOLLOWERS slip struck by crimson cross, big gold 0', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('GOOD NEWS', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      K.slip('MIN FOLLOWERS', 540, 560, R2(seg(lt, 0.1, 0.3)), 0.03, 70);
      bigMark('0', 540, 1000, R2(seg(lt, d * 0.4, d * 0.6)), -0.05, P.gold, 420);
      K.ribbon('NONE', 540, 1550, R2(seg(lt, d * 0.55, d * 0.8)), 130);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.14, note: 'two media kit pages side by side, gold 1-2 PAGES ribbon', draw(lt, d, t) {
      dayPage(4);
      kit(340, 900, 0.85 * R2(seg(lt, 0.02, 0.25)), -0.08, 1);
      kit(740, 940, 0.85 * R2(seg(lt, 0.2, 0.4)), 0.07, 1);
      K.ribbon('1-2 PAGES', 540, 1600, R2(seg(lt, d * 0.35, d * 0.65)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d2 * 0.5 * 0.5, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(2) * 0.5 * 0.3, 'pop', { gain: 0.5 }); }

  // 3 · you: a skincare brand opens your PDF, needs to get it fast
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'brand person at laptop with skincare bottle, laptop shows the media kit, clock ticks, FAST ribbon', draw(lt, d, t) {
      room(5);
      person({ x: 860, y: 1650, h: 620, arm: 50, dir: -1, top: P.green });
      K.slip('SKINCARE BRAND', 760, 300, R2(seg(lt, 0.02, 0.2)), 0.03, 58);
      bottle(860, 620, 0.9 * R2(seg(lt, 0.1, 0.3)), 0.1);
      laptop(400, 1380, 1.0 * R2(seg(lt, d * 0.15, d * 0.35)), () => { kit(0, -230, 0.45, 0, 1); });
      clock(220, 560, 0.9 * R2(seg(lt, d * 0.5, d * 0.65)), t * 5);
      K.ribbon('YOUR PDF', 540, 1720, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.2, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.55, 'tock', { gain: 0.5 }); }

  // 4 · top: 2-3 line bio: who you are, what you make, who it's for
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 820], zoom: 0.14, note: 'zoom on kit top: gold bio block highlighted, three slips WHO / WHAT / FOR WHOM pop', draw(lt, d, t) {
      dayPage(6, false);
      kit(540, 1050, 1.3, -0.02, 1, 0);
      K.slip('BIO: 2-3 LINES', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      K.slip('WHO', 220, 500, R2(seg(lt, d * 0.25, d * 0.4)), -0.06, 60);
      K.slip('WHAT', 540, 470, R2(seg(lt, d * 0.45, d * 0.6)), 0.04, 60);
      K.slip('FOR WHOM', 850, 500, R2(seg(lt, d * 0.65, d * 0.8)), 0.06, 56);
    } });
    cue(st, 'whoosh'); [0.3, 0.5, 0.7].forEach((a) => cue(st + len(4) * a, 'pop', { gain: 0.5 })); }

  // 5 · numbers: followers, engagement rate, audience age, gender, location
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'bar chart grows, FOLLOWERS + ENGAGEMENT slips, gold %', draw(lt, d, t) {
      dayPage(7);
      bars(540, 1200, 1.5 * R2(seg(lt, 0.02, 0.2)), seg(lt, 0.1, 0.7));
      K.slip('FOLLOWERS', 300, 360, R2(seg(lt, 0.1, 0.3)), -0.04, 62);
      K.slip('ENGAGEMENT', 760, 480, R2(seg(lt, d * 0.4, d * 0.6)), 0.04, 58);
      bigMark('%', 820, 760, R2(seg(lt, d * 0.5, d * 0.7)), 0.06, P.gold, 220);
      K.ribbon('NUMBERS', 540, 1600, R2(seg(lt, d * 0.2, d * 0.5)), 120);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: 'three audience figures, AGE / GENDER / LOCATION slips', draw(lt, d, t) {
      dayPage(8, false); ground(1650, M.wall2);
      [[200, P.royal], [380, P.wine], [560, P.green]].forEach(([x, c], k) => person({ x, y: 1650, h: 420 * R2(seg(lt, k * 0.08, 0.2 + k * 0.08)), arm: 30, top: c }));
      K.slip('AGE', 200, 420, R2(seg(lt, d * 0.15, d * 0.3)), -0.05, 64);
      K.slip('GENDER', 520, 380, R2(seg(lt, d * 0.35, d * 0.5)), 0.03, 64);
      K.slip('LOCATION', 840, 460, R2(seg(lt, d * 0.55, d * 0.7)), 0.05, 58);
      magnifier(840, 900, 0.9 * R2(seg(lt, d * 0.55, d * 0.75)));
      K.ribbon('YOUR AUDIENCE', 540, 1760, R2(seg(lt, d * 0.3, d * 0.6)), 90);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.5, 'slam', { gain: 0.5 }); cue(mid, 'whoosh'); [0.2, 0.4, 0.6].forEach((a) => cue(mid + len(5) * 0.55 * a, 'pop', { gain: 0.45 })); }

  // 6 · game changer: past brand collabs + results; brands want proof
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, three past post cards fan out with hearts, green ticks, PROOF ribbon', draw(lt, d, t) {
      dayPage(9);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      [[280, -0.12], [540, 0], [800, 0.12]].forEach(([x, r], k) => postCard(x, 880 + Math.abs(x - 540) * 0.2, 0.75 * R2(seg(lt, 0.1 + k * 0.1, 0.3 + k * 0.1)), r, seg(lt, d * 0.5, d * 0.7)));
      K.slip('PAST COLLABS', 540, 1300, R2(seg(lt, d * 0.3, d * 0.45)), 0.02, 64);
      tick(860, 560, R2(seg(lt, d * 0.6, d * 0.75)));
      K.ribbon('PROOF', 540, 1600, R2(seg(lt, d * 0.6, d * 0.85)), 140);
    } });
    cue(st, 'whoosh'); [0.15, 0.25, 0.35].forEach((a) => cue(st + len(6) * a, 'pop', { gain: 0.45 })); cue(st + len(6) * 0.65, 'sparkle', { dur: 0.5, gain: 0.5 }); cue(st + len(6) * 0.7, 'slam', { gain: 0.6 }); }

  // 7 · craziest: rates optional, but scope (what you'll make) must be clear
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, rupee price tag fades to dashed outline, OPTIONAL slip', draw(lt, d, t) {
      dayPage(10, false);
      K.slip('CRAZIEST PART', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      ctx.save(); ctx.globalAlpha = 1 - 0.6 * eo(seg(lt, d * 0.5, d * 0.8)); bigMark('₹', 540, 900, R2(seg(lt, 0.1, 0.3)), -0.05, P.gold, 380); ctx.restore();
      K.slip('RATES', 540, 1250, R2(seg(lt, d * 0.2, d * 0.4)), 0.03, 72);
      K.ribbon('OPTIONAL', 540, 1600, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'list on a paper sheet: 1 REEL, 3 STORIES, 1 POST slips stack, crimson SCOPE ribbon', draw(lt, d, t) {
      dayPage(11);
      { const k = R2(seg(lt, 0.02, 0.2)); if (k > 0) { ctx.save(); ctx.translate(540, 880); ctx.rotate(-0.04); ctx.scale(k, k); cut(P_rr(-300, -320, 600, 640, 16), P.parch); ctx.restore(); } }
      K.slip('1 REEL', 540, 700, R2(seg(lt, 0.15, 0.3)), -0.03, 70);
      K.slip('3 STORIES', 540, 880, R2(seg(lt, 0.3, 0.45)), 0.03, 70);
      K.slip('1 POST', 540, 1060, R2(seg(lt, 0.45, 0.6)), -0.02, 70);
      K.ribbon('SCOPE = MUST', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d7 * 0.45 * 0.6, 'thud', { gain: 0.5 }); cue(mid, 'whoosh'); [0.15, 0.3, 0.45].forEach((a) => cue(mid + len(7) * 0.55 * a, 'pop', { gain: 0.45 })); cue(mid + len(7) * 0.55 * 0.65, 'slam', { gain: 0.6 }); }

  // 8 · at the end: business email the brand can spot instantly
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 1000], zoom: 0.14, note: 'kit with crimson bottom block, gold envelope flies out of it, BUSINESS EMAIL ribbon', draw(lt, d, t) {
      dayPage(12, false);
      kit(340, 1000, 1.0, -0.05, 1, 5);
      const f = eob(seg(lt, d * 0.25, d * 0.55)); envelope(lerp(380, 760, f), lerp(1240, 700, f), 0.9 * R2(seg(lt, d * 0.2, d * 0.35)), 0.1 * f);
      K.slip('AT THE END', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      K.ribbon('BUSINESS EMAIL', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(8) * 0.55, 'pop', { gain: 0.5 }); }

  // 9 · so: make one page today, update numbers before every pitch
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.45;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, creator at laptop, a kit page slides out, TODAY ribbon', draw(lt, d, t) {
      room(13);
      person({ x: 200, y: 1650, h: 600, arm: 50, top: M.tee });
      laptop(600, 1380, 0.9, () => { cut(P_rr(-260, -360, 520, 300, 10), P.sky, { shadow: 0, edge: 0 }); });
      kit(620, 760, 0.8 * R2(seg(lt, 0.15, 0.4)), 0.05, seg(lt, 0.2, 0.8));
      K.slip('STEP 1', 220, 300, R2(seg(lt, 0.02, 0.2)), -0.04, 70);
      K.ribbon('1 PAGE TODAY', 540, 1720, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.14, note: 'STEP 2 slip, bar chart bar grows taller, refresh arrows, BEFORE EVERY PITCH ribbon', draw(lt, d, t) {
      dayPage(14);
      K.slip('STEP 2', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      bars(540, 1150, 1.4, 0.6 + 0.4 * eo(seg(lt, 0.2, 0.6)));
      K.slip('UPDATE', 820, 520, R2(seg(lt, 0.25, 0.4)), 0.06, 64);
      K.ribbon('EVERY PITCH', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d9 * 0.45 * 0.3, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(9) * 0.55 * 0.35, 'pop', { gain: 0.5 }); cue(mid + len(9) * 0.55 * 0.6, 'slam', { gain: 0.6 }); }

  // 10 · loop: then your next DM won't be left on seen (beat-0 room)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: same phone, DM now has kit attached and a brand reply bubble pops, creator glows', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 70, top: M.tee, glow: eo(seg(lt, d * 0.4, d * 0.8)) });
      phoneBig(700, 880, 0.95, 0.04, () => { cut(P_rr(-186, -370, 372, 600, 0), P.sky, { shadow: 0, edge: 0 });
        bubble('Hi! Collab?', 170, -240, 1, true, 46); kit(60, -80, 0.22, 0.04, 1);
        bubble("Let's talk!", -170, 120, R2(seg(lt, d * 0.35, d * 0.55)), false, 46); });
      K.slip('NEXT DM', 700, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 60);
      K.ribbon('NOT ON SEEN', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.4, 'pop', { gain: 0.6 }); cue(st + len(10) * 0.6, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 11 · follow + send to the friend who's pitching brands
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a kit page flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); kit(lerp(220, 580, f), lerp(1250, 1200, f), 0.3 * R2(seg(lt, d * 0.3, d * 0.5)), 0.2 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
