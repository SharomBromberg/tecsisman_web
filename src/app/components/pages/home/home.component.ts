import { Component } from '@angular/core';
import { HeroComponent } from '../../organisms/hero/hero.component';
import { LaunchComponent } from '../../organisms/launch/launch.component';
import { DatingComponent } from '../../organisms/dating/dating.component';
import { QuotateComponent } from '../../organisms/quotate/quotate.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
    imports: [HeroComponent, LaunchComponent, DatingComponent, QuotateComponent]
})
export class HomeComponent {

}
