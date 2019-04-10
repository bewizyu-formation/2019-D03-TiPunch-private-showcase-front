import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UniqueLoginValidatorService} from '../validators/unique-login-validator.service';
import { Router } from '@angular/router';
import { PATH_HOME } from '../app.routes.constantes';


@Component({
  selector: 'app-inscription-artist',
  templateUrl: './inscription-artist.component.html',
  styleUrls: ['./inscription-artist.component.css']
})
export class InscriptionArtistComponent implements OnInit {

  @Output()
  validationArtist: EventEmitter<FormGroup> = new EventEmitter();
  clearForm: EventEmitter<FormGroup> = new EventEmitter();

  nameArtistCtrl: FormControl;
  descriptionCtrl: FormControl;
  artistFormGroup: FormGroup;


  constructor(fb: FormBuilder, private uniqueLogin: UniqueLoginValidatorService) {

    this.nameArtistCtrl = fb.control('', [Validators.required], [this.uniqueLogin.artistNameExists]);
    this.descriptionCtrl = fb.control('', [Validators.required,
      Validators.pattern("^[a-zA-Z0-9-\\_\\ áàâäãåçéèêëíìîïñóòôöõúùûüýÿæœÁÀÂÄÃÅÇÉÈÊËÍÌÎÏÑÓÒÔÖÕÚÙÛÜÝŸÆŒ.!:;,\\(\\)\\']{3,}$")]);

    this.artistFormGroup = fb.group({
      nameArtist: this.nameArtistCtrl,
      description: this.descriptionCtrl
    });

  }

  validateForm(event) {

    this.validationArtist.emit(this.artistFormGroup.value);
  }

  handleClear() {
    this.nameArtistCtrl.setValue('');
    this.descriptionCtrl.setValue('');
    this.clearForm.emit();

  }

  ngOnInit() {
  }

}
