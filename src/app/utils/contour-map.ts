/** A hill on the height map: x (0 to 2), y (0 to 1), height and spread. */
export type Peak = [x: number, y: number, height: number, spread: number];

export interface ContourPaths {
  /** Regular contour lines. */
  minor: string;
  /** Every fifth line, drawn thicker like on a real map. */
  major: string;
}

const COLUMNS = 160;
const ROWS = 80;
const CELL = 10; // the SVG viewBox is 1600 x 800

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Builds topographic contour lines for a height map made of a few peaks,
 * using marching squares. The result fits an SVG with viewBox "0 0 1600 800".
 */
export function buildContourPaths(peaks: Peak[], levels = 24): ContourPaths {
  const height = (x: number, y: number) => {
    let v = 0;
    for (const [px, py, a, s] of peaks) {
      v += a * Math.exp(-((x - px) ** 2 + (y - py) ** 2) / (2 * s * s));
    }
    return v + 0.12 * Math.sin(x * 4.3 + 1.1) * Math.cos(y * 5.1) + 0.05 * Math.sin(x * 11 + y * 7.3);
  };

  const grid: number[][] = [];
  let lo = Infinity;
  let hi = -Infinity;
  for (let j = 0; j <= ROWS; j++) {
    grid[j] = [];
    for (let i = 0; i <= COLUMNS; i++) {
      const v = height((i / COLUMNS) * 2, j / ROWS);
      grid[j][i] = v;
      lo = Math.min(lo, v);
      hi = Math.max(hi, v);
    }
  }

  const step = (hi - lo) / (levels + 1);
  let minor = '';
  let major = '';

  for (let k = 1; k <= levels; k++) {
    const level = lo + k * step;
    let d = '';
    for (let j = 0; j < ROWS; j++) {
      for (let i = 0; i < COLUMNS; i++) {
        const a = grid[j][i], b = grid[j][i + 1], c = grid[j + 1][i + 1], e = grid[j + 1][i];
        const index = (a > level ? 8 : 0) | (b > level ? 4 : 0) | (c > level ? 2 : 0) | (e > level ? 1 : 0);
        if (index === 0 || index === 15) continue;

        const top = (): [number, number] => [i + (level - a) / (b - a), j];
        const right = (): [number, number] => [i + 1, j + (level - b) / (c - b)];
        const bottom = (): [number, number] => [i + (level - e) / (c - e), j + 1];
        const left = (): [number, number] => [i, j + (level - a) / (e - a)];
        const segments: Record<number, [() => [number, number], () => [number, number]][]> = {
          1: [[left, bottom]], 2: [[bottom, right]], 3: [[left, right]], 4: [[top, right]],
          5: [[top, right], [left, bottom]], 6: [[top, bottom]], 7: [[top, left]], 8: [[top, left]],
          9: [[top, bottom]], 10: [[top, left], [bottom, right]], 11: [[top, right]], 12: [[left, right]],
          13: [[bottom, right]], 14: [[left, bottom]],
        };
        for (const [from, to] of segments[index]) {
          const p = from();
          const q = to();
          d += `M${round(p[0] * CELL)} ${round(p[1] * CELL)}L${round(q[0] * CELL)} ${round(q[1] * CELL)}`;
        }
      }
    }
    if (k % 5 === 0) {
      major += d;
    } else {
      minor += d;
    }
  }
  return {minor, major};
}

export const HERO_PEAKS: Peak[] = [[0.30, 0.78, 1.0, 0.20], [1.62, 0.28, 0.95, 0.22], [1.05, 0.95, 0.55, 0.14], [0.95, 0.42, 0.45, 0.32], [1.95, 0.9, 0.5, 0.16]];
export const CONTACT_PEAKS: Peak[] = [[1.55, 0.6, 1.0, 0.24], [0.35, 0.25, 0.7, 0.18], [0.9, 0.95, 0.5, 0.2]];
