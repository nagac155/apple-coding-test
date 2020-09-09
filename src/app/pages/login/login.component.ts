import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    constructor( private router: Router) {}
    logiForm = new FormGroup({
        LoginUser: new FormControl(''),
        LoginPassword: new FormControl('')
      });

  login() {
      console.log('hit login');
      this.router.navigate(['users']);
  }

}
