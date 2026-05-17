import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminShellComponent } from './pages/admin-shell/admin-shell.component';
import { CategoriesManagerComponent } from './pages/categories-manager/categories-manager.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

@NgModule({
    imports: [CommonModule, AdminRoutingModule, AdminShellComponent, CategoriesManagerComponent, ProductFormComponent],
})
export class AdminModule {}