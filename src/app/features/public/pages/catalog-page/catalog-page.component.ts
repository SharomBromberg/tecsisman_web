import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BehaviorSubject, combineLatest, debounceTime, distinctUntilChanged, map, shareReplay, startWith, switchMap } from 'rxjs';
import { Category } from '../../../../core/domain/catalog/category.model';
import { Product } from '../../../../core/domain/catalog/product.model';
import { ProductService } from '../../../../core/services/product.service';
import { NgFor, NgIf, AsyncPipe, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

interface CatalogCardVm {
  product: Product;
  categoryName: string;
}

@Component({
    selector: 'app-catalog-page',
    templateUrl: './catalog-page.component.html',
    styleUrls: ['./catalog-page.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgFor,
        RouterLink,
        NgIf,
        AsyncPipe,
        CurrencyPipe,
    ],
})
export class CatalogPageComponent {
  private readonly productService = inject(ProductService);

  readonly categoryControl = new FormControl<string>('', { nonNullable: true });
  readonly searchControl = new FormControl<string>('', { nonNullable: true });
  readonly activeSubcategory = new BehaviorSubject<string>('');

  readonly categories$ = this.productService.getCategories().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly selectedCategory$ = this.categoryControl.valueChanges.pipe(
    startWith(this.categoryControl.value),
    distinctUntilChanged(),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly filteredProducts$ = combineLatest([
    this.searchControl.valueChanges.pipe(startWith(''), debounceTime(300)),
    this.selectedCategory$,
    this.activeSubcategory
  ]).pipe(
    switchMap(([query, categoryId, subcategory]) => {
      const base$ = query ? this.productService.searchProducts(query) : this.productService.getProducts();
      return base$.pipe(
        map((products: Product[]) => products.filter((product: Product) => {
          if (categoryId && product.categoryId !== categoryId) return false;
          if (subcategory) {
            const hasTag = product.tags?.some(t => t.toLowerCase() === subcategory.toLowerCase());
            const inName = product.name.toLowerCase().includes(subcategory.toLowerCase());
            return hasTag || inName;
          }
          return true;
        }))
      );
    }),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly featuredProducts$ = this.productService.getFeaturedProducts().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly cards$ = combineLatest([this.filteredProducts$, this.categories$]).pipe(
    map(([products, categories]) => this.toCardViewModel(products, categories)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly featuredCards$ = combineLatest([this.featuredProducts$, this.categories$]).pipe(
    map(([products, categories]) => this.toCardViewModel(products, categories)),
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly emptyMessage$ = combineLatest([this.filteredProducts$, this.selectedCategory$]).pipe(
    map(([products, categoryId]) => {
      if (products.length > 0) {
        return '';
      }

      return categoryId
        ? 'No hay productos en esta categoría.'
        : 'Aun no hay productos disponibles.';
    }),
  );

  selectCategory(categoryId: string): void {
    if (this.categoryControl.value === categoryId && !this.activeSubcategory.value) {
      this.categoryControl.setValue('');
    } else {
      this.categoryControl.setValue(categoryId);
      this.activeSubcategory.next('');
    }
  }

  selectSubcategory(categoryId: string, subcategory: string, event: Event): void {
    event.stopPropagation();
    this.categoryControl.setValue(categoryId);
    this.activeSubcategory.next(subcategory);
  }

  trackByCategoryId(index: number, category: Category): string {
    return category.id ?? `${index}`;
  }

  trackByProductId(index: number, item: CatalogCardVm): string {
    return item.product.id ?? `${index}`;
  }

  private toCardViewModel(products: Product[], categories: Category[]): CatalogCardVm[] {
    return products.map((product) => ({
      product,
      categoryName: categories.find((category) => category.id === product.categoryId)?.name ?? 'Sin categoria',
    }));
  }
}