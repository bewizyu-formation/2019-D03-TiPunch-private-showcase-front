import {FormControl} from "@angular/forms";
import {SpringApiServicesService} from "../services/spring-api-services.service";


//let apiService:SpringApiServicesService;

//verifie que les deux champs password et confirme password sont bien equivalents
export function passwordValid (control: FormControl, confirmPassword:string) {

  let result:any;
/*
  if(control.value === confirmPassword){*/

    result = null;

/*  }else{

    result = {passwordValid : true};
  }*/

  return result;
}

//verifie que le username soit valide et n'exsiste pas déjà en base
export async function uniqueLogin(control: FormControl) {

  let result: any;
/*

  const  regexp: RegExp = new RegExp('^[a-zA-Z0-9-\_\ ]{3,}$');
  const test: boolean = regexp.test(control.value);*/

/*
 if(test){

   let verificationBase = true;
   //let verificationBase = await apiService.uniqueLogin(control.value);

   if(verificationBase){*/
     result = null;
  /* }else{

     result= {uniqueLogin: true};
   }

 }else{

   result= {invalidLogin: true};

 }*/

  return result;
}
