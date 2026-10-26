import {ChangeDetectionStrategy, Component} from '@angular/core';
import {scrollBehavior} from '../../utils/motion';

interface MapPoint {
  x: number;
  y: number;
  label?: string;
  year?: string;
  /** Where the label sits, relative to the point. */
  side?: 'right' | 'left' | 'above';
  isNow?: boolean;
}

interface MapRoute {
  points: MapPoint[];
  d: string;
}

/** A smooth line through all points (Catmull-Rom turned into cubic curves). */
function smoothPath(points: MapPoint[]): string {
  let d = `M${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[Math.max(0, i - 1)], p1 = points[i], p2 = points[i + 1], p3 = points[Math.min(points.length - 1, i + 2)];
    const c1x = p1.x + (p2.x - p0.x) / 6, c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6, c2y = p2.y - (p3.y - p1.y) / 6;
    d += `C${c1x.toFixed(1)} ${c1y.toFixed(1)} ${c2x.toFixed(1)} ${c2y.toFixed(1)} ${p2.x} ${p2.y}`;
  }
  return d;
}

const route = (points: MapPoint[]): MapRoute => ({points, d: smoothPath(points)});

/**
 * The hero: name and intro, with my route drawn on the contour map behind it.
 * Both maps use the same viewBox and right-aligned slicing as the hero's contour lamp,
 * so the route always ends on the map's highest peak: Essent, where I am now.
 */
@Component({
  selector: 'app-top-view',
  templateUrl: './top-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './top-view.component.scss'
})
export class TopViewComponent {
  /** Landscape screens: the route climbs on the right, next to the intro. */
  protected readonly wide = route([
    {x: 1010, y: 690, label: 'Fontys', year: '2021', side: 'right'},
    {x: 1075, y: 605, label: 'ASML internship', year: '2024', side: 'right'},
    {x: 1125, y: 525, label: 'ASML part-time', year: '2024', side: 'right'},
    {x: 1190, y: 450, label: 'Social Deal', year: '2025', side: 'right'},
    {x: 1225, y: 350, label: 'Graduated', year: '2026', side: 'right'},
    {x: 1296, y: 224, label: 'Essent', year: 'Now', side: 'left', isNow: true},
  ]);

  /** Portrait screens only show the right edge of the map; the route climbs to the same peak from the right. */
  protected readonly narrow = route([
    {x: 1480, y: 400, label: 'Fontys, 2021', side: 'left'},
    {x: 1425, y: 362},
    {x: 1445, y: 323},
    {x: 1385, y: 293},
    {x: 1360, y: 260},
    {x: 1296, y: 224, label: 'Essent, now', side: 'right', isNow: true},
  ]);

  protected go(sectionId: string, event: Event): void {
    event.preventDefault();
    const section = document.getElementById(sectionId);
    if (!section) return;
    section.scrollIntoView({behavior: scrollBehavior(), block: 'start'});
    section.setAttribute('tabindex', '-1');
    section.focus({preventScroll: true});
  }
}
