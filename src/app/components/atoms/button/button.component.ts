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
  readonly variant = input<'primary' | 'secondary' | 'success' | 'outline' | 'light' | 'dark' | 'danger'>('primary');
  readonly size = input<'xs' | 'sm' | 'md' | 'lg' | 'xl'>('md');
  readonly block = input(false);
  readonly disabled = input(false);
  readonly loading = input(false);
  readonly icon = input(false);

  readonly classes = computed(() => {
    const base: string[] = ['app-btn'];
    
    // Variant
    switch (this.variant()) {
      case 'primary': base.push('app-btn--primary'); break;
      case 'secondary': base.push('app-btn--secondary'); break;
      case 'success': base.push('app-btn--success'); break;
      case 'outline': base.push('app-btn--outline'); break;
      case 'light': base.push('app-btn--light'); break;
      case 'dark': base.push('app-btn--dark'); break;
      case 'danger': base.push('app-btn--danger'); break;
    }
    
    // Size
    switch (this.size()) {
      case 'xs': base.push('app-btn--xs'); break;
      case 'lg': base.push('app-btn--lg'); break;
      case 'xl': base.push('app-btn--xl'); break;
      case 'sm': base.push('app-btn--sm'); break;
    }
    
    // Modifiers
    if (this.block()) base.push('app-btn--block');
    if (this.loading()) base.push('app-btn--loading');
    if (this.icon()) base.push('app-btn--icon');
    if (this.customStyle()) base.push(this.customStyle());
    
    return base.join(' ');
  });
}

