#!/usr/bin/env node
// Generates every SVG under assets/ from scripts/data.mjs.
//
// Two files per asset — a light and a dark cut — because GitHub picks between
// them with <picture media="(prefers-color-scheme: dark)">. A single SVG using
// an internal prefers-color-scheme query does not work here: an SVG loaded
// through <img> resolves that against the operating system, not against the
// GitHub theme the reader actually chose.
//
// The two accent palettes are not a light/dark flip of each other. Each was
// checked against its own surface for the OKLCH lightness band, the chroma
// floor, colour-vision separation, and WCAG contrast, and these are the values
// that passed on both sides.
//
//   node scripts/build-assets.mjs            write assets/
//   node scripts/build-assets.mjs --check    exit 1 if assets/ is out of date

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  BLOCKS,
  CONSOLE,
  FEEDBACK_BUS,
  IDENTITY,
  RATINGS,
  REV,
  SPEEDUPS,
  SPEEDUP_AXIS_MAX,
} from "./data.mjs";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "assets");
const CHECK = process.argv.includes("--check");

// -- theme --------------------------------------------------------------------

const THEMES = {
  light: {
    ground: "#EDEFF1",
    panel: "#F7F8F9",
    ink: "#0B0D10",
    graphite: "#5A6169",
    faint: "#767D85",
    hairline: "#D2D6DB",
    grid: "#E2E5E9",
    tone: {
      thermal: "#E04A0F",
      cryo: "#0E8AA8",
      neural: "#6D4AC4",
      systems: "#2E7D52",
      interface: "#2563EB",
      amber: "#A76B00",
    },
  },
  dark: {
    ground: "#0A0D10",
    panel: "#101317",
    ink: "#E7E9EC",
    graphite: "#9AA1A9",
    faint: "#7D858E",
    hairline: "#262B31",
    grid: "#1B2026",
    tone: {
      thermal: "#E8571E",
      cryo: "#1E9CC2",
      neural: "#8A63E0",
      systems: "#37A85F",
      interface: "#3B82F6",
      amber: "#C08A1E",
    },
  },
};

const MONO =
  'ui-monospace,SFMono-Regular,"SF Mono",Menlo,Consolas,"Liberation Mono",monospace';
const SANS =
  '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';

// -- helpers ------------------------------------------------------------------

const AMP = /&/g;
const LT = /</g;
const GT = />/g;
const QUOT = /"/g;
const APOS = /'/g;

const esc = (value) =>
  String(value)
    .replace(AMP, "&amp;")
    .replace(LT, "&lt;")
    .replace(GT, "&gt;")
    .replace(QUOT, "&quot;")
    .replace(APOS, "&apos;");

/** attrs → ` k="v"`, dropping null/undefined so callers can pass conditionals. */
const attrs = (o) =>
  Object.entries(o)
    .filter(([, v]) => v !== null && v !== undefined && v !== false)
    .map(([k, v]) => ` ${k}="${esc(v)}"`)
    .join("");

const text = (content, o) => `<text${attrs(o)}>${esc(content)}</text>`;
const rect = (o) => `<rect${attrs(o)}/>`;
const line = (o) => `<line${attrs(o)}/>`;
const path = (o) => `<path${attrs(o)}/>`;

/** Rough mono advance width — only used to keep generated text inside its box. */
const monoW = (s, size) => s.length * size * 0.6;

function doc({ w, h, theme, body, extraCss = "" }) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}" role="img">
<style>
  .m{font-family:${MONO}}
  .s{font-family:${SANS}}
${extraCss}
</style>
${rect({
  x: 0.5,
  y: 0.5,
  width: w - 1,
  height: h - 1,
  rx: 9,
  fill: theme.ground,
  stroke: theme.hairline,
})}
${body}
</svg>
`;
}

/** Right-pointing connector: a hairline with a small solid head. */
function connector(x1, x2, y, colour) {
  const head = 6;
  return (
    line({ x1, y1: y, x2: x2 - head, y2: y, stroke: colour, "stroke-width": 1 }) +
    path({
      d: `M${x2},${y} L${x2 - head},${y - 3.5} L${x2 - head},${y + 3.5} Z`,
      fill: colour,
    })
  );
}

// -- 1. header ----------------------------------------------------------------

function header(t) {
  const W = 1000;
  const H = 300;
  const STRIP = 214;
  const parts = [];

  parts.push(rect({ x: 28, y: 22, width: 7, height: 7, fill: t.tone.thermal }));
  parts.push(
    text(`DATASHEET · ${IDENTITY.part}`, {
      x: 46,
      y: 29,
      class: "m",
      "font-size": 11,
      "letter-spacing": 1.4,
      fill: t.graphite,
    }),
  );
  parts.push(
    text(`REV ${REV}`, {
      x: W - 28,
      y: 29,
      class: "m",
      "font-size": 11,
      "letter-spacing": 1.4,
      fill: t.graphite,
      "text-anchor": "end",
    }),
  );
  parts.push(line({ x1: 0, y1: 46, x2: W, y2: 46, stroke: t.hairline, "stroke-width": 1 }));

  parts.push(
    text(IDENTITY.name.toUpperCase(), {
      x: 28,
      y: 112,
      class: "s",
      "font-size": 44,
      "font-weight": 700,
      "letter-spacing": 5,
      fill: t.ink,
    }),
  );
  parts.push(
    text(`${IDENTITY.role} — ${IDENTITY.domains}`, {
      x: 30,
      y: 146,
      class: "m",
      "font-size": 13.5,
      fill: t.graphite,
    }),
  );
  parts.push(
    text("Every figure on this page is measured, and names what it was measured against.", {
      x: 30,
      y: 170,
      class: "m",
      "font-size": 11.5,
      fill: t.faint,
    }),
  );

  parts.push(line({ x1: 648, y1: 62, x2: 648, y2: 194, stroke: t.hairline, "stroke-width": 1 }));
  const spec = [
    ["PART", IDENTITY.part, null],
    ["PACKAGE", IDENTITY.location, null],
    ["PROCESS", "FAST-NUCES · BS CS 2022–26", null],
    ["STATUS", IDENTITY.status, t.tone.systems],
  ];
  spec.forEach(([key, value, tone], i) => {
    const y = 86 + i * 24;
    parts.push(
      text(key, {
        x: 672,
        y,
        class: "m",
        "font-size": 10.5,
        "letter-spacing": 1.2,
        fill: t.faint,
      }),
    );
    if (tone) {
      parts.push(rect({ x: 766, y: y - 7, width: 7, height: 7, rx: 3.5, fill: tone }));
      parts.push(
        text(value, { x: 780, y, class: "m", "font-size": 11, fill: tone, "font-weight": 600 }),
      );
    } else {
      parts.push(text(value, { x: 766, y, class: "m", "font-size": 11, fill: t.ink }));
    }
  });

  parts.push(line({ x1: 0, y1: STRIP, x2: W, y2: STRIP, stroke: t.hairline, "stroke-width": 1 }));
  const cell = W / RATINGS.length;
  RATINGS.forEach((r, i) => {
    const x = i * cell + 28;
    if (i > 0) {
      parts.push(
        line({ x1: i * cell, y1: STRIP, x2: i * cell, y2: H, stroke: t.hairline, "stroke-width": 1 }),
      );
    }
    parts.push(
      text(r.value, {
        x,
        y: 254,
        class: "m",
        "font-size": 27,
        "font-weight": 600,
        fill: t.tone[r.tone],
      }),
    );
    parts.push(
      text(r.label, { x, y: 274, class: "m", "font-size": 10, "letter-spacing": 1.3, fill: t.graphite }),
    );
    parts.push(text(r.note, { x, y: 289, class: "m", "font-size": 10, fill: t.faint }));
  });

  return doc({ w: W, h: H, theme: t, body: parts.join("\n") });
}

// -- 2. speedup chart ---------------------------------------------------------

function speedup(t) {
  const W = 1000;
  const H = 384;
  const X0 = 360;
  const X1 = 956;
  const TOP = 108;
  const ROW = 46;
  const BAR = 20;
  const AXIS = 336;
  const sx = (v) => X0 + (v / SPEEDUP_AXIS_MAX) * (X1 - X0);
  const parts = [];

  parts.push(
    text("Measured speedup", {
      x: 28,
      y: 44,
      class: "s",
      "font-size": 19,
      "font-weight": 600,
      fill: t.ink,
    }),
  );
  parts.push(
    text("each result against the serial or FP32 baseline it replaced · 1.0× is the baseline", {
      x: 28,
      y: 67,
      class: "m",
      "font-size": 11.5,
      fill: t.faint,
    }),
  );

  for (let v = 0; v <= 6; v += 1) {
    parts.push(line({ x1: sx(v), y1: TOP - 6, x2: sx(v), y2: AXIS, stroke: t.grid, "stroke-width": 1 }));
    parts.push(
      text(`${v}×`, {
        x: sx(v),
        y: 354,
        class: "m",
        "font-size": 10.5,
        fill: t.faint,
        "text-anchor": "middle",
      }),
    );
  }
  parts.push(line({ x1: X0, y1: AXIS, x2: X1, y2: AXIS, stroke: t.hairline, "stroke-width": 1 }));
  parts.push(
    line({
      x1: sx(1),
      y1: TOP - 6,
      x2: sx(1),
      y2: AXIS,
      stroke: t.graphite,
      "stroke-width": 1,
      "stroke-dasharray": "3 3",
    }),
  );
  parts.push(
    text("baseline", { x: sx(1) + 7, y: TOP - 12, class: "m", "font-size": 10, fill: t.graphite }),
  );

  const bars = [];
  const labels = [];
  SPEEDUPS.forEach((d, i) => {
    const rowTop = TOP + i * ROW;
    const y = rowTop + 6;
    const w = sx(d.value) - X0;
    const r = 4;
    parts.push(text(d.name, { x: 28, y: rowTop + 16, class: "s", "font-size": 14, fill: t.ink }));
    parts.push(text(d.method, { x: 28, y: rowTop + 32, class: "m", "font-size": 10.5, fill: t.faint }));
    bars.push(
      path({
        d:
          `M${X0},${y} H${X0 + w - r} Q${X0 + w},${y} ${X0 + w},${y + r} ` +
          `V${y + BAR - r} Q${X0 + w},${y + BAR} ${X0 + w - r},${y + BAR} H${X0} Z`,
        fill: t.tone.thermal,
      }),
    );
    labels.push(
      text(`${d.value.toFixed(1)}×`, {
        x: X0 + w + 12,
        y: y + 15,
        class: "m",
        "font-size": 15,
        "font-weight": 600,
        fill: t.ink,
      }),
    );
  });

  parts.push(`<g class="bars">${bars.join("")}</g>`);
  parts.push(`<g class="vals">${labels.join("")}</g>`);

  // Static by default; motion only where the reader has not asked against it.
  const extraCss = `  @media (prefers-reduced-motion: no-preference){
    .bars{transform-origin:${X0}px 0;animation:grow .9s cubic-bezier(.2,.8,.2,1) both}
    .vals{animation:fade .5s ease-out .55s both}
    @keyframes grow{from{transform:scaleX(0)}to{transform:scaleX(1)}}
    @keyframes fade{from{opacity:0}to{opacity:1}}
  }`;

  return doc({ w: W, h: H, theme: t, body: parts.join("\n"), extraCss });
}

// -- 3. functional block diagram ----------------------------------------------

function blocks(t) {
  const W = 1000;
  const H = 492;
  const IN_X = 28;
  const IN_W = 240;
  const CORE_X = 300;
  const CORE_W = 360;
  const OUT_X = 700;
  const OUT_W = 272;
  const TOP = 118;
  const ROW = 78;
  const BH = 66;
  const parts = [];

  parts.push(
    text("Functional blocks", {
      x: 28,
      y: 44,
      class: "s",
      "font-size": 19,
      "font-weight": 600,
      fill: t.ink,
    }),
  );
  parts.push(
    text("what goes in, what comes back, and the loop that closes every one of them", {
      x: 28,
      y: 67,
      class: "m",
      "font-size": 11.5,
      fill: t.faint,
    }),
  );

  [
    ["INPUT", IN_X],
    ["CAPABILITY", CORE_X],
    ["RETURNS", OUT_X],
  ].forEach(([label, x]) => {
    parts.push(
      text(label, { x, y: 100, class: "m", "font-size": 10, "letter-spacing": 1.4, fill: t.faint }),
    );
  });

  BLOCKS.forEach((b, i) => {
    const y = TOP + i * ROW;
    const mid = y + BH / 2;
    const tone = t.tone[b.tone];

    parts.push(rect({ x: IN_X, y, width: IN_W, height: BH, rx: 6, fill: t.panel, stroke: t.hairline }));
    parts.push(text(b.input, { x: IN_X + 16, y: mid + 4, class: "m", "font-size": 11, fill: t.graphite }));

    parts.push(
      rect({ x: CORE_X, y, width: CORE_W, height: BH, rx: 6, fill: t.panel, stroke: t.hairline }),
    );
    parts.push(
      path({
        d:
          `M${CORE_X + 6},${y} H${CORE_X + 3.5} A3.5,3.5 0 0 0 ${CORE_X},${y + 6} ` +
          `V${y + BH - 6} A3.5,3.5 0 0 0 ${CORE_X + 3.5},${y + BH} H${CORE_X + 6} Z`,
        fill: tone,
      }),
    );
    parts.push(
      text(b.title, {
        x: CORE_X + 20,
        y: y + 28,
        class: "m",
        "font-size": 12.5,
        "font-weight": 600,
        "letter-spacing": 1.5,
        fill: tone,
      }),
    );
    parts.push(
      text(b.stack, { x: CORE_X + 20, y: y + 48, class: "m", "font-size": 10.5, fill: t.graphite }),
    );

    parts.push(
      rect({ x: OUT_X, y, width: OUT_W, height: BH, rx: 6, fill: t.panel, stroke: t.hairline }),
    );
    parts.push(text(b.output, { x: OUT_X + 16, y: mid + 4, class: "m", "font-size": 11, fill: t.ink }));

    parts.push(connector(IN_X + IN_W, CORE_X, mid, t.hairline));
    parts.push(connector(CORE_X + CORE_W, OUT_X, mid, tone));
  });

  // The feedback bus: a result routes back into the block that produced it.
  const busY = 446;
  const bottom = TOP + 3 * ROW + BH;
  const fromX = 836;
  const toX = 148;
  parts.push(
    path({
      d: `M${fromX},${bottom} V${busY} H${toX} V${bottom + 8}`,
      fill: "none",
      stroke: t.graphite,
      "stroke-width": 1,
      "stroke-dasharray": "4 4",
    }),
  );
  parts.push(
    path({
      d: `M${toX},${bottom} L${toX - 4},${bottom + 8} L${toX + 4},${bottom + 8} Z`,
      fill: t.graphite,
    }),
  );

  const label = `${FEEDBACK_BUS.label} — ${FEEDBACK_BUS.detail}`;
  const lw = monoW(label, 11) + 24;
  parts.push(rect({ x: 500 - lw / 2, y: busY - 11, width: lw, height: 22, fill: t.ground }));
  parts.push(
    text(label, {
      x: 500,
      y: busY + 4,
      class: "m",
      "font-size": 11,
      fill: t.graphite,
      "text-anchor": "middle",
    }),
  );

  return doc({ w: W, h: H, theme: t, body: parts.join("\n") });
}

// -- 4. console ---------------------------------------------------------------

function consolePanel(t) {
  const W = 1000;
  const LH = 21.5;
  const TOP = 70;
  const H = Math.round(TOP + CONSOLE.length * LH + 18);
  const parts = [];

  parts.push(line({ x1: 0, y1: 42, x2: W, y2: 42, stroke: t.hairline, "stroke-width": 1 }));
  parts.push(rect({ x: 28, y: 18, width: 7, height: 7, fill: t.tone.systems }));
  parts.push(text("umer@bench — sh", { x: 46, y: 25, class: "m", "font-size": 11, fill: t.graphite }));
  parts.push(
    text(IDENTITY.location, {
      x: W - 28,
      y: 25,
      class: "m",
      "font-size": 11,
      fill: t.faint,
      "text-anchor": "end",
    }),
  );

  CONSOLE.forEach((l, i) => {
    const y = TOP + i * LH;
    if (l.k === "cmd") {
      parts.push(text("$", { x: 28, y, class: "m", "font-size": 13, fill: t.tone.thermal }));
      parts.push(
        text(l.text, { x: 48, y, class: "m", "font-size": 13, fill: t.ink, "font-weight": 600 }),
      );
    } else if (l.k === "out") {
      parts.push(text(l.text, { x: 48, y, class: "m", "font-size": 13, fill: t.graphite }));
    } else if (l.k === "dim") {
      parts.push(text(l.text, { x: 28, y, class: "m", "font-size": 12.5, fill: t.faint }));
    } else if (l.k === "key") {
      parts.push(
        text(l.key, {
          x: 48,
          y,
          class: "m",
          "font-size": 13,
          fill: l.tone ? t.tone[l.tone] : t.graphite,
          "font-weight": 600,
        }),
      );
      parts.push(text(l.text, { x: 152, y, class: "m", "font-size": 13, fill: t.graphite }));
    } else if (l.k === "num") {
      parts.push(text(l.n, { x: 48, y, class: "m", "font-size": 13, fill: t.tone.thermal }));
      parts.push(text(l.text, { x: 72, y, class: "m", "font-size": 13, fill: t.graphite }));
    }
  });

  return doc({ w: W, h: H, theme: t, body: parts.join("\n") });
}

// -- write --------------------------------------------------------------------

const ASSETS = { header, speedup, blocks, console: consolePanel };

mkdirSync(OUT, { recursive: true });
let stale = 0;

for (const [name, build] of Object.entries(ASSETS)) {
  for (const [mode, theme] of Object.entries(THEMES)) {
    const file = join(OUT, `${name}-${mode}.svg`);
    const next = build(theme);
    if (CHECK) {
      let prev = null;
      try {
        prev = readFileSync(file, "utf8");
      } catch {
        // a missing file counts as stale
      }
      if (prev !== next) {
        stale += 1;
        console.error(`stale: assets/${name}-${mode}.svg`);
      }
    } else {
      writeFileSync(file, next, "utf8");
      console.log(`assets/${name}-${mode}.svg  ${next.length} bytes`);
    }
  }
}

if (CHECK) {
  if (stale > 0) {
    console.error(`\n${stale} asset(s) out of date — run: node scripts/build-assets.mjs`);
    process.exit(1);
  }
  console.log("assets/ is up to date with scripts/data.mjs");
}
