import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {PATH_LOGIN, PATH_INSCRIPTION, PATH_USER, PATH_PROFILE} from '../app.routes.constantes';
import {UserService} from '../user-service/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router, private userService: UserService) {
  }

  NavigateToLogin() {
    this.router.navigate([PATH_LOGIN]);
  }

  NavigateToInscription() {
    this.router.navigate([PATH_INSCRIPTION]);
  }

  NavigateToUser() {
    this.router.navigate([PATH_USER]);
  }

  navigateToProfile() {
    this.router.navigate([PATH_PROFILE]);
  }

  logout() {
    localStorage.removeItem('token');
    this.userService.token = undefined;
  }

  ngOnInit() {
  }

}
