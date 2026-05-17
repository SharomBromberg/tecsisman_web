import { NgModule } from '@angular/core';

import { DevelopmentComponent } from './development/development.component';
import { NetworksComponent } from './networks/networks.component';
import { SupportComponent } from './support/support.component';
import { TechnologyComponent } from './technology/technology.component';
import { CategoriesTemplateComponent } from './categories-template/categories-template.component';

@NgModule({
    imports: [
        DevelopmentComponent,
        NetworksComponent,
        SupportComponent,
        TechnologyComponent,
        CategoriesTemplateComponent,
    ],
    exports: [
        DevelopmentComponent,
        NetworksComponent,
        SupportComponent,
        TechnologyComponent,
        CategoriesTemplateComponent,
    ]
})
export class TemplatesModule { }
