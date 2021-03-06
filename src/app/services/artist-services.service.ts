import {Injectable} from '@angular/core';
import {SpringApiServicesService} from './spring-api-services.service';
import {UserService} from '../user-service/user.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistServicesService {

  constructor(private ApiService: SpringApiServicesService, private userService: UserService) {
  }


  async addArtist(data: any): Promise<any> {
    let resp;
    await this.ApiService.addArtist(data).toPromise().then(p => resp = p, p => resp = p);
    return await resp;

  }

   getArtist(id: string): Promise<any> {

    return this.ApiService.getOneArtist(id).toPromise();

  }

  async updateArtist(data: any): Promise<any> {
    let resp: any;
    await this.ApiService.updateArtist(data).toPromise().then(p => resp = p);
    return resp;
  }

  getArtistImg(id: string): Promise<any> {
    return this.ApiService.getOneArtistImg(id).toPromise();

  }
}
