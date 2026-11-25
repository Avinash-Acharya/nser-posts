// 26 Nov 11am: YOUTUBE SHOPPING AFFILIATE IN INDIA: TAG PRODUCTS, EARN COMMISSION. Paper style.
// Facts (opened 25 Nov 2026): Google India blog "The YouTube Shopping affiliate program arrives in India" (25 Oct 2024):
// starts "with Flipkart ... and Myntra"; tag products in videos, Shorts and livestreams; "65% of consumers in metro
// cities find YouTube creators more trustworthy" than celebrities (Google/Temasek/Bain report cited there).
// YouTube Help 13376398: commission when "a viewer clicks on your tagged product and makes a purchase on the
// retailer's site", rate set by the retailer; paid via AdSense "within 60 to 120 days after purchase", returns reverse
// it; affiliate links shared off YouTube can get affiliate features suspended; eligibility: YPP, India, not a music /
// Official Artist Channel, not Made for Kids; creators are "invited". YouTube Help 12257682: videos, Shorts, live.
// "Tag only what you use" + loop line are nser's advice. No real person, no logos (retailer names on slips only).
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, note, wallet, strike, rankCard, gift } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper sneaker */
function shoe(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(-170, 40); ctx.lineTo(-160, -60); ctx.quadraticCurveTo(-100, -90, -60, -40); ctx.quadraticCurveTo(40, -20, 150, 0); ctx.quadraticCurveTo(185, 20, 170, 40); ctx.closePath(); }, P.crimson);
  cut(P_rr(-180, 30, 360, 34, 14), '#F7EFDC', { shadow: 0.4, edge: 3 });
  for (let k = 0; k < 3; k++) line([[-80 + k * 32, -50 + k * 6], [-60 + k * 32, -30 + k * 6]], '#F7EFDC', 7); ctx.restore(); }
/** a product tag chip: small bag icon + text */
function tagChip(text, x, y, sc, hot = 0) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = '700 44px Caladea';
  const w = ctx.measureText(text).width + 130; cut(P_rr(-w / 2, -48, w, 96, 48), hot ? P.gold : '#FFFBF0', { shadow: 0.5, edge: 4 });
  cut(P_rr(-w / 2 + 26, -24, 50, 48, 8), P.crimson, { shadow: 0, edge: 2 }); ctx.strokeStyle = P.edge; ctx.lineWidth = 5; ctx.beginPath(); ctx.arc(-w / 2 + 51, -24, 14, Math.PI, 0); ctx.stroke();
  ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, -w / 2 + 96, 4); ctx.restore(); }
/** a shopping bag */
function bag(x, y, s, rot = 0, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.strokeStyle = P.sepia; ctx.lineWidth = 14; ctx.beginPath(); ctx.arc(0, -120, 60, Math.PI, 0); ctx.stroke();
  cut(P_poly([[-130, -120], [130, -120], [150, 130], [-150, 130]]), col); ctx.restore(); }
/** a play-button video card */
function videoCard(x, y, s, rot = 0, col = P.sea) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-200, -120, 400, 240, 20), col); cut(P_poly([[-36, -50], [-36, 50], [50, 0]]), P.edge, { shadow: 0.3, edge: 0 }); ctx.restore(); }
/** a calendar page with a gold value */
function calendar(x, y, s, val, top, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-210, -170, 420, 340, 20), '#FFFBF0'); cut(P_rr(-210, -170, 420, 100, 20), P.crimson, { shadow: 0, edge: 0 }); cut(P_rr(-210, -100, 420, 30, 0), P.crimson, { shadow: 0, edge: 0 });
  K.label(top, 0, -118, 40, P.edge); K.label(val, 0, 50, 90, P.gold); ctx.restore(); }
/** the Short on a phone: sneaker + product tag under it; tap 0..1 lights the tag */
function shortPhone(x, y, s, rot = 0, tagIn = 1, tap = 0) { phoneBig(x, y, s, rot, () => {
  ctx.fillStyle = P.sea; ctx.fillRect(-186, -370, 372, 740); cut(P_rr(-186, -370, 372, 90, 0), P.crimson, { shadow: 0, edge: 0 }); K.label('SHORTS', 0, -322, 36, P.edge);
  shoe(0, -40, 0.9); tagChip('SHOES', 0, 220, 1.1 * R2(tagIn), tap > 0 ? 1 : 0); }); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · you show products, only the brand earns? now you can earn on YouTube too
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator holds up a sneaker, coins fly to a BRAND bag on the right: ONLY THE BRAND slip', draw(lt, d, t) {
      room(1);
      person({ x: 250, y: 1650, h: 620, arm: 110, top: M.tee, phone: false });
      shoe(330, 760, 0.8 * R2(seg(lt, 0.02, 0.2)), -0.15);
      bag(800, 1100, 1.1 * R2(seg(lt, 0.1, 0.3)), 0.04); K.slip('BRAND', 800, 1150, R2(seg(lt, 0.15, 0.35)), 0.03, 56);
      for (let k = 0; k < 4; k++) { const u = clamp(seg(lt, d * (0.25 + k * 0.08), d * (0.45 + k * 0.08))); if (u > 0 && u < 1) circle(lerp(380, 800, eo(u)), lerp(800, 980, eo(u)) - 200 * Math.sin(u * Math.PI), 30, P.gold); }
      K.slip('ONLY THE BRAND?', 540, 360, R2(seg(lt, d * 0.55, d * 0.75)), -0.03, 70);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'big play-button video card, coins stack up beside the creator: YOU EARN TOO ribbon', draw(lt, d, t) {
      dayPage(2);
      videoCard(540, 620, 1.3 * R2(seg(lt, 0.02, 0.2)), -0.03, P.crimson);
      coins(780, 1250, 1.0 * R2(seg(lt, d * 0.2, d * 0.4)), 1 + Math.floor(5 * seg(lt, d * 0.2, d * 0.7)));
      person({ x: 300, y: 1450, h: 520, arm: 70, top: M.tee, glow: eo(seg(lt, d * 0.3, d * 0.6)) });
      K.ribbon('YOU EARN TOO', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); [0.3, 0.38, 0.46].forEach((a) => cue(st + d0 * 0.5 * a, 'pop', { gain: 0.3 })); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'sparkle', { gain: 0.5 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.7 }); }

  // 1 · simply put: tag products in your video, earn commission when they sell
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, video card gets a product tag chip stuck on: TAG ribbon', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      videoCard(540, 820, 1.4 * R2(seg(lt, 0.05, 0.25)), 0.02);
      const f = seg(lt, d * 0.3, d * 0.55), sc = f <= 0 ? 0 : lerp(2, 1.3, eo(f)); tagChip('PRODUCT', 540, 1110, sc);
      K.ribbon('TAG IT', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a sale: bag drops, a rupee note flies to your wallet: COMMISSION ribbon', draw(lt, d, t) {
      nightPage(4);
      bag(300, 760, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05); K.slip('SALE', 300, 800, R2(seg(lt, 0.1, 0.3)), -0.04, 60);
      wallet(760, 1150, 1.0 * R2(seg(lt, 0.1, 0.3)), seg(lt, d * 0.3, d * 0.5));
      const f = eo(seg(lt, d * 0.3, d * 0.65)); if (f > 0) note(lerp(300, 760, f), lerp(760, 1050, f) - 220 * Math.sin(f * Math.PI), 0.8, lerp(-0.4, 0, f));
      K.ribbon('COMMISSION', 540, 1600, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.45, 'thud', { gain: 0.6 }); cue(st + d1 * 0.5 * 0.7, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d1 * 0.5 * 0.5, 'zip', { gain: 0.5 }); cue(mid + d1 * 0.5 * 0.7, 'slam', { gain: 0.7 }); }

  // 2 · India: October 2024, starting with Flipkart and Myntra
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'gold OCT 2024 calendar, two shop bags pop with FLIPKART and MYNTRA slips (names only, no logos)', draw(lt, d, t) {
      dayPage(5); ground(1450, M.wall2);
      calendar(540, 520, 1.1 * R2(seg(lt, 0.02, 0.22)), 'OCT 2024', 'INDIA', -0.03);
      bag(290, 1220, 1.0 * R2(seg(lt, d * 0.4, d * 0.55)), -0.06, P.royal); K.slip('FLIPKART', 290, 1420, R2(seg(lt, d * 0.45, d * 0.6)), -0.04, 58);
      bag(790, 1220, 1.0 * R2(seg(lt, d * 0.6, d * 0.75)), 0.06, P.crimson); K.slip('MYNTRA', 790, 1420, R2(seg(lt, d * 0.65, d * 0.8)), 0.04, 58);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.6 }); cue(st + len(2) * 0.45, 'pop', { gain: 0.5 }); cue(st + len(2) * 0.65, 'pop', { gain: 0.5 }); }

  // 3 · tags in long videos, Shorts and live streams
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'three cards pop: VIDEO (landscape), SHORTS (tall), LIVE (red dot), each with a tag chip: ALL 3 ribbon', draw(lt, d, t) {
      room(6);
      const a = (k) => R2(seg(lt, 0.02 + d * k * 0.2, 0.22 + d * k * 0.2));
      videoCard(300, 520, 0.95 * a(0), -0.05); K.slip('VIDEO', 300, 700, a(0), -0.04, 54);
      phoneBig(780, 760, 0.55 * a(1), 0.05, () => { ctx.fillStyle = P.sea; ctx.fillRect(-186, -370, 372, 740); shoe(0, 0, 0.8); }); K.slip('SHORTS', 780, 1060, a(1), 0.04, 54);
      videoCard(320, 1080, 0.95 * a(2), 0.04, P.stoneDark); if (a(2) > 0) { circle(180, 1010, 20 * a(2), P.crimson); K.label('LIVE', 250, 1012, 34 * a(2), P.edge); } K.slip('LIVE', 320, 1260, a(2), -0.04, 54);
      tagChip('TAG', 540, 1450, R2(seg(lt, d * 0.6, d * 0.75)) * 0.9, 1);
      K.ribbon('ALL 3', 540, 1640, R2(seg(lt, d * 0.7, d * 0.95)), 100);
    } });
    [0.05, 0.25, 0.45].forEach((a) => cue(st + len(3) * a, 'pop', { gain: 0.5 })); cue(st, 'whoosh'); cue(st + len(3) * 0.7, 'slam', { gain: 0.6 }); }

  // 4 · you: a Short on your favourite shoes, tag below
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 960], zoom: 0.14, note: 'you in room filming a big sneaker, then the Shorts phone shows the shoe with SHOES tag chip', draw(lt, d, t) {
      room(7);
      person({ x: 220, y: 1650, h: 600, arm: 85, top: M.hoodie, glow: 0.8 });
      shoe(420, 1150, 0.6 * R2(seg(lt, 0.02, 0.2)), -0.2);
      shortPhone(700, 860, 0.95 * R2(seg(lt, d * 0.2, d * 0.4)), 0.04, seg(lt, d * 0.5, d * 0.7));
      K.slip('YOUR SHORT', 700, 330, R2(seg(lt, d * 0.3, d * 0.5)), 0.03, 62);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + len(4) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(4) * 0.55, 'tock', { gain: 0.6 }); }

  // 5 · a viewer taps, buys on the retailer site, your commission is made
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'a paper hand taps the SHOES tag on the Shorts phone; tag lights gold: TAP slip', draw(lt, d, t) {
      dayPage(8);
      const tp = seg(lt, d * 0.4, d * 0.55);
      shortPhone(540, 860, 1.05, -0.02, 1, tp);
      hand(lerp(900, 600, eo(seg(lt, d * 0.1, d * 0.42))), 1230, 1, -0.4, true);
      K.slip('TAP', 820, 1500, R2(seg(lt, d * 0.45, d * 0.6)), 0.04, 80);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'dashed route from phone to a RETAILER shop card, BOUGHT tick, gold coins pour to you: +COMMISSION ribbon', draw(lt, d, t) {
      nightPage(9);
      phoneBig(200, 700, 0.42, -0.05, () => { ctx.fillStyle = P.sea; ctx.fillRect(-186, -370, 372, 740); shoe(0, 0, 0.8); });
      K.dashedRoute([[290, 700], [540, 560], [800, 700]], eo(seg(lt, 0.05, d * 0.35)));
      const s = R2(seg(lt, d * 0.25, d * 0.4)); if (s > 0) { ctx.save(); ctx.translate(820, 760); ctx.scale(s, s); cut(P_rr(-170, -150, 340, 300, 20), '#FFFBF0'); cut(P_rr(-170, -150, 340, 80, 20), P.royal, { shadow: 0, edge: 0 }); K.label('RETAILER', 0, -108, 40, P.edge); bag(0, 70, 0.5, 0, P.gold); ctx.restore(); }
      K.slip('BOUGHT', 820, 980, R2(seg(lt, d * 0.4, d * 0.55)), 0.04, 60);
      coins(540, 1420, 1.0 * R2(seg(lt, d * 0.5, d * 0.65)), 1 + Math.floor(5 * seg(lt, d * 0.5, d * 0.9)));
      K.ribbon('+ COMMISSION', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 96);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.45, 'tock', { gain: 0.7 }); cue(st + d5 * 0.45 * 0.5, 'sparkle', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.55 * 0.2, 'zip', { gain: 0.5 }); cue(mid + d5 * 0.55 * 0.45, 'pop', { gain: 0.5 }); cue(mid + d5 * 0.55 * 0.65, 'slam', { gain: 0.8 }); }

  // 6 · game changer: 65% in metro cities trust creators more than celebrities
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.4;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, city skyline-style row of people, most glow toward a creator figure: METRO CITIES slip', draw(lt, d, t) {
      nightPage(10);
      K.slip('GAME CHANGER', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      [120, 300, 480, 660, 840, 1000].forEach((x, k) => person({ x, y: 1500, h: 380, arm: 40, top: [M.tee, M.hoodie2, P.royal, M.hoodie, P.wine, P.stoneDark][k], glow: k < 4 ? eo(seg(lt, d * (0.3 + k * 0.08), d * (0.45 + k * 0.08))) : 0 }));
      K.slip('METRO CITIES', 540, 1620, R2(seg(lt, d * 0.4, d * 0.6)), 0.03, 64);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'giant gold 65% count-up, CREATOR vs CELEB cards, crimson tick on CREATOR: TRUST ribbon', draw(lt, d, t) {
      dayPage(11, false);
      bigMark(Math.round(65 * eo(seg(lt, 0.05, d * 0.4))) + '%', 540, 620, R2(seg(lt, 0.02, 0.2)), -0.05, P.gold, 300);
      rankCard('✓', 'CREATORS', 540, 1000, R2(seg(lt, d * 0.35, d * 0.5)), -0.02, 620);
      rankCard('2', 'CELEBS', 540, 1180, R2(seg(lt, d * 0.45, d * 0.6)), 0.02, 620);
      K.ribbon('MORE TRUST', 540, 1520, R2(seg(lt, d * 0.6, d * 0.9)), 100);
      K.slip('Google blog', 540, 1700, R2(seg(lt, d * 0.7, d * 0.9)), 0, 44);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.38, 0.46, 0.54].forEach((a) => cue(st + d6 * 0.4 * a, 'sparkle', { gain: 0.3 })); cue(mid, 'whoosh'); cue(mid + d6 * 0.6 * 0.4, 'slam', { gain: 0.8 }); cue(mid + d6 * 0.6 * 0.55, 'pop', { gain: 0.5 }); }

  // 7 · paid via AdSense, 60-120 days after purchase; return = commission back
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.55;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'ADSENSE slip, calendar 60-120 DAYS flips, wallet fills', draw(lt, d, t) {
      dayPage(12);
      K.slip('VIA ADSENSE', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      calendar(540, 780, 1.2 * R2(seg(lt, 0.1, 0.3)), '60-120', 'DAYS LATER', 0.03);
      wallet(540, 1350, 0.9 * R2(seg(lt, d * 0.5, d * 0.65)), seg(lt, d * 0.6, d * 0.8));
      if (seg(lt, d * 0.7, d) > 0) note(540, 1230 - 60 * eo(seg(lt, d * 0.7, d)), 0.6, 0.1);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'parcel goes back along a dashed route: RETURN slip, a coin flies out of the wallet: COMMISSION BACK slip', draw(lt, d, t) {
      room(13);
      const f = eo(seg(lt, 0.05, d * 0.5)); gift(lerp(300, 820, f), 900, 0.9, lerp(0, 0.3, f)); K.dashedRoute([[260, 1000], [540, 1080], [860, 1000]], f);
      K.slip('RETURN', 540, 420, R2(seg(lt, 0.05, 0.25)), -0.03, 70);
      wallet(300, 1300, 0.8, 1); const u = seg(lt, d * 0.5, d * 0.85); if (u > 0 && u < 1) circle(lerp(300, 820, eo(u)), 1200 - 200 * Math.sin(u * Math.PI), 32, P.gold);
      K.slip('COMMISSION BACK', 540, 1600, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d7 * 0.55 * 0.3, 'tock', { gain: 0.6 }); cue(st + d7 * 0.55 * 0.65, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d7 * 0.45 * 0.3, 'zip', { gain: 0.5 }); cue(mid + d7 * 0.45 * 0.6, 'thud', { gain: 0.6 }); }

  // 8 · craziest: share links outside YouTube → affiliate features can be suspended
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.5;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, a link chip leaves the YouTube video card and flies to a random chat bubble outside', draw(lt, d, t) {
      nightPage(14);
      K.slip('CRAZIEST PART', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      videoCard(320, 760, 1.0 * R2(seg(lt, 0.05, 0.2)), -0.04, P.crimson);
      bubble('Buy here!', 560, 1250, R2(seg(lt, d * 0.5, d * 0.7)), false, 64);
      const f = eo(seg(lt, d * 0.25, d * 0.65)); tagChip('LINK', lerp(320, 760, f), lerp(940, 1250, f), 0.9);
      K.slip('OUTSIDE YOUTUBE', 540, 1550, R2(seg(lt, d * 0.65, d * 0.85)), 0.03, 60);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: 'tag chip gets struck out crimson, big X stamp, SUSPENDED ribbon', draw(lt, d, t) {
      dayPage(15);
      tagChip('AFFILIATE', 540, 620, 1.4 * R2(seg(lt, 0.02, 0.2)));
      strike(300, 640, 480, seg(lt, d * 0.2, d * 0.35));
      bigMark('✕', 540, 1060, R2(seg(lt, d * 0.3, d * 0.5)), -0.08, P.crimson, 360);
      K.ribbon('CAN BE SUSPENDED', 540, 1520, R2(seg(lt, d * 0.5, d * 0.8)), 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d8 * 0.5 * 0.4, 'zip', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d8 * 0.5 * 0.28, 'zip', { gain: 0.5 }); cue(mid + d8 * 0.5 * 0.4, 'slam', { gain: 0.8 }); }

  // 9 · what to do: get into YPP; music and made-for-kids channels not eligible
  { const st = cs(9), d9 = len(9), mid = st + d9 * 0.45;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: '1 PARTNER PROGRAM card, a creator steps through a gold door marked YPP', draw(lt, d, t) {
      dayPage(16);
      rankCard(1, 'PARTNER PROGRAM', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 780);
      const s = R2(seg(lt, 0.1, 0.3)); if (s > 0) { ctx.save(); ctx.translate(620, 1100); ctx.scale(s, s); cut(P_rr(-200, -500, 400, 560, 200), P.gold); cut(P_rr(-150, -440, 300, 500, 150), P.sepia, { shadow: 0, edge: 3 }); K.label('YPP', 0, -560, 70, P.ink); ctx.restore(); }
      person({ x: lerp(220, 560, eo(seg(lt, d * 0.3, d * 0.9))), y: 1650, h: 560, arm: 30, top: M.tee, phone: false, walk: t * 8 });
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.16, note: 'two cards struck out: MUSIC (music note) and MADE FOR KIDS (toy block): NOT ELIGIBLE ribbon', draw(lt, d, t) {
      room(17);
      const a = R2(seg(lt, 0.02, 0.2)), b = R2(seg(lt, d * 0.2, d * 0.4));
      if (a > 0) { ctx.save(); ctx.translate(290, 800); ctx.scale(a, a); cut(P_rr(-190, -220, 380, 440, 20), '#FFFBF0'); cut(P_circ(-40, 60, 50), P.royal); cut(P_rr(0, -120, 22, 180, 6), P.royal, { shadow: 0, edge: 2 }); cut(P_poly([[0, -120], [90, -90], [90, -50], [22, -80]]), P.royal, { shadow: 0, edge: 2 }); K.label('MUSIC', 0, 170, 50, P.ink); ctx.restore(); }
      if (b > 0) { ctx.save(); ctx.translate(790, 800); ctx.scale(b, b); cut(P_rr(-190, -220, 380, 440, 20), '#FFFBF0'); cut(P_rr(-80, -100, 160, 160, 12), P.gold); K.label('A', 0, -20, 90, P.crimson); K.label('KIDS', 0, 170, 50, P.ink); ctx.restore(); }
      strike(110, 820, 360, seg(lt, d * 0.4, d * 0.5)); strike(610, 820, 360, seg(lt, d * 0.5, d * 0.6));
      K.ribbon('NOT ELIGIBLE', 540, 1500, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d9 * 0.45 * 0.3, 'sparkle', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.4 }); cue(mid + d9 * 0.55 * 0.25, 'pop', { gain: 0.4 }); [0.45, 0.55].forEach((a) => cue(mid + d9 * 0.55 * a, 'zip', { gain: 0.5 })); cue(mid + d9 * 0.55 * 0.7, 'slam', { gain: 0.7 }); }

  // 10 · join when invited; tag only what you actually use
  { const st = cs(10), d10 = len(10), mid = st + d10 * 0.45;
    add({ id: 'S10a', at: st, cam: [540, 960], zoom: 0.12, note: '2 JOIN card, an envelope INVITE opens on a phone, JOIN button pressed', draw(lt, d, t) {
      nightPage(18);
      rankCard(2, 'INVITE', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 560);
      phoneBig(540, 960, 0.95 * R2(seg(lt, 0.05, 0.2)), 0.02, () => { cut(P_rr(-186, -370, 372, 90, 0), P.royal, { shadow: 0, edge: 0 }); K.label('INVITED!', 0, -322, 38, P.edge);
        const pr = seg(lt, d * 0.55, d * 0.7); cut(P_rr(-150, 40, 300, 110, 55), pr > 0 ? P.gold : P.crimson, { shadow: 0.4, edge: 3 }); K.label('JOIN', 0, 98, 54, P.edge); });
      hand(lerp(880, 620, eo(seg(lt, d * 0.3, d * 0.58))), 1260, 1, -0.4, true);
    } });
    add({ id: 'S10b', at: mid, cam: [540, 960], zoom: 0.16, note: '3 WHAT YOU USE card, your own sneaker gets a gold tag chip and a tick: REAL USE ribbon', draw(lt, d, t) {
      dayPage(19);
      rankCard(3, 'WHAT YOU USE', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 700);
      shoe(540, 820, 1.4 * R2(seg(lt, 0.1, 0.3)), -0.05);
      tagChip('MY PICK', 540, 1080, R2(seg(lt, d * 0.3, d * 0.5)) * 1.1, 1);
      bigMark('✓', 840, 640, R2(seg(lt, d * 0.45, d * 0.6)), 0.1, P.crimson, 260);
      K.ribbon('REAL USE ONLY', 540, 1520, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d10 * 0.45 * 0.6, 'tock', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d10 * 0.55 * 0.4, 'pop', { gain: 0.5 }); cue(mid + d10 * 0.55 * 0.55, 'thud', { gain: 0.6 }); }

  // 11 · loop: earn from what you already show (back to beat-0 creator + sneaker, now coins to YOU)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room again: creator holds sneaker, coins now fly to the creator: SHOW + EARN ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 300, y: 1650, h: 620, arm: 110, top: M.tee, phone: false });
      shoe(380, 760, 0.8 * R2(seg(lt, 0.02, 0.2)), -0.15);
      coins(780, 1350, 1.0, 1 + Math.floor(5 * seg(lt, d * 0.2, d * 0.7)));
      K.ribbon('SHOW + EARN', 540, 400, R2(seg(lt, d * 0.4, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); [0.25, 0.35, 0.45].forEach((a) => cue(st + len(11) * a, 'pop', { gain: 0.4 })); cue(st + len(11) * 0.5, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend who shows products on YouTube
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a video card and shop bag, handle slip', draw(lt, d, t) {
      dayPage(20); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      videoCard(300, 1160, 0.7 * R2(seg(lt, d * 0.3, d * 0.45)), -0.1, P.crimson);
      bag(300, 1420, 0.6 * R2(seg(lt, d * 0.4, d * 0.55)), 0.05);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
