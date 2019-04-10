import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-dialog-artist',
  templateUrl: './dialog-artist.component.html',
  styleUrls: ['./dialog-artist.component.css']
})
export class DialogArtistComponent implements OnInit {


  form: FormGroup;
  title: FormControl;
  fieldName: string;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogArtistComponent>,
    @Inject(MAT_DIALOG_DATA) data) {
    console.log(data);
    this.title = data.title;
    this.fieldName = data.fieldName;
  }

  ngOnInit() {

    this.form = this.fb.group({
      title: [this.title, []]
    });
  }

  save() {
    this.dialogRef.close(this.form.value);
  }

  close() {
    this.dialogRef.close();
  }


}

