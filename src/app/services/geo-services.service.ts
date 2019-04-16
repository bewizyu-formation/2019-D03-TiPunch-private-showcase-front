import { Injectable } from '@angular/core';
import {SpringApiServicesService} from './spring-api-services.service';

@Injectable({
  providedIn: 'root'
})
export class GeoServicesService {

  constructor(private ApiService: SpringApiServicesService) {
  }


  async getCounties(county: string) {

    return await this.ApiService.getCounties(county);
  }
  async getCities(city: string) {

    return await this.ApiService.getCities(city);


  }
}
