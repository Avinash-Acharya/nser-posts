// 14 Nov 11am: FIX YOUR INSTAGRAM PROFILE IN 10 MINUTES. Paper style, present day.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, skyline, magnifier, bigMark,
  hand, clock, rankCard, strike, pin, cup } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

const txt = (s, x, y, size, col = P.ink, align = 'center') => { ctx.font = `700 ${size}px Caladea`; ctx.textAlign = align; ctx.textBaseline = 'middle'; ctx.fillStyle = col; ctx.fillText(s, x, y); };
/** a paper profile page inside phoneBig: avatar, name, bio lines, links, grid. o = {name, bio:[..], link, pins, hiName, hiBio, hiLink} */
function profile(o = {}) {
  ctx.fillStyle = '#FFFBF0'; ctx.fillRect(-186, -370, 372, 740);
  circle(-110, -270, 58, P.sepia); circle(-110, -290, 24, P.skin); ell(-110, -238, 36, 20, P.skin);
  txt('120', 0, -290, 30); txt('posts', 0, -258, 20, P.sepia); txt('86', 110, -290, 30); txt('followers', 110, -258, 20, P.sepia);
  if (o.hiName) { rr(-170, -205, 340, 50, 8); ctx.fillStyle = `rgba(200,149,47,${0.35 * o.hiName})`; ctx.fill(); }
  txt(o.name || 'Riya', -160, -180, 32, P.ink, 'left');
  (o.bio || ['just vibes']).forEach((b, k) => { if (o.hiBio && k < 2) { rr(-170, -150 + k * 40, 340, 38, 8); ctx.fillStyle = `rgba(200,149,47,${0.35 * o.hiBio})`; ctx.fill(); } txt(b, -160, -130 + k * 40, 26, P.ink, 'left'); });
  if (o.link) { txt(o.link, -160, -45, 24, P.royal, 'left'); }
  for (let i = 0; i < 9; i++) { const gx = -180 + (i % 3) * 122, gy = 10 + Math.floor(i / 3) * 122; rr(gx, gy, 116, 116, 4);
    ctx.fillStyle = o.pins && i < 3 ? [P.crimson, P.gold, P.royal][i] : ['#D6C39B', '#C9B68F', '#E0D0AE'][i % 3]; ctx.fill(); }
}
/** a shop signboard over a door */
function shop(x, y, s, word, sc = 1) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-260, -60, 520, 520, 8), '#C9A574'); cut(P_rr(-90, 180, 180, 280, 6), P.sepia); circle(60, 330, 10, P.gold);
  cut(P_rr(-200, 60, 90, 90, 4), P.sea, { shadow: 0, edge: 3 }); cut(P_rr(110, 60, 90, 90, 4), P.sea, { shadow: 0, edge: 3 });
  cut(P_poly([[-300, -60], [300, -60], [270, -130], [-270, -130]]), P.crimson);
  if (sc > 0) { ctx.save(); ctx.translate(0, -240); ctx.scale(sc, sc); cut(P_rr(-240, -70, 480, 140, 10), '#FFFBF0'); txt(word, 0, 4, 76, P.crimson); ctx.restore(); }
  ctx.restore(); }
/** a search bar card that types text with p */
function searchBar(x, y, w, text, p, sc = 1) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  cut(P_rr(-w / 2, -55, w, 110, 55), '#FFFBF0'); ctx.lineWidth = 8; ctx.strokeStyle = P.ink; ctx.beginPath(); ctx.arc(-w / 2 + 70, -6, 22, 0, TAU); ctx.stroke(); line([[-w / 2 + 86, 10], [-w / 2 + 104, 28]], P.ink, 8);
  const s = text.slice(0, Math.floor(text.length * clamp(p))); txt(s, -w / 2 + 130, 4, 52, P.ink, 'left'); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · someone visits your profile and leaves: a person looks at a phone profile, then walks off; NO FOLLOW slip
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'profile on a phone, a visitor glances then walks away, LEFT slip', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      phoneBig(380, 900, 1.15, -0.03, () => profile());
      const w = eio(seg(lt, d * 0.35, d * 0.9)); person({ x: lerp(820, 1250, w), y: 1640, h: 560, arm: 50, dir: w > 0 ? 1 : -1, walk: w > 0 ? lt * 9 : 0, top: P.royal });
      K.slip('PROFILE VISIT', 380, 250, R2(seg(lt, 0.1, 0.4)), -0.03, 64);
      K.slip('NO FOLLOW', 540, 1780, R2(seg(lt, d * 0.6, d * 0.8)), 0.03, 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.45, 'slide', { gain: 0.4 }); cue(st + len(0) * 0.6, 'thud', { gain: 0.5 }); }

  // 1 · simply put, your profile = your shop's signboard
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 980], zoom: 0.1, note: 'a paper shop, the signboard flips in: YOUR PROFILE', draw(lt, d, t) {
      dayPage(2); ground(1550, M.wall2); skyline(3, 1550);
      shop(540, 1100, 1.2, 'YOUR PROFILE', R2(seg(lt, d * 0.35, d * 0.65)));
      K.slip('signboard', 540, 1700, R2(seg(lt, d * 0.55, d * 0.8)), 0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + len(1) * 0.35, 'pop', { gain: 0.6 }); }

  // 2 · reels are good, so why no follows? big ? over a reel card with hearts
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.1, note: 'good reel card with a heart, GOOD REELS slip, big crimson ?', draw(lt, d, t) {
      dayPage(3); ground(1600, M.wall2);
      postCard(380, 980, 1.3, -0.04, 1);
      K.slip('GOOD REELS', 380, 560, R2(seg(lt, 0.1, 0.4)), -0.03, 64);
      bigMark('?', 820, 960, R2(seg(lt, d * 0.45, d * 0.7)), Math.sin(t * 2) * 0.1, P.crimson, 460);
      K.slip('0 FOLLOWS', 760, 1420, R2(seg(lt, d * 0.6, d * 0.85)), 0.04, 70);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); cue(st + len(2) * 0.45, 'boing', { gain: 0.4 }); }

  // 3 · Instagram search matches usernames, bios, captions, hashtags, places: search bar + 5 rank cards
  { const st = cs(3), d3 = len(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.08, note: 'search bar, 5 cards pop: USERNAME BIO CAPTION HASHTAG PLACE', draw(lt, d, t) {
      dayPage(4, false);
      searchBar(540, 300, 820, 'baking pune', seg(lt, 0.1, d * 0.3), R2(seg(lt, 0, 0.3)));
      K.slip('SEARCH MATCHES', 540, 480, R2(seg(lt, 0.3, 0.6)), -0.03, 60);
      ['USERNAME', 'BIO', 'CAPTION', 'HASHTAG', 'PLACE'].forEach((w, k) => { const a = d * (0.18 + k * 0.12); rankCard(k + 1, w, 540 + (k % 2 ? 30 : -30), 660 + k * 200 + Math.sin(t * 2 + k) * 5, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 600); });
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'tock', { gain: 0.4 }); for (let k = 0; k < 5; k++) cue(st + d3 * (0.18 + k * 0.12), 'pop', { gain: 0.5 }); }

  // 4 · someone in Pune searches "baking creator", your bio says "just vibes": map pin on Pune, then the bio, struck out
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.45;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.1, note: 'a person in Pune with phone + cup, search bubble "baking creator"', draw(lt, d, t) {
      room(5); cup(860, 1400, 1.0, t); person({ x: 380, y: 1560, h: 720, arm: 70, glow: 0.6, top: M.hoodie2 });
      K.ribbon('PUNE', 540, 260, R2(seg(lt, 0.05, 0.35)), 90);
      bubble('baking creator?', 300, 560, R2(seg(lt, 0.3, 0.6)), false, 66);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.14, note: 'your profile: bio "just vibes" gets a crimson ✗, NOT FOUND', draw(lt, d, t) {
      dayPage(6); ground(1650, M.wall2);
      phoneBig(540, 940, 1.3, 0.02, () => { profile({ hiBio: 1 }); });
      bigMark('✗', 830, 760, R2(seg(lt, 0.3, 0.55)) * 0.6, 0.1, P.crimson, 300);
      K.slip('NOT FOUND', 540, 1600, R2(seg(lt, 0.5, 0.8)), -0.03, 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.4 }); cue(st + 0.3, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + 0.3, 'thud', { gain: 0.5 }); }

  // 5 · step 1, the name field: name + what you make, highlighted
  { const st = cs(5);
    add({ id: 'S05', at: st, cam: [540, 820], zoom: 0.16, note: 'STEP 1 ribbon, name field rewrites to "Riya | Home Baker"', draw(lt, d, t) {
      dayPage(7); ground(1650, M.wall2);
      const p = seg(lt, d * 0.35, d * 0.6);
      phoneBig(540, 1000, 1.3, -0.01, () => profile({ name: p > 0.5 ? 'Riya | Home Baker' : 'Riya', hiName: R2(p), bio: ['just vibes'] }));
      K.ribbon('1 · NAME', 540, 330, R2(seg(lt, 0.05, 0.35)), 90);
      hand(760, lerp(1300, 820, eio(seg(lt, 0.1, d * 0.35))), 0.9, -0.3, true);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + len(5) * 0.35, 'tock', { gain: 0.5 }); cue(st + len(5) * 0.5, 'sparkle', { dur: 0.6, gain: 0.4 }); }

  // 6 · step 2, bio: keywords + your city, so people nearby find you: bio lines appear, Pune pin, nearby people
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.5;
    add({ id: 'S06a', at: st, cam: [540, 820], zoom: 0.16, note: 'STEP 2 ribbon, bio rewrites to keywords + Pune', draw(lt, d, t) {
      dayPage(8); ground(1650, M.wall2);
      const p = seg(lt, 0.3, 0.7);
      phoneBig(540, 1000, 1.3, 0.01, () => profile({ name: 'Riya | Home Baker', bio: p > 0.5 ? ['Eggless cakes + recipes', 'Home baker, Pune'] : ['just vibes'], hiBio: R2(p) }));
      K.ribbon('2 · BIO', 540, 330, R2(seg(lt, 0.05, 0.35)), 90);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.1, note: 'Pune pin, three people nearby turn to it: NEARBY', draw(lt, d, t) {
      dayPage(9); ground(1500, M.wall2); skyline(9, 1500);
      pin(540, 820, R2(seg(lt, 0, 0.3)) * 2.2);
      K.slip('PUNE', 540, 440, R2(seg(lt, 0.15, 0.4)), -0.03, 70);
      [[200, P.royal, 1], [880, M.hoodie, -1], [540, P.crimson, 1]].forEach(([x, c, dir], k) => person({ x, y: 1760, h: 380, arm: 40, dir, top: c }));
      K.slip('PEOPLE NEARBY', 540, 1100, R2(seg(lt, 0.4, 0.7)), 0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); cue(st + 0.3, 'tock', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.1, 'plop', { gain: 0.5 }); }

  // 7 · game changer: since April 2023, five links in your bio
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 940], zoom: 0.08, note: 'APR 2023 ribbon, 5 link chips stack up, big gold 5', draw(lt, d, t) {
      dayPage(10, false); K.ribbon('APR 2023', 540, 280, R2(seg(lt, 0.1, 0.4)), 90);
      bigMark('5', 230, 950, R2(seg(lt, 0.2, 0.55)), -0.08, P.gold, 520);
      for (let k = 0; k < 5; k++) { const a = d * (0.18 + k * 0.1); rankCard(k + 1, 'LINK', 680, 560 + k * 200 + Math.sin(t * 2 + k) * 4, R2(seg(lt, a, a + 0.3)), k % 2 ? 0.02 : -0.02, 520); }
      K.slip('IN YOUR BIO', 540, 1640, R2(seg(lt, d * 0.75, d * 0.95)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'pop', { gain: 0.4 }); for (let k = 0; k < 5; k++) cue(st + len(7) * (0.18 + k * 0.1), 'pop', { gain: 0.5 }); }

  // 8 · craziest part: visitors see only the first link + "1 other": a magnifier finds it, the rest hide behind a tap
  { const st = cs(8);
    add({ id: 'S08', at: st, cam: [540, 860], zoom: 0.16, note: 'profile shows "mysite.in and 4 others", magnifier on the first link, ONLY #1 SHOWS', draw(lt, d, t) {
      dayPage(11); ground(1650, M.wall2);
      phoneBig(540, 1000, 1.3, -0.01, () => profile({ name: 'Riya | Home Baker', bio: ['Eggless cakes + recipes', 'Home baker, Pune'], link: 'shop link + 4 others' }));
      const mp = eio(seg(lt, 0.2, d * 0.45)); magnifier(lerp(900, 400, mp), lerp(400, 860, mp), 1.0);
      K.ribbon('ONLY #1 SHOWS', 540, 300, R2(seg(lt, d * 0.4, d * 0.65)), 76);
      K.slip('rest = 1 more tap', 540, 1640, R2(seg(lt, d * 0.65, d * 0.85)), 0.03, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slide', { gain: 0.4 }); cue(st + len(8) * 0.4, 'pop', { gain: 0.6 }); cue(st + len(8) * 0.65, 'pop', { gain: 0.4 }); }

  // 9 · so put your most important link on top: cards shuffle, a crimson one jumps to #1
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.1, note: 'three link cards, the SHOP card jumps to #1 with a sparkle', draw(lt, d, t) {
      dayPage(12, false);
      const p = eio(seg(lt, 0.2, d * 0.7)), ys = [lerp(1300, 700, p), lerp(700, 1000, p), lerp(1000, 1300, p)];
      ['YOUR SHOP', 'OLD BLOG', 'RANDOM'].forEach((w, k) => rankCard(k === 0 ? (p > 0.5 ? 1 : 3) : k === 1 ? (p > 0.5 ? 2 : 1) : (p > 0.5 ? 3 : 2), w, 540, ys[k], 1, k ? 0.02 : -0.02, 640));
      K.ribbon('ON TOP', 540, 360, R2(seg(lt, d * 0.6, d * 0.9)), 90);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slide', { gain: 0.5 }); cue(st + len(9) * 0.7, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 10 · step 3: pin your 3 best reels above the grid
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 1000], zoom: 0.16, note: 'STEP 3 ribbon, top row of the grid turns crimson/gold/blue with 3 pins', draw(lt, d, t) {
      dayPage(13); ground(1650, M.wall2);
      const p = seg(lt, d * 0.3, d * 0.55);
      phoneBig(540, 1000, 1.3, 0.01, () => profile({ name: 'Riya | Home Baker', bio: ['Eggless cakes + recipes', 'Home baker, Pune'], link: 'shop link + 4 others', pins: p > 0.5 }));
      K.ribbon('3 · PIN 3', 540, 330, R2(seg(lt, 0.05, 0.35)), 90);
      for (let k = 0; k < 3; k++) pin(355 + k * 160, 1030, R2(seg(lt, d * (0.4 + k * 0.1), d * (0.4 + k * 0.1) + 0.3)) * 0.9, P.crimson);
      K.slip('BEST 3 REELS', 540, 1640, R2(seg(lt, d * 0.7, d * 0.9)), -0.03, 64);
    } });
    cue(st, 'whoosh'); cue(st + 0.05, 'pop', { gain: 0.5 }); for (let k = 0; k < 3; k++) cue(st + len(10) * (0.4 + k * 0.1), 'plop', { gain: 0.5 }); }

  // 11 · loop: the visitor from the start comes back and taps FOLLOW
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.1, note: 'same visitor walks in, a hand taps FOLLOW, follower count ticks up', draw(lt, d, t) {
      dayPage(1); ground(1650, M.wall2);
      phoneBig(380, 900, 1.15, -0.03, () => profile({ name: 'Riya | Home Baker', bio: ['Eggless cakes + recipes', 'Home baker, Pune'], link: 'shop link + 4 others', pins: true }));
      const w = eio(seg(lt, 0, d * 0.4)); person({ x: lerp(1150, 840, w), y: 1640, h: 560, arm: 50, dir: -1, walk: w < 1 ? lt * 9 : 0, top: P.royal });
      const tap = R2(seg(lt, d * 0.45, d * 0.65)); if (tap > 0) { ctx.save(); ctx.translate(380, 1500); ctx.scale(tap, tap); cut(P_rr(-200, -60, 400, 120, 20), P.crimson); txt('FOLLOW', 0, 4, 64, '#FFFBF0'); ctx.restore(); }
      bigMark('+1', 820, 600, R2(seg(lt, d * 0.65, d * 0.85)) * 0.6, 0.08, P.gold, 300);
    } });
    cue(st, 'whoosh'); cue(st + 0.1, 'slide', { gain: 0.4 }); cue(st + len(11) * 0.45, 'tock', { gain: 0.6 }); cue(st + len(11) * 0.65, 'sparkle', { dur: 0.6, gain: 0.5 }); }

  // 12 · follow + send: nser seal, handle, FOLLOW + SEND on the shop signboard (loops to beat 1)
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, shop sign reads FOLLOW + SEND, handle slip', draw(lt, d, t) {
      dayPage(14); ground(1550, M.wall2);
      shop(640, 1150, 0.95, 'FOLLOW + SEND', R2(seg(lt, 0.8, 1.2)));
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.4, eo(s)) : 1.4; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(230, 420, sc, 'N'); ctx.restore(); }
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.6, 0.9)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.8, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
