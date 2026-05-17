import { NgModule } from '@angular/core';
import { ContactRoutingModule } from './contact-routing.module';
import { ContactComponent } from './contact.component';

@NgModule({
    imports: [ContactRoutingModule, ContactComponent],
})
export class ContactModule {}
