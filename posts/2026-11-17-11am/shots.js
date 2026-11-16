// 17 Nov 11am: UGC: GETTING PAID BY INDIAN BRANDS WITHOUT A BIG FOLLOWING. Paper style.
// Facts: Dazzlerr "Rise of UGC creators in India" (Jun 2026); Boss Wallah "UGC video pricing in India" (Oct 2026).
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, laptop, gift, note, coins, magnifier, bigMark,
  hand, rankCard, strike } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a serum bottle with a dropper cap */
function serum(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -120, 120, 220, 26), '#C98B5E'); cut(P_rr(-40, -60, 80, 90, 8), '#FFFBF0', { shadow: 0, edge: 3 });
  cut(P_rr(-22, -170, 44, 54, 8), P.ink, { shadow: 0.3, edge: 3 }); cut(P_circ(0, -200, 30), P.ink, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a vertical video tile (9:16) with a play triangle */
function vid(x, y, s, rot = 0, col = M.screen) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-130, -230, 260, 460, 18), '#FFFBF0'); rr(-110, -210, 220, 420, 10); ctx.fillStyle = col; ctx.fill();
  serum(0, 40, 0.7); cut(P_poly([[-30, -150], [-30, -80], [30, -115]]), P.crimson, { shadow: 0, edge: 0 }); ctx.restore(); }
/** a tiny shop front (a brand) */
function shop(x, y, s, col = P.royal) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-150, -120, 300, 240, 8), '#FFFBF0');
  for (let k = 0; k < 5; k++) cut(P_rr(-170 + k * 68, -190, 68, 80, 4), k % 2 ? '#FFFBF0' : col, { shadow: 0.3, edge: 3 });
  cut(P_rr(-50, -20, 100, 140, 4), P.sepia, { shadow: 0.2, edge: 3 }); ctx.restore(); }
/** a brand page: shop avatar, BRAND name, an AD tag, a big video inside */
function brandPage(x, y, s, vs = 1, ad = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-230, -360, 460, 720, 22), '#FFFBF0'); shop(-150, -280, 0.32, P.wine); K.label('BRAND', 10, -290, 52, P.ink);
  vid(0, 60, 0.95 * vs);
  if (ad > 0) { ctx.save(); ctx.translate(140, -170); ctx.scale(ad, ad); cut(P_rr(-70, -34, 140, 68, 14), P.gold, { shadow: 0.5, edge: 3 }); K.label('AD', 0, 2, 44, P.ink); ctx.restore(); }
  ctx.restore(); }
/** a follower counter card: "0" + FOLLOWERS */
function counter(x, y, s, n = '0') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-200, -110, 400, 220, 20), '#FFFBF0'); K.label(n, 0, -26, 120, P.crimson); K.label('FOLLOWERS', 0, 70, 42, P.ink); ctx.restore(); }
/** a window with light rays */
function windowLight(x, y, s, p = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-160, -220, 320, 440, 10), P.sepia); rr(-140, -200, 280, 400, 6); ctx.fillStyle = '#F6E6B8'; ctx.fill();
  line([[0, -200], [0, 200]], P.sepia, 12); line([[-140, 0], [140, 0]], P.sepia, 12);
  ctx.save(); ctx.globalAlpha = 0.28 * p; ctx.fillStyle = '#F2C14E'; ctx.beginPath(); ctx.moveTo(140, -200); ctx.lineTo(620, 420); ctx.lineTo(620, 900); ctx.lineTo(140, 200); ctx.closePath(); ctx.fill(); ctx.restore(); ctx.restore(); }
/** a small tripod with a phone on top */
function tripod(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line([[0, -300], [-110, 0]], P.ink, 12); line([[0, -300], [110, 0]], P.ink, 12); line([[0, -300], [0, 0]], P.ink, 10);
  cut(P_rr(-46, -420, 92, 150, 12), '#1F1D1A', { shadow: 0.5, edge: 3 }); rr(-36, -410, 72, 128, 6); ctx.fillStyle = M.screen; ctx.fill(); ctx.restore(); }
/** a paper tee and headphones for the 3 products */
function tee(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-60, -110], [-150, -60], [-110, 0], [-80, -20], [-80, 120], [80, 120], [80, -20], [110, 0], [150, -60], [60, -110], [30, -80], [-30, -80]]), P.green); ctx.restore(); }
function phones(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, 0, 100, Math.PI, 0); ctx.lineWidth = 22; ctx.strokeStyle = P.ink; ctx.stroke();
  cut(P_rr(-130, -10, 60, 100, 20), P.royal); cut(P_rr(70, -10, 60, 100, 20), P.royal); ctx.restore(); }
/** rupee range on a gold slip */
const money = (t, x, y, sc, size = 96) => { if (sc > 0) K.slip(t, x, y, sc, -0.02, size); };

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · zero followers, a brand still pays you, how? a creator with phone, 0 FOLLOWERS counter, a rupee note flies in, ?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: '0 FOLLOWERS counter top, creator figure with phone, rupee note flies into hand, big ?', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      counter(540, 330, R2(seg(lt, 0.02, 0.3)));
      person({ x: 360, y: 1650, h: 680, arm: 70, top: P.royal, glow: 0.6 });
      const f = eo(seg(lt, d * 0.3, d * 0.65)); if (f > 0) note(lerp(1150, 560, f), lerp(700, 1050, f), 0.9, lerp(0.6, -0.1, f));
      K.ribbon('BRAND PAYS', 540, 1760, R2(seg(lt, d * 0.4, d * 0.65)), 90);
      bigMark('?', 850, 760, R2(seg(lt, d * 0.65, d * 0.85)), Math.sin(t * 3) * 0.12, P.crimson, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.45, 'zip', { gain: 0.5 }); cue(st + len(0) * 0.65, 'boing', { gain: 0.4 }); }

  // 1 · simply put, UGC = you shoot a short video on your phone, a brand buys it
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.1, note: 'UGC ribbon, a big phone recording a serum video (red rec dot), SHORT VIDEO slip', draw(lt, d, t) {
      dayPage(2, false);
      K.ribbon('UGC', 540, 230, R2(seg(lt, 0.05, 0.3)), 120);
      phoneBig(540, 980, 1.0, -0.03, () => { ctx.fillStyle = M.screen; ctx.fillRect(-200, -380, 400, 760); serum(0, 60, 1.2 * R2(seg(lt, 0.1, 0.4))); circle(-120, -300, 22, Math.sin(t * 8) > 0 ? P.crimson : '#5a2a28'); });
      K.slip('SHORT VIDEO', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), -0.03, 70);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.12, note: 'the video tile travels on a dashed line to a shop (the brand), rupee note travels back, BRAND BUYS slip', draw(lt, d, t) {
      dayPage(3);
      shop(780, 760, 1.2);
      K.dashedRoute([[260, 1100], [520, 900], [700, 860]], eo(seg(lt, 0.05, 0.4)));
      const f = eo(seg(lt, 0.05, 0.45)); vid(lerp(260, 640, f), lerp(1150, 900, f), lerp(0.9, 0.5, f), 0.04);
      const g = eo(seg(lt, d * 0.4, d * 0.75)); if (g > 0) note(lerp(780, 300, g), lerp(1000, 1300, g), 0.8, -0.1);
      K.slip('BRAND BUYS IT', 540, 1600, R2(seg(lt, d * 0.35, d * 0.6)), -0.03, 74);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.5, 'slam', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'slide', { gain: 0.4 }); cue(mid + len(1) * 0.5 * 0.5, 'pop', { gain: 0.5 }); }

  // 2 · runs on the brand's page and ads, not yours: your profile struck, brand page with AD tag
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.1, note: 'left: small YOUR PAGE card crossed out; right: big BRAND page with the video and an AD tag; BRAND\'S ADS ribbon', draw(lt, d, t) {
      dayPage(4, false);
      const a = R2(seg(lt, 0.02, 0.25)); if (a > 0) { ctx.save(); ctx.translate(240, 820); ctx.scale(a * 0.8, a * 0.8); cut(P_rr(-150, -220, 300, 440, 18), '#FFFBF0'); circle(0, -140, 50, P.royal); K.label('YOU', 0, -40, 50, P.ink); rr(-110, 10, 220, 170, 8); ctx.fillStyle = P.stone; ctx.fill(); ctx.restore(); }
      const x = eo(seg(lt, d * 0.25, d * 0.45)); if (x > 0) { line([[130, 660], [130 + 220 * x, 660 + 320 * x]], P.crimson, 16); line([[350, 660], [350 - 220 * x, 660 + 320 * x]], P.crimson, 16); }
      brandPage(720, 960, 0.85 * R2(seg(lt, d * 0.15, d * 0.4)), 1, R2(seg(lt, d * 0.5, d * 0.7)));
      K.ribbon("BRAND'S ADS", 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(2) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(2) * 0.55, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.6, 'slam', { gain: 0.5 }); }

  // 3 · the brand looks at your video, not your followers: magnifier on video, counter struck
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'video tile big centre, magnifier sweeps over it, FOLLOWERS counter top struck through, VIDEO > FOLLOWERS slip', draw(lt, d, t) {
      dayPage(5);
      counter(540, 330, R2(seg(lt, 0.02, 0.25)), '0'); strike(330, 345, 420, eo(seg(lt, d * 0.2, d * 0.4)));
      vid(540, 1000, 1.25, -0.02);
      magnifier(lerp(820, 600, eio(seg(lt, 0.1, 0.6))), lerp(1300, 1000, eio(seg(lt, 0.1, 0.6))), 1.4);
      K.slip('VIDEO > FOLLOWERS', 540, 1650, R2(seg(lt, d * 0.5, d * 0.75)), -0.03, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + len(3) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(3) * 0.55, 'slam', { gain: 0.5 }); }

  // 4 · you: a face serum arrives, you film a 30-second unboxing in window light
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.4;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'room, YOU slip, a parcel drops by the door, opens, serum pops out, FACE SERUM slip', draw(lt, d, t) {
      room(6);
      person({ x: 260, y: 1650, h: 640, arm: 40, top: P.royal });
      const drop = eo(seg(lt, 0.05, 0.35)), open = seg(lt, d * 0.45, d * 0.7);
      if (open < 0.5) gift(720, lerp(600, 1400, drop), 1.2, Math.sin(t * 4) * 0.03);
      serum(720, 1250 - 180 * eo(open), R2(seg(lt, d * 0.45, d * 0.7)) * 1.5);
      K.slip('YOU', 260, 820, R2(seg(lt, 0.1, 0.3)), -0.04, 72);
      K.slip('FACE SERUM', 720, 760, R2(seg(lt, d * 0.6, d * 0.85)), 0.03, 64);
    } });
    add({ id: 'S04b', at: mid, cam: [560, 960], zoom: 0.12, note: 'window with light rays on the left, serum on a table in the light, phone on tripod filming it, gold 30 SEC slip, UNBOXING ribbon', draw(lt, d, t) {
      room(7);
      windowLight(230, 620, 1.0, seg(lt, 0, 0.4));
      cut(P_rr(380, 1250, 460, 34, 6), P.sepia); cut(P_rr(580, 1284, 60, 300, 6), P.sepia);
      serum(560, 1150, 1.0); tripod(860, 1560, 1.1);
      K.slip('30 SEC', 820, 760, R2(seg(lt, d * 0.3, d * 0.55)), 0.04, 84);
      K.ribbon('UNBOXING', 540, 1760, R2(seg(lt, d * 0.5, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.35, 'thud', { gain: 0.5 }); cue(st + d4 * 0.4 * 0.5, 'pop', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'sparkle', { dur: 0.5, gain: 0.4 }); cue(mid + len(4) * 0.6 * 0.4, 'pop', { gain: 0.5 }); }

  // 5 · India: roughly ₹2,500 to ₹4,500 per such video: big gold range, coins stack, PER VIDEO
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'video tile left, coin stack grows right, gold money slip ₹2,500-4,500, PER VIDEO ribbon, small "approx." label', draw(lt, d, t) {
      dayPage(8); ground(1650, M.wall2);
      vid(300, 1100, 1.0, -0.04);
      coins(760, 1500, 1.4, Math.round(1 + 7 * eo(seg(lt, 0.1, 0.7))));
      money('₹2,500 – ₹4,500', 540, 420, R2(seg(lt, d * 0.25, d * 0.5)), 96);
      if (lt > d * 0.45) K.label('approx. · 30-sec unboxing', 540, 560, 40, P.sepia);
      K.ribbon('PER VIDEO', 540, 1760, R2(seg(lt, d * 0.5, d * 0.75)), 96);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 6; k++) cue(st + len(5) * (0.1 + k * 0.1), 'pop', { gain: 0.3 }); cue(st + len(5) * 0.3, 'slam', { gain: 0.6 }); }

  // 6 · game changer: run as a paid ad → charge 20-50% more
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, brand page with the video gets a gold AD tag, megaphone-like rays, PAID AD ribbon', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      brandPage(540, 980, 1.0, 1, R2(seg(lt, d * 0.3, d * 0.55)));
      K.ribbon('PAID AD', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 100);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'big gold +20-50% , rupee notes stack higher, CHARGE MORE ribbon', draw(lt, d, t) {
      dayPage(10); ground(1650, M.wall2);
      for (let k = 0; k < 5; k++) { const s = R2(seg(lt, 0.05 + k * 0.08, 0.3 + k * 0.08)); if (s > 0) note(540, 1520 - k * 60, 1.2 * s, (k % 2 ? 0.04 : -0.04)); }
      money('+20–50%', 540, 620, R2(seg(lt, 0.1, 0.35)), 150);
      K.ribbon('CHARGE MORE', 540, 300, R2(seg(lt, d * 0.4, d * 0.7)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.4, 'pop', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.7 }); for (let k = 0; k < 5; k++) cue(mid + 0.1 + k * 0.1, 'pop', { gain: 0.3 }); }

  // 7 · craziest: a phone, window light and a cheap tripod are enough
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, three items pop in a row with small labels: phone, window, tripod, THAT\'S IT ribbon', draw(lt, d, t) {
      dayPage(11, false);
      K.slip('CRAZIEST PART', 540, 220, R2(seg(lt, 0.02, 0.22)), -0.03, 66);
      const a = R2(seg(lt, 0.1, 0.3)), b = R2(seg(lt, 0.3, 0.5)), c = R2(seg(lt, 0.5, 0.7));
      if (a > 0) { phoneBig(200, 900, 0.45 * a, -0.06); K.label('PHONE', 200, 1160, 46); }
      if (b > 0) { windowLight(540, 880, 0.75 * b, 0); K.label('WINDOW', 540, 1160, 46); }
      if (c > 0) { tripod(870, 1060, 0.85 * c); K.label('TRIPOD', 870, 1160, 46); }
      K.ribbon("THAT'S IT", 540, 1500, R2(seg(lt, d * 0.65, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); [0.12, 0.32, 0.52].forEach((a) => cue(st + a, 'pop', { gain: 0.5 })); cue(st + len(7) * 0.7, 'slam', { gain: 0.6 }); }

  // 8 · 3 things at home, 3 styles: unboxing, problem-solution, review
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.4;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.1, note: '3 THINGS ribbon, serum, tee and headphones pop on a shelf', draw(lt, d, t) {
      room(12);
      K.ribbon('3 THINGS', 540, 300, R2(seg(lt, 0.05, 0.35)), 110);
      cut(P_rr(100, 1180, 880, 36, 6), P.sepia);
      serum(240, 1060, 1.0 * R2(seg(lt, 0.15, 0.4))); tee(540, 1050, 1.0 * R2(seg(lt, 0.3, 0.55))); phones(840, 1080, 1.0 * R2(seg(lt, 0.45, 0.7)));
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.1, note: '3 STYLES ribbon, three rank cards: Unboxing, Problem-solution, Review', draw(lt, d, t) {
      dayPage(13, false); K.ribbon('3 STYLES', 540, 280, R2(seg(lt, 0.02, 0.25)), 110);
      ['Unboxing', 'Problem → fix', 'Review'].forEach((w, k) => { const a = 0.1 + k * 0.15; rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 700 + k * 260 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 640); });
      vid(870, 1640, 0.45 * R2(seg(lt, d * 0.6, d * 0.8)), 0.08);
    } });
    cue(st, 'whoosh'); [0.15, 0.3, 0.45].forEach((a) => cue(st + d8 * 0.4 * a, 'pop', { gain: 0.5 })); cue(mid, 'whoosh'); for (let k = 0; k < 3; k++) cue(mid + 0.1 + k * 0.15, 'pop', { gain: 0.5 }); }

  // 9 · free portfolio page, send to D2C brands on LinkedIn
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.5;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.1, note: 'laptop showing a PORTFOLIO page with 3 video tiles filling in, FREE slip', draw(lt, d, t) {
      dayPage(14); ground(1500, M.wall2);
      laptop(540, 1300, 1.25, () => { K.label('PORTFOLIO', 0, -370, 46, P.ink); for (let k = 0; k < 3; k++) vid(-190 + k * 190, -200, 0.55 * R2(seg(lt, 0.15 + k * 0.12, 0.4 + k * 0.12))); });
      K.ribbon('PORTFOLIO', 540, 300, R2(seg(lt, 0.05, 0.3)), 100);
      K.slip('FREE', 860, 520, R2(seg(lt, d * 0.5, d * 0.75)), 0.05, 80);
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.12, note: 'a message card flies on dashed lines to three shop fronts (D2C brands), PITCH ON LINKEDIN slip, D2C BRANDS ribbon', draw(lt, d, t) {
      dayPage(15, false);
      [[220, 640], [540, 560], [860, 640]].forEach(([x, y], k) => { shop(x, y, 0.75 * R2(seg(lt, 0.05 + k * 0.1, 0.3 + k * 0.1)), [P.wine, P.green, P.royal][k]); K.dashedRoute([[540, 1350], [x, y + 170]], eo(seg(lt, d * 0.3 + k * 0.1, d * 0.6 + k * 0.1))); });
      bubble('My UGC samples', 540, 1300, R2(seg(lt, 0.15, 0.4)), true, 58);
      K.ribbon('D2C BRANDS', 540, 260, R2(seg(lt, 0.05, 0.3)), 100);
      K.slip('PITCH ON LINKEDIN', 540, 1620, R2(seg(lt, d * 0.45, d * 0.7)), -0.03, 66);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + d9 * 0.5 * (0.15 + k * 0.12), 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'plop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(mid + len(9) * 0.5 * (0.3 + k * 0.1), 'zip', { gain: 0.3 }); }

  // 10 · zero followers, income started (loops to beat 0: same set, note now in hand, coins)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 set again: 0 FOLLOWERS counter, creator holding a rupee note, coins beside, INCOME ON ribbon', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      counter(540, 330, 1);
      person({ x: 360, y: 1650, h: 680, arm: 70, top: P.royal, glow: 0.9 });
      note(560, 1050, 0.9, -0.1); coins(820, 1600, 1.0, Math.round(1 + 5 * eo(seg(lt, 0.1, 0.6))));
      K.ribbon('INCOME ON', 540, 1760, R2(seg(lt, d * 0.35, d * 0.65)), 100);
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 4; k++) cue(st + 0.15 + k * 0.12, 'pop', { gain: 0.35 }); cue(st + len(10) * 0.4, 'slam', { gain: 0.6 }); }

  // 11 · follow + send to the friend who says they don't have enough followers
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a video tile flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); vid(lerp(240, 540, f), lerp(1250, 1180, f), 0.45 * R2(seg(lt, d * 0.3, d * 0.5)), 0.05);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
