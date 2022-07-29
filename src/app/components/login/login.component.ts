import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MessagesService } from 'src/app/services/message.service';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  login: any = {
    image: './assets/images/coffee.jpg',
  }

  loginForm!:FormGroup
  spinner: boolean = false;

  constructor(public route: Router, public message:MessagesService,
     private login_user:AuthService, private user:UserService,
     private fb:FormBuilder) {
      this.validateFields()
     }

     ngOnInit() {
      //empty
    }

  loginUser(event: Event){
    event.preventDefault();
    const value = this.loginForm.value;
    if(value.email == '' || value.email == null || value.email == undefined ){
      this.message.load('El email es un campo obligatorio')
    }
    if(value.password == '' || value.password == null || value.password == undefined ){
      this.message.load('La contraseña es un campo obligatorio')
    }
    if (this.loginForm.valid) {
      this.login_user.login(value).subscribe((response:any)=>{
        if (response.token) {
          localStorage.setItem('token', response.token);
          this.fakeloading();
        } else {
          this.message.load('Usuario y/o contraseña incorrectos');
          this.route.navigate(['/login']);
        }
      });
    }
  }

  sessionHandler(){
    this.user.getUserAuth().subscribe((response:any)=>{
      let path = '';
      if(response.role_id == 1){
        path = '/admin/dashboard';
      } else if(response.role_id == 2){
        path = '/seller';
      } else if(response.role_id == 3){
        path = '/customer';
      } else {
        path = '/login';
      }
      this.route.navigate([path]);
    });
  }

  private validateFields(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  fakeloading(){
    this.spinner = true;
    setTimeout(() => {
      this.spinner = false;
    }, 1750);
    this.sessionHandler();
  }
}
