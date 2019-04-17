import { Component, OnInit } from '@angular/core';
import { SpringApiServicesService } from '../services/spring-api-services.service';
import { Router } from '@angular/router';
import { PATH_ARTIST, PATH_HOME, PATH_PROFILE } from '../app.routes.constantes';
import { UserService } from '../user-service/user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  artistes;
  image = 'http://placekitten.com/g/200/200';
  constructor(private router: Router, private springApiServicesService: SpringApiServicesService, private userService: UserService) { }
  async ngOnInit() {
    await this.springApiServicesService.getListArtists().toPromise().then(p => this.artistes = p).then(() => {
      // génération aléatoire de valeurs note et votes
      for (let i = 0; i < this.artistes.length; i++) {
        this.artistes[i].noteArtist = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        this.artistes[i].nbVote = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
      }
    });


  }
  navigateToArtist(id) {
    this.router.navigate([PATH_ARTIST, id]);
  }
  navigateToHome() {
    this.router.navigate([PATH_HOME]);
  }
  navigateToProfile() {
    this.router.navigate([PATH_PROFILE]);
  }
  logout() {
    localStorage.removeItem('token');
    this.userService.token = undefined;
    this.router.navigate([PATH_HOME]);
  }
}
