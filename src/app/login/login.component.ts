import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  PATH_HOME, PATH_USER } from '../app.routes.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserRepository } from '../user-service/user.repository';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCtrl: FormControl;
  passwordCtrl: FormControl;
  userForm: FormGroup;
  user:any={login:"",password:""};
  constructor(private router: Router,fb: FormBuilder,private userService:UserService) {
    this.loginCtrl = fb.control('', [Validators.required,/*Validators.pattern(/^[a-zA-Z0-9-\_\ áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,}$/g)*/]);
    this.passwordCtrl = fb.control('', [Validators.required]);               
    this.userForm = fb.group({
      login: this.loginCtrl,
      password: this.passwordCtrl,
  
    });
   }
  NavigateToHome() {
    this.router.navigate([PATH_HOME]);
  }
  handleSubmit(){
    console.log(this.user);
    this.userService.login(this.user.login,this.user.password)
    this.router.navigate([PATH_USER]);
  }
  ngOnInit() {
  }
}
