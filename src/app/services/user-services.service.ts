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
  async addUser(newUser: any): Promise<any> {

    let resp;
    await this.ApiService.addUser(newUser).toPromise().then(p => resp = p, p => resp = p
    );
    await console.log(resp);
    return await resp;

  }
}
