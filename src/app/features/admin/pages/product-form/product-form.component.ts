import { Component, inject, DestroyRef } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { shareReplay } from 'rxjs';
import { ProductService } from '../../../../core/services/product.service';
import { AsyncPipe } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-product-form',
    templateUrl: './product-form.component.html',
    styleUrls: ['./product-form.component.scss'],
    imports: [FormsModule, ReactiveFormsModule, AsyncPipe]
})
export class ProductFormComponent {
  private readonly fb = inject(FormBuilder);
  private readonly productService = inject(ProductService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories$ = this.productService.getCategories().pipe(
    shareReplay({ bufferSize: 1, refCount: true }),
  );

  readonly productForm = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    description: ['', [Validators.required, Validators.minLength(15)]],
    technicalDescription: ['', [Validators.required, Validators.minLength(20)]],
    price: [0, [Validators.required, Validators.min(1)]],
    stock: [0, [Validators.required, Validators.min(0)]],
    categoryId: ['', [Validators.required]],
    rating: [4.5, [Validators.required, Validators.min(0), Validators.max(5)]],
    images: ['', [Validators.required, Validators.minLength(5)]],
    featured: [false],
  });

  submitted = false;

  addProduct(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.productForm.markAllAsTouched();
      return;
    }

    const value = this.productForm.getRawValue();
    const images = value.images
      .split(/\n|,/) 
      .map((image) => image.trim())
      .filter(Boolean);

    this.productService.addProduct({
      name: value.name,
      description: value.description,
      technicalDescription: value.technicalDescription,
      price: value.price,
      stock: value.stock,
      categoryId: value.categoryId,
      rating: value.rating,
      images,
      featured: value.featured,
    })
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({
      next: () => {
        this.productForm.reset({
          name: '',
          description: '',
          technicalDescription: '',
          price: 0,
          stock: 0,
          categoryId: '',
          rating: 4.5,
          images: '',
          featured: false,
        });
        this.submitted = false;
      },
      error: (err: unknown) => {
        console.error('Failed to add product:', err);
      },
      complete: () => {
        // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
      }
    });
  }
}