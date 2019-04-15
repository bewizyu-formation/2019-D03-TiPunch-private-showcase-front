import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogArtistComponent} from '../dialog-artist/dialog-artist.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArtistServicesService} from '../services/artist-services.service';
import {ActivatedRoute, ParamMap} from '@angular/router';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {

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
    phoneNb: '',
    website: '',
    counties: ['rhone', 'hautes-alpes', 'alsace']
  };
allowedToModify =true;


  // initialisation des champs
  emailCtrl: FormControl;
  phoneCtrl: FormControl;
  websiteCtrl: FormControl;
  artistForm: FormGroup;

  constructor(private dialog: MatDialog, fb: FormBuilder, private artistService: ArtistServicesService, private route: ActivatedRoute) {


    this.emailCtrl = fb.control(this.artist.mailArtist, [Validators.email]);
    this.phoneCtrl = fb.control(this.artist.phoneNb, [Validators.pattern('^([0-9]{2}( |-|)){4}[0-9]{2}$')]);
    this.websiteCtrl = fb.control(this.artist.website, [Validators.pattern(
      '^(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$')]);


    // création d'un objet formulaire
    this.artistForm = fb.group({
      mailArtist: this.emailCtrl,
      phoneNb: this.phoneCtrl,
      website: this.websiteCtrl,

    });

  }

  // Gere l'ouverture de la boite de dialogue
  openDialog(fieldInfo) {

    const dialogConfig = new MatDialogConfig();

    // configuration de base
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '50%';

    let title: string;
    let fieldName: string;
    let content: string;

    // test l'origine de l'appel pour remplir la boite de dialogue en fonction
    switch (fieldInfo) {
      case 'nameArtist':
        title = 'Nom de l\'artiste';
        fieldName = 'nameArtist';
        content = this.artist.nameArtist;
        break;

      case 'abstract':


        title = 'Description courte';
        fieldName = 'abstract';
        content = this.artist.abstract;
        break;

      case 'descriptionArtist':


        title = 'Description complète';
        fieldName = 'descriptionArtist';
        content = this.artist.descriptionArtist;
        break;
    }


    // prépare l'objet data de la configuration
    dialogConfig.data = {
      title: title,
      fieldName: fieldName,
      content: content

    };

    // Ouvre la boite de dialogue
    const dialogRef = this.dialog.open(DialogArtistComponent, dialogConfig);

    // Gere la fermeture de la boite de dialogue en rechargeant les données modififiées dans les bons champs
    dialogRef.afterClosed().subscribe(
      data => this.handleClosingDial(data)
    );


  }

  // selectionne dans quels champs updater les nouvelles données de la boite de dialogue
  handleClosingDial(data) {

    switch (data.fieldName) {
      case 'nameArtist':

        this.artist.nameArtist = data.content;
        break;

      case 'abstract':

        this.artist.abstract = data.content;
        break;

      case 'descriptionArtist':

        this.artist.descriptionArtist = data.content;
        break;
    }
  }

  handleSubmit() {

    // creation de l'objet qui sera envoyer au serveur

    const data = {
      nameArtist: this.artist.nameArtist,
      mailArtist: this.emailCtrl.value,
      descriptionArtist: this.artist.descriptionArtist,
      urlImage: this.artist.img_url,
      shortDescriptionArtist: this.artist.abstract,
      contactPhone: this.phoneCtrl.value,
      urlSiteArtist: this.websiteCtrl.value,
      departementArtis: this.artist.counties

    };


    this.artistService.updateArtist(data);

   // console.log('formulaire final :', data);
  }

  disableForm() {
    this.artistForm.disable();
  }

  ngOnInit() {
    let id: any;
     this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
    });

     const pouet = this.artistService.getArtist(id);


  }

}
