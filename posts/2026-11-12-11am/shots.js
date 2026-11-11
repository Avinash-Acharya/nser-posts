// SAMPLE nser paper reel (free collabs vs paid deals). Copy this file to posts/<slot>/shots.js and rewrite the shots.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './core/lib.js';
import { L, Le, T } from './core/timing.js';
import * as K from './core/kit.js';
import { M, R2, dayPage, nightPage, ground, room, person, gift, note, coins, phoneBig, bubble, laptop, postCard, skyline, stringLights, ringLight, wallet, magnifier, bigMark, geo, CITY, indiaMap } from './core/modern.js';
const { P, cut, P_rr, P_poly, P_circ } = K;

export function buildShots() {
  const S = [], CUES = [], add = (o) => (S.push(o), o), cue = (t, type, o = {}) => CUES.push({ t: +t.toFixed(3), type, ...o });
  const cs = (i) => (i === 0 ? 0 : L(i) - 0.08), len = (i) => (i < T.lines.length - 1 ? L(i + 1) - 0.08 : T.dur) - cs(i);

  // 0 · brand deals for small creators: map of India, creator pins pop, crimson routes fly out from Mumbai
  { const st = cs(0); const order = ['MUMBAI', 'DELHI', 'BENGALURU', 'KOLKATA', 'HYDERABAD', 'JAIPUR'];
    add({ id: 'S00', at: st, cam: [480, 820], zoom: 0.12, note: 'India map, creator pins pop, routes from Mumbai', draw(lt, d, t) {
      indiaMap(2); const hub = geo(...CITY.MUMBAI);
      order.forEach((c, i) => { const [x, y] = geo(...CITY[c]), a = 0.25 + i * 0.22, p = R2(seg(lt, a, a + 0.35));
        if (i) { const r = seg(lt, a + 0.1, a + 0.6); if (r > 0) K.dashedRoute([hub, [(hub[0] + x) / 2, Math.min(hub[1], y) - 80], [x, y]], r); }
        if (p > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(p, p); cut(() => { ctx.beginPath(); ctx.arc(0, -46, 30, Math.PI * 0.8, Math.PI * 2.2); ctx.lineTo(0, 0); ctx.closePath(); }, i ? P.crimson : P.gold, { shadow: 0.6, edge: 4 }); circle(0, -46, 11, P.edge); ctx.restore();
          if (i < 3) K.slip(c, x + 140, y - 100, p * 0.8, 0.02 * (i - 1), 34); } });
      K.ribbon('2026', 540, 190, R2(seg(lt, 0.05, 0.4)), 90);
    } });
    cue(st, 'whoosh'); for (let i = 0; i < 6; i++) cue(st + 0.25 + i * 0.22, 'pop', { gain: 0.35 }); }

  // 1 · a free product is not money: gift ≠ cash
  { const st = cs(1);
    add({ id: 'S01', at: st, cam: [540, 1000], zoom: 0.08, note: 'gift, crimson ≠ stamps, cash slides in', draw(lt, d, t) {
      dayPage(3); ground(1420, M.wall2);
      const g = R2(seg(lt, 0, 0.35)); gift(290, 1420 - (1 - g) * 500, 1.05 * g, Math.sin(t * 2) * 0.03);
      const n = eo(seg(lt, 0.55, 0.9)); if (n > 0) { ctx.save(); ctx.translate((1 - n) * 700, 0); note(800, 1330, 1, 0.12); note(820, 1250, 1, -0.06); ctx.restore(); }
      bigMark('≠', 545, 1180, R2(seg(lt, 0.35, 0.65)) * (1 + 0.04 * Math.sin(t * 5)), -0.06, P.crimson, 400);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'thud', { gain: 0.5 }); cue(st + 0.4, 'slam', { gain: 0.5 }); cue(st + 0.6, 'slide', { gain: 0.4 }); }

  // 2 · why do most creators still say yes? creator staring at the phone, question marks
  { const st = cs(2);
    add({ id: 'S02', at: st, cam: [540, 1000], zoom: 0.1, note: 'creator in a room looks at phone, ? marks pop', draw(lt, d, t) {
      room(4); cut(P_rr(620, 360, 300, 380, 10), P.sky, { shadow: 0.5, edge: 6 }); line([[770, 360], [770, 740]], P.edge, 8); line([[620, 550], [920, 550]], P.edge, 8);
      person({ x: 380, y: 1440, h: 780, arm: 70, glow: 0.4 + 0.3 * Math.sin(t * 6), bob: Math.sin(t * 3) * 4 });
      [[800, 1050, 0.2, 1], [900, 820, 0.5, 0.6], [700, 760, 0.8, 0.45]].forEach(([x, y, a, s], i) => bigMark('?', x, y + Math.sin(t * 3 + i) * 12, R2(seg(lt, a, a + 0.35)) * s, Math.sin(t * 2 + i) * 0.12, P.crimson, 360));
    } });
    cue(st, 'whoosh'); [0.2, 0.5, 0.8].forEach((a) => cue(st + a, 'boing', { gain: 0.3 })); }

  // 3 · brands spent ₹3,600 crore on influencers in 2024 (money tower, then money flying to creators)
  { const st = cs(3), d3 = len(3), mid = st + d3 * 0.48;
    add({ id: 'S03a', at: st, cam: [540, 1000], zoom: 0.1, note: '2024 ribbon, a tower of notes grows, ₹3,600 CR slip', draw(lt, d, t) {
      dayPage(5); ground(1500, M.wall2); K.ribbon('2024', 540, 280, R2(seg(lt, 0.05, 0.4)), 100);
      const n = Math.floor(clamp(lt / (d * 0.8)) * 16); for (let i = 0; i < n; i++) note(540 + Math.sin(i * 1.7) * 18, 1440 - i * 44, 1.25, Math.sin(i * 2.3) * 0.05);
      K.slip('₹3,600 CRORE', 540, 560, R2(seg(lt, d * 0.55, d * 0.55 + 0.35)), -0.03, 80);
    } });
    add({ id: 'S03b', at: mid, cam: [540, 1100], zoom: 0.08, note: 'brand towers send cash routes to tiny creators', draw(lt, d, t) {
      dayPage(6); skyline(2, 1250); ground(1250, M.wall2); const ppl = [130, 380, 640, 900];
      ppl.forEach((x, i) => person({ x, y: 1650, h: 330, arm: 40, top: [M.hoodie, M.hoodie2, P.crimson, P.royal][i], bob: Math.sin(t * 4 + i) * 5 }));
      ppl.forEach((x, i) => { const p = seg(lt, 0.15 + i * 0.18, 0.75 + i * 0.18); if (p <= 0) return; const hd = K.dashedRoute([[540, 600], [(540 + x) / 2, 800], [x, 1250]], p); if (p < 1) note(hd[0], hd[1], 0.4, hd[2]); });
    } });
    cue(st, 'whoosh'); for (let i = 0; i < 8; i++) cue(st + 0.2 + i * 0.25, 'pop', { gain: 0.25 }); cue(st + d3 * 0.3, 'sparkle', { dur: 0.8, gain: 0.5 }); cue(mid, 'whoosh'); }

  // 4 · out with friends and a brand DMs you: free collab?
  { const st = cs(4);
    add({ id: 'S04', at: st, cam: [540, 1000], zoom: 0.1, note: 'night café, friends, phone buzzes, Free collab? bubble', draw(lt, d, t) {
      nightPage(7); skyline(5, 1150); ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = M.night; ctx.fillRect(-300, -300, W + 600, 1450); ctx.restore(); stringLights(t, 300);
      ground(1450, '#4A3A2E'); cut(P_rr(250, 1160, 580, 40, 10), P.sepia); line([[540, 1200], [540, 1450]], P.ink, 16);
      person({ x: 170, y: 1500, h: 600, arm: 20, phone: false, top: M.hoodie2, dir: 1, bob: Math.sin(t * 5) * 6 });
      person({ x: 910, y: 1500, h: 600, arm: 20, phone: false, top: P.royal, dir: -1, bob: Math.sin(t * 5 + 1) * 6 });
      const buzz = lt > 0.6 ? Math.sin(t * 60) * 4 * (1 - seg(lt, 0.6, 1.1)) : 0;
      person({ x: 540 + buzz, y: 1560, h: 680, arm: 75, glow: lt > 0.6 ? 0.9 : 0.25 });
      K.slip('BRAND', 330, 470, R2(seg(lt, 0.75, 1.0)) * 0.8, -0.04, 40);
      bubble('Free collab?', 220, 600, R2(seg(lt, 0.85, 1.15)), false, 76);
    } });
    cue(st, 'whoosh'); cue(st + 0.6, 'zip', { gain: 0.4 }); cue(st + 0.85, 'pop', { gain: 0.6 }); }

  // 5 · you say yes, make the reel... rent? still zero
  { const st = cs(5), d5 = len(5), mid = st + d5 * 0.5;
    add({ id: 'S05a', at: st, cam: [540, 1000], zoom: 0.1, note: 'creator films a reel with ring light and the gift', draw(lt, d, t) {
      room(8); ringLight(300, 1100, 1); person({ x: 680, y: 1420, h: 720, arm: 95, dir: -1, glow: 0.5, bob: Math.sin(t * 6) * 6 });
      gift(860, 1440, 0.6, 0); const rec = Math.floor(t * 2) % 2; circle(190, 300, 22, rec ? P.crimson : 'rgba(168,50,45,0.3)'); K.label('REC', 270, 302, 40, P.crimson);
    } });
    add({ id: 'S05b', at: mid, cam: [540, 1000], zoom: 0.12, note: 'empty wallet opens, RENT: ₹0 slip', draw(lt, d, t) {
      dayPage(9, false); cut(P_rr(-300, 1300, W + 600, 900, 0), M.wall2, { shadow: 0, edge: 0 });
      wallet(540, 1180, 1.3, eo(seg(lt, 0.1, 0.5))); for (let i = 0; i < 3; i++) { const p = seg(lt, 0.5 + i * 0.15, 1.6 + i * 0.15); if (p > 0 && p < 1) circle(540 + (i - 1) * 60, 1010 - p * 300, 7, 'rgba(62,44,30,0.4)'); }
      K.slip('RENT: ₹0', 540, 620, R2(seg(lt, 0.4, 0.75)), -0.04, 110);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'tock', { gain: 0.4 }); cue(mid, 'whoosh'); cue(mid + 0.15, 'plop', { gain: 0.5 }); cue(mid + 0.45, 'thud', { gain: 0.6 }); }

  // 6 · 83% of marketers say finding the right creator is hard
  { const st = cs(6);
    add({ id: 'S06', at: st, cam: [540, 950], zoom: 0.1, note: 'brand office: wall of profile cards, magnifier searches, 83% ribbon', draw(lt, d, t) {
      room(10); for (let r = 0; r < 3; r++) for (let c = 0; c < 4; c++) { const x = 150 + c * 260, y = 280 + r * 250, i = r * 4 + c;
        cut(P_rr(x - 95, y - 100, 190, 200, 10), '#FFFBF0', { shadow: 0.5, edge: 4 }); circle(x, y - 30, 40, [M.hoodie, M.hoodie2, P.crimson, P.royal][i % 4]); line([[x - 60, y + 50], [x + 60, y + 50]], 'rgba(62,44,30,0.3)', 12);
        const xp = R2(seg(lt, 0.9 + i * 0.12, 1.15 + i * 0.12)); if (xp > 0) { ctx.save(); ctx.translate(x, y); ctx.scale(xp, xp); line([[-50, -50], [50, 50]], P.crimson, 14); line([[50, -50], [-50, 50]], P.crimson, 14); ctx.restore(); } }
      const u = lt * 0.9; magnifier(540 + Math.sin(u * 2.2) * 330, 560 + Math.sin(u * 1.4) * 220, 1.1);
      laptop(540, 1420, 0.8, () => { ctx.fillStyle = M.screen; ctx.fillRect(-310, -420, 620, 380); ctx.font = '700 44px Caladea'; ctx.fillStyle = '#F3E9D2'; ctx.textAlign = 'center'; ctx.fillText('find creator...', 0, -260); if (lt > 1.6) { ctx.fillStyle = '#E0782E'; ctx.fillText('0 matches', 0, -180); } });
      K.ribbon('83%', 540, 1000, R2(seg(lt, d * 0.55, d * 0.55 + 0.4)), 150);
    } });
    cue(st, 'whoosh'); cue(st + 0.3, 'slide', { dur: 1.2, gain: 0.4 }); for (let i = 0; i < 12; i++) cue(st + 0.9 + i * 0.12, 'tock', { gain: 0.15 }); cue(st + len(6) * 0.55, 'slam', { gain: 0.6 }); }

  // 7 · your free reel becomes the proof for your next paid deal: a route FREE → PROOF → PAID
  { const st = cs(7);
    add({ id: 'S07', at: st, cam: [540, 960], zoom: 0.05, note: 'crimson route gift → post card → sealed contract, camera follows', draw(lt, d, t) {
      dayPage(11, false); const p = eio(seg(lt, 0.1, d - 0.3)), cx = lerp(0, -780, p); ctx.save(); ctx.translate(cx, 0);
      K.dashedRoute([[300, 1250], [700, 1000], [1000, 1000], [1400, 760]], seg(lt, 0.2, d - 0.2));
      gift(300, 1330, 0.85); K.slip('FREE', 300, 860, 1, -0.04, 64);
      postCard(850, 1000, 1.1, 0.04, seg(lt, d * 0.35, d * 0.5)); K.slip('PROOF', 850, 660, R2(seg(lt, d * 0.3, d * 0.45)), 0.03, 64);
      const cp = R2(seg(lt, d * 0.6, d * 0.8)); if (cp > 0) { ctx.save(); ctx.translate(1400, 760); ctx.scale(cp, cp); cut(P_rr(-180, -240, 360, 480, 8), '#FFFBF0'); for (let i = 0; i < 6; i++) line([[-130, -170 + i * 50], [130 - (i % 2) * 60, -170 + i * 50]], 'rgba(62,44,30,0.3)', 10); K.seal(90, 160, 0.8, '₹'); ctx.restore(); K.slip('PAID', 1400, 420, cp, -0.03, 64); }
      ctx.restore();
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slide', { dur: 2.4, gain: 0.4 }); cue(st + len(7) * 0.62, 'thud', { gain: 0.6 }); }

  // 8 · even under 10K followers a reel can pay ₹500 – ₹5,000
  { const st = cs(8), d8 = len(8), mid = st + d8 * 0.45;
    add({ id: 'S08a', at: st, cam: [540, 960], zoom: 0.1, note: 'phone: follower count ticks to 9,800 (under 10K)', draw(lt, d, t) {
      dayPage(12); ground(1600, M.wall2);
      const f = Math.round(eo(seg(lt, 0.2, d * 0.8)) * 9800);
      phoneBig(540, 1000, 1.1, -0.03, () => { circle(0, -230, 80, M.hoodie); ctx.font = '700 110px Caladea'; ctx.textAlign = 'center'; ctx.fillStyle = P.ink; ctx.fillText(f.toLocaleString('en-IN'), 0, -20); ctx.font = '700 46px Caladea'; ctx.fillStyle = P.sepia; ctx.fillText('followers', 0, 50);
        for (let i = 0; i < 6; i++) { rr(-160 + (i % 3) * 110, 120 + Math.floor(i / 3) * 110, 100, 100, 6); ctx.fillStyle = i % 2 ? P.sea : P.land; ctx.fill(); } });
      K.slip('UNDER 10K', 540, 290, R2(seg(lt, 0.4, 0.7)), 0.03, 70);
    } });
    add({ id: 'S08b', at: mid, cam: [540, 1050], zoom: 0.1, note: 'coins rain into a stack, ₹500–₹5,000 ribbon', draw(lt, d, t) {
      dayPage(13); ground(1500, M.wall2);
      const n = 2 + Math.floor(clamp(lt / (d * 0.7)) * 7); coins(540, 1470, 1.3, n);
      for (let i = 0; i < 6; i++) { const y = ((lt * 900 + i * 260) % 1000) + 700; if (lt < d * 0.75) cut(() => { ctx.beginPath(); ctx.ellipse(380 + (i * 97) % 340, y, 50, 16, 0.2 * i, 0, TAU); }, P.gold, { shadow: 0.3, edge: 3 }); }
      K.ribbon('₹500 – ₹5,000', 540, 380, R2(seg(lt, 0.3, 0.7)), 84); K.slip('PER REEL', 540, 560, R2(seg(lt, 0.6, 0.9)), -0.03, 52);
    } });
    cue(st, 'whoosh'); cue(st + 0.2, 'slide', { dur: 1.6, gain: 0.3 }); cue(mid, 'whoosh'); for (let i = 0; i < 7; i++) cue(mid + 0.2 + i * 0.3, 'tock', { gain: 0.25 }); cue(mid + 0.35, 'sparkle', { dur: 0.9, gain: 0.5 }); }

  // 9 · label it as an ad, even when it's free: a wax seal stamps AD on the post
  { const st = cs(9);
    add({ id: 'S09', at: st, cam: [540, 1000], zoom: 0.1, note: 'post card, wax seal stamps AD, #ad + ASCI slips', draw(lt, d, t) {
      dayPage(14, false); ground(1550, M.wall2); postCard(540, 960, 2.1, -0.03, 1);
      const s = seg(lt, 0.9, 1.15), sc = lt < 0.9 ? 0 : lt < 1.15 ? lerp(2.2, 1.25, eo(s)) : 1.25; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(760, 1260, sc, 'AD'); ctx.restore(); }
      K.slip('#ad', 300, 360, R2(seg(lt, 1.3, 1.6)), -0.05, 90); K.slip('ASCI RULE', 760, 330, R2(seg(lt, 1.6, 1.9)) * 0.9, 0.04, 44);
    } });
    cue(st, 'whoosh'); cue(st + 1.1, 'slam', { gain: 0.7 }); cue(st + 1.3, 'pop', { gain: 0.4 }); }

  // 10 · pick it, post your best, then send your rate: three numbered steps on a route
  { const st = cs(10);
    add({ id: 'S10', at: st, cam: [540, 960], zoom: 0.08, note: 'three paper steps PICK / POST / ASK on a crimson route', draw(lt, d, t) {
      dayPage(15, false); const pts = [[230, 1350], [540, 980], [850, 610]], stepT = (k) => 0.15 + k * (d - 0.6) / 3;
      K.dashedRoute(pts, seg(lt, 0.1, d - 0.4));
      ['PICK', 'POST', 'ASK ₹'].forEach((w, k) => { const p = R2(seg(lt, stepT(k), stepT(k) + 0.35)); if (p <= 0) return; const [x, y] = pts[k];
        ctx.save(); ctx.translate(x, y); ctx.scale(p, p); cut(P_circ(0, 0, 70), P.gold, { shadow: 0.7, edge: 5 }); ctx.font = '700 80px Caladea'; ctx.fillStyle = P.ink; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText(String(k + 1), 0, 6); ctx.restore();
        K.slip(w, x + (k === 2 ? -40 : 170), y - 150, p, k % 2 ? 0.04 : -0.04, 76); });
    } });
    cue(st, 'whoosh'); for (let k = 0; k < 3; k++) cue(st + 0.15 + k * (len(10) - 0.6) / 3, 'pop', { gain: 0.6 }); }

  // 11 · start free, end paid: the gift spins into a stack of coins
  { const st = cs(11);
    add({ id: 'S11', at: st, cam: [540, 1100], zoom: 0.14, note: 'gift spins and becomes coins, PAID ribbon', draw(lt, d, t) {
      dayPage(16); ground(1450, M.wall2); const f = seg(lt, 0.25, 0.6), sx = Math.abs(Math.cos(f * Math.PI));
      ctx.save(); ctx.translate(540, 1420); ctx.scale(Math.max(0.03, sx), 1); ctx.translate(-540, -1420); if (f < 0.5) gift(540, 1420, 1.5); else coins(540, 1400, 1.6, 6); ctx.restore();
      K.ribbon('PAID', 540, 420, R2(seg(lt, 0.6, 0.95)), 120);
    } });
    cue(st, 'whoosh'); cue(st + 0.25, 'zip', { gain: 0.5 }); cue(st + 0.6, 'sparkle', { dur: 0.8, gain: 0.6 }); }

  // 12 · follow + send: nser seal stamps, creator waves
  { const st = cs(12);
    add({ id: 'S12', at: st, cam: [540, 960], zoom: 0.06, note: 'nser seal stamps, handle slip, creator waves', draw(lt, d, t) {
      dayPage(17); ground(1500, M.wall2); person({ x: 800, y: 1520, h: 560, arm: 120 + Math.sin(t * 9) * 25, phone: false, dir: -1, top: M.hoodie2 });
      const s = seg(lt, 0.2, 0.45), sc = lt < 0.2 ? 0 : lt < 0.45 ? lerp(2.6, 1.6, eo(s)) : 1.6; if (sc) { ctx.save(); ctx.globalAlpha = clamp(s * 3); K.seal(400, 700, sc, 'N'); ctx.restore(); }
      K.slip('@nser.in_officials', 540, 1080, R2(seg(lt, 0.7, 1.0)), -0.02, 60);
      K.slip('FOLLOW  +  SEND', 420, 1260, R2(seg(lt, 1.2, 1.5)), 0.03, 56);
    } });
    cue(st, 'whoosh'); cue(st + 0.4, 'slam', { gain: 0.7 }); cue(st + 0.7, 'pop', { gain: 0.5 }); cue(st + 1.2, 'pop', { gain: 0.5 }); }

  return { shots: S, cues: CUES };
}
