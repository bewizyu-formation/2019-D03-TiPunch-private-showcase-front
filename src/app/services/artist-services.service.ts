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

  async getArtist(id: string): Promise<any> {

    let resp;
   resp =  await this.ApiService.getOneArtist(id).then(p => resp = p, p => resp = p);
    console.log('getArtist: ',resp);
    return resp;
  }

  async updateArtist(data: any): Promise<boolean> {

    let resp;
    this.ApiService.updateArtist(data).toPromise().then(p => resp = p);
    return resp;
  }
}
