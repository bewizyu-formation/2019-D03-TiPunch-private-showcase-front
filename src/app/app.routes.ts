import { Routes } from '@angular/router';
import { PATH_HOME, PATH_ARTIST, PATH_USER, PATH_EVENT, PATH_LOGIN, PATH_INSCRIPTION, PATH_PROFILE } from './app.routes.constantes';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { ArtistComponent } from './artist/artist.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfileComponent } from './profile/profile.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserModifComponent } from './user-modif/user-modif.component';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventModifComponent } from './event-modif/event-modif.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistModifComponent } from './artist-modif/artist-modif.component';


export const ROUTES: Routes = [
    { path: PATH_HOME, component: HomeComponent },
    { path: PATH_LOGIN, component: LoginComponent },
    { path: PATH_INSCRIPTION, component: InscriptionComponent},
    { path: PATH_PROFILE, component: ProfileComponent },
    {
        path: PATH_USER, component: UserComponent,
        children: [
            { path: ':id', component: UserDetailComponent, },
            { path: ':id/modification', component: UserModifComponent, }
        ]
    },
    {
        path: PATH_EVENT, component: EventComponent,
        children: [
            { path: ':id', component: EventDetailComponent, },
            { path: ':id/modification', component: EventModifComponent, }
        ]
    },
    {
        path: PATH_ARTIST, component: ArtistComponent,
        children: [
            { path: ':id', component: ArtistDetailComponent, },
            { path: ':id/modification', component: ArtistModifComponent, }
        ]
    }

];
