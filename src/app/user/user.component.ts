import { Component, OnInit } from '@angular/core';
import { SpringApiServicesService } from '../services/spring-api-services.service';
import { Router } from '@angular/router';
import { PATH_ARTIST, PATH_HOME, PATH_PROFILE } from '../app.routes.constantes';
import { UserService } from '../user-service/user.service';
import { ArtistServicesService } from '../services/artist-services.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  artistes;
  imagePreview;
  constructor(private artistService: ArtistServicesService,
    private router: Router, private springApiServicesService: SpringApiServicesService, private userService: UserService) { }
  async ngOnInit() {
    await this.springApiServicesService.getListArtists().toPromise().then(p => this.artistes = p).then(() => {
      // génération aléatoire de valeurs note et votes

      for (let i = 0; i < this.artistes.length; i++) {
        this.artistes[i].noteArtist = Math.floor(Math.random() * (10 - 0 + 1)) + 0;
        this.artistes[i].nbVote = Math.floor(Math.random() * (100000 - 0 + 100)) + 0;

      }
    });



    for (let i = 0; i < this.artistes.length; i++) {

      try {
        const blob = await this.artistService.getArtistImg(this.artistes[i].id);
        const reader = new FileReader();
        reader.onloadend = () => {
          console.log('LOADED', reader);
          this.artistes[i].image = reader.result;
        };
        reader.readAsDataURL(blob);
      } catch (e) {
        console.log('ERROR IMAGE', e);
      }
    }



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
    localStorage.removeItem('user');
    this.userService.user = undefined;
    this.router.navigate([PATH_HOME]);
  }
}
