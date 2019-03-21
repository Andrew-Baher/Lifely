import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

// Angular Services
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app.routing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MaterialModule } from './material.module';

// External Angular Components
import { AgmCoreModule } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';
import { MomentModule } from 'angular2-moment';

// AngularFire Modules
import { FirebaseUIModule, firebase, firebaseui } from 'firebaseui-angular';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireFunctionsModule } from '@angular/fire/functions';
import { AngularFireMessagingModule } from '@angular/fire/messaging';
import { AngularFireStorageModule } from '@angular/fire/storage';

// Components
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './profile/edit/edit.component';
import { SearchComponent } from './search/search.component';
import { ViewComponent } from './profile/view/view.component';
import { SendNotificationComponent } from './send-notification/send-notification.component';
import { MapComponent } from './map/map.component';
import { RequestComponent } from './request/request.component';
import { MyIssuesComponent } from './my-issues/my-issues.component';
import { LoadingComponent } from './loading/loading.component';

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    {
      authMethod: 'https://accounts.google.com',
      /* clientId:
        '800958282004-547qs5mtl73h8j5uqe6pl89e1i0v3qrc.apps.googleusercontent.com', */
      clientId:
        '381743370421-mgkrp6gk5e7adeevmepj134cebtcmt02.apps.googleusercontent.com',
      provider: firebase.auth.GoogleAuthProvider.PROVIDER_ID
    },
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID
    }
  ],
  siteName: 'Arabeety',
  // TODO: update TOS and Privacy
  // tosUrl: '<your-tos-link>',
  // privacyPolicyUrl: '<your-privacyPolicyUrl-link>',
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO
};

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RequestComponent,
    EditComponent,
    SearchComponent,
    MapComponent,
    SendNotificationComponent,
    ViewComponent,
    MyIssuesComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireFunctionsModule,
    AngularFireMessagingModule,
    AngularFireStorageModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBznC40gm968sTKamYUjIeatEIKq8jXMko',
      region: 'EG'
    }),
    ServiceWorkerModule.register('combined-worker.js', {
      enabled: environment.production
    }),
    MomentModule,
    AgmDirectionModule
  ],
  providers: [],
  entryComponents: [
    RequestComponent,
    MapComponent,
    SendNotificationComponent,
    LoadingComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
