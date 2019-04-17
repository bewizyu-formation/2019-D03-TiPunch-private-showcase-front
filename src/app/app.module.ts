import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { environment } from '../environments/environment';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { APP_CONFIG } from './app.config';
import { TokenInterceptorService } from './services/interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './services/interceptors/error-interceptor.service';
import { CommonHeadersInterceptorService } from './services/interceptors/common-headers-interceptor.service';
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { EventComponent } from './event/event.component';
import { ArtistComponent } from './artist/artist.component';
import { LoginComponent } from './login/login.component';
import { InscriptionComponent } from './inscription/inscription.component';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import { EventDetailComponent } from './event-detail/event-detail.component';
import { EventModifComponent } from './event-modif/event-modif.component';
import { UserModifComponent } from './user-modif/user-modif.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ArtistDetailComponent } from './artist-detail/artist-detail.component';
import { ArtistModifComponent } from './artist-modif/artist-modif.component';
import { InscriptionArtistComponent } from './inscription-artist/inscription-artist.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatButtonModule, MatCheckboxModule, MatInputModule, MatMenuModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserComponent,
    EventComponent,
    ArtistComponent,
    LoginComponent,
    InscriptionComponent,
    ProfileComponent,
    EventDetailComponent,
    EventModifComponent,
    UserModifComponent,
    UserDetailComponent,
    ArtistDetailComponent,
    ArtistModifComponent,
    InscriptionArtistComponent,

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatInputModule,
    MatAutocompleteModule,
    MatMenuModule
  ],
  providers: [
    { provide: APP_CONFIG, useValue: environment },
    { provide: HTTP_INTERCEPTORS, useClass: CommonHeadersInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
