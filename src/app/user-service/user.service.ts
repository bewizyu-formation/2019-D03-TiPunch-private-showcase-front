import { Injectable } from '@angular/core';
import { UserRepository } from './user.repository';
import { HttpResponse } from '@angular/common/http';
import {User} from '../model/User';
import {SpringApiServicesService} from '../services/spring-api-services.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token: string;
  public user: any;

  constructor(private userRepository: UserRepository, private springApi: SpringApiServicesService) {
  }

  /**
   * Login the user
   * @param username User login name
   * @param password User Password
   */
  login(username: string, password: string): Promise<any> {
    return new Promise((resolve) => {
      this.userRepository
        .login(username, password)
        .toPromise()
        .then((response: HttpResponse<any>) => {
          this.token = response.headers.get('Authorization');
          resolve(response.status);
        })
        .then(() => {this.user = this.springApi.getOneUser();
        console.log('getOneUser', this.user);
        resolve(null)})
        .catch((response: HttpResponse<any>) => { resolve(response.status); });
    });
  }

  logged(username: string, password: string): Promise<any> {
    return new Promise((resolve) => {
      this.userRepository.login(username, password).toPromise()
        .then((response: HttpResponse<any>) => {
          this.token = response.headers.get('Authorization');
          resolve(this.token);
        });
    });
  }
}
