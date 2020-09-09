import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.css']
})

export class TableComponent {
    @Input() columns;
    @Input() rowData;
    @Input() itemSelected;
    @Output() rowSelected = new EventEmitter<any>();
    selectedItem: any;
    sameIndex: number;

    RowSelected(u: any, i: number){
        this.selectedItem = u;
        this.sameIndex = i;
        this.rowSelected.emit(u);
    }

}
