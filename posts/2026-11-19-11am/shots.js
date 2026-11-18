// 19 Nov 11am: SHORTS OR REELS? WHERE INDIAN CREATORS SHOULD POST. Paper style.
// Facts: Meta India VP via PTI/Outlook Business (15 Sep 2024): "India is a leading country for Reels watch-time on Instagram."
// YouTube Help "Shorts monetization policies": monetizing creators keep 45% of allocated revenue; from 1 Feb 2027 need
// 10M qualified Shorts views in the last 90 days to earn Shorts ad revenue (also NewscastStudio, 10 Aug 2026).
// No platform logos: phones are labelled with paper slips only.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet,
  clock, pin, indiaMap, geo, CITY } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a tall vertical-video frame with a pan (cooking) inside; tag = slip under it */
function vid(x, y, s, rot = 0, tint = P.sea) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -260, 300, 520, 22), '#FFFBF0'); rr(-125, -235, 250, 400, 12); ctx.fillStyle = tint; ctx.fill();
  pan(0, -20, 0.55); line([[-90, 210], [90, 210]], 'rgba(62,44,30,0.3)', 12); ctx.restore(); }
/** a frying pan with food */
function pan(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(150, -22, 190, 44, 20), P.ink, { shadow: 0.4, edge: 3 });
  cut(() => { ctx.beginPath(); ctx.ellipse(0, 0, 170, 90, 0, 0, TAU); }, '#4A4A4A');
  ell(0, -8, 130, 62, '#F2C14E'); circle(-50, -15, 18, P.crimson); circle(40, -5, 16, P.green); circle(5, -25, 14, P.crimson); ctx.restore(); }
/** a little speech message card (brand DM) */
function dm(x, y, s, word) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-180, -70, 360, 140, 30), '#FFFBF0'); K.label(word, 0, 0, 44, P.crimson); ctx.restore(); }
/** a plus-sign follower badge */
function plus(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_circ(0, 0, 70), P.green);
  line([[-30, 0], [30, 0]], P.edge, 14); line([[0, -30], [0, 30]], P.edge, 14); ctx.restore(); }
/** a pie split: share = 0..1 of the circle in gold, p grows it */
function pie(x, y, r, share, p) { if (p <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(p, p);
  cut(P_circ(0, 0, r), P.stone); cut(() => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.arc(0, 0, r, -Math.PI / 2, -Math.PI / 2 + TAU * share * clamp(p)); ctx.closePath(); }, P.gold, { shadow: 0.3, edge: 4 }); ctx.restore(); }
/** a calendar page with a big date */
function calPage(x, y, s, top, big) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-200, -230, 400, 460, 18), '#FFFBF0'); cut(P_rr(-200, -230, 400, 110, 18), P.crimson, { shadow: 0, edge: 0 });
  K.label(top, 0, -175, 52, P.edge); K.label(big, 0, 30, 170, P.ink); K.label('2027', 0, 170, 52, P.gold); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · Reels or Shorts? every Indian creator's question
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator between two phones labelled REELS and SHORTS, crimson ? above, WHICH ONE? ribbon', draw(lt, d, t) {
      room(1);
      phoneBig(230, 760, 0.6 * R2(seg(lt, 0.02, 0.25)), -0.08, () => vid(0, -40, 0.9));
      K.slip('REELS', 230, 330, R2(seg(lt, 0.1, 0.3)), -0.05, 70);
      phoneBig(850, 760, 0.6 * R2(seg(lt, d * 0.25, d * 0.45)), 0.08, () => vid(0, -40, 0.9, 0, P.stone));
      K.slip('SHORTS', 850, 330, R2(seg(lt, d * 0.3, d * 0.5)), 0.05, 70);
      person({ x: 540, y: 1650, h: 620, arm: 60, top: P.royal });
      bigMark('?', 540, 560, R2(seg(lt, d * 0.45, d * 0.65)), Math.sin(t * 3) * 0.12, P.crimson, 240);
      K.ribbon('WHICH ONE?', 540, 1780, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.55, 'boing', { gain: 0.4 }); }

  // 1 · simply put: same vertical video on both, money comes a different way
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'one vertical video card splits into two copies sliding left/right, two coin stacks on different paths, SAME VIDEO / DIFFERENT MONEY', draw(lt, d, t) {
      dayPage(2, false);
      K.ribbon('SAME VIDEO', 540, 330, R2(seg(lt, 0.02, 0.25)), 110);
      const f = eio(seg(lt, d * 0.2, d * 0.55));
      vid(lerp(540, 280, f), 820, 1.05, -0.05 * f); vid(lerp(540, 800, f), 820, 1.05, 0.05 * f, f > 0.05 ? P.stone : P.sea);
      const c = R2(seg(lt, d * 0.55, d * 0.75));
      if (c > 0) { K.dashedRoute([[280, 1120], [200, 1350], [280, 1480]], c); K.dashedRoute([[800, 1120], [900, 1300], [800, 1480]], c);
        coins(280, 1560, 0.8 * c, 3); coins(800, 1560, 0.8 * c, 5); }
      K.slip('DIFFERENT MONEY', 540, 1760, R2(seg(lt, d * 0.65, d * 0.9)), -0.02, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slam', { gain: 0.5 }); cue(st + len(1) * 0.3, 'slide', { gain: 0.5 }); cue(st + len(1) * 0.62, 'plop', { gain: 0.5 }); }

  // 2 · Meta: India a leading country for Reels watch time
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 980], zoom: 0.12, note: 'India map, a clock (watch time) and pins in big cities, gold TOP COUNTRY slip, META SAYS slip', draw(lt, d, t) {
      indiaMap(3);
      ['MUMBAI', 'DELHI', 'BENGALURU', 'KOLKATA', 'HYDERABAD', 'JAIPUR'].forEach((c, k) => { const [x, y] = geo(...CITY[c]); pin(x, y, R2(seg(lt, d * (0.15 + k * 0.07), d * (0.3 + k * 0.07)))); });
      K.slip('META SAYS', 290, 220, R2(seg(lt, 0.02, 0.2)), -0.04, 64);
      clock(860, 300, 0.9 * R2(seg(lt, 0.1, 0.3)), t * 5);
      K.ribbon('REELS WATCH TIME', 540, 1580, R2(seg(lt, d * 0.4, d * 0.65)), 80);
      K.slip('A LEADING COUNTRY', 540, 1760, R2(seg(lt, d * 0.6, d * 0.85)), 0.02, 66);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); [0.2, 0.3, 0.4, 0.5].forEach((a) => cue(st + len(2) * a, 'tock', { gain: 0.4 })); cue(st + len(2) * 0.5, 'slam', { gain: 0.5 }); }

  // 3 · Indian audiences watch lots of reels there
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'evening room: a row of faceless viewers each holding a phone, phones glow one by one, AUDIENCE IS HERE ribbon', draw(lt, d, t) {
      nightPage(4); ground(1650, M.wall2);
      const tops = [P.wine, M.hoodie2, M.tee, M.hoodie, P.royal];
      tops.forEach((c, k) => { const g = eo(seg(lt, d * (0.1 + k * 0.1), d * (0.25 + k * 0.1)));
        person({ x: 140 + k * 200, y: 1600, h: 470, arm: 40, top: c, glow: g });
        phoneBig(140 + k * 200, 1080, 0.22 * R2(seg(lt, d * (0.05 + k * 0.1), d * (0.2 + k * 0.1))), 0, () => vid(0, -40, 0.9)); });
      K.ribbon('AUDIENCE IS HERE', 540, 400, R2(seg(lt, d * 0.4, d * 0.7)), 90);
    } });
    cue(st, 'whoosh'); [0.1, 0.2, 0.3, 0.4, 0.5].forEach((a) => cue(st + len(3) * a, 'pop', { gain: 0.35 })); cue(st + len(3) * 0.5, 'sparkle', { dur: 0.5, gain: 0.4 }); }

  // 4 · you: cooking reel takes off → Insta brings followers + brand messages
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.45;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'YOU slip, creator at a stove with a pan, filming on a phone, COOKING REEL slip', draw(lt, d, t) {
      room(5);
      person({ x: 260, y: 1650, h: 680, arm: 70, top: P.royal });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      cut(P_rr(450, 1150, 560, 250, 12), P.stoneDark);
      pan(700, 1110, 1.0 * R2(seg(lt, 0.1, 0.3)));
      ctx.save(); ctx.globalAlpha = 0.5; for (let k = 0; k < 3; k++) line([[640 + k * 60, 1000], [640 + k * 60 + Math.sin(t * 4 + k) * 15, 880]], P.edge, 8); ctx.restore();
      phoneBig(820, 600, 0.45 * R2(seg(lt, d * 0.35, d * 0.55)), 0.1, () => pan(0, -40, 0.6));
      K.slip('COOKING REEL', 600, 1500, R2(seg(lt, d * 0.5, d * 0.8)), 0.03, 66);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.14, note: 'big phone with the reel, + follower badges and brand message cards fly out, REELS slip, FOLLOWERS + BRANDS ribbon', draw(lt, d, t) {
      dayPage(6, false);
      phoneBig(400, 900, 0.7, 0, () => vid(0, -40, 1.0));
      K.slip('REELS', 400, 330, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      [[140, 620], [880, 560], [130, 1180]].forEach(([x, y], k) => plus(x, y, R2(seg(lt, d * (0.15 + k * 0.1), d * (0.3 + k * 0.1)))));
      dm(820, 900, 0.75 * R2(seg(lt, d * 0.4, d * 0.55)), 'COLLAB?');
      dm(820, 1120, 0.75 * R2(seg(lt, d * 0.5, d * 0.65)), 'PAID DEAL?');
      K.ribbon('FOLLOWERS + BRANDS', 540, 1660, R2(seg(lt, d * 0.55, d * 0.85)), 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'sizzle', { dur: 1.0, gain: 0.4 }); cue(st + d4 * 0.45 * 0.45, 'plop', { gain: 0.5 }); cue(mid, 'whoosh'); [0.2, 0.3, 0.4, 0.5].forEach((a) => cue(mid + (len(4) * 0.55) * a, 'pop', { gain: 0.4 })); }

  // 5 · same video on Shorts → YouTube can share ad revenue by views
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'the same video card slides into a SHORTS phone, a views counter rises, coins drop into a wallet, AD REVENUE SHARE ribbon', draw(lt, d, t) {
      dayPage(7);
      const f = eio(seg(lt, 0.02, 0.3));
      phoneBig(330, 880, 0.75, -0.04, () => { if (f > 0.9) vid(0, -40, 1.0, 0, P.stone); });
      if (f <= 0.9) vid(lerp(900, 330, f), lerp(400, 840, f), lerp(0.6, 0.9, f), 0.1 * (1 - f));
      K.slip('SHORTS', 330, 330, R2(seg(lt, 0.15, 0.35)), -0.04, 70);
      const v = eo(seg(lt, d * 0.3, d * 0.7));
      K.slip('VIEWS', 800, 480, R2(seg(lt, d * 0.25, d * 0.4)), 0.03, 64); if (v > 0.02) { cut(P_rr(700, 880 - 300 * v, 200, 300 * v, 10), P.green); }
      wallet(800, 1150, 0.9 * R2(seg(lt, d * 0.45, d * 0.6)), 1);
      const cfall = seg(lt, d * 0.55, d * 0.85); if (cfall > 0 && cfall < 1) coins(800, lerp(820, 1040, cfall), 0.5, 1);
      K.ribbon('AD REVENUE SHARE', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 82);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'thud', { gain: 0.5 }); cue(st + len(5) * 0.35, 'tock', { gain: 0.4 }); cue(st + len(5) * 0.8, 'plop', { gain: 0.6 }); }

  // 6 · game changer: Shorts creators keep 45% of allocated revenue
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.5;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, a creator pool (pot of coins) with a dashed route to a creator', draw(lt, d, t) {
      dayPage(8, false); ground(1650, M.wall2);
      K.slip('GAME CHANGER', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      cut(() => { ctx.beginPath(); ctx.moveTo(130, 800); ctx.quadraticCurveTo(330, 1250, 530, 800); ctx.closePath(); }, P.stoneDark);
      coins(330, 870, 0.9 * R2(seg(lt, 0.1, 0.35)), 4);
      K.slip('CREATOR POOL', 330, 1170, R2(seg(lt, d * 0.25, d * 0.45)), -0.03, 56);
      K.dashedRoute([[520, 900], [700, 760], [800, 1000]], eo(seg(lt, d * 0.4, d * 0.8)));
      person({ x: 820, y: 1650, h: 560, arm: 50, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.7, d * 0.95)) });
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'big gold 45% and a pie with 45% filled gold, YOU KEEP ribbon', draw(lt, d, t) {
      dayPage(9);
      pie(540, 1020, 300, 0.45, eo(seg(lt, 0.05, 0.5)));
      bigMark('45%', 540, 480, R2(seg(lt, 0.1, 0.35)), -0.03, P.gold, 260);
      K.ribbon('YOU KEEP', 540, 1560, R2(seg(lt, d * 0.35, d * 0.65)), 110);
      K.slip('of your share', 540, 1740, R2(seg(lt, d * 0.5, d * 0.8)), 0.02, 54);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d6 * 0.5 * 0.2, 'plop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.3, 'slam', { gain: 0.6 }); cue(mid + 0.8, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 7 · twist: from 1 Feb 2027, 10 million Shorts views in 90 days
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.1, note: 'BIG TWIST slip, calendar page FEB 1 2027 drops in, crimson pin', draw(lt, d, t) {
      dayPage(10, false);
      K.slip('BIG TWIST', 540, 230, R2(seg(lt, 0.02, 0.25)), -0.03, 70);
      const f = eob(clamp(seg(lt, 0.1, 0.45))); calPage(540, lerp(-400, 900, clamp(f)), 1.3, 'FEB', '1');
      pin(740, 640, R2(seg(lt, d * 0.5, d * 0.7)));
      K.ribbon('NEW RULE', 540, 1600, R2(seg(lt, d * 0.5, d * 0.85)), 110);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'gold 10M VIEWS big, 90 DAYS slip with a clock, a bar that has to fill to a crimson line', draw(lt, d, t) {
      dayPage(11);
      bigMark('10M', 540, 520, R2(seg(lt, 0.05, 0.3)), -0.03, P.gold, 300);
      K.slip('SHORTS VIEWS', 540, 760, R2(seg(lt, 0.15, 0.35)), 0.02, 66);
      clock(250, 1150, 0.9 * R2(seg(lt, d * 0.25, d * 0.45)), t * 6);
      K.slip('IN 90 DAYS', 650, 1150, R2(seg(lt, d * 0.3, d * 0.5)), -0.03, 80);
      cut(P_rr(140, 1420, 800, 90, 20), '#FFFBF0'); const p = eo(seg(lt, d * 0.4, d * 0.95)); if (p > 0.02) cut(P_rr(150, 1430, 780 * p * 0.85, 70, 16), P.green, { shadow: 0, edge: 0 });
      line([[880, 1390], [880, 1540]], P.crimson, 10); K.label('GOAL', 880, 1600, 40, P.crimson);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.4, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.25, 'slam', { gain: 0.6 }); cue(mid + len(7) * 0.55 * 0.4, 'tock', { gain: 0.5 }); }

  // 8 · make one video, post in both places
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'one video card in the centre, two dashed routes to REELS and SHORTS phones, ONE VIDEO, TWO PLACES ribbon', draw(lt, d, t) {
      dayPage(12, false);
      vid(540, 600, 0.95 * R2(seg(lt, 0.02, 0.25)));
      K.slip('1 VIDEO', 540, 220, R2(seg(lt, 0.1, 0.3)), -0.03, 80);
      const r = eo(seg(lt, d * 0.3, d * 0.7)); K.dashedRoute([[460, 880], [300, 1000], [250, 1080]], r); K.dashedRoute([[620, 880], [780, 1000], [830, 1080]], r);
      phoneBig(250, 1300, 0.45 * R2(seg(lt, d * 0.5, d * 0.7)), -0.05, () => vid(0, -40, 0.9));
      phoneBig(830, 1300, 0.45 * R2(seg(lt, d * 0.55, d * 0.75)), 0.05, () => vid(0, -40, 0.9, 0, P.stone));
      K.slip('REELS', 250, 1600, R2(seg(lt, d * 0.6, d * 0.8)), -0.04, 56); K.slip('SHORTS', 830, 1600, R2(seg(lt, d * 0.65, d * 0.85)), 0.04, 56);
      K.ribbon('POST BOTH', 540, 1780, R2(seg(lt, d * 0.7, d * 0.95)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(8) * 0.35, 'zip', { gain: 0.4 }); cue(st + len(8) * 0.6, 'pop', { gain: 0.5 }); }

  // 9 · Reels for audience + brands, Shorts for view money
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'split page: left REELS with + followers and a brand DM, right SHORTS with coins', draw(lt, d, t) {
      dayPage(13, false);
      line([[540, 200], [540, 1700]], 'rgba(62,44,30,0.25)', 6);
      const a = R2(seg(lt, 0.02, 0.3)), b = R2(seg(lt, d * 0.45, d * 0.7));
      K.slip('REELS', 280, 300, a, -0.04, 80); plus(180, 680, 1.4 * a); plus(380, 820, 1.2 * a); dm(280, 1120, 0.7 * a, 'BRAND DEAL');
      K.slip('AUDIENCE', 280, 1420, a, -0.03, 64); K.slip('+ BRANDS', 280, 1540, a, 0.02, 64);
      K.slip('SHORTS', 800, 300, b, 0.04, 80); coins(800, 1000, 1.3 * b, 6);
      K.slip('VIEW', 800, 1420, b, 0.03, 64); K.slip('MONEY', 800, 1540, b, -0.02, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(9) * 0.5, 'plop', { gain: 0.6 }); }

  // 10 · loop: Reels or Shorts? both (beat-0 room again)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: both phones glow, the ? turns into a tick, BOTH ribbon', draw(lt, d, t) {
      room(1);
      phoneBig(230, 760, 0.6, -0.08, () => vid(0, -40, 0.9)); K.slip('REELS', 230, 330, 1, -0.05, 70);
      phoneBig(850, 760, 0.6, 0.08, () => vid(0, -40, 0.9, 0, P.stone)); K.slip('SHORTS', 850, 330, 1, 0.05, 70);
      person({ x: 540, y: 1650, h: 620, arm: 60, top: P.royal, glow: eo(seg(lt, d * 0.4, d * 0.7)) });
      bigMark('?', 540, 560, 1 - eo(seg(lt, d * 0.2, d * 0.45)), 0, P.crimson, 240);
      const k = R2(seg(lt, d * 0.4, d * 0.6)); if (k > 0) { ctx.save(); ctx.translate(540, 560); ctx.scale(k, k); cut(P_circ(0, 0, 100), P.green); line([[-45, 0], [-10, 38], [50, -38]], P.edge, 22); ctx.restore(); }
      K.ribbon('BOTH', 540, 1780, R2(seg(lt, d * 0.5, d * 0.8)), 140);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.35, 'zip', { gain: 0.5 }); cue(st + len(10) * 0.5, 'slam', { gain: 0.7 }); }

  // 11 · follow + send to the friend who's still confused
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a video card flies to a friend with a ? who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); vid(lerp(240, 560, f), lerp(1250, 1200, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 0.1 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      bigMark('?', 860, 950, (1 - f) * R2(seg(lt, d * 0.2, d * 0.35)), 0.1, P.crimson, 140);
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
