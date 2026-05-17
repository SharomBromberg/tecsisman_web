import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminShellComponent } from './pages/admin-shell/admin-shell.component';
import { CategoriesManagerComponent } from './pages/categories-manager/categories-manager.component';
import { ProductFormComponent } from './pages/product-form/product-form.component';

const routes: Routes = [
  {
    path: '',
    component: AdminShellComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'categorias' },
      { path: 'categorias', component: CategoriesManagerComponent },
      { path: 'productos', component: ProductFormComponent },
    ],
  },
  { path: '**', redirectTo: 'categorias' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}