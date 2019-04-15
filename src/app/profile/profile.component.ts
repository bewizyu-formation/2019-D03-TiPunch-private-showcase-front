import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_HOME, PATH_LOGIN } from '../app.routes.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { passwordValid } from '../validators/validator-user-artist';
import { SpringApiServicesService } from '../services/spring-api-services.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  lastPasswordCtrl: FormControl;
  passwordCtrl: FormControl;
  password2Ctrl: FormControl;
  emailCtrl: FormControl;
  userForm: FormGroup;
  passwordsGroup: FormGroup;
  constructor(fb: FormBuilder, private router: Router,private springApi:SpringApiServicesService) {
    this.lastPasswordCtrl = fb.control('', [Validators.required]);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')]);
    this.password2Ctrl = fb.control('', [Validators.required]);
    this.passwordsGroup = fb.group({
      password: this.passwordCtrl,
      passwordConfirm: this.password2Ctrl
    }, {
        validator: passwordValid.bind(this)
      });
      this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
    this.userForm = fb.group({
      lastPassword: this.lastPasswordCtrl,
      password: this.passwordCtrl,
      email:this.emailCtrl
    });
  }

  ngOnInit() {
  }
  async handleSubmit() {
    let send:string[] =[this.userForm.value.lastPassword,this.userForm.value.password,this.userForm.value.email];
    
    console.log(send)
    this.springApi.updateUser(send)
    this.router.navigate([PATH_LOGIN]);
  }
  handleClear(){
    this.lastPasswordCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.password2Ctrl.setValue('');
    this.emailCtrl.setValue('');
    this.lastPasswordCtrl.markAsPending({ onlySelf: false });
    this.passwordCtrl.markAsPending({ onlySelf: false });
    this.password2Ctrl.markAsPending({ onlySelf: false });
    this.emailCtrl.markAsPending({ onlySelf: false });
  }
  navigateToHome() {
    this.router.navigate([PATH_HOME]);
  }
}
