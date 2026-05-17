import { Component, inject } from '@angular/core';
import { MenuElement } from '../../../interfaces/menu';
import { Router, RouterLink, RouterLinkActive, NavigationEnd } from '@angular/router';
import { NgClass, AsyncPipe } from '@angular/common';
import { Observable, filter, map, startWith } from 'rxjs';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
    imports: [NgClass, RouterLink, RouterLinkActive, AsyncPipe]
})
export class NavbarComponent {
  private readonly router = inject(Router);

  readonly menuElements: readonly MenuElement[] = [
    { title: 'Inicio', route: '/Inicio' },
    { title: 'Servicios', route: '/Servicios' },
    { title: 'Productos', route: '/Productos' },
    { title: 'Contacto', route: '/Contacto' },
    { title: 'Blog', route: '/Blog' },
  ];
  isMenuOpen = false;

  readonly currentPageClass$: Observable<string> = this.router.events.pipe(
    filter((event): event is NavigationEnd => event instanceof NavigationEnd),
    map((event) => this.getPageClass(event.urlAfterRedirects)),
    startWith(this.getPageClass(this.router.url))
  );

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
  }

  private getPageClass(url: string): string {
    const pageClassByRoute: Record<string, string> = {
      '/Inicio': 'homepage',
      '/Servicios': 'servicespage',
      '/Productos': 'catalogpage',
      '/catalogo': 'catalogpage',
      '/Contacto': 'contactpage',
      '/Blog': 'blogpage',
      '/admin': 'adminpage',
    };

    // Buscar coincidencias exactas o por ruta principal
    for (const [route, pageClass] of Object.entries(pageClassByRoute)) {
      if (url === route || url.startsWith(`${route}/`)) {
        return pageClass;
      }
    }

    return '';
  }
}
