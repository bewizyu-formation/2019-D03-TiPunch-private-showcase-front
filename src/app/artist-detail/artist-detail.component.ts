import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogArtistComponent} from '../dialog-artist/dialog-artist.component';
import {FormBuilder, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

  // initialisation des champs
  emailCtrl: FormControl;
  phoneCtrl: FormControl;
  websiteCtrl: FormControl;

  constructor(private dialog: MatDialog, fb: FormBuilder) {

    this.emailCtrl = fb.control('', [Validators.email]);
    this.phoneCtrl = fb.control('', [Validators.pattern('^([0-9]{2}( |-|)){4}[0-9]{2}$')]);
    this.websiteCtrl = fb.control('');

  }

  artist = {
    nameArtist: 'Trop FUn',
    mailArtist: 'test@test.fr',
    cityArtist: 'Lyon',
    abstract: 'trjlkqfjlfjkldfjkncksjs<jkfljK ',
    descriptionArtist: 'Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim,' +
      ' pulvinar lobortis nibh lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet ' +
      'risus. Nam tempus vel odio vitae aliquam. ' +
      'In imperdiet eros id lacus vestibulum vestibulum. Suspendisse fer' +
      'mentum sem sagittis ante venenatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliquam sapien convalli' +
      's eu. Nulla ut turpis in' +
      ' diam dapibus consequat. Curabitur lobortis id lorem id bibendum. Ut id consectetur magna. Quisque volutpat augue enim, pulvinar lobortis nibh ' +
      'lacinia at. Vestibulum nec erat ut mi sollicitudin porttitor id sit amet risus. Nam tempus vel odio vitae aliquam. In' +
      ' imperdiet eros id lacus vestibulum vestibulum. Suspendisse fermentum sem sagittis ante ve' +
      'nenatis egestas quis vel justo. Maecenas semper suscipit nunc, sed aliquam sapien convallis eu. Nulla ut turpis in diam dapibus consequat.',
    noteArtist: 1,
    nbVotes: 12,
    img_url: '../../src/assets/plaholderJaquette.jpg',
    mail: '',
    phoneNb: '',
    website: ''
  };

  openDialog(fieldInfo) {


    const dialogConfig = new MatDialogConfig();


    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    let title: string;
    let fieldName: string;

    switch (fieldInfo) {
      case 'nameArtist':
        title = 'Nom de l\'artiste';
        fieldName = 'nom';

        break;

      case 'abstract':


        title = 'Description courte';
        fieldName = 'description';

        break;

      case 'descriptionArtist':


        title = 'Description complète';
        fieldName = 'description';

        break;
    }
;
    dialogConfig.data = {
      title: title,
      fiedlName: fieldName,

    };

    const dialogRef = this.dialog.open(DialogArtistComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(
      data => console.log('Dialog output:', data)
    );

  }


  ngOnInit() {

  }
}
