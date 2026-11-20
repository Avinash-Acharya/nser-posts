// 21 Nov 7pm: REPURPOSE ONE REEL INTO 5 POSTS. Paper style.
// Facts (opened 20 Nov 2026): Instagram Help Center: "upload up to 20 photos and videos and share them as a single
// post". YouTube Help "Understand three-minute YouTube Shorts": square or vertical videos up to three minutes count as
// Shorts (uploads after 15 Oct 2024). Instagram Creators "recommendations and originality" (30 Apr 2024): content
// "narrated with a new voiceover" counts as changed in a significant way; accounts that post others' content 10+ times
// in 30 days without material enhancement are not shown in recommendation surfaces. Instagram Creators blog (30 Apr
// 2026): "just adding a border, watermark, subtitles, or a credit" doesn't make it original.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, phoneBig, bubble, postCard, bigMark, hand, coins, wallet,
  laptop, clock, fishHook } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

/** a reel tile (vertical card with a play triangle); col = cover colour */
function reel(x, y, s, rot = 0, col = P.royal) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-120, -210, 240, 420, 18), col); cut(P_poly([[-40, -60], [60, 0], [-40, 60]]), P.parch, { shadow: 0.3, edge: 3 }); ctx.restore(); }
/** a carousel: n square slides fanned, with dots under */
function carousel(x, y, s, p = 1, n = 4) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  const cols = [P.gold, P.green, P.wine, P.royal];
  for (let k = n - 1; k >= 0; k--) { const a = eo(clamp(p * n - k)); if (a <= 0) continue; ctx.save(); ctx.translate(k * 90 * a, -k * 20 * a); ctx.rotate(0.05 * k);
    cut(P_rr(-180, -180, 360, 360, 14), cols[k % 4]); K.label(String(k + 1), 0, 6, 120, P.parch); ctx.restore(); }
  for (let k = 0; k < 5; k++) circle(-80 + k * 40, 250, 12, k === 0 ? P.crimson : 'rgba(62,44,30,0.35)');
  ctx.restore(); }
/** a microphone */
function mic(x, y, s, rot = 0) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -200, 120, 200, 60), P.ink); line([[-90, -90], [-90, -40], [0, 40], [90, -40], [90, -90]], P.ink, 14); cut(P_rr(-14, 40, 28, 130, 6), P.stone); cut(P_rr(-80, 160, 160, 30, 10), P.stone); ctx.restore(); }
/** a story ring (circle avatar with crimson ring) */
function storyRing(x, y, s) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.lineWidth = 22; ctx.strokeStyle = P.crimson; ctx.stroke(); cut(P_circ(0, 0, 96), P.parch, { shadow: 0, edge: 3 }); circle(0, -20, 36, P.ink); ell(0, 60, 60, 34, P.ink); ctx.restore(); }
/** two circular repost arrows */
function repost(x, y, s, rot = 0, col = P.crimson) { if (s <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  ctx.lineWidth = 34; ctx.strokeStyle = col; ctx.lineCap = 'round';
  ctx.beginPath(); ctx.arc(0, 0, 130, Math.PI * 1.1, Math.PI * 1.9); ctx.stroke(); ctx.beginPath(); ctx.arc(0, 0, 130, Math.PI * 0.1, Math.PI * 0.9); ctx.stroke();
  ctx.fillStyle = col; for (const a of [Math.PI * 1.9, Math.PI * 0.9]) { ctx.save(); ctx.rotate(a); ctx.translate(130, 0); ctx.beginPath(); ctx.moveTo(-40, -10); ctx.lineTo(40, -10); ctx.lineTo(0, 50); ctx.closePath(); ctx.fill(); ctx.restore(); }
  ctx.restore(); }
/** big slot number badge */
function num(n, x, y, k) { if (k <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(k, k); cut(P_circ(0, 0, 90), P.crimson); K.label(String(n), 0, 6, 110, P.parch); ctx.restore(); }

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · one reel takes hours, and you post it once?
  { const st = cs(0);
    add({ id: 'S00', at: st, cam: [540, 960], zoom: 0.1, note: 'creator at laptop, clock spins fast, one reel tile pops, crimson 1x mark, JUST ONCE? ribbon', draw(lt, d, t) {
      room(1);
      person({ x: 220, y: 1650, h: 640, arm: 60, top: M.tee });
      laptop(640, 1400, 0.9, () => { cut(P_rr(-260, -380, 520, 320, 10), P.sky, { shadow: 0, edge: 0 }); });
      clock(800, 520, 0.9 * R2(seg(lt, 0.02, 0.2)), t * 12);
      K.slip('HOURS', 800, 340, R2(seg(lt, 0.1, 0.3)), 0.04, 64);
      reel(420, 620, 0.8 * R2(seg(lt, d * 0.45, d * 0.6)), -0.08);
      bigMark('1x', 640, 820, R2(seg(lt, d * 0.6, d * 0.75)), -0.06, P.crimson, 200);
      K.ribbon('JUST ONCE?', 540, 1720, R2(seg(lt, d * 0.65, d * 0.9)), 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'tock', { gain: 0.5 }); cue(st + len(0) * 0.5, 'pop', { gain: 0.5 }); cue(st + len(0) * 0.7, 'slam', { gain: 0.6 }); }

  // 1 · simply put: same idea, new shape, not copy-paste
  { const st = cs(1), d1 = len(1), mid = st + d1 * 0.55;
    add({ id: 'S01a', at: st, cam: [540, 960], zoom: 0.12, note: 'SIMPLY PUT slip, a reel tile flips into a square slide, SAME IDEA / NEW SHAPE slips', draw(lt, d, t) {
      dayPage(2, false);
      K.slip('SIMPLY PUT', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      const f = eio(seg(lt, d * 0.25, d * 0.55)); ctx.save(); ctx.translate(540, 900); ctx.scale(Math.abs(Math.cos(f * Math.PI)) + 0.02, 1);
      if (f < 0.5) reel(0, 0, 1.3 * R2(seg(lt, 0.05, 0.25))); else carousel(0, 0, 1.0, 1, 1); ctx.restore();
      K.slip('SAME IDEA', 540, 1380, R2(seg(lt, d * 0.15, d * 0.3)), 0.03, 64);
      K.ribbon('NEW SHAPE', 540, 1620, R2(seg(lt, d * 0.55, d * 0.8)), 120);
    } });
    add({ id: 'S01b', at: mid, cam: [540, 960], zoom: 0.14, note: 'two identical reel tiles with crimson strike: COPY-PASTE ribbon with big X', draw(lt, d, t) {
      dayPage(3);
      reel(380, 900, 1.0 * R2(seg(lt, 0.02, 0.2)), -0.05); reel(700, 900, 1.0 * R2(seg(lt, 0.1, 0.3)), 0.05);
      bigMark('X', 540, 900, R2(seg(lt, 0.35, 0.55)), 0, P.crimson, 520);
      K.ribbon('NOT COPY-PASTE', 540, 1550, R2(seg(lt, 0.3, 0.6)), 96);
    } });
    cue(st, 'whoosh'); cue(st + d1 * 0.55 * 0.4, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(1) * 0.45 * 0.45, 'slam', { gain: 0.6 }); }

  // 2 · one reel, five posts
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 960], zoom: 0.14, note: 'one reel in the middle, dashed routes to 5 crimson numbered badges around it, big gold 1 = 5', draw(lt, d, t) {
      dayPage(4, false);
      reel(540, 950, 0.9 * R2(seg(lt, 0.02, 0.2)), 0);
      const pts = [[200, 600], [880, 600], [160, 1250], [920, 1250], [540, 1500]];
      pts.forEach(([x, y], k) => { const a = seg(lt, 0.15 + k * 0.1, 0.35 + k * 0.1); K.dashedRoute([[540, 950], [x, y]], eo(a)); num(k + 1, x, y, R2(seg(lt, 0.3 + k * 0.1, 0.45 + k * 0.1)) * 0.8); });
      K.ribbon('1 REEL = 5 POSTS', 540, 300, R2(seg(lt, 0.05, 0.3)), 90);
    } });
    cue(st, 'whoosh'); [0.3, 0.4, 0.5, 0.6, 0.7].forEach((a) => cue(st + len(2) * a, 'pop', { gain: 0.45 })); }

  // 3 · you: reel with 3 budget tips. post 1 = the reel itself
  { const st = cs(3);
    add({ id: 'S03', at: st, cam: [540, 960], zoom: 0.12, note: 'YOU slip, creator holds phone showing a reel with 3 TIPS and coins, badge 1 + THE REEL ribbon', draw(lt, d, t) {
      room(5);
      person({ x: 220, y: 1650, h: 640, arm: 50, top: M.tee });
      K.slip('YOU', 160, 300, R2(seg(lt, 0.02, 0.2)), -0.05, 80);
      phoneBig(700, 860, 0.95 * R2(seg(lt, 0.05, 0.25)), 0.04, () => { cut(P_rr(-186, -370, 372, 600, 0), P.royal, { shadow: 0, edge: 0 });
        K.slip('3 BUDGET TIPS', 0, -240, R2(seg(lt, d * 0.2, d * 0.35)), -0.03, 44); coins(0, 80, 0.8 * R2(seg(lt, d * 0.25, d * 0.4)), 3); });
      num(1, 420, 520, R2(seg(lt, d * 0.55, d * 0.7)));
      K.ribbon('POST 1: THE REEL', 540, 1720, R2(seg(lt, d * 0.6, d * 0.85)), 90);
    } });
    cue(st, 'whoosh'); cue(st + len(3) * 0.3, 'plop', { gain: 0.5 }); cue(st + len(3) * 0.6, 'pop', { gain: 0.6 }); }

  // 4 · post 2: same tips as a carousel, up to 20 photos/videos in one post
  { const st = cs(4), d4 = len(4), mid = st + d4 * 0.45;
    add({ id: 'S04a', at: st, cam: [540, 960], zoom: 0.12, note: 'badge 2, carousel slides fan out one by one, CAROUSEL ribbon', draw(lt, d, t) {
      dayPage(6);
      num(2, 160, 300, R2(seg(lt, 0.02, 0.2)));
      carousel(420, 950, 1.1 * R2(seg(lt, 0.05, 0.2)), seg(lt, 0.1, 0.8), 4);
      K.ribbon('CAROUSEL', 540, 1600, R2(seg(lt, d * 0.4, d * 0.7)), 120);
    } });
    add({ id: 'S04b', at: mid, cam: [540, 960], zoom: 0.14, note: 'UP TO slip, big gold 20, grid of 20 tiny tiles fills, PER POST ribbon', draw(lt, d, t) {
      dayPage(7, false);
      K.slip('UP TO', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      bigMark('20', 540, 600, R2(seg(lt, 0.1, 0.3)), -0.04, P.gold, 300);
      const n = Math.floor(20 * clamp(seg(lt, 0.2, 0.8)));
      for (let k = 0; k < n; k++) { const cx = 260 + (k % 5) * 140, cy = 920 + Math.floor(k / 5) * 140; cut(P_rr(cx - 55, cy - 55, 110, 110, 10), [P.gold, P.green, P.wine, P.royal][k % 4], { shadow: 0.3, edge: 2 }); }
      K.ribbon('PHOTOS + VIDEOS', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 90);
    } });
    cue(st, 'whoosh'); [0.25, 0.4, 0.55].forEach((a) => cue(st + d4 * 0.45 * a, 'pop', { gain: 0.45 })); cue(mid, 'whoosh'); cue(mid + len(4) * 0.55 * 0.25, 'slam', { gain: 0.7 }); }

  // 5 · post 3: YouTube Shorts: vertical up to 3 minutes counts as a Short
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.45;
    add({ id: 'S05a', at: st, cam: [540, 960], zoom: 0.12, note: 'badge 3, reel tile slides along dashed route to a second plain phone, SHORTS ribbon', draw(lt, d, t) {
      dayPage(8);
      num(3, 160, 300, R2(seg(lt, 0.02, 0.2)));
      phoneBig(720, 950, 0.85 * R2(seg(lt, 0.05, 0.25)), 0.03, () => { cut(P_rr(-186, -370, 372, 600, 0), P.sky, { shadow: 0, edge: 0 }); });
      const f = eio(seg(lt, 0.25, 0.65)); K.dashedRoute([[260, 900], [480, 760], [700, 900]], eo(seg(lt, 0.15, 0.5))); reel(lerp(260, 720, f), lerp(1000, 900, f), 0.7, 0.1 * (1 - f), P.crimson);
      K.ribbon('YOUTUBE SHORTS', 540, 1620, R2(seg(lt, d * 0.4, d * 0.7)), 96);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 960], zoom: 0.14, note: 'VERTICAL slip, tall frame, clock, big gold 3 MIN', draw(lt, d, t) {
      dayPage(9, false);
      K.slip('VERTICAL', 540, 300, R2(seg(lt, 0.02, 0.2)), -0.03, 70);
      reel(330, 950, 1.3 * R2(seg(lt, 0.05, 0.25)), -0.04, P.crimson);
      clock(780, 760, 0.8 * R2(seg(lt, 0.15, 0.35)), t * 3);
      bigMark('3 MIN', 760, 1150, R2(seg(lt, 0.3, 0.5)), 0.04, P.gold, 170);
      K.ribbon('= A SHORT', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d5 * 0.45 * 0.4, 'zip', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(5) * 0.55 * 0.4, 'slam', { gain: 0.7 }); }

  // 6 · game changer, post 4: new hook + new voiceover; Instagram says new voiceover = big change
  { const st = cs(6), d6 = len(6), mid = st + d6 * 0.45;
    add({ id: 'S06a', at: st, cam: [540, 960], zoom: 0.1, note: 'GAME CHANGER slip, badge 4, paper fish hook drops, mic rises, NEW HOOK + NEW VOICE slips', draw(lt, d, t) {
      dayPage(10, false);
      K.slip('GAME CHANGER', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      num(4, 160, 420, R2(seg(lt, 0.05, 0.2)));
      fishHook(250, 900, 0.9 * R2(seg(lt, 0.15, 0.35)), -400 + 400 * eo(seg(lt, 0.15, 0.4)));
      mic(760, 1000, 1.1 * R2(seg(lt, 0.4, 0.6)), 0.08);
      K.slip('NEW HOOK', 280, 1350, R2(seg(lt, 0.3, 0.45)), -0.04, 62);
      K.slip('NEW VOICE', 760, 1350, R2(seg(lt, 0.55, 0.7)), 0.04, 62);
    } });
    add({ id: 'S06b', at: mid, cam: [540, 960], zoom: 0.14, note: 'phone with a speech bubble, seal stamps, INSTAGRAM SAYS slip, BIG CHANGE ribbon', draw(lt, d, t) {
      dayPage(11);
      K.slip('INSTAGRAM SAYS', 540, 280, R2(seg(lt, 0.02, 0.2)), -0.03, 64);
      mic(330, 950, 1.2 * R2(seg(lt, 0.05, 0.25)), -0.1);
      bubble('New voiceover', 450, 700, R2(seg(lt, 0.2, 0.4)), false, 56);
      K.seal(780, 1150, 0.9 * R2(seg(lt, d * 0.45, d * 0.6)), 'OK');
      K.ribbon('BIG CHANGE', 540, 1620, R2(seg(lt, d * 0.5, d * 0.8)), 120);
    } });
    cue(st, 'whoosh'); cue(st + d6 * 0.45 * 0.3, 'zip', { gain: 0.5 }); cue(st + d6 * 0.45 * 0.5, 'pop', { gain: 0.5 }); cue(mid, 'whoosh'); cue(mid + len(6) * 0.55 * 0.5, 'thud', { gain: 0.6 }); cue(mid + len(6) * 0.55 * 0.65, 'slam', { gain: 0.6 }); }

  // 7 · post 5: best line in a story + ask a question
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.12, note: 'badge 5, story ring pops, phone with BEST LINE slip and a ? bubble, STORY ribbon', draw(lt, d, t) {
      dayPage(12);
      num(5, 160, 300, R2(seg(lt, 0.02, 0.2)));
      storyRing(300, 700, R2(seg(lt, 0.05, 0.25)));
      phoneBig(700, 960, 0.9 * R2(seg(lt, 0.1, 0.3)), 0.03, () => { cut(P_rr(-186, -370, 372, 600, 0), P.wine, { shadow: 0, edge: 0 });
        K.slip('BEST LINE', 0, -200, R2(seg(lt, d * 0.25, d * 0.4)), -0.03, 50); bubble('Your take?', -150, 80, R2(seg(lt, d * 0.55, d * 0.7)), false, 46); });
      K.ribbon('STORY + QUESTION', 540, 1720, R2(seg(lt, d * 0.5, d * 0.8)), 84);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.35, 'pop', { gain: 0.5 }); cue(st + len(7) * 0.6, 'plop', { gain: 0.5 }); }

  // 8 · scariest: repost others' content 10+ times in 30 days → out of recommendations
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.5;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.12, note: 'night page, SCARIEST PART slip, crimson repost arrows spin around others reel, gold 10+ and 30 DAYS', draw(lt, d, t) {
      nightPage(13);
      K.slip('SCARIEST PART', 540, 260, R2(seg(lt, 0.02, 0.2)), -0.03, 66);
      reel(540, 850, 0.8 * R2(seg(lt, 0.05, 0.2)), 0, P.green);
      repost(540, 850, 1.4 * R2(seg(lt, 0.1, 0.3)), t * 2);
      K.slip("OTHERS' CONTENT", 540, 1230, R2(seg(lt, d * 0.2, d * 0.35)), 0.03, 58);
      bigMark('10+', 300, 1450, R2(seg(lt, d * 0.45, d * 0.6)), -0.05, P.gold, 200);
      K.slip('IN 30 DAYS', 760, 1450, R2(seg(lt, d * 0.6, d * 0.75)), 0.04, 62);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 960], zoom: 0.14, note: 'creator figure fades behind a crimson X over the recommendations feed of cards, OUT ribbon', draw(lt, d, t) {
      nightPage(14); ground(1650, M.wall2);
      [[300, -0.06], [540, 0], [780, 0.06]].forEach(([x, r], k) => postCard(x, 800, 0.6 * R2(seg(lt, k * 0.08, 0.2 + k * 0.08)), r, 0));
      K.slip('RECOMMENDATIONS', 540, 360, R2(seg(lt, 0.02, 0.2)), -0.03, 58);
      ctx.save(); ctx.globalAlpha = 1 - 0.6 * eo(seg(lt, 0.4, 0.8)); person({ x: 540, y: 1650, h: 480, arm: 40, top: M.tee }); ctx.restore();
      bigMark('X', 540, 800, R2(seg(lt, 0.3, 0.5)), 0, P.crimson, 600);
      K.ribbon('ACCOUNT OUT', 540, 1760, R2(seg(lt, d * 0.4, d * 0.7)), 110);
    } });
    cue(st, 'whoosh'); cue(st + d8 * 0.5 * 0.2, 'zip', { gain: 0.5 }); cue(st + d8 * 0.5 * 0.5, 'slam', { gain: 0.6 }); cue(mid, 'whoosh'); cue(mid + len(8) * 0.5 * 0.4, 'thud', { gain: 0.8 }); }

  // 9 · just border, watermark or subtitles doesn't make it yours
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 960], zoom: 0.12, note: 'green (others) reel gets a gold border, a watermark stamp, a subtitle bar; then struck: NOT YOURS ribbon', draw(lt, d, t) {
      nightPage(15);
      const b = R2(seg(lt, d * 0.1, d * 0.25)); if (b > 0) { ctx.save(); ctx.translate(540, 880); ctx.scale(b, b); cut(P_rr(-200, -320, 400, 640, 24), P.gold); ctx.restore(); }
      reel(540, 880, 1.25, 0, P.green);
      K.slip('BORDER', 220, 420, R2(seg(lt, d * 0.1, d * 0.25)), -0.05, 58);
      const w = R2(seg(lt, d * 0.3, d * 0.45)); if (w > 0) { ctx.save(); ctx.globalAlpha = 0.8; K.label('©', 620, 720, 110 * w, P.parch); ctx.restore(); }
      K.slip('WATERMARK', 790, 500, R2(seg(lt, d * 0.3, d * 0.45)), 0.05, 54);
      const sb = R2(seg(lt, d * 0.5, d * 0.65)); if (sb > 0) cut(P_rr(400, 1060, 280 * sb, 40, 8), P.ink, { shadow: 0, edge: 2 });
      K.slip('SUBTITLES', 230, 1250, R2(seg(lt, d * 0.5, d * 0.65)), -0.04, 56);
      K.ribbon('NOT YOURS', 540, 1650, R2(seg(lt, d * 0.7, d * 0.92)), 130);
    } });
    cue(st, 'whoosh'); [0.15, 0.35, 0.55].forEach((a) => cue(st + len(9) * a, 'pop', { gain: 0.45 })); cue(st + len(9) * 0.75, 'slam', { gain: 0.6 }); }

  // 10 · so: your own idea, change the shape, add something new every time
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.12, note: 'STEP 1-3 slips appear: OWN IDEA (bulb-like gold circle), NEW SHAPE (reel→square), ADD NEW (+ mark)', draw(lt, d, t) {
      dayPage(16, false);
      const rows = [['OWN IDEA', 520], ['NEW SHAPE', 880], ['ADD SOMETHING NEW', 1240]];
      rows.forEach(([w, y], k) => { const a = seg(lt, d * (0.05 + k * 0.28), d * (0.2 + k * 0.28)); num(k + 1, 170, y, R2(a) * 0.8); K.slip(w, 590, y, R2(a), (k % 2 ? 0.03 : -0.03), 64); });
      bigMark('+', 900, 1430, R2(seg(lt, d * 0.75, d * 0.9)), 0, P.crimson, 200);
      K.ribbon('EVERY TIME', 540, 1650, R2(seg(lt, d * 0.7, d * 0.95)), 120);
    } });
    cue(st, 'whoosh'); [0.1, 0.38, 0.66].forEach((a) => cue(st + len(10) * a, 'pop', { gain: 0.5 })); cue(st + len(10) * 0.8, 'slam', { gain: 0.6 }); }

  // 11 · loop: work once, win five times (beat-0 room)
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 960], zoom: 0.12, note: 'beat-0 room again: the one reel splits into five tiles fanning around, creator glows, 1x → 5x', draw(lt, d, t) {
      room(1);
      person({ x: 220, y: 1650, h: 640, arm: 70, top: M.tee, glow: eo(seg(lt, d * 0.3, d * 0.8)) });
      laptop(640, 1400, 0.9, () => { cut(P_rr(-260, -380, 520, 320, 10), P.sky, { shadow: 0, edge: 0 }); });
      const f = eo(seg(lt, 0.1, 0.6)), cols = [P.royal, P.gold, P.crimson, P.green, P.wine];
      for (let k = 0; k < 5; k++) reel(lerp(600, 260 + k * 140, f), lerp(700, 640 + Math.abs(k - 2) * 40, f), 0.5, (k - 2) * 0.08 * f, cols[k]);
      bigMark(f > 0.5 ? '5x' : '1x', 820, 380, 1, -0.05, f > 0.5 ? P.gold : P.crimson, 200);
      K.ribbon('WORK ONCE, WIN 5x', 540, 1720, R2(seg(lt, d * 0.4, d * 0.75)), 84);
    } });
    cue(st, 'whoosh'); cue(st + len(11) * 0.3, 'zip', { gain: 0.5 }); cue(st + len(11) * 0.55, 'slam', { gain: 0.7 }); }

  // 12 · follow + send to the friend who hunts for new content daily
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal, FOLLOW + SEND ribbon, a reel tile flies to a friend who lights up, handle slip', draw(lt, d, t) {
      dayPage(17); ground(1600, M.wall2);
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.5, eo(s)) : 1.5; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(540, 480, sc, 'N'); ctx.restore(); }
      K.ribbon('FOLLOW + SEND', 540, 840, R2(seg(lt, 0.6, 1.0)), 84);
      const f = eo(seg(lt, d * 0.4, d * 0.8)); reel(lerp(220, 600, f), lerp(1250, 1180, f), 0.4 * R2(seg(lt, d * 0.3, d * 0.5)), 0.2 * (1 - f));
      person({ x: 800, y: 1600, h: 560, arm: 40, dir: -1, top: P.wine, glow: f });
      K.slip('@nser.in_officials', 540, 1700, R2(seg(lt, 0.8, 1.1)), -0.02, 60);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.6, 'pop', { gain: 0.5 }); cue(st + len(12) * 0.4, 'whoosh', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
