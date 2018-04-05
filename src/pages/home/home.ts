import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { UsuarioProvider } from '../../providers/usuario/usuario';

// google maps
import { AgmCoreModule } from '@agm/core';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  usuario:any = {};

  // lat: number = 55.755826;
  // lng: number = 37.6173;

  constructor(public navCtrl: NavController,
              private _ubicacion: UbicacionProvider,
              private _us: UsuarioProvider) {
                this._ubicacion.iniciar_localizacion();
                this._ubicacion.usuario.valueChanges()
                               .subscribe( (data: any) => {
                                  console.log( data[0] );
                                 this.usuario = data[0];
                               })
  }

  salir() {
    this._us.borrar_usuario();
    this._ubicacion.detener_watch();
    this.navCtrl.setRoot("LoginPage");
  }

}
