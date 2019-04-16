import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_HOME, PATH_USER } from '../app.routes.constantes';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user-service/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  userForm: FormGroup;
  error: boolean;
  constructor(private router: Router, fb: FormBuilder, private userService: UserService) {
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
  handleSubmit() {
    this.userService.login(this.usernameCtrl.value, this.passwordCtrl.value).then(status => {
      if (status === 200) {
        this.userService.getUser();
        this.router.navigate([PATH_USER]);
      } else {
        this.error = true;
      }
    });
  }
  Cancel() {
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.usernameCtrl.markAsPending({ onlySelf: false });
    this.passwordCtrl.markAsPending({ onlySelf: false });
  }
  ngOnInit() {
    this.error = false;
  }
}
