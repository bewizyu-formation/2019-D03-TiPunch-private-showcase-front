import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {  PATH_HOME, PATH_USER } from '../app.routes.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';
import { LoggedInGuard } from '../logged-in.guard';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  userForm: FormGroup;
  try:boolean=false;
  constructor(private router: Router,fb: FormBuilder,private userService:UserService,private guard:LoggedInGuard) {
    this.usernameCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required]);               
    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
  
    });
   }
  NavigateToHome() {
    this.router.navigate([PATH_HOME]);
  }
  handleSubmit(){
    this.try=true;
    this.userService.login(this.usernameCtrl.value,this.passwordCtrl.value).then(token=>{
      if(token!=undefined){
        this.router.navigate([PATH_USER]);
      }
    }).catch()
  }
  Cancel(){
    this.usernameCtrl.setValue("");
    this.passwordCtrl.setValue("");
    this.usernameCtrl.markAsPending({onlySelf:false});
    this.passwordCtrl.markAsPending({onlySelf:false});
  }
  ngOnInit() {
    this.try=false
  }
}
