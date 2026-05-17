import { Component, inject, DestroyRef } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { combineLatest, map, shareReplay } from 'rxjs';
import { Category } from '../../../../core/domain/catalog/category.model';
import { Product } from '../../../../core/domain/catalog/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

interface CategoryRowVm extends Category {
  productCount: number;
}

@Component({
    selector: 'app-categories-manager',
    templateUrl: './categories-manager.component.html',
    styleUrls: ['./categories-manager.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class CategoriesManagerComponent {
  private readonly productService = inject(ProductService);
  private readonly fb = inject(FormBuilder);
  private readonly destroyRef = inject(DestroyRef);

  readonly categoryForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
  });

  readonly categories$ = this.productService.getCategories().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly products$ = this.productService.getProducts().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly rows$ = combineLatest([this.categories$, this.products$]).pipe(
    map(([categories, products]) => this.toRows(categories, products)),
  );

  addCategory(): void {
    if (this.categoryForm.invalid) {
      this.categoryForm.markAllAsTouched();
      return;
    }

    this.productService.addCategory(this.categoryForm.getRawValue().name)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.categoryForm.reset({ name: '' });
        },
        error: (err) => {
          console.error('Failed to add category:', err);
        },
        complete: () => {
          // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
        }
      });
  }

  deleteCategory(id: string): void {
    this.productService.deleteCategory(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {},
        error: (err) => {
          console.error('Failed to delete category:', err);
        },
        complete: () => {
          // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
        }
      });
  }

  private toRows(categories: Category[], products: Product[]): CategoryRowVm[] {
    return categories.map((category) => ({
      ...category,
      productCount: products.filter((product) => product.categoryId === category.id).length,
    }));
  }
}