import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-admin-shell',
    templateUrl: './admin-shell.component.html',
    styleUrls: ['./admin-shell.component.scss'],
    imports: [RouterLink, RouterLinkActive, RouterOutlet]
})
export class AdminShellComponent {}