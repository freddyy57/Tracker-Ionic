import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController } from 'ionic-angular';

import { ViewChild, AfterViewInit } from '@angular/core';
import { Slides } from 'ionic-angular';
// servicio
import { UsuarioProvider } from '../../providers/usuario/usuario';

import { HomePage } from '../home/home';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage implements AfterViewInit {

  @ViewChild(Slides) slides: Slides;
  clave:string = "";

  constructor( public navCtrl: NavController,
               private _usuarioService: UsuarioProvider,
               private alertCtrl: AlertController,
               private loadingCtrl: LoadingController ) {
  }

  continuar() {

    let loading = this.loadingCtrl.create({
      content: "Espere por favor"
    });
    loading.present();

    // Verificar si la clave es válida
    this._usuarioService.verifica_usuario(this.clave)
        .then( valido => {
          // parar el loading
          loading.dismiss();

          if( valido ) {
            // continuar a las siguiente pantalla
            // Primero desbloquear slide
            this.slides.lockSwipes(false);
            // Pasar slide a la siguiente pantalla
            this.slides.slideNext();
            // bloquearlo de nuevo
            this.slides.lockSwipes(true);

          } else {
          this.alertCtrl.create({
            title: "La Clave no es Correcta",
            subTitle: "Por favor verifique su clave o hable con el administrador",
            buttons: ["OK!"]
          }).present();
        }

        })
        .catch( error => {
          // parar el loading
          loading.dismiss();
          console.log("ERROR VERIFICAR USUARIO: " + JSON.stringify( error ));
        })
  }

  ingresar() {
    // Ya tenemos clave verificada, Ir al Home
    this.navCtrl.setRoot( HomePage );

  }

  ngAfterViewInit() {
    // bloquea los slides
    this.slides.lockSwipes(true);
    this.slides.freeMode = false;
    this.slides.paginationType = "progress";
  }


  // fixScroll(){
  //   if( this.platform.is("android")){
  //     setTimeout(() => {
  //       console.log(this.platform);
  //       let element = document.getElementById("absence-textarea");
  //       let box = element.getBoundingClientRect();
  //       let top = Math.round(box.top*50);
  //       this.content.scrollTo(0, top, 100);
  //     }, 350);
  //   }
  // }

}
