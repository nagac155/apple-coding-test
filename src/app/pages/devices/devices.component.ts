import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UtilService } from 'src/app/services/util.service';
import { FormGroup, FormControl } from '@angular/forms';
import { DateFormat } from 'src/app/services/date.service';

export interface IDevice {
    id: string;
    deviceName: string;
    deviceType: string;
    OSVersion: number;
    lastLogin: string;
}

@Component({
    selector: 'app-devices',
    templateUrl: './devices.component.html',
    styleUrls: ['./devices.component.css']
})

export class DevicesComponent implements OnInit{
    @ViewChild('searchInput') searchInput: ElementRef;
    tableColumns: any;
    activeDevices: Array<IDevice>;
    selectedDevice: any = {};
    deviceForm: any;
    value = '';

    get deviceSelected(): boolean {
        return (Object.keys(this.selectedDevice).length > 0);
    }


    constructor(private modalService: NgbModal,
                private util: UtilService,
                private dateformat: DateFormat) {}


    ngOnInit() {
        this.tableColumns = [
            {title: 'Device Name', col: 'deviceName'},
            {title: 'Device Type', col: 'deviceType'},
            {title: 'OS Version', col: 'OSVersion'},
            {title: 'Last Login', col: 'lastLogin'},
        ];
        this.activeDevices = this.util.getDevices();
        this.deviceForm = new FormGroup({
            deviceName: new FormControl(''),
            deviceType: new FormControl(''),
            OSVersion: new FormControl(''),
            lastLogin: new FormControl(''),
            id: new FormControl(''),
          });

    }

    addUser(content) {
        this.deviceForm.reset();
        this.modalService.open(content, { centered: true });
    }

    add(e) {
        const ll = this.dateformat.toModel(e.value.lastLogin);
        Object.assign(e.value, {lastLogin: ll});
        if (this.deviceSelected) {
            // updating the existing device
            Object.assign(this.selectedDevice, e.value);
            this.util.setDevice(JSON.stringify(this.activeDevices));
            this.selectedDevice = {};
        } else {
            // Adding new user
            if (this.activeDevices === null) {
                this.activeDevices = [];
                this.activeDevices.push(Object.assign({}, e.value, {id: new Date()}));
                this.util.setDevice(JSON.stringify(this.activeDevices));
            } else {
                this.activeDevices.push(Object.assign({}, e.value, {id: new Date()}));
                this.util.setDevice(JSON.stringify(this.activeDevices));
            }
        }
        this.modalService.dismissAll();
    }

    RowSelected(u: any){
        this.selectedDevice = u;

    }

    modifyUser(content) {
        this.modalService.open(content, { centered: true });
        const date = this.dateformat.fromModel(this.selectedDevice.lastLogin);
        const device = Object.assign({}, this.selectedDevice, {lastLogin: date});
        this.deviceForm.setValue(device);
    }

    deleteUser() {
        this.activeDevices = this.activeDevices.filter(e => e.id !== this.selectedDevice.id);
        this.util.setDevice(JSON.stringify(this.activeDevices));
        this.selectedDevice = {};
    }


    searchText(e) {
        e.preventDefault();
        const items: any = this.searchInput.nativeElement.value.toLowerCase().trim().split(/[\s,]+/);
        this.activeDevices = this.util.getDevices().filter(device => {
          const matchingList = [] ;
          const deviceDetails = [];

          if (!!device.deviceName) {
            deviceDetails.push(...device.deviceName.toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!device.deviceType) {
            deviceDetails.push(...device.deviceType.toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!device.OSVersion) {
            deviceDetails.push(...device.OSVersion.toString().toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!device.lastLogin) {
            deviceDetails.push(...device.lastLogin.toLocaleLowerCase().split(/[\s,]+/));
          }

          for (const item of items) {
            const itemsMatchingList: any = deviceDetails.filter((event: string) => event.startsWith(item));
            if (itemsMatchingList.length > 0) {
                const diffElements: any = itemsMatchingList.filter(event => !matchingList.includes(event));
                matchingList.push(...diffElements);
            } else {return false; }
          }
          return matchingList.length >= items.length;
        });
      }

}
