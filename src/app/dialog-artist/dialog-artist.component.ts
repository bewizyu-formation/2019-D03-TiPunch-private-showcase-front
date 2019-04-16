import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {UniqueLoginValidatorService} from '../validators/unique-login-validator.service';


@Component({
  selector: 'app-dialog-artist',
  templateUrl: './dialog-artist.component.html',
  styleUrls: ['./dialog-artist.component.css']
})
export class DialogArtistComponent implements OnInit {


  form: FormGroup;
  title: string;
  fieldName: string;
  artistName: boolean;
  contentCtrl: FormControl;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogArtistComponent>,
    private uniqueLogin: UniqueLoginValidatorService,
    @Inject(MAT_DIALOG_DATA) data) {
    this.title = data.title;
    this.fieldName = data.fieldName;


    switch (this.fieldName) {

      case 'nameArtist':
        this.contentCtrl = fb.control(data.content,
          [this.uniqueLogin.artistNameExists]);
        this.artistName = true;
        break;

      case 'shortDescriptionArtist':
      case 'descriptionArtist':
        this.contentCtrl = fb.control(data.content);
        this.artistName = false;
        break;
    }
  }


  ngOnInit() {

    this.form = this.fb.group({
      fieldName: this.fieldName,
      title: this.title,
      content: this.contentCtrl
    });

  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}
