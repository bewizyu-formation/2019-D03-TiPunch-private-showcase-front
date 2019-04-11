import { Injectable } from '@angular/core';
import { SpringApiServicesService } from './spring-api-services.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistServicesService {

  constructor(private ApiService: SpringApiServicesService) { }



  async addArtist(data: any): Promise<any> {
    let resp;
    await this.ApiService.addArtist(data).toPromise().then(p => resp = p,p => resp = p);
    return await resp;

  }
}
