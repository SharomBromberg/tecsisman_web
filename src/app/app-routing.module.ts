import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'Inicio', pathMatch: 'full' },
  { path: 'Inicio', loadChildren: () => import('./components/pages/home/home.module').then((module) => module.HomeModule) },
  { path: 'Blog', loadChildren: () => import('./components/pages/blog/blog.module').then((module) => module.BlogModule) },
  { path: 'Contacto', loadChildren: () => import('./components/pages/contact/contact.module').then((module) => module.ContactModule) },
  { path: 'Servicios', loadChildren: () => import('./components/pages/services/services.module').then((module) => module.ServicesModule) },
  { path: 'Usuario', loadChildren: () => import('./components/pages/user/user.module').then((module) => module.UserModule) },
  { path: 'Productos/:id', loadComponent: () => import('./features/public/pages/product-detail-page/product-detail-page.component').then((c) => c.ProductDetailPageComponent) },
  { path: 'Productos', loadChildren: () => import('./features/public/public.module').then((module) => module.PublicModule) },
  { path: 'catalogo', redirectTo: 'Productos', pathMatch: 'full' },
  { path: 'admin', loadChildren: () => import('./features/admin/admin.module').then((module) => module.AdminModule) },
  { path: '**', redirectTo: 'Inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
