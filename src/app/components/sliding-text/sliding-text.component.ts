import {ChangeDetectionStrategy, Component, computed, input} from '@angular/core';

/** One row of large words that slides endlessly. Decorative: the parent offers the words as plain text too. */
@Component({
  selector: 'app-sliding-text',
  templateUrl: './sliding-text.component.html',
  styleUrls: ['./sliding-text.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {'aria-hidden': 'true'},
})
export class SlidingTextComponent {
  readonly words = input<string[]>([]);
  readonly direction = input<'rtl' | 'ltr'>('rtl');
  readonly duration = input(40);
  /** Shift which words are outlined, so two rows don't line up. */
  readonly offset = input(0);
  /** Two copies, so the row can loop seamlessly. */
  protected readonly loop = computed(() => [...this.words(), ...this.words()]);
}
