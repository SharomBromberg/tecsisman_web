import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from '../domain/catalog/category.model';
import { ProductService } from './product.service';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly productService = inject(ProductService);

  getAllCategories(): Observable<Category[]> {
    return this.productService.getCategories();
  }

  createCategory(name: string): Observable<Category> {
    return this.productService.addCategory(name);
  }

  updateCategory(categoryId: string, category: Category): Observable<Category> {
    return this.productService.updateCategory(categoryId, category);
  }

  deleteCategory(id: string): Observable<void> {
    return this.productService.deleteCategory(id);
  }
}