import { TestBed } from '@angular/core/testing';
import { firstValueFrom } from 'rxjs';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
    });
    service = TestBed.inject(ProductService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getAllProducts should return seeded products', async () => {
    const products = await firstValueFrom(service.getAllProducts());

    expect(products.length).toBeGreaterThan(0);
  });

  it('getAllCategories should return seeded categories', async () => {
    const categories = await firstValueFrom(service.getAllCategories());

    expect(categories.length).toBeGreaterThan(0);
  });

  it('filters products by category', async () => {
    const categories = await firstValueFrom(service.getAllCategories());
    const category = categories[0];
    const products = await firstValueFrom(service.getAllProducts(category.id));

    expect(products.length).toBeGreaterThan(0);
    expect(products.every((product) => product.categoryId === category.id)).toBeTrue();
  });

  it('createCategory should persist a new category', async () => {
    const created = await firstValueFrom(service.createCategory({ name: 'Nube' }));
    const categories = await firstValueFrom(service.getAllCategories());

    expect(created.id).toBeDefined();
    expect(categories.some((category) => category.id === created.id)).toBeTrue();
  });
});
