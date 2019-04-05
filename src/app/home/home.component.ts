import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PATH_LOGIN, PATH_INSCRIPTION } from '../app.routes.constantes';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }
  NavigateToLogin() {
    this.router.navigate([PATH_LOGIN]);
  }
  NavigateToInscription() {
    this.router.navigate([PATH_INSCRIPTION]);
  }

  ngOnInit() {
  }

}
