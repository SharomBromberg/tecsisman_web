import { NgModule } from '@angular/core';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { LaunchComponent } from './launch/launch.component';
import { DatingComponent } from './dating/dating.component';
import { QuotateComponent } from './quotate/quotate.component';
import { HeroComponent } from './hero/hero.component';

@NgModule({
    imports: [HeroComponent, ShoppingCartComponent, LaunchComponent, DatingComponent, QuotateComponent],
    exports: [HeroComponent, ShoppingCartComponent, LaunchComponent, DatingComponent, QuotateComponent]
})
export class OrganismsModule { }
