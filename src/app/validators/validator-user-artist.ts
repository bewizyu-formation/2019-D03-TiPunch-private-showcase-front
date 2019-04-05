import {FormControl, FormGroup} from "@angular/forms";



//verifie que les deux champs password et confirme password sont bien equivalents
export function passwordValid(passGroup: FormGroup) {
console.log('POUET');
console.log(passGroup);
  let result: any;
  const password = passGroup.controls.password.value;
  const confirmPassword = passGroup.controls.passwordConfirm.value;

  if (password === confirmPassword) {
    console.log('pareil');
    result = null;

  } else {
    console.log('différent');
    result = {passwordValid: true};
  }

  return result;
}


