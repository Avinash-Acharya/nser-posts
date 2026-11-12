// 13 Nov 11am: POST IN YOUR MOTHER TONGUE (regional creators win). Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, gift, note, coins, phoneBig, bubble, laptop, postCard, skyline, ringLight, magnifier, bigMark,
  hand, clock, rankCard, strike, barPair, pin, indiaMap, geo, CITY } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** crumpled paper ball */
function ball(x, y, s, r = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(r); ctx.scale(s, s); cut(() => { ctx.beginPath(); for (let i = 0; i <= 12; i++) { const a = i / 12 * TAU, q = 60 + (i % 2 ? 12 : -8); ctx.lineTo(Math.cos(a) * q, Math.sin(a) * q); } ctx.closePath(); }, '#FFFBF0', { shadow: 0.6, edge: 3 }); line([[-30, -10], [20, 15]], 'rgba(62,44,30,0.3)', 4); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · English not great, so no reels? creator stares at an ENGLISH? bubble, a crimson ? pops
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator with phone, ENGLISH? bubble, big ?', draw(lt, d, t) {
      room(1); ringLight(860, 1200, 0.8);
      person({ x: 420, y: 1500, h: 760, arm: 70, top: M.hoodie2 });
      bubble('English?', 300, 560, R2(seg(lt, 0.15, 0.45)), false, 96);
      bigMark('?', 820, 520, R2(seg(lt, d * 0.45, d * 0.7)), Math.sin(t * 2) * 0.1, P.crimson, 360);
      K.slip('NO REELS', 540, 1730, R2(seg(lt, d * 0.6, d * 0.85)), -0.04, 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.45, 'boing', { gain: 0.4 }); }

  // 1 · simply put: your language = your biggest niche
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 920], zoom: 0.1, note: 'YOUR LANGUAGE slip = NICHE ribbon, bubbles float', draw(lt, d, t) {
      dayPage(2); ground(1550, M.wall2);
      ['Hindi', 'Tamil', 'Kannada'].forEach((w, k) => bubble(w, 120 + k * 260, 1250 - k * 80 + Math.sin(t * 2 + k) * 10, R2(seg(lt, 0.2 + k * 0.2, 0.5 + k * 0.2)), false, 60));
      K.slip('YOUR LANGUAGE', 540, 520, R2(seg(lt, 0, 0.3)), -0.03, 84);
      K.ribbon('= YOUR NICHE', 540, 820, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.5, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 2 · 2016: 234M Indian languages vs 175M English (two shots, beat is long)
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.45;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.08, note: '2016 ribbon, India map with many pins', draw(lt, d, t) {
      indiaMap(3); K.ribbon('2016', 540, 200, R2(seg(lt, 0.1, 0.4)), 100);
      [[77.2, 28.6], [72.9, 19.1], [80.3, 13], [88.4, 22.6], [78.5, 17.4], [75.8, 26.9], [76.3, 10], [85.1, 25.6], [73.8, 15.5], [81.6, 21.2]].forEach(([a, b], k) => { const [x, y] = geo(a, b); pin(x, y, R2(seg(lt, 0.3 + k * 0.12, 0.6 + k * 0.12)) * 0.8, k % 3 ? P.crimson : P.gold); });
    } });
    add({ id: 'S02b', at: mid, cam: [540, 980], zoom: 0.08, note: 'bars: INDIAN LANGUAGES 234M vs ENGLISH 175M', draw(lt, d, t) {
      dayPage(4, false); K.slip('ONLINE IN 2016', 540, 260, R2(seg(lt, 0, 0.3)), -0.03, 64);
      barPair({ v: 234, txt: '234M', label: 'INDIAN LANG.', hot: true }, { v: 175, txt: '175M', label: 'ENGLISH' }, 360, 1450, seg(lt, 0.15, d * 0.7), 800);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'slide', { dur: 1.2, gain: 0.4 }); cue(mid + d2 * 0.5, 'pop', { gain: 0.6 }); }

  // 3 · 2011: only 42M: timeline 2011 → 2016, gold numbers
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.1, note: 'timeline 2011 -> 2016, 42M grows to 234M', draw(lt, d, t) {
      dayPage(5, false); const p = eio(seg(lt, 0.3, d * 0.85));
      K.timeline([2011, 2016], 180, 1100, 720, p, p > 0.95 ? 1 : 0);
      K.slip('42M', 180, 820, R2(seg(lt, 0.1, 0.4)), -0.04, 90);
      K.slip('234M', 840, 820, R2(seg(lt, d * 0.6, d * 0.85)), 0.04, 100);
      bigMark('↑', 540, 600, R2(seg(lt, d * 0.4, d * 0.65)) * 0.6, 0, P.gold, 360);
      K.label('INDIAN-LANGUAGE USERS', 540, 1400, 44);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + 0.3, 'slide', { dur: 1.4, gain: 0.35 }); cue(st + len(3) * 0.6, 'pop', { gain: 0.6 }); }

  // 4 · you write in English, ten retakes, still not you (two shots)
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 1000], zoom: 0.1, note: 'creator at laptop typing English script, paper balls pile up', draw(lt, d, t) {
      room(6); ctx.save(); ctx.globalAlpha = 0.3; ctx.fillStyle = M.night; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore();
      laptop(620, 1400, 0.8, () => { ctx.font = '700 44px Caladea'; ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.fillText('SCRIPT (ENG)', -260, -360); for (let i = 0; i < 4; i++) line([[-260, -290 + i * 60], [-260 + Math.min(500, (lt * 300 - i * 200)), -290 + i * 60]], 'rgba(62,44,30,0.4)', 12); });
      person({ x: 220, y: 1500, h: 560, arm: 30, phone: false, top: M.hoodie2 });
      for (let k = 0; k < 4; k++) if (lt > 0.5 + k * 0.4) ball(560 + k * 110, 1520 + (k % 2) * 30, 0.7, k);
      K.slip('ENGLISH SCRIPT', 540, 420, R2(seg(lt, 0.1, 0.4)), -0.03, 70);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.12, note: 'ring light, TAKE 10 slip, NOT YOU bubble', draw(lt, d, t) {
      room(7); ringLight(780, 1200, 0.9); person({ x: 380, y: 1450, h: 700, arm: 60, top: M.hoodie2 });
      const take = Math.min(10, 1 + Math.floor(lt * 6)); K.slip('TAKE ' + take, 540, 300, 1, 0.03, 100);
      bubble('...not me', 160, 640, R2(seg(lt, d * 0.55, d * 0.8)), false, 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.5, 'plop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'tock', { gain: 0.4 }); cue(mid + d4 * 0.27, 'thud', { gain: 0.4 }); }

  // 5 · 2015: one creator, tech reviews, fully in Hindi: generic figure + laptop
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.1, note: '2015 ribbon, generic creator with laptop, TECH IN HINDI', draw(lt, d, t) {
      room(8); K.ribbon('2015', 540, 220, R2(seg(lt, 0.1, 0.4)), 100);
      laptop(640, 1400, 0.75, () => { ctx.fillStyle = M.screen; ctx.fillRect(-310, -420, 620, 380); cut(P_rr(-110, -360, 220, 260, 20), '#1F1D1A', { shadow: 0, edge: 4 }); circle(0, -230, 20, P.gold); });
      person({ x: 240, y: 1500, h: 620, arm: 90 + Math.sin(t * 6) * 10, phone: false, top: P.royal });
      K.slip('TECH REVIEWS', 540, 520, R2(seg(lt, d * 0.35, d * 0.6)), -0.03, 70);
      K.slip('IN HINDI', 600, 700, R2(seg(lt, d * 0.65, d * 0.85)), 0.04, 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(5) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(5) * 0.65, 'slam', { gain: 0.5 }); }

  // 6 · Nov 2018: first tech YouTuber past 10M: counter counts up, FIRST seal
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.1, note: 'NOV 2018 ribbon, 10M counts up, FIRST seal', draw(lt, d, t) {
      dayPage(9, false); K.ribbon('NOV 2018', 540, 260, R2(seg(lt, 0.1, 0.4)), 90);
      const n = Math.round(10 * eo(seg(lt, 0.1, d * 0.7))); bigMark(Math.max(1, n) + 'M', 540, 900, R2(seg(lt, 0, 0.3)), 0, P.gold, 380);
      K.label('SUBSCRIBERS', 540, 1180, 50);
      const s = seg(lt, d * 0.7, d * 0.9); if (s > 0) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(880, 560, lerp(2.2, 1.0, eo(s)), '1'); ctx.restore(); }
      K.slip('FIRST IN TECH', 540, 1420, R2(seg(lt, d * 0.75, d * 0.95)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(6) * 0.2, 'slide', { dur: 1.2, gain: 0.4 }); cue(st + len(6) * 0.75, 'slam', { gain: 0.7 }); }

  // 7 · craziest part: brands know it, 88% respond more to ads in their language (two shots)
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.4;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'brand gift boxes arrive, BRANDS slip', draw(lt, d, t) {
      dayPage(10); ground(1550, M.wall2);
      [[300, 1500, -0.05], [560, 1520, 0.04], [800, 1500, -0.02]].forEach(([x, y, r], k) => { const a = seg(lt, 0.2 + k * 0.2, 0.6 + k * 0.2); if (a > 0) gift(x, lerp(400, y, eob(a)), 0.9, r); });
      K.slip('BRANDS KNOW', 540, 520, R2(seg(lt, 0, 0.3)), -0.03, 80);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.1, note: '88% counts up, IN THEIR LANGUAGE ad card', draw(lt, d, t) {
      dayPage(11, false); const n = Math.round(88 * eo(seg(lt, 0.1, d * 0.5)));
      bigMark(n + '%', 540, 700, R2(seg(lt, 0, 0.25)), 0, P.gold, 380);
      K.slip('RESPOND MORE', 540, 1000, R2(seg(lt, d * 0.3, d * 0.55)), -0.03, 74);
      postCard(540, 1480, 0.9, 0.03, 1); K.ribbon('ADS IN THEIR LANGUAGE', 540, 1150, R2(seg(lt, d * 0.5, d * 0.75)), 56);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.2 + k * 0.2 + 0.3, 'plop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'slide', { dur: 1, gain: 0.4 }); cue(mid + len(7) * 0.6 * 0.5, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 8 · check your top cities in Insights: phone with city list + magnifier
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.12, note: 'phone Insights: TOP CITIES list, magnifier', draw(lt, d, t) {
      dayPage(12); ground(1650, M.wall2);
      phoneBig(540, 980, 1.2, 0.02, () => { ctx.font = '700 54px Caladea'; ctx.textAlign = 'center'; ctx.fillStyle = P.ink; ctx.fillText('Top cities', 0, -280);
        ['Patna', 'Lucknow', 'Jaipur'].forEach((w, k) => { const a = clamp((lt - 0.3 - k * 0.25) * 3); if (a <= 0) return; ctx.globalAlpha = a; rr(-150, -190 + k * 150, 300, 110, 12); ctx.fillStyle = k === 0 ? 'rgba(168,50,45,0.15)' : 'rgba(62,44,30,0.08)'; ctx.fill(); ctx.font = '700 46px Caladea'; ctx.fillStyle = k === 0 ? P.crimson : P.ink; ctx.fillText(w, 0, -122 + k * 150); ctx.globalAlpha = 1; }); });
      const mp = eio(seg(lt, 0.4, d * 0.75)); magnifier(lerp(860, 560, mp), lerp(500, 860, mp), 1.1);
      K.slip('INSIGHTS', 540, 230, R2(seg(lt, 0.05, 0.35)), -0.03, 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + 0.4, 'slide', { gain: 0.4 }); }

  // 9 · make one full reel in the language most people there speak
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 980], zoom: 0.1, note: 'creator filming with ring light, ONE REEL slip, Hindi bubble', draw(lt, d, t) {
      room(13); ringLight(240, 1200, 0.85); person({ x: 640, y: 1450, h: 720, arm: 120 + Math.sin(t * 8) * 20, phone: false, top: P.crimson });
      bubble('Namaste!', 380, 560, R2(seg(lt, d * 0.3, d * 0.55)), false, 84);
      K.slip('1 FULL REEL', 540, 260, R2(seg(lt, 0.1, 0.4)), 0.03, 84);
      K.slip('THEIR LANGUAGE', 540, 1730, R2(seg(lt, d * 0.55, d * 0.8)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.3, 'pop', { gain: 0.5 }); }

  // 10 · compare saves and sends with your usual: two post cards, bars rise
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.08, note: 'USUAL vs NEW post cards, SAVES + SENDS bars', draw(lt, d, t) {
      dayPage(14, false); K.slip('SAVES + SENDS', 540, 260, R2(seg(lt, 0.05, 0.35)), -0.03, 74);
      postCard(300, 760, 0.85, -0.04); postCard(780, 760, 0.85, 0.04, 1);
      K.label('USUAL', 300, 1040, 46); K.label('NEW', 780, 1040, 46, P.crimson);
      const bp = eo(seg(lt, d * 0.35, d * 0.85)); [[300, 160, P.stone], [780, 400, P.crimson]].forEach(([x, h, c]) => { if (bp > 0.01) cut(P_rr(x - 110, 1600 - h * bp, 220, h * bp, 10), c); });
      line([[120, 1600], [960, 1600]], P.ink, 6);
      bigMark('?', 540, 760, R2(seg(lt, d * 0.2, d * 0.4)) * 0.5, 0, P.gold, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(10) * 0.35, 'slide', { dur: 1.2, gain: 0.4 }); }

  // 11 · loop line: people want their own language: the ENGLISH? bubble from the start gets struck, YOUR LANGUAGE lands
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.08, note: 'PERFECT ENGLISH struck out, YOUR LANGUAGE bubble + hearts', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      bubble('Perfect English', 140, 560, 1, false, 84); strike(130, 575, 640, eo(seg(lt, 0.2, 0.55)));
      bubble('Your language', 200, 960, R2(seg(lt, d * 0.45, d * 0.7)), false, 90);
      for (let k = 0; k < 3; k++) { const a = seg(lt, d * 0.6 + k * 0.15, d * 0.85 + k * 0.15); if (a > 0) bigMark('♥', 300 + k * 240, 1350 - a * 120, R2(a) * 0.6, 0, P.crimson, 300); }
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'zip', { gain: 0.5 }); cue(st + len(11) * 0.45, 'pop', { gain: 0.6 }); cue(st + len(11) * 0.6, 'sparkle', { dur: 0.8, gain: 0.5 }); }

  // 12 · follow + send: nser seal, handle, the creator from shot 0 now waving
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND slip, handle', draw(lt, d, t) {
      room(16); person({ x: 780, y: 1500, h: 640, arm: 140 + Math.sin(t * 10) * 20, phone: false, top: M.hoodie2 });
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.6, eo(s)) : 1.6; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(320, 620, sc, 'N'); ctx.restore(); }
      K.slip('FOLLOW  +  SEND', 540, 1040, R2(seg(lt, 0.9, 1.2)), Math.sin(t * 3) * 0.03, 66);
      K.slip('@nser.in_officials', 540, 1730, R2(seg(lt, 0.6, 0.9)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + 0.9, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
