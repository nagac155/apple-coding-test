import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UtilService } from 'src/app/services/util.service';
import { DateFormat } from 'src/app/services/date.service';

export interface IUser {
    id: string;
    name: string;
    email: string;
    phone: number;
    address: string;
    dateOfJoining: string;
}

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.css']
})

export class UsersComponent implements OnInit{
    @ViewChild('searchInput') searchInput: ElementRef;
    tableColumns: any;
    activeUsers: Array<IUser> = [];
    selectedUser: any = {};
    userForm: any;
    value = '';
    formSubmitted = false;

    get userSelected(): boolean {
        return (Object.keys(this.selectedUser).length > 0) ;
    }


    constructor(private modalService: NgbModal,
                private util: UtilService,
                private dateformat: DateFormat
      ) {}


    ngOnInit() {
        this.tableColumns = [
          {title: 'Name', col: 'name'},
          {title: 'Email', col: 'email'},
          {title: 'Phone', col: 'phone'},
          {title: 'Address', col: 'address'},
          {title: 'Date of Joining', col: 'dateOfJoining'},
         ];
        this.activeUsers = this.util.getUsers();
        this.userForm = new FormGroup({
            name: new FormControl(''),
            email: new FormControl(''),
            phone: new FormControl(''),
            address: new FormControl(''),
            dateOfJoining: new FormControl(''),
            id: new FormControl(''),
          });

    }

    add(e) {
        this.formSubmitted = true;
        const doj = this.dateformat.toModel(e.value.dateOfJoining);
        Object.assign(e.value, {dateOfJoining: doj});
        if (this.userSelected) {
            // updating the existing user
            Object.assign(this.selectedUser, e.value);
            this.util.setUser(JSON.stringify(this.activeUsers));
            this.selectedUser = {};
        } else {
            // Adding new user
            if (this.activeUsers === null) {
                const data = [];
                data.push(Object.assign({}, e.value, {id: new Date()}));
                this.activeUsers = data;
                this.util.setUser(JSON.stringify(data));
                console.log(data);
            } else {
                this.activeUsers.push(Object.assign({}, e.value, {id: new Date()}));
                this.util.setUser(JSON.stringify(this.activeUsers));
            }
        }
        this.modalService.dismissAll();
    }

    cancel() {
      this.userForm.reset();
      this.selectedUser = {};
      this.modalService.dismissAll();
    }

    RowSelected(u: any){
        this.selectedUser = u;

    }

  addUser(content) {
      this.userForm.reset();
      this.modalService.open(content, { centered: true });
  }

    modifyUser(content) {
        this.modalService.open(content, { centered: true });
        const date = this.dateformat.fromModel(this.selectedUser.dateOfJoining);
        const user = Object.assign({}, this.selectedUser, {dateOfJoining: date});
        this.userForm.setValue(user);
    }

    deleteUser() {
        this.activeUsers = this.activeUsers.filter(e => e.id !== this.selectedUser.id);
        this.util.setUser(JSON.stringify(this.activeUsers));
        this.selectedUser = {};
    }


    searchText(e) {
        e.preventDefault();
        const items: any = this.searchInput.nativeElement.value.toLowerCase().trim().split(/[\s,]+/);
        this.activeUsers = this.util.getUsers().filter(user => {
          const matchingList = [] ;
          const userDetails = [];

          if (!!user.name) {
            userDetails.push(...user.name.toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!user.email) {
            userDetails.push(...user.email.toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!user.phone) {
            userDetails.push(...user.phone.toString().toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!user.address) {
            userDetails.push(...user.address.toLocaleLowerCase().split(/[\s,]+/));
          }

          if (!!user.dateOfJoining) {
            userDetails.push(...user.dateOfJoining.toLocaleLowerCase().split(/[\s,]+/));
          }

          for (const item of items) {
            const itemsMatchingList: any = userDetails.filter((event: string) => event.startsWith(item));
            if (itemsMatchingList.length > 0) {
                const diffElements: any = itemsMatchingList.filter(event => !matchingList.includes(event));
                matchingList.push(...diffElements);
            } else {return false; }
          }
          return matchingList.length >= items.length;
        });
      }

}
