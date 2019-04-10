import { Injectable } from '@angular/core';
import { SpringApiServicesService } from './spring-api-services.service';

@Injectable({
  providedIn: 'root'
})
export class ArtistServicesService {

  constructor(private ApiService: SpringApiServicesService) { }


  async addArtist(data: any): Promise<boolean> {
    let resp;
    this.ApiService.addArtist(data).toPromise().then(p => resp = p);

    return resp;

  }
}
