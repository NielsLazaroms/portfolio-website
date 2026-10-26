import {buildContourPaths, HERO_PEAKS} from './contour-map';

describe('buildContourPaths', () => {
  it('draws minor and major contour lines', () => {
    const {minor, major} = buildContourPaths(HERO_PEAKS, 10);
    expect(minor.startsWith('M')).toBeTrue();
    expect(major.startsWith('M')).toBeTrue();
  });

  it('keeps every point inside the 1600 x 800 viewBox', () => {
    const {minor, major} = buildContourPaths(HERO_PEAKS, 10);
    const numbers = (minor + major).match(/-?\d+(\.\d+)?/g)!.map(Number);
    numbers.forEach((n, i) => {
      const max = i % 2 === 0 ? 1600 : 800;
      expect(n).toBeGreaterThanOrEqual(0);
      expect(n).toBeLessThanOrEqual(max);
    });
  });

  it('has no major lines when there are fewer than five levels', () => {
    expect(buildContourPaths(HERO_PEAKS, 4).major).toBe('');
  });
});
