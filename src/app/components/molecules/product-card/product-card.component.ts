import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface ProductCardData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category?: string;
  rating?: number;
  featured?: boolean;
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductCardComponent {
  readonly product = input.required<ProductCardData>();
  readonly clicked = output<ProductCardData>();

  onCardClick(): void {
    this.clicked.emit(this.product());
  }
}
