import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {passwordValid} from "../validators/validator-user-artist";
import {UniqueLoginValidatorService} from "../validators/unique-login-validator.service";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  password2Ctrl: FormControl;
  emailCtrl: FormControl;
  cityCtrl: FormControl;
  userForm: FormGroup;
  passwordsGroup: FormGroup;

  options: string[] = ['paris', 'lyon', 'marseille', 'strasbourg'];

  constructor(fb: FormBuilder, private uniqueLogin: UniqueLoginValidatorService) {

    this.usernameCtrl = fb.control('', [Validators.required],[this.uniqueLogin.usernameExists]);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')]);
    this.password2Ctrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
    this.cityCtrl = fb.control('', [Validators.required]);

    this.passwordsGroup = fb.group({
      password: this.passwordCtrl,
      passwordConfirm: this.password2Ctrl
    },{
      validator: passwordValid.bind(this)

    });

    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      email: this.emailCtrl,
      city: this.cityCtrl
    });

  }

  handleSubmit(){
    console.log(this.userForm.value);
  }


  handleClear(){
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.emailCtrl.setValue('');
    this.cityCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.password2Ctrl.setValue('');
  }


  ngOnInit() {
  }

}
