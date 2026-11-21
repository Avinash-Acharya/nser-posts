// 22 Nov 11am: ASCI DISCLOSURE RULES: HOW TO TAG #AD THE RIGHT WAY IN INDIA. Paper style.
// Facts (opened 21 Nov 2026): ASCI "Guidelines for Influencer Advertising in Digital Media" (PDF, 2023 upload):
// material connection includes money, gifts, trips and "free products with or without any conditions attached including
// those received unsolicited"; labels: Advertisement, Ad, Sponsored, Collaboration, Partnership, Employee, Free gift,
// Affiliate; "should not be buried in a group of hashtags or links"; not enough in bio, at the end of a post or behind
// MORE; video label: <=15 s at least 3 s, 15 s - 2 min one third of the length; live: announce at start and end;
// "Using a platform's disclosure tool should be considered in addition to an influencer's own disclosure."
// ASCI's Guide For Influencers (2024): on Reels/Stories, put the label on the video itself if no caption is visible.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, gift,
  laptop, clock, magnifier } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a serum bottle */
function serum(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -120, 120, 220, 26), '#C98B5E'); cut(P_rr(-40, -60, 80, 90, 8), '#FFFBF0', { shadow: 0, edge: 3 });
  cut(P_rr(-22, -170, 44, 54, 8), P.ink, { shadow: 0.3, edge: 3 }); cut(P_circ(0, -200, 30), P.ink, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a label chip (rounded tag with text) */
function chip(txt, x, y, s, rot = 0, col = P.crimson, size = 60) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.font = `700 ${size}px Caladea`; const w = ctx.measureText(txt).width + 70;
  cut(P_rr(-w / 2, -size * 0.8, w, size * 1.6, 20), col); K.label(txt, 0, 4, size, P.parch); ctx.restore(); }
/** a plane ticket */
function ticket(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -80, 300, 160, 14), P.royal); cut(P_rr(60, -80, 6, 160, 0), P.parch, { shadow: 0, edge: 0 });
  cut(P_poly([[-90, 10], [10, -30], [30, -20], [-40, 20], [0, 40], [-10, 50], [-60, 30], [-90, 30]]), P.parch, { shadow: 0, edge: 2 }); K.label('TRIP', 110, 6, 34, P.parch); ctx.restore(); }
/** a reel screen with a creator holding a bottle; label = text overlaid on the video (0 = none) */
function reelScreen(lab = 0, col = P.royal) {
  cut(P_rr(-186, -370, 372, 740, 0), col, { shadow: 0, edge: 0 });
  person({ x: -40, y: 330, h: 520, arm: 50, top: M.tee }); serum(90, 40, 0.55);
  if (lab > 0) chip('#AD', -90, -270, lab, -0.05, P.crimson, 56);
}
/** a red LIVE pill with a dot */
function livePill(x, y, s, t) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-130, -50, 260, 100, 50), P.crimson); circle(-80, 0, 18 + 4 * Math.sin(t * 6), P.parch); K.label('LIVE', 25, 4, 58, P.parch); ctx.restore(); }
/** a tick mark */
function tick(x, y, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 70), P.green); line([[-32, 0], [-8, 26], [36, -26]], P.parch, 16); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · brand sent a free product, you made a reel, no "ad"? breaks ASCI rules
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'gift box drops at creator, opens to a serum, phone shows reel, FREE slip', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      gift(650, 1390, 1.1 * R2(seg(lt, 0.02, 0.2)), 0.05);
      serum(650, 980 - 120 * eo(seg(lt, d * 0.3, d * 0.55)), 1.1 * R2(seg(lt, d * 0.3, d * 0.5)), 0.08);
      K.slip('FREE PRODUCT', 650, 520, R2(seg(lt, d * 0.2, d * 0.4)), 0.04, 66);
      K.ribbon('NEW REEL', 540, 1720, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.14, note: 'phone with the reel, empty dashed #AD spot, crimson ?, ASCI RULES ribbon', draw(lt, d, t) {
      dayPage(2, false);
      phoneBig(540, 880, 0.95 * R2(seg(lt, 0.02, 0.2)), -0.03, () => reelScreen(0));
      ctx.save(); ctx.setLineDash([16, 12]); ctx.lineWidth = 6; ctx.strokeStyle = P.crimson; rr(300, 440, 200, 90, 18); ctx.stroke(); ctx.restore();
      bigMark('?', 860, 560, R2(seg(lt, 0.2, 0.4)), 0.08, P.crimson, 300);
      K.slip('NO #AD', 220, 1380, R2(seg(lt, 0.15, 0.35)), -0.05, 66);
      K.ribbon('BREAKS ASCI RULES', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 84);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.5 * 0.1, 'thud', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.4, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(0) * 0.5 * 0.5, 'slam', { gain: 0.7 }); }

  // 1 · simply put: any connection with the brand (money, gift, trip) = must say so
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, creator and brand shop linked by dashed route; coins, gift, ticket pop on it; SAY SO ribbon', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      person({ x: 200, y: 1250, h: 520, arm: 40, top: M.tee });
      const b = R2(seg(lt, 0.05, 0.22)); if (b > 0) { ctx.save(); ctx.translate(850, 1250); ctx.scale(b, b); cut(P_rr(-130, -380, 260, 380, 10), P.royal); cut(P_poly([[-160, -380], [160, -380], [130, -460], [-130, -460]]), P.crimson); K.label('BRAND', 0, -300, 50, P.parch); ctx.restore(); }
      K.dashedRoute([[280, 900], [540, 780], [760, 900]], eo(seg(lt, 0.15, 0.4)));
      coins(330, 640, 0.6 * R2(seg(lt, d * 0.3, d * 0.42)), 3);
      gift(540, 700, 0.6 * R2(seg(lt, d * 0.42, d * 0.54)));
      ticket(760, 600, 0.7 * R2(seg(lt, d * 0.54, d * 0.66)), 0.1);
      K.ribbon('ANY LINK = SAY IT', 540, 1600, R2(seg(lt, d * 0.65, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); [0.32, 0.44, 0.56].forEach((a) => cue(st + len(1) * a, 'pop', { gain: 0.45 })); cue(st + len(1) * 0.7, 'slam', { gain: 0.6 }); }

  // 2 · free product counts too, even if you never asked
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'surprise parcel at the door (never asked), gold seal COUNTS, crossed "I ASKED" bubble', draw(lt, d, t) {
      room(4);
      cut(P_rr(620, 700, 300, 700, 8), M.wall2 || P.stoneDark); circle(660, 1060, 14, P.gold);
      gift(470, 1390, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.04);
      bubble('I never asked!', 120, 600, R2(seg(lt, 0.2, 0.4)), false, 58);
      K.seal(780, 480, 0.9 * R2(seg(lt, d * 0.45, d * 0.6)), 'OK');
      K.ribbon('STILL COUNTS', 540, 1650, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.15, 'thud', { gain: 0.5 }); cue(st + len(2) * 0.3, 'plop', { gain: 0.5 }); cue(st + len(2) * 0.55, 'slam', { gain: 0.7 }); }

  // 3 · the labels: Ad, Sponsored, Collaboration, Partnership, Free gift, Affiliate
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'six label chips pop one by one in a column, LABELS slip on top', draw(lt, d, t) {
      dayPage(5, false);
      K.slip('THE LABELS', 540, 260, R2(seg(lt, 0.02, 0.18)), -0.03, 70);
      const labs = ['AD', 'SPONSORED', 'COLLABORATION', 'PARTNERSHIP', 'FREE GIFT', 'AFFILIATE'], cols = [P.crimson, P.royal, P.green, P.wine, P.gold, P.royal];
      labs.forEach((w, k) => chip(w, 540 + (k % 2 ? 90 : -90), 480 + k * 210, R2(seg(lt, d * (0.08 + k * 0.13), d * (0.2 + k * 0.13))), (k % 2 ? 0.03 : -0.03), cols[k], 62));
    } });
    [0.1, 0.23, 0.36, 0.49, 0.62, 0.75].forEach((a) => cue(st + len(3) * a, 'pop', { gain: 0.45 })); cue(st, 'whoosh'); }

  // 4 · you: free serum reel, #ad hidden among 20 hashtags → won't fly
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, phone with serum reel, caption box below fills with a pile of hashtags, gold 20', draw(lt, d, t) {
      dayPage(6);
      K.slip('YOU', 160, 280, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      phoneBig(540, 780, 0.75 * R2(seg(lt, 0.05, 0.22)), 0.02, () => reelScreen(0, P.wine));
      const n = Math.floor(20 * clamp(seg(lt, d * 0.3, d * 0.9)));
      for (let k = 0; k < n; k++) { const cx = 180 + (k % 5) * 180, cy = 1200 + Math.floor(k / 5) * 100; K.label('#tag', cx, cy, 44, P.sepia); }
      bigMark('20', 880, 420, R2(seg(lt, d * 0.5, d * 0.7)), 0.06, P.gold, 220);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'magnifier finds the tiny #ad lost in the hashtag pile, crimson X, HIDDEN = NO ribbon', draw(lt, d, t) {
      dayPage(7, false);
      for (let k = 0; k < 20; k++) { const cx = 180 + (k % 5) * 180, cy = 520 + Math.floor(k / 5) * 130; K.label(k === 12 ? '#ad' : '#tag', cx, cy, 44, k === 12 ? P.crimson : P.sepia); }
      magnifier(lerp(900, 540, eo(seg(lt, 0.05, 0.4))), lerp(1300, 820, eo(seg(lt, 0.05, 0.4))), 1.0, 0);
      bigMark('X', 540, 1200, R2(seg(lt, 0.45, 0.6)), 0, P.crimson, 360);
      K.ribbon("WON'T FLY", 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d4 * 0.5 * 0.5, 'zip', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + len(4) * 0.5 * 0.5, 'slam', { gain: 0.7 }); }

  // 5 · only in bio, at the end, or behind "more" isn't enough
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.12, note: 'three cards: BIO, END OF POST, ...MORE, each struck with crimson X in turn, NOT ENOUGH ribbon', draw(lt, d, t) {
      dayPage(8);
      const rows = [['BIO', 480], ['END OF POST', 830], ['... MORE', 1180]];
      rows.forEach(([w, y], k) => { const a = seg(lt, d * (0.05 + k * 0.22), d * (0.18 + k * 0.22)); const s = R2(a);
        if (s > 0) { ctx.save(); ctx.translate(540, y); ctx.scale(s, s); cut(P_rr(-330, -110, 660, 220, 18), '#FFFBF0'); K.label(w, 0, 6, 72, P.ink); ctx.restore(); }
        bigMark('X', 870, y, R2(seg(lt, d * (0.14 + k * 0.22), d * (0.26 + k * 0.22))), 0.05, P.crimson, 200); });
      K.ribbon('NOT ENOUGH', 540, 1620, R2(seg(lt, d * 0.72, d * 0.95)), 120);
    } });
    [0.1, 0.32, 0.54].forEach((a) => cue(st + len(5) * a, 'pop', { gain: 0.45 })); [0.2, 0.42, 0.64].forEach((a) => cue(st + len(5) * a, 'thud', { gain: 0.5 })); cue(st, 'whoosh'); }

  // 6 · game changer: caption not visible on the reel → put the label on the video itself
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, phone full-screen reel, caption area slides away (hidden), NO CAPTION slip', draw(lt, d, t) {
      nightPage(9);
      K.slip('GAME CHANGER', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      phoneBig(540, 950, 0.9 * R2(seg(lt, 0.05, 0.22)), 0, () => { reelScreen(0, P.green);
        const f = eio(seg(lt, d * 0.3, d * 0.6)); cut(P_rr(-186, 250 + 200 * f, 372, 120, 0), '#FFFBF0', { shadow: 0, edge: 0 }); K.label('caption…', 0, 310 + 200 * f, 40, P.sepia); });
      K.slip('NO CAPTION?', 540, 1620, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 70);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'hand slaps a crimson #AD chip onto the video, tick, ON THE VIDEO ribbon', draw(lt, d, t) {
      dayPage(10, false);
      phoneBig(540, 900, 1.0, 0, () => reelScreen(R2(seg(lt, 0.25, 0.4)) * 1.2, P.green));
      hand(lerp(900, 560, eo(seg(lt, 0.05, 0.3))), lerp(300, 470, eo(seg(lt, 0.05, 0.3))), 0.9, -0.4, true);
      tick(880, 1250, R2(seg(lt, 0.45, 0.6)));
      K.ribbon('ON THE VIDEO', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d6 * 0.45 * 0.4, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(6) * 0.55 * 0.3, 'slam', { gain: 0.7 }); cue(mid + len(6) * 0.55 * 0.5, 'pop', { gain: 0.5 }); }

  // 7 · up to 15 s reel → label at least 3 s; up to 2 min → a third of the time
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'clock spins, gold 15 SEC on a reel tile, timeline bar with crimson 3 SEC segment fills', draw(lt, d, t) {
      dayPage(11);
      clock(260, 520, 0.8 * R2(seg(lt, 0.02, 0.2)), t * 6);
      bigMark('15 SEC', 700, 520, R2(seg(lt, 0.1, 0.3)), -0.04, P.gold, 160);
      cut(P_rr(140, 900, 800, 90, 20), '#FFFBF0'); const f = eo(seg(lt, d * 0.35, d * 0.75)); if (f > 0) cut(P_rr(140, 900, 800 * 0.2 * f + 1, 90, 20), P.crimson, { shadow: 0, edge: 3 });
      bigMark('3 SEC', 300, 1180, R2(seg(lt, d * 0.55, d * 0.75)), 0.04, P.crimson, 170);
      K.ribbon('AT LEAST', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 120);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.14, note: 'gold 2 MIN, a long timeline bar split in 3, one third glows crimson, 1/3 OF THE TIME ribbon', draw(lt, d, t) {
      dayPage(12, false);
      K.slip('UP TO', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      bigMark('2 MIN', 540, 580, R2(seg(lt, 0.08, 0.28)), -0.04, P.gold, 220);
      cut(P_rr(140, 950, 800, 110, 22), '#FFFBF0'); const f = eo(seg(lt, 0.3, 0.7)); if (f > 0) cut(P_rr(140, 950, 800 / 3 * f + 1, 110, 22), P.crimson, { shadow: 0, edge: 3 });
      [140 + 800 / 3, 140 + 1600 / 3].forEach((x) => cut(P_rr(x - 3, 930, 6, 150, 2), P.ink, { shadow: 0, edge: 0 }));
      bigMark('1/3', 280, 1260, R2(seg(lt, 0.55, 0.7)), 0.04, P.crimson, 200);
      K.ribbon('OF THE TIME', 540, 1620, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d7 * 0.5 * 0.2, 'tock', { gain: 0.5 }); cue(st + d7 * 0.5 * 0.65, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(7) * 0.5 * 0.6, 'slam', { gain: 0.6 }); }

  // 8 · surprising: Instagram's paid partnership tag alone isn't enough; add your own label too
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.5;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: 'SURPRISE slip, post card with a grey "Paid partnership" strip, ALONE? crimson X', draw(lt, d, t) {
      nightPage(13);
      K.slip('SURPRISE', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const s = R2(seg(lt, 0.05, 0.25)); if (s > 0) { ctx.save(); ctx.translate(540, 900); ctx.scale(s, s); cut(P_rr(-320, -380, 640, 760, 26), '#FFFBF0'); circle(-250, -310, 34, P.stone); K.label('Paid partnership', 20, -306, 46, P.sepia); cut(P_rr(-280, -240, 560, 520, 14), P.royal, { shadow: 0, edge: 0 }); serum(0, 60, 0.9); ctx.restore(); }
      K.slip('PAID PARTNERSHIP TAG', 540, 1420, R2(seg(lt, d * 0.25, d * 0.45)), 0.03, 56);
      bigMark('X', 820, 560, R2(seg(lt, d * 0.6, d * 0.75)), 0.05, P.crimson, 260);
      K.ribbon('NOT ENOUGH ALONE', 540, 1650, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.14, note: 'same post card, crimson #AD chip added on top of the tag, plus sign, TAG + YOUR LABEL ribbon', draw(lt, d, t) {
      dayPage(14, false);
      ctx.save(); ctx.translate(540, 900); cut(P_rr(-320, -380, 640, 760, 26), '#FFFBF0'); circle(-250, -310, 34, P.stone); K.label('Paid partnership', 20, -306, 46, P.sepia); cut(P_rr(-280, -240, 560, 520, 14), P.royal, { shadow: 0, edge: 0 }); serum(0, 60, 0.9); ctx.restore();
      bigMark('+', 230, 560, R2(seg(lt, 0.1, 0.25)), 0, P.gold, 200);
      chip('#AD', 700, 720, 1.4 * R2(seg(lt, 0.2, 0.4)), -0.06, P.crimson, 70);
      tick(860, 1260, R2(seg(lt, 0.5, 0.65)));
      K.ribbon('+ YOUR OWN LABEL', 540, 1620, R2(seg(lt, d * 0.4, d * 0.75)), 90);
    } });
    cue(st, 'whoosh'); cue(st + d8 * 0.5 * 0.65, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(8) * 0.5 * 0.3, 'slam', { gain: 0.7 }); cue(mid + len(8) * 0.5 * 0.55, 'pop', { gain: 0.5 }); }

  // 9 · so: label at the very top, and on the video too
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1: caption card with #AD as first word (arrow TOP), STEP 2: phone with #AD on video', draw(lt, d, t) {
      dayPage(15);
      K.slip('STEP 1', 220, 300, R2(seg(lt, 0.02, 0.18)), -0.04, 62);
      const s = R2(seg(lt, 0.05, 0.25)); if (s > 0) { ctx.save(); ctx.translate(330, 760); ctx.scale(s, s); cut(P_rr(-240, -260, 480, 520, 20), '#FFFBF0'); chip('#AD', -100, -170, 0.8, 0, P.crimson, 56); for (let k = 0; k < 4; k++) cut(P_rr(-200, -60 + k * 70, 400 - k * 40, 26, 10), P.stone, { shadow: 0, edge: 0 }); ctx.restore(); }
      K.slip('AT THE TOP', 330, 1100, R2(seg(lt, d * 0.2, d * 0.35)), 0.03, 58);
      K.slip('STEP 2', 820, 300, R2(seg(lt, d * 0.45, d * 0.6)), 0.04, 62);
      phoneBig(800, 900, 0.6 * R2(seg(lt, d * 0.5, d * 0.68)), 0.04, () => reelScreen(R2(seg(lt, d * 0.62, d * 0.78)) * 1.1, P.green));
      K.ribbon('TOP + ON VIDEO', 540, 1620, R2(seg(lt, d * 0.7, d * 0.95)), 100);
    } });
    cue(st, 'whoosh'); cue(st + len(9) * 0.15, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.6, 'pop', { gain: 0.5 }); cue(st + len(9) * 0.78, 'slam', { gain: 0.6 }); }

  // 10 · going live? say it at the start and at the end
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'creator in front of ring of phone, LIVE pill pulses, timeline with crimson START and END flags', draw(lt, d, t) {
      room(16);
      livePill(540, 320, R2(seg(lt, 0.02, 0.2)), t);
      person({ x: 300, y: 1380, h: 600, arm: 70, top: M.tee });
      bubble('#AD', 420, 700, R2(seg(lt, 0.15, 0.3)), false, 70);
      K.timeline(['START', 'END'], 160, 1560, 760, eo(seg(lt, 0.25, 0.8)), lt > d * 0.7 ? 1 : 0);
      K.ribbon('START + END', 540, 1760, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.7, 'slam', { gain: 0.6 }); }

  // 11 · loop: hide it and get caught, say it and win trust (beat-0 room)
  { const st = cs(11), d11 = len(11), mid = st + d11 * 0.5;
    add({ id: 'S11a', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room at night: creator hides the #AD chip behind back, magnifier spotlight finds it, HIDE = CAUGHT', draw(lt, d, t) {
      nightPage(17); ground(1400, M.wall2);
      person({ x: 420, y: 1650, h: 640, arm: 20, top: M.tee });
      chip('#AD', 600, 1250, 0.8, 0.2, P.crimson, 56);
      magnifier(lerp(950, 640, eo(seg(lt, 0.1, 0.5))), lerp(500, 1150, eo(seg(lt, 0.1, 0.5))), 1.0, 0);
      K.ribbon('HIDE IT = CAUGHT', 540, 400, R2(seg(lt, 0.3, 0.6)), 90);
    } });
    add({ id: 'S11b', at: mid, cam: [540, 960], zoom: 0.14, note: 'beat-0 room by day: creator holds #AD chip up high, glows, hearts (post cards) rise, SAY IT = TRUST', draw(lt, d, t) {
      room(1);
      person({ x: 300, y: 1650, h: 640, arm: 80, top: M.tee, glow: eo(seg(lt, 0.2, 0.7)) });
      chip('#AD', 430, 760, 1.2 * R2(seg(lt, 0.02, 0.2)), -0.05, P.crimson, 70);
      [[760, 0.1], [880, 0.25], [700, 0.4]].forEach(([x, a], k) => postCard(x, 1100 - 400 * eo(seg(lt, a, a + 0.4)), 0.4 * R2(seg(lt, a, a + 0.15)), 0.05 * (k - 1), 1));
      K.ribbon('SAY IT = TRUST', 540, 1720, R2(seg(lt, d * 0.35, d * 0.7)), 96);
    } });
    cue(st, 'whoosh'); cue(st + d11 * 0.5 * 0.55, 'thud', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + len(11) * 0.5 * 0.45, 'slam', { gain: 0.7 }); }

  // 12 · follow + send to the friend who just got a free product
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a gift box flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(18); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); gift(lerp(220, 580, f), lerp(1300, 1250, f), 0.5 * R2(seg(lt, d * 0.3, d * 0.5)), 0.2 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
