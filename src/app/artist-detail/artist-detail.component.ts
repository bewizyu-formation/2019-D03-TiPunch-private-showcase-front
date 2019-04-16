import {Component, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material';
import {DialogArtistComponent} from '../dialog-artist/dialog-artist.component';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ArtistServicesService} from '../services/artist-services.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {UserService} from '../user-service/user.service';
import {PATH_USER} from '../app.routes.constantes';
import {Artist} from '../model/Artist';
import { SpringApiServicesService } from '../services/spring-api-services.service';
import { UserServicesService } from '../services/user-services.service';
import { SafeHtmlPipe } from './sanitize.pipe';

@Component({
  selector: 'app-artist-detail',
  templateUrl: './artist-detail.component.html',
  styleUrls: ['./artist-detail.component.css']
})
export class ArtistDetailComponent implements OnInit {


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

  // Pour l'upload d'image
  selecetdFile: File;
  imagePreview: ArrayBuffer|string;


  // initialisation des champs
  emailCtrl: FormControl;
  phoneCtrl: FormControl;
  websiteCtrl: FormControl;
  artistForm: FormGroup;

  constructor(private api:SpringApiServicesService,private dialog: MatDialog, fb: FormBuilder, private artistService: ArtistServicesService,
              private route: ActivatedRoute, private userService: UserService, private router: Router, private sanitize : SafeHtmlPipe) {


    this.emailCtrl = fb.control(this.artist.contactMail ? this.artist.contactMail : '', [Validators.email]);
    this.phoneCtrl = fb.control(this.artist.contactPhone ? this.artist.contactPhone : '',
      [Validators.pattern('^([0-9]{2}( |-|)){4}[0-9]{2}$')]);
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

    if (data) {

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
  }

  handleSubmit() {

    let departementsArray1: any[] = [];

    for (let dept of this.artist.departements) {
      departementsArray1.push({nomDepartements: dept});
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

    this.artistService.updateArtist(data);

  }

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
  navigateToUser() {
    this.router.navigate([PATH_USER]);
  }

  async ngOnInit() {
    let id: any;
    this.route.paramMap.subscribe((params: ParamMap) => {
      id = params.get('id');
    });

    this.allowedToModify = this.userService.matchUserArtist(id);


    let resp = await this.artistService.getArtist(id).then(p => resp = p, p => resp = p);

    if (resp.status === 404) {
      this.router.navigate([PATH_USER]);
    }

    // charge les departements dans les departements d'artiste en les transformant en tableau d'objet pour les chips

    let departementsArray: any[] = [];

    for (let dept of resp.departments) {
      departementsArray.push(dept.nomDepartements);
    }


    this.artist = await resp;
    this.artist.departements = departementsArray;

    try {
      let blob = await this.artistService.getArtistImg(id);
      var reader = new FileReader();
      reader.onloadend = () => {
        console.log('LOADED', reader)
        this.imagePreview =reader.result;
      }
      reader.readAsDataURL(blob);
    } catch (e) {
      console.log('ERROR IMAGE' , e);
    }
  }

}
