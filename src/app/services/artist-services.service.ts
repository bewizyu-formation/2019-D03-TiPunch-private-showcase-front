import { Injectable } from '@angular/core';
import {SpringApiServicesService} from "./spring-api-services.service";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class ArtistServicesService {

  constructor(private ApiService: SpringApiServicesService) { };

  user:User;

  async addArtist(data:any):Promise<User>{

    let resp:any = await this.ApiService.addArtist(data).toPromise();

    return resp;

  }
}
