import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';

import { LoginPage } from '../pages/login/login';

import { UsuarioProvider } from '../providers/usuario/usuario';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform,
              statusBar: StatusBar,
              splashScreen: SplashScreen,
              private _us: UsuarioProvider) {
    platform.ready().then(() => {

     // verificar si el usuario - clave esxiste
      this._us.cargar_storage()
             .then( () => {

               if( this._us.clave ) {

                 this.rootPage = HomePage;

               } else {

                 this.rootPage = "LoginPage";

               }

               // Okay, so the platform is ready and our plugins are available.
               // Here you can do any higher level native things you might need.
               statusBar.styleDefault();
               splashScreen.hide();

             })

    });
  }
}
