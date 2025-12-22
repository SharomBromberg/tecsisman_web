import { Component } from '@angular/core';
import { MenuElement } from '../../../interfaces/menu';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  menuElements: MenuElement[] = [
    // { title: 'admin', route: '/Administrador' },
    { title: 'Inicio', route: '/Inicio' },
    { title: 'Productos', route: '/Productos' },

  ];
  isMenuOpen: boolean = false;
  currentPageClass: string = '';

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentPageClass = this.getPageClass(this.router.url);
      }
    });
  }

  ngOnInit() {

  }
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    console.log(this.isMenuOpen);
  }
  closeMenu(): void {

    this.isMenuOpen = false;
  }
  getPageClass(url: string): string {
    if (url === '/Inicio') {
      return 'homepage';
    } else if (url === '/Productos') {
      return 'productspage';
    }
    // Agrega más condiciones según sea necesario para otras páginas
    return '';
  }
}
