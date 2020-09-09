import { NgModule } from '@angular/core';

import { UsersComponent } from './users/users.component';
import { DevicesComponent } from './devices/devices.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TableComponent } from '../common_components/table/table.component';
import { DateFormat } from '../services/date.service';


const routes: Routes =  [
    {    path: 'users', component: UsersComponent  },
    {    path: 'devices', component: DevicesComponent  },
  ];

@NgModule({
    declarations: [
        UsersComponent,
        DevicesComponent,
        TableComponent
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ReactiveFormsModule,
        NgbModule
    ],
    exports: [RouterModule],
    providers: [DateFormat]
})

export class PageModule {}
