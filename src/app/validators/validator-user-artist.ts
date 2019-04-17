import {FormGroup} from '@angular/forms';


// verifie que les deux champs password et confirme password sont bien equivalents

export function passwordValid(passGroup: FormGroup) {

  let result: any;
  const password = passGroup.controls.password.value;
  const confirmPassword = passGroup.controls.passwordConfirm.value;

  if (password === confirmPassword) {
    console.log('pareil');
    result = null;

  } else {
    console.log('pas pareil');
    result = {passwordValid: true};
  }

  return result;
}


