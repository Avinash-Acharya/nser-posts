// 24 Nov 11am: WRITING A BRAND PITCH DM THAT GETS A REPLY (INDIA). Paper style.
// Facts (opened 23 Nov 2026): TechCrunch, "Instagram upgrades DMs with focus on creators" (Sarah Perez, 1 Nov 2024):
// users with many inbound messages, "like creators and influencers", can sort and filter their "message requests"
// (messages that don't arrive in the main inbox) by recency / follower count; filters include verified, business,
// creator account, subscriber count; helps surface messages "from other creators or brands reaching out about business
// deals". The pitch steps (name + product, one idea, one Insights number, one question) are nser's advice, not a fact.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, clock, magnifier, strike, gift } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** phone screen: an inbox header tab + n message rows; hi = index of a highlighted row (-1 none), fade = rows below fade */
function inbox(tab = 'REQUESTS', n = 6, p = 1, hi = -1) { cut(P_rr(-186, -370, 372, 740, 0), '#F3E9D2', { shadow: 0, edge: 0 });
  cut(P_rr(-186, -370, 372, 110, 0), P.royal, { shadow: 0, edge: 0 }); K.label(tab, 0, -312, 44, P.edge);
  for (let k = 0; k < n; k++) { const f = eo(seg(p, k * 0.08, k * 0.08 + 0.3)); if (f <= 0) continue; const y = -210 + k * 100;
    ctx.save(); ctx.globalAlpha = f; rr(-170, y - 40, 340, 84, 14); ctx.fillStyle = k === hi ? '#F2E3BC' : '#FFFBF0'; ctx.fill();
    circle(-128, y + 2, 28, k === hi ? P.crimson : P.stone); line([[-80, y - 8], [90, y - 8]], 'rgba(62,44,30,0.35)', 12); line([[-80, y + 18], [30, y + 18]], 'rgba(62,44,30,0.2)', 10); ctx.restore(); } }
/** a filter chip (rounded pill) */
function chip(text, x, y, s, on = false, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.font = '700 52px Caladea'; const w = ctx.measureText(text).width + 90;
  cut(P_rr(-w / 2, -48, w, 96, 48), on ? P.crimson : '#FFFBF0', { shadow: 0.6, edge: 4 }); K.label(text, 0, 2, 52, on ? P.edge : P.ink); ctx.restore(); }
/** a funnel shape (filter) */
function funnel(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_poly([[-170, -120], [170, -120], [40, 40], [40, 150], [-40, 120], [-40, 40]]), P.gold); ctx.restore(); }
/** a message draft card: lines of text, each with an optional colour tag */
function draft(x, y, s, lines, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  const h = 90 + lines.length * 92; cut(P_rr(-400, -h / 2, 800, h, 30), '#FFFBF0');
  lines.forEach(([t, col, k], i) => { if (k <= 0) return; const yy = -h / 2 + 90 + i * 92; ctx.save(); ctx.globalAlpha = clamp(k);
    if (col) { rr(-370, yy - 38, 18, 64, 9); ctx.fillStyle = col; ctx.fill(); }
    ctx.font = '700 52px Caladea'; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.ink; ctx.fillText(t, -330, yy); ctx.restore(); });
  ctx.restore(); }
/** a paper product box with a big letter brand mark */
function product(x, y, s, letter, col, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-90, -160, 180, 320, 30), col); cut(P_rr(-50, -200, 100, 50, 10), P.stoneDark, { shadow: 0.3, edge: 3 });
  cut(P_circ(0, 0, 60), '#FFFBF0', { shadow: 0.2, edge: 3 }); K.label(letter, 0, 4, 64, P.ink); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · DMed a brand, zero replies? maybe it never reached them
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator in room sends a DM bubble to a brand product, crimson 0 REPLIES', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      product(800, 1250, 1.2 * R2(seg(lt, 0.05, 0.2)), 'B', P.royal, 0.05);
      const f = eo(seg(lt, 0.15, 0.5)); bubble('Collab?', lerp(200, 520, f), lerp(900, 640, f), R2(seg(lt, 0.1, 0.25)), false, 64);
      bigMark('0 REPLIES', 560, 360, R2(seg(lt, d * 0.55, d * 0.75)), -0.04, P.crimson, 130);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'the DM bubble floats lost in the dark with a big ?, NEVER REACHED ribbon', draw(lt, d, t) {
      nightPage(2);
      bubble('Collab?', 300 + 30 * Math.sin(t * 1.5), 800 + 40 * Math.sin(t * 2), 1.3 * R2(seg(lt, 0.02, 0.2)), false, 70);
      bigMark('?', 760, 560, R2(seg(lt, 0.2, 0.4)), 0.08 * Math.sin(t * 3), P.gold, 340);
      K.ribbon('NEVER REACHED', 540, 1500, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.15, 'zip', { gain: 0.5 }); cue(st + d0 * 0.32, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.3, 'thud', { gain: 0.6 }); cue(mid + d0 * 0.5 * 0.6, 'slam', { gain: 0.7 }); }

  // 1 · simply put: not the main inbox, a pile of message requests
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.5;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip; phone shows INBOX tab, DM bubble gets bounced with crimson X', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('SIMPLY PUT', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      phoneBig(540, 960, 0.95 * R2(seg(lt, 0.05, 0.2)), -0.02, () => inbox('INBOX', 5, seg(lt, 0.1, 0.6)));
      const f = eo(seg(lt, 0.35, 0.6)); bubble('Collab?', lerp(-300, 120, f), 500, f, false, 56);
      bigMark('✕', 880, 520, R2(seg(lt, d * 0.65, d * 0.85)), 0, P.crimson, 200);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a tall pile of message paper slips, REQUESTS ribbon, bubble sinks into the pile', draw(lt, d, t) {
      dayPage(4);
      for (let k = 0; k < 9; k++) { const f = eo(seg(lt, k * 0.05, k * 0.05 + 0.3)); if (f <= 0) continue; ctx.save(); ctx.translate(540 + (k % 3 - 1) * 40, lerp(-200, 1350 - k * 75, f)); ctx.rotate((k % 2 ? 1 : -1) * 0.06 * (k % 4)); cut(P_rr(-300, -45, 600, 90, 16), k % 2 ? '#FFFBF0' : '#EFE5CC', { shadow: 0.5, edge: 3 }); circle(-240, 0, 26, P.stone); line([[-190, 0], [200, 0]], 'rgba(62,44,30,0.25)', 14); ctx.restore(); }
      bubble('Collab?', 400, lerp(300, 620, eo(seg(lt, 0.5, 0.8))), 1, false, 56);
      K.ribbon('REQUESTS', 540, 380, R2(seg(lt, 0.35, 0.6)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d1 * 0.5 * 0.45, 'zip', { gain: 0.5 }); cue(st + d1 * 0.5 * 0.7, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); [0.1, 0.2, 0.3, 0.4].forEach((a) => cue(mid + d1 * 0.5 * a, 'pop', { gain: 0.3 })); cue(mid + d1 * 0.5 * 0.5, 'slam', { gain: 0.6 }); }

  // 2 · 2024: Instagram added filters: follower count, verified, business, creator account
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.45;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'gold 2024 mark, a gold funnel drops over the pile, FILTERS slip', draw(lt, d, t) {
      dayPage(5, false);
      bigMark('2024', 540, 330, R2(seg(lt, 0.02, 0.2)), -0.04, P.gold, 200);
      funnel(540, 860, 1.6 * R2(seg(lt, 0.2, 0.4)));
      for (let k = 0; k < 5; k++) { const f = seg(lt, 0.4 + k * 0.08, 0.6 + k * 0.08); if (f <= 0 || f >= 1) continue; ctx.save(); ctx.globalAlpha = 1 - f; cut(P_rr(470, lerp(600, 1150, f) - 30, 140, 60, 12), '#FFFBF0', { shadow: 0.3, edge: 2 }); ctx.restore(); }
      K.ribbon('FILTERS', 540, 1500, R2(seg(lt, d * 0.5, d * 0.8)), 130);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.14, note: 'four filter chips pop one by one: FOLLOWERS, VERIFIED, BUSINESS, CREATOR (crimson)', draw(lt, d, t) {
      dayPage(6);
      chip('FOLLOWERS', 540, 520, 1.2 * R2(seg(lt, 0.05, 0.2)), false, -0.03);
      chip('VERIFIED ✓', 540, 760, 1.2 * R2(seg(lt, 0.25, 0.4)), false, 0.03);
      chip('BUSINESS', 540, 1000, 1.2 * R2(seg(lt, 0.45, 0.6)), false, -0.02);
      chip('CREATOR', 540, 1240, 1.4 * R2(seg(lt, 0.65, 0.8)), true, 0.03);
      hand(860, 1380, 0.8 * R2(seg(lt, 0.75, 0.9)), -0.6, true);
    } });
    cue(st, 'whoosh'); cue(st + d2 * 0.45 * 0.15, 'slam', { gain: 0.6 }); cue(st + d2 * 0.45 * 0.35, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); [0.12, 0.32, 0.52, 0.72].forEach((a) => cue(mid + d2 * 0.55 * a, 'pop', { gain: 0.45 })); }

  // 3 · people with tons of messages pick out only the useful ones
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'busy inbox phone, magnifier slides over and finds one highlighted row with gold tick, ONLY THE USEFUL ribbon', draw(lt, d, t) {
      nightPage(7);
      bigMark('999+', 800, 300, R2(seg(lt, 0.02, 0.2)), 0.05, P.gold, 150);
      phoneBig(480, 960, 1.0 * R2(seg(lt, 0.02, 0.18)), -0.03, () => inbox('REQUESTS', 6, 1, lt > d * 0.45 ? 3 : -1));
      const f = eo(seg(lt, 0.2, 0.5)); magnifier(lerp(900, 640, f), lerp(700, 1080, f), 0.9 * R2(seg(lt, 0.15, 0.3)));
      K.ribbon('ONLY THE USEFUL', 540, 1640, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.2, 'zip', { gain: 0.5 }); cue(st + len(3) * 0.45, 'pop', { gain: 0.6 }); cue(st + len(3) * 0.7, 'slam', { gain: 0.6 }); }

  // 4 · you wrote "Hi sir, collab?" → buried
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator typing, bubble HI SIR, COLLAB? grows', draw(lt, d, t) {
      room(8);
      K.slip('YOU', 160, 260, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      person({ x: 260, y: 1650, h: 620, arm: 60, top: M.hoodie });
      bubble('Hi sir,', 400, 640, R2(seg(lt, 0.2, 0.35)), false, 76);
      bubble('collab?', 480, 820, R2(seg(lt, 0.4, 0.55)), false, 76);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'HI SIR bubble sinks under a falling pile of grey slips, BURIED ribbon', draw(lt, d, t) {
      dayPage(9, false);
      bubble('Hi sir, collab?', 220, 1100, 1, false, 64);
      for (let k = 0; k < 8; k++) { const f = eo(seg(lt, d * 0.25 + k * 0.06, d * 0.25 + 0.25 + k * 0.06)); if (f <= 0) continue; ctx.save(); ctx.translate(540 + ((k * 37) % 5 - 2) * 50, lerp(-200, 1180 - k * 40, f)); ctx.rotate(((k * 13) % 7 - 3) * 0.05); cut(P_rr(-320, -45, 640, 90, 16), k % 2 ? '#FFFBF0' : '#EFE5CC', { shadow: 0.5, edge: 3 }); ctx.restore(); }
      K.ribbon('BURIED', 540, 500, R2(seg(lt, d * 0.55, d * 0.8)), 140);
    } });
    cue(st, 'whoosh'); cue(st + d4 * 0.5 * 0.25, 'pop', { gain: 0.5 }); cue(st + d4 * 0.5 * 0.45, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); [0.2, 0.35, 0.5, 0.65].forEach((a) => cue(mid + d4 * 0.5 * a, 'thud', { gain: 0.35 })); cue(mid + d4 * 0.5 * 0.7, 'slam', { gain: 0.7 }); }

  // 5 · game changer: first line = brand's name + one of their products
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, crimson LINE 1 ribbon', draw(lt, d, t) {
      nightPage(10);
      K.slip('GAME CHANGER', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      bigMark('LINE 1', 540, 860, R2(seg(lt, 0.25, 0.45)), -0.04, P.crimson, 220);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: 'product box "B" left, draft card with first line BRAND NAME + PRODUCT (crimson tags), dashed route from box to card', draw(lt, d, t) {
      dayPage(11);
      product(220, 600, 1.1 * R2(seg(lt, 0.02, 0.18)), 'B', P.royal, -0.06);
      K.dashedRoute([[320, 700], [480, 820], [560, 960]], eo(seg(lt, 0.15, 0.4)));
      draft(540, 1150, 1, [['Hi Brand B team!', P.crimson, seg(lt, 0.3, 0.45)], ['Love your Product X', P.crimson, seg(lt, 0.5, 0.65)]], 0.02);
      K.ribbon('NAME + PRODUCT', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.35, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.55 * 0.3, 'pop', { gain: 0.5 }); cue(mid + d5 * 0.55 * 0.5, 'pop', { gain: 0.5 }); cue(mid + d5 * 0.55 * 0.65, 'slam', { gain: 0.6 }); }

  // 6 · then ONE reel idea, clearly
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.14, note: 'lightbulb-ish gold circle + post card with play mark, gold 1 IDEA, extra idea cards get struck off', draw(lt, d, t) {
      dayPage(12, false);
      postCard(540, 820, 1.2 * R2(seg(lt, 0.02, 0.2)), -0.03, 0);
      [[200, 1250, -0.1], [880, 1250, 0.1]].forEach(([x, y, r], k) => { const s = R2(seg(lt, 0.2 + k * 0.08, 0.35 + k * 0.08)); if (s <= 0) return; postCard(x, y, 0.55 * s, r, 0); strike(x - 120, y, 240, seg(lt, 0.55 + k * 0.08, 0.7 + k * 0.08)); });
      bigMark('1 IDEA', 540, 300, R2(seg(lt, 0.3, 0.5)), -0.03, P.gold, 170);
      K.ribbon('JUST ONE', 540, 1640, R2(seg(lt, d * 0.6, d * 0.9)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(6) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.4, 'slam', { gain: 0.6 }); cue(st + len(6) * 0.6, 'zip', { gain: 0.5 }); }

  // 7 · then one number from Insights, like average reach
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'INSIGHTS slip, phone with bars growing, gold AVG REACH number counts up', draw(lt, d, t) {
      dayPage(13);
      K.slip('INSIGHTS', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      phoneBig(320, 950, 0.8 * R2(seg(lt, 0.05, 0.2)), -0.04, () => { cut(P_rr(-186, -370, 372, 740, 0), '#F3E9D2', { shadow: 0, edge: 0 });
        [0.4, 0.6, 0.5, 0.8, 0.95].forEach((v, k) => { const h = 460 * v * eo(seg(lt, 0.15 + k * 0.06, 0.45 + k * 0.06)); cut(P_rr(-150 + k * 64, 260 - h, 44, h, 10), k === 4 ? P.crimson : P.royal, { shadow: 0, edge: 0 }); }); });
      bigMark('AVG', 800, 700, R2(seg(lt, 0.35, 0.5)), 0.04, P.ink, 110);
      bigMark('REACH', 800, 860, R2(seg(lt, 0.4, 0.55)), 0.04, P.gold, 120);
      K.ribbon('ONE NUMBER', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); [0.2, 0.26, 0.32, 0.38, 0.44].forEach((a) => cue(st + len(7) * a, 'pop', { gain: 0.3 })); cue(st + len(7) * 0.5, 'slam', { gain: 0.6 }); }

  // 8 · craziest: one filter is "creator account" → switch to a professional account
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.5;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, CREATOR chip glows crimson and big, gold ring pulse', draw(lt, d, t) {
      nightPage(14);
      K.slip('CRAZIEST PART', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const r = (t * 0.8) % 1; ctx.save(); ctx.globalAlpha = 1 - r; ctx.strokeStyle = P.gold; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(540, 900, 220 + 200 * r, 0, TAU); ctx.stroke(); ctx.restore();
      chip('CREATOR', 540, 900, 1.8 * R2(seg(lt, 0.2, 0.4)), true, -0.03);
      funnel(540, 1360, 0.8 * R2(seg(lt, 0.45, 0.6)));
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a switch toggle flips from PERSONAL to PRO, green tick, SWITCH TO PRO ribbon', draw(lt, d, t) {
      dayPage(15);
      const f = eo(seg(lt, 0.25, 0.45));
      cut(P_rr(240, 700, 600, 260, 130), lerp(0, 1, f) > 0.5 ? P.green : P.stone);
      cut(P_circ(lerp(370, 710, f), 830, 110), '#FFFBF0', { shadow: 0.6, edge: 4 });
      K.slip('PERSONAL', 300, 520, R2(seg(lt, 0.02, 0.18)), -0.04, 60); strike(170, 520, 260, seg(lt, 0.45, 0.6));
      K.slip('PRO', 800, 520, R2(seg(lt, 0.35, 0.5)), 0.04, 70);
      K.ribbon('SWITCH TO PRO', 540, 1400, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d8 * 0.5 * 0.3, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d8 * 0.5 * 0.35, 'zip', { gain: 0.6 }); cue(mid + d8 * 0.5 * 0.7, 'slam', { gain: 0.6 }); }

  // 9 · today: pick 3 brands whose product you actually use
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, three product boxes A B C land on a shelf, gold 3 BRANDS, ticks', draw(lt, d, t) {
      room(16);
      K.slip('STEP 1 · TODAY', 540, 260, R2(seg(lt, 0.02, 0.18)), -0.03, 64);
      cut(P_rr(100, 1200, 880, 40, 10), M.floor, { shadow: 0.6, edge: 3 });
      [['A', P.crimson, 260], ['B', P.royal, 540], ['C', P.green, 820]].forEach(([l, c, x], k) => { const f = eo(seg(lt, 0.15 + k * 0.1, 0.35 + k * 0.1)); product(x, lerp(400, 1040, f), f > 0 ? 0.9 : 0, l, c, (k - 1) * 0.04); });
      bigMark('3 BRANDS', 540, 560, R2(seg(lt, 0.5, 0.65)), -0.03, P.gold, 140);
      K.ribbon('YOU USE THEM', 540, 1560, R2(seg(lt, d * 0.6, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); [0.3, 0.4, 0.5].forEach((a) => cue(st + len(9) * a, 'thud', { gain: 0.45 })); cue(st + len(9) * 0.6, 'slam', { gain: 0.6 }); }

  // 10 · each: short message: name, idea, number, + one question
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 2 slip, draft card builds four tagged lines NAME / IDEA / NUMBER / CALL?, send arrow', draw(lt, d, t) {
      dayPage(17, false);
      K.slip('STEP 2', 200, 240, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      draft(540, 900, 1.05 * R2(seg(lt, 0.05, 0.2)), [['Name + product', P.crimson, seg(lt, 0.15, 0.3)], ['1 reel idea', P.gold, seg(lt, 0.3, 0.45)], ['1 number', P.royal, seg(lt, 0.45, 0.6)], ['Shall we talk?', P.green, seg(lt, 0.6, 0.75)]]);
      K.ribbon('SEND', 540, 1560, R2(seg(lt, d * 0.75, d * 0.95)), 140);
    } });
    cue(st, 'whoosh'); [0.22, 0.37, 0.52, 0.67].forEach((a) => cue(st + len(10) * a, 'pop', { gain: 0.45 })); cue(st + len(10) * 0.85, 'zip', { gain: 0.6 }); }

  // 11 · loop: not "hi sir": name, idea, number (beat-0 room, now a reply comes back)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: HI SIR struck off, slips NAME IDEA NUMBER, brand reply bubble comes back, creator phone glows', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee, glow: eo(seg(lt, 0.5, 0.8)) });
      product(800, 1250, 1.2, 'B', P.royal, 0.05);
      bubble('Hi sir...', 300, 340, R2(seg(lt, 0.02, 0.12)), false, 64); strike(300, 340, 300, seg(lt, 0.1, 0.25));
      K.slip('NAME', 300, 560, R2(seg(lt, 0.25, 0.38)), -0.04, 62); K.slip('IDEA', 560, 660, R2(seg(lt, 0.38, 0.5)), 0.04, 62); K.slip('NUMBER', 820, 560, R2(seg(lt, 0.5, 0.62)), -0.03, 62);
      bubble("Let's talk!", 1020, 900, R2(seg(lt, 0.65, 0.8)), true, 64);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.15, 'zip', { gain: 0.5 }); [0.3, 0.44, 0.56].forEach((a) => cue(st + len(11) * a, 'pop', { gain: 0.45 })); cue(st + len(11) * 0.7, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend who keeps DMing brands
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend holding phone with many Collab? bubbles, handle slip', draw(lt, d, t) {
      dayPage(18); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      ['Collab?', 'Collab?', 'Collab?'].forEach((q, k) => bubble(q, 80 + k * 40, 1040 + k * 120, R2(seg(lt, d * (0.3 + k * 0.06), d * (0.42 + k * 0.06))), false, 50));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
