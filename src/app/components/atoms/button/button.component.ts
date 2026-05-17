import { ChangeDetectionStrategy, Component, input, computed } from '@angular/core';

@Component({
    selector: 'app-button',
    templateUrl: './button.component.html',
    styleUrls: ['./button.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {

  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly customStyle = input('');
  readonly variant = input<'primary' | 'outline' | 'light' | 'dark'>('primary');
  readonly size = input<'sm' | 'md' | 'lg'>('md');
  readonly block = input(false);
  readonly disabled = input(false);

  readonly classes = computed(() => {
    const base: string[] = ['app-btn'];
    switch (this.variant()) {
      case 'primary': base.push('app-btn--primary'); break;
      case 'outline': base.push('app-btn--outline'); break;
      case 'light': base.push('app-btn--light'); break;
      case 'dark': base.push('app-btn--dark'); break;
    }
    switch (this.size()) {
      case 'lg': base.push('app-btn--lg'); break;
      case 'sm': base.push('app-btn--sm'); break;
    }
    if (this.block()) base.push('app-btn--block');
    if (this.customStyle()) base.push(this.customStyle());
    return base.join(' ');
  });
}
