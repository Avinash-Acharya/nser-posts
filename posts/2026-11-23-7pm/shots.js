// 23 Nov 7pm: STORY STICKERS THAT BRING REPLIES (POLLS, QUESTIONS). Paper style.
// Facts (opened 22 Nov 2026): Instagram blog "Introducing Polls in Instagram Stories" (3 Oct 2017): poll sticker = a
// question + two options; friends and followers vote and see real-time results; the owner sees who voted and which
// option they chose in the viewers list; poll and results disappear after 24 hours like the story. Instagram blog
// "Introducing the Questions Sticker" (10 Jul 2018): friends reply as many times as they want; tap a question to create
// a new story answering it; when you share a response, the friend's photo and username are not shown.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, clock } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a story screen inside phoneBig: progress bar on top, a soft photo */
function story(prog = 0.3, bg = P.sea) { cut(P_rr(-186, -370, 372, 740, 0), bg, { shadow: 0, edge: 0 });
  rr(-160, -350, 320, 8, 4); ctx.fillStyle = 'rgba(247,239,220,0.5)'; ctx.fill(); rr(-160, -350, 320 * clamp(prog), 8, 4); ctx.fillStyle = P.edge; ctx.fill();
  circle(-140, -310, 20, P.gold); }
/** a poll sticker: question + two options; p = vote progress 0..1 shows % bars, pick = 0/1 highlighted */
function poll(x, y, s, q, a, b, p = 0, va = 0.62, pick = -1, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-260, -170, 520, 340, 30), '#FFFBF0'); K.label(q, 0, -105, 50, P.ink);
  [[a, -130, va], [b, 130, 1 - va]].forEach(([t, ox, v], k) => { cut(P_rr(ox - 115, -40, 230, 170, 22), k === pick ? '#F2E3BC' : '#EFE5CC', { shadow: 0.3, edge: 3 });
    if (p > 0) { const h = 150 * v * eo(p); cut(P_rr(ox - 105, 120 - h, 210, h, 14), k ? P.royal : P.crimson, { shadow: 0, edge: 0 }); }
    if (p > 0.5) { K.label(`${Math.round(v * 100 * eo(p))}%`, ox, -2, 60, P.ink); K.label(t, ox, 98, 40, P.edge); } else K.label(t, ox, 45, 52, P.ink); });
  ctx.restore(); }
/** a questions sticker: header + reply field */
function qbox(x, y, s, head = 'ASK ME ANYTHING', reply = 'Type something...', rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-260, -130, 520, 260, 30), '#FFFBF0'); cut(P_rr(-260, -130, 520, 100, 30), P.crimson, { shadow: 0, edge: 0 }); cut(P_rr(-260, -60, 520, 30, 0), P.crimson, { shadow: 0, edge: 0 });
  K.label(head, 0, -78, 42, P.edge); cut(P_rr(-220, 10, 440, 90, 20), '#EFE5CC', { shadow: 0, edge: 2 }); K.label(reply, 0, 56, 38, P.sepia); ctx.restore(); }
/** a small faceless avatar circle; hidden = grey with a crimson slash */
function avatar(x, y, s, hidden = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_circ(0, 0, 70), hidden > 0.5 ? P.stone : P.skin); cut(() => { ctx.beginPath(); ctx.arc(0, -6, 74, Math.PI * 0.95, Math.PI * 2.05); ctx.closePath(); }, hidden > 0.5 ? P.stoneDark : M.hair, { shadow: 0.3, edge: 3 });
  if (hidden > 0) { ctx.save(); ctx.globalAlpha = clamp(hidden); line([[-80, 80], [80, -80]], P.crimson, 16); ctx.restore(); } ctx.restore(); }
/** a viewers list row: avatar + name bar + small pick chip */
function row(x, y, s, chip, col) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-380, -60, 760, 120, 20), '#FFFBF0', { shadow: 0.5, edge: 3 });
  ctx.translate(-300, 0); ctx.scale(0.6, 0.6); avatar(0, 0, 1); ctx.restore(); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  line([[-200, 0], [60, 0]], 'rgba(62,44,30,0.3)', 20); cut(P_rr(150, -36, 200, 72, 36), col, { shadow: 0, edge: 2 }); K.label(chip, 250, 2, 40, P.edge); ctx.restore(); }
/** green tick */
function tick(x, y, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 90), P.green); line([[-40, 0], [-10, 34], [45, -34]], P.edge, 20); ctx.restore(); }
/** a thumbnail card (generic picture) with a letter */
function thumb(x, y, s, letter, col, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -200, 300, 400, 16), col); circle(60, -110, 36, '#EFC66A'); cut(P_poly([[-150, 120], [-50, -10], [30, 70], [90, 20], [150, 120]]), P.forest, { shadow: 0.2, edge: 2 });
  cut(P_rr(-150, 120, 300, 80, 0), '#FFFBF0', { shadow: 0, edge: 0 }); K.label(letter, 0, 160, 56, P.ink); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · story gets views, zero replies? add one sticker
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.55;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'creator holds phone with a story, gold VIEWS count rises, crimson 0 REPLIES', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee });
      phoneBig(680, 900, 0.75 * R2(seg(lt, 0.02, 0.2)), 0.04, () => story(seg(lt, 0, 1)));
      bigMark(`${Math.round(1200 * eo(seg(lt, 0.15, 0.5)))} VIEWS`, 600, 300, R2(seg(lt, 0.1, 0.25)), -0.03, P.gold, 120);
      bigMark('0 REPLIES', 660, 1520, R2(seg(lt, d * 0.5, d * 0.7)), 0.04, P.crimson, 120);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'a poll sticker slaps onto the story with a hand, ONE STICKER ribbon', draw(lt, d, t) {
      dayPage(2);
      phoneBig(540, 880, 0.95, -0.02, () => story(0.5));
      poll(540, 940, 0.6 * R2(seg(lt, 0.1, 0.3)), 'YOUR PICK?', 'YES', 'NO', 0, 0.6, -1, -0.04);
      hand(760, 1150, 0.9 * R2(seg(lt, 0.05, 0.2)), -0.5, true);
      K.ribbon('ONE STICKER', 540, 1560, R2(seg(lt, 0.35, 0.65)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d0 * 0.15, 'zip', { gain: 0.4 }); cue(st + d0 * 0.32, 'thud', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.45 * 0.25, 'slam', { gain: 0.8 }); }

  // 1 · simply put: stickers turn a story into a conversation; people tap, not just watch
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, story phone left, dashed route to chat bubbles right; tap ripple on sticker', draw(lt, d, t) {
      dayPage(3, false);
      K.slip('SIMPLY PUT', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      phoneBig(300, 900, 0.7 * R2(seg(lt, 0.05, 0.22)), -0.04, () => { story(0.4); poll(0, 60, 0.6, 'YOUR PICK?', 'YES', 'NO'); });
      const r = seg(lt, 0.3, 0.5); if (r > 0 && r < 1) { ctx.save(); ctx.globalAlpha = 1 - r; ctx.strokeStyle = P.crimson; ctx.lineWidth = 10; ctx.beginPath(); ctx.arc(260, 960, 30 + 120 * r, 0, TAU); ctx.stroke(); ctx.restore(); }
      K.dashedRoute([[470, 800], [620, 700], [720, 640]], eo(seg(lt, 0.4, 0.6)));
      bubble('Option A!', 620, 600, R2(seg(lt, 0.5, 0.62)), false, 54);
      bubble('Me too', 1000, 760, R2(seg(lt, 0.6, 0.72)), true, 54);
      bubble('Why?', 640, 920, R2(seg(lt, 0.7, 0.82)), false, 54);
      K.ribbon('TAP, NOT JUST WATCH', 540, 1600, R2(seg(lt, d * 0.65, d * 0.95)), 84);
    } });
    cue(st, 'whoosh'); cue(st + len(1) * 0.35, 'pop', { gain: 0.5 }); [0.55, 0.65, 0.75].forEach((a) => cue(st + len(1) * a, 'pop', { gain: 0.4 })); cue(st + len(1) * 0.85, 'slam', { gain: 0.6 }); }

  // 2 · poll sticker: one question, two options, live results as soon as they vote
  { const st = cs(2), d2 = len(2), mid = st + d2 * 0.5;
    add({ id: 'S02a', at: st, cam: [540, 960], zoom: 0.12, note: 'POLL slip; a big poll sticker builds: question, then option A, option B appear', draw(lt, d, t) {
      dayPage(4);
      K.slip('1 · POLL', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      poll(540, 900, 1.5 * R2(seg(lt, 0.05, 0.25)), 'WHICH ONE?', 'A', 'B', 0);
      K.slip('1 QUESTION', 300, 1400, R2(seg(lt, d * 0.3, d * 0.5)), -0.04, 56);
      K.slip('2 OPTIONS', 780, 1400, R2(seg(lt, d * 0.55, d * 0.75)), 0.04, 56);
    } });
    add({ id: 'S02b', at: mid, cam: [540, 960], zoom: 0.16, note: 'hand taps A, the bars fill with live % results, LIVE RESULTS ribbon', draw(lt, d, t) {
      dayPage(5, false);
      poll(540, 860, 1.5, 'WHICH ONE?', 'A', 'B', seg(lt, 0.25, 0.7), 0.64, lt > d * 0.2 ? 0 : -1);
      hand(380, 1180, 0.9 * (1 - seg(lt, 0.3, 0.4)), -0.4, true);
      K.ribbon('LIVE RESULTS', 540, 1560, R2(seg(lt, d * 0.45, d * 0.75)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d2 * 0.5 * 0.15, 'pop', { gain: 0.5 }); cue(st + d2 * 0.5 * 0.4, 'pop', { gain: 0.4 }); cue(st + d2 * 0.5 * 0.65, 'pop', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d2 * 0.5 * 0.2, 'thud', { gain: 0.6 }); cue(mid + d2 * 0.5 * 0.5, 'zip', { gain: 0.5 }); }

  // 3 · you see who voted and which option they picked
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'VIEWERS LIST slip, rows slide in with avatar + A/B chip, magnifier hovers, WHO VOTED WHAT ribbon', draw(lt, d, t) {
      nightPage(6);
      K.slip('VIEWERS LIST', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      [['A', P.crimson], ['B', P.royal], ['A', P.crimson], ['A', P.crimson]].forEach(([c, col], k) => { const f = eo(seg(lt, 0.1 + k * 0.1, 0.3 + k * 0.1)); row(lerp(1400, 540, f), 560 + k * 180, 1, c, col); });
      K.ribbon('WHO VOTED WHAT', 540, 1500, R2(seg(lt, d * 0.55, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); [0.15, 0.25, 0.35, 0.45].forEach((a) => cue(st + len(3) * a, 'zip', { gain: 0.35 })); cue(st + len(3) * 0.7, 'slam', { gain: 0.6 }); }

  // 4 · you: stuck between two thumbnails, add a poll, audience decides
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator between thumbnail A and B, big crimson ? over head', draw(lt, d, t) {
      room(7);
      K.slip('YOU', 160, 260, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      person({ x: 540, y: 1650, h: 600, arm: 30, top: M.tee });
      thumb(220, 760, 0.85 * R2(seg(lt, 0.1, 0.3)), 'A', P.sea, -0.08 + 0.03 * Math.sin(t * 2));
      thumb(860, 760, 0.85 * R2(seg(lt, 0.2, 0.4)), 'B', P.sky, 0.08 - 0.03 * Math.sin(t * 2));
      bigMark('?', 540, 600, R2(seg(lt, d * 0.4, d * 0.6)), 0.08 * Math.sin(t * 3), P.crimson, 300);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'story phone with poll A vs B, bars fill, A wins with green tick, AUDIENCE DECIDES ribbon', draw(lt, d, t) {
      dayPage(8);
      phoneBig(540, 860, 1.0 * R2(seg(lt, 0.02, 0.18)), 0.02, () => { story(0.6); poll(0, 60, 0.66, 'A OR B?', 'A', 'B', seg(lt, 0.25, 0.65), 0.71); });
      tick(300, 930, R2(seg(lt, d * 0.65, d * 0.8)));
      K.ribbon('AUDIENCE DECIDES', 540, 1600, R2(seg(lt, d * 0.5, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + d4 * 0.5 * 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.3, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.5, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.45, 'zip', { gain: 0.5 }); cue(mid + d4 * 0.5 * 0.7, 'slam', { gain: 0.7 }); }

  // 5 · game changer: questions sticker, ask anything, as many times as they want
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, questions sticker pops big on a story', draw(lt, d, t) {
      nightPage(9);
      K.slip('GAME CHANGER', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      phoneBig(540, 960, 1.1 * R2(seg(lt, 0.05, 0.2)), -0.02, () => { story(0.3, P.sky); qbox(0, 0, 0.68 * R2(seg(lt, 0.25, 0.45))); });
      K.ribbon('QUESTIONS', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 130);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.16, note: 'many question cards fly in and pile up, gold ∞ mark: AS MANY AS THEY WANT', draw(lt, d, t) {
      dayPage(10, false);
      ['Your camera?', 'How to start?', 'Best time to post?', 'Your editing app?', 'How to grow?'].forEach((q, k) => { const f = eo(seg(lt, 0.05 + k * 0.1, 0.3 + k * 0.1)); bubble(q, lerp(-500, 120 + (k % 2) * 220, f), 420 + k * 170, f, false, 56); });
      bigMark('∞', 820, 1360, R2(seg(lt, d * 0.5, d * 0.7)), 0, P.gold, 280);
      K.ribbon('ASK ANYTHING', 540, 1660, R2(seg(lt, d * 0.55, d * 0.85)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.5 * 0.35, 'slam', { gain: 0.7 }); cue(mid, 'whoosh'); [0.1, 0.2, 0.3, 0.4, 0.5].forEach((a) => cue(mid + d5 * 0.5 * a, 'pop', { gain: 0.35 })); cue(mid + d5 * 0.5 * 0.65, 'slam', { gain: 0.6 }); }

  // 6 · tap any question → your answer becomes a new story
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 960], zoom: 0.12, note: 'a question bubble gets tapped, flies along dashed route into a fresh story phone with an answer, NEW STORY ribbon', draw(lt, d, t) {
      dayPage(11);
      bubble('How to start?', 120, 460, R2(seg(lt, 0.02, 0.18)), false, 60);
      hand(420, 600, 0.8 * (1 - seg(lt, 0.3, 0.4)) * R2(seg(lt, 0.08, 0.2)), -0.4, true);
      K.dashedRoute([[400, 520], [600, 640], [700, 780]], eo(seg(lt, 0.3, 0.55)));
      phoneBig(700, 1100, 0.7 * R2(seg(lt, 0.4, 0.55)), 0.05, () => { story(0.1, P.sky); bubble('How to start?', -160, -180, 1, false, 48); K.label('ANSWER', 0, 60, 70, P.crimson); });
      K.ribbon('NEW STORY', 540, 1640, R2(seg(lt, d * 0.6, d * 0.9)), 130);
    } });
    cue(st, 'whoosh'); cue(st + len(6) * 0.3, 'pop', { gain: 0.5 }); cue(st + len(6) * 0.45, 'zip', { gain: 0.5 }); cue(st + len(6) * 0.75, 'slam', { gain: 0.6 }); }

  // 7 · best part: share the answer, the asker's name and photo aren't shown
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.14, note: 'BEST PART slip, avatar + name bar get struck and greyed, the question stays, NAME HIDDEN ribbon', draw(lt, d, t) {
      room(12);
      K.slip('BEST PART', 540, 240, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const h = seg(lt, 0.4, 0.6);
      avatar(260, 620, 1.3 * R2(seg(lt, 0.05, 0.2)), h * 1.2);
      cut(P_rr(400, 570, 480, 100, 20), '#FFFBF0'); K.label(h > 0.5 ? '? ? ?' : '@username', 640, 622, 52, h > 0.5 ? P.stoneDark : P.ink);
      if (h > 0) line([[410, 640], [410 + 460 * eo(h), 600]], P.crimson, 12);
      bubble('How to start?', 220, 1000, R2(seg(lt, 0.15, 0.3)), false, 70);
      K.slip('NO NAME · NO PHOTO', 540, 1300, R2(seg(lt, d * 0.55, d * 0.75)), 0.03, 58);
      K.ribbon('ASKER HIDDEN', 540, 1600, R2(seg(lt, d * 0.65, d * 0.95)), 110);
    } });
    cue(st, 'whoosh'); cue(st + len(7) * 0.2, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.45, 'zip', { gain: 0.6 }); cue(st + len(7) * 0.75, 'slam', { gain: 0.7 }); }

  // 8 · like the story, the poll disappears in 24 hours
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 960], zoom: 0.14, note: 'clock spins, gold 24 HRS, poll sticker fades/shrinks away, GONE ribbon', draw(lt, d, t) {
      nightPage(13);
      clock(540, 560, 1.2 * R2(seg(lt, 0.02, 0.2)), seg(lt, 0.1, 0.9) * 24);
      bigMark('24 HRS', 540, 880, R2(seg(lt, 0.15, 0.35)), -0.04, P.gold, 170);
      const g = eo(seg(lt, d * 0.45, d * 0.8)); ctx.save(); ctx.globalAlpha = 1 - g; poll(540, 1230, 0.8 * (1 - 0.6 * g) * R2(seg(lt, 0.1, 0.25)), 'WHICH ONE?', 'A', 'B', 1, 0.64); ctx.restore();
      K.ribbon('THEN GONE', 540, 1600, R2(seg(lt, d * 0.6, d * 0.9)), 130);
    } });
    cue(st, 'whoosh'); cue(st + len(8) * 0.25, 'slam', { gain: 0.6 }); cue(st + len(8) * 0.6, 'zip', { gain: 0.5 }); cue(st + len(8) * 0.75, 'thud', { gain: 0.5 }); }

  // 9 · so: add a poll to today's story
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1 slip, TODAY slip, poll sticker lands on story phone, tick', draw(lt, d, t) {
      dayPage(14, false);
      K.slip('STEP 1', 200, 260, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      K.slip('TODAY', 820, 260, R2(seg(lt, 0.1, 0.25)), 0.04, 66);
      phoneBig(540, 920, 0.9 * R2(seg(lt, 0.05, 0.2)), 0, () => { story(0.5); const f = eo(seg(lt, 0.2, 0.5)); poll(0, lerp(-600, 40, f), 0.62, 'YOUR PICK?', 'YES', 'NO'); });
      tick(820, 1300, R2(seg(lt, d * 0.6, d * 0.75)));
      K.ribbon('ADD A POLL', 540, 1640, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + len(9) * 0.45, 'thud', { gain: 0.6 }); cue(st + len(9) * 0.7, 'slam', { gain: 0.6 }); }

  // 10 · tomorrow: questions sticker, answer the good ones on your story
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 2 slip, TOMORROW, questions sticker, three replies, one gets a gold star → ANSWER ON STORY', draw(lt, d, t) {
      dayPage(15);
      K.slip('STEP 2', 200, 260, R2(seg(lt, 0.02, 0.18)), -0.04, 66);
      K.slip('TOMORROW', 780, 260, R2(seg(lt, 0.1, 0.25)), 0.04, 62);
      qbox(540, 600, 1.2 * R2(seg(lt, 0.1, 0.3)));
      ['Best mic?', 'How to start?', 'Your editing app?'].forEach((q, k) => bubble(q, 140, 940 + k * 160, R2(seg(lt, d * (0.35 + k * 0.08), d * (0.5 + k * 0.08))), false, 56));
      if (lt > d * 0.6) bigMark('★', 880, 1100, R2(seg(lt, d * 0.6, d * 0.75)), 0, P.gold, 160);
      K.ribbon('ANSWER ON STORY', 540, 1640, R2(seg(lt, d * 0.65, d * 0.95)), 96);
    } });
    cue(st, 'whoosh'); [0.38, 0.46, 0.54].forEach((a) => cue(st + len(10) * a, 'pop', { gain: 0.4 })); cue(st + len(10) * 0.65, 'slam', { gain: 0.6 }); }

  // 11 · loop: from views to conversations, with one sticker (beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.14, note: 'beat-0 room: same creator + phone, now reply bubbles stream out, creator glows, ONE STICKER ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 230, y: 1650, h: 640, arm: 60, top: M.tee, glow: eo(seg(lt, 0.2, 0.6)) });
      phoneBig(680, 900, 0.75, 0.04, () => { story(0.7); poll(0, 40, 0.6, 'YOUR PICK?', 'YES', 'NO', 1, 0.6); });
      ['Yes!', 'No way', 'Love it'].forEach((q, k) => bubble(q, 120 + k * 60, 380 + k * 150, R2(seg(lt, 0.15 + k * 0.1, 0.3 + k * 0.1)), false, 54));
      K.ribbon('MORE REPLIES', 540, 1560, R2(seg(lt, 0.4, 0.7)), 110);
    } });
    cue(st, 'whoosh'); [0.2, 0.3, 0.4].forEach((a) => cue(st + len(11) * a, 'pop', { gain: 0.45 })); cue(st + len(11) * 0.55, 'slam', { gain: 0.8 }); }

  // 12 · follow + send to the friend whose stories never get replies
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with 0 REPLIES tag lights up, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      K.slip('0 REPLIES', 320, 1250, R2(seg(lt, d * 0.3, d * 0.45)), -0.04, 64);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
