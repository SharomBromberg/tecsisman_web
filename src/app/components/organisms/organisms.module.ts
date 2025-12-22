import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { RouterModule } from '@angular/router';
import { AtomsModule } from '../atoms/atoms.module';
import { LaunchComponent } from './launch/launch.component';
import { FormsModule } from '@angular/forms';
import { MoleculesModule } from '../molecules/molecules.module';
import { DatingComponent } from './dating/dating.component';
import { QuotateComponent } from './quotate/quotate.component';



@NgModule({
  declarations: [HeaderComponent, ShoppingCartComponent, LaunchComponent, DatingComponent, QuotateComponent],
  imports: [
    CommonModule,
    RouterModule,
    AtomsModule,
    FormsModule,
    MoleculesModule

  ],
  exports: [HeaderComponent, ShoppingCartComponent, LaunchComponent, DatingComponent, QuotateComponent]
})
export class OrganismsModule { }
