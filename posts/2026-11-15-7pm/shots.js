// 15 Nov 7pm: IT'S NEVER TOO LATE: STARTED YOUTUBE AFTER 50 (Nisha Madhulika, as a generic paper figure). Paper style.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, postCard, magnifier, bigMark,
  hand, clock, rankCard, strike, pot, cup, pin, indiaMap, geo } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

const txt = (s, x, y, size, col = P.ink, align = 'center') => { ctx.font = `700 ${size}px Caladea`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
/** a recipe page (blog post): a title bar + a bowl + lines */
function recipePage(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-170, -220, 340, 440, 12), '#FFFBF0', { shadow: 0.6, edge: 4 }); line([[-120, -160], [120, -160]], P.crimson, 18);
  cut(() => { ctx.beginPath(); ctx.ellipse(0, -60, 90, 22, 0, 0, TAU); }, P.gold, { shadow: 0, edge: 2 }); cut(() => { ctx.beginPath(); ctx.arc(0, -60, 90, 0, Math.PI); ctx.closePath(); }, P.sepia, { shadow: 0.3, edge: 3 });
  for (let k = 0; k < 4; k++) line([[-120, 60 + k * 40], [120 - (k % 2) * 60, 60 + k * 40]], 'rgba(62,44,30,0.3)', 12); ctx.restore(); }
/** a video card with a play triangle (no logos) */
function videoCard(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -120, 400, 240, 16), M.screen, { shadow: 0.6, edge: 4 }); cut(P_poly([[-36, -54], [-36, 54], [56, 0]]), P.crimson, { shadow: 0, edge: 0 }); ctx.restore(); }
/** a paper trophy cup */
function trophy(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const k of [-1, 1]) { ctx.beginPath(); ctx.arc(k * 120, -230, 50, 0, TAU); ctx.lineWidth = 22; ctx.strokeStyle = '#A87A22'; ctx.stroke(); }
  cut(() => { ctx.beginPath(); ctx.moveTo(-130, -320); ctx.lineTo(130, -320); ctx.quadraticCurveTo(120, -100, 0, -80); ctx.quadraticCurveTo(-120, -100, -130, -320); ctx.closePath(); }, P.gold);
  cut(P_rr(-24, -90, 48, 80, 6), '#A87A22', { shadow: 0.3, edge: 3 }); cut(P_rr(-110, -14, 220, 50, 8), P.sepia); circle(0, -220, 40, '#EFC66A'); ctx.restore(); }
/** a gem-shaped plaque (milestone; no platform logo) */
function gemPlaque(x, y, s, glow = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (glow) { ctx.save(); ctx.globalAlpha = 0.35 * glow; for (let k = 0; k < 12; k++) { const a = k / 12 * TAU; line([[Math.cos(a) * 260, Math.sin(a) * 260], [Math.cos(a) * 380, Math.sin(a) * 380]], P.gold, 16); } ctx.restore(); }
  cut(P_rr(-220, -220, 440, 440, 20), '#E8E4DA');
  cut(P_poly([[-120, -60], [-60, -130], [60, -130], [120, -60], [0, 110]]), '#9DB4B0', { shadow: 0.4, edge: 5 });
  line([[-120, -60], [120, -60]], '#F7EFDC', 6); line([[-60, -130], [0, 110]], 'rgba(255,255,255,0.5)', 5); line([[60, -130], [0, 110]], 'rgba(255,255,255,0.5)', 5); ctx.restore(); }
/** the creator: a generic paper figure in an apron colour (never a real person's likeness) */
const cook = (o) => person({ top: P.wine, phone: false, arm: 30, ...o });

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · feel it's too late? past the age? a clock runs fast, a TOO LATE? slip on a figure looking at a phone
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'clock spinning, a person staring at a phone, TOO LATE? ribbon, crimson ?', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      clock(540, 620, 2.0, lt * 12);
      person({ x: 360, y: 1760, h: 560, arm: 40, top: M.hoodie2, glow: 0.4 });
      K.ribbon('TOO LATE?', 540, 230, R2(seg(lt, 0.05, 0.4)), 104);
      bigMark('?', 790, 1280, R2(seg(lt, d * 0.5, d * 0.75)), Math.sin(t * 3) * 0.12, P.crimson, 360);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.2, 'tock', { gain: 0.3 }); cue(st + len(0) * 0.5, 'boing', { gain: 0.4 }); }

  // 1 · simply put, the internet doesn't ask your age, it looks at your work: AGE card struck out, WORK ribbon
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.1, note: 'phone with a post card; slip AGE? struck out; WORK ribbon; magnifier on the post', draw(lt, d, t) {
      dayPage(2, false);
      phoneBig(540, 1000, 0.9, 0.03, () => { postCard(0, -40, 1.0, 0, 0.5 + 0.5 * Math.sin(t * 4)); });
      K.slip('AGE?', 540, 300, R2(seg(lt, 0.05, 0.3)), -0.04, 90); strike(420, 310, 240, eo(seg(lt, d * 0.35, d * 0.5)));
      magnifier(lerp(980, 720, eo(seg(lt, d * 0.45, d * 0.75))), 900, 1.0);
      K.ribbon('YOUR WORK', 540, 1580, R2(seg(lt, d * 0.55, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(1) * 0.55, 'slam', { gain: 0.5 }); }

  // 2 · meet Nisha Madhulika, a home cook living in Noida: India map pin on Noida, generic figure, name slip
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 900], zoom: 0.08, note: 'India map, pin drops on Noida, name slip, HOME COOK ribbon (no likeness, a paper figure)', draw(lt, d, t) {
      indiaMap(3); const [x, y] = geo(77.39, 28.54);
      pin(x, y, R2(seg(lt, 0.1, 0.4)));
      K.slip('NOIDA', x + 170, y - 60, R2(seg(lt, 0.25, 0.5)), 0.03, 56);
      K.slip('NISHA MADHULIKA', 540, 1400, R2(seg(lt, d * 0.35, d * 0.6)), -0.03, 70);
      K.ribbon('HOME COOK', 540, 1600, R2(seg(lt, d * 0.55, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'thud', { gain: 0.5 }); cue(st + 0.25, 'pop', { gain: 0.4 }); cue(st + len(2) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.55, 'pop', { gain: 0.5 }); }

  // 3 · 2007, close to fifty, the house felt empty, she started a recipe blog
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.45;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.1, note: 'quiet room: one figure, an empty chair, a cup, 2007 ribbon, ~50 slip', draw(lt, d, t) {
      room(4);
      cook({ x: 360, y: 1650, h: 620 });
      cut(P_rr(640, 1150, 220, 30, 6), P.sepia); cut(P_rr(830, 900, 30, 280, 6), P.sepia); cut(P_rr(650, 1180, 24, 220, 4), P.sepia); cut(P_rr(830, 1180, 24, 220, 4), P.sepia);
      cup(750, 1150, 0.6, t);
      K.ribbon('2007', 540, 260, R2(seg(lt, 0.05, 0.35)), 110);
      K.slip('ALMOST 50', 540, 520, R2(seg(lt, d * 0.3, d * 0.55)), -0.03, 72);
      K.label('QUIET HOUSE', 760, 820, 40);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.12, note: 'laptop opens a recipe blog page, VEG RECIPES slip, BLOG ribbon', draw(lt, d, t) {
      room(5);
      laptop(540, 1300, 1.2, () => { ctx.fillStyle = '#F3E9D2'; ctx.fillRect(-306, -418, 612, 376); recipePage(0, -200, 0.75 * R2(seg(lt, 0.1, 0.4)), 0); });
      K.ribbon('BLOG', 540, 300, R2(seg(lt, 0.05, 0.35)), 110);
      K.slip('VEG RECIPES', 540, 560, R2(seg(lt, d * 0.4, d * 0.7)), 0.03, 72);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + d3 * 0.45 * 0.3, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'tock', { gain: 0.5 }); cue(mid + 0.15, 'pop', { gain: 0.5 }); }

  // 4 · by 2011, 100+ recipes, and that year a YouTube channel: pages pile up, timeline 2007 -> 2011, video card
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.55;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'recipe pages pile up, gold 100+ ribbon, timeline 2007 → 2011', draw(lt, d, t) {
      dayPage(6, false);
      for (let k = 0; k < 9; k++) { const a = k * d * 0.06; recipePage(220 + (k % 3) * 320, 800 + Math.floor(k / 3) * 200, 0.6 * R2(seg(lt, a, a + 0.3)), (rnd(k) - 0.5) * 0.4); }
      K.ribbon('100+ RECIPES', 540, 280, R2(seg(lt, d * 0.4, d * 0.7)), 92);
      K.timeline([2007, 2011], 200, 1560, 680, eo(seg(lt, 0.1, d * 0.9)), 1);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.12, note: 'the figure next to a big video card with play button, 2011 ribbon, CHANNEL slip', draw(lt, d, t) {
      dayPage(7); ground(1650, M.wall2);
      videoCard(620, 900, 1.3 * R2(seg(lt, 0.05, 0.35)), -0.03);
      cook({ x: 300, y: 1750, h: 600, arm: 70 });
      K.ribbon('2011', 540, 260, R2(seg(lt, 0.1, 0.4)), 110);
      K.slip('VIDEO CHANNEL', 640, 1300, R2(seg(lt, d * 0.4, d * 0.7)), 0.03, 64);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 4; k++) cue(st + d4 * 0.55 * (0.1 + k * 0.12), 'slide', { gain: 0.3 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'pop', { gain: 0.6 }); cue(mid + 0.2, 'slam', { gain: 0.5 }); }

  // 5 · you: first video after fifty, people say "at this age?": phone posting, comment bubbles pop
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.1, note: 'a 50+ figure posts (POSTED bubble), three comment bubbles "At this age?", 50+ slip', draw(lt, d, t) {
      room(8);
      person({ x: 280, y: 1560, h: 680, arm: 75, glow: 0.8, top: P.royal });
      K.slip('50+', 280, 300, R2(seg(lt, 0.05, 0.3)), -0.04, 96);
      bubble('First video!', 470, 560, R2(seg(lt, 0.15, 0.4)), false, 60);
      ['At this age?', 'Really?', 'At this age?'].forEach((w, k) => { const a = d * (0.45 + k * 0.12); bubble(w, 980, 860 + k * 180, R2(seg(lt, a, a + 0.25)), true, 58); });
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(st + len(5) * (0.45 + k * 0.12), 'plop', { gain: 0.5 }); }

  // 6 · game changer: she made what she already knew: FOOD. a big cooking pot + a video card
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.1, note: 'cooking pot steaming, figure stirring, WHAT SHE KNEW slip, FOOD ribbon', draw(lt, d, t) {
      room(9);
      pot(620, 1450, 1.1, t);
      cook({ x: 220, y: 1700, h: 640, arm: 80 });
      K.slip('WHAT SHE KNEW', 540, 300, R2(seg(lt, 0.1, 0.4)), -0.03, 70);
      K.ribbon('FOOD', 540, 560, R2(seg(lt, d * 0.7, d * 0.9)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'sizzle', { dur: 1.2, gain: 0.3 }); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.7, 'slam', { gain: 0.6 }); }

  // 7 · 2017: Top YouTube Cooking creator award: trophy + ribbon
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'gold trophy pops with sparkle, 2017 ribbon, TOP COOKING CREATOR slip', draw(lt, d, t) {
      dayPage(10);
      K.ribbon('2017', 540, 280, R2(seg(lt, 0.05, 0.35)), 110);
      trophy(540, 1180, 1.6 * R2(seg(lt, 0.2, 0.5)), Math.sin(t * 2) * 0.03);
      K.slip('TOP COOKING CREATOR', 540, 1440, R2(seg(lt, d * 0.4, d * 0.7)), -0.03, 64);
      K.label('AWARD', 540, 1580, 44, P.crimson);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.25, 'sparkle', { dur: 0.8, gain: 0.5 }); cue(st + len(7) * 0.4, 'pop', { gain: 0.5 }); }

  // 8 · craziest: 2020, 10 million subscribers: counter rolls, gem plaque with glow
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.4;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.1, note: 'timeline 2007 → 2011 → 2020 with the arrow running to 2020, 2020 ribbon', draw(lt, d, t) {
      dayPage(11, false);
      K.ribbon('2020', 540, 420, R2(seg(lt, 0.05, 0.35)), 120);
      K.timeline([2007, 2011, 2020], 160, 1000, 760, eo(seg(lt, 0.1, d * 0.9)), 2);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.14, note: 'gem plaque glows, counter rolls to 10M (gold), SUBSCRIBERS slip', draw(lt, d, t) {
      dayPage(12);
      gemPlaque(540, 820, 1.2 * R2(seg(lt, 0.05, 0.35)), seg(lt, 0.3, 0.8));
      const v = Math.round(10 * eo(seg(lt, 0.1, d * 0.6))); bigMark(`${v}M`, 540, 1350, R2(seg(lt, 0.1, 0.3)), -0.03, P.gold, 300);
      K.slip('SUBSCRIBERS', 540, 1620, R2(seg(lt, d * 0.5, d * 0.75)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.15, 'slide', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'sparkle', { dur: 1.0, gain: 0.5 }); cue(mid + d8 * 0.6 * 0.6, 'slam', { gain: 0.6 }); }

  // 9 · write 3 things you know, pick the one people ask about, post once this week
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.6;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.08, note: 'THINGS YOU KNOW ribbon, three rank cards; the 2nd gets a crimson ASKED MOST slip', draw(lt, d, t) {
      dayPage(13, false); K.ribbon('3 THINGS', 540, 280, R2(seg(lt, 0.05, 0.35)), 100);
      ['Cooking', 'Gardening', 'Tailoring'].forEach((w, k) => { const a = 0.2 + k * 0.25; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 640 + k * 260 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 600); });
      K.slip('ASKED MOST', 540, 1480, R2(seg(lt, d * 0.6, d * 0.8)), -0.03, 70);
      cut(P_rr(250, 560, 580, 160, 20), 'rgba(0,0,0,0)', { shadow: 0, edge: 0 });
      const p = eo(seg(lt, d * 0.55, d * 0.75)); if (p > 0) { ctx.save(); ctx.globalAlpha = p; ctx.lineWidth = 10; ctx.strokeStyle = P.crimson; ctx.beginPath(); ctx.ellipse(540, 640, 340, 110, -0.03, 0, TAU); ctx.stroke(); ctx.restore(); }
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.1, note: 'THIS WEEK ribbon, a phone posts one card, tick', draw(lt, d, t) {
      dayPage(14);
      phoneBig(540, 960, 0.95, -0.03, () => { postCard(0, -40, 1.0, 0, seg(lt, d * 0.5, d * 0.7)); });
      K.ribbon('THIS WEEK', 540, 280, R2(seg(lt, 0.05, 0.35)), 100);
      K.slip('ONE POST', 540, 1560, R2(seg(lt, d * 0.3, d * 0.6)), -0.03, 80);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.2 + k * 0.25, 'pop', { gain: 0.5 }); cue(st + d9 * 0.6 * 0.6, 'zip', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + (d9 * 0.4) * 0.3, 'pop', { gain: 0.5 }); }

  // 10 · it's not too late, only the start is left (loops to beat 0: the same clock, now stopped on START)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'the beat-0 clock again, TOO LATE? struck out, START ribbon, figure now holding a phone lit', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      clock(540, 620, 2.0, lerp(3, 0, eo(seg(lt, 0, 0.5))));
      person({ x: 360, y: 1760, h: 560, arm: 70, top: M.hoodie2, glow: 1 });
      K.slip('TOO LATE?', 540, 230, 1, -0.03, 84); strike(330, 240, 420, eo(seg(lt, 0.15, 0.4)));
      K.ribbon('START', 690, 1260, R2(seg(lt, d * 0.5, d * 0.75)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'zip', { gain: 0.5 }); cue(st + len(10) * 0.5, 'slam', { gain: 0.6 }); }

  // 11 · follow + send to someone who thinks it's too late
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a phone flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(15); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); videoCard(lerp(240, 540, f), lerp(1250, 1150, f), 0.6 * R2(seg(lt, d * 0.3, d * 0.5)), 0.05);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
