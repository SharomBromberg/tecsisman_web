import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { CategoriesService } from './categories.service';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllCategories should return seeded categories', async () => {
    const categories = await firstValueFrom(service.getAllCategories());

    expect(categories.length).toBeGreaterThan(0);
  });

  it('createCategory should persist and return a category', async () => {
    const created = await firstValueFrom(service.createCategory('Soporte avanzado'));
    const categories = await firstValueFrom(service.getAllCategories());

    expect(created.id).toBeDefined();
    expect(categories.some((category) => category.id === created.id)).toBeTrue();
  });
});
