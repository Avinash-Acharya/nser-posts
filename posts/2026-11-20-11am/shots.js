// 20 Nov 11am: AFFILIATE LINKS: EARNING FROM PRODUCTS YOU ALREADY USE (INDIA). Paper style.
// Facts (Amazon.in Associates Central, opened 19 Nov 2026): homepage "Earn up to 10% in affiliate fees";
// fee schedule (Oct-Nov 2026): Beauty 8%, Apparel/Luggage & Bags/Watches 7.5%, Mobile Phones 1% base;
// Operating Agreement: Session ends 24 hours after the click (cart items added in the session count),
// must disclose "As an Amazon Associate I earn from qualifying purchases", payout once at least INR 1000 (NEFT).
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet, note,
  laptop, clock } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper chain link (two rounded loops) */
function chain(x, y, s, rot = 0, col = P.crimson) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  for (const dx of [-70, 70]) { ctx.save(); ctx.translate(dx, 0); cut(P_rr(-110, -55, 220, 110, 55), col); rr(-70, -22, 140, 44, 22); ctx.fillStyle = P.parch; ctx.fill(); ctx.restore(); }
  ctx.restore(); }
/** a paper bag (tote) */
function bag(x, y, s, rot = 0, col = P.royal) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = P.ink; ctx.lineWidth = 16; ctx.beginPath(); ctx.arc(0, -150, 80, Math.PI, 0); ctx.stroke();
  cut(P_poly([[-170, -150], [170, -150], [200, 170], [-200, 170]]), col); cut(P_rr(-60, -60, 120, 80, 14), P.gold, { shadow: 0.4, edge: 3 }); ctx.restore(); }
/** a shopping cart with n items */
function cart(x, y, s, n = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let k = 0; k < n; k++) cut(P_rr(-150 + k * 100, -190 - (k % 2) * 30, 90, 110, 12), [P.crimson, P.gold, P.royal, P.green][k % 4], { shadow: 0.4, edge: 3 });
  cut(P_poly([[-200, -100], [200, -100], [160, 60], [-170, 60]]), P.stone); line([[-200, -100], [-260, -180], [-320, -180]], P.ink, 14);
  circle(-120, 110, 34, P.ink); circle(120, 110, 34, P.ink); ctx.restore(); }
/** a price tag with text */
function tag(txt, x, y, s, rot = 0, col = P.gold, size = 90) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_poly([[-200, -90], [150, -90], [220, 0], [150, 90], [-200, 90]]), col); circle(150, 0, 18, P.parch); K.label(txt, -30, 4, size, P.edge); ctx.restore(); }
/** a lipstick (beauty) */
function lipstick(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-55, -10, 110, 200, 12), P.ink); cut(P_rr(-45, -90, 90, 90, 8), P.gold, { shadow: 0.4, edge: 3 }); cut(P_poly([[-35, -90], [35, -90], [35, -150], [-35, -190]]), P.crimson); ctx.restore(); }
/** a little phone (mobile) */
function mobile(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-80, -150, 160, 300, 24), '#1F1D1A'); rr(-66, -132, 132, 250, 14); ctx.fillStyle = M.screen; ctx.fill(); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · the things you use every day can earn you money. know how?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator in room, everyday things (bag, lipstick, phone) float up around them, coins drop, crimson ? mark', draw(lt, d, t) {
      room(1);
      person({ x: 300, y: 1650, h: 680, arm: 70, top: M.tee });
      bag(760, 560, 0.7 * R2(seg(lt, 0.05, 0.25)), 0.08 + Math.sin(t * 2) * 0.03);
      lipstick(560, 420, 0.8 * R2(seg(lt, d * 0.15, d * 0.3)), -0.2);
      mobile(860, 950, 0.9 * R2(seg(lt, d * 0.25, d * 0.4)), 0.15);
      coins(700, 1300, 0.8 * R2(seg(lt, d * 0.45, d * 0.6)), 4);
      K.slip('EVERYDAY STUFF', 640, 1450, R2(seg(lt, d * 0.3, d * 0.5)), 0.03, 60);
      bigMark('₹?', 230, 380, R2(seg(lt, d * 0.6, d * 0.8)), Math.sin(t * 3) * 0.06, P.crimson, 220);
      K.ribbon('= MONEY?', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); [0.1, 0.25, 0.35].forEach((a) => cue(st + len(0) * a, 'pop', { gain: 0.45 })); cue(st + len(0) * 0.5, 'plop', { gain: 0.5 }); cue(st + len(0) * 0.7, 'slam', { gain: 0.6 }); }

  // 1 · simply put: affiliate link = special link, someone buys → you get commission
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.45;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, big crimson chain link forms, AFFILIATE LINK ribbon', draw(lt, d, t) {
      dayPage(2, false);
      K.slip('SIMPLY PUT', 540, 300, R2(seg(lt, 0.02, 0.25)), -0.03, 70);
      const f = eo(seg(lt, 0.1, 0.5)); chain(540, 900, 1.6 * R2(seg(lt, 0.08, 0.3)), lerp(-0.6, -0.15, f));
      K.ribbon('AFFILIATE LINK', 540, 1500, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.14, note: 'phone with link, dashed route to a buyer figure, coins fly back to creator, COMMISSION slip', draw(lt, d, t) {
      dayPage(3); ground(1650, M.wall2);
      person({ x: 200, y: 1650, h: 560, arm: 60, top: M.tee });
      person({ x: 880, y: 1650, h: 560, arm: 60, dir: -1, top: P.green });
      chain(540, 600, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.2);
      K.dashedRoute([[300, 900], [540, 760], [800, 900]], eo(seg(lt, 0.15, 0.45)));
      K.slip('BUYS', 840, 840, R2(seg(lt, d * 0.35, d * 0.5)), 0.04, 60);
      const f = eio(seg(lt, 0.5, 0.8)); if (f > 0) coins(lerp(800, 260, f), lerp(1000, 900, f) - Math.sin(f * Math.PI) * 200, 0.5, 3);
      K.ribbon('COMMISSION', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.45 * 0.6, 'slam', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(1) * 0.55 * 0.3, 'zip', { gain: 0.4 }); cue(mid + len(1) * 0.55 * 0.7, 'plop', { gain: 0.5 }); }

  // 2 · Amazon India's affiliate program: up to 10%
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'laptop with generic shop page (boxes), big gold UP TO 10% mark rolls in, AMAZON INDIA slip', draw(lt, d, t) {
      room(4);
      laptop(540, 1350, 1.2 * R2(seg(lt, 0.02, 0.25)), () => { for (let k = 0; k < 3; k++) cut(P_rr(-260 + k * 180, -330, 150, 150, 12), [P.crimson, P.gold, P.royal][k], { shadow: 0.3, edge: 3 }); line([[-260, -120], [260, -120]], 'rgba(62,44,30,0.3)', 14); line([[-260, -80], [120, -80]], 'rgba(62,44,30,0.2)', 14); });
      K.slip('AMAZON INDIA', 540, 300, R2(seg(lt, 0.05, 0.25)), -0.03, 70);
      K.slip('UP TO', 540, 470, R2(seg(lt, d * 0.3, d * 0.45)), 0.03, 64);
      bigMark('10%', 540, 700, R2(seg(lt, d * 0.4, d * 0.65)), -0.04, P.gold, 300);
      K.ribbon('AFFILIATE FEES', 540, 1650, R2(seg(lt, d * 0.55, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.45, 'slam', { gain: 0.7 }); }

  // 3 · each category different: beauty 8%, mobile phones only 1%
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.5;
    add({ id: 'S03a', at: st, cam: [540, 960], zoom: 0.12, note: 'EVERY CATEGORY DIFFERENT slip, lipstick with a gold 8% tag, BEAUTY slip', draw(lt, d, t) {
      dayPage(5, false);
      K.slip('EACH CATEGORY', 540, 280, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      K.slip('DIFFERENT RATE', 540, 400, R2(seg(lt, 0.1, 0.3)), 0.03, 62);
      lipstick(380, 1000, 2.0 * R2(seg(lt, d * 0.12, d * 0.32)), -0.15);
      tag('8%', 740, 900, R2(seg(lt, d * 0.35, d * 0.55)), 0.1, P.gold, 110);
      K.ribbon('BEAUTY', 540, 1600, R2(seg(lt, d * 0.55, d * 0.8)), 120);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 960], zoom: 0.14, note: 'mobile phone with tiny crimson 1% tag, ONLY slip, MOBILE PHONES ribbon', draw(lt, d, t) {
      dayPage(6, false);
      mobile(400, 950, 2.2 * R2(seg(lt, 0.02, 0.25)), 0.1);
      tag('1%', 780, 800, 0.75 * R2(seg(lt, 0.3, 0.5)), -0.1, P.crimson, 110);
      K.slip('ONLY', 780, 620, R2(seg(lt, 0.4, 0.6)), 0.05, 70);
      K.ribbon('MOBILE PHONES', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d3 * 0.5 * 0.6, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(3) * 0.5 * 0.35, 'plop', { gain: 0.5 }); }

  // 4 · you: you made a reel about your favourite bag and shared the link
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator holds bag, big phone shows a reel of the bag with a chain link under it', draw(lt, d, t) {
      room(7);
      person({ x: 220, y: 1650, h: 640, arm: 50, top: M.tee });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      bag(330, 1250, 0.5 * R2(seg(lt, 0.1, 0.3)), 0.1);
      phoneBig(720, 860, 0.95 * R2(seg(lt, d * 0.2, d * 0.45)), 0.04, () => { cut(P_rr(-186, -370, 372, 520, 0), P.sky, { shadow: 0, edge: 0 }); bag(0, -100, 0.7, 0.05); chain(0, 260, 0.5 * R2(seg(lt, d * 0.55, d * 0.75)), -0.1); });
      K.ribbon('REEL + LINK', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(4) * 0.3, 'whoosh', { gain: 0.4 }); cue(st + len(4) * 0.65, 'pop', { gain: 0.5 }); }

  // 5 · a follower buys the bag through that link: 7.5% on bags is yours
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.14, note: 'follower figure taps the link, bag drops into cart, gold 7.5% tag flies to creator wallet, BAGS slip', draw(lt, d, t) {
      dayPage(8); ground(1650, M.wall2);
      person({ x: 820, y: 1650, h: 560, arm: 70, dir: -1, top: P.green });
      K.slip('FOLLOWER', 820, 960, R2(seg(lt, 0.02, 0.2)), 0.04, 56);
      cart(400, 1430, 0.9 * R2(seg(lt, 0.05, 0.25)), 0);
      const f = eio(seg(lt, 0.2, 0.45)); bag(400, lerp(600, 1180, f), 0.5, 0.1 * (1 - f));
      tag('7.5%', 540, 560, R2(seg(lt, d * 0.5, d * 0.7)), -0.06, P.gold, 100);
      K.ribbon('YOURS', 540, 1700, R2(seg(lt, d * 0.6, d * 0.85)), 130);
      K.slip('BAGS', 230, 420, R2(seg(lt, d * 0.45, d * 0.65)), -0.05, 70);
    } });
    cue(st, 'whoosh'); cue(st + len(5) * 0.35, 'thud', { gain: 0.6 }); cue(st + len(5) * 0.55, 'slam', { gain: 0.6 }); cue(st + len(5) * 0.7, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 6 · game changer: whatever goes into the cart within 24h of the click can count
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, clock spins, big gold 24 HRS, CLICK slip with pointing hand', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      clock(540, 800, 1.6 * R2(seg(lt, 0.1, 0.3)), t * 4);
      hand(250, 1200, 0.9 * R2(seg(lt, 0.2, 0.4)), -0.3, true); K.slip('CLICK', 260, 1050, R2(seg(lt, 0.25, 0.45)), -0.04, 64);
      K.ribbon('24 HOURS', 540, 1550, R2(seg(lt, d * 0.5, d * 0.8)), 130);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'cart fills with 4 different items one by one, each gets a small gold tick, CART COUNTS ribbon', draw(lt, d, t) {
      dayPage(10);
      cart(540, 1100, 1.5, Math.floor(4 * clamp(seg(lt, 0.05, 0.75)) + 0.01));
      K.slip('ANYTHING IN CART', 540, 400, R2(seg(lt, 0.05, 0.25)), -0.03, 62);
      K.ribbon('CAN COUNT', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.3, 'tock', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.6, 'slam', { gain: 0.6 });
    cue(mid, 'whoosh'); [0.1, 0.3, 0.5, 0.7].forEach((a) => cue(mid + len(6) * 0.55 * a, 'plop', { gain: 0.45 })); }

  // 7 · most important: you must clearly say it's an affiliate link. Amazon's rule
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'MUST DO slip, post card with a crimson #AFFILIATE LINK sticker slapped on, rule document with seal', draw(lt, d, t) {
      dayPage(11, false);
      K.slip('MOST IMPORTANT', 540, 260, R2(seg(lt, 0.02, 0.25)), -0.03, 66);
      postCard(540, 880, 1.5 * R2(seg(lt, 0.05, 0.3)), -0.03, 0);
      const k = R2(seg(lt, d * 0.35, d * 0.5)); if (k > 0) { ctx.save(); ctx.translate(540, 1150); ctx.rotate(-0.06); ctx.scale(k, k); K.slip('AFFILIATE LINK', 0, 0, 1, 0, 70); ctx.restore(); }
      K.seal(850, 500, 0.8 * R2(seg(lt, d * 0.55, d * 0.7)), 'A');
      K.ribbon('SAY IT CLEARLY', 540, 1650, R2(seg(lt, d * 0.6, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.4, 'slam', { gain: 0.7 }); cue(st + len(7) * 0.6, 'thud', { gain: 0.5 }); }

  // 8 · money comes once at least ₹1,000 has built up
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'coin stack grows toward a dashed crimson ₹1,000 line, wallet opens, PAYOUT slip', draw(lt, d, t) {
      room(12);
      const n = 1 + Math.floor(6 * clamp(seg(lt, 0.05, 0.6)));
      coins(400, 1300, 1.2, n);
      ctx.save(); ctx.setLineDash([22, 14]); line([[180, 1080], [640, 1080]], P.crimson, 8); ctx.restore(); K.label('₹1,000', 410, 1020, 60, P.crimson);
      wallet(800, 1250, 0.8 * R2(seg(lt, d * 0.55, d * 0.75)), true);
      K.slip('PAYOUT', 540, 380, R2(seg(lt, 0.05, 0.25)), -0.03, 80);
      K.ribbon('MIN ₹1,000', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); [0.15, 0.3, 0.45].forEach((a) => cue(st + len(8) * a, 'tock', { gain: 0.45 })); cue(st + len(8) * 0.65, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 9 · so, only link products you really use
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, creator with their own bag + lipstick (green tick), a random gadget gets a crimson cross, USE IT? ribbon', draw(lt, d, t) {
      dayPage(13, false); ground(1650, M.wall2);
      K.slip('STEP 1', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 74);
      person({ x: 230, y: 1650, h: 600, arm: 50, top: M.tee });
      bag(560, 800, 0.6 * R2(seg(lt, 0.1, 0.3)), 0.06); lipstick(820, 820, 0.8 * R2(seg(lt, 0.2, 0.35)), 0.1);
      const k = R2(seg(lt, d * 0.4, d * 0.55)); if (k > 0) { ctx.save(); ctx.translate(690, 1150); ctx.scale(k, k); cut(P_circ(0, 0, 90), P.green); line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); ctx.restore(); }
      K.ribbon('ONLY WHAT YOU USE', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.45, 'sparkle', { dur: 0.5, gain: 0.5 }); }

  // 10 · say where the link is + clearly write it's an affiliate link
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 2 + 3 slips, phone with arrow to LINK slip, then AFFILIATE tag stamped on the screen', draw(lt, d, t) {
      dayPage(14);
      K.slip('STEP 2', 260, 280, R2(seg(lt, 0.02, 0.2)), -0.04, 64);
      K.slip('STEP 3', 820, 280, R2(seg(lt, d * 0.5, d * 0.65)), 0.04, 64);
      phoneBig(540, 960, 0.9 * R2(seg(lt, 0.02, 0.25)), -0.03, () => { cut(P_rr(-186, -370, 372, 480, 0), P.sky, { shadow: 0, edge: 0 }); bag(0, -140, 0.6, 0);
        bubble('Link below', -150, 240, R2(seg(lt, d * 0.2, d * 0.4)), false, 50); });
      K.slip('#AFFILIATE', 540, 1500, R2(seg(lt, d * 0.6, d * 0.8)), -0.04, 76);
      K.ribbon('SAY IT EVERY TIME', 540, 1700, R2(seg(lt, d * 0.7, d * 0.95)), 80);
    } });
    cue(st, 'whoosh'); cue(st + len(10) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.65, 'slam', { gain: 0.6 }); }

  // 11 · loop: your everyday things become your income (beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: bag, lipstick, phone float, each turns into falling coins, creator glows, ₹ in green tick', draw(lt, d, t) {
      room(1);
      person({ x: 300, y: 1650, h: 680, arm: 70, top: M.tee, glow: eo(seg(lt, d * 0.3, d * 0.7)) });
      const g = 1 - eo(seg(lt, d * 0.3, d * 0.6));
      bag(760, 560, 0.7 * g, 0.08); lipstick(560, 420, 0.8 * g, -0.2); mobile(860, 950, 0.9 * g, 0.15);
      coins(700, 1300, 0.8 + 0.3 * eo(seg(lt, d * 0.3, d * 0.7)), 4 + Math.floor(3 * clamp(seg(lt, d * 0.3, d * 0.7))));
      bigMark('₹', 230, 380, R2(seg(lt, d * 0.5, d * 0.7)), 0, P.gold, 240);
      K.ribbon('YOUR INCOME', 540, 1700, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.45, 'plop', { gain: 0.5 }); cue(st + len(11) * 0.6, 'slam', { gain: 0.7 }); }

  // 12 · follow + send to the friend who reviews everything
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a chain link flies to a friend surrounded by products who lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); chain(lerp(220, 600, f), lerp(1250, 1180, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 0.2 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
