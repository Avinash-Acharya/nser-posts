// 12 Nov 7pm: HOOKS THAT STOP THE SCROLL (the 3-second rule). Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, gift, note, coins, phoneBig, bubble, laptop, postCard, skyline, ringLight, magnifier, bigMark,
  hand, fishHook, retention, clock, rankCard, strike } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a phone feed: a post card that slides up and away with sx (0..1) */
function feed(sx, t, heart = 0) { phoneBig(540, 960, 1.25, -0.02, () => { ctx.save(); ctx.translate(0, -sx * 760); postCard(0, -20, 1.0, 0, heart); postCard(0, 740, 1.0, 0); ctx.restore(); }); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · your reel gets skipped in 3 seconds: a feed on a phone, a thumb flicks it away, 3 SEC ribbon + SKIP slip
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'phone feed, thumb swipes the reel away, 3 SEC + SKIPPED', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      const sw = eio(seg(lt, d * 0.45, d * 0.65)); feed(sw, t);
      const hy = lerp(1500, 1000, eio(seg(lt, d * 0.3, d * 0.5))) - sw * 380; hand(700, hy, 1.1, -0.2, true);
      K.ribbon('3 SEC', 540, 230, R2(seg(lt, 0.1, 0.45)), 100);
      K.slip('SKIPPED', 540, 1730, R2(seg(lt, d * 0.62, d * 0.8)), -0.04, 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.45, 'zip', { gain: 0.6 }); cue(st + len(0) * 0.62, 'thud', { gain: 0.5 }); }

  // 1 · simply put, the hook = your first line: a fishing hook drops and catches a paper strip "LINE 1"
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 900], zoom: 0.1, note: 'fishing hook drops onto a LINE 1 strip and lifts it', draw(lt, d, t) {
      dayPage(2); ground(1550, M.wall2);
      const drop = eob(seg(lt, 0, 0.5)), lift = eio(seg(lt, d * 0.55, d * 0.9)), hy = lerp(200, 1080, drop) - lift * 300;
      fishHook(560, hy, 1.4, -100);
      K.slip('LINE 1', 480, lift > 0 ? hy + 120 : 1180, 1, Math.sin(t * 3) * 0.04 * lift - 0.03, 96);
      K.slip('the hook', 540, 1420, R2(seg(lt, d * 0.5, d * 0.75)), 0.03, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.45, 'plop', { gain: 0.5 }); cue(st + len(1) * 0.55, 'slide', { gain: 0.4 }); }

  // 2 · hours of editing, gone in 1 second: creator at a laptop, clock spinning, then a big ? and "1 SEC"
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 1000], zoom: 0.1, note: 'creator editing at night, clock spins, 1 SEC ?', draw(lt, d, t) {
      room(3); ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = M.night; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore();
      clock(820, 420, 1.1, lt * 4); laptop(540, 1400, 0.85, () => { ctx.fillStyle = M.screen; ctx.fillRect(-310, -420, 620, 380); for (let i = 0; i < 4; i++) { rr(-270 + i * 140, -200, 120, 90, 6); ctx.fillStyle = [P.sea, P.land, P.crimson, P.gold][i]; ctx.fill(); } line([[-280, -80], [280, -80]], '#F3E9D2', 6); circle(-280 + ((lt * 200) % 560), -80, 14, P.crimson); });
      person({ x: 230, y: 1500, h: 560, arm: 30, phone: false, top: M.hoodie2 });
      bigMark('?', 300, 600, R2(seg(lt, d * 0.5, d * 0.75)), Math.sin(t * 2) * 0.1, P.crimson, 420);
      K.slip('1 SEC', 640, 760, R2(seg(lt, d * 0.6, d * 0.85)), 0.04, 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'tock', { gain: 0.3 }); cue(st + len(2) * 0.5, 'boing', { gain: 0.4 }); }

  // 3 · Jan 2025: Instagram's head named the top 3 signals: watch time, likes, sends
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.08, note: 'JAN 2025 ribbon, three rank cards pop: WATCH TIME, LIKES, SENDS', draw(lt, d, t) {
      dayPage(4, false); K.ribbon('JAN 2025', 540, 300, R2(seg(lt, 0.1, 0.45)), 90);
      K.slip('TOP 3 SIGNALS', 540, 520, R2(seg(lt, 0.4, 0.7)), -0.03, 64);
      ['WATCH TIME', 'LIKES', 'SENDS'].forEach((w, k) => { const a = d * (0.42 + k * 0.16); rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 800 + k * 230 + Math.sin(t * 2 + k) * 6, R2(seg(lt, a, a + 0.35)), k % 2 ? 0.02 : -0.02, 640); });
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); for (let k = 0; k < 3; k++) cue(st + len(3) * (0.42 + k * 0.16), 'pop', { gain: 0.6 }); }

  // 4 · you open with "hi guys" and the thumb has already swiped: creator waving into a phone frame, viewer's thumb flicks
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 980], zoom: 0.1, note: 'creator waves, Hi guys! bubble', draw(lt, d, t) {
      room(5); ringLight(230, 1150, 0.9); person({ x: 600, y: 1420, h: 760, arm: 130 + Math.sin(t * 10) * 25, phone: false, top: P.crimson });
      bubble('Hi guys!', 520, 520, R2(seg(lt, 0.15, 0.45)), false, 90);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.12, note: 'the same reel on a phone gets swiped up by a thumb', draw(lt, d, t) {
      dayPage(6); ground(1650, M.wall2); const sw = eio(seg(lt, 0.25, 0.6)); feed(sw, t);
      hand(700, lerp(1400, 1050, eio(seg(lt, 0, 0.25))) - sw * 380, 1.1, -0.2, true);
      bigMark('↑', 860, 700, R2(seg(lt, 0.3, 0.55)) * 0.8, 0, P.crimson, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.25, 'zip', { gain: 0.6 }); }

  // 5 · since Aug 2025 every reel has a retention chart: laptop, the line draws itself
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 900], zoom: 0.1, note: 'AUG 2025 ribbon, retention chart draws on', draw(lt, d, t) {
      dayPage(7, false); K.ribbon('AUG 2025', 540, 280, R2(seg(lt, 0.1, 0.45)), 90);
      K.slip('RETENTION', 540, 500, R2(seg(lt, d * 0.4, d * 0.65)), 0.03, 70);
      retention(110, 640, 860, 640, seg(lt, d * 0.3, d * 0.95), 0.45);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(5) * 0.3, 'slide', { dur: 1.6, gain: 0.4 }); }

  // 6 · skip rate = how many left in the first 3 seconds: camera pushes into the drop, it lights up crimson
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [300, 950], zoom: 0.22, note: 'zoom on the first 3 s of the chart, SKIP RATE slip', draw(lt, d, t) {
      dayPage(8, false); retention(110, 640, 860, 640, 1, 0.45, eo(seg(lt, 0.2, 0.6)));
      K.slip('SKIP RATE', 330, 520, R2(seg(lt, 0.3, 0.6)), -0.04, 76);
      bigMark('↓', 230, 860, R2(seg(lt, 0.6, 0.9)) * 0.6, 0, P.crimson, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(st + 0.6, 'thud', { gain: 0.4 }); }

  // 7 · skip the hi guys, start with their problem: "Hi guys!" gets struck out, "Reels getting skipped?" lands
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.08, note: 'Hi guys struck out, the viewer-problem bubble lands', draw(lt, d, t) {
      dayPage(9); ground(1600, M.wall2);
      bubble('Hi guys!', 260, 560, 1, false, 90); strike(250, 575, 420, eo(seg(lt, 0.2, 0.5)));
      bubble('Reels getting skipped?', 120, 960, R2(seg(lt, d * 0.45, d * 0.7)), false, 74);
      K.slip('THEIR PROBLEM', 540, 1260, R2(seg(lt, d * 0.65, d * 0.85)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'zip', { gain: 0.5 }); cue(st + len(7) * 0.45, 'pop', { gain: 0.6 }); }

  // 8 · the 4-line hook: four numbered cards on a crimson route
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.06, note: '4 numbered cards: WHAT MOST DO / PROOF / PROMISE / QUESTION', draw(lt, d, t) {
      dayPage(10, false); K.ribbon('4 LINES', 540, 280, R2(seg(lt, 0.05, 0.35)), 90);
      K.dashedRoute([[150, 560], [150, 1500]], seg(lt, 0.2, d - 0.3));
      ['WHAT MOST DO', 'ONE PROOF', 'ONE PROMISE', 'A QUESTION'].forEach((w, k) => { const a = 0.4 + k * (d - 0.9) / 4; rankCard(k + 1, w, 560, 600 + k * 270 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.35)), k % 2 ? 0.015 : -0.015, 720); });
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 4; k++) cue(st + 0.4 + k * (len(8) - 0.9) / 4, 'pop', { gain: 0.6 }); }

  // 9 · the craziest part: the question at the start pulls people to the answer at the end
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.08, note: 'timeline of a reel: ? at 0s, crimson route to ! at the end, a viewer walks along', draw(lt, d, t) {
      dayPage(11); ground(1500, M.wall2);
      const p = eio(seg(lt, 0.4, d - 0.3)); line([[120, 900], [960, 900]], P.ink, 8); K.label('0s', 120, 970, 40); K.label('END', 960, 970, 40);
      bigMark('?', 120, 700, R2(seg(lt, 0.1, 0.4)) * 0.7, -0.1, P.crimson, 300);
      const hd = K.dashedRoute([[120, 860], [540, 760], [960, 860]], p);
      bigMark('!', 960, 700, R2(seg(lt, d * 0.8, d * 0.95)) * 0.7, 0.1, P.gold, 300);
      person({ x: lerp(160, 900, p), y: 1480, h: 420, arm: 40, walk: lt * 9, top: P.royal, bob: Math.abs(Math.sin(lt * 9)) * -8 });
      K.slip('THEY STAY', 540, 1150, R2(seg(lt, d * 0.5, d * 0.7)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'boing', { gain: 0.4 }); cue(st + 0.4, 'slide', { dur: 2.2, gain: 0.35 }); cue(st + len(9) * 0.8, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 10 · staying to the end = watch time = the top signal: clock spins, WATCH TIME card gets the #1 seal
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 950], zoom: 0.1, note: 'clock spins, WATCH TIME card stamped with gold #1', draw(lt, d, t) {
      dayPage(12, false); clock(540, 620, 1.6, lt * 8);
      rankCard(1, 'WATCH TIME', 540, 1080, R2(seg(lt, 0.2, 0.5)), -0.02, 680);
      K.ribbon('TOP SIGNAL', 540, 1330, R2(seg(lt, d * 0.5, d * 0.8)), 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.5, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 11 · open Insights and check your skip rate: phone with Insights, magnifier on the skip rate
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.12, note: 'phone Insights screen, magnifier finds SKIP RATE', draw(lt, d, t) {
      dayPage(13); ground(1650, M.wall2);
      phoneBig(540, 980, 1.2, 0.02, () => { ctx.font = '700 60px Caladea'; ctx.textAlign = 'center'; ctx.fillStyle = P.ink; ctx.fillText('Insights', 0, -280);
        ['Views', 'Watch time', 'Skip rate'].forEach((w, k) => { rr(-150, -190 + k * 150, 300, 110, 12); ctx.fillStyle = k === 2 ? 'rgba(168,50,45,0.15)' : 'rgba(62,44,30,0.08)'; ctx.fill(); ctx.font = '700 46px Caladea'; ctx.fillStyle = k === 2 ? P.crimson : P.ink; ctx.fillText(w, 0, -122 + k * 150); }); });
      const mp = eio(seg(lt, 0.3, d * 0.7)); magnifier(lerp(820, 560, mp), lerp(500, 1210, mp), 1.1);
      K.slip('CHECK TODAY', 540, 230, R2(seg(lt, d * 0.6, d * 0.85)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { gain: 0.4 }); cue(st + len(11) * 0.6, 'pop', { gain: 0.5 }); }

  // 12 · follow + send: nser seal stamps, the hook catches the FOLLOW slip (loops back to the hook)
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, handle slip, hook lifts FOLLOW + SEND', draw(lt, d, t) {
      dayPage(14); ground(1550, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.6, eo(s)) : 1.6; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(320, 620, sc, 'N'); ctx.restore(); }
      const lift = eio(seg(lt, 1.6, 2.4)), hy = lerp(-200, 1040, eob(seg(lt, 0.9, 1.4))) - lift * 200; fishHook(800, hy, 1.1, -100);
      K.slip('FOLLOW  +  SEND', 680, lt > 1.4 ? hy + 110 : 1150, R2(seg(lt, 0.9, 1.2)), Math.sin(t * 3) * 0.03, 60);
      K.slip('@nser.in_officials', 540, 1420, R2(seg(lt, 0.6, 0.9)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + 1.4, 'plop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
