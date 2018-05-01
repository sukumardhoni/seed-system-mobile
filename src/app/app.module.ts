import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { inspectionsPage } from '../pages/inspections/inspections';
import { ObservationsPage } from '../pages/observations/observations'
import { CameraPage } from '../pages/camera/camera'
import { GrowerDetailsPage } from '../pages/grower-details/grower-details'
import { HomePage } from '../pages/home/home'

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { Camera } from '@ionic-native/camera';
import { AgmCoreModule } from '@agm/core';
import { Geolocation } from '@ionic-native/geolocation';
import {ProfilePage} from '../pages/profile/profile'

import { PhotoLibrary } from '@ionic-native/photo-library';
import { OpenNativeSettings } from '@ionic-native/open-native-settings'
import { IonicStorageModule } from '@ionic/storage';
import { CallNumber } from '@ionic-native/call-number';
import { Network } from '@ionic-native/network';
import { DatePicker } from '@ionic-native/date-picker';
import { Diagnostic } from '@ionic-native/diagnostic';
import { SQLite } from '@ionic-native/sqlite';

//pipes
import { PipesModule } from '../pipes/pipes.module'

//services
import {authService} from '../services/authService';
//import { dbService } from '../services/dbService'

import { HttpModule, JsonpModule } from '@angular/http';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';

//firebase
import { Firebase } from '@ionic-native/firebase';

@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    inspectionsPage,
    ObservationsPage,
    CameraPage,
    GrowerDetailsPage,
    ProfilePage,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSkmVuzbgSritL4vk0LsPbHDeRyPNSU1w'
    }),
    IonicStorageModule.forRoot(),
    PipesModule,
    HttpModule,
    JsonpModule,
    Ng2GoogleChartsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    inspectionsPage,
    ObservationsPage,
    CameraPage,
    GrowerDetailsPage,
    ProfilePage,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Camera,
    Geolocation,
    PhotoLibrary,
    OpenNativeSettings,
    CallNumber, Network,
    authService,
    DatePicker,
    Diagnostic,
    Firebase,
    SQLite
  ]
})
export class AppModule { }
