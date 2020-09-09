import { NgModule } from '@angular/core';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@NgModule({
    declarations: [
        SidebarComponent,
        FooterComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
    ],
    exports: [
        SidebarComponent,
        FooterComponent
    ],
})

export class LayoutModule {}
