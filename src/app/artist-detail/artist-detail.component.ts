import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogArtistComponent} from '../dialog-artist/dialog-artist.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArtistServicesService} from '../services/artist-services.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user-service/user.service';
import {PATH_USER} from '../app.routes.constantes';
import {Artist} from '../model/Artist';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import { SpringApiServicesService } from '../services/spring-api-services.service';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {
/*
  artist = {
    id: 5,
    nameArtist: 'Trop FUn',
    contactMail: 'test@test.fr',
    cityArtist: 'Lyon',
    shortDescriptionArtist: 'trjlkqfjlfjkldfjkncksjs<jkfljK ',
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
    urlImage: '../../src/assets/plaholderJaquette.jpg',
    contactPhone: '',
    urlSiteArtist: '',
    departements: ['rhone', 'hautes-alpes', 'alsace']
  };*/

  artist: Artist = {
    contactMail: '',
    contactPhone: '',
    urlSiteArtist: '',
    id: 0,
    nameArtist: '',
    cityArtist: '',
    descriptionArtist: '',
    noteArtist: '',
    nbVotes: '',
    users: [],
    departements: [],
    shortDescriptionArtist: '',
    urlImage: '',
  };
  allowedToModify = false;


  // initialisation des champs
  emailCtrl: FormControl;
  phoneCtrl: FormControl;
  websiteCtrl: FormControl;
  artistForm: FormGroup;

  constructor(private api:SpringApiServicesService,private router: Router,private dialog: MatDialog, fb: FormBuilder, private artistService: ArtistServicesService, private route: ActivatedRoute) {


    this.emailCtrl = fb.control(this.artist.contactMail ? this.artist.contactMail : '', [Validators.email]);
    this.phoneCtrl = fb.control(this.artist.contactPhone ? this.artist.contactPhone : '', [Validators.pattern('^([0-9]{2}( |-|)){4}[0-9]{2}$')]);
    this.websiteCtrl = fb.control(this.artist.urlSiteArtist ? this.artist.urlSiteArtist : '', [Validators.pattern(
      '^(http(s)?:\\/\\/.)?(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%_\\+.~#?&//=]*)$')]);


    // création d'un objet formulaire
    this.artistForm = fb.group({
      contactMail: this.emailCtrl,
      contactPhone: this.phoneCtrl,
      urlSiteArtist: this.websiteCtrl,

    });

  }

  // Gere l'ouverture de la boite de dialogue
  openDialog(fieldInfo) {

    const dialogConfig = new MatDialogConfig();

    // configuration de base
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '70%';

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

      case 'shortDescriptionArtist':


        title = 'Description courte';
        fieldName = 'shortDescriptionArtist';
        content = this.artist.shortDescriptionArtist;
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

      case 'shortDescriptionArtist':

        this.artist.shortDescriptionArtist = data.content;
        break;

      case 'descriptionArtist':

        this.artist.descriptionArtist = data.content;
        break;
    }
  }

  handleSubmit() {

    let departementsArray1:any[] = [];

    for(let dept of this.artist.departements){
      departementsArray1.push( {nomDepartements : dept});
    }



    // creation de l'objet qui sera envoyer au serveur

    const data = {
      id: this.artist.id,
      nameArtist: this.artist.nameArtist,
      contactMail: this.emailCtrl.value,
      descriptionArtist: this.artist.descriptionArtist,
      urlImage: this.artist.urlImage,
      shortDescriptionArtist: this.artist.shortDescriptionArtist,
      contactPhone: this.phoneCtrl.value,
      urlSiteArtist: this.websiteCtrl.value,
      departments: departementsArray1

    };


   // this.artistService.updateArtist(data);

    console.log('formulaire final :', data);
  }

  async ngOnInit() {
    let id: any;
     this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
    });

    this.allowedToModify = this.userService.matchUserArtist(id);


    let resp = await this.artistService.getArtist(id).then(p => resp = p, p => resp = p);

    if(resp.status === 404){
      this.router.navigate([PATH_USER]);
    }
    console.log('artistGet', resp);

    let departementsArray:any[] = [];

    for(let dept of resp.departments){
      departementsArray.push( dept.nomDepartements);
    }


   this.artist = await resp;


    this.artist.departements = departementsArray;
  }
  selecetdFile: File;
  imagePreview: ArrayBuffer|String;
  onFileUpload(event) {

    this.selecetdFile = event.target.files[0];

    const reader = new FileReader();
    reader.onloadend = () => {
      this.imagePreview = reader.result;
      this.api.uploadFile(this.selecetdFile,this.route.snapshot.paramMap.get('id'))
        .subscribe(
          () => console.log('Upload success'),
          error => console.log('Upload error', error),
        );
    };
    reader.readAsDataURL(this.selecetdFile);
  }
  NavigateToUser() {
    this.router.navigate([PATH_USER]);
  }
}
