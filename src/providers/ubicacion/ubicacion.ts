import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

 import { Observable } from 'rxjs/Observable';

import { UsuarioProvider } from '../usuario/usuario';


@Injectable()
export class UbicacionProvider {

   usuario: AngularFireList<any>;
   private watch:any;
  // usuario: Observable<any[]>;

  constructor(private geolocation: Geolocation,
              private afDB: AngularFireDatabase,
              private us: UsuarioProvider) {
                  if( !this.us.clave ) {
                    return;
                  }
                 this.usuario = this.afDB.list("/usuarios/");

              }

  iniciar_localizacion() {

    let options = {
       frequency: 3000,
       enableHighAccuracy: true
    };

    this.watch = this.geolocation.watchPosition(options)
     .subscribe((data) => {
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude

     if( !this.us.clave ) {
       return;
     }

     let clave = this.us.clave;
     this.usuario.update( clave, {lat: data.coords.latitude, lng: data.coords.longitude } );


    })
  }

  detener_watch() {
    this.watch.unsubscribe();
  }

}
