import { Routes } from '@angular/router';
import { PATH_HOME, PATH_ARTIST, PATH_USER, PATH_EVENT, PATH_LOGIN, PATH_INSCRIPTION, PATH_PROFILE } from './app.routes.constantes';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { ArtistComponent } from './artist/artist.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfileComponent } from './profile/profile.component';


export const ROUTES: Routes = [
    {path: PATH_HOME, component: HomeComponent },
    {path: PATH_LOGIN, component: LoginComponent },
    {path: PATH_INSCRIPTION, component: InscriptionComponent },
    {path: PATH_PROFILE, component: ProfileComponent },
    {path: PATH_USER, component: UserComponent,},
    {path: PATH_EVENT, component: EventComponent,},
    {path: PATH_ARTIST, component: ArtistComponent},

];
