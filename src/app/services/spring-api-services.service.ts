import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../model/User";
import {Artist} from "../model/Artist";

const API_BASE_URL: string = 'http://localhost:8080';
const API_USER: string = '/users/';
const API_ARTIST:string = '/artist/';

@Injectable({
  providedIn: 'root'
})
export class SpringApiServicesService {

  constructor(private http: HttpClient) { }

  //Appels api User

  getListUsers(){
    console.log("getListUser");
    //return this.http.get(`${API_BASE_URL}${API_USER}`);
  }

  getOneUser(user:User){
    console.log("getOneusr");
    //return this.http.get(`${API_BASE_URL}${API_USER}${user.id}`);
  }

  addUser(user:User){
    console.log("addUser");
    console.log(`${API_BASE_URL}${API_USER}`, user);

   return this.http.put(`${API_BASE_URL}${API_USER}`, user);
  }

  updateUser(user:User){
    console.log("updateUser");
    //return this.http.put(`${API_BASE_URL}${API_USER}${user.id}`, user);
  }

  //Appels Api Artists

  getListArtists(){

    console.log("getListArtist");
    //return this.http.get(`${API_BASE_URL}${API_ARTIST}`);
  }

  getOneArtist(artist:Artist){

    console.log("getOneArtist");
    //return this.http.get(`${API_BASE_URL}${API_ARTIST}${artist.id}`);
  }

  addArtist(data:any){

    console.log("addArtist");
    return this.http.post(`${API_BASE_URL}${API_ARTIST}`, data);
  }

  updateArtist(artist:Artist){

    console.log("updateArtist");
    //return this.http.put(`${API_BASE_URL}${API_ARTIST}${artist.id}`, artist);
  }


  //Verifie si le login est valide, puis si il existe dejà en base
  async uniqueLogin(login:string, artist: boolean){

    let result:any;

    const  regexp: RegExp = new RegExp('^[a-zA-Z0-9-\_\ áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ]{3,}$');
    const test: boolean = regexp.test(login);

    if(test) {

     let verificationBase: any = true;
      const typeOfLogin:string =(artist == true)?'/artist/exists':'/user/exists';
        //let verificationBase: any = await this.http.get(`${API_BASE_URL}${typeOfLogin}${login}`);



      if (verificationBase) {
        console.log('verifOK');
        result = null;

      } else {
        console.log('unique pas OK');
        result = {uniqueLogin: true};
      }

    }else{
      console.log('invalid Login');
      result = {invalidLogin: true};
    }
    return result;


  }
}
