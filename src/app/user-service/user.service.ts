import { Injectable } from '@angular/core';
import { UserRepository } from './user.repository';
import { HttpResponse } from '@angular/common/http';
import {SpringApiServicesService} from '../services/spring-api-services.service';
import {reject} from 'q';

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

        .catch((response: HttpResponse<any>) => { reject(response.status); });
    });
  }

  getUser() {
    this.springApi.getOneUser().then(p => this.user = p);
    console.log('getOneUser', this.user);
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
