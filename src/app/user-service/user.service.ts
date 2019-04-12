import { Injectable } from '@angular/core';
import { UserRepository } from './user.repository';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token = localStorage.getItem('token') || undefined;
  constructor(private userRepository: UserRepository) {
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
          localStorage.setItem('token', this.token);
          resolve(response.status);
        })
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
