import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {passwordValid} from '../validators/validator-user-artist';
import {UniqueLoginValidatorService} from '../validators/unique-login-validator.service';
import {UserServicesService} from '../services/user-services.service';
import {ArtistServicesService} from '../services/artist-services.service';
import {Router} from '@angular/router';
import {PATH_HOME, PATH_USER, PATH_LOGIN} from '../app.routes.constantes';
import {UserService} from '../user-service/user.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  // champ de statut artist/user simple
  displayArtistFields = false;

  // différents champs users
  usernameCtrl: FormControl;
  passwordCtrl: FormControl;
  password2Ctrl: FormControl;
  emailCtrl: FormControl;
  cityCtrl: FormControl;
  userForm: FormGroup;
  passwordsGroup: FormGroup;

  options: string[] = [];
  

  constructor(fb: FormBuilder, private uniqueLogin: UniqueLoginValidatorService,
              private userService: UserServicesService, private artistService: ArtistServicesService,
              private router: Router, private userServiceLogin: UserService) {


    // mise en places des control avec les différents validator
    this.usernameCtrl = fb.control('', [Validators.required], [this.uniqueLogin.usernameExists]);
    this.passwordCtrl = fb.control('', [Validators.required, Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')]);
    this.password2Ctrl = fb.control('', [Validators.required]);
    this.emailCtrl = fb.control('', [Validators.required, Validators.email]);
    this.cityCtrl = fb.control('', [Validators.required]);


    // créer un groupe des mot de passe pour tester la similitudes des deux champs
    this.passwordsGroup = fb.group({
      password: this.passwordCtrl,
      passwordConfirm: this.password2Ctrl
    }, {
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
  async handleArtistForm(artistFormGroup) {

    if (this.displayArtistFields === true) {

      const data = {
        username: this.usernameCtrl.value,
        passwordArtist: this.passwordCtrl.value,
        mailArtist: this.emailCtrl.value,
        cityArtist: this.cityCtrl.value,
        descriptionArtist: artistFormGroup.description,
        nameArtist: artistFormGroup.nameArtist
      };
      let value;

      this.artistService.addArtist(data).then(resp => value = resp.status).then(() => {
        if (value == 200) {
          this.router.navigate([PATH_LOGIN]);
        }
      });
    }
  }


  // Appellé si on créer un simple user
  async handleSubmit() {
    let value;
    if (this.displayArtistFields === false) {
      this.userService.addUser(this.userForm.value).then(resp => value = resp.status).then(() => {
        if (value == 200) {
          this.router.navigate([PATH_LOGIN]);
        }
      });
    }
  }

  // vides les champs users
  handleClear() {
    this.usernameCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.emailCtrl.setValue('');
    this.cityCtrl.setValue('');
    this.passwordCtrl.setValue('');
    this.password2Ctrl.setValue('');
  }

  // Gere le bascule artist.user
  handleCheck(event) {
    if (event.checked === true) {
      this.displayArtistFields = true;

    } else {
      this.displayArtistFields = false;
    }
  }

  NavigateToHome() {
    this.router.navigate([PATH_HOME]);
  }

  ngOnInit() {
  }

}
