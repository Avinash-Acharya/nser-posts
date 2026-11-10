// Nib — nser mascot (locked 1 Nov: phone body; banana kept as kind:'banana'), original Nib art style (thin wobbly ink, stick limbs, round hands).
// mascotSVG({pose, mood, size, prop}) -> SVG string
// pose: idle | wave | point | cheer | think | hold | shrug
// mood: smile | happy | blep | wow | worried
// eyes: bean (default) | round | dot | beady | bean | sleepy | glasses | button | wide
(function () {
  const INK = '#1C1A17', Y = '#FFD23F', Y2 = '#F2B705', BR = '#6B4A2B', BRD = '#3E2A16', GREEN = '#A9C64A',
        W = '#FFFFFF', BLUSH = '#FF9DA6', TICK = '#E8697A', TONGUE = '#FF8A93';
  const st = (w) => `stroke="${INK}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"`;
  // face anchor (banana leans, so the face sits on the widest part)
  const TILT = 12; // body leans so the bottom tip clears the legs; the face stays upright
  const F = { lx: 150, rx: 200, ey: 160, my: 206, cx: 176 };
  // [shoulderX, shoulderY, ctrlX, ctrlY, handX, handY]
  const ARMS = {
    idle:  { L: [104, 222, 80, 250, 80, 280],  R: [238, 214, 260, 244, 262, 274] },
    wave:  { L: [104, 222, 80, 250, 80, 280],  R: [238, 206, 276, 182, 284, 132] },
    point: { L: [104, 222, 80, 250, 80, 280],  R: [238, 210, 282, 202, 318, 186] },
    cheer: { L: [104, 214, 68, 186, 62, 132],  R: [238, 206, 274, 178, 284, 126] },
    think: { L: [104, 222, 80, 250, 80, 280],  R: [236, 222, 230, 252, 196, 238] },
    hold:  { L: [106, 230, 118, 262, 150, 262], R: [236, 228, 224, 262, 196, 262] },
    shrug: { L: [104, 220, 70, 214, 62, 182],  R: [238, 212, 272, 206, 282, 172] },
  };
  // eye styles: bean (default) | round | dot | beady | sleepy | glasses | button | wide
  const EYE_STYLES = ['round', 'dot', 'beady', 'bean', 'sleepy', 'glasses', 'button', 'wide'];
  function eye(cx, cy, mood, side, style) {
    style = style || 'bean';
    const wow = mood === 'wow', py = mood === 'worried' ? -3 : 0;
    const bt = wow ? -36 : -28;
    const rot = mood === 'worried' ? side * 16 : 0;
    const brow = (mood === 'worried' || wow)
      ? `<path d="M${cx - 11} ${cy + bt} L${cx + 11} ${cy + bt}" ${st(6)} transform="rotate(${rot} ${cx} ${cy + bt})"/>` : '';
    if (mood === 'happy') return `<path d="M${cx - 13} ${cy + 5} Q${cx} ${cy - 12} ${cx + 13} ${cy + 5}" fill="none" ${st(6.5)}/>` + (style === 'glasses' ? glasses(cx, cy) : '');
    const whiteEye = (rx, ry, pr, dx) => `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${W}" ${st(5)}/><circle cx="${cx + dx}" cy="${cy + py}" r="${pr}" fill="${INK}"/>`;
    let e;
    switch (style) {
      case 'dot':    e = `<ellipse cx="${cx}" cy="${cy + py}" rx="${wow ? 9 : 7.5}" ry="${wow ? 12 : 10.5}" fill="${INK}"/><circle cx="${cx + 2.5}" cy="${cy + py - 4}" r="2.6" fill="${W}"/>`; break;
      case 'beady':  e = `<circle cx="${cx}" cy="${cy + py}" r="${wow ? 6.5 : 5}" fill="${INK}"/>`; break;
      case 'bean':   e = `<rect x="${cx - (wow ? 6 : 5)}" y="${cy + py - (wow ? 15 : 12)}" width="${wow ? 12 : 10}" height="${wow ? 30 : 24}" rx="${wow ? 6 : 5}" fill="${INK}"/>`; break;
      case 'sleepy': e = wow ? whiteEye(17, 19, 4.5, 1.5)
                       : `<path d="M${cx - 14} ${cy - 1} A14 14 0 0 0 ${cx + 14} ${cy - 1} Z" fill="${W}" ${st(5)}/><circle cx="${cx + 1.5}" cy="${cy + 4}" r="4.4" fill="${INK}"/><path d="M${cx - 16} ${cy - 1} H${cx + 16}" ${st(5.5)}/>`; break;
      case 'glasses': e = whiteEye(wow ? 14 : 12, wow ? 16 : 13.5, wow ? 3.8 : 4, 1) + glasses(cx, cy); break;
      case 'button': e = `<circle cx="${cx}" cy="${cy + py}" r="${wow ? 13 : 11}" fill="${INK}"/><circle cx="${cx}" cy="${cy + py}" r="${wow ? 8 : 6.5}" fill="none" stroke="${W}" stroke-width="2.4" opacity=".9"/>`; break;
      case 'wide':   e = whiteEye(wow ? 20 : 18, wow ? 15 : 12.5, wow ? 4.2 : 4.6, 2); break;
      default:       e = wow ? whiteEye(17, 19, 4.5, 1.5) : whiteEye(15, 17, 4.6, 1.5);
    }
    return brow + e;
  }
  function glasses(cx, cy) {
    return `<circle cx="${cx}" cy="${cy}" r="21" fill="none" ${st(5)}/>` + (cx < 176 ? `<path d="M${cx + 21} ${cy - 3} Q${cx + 26} ${cy - 9} ${cx + 31} ${cy - 5}" fill="none" ${st(5)}/>` : '');
  }
  function mouth(cx, cy, mood) {
    if (mood === 'happy') return `<path d="M${cx - 14} ${cy - 3} Q${cx} ${cy + 20} ${cx + 14} ${cy - 3} Z" fill="${INK}" ${st(4.5)}/><path d="M${cx - 7} ${cy + 8} Q${cx} ${cy + 2} ${cx + 7} ${cy + 8} Q${cx} ${cy + 14} ${cx - 7} ${cy + 8}Z" fill="${TONGUE}"/>`;
    if (mood === 'blep') return `<path d="M${cx - 8} ${cy + 1} C${cx - 9} ${cy + 20} ${cx + 9} ${cy + 20} ${cx + 8} ${cy - 1} Z" fill="${TONGUE}" ${st(4.5)}/><path d="M${cx} ${cy + 3} V${cy + 11}" stroke="${TICK}" stroke-width="2.6" stroke-linecap="round"/><path d="M${cx - 16} ${cy + 1} L${cx + 16} ${cy - 2}" ${st(5.5)}/>`;
    if (mood === 'wow') return `<ellipse cx="${cx}" cy="${cy + 5}" rx="8" ry="10" fill="${INK}"/>`;
    if (mood === 'worried') return `<path d="M${cx - 12} ${cy + 4} q6 -6 12 0 q6 6 12 0" fill="none" ${st(5)}/>`;
    return `<path d="M${cx - 12} ${cy} q12 12 24 0" fill="none" ${st(5.5)}/>`;
  }
  function blush(x, y) {
    return `<ellipse cx="${x}" cy="${y}" rx="13" ry="9" fill="${BLUSH}" opacity=".85"/><g stroke="${TICK}" stroke-width="2.4" stroke-linecap="round"><path d="M${x - 5} ${y - 3} v6"/><path d="M${x} ${y - 4} v7"/><path d="M${x + 5} ${y - 3} v6"/></g>`;
  }
  function arm(a) {
    const [sx, sy, cx, cy, hx, hy] = a;
    return `<path d="M${sx} ${sy} Q${cx} ${cy} ${hx} ${hy}" fill="none" ${st(8.5)}/><circle cx="${hx}" cy="${hy}" r="11.5" fill="${Y}" ${st(6)}/>`;
  }
  function prop(pose, p) {
    if (pose === 'hold') return `<g transform="translate(156 214) rotate(-5)"><rect width="38" height="62" rx="7" fill="${W}" ${st(5.5)}/><rect x="8" y="10" width="22" height="30" rx="3" fill="${Y}"/></g>`;
    if (pose === 'think' || p === 'question') return `<text x="250" y="94" font-family="Caveat, 'Comic Sans MS', cursive" font-weight="700" font-size="70" fill="${INK}">?</text>`;
    if (pose === 'cheer' || p === 'sparkle') return `<g fill="${INK}"><path d="M28 120 l5 12 l12 5 l-12 5 l-5 12 l-5 -12 l-12 -5 l12 -5z"/><path d="M296 88 l4 9 l9 4 l-9 4 l-4 9 l-4 -9 l-9 -4 l9 -4z"/></g>`;
    if (pose === 'shrug' || p === 'sweat') return `<path d="M236 108 q10 15 0 22 q-10 -7 0 -22z" fill="#8FD3FF" ${st(4)}/>`;
    return '';
  }
  const BANANA_BODY = `
    <path d="M130 50 L118 18 C116 10 126 6 131 12 L148 46 Z" fill="${BR}" ${st(6)}/>
    <path d="M126 40 L146 44" stroke="${GREEN}" stroke-width="7" stroke-linecap="round"/>
    <path d="M148 44 C232 70 268 156 252 232 C238 290 194 324 148 330 C122 334 98 320 96 300 C116 258 116 186 96 124 C88 94 100 60 126 44 C132 40 142 40 148 44 Z" fill="${Y}" ${st(7)}/>
    <path d="M96 124 C116 186 116 258 96 300 C100 320 120 330 138 330 C116 300 126 222 116 152 C114 134 106 128 96 124Z" fill="${Y2}" opacity=".55"/>
    <path d="M142 54 C208 90 240 162 228 234 C220 280 190 312 156 324" fill="none" stroke="${Y2}" stroke-width="5" stroke-linecap="round"/>
    <ellipse cx="124" cy="332" rx="10" ry="6.5" fill="${BRD}" ${st(4)}/>
    <g fill="#B8862C" opacity=".55"><ellipse cx="232" cy="252" rx="4" ry="3"/><ellipse cx="216" cy="282" rx="3" ry="2.4"/><ellipse cx="244" cy="220" rx="2.6" ry="2"/></g>
`;
  // phone: yellow case, cream screen with the face on it, camera pill, side buttons, screen glare
  const PHONE_BODY = `
    <path d="M250 112 h10 v34 h-10 Z M250 156 h10 v22 h-10 Z" fill="${Y2}" ${st(4)}/>
    <rect x="96" y="44" width="160" height="286" rx="36" fill="${Y}" ${st(7)}/>
    <path d="M232 52 C246 58 252 70 252 90 V286 C252 310 242 322 222 324 C238 312 240 300 240 284 V92 C240 74 238 62 232 52Z" fill="${Y2}" opacity=".55"/>
    <rect x="110" y="60" width="132" height="254" rx="24" fill="#FFF8E6" ${st(4.5)}/>
    <rect x="156" y="70" width="40" height="13" rx="6.5" fill="${INK}"/>
    <path d="M122 96 L150 70 M122 120 L170 72" stroke="${W}" stroke-width="7" stroke-linecap="round" opacity=".9"/>
    <path d="M160 300 h32" stroke="${INK}" stroke-width="4.5" stroke-linecap="round" opacity=".7"/>
`;
  window.NIB_EYES = EYE_STYLES;
  window.mascotSVG = function (o = {}) {
    const pose = o.pose || 'idle', mood = o.mood || 'smile', size = o.size || 300;
    const A = ARMS[pose] || ARMS.idle, id = 'w' + Math.random().toString(36).slice(2, 7);
    const limbs = arm(A.L) + arm(A.R);
    const front = pose === 'hold' || pose === 'think';
    const kind = o.kind || 'phone', tilt = kind === 'phone' ? 0 : TILT;
    let body = kind === 'phone' ? PHONE_BODY : BANANA_BODY;
    // soft: clay-like 3D look (gradient body, glossy highlight, no wobble), for the studio reels
    const soft = !!o.soft;
    if (soft && kind === 'phone') body = body
      .replace(`<rect x="96" y="44" width="160" height="286" rx="36" fill="${Y}" ${st(7)}/>`,
        `<rect x="96" y="44" width="160" height="286" rx="36" fill="url(#${id}g)" stroke="#B98200" stroke-width="5"/><rect x="96" y="44" width="160" height="286" rx="36" fill="url(#${id}r)"/>`)
      .replace(`fill="#FFF8E6" ${st(4.5)}`, `fill="url(#${id}s)" stroke="#B98200" stroke-width="3.5"`);
    return `<svg viewBox="40 0 300 370" width="${size}" height="${size * 370 / 300}" xmlns="http://www.w3.org/2000/svg" style="overflow:visible" role="img" aria-label="Nib the ${kind}, ${pose}, ${mood}">
  <defs><filter id="${id}"><feTurbulence type="fractalNoise" baseFrequency="0.03" numOctaves="2" seed="4"/><feDisplacementMap in="SourceGraphic" scale="${soft ? 0 : 3.6}"/></filter>
    <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFEA8A"/><stop offset=".45" stop-color="#FFD23F"/><stop offset="1" stop-color="#E9A800"/></linearGradient>
    <radialGradient id="${id}r" cx=".3" cy=".18" r=".7"><stop offset="0" stop-color="#fff" stop-opacity=".55"/><stop offset=".35" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#7A4E00" stop-opacity=".18"/></radialGradient>
    <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFFDF5"/><stop offset="1" stop-color="#F3E7C8"/></linearGradient></defs>
  <ellipse cx="${kind === 'phone' ? 175 : 150}" cy="356" rx="${soft ? 84 : 70}" ry="${soft ? 13 : 9}" fill="${INK}" opacity="${soft ? .2 : .12}" ${soft ? 'style="filter:blur(6px)"' : ''}/>
  <g filter="url(#${id})">
    ${kind === 'phone' ? `<path d="M146 320 v26 h-18" fill="none" ${st(8.5)}/><path d="M204 320 v26 h18" fill="none" ${st(8.5)}/>` : `<path d="M134 300 v46 h-18" fill="none" ${st(8.5)}/><path d="M168 296 v50 h18" fill="none" ${st(8.5)}/>`}
    <g transform="rotate(${tilt} 175 190)">
    ${front ? '' : limbs}
    ${body}
    </g>
    <g transform="translate(4 2)">
    ${blush(F.lx - 8, F.ey + 28)}${blush(F.rx + 10, F.ey + 28)}
    ${eye(F.lx, F.ey, mood, -1, o.eyes)}${eye(F.rx, F.ey, mood, 1, o.eyes)}
    ${mouth(F.cx, F.my, mood)}
    </g>
    <g transform="rotate(${tilt} 175 190)">
    ${front ? limbs : ''}
    ${prop(pose, o.prop)}
    </g>
  </g></svg>`;
  };
})();
