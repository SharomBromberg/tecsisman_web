import { NgModule } from '@angular/core';
import { BlogRoutingModule } from './blog-routing.module';
import { BlogComponent } from './blog.component';

@NgModule({
    imports: [BlogRoutingModule, BlogComponent],
})
export class BlogModule {}
