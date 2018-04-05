import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

// servicio - Provider
import { UsuarioProvider } from '../providers/usuario/usuario';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// firebase config
import { firebaseConfig } from '../config/firebase.config';

// localstorage
import { IonicStorageModule } from '@ionic/storage';

// geolocation
import { Geolocation } from '@ionic-native/geolocation';

// google maps
import { AgmCoreModule } from '@agm/core';



@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp,{
            scrollPadding: false,
            scrollAssist: true,
            autoFocusAssist: false
        }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: ''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    Geolocation,
    UbicacionProvider
  ]
})
export class AppModule {}
