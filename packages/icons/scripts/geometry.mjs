// Drawing primitives for the icon set, on a 24 × 24 grid.
//
// Icons are drawn from strokes and shapes, then flattened with paper.js
// boolean operations into a single filled path, the way solid icon sets are
// shipped: one `<path>`, `fill="currentColor"`, no strokes.
import './headless.mjs'
import paper from 'paper/dist/paper-core.js'

paper.setup(new paper.Size(24, 24))

const { Path, CompoundPath, Point } = paper

/** Stroke weight of line glyphs (chevrons, check, x…): 1/8 of the icon. */
export const W = 3
/** Stroke weight of details knocked out of a solid shape (the check in circle-check). */
export const K = 2.5
/** Gap between a knocked-out stroke and what surrounds it. */
export const GAP = 1.5

const deg = (a) => (a * Math.PI) / 180
const polar = (cx, cy, r, a) => new Point(cx + r * Math.cos(deg(a)), cy + r * Math.sin(deg(a)))

/** One straight stroke with round caps. */
function segment(a, b, w) {
  const A = new Point(a)
  const B = new Point(b)
  const d = B.subtract(A)
  const rect = new Path.Rectangle({
    point: [A.x - w / 2, A.y - w / 2],
    size: [d.length + w, w],
    radius: w / 2,
  })
  rect.rotate(d.angle, A)
  return rect
}

/** A stroked polyline with round caps and joins. */
export function line(points, w = W) {
  let out = segment(points[0], points[1], w)
  for (let i = 1; i < points.length - 1; i++) out = out.unite(segment(points[i], points[i + 1], w))
  return out
}

export const circle = (cx, cy, r) => new Path.Circle({ center: [cx, cy], radius: r })

export const rect = (x, y, w, h, r = 0) =>
  new Path.Rectangle({ point: [x, y], size: [w, h], radius: r })

/** A ring (stroked circle). */
export const ring = (cx, cy, r, w = W) =>
  circle(cx, cy, r + w / 2).subtract(circle(cx, cy, r - w / 2))

/**
 * A stroked arc with round caps, from angle `a0` to `a1` in degrees, clockwise
 * on screen (0° points right, 90° points down).
 */
export function arc(cx, cy, r, a0, a1, w = W) {
  const fan = [new Point(cx, cy)]
  for (let a = a0; a < a1; a += 5) fan.push(polar(cx, cy, r * 3, a))
  fan.push(polar(cx, cy, r * 3, a1))
  const wedge = new Path({ segments: fan, closed: true })
  return ring(cx, cy, r, w)
    .intersect(wedge)
    .unite(new Path.Circle({ center: polar(cx, cy, r, a0), radius: w / 2 }))
    .unite(new Path.Circle({ center: polar(cx, cy, r, a1), radius: w / 2 }))
}

/** End point of an arc, and its clockwise direction there (for arrowheads). */
export const arcEnd = (cx, cy, r, a) => ({ point: polar(cx, cy, r, a), angle: a + 90 })

/**
 * A polygon with rounded corners. `radius` is one number or one per corner.
 */
export function poly(points, radius = 0) {
  const pts = points.map((p) => new Point(p))
  const radii = Array.isArray(radius) ? radius : pts.map(() => radius)
  const path = new Path({ closed: true })
  pts.forEach((v, i) => {
    const r = radii[i]
    const prev = pts[(i - 1 + pts.length) % pts.length]
    const next = pts[(i + 1) % pts.length]
    if (!r) {
      path.add(v)
      return
    }
    const u1 = prev.subtract(v).normalize()
    const u2 = next.subtract(v).normalize()
    const half = Math.acos(Math.max(-1, Math.min(1, u1.dot(u2)))) / 2
    const t = r / Math.tan(half)
    const bisector = u1.add(u2).normalize()
    const center = v.add(bisector.multiply(r / Math.sin(half)))
    const through = center.subtract(bisector.multiply(r))
    const from = v.add(u1.multiply(t))
    const to = v.add(u2.multiply(t))
    if (path.segments.length === 0) path.moveTo(from)
    else path.lineTo(from)
    path.arcTo(through, to)
  })
  return path
}

/** A shape given as SVG path data. */
export const shape = (d) => new CompoundPath(d)

/** Union of shapes. */
export const union = (...items) => items.reduce((a, b) => a.unite(b))

/** `base` with every other shape cut out of it. */
export const cut = (base, ...holes) => holes.reduce((a, b) => a.subtract(b), base)

/** Copy of an item, rotated around the center of the grid. */
export const rotated = (item, angle) => item.clone().rotate(angle, new Point(12, 12))

/** Copy of an item, mirrored left ↔ right around the center of the grid. */
export const mirrored = (item) => item.clone().scale(-1, 1, new Point(12, 12))

/** Copy of an item, mirrored top ↔ bottom around the center of the grid. */
export const flipped = (item) => item.clone().scale(1, -1, new Point(12, 12))

/** Moves an item so its bounding box is centered on the grid. */
export function centered(item, axes = 'xy') {
  const c = item.bounds.center
  item.translate(new Point(axes.includes('x') ? 12 - c.x : 0, axes.includes('y') ? 12 - c.y : 0))
  return item
}

export const clear = () => paper.project.clear()

// Work in hundredths of a unit so relative coordinates never drift.
const q = (n) => Math.round(n * 100)
const num = (h) => {
  const s = (h / 100).toString().replace(/^(-?)0\./, '$1.')
  return s === '-0' ? '0' : s
}
/** Numbers joined the short way: no separator before a minus sign or a leading dot after a decimal. */
function join(values) {
  let out = ''
  let prev = ''
  for (const v of values.map(num)) {
    const needsSpace = out && !v.startsWith('-') && !(v.startsWith('.') && prev.includes('.'))
    out += (needsSpace ? ' ' : '') + v
    prev = v
  }
  return out
}

/**
 * Compact SVG path data: relative commands, two decimals (1/100 of a grid
 * unit), computed from rounded absolute points so the shape can't drift.
 */
export function toPathData(item) {
  const paths = item.children ? item.children : [item]
  let d = ''
  let cur = [0, 0]
  for (const path of paths) {
    const segs = path.segments
    const p0 = [q(segs[0].point.x), q(segs[0].point.y)]
    d += (d ? 'm' : 'M') + join(d ? [p0[0] - cur[0], p0[1] - cur[1]] : p0)
    cur = p0
    const start = p0
    const count = path.closed ? segs.length : segs.length - 1
    for (let i = 0; i < count; i++) {
      const a = segs[i]
      const b = segs[(i + 1) % segs.length]
      const end = [q(b.point.x), q(b.point.y)]
      const h1 = [q(a.point.x + a.handleOut.x), q(a.point.y + a.handleOut.y)]
      const h2 = [q(b.point.x + b.handleIn.x), q(b.point.y + b.handleIn.y)]
      const isLine = a.handleOut.isZero() && b.handleIn.isZero()
      const last = path.closed && i === count - 1
      if (isLine) {
        if (last) break // `z` draws the closing line
        const dx = end[0] - cur[0]
        const dy = end[1] - cur[1]
        if (dy === 0) d += 'h' + join([dx])
        else if (dx === 0) d += 'v' + join([dy])
        else d += 'l' + join([dx, dy])
      } else {
        d +=
          'c' +
          join([
            h1[0] - cur[0],
            h1[1] - cur[1],
            h2[0] - cur[0],
            h2[1] - cur[1],
            end[0] - cur[0],
            end[1] - cur[1],
          ])
      }
      cur = end
    }
    if (path.closed) {
      d += 'z'
      cur = start
    }
  }
  return d
}

export const bounds = (item) => item.bounds
