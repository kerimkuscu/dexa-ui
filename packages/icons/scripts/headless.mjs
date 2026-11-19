// paper.js looks for a browser `self`; without one it loads jsdom + canvas if
// they happen to be installed. Path maths needs neither: give it an empty one.
globalThis.self ??= { navigator: { userAgent: 'node' } }
