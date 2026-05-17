import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicRoutingModule } from './public-routing.module';
import { CatalogPageComponent } from './pages/catalog-page/catalog-page.component';
import { ProductDetailPageComponent } from './pages/product-detail-page/product-detail-page.component';

@NgModule({
    imports: [CommonModule, PublicRoutingModule, CatalogPageComponent, ProductDetailPageComponent],
})
export class PublicModule {}