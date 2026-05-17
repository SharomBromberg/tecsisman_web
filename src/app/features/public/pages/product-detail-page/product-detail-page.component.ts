import { ChangeDetectionStrategy, Component, DestroyRef, OnInit, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { filter, map, shareReplay, startWith, switchMap, tap } from 'rxjs';
import { Category } from '../../../../core/domain/catalog/category.model';
import { Product } from '../../../../core/domain/catalog/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { RatingStarsPipe } from '../../../../core/pipes/rating-stars.pipe';

interface DetailVm {
  product: Product;
  categoryName: string;
}

@Component({
    selector: 'app-product-detail-page',
    templateUrl: './product-detail-page.component.html',
    styleUrls: ['./product-detail-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        AsyncPipe,
        CurrencyPipe,
        DatePipe,
        RatingStarsPipe,
    ],
})
export class ProductDetailPageComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  selectedImageIndex = 0;
  readonly whatsappNumber = '573000000000'; // Número de prueba para WhatsApp

  readonly categories$ = this.productService.getCategories().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly product$ = this.route.paramMap.pipe(
    map((params) => params.get('id')),
    filter((id): id is string => Boolean(id)),
    switchMap((id) => this.productService.getProductById(id)),
    filter((product): product is Product => Boolean(product)),
    tap(() => {
      this.selectedImageIndex = 0;
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly viewModel$ = this.product$.pipe(
    switchMap((product) =>
      this.categories$.pipe(
        map((categories) => ({
          product,
          categoryName: categories.find((category) => category.id === product.categoryId)?.name ?? 'Sin categoria',
        })),
      ),
    ),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly commentForm = this.fb.nonNullable.group({
    author: ['', [Validators.required, Validators.minLength(2)]],
    rating: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
    message: ['', [Validators.required, Validators.minLength(10)]],
  });

  ngOnInit(): void {}

  openWhatsApp(productName: string): void {
    const message = `Hola, me interesa el producto ${productName}`;
    const url = `https://wa.me/${this.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  }

  selectImage(index: number): void {
    this.selectedImageIndex = index;
  }

  submitComment(product: Product): void {
    if (this.commentForm.invalid) {
      this.commentForm.markAllAsTouched();
      return;
    }

    this.productService
      .addComment(product.id, this.commentForm.getRawValue())
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.commentForm.reset({ author: '', rating: 5, message: '' });
        },
        error: (err) => {
          console.error('Failed to add comment:', err);
        },
        complete: () => {
          // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
        }
      });
  }

  trackByComment(index: number): number {
    return index;
  }
}