// 13 Nov 7pm: YOU DON'T NEED TO LIVE IN MUMBAI TO GROW. Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, gift, note, coins, phoneBig, bubble, laptop, postCard, skyline, ringLight, magnifier, bigMark,
  hand, clock, rankCard, strike, barPair, pin, indiaMap, geo, CITY, hut, tree, pot, river, cup } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

const PUDU = [78.8, 10.4];
/** a little village row: huts + palms on a ground line */
function village(y, t, s = 1) { tree(120, y, 0.9 * s, Math.sin(t * 1.5) * 0.03); hut(360, y, 0.8 * s); tree(620, y, 1.0 * s, Math.sin(t * 1.5 + 1) * 0.03); hut(860, y, 0.7 * s, '#D2B07E'); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · don't live in Mumbai, can't grow? wrong: map, Mumbai pin, crimson ✕
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [420, 900], zoom: 0.12, note: 'India map, MUMBAI pin drops, ONLY MUMBAI? then a crimson X', draw(lt, d, t) {
      indiaMap(1); const [mx, my] = geo(...CITY.MUMBAI); pin(mx, my, R2(seg(lt, 0, 0.3)) * 1.2);
      K.slip('ONLY MUMBAI?', 540, 300, R2(seg(lt, 0.15, 0.45)), -0.03, 84);
      bigMark('✕', mx + 20, my - 60, R2(seg(lt, d * 0.65, d * 0.85)), -0.1, P.crimson, 360);
      K.slip('WRONG', 540, 1500, R2(seg(lt, d * 0.75, d * 0.92)), 0.04, 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'plop', { gain: 0.5 }); cue(st + len(0) * 0.65, 'slam', { gain: 0.7 }); }

  // 1 · simply put: your village/small town = your edge
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 980], zoom: 0.1, note: 'village row (huts + palms), YOUR TOWN slip, = YOUR EDGE ribbon', draw(lt, d, t) {
      dayPage(2); ground(1450, P.forest); village(1460, t);
      K.slip('YOUR TOWN', 540, 360, R2(seg(lt, 0, 0.3)), -0.03, 90);
      K.ribbon('= YOUR EDGE', 540, 640, R2(seg(lt, d * 0.5, d * 0.8)), 90);
      K.slip('NOT A WEAKNESS', 540, 1700, R2(seg(lt, d * 0.3, d * 0.55)), 0.03, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.5, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 2 · 2025: 548M of 958M users were rural (two shots)
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.4;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.08, note: '2025 ribbon, 958M users slip, phones fill the page', draw(lt, d, t) {
      dayPage(3, false); K.ribbon('2025', 540, 240, R2(seg(lt, 0, 0.3)), 100);
      bigMark('958M', 540, 760, R2(seg(lt, 0.2, 0.5)), 0, P.gold, 300);
      K.label('INTERNET USERS IN INDIA', 540, 980, 46);
      for (let k = 0; k < 6; k++) { const a = seg(lt, 0.4 + k * 0.12, 0.7 + k * 0.12); if (a > 0) phoneBig(170 + k * 150, 1420 + (k % 2) * 40, 0.3 * R2(a), (k - 2.5) * 0.06); }
    } });
    add({ id: 'S02b', at: mid, cam: [540, 980], zoom: 0.08, note: 'bars: RURAL 548M vs REST 410M', draw(lt, d, t) {
      dayPage(4, false); K.slip('WHERE THEY LIVE', 540, 260, R2(seg(lt, 0, 0.3)), -0.03, 64);
      barPair({ v: 548, txt: '548M', label: 'RURAL', hot: true }, { v: 410, txt: '410M', label: 'THE REST' }, 360, 1450, seg(lt, 0.15, d * 0.7), 800);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + 0.3, 'pop', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'slide', { dur: 1.2, gain: 0.4 }); }

  // 3 · more than half is outside the big cities: map, pins everywhere but metros dim
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 940], zoom: 0.1, note: 'map, gold pins in small places pop all over, MORE THAN HALF', draw(lt, d, t) {
      indiaMap(5);
      [[74.5, 30.2], [80.9, 26.8], [85.3, 25.6], [76.9, 21.1], [79.1, 21.5], [74.2, 16.7], [77.6, 15.3], [80.6, 16.5], [78.1, 11.6], [76.2, 10.5], [84.8, 22.2], [91.7, 26.1], [73.0, 24.6], [82.0, 19.0]].forEach(([a, b], k) => { const [x, y] = geo(a, b); pin(x, y, R2(seg(lt, 0.1 + k * 0.08, 0.4 + k * 0.08)) * 0.7, P.gold); });
      K.slip('MORE THAN HALF', 540, 220, R2(seg(lt, d * 0.4, d * 0.65)), -0.03, 80);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 4; k++) cue(st + 0.1 + k * 0.3, 'plop', { gain: 0.35 }); cue(st + len(3) * 0.4, 'pop', { gain: 0.6 }); }

  // 4 · you copy the same café reels every city creator makes (two shots)
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 980], zoom: 0.1, note: 'creator filming a café cup, skyline behind', draw(lt, d, t) {
      dayPage(6); skyline(6, 1450); ground(1450, M.wall2);
      cup(700, 1380, 1.2, t); person({ x: 330, y: 1560, h: 620, arm: 80, top: M.hoodie, glow: 0.6 });
      K.slip('CAFÉ REEL', 540, 300, R2(seg(lt, 0.1, 0.4)), -0.03, 84);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.12, note: 'grid of identical café post cards, SAME AS EVERYONE', draw(lt, d, t) {
      dayPage(7, false);
      for (let k = 0; k < 6; k++) { const a = seg(lt, k * 0.12, 0.3 + k * 0.12); if (a <= 0) continue; const x = 280 + (k % 2) * 520, y = 560 + Math.floor(k / 2) * 420; ctx.save(); ctx.translate(x, y); ctx.scale(R2(a), R2(a)); cut(P_rr(-200, -170, 400, 340, 14), '#FFFBF0'); cup(0, 90, 0.9, t + k); ctx.restore(); }
      K.ribbon('SAME AS EVERYONE', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); for (let k = 0; k < 3; k++) cue(mid + k * 0.24, 'plop', { gain: 0.4 }); cue(mid + d4 * 0.25, 'thud', { gain: 0.5 }); }

  // 5 · April 2018, a family from Pudukkottai, Tamil Nadu, starts a cooking channel (two shots)
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [600, 1300], zoom: 0.2, note: 'map zooms to Tamil Nadu, PUDUKKOTTAI pin, APR 2018', draw(lt, d, t) {
      indiaMap(8); const [px, py] = geo(...PUDU); pin(px, py, R2(seg(lt, 0.3, 0.6)) * 1.2);
      K.ribbon('APR 2018', 560, 880, R2(seg(lt, 0, 0.3)), 80);
      K.slip('PUDUKKOTTAI, TN', 540, 1560, R2(seg(lt, d * 0.45, d * 0.75)), -0.03, 60);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 980], zoom: 0.1, note: 'family of generic paper figures by a hut, COOKING CHANNEL slip', draw(lt, d, t) {
      dayPage(9); ground(1500, P.forest); hut(800, 1500, 0.8); tree(980, 1500, 0.8, Math.sin(t * 1.5) * 0.03);
      [[180, 640, M.hoodie2, 30], [380, 520, P.crimson, 110 + Math.sin(t * 9) * 20], [540, 460, P.royal, 40]].forEach(([x, h, c, a], k) => person({ x, y: 1560, h, arm: a, phone: false, top: c, bob: Math.abs(Math.sin(t * 3 + k)) * -6 }));
      K.slip('FAMILY', 540, 360, R2(seg(lt, 0, 0.3)), -0.03, 90);
      K.slip('COOKING CHANNEL', 540, 560, R2(seg(lt, d * 0.3, d * 0.6)), 0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + 0.35, 'plop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'pop', { gain: 0.5 }); }

  // 6 · no studio: outdoors, fields, river, huge pots
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 1000], zoom: 0.1, note: 'NO STUDIO, a field by a river, huge pot over fire, cooks', draw(lt, d, t) {
      dayPage(10); ground(1250, P.forest); river(1650, t); tree(130, 1300, 0.9, Math.sin(t * 1.5) * 0.03); tree(950, 1300, 0.8, Math.sin(t * 1.5 + 1) * 0.03);
      pot(540, 1560, 1.1, t); person({ x: 230, y: 1600, h: 480, arm: 70, phone: false, top: M.hoodie2 }); person({ x: 850, y: 1600, h: 480, dir: -1, arm: 70, phone: false, top: P.crimson });
      K.slip('NO STUDIO', 540, 320, R2(seg(lt, 0, 0.3)), -0.03, 96); 
      K.slip('FIELDS + RIVER', 540, 560, R2(seg(lt, d * 0.3, d * 0.55)), 0.03, 66);
      K.slip('HUGE POTS', 540, 780, R2(seg(lt, d * 0.6, d * 0.85)), -0.02, 66);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'thud', { gain: 0.5 }); cue(st + len(6) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.6, 'pop', { gain: 0.5 }); }

  // 7 · craziest part: July 2021, first Tamil YouTube channel past 1 crore
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.1, note: 'JUL 2021 ribbon, 1 CRORE counts up, FIRST TAMIL seal', draw(lt, d, t) {
      dayPage(11, false); K.ribbon('JUL 2021', 540, 260, R2(seg(lt, 0, 0.3)), 90);
      const n = Math.max(1, Math.round(100 * eo(seg(lt, 0.2, d * 0.6)))); bigMark(n >= 100 ? '1 CRORE' : n + ' LAKH', 540, 860, R2(seg(lt, 0, 0.3)), 0, P.gold, 210);
      K.label('SUBSCRIBERS', 540, 1060, 50);
      const s = seg(lt, d * 0.65, d * 0.85); if (s > 0) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(880, 470, lerp(2.2, 0.9, eo(s)), '1'); ctx.restore(); }
      K.slip('FIRST TAMIL CHANNEL', 540, 1340, R2(seg(lt, d * 0.7, d * 0.9)), -0.03, 66);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + 0.2, 'slide', { dur: 1.4, gain: 0.4 }); cue(st + len(7) * 0.65, 'slam', { gain: 0.7 }); }

  // 8 · didn't try to look like the city, showed what only they had: split, skyline struck, village ticked
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.08, note: 'top half city (struck), bottom half village (ONLY THEM)', draw(lt, d, t) {
      dayPage(12, false);
      ctx.save(); ctx.beginPath(); ctx.rect(-300, -300, W + 600, 1120); ctx.clip(); ctx.translate(0, -500); skyline(12, 1300); ctx.restore();
      line([[0, 820], [W, 820]], P.ink, 6);
      bigMark('✕', 840, 500, R2(seg(lt, 0.3, 0.55)), 0, P.crimson, 300); K.slip('COPY THE CITY', 380, 200, R2(seg(lt, 0, 0.3)), -0.03, 64);
      ground(1500, P.forest); village(1510, t, 0.8);
      K.slip('ONLY THEM', 540, 1000, R2(seg(lt, d * 0.5, d * 0.75)), 0.03, 90);
      bigMark('✓', 860, 1050, R2(seg(lt, d * 0.6, d * 0.85)) * 0.6, 0, P.green, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'thud', { gain: 0.5 }); cue(st + len(8) * 0.5, 'pop', { gain: 0.6 }); cue(st + len(8) * 0.6, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 9 · write 5 things only your town has: five numbered cards
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.06, note: '5 THINGS ribbon, numbered cards: FOOD, MARKET, FESTIVAL, PEOPLE, PLACE', draw(lt, d, t) {
      dayPage(13, false); K.ribbon('5 THINGS', 540, 250, R2(seg(lt, 0, 0.3)), 90);
      ['A DISH', 'A MARKET', 'A FESTIVAL', 'A CRAFT', 'A PLACE'].forEach((w, k) => { const a = 0.3 + k * (d - 0.8) / 5; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 520 + k * 230 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.35)), k % 2 ? 0.015 : -0.015, 620); });
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 5; k++) cue(st + 0.3 + k * (len(9) - 0.8) / 5, 'pop', { gain: 0.55 }); }

  // 10 · shoot one right there, compare saves + sends (two shots)
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.55;
    add({ id: 'S10a', at: st, cam: [540, 1000], zoom: 0.1, note: 'creator outdoors filming the pot by the hut, SHOOT IT THERE', draw(lt, d, t) {
      dayPage(14); ground(1450, P.forest); hut(820, 1450, 0.75); pot(560, 1500, 0.7, t);
      person({ x: 230, y: 1560, h: 620, arm: 80, top: M.hoodie, glow: 0.7 });
      K.slip('SHOOT IT THERE', 540, 360, R2(seg(lt, 0, 0.3)), -0.03, 84);
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.08, note: 'USUAL vs YOUR TOWN bars, SAVES + SENDS', draw(lt, d, t) {
      dayPage(15, false); K.slip('SAVES + SENDS', 540, 260, R2(seg(lt, 0, 0.3)), -0.03, 74);
      postCard(300, 720, 0.8, -0.04); ctx.save(); ctx.translate(780, 720); ctx.rotate(0.04); cut(P_rr(-136, -176, 272, 352, 14), '#FFFBF0'); ctx.restore(); hut(780, 800, 0.5);
      K.label('USUAL', 300, 1000, 46); K.label('YOUR TOWN', 780, 1000, 46, P.crimson);
      const bp = eo(seg(lt, 0.2, d * 0.8)); [[300, 160, P.stone], [780, 400, P.crimson]].forEach(([x, h, c]) => { if (bp > 0.01) cut(P_rr(x - 110, 1600 - h * bp, 220, h * bp, 10), c); });
      line([[120, 1600], [960, 1600]], P.ink, 6);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slide', { dur: 1.2, gain: 0.4 }); }

  // 11 · loop: next big creator not from Mumbai, from your village: map from shot 0, Mumbai pin fades, your pin glows
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [480, 960], zoom: 0.1, note: 'same map as the start: MUMBAI pin greys, YOUR VILLAGE pin drops crimson', draw(lt, d, t) {
      indiaMap(1); const [mx, my] = geo(...CITY.MUMBAI); pin(mx, my, 1.2, lt > d * 0.35 ? P.stone : P.crimson);
      const [vx, vy] = geo(83.0, 24.5); pin(vx, vy, R2(seg(lt, d * 0.5, d * 0.7)) * 1.4);
      K.slip('NEXT BIG CREATOR', 540, 220, R2(seg(lt, 0, 0.3)), -0.03, 74);
      K.slip('YOUR VILLAGE', vx, vy + 110, R2(seg(lt, d * 0.6, d * 0.85)), 0.04, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.5, 'plop', { gain: 0.6 }); cue(st + len(11) * 0.6, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 12 · follow + send: nser seal, handle, village row
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND slip, handle over the village', draw(lt, d, t) {
      dayPage(16); ground(1500, P.forest); village(1510, t, 0.8);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.6, eo(s)) : 1.6; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.slip('FOLLOW  +  SEND', 540, 820, R2(seg(lt, 0.9, 1.2)), Math.sin(t * 3) * 0.03, 66);
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.6, 0.9)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
