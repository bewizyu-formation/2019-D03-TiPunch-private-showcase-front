import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {HttpResponse} from '@angular/common/http';

import {SpringApiServicesService} from '../services/spring-api-services.service';
import {reject} from 'q';
import {User} from '../model/User';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token = localStorage.getItem('token') || undefined;
  public user = localStorage.getItem('user') || undefined;

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
    await this.springApi.getOneUser().then(p => localStorage.setItem('user', JSON.stringify(p)))
    .then(()=>this.user = localStorage.getItem('user'));

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

    if (this.user !== undefined) {

      const userObj = JSON.parse(this.user);


      for (const userArtist of userObj.listArtist) {

        if (userArtist.id == idArtist) {
          result = true;
        }
      }
    }

    return result;
  }
}
