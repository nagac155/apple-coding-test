import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';


@Component({
    selector: 'app-page',
    templateUrl: './page-layout.component.html',
    styleUrls: ['./page-layout.component.scss']
})

export class PageLayoutComponent implements  OnInit {

    ngOnInit() {
        $('#menu-toggle').click((e) => {
        e.preventDefault();
        $('#wrapper').toggleClass('toggled');
        });
    }
}
