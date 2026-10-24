// Skeletal structures for the reaction scheme. Coordinates in bond-length units, y pointing down.
(function () {
  const S = 24;           // px per bond
  const PAD = 0.35;

  function hex(cx, cy) {
    return [0, 1, 2, 3, 4, 5].map(k => {
      const t = (-90 + 60 * k) * Math.PI / 180;
      return [cx + Math.cos(t), cy + Math.sin(t)];
    });
  }
  function addRing(m, cx, cy) {
    const base = m.atoms.length;
    hex(cx, cy).forEach(p => m.atoms.push(p));
    for (let k = 0; k < 6; k++) m.bonds.push([base + k, base + (k + 1) % 6, k % 2 === 0 ? 2 : 1, [cx, cy]]);
    return base;
  }
  function addAtom(m, x, y) { m.atoms.push([x, y]); return m.atoms.length - 1; }

  function styrene() {
    const m = { atoms: [], bonds: [] };
    const r = addRing(m, 0, 0);
    const a = addAtom(m, 1.732, -1);
    const b = addAtom(m, 2.598, -0.5);
    m.bonds.push([r + 1, a, 1], [a, b, 2, [2.0, 0.3]]);
    return m;
  }
  function diphenylbutane14() {
    const m = { atoms: [], bonds: [] };
    const rA = addRing(m, 0, 0);
    const c1 = addAtom(m, 1.732, -1), c2 = addAtom(m, 2.598, -0.5);
    const c3 = addAtom(m, 3.464, -1), c4 = addAtom(m, 4.330, -0.5);
    const rB = addRing(m, 6.062, -1.5);
    m.bonds.push([rA + 1, c1, 1], [c1, c2, 1], [c2, c3, 1], [c3, c4, 1], [c4, rB + 4, 1]);
    return m;
  }
  function diphenylbutane23() {
    const m = { atoms: [], bonds: [] };
    const me1 = addAtom(m, 0, 0), c2 = addAtom(m, 0.866, 0.5);
    const c3 = addAtom(m, 1.732, 0), me4 = addAtom(m, 2.598, 0.5);
    const rDown = addRing(m, 0.866, 2.5);
    const rUp = addRing(m, 1.732, -2);
    m.bonds.push([me1, c2, 1], [c2, c3, 1], [c3, me4, 1], [c2, rDown + 0, 1], [c3, rUp + 3, 1]);
    return m;
  }

  function render(svg, m) {
    if (!svg) return;
    const xs = m.atoms.map(a => a[0]), ys = m.atoms.map(a => a[1]);
    const minX = Math.min(...xs) - PAD, minY = Math.min(...ys) - PAD;
    const w = Math.max(...xs) + PAD - minX, h = Math.max(...ys) + PAD - minY;
    const P = ([x, y]) => [(x - minX) * S, (y - minY) * S];
    svg.setAttribute('viewBox', `0 0 ${w * S} ${h * S}`);
    svg.setAttribute('width', w * S);
    svg.setAttribute('height', h * S);
    let out = '';
    const line = (p, q) => `<line x1="${p[0].toFixed(1)}" y1="${p[1].toFixed(1)}" x2="${q[0].toFixed(1)}" y2="${q[1].toFixed(1)}"/>`;
    for (const [i, j, order, side] of m.bonds) {
      const a = m.atoms[i], b = m.atoms[j];
      out += line(P(a), P(b));
      if (order === 2) {
        const dx = b[0] - a[0], dy = b[1] - a[1];
        let nx = -dy, ny = dx;
        const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2;
        if ((side[0] - mx) * nx + (side[1] - my) * ny < 0) { nx = -nx; ny = -ny; }
        const off = 0.2, sh = 0.16;
        const p = [a[0] + dx * sh + nx * off, a[1] + dy * sh + ny * off];
        const q = [b[0] - dx * sh + nx * off, b[1] - dy * sh + ny * off];
        out += line(P(p), P(q));
      }
    }
    svg.innerHTML = `<g stroke="currentColor" stroke-width="1.7" stroke-linecap="round">${out}</g>`;
  }
  render(document.getElementById('m-styrene'), styrene());
  render(document.getElementById('m-linear'), diphenylbutane14());
  render(document.getElementById('m-branched'), diphenylbutane23());
})();

// Decorative cyclic voltammogram: cathodic sweep to the left, reduction current downward.
(function drawCV() {
  const svg = document.getElementById('cv');
  if (!svg) return;
  const W = 1000, x0 = 1000, x1 = 700, yz = 120, amp = 170;
  const X = e => x0 - (x0 - x1) * e;
  const Y = i => yz - i * amp;
  const g = e => 1 / (1 + Math.exp(-(e - 0.55) / 0.035));
  const fwd = e => -g(e) * (0.42 + 0.58 * Math.exp(-Math.max(0, e - 0.55) * 7));
  const rev = e => -0.42 * Math.exp(-(1 - e) * 4.5) + 0.16 * Math.exp(-(((e - 0.5) / 0.05) ** 2));
  let d = '';
  for (let k = 0; k <= 200; k++) { const e = k / 200; d += (k ? 'L' : 'M') + X(e).toFixed(1) + ' ' + Y(fwd(e)).toFixed(1); }
  for (let k = 200; k >= 0; k--) { const e = k / 200; d += 'L' + X(e).toFixed(1) + ' ' + Y(rev(e)).toFixed(1); }
  svg.innerHTML = `<line x1="${x1 - 20}" y1="${yz}" x2="${W}" y2="${yz}"/><path d="${d}"/>`;
})();
