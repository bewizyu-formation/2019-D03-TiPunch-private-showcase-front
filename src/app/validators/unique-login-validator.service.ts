import { Injectable } from '@angular/core';
import {SpringApiServicesService} from "../services/spring-api-services.service";
import {AbstractControl, AsyncValidatorFn, ValidationErrors} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class UniqueLoginValidatorService {

  constructor(private apiServices: SpringApiServicesService) { }

  usernameExists: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors> => {
    let verificationBase: any =  this.apiServices.uniqueLogin(control.value, false);
     return verificationBase;
  };

  artistNameExists: AsyncValidatorFn = (control: AbstractControl): Promise<ValidationErrors> => {
    let verificationBase: any =  this.apiServices.uniqueLogin(control.value, true);
    return verificationBase;
  };
}
