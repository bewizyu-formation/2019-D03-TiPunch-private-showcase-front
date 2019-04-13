import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/User';
import {Artist} from '../model/Artist';

const API_BASE_URL = 'http://localhost:8080';
const API_USER = '/users/';
const API_ARTIST = 'artist/';
const API_COUNTIES = '/departements/';

@Injectable({
  providedIn: 'root'
})
export class SpringApiServicesService {

  constructor(private http: HttpClient) {
  }

  // Appels api User


  addUser(user: User) {

    return this.http.put(`${API_BASE_URL}${API_USER}`, user);
  }

  updateUser(user: User) {
    console.log('updateUser');
    // return this.http.put(`${API_BASE_URL}${API_USER}${user.id}`, user);
  }

  getOneUser() {

    return this.http.get(`${API_BASE_URL}${API_USER}'getUser'`);
  }

  // Appels Api Artists

  getListArtists() {

    console.log('getListArtist');
    // return this.http.get(`${API_BASE_URL}${API_ARTIST}`);
  }

  getOneArtist(id: number, token: string) {

    const data: any = {
      id: id,
      token: token,
    };

    return this.http.put(`${API_BASE_URL}${API_ARTIST}`, data);
  }

  addArtist(data: any) {

    console.log('addArtist');
    return this.http.put(`${API_BASE_URL}${API_USER}${API_ARTIST}`, data);
  }

  updateArtist(artist: Artist) {

    console.log('updateArtist');
    return this.http.put(`${API_BASE_URL}${API_ARTIST}${artist.id}`, artist);
  }


  // Verifie si le login est valide, puis si il existe dejà en base
  async uniqueLogin(login: string, artist: boolean) {

    let result: any;

    const regexp: RegExp = new RegExp('^[a-zA-Z0-9-\_\ áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,}$');
    const test: boolean = regexp.test(login);

    if (test) {
      const typeOfLogin: string = (artist === true) ? '/users/artist/exists?nameArtist=' : '/users/exists?username=';

      const verificationBase: any = await this.http.get(`${API_BASE_URL}${typeOfLogin}${login}`).toPromise();

      if (verificationBase === false) {

        result = null;

      } else {

        result = {uniqueLogin: true};
      }

    } else {

      result = {invalidLogin: true};
    }
    return result;


  }

  getCounties(county: string){
    return this.http.get(`${API_BASE_URL}${API_COUNTIES}${'?nom='}${county}`).toPromise();
  }
}
