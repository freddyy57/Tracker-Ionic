import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';

import { Platform } from 'ionic-angular';

// localstorage
import { Storage } from '@ionic/storage';


@Injectable()
export class UsuarioProvider {

  clave:string = null;

  constructor( private afDB: AngularFireDatabase,
               private storage: Storage,
               private platform: Platform ) {}

  verifica_usuario( clave:string ) {
    clave = clave.toLowerCase();
    let promesa = new Promise( (resolve, reject ) => {
      this.afDB.list('/usuarios/' + clave)
          .valueChanges()
          .subscribe( (data:any) => {

            if( data.length === 0 ) {
              // clave no correcta
              resolve(false);
            } else {
            // La clave es válida
            this.clave = clave;
            this.guardar_storage();
            resolve(true);
          }

          })
    })
    .catch( error => console.log("Error en promesa service: " + JSON.stringify(error)));

    return promesa;
  }


  guardar_storage() {

    let promesa = new Promise( (resolve, reject) => {

      if ( this.platform.is("cordova") ) {
        this.storage.set('clave', this.clave);
      } else {
        if ( this.clave ) {
          localStorage.setItem("clave", this.clave);
        } else {
          localStorage.removeItem("clave");
        }

      }

    })
    .catch( error => console.log("Error en guardar storage: " + JSON.stringify(error)));
    return promesa;


  }

  cargar_storage() {
    let promesa = new Promise( (resolve, reject) => {

      if ( this.platform.is("cordova") ) {
        this.storage.ready()
        .then( () => {
          // leer del storage;
          this.storage.get('clave').then( clave => {
          this.clave = clave;
          resolve();
        });
      });

      } else {
        this.clave = localStorage.getItem("clave");
        resolve();
      }

    })
    .catch( error => console.log("Error cargar Storage: " + JSON.stringify(error)));

    return promesa;
  }

  borrar_usuario() {
    this.clave = null;
    this.guardar_storage();
  }

}
