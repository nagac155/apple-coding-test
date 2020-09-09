import { Component, OnInit } from '@angular/core';

export const ROUTES = [
    {path: '/users', title: 'Active Users', icon: 'dashboard'},
    {path: '/devices', title: 'Active Devices', icon: 'report_problem'}
];

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {

    navItems: any;

    ngOnInit() {
        this.navItems = ROUTES.filter(navItem => navItem);
    }
}
