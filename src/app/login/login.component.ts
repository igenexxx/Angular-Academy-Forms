import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  initialValues = {
    email: 'hello@example.com',
    password: '1234567'
  };

  constructor() {}

  ngOnInit() {

  }

  login(loginForm: NgForm, submit): void {
    console.log(loginForm.value, loginForm.valid, submit);
  }
}
