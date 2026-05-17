import { Component, OnInit, inject, DestroyRef } from '@angular/core';
import { BehaviorSubject, shareReplay, switchMap } from 'rxjs';
import { Category } from 'src/app/interfaces/categories';
import { CategoriesService } from 'src/app/services/categories.service';
import { AsyncPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
    selector: 'app-categories-template',
    templateUrl: './categories-template.component.html',
    styleUrls: ['./categories-template.component.scss'],
    imports: [FormsModule, AsyncPipe]
})
export class CategoriesTemplateComponent implements OnInit {

  private readonly refreshSubject = new BehaviorSubject<void>(undefined);
  private readonly categoriesService = inject(CategoriesService);
  private readonly destroyRef = inject(DestroyRef);

  readonly categories$ = this.refreshSubject.pipe(
    switchMap(() => this.categoriesService.getAllCategories()),
    shareReplay({ bufferSize: 1, refCount: true }),
  );
  newCategory = { name: '' };

  ngOnInit(): void {
    this.refreshCategories();
  }

  private refreshCategories(): void {
    this.refreshSubject.next();
  }

  createCategory(newCategory: { name: string }): void {
    this.categoriesService.createCategory(newCategory as Category)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (createdCategory) => {
          this.newCategory = { name: '' };
          this.refreshCategories();
        },
        error: (err) => {
          console.error('Failed to create category:', err);
        },
        complete: () => {
          // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
        }
      });
  }
  updateCategory(updatedCategory: Category): void {
    if (updatedCategory.id) {
      this.categoriesService.updateCategory(updatedCategory.id, updatedCategory)
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe({
          next: () => {
            this.refreshCategories();
          },
          error: (err) => {
            console.error('Failed to update category:', err);
          },
          complete: () => {
            // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
          }
        });
    } else {
      console.error('Error: id is undefined');
    }
  }
  deleteCategory(id: string): void {
    this.categoriesService.deleteCategory(id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: () => {
          this.refreshCategories();
        },
        error: (err) => {
          console.error('Failed to delete category:', err);
        },
        complete: () => {
          // Lógica opcional a ejecutar cuando el flujo finaliza correctamente
        }
      });
  }
}
