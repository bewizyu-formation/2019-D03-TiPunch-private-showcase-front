import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValid} from '../validators/validator-user-artist';
import {UniqueLoginValidatorService} from '../validators/unique-login-validator.service';
import {UserServicesService} from '../services/user-services.service';
import {ArtistServicesService} from '../services/artist-services.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  // champ de statut artist/user simple
  displayArtistFields: boolean = false;

  // différents champs users
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  password2Ctrl: FormControl;
  emailCtrl: FormControl;
  cityCtrl: FormControl;
  userForm: FormGroup;
  passwordsGroup: FormGroup;

  options: string[] = ['paris', 'lyon', 'marseille', 'strasbourg'];

  constructor(fb: FormBuilder, private uniqueLogin: UniqueLoginValidatorService, private userService :UserServicesService, private artistService :ArtistServicesService) {

    // mise en places des control avec les différents validator
    this.usernameCtrl = fb.control('', [Validators.required],[this.uniqueLogin.usernameExists]);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')]);
    this.password2Ctrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
    this.cityCtrl = fb.control('', [Validators.required]);


    // créer un groupe des mot de passe pour tester la similitudes des deux champs
    this.passwordsGroup = fb.group({
      password: this.passwordCtrl,
      passwordConfirm: this.password2Ctrl
    },{
      validator: passwordValid.bind(this)

    });

    // création d'un objet avec toute les données du formulaire
    this.userForm = fb.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl,
      mail: this.emailCtrl,
      city: this.cityCtrl
    });

  }

  // Appellé si on crée aussi un artiste
  handleArtistForm(artistFormGroup){

    if(this.displayArtistFields == true){

      let data:any = [artistFormGroup, this.userForm.value];

      console.log(data);
    }

  }

  // Appellé si on créer un simple user
  async handleSubmit(){
    if(this.displayArtistFields == false){

      await this.userService.addUser(this.userForm.value);

      // console.log(this.userForm.value);

    }
  }

  // vides les champs users
  handleClear(){
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.emailCtrl.setValue('');
    this.cityCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.password2Ctrl.setValue('');
  }

  // Gere le bascule artist.user
  handleCheck(event){
    if(event.checked == true){
      this.displayArtistFields = true;

    } else {
      this.displayArtistFields = false;
    }
  }

  ngOnInit() {
  }

}
