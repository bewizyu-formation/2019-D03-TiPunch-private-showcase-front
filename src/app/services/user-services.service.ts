import { Injectable } from '@angular/core';
import {SpringApiServicesService} from "./spring-api-services.service";
import {User} from "../model/User";

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {

  constructor(private ApiService: SpringApiServicesService) { };

  usersList:Array<User> = [];

  user:User;

  async addUser(newUser:User):Promise<User>{

    let resp:any = await this.ApiService.addUser(newUser).toPromise();

    return resp;

  }
}
