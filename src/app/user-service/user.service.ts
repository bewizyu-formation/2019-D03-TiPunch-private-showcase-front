import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {HttpResponse} from '@angular/common/http';

import {SpringApiServicesService} from '../services/spring-api-services.service';
import {reject} from 'q';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token = localStorage.getItem('token') || undefined;
  public user: any;

  constructor(private userRepository: UserRepository, private springApi: SpringApiServicesService) {
  }

  /**      const verificationBase: any = await this.http.get(`${API_BASE_URL}${typeOfLogin}${login}`).toPromise();

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

        .catch((response: HttpResponse<any>) => {
          reject(response.status);
        });
    });
  }

  async getUser() {
    await this.springApi.getOneUser().then(p => this.user = p);
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

  matchUserArtist(idArtist: number): boolean {

    let result: any = false;

    for (const userArtist of this.user.listArtist) {

      if (userArtist.id === idArtist) {
        result = true;
      }
    }

    return result;
  }
}
