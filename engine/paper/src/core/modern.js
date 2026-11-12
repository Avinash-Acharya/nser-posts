// Present-day kit for nser reels in the Paper Atlas art style: everything is cut paper (edge + soft shadow).
// import * as N from './core/modern.js'  (shots.js). Faceless people, phones, money, rooms, an India map.
import { ctx, W, H, TAU, clamp, lerp, seg, eo, eio, eob, rnd, rr, circle, ell, line } from './lib.js';
import * as K from './kit.js';
const { P, cut, P_rr, P_poly, P_circ } = K;
// ── present-day palette additions (same paper look) ──
export const M = { denim: '#3D5A80', hoodie: '#C8952F', hoodie2: '#4F6D4A', tee: '#A8322D', hair: '#2B1E14', screen: '#1F2A36',
  glass: '#9DB4B0', wall: '#E4D3AE', wall2: '#D9C49A', floor: '#B08A5E', night: '#2F3550', cash: '#9DBE8C', cashDark: '#6E9461', coin: '#D9A93A' };
export const R2 = (p) => eob(clamp(p));

// ── pages ──
export function dayPage(seed, sky = true) { K.parchment(seed); if (sky) { ctx.save(); ctx.globalAlpha = 0.55; ctx.fillStyle = P.sky; ctx.fillRect(-300, -300, W + 600, 1400); ctx.restore(); } }
export function nightPage(seed) { K.parchment(seed); ctx.save(); ctx.globalAlpha = 0.84; ctx.fillStyle = M.night; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore(); }
export function ground(y, c = M.floor) { cut(P_rr(-300, y, W + 600, 900, 0), c, { shadow: 0, edge: 0 }); }
export function room(seed) { K.parchment(seed); cut(P_rr(-300, -300, W + 600, 1700, 0), M.wall, { shadow: 0, edge: 0 }); ground(1400); }

// ── a present-day person (faceless paper cut-out): hair, hoodie, jeans, sneakers; phone in the front hand ──
export function person(o) {
  const h = o.h || 640, d = o.dir || 1, s = h / 640, wk = o.walk != null ? Math.sin(o.walk) : 0, top = o.top || M.hoodie;
  ctx.save(); ctx.translate(o.x, o.y + (o.bob || 0)); ctx.scale(s * d, s);
  for (const k of [-1, 1]) { cut(P_poly([[k * 24 - 20, -255], [k * 24 + 20, -255], [k * 24 + 17 + k * wk * 30, -10], [k * 24 - 17 + k * wk * 30, -10]]), M.denim, { shadow: 0.6, edge: 4 }); cut(P_rr(k * 24 - 26 + k * wk * 30, -22, 58, 26, 12), '#F7EFDC', { shadow: 0.3, edge: 3 }); }
  cut(() => { ctx.beginPath(); ctx.save(); ctx.translate(-34, -440); ctx.rotate((12 - wk * 18) * Math.PI / 180); ctx.roundRect(-21, 0, 42, 210, 21); ctx.restore(); }, top, { shadow: 0.5, edge: 4 });
  cut(P_rr(-80, -470, 160, 240, 46), top);
  cut(P_rr(-40, -360, 80, 46, 14), 'rgba(0,0,0,0.12)', { shadow: 0, edge: 0 });
  cut(P_circ(0, -540, 66), P.skin);
  cut(() => { ctx.beginPath(); ctx.arc(0, -548, 70, Math.PI * 0.92, Math.PI * 2.08); ctx.quadraticCurveTo(40, -600, -10, -585); ctx.closePath(); }, M.hair, { shadow: 0.4, edge: 4 });
  const arm = o.arm ?? 60;
  ctx.save(); ctx.translate(34, -440); ctx.rotate((-arm - 6 + wk * 18) * Math.PI / 180);
  cut(P_rr(-21, 0, 42, 210, 21), top, { shadow: 0.5, edge: 4 });
  if (o.phone !== false) { ctx.save(); ctx.translate(0, 220); ctx.rotate((arm - 20) * Math.PI / 180); cut(P_rr(-30, -58, 60, 108, 12), '#1F1D1A', { shadow: 0.5, edge: 3 }); rr(-22, -48, 44, 86, 6); ctx.fillStyle = o.glow ? `rgba(242,193,78,${o.glow})` : M.screen; ctx.fill(); ctx.restore(); }
  cut(P_circ(0, 214, 22), P.skin, { shadow: 0.3, edge: 3 });
  ctx.restore();
  ctx.restore();
}

// ── objects ──
export function gift(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-110, -150, 220, 150, 8), P.crimson); cut(P_rr(-128, -192, 256, 52, 8), '#C2453E'); cut(P_rr(-18, -192, 36, 192, 2), P.gold, { shadow: 0, edge: 3 });
  cut(() => { ctx.beginPath(); ctx.ellipse(-45, -215, 48, 26, -0.4, 0, TAU); ctx.moveTo(93, -215); ctx.ellipse(45, -215, 48, 26, 0.4, 0, TAU); }, P.gold, { shadow: 0.4, edge: 4 }); ctx.restore(); }
export function note(x, y, s, rot = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-150, -70, 300, 140, 8), M.cash, { shadow: 0.6, edge: 4 }); ctx.strokeStyle = M.cashDark; ctx.lineWidth = 5; ctx.strokeRect(-130, -52, 260, 104);
  circle(0, 0, 40, M.cashDark); ctx.font = `700 54px Caladea, serif`; ctx.fillStyle = '#F7EFDC'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillText('₹', 0, 4); ctx.restore(); }
export function coins(x, y, s, n = 5) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); for (let i = 0; i < n; i++) cut(() => { ctx.beginPath(); ctx.ellipse(0, -i * 28, 95, 30, 0, 0, TAU); }, i % 2 ? M.coin : P.gold, { shadow: 0.4, edge: 4 }); ctx.restore(); }
export function phoneBig(x, y, s, rot, inner) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-210, -400, 420, 800, 54), '#1F1D1A', { shadow: 1, edge: 6 }); rr(-186, -370, 372, 740, 36); ctx.fillStyle = '#F3E9D2'; ctx.fill();
  rr(-60, -384, 120, 18, 9); ctx.fillStyle = '#3A3A3A'; ctx.fill(); if (inner) { ctx.save(); rr(-186, -370, 372, 740, 36); ctx.clip(); inner(); ctx.restore(); } ctx.restore(); }
export function bubble(text, x, y, sc, me = false, size = 52) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc); ctx.font = `700 ${size}px Caladea`;
  const w = ctx.measureText(text).width + 60; cut(P_rr(me ? -w : 0, -size * .8, w, size * 1.6, 24), me ? '#CFE3BF' : '#FFFBF0', { shadow: 0.6, edge: 4 });
  ctx.fillStyle = P.ink; ctx.textAlign = 'left'; ctx.textBaseline = 'middle'; ctx.fillText(text, (me ? -w : 0) + 30, 4); ctx.restore(); }
export function laptop(x, y, s, inner) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-330, -440, 660, 420, 22), '#3A3A3A'); rr(-306, -418, 612, 376, 10); ctx.fillStyle = '#F3E9D2'; ctx.fill();
  if (inner) { ctx.save(); rr(-306, -418, 612, 376, 10); ctx.clip(); inner(); ctx.restore(); }
  cut(P_poly([[-380, -20], [380, -20], [420, 20], [-420, 20]]), P.stone, { shadow: 0.7, edge: 4 }); ctx.restore(); }
export function postCard(x, y, s, rot = 0, heart = 0) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-170, -220, 340, 440, 16), '#FFFBF0'); rr(-140, -190, 280, 250, 8); ctx.fillStyle = P.sea; ctx.fill();
  circle(60, -130, 34, '#EFC66A'); ctx.beginPath(); ctx.moveTo(-140, 60); ctx.lineTo(-60, -40); ctx.lineTo(10, 30); ctx.lineTo(70, -20); ctx.lineTo(140, 60); ctx.closePath(); ctx.fillStyle = P.forest; ctx.fill();
  ctx.save(); ctx.translate(-110, 110); ctx.scale(0.55 + heart * 0.2, 0.55 + heart * 0.2); ctx.beginPath(); ctx.moveTo(0, 18); ctx.bezierCurveTo(-40, -10, -20, -40, 0, -18); ctx.bezierCurveTo(20, -40, 40, -10, 0, 18); ctx.fillStyle = heart ? P.crimson : 'rgba(62,44,30,0.35)'; ctx.fill(); ctx.restore();
  line([[-60, 110], [120, 110]], 'rgba(62,44,30,0.3)', 12); line([[-140, 160], [80, 160]], 'rgba(62,44,30,0.2)', 12); ctx.restore(); }
export function skyline(seed, y = 1400) { for (let i = 0; i < 7; i++) { const x = -40 + i * 175, h = 380 + rnd(i + seed) * 420, c = i % 2 ? P.stone : P.stoneDark;
  cut(P_rr(x, y - h, 150, h, 4), c, { shadow: 0.6, edge: 4 }); for (let r = 0; r < Math.floor(h / 70) - 1; r++) for (let q = 0; q < 3; q++) { rr(x + 18 + q * 44, y - h + 30 + r * 70, 26, 34, 3); ctx.fillStyle = 'rgba(62,44,30,0.45)'; ctx.fill(); }
  if (i === 3) cut(P_rr(x + 40, y - h - 70, 70, 70, 6), P.sepia, { shadow: 0.4, edge: 3 }); } }
export function stringLights(t, y) { ctx.strokeStyle = 'rgba(233,220,188,0.6)'; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(-50, y); ctx.quadraticCurveTo(540, y + 140, 1130, y); ctx.stroke();
  for (let i = 0; i < 14; i++) { const u = i / 13, x = lerp(-50, 1130, u), yy = y + 140 * 2 * u * (1 - u); circle(x, yy + 14, 12, `rgba(242,193,78,${0.6 + 0.4 * Math.sin(t * 4 + i)})`); } }
export function ringLight(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); line([[0, 0], [-90, 380]], P.ink, 10); line([[0, 0], [90, 380]], P.ink, 10); line([[0, 0], [0, -420]], P.ink, 12);
  ctx.beginPath(); ctx.arc(0, -560, 150, 0, TAU); ctx.lineWidth = 34; ctx.strokeStyle = '#F7EFDC'; ctx.stroke(); ctx.lineWidth = 6; ctx.strokeStyle = P.ink; ctx.stroke(); cut(P_rr(-36, -620, 72, 120, 10), '#1F1D1A', { shadow: 0.4, edge: 3 }); ctx.restore(); }
export function wallet(x, y, s, open) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-200, -130, 400, 260, 26), '#8C5E3C');
  if (open > 0) { ctx.save(); ctx.translate(0, -130); ctx.scale(1, -open); cut(P_rr(-200, 0, 400, 150, 26), '#A8724B'); ctx.restore(); rr(-160, -110, 320, 40, 8); ctx.fillStyle = '#3E2C1E'; ctx.fill(); }
  cut(P_rr(90, -40, 130, 80, 20), '#6E4430', { shadow: 0.3, edge: 3 }); circle(150, 0, 12, P.gold); ctx.restore(); }
export function magnifier(x, y, s) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(-0.5); cut(P_rr(-18, 90, 36, 200, 14), P.sepia); ctx.beginPath(); ctx.arc(0, 0, 100, 0, TAU); ctx.fillStyle = 'rgba(157,180,176,0.35)'; ctx.fill(); ctx.lineWidth = 22; ctx.strokeStyle = P.ink; ctx.stroke(); ctx.restore(); }
export function bigMark(ch, x, y, sc, rot = 0, col = P.crimson, size = 520) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc); ctx.font = `700 ${size}px Caladea, serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(70,45,20,0.35)'; ctx.shadowBlur = 14; ctx.shadowOffsetX = 8; ctx.shadowOffsetY = 12; ctx.lineWidth = 16; ctx.strokeStyle = P.edge; ctx.strokeText(ch, 0, 0); ctx.shadowColor = 'transparent'; ctx.fillStyle = col; ctx.fillText(ch, 0, 0); ctx.restore(); }

// ── India, simplified (cut-paper outline from rough lon/lat; stylized, not survey-accurate) ──
export const LL = [[68.2,23.7],[70,20.8],[72.8,19],[73.5,16],[74.8,12.8],[76.3,9.5],[77.5,8.1],[78.2,8.9],[79.9,10.3],[80.3,13],[80.1,15.9],[82.3,17],[84.8,19.3],[86.9,21],[88.1,21.6],[88.8,25.2],[92.5,25.5],[95.5,27.5],[94,28.8],[91.5,27.8],[88.1,27.9],[84,28.6],[81,30.2],[78.8,31.2],[78.9,32.5],[77.8,35.4],[75.5,36.6],[74,35],[73.8,33.4],[74.6,32.7],[75.3,32.2],[74.5,31],[73.5,29.9],[72,28],[70.5,27.6],[69.5,26.6],[70.3,25.3],[68.8,24.3]];
export const geo = (lon, lat) => [100 + (lon - 68) * 30, 300 + (37 - lat) * 33];
export const CITY = { MUMBAI: [72.9, 19.1], DELHI: [77.2, 28.6], BENGALURU: [77.6, 12.97], KOLKATA: [88.4, 22.6], HYDERABAD: [78.5, 17.4], JAIPUR: [75.8, 26.9] };
export function indiaMap(seed) { K.parchment(seed); ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = P.sea; ctx.fillRect(-300, -300, W + 600, H + 600); ctx.restore();
  ctx.strokeStyle = 'rgba(62,44,30,0.15)'; ctx.lineWidth = 2; for (let x = 0; x <= W; x += 120) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke(); } for (let y = 0; y <= H; y += 120) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke(); }
  cut(P_poly(LL.map(([a, b]) => geo(a, b))), P.land, { shadow: 1, edge: 7 }); K.compass(930, 1380, 0.5); }


// ── added 11 Nov: hand, fishing hook, retention chart, clock, podium card ──
/** a paper hand (palm + 4 fingers + thumb); point = index finger up; rot in radians */
export function hand(x, y, s, rot = 0, point = false) { ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(s, s);
  cut(P_rr(-60, -20, 120, 150, 40), P.skin); for (let i = 0; i < 4; i++) { const h = point && i ? 70 : [130, 150, 140, 115][i]; cut(P_rr(-58 + i * 30, -h + 10, 28, h, 14), P.skin, { shadow: 0.3, edge: 3 }); }
  cut(() => { ctx.beginPath(); ctx.save(); ctx.translate(-55, 60); ctx.rotate(-0.9); ctx.roundRect(-14, -90, 30, 100, 15); ctx.restore(); }, P.skin, { shadow: 0.3, edge: 3 }); cut(P_rr(-66, 120, 132, 80, 10), M.hoodie, { shadow: 0.4, edge: 4 }); ctx.restore(); }
/** a fishing hook on a line, hanging from y0 */
export function fishHook(x, y, s, y0 = -400) { line([[x, y0], [x, y - 120 * s]], P.ink, 5); ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  ctx.beginPath(); ctx.moveTo(0, -120); ctx.lineTo(0, 30); ctx.arc(-40, 30, 40, 0, Math.PI, false); ctx.lineTo(-80, 0); ctx.lineWidth = 16; ctx.lineCap = 'round'; ctx.strokeStyle = '#7A7F86'; ctx.stroke();
  ctx.beginPath(); ctx.moveTo(-80, 0); ctx.lineTo(-62, 18); ctx.stroke(); circle(0, -120, 14, '#7A7F86'); ctx.restore(); }
/** a retention chart card: the line draws on with p; drop = how hard it falls in the first 3 s (0..1); mark = highlight the drop */
export function retention(x, y, w, h, p, drop = 0.5, mark = 0) { cut(P_rr(x, y, w, h, 14), '#FFFBF0');
  const ox = x + 60, oy = y + h - 70, cw = w - 110, ch = h - 150; line([[ox, y + 60], [ox, oy], [ox + cw, oy]], 'rgba(62,44,30,0.5)', 5);
  const pts = []; for (let i = 0; i <= 40; i++) { const u = i / 40, v = u < 0.12 ? 1 - drop * (u / 0.12) : (1 - drop) * (1 - 0.35 * (u - 0.12)); pts.push([ox + u * cw, oy - v * ch]); }
  const n = Math.max(2, Math.floor(pts.length * clamp(p))); line(pts.slice(0, n), P.crimson, 9);
  if (mark > 0) { ctx.save(); ctx.globalAlpha = 0.25 * mark; ctx.fillStyle = P.crimson; ctx.fillRect(ox, y + 50, cw * 0.12, oy - y - 50); ctx.restore(); K.label('0-3s', ox + cw * 0.06, oy + 40, 30, P.crimson); } }
/** wall clock, hands spin with t */
export function clock(x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_circ(0, 0, 120), '#FFFBF0', { shadow: 0.8, edge: 6 }); ctx.lineWidth = 8; ctx.strokeStyle = P.ink; ctx.beginPath(); ctx.arc(0, 0, 120, 0, TAU); ctx.stroke();
  for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line([[Math.cos(a) * 95, Math.sin(a) * 95], [Math.cos(a) * 108, Math.sin(a) * 108]], P.ink, 6); }
  line([[0, 0], [Math.cos(t * 6 - 1.57) * 85, Math.sin(t * 6 - 1.57) * 85]], P.ink, 8); line([[0, 0], [Math.cos(t * 0.5 - 1.57) * 55, Math.sin(t * 0.5 - 1.57) * 55]], P.crimson, 10); circle(0, 0, 10, P.ink); ctx.restore(); }
/** a numbered gold card with a word (rankings, steps) */
export function rankCard(n, word, x, y, sc, rot = 0, w = 560) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.rotate(rot); ctx.scale(sc, sc);
  cut(P_rr(-w / 2, -70, w, 140, 14), '#FFFBF0'); cut(P_circ(-w / 2 + 75, 0, 50), P.gold, { shadow: 0.5, edge: 4 }); ctx.font = '700 64px Caladea'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = P.ink; ctx.fillText(String(n), -w / 2 + 75, 4);
  ctx.textAlign = 'left'; ctx.font = '700 62px Caladea'; ctx.fillText(word, -w / 2 + 150, 4); ctx.restore(); }
/** strike a crimson line through a rect area (x, y, w), p 0..1 */
export function strike(x, y, w, p) { if (p <= 0) return; line([[x, y], [x + w * clamp(p), y - 20 * clamp(p)]], P.crimson, 14); }

// ── added 13 Nov: bar pair, map pin, hut, palm tree, cooking pot, river, cafe cup ──
/** two paper bars side by side growing with p; a = {v, label, txt, hot}, b likewise; base y, max height hMax */
export function barPair(a, b, x, y, p, hMax = 760) { const mx = Math.max(a.v, b.v);
  [a, b].forEach((o, k) => { const bx = x + k * 360, h = hMax * (o.v / mx) * eo(clamp(p)); if (h > 2) cut(P_rr(bx - 130, y - h, 260, h, 10), o.hot ? P.crimson : P.stone);
    if (p > 0.3) { ctx.save(); ctx.globalAlpha = clamp((p - 0.3) * 3); K.label(o.txt, bx, y - h - 60, 72, o.hot ? P.crimson : P.ink); ctx.restore(); }
    K.label(o.label, bx, y + 55, 40); }); }
/** a map pin at (x, y) (tip at the point); sc pops it in */
export function pin(x, y, sc, col = P.crimson) { if (sc <= 0) return; ctx.save(); ctx.translate(x, y); ctx.scale(sc, sc);
  cut(() => { ctx.beginPath(); ctx.moveTo(0, 0); ctx.bezierCurveTo(-40, -50, -46, -80, -46, -96); ctx.arc(0, -96, 46, Math.PI, 0); ctx.bezierCurveTo(46, -80, 40, -50, 0, 0); ctx.closePath(); }, col, { shadow: 0.6, edge: 4 });
  circle(0, -96, 17, P.edge); ctx.restore(); }
/** a village hut (walls + thatched roof) standing on (x, y) */
export function hut(x, y, s, wall = '#C9A574') { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  cut(P_rr(-150, -200, 300, 200, 6), wall); cut(P_rr(-40, -120, 80, 120, 4), P.ink, { shadow: 0, edge: 3 });
  cut(P_poly([[-200, -190], [0, -360], [200, -190]]), '#A8823F'); for (let i = 0; i < 5; i++) line([[-150 + i * 60, -200], [-20 + i * 20, -330]], 'rgba(62,44,30,0.3)', 4); ctx.restore(); }
/** a palm / coconut tree standing on (x, y); sway = small rotation */
export function tree(x, y, s, sway = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); ctx.rotate(sway);
  cut(() => { ctx.beginPath(); ctx.moveTo(-18, 0); ctx.quadraticCurveTo(-30, -250, 10, -480); ctx.lineTo(34, -478); ctx.quadraticCurveTo(0, -250, 18, 0); ctx.closePath(); }, P.sepia, { shadow: 0.6, edge: 4 });
  for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * 0.55; cut(() => { ctx.beginPath(); ctx.save(); ctx.translate(22, -480); ctx.rotate(a); ctx.ellipse(110, 0, 120, 30, 0.25, 0, TAU); ctx.restore(); }, i % 2 ? P.forest : P.green, { shadow: 0.4, edge: 3 }); }
  ctx.restore(); }
/** a huge cooking pot over a fire; t animates flames + steam */
export function pot(x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s);
  for (let i = 0; i < 5; i++) { const fh = 90 + Math.sin(t * 9 + i * 1.7) * 25; cut(P_poly([[-150 + i * 75, 0], [-115 + i * 75, -fh], [-80 + i * 75, 0]]), i % 2 ? P.gold : P.crimson, { shadow: 0, edge: 3 }); }
  cut(() => { ctx.beginPath(); ctx.ellipse(0, -150, 230, 130, 0, 0, Math.PI); ctx.lineTo(-230, -240); ctx.lineTo(230, -240); ctx.closePath(); }, '#5A5550');
  cut(() => { ctx.beginPath(); ctx.ellipse(0, -240, 250, 40, 0, 0, TAU); }, '#7A7F86', { shadow: 0.3, edge: 4 });
  ctx.save(); ctx.globalAlpha = 0.5; for (let i = 0; i < 3; i++) { const u = (t * 0.6 + i / 3) % 1; circle(-80 + i * 80 + Math.sin(t * 2 + i) * 20, -300 - u * 260, 30 + u * 30, '#F7EFDC'); } ctx.restore(); ctx.restore(); }
/** a river strip across the page at y */
export function river(y, t = 0) { cut(() => { ctx.beginPath(); ctx.moveTo(-300, y); for (let x = -300; x <= W + 300; x += 60) ctx.lineTo(x, y + Math.sin(x / 140 + t) * 18); ctx.lineTo(W + 300, y + 170); ctx.lineTo(-300, y + 170); ctx.closePath(); }, P.sea, { shadow: 0.3, edge: 5 });
  for (let i = 0; i < 6; i++) line([[(i * 200 + t * 60) % (W + 200) - 100, y + 80], [(i * 200 + t * 60) % (W + 200) - 40, y + 80]], '#F7EFDC', 5); }
/** a café cup (steam) */
export function cup(x, y, s, t = 0) { ctx.save(); ctx.translate(x, y); ctx.scale(s, s); cut(P_rr(-80, -140, 160, 140, 20), '#FFFBF0'); ctx.beginPath(); ctx.arc(95, -75, 35, -1.4, 1.4); ctx.lineWidth = 16; ctx.strokeStyle = '#FFFBF0'; ctx.stroke();
  cut(P_rr(-60, -100, 120, 30, 6), P.sepia, { shadow: 0, edge: 0 }); ctx.save(); ctx.globalAlpha = 0.45; for (let i = 0; i < 2; i++) line([[-20 + i * 40, -170], [-30 + i * 40 + Math.sin(t * 3 + i) * 10, -240]], P.sepia, 8); ctx.restore(); ctx.restore(); }
