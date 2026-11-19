// The icon set. Every icon is drawn here on a 24 × 24 grid (see geometry.mjs)
// and generated into src/icons.ts and svg/*.svg by `pnpm draw`.
//
// Style: solid. Line glyphs use the W stroke (1/8 of the icon) with round caps
// and joins; shapes are filled with rounded corners; details inside a shape
// are knocked out with the K stroke. Bounding boxes are centered on the grid
// unless `center` says otherwise.
//
// `rtl: true` marks icons that point along the reading direction; they are
// mirrored in right-to-left layouts.
import {
  GAP,
  K,
  W,
  arc,
  arcEnd,
  circle,
  cut,
  line,
  mirrored,
  poly,
  rect,
  ring,
  rotated,
  shape,
  union,
} from './geometry.mjs'

// ─── Building blocks ────────────────────────────────────────────────────────

const chevronDown = () => line([[4, 8], [12, 16], [20, 8]])
const chevronsLeft = () =>
  union(
    line([[12, 6], [6, 12], [12, 18]]),
    line([[18.5, 6], [12.5, 12], [18.5, 18]]),
  )
const arrowRight = () =>
  union(
    line([[3.75, 12], [19.75, 12]]),
    line([[13.25, 5.5], [19.75, 12], [13.25, 18.5]]),
  )
const caretDown = () => poly([[2.5, 7], [21.5, 7], [12, 17.5]], [1.5, 1.5, 1.75])
const ellipsis = () => union(circle(4.5, 12, 2.5), circle(12, 12, 2.5), circle(19.5, 12, 2.5))
const lens = () => union(ring(10, 10, 6.75), line([[15.25, 15.25], [20.75, 20.75]]))
/** The tray of upload / download, with a gap around the arrow. */
const tray = (arrowLines) => cut(rect(2, 14, 20, 8, 2.25), ...arrowLines(W + 2 * GAP))

/** Arrowhead at the end of an arc, pointing along it (clockwise). */
function arcArrow(cx, cy, r, a) {
  const { point, angle } = arcEnd(cx, cy, r, a)
  const head = poly([[0, -5.25], [6, 0], [0, 5.25]], [0.75, 1, 0.75])
  head.rotate(angle, [0, 0])
  head.translate(point)
  return head
}
const rotateRight = () => union(arc(12, 12, 8.5, 25, 295), arcArrow(12, 12, 8.5, 295))

const disc = () => circle(12, 12, 11)
const eyeShape = () =>
  shape(
    'M12 4.5c4.7 0 8.4 3 10.5 6.4a2.1 2.1 0 0 1 0 2.2C20.4 16.5 16.7 19.5 12 19.5S3.6 16.5 1.5 13.1a2.1 2.1 0 0 1 0-2.2C3.6 7.5 7.3 4.5 12 4.5z',
  )
const eye = () => union(cut(eyeShape(), circle(12, 12, 5.25)), circle(12, 12, 3))

// ─── Icons ──────────────────────────────────────────────────────────────────

/**
 * `group` starts a section of the gallery; the icons after it belong to it.
 * @type {{ name: string, group?: string, rtl?: boolean, center?: string | false, draw: () => any }[]} */
export const drawings = [
  // Direction
  { group: 'Direction', name: 'chevron-down', draw: chevronDown },
  { name: 'chevron-up', draw: () => rotated(chevronDown(), 180) },
  { name: 'chevron-left', rtl: true, draw: () => rotated(chevronDown(), 90) },
  { name: 'chevron-right', rtl: true, draw: () => rotated(chevronDown(), -90) },
  { name: 'chevrons-left', rtl: true, draw: chevronsLeft },
  { name: 'chevrons-right', rtl: true, draw: () => mirrored(chevronsLeft()) },
  { name: 'arrow-right', rtl: true, draw: arrowRight },
  { name: 'arrow-left', rtl: true, draw: () => mirrored(arrowRight()) },
  { name: 'arrow-up', draw: () => rotated(arrowRight(), -90) },
  { name: 'arrow-down', draw: () => rotated(arrowRight(), 90) },
  { name: 'caret-down', draw: caretDown },
  { name: 'caret-up', draw: () => rotated(caretDown(), 180) },
  { name: 'caret-left', rtl: true, draw: () => rotated(caretDown(), 90) },
  { name: 'caret-right', rtl: true, draw: () => rotated(caretDown(), -90) },

  // Actions
  {
    group: 'Actions',
    name: 'x',
    draw: () => union(line([[5.5, 5.5], [18.5, 18.5]]), line([[18.5, 5.5], [5.5, 18.5]])),
  },
  {
    name: 'plus',
    draw: () => union(line([[12, 3.5], [12, 20.5]]), line([[3.5, 12], [20.5, 12]])),
  },
  { name: 'minus', draw: () => line([[3.5, 12], [20.5, 12]]) },
  { name: 'check', draw: () => line([[3.5, 12.5], [9, 18], [20.5, 6.5]]) },
  { name: 'search', draw: lens },
  {
    name: 'copy',
    draw: () => {
      const front = rect(9, 2, 13, 15, 2.25)
      const back = cut(
        rect(2, 7, 13, 15, 2.25),
        rect(4.5, 9.5, 8, 10, 0.75),
        rect(9 - GAP, 2 - GAP, 13 + 2 * GAP, 15 + 2 * GAP, 2.25 + GAP),
      )
      return union(front, back)
    },
  },
  {
    name: 'pencil',
    draw: () => {
      // Drawn lying down, tip to the left, then turned 45°.
      const tip = poly([[-0.5, 12], [6, 8], [6, 16]], [0.75, 0, 0])
      const body = rect(6, 8, 11, 8)
      const eraser = rect(18.5, 8, 6, 8, 2)
      return union(tip, body, eraser).rotate(-45, [12, 12])
    },
  },
  {
    name: 'trash',
    draw: () =>
      union(
        rect(9, 1.75, 6, 4, 1),
        rect(2.5, 4, 19, 3.25, 1.25),
        poly([[4.25, 8.75], [19.75, 8.75], [18.5, 22.25], [5.5, 22.25]], [0.5, 0.5, 2, 2]),
      ),
  },
  {
    name: 'upload',
    draw: () => {
      const arrow = (w) => [line([[12, 15.75], [12, 3.75]], w), line([[6.75, 9], [12, 3.75], [17.25, 9]], w)]
      return union(tray(arrow), ...arrow(W))
    },
  },
  {
    name: 'download',
    draw: () => {
      const arrow = (w) => [line([[12, 2.25], [12, 14.75]], w), line([[6.75, 9.5], [12, 14.75], [17.25, 9.5]], w)]
      return union(tray(arrow), ...arrow(W))
    },
  },
  { name: 'rotate-right', draw: rotateRight },
  { name: 'rotate-left', draw: () => mirrored(rotateRight()) },
  {
    name: 'external-link',
    draw: () =>
      union(
        line([[10, 4.5], [4.5, 4.5], [4.5, 19.5], [19.5, 19.5], [19.5, 14]]),
        line([[11, 13], [20, 4]]),
        line([[13.5, 4], [20, 4], [20, 10.5]]),
      ),
  },

  // Menus and lists
  {
    group: 'Menus and lists',
    name: 'menu',
    draw: () =>
      union(line([[3.5, 5.5], [20.5, 5.5]]), line([[3.5, 12], [20.5, 12]]), line([[3.5, 18.5], [20.5, 18.5]])),
  },
  { name: 'ellipsis', draw: ellipsis },
  { name: 'ellipsis-vertical', draw: () => rotated(ellipsis(), 90) },
  {
    name: 'filter',
    draw: () =>
      poly(
        [[1, 2.5], [23, 2.5], [15, 12], [15, 21.75], [9, 18.5], [9, 12]],
        [1.5, 1.5, 0.75, 1, 1, 0.75],
      ),
  },
  {
    name: 'sort',
    draw: () =>
      union(
        poly([[3.25, 10.25], [20.75, 10.25], [12, 1]], [1.5, 1.5, 1.5]),
        poly([[3.25, 13.75], [20.75, 13.75], [12, 23]], [1.5, 1.5, 1.5]),
      ),
  },
  {
    name: 'grip-vertical',
    draw: () =>
      union(
        ...[5, 12, 19].flatMap((y) => [circle(8.5, y, 2.25), circle(15.5, y, 2.25)]),
      ),
  },

  // Status
  {
    group: 'Status',
    name: 'circle-info',
    draw: () => cut(disc(), circle(12, 7.25, 1.6), line([[12, 11], [12, 17.25]], K)),
  },
  {
    name: 'circle-check',
    draw: () => cut(disc(), line([[7.25, 12.25], [10.5, 15.5], [16.75, 9.25]], K)),
  },
  {
    name: 'circle-x',
    draw: () => cut(disc(), line([[8.5, 8.5], [15.5, 15.5]], K), line([[15.5, 8.5], [8.5, 15.5]], K)),
  },
  {
    name: 'circle-question',
    draw: () =>
      cut(disc(), arc(12, 9.5, 3, 180, 450, K), line([[12, 12.5], [12, 13.75]], K), circle(12, 17.5, 1.6)),
  },
  {
    name: 'triangle-alert',
    draw: () =>
      cut(
        poly([[12, -0.25], [24.5, 21.75], [-0.5, 21.75]], 2.5),
        line([[12, 9], [12, 13.75]], K),
        circle(12, 17.5, 1.6),
      ),
  },
  { name: 'spinner', draw: () => arc(12, 12, 9, -90, 180) },

  // Forms
  { group: 'Forms', name: 'eye', draw: eye },
  {
    name: 'eye-off',
    draw: () =>
      union(cut(eye(), line([[3.5, 3.5], [20.5, 20.5]], W + 2 * GAP)), line([[3.5, 3.5], [20.5, 20.5]])),
  },
  {
    name: 'calendar',
    draw: () =>
      union(
        cut(rect(2.5, 4.25, 19, 18, 2.5), rect(2, 9, 20, 1.75)),
        line([[7.5, 2.25], [7.5, 6]]),
        line([[16.5, 2.25], [16.5, 6]]),
      ),
  },
  {
    name: 'clock',
    draw: () => cut(disc(), line([[12, 6.25], [12, 12], [15.5, 15.5]], K)),
  },
  {
    name: 'star',
    draw: () => {
      const points = []
      for (let i = 0; i < 10; i++) {
        const r = i % 2 ? 6.5 : 13
        const a = ((-90 + i * 36) * Math.PI) / 180
        points.push([12 + r * Math.cos(a), 12 + r * Math.sin(a)])
      }
      return poly(points, points.map((_, i) => (i % 2 ? 0.75 : 1.5)))
    },
  },
  {
    name: 'image',
    draw: () =>
      union(
        cut(rect(1.5, 3, 21, 18, 2.75), rect(4, 5.5, 16, 13, 0.75)),
        circle(8.75, 9.75, 1.9),
        poly([[4, 18.5], [10.25, 12], [13.75, 15.5], [16, 13.25], [20, 18.5]], [0, 1, 0.75, 1, 0]),
      ),
  },
  {
    name: 'file',
    draw: () =>
      union(
        rect(3.5, 1.5, 9.5, 21, 2.25),
        rect(3.5, 8.5, 17, 14, 2.25),
        poly([[14.5, 1.75], [20.25, 7], [14.5, 7]], [0.75, 0.75, 0.5]),
      ),
  },
  {
    name: 'folder',
    draw: () =>
      union(
        poly([[1.5, 2.75], [9.5, 2.75], [12, 5.5], [12, 9], [1.5, 9]], [2, 1, 0, 0, 0]),
        rect(1.5, 5.5, 21, 15.75, 2.5),
      ),
  },

  // Image preview and theme
  {
    group: 'Media and theme',
    name: 'zoom-in',
    draw: () => union(lens(), line([[10, 7], [10, 13]], K), line([[7, 10], [13, 10]], K)),
  },
  { name: 'zoom-out', draw: () => union(lens(), line([[7, 10], [13, 10]], K)) },
  {
    name: 'sun',
    draw: () => {
      const rays = []
      for (let a = 0; a < 360; a += 45) {
        const r = (n) => [12 + n * Math.cos((a * Math.PI) / 180), 12 + n * Math.sin((a * Math.PI) / 180)]
        rays.push(line([r(8), r(10)], 2.75))
      }
      return union(circle(12, 12, 4.75), ...rays)
    },
  },
  { name: 'moon', draw: () => cut(circle(11, 12.5, 10), circle(17.5, 7, 8.25)) },
  {
    name: 'user',
    draw: () =>
      union(
        circle(12, 6.75, 5),
        shape('M2.75 20.5C2.75 16.9 5.65 14 9.25 14h5.5c3.6 0 6.5 2.9 6.5 6.5v.5a1.5 1.5 0 0 1-1.5 1.5H4.25a1.5 1.5 0 0 1-1.5-1.5z'),
      ),
  },
]
