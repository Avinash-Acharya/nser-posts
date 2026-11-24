// 25 Nov 11am: BROADCAST CHANNELS: TALK TO YOUR FANS IN ONE PLACE. Paper style.
// Facts (opened 24 Nov 2026): Instagram blog "Introducing Broadcast Channels" + Meta Newsroom (16 Feb 2023):
// a creator starts a channel from the Instagram inbox; "Only creators can send messages", followers "can react to
// content and vote in polls"; creators share "text, video, photos, voice notes and polls"; after the first message,
// followers get a "one-time notification to join"; "Anyone can discover the broadcast channel and view the content",
// non-followers who join "will be prompted" to follow; only followers who join get update notifications; a story
// "join channel" sticker is one way in. The poll-for-next-reel step and the loop line are nser's advice.
// No real person, no logo.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, clock, magnifier, strike, rankCard } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a paper envelope */
function envelope(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-160, -105, 320, 210, 10), '#FFFBF0'); line([[-160, -100], [0, 20], [160, -100]], P.sepia, 6); cut(P_circ(0, 20, 26), P.crimson, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a paper megaphone pointing right */
function megaphone(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_poly([[-120, -40], [80, -120], [80, 120], [-120, 40]]), P.crimson); cut(P_rr(-170, -45, 60, 90, 14), P.stoneDark, { shadow: 0.4, edge: 4 });
  cut(P_rr(-110, 30, 34, 100, 12), P.ink, { shadow: 0.3, edge: 3 });
  for (let k = 0; k < 3; k++) { ctx.strokeStyle = P.gold; ctx.lineWidth = 10; ctx.lineCap = 'round'; ctx.beginPath(); ctx.arc(80, 0, 60 + k * 45, -0.6, 0.6); ctx.stroke(); } ctx.restore(); }
/** a voice-note bubble: play button + waveform; p 0..1 = played part (gold) */
function voiceNote(x, y, s, p = 0, t = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-240, -70, 480, 140, 70), '#CFE3BF'); cut(P_circ(-170, 0, 46), P.crimson, { shadow: 0.3, edge: 3 });
  ctx.fillStyle = P.edge; ctx.beginPath(); ctx.moveTo(-185, -24); ctx.lineTo(-185, 24); ctx.lineTo(-145, 0); ctx.closePath(); ctx.fill();
  for (let k = 0; k < 16; k++) { const bx = -100 + k * 20, h = 16 + 34 * Math.abs(Math.sin(k * 1.7 + (k / 16 < p ? t * 6 : 0))); line([[bx, -h / 2], [bx, h / 2]], k / 16 < p ? P.gold : P.sepia, 10); }
  ctx.restore(); }
/** a poll card: question + two bars that fill to a and b (0..1) */
function poll(x, y, s, a = 0, b = 0, q = 'NEXT REEL?', oa = 'A', ob = 'B', rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-260, -200, 520, 400, 24), '#FFFBF0'); K.label(q, 0, -130, 52, P.ink);
  [[oa, a, -20, P.crimson], [ob, b, 110, P.gold]].forEach(([l, v, yy, c]) => { cut(P_rr(-220, yy - 40, 440, 80, 40), P.parchDark, { shadow: 0, edge: 0 });
    if (v > 0) cut(P_rr(-220, yy - 40, Math.max(80, 440 * clamp(v)), 80, 40), c, { shadow: 0, edge: 0 }); K.label(l, -170, yy + 2, 44, P.ink); });
  ctx.restore(); }
/** a paper bell; ring 0..1 makes it swing */
function bell(x, y, s, t = 0, ring = 1) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(0.3 * Math.sin(t * 14) * ring); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(-90, 60); ctx.quadraticCurveTo(-80, -100, 0, -110); ctx.quadraticCurveTo(80, -100, 90, 60); ctx.lineTo(110, 80); ctx.lineTo(-110, 80); ctx.closePath(); }, P.gold);
  cut(P_circ(0, 100, 26), P.crimson, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a small paper heart */
function heart(x, y, s, col = P.crimson) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(() => { ctx.beginPath(); ctx.moveTo(0, 40); ctx.bezierCurveTo(-90, -20, -45, -90, 0, -40); ctx.bezierCurveTo(45, -90, 90, -20, 0, 40); ctx.closePath(); }, col, { shadow: 0.4, edge: 4 }); ctx.restore(); }
/** a calendar page with a gold value */
function calendar(x, y, s, val = '7 PM', top = 'TOMORROW', rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-190, -170, 380, 340, 20), '#FFFBF0'); cut(P_rr(-190, -170, 380, 100, 20), P.crimson, { shadow: 0, edge: 0 }); cut(P_rr(-190, -100, 380, 30, 0), P.crimson, { shadow: 0, edge: 0 });
  K.label(top, 0, -118, 40, P.edge); K.label(val, 0, 60, 110, P.gold); ctx.restore(); }
/** the channel phone: three of YOUR bubbles (right side) appear with p 0..1, + optional voice note */
function channelPhone(x, y, s, p = 1, rot = 0, t = 0) { phoneBig(x, y, s, rot, () => {
  cut(P_rr(-186, -370, 372, 90, 0), P.royal, { shadow: 0, edge: 0 }); K.label('MY CHANNEL', 0, -322, 34, P.edge);
  if (p > 0.1) bubble('Hi fam!', 160, -200, R2((p - 0.1) * 4), true, 44);
  if (p > 0.35) bubble('New reel', 160, -90, R2((p - 0.35) * 4), true, 44);
  if (p > 0.6) voiceNote(10, 40, 0.62 * R2((p - 0.6) * 4), p, t);
  if (p > 0.8) { heart(-120, 200, 0.6 * R2((p - 0.8) * 5)); heart(-30, 230, 0.5 * R2((p - 0.85) * 5), P.gold); }
}); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · your reel doesn't reach every follower? go straight to their inbox
  { const st = cs(0), d0 = len(0), mid = st + d0 * 0.5;
    add({ id: 'S00a', at: st, cam: [540, 960], zoom: 0.1, note: 'reel card in the middle, five followers below, only two light up: NOT EVERYONE slip', draw(lt, d, t) {
      dayPage(1); ground(1500, M.wall2);
      postCard(540, 640, 1.1 * R2(seg(lt, 0.02, 0.2)), -0.03);
      [140, 340, 540, 740, 940].forEach((x, k) => person({ x, y: 1640, h: 380, arm: 50, top: [M.tee, M.hoodie2, M.hoodie, P.royal, P.wine][k], glow: (k === 1 || k === 3) ? eo(seg(lt, d * 0.3, d * 0.5)) : 0 }));
      K.slip('NOT EVERYONE', 540, 1080, R2(seg(lt, d * 0.5, d * 0.7)), -0.03, 70);
    } });
    add({ id: 'S00b', at: mid, cam: [540, 960], zoom: 0.16, note: 'envelope flies into a big phone, THEIR INBOX ribbon', draw(lt, d, t) {
      dayPage(2, false);
      phoneBig(540, 900, 1.15, 0.02, () => { cut(P_rr(-186, -370, 372, 90, 0), P.royal, { shadow: 0, edge: 0 }); K.label('INBOX', 0, -322, 40, P.edge); });
      const f = eo(seg(lt, 0.05, d * 0.5)); envelope(lerp(-100, 540, f), lerp(300, 900, f), lerp(0.6, 0.9, f), lerp(-0.4, 0, f));
      K.ribbon('THEIR INBOX', 540, 1580, R2(seg(lt, d * 0.5, d * 0.8)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'pop', { gain: 0.5 }); cue(st + d0 * 0.5 * 0.3, 'sparkle', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + d0 * 0.5 * 0.45, 'thud', { gain: 0.6 }); cue(mid + d0 * 0.5 * 0.55, 'slam', { gain: 0.7 }); }

  // 1 · simply put: a group chat where only you talk
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 960], zoom: 0.14, note: 'SIMPLY PUT slip, channel phone fills with YOUR bubbles, megaphone beside, ONLY YOU TALK ribbon', draw(lt, d, t) {
      dayPage(3);
      K.slip('SIMPLY PUT', 540, 200, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      channelPhone(600, 880, 1.0 * R2(seg(lt, 0.05, 0.25)), seg(lt, d * 0.2, d * 0.7) * 0.6, 0.03);
      megaphone(200, 760, 0.9 * R2(seg(lt, d * 0.3, d * 0.45)), -0.15);
      K.ribbon('ONLY YOU TALK', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 100);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); [0.3, 0.45].forEach((a) => cue(st + len(1) * a, 'pop', { gain: 0.4 })); cue(st + len(1) * 0.6, 'slam', { gain: 0.7 }); }

  // 2 · text, photos, videos, voice notes and polls
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'five things pop one by one: TEXT bubble, PHOTO card, VIDEO card, VOICE note, POLL card, each with a slip', draw(lt, d, t) {
      nightPage(4);
      const a = (k) => R2(seg(lt, 0.02 + d * k * 0.15, 0.2 + d * k * 0.15));
      bubble('Hello!', 120, 320, a(0), false, 70); K.slip('TEXT', 240, 450, a(0), -0.04, 54);
      postCard(800, 420, 0.7 * a(1), 0.06); K.slip('PHOTO', 800, 640, a(1), 0.04, 54);
      postCard(260, 850, 0.7 * a(2), -0.05); if (a(2) > 0) { ctx.save(); ctx.translate(260, 820); ctx.scale(a(2), a(2)); cut(P_poly([[-30, -40], [-30, 40], [40, 0]]), P.edge, { shadow: 0.3, edge: 0 }); ctx.restore(); } K.slip('VIDEO', 260, 1070, a(2), -0.04, 54);
      voiceNote(740, 900, 0.75 * a(3), seg(lt, d * 0.5, d), t); K.slip('VOICE', 740, 1030, a(3), 0.04, 54);
      poll(540, 1380, 0.8 * a(4), 0.6 * seg(lt, d * 0.7, d), 0.35 * seg(lt, d * 0.7, d), 'POLL');
    } });
    [0.05, 0.2, 0.35, 0.5, 0.65].forEach((a) => cue(st + len(2) * a, 'pop', { gain: 0.5 })); cue(st, 'whoosh'); }

  // 3 · followers can't message, they react and vote
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.14, note: 'follower types a message: bubble gets struck out crimson; hearts float up; poll bars fill: REACT + VOTE slips', draw(lt, d, t) {
      room(5);
      person({ x: 220, y: 1650, h: 560, arm: 70, top: M.hoodie2, glow: 0.5 });
      bubble('Can I say...', 340, 420, R2(seg(lt, 0.02, 0.2)), false, 58); strike(340, 430, 400, seg(lt, d * 0.2, d * 0.35));
      for (let k = 0; k < 4; k++) { const u = (t * 0.5 + k / 4) % 1; heart(560 + 60 * Math.sin(k * 2 + t), 1100 - u * 500, 0.7 * clamp(seg(lt, d * 0.35, d * 0.45)) * (1 - u * 0.5), k % 2 ? P.crimson : P.gold); }
      K.slip('REACT', 600, 1220, R2(seg(lt, d * 0.4, d * 0.55)), -0.04, 64);
      poll(800, 820, 0.6 * R2(seg(lt, d * 0.5, d * 0.65)), 0.7 * seg(lt, d * 0.6, d), 0.3 * seg(lt, d * 0.6, d), 'VOTE');
      K.slip('VOTE', 840, 1220, R2(seg(lt, d * 0.65, d * 0.8)), 0.04, 64);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.28, 'zip', { gain: 0.6 }); cue(st + len(3) * 0.42, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.6, 'pop', { gain: 0.5 }); cue(st + len(3) * 0.72, 'slam', { gain: 0.5 }); }

  // 4 · you: new reel tomorrow, you send a voice note: tomorrow 7 PM
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.5;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'you in room with a NEW REEL card, a voice note bubble flies out of the phone', draw(lt, d, t) {
      room(6);
      person({ x: 260, y: 1650, h: 640, arm: 80, top: M.tee, glow: 0.8 });
      postCard(780, 620, 0.9 * R2(seg(lt, 0.02, 0.2)), 0.05); K.slip('NEW REEL', 780, 380, R2(seg(lt, 0.1, 0.3)), 0.03, 60);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); voiceNote(lerp(380, 620, f), lerp(1150, 1080, f), 0.8 * R2(seg(lt, d * 0.4, d * 0.55)), seg(lt, d * 0.5, d), t);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.16, note: 'channel phone plays the voice note, calendar TOMORROW 7 PM pops beside', draw(lt, d, t) {
      dayPage(7);
      channelPhone(330, 940, 0.95, 0.75 + 0.25 * seg(lt, 0, d * 0.5), -0.04, t);
      calendar(790, 760, 1.0 * R2(seg(lt, d * 0.2, d * 0.4)), '7 PM', 'TOMORROW', 0.05);
      K.ribbon('SEE YOU THERE', 540, 1620, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.4 }); cue(st + d4 * 0.5 * 0.45, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + d4 * 0.5 * 0.25, 'slam', { gain: 0.7 }); cue(mid + d4 * 0.5 * 0.6, 'pop', { gain: 0.5 }); }

  // 5 · people who joined get notified about updates
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 960], zoom: 0.14, note: 'three joined fans with JOINED tags, a bell rings over each and their phones light up: NOTIFIED ribbon', draw(lt, d, t) {
      dayPage(8); ground(1500, M.wall2);
      [[200, M.hoodie], [540, P.royal], [880, P.wine]].forEach(([x, c], k) => { const on = seg(lt, d * (0.3 + k * 0.1), d * (0.4 + k * 0.1));
        person({ x, y: 1600, h: 460, arm: 60, top: c, glow: eo(on) }); K.slip('JOINED', x, 1680, R2(seg(lt, 0.05 + k * 0.1, 0.25 + k * 0.1)), (k - 1) * 0.04, 46); bell(x, 760, 0.8 * R2(on), t, 1); });
      K.ribbon('NOTIFIED', 540, 420, R2(seg(lt, d * 0.55, d * 0.85)), 120);
    } });
    cue(st, 'whoosh'); [0.3, 0.4, 0.5].forEach((a) => cue(st + len(5) * a, 'sparkle', { gain: 0.5 })); cue(st + len(5) * 0.6, 'slam', { gain: 0.6 }); }

  // 6 · game changer: first message → one-time join notification to followers
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.12, note: 'GAME CHANGER slip, you tap send on 1ST MESSAGE bubble, dashed routes run out to many small phones', draw(lt, d, t) {
      nightPage(9);
      K.slip('GAME CHANGER', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      bubble('1st message', 760, 500, R2(seg(lt, 0.1, 0.3)), true, 60);
      phoneBig(540, 880, 0.55 * R2(seg(lt, 0.05, 0.2)), 0, () => { cut(P_rr(-186, -370, 372, 90, 0), P.royal, { shadow: 0, edge: 0 }); });
      const ends = [[150, 1350], [400, 1450], [680, 1450], [930, 1350]];
      ends.forEach(([x, y], k) => { K.dashedRoute([[540, 1110], [lerp(540, x, 0.5), 1250], [x, y - 120]], eo(seg(lt, d * 0.35, d * 0.7))); phoneBig(x, y, 0.22 * R2(seg(lt, d * (0.6 + k * 0.05), d * (0.7 + k * 0.05))), (k - 1.5) * 0.08); });
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.16, note: 'big phone shows JOIN notification card, gold 1 TIME stamp, ribbon ONE-TIME INVITE', draw(lt, d, t) {
      dayPage(10, false);
      phoneBig(540, 760, 0.82, -0.02, () => { const s = R2(seg(lt, 0.1, 0.35)); if (s > 0) { ctx.save(); ctx.translate(0, -180); ctx.scale(s, s); cut(P_rr(-160, -70, 320, 140, 20), '#FFFBF0'); bell(-100, -10, 0.4, t); K.label('JOIN?', 40, 4, 50, P.crimson); ctx.restore(); } });
      bigMark('1 TIME', 540, 1290, R2(seg(lt, d * 0.35, d * 0.55)), -0.08, P.gold, 170);
      K.ribbon('ONE-TIME INVITE', 540, 1600, R2(seg(lt, d * 0.55, d * 0.85)), 96);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.4, 'zip', { gain: 0.6 }); [0.6, 0.65, 0.7, 0.75].forEach((a) => cue(st + d6 * 0.45 * a, 'pop', { gain: 0.35 })); cue(mid, 'whoosh'); cue(mid + d6 * 0.55 * 0.2, 'sparkle', { gain: 0.6 }); cue(mid + d6 * 0.55 * 0.45, 'slam', { gain: 0.8 }); }

  // 7 · craziest: anyone can find and read, but to join they must follow
  { const st = cs(7), d7 = len(7), mid = st + d7 * 0.5;
    add({ id: 'S07a', at: st, cam: [540, 960], zoom: 0.12, note: 'CRAZIEST PART slip, a stranger with a magnifier reads the channel phone: ANYONE CAN READ', draw(lt, d, t) {
      room(11);
      K.slip('CRAZIEST PART', 540, 220, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      channelPhone(680, 900, 0.8 * R2(seg(lt, 0.05, 0.2)), 1, 0.04, t);
      person({ x: 230, y: 1650, h: 560, arm: 30, top: P.stoneDark, phone: false });
      magnifier(lerp(500, 640, 0.5 + 0.5 * Math.sin(t * 2)), 820, 0.8 * R2(seg(lt, 0.2, 0.4)));
      K.ribbon('ANYONE CAN READ', 540, 1560, R2(seg(lt, d * 0.5, d * 0.8)), 92);
    } });
    add({ id: 'S07b', at: mid, cam: [540, 960], zoom: 0.16, note: 'JOIN button card, a crimson FOLLOW FIRST stamp; stranger presses follow and glows', draw(lt, d, t) {
      dayPage(12);
      const s = R2(seg(lt, 0.02, 0.2)); if (s > 0) { ctx.save(); ctx.translate(540, 620); ctx.scale(s, s); cut(P_rr(-260, -80, 520, 160, 80), P.royal); K.label('JOIN', 0, 6, 80, P.edge); ctx.restore(); }
      bigMark('FOLLOW FIRST', 540, 900, R2(seg(lt, d * 0.3, d * 0.5)), -0.06, P.crimson, 120);
      person({ x: 540, y: 1650, h: 520, arm: 70, top: P.stoneDark, glow: eo(seg(lt, d * 0.6, d * 0.85)) });
      K.slip('+1 FOLLOWER', 820, 1180, R2(seg(lt, d * 0.65, d * 0.8)), 0.05, 56);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + d7 * 0.5 * 0.55, 'slam', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'pop', { gain: 0.5 }); cue(mid + d7 * 0.5 * 0.35, 'slam', { gain: 0.8 }); cue(mid + d7 * 0.5 * 0.7, 'sparkle', { gain: 0.5 }); }

  // 8 · what to do: start it from the inbox, add the join sticker to your story
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.45;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: '1 INBOX card, phone inbox with a + CHANNEL button being tapped by a paper hand', draw(lt, d, t) {
      dayPage(13);
      rankCard(1, 'INBOX', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 600);
      phoneBig(540, 980, 0.95 * R2(seg(lt, 0.05, 0.2)), 0.02, () => { cut(P_rr(-186, -370, 372, 90, 0), P.royal, { shadow: 0, edge: 0 }); K.label('INBOX', 0, -322, 40, P.edge);
        [0, 1, 2].forEach((k) => { cut(P_rr(-160, -240 + k * 120, 320, 90, 16), '#FFFBF0', { shadow: 0.3, edge: 2 }); });
        const pr = seg(lt, d * 0.5, d * 0.65); cut(P_rr(-150, 160, 300, 100, 50), pr > 0 ? P.crimson : P.gold, { shadow: 0.4, edge: 3 }); K.label('+ CHANNEL', 0, 212, 42, P.edge); });
      hand(lerp(800, 600, eo(seg(lt, d * 0.3, d * 0.55))), 1300, 1, -0.4, true);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.16, note: '2 JOIN STICKER card, a story phone gets a gold JOIN sticker slapped on', draw(lt, d, t) {
      nightPage(14);
      rankCard(2, 'STORY STICKER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 720);
      phoneBig(540, 1000, 0.95, -0.03, () => { ctx.fillStyle = P.sea; ctx.fillRect(-186, -370, 372, 740); for (let k = 0; k < 3; k++) line([[-150 + k * 110, -340], [-100 + k * 110, -340]], P.edge, 8);
        const s = seg(lt, d * 0.3, d * 0.5), sc = s <= 0 ? 0 : lerp(2.2, 1, eo(s)); if (sc) { ctx.save(); ctx.translate(0, 40); ctx.rotate(-0.08); ctx.scale(sc, sc); cut(P_rr(-140, -60, 280, 120, 26), P.gold); K.label('JOIN', 0, 4, 64, P.ink); ctx.restore(); } });
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); cue(st + d8 * 0.45 * 0.55, 'tock', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + 0.2, 'slam', { gain: 0.5 }); cue(mid + d8 * 0.55 * 0.4, 'thud', { gain: 0.7 }); }

  // 9 · then a poll: what should the next reel be about
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.14, note: '3 POLL card, NEXT REEL? poll fills, votes as gold dots fly in, winner bar ticks', draw(lt, d, t) {
      dayPage(15);
      rankCard(3, 'POLL', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.02, 600);
      const v = seg(lt, d * 0.3, d * 0.9);
      poll(540, 900, 1.3 * R2(seg(lt, 0.1, 0.3)), 0.72 * v, 0.28 * v, 'NEXT REEL?', 'A', 'B', 0.02);
      for (let k = 0; k < 6; k++) { const u = clamp(seg(lt, d * (0.3 + k * 0.08), d * (0.45 + k * 0.08))); if (u > 0 && u < 1) circle(lerp(k % 2 ? 1000 : 80, 540, eo(u)), lerp(1500, 900, eo(u)), 22, P.gold); }
      K.slip('YOUR FANS DECIDE', 540, 1500, R2(seg(lt, d * 0.55, d * 0.75)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slam', { gain: 0.5 }); [0.35, 0.45, 0.55, 0.65].forEach((a) => cue(st + len(9) * a, 'pop', { gain: 0.35 })); cue(st + len(9) * 0.6, 'sparkle', { gain: 0.5 }); }

  // 10 · loop: reels for the feed, the talk for the inbox (back to beat-0 reel card + inbox phone)
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.14, note: 'split: left reel card FEED slip, right channel phone INBOX slip, envelope lands', draw(lt, d, t) {
      dayPage(1);
      postCard(290, 820, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05); K.slip('FEED', 290, 1180, R2(seg(lt, 0.1, 0.3)), -0.04, 80);
      channelPhone(790, 860, 0.72 * R2(seg(lt, d * 0.35, d * 0.5)), 1, 0.04, t); K.slip('INBOX', 790, 1250, R2(seg(lt, d * 0.45, d * 0.6)), 0.04, 80);
      K.ribbon('BOTH', 540, 1580, R2(seg(lt, d * 0.65, d * 0.9)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.4, 'pop', { gain: 0.5 }); cue(st + len(10) * 0.7, 'slam', { gain: 0.8 }); }

  // 11 · follow + send to the friend who wants to get closer to fans
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, friend with a megaphone + hearts, handle slip', draw(lt, d, t) {
      dayPage(16); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      megaphone(300, 1200, 0.7 * R2(seg(lt, d * 0.3, d * 0.45)), -0.2);
      heart(250, 1020, 0.6 * R2(seg(lt, d * 0.4, d * 0.55))); heart(380, 1000, 0.5 * R2(seg(lt, d * 0.45, d * 0.6)), P.gold);
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: eo(seg(lt, d * 0.5, d * 0.85)) });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(11) * 0.4, 'thud', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
