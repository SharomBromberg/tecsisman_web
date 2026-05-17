import { NgModule } from '@angular/core';
import { ServicesRoutingModule } from './services-routing.module';
import { ServicesComponent } from './services.component';

@NgModule({
    imports: [ServicesRoutingModule, ServicesComponent],
})
export class ServicesModule {}
