import { Injectable } from '@angular/core';
import { SpringApiServicesService } from './spring-api-services.service';
import { User } from '../model/User';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private ApiService: SpringApiServicesService) {
  }


  user: User;
  async addUser(newUser: User): Promise<any> {
    /*let resp;
    this.ApiService.addUser(newUser).toPromise().then(p => resp = p);
    console.log(resp);*/
    return this.ApiService.addUser(newUser);

  }
}
