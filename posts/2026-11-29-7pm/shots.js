// 29 Nov 7pm: INSTAGRAM CLOSE FRIENDS & SUBSCRIPTIONS: PAID CONTENT FOR YOUR BIGGEST FANS. Paper style.
// Facts (opened 28 Nov 2026): Buffer, "How to Use Instagram Close Friends" (May 22, 2025): a handpicked private list who
// see exclusive Stories; "your Close Friends list is private and only you can view or edit it"; "Instagram doesn't notify
// people when you add or remove them"; they "see a green circle around your profile picture". Instagram Help Center
// "Create a Close Friends list" (meta description). Green ring dropped from the script for length. TechCrunch (Jul 24, 2023): subscriptions give "paid access to exclusive
// posts, Live videos, Stories, reels, highlights and more" + "a special badge"; creators "must be at least 18 years old and
// have more than 10,000 followers"; creators choose from preset monthly price points; rolled out country by country.
// Kudozz (Sep 2026): subscriptions roll out gradually, subject to eligibility. The 4,000-follower story, the test-room
// tactic and the loop line are nser's generic advice. No real person, no logos.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, rankCard, strike, magnifier, coins, note, wallet } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a story avatar: a paper circle with a ring (col) */
function avatar(x, y, s, col = P.forest, ring = 1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  if (ring > 0) { ctx.beginPath(); ctx.arc(0, 0, 112, -Math.PI / 2, -Math.PI / 2 + TAU * clamp(ring)); ctx.lineWidth = 20; ctx.strokeStyle = col; ctx.stroke(); }
  cut(P_circ(0, 0, 92), '#F3E9D2', { shadow: 0.4, edge: 4 }); circle(0, -20, 34, M.hair); cut(() => { ctx.beginPath(); ctx.ellipse(0, 52, 56, 36, 0, Math.PI, 0); ctx.closePath(); }, M.hoodie, { shadow: 0, edge: 2 }); ctx.restore(); }
/** a small lock */
function lock(x, y, s, open = 0, col = P.gold) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.save(); ctx.translate(0, -open * 40); ctx.lineWidth = 26; ctx.strokeStyle = P.ink; ctx.beginPath(); ctx.arc(0, -70, 60, Math.PI, 0); ctx.lineTo(60, -20); ctx.moveTo(-60, -70); ctx.lineTo(-60, -20); ctx.stroke(); ctx.restore();
  cut(P_rr(-100, -40, 200, 170, 20), col); circle(0, 30, 18, P.ink); ctx.restore(); }
/** a paper door labelled; open 0..1 */
function door(x, y, s, open = 0, txt = '') { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-170, -440, 340, 440, 10), '#3E2C1E'); ctx.save(); ctx.scale(1 - 0.75 * open, 1); cut(P_rr(-150, -420, 300, 420, 6), P.crimson); circle(110, -200, 14, P.gold); ctx.restore();
  if (txt) K.label(txt, 0, -480, 48, P.ink); ctx.restore(); }
/** a purple-ish paper badge (use royal/wine from palette) */
function badge(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); for (let i = 0; i < 16; i++) { const a = i / 16 * TAU, r = i % 2 ? 70 : 95; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); } ctx.closePath(); }, P.royal, { shadow: 0.5, edge: 4 });
  K.label('★', 0, 6, 70, P.edge); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · some fans watch every story; could they pay you?
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'phone: a row of story rings, SEEN BY: three fans light up, EVERY STORY slip', draw(lt, d, t) {
      room(1);
      phoneBig(540, 900, 1.25 * R2(seg(lt, 0.02, 0.2)), -0.03, () => { K.label('SEEN BY', 0, -290, 46, P.ink); [-1, 0, 1].forEach((k) => avatar(k * 120, -120, 0.55 * R2(seg(lt, d * (0.1 + k * 0.08 + 0.08), d * (0.25 + k * 0.08 + 0.08))), P.gold, 1)); });
      K.slip('EVERY STORY', 540, 300, R2(seg(lt, d * 0.45, d * 0.65)), -0.03, 64);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'three fans hold ₹ notes toward you, gold ? : CAN THEY PAY? ribbon', draw(lt, d, t) {
      dayPage(2);
      bigMark('?', 540, 520, R2(seg(lt, d * 0.1, d * 0.3)), 0.06 * Math.sin(t * 3), P.gold, 320);
      [200, 540, 880].forEach((x, k) => { person({ x, y: 1450, h: 520, arm: 40, top: [P.forest, P.wine, P.royal][k], glow: 0.5, dir: k === 2 ? -1 : 1 }); note(x, lerp(1000, 860, eo(seg(lt, d * (0.3 + k * 0.08), d * (0.6 + k * 0.08)))), 0.6 * R2(seg(lt, d * (0.3 + k * 0.08), d * (0.45 + k * 0.08))), (k - 1) * 0.1); });
      K.ribbon('CAN THEY PAY?', 540, 1620, R2(seg(lt, d * 0.6, d * 0.9)), 92);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); [0.18, 0.26, 0.34].forEach((a) => cue(st + d0 * 0.5 * a, 'plop', { gain: 0.35 })); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.2, 'pop', { gain: 0.6 }); [0.4, 0.48, 0.56].forEach((a) => cue(mid + d0 * 0.5 * a, 'plop', { gain: 0.35 })); cue(mid + d0 * 0.5 * 0.7, 'slam', { gain: 0.8 }); }

  // 1 · simply put: two tools, Close Friends and Subscriptions
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.14, note: 'SIMPLY PUT slip, two paper cards: green ring CLOSE FRIENDS | badge + ₹ SUBSCRIPTIONS', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const a = R2(seg(lt, d * 0.15, d * 0.35)), b = R2(seg(lt, d * 0.45, d * 0.65));
      if (a > 0) { ctx.save(); ctx.translate(290, 850); ctx.rotate(-0.04); ctx.scale(a, a); cut(P_rr(-220, -300, 440, 600, 20), '#FFFBF0'); avatar(0, -60, 1.1, P.forest, 1); K.label('CLOSE', 0, 150, 60, P.ink); K.label('FRIENDS', 0, 220, 60, P.ink); ctx.restore(); }
      if (b > 0) { ctx.save(); ctx.translate(790, 850); ctx.rotate(0.04); ctx.scale(b, b); cut(P_rr(-220, -300, 440, 600, 20), '#FFFBF0'); badge(0, -60, 1.1); K.label('SUBSCRIP-', 0, 150, 56, P.ink); K.label('TIONS', 0, 220, 60, P.ink); ctx.restore(); }
      K.ribbon('2 TOOLS', 540, 1400, R2(seg(lt, d * 0.7, d * 0.95)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(1) * 0.2, 'pop', { gain: 0.6 }); cue(st + len(1) * 0.5, 'pop', { gain: 0.6 }); cue(st + len(1) * 0.75, 'slam', { gain: 0.7 }); }

  // 2 · Close Friends: a private list only you see; nobody notified
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'a paper list with avatars + lock: PRIVATE LIST, ONLY YOU slip', draw(lt, d, t) {
      dayPage(4);
      K.slip('CLOSE FRIENDS', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      cut(P_rr(200, 420, 680, 760, 16), '#FFFBF0');
      [0, 1, 2].forEach((k) => { const f = R2(seg(lt, d * (0.1 + k * 0.1), d * (0.25 + k * 0.1))); avatar(330, 560 + k * 210, 0.6 * f, P.forest, 1); if (f > 0) line([[440, 560 + k * 210], [440 + 340 * clamp(f), 560 + k * 210]], 'rgba(62,44,30,0.3)', 14); });
      lock(820, 1220, 1.0 * R2(seg(lt, d * 0.45, d * 0.6)), 0);
      K.ribbon('ONLY YOU SEE IT', 540, 1480, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a fan added to the list, a bell with a crimson strike: NO NOTIFICATION', draw(lt, d, t) {
      nightPage(5);
      avatar(330, 620, 1.2 * R2(seg(lt, 0.02, 0.2)), P.forest, eo(seg(lt, d * 0.1, d * 0.4)));
      K.slip('ADDED', 330, 820, R2(seg(lt, d * 0.2, d * 0.35)), -0.03, 56);
      const bs = R2(seg(lt, d * 0.15, d * 0.3)); if (bs > 0) { ctx.save(); ctx.translate(760, 640); ctx.scale(bs, bs); cut(() => { ctx.beginPath(); ctx.moveTo(-110, 80); ctx.quadraticCurveTo(-100, -130, 0, -140); ctx.quadraticCurveTo(100, -130, 110, 80); ctx.closePath(); }, P.gold); circle(0, 110, 26, P.gold); ctx.restore(); }
      const sp = eo(seg(lt, d * 0.4, d * 0.6)); if (sp > 0) line([[620, 480], [lerp(620, 900, sp), lerp(480, 800, sp)]], P.crimson, 26);
      K.ribbon('NO NOTIFICATION', 540, 1300, R2(seg(lt, d * 0.6, d * 0.9)), 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.1, 0.2, 0.3].forEach((a) => cue(st + d2 * 0.5 * a, 'plop', { gain: 0.35 })); cue(st + d2 * 0.5 * 0.5, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d2 * 0.5 * 0.2, 'pop', { gain: 0.5 }); cue(mid + d2 * 0.5 * 0.45, 'zip', { gain: 0.6 }); cue(mid + d2 * 0.5 * 0.65, 'slam', { gain: 0.7 }); }

  // 3 · Subscriptions: fans pay monthly; exclusive reels, stories, lives, a badge
  { const st = cs(3), d4 = len(3), mid = st + d4 * 0.45;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'SUBSCRIPTIONS slip, a fan drops ₹ coins into your wallet each month (calendar MONTHLY)', draw(lt, d, t) {
      dayPage(7);
      K.slip('SUBSCRIPTIONS', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      wallet(700, 1050, 1.1 * R2(seg(lt, d * 0.05, d * 0.2)), eo(seg(lt, d * 0.2, d * 0.4)));
      for (let k = 0; k < 3; k++) { const f = seg(lt, d * (0.3 + k * 0.15), d * (0.5 + k * 0.15)); if (f > 0 && f < 1) note(lerp(300, 700, eo(f)), lerp(600, 950, eo(f)), 0.6, f * 0.5); }
      person({ x: 230, y: 1550, h: 560, arm: 120, top: P.forest, glow: 0.5 });
      K.ribbon('EVERY MONTH', 640, 1450, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'unlocked: lock opens, slips REELS / STORIES / LIVE pop out + badge', draw(lt, d, t) {
      nightPage(8);
      lock(540, 560, 1.4 * R2(seg(lt, 0.02, 0.2)), eo(seg(lt, d * 0.1, d * 0.3)));
      ['REELS', 'STORIES', 'LIVE'].forEach((s, k) => K.slip(s, [230, 540, 850][k], 950 + (k % 2) * 60, R2(seg(lt, d * (0.25 + k * 0.12), d * (0.4 + k * 0.12))), (k - 1) * 0.04, 60));
      badge(540, 1300, 1.4 * R2(seg(lt, d * 0.6, d * 0.75)));
      K.slip('+ BADGE', 540, 1500, R2(seg(lt, d * 0.7, d * 0.9)), 0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.4, 0.55, 0.7].forEach((a) => cue(st + d4 * 0.45 * a, 'plop', { gain: 0.4 })); cue(mid, 'whoosh'); cue(mid + d4 * 0.55 * 0.15, 'zip', { gain: 0.5 }); [0.3, 0.42, 0.54].forEach((a) => cue(mid + d4 * 0.55 * a, 'pop', { gain: 0.4 })); cue(mid + d4 * 0.55 * 0.68, 'sparkle', { gain: 0.6 }); }

  // 4 · condition: over 18, more than 10,000 followers
  { const st = cs(4), d5 = len(4), mid = st + d5 * 0.4;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'CONDITION slip, big gold 18+', draw(lt, d, t) {
      room(9);
      K.slip('THE CONDITION', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      bigMark('18+', 540, 820, R2(seg(lt, d * 0.2, d * 0.4)), -0.03, P.gold, 380);
      K.slip('AGE', 540, 1150, R2(seg(lt, d * 0.4, d * 0.6)), 0.03, 70);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'follower counter rolls up to 10,000+, crowd of small paper people, 10K FOLLOWERS ribbon', draw(lt, d, t) {
      dayPage(10);
      const v = Math.round(10000 * eo(seg(lt, d * 0.05, d * 0.5))); bigMark(v.toLocaleString('en-IN') + (v >= 10000 ? '+' : ''), 540, 520, R2(seg(lt, 0.02, 0.15)), -0.02, P.gold, 200);
      for (let k = 0; k < 9; k++) person({ x: 140 + k * 100, y: 1250 + (k % 2) * 60, h: 300, arm: 40, top: [P.forest, P.wine, P.royal, M.hoodie][k % 4], glow: 0, dir: k % 2 ? -1 : 1, bob: -40 * R2(seg(lt, d * (0.1 + k * 0.04), d * (0.2 + k * 0.04))) + 40 });
      K.ribbon('FOLLOWERS', 540, 1520, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d5 * 0.4 * 0.3, 'slam', { gain: 0.8 }); cue(mid, 'whoosh'); cue(mid + d5 * 0.6 * 0.05, 'slide', { gain: 0.5, dur: 1.2 }); cue(mid + d5 * 0.6 * 0.5, 'sparkle', { gain: 0.5 }); cue(mid + d5 * 0.6 * 0.65, 'slam', { gain: 0.7 }); }

  // 5 · you: 4,000 followers, subscriptions won't open yet
  { const st = cs(5), d6 = len(5), mid = st + d6 * 0.5;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'you with a phone, counter 4,000 vs a 10K line far above', draw(lt, d, t) {
      room(11);
      person({ x: 260, y: 1600, h: 620, arm: 70, top: M.tee, glow: 0.6 });
      const h = 900 * 0.4 * eo(seg(lt, d * 0.1, d * 0.5)); if (h > 2) cut(P_rr(620, 1450 - h, 200, h, 10), P.gold);
      ctx.save(); ctx.setLineDash([24, 16]); line([[560, 550], [960, 550]], P.crimson, 8); ctx.restore(); K.label('10K', 760, 490, 60, P.crimson);
      K.label('4,000', 720, 1450 - h - 60, 70, P.ink);
      K.slip('YOU', 260, 820, R2(seg(lt, d * 0.2, d * 0.35)), -0.03, 64);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a locked door NOT YET, you scratching head, ? mark', draw(lt, d, t) {
      dayPage(12);
      door(680, 1350, 1.4 * R2(seg(lt, 0.02, 0.2)), 0, '');
      lock(680, 1000, 0.8 * R2(seg(lt, d * 0.15, d * 0.3)), 0, P.stone);
      person({ x: 220, y: 1600, h: 560, arm: 120 + 20 * Math.sin(t * 6), top: M.tee, glow: 0 });
      K.ribbon('NOT YET', 680, 380, R2(seg(lt, d * 0.3, d * 0.55)), 110);
      bigMark('?', 260, 820, R2(seg(lt, d * 0.55, d * 0.7)), 0.06 * Math.sin(t * 3), P.gold, 220);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d6 * 0.5 * 0.1, 'slide', { gain: 0.4, dur: 0.8 }); cue(mid, 'whoosh'); cue(mid + d6 * 0.5 * 0.2, 'thud', { gain: 0.6 }); cue(mid + d6 * 0.5 * 0.4, 'slam', { gain: 0.7 }); cue(mid + d6 * 0.5 * 0.6, 'pop', { gain: 0.5 }); }

  // 6 · game changer: Close Friends as a test room: add most active fans, post behind the scenes
  { const st = cs(6), d7 = len(6), mid = st + d7 * 0.45;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, a paper room labelled TEST ROOM with a green door, active fans walk in', draw(lt, d, t) {
      room(13);
      K.slip('GAME CHANGER', 540, 230, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      door(760, 1300, 1.2 * R2(seg(lt, 0.05, 0.2)), eo(seg(lt, d * 0.2, d * 0.4)), '');
      K.ribbon('TEST ROOM', 760, 560, R2(seg(lt, d * 0.15, d * 0.35)), 90);
      [0, 1, 2].forEach((k) => { const f = eo(seg(lt, d * (0.35 + k * 0.1), d * (0.75 + k * 0.08))); person({ x: lerp(120 + k * 120, 700 + k * 40, f), y: 1600, h: 380, arm: 40, top: [P.forest, P.wine, P.royal][k], glow: 0.7, walk: t * 8 + k }); });
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'phone story with green ring showing a ring light + camera: BEHIND THE SCENES ribbon', draw(lt, d, t) {
      nightPage(14);
      phoneBig(540, 820, 1.2 * R2(seg(lt, 0.02, 0.2)), 0.03, () => { avatar(0, -270, 0.55, P.forest, 1); cut(P_rr(-150, -150, 300, 360, 14), P.sea, { shadow: 0, edge: 2 }); circle(0, 20, 90 * R2(seg(lt, d * 0.2, d * 0.4)), P.gold); circle(0, 20, 55 * R2(seg(lt, d * 0.2, d * 0.4)), '#FFFBF0'); });
      K.ribbon('BEHIND THE SCENES', 540, 1460, R2(seg(lt, d * 0.5, d * 0.85)), 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.45 * 0.25, 'slam', { gain: 0.6 }); [0.4, 0.5, 0.6].forEach((a) => cue(st + d7 * 0.45 * a, 'plop', { gain: 0.3 })); cue(mid, 'whoosh'); cue(mid + d7 * 0.55 * 0.25, 'pop', { gain: 0.5 }); cue(mid + d7 * 0.55 * 0.6, 'slam', { gain: 0.7 }); }

  // 7 · craziest: you choose the monthly price yourself
  { const st = cs(7);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'CRAZIEST PART slip, a paper price dial with ₹ tags, a hand turns it, YOUR PRICE ribbon', draw(lt, d, t) {
      dayPage(15);
      K.slip('CRAZIEST PART', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      const s = R2(seg(lt, 0.05, 0.22)); if (s > 0) { ctx.save(); ctx.translate(540, 820); ctx.scale(s, s); cut(P_circ(0, 0, 280), '#FFFBF0'); for (let k = 0; k < 8; k++) { const a = -Math.PI * 0.9 + k * Math.PI * 0.8 / 7 * 1; circle(Math.cos(a) * 220, Math.sin(a) * 220, 14, k === 5 ? P.crimson : P.ink); }
        const a = lerp(-Math.PI * 0.9, -Math.PI * 0.9 + Math.PI * 0.8 * 5 / 7, eio(seg(lt, d * 0.2, d * 0.65))); line([[0, 0], [Math.cos(a) * 200, Math.sin(a) * 200]], P.crimson, 22); circle(0, 0, 40, P.gold); K.label('₹', 0, 140, 110, P.gold); ctx.restore(); }
      K.slip('MONTHLY', 540, 1200, R2(seg(lt, d * 0.4, d * 0.6)), 0.03, 64);
      K.ribbon('YOU PICK THE PRICE', 540, 1450, R2(seg(lt, d * 0.6, d * 0.9)), 80);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); for (let k = 0; k < 5; k++) cue(st + len(7) * (0.22 + k * 0.08), 'tock', { gain: 0.35 }); cue(st + len(7) * 0.7, 'slam', { gain: 0.8 }); }

  // 8 · rolled out country by country: check your professional dashboard
  { const st = cs(8), d9 = len(8), mid = st + d9 * 0.45;
    add({ id: 'S09a', at: st, cam: [540, 960], zoom: 0.12, note: 'a world-ish parchment with pins popping one by one: COUNTRY BY COUNTRY', draw(lt, d, t) {
      K.parchment(16);
      const lands = [[260, 640, 200, 150], [720, 600, 260, 180], [420, 1050, 180, 160], [820, 1100, 160, 140]];
      lands.forEach(([x, y, rx, ry], k) => cut(() => { ctx.beginPath(); ctx.ellipse(x, y, rx * R2(seg(lt, 0.02 + k * 0.03, 0.2 + k * 0.03)), ry * R2(seg(lt, 0.02 + k * 0.03, 0.2 + k * 0.03)), 0.2 * k, 0, TAU); }, P.land, { shadow: 0.8, edge: 6 }));
      lands.forEach(([x, y], k) => { const f = R2(seg(lt, d * (0.2 + k * 0.12), d * (0.32 + k * 0.12))); if (f > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(f, f); cut(P_circ(0, 0, 40), P.crimson, { shadow: 0.5, edge: 4 }); ctx.restore(); } });
      K.ribbon('COUNTRY BY COUNTRY', 540, 1450, R2(seg(lt, d * 0.35, d * 0.6)), 76);
    } });
    add({ id: 'S09b', at: mid, cam: [540, 960], zoom: 0.16, note: 'phone with PROFESSIONAL DASHBOARD rows, magnifier over SUBSCRIPTIONS row: CHECK IT ribbon', draw(lt, d, t) {
      room(17);
      phoneBig(540, 820, 1.2 * R2(seg(lt, 0.02, 0.2)), -0.02, () => { K.label('DASHBOARD', 0, -300, 46, P.ink); ['', 'SUBSCRIPTIONS', ''].forEach((s, k) => { cut(P_rr(-160, -200 + k * 140, 320, 100, 12), k === 1 ? P.gold : '#FFFBF0', { shadow: 0.2, edge: 2 }); if (s) K.label(s, 0, -150 + k * 140, 28, P.ink); }); });
      magnifier(lerp(900, 640, eo(seg(lt, d * 0.2, d * 0.55))), 820, 1.1 * R2(seg(lt, d * 0.15, d * 0.3)));
      K.ribbon('CHECK IT', 540, 1450, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); [0.2, 0.32, 0.44, 0.56].forEach((a) => cue(st + d9 * 0.45 * a, 'plop', { gain: 0.4 })); cue(st + d9 * 0.45 * 0.75, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d9 * 0.55 * 0.25, 'slide', { gain: 0.4, dur: 0.6 }); cue(mid + d9 * 0.55 * 0.6, 'slam', { gain: 0.7 }); }

  // 9 · step 1: on Close Friends, see what fans reply to most
  { const st = cs(9);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: '1 WATCH REPLIES card, phone with reply bubbles stacking, one gold bubble is the winner', draw(lt, d, t) {
      dayPage(18);
      rankCard(1, 'WATCH REPLIES', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.02, 680);
      phoneBig(540, 960, 1.15 * R2(seg(lt, 0.05, 0.22)), 0.02, () => { avatar(0, -280, 0.5, P.forest, 1); });
      ['so cool!', 'more pls', 'how??'].forEach((s, k) => bubble(s, k % 2 ? 640 : 380, 880 + k * 150, R2(seg(lt, d * (0.2 + k * 0.12), d * (0.35 + k * 0.12))), k % 2 === 1, 52));
      bigMark('★', 860, 1380, R2(seg(lt, d * 0.65, d * 0.8)), 0.1, P.gold, 200);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.22, 0.34, 0.46].forEach((a) => cue(st + len(9) * a, 'bubbles', { gain: 0.35, dur: 0.3 })); cue(st + len(9) * 0.68, 'sparkle', { gain: 0.6 }); }

  // 10 · step 2: at 10,000 put the same content into Subscriptions
  { const st = cs(10);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: '2 AT 10K card: the green-ring story card slides into a badge-locked SUBSCRIPTIONS box', draw(lt, d, t) {
      nightPage(19);
      rankCard(2, 'AT 10K', 540, 250, R2(seg(lt, 0.02, 0.2)), -0.02, 480);
      const f = eio(seg(lt, d * 0.25, d * 0.7));
      cut(P_rr(560, 760, 400, 500, 20), '#FFFBF0'); badge(760, 900, R2(seg(lt, d * 0.05, d * 0.2))); K.label('SUBS', 760, 1160, 64, P.ink);
      avatar(lerp(300, 760, f), lerp(800, 1050, f), 0.9 * (1 - 0.5 * f) * R2(seg(lt, d * 0.05, d * 0.2)), P.forest, 1);
      K.ribbon('SAME CONTENT', 540, 1480, R2(seg(lt, d * 0.65, d * 0.95)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + len(10) * 0.25, 'slide', { gain: 0.5, dur: 0.8 }); cue(st + len(10) * 0.7, 'slam', { gain: 0.7 }); }

  // 11 · loop: the fans are already there, just invite them in (back to beat-0 room)
  { const st = cs(11);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: the three fans step through an open door, INVITE THEM IN ribbon', draw(lt, d, t) {
      room(1);
      door(540, 1300, 1.3 * R2(seg(lt, 0.02, 0.2)), eo(seg(lt, d * 0.1, d * 0.35)));
      [200, 540, 880].forEach((x, k) => person({ x: lerp(x, 540, eo(seg(lt, d * (0.3 + k * 0.08), d * (0.8 + k * 0.05))) * 0.5), y: 1650, h: 420, arm: 40, top: [P.forest, P.wine, P.royal][k], glow: 0.7, dir: k === 2 ? -1 : 1 }));
      K.ribbon('INVITE THEM IN', 540, 420, R2(seg(lt, d * 0.45, d * 0.8)), 96);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.15, 'slide', { gain: 0.4, dur: 0.5 }); cue(st + len(11) * 0.55, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend whose fans watch every story
  { const st = cs(12);
    add({ id: 'S13', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a green-ring avatar, handle slip', draw(lt, d, t) {
      dayPage(20); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      avatar(300, 1200, 0.9 * R2(seg(lt, d * 0.3, d * 0.45)), P.forest, eo(seg(lt, d * 0.35, d * 0.7)));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.royal, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'sparkle', { gain: 0.4 }); }

  return { shots: S, cues: CUES };
}
